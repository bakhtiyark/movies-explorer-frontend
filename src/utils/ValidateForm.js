import { useState, useCallback } from "react";
import isEmail from "validator/lib/isEmail";
import { EMAIL_INCORRECT } from "./constants";

export default function ValidateForm() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((x) => ({
      ...x,
      [name]: value,
    }));
    if (name === "email") {
      if (!isEmail(value)) {
        e.target.setCustomValidity(EMAIL_INCORRECT);
      } else {
        e.target.setCustomValidity("");
      }
    }
    setError({ ...error, [name]: e.target.validationMessage });
    setIsValid(e.target.closest(".form").checkValidity());
  };
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setFormValues(newValues);
      setError(newErrors);
      setIsValid(newIsValid);
    },
    [setFormValues, setError, setIsValid]
  );

  return {
    formValues,
    setFormValues,
    handleChange,
    error,
    setError,
    isValid,
    setIsValid,
    resetForm
  };
}
