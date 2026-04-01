import { getRandomInt } from '../../../utility/uniqueIdGenerator';
import { useOutletContext, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import classes from '../../../Stylesheet/ContentComponent.module.css';
import { Context } from '../../../Context/contextApi';
import { useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExcavationComponent() {
  const [data] = useOutletContext();
  const { darkmode } = useContext(Context);
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const normalize = (s) => (s || '').trim().toLowerCase().replace(/[\s,._-]+/g, '_');
  const genericSections = [
    "intro", "background", "course", "outcome", "significance", "conclusion", "sources", "summary", 
    "reign", "legacy", "early", "middle", "later", "history", "administration", "religion", "society",
    "etymology", "origin", "alphabet", "languages", "significance", "cultural", "religious", "architectural", "features", "prominent",
    "excavations", "research", "discoveries", "findings", "phases", "members", "details", "contributions", "implications",
    "முடிவுரை", "பின்னணி", "போக்கு", "முக்கியத்துவம்", "வரலாறு", "நிர்வாகம்", "சமயம்", "பெயர்க்காரணம்", "தோற்றம்", "மொழி", "கலாச்சாரம", "அகழ்வாராய்ச்சி", "ஆராய்ச்சி", "கண்டுபிடிப்புகள்", "கட்டங்கள்", "உறுப்பினர்கள்", "தகவல்கள்", "அறிமுகம்"
  ];

  const hash = location.hash ? decodeURIComponent(location.hash.substring(1)) : null;
  const normalizedHash = hash ? normalize(hash) : null;

  let isIntroduction = false;

  const PageTransition = {
    initial: { opacity: 0, x: -30, filter: 'blur(3px)' },
    animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
    exit: { opacity: 0, x: 30, filter: 'blur(3px)' },
    transition: { stiffness: 100, damping: 20, mass: 1, duration: 0.5 }
  };

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

  const usedIds = new Map();
  let currentMajorHeading = data.title;

  let activeSections = [];
  const processedSubTitles = (data.subTitle || []).map(sub => {
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

    return { ...sub, normalizedSubHeading, isGeneric, majorHeading: currentMajorHeading, normalizedMajorHash: normalize(currentMajorHeading) };
  });

  if (normalizedHash === normalize(data.title) || !normalizedHash) {
    isIntroduction = true;
  } else {
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

  const renderRecursiveData = (items) => {
    if (!items || !Array.isArray(items)) return null;

    return items.map((item, index) => (
      <div key={`data_${index}_${getRandomInt()}`} className={classes.contentOver}>
        {(item.title || item.subHeading) && (
          <h3 className={classes.title2}>{item.title || item.subHeading}</h3>
        )}
        
        {item.image && (
          <Container style={{ margin: 0, maxWidth: '100%', width: 'auto', marginBottom: '1.5rem' }}>
            <Row>
              <Col xs={12} className={classes.flexContainer}>
                {item.image.map((img, i) => (
                  <div key={`img_${i}_${getRandomInt()}`} className={classes.imgWrapper}>
                    <img src={img.image} alt={img.name || img.title || 'content image'} className={classes.imgsize} />
                    {img.imgTitle && (
                      <p className={classes.imageCaption} style={{ color: darkmode === 'off' ? '#5d4037' : '#d4af37' }}>
                        {cleanCaption(img.imgTitle)}
                      </p>
                    )}
                  </div>
                ))}
              </Col>
            </Row>
          </Container>
        )}

        {item.description && item.description.map((desc, i) => (
          <p key={`desc_${i}`} style={{ color: darkmode === 'off' ? '#35383d' : '#d1c9c9' }} className={classes.marginBottomdes}>
            {desc}
          </p>
        ))}

        {item.details && item.details.map((detail, i) => (
          <p key={`detail_${i}`} style={{ color: darkmode === 'off' ? 'black' : '#d1c9c9', fontWeight: 600 }} className={classes.marginBottomdes}>
            {detail}
          </p>
        ))}

        {item.persons && item.persons.map((person, i) => (
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

        {item.data && renderRecursiveData(item.data)}
      </div>
    ));
  };

  const renderContentBlock = (item, isMain = false) => {
    return (
      <div key={item.subHeading || item.title || getRandomInt()}>
        <h2 className={classes.title1} style={{ color: darkmode === 'off' ? 'black' : 'white' }}>
          {item.subHeading || item.title}
        </h2>
        
        {item.data ? renderRecursiveData(item.data) : (
          <div className={classes.contentOver}>
             {item.image && item.image.map((img, i) => (
                <div key={`root_img_${i}`} style={{ marginBottom: '1.5rem' }}>
                   <img src={img.image} alt={img.name} className={classes.imgsize} />
                </div>
             ))}
             {item.description && item.description.map((desc, i) => (
               <p key={`root_desc_${i}`} style={{ color: darkmode === 'off' ? '#35383d' : '#d1c9c9' }} className={classes.marginBottomdes}>
                 {desc}
               </p>
             ))}
          </div>
        )}

        {isMain && !item.data && (
           <p className={classes.marginBottomdes}>No specific data blocks found.</p>
        )}
      </div>
    )
  }

  return (
    <div style={{ position: 'relative', overflow: 'hidden', padding: '1rem 0' }}>
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
              activeSections.length > 0 ? activeSections.map(section => renderContentBlock(section)) : <p>Section Not Found</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
