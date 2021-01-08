import React from 'react'
import { Input } from 'semantic-ui-react'

const InputComponent = ({ value, setValue, error, placeholder, list }) => {
  const onChange = (event) => {
    const inputValue = event.target.value
    setValue(inputValue)
  }
  const err = error ? 'error' : 'search_input'

  const arr = [
    'Гродно',
    'Минск',
    'Москва',
    'Брест',
    'Манчестер',
    'Вашингтон',
    'Лондон',
    'Берлин',
  ]
  const citiesArr = arr.map((el) => <option value={el}></option>)

  return (
    <div className="input_block">
      <div>
        <Input
          className={err}
          list={list}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        <datalist id="cities">{citiesArr}</datalist>
      </div>
      {error ? <span className="text_error">{error}</span> : null}
    </div>
  )
}

export default InputComponent
