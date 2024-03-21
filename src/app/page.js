// Import der erforderlichen Module und Komponenten
"use client"; // Markiert die Komponente als Client-Komponente
import React, { useState, useEffect } from 'react'; // Import von React-Hooks
import axios from 'axios'; // Import für HTTP-Anfragen
import { TiWeatherCloudy, TiWeatherSnow, TiWeatherWindy, TiWeatherShower, TiWeatherSunny } from 'react-icons/ti'; // Import von Wetter-Icons
import { SpeedInsights } from "@vercel/speed-insights/next"; // Import für Geschwindigkeitsanalyse

// Hauptkomponente für die Wetter-App
export default function Home() {
  // Zustandsvariablen für Ort, Wetterdaten, Wetterklasse, Vorhersagedaten und Fetch-Status
  const [location, setLocation] = useState(""); // Zustand für den eingegebenen Ort
  const [weatherData, setWeatherData] = useState(null); // Zustand für die aktuellen Wetterdaten
  const [weatherClass, setWeatherClass] = useState(""); // Zustand für die Wetterklasse
  const [forecastData, setForecastData] = useState(null); // Zustand für die Wettervorhersagedaten
  const [fetchingForecast, setFetchingForecast] = useState(false); // Zustand für den Fetch-Status der Vorhersagedaten

  // Funktion zum Behandeln der Ortseingabe
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  // Funktion zur Umrechnung von Kelvin in Celsius
  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  // Funktion zum Abrufen der aktuellen Wetterdaten
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

      const response = await axios.get(apiUrl); // HTTP-Anfrage an die Wetter-API
      const celsiusTemperature = kelvinToCelsius(response.data.main.temp);
      response.data.main.temp_c = celsiusTemperature;
      setWeatherData(response.data); // Setzen der aktuellen Wetterdaten im Zustand

      // Bestimmung der Wetterklasse basierend auf der Wetterbeschreibung
      switch (response.data.weather[0].description.toLowerCase()) {
        case 'klarer himmel':
        case 'ein paar wolken':
        case 'leicht bewölkt':
          setWeatherClass("sunny");
          break;
        case 'leichter regen':
        case 'regen':
          setWeatherClass("showers");
          break;
        case 'bewölkt':
        case 'bedeckt':
        case 'leicht bedeckt':
        case 'überwiegend bedeckt':
        case 'überwiegend bewölkt':
        case 'mäßig bewölkt':
        case 'wolken':
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

      // Direkter Aufruf der Vorhersagedaten
      await fetchForecastData();
      setFetchingForecast(true);

    } catch (error) {
      console.error(error);
    }
  };

  // Funktion zum Abrufen der Wettervorhersagedaten
  const fetchForecastData = async () => {
    try {
      const apiKey = '703ea8efa9355029c4fed6200d35ec0c';
      let apiUrl = '';
      
      const isZipCode = /^\d{5}$/.test(location);

      if (isZipCode) {
        apiUrl = `https://api.openweathermap.org/data/2.5/forecast?zip=${location},de&appid=${apiKey}&lang=de`;
      } else {
        apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&lang=de`;
      }

      const response = await axios.get(apiUrl); // HTTP-Anfrage an die Wetter-API für die Vorhersagedaten
      setForecastData(response.data.list); // Setzen der Vorhersagedaten im Zustand

    } catch (error) {
      console.error(error);
    }
  };

  // Funktion zum Behandeln des Tastendrucks (Enter-Taste)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeatherData(); // Aufruf der Funktion zum Abrufen der Wetterdaten
    }
  };

  // Funktion zum Behandeln des Klicks auf den Button "Wetter abrufen"
  const handleButtonClick = () => {
    fetchWeatherData(); // Aufruf der Funktion zum Abrufen der Wetterdaten
  };

  // Funktion zur Auswahl des Wettericons basierend auf der Wetterbeschreibung
  const getWeatherIcon = (weatherDescription) => {
    switch (weatherDescription.toLowerCase()) {
      case 'klarer himmel':
      case 'ein paar wolken':
        return <TiWeatherSunny size={96} />;
      case 'leichter regen':
      case 'mäßiger regen':
      case 'regen':
        return <TiWeatherShower size={96} />;
      case 'bewölkt':
      case 'bedeckt':
      case 'leicht bedeckt':
      case 'überwiegend bedeckt':
      case 'überwiegend bewölkt':
        return <TiWeatherCloudy size={96} />;
      case 'schnee':
        return <TiWeatherSnow size={96} />;
      case 'windig':
        return <TiWeatherWindy size={96} />;
      default:
        return null;
      }
    };
    
    // Effekt-Hook zur Behandlung der Vorhersageaktualisierung
    useEffect(() => {
      if (fetchingForecast && location) {
        fetchForecastData(); // Aufruf der Funktion zum Abrufen der Wettervorhersagedaten
      }
    }, [fetchingForecast, location]);
  
    // Hinzufügen des viewport-Meta-Tags für mobile Ansicht
    useEffect(() => {
      const metaTag = document.createElement('meta'); // Erstellen eines Meta-Tags
      metaTag.name = 'viewport';
      metaTag.content = 'width=device-width, initial-scale=1.0'; // Festlegen der Ansichtsgröße
      document.head.appendChild(metaTag); // Hinzufügen des Meta-Tags zum Dokumentenkopf
  
      return () => {
        document.head.removeChild(metaTag); // Entfernen des Meta-Tags bei Aufruf der Aufräumfunktion
      };
    }, []);
  
    // Rendern der Komponente mit JSX
    return (
      <div className={`container ${weatherClass}`} style={{ overflowY: 'auto', maxHeight: '100vh' }}> 
        <h1>Wetter-App</h1>
        <p>Gib einen Ort oder die PLZ ein und klicke danach auf &quot;Wetter abrufen&quot;, um das aktuelle Wetter zu sehen.</p>
        <input
          type="text"
          value={location}
          onChange={handleLocationChange}
          onKeyPress={handleKeyPress}
          placeholder="Ort oder Postleitzahl eingeben"
        />
        <button onClick={handleButtonClick}>Wetter abrufen</button>
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
        {forecastData && (
          <div>
            <h2 style={{ marginTop: '20px' }}>Wettervorhersage:</h2>
            <div style={{ height: '1px' }}></div> {/* Platz für den Abstand */}
            {forecastData.slice(1, 4).map((forecast, index) => {
              const minTemp = kelvinToCelsius(forecast.main.temp_min);
              const maxTemp = kelvinToCelsius(forecast.main.temp_max);
              const earlyMorningTemp = kelvinToCelsius(forecast.main.feels_like); // Temperatur am frühen Morgen
              return (
                <div key={index}>
                  <h3>
                    {new Date(
                      new Date().getTime() + (index + 1) * 24 * 60 * 60 * 1000
                    ).toLocaleDateString("de-DE", { weekday: "long" })}
                  </h3>
                  <p>
                    Temperatur:{" "}
                    {earlyMorningTemp.toFixed(1)}°C -{" "}
                    {maxTemp.toFixed(1)}°C
                  </p>
                  <p>Wetterzustand: {forecast.weather[0].description}</p>
                  <div className="weather-icon" style={{ textAlign: "center" }}>
                    {getWeatherIcon(forecast.weather[0].description)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <SpeedInsights url="https://wetter-now.vercel.app" /> {/* Einbindung der Geschwindigkeitsanalyse */}
      </div>
    );
  }
  
