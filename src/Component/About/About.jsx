import { useContext } from 'react';
import Aboutimg1 from './../../image/About-img1.png';
import Aboutimg2 from './../../image/aboutimg.png';
import Aboutimg5 from './../../image/About-img5.png';
import Aboutimg6 from './../../image/About-img6.png';
import Aboutimg7 from './../../image/About-img7.png';
import Aboutimg8 from './../../image/About-img-8.png';
import CultureImg from './../../image/culture.png';
import HistoryImg from './../../image/mission.png';
import ArchitectureImg from './../../image/offer.png';
import KingsImg from './../../image/temp.png';
import classes from '../../Stylesheet/AboutRedesign.module.css';
import { Context } from '../../Context/contextApi';

const AboutSection = () => {
  const { language } = useContext(Context);

  const sections = [
    {
      title: language === 'en' ? 'WE ARE OFFERING' : 'நாங்கள் வழங்குபவை',
      content: language === 'en' 
        ? 'Kings, History, Arts & Culture, Architecture, Temples, Books, Mystery stories, Historical Places, Mythology, Wars, Poetry, Excavation sites, and Armaments.'
        : 'அரசர்கள், வரலாறு, கலை மற்றும் கலாச்சாரம், கட்டடக்கலை, கோயில்கள், புத்தகங்கள், மர்ம கதைகள், வரலாற்றுச் சிறப்புமிக்க இடங்கள், புராணங்கள், போர்கள், கவிதைகள், அகழ்வாராய்ச்சி மற்றும் ஆயுதங்கள் ஆகியவை தமிழ் மரபின் அழகையும், ஆழமும் எடுத்துரைக்கும் வண்ணம் அமைந்தவை. இவை அனைத்தையும் தமிழியின் வழியாக நாங்கள் அழுத்தமான தகவல்களாக, ஆர்வமூட்டும் கதைகளாக, சிந்தனைக்குரிய உள்ளடக்கங்களாக வழங்குகிறோம்.',
      image: Aboutimg5,
      bg: ArchitectureImg,
      tag: language === 'en' ? 'Legacy' : 'பாரம்பரியம்'
    },
    {
      title: language === 'en' ? 'OUR MISSION' : 'எங்கள் நோக்கம்',
      content: language === 'en'
        ? 'We aim to create a space where Tamil speakers and enthusiasts worldwide can deepen their connection to Tamil culture, learn about its history, and stay engaged with modern development.'
        : 'உலகம் முழுவதும் உள்ள தமிழ் பேசும் மக்களும், தமிழ் ஆர்வலர்களும் தங்கள் தமிழ் கலாச்சாரத்துடன் உள்ள ஆழமான உறவுகளை உருவாக்கவும், அதன் வரலாற்றைப் பற்றி அறியவும், இன்றைய தமிழ் வளர்ச்சியில் பங்கு பெறவும் நாங்கள் ஒரு சிறப்பான இடத்தை உருவாக்கும் நோக்கத்துடன் பயணிக்கிறோம்.',
      image: Aboutimg6,
      bg: HistoryImg,
      tag: language === 'en' ? 'Future' : 'எதிர்காலம்'
    },
    {
      title: language === 'en' ? 'OUR VISION' : 'எங்கள் கனவு',
      content: language === 'en'
        ? 'We aim to create a comprehensive resource that preserves Tamil culture for future generations while providing a welcoming space for everyone who wishes to learn and engage with it.'
        : '"தமிழி" - "ஒரு வார்த்தை மட்டுமல்ல, ஒரு வாழ்வியல்". எதிர்காலத் தலைமுறைகளுக்காக தமிழ் கலாசாரத்தை பாதுகாக்க, அதன் பெருமையையும், பாரம்பரியத்தையும் அறிந்து கொள்ளவும், தமிழி அதை பகிர்ந்து கொள்ள விரும்பும் அனைவருக்கும், அன்பும் அர்ப்பணிப்பும் கொண்ட ஒரு தாய்நிலையாக திகழ்கிறது.',
      image: Aboutimg7,
      bg: CultureImg,
      tag: language === 'en' ? 'Vision' : 'கனவு'
    },
    {
      title: language === 'en' ? 'OUR GOAL' : 'எங்கள் இலக்கு',
      content: language === 'en'
        ? 'We bring Tamil closer to people everywhere, intermingling tradition with a fresh, modern perspective.'
        : 'தமிழ் மொழியை உலகம் முழுவதும் பரப்பி, அதன் பாரம்பரியத்தையும், நவீன கலைத் தன்மைகளையும் இணைத்து, தமிழ் மொழியின் சிரப்பையும் அதன் பெருமைகளையும் உலகிற்கு அறிமுகப்படுத்துவது எங்களின் முக்கிய நோக்கம்',
      image: Aboutimg8,
      bg: KingsImg,
      tag: language === 'en' ? 'Impact' : 'தாக்கம்'
    }
  ];

  return (
    <div className={classes.aboutContainer}>
      {/* Hero Section */}
      <section className={classes.heroSection}>
        <div className={classes.heroContent}>
          <h1 className={classes.heroTitle}>
            {language === 'en' ? 'Thamizhi' : 'தமிழி'}
          </h1>
          <p className={classes.heroSubtitle}>
            {language === 'en' ? 'Bridging Heritage and Modernity' : 'பாரம்பரியம் மற்றும் நவீனத்தின் இணைப்பு'}
          </p>
          <img src={Aboutimg1} alt="Logo" className={classes.heroIcon} style={{width: '60px', marginTop: '20px'}} />
        </div>
      </section>

      {/* Intro Section */}
      <section className={classes.introSection}>
        <div className={classes.introTextContainer}>
          <h2 className={classes.introHeading}>
            {language === 'en' ? 'About Us...' : 'எங்களைப் பற்றி...'}
          </h2>
          <div className={classes.introParagraph}>
            {language === 'en' ? (
              <p className={classes.intopara}>
                Welcome to Thamizhi, a passionate platform dedicated to
                exploring, celebrating, and preserving the rich culture,
                profound history, classical literature, and timeless beauty
                of the Tamil language and heritage. We are a new generation
                of Tamil enthusiasts committed to building a vibrant,
                inclusive space that bridges tradition and modernity,
                offering meaningful resources, inspiring stories, and
                community-driven experiences that keep Tamil close to every
                heart. Whether you are a native speaker cherishing your
                roots or a curious learner discovering Tamil’s wonders, we
                warmly invite you to join us on this beautiful journey to
                keep our language alive, thriving, and evolving for future
                generations.
              </p>
            ) : (
              <p className={classes.intopara}>
                தமிழி – தமிழ் மொழியும் கலாச்சாரமும் நெடுங்காலம் வாழும்
                மரபுக் களஞ்சியம். "தமிழை நேசிப்போம், தமிழுடன் வாழ்வோம்" —
                என்ற எங்கள் நெஞ்சார்ந்த ஆசையும், அழைப்பும் இதுவே. தமிழியின்
                வழியாக, தமிழின் செழுமையான மொழியும், அதன் மரபும்,
                கலாச்சாரமும், மற்றும் அடையாளம் அனைத்தையும் ஒளியுடன் ஒலிக்கச்
                செய்கிறோம். "பழமையை போற்றும் புதிய தலைமுறை" என்ற
                மனப்பான்மையுடன், நவீன உலகில் பாரம்பரியத்தை எடுத்துச்சொல்லும்
                ஒரு முயற்சியாக தமிழி உருவாகியுள்ளது. "தமிழ் என்றும்
                வாழட்டும்" என்பது எங்கள் உறுதியும் நம்பிக்கையும். தமிழின்
                எழுத்து, இசை, சிந்தனை, மற்றும் வாழ்வியலின் நுட்பங்கள்
                தலைமுறைகள் கடந்தும் தழைக்கட்டும் என நாங்கள்
                வலியுறுத்துகிறோம். தமிழின் அழகை மீண்டும் உணர, அதன் பயணத்தில்
                பங்கெடுக்க, உங்களை நாங்கள் அன்புடன் வரவேற்கிறோம்.
              </p>
            )}
          </div>
        </div>
        <div className={classes.introImageWrapper}>
          <img src={Aboutimg2} alt="Ancient Architecture" className={classes.introImage} />
        </div>
      </section>

      {/* Feature Roadmap Section */}
      <div className={classes.roadmapContainer}>
        {sections.map((section, index) => (
          <div 
            key={index} 
            className={classes.roadmapItem}
          >
            <div className={classes.roadmapDot}>
              <img src={section.image} alt="Step Icon" />
            </div>
            <div className={classes.roadmapContent}>
              {/* <div className={classes.roadmapTag}></div> */}
              <h3 className={classes.roadmapTitle}>{section.title}</h3>
              <div className={classes.roadmapText}>
                {section.content}
              </div>
            </div>
            <div className={classes.roadmapVisual}>
              <img src={section.bg} alt="Visual Decor" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutSection;
