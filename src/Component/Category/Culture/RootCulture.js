import SideNav from '../SideNav';
import { Outlet, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import classes from '../../../Stylesheet/RootHistory.module.css';
import cultureDataEn from '../../../Language/en/culture.json';
import cultureDataTN from '../../../Language/tam/culture.json';
import { useContext, useState, useEffect } from 'react';
import { Context } from '../../../Context/contextApi.js';
import { Helmet } from 'react-helmet';
import ImageComponent from '../../ImageComponent.js';
import TamilAnimation from '../../TamilzhiLoader.js';
export default function RootCulture() {
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
  const location = useLocation();

  const data =
    language === 'en' ? cultureDataEn['culture'] : cultureDataTN['culture'];
  const nameOfContent = 'culture';
  return (
    <>
      {show && <TamilAnimation show={setShow} />}
      <Container>
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
        <Row className={classes.mobileView}>
          <Col xs={12} sm={12} md={12}>
            <ImageComponent
              tamilContent="  தமிழர் பண்பாடு – காலம் மாறினாலும் வேர் மாறாது!"
              englishContent="  Tamil culture – time may change, but roots remain!"
              imgurl="https://tamizhiv2.s3.eu-north-1.amazonaws.com/culture-seven.png "
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
