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
import carDefaultPhoto from "../images/buyCar2.jpg";
import { formatNumber } from "../utilities/utilities";
import {
  addNewFavoritesAd,
  removeAdFromFavorites,
  carImageHost,
} from "../DAL/api";
import RemoveAd from "./RemoveAdBtn";

export default function CarItem({
  cardDetails: {
    adid: id,
    manufacturername: manufacturer,
    modelname: model,
    modelyear: year,
    owners,
    gearname: gear,
    km,
    carprice: price,
    images,
    city,
    adDate: postDate,
    views,
    userAd,
  },
  likesIDs = [],
  setLikeAdsIDs,
  updateLikesNav = false,
  removeAd,
  removeAdFromState,
  showLike,
}) {
  const history = useHistory();

  const updateLikeAds = async () => {
    let likeAdIDs;
    if (likesIDs.includes(id)) {
      likeAdIDs = await removeAdFromFavorites(id);
      if (removeAdFromState) {
        removeAdFromState(id);
      }
    } else {
      likeAdIDs = await addNewFavoritesAd(id);
    }
    updateLikesNav(likeAdIDs.length);
    setLikeAdsIDs([...likeAdIDs]);
  };
  return (
    <div
      style={{ width: "19rem" }}
      className="card-car-container"
      data-aos="fade-up"
    >
      <Card
        className="car-card"
        style={{ maxWidth: "18rem", borderRadius: "20px", margin: "0 auto" }}
      >
        <div className="img-card-container">
          {userAd && (
            <FontAwesomeIcon
              className="edit-post"
              icon={faEdit}
              onClick={() => history.push(`${id}/editAd`)}
            ></FontAwesomeIcon>
          )}
          {(userAd === false || showLike) && (
            <FontAwesomeIcon
              className="love-post fas"
              style={{
                cursor: "pointer",
                backgroundColor: "white",
                borderRadius: "50%",
                padding: "6px",
              }}
              icon={likesIDs.includes(id) ? faHeart : icons.faHeart}
              onClick={() => {
                updateLikeAds();
              }}
            ></FontAwesomeIcon>
          )}
          {userAd && <RemoveAd adId={id} removeAd={removeAd} />}

          <img
            className="card-img"
            src={images[0] ? `${carImageHost}${images[0]}` : carDefaultPhoto}
            alt="car-img"
          />
          {!images[0] && (
            <p style={{ position: "absolute", bottom: "0px", right: "10px" }}>
              ???? ?????????? ??????????
            </p>
          )}
        </div>

        <Card.Body className="text-center">
          <Row>
            <Col className="col-8">
              <Card.Title
                className="text-right pr-2"
                style={{ fontSize: "18px" }}
              >
                {manufacturer} {model}
              </Card.Title>
            </Col>
            <Col className="col-4">
              <p>
                <FontAwesomeIcon icon={faEye} style={{ color: "#2196f3" }} />{" "}
                {views}
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
                <FontAwesomeIcon icon={faCalendarAlt} />{" "}
                {postDate.split("T")[0].split("-").reverse().join("-")}
              </p>
            </Col>
          </Row>
          <div className="price-row">
            <p>???????? ????????</p>

            <p>&#8362;{formatNumber(price)}</p>
          </div>
          <Row className="text-center card-details">
            <Col>
              <p>??????</p>
              <p>{year}</p>
            </Col>
            <Col>
              <p>????</p>
              <p>{owners}</p>
            </Col>
            {gear ? (
              <Col>
                <p>??.??????????????</p>
                <p>{gear}</p>
              </Col>
            ) : (
              ""
            )}
            <Col>
              <p>??"??</p>
              <p>{formatNumber(km)}</p>
            </Col>
          </Row>

          <Button
            className="mt-3 btn-border"
            variant="outline-primary"
            onClick={() => {
              history.push(`/${id}/car-details`);
            }}
          >
            ???????? ????????
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
