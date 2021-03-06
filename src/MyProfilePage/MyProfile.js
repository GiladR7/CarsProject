import { Container, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";

import InputTextInLine from "../Components/InputTextInLine";
import { updateUserDeatils, getUserDetails } from "../DAL/api";
import {
  validationFunc,
  tokenValidtion,
  inputOnChange,
  checkInputChangeBeforeSubmit,
} from "../utilities/validationsFunc";
import { checkBoxOnChange, extractValues } from "../utilities/utilities";
import CheckBoxGroup from "../Components/CheckBoxGroup";
import Aos from "aos";
import "aos/dist/aos.css";

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

    chooseCategories: {
      value: [],
      isValid: true,
      errors: [],
    },
  };
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);
  const [error, setError] = useState();
  const [updateSuccess, setUpdateSuccess] = useState("");
  const userDataFromLocal = JSON.parse(localStorage.getItem("currentUser"));
  const history = useHistory();

  async function setInputDataFromLocal() {
    if (userDataFromLocal) {
      for (const key in userDetails) {
        userDetails[key].value = userDataFromLocal[key];
      }
      setInputsValues({ ...userDetails });
    } else {
      const userDetailsFromServer = await getUserDetails();
      localStorage.setItem(
        "currentUser",
        JSON.stringify(userDetailsFromServer)
      );
      for (const key in userDetails) {
        userDetails[key].value = userDetailsFromServer[key];
      }

      setInputsValues({ ...userDetails });
    }
  }

  async function pageOnLoad() {
    const isLogIn = await tokenValidtion(history);
    if (isLogIn) {
      return await setInputDataFromLocal();
    }
    history.push("/");
  }
  useEffect(() => {
    pageOnLoad();
  }, []);
  const [isDisabled, setisDisabled] = useState(false);
  const [inputsValues, setInputsValues] = useState(userDetails);
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
    const sendData = extractValues(inputsValues);

    if (checkInputChangeBeforeSubmit(inputsValues, userDataFromLocal)) {
      const {
        data,
        message,
        inputsValues: inputsSeverValidation,
      } = await updateUserDeatils(sendData);

      if (inputsSeverValidation) {
        setInputsValues({ ...inputsSeverValidation });
      } else if (message) {
        setError(message);
      } else if (data) {
        const [updateDetails] = data;
        localStorage.setItem("currentUser", JSON.stringify(updateDetails));
        setUpdateSuccess("?????????? ????????????");
        setError("");
      }
    } else {
      setError("???? ?????? ???? ??????????");
    }
  }

  const changeInput = inputOnChange(inputsValues, setInputsValues);
  return (
    <Container fluid data-aos="fade-down">
      <Form className="form-register" onSubmit={(e) => onsubmit(e)}>
        <h3 className="mb-4">?????????????? ??????</h3>
        <InputTextInLine
          labelText="???? ??????????"
          placeholderText="???????? ???? ??????????"
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
          labelText="?????????? ????????????"
          placeholderText="???????? ????????????"
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
          labelText="?????? ???? ????????????"
          checkBoxValues={inputsValues.chooseCategories.value}
          checkboxsValuesArr={[
            ["?????????? ????????????", 1],
            ["????????????????", 3],
            ["??'????????", 4],
          ]}
          name="chooseCategory"
          onChecked={updateCheckBoxSelected}
        />

        <Button variant="primary" type="submit" disabled={isDisabled}>
          ???????? ??????????
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
