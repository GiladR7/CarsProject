import { useEffect, useState } from "react";
import { Form, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import CheckBoxGroup from "../Components/CheckBoxGroup";
import { getAds } from "../DAL/api";
import CarItem from "../Components/CarItem";
export default function HomePage({ setCountFavoritesAds, isLogIn }) {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    async function showAds() {
      const adsData = await getAds();
      setAds([...adsData]);
    }
    showAds();
  }, [isLogIn]);
  const [checkBoxValues, setCheckBoxValues] = useState([1, 3]);
  function updateCheckBoxSelected({ value, checked }) {
    let updateCheckValues = [];

    if (checked) {
      checkBoxValues.push(+value);
      updateCheckValues = checkBoxValues;
    } else {
      updateCheckValues = checkBoxValues.filter(
        (category) => +category !== +value
      );
    }
    setCheckBoxValues([...updateCheckValues]);
  }
  return (
    <Container className="homep-page-container">
      <header className="mx-auto" style={{ maxWidth: "1140px" }}>
        <h1>מודעות שפורסמו</h1>
        <div className="d-flex">
          <div>
            <h5>הצג מודעות לפי</h5>
          </div>

          <div>
            <div key={`inline-radio`} className="mb-3">
              <Form.Check
                inline
                label=" תאריך פרסום "
                name="group1"
                type="radio"
                id={`inline-radio-1`}
              />
              <Form.Check
                inline
                label=" פופולאריות "
                name="group1"
                type="radio"
                id={`inline-radio-2`}
              />
              <Form.Check
                inline
                label="מחיר "
                name="group1"
                type="radio"
                id={`inline-radio-2`}
              />
            </div>
          </div>
        </div>
        <div className="serach-container mx-auto">
          <Form.Group>
            <div className="input-home-container">
              <FontAwesomeIcon icon={faSearch} className="filter-icon" />
              <Form.Control
                type="text"
                placeholder="סינון לפי יצרן"
                className="filter-input"
              />
            </div>
            <br />
            <div className="input-home-container">
              <FontAwesomeIcon icon={faSearch} className="filter-icon" />
              <Form.Control
                type="text"
                placeholder="סינון לפי דגם"
                className="filter-input"
              />
            </div>
          </Form.Group>
        </div>

        <CheckBoxGroup
          labelText="הצג רכבים מסוג"
          checkBoxValues={checkBoxValues}
          checkboxsValuesArr={[
            ["רכבים פרטיים", 1],
            ["אופנועיים", 3],
            ["גיפים", 4],
          ]}
          name="chooseCategory"
          onChecked={updateCheckBoxSelected}
        />
      </header>

      <div className="d-flex flex-wrap  car-items-container">
        {ads.map((ad, index) => {
          return (
            <CarItem
              key={index}
              cardDetails={ad}
              setCountFavoritesAds={setCountFavoritesAds}
              isLogIn={isLogIn}
            />
          );
        })}
      </div>
    </Container>
  );
}
