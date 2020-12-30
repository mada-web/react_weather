import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

const ButtonApp = ({ onClick, name, alt, color }) => (
  <Button
    icon
    size="medium"
    inverted
    color={color}
    onClick={onClick}
    content={alt}
  >
    <Icon name={name} />
  </Button>
)

export default ButtonApp

// export const Button = (props) => {
//   return (
//     <button className="button_style" onClick={props.onClick}>
//       <img src={props.icon} alt={props.alt} />
//     </button>
//   )
// }
