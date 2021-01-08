import { getData } from '../utils/helper'
import { useEffect, useState } from 'react'
import ButtonComponent from '../components/Button'
import { Description } from '../components/Description'

export const Result = (props) => {
  const { history } = props
  const { city } = props.match.params
  const [weather, setWeather] = useState(null)
  // const [favs, setFavs] = useState([])

  useEffect(() => {
    ;(async () => {
      const {
        name,
        id,
        main: { temp, pressure, humidity, feels_like },
        weather,
      } = await getData(city)

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
    })()
  }, [city])

  if (!weather) {
    return <span>Loading...</span>
  }

  const {
    name,
    temp,
    description,
    feels_like,
    pressure,
    humidity,
    icon,
  } = weather

  const addToFavs = () => {
    let initialFavs = JSON.parse(localStorage.getItem('favs')) || []

    if (initialFavs.includes(weather.id)) {
      const index = initialFavs.indexOf(weather.id)
      initialFavs.splice(index, 1)
    } else {
      initialFavs.push(weather.id)
    }

    localStorage.setItem('favs', JSON.stringify(initialFavs))
  }

  const comeback = () => {
    return history.push('/')
  }

  return (
    <div className="result">
      <span>
        <span id="city_name">{name} </span>
        <span id="city_weather">{Math.round(temp) - 273} ℃</span>
      </span>

      <Description content={description} />
      <span className="icon">
        {' '}
        <img
          src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="Weather icon"
        />{' '}
      </span>
      <Description
        content={`Ощущается как ${Math.round(feels_like) - 273} ℃`}
      />
      <Description content={`Атмосферное давление: ${pressure} гПа`} />
      <Description content={`Относительная влажность: ${humidity} %`} />

      <div className="buttons">
        <ButtonComponent
          onClick={addToFavs}
          alt={'FAVORITE'}
          name={'heart'}
          color={'red'}
        />
        <ButtonComponent
          onClick={comeback}
          alt={'BACK'}
          name={'undo'}
          color={'blue'}
        />
      </div>
    </div>
  )
}
