const mongoose = require('mongoose')
// Schema: Describes the way how the data looks
const ToDoSchema = mongoose.Schema({
  listName: { type: String, required: true },
  tasks: [
    {
      taskName: { type: String, required: true },
      completed: { type: Boolean, default: false },
      dueDate: { type: Date },
      priority: { type: String, enum: ['low', 'mid', 'high'], default: 'low' },
      notes: { type: String }
    }
  ]

})

module.exports = mongoose.model('ToDoModel', ToDoSchema)
