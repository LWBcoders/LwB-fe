import React, { useState, useEffect } from 'react';
import { updateNote, getNoteById } from '../../../api';
import Editor from './Editor';
import Output from 'editorjs-react-renderer';
import '../../../css/teacherViewMyNotes.css'

function EditNote({ noteId }) {
    const [note, setNote] = useState(null);
    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedTeacher, setUpdatedTeacher] = useState('');
    const [updatedSubject, setUpdatedSubject] = useState('');
    const [updatedImg, setUpdatedImg] = useState('');
    const [updatedYear, setUpdatedYear] = useState('');
    const [updatedBody, setUpdatedBody] = useState('');
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {
        getNoteById(noteId)
            .then((noteData) => {
                setNote(noteData);
                setUpdatedTitle(noteData.title);
                setUpdatedTeacher(noteData.teacher);
                setUpdatedSubject(noteData.subject);
                setUpdatedImg(noteData.img_url || '');
                setUpdatedYear(noteData.year || '');
                setUpdatedBody(noteData.body);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsError(true);
                setIsLoading(false);
            });
    }, [noteId]);
    const handleTitleChange = (event) => {
        setUpdatedTitle(event.target.value);
    };

    const handleTeacherChange = (event) => {
        setUpdatedTeacher(event.target.value);
    };

    const handleSubjectChange = (event) => {
        setUpdatedSubject(event.target.value);
    };

    const handleImgChange = (event) => {
        setUpdatedImg(event.target.value);
    };

    const handleYearChange = (event) => {
        setUpdatedYear(event.target.value);
    };

    const handleBodyChange = (event) => {
        setUpdatedBody(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        updateNote(noteId, {
            title: updatedTitle,
            teacher: updatedTeacher,
            subject: updatedSubject,
            img_url: updatedImg,
            year: updatedYear,
            body: updatedBody
        })
            .then((updatedNote) => {
                setNote(updatedNote); 
                setIsUpdated(true);
                alert('Note updated successfully!');
            })
            .catch((error) => {
                setIsError(true);
                alert('Failed to update note. Please try again.');
            });
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError || !note) {
        return <p>Error: Failed to load note.</p>;
    }
    if (isUpdated) {
        return <p>Note updated successfully!</p>; 
    }

    return (
        <div className="editNoteContainer">
            <h1>Edit Note</h1>
            <form className="editNoteForm" onSubmit={handleSubmit}>
                <label htmlFor="title">Title: </label>
                <input type="text" id="title" value={updatedTitle} onChange={handleTitleChange} /><br/>

                <label htmlFor="teacher">Teacher: </label>
                <input type="text" id="teacher" value={updatedTeacher} onChange={handleTeacherChange} /><br/>

                <label htmlFor="subject">Subject: </label>
                <input type="text" id="subject" value={updatedSubject} onChange={handleSubjectChange} /><br/>

                <label htmlFor="category">Image: </label>
                <input type="text" id="category" value={updatedImg} onChange={handleImgChange} /><br/>

                <label htmlFor="year">Year:</label>
                <input type="text" id="year" value={updatedYear} onChange={handleYearChange} /><br/>

                <label htmlFor="body">Content: </label>
                <Editor editorblock="editor-block" data={updatedBody} onChange={setUpdatedBody}/>
                {/* <textarea  id="body" value={<Output data={updatedBody} />}onChange={handleBodyChange} /> */}

                <button type="submit">Update Note</button>
            </form>
       
        </div>
    );
}

export default EditNote;
