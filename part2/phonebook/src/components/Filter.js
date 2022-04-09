import InputGroup from "./InputGroup";

const Filter = ({ onChange, value }) => (
  <InputGroup
    id="search"
    label="filter shown with"
    type="text"
    value={value}
    onChange={onChange}
  />
);

export default Filter;
