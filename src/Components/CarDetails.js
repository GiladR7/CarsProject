import { Container, Row, Col, Table, ListGroup, Button } from "react-bootstrap";
import { useHistory } from "react-router";
import CarouselCar from "./Carousel";
export default function CarDetails() {
  const histoy = useHistory();
  return (
    <Container fluid className="mt-5 mb-3">
      <div className="carDetials-container">
        <Row>
          <Col md="6">
            <div className="img-car-page">
              <CarouselCar
                images={[
                  "https://www.galileasing.co.il/wp-content/uploads/2018/05/TUCSON.jpg",
                  "http://www.carcost.co.il/Images/VehicleSubModelOptimizedImages/3062-7865.jpg",
                  "https://www.kvishim.co.il/wp-content/uploads/images-007/Tucson-2016.jpg",
                  "https://big-lease.co.il/wp-content/uploads/2019/10/Hyundai-Tucson-6.jpg",
                ]}
              />
            </div>
            <ListGroup horizontal className="justify-content-center">
              <ListGroup.Item>מחיר הרכב : 120,000 </ListGroup.Item>
              <ListGroup.Item>לפרטים נוספים 0502934940</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md="6">
            <div className="car-table-container">
              <Table borderless>
                <thead>
                  <tr>
                    <th>יצרן</th>
                    <td>יונדאי</td>
                  </tr>
                  <tr>
                    <th>דגם</th>
                    <td>טוסון</td>
                  </tr>
                  <tr>
                    <th>שנת עלייה על הכביש</th>
                    <td>2020</td>
                  </tr>
                  <tr>
                    <th>יד</th>
                    <td>2</td>
                  </tr>
                  <tr>
                    <th>תיבת הילוכים</th>
                    <td>אוטומטית</td>
                  </tr>
                  <tr>
                    <th>קילומטרים</th>
                    <td>12000</td>
                  </tr>
                  <tr>
                    <th>צבע</th>
                    <td>לבן</td>
                  </tr>
                </thead>
              </Table>
            </div>
          </Col>
        </Row>
        <Row className="more-details-row">
          <Col md="6">
            <h2>על הרכב</h2>
            <div className="about-car-container">
              <p>
                {" "}
                רכב חדש אחריות עד 30/7/22 בניסאן מצלמה אחורית מולטימדיה חימום
                מושבים שלט חכם בגז' ענק .נסע רק לעבודה ובית שמורה 24,000 ק"מ
                נסיעות רחוקות נוסע 5.0 ל100 km שותה 1 ל 20 -18 בעיר 1 ל 13-15
                שווה כל שקל !!!!!!רק לרציניים בלבד
              </p>
            </div>
          </Col>
          <Col md="6" className="text-left mt-3">
            <Button
              variant="primary"
              onClick={() => {
                histoy.push("/");
              }}
            >
              חזרה לעמוד הראשי
            </Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
