import { useState, useContext } from 'react';
import styles from '../../Stylesheet/Navbar.module.css';
import { FaSearch, FaScroll } from 'react-icons/fa';
import { MdOutlineMenuOpen, MdPerson } from 'react-icons/md';
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
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [category, setCategory] = useState({
    categorySelection: '',
    searchText: '',
  });

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

  const handleSelectAndClose = (name, value) => {
    handleCategorySelect(name, value);
    setShowMobileMenu(false);
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
      <header className={`${styles.headerWrapper} fixed-top`}>
        <div className={styles.topBar}>
          {/* Logo Section */}
          <div className={styles.leftTop}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '15px' }}>
              {/* <div className={styles.gLogoBox}>G</div> */}
              <div className={styles.brandInfo}>
                <span className={styles.brandMain}>TAMIZHI</span>
                {/* <span className={styles.brandSub}>SCHOLARLY ARCHIVE</span> */}
              </div>
            </Link>
          </div>

          {/* Navigation Section */}
          <ul className={styles.navLinks}>
            <li className={styles.navItem}><Link to="/">HOME</Link></li>
            <li className={styles.navItem}>
              <Link to="/category" onClick={(e) => {
                e.preventDefault();
                // Logic to toggle a category list if needed, or just link
                navigate('/category');
              }}>CATEGORY</Link>
            </li>
            <li className={styles.navItem}><Link to="/podcast">PODCAST</Link></li>
            {/* <li className={styles.navItem}>
              <Link to="/category-books">
                <FaScroll className={styles.iconScroll} /> BOOKS
              </Link>
            </li> */}
            <li className={styles.navItem}><Link to="/about">ABOUT</Link></li>
            <li className={styles.navItem}><Link to="/contact">CONTACT</Link></li>
            {/* <li className={styles.navItem}><Link to="/donate">DONATE</Link></li> */}
          </ul>

          {/* Search Section */}
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
                <option value="" disabled>CATEGORY</option>
                <option value="/subcategory/history">HISTORY</option>
                <option value="/subcategory/kings">KINGS</option>
                <option value="/war">WAR</option>
                <option value="/culture">CULTURE</option>
                <option value="/temple">TEMPLE</option>
                <option value="/architecture">ARCHITECTURE</option>
                <option value="/historical_place">HISTORICAL PLACE</option>
                <option value="/poet">POET</option>
                <option value="/category-books">BOOKS</option>
                <option value="/lord">LORD</option>
                <option value="/excavation">EXCAVATION</option>
                <option value="/mythology">MYTHOLOGY</option>
              </select>
            </div>

            <div className={styles.verticalLine}></div>

            <input
              type="text"
              placeholder="Search articles, manuscript..."
              className={styles.searchInput}
              onChange={(e) => handleSearch('searchText', e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleClick(e)}
            />

            <button className={styles.searchIcon} onClick={handleClick}>
              <FaSearch size={20} />
            </button>
          </div>

          {/* Actions Section */}
          <div className={styles.actionButtons}>
            <a href="#towrite" className={styles.writeBtn}>TO WRITE</a>

            {tokenContext ? (
              <button className={styles.loginBtn} onClick={handleLogOut}>LOGOUT</button>
            ) : (
              <Link to="/login" className={styles.loginBtn}>LOGIN</Link>
            )}

            {/* Premium Language Switcher */}
            <div className={styles.langSwitchWrapper}>
              <div className={styles.langSwitchBtn} onClick={toggleLanguage}>
                <div className={`${styles.langSwitchCircle} ${language === 'en' ? styles.enActive : styles.tnActive}`}></div>
                <div className={styles.langLabels}>
                  <span className={`${styles.langLabel} ${language === 'en' ? styles.activeLabel : ''}`}>EN</span>
                  <span className={`${styles.langLabel} ${language === 'tn' ? styles.activeLabel : ''}`}>TN</span>
                </div>
              </div>
            </div>

            <div 
              className={styles.profileAvatar} 
              title={language === 'en' ? 'Switch to Tamil' : 'Switch to English'} 
            >
              <div className={styles.avatarImg}>
                <MdPerson />
              </div>
            </div>
          </div>
        </div>
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
