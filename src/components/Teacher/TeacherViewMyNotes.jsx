import { deleteNoteById, getAllNotes } from '../../../api';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import "../../../css/teacherViewMyNotes.css"

function TeacherViewMyNotes() {
    const [myNoteList, setMyNoteList] = useState([])
    const [isError, setIsError] = useState(null)
    const yearQuery="";
    const subjectQuery="";
    const teacherQuery = "kfields";

    let copyState = [...myNoteList];

    useEffect(()=>{
        getAllNotes(subjectQuery,teacherQuery, yearQuery).then((response)=>{
            setMyNoteList(response)
        }).catch((error)=>{
            setIsError({error})
        })
    },[])

    const deleteNote = (id)=>{
        console.log(id)
        setMyNoteList((currentNote)=>{
            return currentNote.filter(Note => Note._id != id)
        })
        deleteNoteById(id)
        .then((response)=>{
            alert("Note deleted successfully!")
        })
        .catch(error=>{
            setMyNoteList(copyState);
            alert(`Something went wrong, please try again`);
        })
    }

    if(isError){
        return <p>{`Sorry, but something went wrong... ${isError}`}</p>
    }
    return ( <>
   <section className="listOfNotes">

<h1>List of my Notes:</h1>

{(myNoteList.length===0) ? <p className="noNoteyet">Sorry...There is no Note yet..</p> :
  <ul className="noteUnOrdList">
    
    {myNoteList.map((note,i)=>{
        return(
        <li className="showMystuffLi" key={i}>
            <Link className="noteLink showMyLink" to={`notes/${note["_id"]}`}>
                 {note.title} - <span className='year'>Year {note.year} </span></Link> 
            <button className="deletemyNoteBtn" onClick={()=>{deleteNote(note._id)}}>Delete</button> 
        </li>
        )
    })}
    </ul>
  }
</section>
    </> );
}

export default TeacherViewMyNotes;