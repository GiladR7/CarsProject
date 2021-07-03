import { Container, Form, Button } from "react-bootstrap";
import { sendNewUser } from "../DAL/api";
import { validationFunc, inputOnChange } from "../utilities/validationsFunc";
import InputTextInLine from "../Components/InputTextInLine";
import { checkBoxOnChange } from "../utilities/utilities";
import CheckBoxGroup from "../Components/CheckBoxGroup";
import { useState } from "react";
import { useHistory } from "react-router";
export default function MyProfile() {
  const userDetails = {
    user: {
      value: "",
      isValid: true,
      errors: [],
    },
    email: {
      value: "",
      isValid: true,
      errors: [],
    },

    chooseCategory: {
      value: [],
      isValid: true,
      errors: [],
    },
  };

  const history = useHistory();

  function setInputDataFromLocal() {
    const userDataFromLocal = JSON.parse(localStorage.getItem("currentUser"));
    if (userDataFromLocal) {
      for (const key in userDetails) {
        userDetails[key].value = userDataFromLocal[key];
      }

      return userDetails;
    }
    history.push("/");
    return userDetails;
  }
  const [isDisabled, setisDisabled] = useState(false);
  const [inputsValues, setInputsValues] = useState(() => {
    return setInputDataFromLocal();
  });
  const updateCheckBoxSelected = checkBoxOnChange(
    inputsValues,
    setInputsValues
  );
  const inputOnBlur = validationFunc(
    inputsValues,
    setInputsValues,
    setisDisabled
  );

  function onsubmit(e) {
    const fieldsData = {};
    e.preventDefault();
    for (const key in inputsValues) {
      fieldsData[key] = inputsValues[key].value;
    }
    sendNewUser(fieldsData);
  }
  const changeInput = inputOnChange(inputsValues, setInputsValues);
  return (
    <Container fluid>
      <Form className="form-register" onSubmit={(e) => onsubmit(e)}>
        <h3 className="mb-4">הפרופיל שלי</h3>
        <InputTextInLine
          labelText="שם משתמש"
          placeholderText="הכנס שם משתמש"
          inputType="text"
          htmlFor="user-name"
          name="user"
          valid={inputsValues.user.isValid}
          value={inputsValues.user.value}
          errors={inputsValues.user.errors}
          inputOnChange={changeInput}
          validationFunc={inputOnBlur}
        />
        <InputTextInLine
          labelText="כתובת אימייל"
          placeholderText="הכנס איימיל"
          inputType="email"
          htmlFor="email"
          name="email"
          value={inputsValues.email.value}
          valid={inputsValues.email.isValid}
          errors={inputsValues.email.errors}
          inputOnChange={changeInput}
          validationFunc={inputOnBlur}
        />

        <CheckBoxGroup
          labelText="הצג לי מודעות"
          checkBoxValues={inputsValues.chooseCategory.value}
          checkboxsValuesArr={[
            ["רכבים פרטיים", 1],
            ["אופנועיים", 3],
            ["גיפים", 4],
          ]}
          name="chooseCategory"
          onChecked={updateCheckBoxSelected}
        />

        <Button variant="primary" type="submit" disabled={isDisabled}>
          עדכן פרטים
        </Button>
      </Form>
    </Container>
  );
}
