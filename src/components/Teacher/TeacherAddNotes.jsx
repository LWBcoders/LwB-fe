
import React, { useState, useEffect } from "react";
import Editor from "./Editor";
import ViewNote from "./ViewNote";
import { postNote, getAllSubjects, getAllYears, getTeachers } from "../../../api";
import "../../../css/notes.css";
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";

const AddNote = () => {
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setLoggedInUser(JSON.parse(storedUser));
  }, []);
const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [allSubjects, setAllSubjects] = useState("");
  const [allTeachers, setAllTeachers] = useState("");
  const [allyears, setAllyears] = useState("");
  const [completed, setCompleted] = useState(false);
  const INITIAL_DATA = {
    time: new Date().getTime(),
    blocks: [
      {
        type: "header",
        data: {
          text: "Start editing...",
          level: 3
        }
      }
    ]
  };
  const [noteData, setNoteData] = useState({
    title: "",
    teacher: "",
    subject: "",
    category: "",
    year: "",
    img_url: ""
  });
  const [editorData, setEditorData] = useState(INITIAL_DATA);
  const [addedNote, setAddedNote] = useState(null); // State to store the added note


  useEffect(() => {
    getAllSubjects()
      .then((response) => {
        const subjects = response.subjects;
        const subjectsArray = [];
        for (let i = 0; i < subjects.length; i++) {
          subjectsArray.push(subjects[i].subject);
        }
        setAllSubjects(subjectsArray);
      })
      .then(() => {
        getTeachers().then((response) => {
          const teachers = response;
          const teachersArray = [];
          for (let i = 0; i < teachers.length; i++) {
            teachersArray.push(teachers[i].userName);
          }
          setAllTeachers(teachersArray);
        });
      })
      .then(() => {
        getAllYears()
          .then((response) => {
            const years = response.years;
            const yearsArray = [];
            for (let i = 0; i < years.length; i++) {
              yearsArray.push(years[i].year);
            }
            setAllyears(yearsArray);
          })
          .then(() => {
            console.log(allTeachers);
            setCompleted(true);
          });
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNoteData({ ...noteData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(loggedInUser);
      const dataToSend = { ...noteData, body: editorData, teacher: loggedInUser.userName };
      console.log(dataToSend);
      const response = await postNote(dataToSend);
      const newNote = response;
      
      //onNoteAdded(newNote);
      setAddedNote(newNote);
      setNoteData({
        title: "",
        teacher: "",
        subject: "",
        category: "",
        year: ""
      });
      setEditorData("");
      alert("Note added successfully!");
    } catch (error) {
      console.error("Error adding note:", error);
      alert("An error occurred while adding the note. Please try again.");
    }
  };

  return (
    <div className="add-note-container">
      {completed ? (
        <div>
          <h2>Add Note</h2>
          <form className="add-note-form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title">
                Title:
                <input
                  type="text"
                  name="title"
                  value={noteData.title}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            
            <div>
              <label htmlFor="subject">
                Subject:
                <select
                  name="subject"
                  value={noteData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Subject</option>
                  {allSubjects.map((subject, index) => (
                    <option key={index} value={subject}>
                      {subject}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <label htmlFor="year">
                Year Group:
                <select
                  name="year"
                  value={noteData.year}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select year group</option>
                  {allyears.map((year, index) => (
                    <option key={index} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div>
              <label htmlFor="img_url">
                Preview image:
                <input
                  type="text"
                  name="img_url"
                  value={noteData.img_url}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>        
            <div>
              <label>Content: </label>
              <Editor
                data={editorData}
                onChange={setEditorData}
                editorblock="editor-block" 
              />
            </div>
            <div className="button-container">
              <button type="submit">Publish</button>
            </div>
          </form>
        </div>
      ) : null}

      {addedNote && (
        <div>
          <ViewNote newNote={addedNote} />
        </div>
      )}
    </div>
  );
};

export default AddNote;
