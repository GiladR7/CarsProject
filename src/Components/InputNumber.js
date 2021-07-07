import { Form, InputGroup } from "react-bootstrap";

export default function InputNumber({
  htmlFor,
  labelText,
  changeInput,
  value,
  name,
  mixNumber,
  maxNumber,
  placeholderText,
  updateLocal,
  required,
  errors,
  valid,
}) {
  return (
    <Form.Group controlId={htmlFor}>
      <Form.Label>{labelText}</Form.Label>
      <InputGroup hasValidation>
        <Form.Control
          type="number"
          isInvalid={!valid}
          placeholder={placeholderText}
          onChange={(e) => {
            const isDisable = changeInput(e.target);
            updateLocal(isDisable);
          }}
          value={value}
          name={name}
          min={mixNumber}
          max={maxNumber}
          required={required}
        />
        <Form.Control.Feedback
          role="alert"
          className="fade alert alert-danger show"
          type="invalid"
        >
          {errors.map((error, index) => {
            return <p key={index}>{error}</p>;
          })}
        </Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
}
