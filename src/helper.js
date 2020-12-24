const apiKey = 'f418718d34d2a9105185389a2a4699b2'

export const getData = async (city, type = 'q') => {
  const url = `https://api.openweathermap.org/data/2.5/weather?${type}=${city}&appid=${apiKey}&lang=ru`

  try {
    const response = await fetch(url)
    const responseJson = await response.json()

    return responseJson
  } catch (error) {
    console.error('Something went wrong', error)
  }
}
