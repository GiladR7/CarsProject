import { faMapMarkerAlt, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Card, Button, Col, Row } from "react-bootstrap";
import * as icons from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router";

export default function CarItem() {
  const history = useHistory();
  return (
    <Card
      style={{ maxWidth: "18rem", borderRadius: "20px" }}
      className="car-card"
    >
      <div className="img-card-container">
        <FontAwesomeIcon className="edit-post" icon={faEdit}></FontAwesomeIcon>
        <FontAwesomeIcon
          className="love-post fas"
          icon={icons.faHeart}
        ></FontAwesomeIcon>
        <img
          className="card-img"
          src="https://www.galileasing.co.il/wp-content/uploads/2018/05/TUCSON.jpg"
          alt="car-img"
        />
      </div>

      <Card.Body className="text-center">
        <Card.Title className="text-right pr-2">יונדאי טוסון</Card.Title>

        <Row>
          <Col>
            <p className="text-right pr-2 mb-2">
              <FontAwesomeIcon icon={faMapMarkerAlt} /> חיפה
            </p>
          </Col>
          <Col>
            <p>09.06.21</p>
          </Col>
        </Row>
        <div className="price-row">
          <p>מחיר הרכב</p>

          <p>&#8362;190,000</p>
        </div>
        <Row className="text-center card-details">
          <Col>
            <p>שנה</p>
            <p>2016</p>
          </Col>
          <Col>
            <p>יד</p>
            <p>2</p>
          </Col>
          <Col>
            <p>ת.הילוכים</p>
            <p>אוטומטי</p>
          </Col>
          <Col>
            <p>ק"מ</p>
            <p>12000</p>
          </Col>
        </Row>

        <Button
          className="mt-3 btn-border"
          variant="outline-primary"
          onClick={() => {
            history.push("car-details");
          }}
        >
          מידע נוסף
        </Button>
      </Card.Body>
    </Card>
  );
}
