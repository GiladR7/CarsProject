import { Form } from "react-bootstrap";

export default function CheckBoxGroup({
  labelText,
  checkboxsValuesArr,
  inline = true,
}) {
  return (
    <Form.Group>
      <Form.Label>{labelText}</Form.Label>
      {checkboxsValuesArr.map((value, index) => {
        return (
          <Form.Check
            custom
            key={index}
            name="chooseCategory"
            inline={inline}
            label={value}
            type="checkbox"
            id={value}
          />
        );
      })}
    </Form.Group>
  );
}
