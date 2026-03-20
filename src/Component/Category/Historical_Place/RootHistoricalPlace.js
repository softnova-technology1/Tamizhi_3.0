import SideNav from '../SideNav';
import { Outlet, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import classes from '../../../Stylesheet/RootHistory.module.css';
import historical_placeDataEn from '../../../Language/en/historical_place.json';
import historical_placeDataTN from '../../../Language/tam/historical_place.json';
import { useContext, useState, useEffect } from 'react';
import TamilAnimation from '../../TamilzhiLoader.js';
import { Context } from '../../../Context/contextApi.js';
import { Helmet } from 'react-helmet';
import ImageComponent from '../../ImageComponent.js';
export default function RootHistoricalPlace() {
  const { language, darkmode, navopen } = useContext(Context);
  const nameOfContent = 'historical_place';
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, []);
  const [readMore, setReadMore] = useState(false);
  function handleReadMore() {
    setReadMore(true);
  }

  const location = useLocation();

  const data =
    language === 'en'
      ? historical_placeDataEn[nameOfContent]
      : historical_placeDataTN[nameOfContent];
  return (
    <>
      {show && <TamilAnimation show={setShow} />}
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>
            Ancient Shrines to Serene Shores: The Essence of Tamil Nadu
          </title>
          <meta
            name="title"
            content="Ancient Shrines to Serene Shores: The Essence of Tamil Nadu"
          />
          <meta
            name="description"
            content="Discover the fascinating blend of history and spirituality in Tamil Nadu. Visit iconic temples and experience the vibrant culture that captivates all!"
          />
        </Helmet>
        <Row className={classes.mobileView}>
          <Col xs={12} sm={12} md={12}>
            <ImageComponent
              tamilContent="  காலத்தைக் கடந்த கதை சொல்லும் தமிழ் நிலம்!"
              englishContent="  Tamil land – where every stone tells a timeless tale!"
              imgurl="https://tamizhiv2.s3.eu-north-1.amazonaws.com/historical-three.jpg"
              pathName={location.pathname}
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
                    nameOfContent={nameOfContent}
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
