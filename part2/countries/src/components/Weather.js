import { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ query }) => {
  const [weather, setWeather] = useState(null);
  const key = process.env.REACT_APP_API_KEY;
  const params = { q: query, appid: key };

  useEffect(() => {
    axios
      .get("http://api.openweathermap.org/data/2.5/weather", {
        params,
      })
      .then((response) => (response.data ? setWeather(response.data) : null))
      .catch((error) => error.response);
  }, []);

  if (!weather) return null;
  const { name, main, wind } = weather;
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h2>Weather in {name}</h2>
      <span>temperature {main.temp} Celcius</span>
      <img
        alt="Weather icon"
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        width="100"
      />
      <span>wind {wind.speed} m/s</span>
    </div>
  );
};

export default Weather;
