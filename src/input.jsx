import React from 'react'
import { Input } from 'semantic-ui-react'

const InputSearch = ({ value, setValue, error }) => {
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
  let citiesArr = arr.map((el) => <option value={el}></option>)
  return (
    <div className="input_block">
      <div>
        <Input
          className={err}
          list="cities"
          value={value}
          onChange={onChange}
          placeholder="Choose the city..."
        />
        <datalist id="cities">{citiesArr}</datalist>
      </div>
      {error ? <span className="text_error">{error}</span> : null}
    </div>
  )
}

export default InputSearch

// export const Input = (props) => {
//   const { value, setValue, error } = props

//   const onChange = (event) => {
//     const inputValue = event.target.value
//     setValue(inputValue)
//   }
//   const err = error ? 'error' : 'search_input'

//   return (
//     <div className="input_block">
//       <input className={err} type="text" value={value} onChange={onChange} />
//       {error ? <span className="text_error">{error}</span> : null}
//     </div>
//   )
// }
