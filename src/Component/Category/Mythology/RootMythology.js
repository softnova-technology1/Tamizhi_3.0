import SideNav from '../SideNav';
import { Outlet, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import classes from '../../../Stylesheet/RootHistory.module.css';
import mythologyDataEn from '../../../Language/en/mythology.json';
import mythologyDataTN from '../../../Language/tam/mythology.json';
import { useContext, useState, useEffect } from 'react';
import TamilAnimation from '../../TamilzhiLoader.js';
import { Context } from '../../../Context/contextApi.js';
import ImageComponent from '../../ImageComponent.js';
import { Helmet } from 'react-helmet';
export default function RootMythology() {
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

  const nameOfContent = 'mythology';
  const data =
    language === 'en'
      ? mythologyDataEn['mythology']
      : mythologyDataTN['mythology'];
  return (
    <>
      {show && <TamilAnimation show={setShow} />}
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Divine Legends: Myths, Saints & Sacred Traditions</title>
          <meta
            name="title"
            content="Divine Legends: Myths, Saints & Sacred Traditions"
          />
          <meta
            name="description"
            content="Explore India’s rich spiritual tapestry—from saints of the Periya Puranam to deities like Ayyappan, Mariamman, Varuna & more, revealing deep devotion & symbolism"
          />
        </Helmet>
        <Row className={classes.mobileView}>
          <Col xs={12} sm={12} md={12}>
            <ImageComponent
              tamilContent=" கதைகள் அல்ல – நம் நம்பிக்கையின் உயிர்க்களம்!"
              englishContent=" Not just stories – the soul of our faith!"
              imgurl="https://tamizhiv2.s3.eu-north-1.amazonaws.com/mythology-head.jpg"
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
