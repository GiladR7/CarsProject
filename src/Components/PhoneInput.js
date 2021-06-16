import { Form, Col, InputGroup } from "react-bootstrap";

export default function NumberInputs({
  phoneErr,
  areaCodeErr,
  areaCodeValid,
  phoneValid,
  validationInput,
  inputChange,
  updateLocal,
  areaValue,
  phoneValue,
}) {
  return (
    <>
      <Form.Label>מספר טלפון של בעל הרכב</Form.Label>
      <Form.Row>
        <Form.Group as={Col} className="col-8">
          <InputGroup hasValidation>
            <Form.Control
              type="number"
              name="phone"
              value={phoneValue}
              placeholder="הכנס מספר טלפון"
              style={{ textAlign: "left" }}
              isInvalid={!phoneValid}
              maxLength="7"
              onChange={(e) => {
                inputChange(e.target);
              }}
              onBlur={(e) => {
                const isDisabled = validationInput(e.target);
                updateLocal(isDisabled);
              }}
            />
            <Form.Control.Feedback
              role="alert"
              className="fade alert alert-danger show"
              type="invalid"
            >
              {phoneErr.map((value, index) => {
                return <p key={index}>{value}</p>;
              })}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group as={Col} className="col-4">
          <InputGroup hasValidation>
            <Form.Control
              value={areaValue}
              as="select"
              name="codeArea"
              isInvalid={!areaCodeValid}
              onChange={(e) => {
                const isDisabled = validationInput(e.target);
                updateLocal(isDisabled);
              }}
            >
              <option value="">קידומת</option>
              <option value="050">050</option>
            </Form.Control>
            <Form.Control.Feedback
              role="alert"
              className="fade alert alert-danger show"
              type="invalid"
            >
              {areaCodeErr.map((value, index) => {
                return <p key={index}>{value}</p>;
              })}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Form.Row>
    </>
  );
}
