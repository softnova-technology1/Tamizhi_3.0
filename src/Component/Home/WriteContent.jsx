import { useContext, useState, useEffect } from 'react';
import styles from '../../Stylesheet/ToWriteForm.module.css';
import write from './../../image/Rectangle 89.webp';
import { Form } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { emailCheck, nameCheck, numberCheck } from '../../utility/Validation';
import { Context } from '../../Context/contextApi';

const WriteContent = () => {
  const [fieldValue, setFieldValue] = useState({
    name: '',
    number: '',
    email: '',
    category: '',
    mistakeContent: '',
    file: '',
    file_data: '',
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
                file: '',
                file_data: '',
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSize = 35 * 1024;
      if (file.size > maxSize) {
        alert('Image size must be less than 35 KB.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setFieldValue((prev) => ({
          ...prev,
          file: file,
          file_data: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
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
        <p className={styles.success} style={{ width: '75%' }}>
          Successfully submitted
        </p>
      );
    if (responseValue === 'error')
      return (
        <p className={styles.danger} style={{ width: '75%' }}>
          Submission failed. Please try again.
        </p>
      );
    if (responseValue === 'data-entry-false')
      return (
        <p className={styles.warning} style={{ width: '75%' }}>
          All fields are mandatory.
        </p>
      );
    return null;
  })();

  return (
    <div className={styles.container} id="towrite">
      {language === 'en' ? (
        <h3 className={styles.title}>To Write</h3>
      ) : (
        <h3 className={styles.title}>குறிப்பு எழுது</h3>
      )}

      <div className={styles.formContainer}>
        <Form
          className={styles.form}
          method="POST"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          {responseData && responseData}

          <input
            type="text"
            placeholder="Name"
            name="name"
            value={fieldValue.name}
            className={styles.input}
            required
            onBlur={() => handleBlur('name')}
            onChange={(e) => handleChange('name', e.target.value)}
          />
          {nameChecked && (
            <p className={styles.error}>
              Name must be valid and under 25 characters
            </p>
          )}

          <input
            type="tel"
            placeholder="Phone Number"
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
            <p className={styles.error}>Phone number must be 10 digits</p>
          )}

          <input
            type="email"
            placeholder="E–Mail"
            name="email"
            value={fieldValue.email}
            className={styles.input}
            required
            onBlur={() => handleBlur('email')}
            onChange={(e) => handleChange('email', e.target.value)}
          />
          {emailChecked && (
            <p className={styles.error}>Enter a valid email address</p>
          )}

          <input
            type="text"
            placeholder="Category"
            name="category"
            value={fieldValue.category}
            className={styles.input}
            required
            onBlur={() => handleBlur('category')}
            onChange={(e) => handleChange('category', e.target.value)}
          />
          {categoryChecked && (
            <p className={styles.error}>Category is required</p>
          )}

          <textarea
            name="mistakeContent"
            value={fieldValue.mistakeContent}
            placeholder="Rewrite mistake content"
            className={styles.textarea}
            required
            onBlur={() => handleBlur('mistakeContent')}
            onChange={(e) => handleChange('mistakeContent', e.target.value)}
          />
          {mistakeContentChecked && (
            <p className={styles.error}>Content is required</p>
          )}

          <input
            type="file"
            id="file"
            name="file_data"
            accept="image/*"
            onChange={handleFileChange}
            className={styles.input}
            aria-label="File Upload"
          />

          <button type="submit" className={styles.button}>
            SUBMIT
          </button>
        </Form>

        <div className={styles.imageContainer}>
          <img
            src={write}
            alt="writing scene"
            className={styles.image}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            width="800"
            height="533"
          />
        </div>
      </div>
    </div>
  );
};

export default WriteContent;
