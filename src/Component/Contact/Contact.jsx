import { useEffect, useState } from 'react';
import styles from '../../Stylesheet/ContactRedesign.module.css';
import MapImage from '../../image/tamilnadu.png';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaRegCalendarAlt,
  FaFacebookF,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
} from 'react-icons/fa';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
import { nameCheck, emailCheck, numberCheck } from '../../utility/Validation';
import emailjs from '@emailjs/browser';
import { Link, Form } from 'react-router-dom';

const ContactUs = () => {
  const [fieldValue, setFieldValue] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: '',
    phonenumber: '',
  });
  const [edit, hasEdit] = useState({
    firstName: false,
    lastName: false,
    email: false,
    message: false,
    phonenumber: false,
  });
  const [responseValue, setResponse] = useState(false);

  useEffect(() => {
    emailjs.init({
      publicKey: 'd4SFdVVQWcQPp5o-d',
    });
  }, []);

  const handleChange = (id, value) => {
    setFieldValue((pre) => ({
      ...pre,
      [id]: value,
    }));
    hasEdit((pre) => ({
      ...pre,
      [id]: false,
    }));
  };

  const handleBlur = (id) => {
    hasEdit((pre) => ({
      ...pre,
      [id]: true,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { firstName, lastName, email, message, phonenumber } = fieldValue;

    if (
      firstName.trim() &&
      lastName.trim() &&
      email.trim() &&
      message.trim() &&
      phonenumber.trim()
    ) {
      if (
        nameCheck(firstName) &&
        nameCheck(lastName) &&
        emailCheck(email) &&
        numberCheck(phonenumber)
      ) {
        emailjs.send('service_vbtow0s', 'template_ug73dsx', fieldValue).then(
          (response) => {
            if (response.status === 200) {
              setResponse('success');
              setFieldValue({
                firstName: '',
                lastName: '',
                email: '',
                message: '',
                phonenumber: '',
              });
              hasEdit({
                firstName: false,
                lastName: false,
                email: false,
                message: false,
                phonenumber: false,
              });
            }
          },
          (error) => {
            setResponse('error');
          }
        );
      } else {
        setResponse('invalid');
      }
    } else {
      setResponse('missing');
    }
  };

  return (
    <div className={styles.contactContainer}>
      <section className={styles.heroSection}>
        <div className={styles.breadcrumb}>
          <Link to="/" className={styles.home}>Home</Link>
          <span className={styles.arrow}><MdKeyboardDoubleArrowRight /></span>
          <span className={styles.current}>Contact</span>
        </div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Get in Touch</h1>
          <p className={styles.heroSubtitle}>
            Have questions about Tamil heritage or our blog? We'd love to hear from you.
            Write to us and let's start a conversation.
          </p>
        </div>
        <div className={styles.heroImageWrapper}>
          <img src={MapImage} alt="Tamil Nadu Map" className={styles.mapImg} />
        </div>
      </section>

      <main className={styles.mainContent}>
        <div className={styles.formCard}>
          <h2 className={styles.sectionHeading}>Send us a Message</h2>
          
          {responseValue === 'success' && (
            <div className={`${styles.statusMessage} ${styles.success}`}>
              Thank you! Your message has been sent successfully.
            </div>
          )}
          {responseValue === 'error' && (
            <div className={`${styles.statusMessage} ${styles.error_msg}`}>
              Oops! Something went wrong. Please try again later.
            </div>
          )}
          {responseValue === 'invalid' && (
            <div className={`${styles.statusMessage} ${styles.warning}`}>
              Please check your input and ensure all fields are valid.
            </div>
          )}
          {responseValue === 'missing' && (
            <div className={`${styles.statusMessage} ${styles.warning}`}>
              Please fill in all the required fields.
            </div>
          )}

          <Form className={styles.form} onSubmit={handleSubmit} noValidate>
            <div className={styles.inputGroup}>
              <div className={styles.fieldWrapper}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="First Name"
                  value={fieldValue.firstName}
                  onBlur={() => handleBlur('firstName')}
                  onChange={(e) => handleChange('firstName', e.target.value)}
                />
                {edit.firstName && !nameCheck(fieldValue.firstName) && (
                  <span className={styles.error}>First name must be under 25 characters</span>
                )}
              </div>
              <div className={styles.fieldWrapper}>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Last Name"
                  value={fieldValue.lastName}
                  onBlur={() => handleBlur('lastName')}
                  onChange={(e) => handleChange('lastName', e.target.value)}
                />
                {edit.lastName && !nameCheck(fieldValue.lastName) && (
                  <span className={styles.error}>Last name must be under 25 characters</span>
                )}
              </div>
            </div>

            <div className={styles.inputGroup}>
              <div className={styles.fieldWrapper}>
                <input
                  className={styles.input}
                  type="email"
                  placeholder="Email Address"
                  value={fieldValue.email}
                  onBlur={() => handleBlur('email')}
                  onChange={(e) => handleChange('email', e.target.value)}
                />
                {edit.email && !emailCheck(fieldValue.email) && (
                  <span className={styles.error}>Please enter a valid email address</span>
                )}
              </div>
              <div className={styles.fieldWrapper}>
                <input
                  className={styles.input}
                  type="tel"
                  placeholder="Phone Number"
                  maxLength="10"
                  value={fieldValue.phonenumber}
                  onBlur={() => handleBlur('phonenumber')}
                  onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))}
                  onChange={(e) => handleChange('phonenumber', e.target.value)}
                />
                {edit.phonenumber && !numberCheck(fieldValue.phonenumber) && (
                  <span className={styles.error}>Please enter a valid 10-digit number</span>
                )}
              </div>
            </div>

            <div className={styles.fieldWrapper}>
              <textarea
                className={styles.textarea}
                placeholder="What's on your mind?"
                value={fieldValue.message}
                onBlur={() => handleBlur('message')}
                onChange={(e) => handleChange('message', e.target.value)}
              ></textarea>
              {edit.message && !fieldValue.message.trim() && (
                <span className={styles.error}>Please enter your message</span>
              )}
            </div>

            <button className={styles.submitBtn} type="submit">
              Send Message
            </button>
          </Form>
        </div>

        <div className={styles.infoSidebar}>
          <div className={styles.infoCard}>
            <div className={styles.infoItem}>
              <div className={styles.iconBox}><FaPhoneAlt /></div>
              <div className={styles.infoText}>
                <span className={styles.infoLabel}>Call Us</span>
                <span className={styles.infoValue}>+91 63851 18083</span>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.iconBox}><FaEnvelope /></div>
              <div className={styles.infoText}>
                <span className={styles.infoLabel}>Email Us</span>
                <span className={styles.infoValue}>vanakkam@tamizhi.blog</span>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.iconBox}><FaMapMarkerAlt /></div>
              <div className={styles.infoText}>
                <span className={styles.infoLabel}>Visit Us</span>
                <span className={styles.infoValue}>
               1st Floor, Softnova Appartment, SNV Mahal back side,
Near SBI bank, Peravurani.
                </span>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.iconBox}><FaRegCalendarAlt /></div>
              <div className={styles.infoText}>
                <span className={styles.infoLabel}>Working Hours</span>
                <span className={styles.infoValue}>Mon – Fri: 10AM – 6PM</span>
              </div>
            </div>
          </div>

          <div className={styles.socialSection}>
            <h3 className={styles.socialTitle}>Follow our Journey</h3>
            <div className={styles.socialGrid}>
              <Link to="https://www.facebook.com/people/Softnovatech/61561099109544/" target="_blank" className={styles.socialIcon}>
                <FaFacebookF />
              </Link>
              <Link to="https://api.whatsapp.com/send/?phone=6385118083" target="_blank" className={styles.socialIcon}>
                <FaWhatsapp />
              </Link>
              <Link to="https://www.instagram.com/softnovatech/" target="_blank" className={styles.socialIcon}>
                <FaInstagram />
              </Link>
              <Link to="https://www.linkedin.com/company/softnovatechnology/" target="_blank" className={styles.socialIcon}>
                <FaLinkedin />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ContactUs;

