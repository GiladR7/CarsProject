import { Form, InputGroup } from "react-bootstrap";

export default function InputText({
  htmlFor,
  labelText,
  inputType,
  placeholderText,
  value,
  inputOnChange,
  valid,
  validationFunc,
  errors,
  name,
  updateLocal,
}) {
  return (
    <Form.Group controlId={htmlFor}>
      <Form.Label>{labelText}</Form.Label>
      <InputGroup hasValidation>
        <Form.Control
          type={inputType}
          placeholder={placeholderText}
          isInvalid={!valid}
          value={value}
          name={name}
          onChange={(e) => {
            inputOnChange(e.target);
          }}
          onBlur={(e) => {
            const isDisabled = validationFunc(e.target);
            updateLocal = updateLocal ? updateLocal(isDisabled) : null;
          }}
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
