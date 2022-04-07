const Filter = ({ onChange }) => (
  <div>
    <label htmlFor="search">Find countries</label>{" "}
    <input type="text" id="search" name="search" onChange={onChange} />
  </div>
);

export default Filter;
