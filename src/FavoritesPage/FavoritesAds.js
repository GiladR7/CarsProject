import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getMyFaivoritesAds } from "../DAL/api";
import CarItem from "../Components/CarItem";

export default function FavoritesAdsPage({ setCountFavoritesAds }) {
  const [myFavoriesAds, setMyFavoriesAds] = useState([]);
  const [adsIDs, setAdsIDs] = useState([]);

  function removeAdFromState(id) {
    const updateFavorites = myFavoriesAds.filter(({ adid: currentAdId }) => {
      return currentAdId !== id;
    });
    setMyFavoriesAds([...updateFavorites]);
  }
  const getFavorites = async () => {
    const { userID } = JSON.parse(localStorage.getItem("currentUser"));
    const [adsIDs, adsData] = await getMyFaivoritesAds(userID);
    setMyFavoriesAds([...adsData]);
    setAdsIDs([...adsIDs]);
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <Container fluid="sm">
      <div className="header-like-ads mb-3">
        <h1>מודעות שאהבתי</h1>
        <FontAwesomeIcon icon={faHeart} />
      </div>

      {!myFavoriesAds.length && (
        <div className="message-like-ads">
          <h2>לא הוספת מודעות לרשימה</h2>
        </div>
      )}
      <div className="d-flex flex-wrap  car-items-container">
        {myFavoriesAds.map((ad, index) => {
          return (
            <CarItem
              key={index}
              updateLikesNav={setCountFavoritesAds}
              removeAdFromState={removeAdFromState}
              cardDetails={ad}
              setLikeAdsIDs={setAdsIDs}
              likesIDs={adsIDs}
            />
          );
        })}
      </div>
    </Container>
  );
}
