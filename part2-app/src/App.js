import React from "react";
import notes from "./NotesDB";
import Note from "./components/Note";


const App = () => {
  return (
    <div>
      <h1>Notes Taking App</h1>
      <ul>
        {notes.map(note => <Note note={note}/>)}
      </ul>
    </div>
  )
}

export default App;