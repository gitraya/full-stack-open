const InputGroup = ({ id, label, type, value, onChange }) => (
  <div>
    <label htmlFor={id}>{label}</label>{" "}
    <input id={id} type={type} value={value} onChange={onChange} />
  </div>
);

export default InputGroup;
