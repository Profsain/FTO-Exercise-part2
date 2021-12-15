import React, {useEffect, useState} from "react";
// import NotesDB from "./NotesDB";
import Note from "./components/Note";
import noteService from './services/notes'


const App = () => {
  //state
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

   //Communicating with server using
  //noteService module
  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])
  
  //New note changes handler
  const handleNoteChanges = (event) => {
    setNewNote(event.target.value)
  }

  //Add new notes handler
  const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    }
   
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  //Handle show note button
  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)
  
  const toggleImportance = (id) => {
    const note = notes.find(n => n.id === id)
    const changeNote = { ...note, important: !note.important }
    
    noteService 
      .update(id, changeNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      })
      .catch(error => {
        alert(
        `The note ${note.content} was already deleted`
        )
        setNotes(notes.filter(n => n.id !== id))
    })
  }

  return (
    <div>
      <h1>Notes Taking App</h1>
      <ul>
        {notesToShow.map((note, i) =>
          <Note
            key={i}
            note={note}
            toggleImportance={() => toggleImportance(note.id)}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          type="text"
          value={newNote}
          onChange={handleNoteChanges}
        />
        <button type="submit">Save</button>
      </form>
      <button onClick={() => setShowAll(!showAll)}>
        Show {showAll ? 'Important' : 'All'}
      </button>
    </div>
  )
}

export default App;