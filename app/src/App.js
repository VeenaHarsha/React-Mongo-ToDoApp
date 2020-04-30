import React from 'react'
import ListCategory from './components/list/ListCategory'
import './App.css'
import ListItems from './components/list/ListItems'
import { ListItemProvider } from './components/list/ListItemContext'

function App () {
  return (
    <ListItemProvider>
      <div className='App'>
        <h2>To Do App</h2>
        <ListCategory />
        <ListItems />
      </div>
    </ListItemProvider>
  )
}

export default App
