import styles from './../../Stylesheet/Podcast.module.css';
import background from '../../image/podcastbg.png';
import mic from '../../image/music.png';
import tamil from '../../image/whole.png';
import brush from '../../image/soon.png';
import {
  FaFacebookF,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
const Podcast = () => {
  return (
    <div className={styles.container}>
      <img
        src={background}
        alt="Podcast Background"
        className={styles.banner}
      />

      <div className={styles.overlay}>
        <img src={mic} alt="Mic Icon" className={styles.micIcon} />
        <img src={tamil} alt="Tamil Logo" className={styles.tamilLogo} />
        <img src={brush} alt="Coming Soon" className={styles.comingSoon} />
        <div className={styles.iconContainer}>
          <div className={styles.iconWrapper}>
            <Link
              to="https://www.facebook.com/people/Softnovatech/61561099109544/?mibextid=qi2Omg&rdid=6hL55dQqxi67yKIS&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2Ft1ufRjHfuJA6jfxE%2F%3Fmibextid%3Dqi2Omg"
              target="_blank"
            >
              <FaFacebookF className={styles.changecolor} />
            </Link>
          </div>
          <div className={styles.iconWrapper2}>
            <Link
              to="https://api.whatsapp.com/send/?phone=6385118083&text&type=phone_number&app_absent=0"
              target="_blank"
            >
              <FaWhatsapp className={styles.changecolor} />
            </Link>
          </div>
          <div className={styles.iconWrapper3}>
            <Link
              to="https://www.instagram.com/accounts/login/?next=%2Fsoftnovatech%2F&source=omni_redirect"
              target="_blank"
            >
              <FaInstagram className={styles.changecolor} />
            </Link>
          </div>

          <div className={styles.iconWrapper1}>
            <Link
              to="https://www.linkedin.com/company/softnovatechnology/"
              target="_blank"
            >
              <FaLinkedin className={styles.changecolor} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Podcast;
