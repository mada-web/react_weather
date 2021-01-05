import React, { useEffect, useState } from 'react'
import { getData } from '../utils/helper'
import { CityCard } from './CityCard'
import ButtonComponent from './Button'

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
              main: { temp },
              weather,
            } = cityData

            const updatedWeather = {
              name,
              temp,
              description: weather[0].description,
              id,
            }
            return (
              <li key={updatedWeather.id}>
                <CityCard weather={updatedWeather} />
              </li>
            )
          })}
        </ul>
      </div>

      <div className="fav_button">
        <ButtonComponent
          onClick={onReloadClick}
          alt={'BACK'}
          name={'undo'}
          color={'blue'}
        />
      </div>
    </div>
  )
}
