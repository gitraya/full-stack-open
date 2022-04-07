import { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response?.data));
  }, []);

  const handleFilterChange = (event) => setQuery(event.target.value);
  const filterCountries = (country) =>
    country.name.common?.toLowerCase().includes(query.toLowerCase());
  const countriesToShow = query ? countries.filter(filterCountries) : [];

  if (countries.length <= 0) return <div>Loading...</div>;
  return (
    <div>
      <Filter onChange={handleFilterChange} />
      <Countries countries={countriesToShow} />
    </div>
  );
};

export default App;
