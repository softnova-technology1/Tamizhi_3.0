import SideNav from '../SideNav';
import { Outlet, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import excavationDataEn from '../../../Language/en/excavation.json';
import excavationDataTN from '../../../Language/tam/excavation.json';
import { useContext } from 'react';
import { Context } from '../../../Context/contextApi.jsx';
import ImageComponent from '../../ImageComponent.jsx';
import { useEffect, useState } from 'react';
import TamilAnimation from '../../TamilzhiLoader.jsx';
import { Helmet } from 'react-helmet';
import bgImage from '../../../image/sand.png';
import classes from '../../../Stylesheet/RootBooks.module.css';

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
      <Container
        fluid
        className={`${classes.rootContainer} ${darkmode !== 'off' ? classes.darkTheme : ''}`}
        style={{ opacity: navopen ? 0.5 : 1, padding: 0 }}
      >
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

        <Row className={`${classes.bannerRow} g-0`}>
          <Col xs={12}>
            <ImageComponent
              tamilContent=" புதையலுக்குள் புதைந்த தமிழரின் பெருமை!"
              englishContent=" Buried treasures reveal Tamil pride!"
              imgurl="https://tamizhiv2.s3.eu-north-1.amazonaws.com/excavation-two.jpeg"
              pathName={location.pathname}
            />
          </Col>
        </Row>

        <div className={classes.contentWrapper}>
          <Row>
            <Col xs={12}>
              <div
                className={classes.ancientCard}
                style={{
                  backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.4)), url(${bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center bottom',
                  backgroundAttachment: 'fixed',
                  backgroundRepeat: 'no-repeat',
                }}
              >
                <Row>
                  <Col
                    xs={12}
                    sm={3}
                    md={3}
                    className={`${classes.sideNavContainer} ${classes.mobileHidden}`}
                  >
                    <SideNav data={data} darkmode={darkmode} nameOfContent="excavation" />
                  </Col>
                  <Col
                    xs={12}
                    sm={9}
                    md={9}
                    className={classes.contentContainer}
                  >
                    <Outlet context={[data]} />
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
