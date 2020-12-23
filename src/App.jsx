import React, { useEffect, useState } from 'react'
import { getData } from './helper'
import './App.css'
import FavIcon from './heart.svg'

const Input = (props) => {
  const { value, setValue, error } = props

  const onChange = (event) => {
    const inputValue = event.target.value
    setValue(inputValue)
  }
  const err = error ? 'error' : 'search_input'
  return (
    <div className="input_block">
      <input className={err} type="text" value={value} onChange={onChange} />
      {error ? <span className="text_error">{error}</span> : null}
    </div>
  )
}

const Result = (props) => {
  const { weather, addToFavs, onReloadClick } = props
  return (
    <div className="result">
      <span>
        <span id="city_name">{weather.name} </span>
        <span id="city_weather">{Math.round(weather.temp) - 273} ℃</span>
      </span>

      <span className="description">{weather.description}</span>
      <span className="icon">
        {' '}
        <img
          src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt="Картинка погоды"
        />{' '}
      </span>
      <span className="feels_like">
        Ощущается как {Math.round(weather.feels_like) - 273} ℃
      </span>
      <span className="pressure">
        Атмосферное давление: {weather.pressure} гПа
      </span>
      <span className="humidity">
        Относительная влажность: {weather.humidity} %
      </span>
      <div className="buttons">
        <button id="reload" onClick={onReloadClick}>
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fillRule="evenodd"
            clipRule="evenodd"
          >
            <path d="M7 9h-7v-7h1v5.2c1.853-4.237 6.083-7.2 11-7.2 6.623 0 12 5.377 12 12s-5.377 12-12 12c-6.286 0-11.45-4.844-11.959-11h1.004c.506 5.603 5.221 10 10.955 10 6.071 0 11-4.929 11-11s-4.929-11-11-11c-4.66 0-8.647 2.904-10.249 7h5.249v1z" />
          </svg>
        </button>

        <button id="favorite" onClick={addToFavs}>
          <img src={FavIcon} alt="Сердуха" />
        </button>
      </div>
    </div>
  )
}

const App = () => {
  const [searchInput, setSearchInput] = useState('')
  const [weather, setWeather] = useState(null)
  const [favs, setFavs] = useState([])
  const [error, setError] = useState()

  useEffect(() => {
    const initialFavs = JSON.parse(localStorage.getItem('favs'))
    setFavs(initialFavs || [])
  }, [])

  const onSearchClick = async () => {
    if (!searchInput) {
      return
    }
    try {
      const {
        name,
        id,
        main: { temp, pressure, humidity, feels_like },
        weather,
      } = await getData(searchInput)

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
      setWeather(updatedWeather)
      setError(null)
    } catch (e) {
      setError('City not found.')
    }
  }

  const addToFavs = () => {
    setFavs((favs0) => {
      if (favs0.includes(weather.id)) {
        return favs0
      }

      favs0.push(weather.id)
      localStorage.setItem('favs', JSON.stringify(favs0))

      return favs0
    })
  }

  const onReloadClick = () => {
    setWeather(null)
    setSearchInput('')
  }

  return (
    <div className="app_weather">
      {!weather ? (
        <div className="actions">
          <Input value={searchInput} setValue={setSearchInput} error={error} />
          <button id="search_button" onClick={onSearchClick}>
            Search
          </button>
        </div>
      ) : (
        <Result
          weather={weather}
          addToFavs={addToFavs}
          onReloadClick={onReloadClick}
        />
      )}
    </div>
  )
}

export default App
