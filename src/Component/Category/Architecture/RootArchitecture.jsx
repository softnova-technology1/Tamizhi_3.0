import SideNav from '../SideNav.jsx';
import { Outlet, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
// import classes from '../../../Stylesheet/RootHistory.module.css';
import classes from '../../../Stylesheet/RootBooks.module.css';
import architectureDataEn from '../../../Language/en/architecture.json';
import architectureDataTN from '../../../Language/tam/architecture.json';
import { useContext, useState, useEffect } from 'react';
import { Context } from '../../../Context/contextApi.jsx';
import { Helmet } from 'react-helmet';
import ImageComponent from '../../ImageComponent.jsx';
import TamilAnimation from '../../TamilzhiLoader.jsx';
import bgImage from '../../../image/sand.png';

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
      {show && <TamilAnimation show={setShow} />}
      <Container
        fluid
        className={`${classes.rootContainer} ${darkmode !== 'off' ? classes.darkTheme : ''}`}
        style={{ opacity: navopen ? 0.5 : 1, padding: 0 }}
      >
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
        <Row className={`${classes.bannerRow} g-0`}>
          <Col xs={12}>
            <ImageComponent
              tamilContent="  கல் பேசும் கலை – தமிழரின் கட்டடக் காவியம்! "
              englishContent=" Stones speak art – the architectural epic of Tamils!"
              imgurl="https://tamizhiv2.s3.eu-north-1.amazonaws.com/architecture-two.jpg "
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
                    <SideNav
                      data={data}
                      darkmode={darkmode}
                      handleReadMore={handleReadMore}
                      nameOfContent={nameOfContent}
                    />
                  </Col>
                  <Col
                    xs={12}
                    sm={9}
                    md={9}
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
