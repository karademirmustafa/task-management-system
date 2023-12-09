import React from 'react';
import classNames from 'classnames';
import { FormContextProvider, FormContextConsumer } from '../context';
import { useConfig } from '../../ConfigProvider';

const FormContainer = (props) => {
  const { controlSize } = useConfig();
  const { children, className, size } = props;

  const contextValue = {
    size: size || controlSize
  };

  return (
    <FormContextProvider value={contextValue}>
      <FormContextConsumer>
        {(context) => {
          return (
            <div className={classNames('form-container',className)}>
              {children}
            </div>
          );
        }}
      </FormContextConsumer>
    </FormContextProvider>
  );
};

export default FormContainer;
