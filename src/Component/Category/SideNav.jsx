import classes from '../../Stylesheet/SideNav.module.css';
import { Context } from '../../Context/contextApi';
import { useContext, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SideNav({ data, nameOfContent, handleReadMore = () => {} }) {
  const { darkmode, language } = useContext(Context);
  const location = useLocation();
  const navigate = useNavigate();

  // Animation refs for auto-scrolling mobile SideNav tabs
  const scrollContainerRef = useRef(null);
  const scrollState = useRef({ isHovered: false, direction: 1 });

  useEffect(() => {
    // Apply auto-scroll logic uniquely for mobile and tablet views
    const checkWidth = () => window.innerWidth <= 991;
    if (!checkWidth()) return;

    let animationId;
    const scrollStep = 0.5; // pixel per frame speed
    
    const animateScroll = () => {
      const container = scrollContainerRef.current;
      if (container && !scrollState.current.isHovered) {
         // Ping-pong scrolling boundary conditions
         if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 1) {
            scrollState.current.direction = -1; // Change to scroll left
         } else if (container.scrollLeft <= 0) {
            scrollState.current.direction = 1; // Change to scroll right
         }
         
         container.scrollLeft += scrollStep * scrollState.current.direction;
      }
      animationId = requestAnimationFrame(animateScroll);
    };

    animationId = requestAnimationFrame(animateScroll);

    return () => cancelAnimationFrame(animationId);
  }, [data]);

  const categoryTitles = {
    en: {
      history: 'History',
      kings: 'Kings',
      war: 'War',
      culture: 'Culture',
      temple: 'Temple',
      architecture: 'Architecture',
      historical_place: 'Historical Place',
      poet: 'Poet',
      books: 'Books',
      lord: 'Lord',
      excavation: 'Excavation',
      mythology: 'Mythology'
    },
    ta: {
      history: 'வரலாறு',
      kings: 'அரசர்கள்',
      war: 'போர்',
      culture: 'கலாச்சாரம்',
      temple: 'கோவில்',
      architecture: 'கட்டிடக்கலை',
      historical_place: 'வரலாற்று இடம்',
      poet: 'கவிஞர்',
      books: 'புத்தகங்கள்',
      lord: 'இறைவன்',
      excavation: 'அகழ்வாராய்ச்சி',
      mythology: 'புராணம்'
    }
  };

  const displayTitle = (nameOfContent && categoryTitles[language] && categoryTitles[language][nameOfContent.toLowerCase()]) 
    ? categoryTitles[language][nameOfContent.toLowerCase()] 
    : data?.title || '';

  const genericSections = [
    "intro", "background", "course", "outcome", "significance", "conclusion", "sources", "summary", 
    "reign", "legacy", "early", "middle", "later", "history", "administration", "religion", "society",
    "etymology", "origin", "alphabet", "languages", "significance", "cultural", "religious", "architectural", "features", "prominent",
    "excavations", "research", "discoveries", "findings", "phases", "members", "details", "contributions", "implications",
    "முடிவுரை", "பின்னணி", "போக்கு", "முக்கியத்துவம்", "வரலாறு", "நிர்வாகம்", "சமயம்", "பெயர்க்காரணம்", "தோற்றம்", "மொழி", "கலாச்சாரம", "அகழ்வாராய்ச்சி", "ஆராய்ச்சி", "கண்டுபிடிப்புகள்", "கட்டங்கள்", "உறுப்பினர்கள்", "தகவல்கள்", "அறிமுகம்"
  ];


  return (
    <div>
      <h1
        className={classes.maintitle}
        style={{ color: darkmode === 'off' ? 'black' : 'white' }}
      >
        {displayTitle}
      </h1>
      
      {(() => {
        const normalize = (s) => (s || '').trim().toLowerCase().replace(/[\s,._-]+/g, '_');
        const introLabel = language === 'en' ? 'Introduction' : 'அறிமுகம்';
        
        let displayItems = [];
        
        // 1. Add Introduction if data has description AND it's a general category intro
        const isGeneralCategory = 
          normalize(nameOfContent) === 'mythology' ||
          normalize(nameOfContent) === 'history' ||
          normalize(nameOfContent) === 'culture' ||
          normalize(nameOfContent) === 'kings' ||
          normalize(nameOfContent) === 'lord' ||
          normalize(nameOfContent) === 'historical_place' ||
          normalize(nameOfContent) === 'excavation';

        // Land on the first subheading by default for specific items (Architecture, War, Books)
        // Only show "Introduction" if it's a general category that needs an overview
        const shouldShowIntro = data.description && 
                               data.description.length > 0 && 
                               data.description[0].trim().length > 0 &&
                               isGeneralCategory;
        
        if (shouldShowIntro) {
          displayItems.push({
            subHeading: introLabel,
            isIntro: true,
            id: normalize(data.title)
          });
        }
        
        // 2. Add subTitles, filtering out redundant ones ONLY if intro button is shown
        if (data.subTitle) {
          data.subTitle.forEach(item => {
            if (!item.subHeading) return;
            // Avoid duplicate buttons if we already have a root button with this exact name
            const isRedundant = normalize(item.subHeading) === normalize(data.title);
            if (!isRedundant || !shouldShowIntro) {
              displayItems.push(item);
            }
          });
        }

        // 3. Logic to determine IDs and track active state
        const usedIds = new Map();
        let currentMajorHeading = data.title;
        const processedItems = displayItems.map((item) => {
          if (item.isIntro) {
            return { ...item, normalizedHeading: item.id };
          }

          const isGeneric = genericSections.some(g => item.subHeading.toLowerCase().includes(g));
          if (!isGeneric) currentMajorHeading = item.subHeading;

          const contextualId = currentMajorHeading === item.subHeading
            ? item.subHeading
            : `${currentMajorHeading}_${item.subHeading}`;
          
          let normalizedHeading = normalize(contextualId);
          if (usedIds.has(normalizedHeading)) {
            const count = usedIds.get(normalizedHeading) + 1;
            usedIds.set(normalizedHeading, count);
            normalizedHeading = `${normalizedHeading}_${count}`;
          } else {
            usedIds.set(normalizedHeading, 1);
          }

          return { ...item, normalizedHeading, isGeneric, currentMajorHeading };
        });

        // 4. Identify the active item index
        const currentHash = normalize(decodeURIComponent(location.hash).substring(1));
        let activeIndex = processedItems.findIndex(item => item.normalizedHeading === currentHash);
        
        // Default to index 0 if no hash matches
        if (activeIndex === -1) activeIndex = 0;

        // 5. Render logic (removed the move-to-top logic as requested)
        return (
          <div 
             className={classes.navItemsContainer}
             ref={scrollContainerRef}
             onTouchStart={() => { scrollState.current.isHovered = true; }}
             onTouchEnd={() => { setTimeout(() => { scrollState.current.isHovered = false; }, 3000); }}
             onMouseEnter={() => { scrollState.current.isHovered = true; }}
             onMouseLeave={() => { setTimeout(() => { scrollState.current.isHovered = false; }, 1000); }}
          >
            {processedItems.map((item, index) => {
          const targetHash = `#${item.normalizedHeading}`;
          const isActive = index === activeIndex;
          
          // Secondary active check for group active logic (for generics)
          const isGroupActive = currentHash.startsWith(normalize(item.currentMajorHeading)) || 
                                (!location.hash && (
                                  normalize(item.currentMajorHeading) === normalize(data.title) || 
                                  normalize(item.currentMajorHeading) === normalize(processedItems[0]?.currentMajorHeading)
                                ));

          if (item.isGeneric && !isGroupActive) {
            return null;
          }

          return (
            <div key={`${item.subHeading}_${index}`} className={classes.navItemWrapper} style={{ 
              marginBottom: item.isGeneric ? '0.6rem' : '1.8rem',
              paddingLeft: item.isGeneric ? '1.5rem' : '0px',
              borderLeft: item.isGeneric && isGroupActive ? '2px solid rgba(212, 175, 55, 0.3)' : 'none',
              marginLeft: item.isGeneric ? '0.5rem' : '0px'
            }}>
              <a
                href={targetHash}
                style={{
                  textDecoration: 'none',
                  display: 'block',
                  width: '100%',
                }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(targetHash, { replace: true });
                  
                  // For mobile/tablet, smooth scroll to the top of the content Container
                  // so the user sees the new content gracefully appearing.
                  if (window.innerWidth <= 991) {
                    const navContainer = document.querySelector(`.${classes.navItemsContainer}`);
                    if (navContainer) {
                      const y = navContainer.getBoundingClientRect().top + window.scrollY - 20;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  } else {
                    // On desktop, scroll back to the top of the contentWrapper or to 0 if it was scrolled far down
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              >
                <button
                  className={`${classes.clickbtn} ${isActive ? classes.activeBtn : ''}`}
                  style={{
                    '--active-text-mobile': darkmode === 'off' ? '#5d4037' : '#d4af37',
                    backgroundColor: isActive 
                        ? (darkmode === 'off' ? '#5d4037' : '#d4af37') 
                        : 'transparent',
                    color: isActive 
                        ? '#ffffff'
                        : (darkmode === 'off' ? '#5d4037' : '#d1c9c9'),
                    border: isActive 
                        ? (darkmode === 'off' ? '1.5px solid #5d4037' : '1.5px solid #d4af37') 
                        : (darkmode === 'off' ? '1px solid rgba(93, 64, 55, 0.2)' : '1px solid rgba(212, 175, 55, 0.2)'),
                    width: '100%',
                    textAlign: 'left',
                    padding: item.isGeneric ? '12px 16px' : '18px 24px',
                    borderRadius: item.isGeneric ? '8px' : '12px',
                    fontSize: item.isGeneric ? '1.4rem' : '1.7rem',
                    fontWeight: item.isGeneric ? '600' : '800',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transform: isActive ? 'translateX(5px)' : 'scale(1)',
                    boxShadow: 'none',
                    zIndex: isActive ? 10 : 1,
                    position: 'relative'
                  }}
                  onMouseOver={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.transform = 'translateY(0px)';
                    }
                  }}
                  onClick={(event) => {
                    handleReadMore(event);
                  }}
                >
                  <span style={{ 
                    textTransform: item.isGeneric ? 'capitalize' : 'uppercase',
                    letterSpacing: item.isGeneric ? '0px' : '0.5px'
                  }}>
                    {item.subHeading}
                  </span>
                  {isActive && (
                    <div className={classes.activeDot} style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: '#ffd700',
                      boxShadow: '0 0 12px #ffd700',
                      marginLeft: '10px'
                    }} />
                  )}
                </button>
              </a>
            </div>
          );
        })}
        </div>
        );
      })()}
    </div>
  );
}
