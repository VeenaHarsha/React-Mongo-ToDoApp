import React, { useState } from 'react'

function UpdateNumbersArray () {
  const initialState = ''
  const [nums, setNums] = useState([])
  const [number, setNumber] = useState(initialState)

  const addNumber = (event) => {
    setNumber(event.target.value)
    setNumber(initialState)
  }
  const updateArray = (event) => {
    setNums(
      [...nums, event.target.value]
    )
    console.log('Nums Length: ', nums.length)
  }
  return (
    <div>
      <input
        type='text'
        onChange={addNumber}
        onChangeCapture={updateArray}
        value={number}
      />
      <hr />
      <ul>
        {nums.map(num => (
          <li key={num}> {num} </li>
        ))}
      </ul>
    </div>
  )
}

export default UpdateNumbersArray
