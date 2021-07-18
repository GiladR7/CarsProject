import { Container } from "react-bootstrap";
import { faCar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import { tokenValidtion } from "../utilities/validationsFunc";
import CarItem from "../Components/CarItem";
import { getMyAds } from "../DAL/api";
import { useHistory } from "react-router";

export default function MyAds() {
  const history = useHistory();
  const [myAds, setMyAds] = useState([]);
  const removeAd = (adId) => {
    const updateAds = myAds.filter(({ adid: currentAdID }) => {
      return adId !== currentAdID;
    });
    setMyAds([...updateAds]);
  };
  useEffect(() => {
    async function fetchMyAds() {
      const isLogIn = await tokenValidtion(history);
      if (isLogIn) {
        const respone = await getMyAds();
        if (respone.status === "ok") {
          setMyAds([...respone.data]);
        }
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
          <h2>עדיין לא העלאת אף מודעה</h2>
        </div>
      )}

      <div className="d-flex flex-wrap  car-items-container">
        {myAds.map((ad, index) => {
          return <CarItem key={index} cardDetails={ad} removeAd={removeAd} />;
        })}
      </div>
    </Container>
  );
}
