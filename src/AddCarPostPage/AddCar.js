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
import { getCategories, getModels, getManufacturer } from "../DAL/api";
import { useEffect, useState } from "react";

const iconsCategories = {
  "ג'יפ": faTruckPickup,
  "רכב פרטי": faCarSide,
  אופנוע: faMotorcycle,
};
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
          isValid: true,
          errors: [],
        },
        manufactur: {
          value: "",
          isDisabled: true,
          selectList: [],
          isValid: true,
          errors: [],
        },
        model: {
          value: "",
          isDisabled: true,
          selectList: [],
          isValid: true,
          errors: [],
        },
      },
      setBtnDidable
    );
  });

  function allInputsOK() {
    for (const key in inputValues) {
      if (!inputValues[key].value) {
        return false;
      }
    }
    return true;
  }
  const [selectCategories, setSelectCategories] = useState([]);
  const histoy = useHistory();
  const updateLocal = updateLocalStorege(
    "isDisabled",
    "adCarData",
    "carSelected",
    inputValues
  );
  useEffect(() => {
    getCategories().then((categoreis) => setSelectCategories([...categoreis]));
  }, []);
  function changeCatgory({ name, value }) {
    let btnPahseDisabled;

    if (name === "cartype") {
      getManufacturer(value).then((selectManufacturer) => {
        inputValues.manufactur.selectList = selectManufacturer;
        inputValues.manufactur.isDisabled = false;
        inputValues.model.isDisabled = true;
        inputValues.model.selectList = [];

        setInputValues({ ...inputValues });
        updateLocal(btnPahseDisabled);
      });
      inputValues.model.value = "";
      inputValues.manufactur.value = "";
    } else if (name === "manufactur") {
      getModels(inputValues.cartype.value, value).then((selectModel) => {
        inputValues.model.selectList = selectModel;
        inputValues.model.isDisabled = value ? false : true;
        inputValues.model.value = "";
        setInputValues({ ...inputValues });
        updateLocal(btnPahseDisabled);
      });
    }

    inputValues[name].value = value;
    btnPahseDisabled = !allInputsOK();
    setBtnDidable(btnPahseDisabled);
    updateLocal(btnPahseDisabled);

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
            {selectCategories.map(({ categoryID, categoryName }, index) => {
              return (
                <ToggleButton
                  value={categoryID}
                  className="type-car"
                  key={index}
                >
                  {categoryName}
                  <FontAwesomeIcon icon={iconsCategories[categoryName]} />{" "}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </Form.Group>
        <SelectInput
          value={inputValues.manufactur.value}
          htmlFor="manufactur"
          textLable="יצרן"
          showByDefault={["", "בחר את יצרן הרכב"]}
          optionSelect={inputValues.manufactur.selectList}
          isDisabled={inputValues.manufactur.isDisabled}
          valueKey="manufacturerID"
          textKey="manufacturerName"
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
          valueKey="modelID"
          textKey="modelName"
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
