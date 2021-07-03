import { useEffect, useState } from "react";
import {
  Form,
  Container,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faSortAmountUpAlt,
  faSortAmountDownAlt,
  faMoneyBill,
  faHotJar,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import CheckBoxGroup from "../Components/CheckBoxGroup";
import { getAds } from "../DAL/api";
import CarItem from "../Components/CarItem";
import { checkBoxOnChange } from "../utilities/utilities";
import { useHistory, useLocation } from "react-router";
import { faHotjar } from "@fortawesome/free-brands-svg-icons";

export default function HomePage({ setCountFavoritesAds, isLogIn }) {
  const [ads, setAds] = useState([]);

  const location = useLocation();

  const [orderHeigher, setOrderHeigher] = useState(true);
  const { search } = location;

  const [checkBoxValues, setCheckBoxValues] = useState({
    chooseCategory: {
      value: [],
    },
  });

  function updateUserCategories() {
    checkBoxValues.chooseCategory.value = [];
    if (localStorage.getItem("currentUser")) {
      const { chooseCategory } = JSON.parse(
        localStorage.getItem("currentUser")
      );
      checkBoxValues.chooseCategory.value = chooseCategory;
    }
    setCheckBoxValues({ ...checkBoxValues });
  }
  useEffect(() => {
    async function showAds() {
      const adsData = await getAds();
      setAds([...adsData]);
    }
    showAds();
    updateUserCategories();
  }, [isLogIn]);

  const updateCheckBoxSelected = checkBoxOnChange(
    checkBoxValues,
    setCheckBoxValues
  );
  return (
    <Container className="homep-page-container">
      <header className="mx-auto" style={{ maxWidth: "1140px" }}>
        <h1>מודעות שפורסמו</h1>
        <div className="row sory-container">
          <div className="col-sm-2">
            <h5>
              הצג מודעות לפי{" "}
              <FontAwesomeIcon
                style={{ fontSize: "22px", paddingRight: "4px" }}
                icon={orderHeigher ? faSortAmountDownAlt : faSortAmountUpAlt}
                onClick={() => setOrderHeigher(!orderHeigher)}
              />
            </h5>
          </div>

          <ToggleButtonGroup
            className=" col-sm-6 row sort-btn-container mr-2"
            type="radio"
            name="sortBy"
            defaultValue="date"
          >
            <ToggleButton value="date" className="sortByBtn" variant="info">
              תאריך <FontAwesomeIcon icon={faCalendarAlt} />
            </ToggleButton>
            <ToggleButton value="views" className="sortByBtn " variant="danger">
              פופולאריות <FontAwesomeIcon icon={faHotjar} />
            </ToggleButton>
            <ToggleButton
              value="price"
              className="sortByBtn "
              variant="success"
            >
              מחיר <FontAwesomeIcon icon={faMoneyBill} />
            </ToggleButton>
          </ToggleButtonGroup>
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
          checkBoxValues={checkBoxValues.chooseCategory.value}
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
