import kingImage from './../../image/cow.png';
import scrollBg from './../../image/parchment_card.png';
import stoneBg from './../../image/image.png';
import img2 from './../../image/kings.jpg';
import history from './../../image/img1.jpg';
import war from './../../image/img4.jpg';
import culture from './../../image/img3.jpg';
import temple from './../../image/img6.jpg';
import architecture from './../../image/img7.jpg';
import historical_place from './../../image/img9.jpg';
import poet from './../../image/img5.jpg';
import books from './../../image/img8.jpg';
import lord from './../../image/img12.jpg';
import excavation from './../../image/img11.webp';
import mythology from './../../image/img10.jpg';
import kingImage1 from './../../image/crown.png';
import styles from '../../Stylesheet/Category.module.css';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { useContext } from 'react';
import { Context } from '../../Context/contextApi';
import cats from '../../image/cats.png';
const cardsData = [
  {
    id: 1,
    tamiltitle: 'History',
    englishtitle: 'வரலாறு',
    englishcontent:
      'Explore the rich history of the Tamil culture and its ancient civilization.',
    tamilcontent: 'தமிழ் கலாச்சாரம் மற்றும் அதன் பழமையான நாகரிகத்தை ஆராயவும்.',
    image: history,
    link: '/subcategory/history',
    taread: 'VIEW MORE',
    enread: 'மேலும் பார்க்க',
  },
  {
    id: 2,
    tamiltitle: 'Kings',
    englishtitle: 'அரசர்கள்',
    englishcontent:
      'Learn about the great kings of Tamil Nadu and their contributions to the world.',
    tamilcontent:
      'தமிழ்நாட்டின் மகான் ராஜாக்கள் மற்றும் அவர்கள் உலகிற்கு அளித்த பங்களிப்புகள் பற்றி அறிக.',
    image: img2,
    link: '/subcategory/kings',
    taread: 'VIEW MORE',
    enread: 'மேலும் படிக்க',
  },
  {
    id: 3,
    tamiltitle: 'War',
    englishtitle: 'போர்',
    englishcontent:
      'The war fought by Tamil kingdoms and their impact on history.',
    tamilcontent:
      'தமிழ் பேரரசுகளால் நடந்த போர்களும் அதன் வரலாற்று தாக்கங்களும்.',
    image: war,
    link: '/war',
    taread: 'VIEW MORE',
    enread: 'மேலும் படிக்க',
  },
  {
    id: 4,
    tamiltitle: 'Culture',
    englishtitle: 'கலாச்சாரம்',
    englishcontent:
      'Discover the diverse and vibrant cultural heritage of Tamil people',
    tamilcontent: 'தமிழர் கலாச்சார பாரம்பரியத்தின் விவகாரமும் உயிர்ப்பும்.',
    image: culture,
    link: '/culture',
    taread: 'VIEW MORE',
    enread: 'மேலும் படிக்க',
  },
  {
    id: 5,
    tamiltitle: 'Temple',
    englishtitle: 'கோவில்',
    englishcontent:
      'Explore the magnificient temples and their architectural beauty in Tamil Nadu.',
    tamilcontent:
      'தமிழ்நாட்டின் அற்புதமான கோவில்களையும் அதன் கட்டிடக்கலை அழகையும் ஆராயவும்.',
    image: temple,
    link: '/temple',
    taread: 'VIEW MORE',
    enread: 'மேலும் படிக்க',
  },
  {
    id: 6,
    tamiltitle: 'Architecture',
    englishtitle: 'கட்டிடக்கலை',
    englishcontent:
      'The traditional and ancient architectural marvels of Tamil culture.',
    tamilcontent:
      'தமிழ் கலாச்சாரத்தின் பாரம்பரிய மற்றும் பழமையான கட்டிடக்கலை அற்புதங்கள்.',
    image: architecture,
    link: '/architecture',
    taread: 'VIEW MORE',
    enread: 'மேலும் படிக்க',
  },
  {
    id: 7,
    tamiltitle: 'Historical place',
    englishtitle: 'வரலாற்று இடம்',
    englishcontent:
      'Explore famous historical places that have shaped Tamil history.',
    tamilcontent:
      'தமிழ் வரலாற்றை உருவாக்கிய புகழ்பெற்ற வரலாற்று இடங்களை ஆராயவும்.',
    image: historical_place,
    link: '/historical_place',
    taread: 'VIEW MORE',
    enread: 'மேலும் படிக்க',
  },
  {
    id: 8,
    tamiltitle: 'Poet',
    englishtitle: 'கவிஞர்',
    englishcontent:
      'Dive into the world of Tamil poets and their timeless works.',
    tamilcontent: 'தமிழ் கவிஞர்களின் காலத்தையும் வரலாற்றையும் அணுகவும்.',
    image: poet,
    link: '/poet',
    taread: 'VIEW MORE',
    enread: 'மேலும் படிக்க',
  },
  {
    id: 9,
    tamiltitle: 'Books',
    englishtitle: 'புத்தகங்கள்',
    englishcontent: 'A collection Tamil literature, books and writings.',
    tamilcontent: 'தமிழ் இலக்கியம், புத்தகங்கள் மற்றும் எழுதல்கள்.',
    image: books,
    link: '/category-books',
    taread: 'VIEW MORE',
    enread: 'மேலும் படிக்க',
  },
  {
    id: 10,
    tamiltitle: 'Lord',
    englishtitle: 'இறைவன்',
    englishcontent:
      'Learn about the Tamil Gods and the spiritual significance of their teachings.',
    tamilcontent:
      'தமிழ் கடவுள்கள் மற்றும் அவர்களுடைய உபதேசங்களின் ஆன்மிக அர்த்தத்தை அறியவும்.',
    image: lord,
    link: '/lord',
    taread: 'VIEW MORE',
    enread: 'மேலும் படிக்க',
  },
  {
    id: 11,
    tamiltitle: 'Excavation',
    englishtitle: 'அகழ்வாராய்ச்சி',
    englishcontent:
      'Explore the sites and artifacts uncovered from ancient Tamil civilization.',
    tamilcontent:
      'பழமையான தமிழ் நாகரிகத்திலிருந்து அகற்றப்பட்ட இடங்கள் மற்றும் தொல்லைகளைக் கண்டறியவும்.',
    image: excavation,
    link: '/excavation',
    taread: 'VIEW MORE',
    enread: 'மேலும் படிக்க',
  },
  {
    id: 12,
    tamiltitle: 'Mythology',
    englishtitle: 'புராணம்',
    englishcontent:
      'Discover the myths and legends that form the rich folklore of Tamil culture.',
    tamilcontent:
      'தமிழ் கலாச்சாரத்தின் பாரம்பரிய கதைகள் மற்றும் புராணங்களை ஆராயவும்.',
    image: mythology,
    link: '/mythology',
    taread: 'VIEW MORE',
    enread: 'மேலும் படிக்க',
  },
];

