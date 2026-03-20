import SideNav from '../SideNav.js';
import { Outlet, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import classes from '../../../Stylesheet/RootHistory.module.css';
import architectureDataEn from '../../../Language/en/architecture.json';
import architectureDataTN from '../../../Language/tam/architecture.json';
import { useContext, useState, useEffect } from 'react';
import { Context } from '../../../Context/contextApi.js';
import { Helmet } from 'react-helmet';
import ImageComponent from '../../ImageComponent.js';
import TamilAnimation from '../../TamilzhiLoader.js';

export default function RootArchitecture() {
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

  const nameOfContent = 'architecture';
  const data =
    language === 'en'
      ? architectureDataEn['architecture']
      : architectureDataTN['architecture'];
  return (
    <>
      {show && <TamilAnimation show={show} />}
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>
            Experience Remarkable Ancient Architecture in Tamil Nadu
          </title>
          <meta
            name="title"
            content="Experience Remarkable Ancient Architecture in Tamil Nadu"
          />
          <meta
            name="description"
            content="Tamil Nadu offers a beautiful blend of ancient architecture and spiritual depth, from majestic temples to vibrant cultural symbols."
          />
        </Helmet>
        <Row className={classes.mobileView}>
          <Col xs={12} sm={12} md={12}>
            <ImageComponent
              tamilContent="  கல் பேசும் கலை – தமிழரின் கட்டடக் காவியம்! "
              englishContent=" Stones speak art – the architectural epic of Tamils!"
              imgurl="https://tamizhiv2.s3.eu-north-1.amazonaws.com/architecture-two.jpg "
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
