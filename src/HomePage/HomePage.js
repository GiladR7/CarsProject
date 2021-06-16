import { Form, Container } from "react-bootstrap";
import CarItem from "../Components/CarItem";
export default function HomePage(props) {
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
      <div className="d-flex flex-wrap mx-3 car-items-container">
        <CarItem />
        <CarItem />
        <CarItem />
        <CarItem />
        <CarItem />
        <CarItem />
        <CarItem />
        <CarItem />
        <CarItem />
        <CarItem />
      </div>
    </Container>
  );
}
