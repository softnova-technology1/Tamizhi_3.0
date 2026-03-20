import { Container, Row, Col } from 'react-bootstrap';
import classes from '../Stylesheet/TopNavBar.module.css';
import light_mode from '../image/light_mode.png';
import night_mode from '../image/night_mode.png';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../Context/contextApi';

const pathNoNightmode = [
  '/category',
  '/podcast',
  '/about',
  '/contact',
  '/subcategory/history',
  '/subcategory/kings',
];
export default function TopNavBar({
  handleDarkmode,
  navopen,
  handleNavClick,
  darkmode,
}) {
  const location = useLocation();
  const { language, changeLanguage, mobileViewOn } = useContext(Context);
  function handleChange(event) {
    changeLanguage(event.target.value);
  }
  function handleClick(value) {
    handleDarkmode(value);
  }
  function noDarkMode(path) {
    let value = pathNoNightmode.find(
      (item) => item.toLowerCase() === path.toLowerCase(),
    );
    if (!value) {
      return false;
    }
    return true;
  }
  const setDarkValue = noDarkMode(location.pathname);
  return (
    <Container
      className={`${classes.topContainer} `}
      style={{ maxWidth: '100%' }}
    >
      <Row>
        <Col xs={1} sm={1} md={2}>
          <div>
            <h1 className={classes.logo}>Tamizhi</h1>
          </div>
        </Col>
        <Col
          xs={12}
          sm={8}
          md={7}
          className={navopen ? classes.layout_nav : classes.active}
        >
          <div
            className={`${classes.layout_nav_list} ${classes.alignment} ${classes.fontSize} `}
          >
            <div onClick={() => handleNavClick()} className={classes.closeIcon}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={classes.svg}
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <Link to="/" className={classes.linkStyle}>
              <div>Home</div>
            </Link>
            <Link to="/category" className={classes.linkStyle}>
              <div>Category</div>
            </Link>
            <Link to="/podcast" className={classes.linkStyle}>
              <div>Podcast</div>
            </Link>
            {/* <Link to="#" className={classes.linkStyle}>
              <div>Books</div>
            </Link> */}
            <Link to="/about" className={classes.linkStyle}>
              <div>About</div>
            </Link>
            <Link to="/contact" className={classes.linkStyle}>
              <div>Contact</div>
            </Link>
            {/* <Link to="#" className={classes.linkStyle}>
              <div>Donate</div>
            </Link> */}
          </div>
        </Col>
        {!navopen && (
          <Col xs={11} sm={3} md={3}>
            <div
              className={`${classes.layout} ${classes.alignment} `}
              style={{ height: '100%' }}
            >
              <div className={`${classes.layout} ${classes.alignment}`}>
                {!mobileViewOn && (
                  <p className={classes.centerAlignment}>Language</p>
                )}
                <select
                  className={classes.formSelect}
                  name="select_language"
                  defaultValue={language}
                  onChange={(e) => handleChange(e)}
                >
                  <option value="en">English</option>
                  <option value="tn">Tamil</option>
                </select>
              </div>

              <div
                className={classes.layout}
                style={{
                  border: !setDarkValue ? '2px solid black' : '',
                  borderRadius: '2rem',
                  padding: '5px',
                }}
              >
                {!setDarkValue && (
                  <>
                    <button
                      className={`${classes.buttonStyle} ${darkmode === 'off' ? classes.buttonActive : ''}`}
                      onClick={() => handleClick('off')}
                    >
                      <img
                        src={light_mode}
                        alt="light mode"
                        className={classes.Img}
                      />
                    </button>
                    <button
                      className={`${classes.buttonStyle} ${darkmode === 'on' ? classes.buttonActive : ''}`}
                      onClick={() => handleClick('on')}
                    >
                      <img
                        src={night_mode}
                        alt="night mode"
                        className={classes.Img}
                      />
                    </button>
                  </>
                )}
                <button
                  style={{ border: 'none', backgroundColor: '#d9d9d9' }}
                  onClick={() => handleNavClick()}
                  className={classes.mobileView}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className={classes.svg}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </Col>
        )}
      </Row>
    </Container>
  );
}
