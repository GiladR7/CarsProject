import { useEffect, useState } from "react";
import { Container, Row, Col, Table, ListGroup, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router";
import { getAdByID, andView } from "../DAL/api";
import { faPhone, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { formatNumber } from "../utilities/utilities";
import CarouselCar from "./Carousel";
import { useCookies } from "react-cookie";

export default function CarDetails() {
  const histoy = useHistory();
  const [cookies, setCookies] = useCookies(["token"]);
  const { id: adID } = useParams();
  const [adData, setAdData] = useState({
    id: "",
    manufacturer: "",
    model: "",
    year: "",
    owners: "",
    gear: "",
    km: "",
    color: "",
    price: "",
    phone: "",
    images: [],
    description: "",
  });
  const { token } = cookies;
  useEffect(() => {
    if (token) {
      andView(adID);
    }
    async function fetchAdById() {
      const respone = await getAdByID(adID);
      if (respone.status === "ok") setAdData({ ...respone.data });
    }
    fetchAdById();
  }, [adID]);
  return (
    <Container fluid className="mt-5 mb-3">
      <div className="carDetials-container">
        <Row>
          <Col md="6">
            <div className="img-car-page">
              <CarouselCar images={adData.images} />
            </div>
            <ListGroup
              horizontal
              className="justify-content-center details-list"
            >
              <ListGroup.Item
                style={{ borderRadius: "20px" }}
                className="list-details-item"
              >
                <FontAwesomeIcon
                  icon={faMoneyBillWave}
                  style={{
                    color: "#07bb07",
                    paddingLeft: "2px",
                    fontSize: "17px",
                  }}
                />{" "}
                &#8362; {formatNumber(adData.price)}
              </ListGroup.Item>
              <ListGroup.Item
                className="list-details-item"
                style={{ borderRadius: "20px" }}
              >
                <FontAwesomeIcon
                  icon={faPhone}
                  style={{
                    color: "#1f9cff",
                    paddingLeft: "2px",
                    fontSize: "17px",
                  }}
                />{" "}
                {adData.phone}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md="6">
            <div className="car-table-container">
              <Table borderless>
                <thead>
                  <tr>
                    <th>יצרן</th>
                    <td>{adData.manufacturer}</td>
                  </tr>
                  <tr>
                    <th>דגם</th>
                    <td>{adData.model}</td>
                  </tr>
                  <tr>
                    <th>שנת עלייה על הכביש</th>
                    <td>{adData.year}</td>
                  </tr>
                  <tr>
                    <th>יד</th>
                    <td>{adData.owners}</td>
                  </tr>
                  {adData.gear ? (
                    <tr>
                      <th>תיבת הילוכים</th>
                      <td>{adData.gear}</td>
                    </tr>
                  ) : null}
                  <tr>
                    <th>קילומטרים</th>
                    <td>{formatNumber(adData.km)}</td>
                  </tr>
                  <tr>
                    <th>צבע</th>
                    <td>{adData.color}</td>
                  </tr>
                </thead>
              </Table>
            </div>
          </Col>
        </Row>
        <Row className="more-details-row">
          <Col md="6">
            <h2>פרטים נוספים</h2>
            <div className="about-car-container">
              {adData.description && <p> {adData.description}</p>}
              {!adData.description && (
                <h5 className="text-center mb-0">לא צויינו פרטים נוספים</h5>
              )}
            </div>
          </Col>

          <Col md="6" className="text-left mt-3">
            <Button
              variant="primary"
              onClick={() => {
                histoy.goBack();
              }}
            >
              חזרה לעמוד הקודם
            </Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
