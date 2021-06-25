import { Container } from "react-bootstrap";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { getMyFaivoritesAds } from "../DAL/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import CarItem from "../Components/CarItem";
export default function FavoritesAdsPage({ setCountFavoritesAds }) {
  const [myFavoriesAds, setMyFavoriesAds] = useState([]);
  useEffect(() => {
    const { userID } = JSON.parse(localStorage.getItem("currentUser"));
    getMyFaivoritesAds(userID).then((ads) => {
      setMyFavoriesAds([...ads]);
    });
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
              setCountFavoritesAds={setCountFavoritesAds}
              cardDetails={ad}
              setMyFavoriesAds={setMyFavoriesAds}
            />
          );
        })}
      </div>
    </Container>
  );
}
