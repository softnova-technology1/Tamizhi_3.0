import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Footer from './Home/Footer';
import ScrollToTop from './ScrollToTop';
import styles from '../Stylesheet/Root.module.css';
import Login from './LoginDetails/Login';
import { useContext, useEffect, useState } from 'react';
import { Context } from '../Context/contextApi';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './Homes/Navbar';
import ScrollToTopComponent from './ScrollToTopComponent';
import Spinner from './Spinner';
import backBtnImg from '../image/bacbtn.png';

export default function Root() {
  const {
    tokenContext,
    changeDarkMode,
    navopen,
    handleNavOpen,
    sticky,
    handleSticky,
    darkmode,
    loading,
    handleMobileView,
  } = useContext(Context);

  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  function handleDarkmode(value) {
    changeDarkMode(value);
  }
  function handleModal() {
    setShowModal((pre) => !pre);
  }
  const modalView = showModal && (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div className={styles.modalContainer}>
          <div className={styles.modalTop}>
            <span
              onClick={() => setShowModal(false)}
              style={{ fontSize: '2.5rem' }}
            >
              &times;
            </span>
          </div>
          <div className={styles.modalBody}>
            <Login homePage={true} handleModal={handleModal} />
          </div>
        </div>
      </div>
    </div>
  );
  useEffect(() => {
    document.addEventListener('scroll', (event) => {
      handleSticky();
    });
    return () => {
      document.removeEventListener('scroll', (event) => {
        handleSticky();
      });
    };
  }, [handleSticky]);
  useEffect(() => {
    if (!tokenContext) {
      const timer = setTimeout(() => {
        setShowModal(true);
      }, 100000);
      return () => clearTimeout(timer);
    } else {
      return;
    }
  }, [tokenContext]);
  useEffect(() => {
    handleMobileView();
  }, [handleMobileView]);

  const showBackButton = location.pathname !== '/';

  return location.pathname !== '/' ? (
    <>
      <ScrollToTop />
      <ScrollToTopComponent />
      {showBackButton && (
        <button
          className={styles.imageBackButton}
          onClick={() => navigate(-1)}
          title="Back"
        >
          <img src={backBtnImg} alt="Back" />
        </button>
      )}
      <Container
        style={{
          margin: 0,
          maxWidth: '100%',
          padding: 0,
          height: navopen ? '100vh' : '',
          overflow: navopen ? 'hidden' : '',
        }}
      >
        <Row
          style={{ maxWidth: '100%', margin: 0, padding: 0 }}
          className={sticky ? `${styles.sticky}` : ''}
        >
          <Col xs={12} sm={12} md={12} style={{ padding: 0 }}>
            <Header />
          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={12} md={12}>
            <Container
              className={styles.container}
              style={{
                opacity: navopen ? 0.5 : '',
              }}
            >
              <Row>
                <Outlet /> <div>{modalView}</div> <Footer />
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  ) : (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <ScrollToTop />
          <ScrollToTopComponent />
          <Header />
          <Outlet />
          <div>{modalView}</div>
          <Footer />
        </>
      )}
    </>
  );
}
