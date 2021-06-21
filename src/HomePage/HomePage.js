import { useEffect, useState } from "react";
import { Form, Container } from "react-bootstrap";
import { getAds } from "../DAL/api";
import CarItem from "../Components/CarItem";
export default function HomePage() {
  const [ads, setAds] = useState([]);
  useEffect(() => {
    getAds().then((ads) => {
      setAds([...ads]);
    });
  }, []);
  return (
    <Container className="homep-page-container">
      <header>
        <h1>מודעות שפורסמו</h1>
        <div className="d-flex">
          <div>
            <h5>הצג מודעות לפי</h5>
          </div>

          <div>
            <div key={`inline-radio`} className="mb-3">
              <Form.Check
                inline
                label=" תאריך פרסום "
                name="group1"
                type="radio"
                id={`inline-radio-1`}
              />
              <Form.Check
                inline
                label=" פופולאריות "
                name="group1"
                type="radio"
                id={`inline-radio-2`}
              />
            </div>
          </div>
        </div>
      </header>
      <div className="serach-container">
        <Form.Group>
          <Form.Control type="text" placeholder="סינון לפי יצרן" />
          <br />
          <Form.Control type="text" placeholder="סינון לפי דגם" />
        </Form.Group>
      </div>
      <div className="d-flex flex-wrap  car-items-container">
        {ads.map((ad, index) => {
          return <CarItem key={index} cardDetails={ad} />;
        })}
      </div>
    </Container>
  );
}
