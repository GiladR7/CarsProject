import { validation } from "../utilities/validationObj";
export function validationFunc(inputsValues, setInputsValues, setisDisabled) {
  return ({ name, value }) => {
    const errors = [];

    let isValid = true;
    if (validation[name].required && !value) {
      errors.push(validation[name].requiredError);
      isValid = false;
    }
    if (validation[name].regex && !validation[name].regex.test(value)) {
      errors.push(validation[name].regexError);
      isValid = false;
    }

    if (name === "confirmPassword") {
      if (value !== inputsValues.password.value) {
        isValid = false;
        errors.push("סיסמא לא תואמת");
      }
    }
    if (
      validation[name].funcValidation &&
      validation[name].funcValidation(value)
    ) {
      isValid = false;
      errors.push(validation[name].customError);
    }
    if (name === "file") {
      value = value.files;
    }

    inputsValues[name].isValid = isValid;
    inputsValues[name].errors = errors;
    inputsValues[name].value = value;
    const isDisabled = canSubmit(inputsValues, setisDisabled);

    setInputsValues({
      ...inputsValues,
    });
    return isDisabled;
  };
}

function canSubmit(inputsValues, setisDisabled) {
  for (const key in inputsValues) {
    const { value, errors } = inputsValues[key];
    if ((!value && validation[key].required) || errors.length !== 0) {
      setisDisabled(true);
      return true;
    }
  }
  setisDisabled(false);
  return false;
}

export function inputOnChange(inputsValues, setInputsValues, setBtnDisable) {
  return ({ value, name }) => {
    // if (setBtnDisable) {
    //   value ? setBtnDisable(false) : setBtnDisable(true);
    // }
    inputsValues[name].value = value;
    setInputsValues({
      ...inputsValues,
    });
  };
}
