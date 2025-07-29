import Die from "./Die"
import { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'


import "./index.css"

function App() {

  const [dice, setDice] = useState(() => generateAllDices())
  const { width, height } = useWindowSize()
  const [message, setMessage] = useState("")
  const [wrongDiceIds, setWrongDiceIds] = useState([])

// function for generating dices
  function generateAllDices(){
    return new Array(10).fill(0).map(() => {
      return {
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }
    })
  }

  // verify if the game is over
  const gameWon = dice.every(die => die.isHeld) && 
    dice.every(die => die.value === dice[0].value)

  /**
   * filter dice to check if the user
   * made the wrong click then restart the game.
   */


   useEffect(() => {
    const heldDice = dice.filter(die => die.isHeld)
    if (heldDice.length === 0) return

    const firstHeldValue = heldDice[0].value
    const wrongDice = heldDice.filter(die => die.value !== firstHeldValue)
    
    
    if(wrongDice.length > 0){
      setMessage("Wrong Choice!")
      setWrongDiceIds(wrongDice.map(d => d.id))

      setTimeout(() => {
        setMessage("")
        setWrongDiceIds([])
        setDice(generateAllDices())
      }, 2000)
    }
  }, [dice])


  // function to roll dice
  function roll(){
    if(!gameWon){
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? die : {
        ...die,
        value:Math.ceil(Math.random() * 6)
      }
      }))
    }else{
      setDice(generateAllDices())
    }

  }

  // function to hold dice
  function hold(id){
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ? {...die, isHeld: !die.isHeld}: die
    }))
  }

  const diceElements = dice.map(die => 
      <Die value={die.value}
      key={die.id}
      isHeld={die.isHeld}
      handleClick={() => hold(die.id)}
      isWrong={wrongDiceIds.includes(die.id)}
      />)

    return (
      <>
      <main className="main-container">
          {gameWon && <Confetti
            width={width}
            height={height}
        />}
        {gameWon ? <h1 className="title">Congratulations</h1> 
        : <>
            <h1 className="title">{message ? message : "Tenzies"}</h1>
            <p className="instructions">
              Roll until all dice are the same. Click
              each die to freeze it at its current value between rolls.
            </p>
          </>
        }

        <div className="dice-container">
          {diceElements}
        </div>
        <button onClick={roll} className="dice-roll">
        {gameWon ? "New game" : "Roll"}
          </button>
      </main>
      </>
    )
}

export default App
