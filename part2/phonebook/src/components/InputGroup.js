const InputGroup = ({ label, type, value, onChange }) => (
  <div>
    {label} <input type={type} value={value} onChange={onChange} />
  </div>
);

export default InputGroup;
