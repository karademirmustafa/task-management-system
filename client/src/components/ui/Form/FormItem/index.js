import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';

const FormItem = React.forwardRef((props, ref) => {
  const { children, className, htmlFor, labelClass, asterisk, label, invalid, errorMessage } =
    props;
  const enterStyle = { opacity: 1, marginTop: 3, bottom: -21 };
  const exitStyle = { opacity: 0, marginTop: -10 };
  const initialStyle = exitStyle;

  const formItemClass = classNames('form-item', className, invalid ? 'invalid' : '');

  const formLabelClass = classNames('form-label', labelClass);
  return (
    <div ref={ref} className={formItemClass}>
      <label htmlFor={htmlFor} className={formLabelClass}>
        {asterisk && <span className="text-red-500 ltr:mr-1 rtl:ml-1">*</span>}
        {label}
        {/* {(label && formItemLayout !== 'vertical') && ':'} */}
      </label>
      <div>
        {children}
        <AnimatePresence exitBeforeEnter>
          {invalid && (
            <motion.div
              className="form-explain"
              initial={initialStyle}
              animate={enterStyle}
              exit={exitStyle}
              transition={{ duration: 0.15, type: 'tween' }}>
              {errorMessage}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});

export default FormItem;
