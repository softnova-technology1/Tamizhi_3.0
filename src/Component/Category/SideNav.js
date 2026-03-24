import { getRandomInt } from '../../utility/uniqueIdGenerator';
import classes from '../../Stylesheet/SideNav.module.css';
import { Context } from '../../Context/contextApi';
import { useContext } from 'react';
import { useLocation } from 'react-router-dom';

export default function SideNav({ data, nameOfContent, handleReadMore = () => {} }) {
  const { darkmode } = useContext(Context);
  const location = useLocation();

  const genericSections = [
    "intro", "background", "course", "outcome", "significance", "conclusion", "sources", "summary", 
    "reign", "legacy", "early", "middle", "later", "history", "administration", "religion", "society",
    "etymology", "origin", "alphabet", "languages", "significance", "cultural", "religious", "architectural", "features", "prominent",
    "excavations", "research", "discoveries", "findings", "phases", "members", "details",
    "முடிவுரை", "பின்னணி", "போக்கு", "முக்கியத்துவம்", "வரலாறு", "நிர்வாகம்", "சமயம்", "பெயர்க்காரணம்", "தோற்றம்", "மொழி", "கலாச்சாரம்", "அகழ்வாராய்ச்சி", "ஆராய்ச்சி", "கண்டுபிடிப்புகள்", "கட்டங்கள்", "உறுப்பினர்கள்", "தகவல்கள்"
  ];
  let currentMajorHeading = data.title;
  const normalize = (s) => (s || '').trim().toLowerCase().replace(/[\s,._-]+/g, '_');

  return (
    <div>
      <h1
        className={classes.maintitle}
        style={{ color: darkmode === 'off' ? 'black' : 'white' }}
      >
        {data.title}
      </h1>
      
      {data.subTitle &&
        (() => {
          let currentMajorHeading = data.title;
          const displayItems = [...data.subTitle];
          const usedIds = new Map(); // To detect collisions

          // Heuristic: if the first item is generic, or its heading is not the title, unshift the title as a "Introduction/Home" button
          const firstSubHeading = displayItems[0] && displayItems[0].subHeading ? displayItems[0].subHeading.toLowerCase() : '';
          const isFirstGeneric = genericSections.some(g => firstSubHeading.includes(g));
          const isFirstTitleMatch = displayItems[0] && normalize(displayItems[0].subHeading) === normalize(data.title);
          
          if (displayItems.length > 0 && (isFirstGeneric || !isFirstTitleMatch)) {
            displayItems.unshift({ subHeading: data.title, isVirtual: true });
          }

          return displayItems.map((item, index) => {
            if (!item.subHeading) {
              return null;
            }

            const isGeneric = genericSections.some(g => item.subHeading.toLowerCase().includes(g)) && !item.isVirtual;
            if (!isGeneric) currentMajorHeading = item.subHeading;

            let contextualId = (item.isVirtual || currentMajorHeading === item.subHeading)
              ? currentMajorHeading 
              : `${currentMajorHeading}_${item.subHeading}`;
            
            // Deduplicate if needed
            let normalizedHeading = normalize(contextualId);
            if (usedIds.has(normalizedHeading)) {
              const count = usedIds.get(normalizedHeading) + 1;
              usedIds.set(normalizedHeading, count);
              normalizedHeading = `${normalizedHeading}_${count}`;
            } else {
              usedIds.set(normalizedHeading, 1);
            }

            const targetHash = `#${normalizedHeading}`;
            const currentHash = normalize(decodeURIComponent(location.hash).substring(1));
            const isDefaultActive = (!location.hash || location.hash === "#") && index === 0;
            const isActive = currentHash === normalizedHeading || isDefaultActive;
            
            const parentHash = normalize(currentMajorHeading);
            const isGroupActive = currentHash.startsWith(parentHash) || (!location.hash && currentMajorHeading === data.title);

            if (isGeneric && !isGroupActive) {
              return null;
            }

            return (
              <div key={`${item.subHeading}_${index}`} style={{ 
                marginBottom: isGeneric ? '0.4rem' : '1.2rem',
                paddingLeft: isGeneric ? '1.5rem' : '0px',
                borderLeft: isGeneric && isGroupActive ? '2px solid rgba(212, 175, 55, 0.3)' : 'none',
                marginLeft: isGeneric ? '0.5rem' : '0px'
              }}>
                <a
                  href={targetHash}
                  style={{
                    textDecoration: 'none',
                    display: 'block',
                    width: '100%',
                  }}
                >
                  <button
                    className={classes.clickbtn}
                    style={{
                      backgroundColor: isActive 
                          ? '#5d4037' 
                          : 'transparent',
                      color: isActive 
                          ? '#ffffff'
                          : (darkmode === 'off' ? '#5d4037' : '#d1c9c9'),
                      border: isActive 
                          ? '2px solid #5d4037' 
                          : `1px solid ${darkmode === 'off' ? (isGeneric ? '#e1e1e1' : '#d4af37') : '#444'}`,
                      width: '100%',
                      textAlign: 'left',
                      padding: isGeneric ? '8px 12px' : '12px 16px',
                      borderRadius: isGeneric ? '6px' : '10px',
                      fontSize: isGeneric ? '0.9rem' : '1.05rem',
                      fontWeight: isGeneric ? '600' : '800',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transform: isActive ? 'translateX(8px)' : 'translateX(0px)',
                      boxShadow: isActive 
                          ? '0 6px 20px rgba(93, 64, 55, 0.3)' 
                          : 'none',
                      zIndex: isActive ? 10 : 1,
                      position: 'relative'
                    }}
                    onMouseOver={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.1)';
                        e.currentTarget.style.borderColor = '#d4af37';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.borderColor = darkmode === 'off' ? (isGeneric ? '#e1e1e1' : '#d4af37') : '#444';
                      }
                    }}
                    onClick={(event) => handleReadMore(event)}
                  >
                    <span style={{ 
                      textTransform: isGeneric ? 'capitalize' : 'uppercase',
                      letterSpacing: isGeneric ? '0px' : '0.4px'
                    }}>
                      {item.subHeading}
                    </span>
                    {isActive && (
                      <div style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: '#ffd700',
                        boxShadow: '0 0 8px #ffd700'
                      }} />
                    )}
                  </button>
                </a>
              </div>
            );
          });
        })()}
    </div>
  );
}
