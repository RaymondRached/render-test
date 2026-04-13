const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://fullstack:${password}@cluster0.asgufyx.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

Note.find({important: false}).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})

// const note = new Note({
//   content: 'HTML is easy',
//   important: true,
// })

// let notes = [
//   {
//     content: 'HTML is easy',
//     important: true,
//   },
//   {
//     content: 'Browser can execute only JavaScript',
//     important: false,
//   },
//   {
//     content: 'GET and POST are the most important methods of HTTP protocol',
//     important: true,
//   },
// ]

// Note.insertMany(notes).then(result => {
//   console.log('notes saved!',result)
//   mongoose.connection.close()
// })

// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })