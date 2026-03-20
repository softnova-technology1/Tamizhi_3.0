import SideNav from '../SideNav';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import classes from '../../../Stylesheet/RootHistory.module.css';
import kingDataEn from '../../../Language/en/kings.json';
import kingDataTN from '../../../Language/tam/kings.json';
import { useContext, useState, useEffect } from 'react';
import { Context } from '../../../Context/contextApi.js';
import ImageComponent from '../../ImageComponent.js';
import TamilAnimation from '../../TamilzhiLoader.js';
import { Helmet } from 'react-helmet';
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
      <Container>
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
        <Row className={classes.mobileView}>
          <Col xs={12} sm={12} md={12}>
            <ImageComponent
              tamilContent={tamilContent}
              englishContent={englishContent}
              pathName={location.pathname}
              imgurl={imgUrl}
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12}>
            <Container
              className={classes.container}
              style={{
                backgroundColor:
                  darkmode === 'off'
                    ? navopen
                      ? '#d9d9d9'
                      : 'white'
                    : '#2b2a2a',
                color: darkmode === 'off' ? 'black' : 'white',
                opacity: navopen ? 0.5 : '',
              }}
            >
              <Row>
                <Col
                  xs={12}
                  sm={3}
                  md={3}
                  className={`${classes.setScroll} ${classes.mobileView}`}
                >
                  <SideNav
                    data={data}
                    darkmode={darkmode}
                    handleReadMore={handleReadMore}
                  />
                </Col>
                <Col xs={12} sm={9} md={9} className={classes.contentContainer}>
                  <Outlet
                    context={[data, nameOfContent, readMore, handleReadMore]}
                  />
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}
