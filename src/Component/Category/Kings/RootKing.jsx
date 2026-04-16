import SideNav from '../SideNav';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import kingDataEn from '../../../Language/en/kings.json';
import kingDataTN from '../../../Language/tam/kings.json';
import { useContext, useState, useEffect } from 'react';
import { Context } from '../../../Context/contextApi.jsx';
import ImageComponent from '../../ImageComponent.jsx';
import TamilAnimation from '../../TamilzhiLoader.jsx';
import { Helmet } from 'react-helmet';
// import bgImage from '../../../image/sand.png';
import classes from '../../../Stylesheet/RootBooks.module.css';

const contentData = {
  chola: {
    tamilContent:
      'சோழனின் செருப்பில் நிலம் நடுங்கியது – சீரழியாத சாம்ராஜ்யம்!"',
    englishContent:
      'The land trembled beneath Chola’s feet – an empire that knew no fall!',
    imgUrl: 'https://tamizhiv2.s3.eu-north-1.amazonaws.com/chola-head.png',
  },
  chera: {
    tamilContent: 'வணிகமும் வீரமும் சேரநாட்டின் நிழலில் நிழன்றது!',
    englishContent: 'Trade and valor thrived in the shade of Chera land!',
    imgUrl: 'https://tamizhiv2.s3.eu-north-1.amazonaws.com/head-2.jpg',
  },
  pandyan: {
    tamilContent: 'பாண்டியர் பாடும் சங்கம் – தமிழின் பொற்காலம்!',
    englishContent: 'The Pandyas sang the Sangam – the golden age of Tamil!',
    imgUrl:
      'https://tamizhiv2.s3.eu-north-1.amazonaws.com/meenakshi-temple.jpg',
  },
  kalabhra: {
    tamilContent: 'அரசியல் அலையை புரட்டிய மறைந்த வல்லரசு!',
    englishContent: 'The hidden power that stirred the tides of dynasties!',
    imgUrl: 'https://tamizhiv2.s3.eu-north-1.amazonaws.com/kalabhra.jpg ',
  },
  pallavas: {
    tamilContent: 'பல்லவர் பொன்மணியால் பொலிந்த கலை நாகரிகம்!',
    englishContent: 'A Pallava glow carved a civilization of gold and stone!',
    imgUrl: 'https://tamizhiv2.s3.eu-north-1.amazonaws.com/pallava-dynasty.jpg',
  },
};
export default function RootHistory() {
  const { language, darkmode, navopen } = useContext(Context);
  const [readMore, setReadMore] = useState(false);
  function handleReadMore() {
    setReadMore(true);
  }
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, []);
  const nameOfContent = 'kings';
  const location = useLocation();
  const params = useParams();

  const data =
    language === 'en'
      ? kingDataEn[params.kingsValue.toLowerCase()]
      : kingDataTN[params.kingsValue.toLowerCase()];
  let tamilContent = contentData[params.kingsValue.toLowerCase()].tamilContent;
  let englishContent =
    contentData[params.kingsValue.toLowerCase()].englishContent;
  let imgUrl = contentData[params.kingsValue.toLowerCase()].imgUrl;
  return (
    <>
      {show && <TamilAnimation show={setShow} />}
      <Container
        fluid
        className={`${classes.rootContainer} ${darkmode !== 'off' ? classes.darkTheme : ''}`}
        style={{ opacity: navopen ? 0.5 : 1, padding: 0 }}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Extraordinary Temples: A Journey with Chola and Chera</title>
          <meta
            name="title"
            content="Extraordinary Temples: A Journey with Chola and Chera"
          />
          <meta
            name="description"
            content="Uncover the secrets of the Chola, Chera, Pallava, and Pandya kings who left powerful temples, shaping a divine and hopeful future for generations."
          />
        </Helmet>
        <Row className={`${classes.bannerRow} g-0`}>
          <Col xs={12}>
            <ImageComponent
              tamilContent={tamilContent}
              englishContent={englishContent}
              pathName={location.pathname}
              imgurl={imgUrl}
            />
          </Col>
        </Row>
        <div className={classes.contentWrapper}>
          <Row>
            <Col xs={12}>
              <div
                className={classes.ancientCard}
                style={{
                  backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.4)), url("https://tamizhiv2.s3.eu-north-1.amazonaws.com/tamizhi2-0/sand.webp")`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center bottom',
                  backgroundAttachment: 'fixed',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <Row>
                  <Col
                    xs={12}
                    lg={3}
                    className={`${classes.sideNavContainer} ${classes.mobileHidden}`}
                  >
                    <SideNav
                      data={data}
                      darkmode={darkmode}
                      handleReadMore={handleReadMore}
                      nameOfContent={nameOfContent}
                    />
                  </Col>
                  <Col
                    xs={12}
                    lg={9}
                    className={classes.contentContainer}
                  >
                    <Outlet
                      context={[data, nameOfContent, readMore, handleReadMore]}
                    />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}
