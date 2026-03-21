import styles from '../../Stylesheet/Footer.module.css';
import logo from './../../image/Group 65.webp';
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
    <div className="containers">
      <div className={styles.footer1}>
        {/* <div className={styles.scrollBg}></div> */}
      </div>
      {/* from second version */}
      <footer className={styles.footer}>
        <div className={styles.topWave}></div>
        <div className={styles.content1}>
          <div className={styles.left}>
            <h1 className={styles.logoText}>
              Tam<span className={styles.highlight}>i</span>
              <span className={styles.highlight1}>z</span>h<span>i</span>
            </h1>
            <p className={styles.mission}>
              No matter who you are and wherever you are, we are just connecting
              together all Tamil people through this website.
            </p>
            <div className={styles.foot}>
              <div>
                <ul className={styles.navLinks}>
                  <li>
                    <Link
                      to="/"
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/category">Category</Link>
                  </li>
                  <li>
                    <Link to="/podcast">Podcast</Link>
                  </li>
                  <li>
                    <Link to="/">Books</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/">Donate</Link>
                  </li>
                </ul>
              </div>
              <div className={styles.contact}>
                <div className={styles.col}>
                  <div className={styles.icon1}>
                    <a
                      href="https://maps.app.goo.gl/kJPLYzY46T7U2b2L6"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="map"
                    >
                      <FaMapMarkerAlt size={20} className={styles.icon} />
                    </a>
                  </div>
                  <div>
                    1st Floor, Aadhil block, Shavanna apartment,
                    <br />
                    SNV Mahal back side, Near SBI bank, Peravurani.
                  </div>
                </div>
                <div className={styles.col}>
                  <div className={styles.icon1}>
                    <a href="mailto:vanakkam@tamizhi.blog" aria-label="mail">
                      <FaEnvelope size={20} className={styles.icon} />
                    </a>
                  </div>
                  <div className={styles.pad}>vanakkam@tamizhi.blog</div>
                </div>
                <div className={styles.col}>
                  <div className={styles.icon1}>
                    <a
                      href="tel:+916385118083"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="phone"
                    >
                      <FaPhoneAlt size={20} className={styles.icon} />
                    </a>
                  </div>
                  <div className={styles.pad}>+91 63851 18083</div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.socialicons1}>
              <div className={styles.iconborder}>
                <Link
                  className={styles.iconcolor}
                  to="https://www.facebook.com/people/Softnovatech/61561099109544/?mibextid=qi2Omg&rdid=6hL55dQqxi67yKIS&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2Ft1ufRjHfuJA6jfxE%2F%3Fmibextid%3Dqi2Omg"
                  target="_blank"
                  aria-label="Visit our Facebook page"
                >
                  <FaFacebookF />
                </Link>
              </div>
              <div className={styles.iconborder2}>
                <Link
                  className={styles.iconcolor}
                  to="https://api.whatsapp.com/send/?phone=6385118083&text&type=phone_number&app_absent=0"
                  target="_blank"
                  aria-label="Visit our Whatsapp page"
                >
                  <FaWhatsapp />
                </Link>
              </div>
              <div className={styles.iconborder3}>
                <Link
                  className={styles.iconcolor}
                  to="https://www.instagram.com/accounts/login/?next=%2Fsoftnovatech%2F&source=omni_redirect"
                  target="_blank"
                  aria-label="Visit our Instagram page"
                >
                  <FaInstagram />
                </Link>
              </div>
              <div className={styles.iconborder1}>
                <Link
                  className={styles.iconcolor}
                  to="https://www.linkedin.com/company/softnovatechnology/"
                  target="_blank"
                  aria-label="Visit our LinkedIn page"
                >
                  <FaLinkedin />
                </Link>
              </div>
            </div>
            <img src={logo} alt="Tamizhi Logo" className={styles.logo} />
          </div>
        </div>
        <div className={styles.bottom}>
          <a
            href="https://softnovatech.com/"
            target="_blank"
            className={styles.fontcolor}
            rel="noopener noreferrer"
          >
            <p className={styles.logoText1}>
              Tam<span className={styles.highlight}>i</span>
              <span className={styles.highlight1}>z</span>h
              <span className={styles.fontgap}>i</span>
              is a division of
              <img
                src={logo1}
                alt="softnova"
                className={styles.imgsize}
                width="100"
                height="60"
              />
              Corp. @2025 Softnova Technology Pvt. Ltd. All rights reserved
            </p>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
