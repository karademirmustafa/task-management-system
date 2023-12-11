import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { PasswordInput } from 'components/shared';
import { Alert, Button, FormContainer, FormItem, Input } from 'components/ui';
import useAuth from 'utils/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Please enter your e-mail'),
  password: Yup.string().required('Please enter your password'),
  confirmPassword: Yup.string()
  .required('Please confirm your password')
  .oneOf([Yup.ref('password'), null], 'Passwords must match'),
  name: Yup.string().required('Please enter your name')
});

const SignUpForm = (props) => {
  const { disableSubmit = false, className } = props;
  const [message, setMessage] = useState('');
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const redirectLoginPage = () => {
    navigate('/sign-in');
  }
  const onSignUp = async (values, setSubmitting) => {
    const { email, password, name } = values;
    setSubmitting(true);

    const result = await signUp({ email, password, name });

    if (result && result.status === 'failed') {
      setMessage(result.message);
    }

    setSubmitting(false);
  };

  return (
    <div className={className}>
      <Formik
        initialValues={{
          email: '',
          password: '',
          name: '',
          confirmPassword: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (!disableSubmit) {
            onSignUp(values, setSubmitting);
          } else {
            setSubmitting(false);
          }
        }}>
        {({ touched, errors, isSubmitting }) => (
          <section className="bg-gray-50 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              {/* <span className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                Task Management System
              </span> */}
              <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                    Sign up to your account
                  </h2>
                  <Form>
                    <FormContainer>
                      <FormItem
                        label="Name"
                        invalid={errors.name && touched.name}
                        errorMessage={errors.name}>
                        <Field
                          type="text"
                          autoComplete="off"
                          name="name"
                          placeholder=""
                          component={Input}
                        />
                      </FormItem>
                      <FormItem
                        label="Email"
                        invalid={errors.email && touched.email}
                        errorMessage={errors.email}>
                        <Field
                          type="text"
                          autoComplete="off"
                          name="email"
                          placeholder=""
                          component={Input}
                        />
                      </FormItem>

                      <FormItem
                        label="Password"
                        invalid={errors.password && touched.password}
                        errorMessage={errors.password}>
                        <Field
                          autoComplete="off"
                          name="password"
                          placeholder=""
                          component={PasswordInput}
                        />
                      </FormItem>
                      <FormItem
                        label="Confirm Password"
                        invalid={errors.confirmPassword && touched.confirmPassword}
                        errorMessage={errors.confirmPassword}>
                        <Field
                          type="password"
                          autoComplete="off"
                          name="confirmPassword"
                          placeholder=""
                          component={PasswordInput}
                        />
                      </FormItem>
                    </FormContainer>

                    <Button type="submit" block loading={isSubmitting}>
                      {isSubmitting ? 'Registering...' : 'Register'}
                    </Button>
                    <Button type="button"  onClick={redirectLoginPage} className="mt-2 bg-gray-800 text-white hover:bg-gray-600" block loading={isSubmitting}>
                      Sign In Page
                    </Button>
                  </Form>
                </div>
                {message && (
                  <Alert className="mb-4" type="danger">
                    {message}
                  </Alert>
                )}
              </div>
            </div>
          </section>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
