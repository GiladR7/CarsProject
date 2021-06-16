import { Form, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

export default function LogIn({ closePopUp }) {
  return (
    <div fluid className="log-in-pop">
      <FontAwesomeIcon
        icon={faTimes}
        className="close-btn"
        onClick={() => {
          closePopUp();
        }}
      />
      {/* <span style={{ fontSize: "15px", color: "red" }}>
        שם משתמש או סיסמא אינם נכונים
      </span> */}
      <Form.Row>
        <Col md="5">
          <Form.Control type="email" placeholder="הכנס איימיל" />
        </Col>
        <Col md="5">
          <Form.Control type="password" placeholder="הכנס סיסמא" />
        </Col>
        <Col md="2">
          <Button variant="primary">התחבר</Button>
        </Col>
      </Form.Row>
    </div>
  );
}
