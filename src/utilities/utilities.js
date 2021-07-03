export function checkBoxOnChange(inputsValues, setInputsValues) {
  return ({ value, checked }) => {
    if (checked) {
      inputsValues.chooseCategory.value.push(+value);
    } else {
      inputsValues.chooseCategory.value =
        inputsValues.chooseCategory.value.filter(
          (category) => +category !== +value
        );
    }
    setInputsValues({ ...inputsValues });
  };
}
