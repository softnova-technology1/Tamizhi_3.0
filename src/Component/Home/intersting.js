import styles from '../../Stylesheet/intersting.module.css';
import { Container, Row, Col } from 'react-bootstrap';
import cholaImg from './../../image/Thanjavur.webp';
import historicalImg from './../../image/historical.webp';
import pandyaImg from './../../image/pandyan dys.46edca16ab190287cdd2.webp';
import tamilarImg from './../../image/tamilar2.webp';
import { useContext } from 'react';
import { Context } from '../../Context/contextApi';
const topicData = [
  {
    layout: 'large',
    image: cholaImg,
    label: 'Learn more about the Chola Kings',
    alt: 'Chola Dynasty',
    title: {
      en: 'Chola Dynasty',
      ta: 'சோழர் அரசாட்சி',
    },
    description: {
      en: 'The Cholas were a prominent dynasty in South India, and they played a significant role in the Sangam Age, which is generally considered to span from 300 BCE to 1297 CE. During this period, the Cholas engaged in extensive trade both within the Indian.....',
      ta: 'சோழர்கள் தென்னிந்தியாவில் ஒரு முக்கிய வம்சமாக இருந்தனர், மேலும் அவர்கள் சங்க காலத்தில் குறிப்பிடத்தக்க பங்கைக் கொண்டிருந்தனர் இது பொதுவாக கிமு 300 முதல் கிபி 1297 வரை நீடித்ததாகக் கருதப்படுகிறது. இந்த காலகட்டத்தில்,.....',
    },
    link: '/kings/chola',
  },
  {
    layout: 'small',
    image: historicalImg,
    label: 'Explore Historical Places',
    alt: 'Historical Place',
    title: {
      en: 'Historical Place',
      ta: 'பாரம்பரிய இடங்கள்',
    },
    description: {
      en: 'Tamil Nadu, a state located in the southern part of India, is known for its rich cultural heritage  historical landmarks, and architectural marvels. The state is home to numerous historical places that reflect....',
      ta: 'இந்தியாவின் தெற்குப் பகுதியில் அமைந்துள்ள தமிழ்நாடு, அதன் வளமான கலாச்சார பாரம்பரியம்,வரலாற்று அடையாளங்கள் மற்றும் கட்டிடக்கலை அற்புதங்களுக்கு பெயர் பெற்றது. இந்த மாநிலம்.....',
    },
    link: '/historical_place',
  },
  {
    layout: 'small',
    image: tamilarImg,
    label: 'Learn more about Tamilar',
    alt: 'Tamilar',
    title: {
      en: 'Tamilar',
      ta: 'தமிழர்',
    },
    description: {
      en: 'The Tamils, also known as the Tamilar, are a Dravidian ethnolinguistic group who natively speak the Tamil language and trace their ancestry mainly to the southern part of the Indian subcontinent...',
      ta: 'தமிழர்கள் என்றும் அழைக்கப்படும் தமிழர்கள், திராவிட இனமொழிக் குழுவாகும், அவர்கள் தமிழ் மொழியை பூர்வீகமாகப் பேசுகிறார்கள் மற்றும் அவர்களின் வம்சாவளியை முக்கியமாக இந்திய ...',
    },
    link: '/history/thamizhar',
  },
  {
    layout: 'static',
    image: pandyaImg,
    label: 'Learn more about Pandyan Dynasty',
    alt: 'Pandyan Dynasty',
    title: {
      en: 'Pandyan Dynasty',
      ta: 'பாண்டியர் அரசாட்சி',
    },
    description: {
      en: 'The Pandyas were the earliest of the Muvendhar and were of high antiquity being mentioned by Kātyāyana and Valmiki.However the establishment of a Pandya territory is not known until the sixth century under King Kadungon who liberated the Pandya country from the Kalabhras. Xuanzang reports that Jainism was flourishing while Buddhism was declining during this period.They were famous for being patrons of the Tamil Sangams which were held in their capital, Madurai....',
      ta: 'பாண்டியர்கள் மூவேந்தர்களில் முந்தியவர்கள் மற்றும் காத்யாயனர் மற்றும் வால்மீகி ஆகியோரால் குறிப்பிடப்பட்ட பழமை வாய்ந்தவர்கள்.  இருப்பினும் களப்பிரர்களிடமிருந்து பாண்டிய நாட்டை விடுவித்த கடுங்கோன் மன்னனின் கீழ் ஆறாம் நூற்றாண்டு வரை பாண்டிய பிரதேசம் நிறுவப்பட்டது அறியப்படவில்லை . இந்த காலகட்டத்தில் பௌத்தம் வீழ்ச்சியடைந்து கொண்டிருந்த சமயம் சமண மதம் தழைத்தோங்கி இருந்ததாக சுவான்சாங் தெரிவிக்கிறார் . அவர்கள் தங்கள் தலைநகரான மதுரையில் நடைபெற்ற....',
    },
    link: '/kings/pandyan',
  },
];

