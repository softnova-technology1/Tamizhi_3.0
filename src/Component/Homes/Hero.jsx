import React, { useContext, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from '../../Stylesheet/Hero.module.css';
import templePng from '../../image/parralaxone.png'; 
import extra from "../../image/pa.png"
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

        mm.add("(min-width: 769px)", () => {
            gsap.set([pngRef.current, pngRef2.current], { xPercent: -50, opacity: 0 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "+=200%", 
                    scrub: 1.5,
                    pin: true,     
                    anticipatePin: 1
                }
            });

            tl.fromTo(pngRef.current,
                { y: "100vh", scale: 0.7, opacity: 0 },
                { 
                    y: "0vh", 
                    scale: 0.9, 
                    opacity: 1, 
                    duration: 2, 
                    ease: "power2.out" 
                }
            );
            tl.fromTo(pngRef2.current,
                { y: "100vh", scale: 0.8, opacity: 0 },
                { 
                    y: "-10vh", 
                    scale: 1, 
                    opacity: 1, 
                    duration: 2, 
                    ease: "power2.out" 
                }
            );
        });

        mm.add("(max-width: 768px)", () => {
            gsap.set([pngRef.current, pngRef2.current], { xPercent: -50, opacity: 0 }); 

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "+=150%", 
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1
                }
            });

            tl.fromTo(pngRef.current,
                { y: "80vh", scale: 0.85, opacity: 0 },
                {
                    y: "10vh",
                    scale: 1,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power1.out"
                }
            );

            tl.fromTo(pngRef2.current,
                { y: "90vh", scale: 0.9, opacity: 0 },
                {
                    y: "0vh",
                    scale: 1.1,
                    opacity: 1,
                    duration: 1.5,
                    ease: "power1.out"
                }
            );
        });

        return () => mm.revert();
    }, { scope: heroRef });


    const { mobileViewOn } = useContext(Context);


    return (
        <section className={styles.heroSection} ref={heroRef}>
            <div className={styles.backgroundLayer}></div>
            <div className={styles.stickyContainer}>
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
                <div className={styles.wrapper1} xs={12} sm={12} md={3}>
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
