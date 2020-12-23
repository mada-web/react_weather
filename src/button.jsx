export const Button = (props) => {
  return (
    <button className="button_style" onClick={props.onClick}>
      <img src={props.icon} alt={props.alt} />
    </button>
  )
}
