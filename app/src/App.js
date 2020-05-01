import React, { useState, useEffect } from 'react'
import ListCategory from './components/list/ListCategory'
import './App.css'

function App () {
  const [listItems, setListItems] = useState([])

  const createList = async (event, listName) => {
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
      setListItems([...listItems, { _id: data._id, listName: data.listName }])
      // setListName('')
    } catch (err) {
      console.log('Error:', err)
    }
  }

  const handleListUpdate = async (id, listName) => {
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ listName: listName })
    }
    try {
      const response = await window.fetch(`http://localhost:2809/list/update/${id}`, options)
      const data = await response.json()
      console.log('Data IS:', data.listName)
      listItems.map(item => {
        if (item.key === id) {
          item.listName = data.listName
        }
      })
    } catch (err) {
      console.log('Error:', err)
    }
  }

  useEffect(() => {
    const getListItems = async () => {
      try {
        const response = await window.fetch('http://localhost:2809/list/')
        const data = await response.json()
        await setListItems(data)
      } catch (err) {
        console.log('Error:', err)
      }
    }
    getListItems()
  }, [handleListUpdate])

  const handleListDelete = async id => {
    const options = { method: 'DELETE' }
    try {
      await window.fetch(`http://localhost:2809/list/${id}`, options)
      setListItems(listItems.filter(item => item._id !== id))
    } catch (err) {
      console.log('Error:', err)
    }
  }

  return (
    <div className='App'>
      <h2>To Do App</h2>
      <ListCategory
        listItems={listItems}
        onCreateList={createList}
        onUpdateList={handleListUpdate}
        onDeleteList={handleListDelete}
      />
    </div>
  )
}

export default App
