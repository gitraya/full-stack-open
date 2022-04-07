import Weather from "./Weather";

const Country = ({ country = {} }) => {
  if (!country) return null;
  const { name, capital, area, languages, flags } = country;
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>{name.common}</h1>
      <span>Capital: {capital[0]}</span>
      <span>Area: {area}</span>
      <h3>Languages:</h3>
      <ul>
        {Object.values(languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={flags.svg} alt={`${name.common} Flag`} width="200" />
      <Weather query={capital[0]} />
    </div>
  );
};

export default Country;
