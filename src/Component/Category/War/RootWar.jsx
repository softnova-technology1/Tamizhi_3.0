import SideNav from '../SideNav';
import { Outlet, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import warDataEn from '../../../Language/en/war.json';
import warDataTN from '../../../Language/tam/war.json';
import { useContext, useState, useEffect } from 'react';
import TamilAnimation from '../../TamilzhiLoader.jsx';
import { Context } from '../../../Context/contextApi.jsx';
import ImageComponent from '../../ImageComponent.jsx';
import { Helmet } from 'react-helmet';
import bgImage from '../../../image/sand.png';
import classes from '../../../Stylesheet/RootBooks.module.css';

export default function RootWar() {
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
  const nameOfContent = 'war';

  const location = useLocation();

  const data = language === 'en' ? warDataEn['war'] : warDataTN['war'];
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
          <title>Clashes of Kings: Epic Battles of Tamil Nadu</title>
          <meta
            name="title"
            content="Clashes of Kings: Epic Battles of Tamil Nadu"
          />
          <meta
            name="description"
            content="Explore Tamil Nadu’s major battles Pullalur, Vatapi, Thirupurambiyam, Takkolam & Toppur uncovering their background, outcomes, key rulers & historic impact"
          />
        </Helmet>

        <Row className={`${classes.bannerRow} g-0`}>
          <Col xs={12}>
            <ImageComponent
              tamilContent=" வீரத்தின் மொழி, தமிழரின் குரல்! "
              englishContent="The language of valor, the voice of Tamils!"
              imgurl="https://tamizhiv2.s3.eu-north-1.amazonaws.com/war-five.jpg "
              pathName={location.pathname}
            />
          </Col>
        </Row>

        <div className={classes.contentWrapper}>
          <Row>
            <Col xs={12} sm={12} md={12}>
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
