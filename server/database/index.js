const mongoose = require('mongoose')

const connectDataBase = async () => {
  const mongoDB = 'mongodb://127.0.0.1:27017/my_todo_db'
  try {
    await mongoose.connect(
      mongoDB,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log('Connected to MongoDB!')
    )
  } catch (err) {
    console.log(err)
  }
}
module.exports = connectDataBase
