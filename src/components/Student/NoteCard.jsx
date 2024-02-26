import { Link } from "react-router-dom";
import Output from 'editorjs-react-renderer';


function NoteCard({ note, allNotes }) {
   const bodyData = JSON.parse(note.body);
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
      </div>
    </>
  );
}

export default NoteCard;
