import { Container, Form, Button, Col, Row, ListGroup } from "react-bootstrap";

import { useHistory, useParams } from "react-router-dom";
import TextArea from "../Components/TextArea";
import InputText from "../Components/InputText";
import SelectInput from "../Components/SelectInput";
import PhoneInput from "../Components/PhoneInput";
import DateInput from "../Components/DateInput";
import { useEffect, useState } from "react";
import { validationFunc, inputOnChange } from "../utilities/validationsFunc";
import {
  getGears,
  getAdEditData,
  getColorsOptions,
  getAreaCodes,
} from "../DAL/api";

import InputNumber from "../Components/InputNumber";

export default function EditCarAd() {
  const [isDisable, setIsDisable] = useState(false);
  const [chooseCategory, setChooseCategory] = useState("");
  const [inputsValues, setInputsValues] = useState({
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
      selectList: [],
    },
    gear: {
      value: "",
      isValid: true,
      errors: [],
      selectList: [],
    },
    codeArea: {
      value: "",
      isValid: true,
      errors: [],
      selectList: [],
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
      cities: [],
    },
    description: {
      value: "",
      isValid: true,
      errors: [],
    },
    price: {
      value: "",
      isValid: true,
      errors: [],
    },
  });
  const { id } = useParams();
  useEffect(() => {
    getAdEditData(id).then((ad) => {
      for (const key in inputsValues) {
        if (key in ad) inputsValues[key].value = ad[key];
      }
      setChooseCategory(ad.categoryID);
      setInputsValues({ ...inputsValues });
    });
    getAreaCodes().then((codeArea) => {
      inputsValues.codeArea.selectList = codeArea;
      setInputsValues({ ...inputsValues });
    });
    getGears().then((gear) => {
      inputsValues.gear.selectList = gear;
      setInputsValues({ ...inputsValues });
    });
    getColorsOptions().then((colors) => {
      inputsValues.color.selectList = colors;
      setInputsValues({ ...inputsValues });
    });
  }, []);

  const histoy = useHistory();

  const validationInput = validationFunc(
    inputsValues,
    setInputsValues,
    setIsDisable,
    chooseCategory
  );
  const changeInput = inputOnChange(
    inputsValues,
    setInputsValues,
    setIsDisable
  );
  function onsubmit(e) {
    e.preventDefault();
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
              required={true}
            />
          </Col>
          <Col md="6">
            <div className="city-container">
              <InputText
                htmlFor="city"
                labelText="עיר מגורים"
                maxTextLength="12"
                inputType="text"
                placeholderText={"הכנס עיר מגורים"}
                value={inputsValues.city.value}
                inputOnChange={changeInput}
                valid={inputsValues.city.isValid}
                errors={inputsValues.city.errors}
                name="city"
                autocomplete="off"
                className="city-field"
              />
              <ListGroup className="list-cietis">
                {inputsValues.city.cities.map((city, index) => {
                  return (
                    <ListGroup.Item
                      key={index}
                      onClick={() => {
                        inputsValues.city.cities = [];
                        inputsValues.city.errors = [];
                        const isDisabled = validationInput({
                          name: "city",
                          value: city,
                        });
                      }}
                    >
                      {city}
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </div>
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
                  validationInput({
                    value: e.target.files,
                    name: "file",
                  });
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
              areaValue={inputsValues.codeArea.value}
              phoneValue={inputsValues.phone.value}
              phoneCodeAreaSelect={inputsValues.codeArea.selectList}
            />
          </Col>
        </Row>
        <Row>
          <Col md="6">
            <SelectInput
              htmlFor="color"
              textLable="צבע הרכב"
              showByDefault={["", "בחר את צבע הרכב"]}
              optionSelect={inputsValues.color.selectList}
              inputChange={validationInput}
              value={inputsValues.color.value}
              errors={inputsValues.color.errors}
              valid={inputsValues.color.isValid}
              valueKey="colorID"
              textKey="colorName"
            />
          </Col>
          <Col md="6">
            <InputNumber
              htmlFor="price"
              labelText="מחיר הרכב"
              mixNumber="1"
              maxNumber="10000000"
              placeholderText="הכנס את מחיר הרכב"
              value={inputsValues.price.value}
              changeInput={validationInput}
              name="price"
              required={true}
            />
          </Col>
        </Row>

        <Row>
          <Col md="6">
            {chooseCategory !== 3 && (
              <SelectInput
                htmlFor="gear"
                textLable="סוג תיבת הילוכים"
                showByDefault={["", "בחר סוג תיבה"]}
                optionSelect={inputsValues.gear.selectList}
                inputChange={validationInput}
                value={inputsValues.gear.value}
                errors={inputsValues.gear.errors}
                valid={inputsValues.gear.isValid}
                valueKey="gearID"
                textKey="gearName"
              />
            )}
          </Col>
        </Row>
        <TextArea
          htmlFor="more-details"
          placeholderText="הכנס פרטים נוספים על הרכב"
          labelText="פרטים נוספים"
          name="description"
          maxCharacters="255"
          value={inputsValues.description.value}
          inputOnChange={changeInput}
        />
        <div className="d-flex btn-parse2">
          <button className="btn btn-warning" onClick={() => histoy.goBack()}>
            חזרה למודעות
          </button>

          <Button variant="primary" type="submit" disabled={isDisable}>
            עדכן מודעה
          </Button>
        </div>
      </Form>
    </Container>
  );
}
