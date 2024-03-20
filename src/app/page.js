"use client"; // Markiere die Komponente als Client-Komponente

import { useState } from 'react';
import axios from 'axios';
import { TiWeatherCloudy, TiWeatherSnow, TiWeatherWindy, TiWeatherShower, TiWeatherSunny } from 'react-icons/ti';
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function Home() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [weatherClass, setWeatherClass] = useState("");

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  const fetchWeatherData = async () => {
    try {
      const apiKey = '703ea8efa9355029c4fed6200d35ec0c';
      let apiUrl = '';
      
      const isZipCode = /^\d{5}$/.test(location);

      if (isZipCode) {
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${location},de&appid=${apiKey}&lang=de`;
      } else {
        apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&lang=de`;
      }

      const response = await axios.get(apiUrl);
      const celsiusTemperature = kelvinToCelsius(response.data.main.temp);
      response.data.main.temp_c = celsiusTemperature;
      setWeatherData(response.data);

      switch (response.data.weather[0].description.toLowerCase()) {
        case 'klarer himmel':
          setWeatherClass("sunny");
          break;
        case 'ein paar wolken':
          setWeatherClass("sunny");
          break;
        case 'leichter regen':
          setWeatherClass("showers");
          break;
        case 'regen':
          setWeatherClass("showers");
          break;
        case 'bewölkt':
          setWeatherClass("cloudy");
          break;
        case 'bedeckt':
          setWeatherClass("cloudy");
           break;  
        case 'wolken':
          setWeatherClass("cloudy");
          break;
        case 'leicht bewölkt':
          setWeatherClass("sunny");
          break;
        case 'leicht bedeckt':
          setWeatherClass("cloudy");
          break;
        case 'überwiegend bedeckt':
          setWeatherClass("cloudy");
          break;
        case 'überwiegend bewölkt':
          setWeatherClass("cloudy");
          break;
        case 'schnee':
          setWeatherClass("snow");
          break;
        case 'windig':
          setWeatherClass("windy");
          break;
        default:
          setWeatherClass("");
      }

    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeatherData();
    }
  };

  const getWeatherIcon = (weatherDescription) => {
    switch (weatherDescription.toLowerCase()) {
      case 'klarer himmel':
        return <TiWeatherSunny size={96} />;
      case 'ein paar wolken':
        return <TiWeatherSunny size={96} />;
      case 'leichter regen':
        return <TiWeatherShower size={96} />;
      case 'regen':
        return <TiWeatherShower size={96} />;
      case 'bewölkt':
        return <TiWeatherCloudy size={96} />;
      case 'bedeckt':
        return <TiWeatherCloudy size={96} />;
      case 'leicht bewölkt':
        return <TiWeatherSunny size={96} />;
      case 'leicht bedeckt':
        return <TiWeatherCloudy size={96} />;
      case 'überwiegend bewölkt':
        return <TiWeatherCloudy size={96} />;
      case 'überwiegend bedeckt':
        return <TiWeatherCloudy size={96} />;
      case 'wolken':
        return <TiWeatherCloudy size={96} />;
      case 'schnee':
        return <TiWeatherSnow size={96} />;
      case 'windig':
        return <TiWeatherWindy size={96} />;
      default:
        return null;
    }
  };

  return (
    <div className={`container ${weatherClass}`}>
      <h1>Wetter-App</h1>
      <p>Gib einen Ort oder die PLZ ein und klicke danach auf &quot;Wetter abrufen&quot;, um das aktuelle Wetter zu sehen.</p>
      <input
        type="text"
        value={location}
        onChange={handleLocationChange}
        onKeyPress={handleKeyPress}
        placeholder="Ort oder Postleitzahl eingeben"
      />
      <button onClick={fetchWeatherData}>Wetter abrufen</button>
      {weatherData && (
        <div>
          <h2>Aktuelles Wetter für {weatherData.name}:</h2>
          <p>Temperatur: {weatherData.main.temp_c.toFixed(1)}°C</p>
          <p>Wetterzustand: {weatherData.weather[0].description}</p>
          <p>Luftfeuchtigkeit: {weatherData.main.humidity}%</p>
          <div className="weather-icon" style={{ textAlign: 'center' }}>
            {getWeatherIcon(weatherData.weather[0].description)}
          </div>
        </div>
      )}
      <SpeedInsights url="https://wetter-now.vercel.app" />
    </div>
  );
}
