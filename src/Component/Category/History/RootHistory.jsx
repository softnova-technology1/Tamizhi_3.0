import SideNav from '../SideNav';
import { Outlet, useParams, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import classes from '../../../Stylesheet/RootBooks.module.css';
import historyDataEn from '../../../Language/en/history.json';
import historyDataTN from '../../../Language/tam/history.json';
import { useContext, useState, useEffect } from 'react';
import { Context } from '../../../Context/contextApi.jsx';
import { Helmet } from 'react-helmet';
import ImageComponent from '../../ImageComponent.jsx';
import TamilAnimation from '../../TamilzhiLoader.jsx';
import bgImage from '../../../image/sand.png';

const contentData = {
  tamilagam: {
    tamilContent:
      'தமிழர் வாழ்ந்த புனித நிலம் — தமிழகம், நம் அடையாளத்தின் மண்!"',
    englishContent:
      'The sacred land where Tamils lived — Tamilagam, the soil of our identity!',
    imgUrl:
      'https://tamizhiv2.s3.eu-north-1.amazonaws.com/thamilagam-three.jpg',
  },
  thamizhar: {
    tamilContent: 'அறம், தளம், பெருமை கொண்டு வாழ்ந்தோர் — தமிழர் நம் பெருமை!',
    englishContent:
      'A people of virtue, vision, and pride — the Tamils, our eternal pride!',
    imgUrl: 'https://tamizhiv2.s3.eu-north-1.amazonaws.com/thamizhar-thre.jpg',
  },
  tamizh: {
    tamilContent: 'உயிரின் ஓசை பேசும் மொழி — உலகத் தமிழ்!',
    englishContent:
      'The language that echoes life — Tamil, the voice of the world!',
    imgUrl: 'https://tamizhiv2.s3.eu-north-1.amazonaws.com/tamizh-head.jpg',
  },
  brahmi: {
    tamilContent: 'எழுத்தின் பிறப்பிடம் — பிராமி நம் வரலாற்றின் துவக்கம்!',
    englishContent:
      'The birthplace of script — Brahmi, the origin of our written history!',
    imgUrl: 'https://tamizhiv2.s3.eu-north-1.amazonaws.com/brahmi-three.jpg',
  },
};
export default function RootHistory() {
  const [readMore, setReadMore] = useState(false);
  function handleReadMore() {
    setReadMore(true);
  }
  const [show, setShow] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 3000);
    return () => clearTimeout(timer);
  }, []);
  const nameOfContent = 'history';

  const { language, darkmode, navopen } = useContext(Context);

  const location = useLocation();
  const params = useParams();

  const data =
    language === 'en'
      ? historyDataEn[params.historyValue.toLowerCase()]
      : historyDataTN[params.historyValue.toLowerCase()];
  let tamilContent =
    contentData[params.historyValue.toLowerCase()].tamilContent;
  let englishContent =
    contentData[params.historyValue.toLowerCase()].englishContent;
  let imgUrl = contentData[params.historyValue.toLowerCase()].imgUrl;
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
          <title>The Truth About Tamil: History and Cultural Obsession</title>
          <meta
            name="title"
            content="The Truth About Tamil: History and Cultural Obsession"
          />
          <meta
            name="description"
            content="Unveil the secrets of Brahmi and its unique connection to Tamizh. Explore how this ancient script shaped the history of Tamizhagam."
          />
        </Helmet>
        <Row className={`${classes.bannerRow} g-0`}>
          <Col xs={12}>
            <ImageComponent
              tamilContent={tamilContent}
              englishContent={englishContent}
              imgurl={imgUrl}
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
