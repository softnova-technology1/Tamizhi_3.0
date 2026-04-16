import SideNav from '../SideNav';
import { Outlet, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import mythologyDataEn from '../../../Language/en/mythology.json';
import mythologyDataTN from '../../../Language/tam/mythology.json';
import { useContext, useState } from 'react';
import { Context } from '../../../Context/contextApi.jsx';
import ImageComponent from '../../ImageComponent.jsx';
import { Helmet } from 'react-helmet';
// import bgImage from '../../../image/sand.png';
import classes from '../../../Stylesheet/RootBooks.module.css';

export default function RootMythology() {
  const { language, darkmode, navopen } = useContext(Context);

  const [readMore, setReadMore] = useState(false);
  function handleReadMore() {
    setReadMore(true);
  }
  const location = useLocation();

  const nameOfContent = 'mythology';
  const data =
    language === 'en'
      ? mythologyDataEn['mythology']
      : mythologyDataTN['mythology'];
  return (
    <>
       <Container
              fluid
              className={`${classes.rootContainer} ${darkmode !== 'off' ? classes.darkTheme : ''}`}
              style={{ opacity: navopen ? 0.5 : 1, padding: 0 }}
            >
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
       <Row className={`${classes.bannerRow} g-0`}>
                <Col xs={12}>
            <ImageComponent
              tamilContent=" கதைகள் அல்ல – நம் நம்பிக்கையின் உயிர்க்களம்!"
              englishContent=" Not just stories – the soul of our faith!"
              imgurl="https://tamizhiv2.s3.eu-north-1.amazonaws.com/mythology-head.jpg"
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
