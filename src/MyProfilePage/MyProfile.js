import { Container, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import InputTextInLine from "../Components/InputTextInLine";
import { updateUserDeatils } from "../DAL/api";
import {
  validationFunc,
  tokenValidtion,
  inputOnChange,
  checkInputChangeBeforeSubmit,
} from "../utilities/validationsFunc";
import { checkBoxOnChange } from "../utilities/utilities";
import CheckBoxGroup from "../Components/CheckBoxGroup";

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

  const [error, setError] = useState();
  const [updateSuccess, setUpdateSuccess] = useState("");
  const userDataFromLocal = JSON.parse(localStorage.getItem("currentUser"));
  const history = useHistory();

  function setInputDataFromLocal() {
    if (userDataFromLocal) {
      for (const key in userDetails) {
        userDetails[key].value = userDataFromLocal[key];
      }
      return userDetails;
    }

    history.push("/");
    return userDetails;
  }

  async function pageOnLoad() {
    const isLogIn = await tokenValidtion(history);
    if (isLogIn) {
      setInputDataFromLocal();
    }
  }
  useEffect(() => {
    pageOnLoad();
  }, []);
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

  async function onsubmit(e) {
    e.preventDefault();
    setUpdateSuccess("");

    if (checkInputChangeBeforeSubmit(inputsValues, userDataFromLocal)) {
      const {
        data,
        message,
        inputsValues: inputsSeverValidation,
      } = await updateUserDeatils(inputsValues);
      console.log(inputsValues);
      if (inputsSeverValidation) {
        setInputsValues({ ...inputsSeverValidation });
      } else if (message) {
        setError(message);
      } else if (data) {
        const [updateDetails] = data;
        localStorage.setItem("currentUser", JSON.stringify(updateDetails));
        setUpdateSuccess("עודכן בהצלחה");
        setError("");
      }
    } else {
      setError("אף שדה לא עודכן");
    }
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
            ["אופנועים", 3],
            ["ג'יפים", 4],
          ]}
          name="chooseCategory"
          onChecked={updateCheckBoxSelected}
        />

        <Button variant="primary" type="submit" disabled={isDisabled}>
          עדכן פרטים
        </Button>
        {error && (
          <p role="alert" className="fade alert alert-danger show mt-2">
            {error}
          </p>
        )}
        {updateSuccess && (
          <p role="alert" className="fade alert alert-success show mt-2">
            {updateSuccess}
          </p>
        )}
      </Form>
    </Container>
  );
}
