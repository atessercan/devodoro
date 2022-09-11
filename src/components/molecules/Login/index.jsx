/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from 'react';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import * as Yup from 'yup';
import { IoMdArrowBack } from 'react-icons/io';
import Title from '../../atoms/Text/Title';
import Button from '../../atoms/Button';
import styles from './index.module.scss';
import Register from '../Register';
import { login } from '../../../helpers/firebase';
import AuthContext from '../../../context/auth-context';
import ThemeContext from '../../../context/theme-context';

function Login({ setIsOpen }) {
  const { setCurrentUser } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const [formType, setFormType] = useState('login');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  return (
    <>
      <Title text={formType} />
      <div className={styles['form-wrapper']}>
        {formType === 'login' && (
          <>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email('Invalid email address')
                  .required('E-mail is required'),
                password: Yup.string().required('Password is required'),
              })}
              onSubmit={(values, { setSubmitting }) => {
                let user;
                setTimeout(() => {
                  setSubmitting(false);
                }, 400);
                const loginUser = async () => {
                  const data = await login(values.email, values.password);
                  if (Object.prototype.hasOwnProperty.call(data, 'user')) {
                    user = await data.user;
                    const nickName = await user.displayName;
                    setCurrentUser(nickName);
                    setError(null);
                    setMessage('You are logged in. Redirecting...');
                    setTimeout(() => {
                      setIsOpen(false);
                    }, 2000);
                  }
                  if (Object.prototype.hasOwnProperty.call(data, 'code')) {
                    if (
                      data.code === 'auth/wrong-password' ||
                      data.code === 'auth/user-not-found'
                    ) {
                      setError('Invalid password or e-mail.');
                    }
                  }
                };
                loginUser();
              }}
            >
              {({ isSubmitting, isValid }) => (
                <Form className={styles.form}>
                  <label htmlFor="email">E-mail</label>
                  <Field
                    className={
                      theme === 'night'
                        ? styles['form-input-dark']
                        : styles['form-input-light']
                    }
                    type="email"
                    name="email"
                    placeholder="example@example.com"
                  />
                  <ErrorMessage
                    name="email"
                    component="span"
                    className={styles['error-message']}
                  />

                  <label htmlFor="Password">Password</label>
                  <Field
                    className={
                      theme === 'night'
                        ? styles['form-input-dark']
                        : styles['form-input-light']
                    }
                    type="password"
                    name="password"
                    placeholder="******"
                  />
                  <ErrorMessage
                    name="password"
                    component="span"
                    className={styles['error-message']}
                  />
                  <Button
                    className={styles['submit-button']}
                    name="Login"
                    disabled={isSubmitting || !isValid}
                  />
                </Form>
              )}
            </Formik>
            <strong
              className={styles['create-account-button']}
              onClick={() => setFormType('register')}
            >
              Create an Account!
            </strong>
          </>
        )}
        {formType === 'register' && (
          <>
            <Register setFormType={setFormType} />
            <div
              className={styles['back-to-login-button']}
              onClick={() => setFormType('login')}
            >
              <IoMdArrowBack />
              <span>Back to the Login Page</span>
            </div>
          </>
        )}
        {message && <div className={styles['success-message']}>{message}</div>}
        {error && <div className={styles['error-message']}>{error}</div>}
      </div>
    </>
  );
}

export default Login;
