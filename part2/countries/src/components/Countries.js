import { useEffect, useState } from "react";
import Country from "./Country";
import CountryLine from "./CountryLine";

const Countries = ({ countries = [] }) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const newCountry = countries.length === 1 ? countries[0] : null;
    setCountry(newCountry);
  }, [countries]);

  const handleShowCountry = (country) => () => setCountry(country);

  if (!country) {
    if (countries.length > 10) {
      return <span>Too many matches, specify another filter</span>;
    }

    if (countries.length > 1 && countries.length <= 10) {
      return (
        <div>
          {countries.map((country, index) => (
            <CountryLine
              country={country}
              key={index}
              onClick={handleShowCountry(country)}
            />
          ))}
        </div>
      );
    }
  }

  return <Country country={country} />;
};

export default Countries;
