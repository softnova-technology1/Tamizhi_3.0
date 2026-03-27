import SideNav from '../SideNav';
import { Outlet, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
// import classes from '../../../Stylesheet/RootHistory.module.css';
import poetDataEn from '../../../Language/en/poet.json';
import poetDataTN from '../../../Language/tam/poet.json';
import { useContext, useState, useEffect } from 'react';
import { Context } from '../../../Context/contextApi.jsx';
import TamilAnimation from '../../TamilzhiLoader.jsx';
import ImageComponent from '../../ImageComponent.jsx';
import { Helmet } from 'react-helmet';
import classes from '../../../Stylesheet/RootBooks.module.css';
import bgImage from '../../../image/sand.png';

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
      <Container
              fluid
              className={`${classes.rootContainer} ${darkmode !== 'off' ? classes.darkTheme : ''}`}
              style={{ opacity: navopen ? 0.5 : 1, padding: 0 }}
            >
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

        <Row className={`${classes.bannerRow} g-0`}>
                  <Col xs={12}>
            <ImageComponent
              tamilContent=" சொல்லின் சுழலில் உலகம் திரும்பியது!"
              englishContent="The world turned with the swirl of their words!"
              imgurl="https://tamizhiv2.s3.eu-north-1.amazonaws.com/poet-heads.jpg"
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
