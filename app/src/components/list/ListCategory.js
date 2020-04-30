import React, { useState, useContext } from 'react'
import './ListCategory.css'
import { ListItemContext } from './ListItemContext'

function ListCategory () {
  const [listName, setListName] = useState('')
  const [listItems, setListItems] = useContext(ListItemContext)

  const addList = (e) => {
    setListName(e.target.value)
  }
  const createList = async (e) => {
    e.preventDefault()
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
      setListItems([...listItems, { _id: data._id, listName: data.listName }])
      setListName('')
    } catch (err) {
      console.log('Error:', err)
    }
  }
  return (
    <div className='list-cat-div'>
      <form onSubmit={createList}>
        <input
          type='text'
          className='list-input'
          placeholder='Add List Category..'
          onChange={addList}
          value={listName}
        />
      </form>
    </div>
  )
}

export default ListCategory
