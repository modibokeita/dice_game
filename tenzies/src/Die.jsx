import React from 'react'
import "./index.css"
export default function Die(props) {

      const styles = {
    backgroundColor: props.isWrong
      ? "#ff4d4d" // Red if wrong
      : props.isHeld
      ? "#59E391" // Green if held
      : "white"
  }
  return (
    <button
    style={styles}
    onClick={props.handleClick} 
    className='dice-btn'

    >{props.value}</button>
  )
}
