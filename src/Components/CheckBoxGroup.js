import { Form } from "react-bootstrap";

export default function CheckBoxGroup({
  labelText,
  checkboxsValuesArr,
  inline = true,
  name,
  onChecked,
}) {
  return (
    <Form.Group>
      <Form.Label>{labelText}</Form.Label>
      {checkboxsValuesArr.map((value, index) => {
        return (
          <Form.Check
            custom
            key={index}
            name={name}
            inline={inline}
            label={value}
            onClick={(e) => onChecked(e.target)}
            type="checkbox"
            id={value}
          />
        );
      })}
    </Form.Group>
  );
}
