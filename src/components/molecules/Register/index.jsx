/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import styles from './index.module.scss';
import Button from '../../atoms/Button';

import { register } from '../../../helpers/firebase';

function Register() {
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
          // firebase auth with values
          // ...
          const registerNewUser = async () => {
            // await register(values.email, values.password);
            await register(values.email, values.password, values.nickName);
          };
          registerNewUser();
        }}
      >
        {({ isSubmitting, isValid }) => (
          <Form className={styles.form}>
            <label htmlFor="nickName">Nickname</label>
            <Field
              className={styles['form-input']}
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
              className={styles['form-input']}
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
              className={styles['form-input']}
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
              className={styles['form-input']}
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
    </div>
  );
}

export default Register;
