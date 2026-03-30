import styles from '../../Stylesheet/Footer.module.css';
import logo from './../../image/logo2.png';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaWhatsapp,
  FaInstagram,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaLinkedin,
} from 'react-icons/fa';
import logo1 from './../../image/softnovaLogo.webp';

const Footer = () => {
  return (
    <>
      <div className={styles.footer1}>
        <div className={styles.scrollBg}></div>
      </div>
      <footer className={styles.footer}>
        <div className={styles.content1}>
          <div className={styles.left}>
            <div className={styles.brandWrapper}>
              <img src={logo} alt="Tamizhi" className={styles.logo} />
              <div className={styles.brandText}>
                <h1 className={styles.logoText}>
                  Tam<span className={styles.highlight}>i</span>
                  <span className={styles.highlight1}>z</span>hi
                </h1>
                <span className={styles.tamilText}>தமிழோடு இணையுங்கள்</span>
              </div>
            </div>
            
            <p className={styles.mission}>
              No matter who you are and wherever you are, we are just connecting
              together all Tamil people through this website.
            </p>
            <div className={styles.socialicons1}>
              <div className={styles.iconborder}>
                <Link
                  className={styles.iconcolor}
                  to="https://www.facebook.com/people/Softnovatech/61561099109544/"
                  target="_blank"
                  aria-label="Facebook"
                >
                  <FaFacebookF className='hi' />
                </Link>
              </div>
              <div className={styles.iconborder2}>
                <Link
                  className={styles.iconcolor}
                  to="https://wa.me/916385118083"
                  target="_blank"
                  aria-label="Whatsapp"
                >
                  <FaWhatsapp />
                </Link>
              </div>
              <div className={styles.iconborder3}>
                <Link
                  className={styles.iconcolor}
                  to="https://www.instagram.com/softnovatech/"
                  target="_blank"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </Link>
              </div>
              <div className={styles.iconborder1}>
                <Link
                  className={styles.iconcolor}
                  to="https://www.linkedin.com/company/softnovatechnology/"
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </Link>
              </div>
            </div>
          </div>

          <div className={styles.navLinks}>
            <h3>Explore</h3>
            <ul>
              <li>
                <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/category">Categories</Link>
              </li>
              <li>
                <Link to="/podcast">Podcasts</Link>
              </li>
              <li>
                <Link to="/about">Our Story</Link>
              </li>
              <li>
                <Link to="/contact">Contact Support</Link>
              </li>
            </ul>
          </div>

          <div className={styles.contact}>
            <h3>Reach Us</h3>
            <div className={styles.col}>
              <div className={styles.icon1}>
                <a
                  href="https://maps.app.goo.gl/kJPLYzY46T7U2b2L6"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Location"
                >
                  <FaMapMarkerAlt className={styles.icon} />
                </a>
              </div>
              <div className={styles.pad}>
               1st Floor, Softnova Appartment, SNV Mahal back side,
                <br />
                Near SBI bank, Peravurani.
              </div>
            </div>
            <div className={styles.col}>
              <div className={styles.icon1}>
                <a href="mailto:vanakkam@tamizhi.blog" aria-label="Mail">
                  <FaEnvelope className={styles.icon} />
                </a>
              </div>
              <div className={styles.pad}>vanakkam@tamizhi.blog</div>
            </div>
            <div className={styles.col}>
              <div className={styles.icon1}>
                <a href="tel:+916385118083" aria-label="Phone">
                  <FaPhoneAlt className={styles.icon} />
                </a>
              </div>
              <div className={styles.pad}>+91 63851 18083</div>
            </div>
          </div>
        </div>

        <div className={styles.bottom}>
          <a
            href="https://softnovatech.com/"
            target="_blank"
            className={styles.fontcolor}
            rel="noopener noreferrer"
          >
            <div className={styles.logoText1}>
              <span>Tamizhi is a division of</span>
              <img
                src={logo1}
                alt="softnova"
                className={styles.imgsize}
                width="80"
              />
              <span>© 2025 Softnova Technology Pvt. Ltd. All rights reserved</span>
            </div>
          </a>
        </div>
      </footer>
    </>
  );
};



export default Footer;
