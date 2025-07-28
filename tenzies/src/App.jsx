import Die from "./Die"
import { useState } from "react"
import { nanoid } from "nanoid"
import "./index.css"
function App() {
 const [dice, setDice] = useState(() => generateAllDices())
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

// function to roll dice
function roll(){

}

// function to hold dice
function hold(id){
  console.log(id)
}
const diceElements = dice.map(die => 
    <Die value={die.value}
     key={die.id}
     handleClick={() => hold(die.id)}
    />)
  return (
    <>
     <main className="main-container">
      <div className="dice-container">
        {diceElements}
      </div>
     </main>
    </>
  )
}

export default App
