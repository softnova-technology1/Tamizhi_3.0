import SideNav from '../SideNav';
import { Outlet, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import classes from '../../../Stylesheet/RootHistory.module.css';
import lordDataEn from '../../../Language/en/lord.json';
import lordDataTn from '../../../Language/tam/lord.json';
import { useContext, useState, useEffect } from 'react';
import ImageComponent from '../../ImageComponent';
import { Context } from '../../../Context/contextApi';
import TamilAnimation from '../../TamilzhiLoader.js';
import { Helmet } from 'react-helmet';

export default function RootLord() {
  const { language } = useContext(Context);
  const data = language === 'en' ? lordDataEn['lord'] : lordDataTn['lord'];
  const [readMore, setReadMore] = useState(false);
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, []);
  function handleReadMore() {
    setReadMore(true);
  }

  const { darkmode, navopen } = useContext(Context);

  const location = useLocation();
  const nameOfContent = 'lord';

  return (
    <>
      {show && <TamilAnimation show={setShow} />}
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>The Hidden Path: Mystical Truths Across Traditions</title>
          <meta
            name="title"
            content="The Hidden Path: Mystical Truths Across Traditions"
          />
          <meta
            name="description"
            content="Explore the hidden spiritual wisdom within Shiva, Christ, the Prophet, and Eastern paths—revealing unity, silence, and the divine mystery in all traditions"
          />
        </Helmet>
        <Row className={classes.mobileView}>
          <Col xs={12} sm={12} md={12}>
            <ImageComponent
              tamilContent=" எங்கு தமிழ், அங்கு தெய்வத்தின் ஒலி!"
              englishContent=" Where Tamil lives, the divine echoes!"
              imgurl="https://tamizhiv2.s3.eu-north-1.amazonaws.com/lord-shiva.jpg"
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
