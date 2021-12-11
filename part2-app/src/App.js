import React, {useEffect, useState} from "react";
// import NotesDB from "./NotesDB";
import Note from "./components/Note";
import axios from "axios";


const App = () => {
  //state
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)

   //Communicating with server using
  //Axios and promise
  useEffect(() => {
    console.log('useEffect operation')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('Promise Fulfilled')
        // console.log(response.status)
        setNotes(response.data)
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
      id: notes.length + 1
    }
    //add note object to notes array
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true)
  
  return (
    <div>
      <h1>Notes Taking App</h1>
      <ul>
        {notesToShow.map(note =>
          <Note key={note.id} note={note} />
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