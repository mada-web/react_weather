import FavIcon from './heart.svg'
import ReloadIcon from './reload.svg'
import { Button } from './button'

export const Result = (props) => {
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
