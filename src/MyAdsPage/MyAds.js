import { Container } from "react-bootstrap";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import CarItem from "../Components/CarItem";
import { getMyAds } from "../DAL/api";

export default function MyAds() {
  const [myAds, setMyAds] = useState([]);

  useEffect(() => {
    async function fetchMyAds() {
      const { userID } = JSON.parse(localStorage.getItem("currentUser"));
      const respone = await getMyAds(userID);
      if (respone.status === "ok") {
        setMyAds([...respone.data]);
      }
    }

    fetchMyAds();
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
