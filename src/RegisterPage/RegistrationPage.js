import { Container, Form, Button } from "react-bootstrap";

import { validationFunc, inputOnChange } from "../utilities/validationsFunc";
import InputTextInLine from "../Components/InputTextInLine";
import CheckBoxGroup from "../Components/CheckBoxGroup";
import { useState } from "react";
export default function Registration() {
  const [isDisabled, setisDisabled] = useState(true);
  const [inputsValues, setInputsValues] = useState({
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
    password: {
      value: "",
      isValid: true,
      errors: [],
    },
    confirmPassword: {
      value: "",
      isValid: true,
      errors: [],
    },
  });
  const inputOnBlur = validationFunc(
    inputsValues,
    setInputsValues,
    setisDisabled
  );
  const changeInput = inputOnChange(inputsValues, setInputsValues);
  return (
    <Container fluid>
      <Form className="form-register">
        <h3 className="mb-4">הירשם לאתר</h3>
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
        <InputTextInLine
          labelText="סיסמא"
          placeholderText="הכנס סיסמא"
          inputType="password"
          htmlFor="password"
          name="password"
          value={inputsValues.password.value}
          valid={inputsValues.password.isValid}
          errors={inputsValues.password.errors}
          inputOnChange={changeInput}
          validationFunc={inputOnBlur}
        />

        <InputTextInLine
          labelText=" אימות סיסמא"
          placeholderText="אמת את סיסמא"
          inputType="password"
          htmlFor="confirmPassword"
          name="confirmPassword"
          value={inputsValues.confirmPassword.value}
          valid={inputsValues.confirmPassword.isValid}
          errors={inputsValues.confirmPassword.errors}
          inputOnChange={changeInput}
          validationFunc={inputOnBlur}
        />

        <CheckBoxGroup
          labelText="הצג לי מודעות"
          checkboxsValuesArr={["רכבים פרטיים", "גיפים", "אופנועים"]}
        />

        <Button variant="primary" type="submit" disabled={isDisabled}>
          הירשם לאתר
        </Button>
      </Form>
    </Container>
  );
}
