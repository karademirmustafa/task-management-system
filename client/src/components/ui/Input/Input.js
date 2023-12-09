import React from 'react';
import classNames from 'classnames';
import { CONTROL_SIZES } from '../utils/constant';
import { useConfig } from '../ConfigProvider';
const Input = React.forwardRef((props, ref) => {
  const {
    asElement: Component,
    className,
    disabled,
    invalid,
    size,
    textArea,
    type,
    style,
    unstyle,
    field,
    form,
    ...rest
  } = props;
  const { controlSize } = useConfig();
  const inputSize = size || controlSize;
  const inputDefaultClass = 'input';
  const inputSizeClass = `input-${inputSize} h-${CONTROL_SIZES[inputSize]}`;
  // const inputFocusClass = `focus:ring-${themeColor}-${primaryColorLevel} focus-within:ring-${themeColor}-${primaryColorLevel} focus-within:border-${themeColor}-${primaryColorLevel} focus:border-${themeColor}-${primaryColorLevel}`;
  // const inputWrapperClass = `input-wrapper ${prefix || suffix ? className : ''}`;

  const inputClass = classNames(
    inputDefaultClass,
    !textArea && inputSizeClass
    // !isInvalid && inputFocusClass,
    // !prefix && !suffix ? className : '',
    // disabled && 'input-disabled',
    // isInvalid && 'input-invalid',
    // textArea && 'input-textarea'
  );

  const inputProps = {
    className: !unstyle ? inputClass : '',
    disabled,
    type,
    ref,
    ...field,
    ...rest
  };

  const renderInput = (
      <input style={{ ...style }} {...inputProps} />
  );
  const renderTextArea = <textarea style={style} {...inputProps}></textarea>;

  const render = () => {
    if (textArea) {
      return renderTextArea;
    } else {
      return renderInput;
    }
  };

  return render();
});

export default Input;
