import React, { useEffect, useState } from 'react'
import { Button } from './button'
import ReloadIcon from './reload.svg'
import { getData } from './helper'
import { Result } from './result'

export const FavCities = (props) => {
  const [cityList, setCityList] = useState([])
  const { favs, onReloadClick } = props || {}
  console.log(cityList)
  useEffect(() => {
    (async () => {
      const weatherLi = (favs || []).map((elem) => getData(elem, 'id'))
      const weatherData = await Promise.all(weatherLi)
      setCityList(weatherData)
    })()
  }, [favs])

  return (
    <div>
      <ul className="list">
        {cityList.map((cityData) => {
          const {
            name,
            id,
            main: { temp, pressure, humidity, feels_like },
            weather,
          } = cityData

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
          return (
            <li key={updatedWeather.id}>
              <Result weather={updatedWeather} isSimppleCard={false} />
            </li>
          )
        })}
      </ul>

      <Button onClick={onReloadClick} icon={ReloadIcon} alt={'Back'} />
    </div>
  )
}
