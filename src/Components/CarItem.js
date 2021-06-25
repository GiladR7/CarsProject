import {
  faMapMarkerAlt,
  faEdit,
  faHeart,
  faEye,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Card, Button, Col, Row } from "react-bootstrap";
import * as icons from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router";
import { useEffect, useState } from "react";
import {
  getIDsOfFaivoritesAds,
  updateFaivoriesAds,
  getMyFaivoritesAds,
} from "../DAL/api";
export default function CarItem({
  cardDetails: {
    id,
    manufacturer,
    model,
    year,
    owners,
    gear,
    km,
    price,
    images,
    city,
    postDate,
    userID,
  },
  isLogIn,
  setMyFavoriesAds = false,
  setCountFavoritesAds = false,
}) {
  const [likeAdsIDs, setLikeAdsIDs] = useState([]);
  const history = useHistory();
  const onlineUser = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    if (onlineUser && setCountFavoritesAds) {
      getIDsOfFaivoritesAds(onlineUser.userID).then((likesIDs) => {
        setCountFavoritesAds(likesIDs.length);
        setLikeAdsIDs(likesIDs);
      });
    }
  }, [isLogIn]);
  function setLikesAds() {
    updateFaivoriesAds(onlineUser.userID, id).then(() => {
      getIDsOfFaivoritesAds(onlineUser.userID).then((likeIDs) => {
        setCountFavoritesAds(likeIDs.length);
        setLikeAdsIDs(likeIDs);
      });
      if (setMyFavoriesAds) {
        getMyFaivoritesAds(onlineUser.userID).then((ads) => {
          setMyFavoriesAds([...ads]);
        });
      }
    });
  }
  return (
    <div style={{ width: "19rem" }} className="card-car-container">
      <Card
        className="car-card"
        style={{ maxWidth: "18rem", borderRadius: "20px", margin: "0 auto" }}
      >
        <div className="img-card-container">
          {onlineUser && userID === onlineUser.userID && (
            <FontAwesomeIcon
              className="edit-post"
              icon={faEdit}
              onClick={() => history.push(`${id}/editAd`)}
            ></FontAwesomeIcon>
          )}
          {onlineUser && onlineUser.userID !== userID && (
            <FontAwesomeIcon
              className="love-post fas"
              icon={likeAdsIDs.includes(id) ? faHeart : icons.faHeart}
              onClick={() => {
                setLikesAds();
              }}
            ></FontAwesomeIcon>
          )}
          <img className="card-img" src={images[0]} alt="car-img" />
        </div>

        <Card.Body className="text-center">
          <Row>
            <Col className="col-8">
              <Card.Title className="text-right pr-2">
                {manufacturer} {model}
              </Card.Title>
            </Col>
            <Col className="col-4">
              <p>
                <FontAwesomeIcon icon={faEye} style={{ color: "#2196f3" }} /> 10
              </p>
            </Col>
          </Row>

          <Row>
            <Col>
              <p className="text-right pr-2 mb-2 card-city">
                <FontAwesomeIcon
                  icon={faMapMarkerAlt}
                  style={{ color: "#e41809" }}
                />{" "}
                {city}
              </p>
            </Col>
            <Col>
              <p>
                <FontAwesomeIcon icon={faCalendarAlt} /> {postDate}
              </p>
            </Col>
          </Row>
          <div className="price-row">
            <p>מחיר הרכב</p>

            <p>&#8362;{price}</p>
          </div>
          <Row className="text-center card-details">
            <Col>
              <p>שנה</p>
              <p>{year.split("-")[0]}</p>
            </Col>
            <Col>
              <p>יד</p>
              <p>{owners}</p>
            </Col>
            {gear ? (
              <Col>
                <p>ת.הילוכים</p>
                <p>{gear}</p>
              </Col>
            ) : (
              ""
            )}
            <Col>
              <p>ק"מ</p>
              <p>{km}</p>
            </Col>
          </Row>

          <Button
            className="mt-3 btn-border"
            variant="outline-primary"
            onClick={() => {
              history.push(`/${id}/car-details`);
            }}
          >
            מידע נוסף
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
