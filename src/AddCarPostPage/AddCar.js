import {
  Container,
  Form,
  ToggleButtonGroup,
  ToggleButton,
  Button,
} from "react-bootstrap";
import SelectInput from "../Components/SelectInput";
import {
  faMotorcycle,
  faCarSide,
  faTruckPickup,
} from "@fortawesome/free-solid-svg-icons";

import {
  getItemLocal,
  updateLocalStorege,
} from "../utilities/localStoregeFunc";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router";
import { categorys } from "../DAL/api";
import { useState } from "react";
export default function AddCarParse1() {
  const [btnDisable, setBtnDidable] = useState(true);
  const [inputValues, setInputValues] = useState(() => {
    return getItemLocal(
      "adCarData",
      "carSelected",
      "isDisabled",
      {
        cartype: {
          value: "",
        },
        manufactur: {
          value: "",
          isDisabled: true,
          selectList: [],
        },
        model: {
          value: "",
          isDisabled: true,
          selectList: [],
        },
      },
      setBtnDidable
    );
  });

  const histoy = useHistory();
  const updateLocal = updateLocalStorege(
    "isDisabled",
    "adCarData",
    "carSelected",
    inputValues
  );
  function changeCatgory({ name, value }) {
    let selectList;
    let isDisabled = false;
    let btnIsDisabled = false;
    let changeSelectOf = "";
    if (name === "cartype") {
      selectList = categorys[value].map(({ manufactuer }) => {
        return manufactuer;
      });
      if (!inputValues.model.isDisabled) {
        inputValues.model.isDisabled = true;
        inputValues.model.value = "";
        inputValues.manufactur.value = "";
      }
      selectList = new Set(selectList);
      selectList = [...selectList];

      changeSelectOf = "manufactur";
    } else if (name === "manufactur") {
      selectList = categorys[inputValues.cartype.value]
        .filter(({ manufactuer }) => {
          return manufactuer === value;
        })
        .map(({ model }) => {
          return model;
        });
      changeSelectOf = "model";

      if (!value) {
        isDisabled = true;
        inputValues.model.value = "";
      }
    }
    inputValues[name].value = value;
    for (const key in inputValues) {
      if (!inputValues[key].value) {
        btnIsDisabled = true;
      }
      setBtnDidable(btnIsDisabled);
    }

    if (changeSelectOf) {
      inputValues[changeSelectOf].selectList = selectList;
      inputValues[changeSelectOf].isDisabled = isDisabled;
    }

    updateLocal(btnIsDisabled);

    setInputValues({
      ...inputValues,
    });
  }

  return (
    <Container fluid>
      <Form className="add-car-container">
        <Form.Group className="select-type">
          <Form.Label style={{ display: "block", textAlign: "center" }}>
            סוג הרכב אותו תפרסם
          </Form.Label>

          <ToggleButtonGroup
            className="d-flex flex-wrap justify-content-center"
            value={inputValues.cartype.value}
            type="radio"
            name="cartype"
            onChange={(value) => changeCatgory({ value, name: "cartype" })}
          >
            <ToggleButton value="רכב פרטי" className="type-car">
              רכב פרטי
              <FontAwesomeIcon icon={faCarSide} />{" "}
            </ToggleButton>

            <ToggleButton value="גיפ" className="type-car">
              גיפ
              <FontAwesomeIcon icon={faTruckPickup} />
            </ToggleButton>

            <ToggleButton value="אופנוע" className="type-car">
              אופנוע
              <FontAwesomeIcon icon={faMotorcycle} />{" "}
            </ToggleButton>
          </ToggleButtonGroup>
        </Form.Group>
        <SelectInput
          value={inputValues.manufactur.value}
          htmlFor="manufactur"
          textLable="יצרן"
          showByDefault={["", "בחר את יצרן הרכב"]}
          optionSelect={inputValues.manufactur.selectList}
          isDisabled={inputValues.manufactur.isDisabled}
          inputChange={changeCatgory}
        />
        <SelectInput
          htmlFor="model"
          name="model"
          textLable="דגם"
          showByDefault={["", "בחר את דגם הרכב"]}
          optionSelect={inputValues.model.selectList}
          isDisabled={inputValues.model.isDisabled}
          value={inputValues.model.value}
          inputChange={changeCatgory}
        />

        <div className="text-left">
          <Button
            variant="primary"
            type="submit"
            disabled={btnDisable}
            onClick={() => histoy.push("/add-new-car2")}
          >
            המשך
          </Button>
        </div>
      </Form>
    </Container>
  );
}
