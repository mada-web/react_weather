import React, { useEffect, useState } from 'react'
import ReloadIcon from './reload.svg'
import { getData } from './helper'
import { Result } from './result'
import ButtonApp from './button'

export const FavCities = (props) => {
  const [cityList, setCityList] = useState([])
  const { favs, onReloadClick } = props || {}
  console.log(cityList)
  useEffect(() => {
    ;(async () => {
      const weatherLi = (favs || []).map((elem) => getData(elem, 'id'))
      const weatherData = await Promise.all(weatherLi)
      setCityList(weatherData)
    })()
  }, [favs])

  return (
    <div className="fav_results ">
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
      </div>

      <div className="fav_button">
        <ButtonApp
          onClick={onReloadClick}
          icon={ReloadIcon}
          alt={'BACK'}
          name={'undo'}
          color={'blue'}
        />
      </div>
    </div>
  )
}
