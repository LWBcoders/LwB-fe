import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import { getQuizById } from '../../../api';
import StudentQuizGame from './StudentQuizGame';


function StudentQuizSingleDisplay() {
    const {id}  = useParams();
    const [quizDataById, setQuizDataById] = useState([])
    const [quiz, setQuiz] = useState({});

    const [isLoading, setIsloading] = useState(true)


    console.log(id)
    useEffect(()=>{
        getQuizById(id)
        .then((response)=>{
            console.log(response, "<<<<")
            setQuizDataById(response.quizData)
            setQuiz(response)
            setIsloading(false)
          
        }).catch((error)=>{
            setErr(error.response)
        })
    },[])
    if (isLoading)  return <p className="loading">Loading ... </p>


    return (
        <>
    
        <StudentQuizGame quizDataArr={quizDataById} quizObj={quiz}/>
        </>
         );
}

export default StudentQuizSingleDisplay;