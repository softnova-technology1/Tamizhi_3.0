import React, { useContext, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from '../../Stylesheet/Hero.module.css';
import templePng from '../../image/fi.png'; // Updated to use isolated gopuram
import extra from "../Homes/s.png"
import vanakkam from './../../image/Vanakkam TAMIZHI.webp';
import tamil1 from './../../image/Tamil_1x.webp';
import tamil2 from './../../image/Tamil_2x.webp';
import { Context } from '../../Context/contextApi';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const heroRef = useRef(null);
    const pngRef = useRef(null);
    const pngRef2 = useRef(null);

    useGSAP(() => {
        let mm = gsap.matchMedia();

        const animOptions = {
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5,
            }
        };

        mm.add("(min-width: 769px)", () => {
            gsap.set([pngRef.current, pngRef2.current], { xPercent: -50, opacity: 0 });

            // Background Image (Larger/Further)
            gsap.fromTo(pngRef.current,
                { y: "60vh", scale: 0.8 },
                {
                    y: "-10vh",
                    scale: 0.9,
                    opacity: 1,
                    ease: "power2.out",
                    ...animOptions
                }
            );

            // Foreground Image (Main/Nearer)
            gsap.fromTo(pngRef2.current,
                { y: "70vh", scale: 0.9 },
                {
                    y: "-20vh",
                    scale: 1,
                    opacity: 1,
                    ease: "power2.out",
                    ...animOptions
                }
            );
        });

        mm.add("(max-width: 768px)", () => {
            gsap.set([pngRef.current, pngRef2.current], { xPercent: -50, opacity: 0 });

            gsap.fromTo(pngRef.current,
                { y: "40vh", scale: 0.9 },
                {
                    y: "0vh",
                    scale: 0.95,
                    opacity: 1,
                    ease: "power2.out",
                    ...animOptions
                }
            );

            gsap.fromTo(pngRef2.current,
                { y: "50vh", scale: 0.95 },
                {
                    y: "-5vh",
                    scale: 1,
                    opacity: 1,
                    ease: "power2.out",
                    ...animOptions
                }
            );
        });

        return () => mm.revert();
    }, { scope: heroRef });


     const { mobileViewOn } = useContext(Context);
    
     
    return (
        <section className={styles.heroSection} ref={heroRef}>
            <div className={styles.stickyContainer}>
                <div className={styles.backgroundLayer}></div>
                <div className={styles.overlay}></div>
                <img
                    src={templePng}
                    className={styles.templeImageLayer1}
                    ref={pngRef}
                    alt="Temple Background Layer"
                />
                <img
                    src={extra}
                    className={styles.templeImageLayer2}
                    ref={pngRef2}
                    alt="Temple Foreground Layer"
                />
                {/* <div className={`containers ${styles.heroContent}`}>
                    <div className={styles.tag}>DISCOVER HISTORY LIKE NEVER BEFORE</div>
                    <h1 className={styles.title}>
                        Vanakkam <br />
                        <span className={styles.highlight}>TAMIZHI</span>
                    </h1>
                    <h1 className={styles.quote}>
                        "யாதும் ஊரே யாவரும் கேளிர்"
                    </h1>
                    <div className={styles.actions}>
                        <button className="btn-primarys">EXPLORE HERITAGE</button>
                        <button className={`btn-secondarys ${styles.secondarys}`}>OUR STORY</button>
                    </div>
                </div> */}
                <div className={styles.wrapper1} xs={12} sm={12} md={3}>
                    {/* <img
                        src={HeaderImage}
                        alt="Background"
                        className={styles.bgImage}
                        fetchPriority="high"
                        loading="eager"
                        decoding="async"
                    /> */}
                    <div className={styles.overlay} xs={12} sm={12} md={3}>
                        <div className={styles.heading1} xs={12} sm={12} md={3}>
                            <img
                                src={vanakkam}
                                alt="Vanakkam"
                                className={styles.vanakkamImage}
                                loading="lazy"
                                decoding="async"
                                width="590"
                                height="300"
                            />
                        </div>

                        <p className={styles.tamil1Image}>
                            <span className={styles.redText}>ahJk;</span> CNu{' '}
                            <span className={styles.yellowText}>ahtUk;</span> NfspH
                        </p>

                        <div className={styles.symbol}>
                            {mobileViewOn ? (
                                <img
                                    src={tamil1}
                                    alt="Tamil Symbol"
                                    srcSet={`${tamil1} 1x, ${tamil2} 2x`}
                                    className={styles.tamil2Image}
                                    width="300"
                                    height="200"
                                />
                            ) : (
                                <img
                                    src={tamil2}
                                    alt="Tamil Symbol"
                                    className={styles.tamil2Image}
                                    width="600"
                                    height="400"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
