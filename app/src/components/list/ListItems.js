import React, { useState, useEffect } from 'react'
import './ListItems.css'

function ListItems () {
  const initialList = [
    { listName: 'New List One' },
    { listName: 'New List Two' }
  ]
  const [items, setItems] = useState([initialList])
  const getListItems = async () => {
    try {
      const response = await window.fetch('http://localhost:2809/list/')
      await setItems(response.json())
     
    } catch (err) {
      console.log('Error:', err)
    }
  }
  useEffect(() => {
    getListItems()
  }, [])

  return (
    <div className='list-items'>
      <ul>
        {items.map(item => (
          <li key='item.id'> {item.title}
            <img src={require('./../../images/edit.png')} alt='Edit' />
            <img src={require('./../../images/delete.png')} alt='Delete' />
          </li>
        ))}
      </ul>
    </div>
  )
}
export default ListItems

/*
const [items, setItems] = useState([])
  useEffect(() => {
    window.fetch('http://localhost:2809/list/add', {
      method: 'POST',
      body: JSON.stringify({
        listName: 'Sample ToDo'
      }),
      headers: {
        'content-type': 'Application/json; charset=UTF-8'
      }
    })
      .then(response => response.json())
      .then(json => setItems(json))
  }, [])
  */