const InterestingTopics = () => {
  const { language } = useContext(Context);
  const largeCard = topicData.find((item) => item.layout === 'large');
  const smallCards = topicData.filter((item) => item.layout === 'small');
  const staticSection = topicData.find((item) => item.layout === 'static');

  return (
    <>
      <section className={styles.inter}>
        <div className={styles.wrapper}>
          {language === 'en' ? (
            <p className={styles.title}>Interesting Topics</p>
          ) : (
            <p className={styles.title}>சுவாரசியமான தலைப்புகள்</p>
          )}

          <Container>
            <Row>
              <Col xs={12} sm={12} md={6}>
                <div className={styles.cardLarge}>
                  <div className={styles.image}>
                    <img
                      src={largeCard.image}
                      alt={largeCard.alt}
                      className={styles.imgResponsive}
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                    />
                  </div>

                  <p style={{ fontSize: '2rem', fontWeight: 'bolder' }}>
                    {largeCard.title[language]}
                  </p>

                  <p>{largeCard.description[language]}</p>
                  <div className={styles.seeMoreContainer}>
                    <a
                      href={largeCard.link}
                      className={styles.seeMore}
                      style={{ textDecoration: 'none' }}
                      aria-label={largeCard.label}
                    >
                      <span className={styles.visually_hidden}>
                        {largeCard.label}
                      </span>
                      {language === 'en' ? 'See More' : 'மேலும் பார்க்க'}
                    </a>
                  </div>
                </div>
              </Col>

              <Col xs={12} sm={12} md={6}>
                <Row>
                  {smallCards.map((card, index) => (
                    <Col xs={12} sm={12} md={12} key={index}>
                      <div className={styles.cardSmall}>
                        <div className={styles.image}>
                          <img
                            src={card.image}
                            alt={card.alt}
                            className={styles.imgResponsive}
                            loading="lazy"
                            decoding="async"
                            fetchPriority="low"
                          />
                        </div>
                        <div className={styles.text}>
                          <p style={{ fontSize: '2rem', fontWeight: 'bolder' }}>
                            {card.title[language]}
                          </p>

                          <p>{card.description[language]}</p>
                          <a
                            href={card.link}
                            className={styles.seeMore}
                            aria-label={card.label}
                          >
                            <span className={styles.visually_hidden}>
                              {card.label}
                            </span>
                            {language === 'en' ? 'See More' : 'மேலும் பார்க்க'}
                          </a>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </section>

      <section className={styles.sectionWrapper}>
        <Container>
          <Row className={styles.cardRow}>
            <Col xs={12} sm={12} md={7}>
              <div className={styles.imagePlaceholder}>
                <img
                  src={staticSection.image}
                  alt={staticSection.alt}
                  className={styles.imgResponsive}
                  loading="lazy"
                  decoding="async"
                  fetchPriority="low"
                />
              </div>
            </Col>
            <Col xs={12} sm={12} md={5}>
              <div className={styles.textContent}>
                <p style={{ fontSize: '2rem', fontWeight: 'bolder' }}>
                  {staticSection.title[language]}
                </p>

                <p className={styles.tamilar}>
                  {staticSection.description[language]}
                </p>

                <a
                  href={staticSection.link}
                  className={styles.seeMore}
                  aria-label={staticSection.label}
                >
                  <span className={styles.visually_hidden}>
                    {staticSection.label}
                  </span>
                  {language === 'en' ? 'See More' : 'மேலும் பார்க்க'}
                </a>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default InterestingTopics;
