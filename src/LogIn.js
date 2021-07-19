import { Form, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { logInCheck } from "./DAL/api";
import { useState } from "react";
import { validationFunc } from "./utilities/validationsFunc";
import { useHistory } from "react-router";

export default function LogIn({ closePopUp, setIsLogIn }) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [errorLogIn, setErrorLogIn] = useState("");
  const [inputValues, setInputValues] = useState({
    email: {
      value: "",
      isValid: true,
    },
    password: {
      value: "",
      isValid: true,
    },
  });
  const history = useHistory();
  const checkInput = validationFunc(inputValues, setInputValues, setIsDisabled);
  function onLogIn(e) {
    e.preventDefault();
    logInCheck(inputValues.email.value, inputValues.password.value)
      .then((user) => {
        localStorage.setItem("currentUser", JSON.stringify(user));
        setIsLogIn(true);
        closePopUp();
        history.push("/");
      })
      .catch((err) => {
        setErrorLogIn(err);
      });
  }
  return (
    <div>
      <FontAwesomeIcon
        icon={faTimes}
        className="close-btn"
        onClick={() => {
          closePopUp();
        }}
      />
      <span style={{ fontSize: "15px", color: "red" }}>{errorLogIn}</span>
      <Form
        onSubmit={(e) => {
          onLogIn(e);
        }}
      >
        <Form.Row>
          <Col md="5">
            <Form.Control
              type="email"
              placeholder="הכנס איימיל"
              name="email"
              value={inputValues.email.value}
              onChange={(e) => checkInput(e.target)}
              className={inputValues.email.isValid ? "" : "in-valid-data"}
            />
          </Col>
          <Col md="5">
            <Form.Control
              type="password"
              placeholder="הכנס סיסמא"
              name="password"
              className={inputValues.password.isValid ? "" : "in-valid-data"}
              value={inputValues.password.value}
              onChange={(e) => checkInput(e.target)}
            />
          </Col>
          <Col md="2">
            <Button variant="primary" type="submit" disabled={isDisabled}>
              התחבר
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </div>
  );
}
