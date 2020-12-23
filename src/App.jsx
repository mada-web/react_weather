import React, { useEffect, useState } from 'react'
import { getData } from './helper'
import { Input } from './input'
import { Result } from './result'
import './App.css'

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
