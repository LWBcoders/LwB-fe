import { deleteQuizById, getAllQuizzes } from '../../../api';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";

function TeacherViewMyQuiz() {
    useEffect(()=>{
        const storedUser = localStorage.getItem("user");
        setLoggedInUser(JSON.parse(storedUser));
    }, [])
    const [myQuizList, setMyQuizList] = useState([])
    const [isError, setIsError] = useState(null)
    const yearQuery="";
    const subjectQuery="";
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);

    const teacherQuery = loggedInUser.userName;
    let copyState = [...myQuizList];

    useEffect(()=>{
        getAllQuizzes(yearQuery, subjectQuery,teacherQuery).then((response)=>{
            setMyQuizList(response.quizzes)
        }).catch((error)=>{
            setIsError({error})
        })
    },[])

    const deleteQuiz = (id)=>{
        setMyQuizList((currentQuiz)=>{
            return currentQuiz.filter(quiz => quiz._id != id)
        })
        deleteQuizById(id)
        .then((response)=>{
            alert("Quiz deleted successfully!")
        })
        .catch(error=>{
            setMyQuizList(copyState);
            alert(`Something went wrong, please try again`);
        })
    }

    if(isError){
        return <p>{`Sorry, but something went wrong... ${isError}`}</p>
    }
    return ( <>
   <section className="listOfQuizzes">

<h1>List of my Quizzes:</h1>

{(myQuizList.length===0) ? <p className="noquizyet">Sorry...There is no quiz yet..</p> :
  <ul className="quizUnOrdList">
    
    {myQuizList.map((quiz,i)=>{
        return(
        <li className="showMystuffLi" key={i}>
            <Link className="quizLink showMyLink" to={`quiz/${quiz["_id"]}`}>
                 {quiz.title} - <span className='year'>Year {quiz.schoolyear} </span></Link> 
            <button className="deletemyquizBtn" onClick={()=>{deleteQuiz(quiz._id)}}>Delete</button> 
        </li>
        )
    })}
    </ul>
  }
</section>
    </> );
}

export default TeacherViewMyQuiz;