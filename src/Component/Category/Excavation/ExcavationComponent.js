import { getRandomInt } from '../../../utility/uniqueIdGenerator';
import { useOutletContext, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import classes from '../../../Stylesheet/ContentComponent.module.css';
import { Context } from '../../../Context/contextApi';
import { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExcavationComponent() {
  const [data] = useOutletContext();
  const { darkmode } = useContext(Context);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const normalize = (s) => (s || '').trim().toLowerCase().replace(/[\s,._-]+/g, '_');
  const genericSections = [
    "intro", "background", "history", "excavations", "research", "discoveries", "findings", "phases", "members", "details", "contributions", "implications", "summary", "conclusion",
    "முடிவுரை", "பின்னணி", "ஆராய்ச்சி", "கண்டுபிடிப்புகள்", "கட்டங்கள்", "உறுப்பினர்கள்", "தகவல்கள்", "அகழ்வாராய்ச்சி"
  ];

  const hash = location.hash ? decodeURIComponent(location.hash.substring(1)) : null;
  const normalizedHash = hash ? normalize(hash) : null;
  let activeSubHeading = null;
  let isIntroduction = false;

  const PageTransition = {
    initial: { opacity: 0, x: -30, filter: 'blur(3px)' },
    animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, x: 30, filter: 'blur(3px)' },
    transition: { stiffness: 100, damping: 20, mass: 1, duration: 0.5 }
  };

  const usedIds = new Map();
  let currentMajorHeading = data.title;

  // Find the active section based on the hash
  if (normalizedHash === normalize(data.title) || !normalizedHash) {
    activeSubHeading = null;
    isIntroduction = true;
  } else {
    for (let sub of data.subTitle || []) {
      const subHeadingLower = sub.subHeading.toLowerCase();
      const isGeneric = genericSections.some(g => subHeadingLower.includes(g));
      if (!isGeneric) currentMajorHeading = sub.subHeading;

      const contextualId = currentMajorHeading === sub.subHeading 
        ? sub.subHeading 
        : `${currentMajorHeading}_${sub.subHeading}`;
      
      let normalizedSubHeading = normalize(contextualId);
      
      if (usedIds.has(normalizedSubHeading)) {
        const count = usedIds.get(normalizedSubHeading) + 1;
        usedIds.set(normalizedSubHeading, count);
        normalizedSubHeading = `${normalizedSubHeading}_${count}`;
      } else {
        usedIds.set(normalizedSubHeading, 1);
      }

      if (normalizedSubHeading === normalizedHash) {
        activeSubHeading = sub;
        isIntroduction = false;
        break;
      }
    }
  }

  // Search Logic
  let searchResults = [];
  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase();
    for (let sub of data.subTitle || []) {
      if (sub.data) {
        for (let eachData of sub.data) {
           const matchTitle = eachData.title && eachData.title.toLowerCase().includes(q);
           const matchDesc = eachData.description && eachData.description.some(d => d.toLowerCase().includes(q));
           const matchSub = sub.subHeading && sub.subHeading.toLowerCase().includes(q);
           if (matchTitle || matchDesc || matchSub) {
              searchResults.push({ ...eachData, parentSubHeading: sub.subHeading });
           }
        }
      }
    }
  }

  const renderContentBlock = (item, isMain = false) => {
    return (
      <div key={item.subHeading || item.title || getRandomInt()}>
        <h2 className={classes.title1} style={{ color: darkmode === 'off' ? 'black' : 'white' }}>
          {item.subHeading || item.title}
        </h2>
        {item.data && item.data.map((eachData, idx) => (
          <div key={`data_${idx}_${getRandomInt()}`} className={classes.contentOver}>
            {eachData.title && eachData.title !== item.subHeading && (
              <h3 className={classes.title2}>{eachData.title}</h3>
            )}
            
            {eachData.image && (
              <Container style={{ margin: 0, maxWidth: '100%', width: 'auto', marginBottom: '1.5rem' }}>
                <Row>
                  <Col xs={12} className={classes.flexContainer}>
                    {eachData.image.map((img, i) => (
                      <div key={`img_${i}_${getRandomInt()}`} className={classes.imgWrapper}>
                        <img src={img.image} alt={img.name} className={classes.imgsize} />
                        {img.imgTitle && <p className={classes.imgtext}>{img.imgTitle}</p>}
                      </div>
                    ))}
                  </Col>
                </Row>
              </Container>
            )}

            {eachData.description && eachData.description.map((desc, i) => (
              <p key={`desc_${i}`} style={{ color: darkmode === 'off' ? '#35383d' : '#d1c9c9' }} className={classes.marginBottomdes}>
                {desc}
              </p>
            ))}

            {eachData.details && eachData.details.map((detail, i) => (
              <p key={`detail_${i}`} style={{ color: darkmode === 'off' ? 'black' : '#d1c9c9', fontWeight: 600 }} className={classes.marginBottomdes}>
                {detail}
              </p>
            ))}

            {eachData.persons && eachData.persons.map((person, i) => (
              <Container key={`person_${i}`} style={{ margin: 0, maxWidth: '100%', width: 'auto', marginTop: '3rem' }}>
                <Row>
                  <Col xs={12} md={6}>
                    <h3 className={classes.title2}>{person.imgTitle}</h3>
                    <img src={person.image} alt={person.name} className={classes.imgsize} />
                    <p className={classes.imgtext} style={{ color: darkmode === 'off' ? 'black' : 'white', textAlign: 'center' }}>
                      {person.dob}
                    </p>
                  </Col>
                  <Col xs={12} md={6}>
                    <p style={{ color: darkmode === 'off' ? '#35383d' : '#d1c9c9' }} className={classes.marginBottomdes}>{person.content}</p>
                    {person.heading && <h3 className={classes.title2}>{person.heading}</h3>}
                    <p style={{ color: darkmode === 'off' ? '#35383d' : '#d1c9c9' }} className={classes.marginBottomdes}>{person.description}</p>
                  </Col>
                </Row>
              </Container>
            ))}
          </div>
        ))}

        {/* Root level data for Introduction */}
        {isMain && (
          <div className={classes.contentOver}>
            {data.image && data.image.map((img, i) => (
               <div key={`main_img_${i}`} style={{ marginBottom: '1.5rem' }}>
                  <img src={img.image} alt={img.name} className={classes.imgsize} />
               </div>
            ))}
            {data.description && data.description.map((desc, i) => (
              <p key={`main_desc_${i}`} style={{ color: darkmode === 'off' ? '#35383d' : '#d1c9c9' }} className={classes.marginBottomdes}>
                {desc}
              </p>
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', overflow: 'hidden', padding: '1rem 0' }}>
      {/* Search Input */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Global Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            padding: '10px 20px', borderRadius: '25px',
            border: `1px solid ${darkmode === 'off' ? '#d4af37' : '#8b6b1d'}`,
            backgroundColor: darkmode === 'off' ? 'rgba(255, 255, 255, 0.7)' : '#2b2a2a',
            color: darkmode === 'off' ? '#1a0f0a' : '#d1c9c9',
            outline: 'none', transition: 'all 0.3s ease'
          }}
        />
      </div>

      <AnimatePresence mode="wait">
        {searchQuery.trim() !== '' ? (
          <motion.div key="search" {...PageTransition}>
            {searchResults.length === 0 ? <p>No results found.</p> : searchResults.map((res, i) => (
              <div key={`res_${i}`} className={classes.contentOver} style={{ borderBottom: '1px solid #ddd', paddingBottom: '1rem' }}>
                <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>{res.parentSubHeading}</div>
                <h3 className={classes.title2}>{res.title}</h3>
                {res.description && <p>{res.description[0]}</p>}
                <button onClick={() => {
                   window.location.hash = normalize(`${res.parentSubHeading}_${res.title}`);
                   setSearchQuery('');
                }} className={classes.readMoreBtn}>View Full Topic</button>
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key={normalizedHash || 'intro'}
            {...PageTransition}
          >
            {isIntroduction ? renderContentBlock(data, true) : (
              activeSubHeading ? renderContentBlock(activeSubHeading) : <p>Section Not Found</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
