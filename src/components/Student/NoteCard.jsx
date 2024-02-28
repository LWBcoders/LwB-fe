import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import Output from 'editorjs-react-renderer';
import UserContext from "../../../contexts/UserContext";
import EditNote from "../Teacher/EditNote";

function NoteCard({ note, allNotes }) {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [isEdited, setIsEdited] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState(null);

   const bodyData = JSON.parse(note.body);

   useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setLoggedInUser(JSON.parse(storedUser));
  }, []);
  const editNote = (id) => {
    //console.log(`Editing note with ID: ${id}`);
    setEditingNoteId(id);
  };
  return (
    <>
      <div className="note-wrapper">
        <Link className="note-titles" to={`/student/home/notes/${note._id}`} >{note.title}</Link>
        <p>Year: {note.year}</p>
        <p>Subject: {note.subject}</p>
        <p>Teacher: {note.teacher}</p>
        <div>
           <Output data={bodyData} />
        </div>
        {note.teacher === loggedInUser.userName ? (
          <button className="editmyNoteBtn" disabled={isEdited} onClick={() => editNote(note._id)}>Edit</button>
        ) : null}
        {editingNoteId=== note._id &&( <EditNote noteId={note._id} />)}
      </div>
    </>
  );
}

export default NoteCard;
