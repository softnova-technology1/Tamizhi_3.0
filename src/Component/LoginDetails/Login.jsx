
import { Suspense, useContext, useState, lazy } from 'react';
import log from '../../Stylesheet/loginpage.module.css';
import { Button, Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import thamil from '../../image/FINAL-LOGO.png';
import {
  Form as ReactRouterForm,
  useNavigate,
  Link,
  redirect,
} from 'react-router-dom';
import backBtnImg from '../../image/bacbtn.png';

import { Context } from '../../Context/contextApi';
import Spinner from '../Spinner';
const GoogleLogin = lazy(() =>
  import('@react-oauth/google').then((mod) => ({ default: mod.GoogleLogin })),
);

export default function Login({ homePage, handleModal }) {
  const [fieldValue, setFieldValue] = useState({
    emailOrphone: '',
    password: '',
    showPassword: false,
  });
  const { handleToken } = useContext(Context);
  const [responseValue, setResponse] = useState(null);
  const [googleResponse, setGoogleResponse] = useState(false);
  const [loading, handleSetLoading] = useState(false);
  const navigate = useNavigate();

  async function handleGoogleSubmit(data) {
    try {
      handleSetLoading(true);
      let response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/user/login`,
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ data }),
        },
      );
      if (!response.ok) {
        throw new Error('Failed to submit');
      } else {
        let responseVal = await response.json();
        if (response.status === 201 && responseVal.token) {
          localStorage.setItem('token', responseVal.token);
          handleToken(responseVal.token);
          if (!homePage) {
            navigate('/');
          } else {
            handleModal();
          }
        } else {
          setGoogleResponse(responseVal.msg);
          setResponse('error');
        }
      }
      handleSetLoading(false);
    } catch (error) {
      handleSetLoading(false);
      setGoogleResponse(error.message);
      setResponse('error');
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const { emailOrphone, password } = fieldValue;
    if (emailOrphone.trim().length > 0 && password.trim().length > 0) {
      let reqData = {
        email: emailOrphone,
        password: password,
      };
      try {
        handleSetLoading(true);
        let response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/user/login`,
          {
            method: 'POST',
            headers: {
              'content-type': 'application/json',
            },
            body: JSON.stringify(reqData),
          },
        );
        if (!response.ok) {
          if (response.status === 404) {
            let responseVal = await response.json();
            setResponse(responseVal.msg);
          } else {
            throw new Error('Failed to submit');
          }
        } else {
          let responseVal = await response.json();
          if (response.status === 201 && responseVal.token) {
            localStorage.setItem('token', responseVal.token);
            handleToken(responseVal.token);
            if (!homePage) {
              navigate('/');
            } else {
              handleModal();
            }
          } else {
            setResponse(responseVal.msg);
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
    if (responseValue === 'data-entry-false')
      return (
		<p className={log.warning} style={{ width: '100%' }}>
          All fields are mandatory.
        </p>
      );
    else if (responseValue === 'error')
      return (
        <p className={log.danger} style={{ width: '100%' }}>
          Submission Failed. Please try again
        </p>
      );
    else if (responseValue)
      return (
        <p
          className={log.warning}
          style={{ textTransform: 'uppercase', width: '100%' }}
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
  }

  return (
    <div className={!homePage ? log.sandbg : log.modalWrapper}>
      {loading && <Spinner loading={loading} />}
      {!homePage && (
        <button
          className={log.imageBackButton}
          onClick={() => navigate(-1)}
          title="Back"
        >
          <img src={backBtnImg} alt="Back" />
        </button>
      )}
      <Container style={{ opacity: loading ? '0.3' : '', padding: homePage ? '0' : '' }}>
        {!homePage && <h1 className={log.welcome}>Welcome Back!</h1>}
        {homePage && <h3 className={log.welcomeHome}>Welcome Back!</h3>}
        <Row className={log.head} style={{justifyContent:"space-between", margin: 0}}>
          <Col
            xs={12}
            sm={12}
            md={!homePage ? 6 : 12}
            className={!homePage ? log.forms : log.formsModal}
          >
            <div className={log.contains}>
              <ReactRouterForm
                method="POST"
                onSubmit={(event) => {
                  handleSubmit(event);
                }}
                autoComplete="off"
                noValidate
              >
                {responseData && responseData}
                {googleResponse && (
                  <p className={log.warning} style={{ width: '100%' }}>
                    {googleResponse}
                  </p>
                )}

                <Form.Control
                  size="sm"
                  type="text"
                  list="autocompleteOff"
                  autoComplete="nope"
                  required
                  value={fieldValue.emailOrphone}
                  name="emailOrphone"
                  placeholder="Email Address"
                  className={log.input}
                  onChange={(event) =>
                    handleChange('emailOrphone', event.target.value)
                  }
                />
                <Form.Control
                  size="sm"
                  type={`${fieldValue.showPassword ? 'text' : 'password'}`}
                  list="autocompleteOff"
                  value={fieldValue.password}
                  autoComplete="nope"
                  required
                  placeholder="Enter Password"
                  style={{ marginTop: homePage ? '15px' : '' }}
                  className={log.inputpass}
                  onChange={(event) =>
                    handleChange('password', event.target.value)
                  }
                />
                <div className={log.flex}>
                  <div className={log.checkgap}>
                    <input
                      type="checkbox"
                      className={log.check}
                      value={fieldValue.showPassword}
                      name="showPassword"
                      onChange={(event) =>
                        handleChange('showPassword', event.target.checked)
                      }
                    />
                    <label className={log.label}>Show me</label>
                  </div>
                  <div>
                    <Link to="/reset-password">
                      <p className={log.forgot}>Forgot Password?</p>
                    </Link>
                  </div>
                </div>
                <div className={log.buttons}>
                  <Button
                    variant="secondary"
                    className={log.buttontxt}
                    type="submit"
                    onSubmit={(event) => handleSubmit(event)}
                  >
                    Log In
                  </Button>
                </div>
              </ReactRouterForm>
              <Link to="/signup">
                <p className={log.create}>Create an Account</p>
              </Link>
              <div className={log.divider}>
                <hr className={log.hrLine} />
                <span>
                  <b>or</b>
                </span>
                <hr className={log.hrLine} />
              </div>
              <div className={log.centerbutton}>
                <Suspense fallback={<Spinner loading={loading} />}>
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      handleGoogleSubmit(credentialResponse.credential);
                    }}
                    onError={() => setResponse('error')}
                  />
                </Suspense>
              </div>
            </div>
          </Col>
          {!homePage && (
            <Col xs={12} sm={12} md={6} className={log.forms1}>
              <div className={log.image}>
                <img src={thamil} alt="Thamil-img" className={log.tamilimgs} />
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </div>
  );
}

export async function action({ request, params }) {
  const data = await request.formData();
  let reqData = {
    email: data.get('emailOrphone'),
    password: data.get('password'),
  };
  try {
    let response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/user/login`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(reqData),
      },
    );

    if (!response.ok) {
      throw new Error('Failed to submit');
    } else {
      let responseVal = await response.json();
      if (response.status === 200 && responseVal.token) {
        localStorage.setItem('token', responseVal.token);
        return redirect('/');
      } else {
        return responseVal.msg;
      }
    }
  } catch (error) {
    return error.message;
  }
}
