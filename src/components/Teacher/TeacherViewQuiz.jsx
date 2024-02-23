import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import { getAllQuizzes } from '../../../api';


function TeacherViewQuiz({subjectToDisplay1, yearsToDisplay1, teacherToDisplay1}) {
  const [quizList, setQuizList] = useState([]);
  const [isError, setIsError] = useState(null)
  const [subjectQuery, setSubjectQuery] = useState("");
  const [yearQuery, setYearQuery] = useState(null)
  const [teacherQuery, setTeacherQuery] = useState(null)  
  
   // dropdownStates
   const [yearDropdownClass, setYearDropdownClass] = useState(null)
   const [subjectDropdownClass, setSubjectDropdownClass]= useState(null)
   const [teacherDropdownClass, setTeacherDropdownClass] = useState("")
 
   useEffect(()=>{
     getAllQuizzes(yearQuery, subjectQuery, teacherQuery).then((response)=>{
         setQuizList(response.quizzes)
     }).catch((error)=>{
         setIsError({error})
     })
   
 }, [yearQuery, subjectQuery, teacherQuery ])
 
 const yearDropdownHandle = (e)=>{
   e.preventDefault();
   if(yearDropdownClass){
       setYearDropdownClass(null)
   }else{
       setYearDropdownClass('dropdownQueries_active')
   }
 }
 const handleYearClick = (e, val)=>{
   e.preventDefault();
   setYearQuery(val)
   setYearDropdownClass(null)
 }
 
 const showAllQuiz = (e)=>{
   e.preventDefault();
   setYearQuery(null);
   setSubjectQuery(null);
   setTeacherQuery(null);
 }
 
 const subjectDropdownHandle = (e)=>{
   e.preventDefault();
   if(subjectDropdownClass){
     setSubjectDropdownClass(null)
   }else{
     setSubjectDropdownClass('dropdownSubjQueries_active')
   }
 }
 
 const handleSubjectClick = (e, val)=>{
   e.preventDefault();
   setSubjectQuery(val)
   setSubjectDropdownClass(null)
 }
 const teacherDropdownHandle = (e)=>{
  e.preventDefault();
   if(teacherDropdownClass){
    setTeacherDropdownClass(null)
   }else{
    setTeacherDropdownClass('dropdownTeacherQueries_active')
   }
 }
const handleTeacherClick = (e, val)=>{
  e.preventDefault();
  console.log(val, "val teach")
  setTeacherQuery(val)
   setTeacherDropdownClass(null)
}

  return (
      <>
        <section className="listOfQuizzes">

<h1 onClick={showAllQuiz}>List of all Quizzes:</h1>

<div className="querieswrapper querieswrapper-teacher">
  <div className="subjectWrapper subjwrapper-query">

  <div className="queryBox" onClick={subjectDropdownHandle}>Choose Subject  <i className="fa-solid fa-caret-down iconQ"></i> </div>
    <div className={`dropdownQueries ${subjectDropdownClass}`}>
        <ul>
    {subjectToDisplay1.map((subj)=>{
        return <li className="queryItem" key={subj._id} value={subj.subject} onClick={e=>handleSubjectClick(e, subj['subject'])}> {subj.subject}</li>
    })}
    </ul>
    </div>
    </div>

    <div className="yearWrapper yearWrapper-query">
      <div className="queryBox" onClick={yearDropdownHandle}>Choose School Year  <i className="fa-solid fa-caret-down iconQ"></i> </div>
        <div className={`dropdownQueries ${yearDropdownClass}`}>
            <ul>
        {yearsToDisplay1.map((year)=>{
            return <li className="queryItem" key={year._id} value={year.year} onClick={e=>handleYearClick(e, year['year'])}>Year {year.year}</li>
        })}
        </ul>
        </div>
    </div>
    <div className="yearWrapper teacherWrapper-query">
      <div className="queryBox" onClick={teacherDropdownHandle}>Choose Teacher <i className="fa-solid fa-caret-down iconQ"></i> </div>
        <div className={`dropdownQueries ${teacherDropdownClass}`}>
            <ul>
        {teacherToDisplay1.map((teacher)=>{
            return <li className="queryItem" key={teacher._id} value={teacher.userName} onClick={e=>handleTeacherClick(e, teacher['userName'])}> {teacher.firstName} {teacher.lastName}</li>
        })}
        </ul>
        </div>
    </div>
</div>  
  {(quizList.length===0) ? <p>Sorry...There is no quiz yet..</p> :
  <ul className="quizUnOrdList">
    
    {quizList.map((quiz,i)=>{
        return(
        <li key={i}>
            <Link className="quizLink" to={`quiz/${quiz["_id"]}`}>
                 {quiz.title} - <span className='year'>Year {quiz.schoolyear} </span></Link>  
        </li>
        )
    })}
    </ul>
  }
        </section>
      </>
    );
  }
  
  export default TeacherViewQuiz