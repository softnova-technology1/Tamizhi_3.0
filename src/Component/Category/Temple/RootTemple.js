import SideNav from '../SideNav';
import { Outlet, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import classes from '../../../Stylesheet/RootHistory.module.css';
import templeDataEn from '../../../Language/en/temple.json';
import templeDataTN from '../../../Language/tam/temple.json';
import { useContext, useState, useEffect } from 'react';
import TamilAnimation from '../../TamilzhiLoader.js';
import { Context } from '../../../Context/contextApi.js';
import ImageComponent from '../../ImageComponent.js';
import { Helmet } from 'react-helmet';
export default function RootTemple() {
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
  const nameOfContent = 'temple';
  const location = useLocation();

  const data =
    language === 'en' ? templeDataEn['temple'] : templeDataTN['temple'];
  return (
    <>
      {show && <TamilAnimation show={setShow} />}
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Uncover Amazing Temples: Tamil Nadu's Beautiful Stories</title>
          <meta
            name="title"
            content="Uncover Amazing Temples: Tamil Nadu's Beautiful Stories"
          />
          <meta
            name="description"
            content="Uncover the wonderful blend of spirituality and artistry in Tamil Nadu’s sacred spaces, from grand Hindu temples to serene Jain shrines and churches."
          />
        </Helmet>
        <Row className={classes.mobileView}>
          <Col xs={12} sm={12} md={12}>
            <ImageComponent
              tamilContent=" சித்தமும் சிவனும் சேர்ந்த தெய்வ மடல்! "
              englishContent="Where spirit meets Shiva – divine halls of glory!"
              imgurl="https://tamizhiv2.s3.eu-north-1.amazonaws.com/temple-two.jpg"
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
