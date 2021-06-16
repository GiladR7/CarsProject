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
}) {
  return (
    <Form.Group controlId={htmlFor}>
      <Form.Label>{labelText}</Form.Label>
      <InputGroup hasValidation>
        <Form.Control
          type="number"
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
      </InputGroup>
    </Form.Group>
  );
}
