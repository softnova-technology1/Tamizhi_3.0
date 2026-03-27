import { useContext, useState, useEffect, useRef } from 'react';
import styles from '../../Stylesheet/ToWriteForm.module.css';
import write from './../../image/writes.png';
import { Form } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { emailCheck, nameCheck, numberCheck } from '../../utility/Validation';
import { Context } from '../../Context/contextApi';
import ScrollTitle from './ScrollTitle';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const WriteContent = () => {
  const formRef = useRef(null);
  const contentsRef = useRef(null);

  const [fieldValue, setFieldValue] = useState({
    name: '',
    number: '',
    email: '',
    category: '',
    mistakeContent: '',
  });

  const [edit, setEdit] = useState({
    name: false,
    number: false,
    email: false,
    category: false,
    mistakeContent: false,
  });

  const [responseValue, setResponseValue] = useState(null);
  const { language } = useContext(Context);
  const nameChecked = edit.name && !nameCheck(fieldValue.name.trim());
  const numberChecked = edit.number && !numberCheck(fieldValue.number.trim());
  const emailChecked = edit.email && !emailCheck(fieldValue.email.trim());
  const categoryChecked = edit.category && !fieldValue.category.trim();
  const mistakeContentChecked =
    edit.mistakeContent && !fieldValue.mistakeContent.trim();

  useEffect(() => {
    emailjs.init({
      publicKey: 'd4SFdVVQWcQPp5o-d',
    });

    // Vertical Unrolling Animation using clip-path
    const ctx = gsap.context(() => {
      gsap.fromTo(formRef.current,
        {
          clipPath: 'inset(0% 0% 100% 0%',
          opacity: 0.8
        },
        {
          clipPath: '',
          opacity: 1,
          duration: 1.8,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: "#towrite",
            start: "top 70%",
            end: "bottom bottom",
            toggleActions: "play none none reverse",
          }
        }
      );

      // Animate inner contents separately for a "sliding out" effect
      gsap.fromTo(contentsRef.current,
        { opacity: 0, scaleY: 0.8, transformOrigin: "top" },
        {
          opacity: 1,
          scaleY: 1,
          duration: 1.2,
          delay: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: "#towrite",
            start: "top 70%",
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { name, number, email, category, mistakeContent, file_data } =
      fieldValue;

    const isAllFilled = name && number && email && category && mistakeContent;
    const isAllValid =
      nameCheck(name) && numberCheck(number) && emailCheck(email);

    if (isAllFilled && isAllValid) {
      emailjs
        .send('service_vbtow0s', 'template_m908q1p', {
          name,
          number,
          email,
          category,
          mistakeContent,
          file_data,
        })
        .then(
          (response) => {
            if (response.status === 200) {
              setResponseValue('success');
              setFieldValue({
                name: '',
                number: '',
                email: '',
                category: '',
                mistakeContent: '',
              });
              setEdit({
                name: false,
                number: false,
                email: false,
                category: false,
                mistakeContent: false,
              });
            } else {
              setResponseValue('error');
            }
          },
          () => setResponseValue('error'),
        );
    } else {
      setResponseValue('data-entry-false');
    }
  };

  const handleChange = (id, value) => {
    setFieldValue((prev) => ({
      ...prev,
      [id]: value,
    }));
    setEdit((prev) => ({
      ...prev,
      [id]: false,
    }));
  };



  const handleBlur = (id) => {
    setEdit((prev) => ({
      ...prev,
      [id]: true,
    }));
  };

  const responseData = (() => {
    if (responseValue === 'success')
      return (
        <p className={styles.success}>
          Successfully submitted
        </p>
      );
    if (responseValue === 'error')
      return (
        <p className={styles.danger}>
          Submission failed. Please try again.
        </p>
      );
    if (responseValue === 'data-entry-false')
      return (
        <p className={styles.warning}>
          All fields are mandatory.
        </p>
      );
    return null;
  })();

  return (
    <div className={styles.container} id="towrite">
      <div className='mb-md-5 pb-md-5 mb-3 pb-3'>
        <ScrollTitle className={styles.title}>
          {language === 'en' ? 'Preserve the Heritage' : 'மரபை அழியாமல் காப்போம்'}
        </ScrollTitle>
      </div>

      <div className={styles.formContainer}>
        <Form
          className={styles.form}
          ref={formRef}
          method="POST"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          {responseData && <div className={styles.statusMsg}>{responseData}</div>}

          <div className={styles.formContents} ref={contentsRef}>
            <div className={styles.inputRow}>
              <input
                type="text"
                placeholder={language === 'en' ? "Name" : "பெயர்"}
                name="name"
                value={fieldValue.name}
                className={styles.input}
                required
                onBlur={() => handleBlur('name')}
                onChange={(e) => handleChange('name', e.target.value)} style={{ paddingTop: "10px" }}
              />
              {nameChecked && (
                <p className={styles.error}>
                  {language === 'en' ? "Name must be valid" : "சரியான பெயரை உள்ளிடவும்"}
                </p>
              )}
            </div>

            <div className={styles.inputRow}>
              <input
                type="tel"
                placeholder={language === 'en' ? "Phone Number" : "தொலைபேசி எண்"}
                name="number"
                maxLength="10"
                pattern="[0-9]{10}"
                value={fieldValue.number}
                className={styles.input}
                required
                onBlur={() => handleBlur('number')}
                onChange={(e) =>
                  handleChange('number', e.target.value.replace(/[^0-9]/g, ''))
                }
              />
              {numberChecked && (
                <p className={styles.error}>
                  {language === 'en' ? "10 digits required" : "10 இலக்கங்கள் தேவை"}
                </p>
              )}
            </div>

            <div className={styles.inputRow}>
              <input
                type="email"
                placeholder={language === 'en' ? "E–Mail" : "மின்னஞ்சல்"}
                name="email"
                value={fieldValue.email}
                className={styles.input}
                required
                onBlur={() => handleBlur('email')}
                onChange={(e) => handleChange('email', e.target.value)}
              />
              {emailChecked && (
                <p className={styles.error}>
                  {language === 'en' ? "Invalid Email" : "தவறான மின்னஞ்சல்"}
                </p>
              )}
            </div>

            <div className={styles.inputRow}>
              <input
                type="text"
                placeholder={language === 'en' ? "Category" : "வகை"}
                name="category"
                value={fieldValue.category}
                className={styles.input}
                required
                onBlur={() => handleBlur('category')}
                onChange={(e) => handleChange('category', e.target.value)}
              />
              {categoryChecked && (
                <p className={styles.error}>
                  {language === 'en' ? "Category is mandatory" : "வகை கட்டாயம்"}
                </p>
              )}
            </div>

            <div className={styles.inputRow}>
              <textarea
                name="mistakeContent"
                value={fieldValue.mistakeContent}
                placeholder={language === 'en' ? "Rewrite mistake content" : "தவறுகளை திருத்தி எழுதுக..."}
                className={styles.textarea}
                required
                onBlur={() => handleBlur('mistakeContent')}
                onChange={(e) => handleChange('mistakeContent', e.target.value)}
              />
              {mistakeContentChecked && (
                <p className={styles.error}>
                  {language === 'en' ? "Content is required" : "தகவல் தேவை"}
                </p>
              )}
            </div>

            {/* <div className={styles.inputRow}>
              <input
                type="file"
                id="file"
                name="file_data"
                accept="image/*"
                onChange={handleFileChange}
                className={styles.input}
                aria-label="File Upload"
              />
            </div> */}

            <button type="submit" className={styles.button}>
              {language === 'en' ? "SEAL" : "அனுப்புக"}
            </button>
          </div>
        </Form>

        <div className={styles.imageContainer}>
          <div className={styles.imageWrapper}>
            <img
              src={write}
              alt="writing scene"
              className={styles.image}
              loading="lazy"
              decoding="async"
              fetchPriority="low"
            />
          </div>
          <p className={styles.imageCaption}>
            {language === 'en' ? "Every letter is a legacy carved in time." : "ஒவ்வொரு எழுத்தும் காலத்தால் செதுக்கப்பட்ட ஒரு மரபு."}
          </p>
        </div>
      </div>

    </div>
  );
};

export default WriteContent;
