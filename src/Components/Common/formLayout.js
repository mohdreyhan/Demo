import { useState } from 'react';

export const FormLayout = (intialFormValues) => {
  const [values, setValues] = useState(intialFormValues);
  const [errors, setErrors] = useState({});

  const handlePropertyChange = (e) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value
    });
  };

  const resetForm = () => {
    setValues(intialFormValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    handlePropertyChange,
    errors,
    setErrors,
    resetForm
  };
};

export const Form = (props) => {
  const { children, ...other } = props;

  return (
    <form {...other} data-testid="form-test">
      {props.children}
    </form>
  );
};
