import { useState } from 'react';

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  return [
    values,
    setValues,
    function(e) {
      setValues({
        ...values,
        [e.target.id]: e.target.value,
      });
    },
  ];
}

export default useForm;
