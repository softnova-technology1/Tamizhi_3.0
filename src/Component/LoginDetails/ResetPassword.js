import styles from '../../Stylesheet/ResetPassword.module.css';
import { useRef, useState } from 'react';
import { Form } from 'react-router-dom';
import { emailCheck } from '../../utility/Validation';
import Spinner from '../Spinner';
const ResetPassword = () => {
  const emailRef = useRef('');
  const [responseValue, setResponse] = useState(false);
  const [loading, handleSetLoading] = useState(false);
  async function handleSubmit(event) {
    event.preventDefault();
    const emailValue = emailRef.current.value.trim();
    if (emailCheck(emailValue)) {
      let reqData = {
        email: emailValue,
      };
      try {
        handleSetLoading(true);
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/user/forgot-password`,
          {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(reqData),
          },
        );
        if (!response.ok) {
          throw new Error('Submission Failed');
        } else {
          if (response.status === 201) {
            setResponse('check-email');
            emailRef.current.value = '';
          }
        }
        handleSetLoading(false);
      } catch (error) {
        handleSetLoading(false);
        setResponse('error');
      }
    } else {
      setResponse('data-entry-false');
    }
  }
  let responseData = (function () {
    if (responseValue === 'check-email')
      return (
        <p
          className={styles.success}
          style={{ width: '75%', marginBottom: '2rem' }}
        >
          Reset password link sent to your E-mail Id
        </p>
      );
    else if (responseValue === 'data-entry-false')
      return (
        <p
          className={styles.warning}
          style={{ width: '75%', marginBottom: '2rem' }}
        >
          Please enter valid Email Address
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
    else if (responseValue)
      return (
        <p
          className={styles.warning}
          style={{ width: '75%', marginBottom: '2rem' }}
        >
          {responseValue}
        </p>
      );
  })();
  return (
    <div className={styles.bg}>
      {loading && <Spinner loading={loading} />}
      <div
        className={styles.container}
        style={{ opacity: loading ? '0.3' : '' }}
      >
        <h1 className={styles.title}>Reset Your Password</h1>
        <p className={styles.description}>
          Enter the email associated with your account and we’ll send you
          password reset instructions.
        </p>
        <Form
          className={styles.form}
          method="POST"
          onSubmit={(event) => handleSubmit(event)}
          noValidate
          autoComplete="off"
        >
          {responseData && responseData}
          <label htmlFor="email" className={styles.label}>
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            ref={emailRef}
            required
            placeholder="Enter your email"
            className={styles.input}
          />
          <div className={styles.button1}>
            <button type="submit" className={styles.button}>
              Send Reset Instructions
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default ResetPassword;
