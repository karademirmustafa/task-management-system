import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { PasswordInput } from 'components/shared';
import { Alert, Button, FormContainer, FormItem, Input } from 'components/ui';
import useAuth from 'utils/hooks/useAuth';

const validationSchema = Yup.object().shape({
  email: Yup.string().required('Lütfen e-posta girin'),
  password: Yup.string().required('Lütfen şifrenizini girin')
});

const SignInForm = (props) => {
  const { disableSubmit = false, className } = props;
  const [message, setMessage] = useState('');
    const { signIn } = useAuth();

    const onSignIn = async (values, setSubmitting) => {
      const { email, password } = values;
      setSubmitting(true);

      const result = await signIn({ email, password });

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
          rememberMe: true
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          if (!disableSubmit) {
            onSignIn(values, setSubmitting);
          } else {
            setSubmitting(false);
          }
        }}>
        {({ touched, errors, isSubmitting }) => (
          <section className="bg-gray-50 flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <span className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                Task Management System
              </span>
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h2 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                    Sign in to your account
                  </h2>
                  <Form>
                    <FormContainer>
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

                      <FormItem label="Password">
                        <Field
                          autoComplete="off"
                          name="password"
                          placeholder=""
                          component={PasswordInput}
                        />
                      </FormItem>
                    </FormContainer>

                    <Button type="submit" block loading={isSubmitting}>
                      {isSubmitting ? 'Giriş yapılıyor...' : 'Giriş Yap'}
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

export default SignInForm;
