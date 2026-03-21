import classes from '../Stylesheet/TopNavBar.module.css';
import light_mode from '../image/light_mode.png';
import night_mode from '../image/night_mode.png';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../Context/contextApi';
import { MdOutlineMenuOpen } from 'react-icons/md';

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
    return !!value;
  }

  const setDarkValue = noDarkMode(location.pathname);

  return (
    <header className={classes.topContainer}>
      <div style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', padding: '0 60px' }}>
        {/* Logo Section */}
        <div className={classes.leftTop}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <h1 className={classes.logo}>Tamizhi</h1>
          </Link>
        </div>

        {/* Navigation Section */}
        <nav className={`${classes.active} ${classes.navBar}`}>
          <div className={classes.layout_nav_list}>
            <Link to="/" className={classes.linkStyle}>Home</Link>
            <Link to="/category" className={classes.linkStyle}>Category</Link>
            <Link to="/podcast" className={classes.linkStyle}>Podcast</Link>
            <Link to="/about" className={classes.linkStyle}>About</Link>
            <Link to="/contact" className={classes.linkStyle}>Contact</Link>
          </div>
        </nav>

        {/* Actions Section */}
        <div className={classes.layout}>
          <div className={classes.alignment} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {!mobileViewOn && <p className={classes.centerAlignment}>Language</p>}
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

          {!setDarkValue && (
            <div className={classes.themeToggle} style={{ display: 'flex', gap: '12px' }}>
              <button
                className={`${classes.buttonStyle} ${darkmode === 'off' ? classes.buttonActive : ''}`}
                onClick={() => handleClick('off')}
              >
                <img src={light_mode} alt="light mode" className={classes.Img} />
              </button>
              <button
                className={`${classes.buttonStyle} ${darkmode === 'on' ? classes.buttonActive : ''}`}
                onClick={() => handleClick('on')}
              >
                <img src={night_mode} alt="night mode" className={classes.Img} />
              </button>
            </div>
          )}

          <button
            onClick={() => handleNavClick()}
            className={classes.mobileView}
          >
            <MdOutlineMenuOpen className={classes.svg} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {navopen && (
        <div className={classes.layout_nav}>
          <div className={classes.layout_nav_list}>
            <div onClick={() => handleNavClick()} className={classes.closeIcon}>
               <MdOutlineMenuOpen className={classes.svg} style={{ transform: 'rotate(180deg)' }} />
            </div>
            <Link to="/" className={classes.linkStyle} onClick={handleNavClick}>Home</Link>
            <Link to="/category" className={classes.linkStyle} onClick={handleNavClick}>Category</Link>
            <Link to="/podcast" className={classes.linkStyle} onClick={handleNavClick}>Podcast</Link>
            <Link to="/about" className={classes.linkStyle} onClick={handleNavClick}>About</Link>
            <Link to="/contact" className={classes.linkStyle} onClick={handleNavClick}>Contact</Link>
          </div>
        </div>
      )}
    </header>
  );
}


