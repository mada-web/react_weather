import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getData } from '../utils/helper'
import { CityCard } from '../components/CityCard'
import ButtonComponent from '../components/Button'

export const Favorites = (props) => {
  const [cityList, setCityList] = useState(null)
  const { history } = props || {}

  useEffect(() => {
    ;(async () => {
      const initialFavs = JSON.parse(localStorage.getItem('favs'))
      const weatherList = (initialFavs || []).map((elem) => getData(elem, 'id'))
      const weatherData = await Promise.all(weatherList)
      setCityList(weatherData)
    })()
  }, [])

  if (!cityList) {
    return <span>Loading...</span>
  }
  const comeback = () => {
    return history.push('/')
  }
  return (
    <div className="fav_results ">
      <div>
        <ul className="list">
          {!cityList.length
            ? 'No favorite cities'
            : cityList.map((cityData) => {
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
                    <Link to={{ pathname: `/weather/${name}` }}>
                      <CityCard weather={updatedWeather} />
                    </Link>
                  </li>
                )
              })}
        </ul>
      </div>

      <div className="fav_button">
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
