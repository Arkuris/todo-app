import { useState, useEffect } from 'react';

const useForm = (callback, defaultValues = {}) => {
  const [values, setValues] = useState(defaultValues);

  useEffect(() => {
    setValues(defaultValues);
  }, [defaultValues]);

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();
    await callback(values);
  };

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    setValues(values => ({
      ...values,
      [name]: type === 'number' ? parseInt(value, 10) : value
    }));
  };

  const resetForm = () => {
    setValues(defaultValues);
  };

  return {
    handleChange,
    handleSubmit,
    values,
    resetForm,
  };
};

export default useForm;
