// Import der erforderlichen Module und Komponenten
"use client"; // Markiert die Komponente als Client-Komponente
import React, { useState, useEffect } from 'react'; // Import von React-Hooks
import axios from 'axios'; // Import für HTTP-Anfragen
import { TiWeatherCloudy, TiWeatherSnow, TiWeatherWindy, TiWeatherShower, TiWeatherSunny } from 'react-icons/ti'; // Import von Wetter-Icons
import Head from 'next/head'; // Import von Head-Komponente von next/head

// Hauptkomponente für die Wetter-App
export default function Home() {
  // Zustandsvariablen für Ort, Wetterdaten, Wetterklasse, Vorhersagedaten und Fetch-Status
  const [location, setLocation] = useState(""); // Zustand für den eingegebenen Ort
  const [weatherData, setWeatherData] = useState(null); // Zustand für die aktuellen Wetterdaten
  const [weatherClass, setWeatherClass] = useState(""); // Zustand für die Wetterklasse
  const [forecastData, setForecastData] = useState(null); // Zustand für die Wettervorhersagedaten
  const [fetchingForecast, setFetchingForecast] = useState(false); // Zustand für den Fetch-Status der Vorhersagedaten
  const [buttonClicked, setButtonClicked] = useState(false); // Zustand, um den Klick auf den Button zu verfolgen

  // Funktion zum Behandeln der Ortseingabe
  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  // Funktion zum Behandeln des Tastendrucks (Enter-Taste)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      // Aufruf der Funktion zum Abrufen der Wetterdaten und setzen von buttonClicked auf true
      fetchWeatherData();
      setButtonClicked(true);
    }
  };

  // Funktion zum Behandeln des Klicks auf den Button "Wetter abrufen"
  const handleButtonClick = () => {
    // Aufruf der Funktion zum Abrufen der Wetterdaten und setzen von buttonClicked auf true
    fetchWeatherData();
    setButtonClicked(true);
  };

  // Effekt-Hook zur Abrufung der Wettervorhersagedaten bei Änderung von fetchingForecast, location und buttonClicked
  useEffect(() => {
    // Überprüfen, ob fetchingForecast wahr, location einen Wert hat und buttonClicked wahr ist,
    // um die Vorhersagedaten abzurufen
    if (fetchingForecast && location && buttonClicked) {
      fetchForecastData();
    }
  }, [fetchingForecast, buttonClicked]); // Die Vorhersagedaten werden aktualisiert, wenn sich fetchingForecast, location oder buttonClicked ändern

  // Funktion zur Umrechnung von Kelvin in Celsius
  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  // Funktion zum Abrufen der aktuellen Wetterdaten
  const fetchWeatherData = async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
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
        case 'mäßiger regen':
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
        case 'mäßiger schnee':  
          setWeatherClass("snow");
          break;
        case 'windig':
        case 'mäßiger wind': 
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
      const apiKey = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
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
      case 'mäßig bewölkt':
        return <TiWeatherCloudy size={96} />;
      case 'schnee':
      case 'mäßiger schnee':
        return <TiWeatherSnow size={96} />;
      case 'windig':
      case 'mäßiger wind':
        return <TiWeatherWindy size={96} />;
      default:
        return null;
        }
      };
      
      // Rendern der Komponente mit JSX
      return (
        <>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </Head>
          <div className={`container ${weatherClass}`} style={{ overflowY: 'auto', maxHeight: '100vh' }}> 
            <h1>Wetter-App</h1>
            <p>Gib einen Ort oder die PLZ ein und klicke danach auf "Wetter abrufen", um das aktuelle Wetter zu sehen.</p>
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
            {forecastData && fetchingForecast && (
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
          </div>
        </>
      );
    };
    
    