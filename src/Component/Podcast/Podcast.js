import React, { useEffect, useRef } from 'react';
import styles from '../../Stylesheet/Podcast.module.css';
import { FaYoutube, FaInstagram, FaFacebook, FaLinkedin, FaMicrophoneAlt } from 'react-icons/fa';
import gsap from 'gsap';
import logoImg from '../../image/Vanakkam TAMIZHI.webp';

export default function Podcast() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);
  const micRef = useRef(null);

  useEffect(() => {
    // Reveal animation
    const tl = gsap.timeline();
    tl.fromTo(contentRef.current, 
      { opacity: 0, y: 100, scale: 0.9 }, 
      { opacity: 1, y: 0, scale: 1, duration: 1.8, ease: 'power4.out', delay: 0.3 }
    );

    // Floating animation for mic
    gsap.to(micRef.current, {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
  }, []);

  return (
    <div className={styles.container} ref={containerRef}>
      {/* Cinematic Background Overlay */}
      <div className={styles.vignette}></div>
      <div className={styles.mistCloud}></div>
      
      <div className={styles.overlay}>
        <div className={styles.micIconContainer} ref={micRef}>
          <FaMicrophoneAlt className={styles.micIconInner} />
          <div className={styles.micGlow}></div>
        </div>
        
        <div className={styles.content} ref={contentRef}>
          <div className={styles.logoWrapper}>
             <img src={logoImg} alt="Tamizhi" className={styles.tamilLogo} />
          </div>
          
          <div className={styles.textContainer}>
            <h1 className={styles.comingSoonText}>COMING SOON</h1>
            <div className={styles.decorativeLine}></div>
            <p className={styles.tagline}>Echoes of the past, in the voices of today.</p>
          </div>
          
          <div className={styles.socialIcons}>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className={styles.socialLink} title="YouTube">
              <FaYoutube />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className={styles.socialLink} title="Instagram">
              <FaInstagram />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className={styles.socialLink} title="Facebook">
              <FaFacebook />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className={styles.socialLink} title="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}