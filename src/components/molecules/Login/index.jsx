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

function Login({ setIsOpen }) {
  const { setCurrentUser } = useContext(AuthContext);
  const [formType, setFormType] = useState('login');
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
                // let email;
                setTimeout(() => {
                  setSubmitting(false);
                }, 400);
                const loginUser = async () => {
                  const data = await login(
                    values.email,
                    values.password,
                    setIsOpen,
                  );
                  user = await data.user;
                  // email = await user.email;
                  const nickName = await user.displayName;
                  setCurrentUser(nickName);
                };
                loginUser();
              }}
            >
              {({ isSubmitting, isValid }) => (
                <Form className={styles.form}>
                  <label htmlFor="email">E-mail</label>
                  <Field
                    className={styles['form-input']}
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
                    className={styles['form-input']}
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
            <Register />
            <div
              className={styles['back-to-login-button']}
              onClick={() => setFormType('login')}
            >
              <IoMdArrowBack />
              <span>Back to the Login Page</span>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Login;
