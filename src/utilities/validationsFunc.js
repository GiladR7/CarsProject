import { validation } from "../utilities/validationObj";
import { getCities } from "../DAL/api";

export function validationFunc(
  inputsValues,
  setInputsValues,
  setisDisabled,
  chooseCategory = false
) {
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

    if (
      validation[name].funcValidation &&
      validation[name].funcValidation(value, inputsValues?.password?.value)
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
    const isDisabled = canSubmit(
      inputsValues,
      setisDisabled,
      chooseCategory ? chooseCategory : ""
    );

    setInputsValues({
      ...inputsValues,
    });
    return isDisabled;
  };
}

function canSubmit(inputsValues, setisDisabled, chooseCategory = false) {
  for (const key in inputsValues) {
    const { value, errors } = inputsValues[key];
    if ((!value && validation[key].required) || errors.length !== 0) {
      if (+chooseCategory === 3 && key === "gear") continue;
      setisDisabled(true);
      return true;
    }
  }
  setisDisabled(false);
  return false;
}

export function inputOnChange(inputsValues, setInputsValues, setBtnDisable) {
  return ({ value, name }) => {
    inputsValues[name].value = value;
    if (name === "city") {
      getCities(value, inputsValues, setInputsValues);
      setBtnDisable(true);
      inputsValues.city.errors = ["הכנס עיר שמופיע ברשימה"];
    }
    setInputsValues({
      ...inputsValues,
    });
  };
}
