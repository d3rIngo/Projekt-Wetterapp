"use client"; // Markiere die Komponente als Client-Komponente

import { useState } from 'react';
import axios from 'axios';

export default function Home() {
  // Zustände für den eingegebenen Ort und die Wetterdaten
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  // Funktion zum Aktualisieren des eingegebenen Orts
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  // Funktion zur Umwandlung der Temperatur von Kelvin in Celsius
  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  // Funktion zum Abrufen der Wetterdaten von der API
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

  // Funktion zum Verarbeiten des Tastatur-Events
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeatherData();
    }
  };

  // JSX für die Darstellung der Komponente
  return (
    <div className="container">
      <h1>Wetter-App</h1>
      <p>Geben Sie einen Ort ein und klicken Sie auf &quot;Wetter abrufen&quot;, um das aktuelle Wetter zu sehen.</p>
      {/* Eingabefeld für den Ort */}
      <input
        type="text"
        value={location}
        onChange={handleLocationChange}
        onKeyPress={handleKeyPress} // Handle Enter key press
        placeholder="Ort eingeben"
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
        </div>
      )}
    </div>
  );
}