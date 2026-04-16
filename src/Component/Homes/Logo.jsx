import React, { useLayoutEffect, useRef, useContext, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import styles from '../../Stylesheet/Logo.module.css';
import { Context } from '../../Context/contextApi';
import ScrollTitle from './ScrollTitle';
import {
    MdOutlineWbSunny,
    MdAccountBalance,
    MdEmojiPeople,
    MdMenuBook,
    MdMap,
    MdTranslate,
    MdHistoryEdu
} from 'react-icons/md';
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const infoData = [
    {
        id: 'nature',
        titleTn: 'இயற்கை வாழ்க்கை',
        titleEn: 'Nature Living',
        img: "https://tamizhiv2.s3.eu-north-1.amazonaws.com/tamizhi2-0/logoD2.webp",
        icon: <MdOutlineWbSunny />,
        tamilHighlight: 'இயற்கையே எமது முதல் ஆசான்',
        meaningTn: 'தமிழர் வாழ்வியல் ஐந்திணைகளை அடிப்படையாகக் கொண்டது. குறிஞ்சி, முல்லை, மருதம், நெய்தல், பாலை என நிலத்தை தரம் பிரித்து இயற்கையோடு இசைந்து வாழ்ந்தனர். நீர் மேலாண்மை மற்றும் பனை மரங்கள் நமது வாழ்வியலின் உயிர்நாடி.',
        meaningEn: 'Tamil life is rooted in the "Ainthinai" (five landscapes). Our ancestors lived in harmony with nature, categorizing lands into Kurinji, Mullai, Marutham, Neithal, and Paalai. Water management and the sturdy Palm tree symbolize our resilience.',
        cx: 50, cy: 22
    },
    {
        id: 'temple',
        titleTn: 'தமிழர் கட்டிடக்கலை',
        titleEn: 'Temple Architecture',
        img: "https://tamizhiv2.s3.eu-north-1.amazonaws.com/tamizhi2-0/logoD4.webp",
        icon: <MdAccountBalance />,
        tamilHighlight: 'கல்லிலே கவிதை வடித்த கலை',
        meaningTn: 'திராவிடக் கட்டிடக்கலையின் உச்சம் தமிழர்களின் கோயில்கள். கல்லிலே கவிதை வடித்தவர்கள் நம் முன்னோர். தஞ்சைப் பெரிய கோயில் முதல் மதுரை மீனாட்சி கோயில் வரை அறிவியல், வானியல் மற்றும் கலை ஆகியவற்றின் சங்கமம் இவை.',
        meaningEn: 'The pinnacle of Dravidian architecture is found in our temples. From the Big Temple of Thanjavur to Madurai Meenakshi, these structures are marvels of engineering, astronomy, and divine art carved in stone.',
        cx: 22, cy: 40
    },
    {
        id: 'statue',
        titleTn: 'கலை & நடனம்',
        titleEn: 'Arts & Dance',
        img: "https://tamizhiv2.s3.eu-north-1.amazonaws.com/tamizhi2-0/logoD1.webp",
        icon: <MdEmojiPeople />,
        tamilHighlight: 'ஆடல் வல்லான் அருளிய நடனம்',
        meaningTn: 'பரதநாட்டியம் மற்றும் நாட்டுப்புறக் கலைகள் நமது பண்பாட்டின் பிரதிபலிப்பு. ஐம்பொன் சிலைகள் தமிழர்களின் உலோகவியல் அறிவிற்குச் சான்று. ஆடல் வல்லான் நடராஜரின் வடிவம் பிரபஞ்ச இயக்கத்தின் குறியீடு.',
        meaningEn: 'Bharatanatyam and folk arts reflect our vibrant spirit. Chola bronze sculptures are benchmarks of metallurgy. The Nataraja form (Lord of Dance) symbolizes the cosmic cycle of creation and destruction.',
        cx: 78, cy: 40
    },
    {
        id: 'palm',
        titleTn: 'பழமையான அறிவு',
        titleEn: 'Ancient Wisdom',
        img: "https://tamizhiv2.s3.eu-north-1.amazonaws.com/tamizhi2-0/logoD3.webp",
        icon: <MdMenuBook />,
        tamilHighlight: 'அழியாத அறிவின் கருவூலம்',
        meaningTn: 'ஓலைச்சுவடிகள் தமிழரின் அறிவுக் கருவூலங்கள். மருத்துவம், வானியல், இலக்கியம் என அனைத்தும் ஏடுகளில் பாதுகாக்கப்பட்டன. 2000 ஆண்டுகளுக்கு முந்தைய தகவல்களை இன்றும் நாம் அறியச் செய்வது ஓலைச்சுவடிகளே.',
        meaningEn: 'Palm leaf manuscripts are the treasure houses of Tamil wisdom. Literature, medicine, and ethics were painstakingly preserved on these strips, bridging the gap between our glorious past and the digital future.',
        cx: 15, cy: 58
    },
    {
        id: 'tamil',
        titleTn: 'மொழி பெருமை',
        titleEn: 'Tamil Pride',
        img: "https://tamizhiv2.s3.eu-north-1.amazonaws.com/tamizhi2-0/logoD5.webp",
        icon: <MdTranslate />,
        tamilHighlight: 'கல் தோன்றி மண் தோன்றாக் காலத்து மொழி',
        meaningTn: 'உலகில் இன்று வழக்கில் உள்ள மிகப்பழமையான செம்மொழி தமிழ். "யாதும் ஊரே யாவரும் கேளிர்" என்ற உலகளாவிய தத்துவத்தை உலகுக்குத் தந்த மொழி. எழுத்து, ஆணிவேர் மற்றும் தமிழரின் அடையாளம் இதுவே.',
        meaningEn: 'Tamil is one of the world\'s oldest living classical languages. It gifted humanity the philosophy of "Everyone is kin, everywhere is home." It is the heartbeat of our global identity and cultural root.',
        cx: 50, cy: 50
    },
    {
        id: 'map',
        titleTn: 'தமிழர் அடையாளம்',
        titleEn: 'Tamil Identity',
        img: "https://tamizhiv2.s3.eu-north-1.amazonaws.com/tamizhi2-0/logoD6.webp",
        icon: <MdMap />,
        tamilHighlight: 'நிலமும் மக்களும் எமது பலம்',
        meaningTn: 'குமரிக்கண்டம் முதல் நவீன தமிழகம் வரை பரந்து விரிந்த நமது நிலம். கீழடி மற்றும் ஆதிச்சநல்லூர் அகழ்வாய்வுகள் தமிழரின் தொன்மையை உலகிற்குப் பறைசாற்றுகின்றன. கடல் கடந்து வாணிபம் செய்த வீரப் பரம்பரை இது.',
        meaningEn: 'From Ancient Lemuria to modern Tamil Nadu, our land defines us. Excavations at Keeladi and Adichanallur prove our urban sophistication dating back millennia. Ours is a seafaring legacy of global commerce and bravery.',
        cx: 82, cy: 65
    },
    {
        id: 'grammar',
        titleTn: 'ஐந்திலக்கணம்',
        titleEn: 'LITERARY WISDOM',
        img: "https://tamizhiv2.s3.eu-north-1.amazonaws.com/tamizhi2-0/Five-tamil.webp",
        icon: <MdHistoryEdu />,
        tamilHighlight: 'கலை, மொழி, பெருமை, பண்பாடு, மரபு',
        meaningTn: 'கலை, மொழி, பெருமை, பண்பாடு, மரபு — தமிழின் அடையாளத்தை உருவாக்கும் ஐந்து அம்சங்கள்; அழகு, அறிவு, வரலாறு, வாழ்க்கை முறைகள் அனைத்தையும் ஒன்றாக இணைக்கும் செம்மையான பாரம்பரியம்.',
        meaningEn: 'Art, Language, Pride, Culture, and Tradition — the five pillars that shape Tamil identity; a timeless heritage that unites beauty, knowledge, history, and ways of life into one harmonious legacy.',
        cx: 50, cy: 82
    }
];

const Logo = () => {
    const { language } = useContext(Context);
    const [activeId, setActiveId] = useState(null);
    const containerRef = useRef(null);
    const scrollRef = useRef(null);
    const logoRef = useRef(null);

    useLayoutEffect(() => {
        let mm = gsap.matchMedia();

        mm.add("(min-width: 1025px)", () => {
            const sections = gsap.utils.toArray(`.${styles.cardWrapper}`);
            const scrollTween = gsap.to(sections, {
                x: () => -(scrollRef.current.scrollWidth - scrollRef.current.offsetWidth),
                ease: "none",
                scrollTrigger: {
                    id: "logoScroll",
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 1.5,
                    snap: {
                        snapTo: 1 / (sections.length - 1),
                        duration: { min: 0.2, max: 0.8 },
                        delay: 0.1,
                        ease: "power2.inOut"
                    },
                    start: "top top",
                    end: () => `+=${scrollRef.current.scrollWidth - scrollRef.current.offsetWidth}`,
                    invalidateOnRefresh: true,
                    anticipatePin: 1,
                    onUpdate: (self) => {
                        const index = Math.round(self.progress * (sections.length - 1));
                        if (infoData[index]) {
                            const newId = infoData[index].id;
                            setActiveId(prev => (prev !== newId ? newId : prev));
                        }
                    }
                }
            });
            sections.forEach((section, i) => {
                const card = section.querySelector(`.${styles.palmLeafCard}`);
                gsap.to(card, {
                    scale: 1.12,
                    duration: 0.5,
                    overwrite: "auto",
                    scrollTrigger: {
                        trigger: section,
                        containerAnimation: scrollTween,
                        start: "left 60%",
                        end: "left 40%",
                        scrub: 1,
                    }
                });
            });

            gsap.to(logoRef.current, {
                filter: "drop-shadow(0 0 50px rgba(201, 163, 78, 0.7))",
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        });
        mm.add("(max-width: 1024px)", () => {
            gsap.utils.toArray(`.${styles.cardWrapper}`).forEach((card, i) => {
                gsap.from(card, {
                    opacity: 0,
                    y: 50,
                    duration: 1,
                    scrollTrigger: {
                        trigger: card,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    }
                });
            });
        });

        return () => mm.revert();
    }, []);

    const scrollToCard = (index) => {
        const st = ScrollTrigger.getById('logoScroll');
        if (st) {
            const total = st.end - st.start;
            const target = st.start + (index / (infoData.length - 1)) * total;
            gsap.to(window, {
                scrollTo: { y: target },
                duration: 1.5,
                ease: "power2.inOut"
            });
        }
    };

    return (
        <section
            className={styles.horizontalLogoStory}
            ref={containerRef}
        >
            <div className={styles.sectionHeader}>
                <ScrollTitle>
                    {language === 'en' ? 'Logo Meaning' : 'லோகோ விளக்கம்'}
                </ScrollTitle>
            </div>

            <div className={styles.stickyLogoAside}>
                <div className={styles.logoFrame} ref={logoRef}>
                    <img
                        src="https://tamizhiv2.s3.eu-north-1.amazonaws.com/tamizhi2-0/FINAL-LOGO.webp"
                        alt="Tamizhi"
                        className={styles.mainLogo}
                    />

                    <div className={styles.logoHighlightOverlay}>
                        {infoData.map((item, index) => (
                            <div
                                key={`highlight-${item.id}`}
                                className={`${styles.highlightPulsar} ${activeId === item.id ? styles.pulsarActive : ''}`}
                                style={{ left: `${item.cx}%`, top: `${item.cy}%` }}
                                onClick={() => scrollToCard(index)}
                                title={language === 'en' ? item.titleEn : item.titleTn}
                            >
                                <div className={styles.pulsarCore}></div>
                                <div className={styles.pulsarRing}></div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.navigationDots}>
                    {infoData.map((item, index) => (
                        <button
                            key={`dot-${item.id}`}
                            className={`${styles.navDot} ${activeId === item.id ? styles.navDotActive : ''}`}
                            onClick={() => scrollToCard(index)}
                            aria-label={`Scroll to ${item.titleEn}`}
                        >
                            <span className={styles.dotTooltip}>
                                {language === 'en' ? item.titleEn : item.titleTn}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            <div className={styles.scrollStripContainer} ref={scrollRef}>
                <div className={styles.scrollStripInner}>
                    {infoData.map((item) => (
                        <div key={item.id} className={styles.cardWrapper}>
                            <div
                                className={`${styles.palmLeafCard} ${activeId === item.id ? styles.cardActive : ''}`}
                                onClick={() => setActiveId(activeId === item.id ? null : item.id)}
                            >
                                <div className={styles.cardHeader}>
                                    <div className={styles.cardIcon}>{item.icon}</div>
                                    <img src={item.img} alt={item.titleEn} className={styles.objectImg} />
                                </div>
                                <div className={styles.cardContent}>
                                    <div className={styles.bilingualTitle}>
                                        <h3>{language === 'en' ? item.titleEn : item.titleTn}</h3>
                                        <h4 className={styles.tamilSubtitle}>
                                            {language === 'en' ? 'Heritage Artifact' : 'பாரம்பரிய சின்னம்'}
                                        </h4>
                                    </div>
                                    <div className={styles.descriptionBody}>
                                        <p className={styles.tamilPoetic}>{item.tamilHighlight}</p>
                                        <p className={styles.meaningText}>
                                            {language === 'en' ? item.meaningEn : item.meaningTn}
                                        </p>
                                    </div>
                                </div>
                                <div className={styles.cardTexture}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Logo;
