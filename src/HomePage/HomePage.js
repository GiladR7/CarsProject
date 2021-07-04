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
import { getAds, getIDsOfFaivoritesAds } from "../DAL/api";
import CarItem from "../Components/CarItem";
import { checkBoxOnChange } from "../utilities/utilities";
import { faHotjar } from "@fortawesome/free-brands-svg-icons";

export default function HomePage({ setCountFavoritesAds, isLogIn }) {
  const [ads, setAds] = useState([]);
  const onlineUser = JSON.parse(localStorage.getItem("currentUser"));
  const [orderHeigher, setOrderHeigher] = useState("true");
  const [orderBy, setOrdetBy] = useState("adDate");
  const [checkBoxValues, setCheckBoxValues] = useState(() => {
    return updateUserCategories();
  });
  const [likesIDs, setLikeAdsIDs] = useState([]);

  function updateUserCategories() {
    const categories = {
      chooseCategory: {
        value: [],
      },
    };
    if (localStorage.getItem("currentUser")) {
      const { chooseCategory } = JSON.parse(
        localStorage.getItem("currentUser")
      );
      categories.chooseCategory.value = chooseCategory;
    }
    return categories;
  }
  useEffect(() => {
    async function showAds() {
      const adsData = await getAds(
        orderBy,
        orderHeigher,
        checkBoxValues.chooseCategory.value
      );
      setAds([...adsData]);
    }
    showAds();
  }, [orderBy, orderHeigher, checkBoxValues]);

  useEffect(async () => {
    if (onlineUser) {
      const likesIDs = await getIDsOfFaivoritesAds(onlineUser.userID);
      setCountFavoritesAds(likesIDs.length);
      setLikeAdsIDs(likesIDs);
    }
  }, [isLogIn]);

  useEffect(() => {
    const {
      chooseCategory: { value },
    } = updateUserCategories();
    checkBoxValues.chooseCategory.value = value;
    setCheckBoxValues({ ...checkBoxValues });
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
            value={orderBy}
          >
            <ToggleButton
              value="adDate"
              className="sortByBtn"
              variant="info"
              onClick={(e) => {
                setOrdetBy(e.target.value);
              }}
            >
              תאריך <FontAwesomeIcon icon={faCalendarAlt} />
            </ToggleButton>
            <ToggleButton
              value="views"
              className="sortByBtn "
              variant="danger"
              onClick={(e) => {
                setOrdetBy(e.target.value);
              }}
            >
              פופולאריות <FontAwesomeIcon icon={faHotjar} />
            </ToggleButton>
            <ToggleButton
              value="carprice"
              className="sortByBtn "
              variant="success"
              onClick={(e) => {
                setOrdetBy(e.target.value);
              }}
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
              // setCountFavoritesAds={setCountFavoritesAds}
              isLogIn={isLogIn}
              likesIDs={likesIDs}
            />
          );
        })}
      </div>
    </Container>
  );
}
