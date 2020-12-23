export const Input = (props) => {
  const { value, setValue, error } = props

  const onChange = (event) => {
    const inputValue = event.target.value
    setValue(inputValue)
  }
  const err = error ? 'error' : 'search_input'

  return (
    <div className="input_block">
      <input className={err} type="text" value={value} onChange={onChange} />
      {error ? <span className="text_error">{error}</span> : null}
    </div>
  )
}
