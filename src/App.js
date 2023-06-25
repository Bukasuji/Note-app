import {useEffect, useState} from "react";
import uuid from "react-uuid"
import './App.css';
import Main from './Main';
import Sidebar from './Sidebar'


function App() {
  // Initialize 'notes' state using localStorage data or an empty array if no data exists
  const [notes, setNotes] = useState(() => {
    const localStorageNotes = localStorage.getItem('notes');
    return localStorageNotes ? JSON.parse(localStorageNotes) : [];
  });
  
  // Initialize 'activeNote' state as false
  const [activeNote, setActiveNote] = useState(false)

  // Update localStorage whenever 'notes' state changes
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes))
  }, [notes]);

  // Function to add a new note
  const onAddNote =() =>{
    const newNote ={
      id: uuid(),
      title: "Untitled Note",
      body: "",
      lastModified:Date.now()
    };
    setNotes([newNote, ...notes]);
    
  };

  // Function to update an existing note
  const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {
      if (note.id === activeNote) {
        return updatedNote
      }
      return note;
    })
     setNotes(updatedNotesArray)
  }

  //function to delete note
  const onDeleteNote = (noteIdToDelete) => {
    const updatedNotes = notes.filter((note) => note.id !== noteIdToDelete);
    setNotes(updatedNotes);
  };
  
  // Function to get the active note
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
