import React, { useState, createContext } from 'react'

// Context
export const ListItemContext = createContext()

// Provider
export const ListItemProvider = (props) => {
  const [listItems, setListItems] = useState([])

  return (
    <ListItemContext.Provider value={[listItems, setListItems]}>
      {props.children}
    </ListItemContext.Provider>
  )
}
