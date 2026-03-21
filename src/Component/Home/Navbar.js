import { useState, useContext } from 'react';
import styles from '../../Stylesheet/Navbar.module.css';
import { Container, Col } from 'react-bootstrap';
import { FaSearch, FaClock, FaPhoneAlt } from 'react-icons/fa';
import { MdEmail, MdOutlineMenuOpen, MdPerson } from 'react-icons/md';
import { ImUser } from 'react-icons/im';
import dayjs from 'dayjs';
import { Link, useNavigate } from 'react-router-dom';
import navbarimg from '../../image/navbarimg.png'
import { Context } from '../../Context/contextApi';
const kings = ['chola', 'chera', 'pandyan', 'kalabhra', 'pallavas'];
const history = ['tamilagam', 'thamizhar', 'tamizh', 'brahmi'];
const searchTextContent = [
  'history',
  'kings',
  'war',
  'culture',
  'temple',
  'architecture',
  'historical place',
  'poet',
  'books',
  'lord',
  'excavation',
  'mythology',
];

function dayRepresentation(dayIndex) {
  const names = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return names[dayIndex];
}

const Header = () => {
  const handleSelectAndClose = (name, value) => {
    handleCategorySelect(name, value);
    setShowMobileMenu(false);
  };

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [category, setCategory] = useState({
    categorySelection: '',
    searchText: '',
  });

  const now = dayjs();
  const time = now.format('hh:mm');
  const day = dayRepresentation(now.day());
  const {
    language,
    changeLanguage,
    handleToken,
    findUserFunction,
    tokenContext,
  } = useContext(Context);

  const navigate = useNavigate();

  const toggleLanguage = () => {
    changeLanguage(language === 'en' ? 'tn' : 'en');
  };
  function handleCategorySelect(id, value) {
    setCategory((pre) => ({ ...pre, [id]: value }));
    navigate(`${value}`);
  }
  function handleSearch(id, value) {
    setCategory((pre) => ({ ...pre, [id]: value }));
  }
  function handleLogOut() {
    localStorage.removeItem('token');
    handleToken(null);
    findUserFunction(null);
  }
  function handleClick(event) {
    const serachingText = category.searchText.trim().toLowerCase();

    if (category.categorySelection !== '' && serachingText === '') {
      navigate(category.categorySelection);
    }

    if (category.categorySelection !== '' && serachingText !== '') {
      if (category.categorySelection === '/subcategory/history') {
        let findText = history.find((item) => item === serachingText);
        if (!findText) {
          navigate(category.categorySelection);
        } else {
          navigate(`history/${serachingText}`);
        }
      } else if (category.categorySelection === '/subcategory/kings') {
        let findText = kings.find((item) => item === serachingText);
        if (!findText) {
          navigate(category.categorySelection);
        } else {
          navigate(`kings/${serachingText}`);
        }
      } else {
        navigate('/category');
      }
    }

    if (category.categorySelection === '' && serachingText !== '') {
      if (serachingText === 'history' || serachingText === 'kings') {
        navigate(`/subcategory/${serachingText}`);
      } else {
        let contentText = searchTextContent.find(
          (item) => item === serachingText,
        );
        let findings1 = kings.find((item) => item === serachingText);
        let findings2 = history.find((item) => item === serachingText);

        if (!contentText && !findings1 && !findings2) {
          navigate('/category');
        } else {
          if (findings2) {
            navigate(`/history/${serachingText}`);
          } else if (findings1) {
            navigate(`/kings/${serachingText}`);
          } else {
            navigate(`/${serachingText}`);
          }
        }
      }
    }
  }
  return (
    <>
      <header className={`${styles.headerWrapper} fixed-top`} >
        <div className={styles.topBar}>
          <div className={styles.leftTop}>
            <div className={styles.brand}>Tamizhi</div>
          </div>
          <div className={styles.rightTop}>
            <div className={styles.topfirst}>
              <div className={styles.contactWrapper}>
                <div className={styles.item}>
                  <FaClock className={styles.icon} />
                  <span className={styles.text} style={{ color: '#250505f7' }}>
                    {day} – {time}
                  </span>
                </div>
                <div className={styles.separator} />
                <div className={styles.item}>
                  <FaPhoneAlt className={styles.icon} />
                  <span className={styles.text} style={{ color: '#250505f7' }}>
                    +91 6385118083
                  </span>
                </div>
                <div className={styles.separator} />
                <div className={styles.item}>
                  <MdEmail className={styles.icon} />
                  <span className={styles.text} style={{ color: '#250505f7' }}>
                    vanakkam@tamizhi.blog
                  </span>
                </div>
              </div>
              <div className={styles.actions}>
                <div className={styles.languageWrapper}>
                  <span className={styles.label} style={{ color: '#250505f7' }}>
                    Language
                  </span>
                  <div className={styles.toggleBox} onClick={toggleLanguage}>
                    <div
                      className={`${styles.circle} ${language === 'en' ? styles.moveRight : ''
                        }`}
                    />
                    <span className={styles.langText}>
                      {language === 'en' ? (
                        <span
                          className={styles.leftText}
                          style={{ color: '#250505f7' }}
                        >
                          English
                        </span>
                      ) : (
                        <span
                          className={styles.rightTextHidden}
                          style={{ color: '#250505f7' }}
                        >
                          Tamil
                        </span>
                      )}
                    </span>
                  </div>
                </div>
                <div className={styles.loginWrapper}>
                  <ImUser size={30} />
                  {tokenContext ? (
                    <button
                      className={styles.logout}
                      onClick={() => handleLogOut()}
                      style={{ color: 'black' }}
                    >
                      Logout
                    </button>
                  ) : (
                    <Link
                      to="/login"
                      className={styles.text1}
                      style={{ color: 'black' }}
                    >
                      Login
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <nav className={styles.navBar} style={{ backgroundColor: 'white' }}>
          <Container>
            <div
              className={styles.newbar}
              style={{ alignItems: 'center', marginTop: '1rem' }}
            >
              <Col xs={12} md={6}>
                <ul className={`nav ${styles.navLinks}`}>
                  {[
                    '/',
                    '/category',
                    '/podcast',
                    // '/books',
                    '/about',
                    '/contact',
                    // '/donate',
                  ].map((path) => (
                    <li className="nav-item" key={path}>
                      <Link key={path} to={path} style={{ color: 'black' }}>
                        {path === '/'
                          ? 'Home'
                          : path.slice(1).charAt(0).toUpperCase() +
                          path.slice(2)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Col>

              {/* Search */}
              <div className={styles.newbar1}>
                <Col md={4}>
                  <div className={styles.searchContainer}>
                    <div className={styles.categorySection}>
                      <select
                        className={styles.categorySelect}
                        aria-label="categorySelection"
                        name="categorySelection"
                        onChange={(event) =>
                          handleCategorySelect(
                            'categorySelection',
                            event.target.value,
                          )
                        }
                        value={category.categorySelection}
                      >
                        <option value="" disabled>
                          Category
                        </option>
                        <option value="/subcategory/history">History</option>
                        <option value="/subcategory/kings">Kings</option>
                        <option value="/war">War</option>
                        <option value="/culture">Culture</option>
                        <option value="/temple">Temple</option>
                        <option value="/architecture">Architecture</option>
                        <option value="/historical_place">
                          Historical place
                        </option>
                        <option value="/poet">Poet</option>
                        <option value="/category-books">Books</option>
                        <option value="/lord">Lord</option>
                        <option value="/excavation">Excavation</option>
                        <option value="/mythology">Mythology</option>
                      </select>
                    </div>

                    <input
                      type="text"
                      placeholder="Search"
                      name="searchText"
                      onKeyDown={(e) =>
                        e.key === 'Enter' ? handleClick(e) : ''
                      }
                      onChange={(event) =>
                        handleSearch('searchText', event.target.value)
                      }
                      className={styles.searchInput}
                    />
                    <div style={{ padding: '0 1rem' }}>
                      <button
                        className={styles.searchIcon}
                        aria-label="search"
                        onClick={(event) => handleClick(event)}
                      >
                        <FaSearch
                          style={{
                            width: '20px',
                            height: '20px',
                            color: '#808080',
                          }}
                        />
                      </button>
                    </div>
                  </div>
                </Col>

                {/* To Write */}
                <Col xs={12} md={2}>
                  <a
                    href="#towrite"
                    className={`btn ${styles.writeBtn}`}
                    style={{ color: '#b79775' }}
                  >
                    To Write
                  </a>
                </Col>
              </div>
            </div>
          </Container>
        </nav>
      </header>
      <div className={styles.mobileHeader}>
        <div className={styles.topBar}>
          <div className={styles.menuContainer}>
            <MdOutlineMenuOpen
              className={styles.iconbar}
              onClick={() => setShowMobileMenu((prev) => !prev)}
            />
            {showMobileMenu && (
              <div className={styles.mobileSearchContainer}>
                <ul className={styles.customDropdown}>
                  <li
                    onClick={() =>
                      handleSelectAndClose(
                        'categorySelection',
                        '/subcategory/history',
                      )
                    }
                  >
                    History
                  </li>
                  <li
                    onClick={() =>
                      handleSelectAndClose(
                        'categorySelection',
                        '/subcategory/kings',
                      )
                    }
                  >
                    Kings
                  </li>
                  <li
                    onClick={() =>
                      handleSelectAndClose('categorySelection', '/war')
                    }
                  >
                    War
                  </li>
                  <li
                    onClick={() =>
                      handleSelectAndClose('categorySelection', '/culture')
                    }
                  >
                    Culture
                  </li>
                  <li
                    onClick={() =>
                      handleSelectAndClose('categorySelection', '/temple')
                    }
                  >
                    Temple
                  </li>
                  <li
                    onClick={() =>
                      handleSelectAndClose('categorySelection', '/architecture')
                    }
                  >
                    Architecture
                  </li>
                  <li
                    onClick={() =>
                      handleSelectAndClose(
                        'categorySelection',
                        '/historical_place',
                      )
                    }
                  >
                    Historical Place
                  </li>
                  <li
                    onClick={() =>
                      handleSelectAndClose('categorySelection', '/poet')
                    }
                  >
                    Poet
                  </li>
                  <li
                    onClick={() =>
                      handleSelectAndClose('categorySelection', '/books')
                    }
                  >
                    Books
                  </li>
                  <li
                    onClick={() =>
                      handleSelectAndClose('categorySelection', '/lord')
                    }
                  >
                    Lord
                  </li>
                  <li
                    onClick={() =>
                      handleSelectAndClose('categorySelection', '/excavation')
                    }
                  >
                    Excavation
                  </li>
                  <li
                    onClick={() =>
                      handleSelectAndClose('categorySelection', '/mythology')
                    }
                  >
                    Mythology
                  </li>
                </ul>
              </div>
            )}
          </div>
         
          <h1 className={styles.logo}>Tamizhi</h1>
          <div className={styles.userLogin}>
            <MdPerson className={styles.iconuser} />
            {tokenContext ? (
              <button
                className={styles.logout}
                onClick={() => handleLogOut()}
                style={{ color: '#4b2e0f' }}
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className={styles.text1}
                style={{ color: '#4b2e0f' }}
              >
                Login
              </Link>
            )}
          </div>
        </div>

        <div className={styles.bottomBar}>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Search"
              name="searchText"
              onKeyDown={(event) =>
                event.key === 'Enter' ? handleClick(event) : ''
              }
              onChange={(event) =>
                handleSearch('searchText', event.target.value)
              }
              className={styles.searchInput}
            />
            <button
              className={styles.searchIcon}
              onClick={handleClick}
              aria-label="search"
            >
              <FaSearch style={{ width: '25px', height: '25px' }} />
            </button>
          </div>
          <div className={styles.languageCircleToggle}>
            <div
              className={`${styles.circleText} ${language === 'en' ? styles.active : ''}`}
              onClick={() => toggleLanguage('en')}
            >
              ENG
            </div>
            <div
              className={`${styles.circleText} ${language === 'ta' ? styles.active : ''}`}
              onClick={() => toggleLanguage('ta')}
            >
              TAM
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
