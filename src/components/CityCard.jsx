
export const CityCard = ({ weather }) => {
  const {
    name,
    id,
    main: { temp, pressure, humidity, feels_like },
    weather,
  } = weather

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
  return(
    <div className="result">
    <span>
      <span id="city_name">{name} </span>
      <span id="city_weather">{Math.round(temp) - 273} ℃</span>
    </span>

    <Description content={description} />
    </div>
  )
}
