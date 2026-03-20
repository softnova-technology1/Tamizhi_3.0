import { useEffect, useState } from 'react';
import styles from '../../Stylesheet/ContactUs.module.css';
import ScrollImage from '../../image/contact4.png';
import MapImage from '../../image/contactmap.png';
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaRegCalendarAlt,
} from 'react-icons/fa';
import { nameCheck, emailCheck, numberCheck } from '../../utility/Validation';
import emailjs from '@emailjs/browser';
import {
  FaFacebookF,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
} from 'react-icons/fa';
import { Link, Form } from 'react-router-dom';
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';
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
  return (
    <>
      <div className={styles.breadcrumb}>
        <Link to="/">
          <span className={styles.home}>Home</span>
        </Link>
        <span className={styles.arrow}>
          <MdKeyboardDoubleArrowRight />
        </span>
        <span className={styles.current}>contact</span>
      </div>
      <section className={styles.contactSection}>
        <div className={styles.overlay}></div>
        <div className={styles.content}>
          <h1>Contact Us</h1>
          <p>Any question or remarks? Just write us a message!</p>
        </div>
        <div className={styles.imageContainer}>
          <img src={MapImage} alt="Tamil Nadu Temple Map" />
        </div>
      </section>
      <section className={styles.container}>
        <h1 className={styles.heading}>Get in Touch</h1>

        <div class="container row col-xl-12 scroll" className={styles.scroll}>
          <div class="row col-xl-4" className={styles.left}>
            <img
              src={ScrollImage}
              alt="Palm Leaf Manuscripts"
              className={styles.image}
            />
          </div>
          <div class="row col-xl-8">
            <Form
              className={styles.form}
              onSubmit={(event) => handleSubmit(event)}
              method="POST"
              noValidate
              autoComplete="nope"
              list="autocompleteOff"
            >
              {responseData && responseData}
              <div class="container row col-xl-12" className={styles.row}>
                <div class="row col-xl-6">
                  <input
                    className={styles.input1}
                    type="text"
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
                      First Name length should be less than 25 characters
                    </p>
                  )}
                </div>
                <div class="row col-xl-6">
                  <input
                    className={styles.input1}
                    type="text"
                    placeholder="Last Name"
                    value={fieldValue.lastName}
                    required
                    autoComplete="nope"
                    list="autocompleteOff"
                    onBlur={() => handleBlur('lastName')}
                    onChange={(event) =>
                      handleChange('lastName', event.target.value)
                    }
                  />
                  {lastNameCheck && (
                    <p style={{ color: 'red', fontsize: '12px' }}>
                      Last Name length should be less than 25 characters
                    </p>
                  )}
                </div>
              </div>
              <div class="container row col-xl-12" className={styles.row}>
                <div class="row col-xl-6">
                  <input
                    className={styles.input1}
                    type="email"
                    placeholder="Email"
                    autoComplete="nope"
                    required
                    list="autocompleteOff"
                    value={fieldValue.email}
                    onBlur={() => handleBlur('email')}
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
                <div class="row col-xl-6">
                  <input
                    type="tel"
                    className={styles.input1}
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
                  className={styles.message1}
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
              <button className={styles.sub1} type="submit">
                Submit
              </button>

              <div className={styles.iconContainer}>
                <div></div>
                <div className={styles.icongap}>
                  <div className={styles.iconWrapper}>
                    <Link
                      className={styles.iconcolor}
                      to="https://www.facebook.com/people/Softnovatech/61561099109544/?mibextid=qi2Omg&rdid=6hL55dQqxi67yKIS&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2Ft1ufRjHfuJA6jfxE%2F%3Fmibextid%3Dqi2Omg"
                      target="_blank"
                    >
                      <FaFacebookF />
                    </Link>
                  </div>

                  <div className={styles.iconWrapper2}>
                    <Link
                      className={styles.iconcolor}
                      to="https://api.whatsapp.com/send/?phone=6385118083&text&type=phone_number&app_absent=0"
                      target="_blank"
                    >
                      <FaWhatsapp />
                    </Link>
                  </div>

                  <div className={styles.iconWrapper3}>
                    <Link
                      className={styles.iconcolor}
                      to="https://www.instagram.com/accounts/login/?next=%2Fsoftnovatech%2F&source=omni_redirect"
                      target="_blank"
                    >
                      <FaInstagram />
                    </Link>
                  </div>

                  <div className={styles.iconWrapper1}>
                    <Link
                      className={styles.iconcolor}
                      to="https://www.linkedin.com/company/softnovatechnology/"
                      target="_blank"
                    >
                      <FaLinkedin />
                    </Link>
                  </div>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </section>
      <div className={styles.container1}>
        <div className={styles.left}>
          <img
            src={require('./../../image/con1.png')}
            alt="scroll"
            className={styles.scrollImg}
          />
        </div>
        <div className={styles.right}>
          <div className={styles.card}>
            <FaPhoneAlt className={styles.icon} />
            <span>+91 63851 18083</span>
          </div>
          <div className={styles.card}>
            <FaEnvelope className={styles.icon} />
            <span>vanakkam@tamizhi.blog</span>
          </div>
          <div className={styles.card}>
            <FaMapMarkerAlt className={styles.icon} />
            <span>
              1st Floor, Aadhil block, Shavanna apartment, SNV Mahal back side,
              <br />
              Near SBI bank, Peravurani.
            </span>
          </div>
          <div className={styles.card}>
            <FaRegCalendarAlt className={styles.icon} />
            <span>Mon–Fri: 10AM – 6PM</span>
          </div>
        </div>
      </div>
    </>
  );
};
export default ContactUs;
