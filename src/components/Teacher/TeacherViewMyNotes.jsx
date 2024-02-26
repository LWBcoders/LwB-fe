import { deleteNoteById, getAllNotes } from "../../../api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditNote from './EditNote'
import "../../../css/teacherViewMyNotes.css";

function TeacherViewMyNotes() {
  const [myNoteList, setMyNoteList] = useState([]);
  const [isError, setIsError] = useState(null);
  const [deleteNoteId, setDeleteNoteId] = useState(null);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const yearQuery = "";
  const subjectQuery = "";
  const teacherQuery = "Sarah";

  let copyState = [...myNoteList];

  useEffect(() => {
    getAllNotes(subjectQuery, teacherQuery, yearQuery)
      .then((response) => {
        setMyNoteList(response);
      })
      .catch((error) => {
        setIsError({ error });
      });
  }, []);

  const confirmDelete = () => {
    if (deleteNoteId) {
      console.log(deleteNoteId);
      setMyNoteList((currentNote) => {
        return currentNote.filter((Note) => Note._id !== deleteNoteId);
      });
      deleteNoteById(deleteNoteId)
        .then((response) => {
          setDeleteNoteId(null);
        })
        .catch((error) => {
          setMyNoteList(copyState);
          setIsError(true);
        });
    }
  };

  const cancelDelete = () => {
    setDeleteNoteId(null);
  };

  const editNote = (id) => {
    console.log(`Editing note with ID: ${id}`);
    setEditingNoteId(id);
  };

  if (isError) {
    return <p>{`Sorry, but something went wrong... ${isError}`}</p>;
  }
  return (
    <>
      <section className="listOfNotes">
        <h1>List of my Notes:</h1>

        {myNoteList.length === 0 ? (
          <p className="noNoteyet">You have no Notes yet..</p>
        ) : (
          <ul className="noteUnOrdList">
            {myNoteList.map((note, i) => {
              return (
                <li className="showMystuffLi" key={i}>
                  <Link
                    className="noteLink showMyLink"
                    to={`${note["_id"]}`}
                  >
                    {note.title} -{" "}
                    <span className="year">Year {note.year} </span>
                  </Link>
                  {/* <button className="deletemyNoteBtn" onClick={()=>{deleteNote(note._id)}}>Delete</button>
            <button className='editmyNoteBtn' onClick={()=>{editNote(note._id)}}>Edit</button>   */}
                  {/* <button
                    className="deletemyNoteBtn"
                    onClick={() => setDeleteNoteId(note._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="editmyNoteBtn"
                    onClick={() => {
                      editNote(note._id);
                    }}
                  >
                    Edit
                  </button>
                  {deleteNoteId === note._id && (
                    <div className="deleteConfirmation">
                      <p>Are you sure you want to delete this note?</p>
                      <button onClick={confirmDelete}>Yes</button>
                      <button onClick={cancelDelete}>No</button>
                    </div>
                  )} */}
                  {editingNoteId === note._id ? ( // Render inline editing form if editingNoteId matches note._id
                    <EditNote noteId={note._id} />
                  ) : (
                    <>
                      {/* Render note content */}
                      <button className="editmyNoteBtn" onClick={() => editNote(note._id)}>Edit</button>
                      <button className="deletemyNoteBtn" onClick={() => setDeleteNoteId(note._id)}>Delete</button>
                    </>
                  )}
                  {deleteNoteId === note._id && (
                    <div className="deleteConfirmation">
                      <p>Are you sure you want to delete this note?</p>
                      <button onClick={confirmDelete}>Yes</button>
                      <button onClick={cancelDelete}>No</button>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </section>
    </>
  );
}

export default TeacherViewMyNotes;
