import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getNoteById } from "../../../api";
import NoteCard from "./NoteCard";
import "../../../css/notes.css";


function SingleNote(){
    const { id } = useParams();
    const [note, setNote] = useState({})
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    
    useEffect(()=>{
        getNoteById(id).then((response)=>{
          setNote(response)
          setLoading(false);
        })
        .catch((error)=>{
          setError(error);
          console.log(error)
              setLoading(false);
        })
      
      },[id])

      if (loading) {
        return <p>Loading note ...</p>
      }

      if (error) {
        return <p>{error}</p>;
      }
    
    return(
        <NoteCard
        key={note.title}
        note={note}
      />
    )
}

export default SingleNote