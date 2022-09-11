/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useContext, useState } from 'react';
import * as Yup from 'yup';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import styles from './index.module.scss';
import Button from '../../atoms/Button';

import { register } from '../../../helpers/firebase';
import ThemeContext from '../../../context/theme-context';

function Register({ setFormType }) {
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const { theme } = useContext(ThemeContext);
  return (
    <div className={styles['register-form']}>
      <Formik
        initialValues={{
          email: '',
          nickName: '',
          password: '',
          retypePassword: '',
        }}
        validationSchema={Yup.object({
          nickName: Yup.string()
            .max(15, 'Must be 15 characters or less')
            .required('Required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Required'),
          password: Yup.string()
            .required('Password is required')
            .min(6, 'Your password is too short.'),
          retypePassword: Yup.string()
            .required('Please retype your password.')
            .oneOf([Yup.ref('password')], 'Your passwords do not match.'),
        })}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            actions.setSubmitting(false);
          }, 400);
          const registerNewUser = async () => {
            const data = await register(
              values.email,
              values.password,
              values.nickName,
            );
            if (Object.prototype.hasOwnProperty.call(data, 'user')) {
              setMessage('Successfull. Redirecting to login.');
              setError(null);
              setTimeout(() => {
                setFormType('login');
              }, 2000);
            }
            if (Object.prototype.hasOwnProperty.call(data, 'code')) {
              if (data.code === 'auth/email-already-in-use') {
                setError('E-mail already in use.');
              } else {
                setError(`An error occured:${data.code}`);
              }
            }
          };
          registerNewUser();
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Form className={styles.form}>
            <label htmlFor="nickName">Nickname</label>
            <Field
              className={
                theme === 'night'
                  ? styles['form-input-dark']
                  : styles['form-input-light']
              }
              type="text"
              name="nickName"
              placeholder="John"
            />
            <ErrorMessage
              className={styles['error-message']}
              name="nickName"
              component="div"
            />
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
              className={styles['error-message']}
              name="email"
              component="div"
            />
            <label htmlFor="password">Password</label>
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
              className={styles['error-message']}
              name="password"
              component="div"
            />
            <label htmlFor="retypePassword">Confirm password</label>
            <Field
              className={
                theme === 'night'
                  ? styles['form-input-dark']
                  : styles['form-input-light']
              }
              type="password"
              name="retypePassword"
              placeholder="******"
            />
            <ErrorMessage
              className={styles['error-message']}
              name="retypePassword"
              component="div"
            />
            <Button
              className={styles['submit-button']}
              name="Register"
              disabled={isSubmitting || !isValid}
            />
          </Form>
        )}
      </Formik>
      {message && <div className={styles['success-message']}>{message}</div>}
      {error && <div className={styles['error-message']}>{error}</div>}
    </div>
  );
}

export default Register;
