import { useContext, useState } from 'react';
import styles from '../../Stylesheet/ChangePassword.module.css';
import { passwordCheck, confirmPasswordCheck } from '../../utility/Validation';
import { useSearchParams, useNavigate, Form } from 'react-router-dom';
import { Context } from '../../Context/contextApi';
import Spinner from '../Spinner';
import backBtnImg from '../../image/bacbtn.png';

const ChangePassword = () => {
  const [fieldValue, setFieldValue] = useState({
    newPassword: '',
    reEnterNewPassword: '',
  });
  const [loading, handleSetLoading] = useState(false);
  const { handleToken } = useContext(Context);

  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  localStorage.setItem('token', token);
  const navigate = useNavigate();
  const [responseValue, setResponse] = useState(false);

  const [edit, hasEdit] = useState({
    newPassword: false,
    reEnterNewPassword: false,
  });

  let newPasswordChecked =
    edit.newPassword && !passwordCheck(fieldValue.newPassword);

  let reEnterNewPasswordChecked =
    edit.reEnterNewPassword &&
    !confirmPasswordCheck(
      fieldValue.newPassword,
      fieldValue.reEnterNewPassword,
    );

  async function handleSubmit(event) {
    event.preventDefault();
    const { newPassword, reEnterNewPassword } = fieldValue;
    if (newPassword.trim().length > 0 && reEnterNewPassword.trim().length > 0) {
      if (
        passwordCheck(newPassword) &&
        confirmPasswordCheck(newPassword, reEnterNewPassword)
      ) {
        const reqData = {
          newPassword: newPassword,
          token: token,
        };
        try {
          handleSetLoading(true);
          let response = await fetch(
            `${process.env.REACT_APP_BACKEND_URL}/user/reset-password`,
            {
              method: 'POST',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(reqData),
            },
          );
          if (!response.ok) {
            if (response.status === 400) {
              let responseVal = await response.json();
              setResponse(responseVal.msg);
            } else {
              throw new Error('error');
            }
          } else {
            let responseVal = await response.json();
            if (response.status === 201) {
              handleToken(token);
              navigate('/');
            } else {
              setResponse(responseVal.msg);
            }
            setFieldValue(() => {
              return {
                newPassword: '',
                reEnterNewPassword: '',
              };
            });
          }
          handleSetLoading(false);
        } catch (error) {
          handleSetLoading(false);
          setResponse('error');
        }
      } else {
        setResponse('data-entry-false');
      }
    } else {
      setResponse('data-entry-false');
    }
  }
  let responseData = (function () {
    if (responseValue === 'success')
      return (
        <p
          className={styles.success}
          style={{ width: '100%', marginBottom: '2rem' }}
        >
          Password changed Successfully .
        </p>
      );
    else if (responseValue === 'data-entry-false')
      return (
        <p
          className={styles.warning}
          style={{ width: '100%', marginBottom: '2rem' }}
        >
          Please enter valid Password
        </p>
      );
    else if (responseValue === 'error')
      return (
        <p
          className={styles.danger}
          style={{ width: '100%', marginBottom: '2rem' }}
        >
          Submission Failed. Please try again
        </p>
      );
    else if (responseValue)
      return (
        <p
          className={styles.warning}
          style={{
            width: '100%',
            marginBottom: '2rem',
            textTransform: 'capitalize',
          }}
        >
          {responseValue}
        </p>
      );
  })();
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

  return (
    <>
      {loading && <Spinner loading={loading} />}
      <button
        className={styles.imageBackButton}
        onClick={() => navigate(-1)}
        title="Back"
      >
        <img src={backBtnImg} alt="Back" />
      </button>
      <div
        className={styles.container}
        style={{ opacity: loading ? '0.3' : '' }}
      >
        <div className={styles.card}>
          <div className={styles.logo}></div>
          <h2 className={styles.title}>Change Your Password</h2>
          <p className={styles.subtitle}>
            Enter a new password below to change your password.
          </p>

          <Form
            className={styles.form}
            method="POST"
            onSubmit={handleSubmit}
            noValidate
            autoComplete="off"
          >
            {responseData && responseData}

            <label className={styles.label}>
              New password*
              <input
                type="text"
                className={styles.input}
                list="autocompleteOff"
                value={fieldValue.newPassword}
                autoComplete="nope"
                required
                name="newPassword"
                onBlur={() => handleBlur('newPassword')}
                onChange={(event) =>
                  handleChange('newPassword', event.target.value)
                }
              />
              {newPasswordChecked && (
                <p style={{ color: 'red', fontsize: '10px !important' }}>
                  Password should be minimum of 8 characters
                </p>
              )}
            </label>

            <label className={styles.label}>
              Re-enter new password*
              <input
                type="password"
                className={styles.input}
                list="autocompleteOff"
                value={fieldValue.reEnterNewPassword}
                autoComplete="nope"
                required
                name="reEnterNewPassword"
                onBlur={() => handleBlur('reEnterNewPassword')}
                onChange={(event) =>
                  handleChange('reEnterNewPassword', event.target.value)
                }
              />
              {reEnterNewPasswordChecked && (
                <p style={{ color: 'red', fontsize: '10px !important' }}>
                  Password mismatch
                </p>
              )}
            </label>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: '20px',
              }}
            >
              <button className={styles.resetButton} onSubmit={handleSubmit}>
                Reset password
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ChangePassword;
