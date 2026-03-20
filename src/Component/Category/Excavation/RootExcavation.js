import SideNav from '../SideNav';
import { Outlet, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import classes from '../../../Stylesheet/RootHistory.module.css';
import excavationDataEn from '../../../Language/en/excavation.json';
import excavationDataTN from '../../../Language/tam/excavation.json';
import { useContext } from 'react';
import { Context } from '../../../Context/contextApi.js';
import ImageComponent from '../../ImageComponent.js';
import { useEffect, useState } from 'react';
import TamilAnimation from '../../TamilzhiLoader.js';
import { Helmet } from 'react-helmet';
export default function RootExcavation() {
  const { language, darkmode, navopen } = useContext(Context);
  const location = useLocation();
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, []);
  const data =
    language === 'en'
      ? excavationDataEn['excavation']
      : excavationDataTN['excavation'];

  return (
    <>
      {show && <TamilAnimation show={setShow} />}
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Tracing Civilizations: Excavations in Tamil Nadu</title>
          <meta
            name="title"
            content="Tracing Civilizations: Excavations in Tamil Nadu"
          />
          <meta
            name="description"
            content="Explore major excavations at Attirampakkam, Arikamedu, and Keezhadi revealing ancient tools, urban cultures, and rich heritage through expert research."
          />
        </Helmet>
        <Row className={classes.mobileView}>
          <Col xs={12} sm={12} md={12}>
            <ImageComponent
              tamilContent=" புதையலுக்குள் புதைந்த தமிழரின் பெருமை!"
              englishContent=" Buried treasures reveal Tamil pride!"
              imgurl="https://tamizhiv2.s3.eu-north-1.amazonaws.com/excavation-two.jpeg"
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
                  <SideNav data={data} darkmode={darkmode} />
                </Col>
                <Col xs={12} sm={9} md={9} className={classes.contentContainer}>
                  <Outlet context={[data]} />
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}
