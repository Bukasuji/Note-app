import {useEffect, useState} from "react";
import uuid from "react-uuid"
import './App.css';
import Main from './Main';
import Sidebar from './Sidebar'

function App() {
  //const [notes, setNotes] = useState(JSON.parse(localStorage.notes) || [])
  const [notes, setNotes] = useState(() => {
    const localStorageNotes = localStorage.getItem('notes');
    return localStorageNotes ? JSON.parse(localStorageNotes) : [];
  });
  
  const [activeNote, setActiveNote] = useState(false)

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))

  }, [notes]);

  const onAddNote =() =>{
    const newNote ={
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified:Date.now()
    };

    setNotes([newNote, ...notes]);
    
  };

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {
      if (note.id === activeNote) {
        return updatedNote
      }
      return note;
    })
    setNotes(updatedNotesArray)
  }

  const onDeleteNote = (idToDelete) => {
    setNotes(notes.filter((note) => note.id !== idToDelete));

  };

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote)
  }
 
  return (
    <div className="App"> 
      <Sidebar 
      notes={notes} 
      onAddNote={onAddNote} 
      onDeleteNote={onDeleteNote} 
      activeNote={activeNote} 
      setActiveNote={setActiveNote} />
      <Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote}/>
    </div>
  );
}

export default App;
