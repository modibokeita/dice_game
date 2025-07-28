import React from 'react'
import "./index.css"
export default function Die(props) {
  return (
    <button onClick={props.handleClick} className='dice-btn'>{props.value}</button>
  )
}
