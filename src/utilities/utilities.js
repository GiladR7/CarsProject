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

export function createFormData(inputs, files, filesKey) {
  const formData = new FormData();

  for (const key in inputs) {
    formData.append(key, inputs[key].value);
  }
  if (files) {
    for (let i = 0; i < files.length; i++) {
      formData.append(filesKey, files[i]);
    }
  }
  return formData;
}
