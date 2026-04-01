import { Container, Row, Col } from 'react-bootstrap';
import { Search } from 'lucide-react';
import { getRandomInt } from '../../utility/uniqueIdGenerator';
import { useOutletContext, useLocation } from 'react-router-dom';
import classes from '../../Stylesheet/ContentComponent.module.css';
import { Context } from '../../Context/contextApi';
import { useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContentComponent() {
  const [data, nameOfContent] = useOutletContext();
  const { darkmode } = useContext(Context);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const hash = location.hash ? decodeURIComponent(location.hash.substring(1)) : null;
  let activeSections = [];
  let isIntroduction = false;

  const normalize = (s) => (s || '').trim().toLowerCase().replace(/[\s,._-]+/g, '_');
  const genericSections = [
    "intro", "background", "course", "outcome", "significance", "conclusion", "sources", "summary", 
    "reign", "legacy", "early", "middle", "later", "history", "administration", "religion", "society",
    "etymology", "origin", "alphabet", "languages", "significance", "cultural", "religious", "architectural", "features", "prominent",
    "excavations", "research", "discoveries", "findings", "phases", "members", "details", "contributions", "implications",
    "முடிவுரை", "பின்னணி", "போக்கு", "முக்கியத்துவம்", "வரலாறு", "நிர்வாகம்", "சமயம்", "பெயர்க்காரணம்", "தோற்றம்", "மொழி", "கலாச்சாரம", "அகழ்வாராய்ச்சி", "ஆராய்ச்சி", "கண்டுபிடிப்புகள்", "கட்டங்கள்", "உறுப்பினர்கள்", "தகவல்கள்", "அறிமுகம்", "விளைவு", "பாடநெறி", "ஆதாரங்கள்", "சான்றுகள்", "சுருக்கம்"
  ];

  const cleanCaption = (text) => {
    if (!text) return '';
    return text.toString().replace(/[\s+]*\d+$/g, '').replace(/\+/g, ' ').trim();
  };

  useEffect(() => {
    if (location.hash) {
      const elementId = normalize(decodeURIComponent(location.hash.substring(1)));
      const timer = setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [location.hash, data]);

  const renderRecursiveData = (items, filterTitle = false) => {
    if (!items || !Array.isArray(items)) return null;

    return items.map((item, index) => {
      const shouldHide = (filterTitle === true) || 
                         (typeof filterTitle === 'string' && normalize(item.title || item.subHeading) === normalize(filterTitle));
      
      return (
        <div key={`item_${index}_${getRandomInt()}`} className={classes.contentItem}>
          {(!shouldHide && (item.title || item.subHeading)) && (
            <h3 className={classes.contentTitle}>{item.title || item.subHeading}</h3>
          )}

        {item.image && (
          <div className={classes.flexContainer}>
            {item.image.map((img, i) => (
              <div key={`img_${i}_${getRandomInt()}`} className={classes.imageWrapper}>
                <img 
                  src={img.image} 
                  alt={img.name || img.title || 'content image'} 
                  className={classes.imgsize}
                />
                {img.imgTitle && (
                  <p className={classes.imageCaption} style={{ color: darkmode === 'off' ? '#5d4037' : '#d4af37' }}>
                    {cleanCaption(img.imgTitle)}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {item.description && item.description.map((desc, i) => (
          <p key={`desc_${i}`} className={classes.contentDescription} style={{ color: darkmode === 'off' ? '#35383d' : '#d1c9c9' }}>
            {desc.split(/<\/br>|<br>|<br\/>/).map((text, j, arr) => (
              <span key={j}>
                {text}
                {j < arr.length - 1 && <br />}
              </span>
            ))}
          </p>
        ))}

        {item.list && (
          <ul className={classes.contentList}>
            {item.list.map((listItem, i) => (
              <li key={`li_${i}`} style={{ color: darkmode === 'off' ? '#35383d' : '#d1c9c9' }}>
                {listItem}
              </li>
            ))}
          </ul>
        )}

        {item.details && item.details.map((detail, i) => (
          <p key={`detail_${i}`} className={classes.contentDescription} style={{ color: darkmode === 'off' ? 'black' : '#d1c9c9', fontWeight: 600 }}>
            {detail}
          </p>
        ))}

        {item.persons && item.persons.map((person, i) => (
          <div key={`person_${i}`} style={{ marginTop: '2rem', borderTop: '1px solid rgba(212, 175, 55, 0.2)', paddingTop: '1rem' }}>
            <h4 className={classes.contentTitle}>{person.imgTitle || person.name}</h4>
            {person.image && <img src={person.image} alt={person.name} style={{ maxWidth: '300px', display: 'block', margin: '1rem auto' }} />}
            <p className={classes.contentDescription}>{person.content || person.description}</p>
          </div>
        ))}

        {item.data && (
          <div className={classes.nestedData}>
            {renderRecursiveData(item.data, filterTitle)}
          </div>
        )}
      </div>
    );
  });
};

  const isGeneralCategory = 
    normalize(nameOfContent) === 'mythology' ||
    normalize(nameOfContent) === 'history' ||
    normalize(nameOfContent) === 'culture' ||
    normalize(nameOfContent) === 'kings' ||
    normalize(nameOfContent) === 'lord' ||
    normalize(nameOfContent) === 'historical_place' ||
    normalize(nameOfContent) === 'excavation';

  if (hash) {
    const normalizedHash = normalize(hash);
    let currentMajorHeading = data.title;

    if (normalizedHash === normalize(data.title)) {
      isIntroduction = true;
      if (data.subTitle) {
        for (let i = 0; i < data.subTitle.length; i++) {
          const isGeneric = genericSections.some(g => data.subTitle[i].subHeading.toLowerCase().includes(g));
          const isRedundant = normalize(data.subTitle[i].subHeading) === normalize(data.title);
          if (isGeneric || isRedundant) {
            activeSections.push(data.subTitle[i]);
          } else {
            break;
          }
        }
      }
    } else {
    const processedSubTitles = (data.subTitle || []).map(sub => {
      const isGeneric = genericSections.some(g => sub.subHeading.toLowerCase().includes(g));
      if (!isGeneric) currentMajorHeading = sub.subHeading;

      const contextualId = currentMajorHeading === sub.subHeading
        ? sub.subHeading
        : `${currentMajorHeading}_${sub.subHeading}`;

      return { ...sub, normalizedSubHeading: normalize(contextualId), isGeneric, majorHeading: currentMajorHeading };
    });

    const targetItem = processedSubTitles.find(s => s.normalizedSubHeading === normalizedHash);
    
    if (targetItem) {
      if (!targetItem.isGeneric) {
        const index = processedSubTitles.indexOf(targetItem);
        activeSections.push(targetItem);
        for (let i = index + 1; i < processedSubTitles.length; i++) {
          if (processedSubTitles[i].isGeneric) {
            activeSections.push(processedSubTitles[i]);
          } else {
            break;
          }
        }
      } else {
        activeSections.push(targetItem);
      }
      isIntroduction = false;
    }
    }

    if (activeSections.length === 0 && !isIntroduction) {
      isIntroduction = true;
    }
  } else {
    const hasDescription = data.description && data.description.length > 0 && data.description[0].trim().length > 0;
    
    if (hasDescription) {
      isIntroduction = true;
      if (data.subTitle && data.subTitle.length > 0) {
        for (let i = 0; i < data.subTitle.length; i++) {
          const isGeneric = genericSections.some(g => data.subTitle[i].subHeading.toLowerCase().includes(g));
          const isRedundant = normalize(data.subTitle[i].subHeading) === normalize(data.title);
          if (isGeneric || isRedundant) {
            activeSections.push(data.subTitle[i]);
          } else {
            break;
          }
        }
      }
    } else if (data.subTitle && data.subTitle.length > 0) {
      activeSections = [data.subTitle[0]];
      for (let i = 1; i < data.subTitle.length; i++) {
        const isGeneric = genericSections.some(g => data.subTitle[i].subHeading.toLowerCase().includes(g));
        if (isGeneric) {
          activeSections.push(data.subTitle[i]);
        } else {
          break;
        }
      }
      isIntroduction = false;
    } else {
      isIntroduction = true;
    }
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
      <div className={classes.searchContainer}>
        <div style={{ position: 'relative', width: 'auto', minWidth: '350px' }}>
          <Search 
            className={classes.searchIcon} 
            size={20}
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: darkmode === 'off' ? '#8b4513' : '#d4af37',
              zIndex: 10,
              opacity: 0.7
            }}
          />
          <input
            type="text"
            placeholder="Global Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={classes.searchInput}
            style={{
              border: `2px solid ${darkmode === 'off' ? '#d4af37' : '#8b6b1d'}`,
              backgroundColor: darkmode === 'off' ? 'rgba(255, 255, 255, 0.9)' : '#2b2a2a',
              color: darkmode === 'off' ? '#1a0f0a' : '#d1c9c9',
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && searchResults.length > 0) {
                const firstMatch = searchResults[0];
                if (firstMatch.contextualId) {
                  window.location.hash = normalize(firstMatch.contextualId);
                  setSearchQuery('');
                }
              }
            }}
          />
        </div>
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
                        <div key={`${eachImg.name}_${getRandomInt()}`} className={classes.imageWrapper}>
                          <img
                            src={eachImg.image}
                            alt={eachImg.name}
                            className={classes.imgsize}
                          />
                          {eachImg.imgTitle && (
                            <p className={classes.imageCaption} style={{ color: darkmode === 'off' ? '#5d4037' : '#d4af37' }}>
                              {cleanCaption(eachImg.imgTitle)}
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

            {activeSections.length > 0 && (
              <div style={{ marginTop: '3rem' }}>
                {activeSections.map((section, idx) => {
                  const isRedundant = normalize(data.title) === normalize(section.subHeading);
                  const contextualId = isRedundant 
                    ? section.subHeading 
                    : `${data.title}_${section.subHeading}`;
                  return (
                    <div key={idx} id={normalize(contextualId)} style={{ scrollMarginTop: '100px' }}>
                      {renderRecursiveData([section], isRedundant)}
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key={activeSections.length > 0 ? activeSections[0].subHeading : 'empty'}
            initial={PageTransition.initial}
            animate={PageTransition.animate}
            exit={PageTransition.exit}
            transition={PageTransition.transition}
            className={classes.contentOver}
          >
            {activeSections.length > 0 ? activeSections.map((section, sectionIdx) => (
              <div key={section.subHeading || sectionIdx}>
                {section.subHeading && (
                  <h3 className={classes.title1} style={{ borderBottom: '2px solid rgba(212, 175, 55, 0.4)', paddingBottom: '10px', marginBottom: '40px', opacity: 0.9 }}>
                    {section.subHeading}
                  </h3>
                )}

                {!isGeneralCategory && 
                 sectionIdx === 0 &&
                 data.subTitle && 
                 normalize(section.majorHeading || section.subHeading) === normalize(data.title) && (
                  <div style={{ marginBottom: '3rem' }}>
                    {data.image && data.image.length > 0 && (
                      <Container style={{ margin: '0 0 2rem 0', maxWidth: '100%', width: 'auto' }}>
                        <Row>
                          <Col xs={12}>
                            <div className={data.image.length > 1 ? classes.flexContainer : classes.flexContainerSingle}>
                              {data.image.map((eachImg) => (
                                <div key={`${eachImg.name}_root_${getRandomInt()}`}>
                                  <img
                                    src={eachImg.image}
                                    alt={eachImg.name}
                                    className={classes.imgsize}
                                  />
                                  {eachImg.imgTitle && (
                                    <p className={classes.imgtext} style={{ color: darkmode === 'off' ? 'black' : 'white' }}>
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
                    {data.description && data.description.map((descriptionArray, idx) => (
                      <p
                        key={`root_desc_${idx}`}
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
                  </div>
                )}

                {section.data ? renderRecursiveData(section.data, section.subHeading) : (
                  <div className={classes.contentOver}>
                    {section.description && section.description.map((desc, i) => (
                      <p key={i} className={classes.contentDescription} style={{ color: darkmode === 'off' ? '#35383d' : '#d1c9c9' }}>
                        {desc.split(/<\/br>|<br>|<br\/>/).map((text, j, arr) => (
                          <span key={j}>
                            {text}
                            {j < arr.length - 1 && <br />}
                          </span>
                        ))}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            )) : <p>Section Not Found</p>}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
