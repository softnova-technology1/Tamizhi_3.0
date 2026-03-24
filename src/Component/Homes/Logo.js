import React, { useEffect, useRef, useContext, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../../Stylesheet/Logo.module.css';
import { Context } from '../../Context/contextApi';
import logoImg from '../../image/logo2.png';
import sandBg from '../../image/sand.png';
import ScrollTitle from './ScrollTitle';

import {
    MdOutlineWbSunny,
    MdAccountBalance,
    MdEmojiPeople,
    MdMenuBook,
    MdMap,
    MdTranslate,
    MdAutoAwesomeMotion,
    MdCircle
} from 'react-icons/md';

gsap.registerPlugin(ScrollTrigger);

const infoData = [
    { id: 1, titleTn: 'இயற்கை', symbolTn: 'நிலம், நீர், மரம் = வாழ்க்கை. பனை மரங்கள் தமிழர்களின் வாழ்வாதாரத்தின் சின்னம்.', icon: <MdOutlineWbSunny />, cx: 50, cy: 10 },
    { id: 2, titleTn: 'சிலை', symbolTn: 'பண்டைய தெய்வங்களைப் பிரதிநிதித்துவப்படுத்தும் ஒரு கலை அடையாளம்.', icon: <MdEmojiPeople />, cx: 78, cy: 18 },
    { id: 3, titleTn: 'தமிழ்', symbolTn: 'தமிழ் மொழியின் உயிர், ஒரு இனத்தின் அடையாளம்.', icon: <MdTranslate />, cx: 90, cy: 50 },
    { id: 4, titleTn: 'வரைபடம்', symbolTn: 'நாகரிகத்தின் பிறப்பிடம், நம் முன்னோர்கள் வாழ்ந்த புனித பூமி.', icon: <MdMap />, cx: 78, cy: 82 },
    { id: 5, titleTn: 'முழுமை', symbolTn: 'அனைத்து கூறுகளையும் இணைக்கும் முடிவில்லாத வடிவம்.', icon: <MdCircle />, cx: 50, cy: 92 },
    { id: 6, titleTn: 'தூண்கள்', symbolTn: 'மொழி, மரபு, பண்பாடு மற்றும் பெருமை - இவைதான் நமது அடையாளத்தின் தூண்கள்.', icon: <MdAutoAwesomeMotion />, cx: 22, cy: 82 },
    { id: 7, titleTn: 'ஓலைச்சுவடி', symbolTn: 'அறிவைப் பாதுகாக்கும் ஊடகம். அழியாத அறிவின் சின்னம்.', icon: <MdMenuBook />, cx: 10, cy: 50 },
    { id: 8, titleTn: 'கோவில்', symbolTn: 'பழங்காலக் கோவில்கள் அறிவு, கலை மற்றும் அறிவியலின் மையங்கள்.', icon: <MdAccountBalance />, cx: 22, cy: 18 }
];

const Logo = () => {
    const { language } = useContext(Context);
    const [activeNode, setActiveNode] = useState(null);
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.dotNode', {
                opacity: 0,
                scale: 0,
                stagger: 0.1,
                duration: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 70%'
                }
            });

            gsap.to('.mainHub', {
                y: -10,
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            className={styles.minimalistLogoSection}
            ref={sectionRef}
        >
            <div className={styles.overlay}></div>

            <div className={styles.headerArea}>
                <ScrollTitle className={styles.title}>
                    {language === 'en' ? 'Meaning of the Logo' : 'லோகோவின் உட்பொருட்கள்'}
                </ScrollTitle>
            </div>

            <div className={styles.interactiveMandala}>

                {/* SVG Connections (Subtle) */}
                <svg viewBox="0 0 100 100" className={styles.mandalaSvg}>
                    {infoData.map(node => (
                        <line
                            key={`l-${node.id}`}
                            x1="50" y1="50" x2={node.cx} y2={node.cy}
                            className={`${styles.spokeLine} ${activeNode?.id === node.id ? styles.lineActive : ''}`}
                        />
                    ))}
                </svg>

                {/* Central Hub */}
                <div className={`${styles.hubIdentity} mainHub`}>
                    <div className={styles.hubWrapper}>
                        <img src={logoImg} alt="tamizhi" />
                        <div className={styles.hubAura}></div>
                    </div>
                    {/* Dark Tagline Pill below Logo */}
                    <div className={styles.hubTagline}>
                        மொழி • மரபு • பண்பாடு • பெருமை
                    </div>
                </div>

                {/* The Dots */}
                {infoData.map((node) => (
                    <div
                        key={node.id}
                        className={`${styles.dotPointer} dotNode ${activeNode?.id === node.id ? styles.dotActive : ''}`}
                        style={{ top: `${node.cy}%`, left: `${node.cx}%` }}
                        onMouseEnter={() => setActiveNode(node)}
                        onMouseLeave={() => setActiveNode(null)}
                    >
                        <div className={styles.dotCore}></div>
                        <div className={styles.dotRipple}></div>

                        {/* Hover Popup Detail */}
                        <div className={styles.floatingDetail}>
                            <h4>{node.titleTn}</h4>
                            <p>{node.symbolTn}</p>
                        </div>
                    </div>
                ))}

            </div>
        </section>
    );
};

export default Logo;
