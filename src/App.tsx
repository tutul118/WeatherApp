import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

interface WeatherInfo {
  weather: {
    main: string,
    description: string,
  }[],
  main: {
    temp: number
  },
  sys: {
    country: string
  },
  name: string
}


function App() {
  const API_KEY: string = '129015aab77679a0f1f1b499377f237e';

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState<WeatherInfo[]>([]);

  const search = (evt: any) => {
    if (evt.key === "Enter") {
      axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metricAPPID=${API_KEY}`)
        .then(res => {
          const weatherData = res.data;
          setQuery('');
          setWeather(weatherData);
          console.log(weatherData);
        })
        .catch(error => {
          console.log(error)
        });
    }
  }

  const dateBuilder = (d: any) => {
    let months: string[] = ["January", "February", "March", "April", "May", "June", "August", "September", "October", "November", "December"];
    let days: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;


  }



  return (
    <div className="App ">
      <main>
        <div className="search-box">
          <input type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e: any) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        <div className="location-box">
          <div className="location">LOndon , Uk</div>
          <div className="date">{dateBuilder(new Date())}</div>
        </div>
        <div className="weather-box">
          <div className="temp">15°c</div>
          <div className="weather">Sunny</div>
        </div>

      </main>
    </div>
  );
}

export default App;
