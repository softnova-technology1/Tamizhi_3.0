import { useState, useEffect } from 'react';
import styles from '../Stylesheet/TamilzhiLoader.module.css';

const languages = [
  { script: ["த", "மி", "ழி"], name: "Tamil" },

  { script: ["त", "मि", "ज़ि"], name: "Hindi" },
  { script: ["ത", "മി", "ഴി"], name: "Malayalam" },
  { script: ["త", "మి", "ళి"], name: "Telugu" },
];

const TamilAnimation = ({ show }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!show) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % languages.length);
    }, 600); // Change language every 600ms

    return () => clearInterval(interval);
  }, [show]);

  return (
    show && (
      <div className={styles.overlay}>
        <div className={styles.tam}>
          {languages[currentIndex].script.map((char, index) => (
            <p 
              key={`${currentIndex}-${index}`} 
              className={styles.p1}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {char}
            </p>
          ))}
        </div>
        <div className={styles.langName}>
          {languages[currentIndex].name}
        </div>
      </div>
    )
  );
};

export default TamilAnimation;

