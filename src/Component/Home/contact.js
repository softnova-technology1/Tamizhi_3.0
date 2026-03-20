import { useContext, useState, useEffect } from 'react';
import styles from '../../Stylesheet/contacthome.module.css';
import contact from './../../image/Rectangle 88.webp';
import { Form, Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { nameCheck, emailCheck, numberCheck } from '../../utility/Validation';
import { Context } from '../../Context/contextApi';
import {
  FaFacebookF,
  FaWhatsapp,
  FaInstagram,
  FaLinkedin,
} from 'react-icons/fa';

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
    <div
      className={`container-fluid ${styles.contactSection}`}
      xs={12}
      sm={12}
      md={3}
    >
      {language === 'en' ? (
        <h3 className={styles.title}>Contact Us</h3>
      ) : (
        <h3 className={styles.title}>தொடர்பு கொள்ள...</h3>
      )}

      <div className="row align-items-center " xs={12} sm={12} md={3}>
        <div className="col-md-4 text-center">
          <div className={styles.imageWrapper}>
            <img
              src={contact}
              alt="Contact Visual"
              className={styles.contactImage}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
          </div>
        </div>

        <div className="col-md-8" xs={12} sm={12} md={3}>
          <div className={styles.formWrapper}>
            <h3 className={styles.formTitle}>Let’s get connected</h3>

            {responseData && responseData}
            <Form
              onSubmit={(event) => handleSubmit(event)}
              method="POST"
              noValidate
              autoComplete="nope"
              list="autocompleteOff"
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1rem',
                }}
              >
                <div className="row mb-3">
                  <div className="col">
                    <input
                      type="text"
                      className={styles.inputBox}
                      placeholder="First Name"
                      value={fieldValue.firstName}
                      required
                      autoComplete="nope"
                      list="autocompleteOff"
                      name="firstName"
                      onBlur={() => handleBlur('firstName')}
                      onChange={(event) =>
                        handleChange('firstName', event.target.value)
                      }
                    />
                    {firstNameCheck && (
                      <p style={{ color: 'red', fontsize: '10px !important' }}>
                        First Name should be less than 25 characters
                      </p>
                    )}
                  </div>
                  <div className="col">
                    <input
                      type="text"
                      name="lastName"
                      value={fieldValue.lastName}
                      required
                      autoComplete="nope"
                      list="autocompleteOff"
                      onBlur={() => handleBlur('lastName')}
                      className={styles.inputBox}
                      placeholder="Last Name"
                      onChange={(event) =>
                        handleChange('lastName', event.target.value)
                      }
                    />
                    {lastNameCheck && (
                      <p style={{ color: 'red', fontsize: '12px' }}>
                        Last Name should be less than 25 characters
                      </p>
                    )}
                  </div>
                </div>

                <div className="row mb-3" xs={12} sm={12} md={3}>
                  <div className="col">
                    <input
                      type="email"
                      name="email"
                      autoComplete="nope"
                      required
                      list="autocompleteOff"
                      value={fieldValue.email}
                      className={styles.inputBox}
                      onBlur={() => handleBlur('email')}
                      placeholder="Email"
                      onChange={(event) =>
                        handleChange('email', event.target.value)
                      }
                    />
                    {emailChecked && (
                      <p style={{ color: 'red', fontsize: '12px' }}>
                        Please enter valid email
                      </p>
                    )}
                  </div>
                  <div className="col">
                    <input
                      type="tel"
                      className={styles.inputBox}
                      placeholder="Phone Number"
                      maxLength="10"
                      pattern="[0-9]{10}"
                      required
                      value={fieldValue.phonenumber}
                      onInput={(e) =>
                        (e.target.value = e.target.value.replace(/[^0-9]/g, ''))
                      }
                      onChange={(e) =>
                        handleChange('phonenumber', e.target.value)
                      }
                      onBlur={() => handleBlur('phonenumber')}
                      name="phonenumber"
                    />
                    {phoneNumbercheck && (
                      <p style={{ color: 'red', fontsize: '12px' }}>
                        Please enter valid PhoneNumber
                      </p>
                    )}
                  </div>
                </div>
                <div className="col">
                  <textarea
                    className={styles.textArea}
                    placeholder="Your Message"
                    required
                    list="autocompleteOff"
                    autoComplete="nope"
                    onBlur={() => handleBlur('message')}
                    value={fieldValue.message}
                    name="message"
                    onChange={(event) =>
                      handleChange('message', event.target.value)
                    }
                  ></textarea>
                  {messageCheck && (
                    <p style={{ color: 'red', fontsize: '12px' }}>
                      Please enter valid message
                    </p>
                  )}
                </div>
                <button type="submit" className={styles.submitButton}>
                  SUBMIT
                </button>
              </div>
            </Form>

            <div className={styles.socialIcons} xs={12} sm={12} md={3}>
              <div className={styles.iconborder}>
                <Link
                  className={styles.iconcolor}
                  to="https://www.facebook.com/people/Softnovatech/61561099109544/?mibextid=qi2Omg&rdid=6hL55dQqxi67yKIS&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2Ft1ufRjHfuJA6jfxE%2F%3Fmibextid%3Dqi2Omg"
                  target="_blank"
                  aria-label="Visit our Facebook page"
                >
                  <FaFacebookF className={styles.iconcolor1} />
                </Link>
              </div>
              <div className={styles.iconborder2}>
                <Link
                  className={styles.iconcolor}
                  to="https://api.whatsapp.com/send/?phone=6385118083&text&type=phone_number&app_absent=0"
                  target="_blank"
                  aria-label="Visit our Whatsapp page"
                >
                  <FaWhatsapp className={styles.iconcolor1} />
                </Link>
              </div>
              <div className={styles.iconborder3}>
                <Link
                  className={styles.iconcolor}
                  to="https://www.instagram.com/accounts/login/?next=%2Fsoftnovatech%2F&source=omni_redirect"
                  target="_blank"
                  aria-label="Visit our Instagram page"
                >
                  <FaInstagram className={styles.iconcolor1} />
                </Link>
              </div>
              <div className={styles.iconborder1}>
                <Link
                  className={styles.iconcolor}
                  to="https://www.linkedin.com/company/softnovatechnology/"
                  target="_blank"
                  aria-label="Visit our LinkedIn page"
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
