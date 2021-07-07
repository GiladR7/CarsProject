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
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

import CheckBoxGroup from "../Components/CheckBoxGroup";
import { getAds, getIDsOfFaivoritesAds } from "../DAL/api";
import CarItem from "../Components/CarItem";
import { checkBoxOnChange } from "../utilities/utilities";
import { faHotjar } from "@fortawesome/free-brands-svg-icons";
import { getByDisplayValue } from "@testing-library/react";

export default function HomePage({ setCountFavoritesAds, isLogIn }) {
  const [ads, setAds] = useState([]);
  const onlineUser = JSON.parse(localStorage.getItem("currentUser"));
  const [orderHeigher, setOrderHeigher] = useState("true");
  const [orderBy, setOrdetBy] = useState("adDate");
  const [likeAds, setLikeAds] = useState([]);
  const [checkBoxValues, setCheckBoxValues] = useState(() => {
    return updateUserCategories();
  });

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
      const respone = await getAds(
        orderBy,
        orderHeigher,
        checkBoxValues.chooseCategory.value
      );
      if (respone.status === "ok") {
        setAds([...respone.data]);
      }
    }
    showAds();
  }, [orderBy, orderHeigher, checkBoxValues]);

  useEffect(() => {
    if (onlineUser) {
      const {
        chooseCategory: { value },
      } = updateUserCategories();
      checkBoxValues.chooseCategory.value = value;
      setCheckBoxValues((checkBoxValues) => {
        return { ...checkBoxValues };
      });
      getLikeAdsIds();
    }
  }, [isLogIn]);
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  async function getLikeAdsIds() {
    const adsIds = await getIDsOfFaivoritesAds(onlineUser.userID);
    setLikeAds([...adsIds]);
    setCountFavoritesAds(adsIds.length);
  }
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
            onChange={(value) => setOrdetBy(value)}
          >
            <ToggleButton value="adDate" className="sortByBtn" variant="info">
              תאריך <FontAwesomeIcon icon={faCalendarAlt} />
            </ToggleButton>
            <ToggleButton value="views" className="sortByBtn " variant="danger">
              פופולאריות <FontAwesomeIcon icon={faHotjar} />
            </ToggleButton>
            <ToggleButton
              value="carprice"
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
            ["אופנועים", 3],
            ["ג'יפים", 4],
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
              likesIDs={likeAds}
              setLikeAdsIDs={setLikeAds}
              updateLikesNav={setCountFavoritesAds}
            />
          );
        })}
      </div>

      <form
        enctype="multipart/form-data"
        onSubmit={async (e) => {
          e.preventDefault();
          const data = new FormData();
          for (let i = 0; i < file.length; i++) {
            data.append("photos", file[i]);
          }
          data.append("name", "gilad");
          const respone = await fetch("http://localhost:5000/upload", {
            method: "POST",
            body: data,
          });
          console.log(respone);
          setImage(respone);
        }}
      >
        <input
          type="file"
          name="avatar"
          multiple
          accept="image/png, image/jpeg"
          onChange={(e) => {
            console.log(e.target.files);
            return setFile(e.target.files);
          }}
        />
        <img src="http://localhost:5000/carImages/photos-1625671615753.jpg" />
        <button> submit </button>
      </form>
    </Container>
  );
}
