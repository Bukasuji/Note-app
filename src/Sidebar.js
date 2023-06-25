import { useState } from "react";
import { FaSistrix } from "react-icons/fa";
import {FaTimesCircle} from "react-icons/fa";

function Sidebar({ notes, onAddNote, onDeleteNote, activeNote, setActiveNote }) {
  const sortedNotes = notes.sort((a, b) => b.lastModified - a.lastModified);
  const [showSearch, setShowSearch] = useState(false);
  const [text, setText] = useState("");
  const [filteredNotes, setFilteredNotes] = useState(notes);

  const handleSearchInputChange = (e) => {
    setText(e.target.value);
    filterNotes(e.target.value);
  };

  const filterNotes = (searchText) => {
    const filtered = sortedNotes.filter(
      (note) =>
        note.title.toLowerCase().includes(searchText.toLowerCase()) ||
        (note.body && note.body.toLowerCase().includes(searchText.toLowerCase()))
    );
    setFilteredNotes(filtered);
  };

  const handleAddNote = () => {
    setText("");
    setFilteredNotes(sortedNotes);
    onAddNote();
  };

  return (
    <div className="app-sidebar">
      <div className="app-sidebar-header">
        {!showSearch && <h1>Notes</h1>}
        {showSearch && (
          <input
            type="text"
            autoFocus
            placeholder="input keyword"
            value={text}
            onChange={handleSearchInputChange}
          />
        )}

        <div className="icon-add">
          <button
            className="icon"
            onClick={() => setShowSearch((prevState) => !prevState)}
          >
          {!showSearch && <FaSistrix />}
          {showSearch && < FaTimesCircle />}
          </button>
          {!showSearch && <button onClick={handleAddNote}>Add</button>}
        </div>
      </div>

      <div className="app-sidebar-notes">
        {filteredNotes.map((note) => (
          <div
            className={`app-sidebar-note ${
              note.id === activeNote ? "active" : ""
            }`}
            onClick={() => setActiveNote(note.id)}
          >
            <div className="sidebar-note-title">
              <strong>{note.title}</strong>
              <button onClick={() => onDeleteNote(note.id)}>Delete</button>
            </div>

            <p>{note.body && note.body.substr(0, 100) + "..."}</p>
            <small className="note-meta">
              last modified{" "}
              {new Date(note.lastModified).toLocaleDateString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
