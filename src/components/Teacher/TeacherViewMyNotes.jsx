import { deleteNoteById, getAllNotes } from "../../../api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EditNote from './EditNote'
import "../../../css/teacherViewMyNotes.css";
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";

function TeacherViewMyNotes() {

  useEffect(() => {
        const storedUser = localStorage.getItem("user");
        setLoggedInUser(JSON.parse(storedUser));
      }, []);
      const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const [myNoteList, setMyNoteList] = useState([]);
  const [isError, setIsError] = useState(null);
  const [deleteNoteId, setDeleteNoteId] = useState(null);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const yearQuery = "";
  const subjectQuery = "";
  const teacherQuery = loggedInUser.userName;

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
          <p className="noNoteyet sorryMsg">You have no Notes yet..</p>
        ) : (
          <ul className="noteUnOrdList">
            {myNoteList.map((note, i) => {
              return (
                <li className="showMystuffLi" key={i}>
                  <Link
                    className="noteLink showMyLink noteFlexWrapper"
                    to={`${note["_id"]}`}
                  >
                    <img className="myNotesImg" src={note.img_url} alt= 'preview image' />
                    <div className="noteDescriptionWrapper">
                    {note.title} -{" "}
                    <span className="year">Year {note.year} </span>
                    </div>
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
                  {editingNoteId === note._id ? ( 
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
