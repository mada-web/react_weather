import React, { useEffect, useState } from 'react'
import { getData } from './helper'
import './App.css'
import FavIcon from './heart.svg'
import ReloadIcon from './reload.svg'

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

const Button = (props) => {
  return (
    <button id="button_style" onClick={props.onClick}>
      <img src={props.icon} alt={props.alt} />
    </button>
  )
}

const Result = (props) => {
  const { weather, addToFavs, onReloadClick } = props
  const {
    name,
    temp,
    description,
    feels_like,
    pressure,
    humidity,
    icon,
  } = weather

  return (
    <div className="result">
      <span>
        <span id="city_name">{name} </span>
        <span id="city_weather">{Math.round(temp) - 273} ℃</span>
      </span>

      <span className="description">{description}</span>
      <span className="icon">
        {' '}
        <img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="Картинка погоды"
        />{' '}
      </span>
      <span className="feels_like">
        Ощущается как {Math.round(feels_like) - 273} ℃
      </span>
      <span className="pressure">Атмосферное давление: {pressure} гПа</span>
      <span className="humidity">Относительная влажность: {humidity} %</span>
      <div className="buttons">
        <Button onClick={addToFavs} icon={FavIcon} alt={'Favorite'} />
        <Button onClick={onReloadClick} icon={ReloadIcon} alt={'Back'} />
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
