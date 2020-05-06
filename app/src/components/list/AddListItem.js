import React, { useState } from 'react'
import './AddListItem.css'

function AddListItem (props) {
  const [listName, setListName] = useState('')
  const [listItems, setListItems] = useState(props.listItems)
  // const { onCreateList } = props

  const handleChange = (event) => {
    setListName(event.target.value)
  }

  const handleCreateList = async (event, listName) => {
    event.preventDefault()
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({ listName: listName })
    }
    try {
      const response = await window.fetch('http://localhost:2809/list/add', options)
      const data = await response.json()
      console.log('Data Is:', data)
      setListItems([...listItems, { _id: data._id, listName: data.listName }])
      setListName('')
    } catch (err) {
      console.log('Error:', err)
    }
  }

  return (
    <div className='list-cat-div'>
      <form onSubmit={(event) => handleCreateList(event, listName)}>
        <input
          type='text'
          className='list-cat-input'
          placeholder='Add List Category..'
          onChange={handleChange}
          value={listName}
        />
      </form>
    </div>
  )
}

export default AddListItem
