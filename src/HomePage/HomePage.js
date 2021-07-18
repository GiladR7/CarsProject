import { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { getAds, getIDsOfFaivoritesAds } from "../DAL/api";
import CarItem from "../Components/CarItem";
import { checkBoxOnChange } from "../utilities/utilities";
import FilterCars from "../Components/FilterCars";
import { AdsContext } from "../Context/HomePageContext";
import { updateUserCategories } from "../utilities/utilities";

export default function HomePage({ setCountFavoritesAds, isLogIn }) {
  const [ads, setAds] = useState([]);
  const {
    orderHeigher,
    orderBy,
    modelFilter,
    manufacturerFilter,
    checkBoxValues,
    setCheckBoxValues,
  } = useContext(AdsContext);

  const [likeAds, setLikeAds] = useState([]);

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
    if (isLogIn) {
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
        checkBoxValues={checkBoxValues}
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
