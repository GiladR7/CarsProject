import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getAds, getIDsOfFaivoritesAds } from "../DAL/api";
import CarItem from "../Components/CarItem";
import { checkBoxOnChange } from "../utilities/utilities";
import FilterCars from "../Components/FilterCars";

export default function HomePage({ setCountFavoritesAds, isLogIn }) {
  const [ads, setAds] = useState([]);
  const onlineUser = JSON.parse(localStorage.getItem("currentUser"));
  const [orderHeigher, setOrderHeigher] = useState("true");
  const [orderBy, setOrdetBy] = useState("adDate");
  const [likeAds, setLikeAds] = useState([]);
  const [manufacturerFilter, setManufacturerFilter] = useState([]);
  const [modelFilter, setModelFilter] = useState([]);

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
  function removeAd(adId) {
    const adsAfterRemove = ads.filter(({ adid: adIdFromState }) => {
      return adIdFromState !== adId;
    });
    setAds([...adsAfterRemove]);
  }
  useEffect(() => {
    async function showAds() {
      const manufacturerIDs = manufacturerFilter.map(({ manufacturerID }) => {
        return manufacturerID;
      });
      const modelIDs = modelFilter.map(({ modelID }) => {
        return modelID;
      });
      const respone = await getAds(
        orderBy,
        orderHeigher,
        checkBoxValues.chooseCategory.value,
        manufacturerIDs,
        modelIDs
      );

      if (respone.status === "ok") {
        setAds([...respone.data]);
      } else {
        setAds([]);
      }
    }
    showAds();
  }, [
    orderBy,
    orderHeigher,
    checkBoxValues,
    manufacturerFilter,
    modelFilter,
    isLogIn,
  ]);

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

  async function getLikeAdsIds() {
    const adsIds = await getIDsOfFaivoritesAds();

    setLikeAds([...adsIds]);
    setCountFavoritesAds(adsIds.length);
  }
  const updateCheckBoxSelected = checkBoxOnChange(
    checkBoxValues,
    setCheckBoxValues
  );

  return (
    <Container className="homep-page-container">
      <FilterCars
        orderHeigher={orderHeigher}
        setOrderHeigher={setOrderHeigher}
        orderBy={orderBy}
        setOrdetBy={setOrdetBy}
        checkBoxValues={checkBoxValues}
        manufacturerFilter={manufacturerFilter}
        modelFilter={modelFilter}
        setModelFilter={setModelFilter}
        setManufacturerFilter={setManufacturerFilter}
        updateCheckBoxSelected={updateCheckBoxSelected}
      />

      <div className="d-flex flex-wrap  car-items-container">
        {ads.map((ad, index) => {
          return (
            <CarItem
              key={index}
              cardDetails={ad}
              likesIDs={likeAds}
              setLikeAdsIDs={setLikeAds}
              updateLikesNav={setCountFavoritesAds}
              removeAd={removeAd}
            />
          );
        })}
      </div>

      {!ads.length && (
        <div
          className="message-like-ads"
          style={{ maxWidth: "1195px", margin: "0px auto" }}
        >
          <h2>לא נמצאו תוצאות</h2>
        </div>
      )}
    </Container>
  );
}
