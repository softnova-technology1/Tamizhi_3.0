import SideNav from '../SideNav';
import { Outlet, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import classes from '../../../Stylesheet/RootBooks.module.css'; 
import booksDataEn from '../../../Language/en/books.json';
import booksDataTN from '../../../Language/tam/books.json';
import { useContext, useState, useEffect } from 'react';
import { Context } from '../../../Context/contextApi.jsx';
import ImageComponent from '../../ImageComponent.jsx';
import { Helmet } from 'react-helmet';
import TamilAnimation from '../../TamilzhiLoader.jsx';

export default function RootBooks() {
  const { language, darkmode, navopen } = useContext(Context);

  const [readMore, setReadMore] = useState(false);
  function handleReadMore() {
    setReadMore(true);
  }
  const nameOfContent = 'books';

  const location = useLocation();

  const data = language === 'en' ? booksDataEn['books'] : booksDataTN['books'];

  return (
    <>
      <Container
        fluid
        className={`${classes.rootContainer} ${darkmode !== 'off' ? classes.darkTheme : ''}`}
        style={{ opacity: navopen ? 0.5 : 1, padding: 0 }}
      >
        <Helmet>
          <meta charSet="utf-8" />
          <title>Ancient Tamil Books of Poetry and Philosophy</title>
          <meta
            name="title"
            content="Ancient Tamil Books of Poetry and Philosophy"
          />
          <meta
            name="description"
            content="Uncover the emotional depth of Tamil poetry from ancient masters. Revel in insights on love, war, and devotion encapsulated within timeless verses."
          />
        </Helmet>
        
        <Row className={`${classes.bannerRow} g-0`}>
          <Col xs={12}>
            <ImageComponent
              tamilContent=" நான் நிலத்தையும் கடலையும் ஆண்டேன், ஆனால் என் மக்களின் இதயங்களை வென்றேன்."
              englishContent=" I ruled the Land and The sea, but I conquered the hearts of my people."
              imgurl="https://tamizhiv2.s3.eu-north-1.amazonaws.com/Books-three.png"
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
