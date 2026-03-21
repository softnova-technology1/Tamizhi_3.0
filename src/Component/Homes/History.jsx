
import styles from '../../Stylesheet/History.module.css';

import history from './../../image/historyimg.webp';
import architure from './../../image/architureimg.webp';
import excavation from './../../image/img11.webp';
import culture from './../../image/cultureimg.webp';
import historical from './../../image/historicalimg.webp';
import kings from './../../image/kings.webp';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../Context/contextApi';
import ScrollTitle from '../Homes/ScrollTitle';

const data = [
  {
    title: {
      en: 'History',
      tn: 'வரலாறு',
    },
    label: 'Learn more about history',
    description: {
      en: 'Explore the rich and ancient history of Tamil civilization that shaped South India s legacy.From Sangam literature to maritime trade, discover stories that stood the test of time.Tamizhi brings you closer to a timeless heritage of knowledge and valor...',
      tn: 'தென்னிந்தியாவின் பாரம்பரியத்தை வடிவமைத்த தமிழ் நாகரிகத்தின் வளமிகு மற்றும் பண்டைய வரலாற்றை ஆராயுங்கள்.சங்க இலக்கியம் முதல் கடல்சார் வணிகம் வரை, காலத்தின் சோதனைகளைத் தாண்டி நிலைத்துள்ள வரலாற்றுப் பதிவுகளை வெளிக்கொணுங்கள்.தமிழி, உங்களை அறிவும் வீரமும் நிறைந்த காலத்தால் அழியாத பாரம்பரியத்திற்கு நெருக்கமாக கொண்டு செல்லும்..',
    },
    image: history,
    link: '/subcategory/history',
  },
  {
    title: {
      en: 'Kings',
      tn: 'அரசர்கள்',
    },
    label: 'Learn more about Kings',
    description: {
      en: 'Meet the legendary Tamil rulers who redefined power, wisdom, and justice.From the mighty Cholas to the brave Pandyas,their reign echoes through centuries.Uncover the lives and legacies of kings who built empires with vision and strength...',
      tn: 'அதிகாரம், ஞானம் மற்றும் நீதிக்கு புதிய வரையறைகளை உருவாக்கிய புகழ்மிகு தமிழ் அரசர்களை சந்திக்கவும்.வலிமைமிக்க சோழர்கள் முதல் துணிச்சலான பாண்டியர்கள் வரை, அவர்களின் ஆட்சி பல நூற்றாண்டுகளாக இந்திய வரலாற்றில் எதிரொலிக்கிறது.தொலைநோக்குடன், வலிமையுடனும் பேரரசுகளை நிறுவிய மன்னர்களின் வாழ்க்கை வரலாறையும், மரபுகளையும் ஆராயுங்கள்.',
    },
    image: kings,
    link: '/subcategory/kings',
  },
  {
    title: {
      en: 'Culture',
      tn: 'கலாச்சாரம்',
    },
    label: 'Learn more about Culture',
    description: {
      en: 'Dive into the vibrant traditions, art, and festivals that define Tamil culture.From Bharatanatyam to Pongal, every element tells a story of pride and identity.Celebrate the rhythm and richness of Tamil way of life through Tamizhi....',
      tn: 'தமிழ் கலாச்சாரத்தை வரையறுக்கும் உயிர்விழுங்கும் மரபுகள், கலை மற்றும் பண்டிகைகளில் முழுமையாக மூழ்கிக்கொள்ளுங்கள்.பரதநாட்டியம் முதல் பொங்கல் வரை, ஒவ்வொரு அம்சமும் பெருமையும் அடையாளமும் நிறைந்த கதையைச் சொல்கிறது.தமிழ் வாழ்க்கை முறையின் தாளத்தையும் செழுமையையும் தமிழி மூலமாகக் கொண்டாடுங்கள்....',
    },
    image: culture,
    link: '/culture',
  },
  {
    title: {
      en: 'Architecture',
      tn: 'கட்டிடக்கலை',
    },
    label: 'Learn more about Architecture',
    description: {
      en: 'Marvel at the architectural brilliance of Tamil temples and monuments.Stone carvings, towering gopurams, and ancient city planning await your discovery.Tamizhi showcases the structural wonders built with devotion and precision....',
      tn: 'தமிழ் கலாச்சாரத்தை வரையறுக்கும் உயிர்விழுங்கும் மரபுகள், கலை மற்றும் பண்டிகைகளில் முழுமையாக மூழ்கிக்கொள்ளுங்கள்.பரதநாட்டியம் முதல் பொங்கல் வரை, ஒவ்வொரு அம்சமும் பெருமையும் அடையாளமும் நிறைந்த கதையைச் சொல்கிறது.தமிழ் வாழ்க்கை முறையின் தாளத்தையும் செழுமையையும் தமிழி மூலமாகக் கொண்டாடுங்கள்....',
    },
    image: architure,
    link: '/architecture',
  },
  {
    title: {
      en: 'Historical place',
      tn: 'பழமையான இடங்கள்',
    },
    label: 'Learn more about Historical place',
    description: {
      en: 'Walk through ancient cities and sacred sites that hold centuries of history.Each place, from Madurai to Kanchipuram, whispers tales of Tamil greatness.Discover hidden gems and iconic landmarks that reflect a glorious past....',
      tn: 'பல நூற்றாண்டுகளைக் கடந்த பண்டைய நகரங்கள் மற்றும் புனிதத் தலங்கள் வழியாக ஒரு பயணத்தைத் தொடங்குங்கள்.மதுரையிலிருந்து காஞ்சிபுரம் வரை, ஒவ்வொரு இடமும் தமிழ் மகத்துவத்தின் நிரூபணங்களை மெல்லிசையாகக் கூறுகிறது.ஒரு புகழ்பெற்ற கடந்த காலத்தை பிரதிபலிக்கும் மறைந்திருக்கும் ரத்தினங்களையும், சின்னச் சின்ன அடையாளங்களையும் தமிழியுடன் சேர்ந்து கண்டறியுங்கள்....',
    },
    image: historical,
    link: '/historical_place',
  },
  {
    title: {
      en: 'Excavation',
      tn: 'பழமையான அகழ்வுகள்',
    },
    label: 'Learn more about Excavation',
    description: {
      en: 'Uncover the truths buried beneath the soil of Tamil lands through archaeology.Excavations from Keeladi and beyond reveal untold stories of civilization.Tamizhi brings these discoveries to light, connecting past with present....',
      tn: 'தமிழ் நிலத்தின் மண்ணுக்கடியில் மறைந்துள்ள உண்மைகளை தொல்லியல் அறிவின் வழியாக வெளிக்கொணருங்கள்.கீழடி முதல் பல்வேறு அகழ்வாராய்ச்சி தளங்கள் வரை, நம் நாகரிகத்தின் சொல்லப்படாத கதைகள் மெல்ல வெளிவருகின்றன.தமிழி, இந்தப் புதையல் போன்ற கண்டுபிடிப்புகளை வெளிச்சத்திற்குக் கொண்டு வந்து, கடந்த காலத்தையும் நிகழ்காலத்தையும் நுண்ணறிவோடு இணைக்கிறது.தமிழரின் பண்டைய மறைக்கப்பட்ட வரலாற்றை, அகழ்வாராய்ச்சி முகமாக மீட்டறிந்து பாருங்கள்.கலாச்சாரம்...',
    },
    image: excavation,
    link: '/excavation',
  },
];
export default function History() {
  const { language, mobileViewOn } = useContext(Context);
  const navigate = useNavigate();
  const handleMoreClick = () => {
    navigate('/category');
  };

  return (
    <div className='containers'>
      <div className={styles.wrapper} xs={12} sm={12} md={3}>
        <div className='mt-md-5 mb-md-5 pt-md-5 mt-3 mb-3 pt-2'>
          <ScrollTitle className={styles.title}>
            {language === 'en' ? 'Category' : 'வகைப்பாடு'}
          </ScrollTitle>
        </div>
        <div className='pt-md-5 pt-3'>
        <div className={styles.grid} xs={12} sm={12} md={3}>
          {data.map((item, index) => (
            <div key={index} className={styles.categoryCard}>
              <div className={styles.imageFrame}>
                <img
                  src={item.image}
                  alt={item.title[language]}
                  className={styles.cardImage}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />
              </div>
              <div className={styles.cardInfo}>
                <div className={styles.cardText}>
                  <p className={styles.cardHeading}>{item.title[language]}</p>
                  <p className={styles.cardTextDesc}>{item.description[language]}</p>
                </div>
                <Link to={item.link}>
                  <div className={styles.buttonbox}>
                    <button className={styles.cardButton} aria-label={item.label}>
                      {item.title.en === 'History' ? 'History' :
                        item.title.en === 'Kings' ? 'Kingdoms' :
                          item.title.en === 'Culture' ? 'Culture' :
                            item.title.en === 'Architecture' ? 'Architecture' :
                              item.title.en === 'Historical place' ? 'Places' :
                                item.title.en === 'Excavation' ? 'Excavation' :
                                  item.title.en === 'War' ? 'War' : 'Arts'}
                    </button>
                  </div>
                </Link>
              </div>
              <div className={styles.decorativeDivider}>
                <div className={styles.dividerOrnament}>
                  <span className={styles.ornamentLine}></span>
                  <span className={styles.ornamentSymbol}></span>
                  <span className={styles.ornamentLine}></span>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
        <div className={styles.more}>
          <button className={styles.more1} onClick={handleMoreClick}>
            More Categories
          </button>
        </div>
      </div>
    </div>
  )
}
