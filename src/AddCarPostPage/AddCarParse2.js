import { Container, Form, Button, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link, useHistory } from "react-router-dom";
import TextArea from "../Components/TextArea";
import InputText from "../Components/InputText";
import SelectInput from "../Components/SelectInput";
import PhoneInput from "../Components/PhoneInput";
import DateInput from "../Components/DateInput";
import { useState } from "react";
import { validationFunc, inputOnChange } from "../utilities/validationsFunc";
import {
  getItemLocal,
  updateLocalStorege,
} from "../utilities/localStoregeFunc";
import InputNumber from "../Components/InputNumber";
export default function AddCarParse2() {
  const [isDisable, setIsDisable] = useState(true);

  const [inputsValues, setInputsValues] = useState(() => {
    return getItemLocal(
      "adCarData",
      "adDetails",
      "canSubmit",
      {
        owners: {
          value: "",
          isValid: true,
          errors: [],
        },
        year: {
          value: "",
          isValid: true,
          errors: [],
        },
        km: {
          value: "",
          isValid: true,
          errors: [],
        },
        color: {
          value: "",
          isValid: true,
          errors: [],
        },
        gear: {
          value: "",
          isValid: true,
          errors: [],
        },
        codeArea: {
          value: "",
          isValid: true,
          errors: [],
        },
        phone: {
          value: "",
          isValid: true,
          errors: [],
        },
        file: {
          value: "",
          isValid: true,
          errors: [],
        },
        city: {
          value: "",
          isValid: true,
          errors: [],
        },
        moreDetails: {
          value: "",
          isValid: true,
          errors: [],
        },
      },
      setIsDisable
    );
  });

  const updateLocal = updateLocalStorege(
    "canSubmit",
    "adCarData",
    "adDetails",
    inputsValues
  );

  const histoy = useHistory();

  const validationInput = validationFunc(
    inputsValues,
    setInputsValues,
    setIsDisable
  );
  const changeInput = inputOnChange(inputsValues, setInputsValues);
  function onsubmit(e) {
    e.preventDefault();
    console.log(JSON.parse(localStorage.getItem("adCarData")));
    localStorage.removeItem("adCarData");

    histoy.push("/");
  }
  return (
    <Container fluid>
      <Form className="add-car-container" onSubmit={(e) => onsubmit(e)}>
        <Row>
          <Col md="6">
            <DateInput
              labelText="תאריך עלייה על הכביש"
              htmlFor="car-year"
              name="year"
              maxDate={new Date().toISOString().slice(0, 10)}
              minDate={"1960-01-01"}
              value={inputsValues.year.value}
              changeInput={validationInput}
              updateLocal={updateLocal}
              required={true}
            />
          </Col>
          <Col md="6">
            <InputNumber
              htmlFor="km"
              labelText="מספר קילומטרים"
              mixNumber="0"
              maxNumber="10000000"
              placeholderText="הכנס קילומטרז"
              value={inputsValues.km.value}
              changeInput={validationInput}
              name="km"
              updateLocal={updateLocal}
              required={true}
            />
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <InputNumber
              htmlFor="owners"
              labelText="מספר בעלים"
              mixNumber="1"
              maxNumber="10"
              placeholderText="הכנס את יד הרכב"
              value={inputsValues.owners.value}
              changeInput={validationInput}
              name="owners"
              updateLocal={updateLocal}
              required={true}
            />
          </Col>
          <Col md="6">
            <SelectInput
              htmlFor="gear"
              textLable="סוג תיבת הילוכים"
              showByDefault={["", "בחר סוג תיבה"]}
              optionSelect={["ידני", "חשמלי", "אוטומטי"]}
              inputChange={validationInput}
              value={inputsValues.gear.value}
              errors={inputsValues.gear.errors}
              valid={inputsValues.gear.isValid}
              updateLocal={updateLocal}
            />
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <Form.Group>
              <Form.File
                className={`position-relative ${
                  inputsValues.file.isValid ? "" : "is-invalid"
                }`}
                name="file"
                multiple
                accept="image/png, image/jpeg"
                label="העלאה תמונות של הרכב"
                id="validationFormik107"
                placeholder="בחר קובץ"
                onChange={(e) => {
                  validationInput({ value: e.target, name: "file" });
                  updateLocal();
                }}
              />
              <Form.Control.Feedback
                role="alert"
                className="fade alert alert-danger show"
                type="invalid"
              >
                {inputsValues.file.errors.map((error, index) => {
                  return <p key={index}>{error}</p>;
                })}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md="6">
            <PhoneInput
              phoneErr={inputsValues.phone.errors}
              areaCodeErr={inputsValues.codeArea.errors}
              areaCodeValid={inputsValues.codeArea.isValid}
              phoneValid={inputsValues.phone.isValid}
              validationInput={validationInput}
              inputChange={changeInput}
              updateLocal={updateLocal}
              areaValue={inputsValues.codeArea.value}
              phoneValue={inputsValues.phone.value}
            />
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <InputText
              htmlFor="color-car"
              labelText="צבע הרכב"
              maxTextLength="8"
              inputType="text"
              placeholderText="הכנס את צבע הרכב"
              value={inputsValues.color.value}
              inputOnChange={changeInput}
              valid={inputsValues.color.isValid}
              validationFunc={validationInput}
              errors={inputsValues.color.errors}
              name="color"
              updateLocal={updateLocal}
            />
          </Col>
          <Col md="6">
            <InputText
              htmlFor="city"
              labelText="עיר מגורים"
              maxTextLength="12"
              inputType="text"
              placeholderText="הכנס עיר מגורים"
              value={inputsValues.city.value}
              inputOnChange={changeInput}
              valid={inputsValues.city.isValid}
              validationFunc={validationInput}
              errors={inputsValues.city.errors}
              name="city"
              updateLocal={updateLocal}
            />
          </Col>
        </Row>
        <TextArea
          htmlFor="more-details"
          placeholderText="הכנס פרטים נוספים על הרכב"
          labelText="פרטים נוספים"
          name="moreDetails"
          maxCharacters="255"
          value={inputsValues.moreDetails.value}
          inputOnChange={changeInput}
          updateLocal={updateLocal}
        />
        <div className="d-flex btn-parse2">
          <Link className="btn btn-warning" to="/add-new-car">
            <FontAwesomeIcon icon={faEdit} /> חזור
          </Link>

          <Button variant="primary" type="submit" disabled={isDisable}>
            פרסם מודעה
          </Button>
        </div>
      </Form>
    </Container>
  );
}
