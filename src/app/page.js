"use client"; // Markiere die Komponente als Client-Komponente

import { useState } from 'react';
import axios from 'axios';
import { TiWeatherCloudy, TiWeatherSnow, TiWeatherWindy, TiWeatherShower, TiWeatherSunny } from 'react-icons/ti'; // Importiere Icons von react-icons

export default function Home() {
  // Zustände für den eingegebenen Ort und die Wetterdaten
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [weatherClass, setWeatherClass] = useState(""); // Zustand für die dynamische Hintergrundklasse

  // Funktion zum Aktualisieren des eingegebenen Orts
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  // Funktion zum Umwandeln der Temperatur von Kelvin in Celsius
  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  // Funktion zum Abrufen der Wetterdaten von der API
  const fetchWeatherData = async () => {
    try {
      const apiKey = '703ea8efa9355029c4fed6200d35ec0c';
      let apiUrl = '';
      
      // Überprüfen, ob die Eingabe eine Postleitzahl ist
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

      console.log('Weather Description:', response.data.weather[0].description);

      // Setze die Hintergrundklasse basierend auf dem Wetterzustand
      switch (response.data.weather[0].description.toLowerCase()) {
        case 'klarer himmel':
          setWeatherClass("sunny");
          break;
        case 'Ein paar Wolken':
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

  // Funktion zum Verarbeiten des Tastatur-Events
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeatherData();
    }
  };

  // Funktion zur Zuordnung von Icons zu Wetterzuständen
  const getWeatherIcon = (weatherDescription) => {
    switch (weatherDescription.toLowerCase()) {
      case 'klarer himmel':
        return <TiWeatherSunny size={96} />;
      case 'Ein paar Wolken':
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
        return null; // Standard-Icon
    }
  };

  // JSX für die Darstellung der Komponente
  return (
    <div className={`container ${weatherClass}`}> {/* Hintergrundklasse dynamisch hinzufügen */}
      <h1>Wetter-App</h1>
      <p>Gib einen Ort oder die PLZ ein und klicke danach auf
      &quot;Wetter abrufen&quot;, um das aktuelle Wetter zu sehen.</p>
      {/* Eingabefeld für den Ort oder die Postleitzahl */}
      <input
        type="text"
        value={location}
        onChange={handleLocationChange}
        onKeyPress={handleKeyPress} // Handle Enter key press
        placeholder="Ort oder Postleitzahl eingeben"
      />
      {/* Button zum Abrufen der Wetterdaten */}
      <button onClick={fetchWeatherData}>Wetter abrufen</button>
      {/* Anzeige der Wetterdaten, wenn vorhanden */}
      {weatherData && (
        <div>
          {/* Überschrift mit dem Namen des Orts */}
          <h2>Aktuelles Wetter für {weatherData.name}:</h2>
          {/* Anzeige der Temperatur */}
          <p>Temperatur: {weatherData.main.temp_c.toFixed(1)}°C</p>
          {/* Anzeige des Wetters */}
          <p>Wetterzustand: {weatherData.weather[0].description}</p>
          {/* Anzeige der Luftfeuchtigkeit */}
          <p>Luftfeuchtigkeit: {weatherData.main.humidity}%</p>
          {/* Anzeige des Icons */}
          <div className="weather-icon" style={{ textAlign: 'center' }}>
            {getWeatherIcon(weatherData.weather[0].description)}
          </div>
        </div>
      )}
    </div>
  );
}
