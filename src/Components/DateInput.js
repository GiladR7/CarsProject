import { Form, InputGroup } from "react-bootstrap";

export default function DateInput({
  name,
  maxDate,
  minDate,
  labelText,
  htmlFor,
  changeInput,
  value,
  updateLocal,
  required,
}) {
  return (
    <Form.Group controlId={htmlFor}>
      <Form.Label>{labelText}</Form.Label>
      <InputGroup hasValidation>
        <Form.Control
          type="date"
          onChange={(e) => {
            const isDisable = changeInput(e.target);
            updateLocal(isDisable);
          }}
          value={value}
          name={name}
          min={minDate}
          max={maxDate}
          required={required}
        />
      </InputGroup>
    </Form.Group>
  );
}
