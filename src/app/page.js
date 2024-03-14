"use client";
import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

   const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  const fetchWeatherData = async () => {
    try {
      const apiKey = '703ea8efa9355029c4fed6200d35ec0c'; // Deinen Secret Key hier einfügen
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&lang=de`;
      const response = await axios.get(apiUrl);
      const celsiusTemperature = kelvinToCelsius(response.data.main.temp);
      response.data.main.temp_c = celsiusTemperature;
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={location}
        onChange={handleLocationChange}
        placeholder="Ort eingeben"
      />
      <button onClick={fetchWeatherData}>Wetter abrufen</button>
      {weatherData && (
        <div>
          <h2>Aktuelles Wetter für {weatherData.name}</h2>
          <p>Temperatur: {weatherData.main.temp_c.toFixed(1)}°C</p>
          <p>Wetterzustand: {weatherData.weather[0].description}</p>
          <p>Luftfeuchtigkeit: {weatherData.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}
