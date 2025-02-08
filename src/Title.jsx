import React from 'react'

const Title = ({
  flag
}) => {
  return (
    <span className={flag ? '' : 'zero'}>Proxion</span>
  )
}

export default Title