import styles from '../../Stylesheet/abouthome.module.css';
import about from './../../image/Rectangle 72 (2).webp';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../Context/contextApi';
const AboutUs = ({ lang = 'en' }) => {
  const { language } = useContext(Context);
  const content = {
    heading: {
      en: 'About Us',
      ta: 'எங்களை பற்றி',
    },
    paragraph1: {
      en: `Welcome to Thamizhi, a dedicated platform to explore, celebrate, and share the rich culture, history, and beauty of the Tamil language and heritage.We are a new generations of Tamil enthusiasts dedicated to creating a vibrant, all-encompassing platform for the Tamil language and culture`,
      ta: `தமிழ் மொழி மற்றும் பாரம்பரியத்தின் வளமான கலாச்சாரம், வரலாறு மற்றும் அழகை ஆராய்வதற்கும், கொண்டாடுவதற்கும், பகிர்ந்து கொள்வதற்கும் ஒரு பிரத்யேக தளமான தமிழிழைக்கு வருக.`,
    },
    paragraph2: {
      en: `We provide resources that reflect the heritage of tamil and resonate with today s audiences. Whether you re a native speaker or a curious learner, we invite you to join us on this journey to keep Tamil alive, thriving and evolving gor future generations.`,
      ta: `நாங்கள் புதிய தலைமுறை தமிழ் ஆர்வலர்கள், கலாச்சாரத்திற்கான துடிப்பான, அனைத்தையும் உள்ளடக்கிய தளத்தை உருவாக்குவதற்கு அர்ப்பணிப்புடன் இருக்கிறோம். தமிழின் பாரம்பரியத்தை பிரதிபலிக்கும் மற்றும் இன்றைய பார்வையாளர்களுடன் எதிரொலிக்கும் வளங்களை நாங்கள் வழங்குகிறோம். நீங்கள் ஒரு தாய்மொழி பேசுபவராக இருந்தாலும் சரி அல்லது ஆர்வமுள்ள கற்றவராக இருந்தாலும் சரி, எதிர்கால சந்ததியினருக்காக தமிழை உயிர்ப்புடன், செழிப்பாக, பரிணமிக்க வைத்திருக்க இந்தப் பயணத்தில் எங்களுடன் சேர உங்களை அழைக்கிறோம்`,
    },
    paragraph3: {
      en: `This website is a bridge, Uniting all community and celebrating our shared language, culture, and heritage`,
      ta: `இந்த வலைத்தளம் அனைத்து சமூகங்களையும் ஒன்றிணைத்து, நமது பகிரப்பட்ட மொழி, கலாச்சாரம் மற்றும் பாரம்பரியத்தை கொண்டாடும் ஒரு பாலமாகும்.`,
    },
    button: {
      en: 'Learn More',
      ta: 'மேலும் அறிய',
    },
  };

  return (
    <div className={styles.aboutContainer}>
      <div className={styles.textSection}>
        <h2>{content.heading[language]}</h2>
        <p>{content.paragraph1[language]}</p>
        <p>{content.paragraph2[language]}</p>
        <p>{content.paragraph3[language]}</p>
        <Link to="/about">
          <span className={styles.visually_hidden}>Learn more about us</span>
          <button
            className={styles.aboutButton}
            aria-label="Learn more about us"
          >
            {content.button[language]}
          </button>
        </Link>
      </div>

      <div className={styles.imageSection}>
        <img
          src={about}
          alt="Bharatanatyam dancer"
          className={styles.aboutImage}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
        />
      </div>
    </div>
  );
};

export default AboutUs;
