import SideNav from '../SideNav';
import { Outlet, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import classes from '../../../Stylesheet/RootHistory.module.css';
import booksDataEn from '../../../Language/en/books.json';
import booksDataTN from '../../../Language/tam/books.json';
import { useContext, useState, useEffect } from 'react';
import { Context } from '../../../Context/contextApi.js';
import ImageComponent from '../../ImageComponent.js';
import { Helmet } from 'react-helmet';
import TamilAnimation from '../../TamilzhiLoader.js';
export default function RootBooks() {
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
  const nameOfContent = 'books';

  const location = useLocation();

  const data = language === 'en' ? booksDataEn['books'] : booksDataTN['books'];
  return (
    <>
      {show && <TamilAnimation show={setShow} />}
      <Container>
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
        <Row className={classes.mobileView}>
          <Col xs={12} sm={12} md={12}>
            <ImageComponent
              tamilContent=" நான் நிலத்தையும் கடலையும் ஆண்டேன், ஆனால் என் மக்களின் இதயங்களை
        வென்றேன்."
              englishContent=" I ruled the Land and The sea, but I conquered the hearts of my people."
              imgurl="https://tamizhiv2.s3.eu-north-1.amazonaws.com/Books-three.png"
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
