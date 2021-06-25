import { Container } from "react-bootstrap";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { getMyAds } from "../DAL/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import CarItem from "../Components/CarItem";

export default function MyAds() {
  const [myAds, setMyAds] = useState([]);
  useEffect(() => {
    const { userID } = JSON.parse(localStorage.getItem("currentUser"));
    getMyAds(userID).then((ads) => {
      setMyAds([...ads]);
    });
  }, []);
  return (
    <Container fluid="sm">
      <div className="my-ads mb-3">
        <h1>המודעות שלי</h1>
        <FontAwesomeIcon icon={faCar} className="icon-myAds" />
      </div>

      {!myAds.length && (
        <div className="message-like-ads">
          <h2>עדיין לא העלת אף מועדה</h2>
        </div>
      )}

      <div className="d-flex flex-wrap  car-items-container">
        {myAds.map((ad, index) => {
          return <CarItem key={index} cardDetails={ad} />;
        })}
      </div>
    </Container>
  );
}
