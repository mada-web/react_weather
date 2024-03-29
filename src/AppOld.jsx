import React, { useEffect, useState } from 'react'
import { getData } from './utils/helper'
import InputComponent from './components/Input'
import ButtonComponent from './components/Button'
import { ResultComponent } from './components/ResultComponent'
import { FavCities } from './components/FavCities'
import './css/App.css'

const App = () => {
  const [searchInput, setSearchInput] = useState('')
  const [weather, setWeather] = useState(null)
  const [favs, setFavs] = useState([])
  const [error, setError] = useState()
  const [showFav, setShowFav] = useState(false)

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
    setShowFav(false)
  }

  if (showFav) {
    return (
      <div className="app_weather">
        <FavCities favs={favs} onReloadClick={onReloadClick} />
      </div>
    )
  }

  return (
    <div className="app_weather">
      {!weather ? (
        <div className="actions">
          <div className="search">
            <InputComponent
              value={searchInput}
              setValue={setSearchInput}
              error={error}
            />
            <ButtonComponent
              onClick={onSearchClick}
              name={'search'}
              color={'red'}
              size={'massive'}
            />
          </div>
          <div className="fav_view">
            <ButtonComponent
              onClick={() => setShowFav(true)}
              name={'favorite'}
              color={'red'}
              size={'massive'}
            />
          </div>
        </div>
      ) : (
        <ResultComponent
          weather={weather}
          addToFavs={addToFavs}
          onReloadClick={onReloadClick}
        />
      )}
    </div>
  )
}

export default App
