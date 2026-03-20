import SideNav from '../SideNav';
import { Outlet, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import classes from '../../../Stylesheet/RootHistory.module.css';
import poetDataEn from '../../../Language/en/poet.json';
import poetDataTN from '../../../Language/tam/poet.json';
import { useContext, useState, useEffect } from 'react';
import { Context } from '../../../Context/contextApi.js';
import TamilAnimation from '../../TamilzhiLoader.js';
import ImageComponent from '../../ImageComponent.js';
import { Helmet } from 'react-helmet';
export default function RootPoet() {
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
  const nameOfContent = 'poet';

  const data = language === 'en' ? poetDataEn['poet'] : poetDataTN['poet'];
  return (
    <>
      {show && <TamilAnimation show={setShow} />}
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Extraordinary Tamil Legacy: Poetic Journeys of Love</title>
          <meta
            name="title"
            content="Extraordinary Tamil Legacy: Poetic Journeys of Love"
          />
          <meta
            name="description"
            content="Journey through Tamil’s artistic evolution as Chera, Chola, Pallava, and Pandyan poets.the brilliance of Tamil poetry from Alvars to Nayanars"
          />
        </Helmet>
        <Row className={classes.mobileView}>
          <Col xs={12} sm={12} md={12}>
            <ImageComponent
              tamilContent=" சொல்லின் சுழலில் உலகம் திரும்பியது!"
              englishContent="The world turned with the swirl of their words!"
              imgurl="https://tamizhiv2.s3.eu-north-1.amazonaws.com/poet-heads.jpg"
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
