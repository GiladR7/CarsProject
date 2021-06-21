import { faMapMarkerAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Card, Button, Col, Row } from "react-bootstrap";
import * as icons from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router";

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
  },
}) {
  const history = useHistory();
  return (
    <div style={{ width: "19rem" }} className="card-car-container">
      <Card
        className="car-card"
        style={{ maxWidth: "18rem", borderRadius: "20px", margin: "0 auto" }}
      >
        <div className="img-card-container">
          <FontAwesomeIcon
            className="edit-post"
            icon={faEdit}
          ></FontAwesomeIcon>
          <FontAwesomeIcon
            className="love-post fas"
            icon={icons.faHeart}
          ></FontAwesomeIcon>
          <img className="card-img" src={images[0]} alt="car-img" />
        </div>

        <Card.Body className="text-center">
          <Card.Title className="text-right pr-2">
            {manufacturer} {model}
          </Card.Title>

          <Row>
            <Col>
              <p className="text-right pr-2 mb-2 card-city">
                <FontAwesomeIcon icon={faMapMarkerAlt} /> {city}
              </p>
            </Col>
            <Col>
              <p>{postDate}</p>
            </Col>
          </Row>
          <div className="price-row">
            <p>מחיר הרכב</p>

            <p>&#8362;{price}</p>
          </div>
          <Row className="text-center card-details">
            <Col>
              <p>שנה</p>
              <p>{year}</p>
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
