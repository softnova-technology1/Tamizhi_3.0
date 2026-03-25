import { Container, Row, Col } from 'react-bootstrap';
import { getRandomInt } from '../../utility/uniqueIdGenerator';
import { useOutletContext, useLocation } from 'react-router-dom';
import classes from '../../Stylesheet/ContentComponent.module.css';
import { Context } from '../../Context/contextApi';
import { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContentComponent() {
  const [data, nameOfContent] = useOutletContext();
  const { darkmode } = useContext(Context);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const hash = location.hash ? decodeURIComponent(location.hash.substring(1)) : null;
  let activeSection = null;
  let activeSubHeading = null;
  let isIntroduction = false;

  const normalize = (s) => (s || '').trim().toLowerCase().replace(/[\s,._-]+/g, '_');
  const genericSections = [
    "intro", "background", "course", "outcome", "significance", "conclusion", "sources", "summary", 
    "reign", "legacy", "early", "middle", "later", "history", "administration", "religion", "society",
    "etymology", "origin", "alphabet", "languages", "significance", "cultural", "religious", "architectural", "features", "prominent",
    "excavations", "research", "discoveries", "findings", "phases", "members", "details",
    "முடிவுரை", "பின்னணி", "போக்கு", "முக்கியத்துவம்", "வரலாறு", "நிர்வாகம்", "சமயம்", "பெயர்க்காரணம்", "தோற்றம்", "மொழி", "கலாச்சாரம்", "அகழ்வாராய்ச்சி", "ஆராய்ச்சி", "கண்டுபிடிப்புகள்", "கட்டங்கள்", "உறுப்பினர்கள்", "தகவல்கள்"
  ];

  if (hash) {
    const normalizedHash = normalize(hash);
    let currentMajorHeading = data.title;

    // Check if the hash matches the main title itself (Introduction state)
    if (normalizedHash === normalize(data.title)) {
      isIntroduction = true;
    } else {
      for (let sub of data.subTitle || []) {
        const isGeneric = genericSections.some(g => sub.subHeading.toLowerCase().includes(g));
        if (!isGeneric) currentMajorHeading = sub.subHeading;

        const contextualId = currentMajorHeading === sub.subHeading
          ? sub.subHeading
          : `${currentMajorHeading}_${sub.subHeading}`;

        const normalizedSubHeading = normalize(contextualId);
        if (normalizedSubHeading === normalizedHash) {
          activeSubHeading = sub;
          isIntroduction = false;
          break;
        }
      }
    }

    if (!activeSubHeading && !isIntroduction) {
      isIntroduction = true;
    }
  } else {
    isIntroduction = true;
  }

  const PageTransition = {
    initial: { opacity: 0, x: -30, filter: 'blur(3px)' },
    animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, x: 30, filter: 'blur(3px)' },
    transition: { duration: 0.5, ease: "easeInOut" }
  };

  let searchResults = [];
  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase();
    let currentMajorHeadingSearch = data.title;

    for (let sub of data.subTitle || []) {
      const isGeneric = genericSections.some(g => sub.subHeading.toLowerCase().includes(g));
      if (!isGeneric) currentMajorHeadingSearch = sub.subHeading;

      const contextualId = currentMajorHeadingSearch === sub.subHeading
        ? sub.subHeading
        : `${currentMajorHeadingSearch}_${sub.subHeading}`;

      if (sub.data) {
        for (let eachData of sub.data) {
          const matchTitle = eachData.title && eachData.title.toLowerCase().includes(q);
          const matchDesc = eachData.description && eachData.description.some(d => d.toLowerCase().includes(q));
          const matchSub = sub.subHeading && sub.subHeading.toLowerCase().includes(q);
          if (matchTitle || matchDesc || matchSub) {
            searchResults.push({ ...eachData, parentSubHeading: sub.subHeading, contextualId });
          }
        }
      }
    }
  }

  const isSearchEmpty = searchResults.length === 0;

  return (
    <div style={{ position: 'relative', overflow: 'hidden', padding: '1rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Global Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '10px 20px',
            borderRadius: '25px',
            border: `1px solid ${darkmode === 'off' ? '#d4af37' : '#8b6b1d'}`,
            backgroundColor: darkmode === 'off' ? 'rgba(255, 255, 255, 0.7)' : '#2b2a2a',
            color: darkmode === 'off' ? '#1a0f0a' : '#d1c9c9',
            outline: 'none',
            fontSize: '1rem',
            width: '250px',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && searchResults.length > 0) {
              const firstMatch = searchResults[0];
              if (firstMatch.contextualId) {
                // Navigate to the topic and clear search
                window.location.hash = normalize(firstMatch.contextualId);
                setSearchQuery('');
              }
            }
          }}
          onFocus={(e) => e.target.style.width = '300px'}
          onBlur={(e) => e.target.style.width = '250px'}
        />
      </div>

      <AnimatePresence mode="wait">
        {searchQuery.trim() !== '' ? (
          <motion.div
            key="search-results"
            initial={PageTransition.initial}
            animate={PageTransition.animate}
            exit={PageTransition.exit}
            transition={PageTransition.transition}
            className={classes.contentOver}
          >
            <div style={{ fontSize: '0.9rem', fontStyle: 'italic', marginBottom: '1.5rem', opacity: 0.8, color: darkmode === 'off' ? '#5d4037' : '#d1c9c9' }}>
              Showing results for "{searchQuery}"
            </div>
            {isSearchEmpty ? (
              <p style={{ color: darkmode === 'off' ? '#35383d' : '#d1c9c9' }}>No results found.</p>
            ) : (
              searchResults.map((item, index) => (
                <div key={`search_${item.title}_${index}`} style={{ marginBottom: '4rem' }}>
                  {item.parentSubHeading && (
                    <h3 className={classes.title1} style={{ borderBottom: '2px solid rgba(212, 175, 55, 0.4)', paddingBottom: '10px', marginBottom: '25px', opacity: 0.9 }}>
                      {item.parentSubHeading}
                    </h3>
                  )}
                  {item.title && item.title !== item.parentSubHeading && (
                    <h3 className={classes.title2}>{item.title}</h3>
                  )}

                  <Container style={{ margin: 0, maxWidth: '100%', width: 'auto' }}>
                    <Row>
                      <Col xs={12}>
                        <div
                          className={
                            item.image && item.image.length > 1
                              ? classes.flexContainer
                              : classes.flexContainerSingle
                          }
                        >
                          {item.image &&
                            item.image.map((eachImg) => (
                              <div key={`${eachImg.image}_${getRandomInt()}`}>
                                <img
                                  src={eachImg.image}
                                  alt={eachImg.name}
                                  className={classes.imgsize}
                                />
                                {eachImg.imgTitle && (
                                  <p className={classes.imgtext}>{eachImg.imgTitle}</p>
                                )}
                              </div>
                            ))}
                        </div>
                      </Col>
                    </Row>
                  </Container>

                  {item.description &&
                    item.description.map((value) => (
                      <p
                        className={classes.marginBottomdes}
                        key={`desc_${getRandomInt()}`}
                        style={{ color: darkmode === 'off' ? '#35383d' : '#d1c9c9' }}
                      >
                        {value.split(/<\/br>|<br>|<br\/>/).map((text, i, arr) => (
                          <span key={i}>
                            {text}
                            {i < arr.length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    ))}
                  {item.list &&
                    item.list.map((liItem) => (
                      <li
                        className={classes.listname}
                        key={`list_${getRandomInt()}`}
                      >
                        {liItem}
                      </li>
                    ))}
                </div>
              ))
            )}
          </motion.div>
        ) : isIntroduction ? (
          <motion.div
            key="introduction"
            initial={PageTransition.initial}
            animate={PageTransition.animate}
            exit={PageTransition.exit}
            transition={PageTransition.transition}
            className={classes.contentOver}
          >
            <h2
              className={classes.title1}
              style={{ color: darkmode === 'off' ? 'black' : 'white' }}
            >
              {data.title}
            </h2>
            {data.image && data.image.length !== 0 && (
              <Container style={{ margin: 0, maxWidth: '100%', width: 'auto' }}>
                <Row>
                  <Col xs={12}>
                    <div
                      className={
                        data.image.length !== 1
                          ? classes.flexContainer
                          : classes.flexContainerSingle
                      }
                    >
                      {data.image.map((eachImg) => (
                        <div key={`${eachImg.name}_${getRandomInt()}`}>
                          <img
                            src={eachImg.image}
                            alt={eachImg.name}
                            className={classes.imgsize}
                          />
                          {eachImg.imgTitle && (
                            <p
                              className={classes.imgtext}
                              style={{ color: darkmode === 'off' ? 'black' : 'white' }}
                            >
                              {eachImg.imgTitle}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </Col>
                </Row>
              </Container>
            )}
            {data.description &&
              data.description.map((descriptionArray) => (
                <p
                  key={`${data.title}_desc_${getRandomInt()}`}
                  style={{ color: darkmode === 'off' ? '#35383d' : '#d1c9c9' }}
                  className={classes.marginBottomdes}
                >
                  {descriptionArray.split(/<\/br>|<br>|<br\/>/).map((text, i, arr) => (
                    <span key={i}>
                      {text}
                      {i < arr.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              ))}
          </motion.div>
        ) : (
          <motion.div
            key={activeSubHeading.subHeading}
            initial={PageTransition.initial}
            animate={PageTransition.animate}
            exit={PageTransition.exit}
            transition={PageTransition.transition}
            className={classes.contentOver}
          >
            {activeSubHeading && activeSubHeading.subHeading && (
              <h3 className={classes.title1} style={{ borderBottom: '2px solid rgba(212, 175, 55, 0.4)', paddingBottom: '10px', marginBottom: '40px', opacity: 0.9 }}>
                {activeSubHeading.subHeading}
              </h3>
            )}

            {activeSubHeading.data && activeSubHeading.data.map((eachData, index) => (
              <div key={`${eachData.title}_${index}`} style={{ marginBottom: '4rem' }}>
                {eachData.title &&
                  activeSubHeading && activeSubHeading.subHeading &&
                  eachData.title !== activeSubHeading.subHeading && (
                    <h3 className={classes.title2}>{eachData.title}</h3>
                  )}

                <Container style={{ margin: 0, maxWidth: '100%', width: 'auto' }}>
                  <Row>
                    <Col xs={12}>
                      <div
                        className={
                          eachData.image && eachData.image.length > 1
                            ? classes.flexContainer
                            : classes.flexContainerSingle
                        }
                      >
                        {eachData.image &&
                          eachData.image.map((eachImg) => (
                            <div key={`${eachImg.image}_${getRandomInt()}`}>
                              <img
                                src={eachImg.image}
                                alt={eachImg.name}
                                className={classes.imgsize}
                              />
                              {eachImg.imgTitle && (
                                <p className={classes.imgtext}>{eachImg.imgTitle}</p>
                              )}
                            </div>
                          ))}
                      </div>
                    </Col>
                  </Row>
                </Container>

                {eachData.description &&
                  eachData.description.map((value) => (
                    <p
                      className={classes.marginBottomdes}
                      key={`${eachData.title}_desc_${getRandomInt()}`}
                      style={{ color: darkmode === 'off' ? '#35383d' : '#d1c9c9' }}
                    >
                      {value.split(/<\/br>|<br>|<br\/>/).map((text, i, arr) => (
                        <span key={i}>
                          {text}
                          {i < arr.length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  ))}
                {eachData.list &&
                  eachData.list.map((liItem) => (
                    <li
                      className={classes.listname}
                      key={`${liItem}_${getRandomInt()}`}
                    >
                      {liItem}
                    </li>
                  ))}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
