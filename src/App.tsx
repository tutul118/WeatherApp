import React, { useState } from 'react';
import './App.css';
import axios from 'axios';

interface WeatherInfo{
  weather: {
    main?: string;
  }[],
  main: {
    temp: number;
  },
  sys: {
    country: string;
  },
  name: string;
}


function App() {
  const API_KEY: string = '5503ad815a54c8030e098dc29a4e774f';

  const [query, setQuery] = useState('');
  const [weathers, setWeathers] = useState<WeatherInfo>();

  const search = (evt: any) => {
    if (evt.key === "Enter") {
      axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${API_KEY}`)
        .then(res => {
          const weatherData = res.data;
          setQuery('');
          setWeathers(weatherData);
          console.log(weatherData);
        })
        .catch(error => {
          console.log(error)
        });
    }
  }

  const dateBuilder = (d: any) => {
    let months: string[] = ["January", "February", "March", "April", "May", "June", "August", "September", "October", "November", "December"];
    let days: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;


  }



  return (
    <div className= {(weathers && weathers.weather[0].main != null) ? ((weathers.main.temp > 16 ) ? 'App-warm' : 'App' ) : 'App'}>
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
        {( weathers && weathers.weather[0].main != null) ?(
         <div>
          <div className="location-box">
            <div className="location">
              {weathers.name} , {weathers.sys.country}
            </div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
        <div className="temp">{weathers.main.temp}°c</div>
        <div className="weather">{weathers.weather[0].main}</div>
          </div>
        </div>
        ) : ('')}


      </main>
    </div>
  );
}

export default App;
