const router = require('express').Router()
const ToDoModel = require('../models/ToDoSchema')

router.get('/', async (req, res) => {
  try {
    const todos = await ToDoModel.find()
    console.log('TODos r: ', todos)
    res.status(200).json(todos)
  } catch (err) {
    res.status(500).json('Error:' + err)
  }
})

router.post('/add', async (req, res) => {
  try {
    console.log('Am Here in Add..')
    const newList = new ToDoModel({ listName: req.body.listName })
    await newList.save()
    res.status(200).json('New List Added!')
  } catch (err) {
    res.status(500).json('Error:' + err)
  }
})

router.patch('/update/:listId', async (req, res) => {
  try {
    const id = req.params.listId
    const todo = await ToDoModel.findById(id)
    todo.listName = req.body.listName
    await todo.save()
    res.status(200).json('List Updated!')
  } catch (err) {
    res.status(500).json('Error:' + err)
  }
})

router.delete('/:listId', async (req, res) => {
  try {
    await ToDoModel.findByIdAndDelete(req.params.listId)
    res.status(200).json('List Deleted')
  } catch (err) {
    res.status(500).json('Error:' + err)
  }
})

module.exports = router
