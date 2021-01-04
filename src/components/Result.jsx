import ButtonComponent from './Button'
import { Description } from './Description'

export const Result = (props) => {
  const { weather, addToFavs, onReloadClick, isSimppleCard = true } = props
  const {
    name,
    temp,
    description,
    feels_like,
    pressure,
    humidity,
    icon,
  } = weather
  console.log(weather)
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
        {isSimppleCard && (
          <>
            <ButtonComponent
              onClick={addToFavs}
              alt={'FAVORITE'}
              name={'heart'}
              color={'red'}
            />
            <ButtonComponent
              onClick={onReloadClick}
              alt={'BACK'}
              name={'undo'}
              color={'blue'}
            />
          </>
        )}
      </div>
    </div>
  )
}
