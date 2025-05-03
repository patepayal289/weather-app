// src/App.js
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_KEY = 'ef944951a272e8e67ebd85cc49e9525a';

const weatherMoods = {
  Clear: { emoji: '☀️', bg: '#f7d794' },
  Clouds: { emoji: '⛅', bg: '#dff9fb' },
  Rain: { emoji: '🌧️', bg: '#95afc0' },
  Snow: { emoji: '❄️', bg: '#dff9fb' },
  Thunderstorm: { emoji: '⛈️', bg: '#535c68' },
  Drizzle: { emoji: '🌦️', bg: '#a5b1c2' },
  Mist: { emoji: '🌫️', bg: '#c7ecee' },
};

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const getWeather = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(res.data);
    } catch (err) {
      alert('City not found!');
    }
  };

  const mood = weather ? weatherMoods[weather.weather[0].main] || {} : {};

  return (
    <div className="app" style={{ backgroundColor: mood.bg || '#eee' }}>
      <div className="card">
        <h1>Weather Vibes</h1>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Get Weather</button>

        {weather && (
          <div className="weather-info">
            <h2>{weather.name}</h2>
            <h3>{weather.main.temp}°C {mood.emoji}</h3>
            <p>{weather.weather[0].main}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
