import React from 'react'
import { Button, Icon } from 'semantic-ui-react'

const ButtonComponent = ({ onClick, name, alt, color, size }) => (
  <Button
    icon
    size={size}
    inverted
    color={color}
    onClick={onClick}
    content={alt}
  >
    <Icon name={name} />
  </Button>
)

export default ButtonComponent
