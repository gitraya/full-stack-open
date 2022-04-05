import InputGroup from "./InputGroup";

const Filter = ({ onChange, value }) => (
  <InputGroup
    label="filter shown with"
    type="text"
    value={value}
    onChange={onChange}
  />
);

export default Filter;
