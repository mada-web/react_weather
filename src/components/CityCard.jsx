import { Description } from './Description'

export const CityCard = (props) => {
  const { weather } = props
  const { name, temp, description } = weather
  return (
    <div className="result">
      <span>
        <span id="city_name">{name} </span>
        <span id="city_weather">{Math.round(temp) - 273} ℃</span>
      </span>
      <Description content={description} />
    </div>
  )
}