export default function Category() {
  const { language } = useContext(Context);
  return (
    <>
      <div className={styles.wrapper} style={{ backgroundImage: `url(${stoneBg})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>
        <div className={styles.breadcrumb}>
          <Link to="/" style={{ color: 'white' }}>
            <span className={styles.home}>Home</span>
          </Link>
          <MdKeyboardDoubleArrowRight />
          <span className={styles.current}>Category</span>
        </div>
        <div className={styles.titleSection}>
          {/* <img src={kingImage} alt="king" className={styles.kingImage} /> */}
          {/* <h1 className={styles.title}>
            <span className={styles.orangeC}>C</span>
            <div className={styles.new}>
              ATEGOR
              <span className={styles.crownedY}>
                Y
                <img
                  src={kingImage1}
                  alt="crown"
                  className={styles.crownImage}
                />
              </span>
            </div>
          </h1> */}
          <img src={cats} alt="category" className={styles.categoryTitleImg} />
        </div>
        <Container style={{ maxWidth: '100%', width: '100%' }}>
          <Row>
            <Col xs={12} sm={12} md={12}>
              <div className={styles.gridContainer}>
                {cardsData.map((card) => (
                  <div
                    key={card.id}
                    className={styles.card}
                    style={{
                      backgroundImage: `url(${scrollBg})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      backgroundSize: '100% 100%',
                    }}
                  >
                    <div className={styles.imgBox}>
                      <img src={card.image} alt={card.tamiltitle} className={styles.cardContentImage} />
                      <div className={styles.content}>
                        <h5 className={styles.imgTitle}>
                          {language === 'en' ? (
                            <b>{card.tamiltitle.toUpperCase()}</b>
                          ) : (
                            <b style={{ fontSize: '2.2rem' }}>
                              {card.englishtitle}
                            </b>
                          )}
                        </h5>
                        {language === 'en' ? (
                          <p className={styles.description}>
                            {card.englishcontent}
                          </p>
                        ) : (
                          <p className={styles.description}>
                            {card.tamilcontent}
                          </p>
                        )}
                        <div className={styles.buttonContainer}>
                          <Link to={card.link} className={styles.viewMoreBtn}>
                            {language === 'en' ? (
                              <b>{card.taread}</b>
                            ) : (
                              <b>{card.enread}</b>
                            )}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
