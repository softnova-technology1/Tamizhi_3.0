import { useContext, useState, useEffect } from 'react';
import styles from '../../Stylesheet/contacthome.module.css';
import { Form, Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { nameCheck, emailCheck, numberCheck } from '../../utility/Validation';
import { Context } from '../../Context/contextApi';
import ScrollTitle from './ScrollTitle';
import {
  FaFacebookF,
  FaWhatsapp,
  FaInstagram,
  FaLinkedin,
} from 'react-icons/fa';
import scrollVideo from '../../image/contactdove.mp4';
// import Logo from './Logo';

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
  const { language } = useContext(Context);

  const [responseValue, setResponse] = useState(false);
  let firstNameCheck =
    edit.firstName && !nameCheck(fieldValue.firstName.trim());
  let lastNameCheck = edit.lastName && !nameCheck(fieldValue.lastName.trim());
  let phoneNumbercheck =
    edit.phonenumber && !numberCheck(fieldValue.phonenumber);
  let emailChecked = edit.email && !emailCheck(fieldValue.email);
  let messageCheck = edit.message && !fieldValue.message.trim().length > 0;
  useEffect(() => {
    emailjs.init({
      publicKey: 'd4SFdVVQWcQPp5o-d',
    });
  }, []);
  function handleSubmit(event) {
    event.preventDefault();
    const { firstName, lastName, email, message, phonenumber } = fieldValue;

    if (
      firstName.trim().length > 0 &&
      lastName.trim().length > 0 &&
      email.trim().length > 0 &&
      message.trim().length > 0 &&
      phonenumber.trim().length > 0
    ) {
      if (
        nameCheck(firstName) &&
        nameCheck(lastName) &&
        emailCheck(email) &&
        numberCheck(phonenumber)
      ) {
        emailjs.send('service_vbtow0s', 'template_ug73dsx', fieldValue).then(
          function (response) {
            if (response.status === 200) {
              setResponse(true);

              setFieldValue((pre) => {
                return {
                  firstName: '',
                  lastName: '',
                  email: '',
                  message: '',
                  phonenumber: '',
                };
              });
              hasEdit(() => {
                return {
                  firstName: false,
                  lastName: false,
                  email: false,
                  message: false,
                  phonenumber: false,
                };
              });
            }
          },
          function (error) {
            setResponse('error');
          },
        );
      } else {
        setResponse('data-entry-false');
      }
    } else {
      setResponse('data-entry-false');
    }
  }
  function handleChange(id, value) {
    setFieldValue((pre) => {
      return {
        ...pre,
        [id]: value,
      };
    });
    hasEdit((pre) => {
      return {
        ...pre,
        [id]: false,
      };
    });
  }
  function handleBlur(id) {
    hasEdit((pre) => {
      return {
        ...pre,
        [id]: true,
      };
    });
  }
  let responseData = (function () {
    if (responseValue === true)
      return (
        <p
          className={styles.success}
          style={{ width: '75%', marginBottom: '2rem' }}
        >
          Successfully submitted
        </p>
      );
    else if (responseValue === 'error')
      return (
        <p
          className={styles.danger}
          style={{ width: '75%', marginBottom: '2rem' }}
        >
          Submission Failed. Please try again
        </p>
      );
    else if (responseValue === 'data-entry-false')
      return (
        <p
          className={styles.warning}
          style={{ width: '75%', marginBottom: '2rem' }}
        >
          Please enter valid value in all fields
        </p>
      );
  })();

  return (
    <div className={`containers ${styles.contactSection}`}>
      <div className='mb-md-5 pb-md-5 mb-3 pb-3'>
        <ScrollTitle className={styles.title}>
          {language === 'en' ? 'Contact Us' : 'தொடர்பு கொள்ள...'}
        </ScrollTitle>
      </div>

     

      <div className="row align-items-center justify-content-around gap-5">
        <div className="col-md-5 mb-4 mb-md-0">
          <div className={styles.imageWrapper}>
            <video
              autoPlay
              loop
              muted
              className={styles.contactImage}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            >
              <source src={scrollVideo} type="video/mp4" />
            </video>
          </div>
        </div>

        <div className="col-md-5">
          <div className={styles.formWrapper}>
            <h3 className={styles.formTitle}>
              {language === 'en' ? "Let's get connected" : "இணைந்திருப்போம்..."}
            </h3>

            {responseData && <div className="text-center">{responseData}</div>}

            <Form
              onSubmit={(event) => handleSubmit(event)}
              method="POST"
              noValidate
              autoComplete="nope"
            >
              <div className="row g-3">
                <div className="col-md-6">
                  <input
                    type="text"
                    className={styles.inputBox}
                    placeholder={language === 'en' ? "First Name" : "முதல் பெயர்"}
                    value={fieldValue.firstName}
                    required
                    name="firstName"
                    onBlur={() => handleBlur('firstName')}
                    onChange={(event) => handleChange('firstName', event.target.value)}
                  />
                  {firstNameCheck && (
                    <p className="text-danger" style={{ fontSize: "18px" }}>
                      {language === 'en' ? "First Name should be less than 25 characters" : "முதல் பெயர் 25 எழுத்துக்களுக்கு குறைவாக இருக்க வேண்டும்"}
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    name="lastName"
                    value={fieldValue.lastName}
                    required
                    onBlur={() => handleBlur('lastName')}
                    className={styles.inputBox}
                    placeholder={language === 'en' ? "Last Name" : "இறுதி பெயர்"}
                    onChange={(event) => handleChange('lastName', event.target.value)}
                  />
                  {lastNameCheck && (
                    <p className="text-danger" style={{ fontSize: "18px" }}>
                      {language === 'en' ? "Last Name should be less than 25 characters" : "இறுதி பெயர் 25 எழுத்துக்களுக்கு குறைவாக இருக்க வேண்டும்"}
                    </p>
                  )}
                </div>

                <div className="col-md-6">
                  <input
                    type="email"
                    name="email"
                    required
                    value={fieldValue.email}
                    className={styles.inputBox}
                    onBlur={() => handleBlur('email')}
                    placeholder={language === 'en' ? "Email address" : "மின்னஞ்சல் முகவரி"}
                    onChange={(event) => handleChange('email', event.target.value)}
                  />
                  {emailChecked && (
                    <p className="text-danger" style={{ fontSize: "18px" }}>
                      {language === 'en' ? "Please enter valid email" : "சரியான மின்னஞ்சலை உள்ளிடவும்"}
                    </p>
                  )}
                </div>
                <div className="col-md-6">
                  <input
                    type="tel"
                    className={styles.inputBox}
                    placeholder={language === 'en' ? "Phone Number" : "தொலைபேசி எண்"}
                    maxLength="10"
                    required
                    value={fieldValue.phonenumber}
                    onInput={(e) => (e.target.value = e.target.value.replace(/[^0-9]/g, ''))}
                    onChange={(e) => handleChange('phonenumber', e.target.value)}
                    onBlur={() => handleBlur('phonenumber')}
                    name="phonenumber"
                  />
                  {phoneNumbercheck && (
                    <p className="text-danger" style={{ fontSize: "18px" }}>
                      {language === 'en' ? "Please enter valid PhoneNumber" : "சரியான தொலைபேசி எண்ணை உள்ளிடவும்"}
                    </p>
                  )}
                </div>

                <div className="col-12">
                  <textarea
                    className={styles.textArea}
                    placeholder={language === 'en' ? "Your Message..." : "எனது செய்தி..."}
                    required
                    onBlur={() => handleBlur('message')}
                    value={fieldValue.message}
                    name="message"
                    onChange={(event) => handleChange('message', event.target.value)}
                  ></textarea>
                  {messageCheck && (
                    <p className="text-danger" style={{ fontSize: "18px" }} >
                      {language === 'en' ? "Please enter valid message" : "சரியான செய்தியை உள்ளிடவும்"}
                    </p>
                  )}
                </div>

                <div className="col-12">
                  <button type="submit" className={styles.submitButton}>
                    {language === 'en' ? "SUBMIT" : "அனுப்புக"}
                  </button>
                </div>
              </div>
            </Form>

            <div className={styles.socialIcons}>
              <div className={styles.iconborder}>
                <Link
                  className={styles.iconcolor}
                  to="https://www.facebook.com/people/Softnovatech/61561099109544/"
                  target="_blank"
                  aria-label="Facebook"
                >
                  <FaFacebookF className={styles.iconcolor1} />
                </Link>
              </div>
              <div className={styles.iconborder2}>
                <Link
                  className={styles.iconcolor}
                  to="https://api.whatsapp.com/send/?phone=6385118083"
                  target="_blank"
                  aria-label="Whatsapp"
                >
                  <FaWhatsapp className={styles.iconcolor1} />
                </Link>
              </div>
              <div className={styles.iconborder3}>
                <Link
                  className={styles.iconcolor}
                  to="https://www.instagram.com/softnovatech/"
                  target="_blank"
                  aria-label="Instagram"
                >
                  <FaInstagram className={styles.iconcolor1} />
                </Link>
              </div>
              <div className={styles.iconborder1}>
                <Link
                  className={styles.iconcolor}
                  to="https://www.linkedin.com/company/softnovatechnology/"
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className={styles.iconcolor1} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
