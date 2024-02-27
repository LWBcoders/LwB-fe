import { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom'
import { getQuizById } from '../../../api';
import StudentQuizGame from './StudentQuizGame';


function StudentQuizSingleDisplay({pathToAllQuiz}) {
    const {id}  = useParams();
    const [quizDataById, setQuizDataById] = useState([])
    const [quiz, setQuiz] = useState({});

    const [isLoading, setIsloading] = useState(true)


   
    useEffect(()=>{
        getQuizById(id)
        .then((response)=>{
            setQuizDataById(response.data.quizData)
            setQuiz(response)
            setIsloading(false)
          
        }).catch((error)=>{
            setErr(error.response)
        })
    },[])
    if (isLoading)  return <p className="loading">Loading ... </p>


    return (
        <>
    
        <StudentQuizGame quizDataArr={quizDataById} quizObj={quiz} pathToAllQuiz={pathToAllQuiz}/>
        </>
         );
}

export default StudentQuizSingleDisplay;