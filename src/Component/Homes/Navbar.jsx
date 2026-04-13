import { useState, useContext, useEffect } from 'react';
import styles from '../../Stylesheet/Navbar.module.css';
import { FaSearch } from 'react-icons/fa';
import { MdOutlineMenuOpen, MdPerson } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import hoverimg from '../../image/hoverimg.png'
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



const Header = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  // Handle scroll detection for mobile header transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);





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
                <span className={styles.brandMain}>
                  <span className={styles.brandText}>TAMIZHI</span>
                  <img src={hoverimg} alt="" className={styles.logoHoverOverlay} aria-hidden="true" />
                </span>
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
            <a href="/write" className={styles.writeBtn}>TO WRITE</a>

            {tokenContext ? (
              <button className={styles.loginBtn} onClick={handleLogOut}>LOGOUT</button>
            ) : (
              <button className={styles.loginBtn} onClick={() => navigate('/login')}>LOGIN</button>
            )}

            {/* Premium Language Switcher */}
            <div className={styles.premiumLangSwitcher}>
              <button 
                className={`${styles.langTab} ${language === 'en' ? styles.langTabActive : ''}`} 
                onClick={() => changeLanguage('en')}
              >
                EN
              </button>
              <button 
                className={`${styles.langTab} ${language === 'ta' ? styles.langTabActive : ''}`} 
                onClick={() => changeLanguage('ta')}
              >
                தமிழ்
              </button>
            </div>

            <div
              className={styles.profileAvatar}
              title={tokenContext ? "Logout" : "Login"}
              onClick={() => {
                if (tokenContext) {
                  handleLogOut();
                } else {
                  navigate('/login');
                }
              }}
              style={{ cursor: 'pointer' }}
            >
              <div className={styles.avatarImg}>
                <MdPerson />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className={styles.mobileHeader}>
        <div className={styles.singleBar}>
          <div className={styles.leftActions}>
            <MdOutlineMenuOpen
              className={styles.iconbar}
              onClick={() => setShowMobileMenu((prev) => !prev)}
            />
          </div>

          {!isSearchActive ? (
            <h1 className={styles.logo}>Tamizhi</h1>
          ) : null}

          <div className={`${styles.searchControl} ${isSearchActive ? styles.searchActive : ''}`}>
            {isSearchActive && (
              <input
                type="text"
                placeholder="Search..."
                autoFocus
                className={styles.animatedSearchInput}
                onBlur={() => !category.searchText && setIsSearchActive(false)}
                onChange={(e) => handleSearch('searchText', e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleClick(e)}
              />
            )}
            <button 
              className={styles.searchToggleBtn} 
              onClick={() => setIsSearchActive(!isSearchActive)}
            >
              <FaSearch size={20} />
            </button>
          </div>

          <div className={styles.rightActions}>
            <div className={styles.mobileLangSwitcher}>
              <div
                className={`${styles.langTabMobile} ${language === 'en' ? styles.activeTabMobile : ''}`}
                onClick={() => changeLanguage('en')}
              >
                EN
              </div>
              <div
                className={`${styles.langTabMobile} ${language === 'ta' ? styles.activeTabMobile : ''}`}
                onClick={() => changeLanguage('ta')}
              >
                தமிழ்
              </div>
            </div>
            
            <div className={styles.userLoginMobile} onClick={() => !tokenContext && navigate('/login')}>
              <MdPerson className={styles.iconuser} />
              {tokenContext ? (
                <span className={styles.logoutText} onClick={handleLogOut}>OUT</span>
              ) : (
                <span className={styles.loginText}>IN</span>
              )}
            </div>
          </div>

          {showMobileMenu && (
            <div className={styles.mobileMenuOverlay} onClick={() => setShowMobileMenu(false)}>
              <div className={styles.mobileMenuContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.mobileMenuHeader}>
                  <div className={styles.menuBrand}>
                    <span className={styles.brandMainTiny}>TAMIZHI</span>
                  </div>
                  <button className={styles.closeMenu} onClick={() => setShowMobileMenu(false)}>&times;</button>
                </div>
                
                <div className={styles.mobileNavLinksWrapper}>
                  <ul className={styles.mobileNavLinks}>
                    <li style={{"--i": 1}}><Link to="/" onClick={() => setShowMobileMenu(false)}><span>HOME</span></Link></li>
                    <li style={{"--i": 2}}><Link to="/category" onClick={() => setShowMobileMenu(false)}><span>CATEGORY</span></Link></li>
                    <li style={{"--i": 3}}><Link to="/podcast" onClick={() => setShowMobileMenu(false)}><span>PODCAST</span></Link></li>
                    <li style={{"--i": 4}}><Link to="/about" onClick={() => setShowMobileMenu(false)}><span>ABOUT</span></Link></li>
                    <li style={{"--i": 5}}><Link to="/contact" onClick={() => setShowMobileMenu(false)}><span>CONTACT</span></Link></li>
                  </ul>
                  
                  <div className={styles.mobileActions}>
                    <a href="/write" onClick={() => setShowMobileMenu(false)} className={styles.mobileWriteBtnModern}>
                      TO WRITE
                    </a>
                  </div>
                </div>

                <div className={styles.menuDividerModern}></div>
                
                <div className={styles.mobileCategoryHeaderModern}>EXPLORE BY ERA</div>
                <div className={styles.categoryGrid}>
                  <div className={styles.catItem} onClick={() => handleSelectAndClose('categorySelection', '/subcategory/history')}>History</div>
                  <div className={styles.catItem} onClick={() => handleSelectAndClose('categorySelection', '/subcategory/kings')}>Kings</div>
                  <div className={styles.catItem} onClick={() => handleSelectAndClose('categorySelection', '/war')}>War</div>
                  <div className={styles.catItem} onClick={() => handleSelectAndClose('categorySelection', '/culture')}>Culture</div>
                  <div className={styles.catItem} onClick={() => handleSelectAndClose('categorySelection', '/temple')}>Temple</div>
                  <div className={styles.catItem} onClick={() => handleSelectAndClose('categorySelection', '/architecture')}>Architecture</div>
                  <div className={styles.catItem} onClick={() => handleSelectAndClose('categorySelection', '/historical places')}>Historical places</div>
                  <div className={styles.catItem} onClick={() => handleSelectAndClose('categorySelection', '/poet')}>Poet</div>
                  <div className={styles.catItem} onClick={() => handleSelectAndClose('categorySelection', '/books')}>Books</div>
                  <div className={styles.catItem} onClick={() => handleSelectAndClose('categorySelection', '/lord')}>Lord</div>
                  <div className={styles.catItem} onClick={() => handleSelectAndClose('categorySelection', '/excavation')}>Excavation</div>
                  <div className={styles.catItem} onClick={() => handleSelectAndClose('categorySelection', '/mythology')}>Mythology</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* <Modal
        show={showModal}
        onHide={handleModal}
        centered
        className={styles.loginModal}
      >
        <div className={styles.modalContent}>
          <button className={styles.closeButton} onClick={handleModal}>
            &times;
          </button>
          <Login homePage={true} handleModal={handleModal} />
        </div>
      </Modal> */}
    </>
  );
};

export default Header;
