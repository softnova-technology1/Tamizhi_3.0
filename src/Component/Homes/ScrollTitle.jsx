import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import styles from '../../Stylesheet/ScrollTitle.module.css';

gsap.registerPlugin(ScrollTrigger);

const ScrollTitle = ({ children, className, wrapperStyle, as: Component = 'h2' }) => {
    const containerRef = useRef(null);
    const scrollBgRef = useRef(null);
    const textRef = useRef(null);

    useGSAP(() => {
        gsap.set(scrollBgRef.current, { width: 0 });
        gsap.set(textRef.current, { opacity: 0 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse", 
            }
        });
        tl.to(scrollBgRef.current, {
            width: "calc(100% - 30px)", 
            duration: 0.9,
            ease: "power2.out",
        })
            .to(textRef.current, {
                opacity: 1,
                duration: 0.5,
                ease: "power1.inOut"
            }, "-=0.2"); 

    }, { scope: containerRef });

    return (
        <div className={styles.scrollTitleWrapper} style={wrapperStyle} ref={containerRef}>
            <div className={styles.scrollTitleContainer}>
                <div className={styles.scrollBg} ref={scrollBgRef}></div>
                <Component className={className || ''} ref={textRef}>
                    {children}
                </Component>
            </div>
        </div>
    );
};

export default ScrollTitle;
