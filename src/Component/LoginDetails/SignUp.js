import { useState, useMemo } from 'react';
import sign from '../../Stylesheet/SignUp.module.css';
import { Col, Container, Row, Button, Form } from 'react-bootstrap';
import tamil1 from './../../image/logo2.png';
import {
  Form as RouterForm,
  useSubmit,
  useActionData,
  redirect,
} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
  nameCheck,
  numberCheck,
  emailCheck,
  passwordCheck,
  confirmPasswordCheck,
} from '../../utility/Validation';
import Spinner from '../Spinner';
import backBtnImg from '../../image/bacbtn.png';

export default function SignUp() {
  const navigate = useNavigate();
  const [fieldValue, setFieldValue] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });

  const [edit, hasEdit] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    password: false,
    confirmPassword: false,
  });

  const [responseValue, setResponse] = useState(false);
  const [loading, handleSetLoading] = useState(false);
  const actionResponse = useActionData();
  function handleActionResponse(actionResponse) {
    handleSetLoading(false);
  }

  useMemo(() => handleActionResponse(actionResponse), [actionResponse]);

  const submit = useSubmit();
  const firstNameChecked = edit.firstName && !nameCheck(fieldValue.firstName);
  const lastNameChecked = edit.lastName && !nameCheck(fieldValue.lastName);
  const phoneNumberChecked =
    edit.phoneNumber && !numberCheck(fieldValue.phoneNumber);
  const emailChecked = edit.email && !emailCheck(fieldValue.email);
  const passwordChecked = edit.password && !passwordCheck(fieldValue.password);
  const confirmPasswordChecked =
    edit.confirmPassword &&
    !confirmPasswordCheck(fieldValue.password, fieldValue.confirmPassword);

  function handleChange(id, value) {
    setFieldValue((prev) => ({ ...prev, [id]: value }));
    hasEdit((prev) => ({ ...prev, [id]: false }));
  }

  function handleBlur(id) {
    hasEdit((prev) => ({ ...prev, [id]: true }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      password,
      confirmPassword,
    } = fieldValue;

    if (
      firstName.trim().length > 0 &&
      lastName.trim().length > 0 &&
      email.trim().length > 0 &&
      phoneNumber.trim().length > 0 &&
      password.trim().length > 0 &&
      confirmPassword.trim().length > 0
    ) {
      if (
        nameCheck(firstName) &&
        nameCheck(lastName) &&
        numberCheck(phoneNumber) &&
        emailCheck(email) &&
        passwordCheck(password) &&
        confirmPasswordCheck(password, confirmPassword)
      ) {
        handleSetLoading(true);
        submit(fieldValue, { method: 'POST' });
        setResponse('');
      } else {
        setResponse('data-entry-false');
      }
    } else {
      setResponse('data-entry-false');
    }
  }

  let responseData = (function () {
    if (responseValue === true)
      return (
        <p className={sign.success} style={{ width: '75%', marginTop: '1rem' }}>
          Successfully registered!
        </p>
      );
    else if (responseValue === 'error')
      return (
        <p className={sign.danger} style={{ width: '75%', marginTop: '1rem' }}>
          Submission Failed. Please try again
        </p>
      );
    else if (responseValue === 'data-entry-false')
      return (
        <p className={sign.warning} style={{ width: '75%', marginTop: '1rem' }}>
          Please enter valid value in all fields
        </p>
      );
  })();

  return (
    <div style={{height:"100vh"}}>
      {loading && <Spinner loading={loading} />}
      <button
        className={sign.imageBackButton}
        onClick={() => navigate(-1)}
        title="Back"
      >
        <img src={backBtnImg} alt="Back" />
      </button>
      <Container
        fluid
        className={sign.Createaccount1}
        style={{ opacity: loading ? '0.3' : '' }}
      >
        <Row>
          <Col xs={12} className={sign.signtitle}>
            <h1>Welcome Back!</h1>
          </Col>
        </Row>

        <Row className={sign.createtitle1}>
          <Col xs={12} md={7} className={sign.createtitle}>
            <div>
              <h1 className={sign.createtitle2}>Create an Account</h1>
              <Container className={sign.boxshadow2}>
                <Row>
                  <Col xs={12} sm={12} md={12}>
                    {responseData && responseData}
                    {actionResponse && (
                      <p
                        className={sign.warning}
                        style={{
                          width: '75%',
                          textTransform: 'capitalize',
                          marginTop: '1rem',
                        }}
                      >
                        {actionResponse}
                      </p>
                    )}
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <RouterForm
                      method="POST"
                      onSubmit={handleSubmit}
                      autoComplete="off"
                      noValidate
                    >
                      <Form.Group className={sign.form2}>
                        <Form.Control
                          type="text"
                          placeholder="First Name"
                          className={sign.form1}
                          name="firstName"
                          onBlur={() => handleBlur('firstName')}
                          onChange={(e) =>
                            handleChange('firstName', e.target.value)
                          }
                        />
                        {firstNameChecked && (
                          <p className={sign.hight}>
                            First Name should be less than 25 characters
                          </p>
                        )}
                      </Form.Group>
                    </RouterForm>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className={sign.form2}>
                      <Form.Control
                        type="text"
                        placeholder="Last Name"
                        className={sign.form1}
                        name="lastName"
                        onBlur={() => handleBlur('lastName')}
                        onChange={(e) =>
                          handleChange('lastName', e.target.value)
                        }
                      />
                      {lastNameChecked && (
                        <p className={sign.hight}>
                          Last Name should be less than 25 characters
                        </p>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group className={sign.form2}>
                      <Form.Control
                        type="email"
                        placeholder="Enter Mail Id"
                        className={sign.form1}
                        name="email"
                        onBlur={() => handleBlur('email')}
                        onChange={(e) => handleChange('email', e.target.value)}
                      />
                      {emailChecked && (
                        <p className={sign.hight}>Please enter valid email</p>
                      )}
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className={sign.form2}>
                      <Form.Control
                        type="tel"
                        name="phoneNumber"
                        placeholder="Enter Phone No"
                        maxLength="10"
                        pattern="[0-9]{10}"
                        className={sign.form1}
                        onInput={(e) =>
                          (e.target.value = e.target.value.replace(
                            /[^0-9]/g,
                            '',
                          ))
                        }
                        onBlur={() => handleBlur('phoneNumber')}
                        onChange={(e) =>
                          handleChange('phoneNumber', e.target.value)
                        }
                      />
                      {phoneNumberChecked && (
                        <p className={sign.hight}>
                          Please enter valid phone number
                        </p>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} md={6}>
                    <Form.Group className={sign.form2}>
                      <Form.Control
                        type="password"
                        placeholder="Create Password"
                        className={sign.form1}
                        name="password"
                        onBlur={() => handleBlur('password')}
                        onChange={(e) =>
                          handleChange('password', e.target.value)
                        }
                      />
                      {passwordChecked && (
                        <p className={sign.hight}>
                          Password should be minimum of 8 characters
                        </p>
                      )}
                    </Form.Group>
                  </Col>
                  <Col xs={12} md={6}>
                    <Form.Group className={sign.form2}>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder="Reenter Password"
                        className={sign.form1}
                        onBlur={() => handleBlur('confirmPassword')}
                        onChange={(e) =>
                          handleChange('confirmPassword', e.target.value)
                        }
                      />
                      {confirmPasswordChecked && (
                        <p className={sign.hight}>Password mismatch</p>
                      )}
                    </Form.Group>
                  </Col>
                </Row>
                <Row className={sign.buttonsign1}>
                  <Col className={sign.buttonsign4}>
                    <Button
                      variant="light"
                      className={sign.buttonsign2}
                      onClick={handleSubmit}
                    >
                      <h2 className={sign.buttonsign3}>Sign Up</h2>
                    </Button>
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>

          <Col md={5} className={sign.imagtamil1}>
            <img src={tamil1} className={sign.imagtamil2} alt="gh" width={'90%'} height={'100%'}/>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export async function action({ request }) {
  const data = await request.formData();

  const reqData = {
    firstName: data.get('firstName'),
    lastName: data.get('lastName'),
    phone: data.get('phoneNumber'),
    email: data.get('email'),
    password: data.get('password'),
  };

  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/user/signup`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(reqData),
      },
    );

    if (!response.ok) {
      if (response.status === 400) {
        let responseVal = await response.json();
        return `${responseVal.msg}, please try to sign in.`;
      }
      throw new Error('Failed to submit');
    } else {
      let responseVal = await response.json();
      if (response.status === 201) {
        return redirect('/login');
      }

      return responseVal.msg;
    }
  } catch (error) {
    return error.message;
  }
}
