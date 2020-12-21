import React, { useState } from 'react';
import { getData } from './helper';
import './App.css';
import FavIcon from './heart.svg'

const App = () => {
  const [searchInput, setSearchInput] = useState('');
  const [weather, setWeather] = useState(null);

  const onSearchClick = async () => {
    if(!searchInput) {
        return;
    }

    const {
        name,
        id,
        main:{
            temp,
            pressure,
            humidity,
            feels_like
        },
        weather,
        
    } = await getData(searchInput);

    const updatedWeather = {
        name,
        temp,
        pressure,
        humidity,
        feels_like,
        description: weather[0].description,
        icon: weather[0].icon,
        id,    
    }
    setWeather(updatedWeather);
  }
let localWrtite = ()=>{
    let cityList = []
    cityList += localStorage.setItem(weather.name, weather.id)
    }

  const onReloadClick = () => {
      setWeather(null);
      setSearchInput('');
  }
  return (
    <div className="app_weather">
        {
            !weather
              ? <div className="actions">
                    <input id="search_input" type="text" value={searchInput} onChange={(event) => setSearchInput(event.target.value)}/>
                    <button id="search_button" onClick={onSearchClick}>Search</button>
                </div>
              : <div className="result">
                                                          
                    <span>
                    <span id="city_name">{weather.name} </span>
                        <span id="city_weather">{Math.round(weather.temp) - 273} ℃</span>
                    </span>

                    <span className="description">{weather.description}</span>
                    <span className="icon"> <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="Картинка погоды"/> </span>
                    <span className ="feels_like">Ощущается как {Math.round(weather.feels_like) - 273} ℃</span>
                    <span className="pressure">Атмосферное давление: {weather.pressure} гПа</span>
                    <span className="humidity">Относительная влажность: {weather.humidity} %</span>
                    <div className="buttons">
                       <button id="reload" onClick={onReloadClick}>
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd"><path d="M7 9h-7v-7h1v5.2c1.853-4.237 6.083-7.2 11-7.2 6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.286 0-11.45-4.844-11.959-11h1.004c.506 5.603 5.221 10 10.955 10 6.071 0 11-4.929 11-11s-4.929-11-11-11c-4.66 0-8.647 2.904-10.249 7h5.249v1z"/></svg>
                    </button>
                    
                    <button id="favorite" onClick={localWrtite}>
                     <img src={FavIcon} alt="Сердуха"/>
                    </button>  
                    </div>
                   
                </div>
        }
    </div>
  );
}

export default App;