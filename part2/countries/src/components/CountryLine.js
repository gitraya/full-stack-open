const CountryLine = ({ country, onClick }) => (
  <div>
    <span>{country.name.common}</span>
    <button onClick={onClick}>show</button>
  </div>
);

export default CountryLine;
