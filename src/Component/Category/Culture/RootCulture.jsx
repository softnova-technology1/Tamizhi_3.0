import SideNav from '../SideNav';
import { Outlet, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import classes from '../../../Stylesheet/RootBooks.module.css';
import cultureDataEn from '../../../Language/en/culture.json';
import cultureDataTN from '../../../Language/tam/culture.json';
import { useContext, useState, useEffect } from 'react';
import { Context } from '../../../Context/contextApi.jsx';
import { Helmet } from 'react-helmet';
import ImageComponent from '../../ImageComponent.jsx';
import TamilAnimation from '../../TamilzhiLoader.jsx';
// import bgImage from '../../../image/sand.png';

export default function RootCulture() {
  const { language, darkmode, navopen } = useContext(Context);

  const [readMore, setReadMore] = useState(false);
  function handleReadMore() {
    setReadMore(true);
  }
  const location = useLocation();

  const data =
    language === 'en' ? cultureDataEn['culture'] : cultureDataTN['culture'];
  const nameOfContent = 'culture';
  return (
    <>
      <Container
        fluid
        className={`${classes.rootContainer} ${darkmode !== 'off' ? classes.darkTheme : ''}`}
        style={{ opacity: navopen ? 0.5 : 1, padding: 0 }}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>
            Experience the Unique Festivities of Tamil Nadu's Culture
          </title>
          <meta
            name="title"
            content="Experience the Unique Festivities of Tamil Nadu's Culture"
          />
          <meta
            name="description"
            content="Join us in celebrating Tamil Nadu’s vibrant culture, featuring its diverse religions, stunning art forms, festivals, and the culinary delights you can't miss!"
          />
        </Helmet>
        <Row className={` ${classes.bannerRow} g-0`}>
          <Col xs={12}>
            <ImageComponent
              tamilContent="  தமிழர் பண்பாடு – காலம் மாறினாலும் வேர் மாறாது!"
              englishContent="  Tamil culture – time may change, but roots remain!"
              imgurl="https://tamizhiv2.s3.eu-north-1.amazonaws.com/culture-seven.png "
              pathName={location.pathname}
            />
          </Col>
        </Row>

        <div className={classes.contenWrapper}>
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
                    sm={3}
                    md={3}
                    className={`${classes.sideNavContainer} ${classes.mobileHidden}`}
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
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}
