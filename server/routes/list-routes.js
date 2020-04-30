const router = require('express').Router()
const ToDoModel = require('../models/ToDoSchema')

router.get('/', async (req, res) => {
  try {
    const todos = await ToDoModel.find()
    res.status(200).json(todos)
  } catch (err) {
    res.status(500).json('Error:' + err)
  }
})

router.post('/add', async (req, res) => {
  try {
    const { listName } = req.body
    const todo = new ToDoModel({ listName: listName, tasks: [] })
    await todo.save()
    return res.status(200).json(todo)
  } catch (err) {
    res.status(500).json('Error:' + err)
  }
})

router.put('/update/:listId', async (req, res) => {
  try {
    console.log('Am IN update..')
    const id = req.params.listId
    const todo = await ToDoModel.findById(id)
    todo.listName = req.body.listName
    await todo.save()
    res.status(200).json(todo)
  } catch (err) {
    res.status(500).json('Error:' + err)
  }
})

router.delete('/:listId', async (req, res) => {
  console.log('Am in delete..', req.params.listId)
  try {
    await ToDoModel.findByIdAndDelete(req.params.listId)
    res.status(200).json('List Deleted')
  } catch (err) {
    res.status(500).json('Error:' + err)
  }
})

module.exports = router
