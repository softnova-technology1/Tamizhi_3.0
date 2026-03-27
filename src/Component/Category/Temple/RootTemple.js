import SideNav from '../SideNav';
import { Outlet, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
// import classes from '../../../Stylesheet/RootHistory.module.css';
import templeDataEn from '../../../Language/en/temple.json';
import templeDataTN from '../../../Language/tam/temple.json';
import { useContext, useState, useEffect } from 'react';
import TamilAnimation from '../../TamilzhiLoader.js';
import { Context } from '../../../Context/contextApi.js';
import ImageComponent from '../../ImageComponent.js';
import { Helmet } from 'react-helmet';
import bgImage from '../../../image/sand.png';
import classes from '../../../Stylesheet/RootBooks.module.css';

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
      <Container
        fluid
        className={`${classes.rootContainer} ${darkmode !== 'off' ? classes.darkTheme : ''}`}
        style={{ opacity: navopen ? 0.5 : 1, padding: 0 }}
      >
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

        <Row className={`${classes.bannerRow} g-0`}>
          <Col xs={12}>
            <ImageComponent
              tamilContent=" சித்தமும் சிவனும் சேர்ந்த தெய்வ மடல்! "
              englishContent="Where spirit meets Shiva – divine halls of glory!"
              imgurl="https://tamizhiv2.s3.eu-north-1.amazonaws.com/temple-two.jpg"
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
