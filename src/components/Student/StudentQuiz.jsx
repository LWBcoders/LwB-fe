import { useState, useEffect } from 'react';
import { Link, Routes, Route } from "react-router-dom";
import { useSearchParams } from 'react-router-dom';
import { getAllQuizzes } from '../../../api';

function StudentQuiz({subjectToDisplay, yearsToDisplay}) {

  const [quizList, setQuizList] = useState([]);
  const [isError, setIsError] = useState(null)
  const [subjectQuery, setSubjectQuery] = useState("");
  const [yearQuery, setYearQuery] = useState(null)

  // dropdownStates
  const [yearDropdownClass, setYearDropdownClass] = useState(null)
  const [subjectDropdownClass, setSubjectDropdownClass]= useState(null)

  useEffect(()=>{
    getAllQuizzes(yearQuery, subjectQuery).then((response)=>{
        setQuizList(response.quizzes)
    }).catch((error)=>{
        setIsError({error})
    })
  
}, [yearQuery, subjectQuery ])

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
const hanleSubjectQueryChange = ()=>{
        
}

const hanleYearQueryChange = ()=>{
}

    return (
      <>
       <section className="listOfQuizzes">

    <h1 onClick={showAllQuiz}>List of all Quizzes:</h1>

    <div className="querieswrapper">
      <div className="subjectWrapper subjwrapper-query">

      <div className="queryBox" onClick={subjectDropdownHandle}>Choose Subject  <i className="fa-solid fa-caret-down iconQ"></i> </div>
        <div className={`dropdownQueries ${subjectDropdownClass}`}>
            <ul>
        {subjectToDisplay.map((subj)=>{
            return <li className="queryItem" key={subj._id} value={subj.subject} onClick={e=>handleSubjectClick(e, subj['subject'])}> {subj.subject}</li>
        })}
        </ul>
        </div>



      {/* <select value={subjectQuery} name="" id="quizSubject" onChange={hanleSubjectQueryChange}>
    <option value="null">Choose Subject</option>
    {subjectToDisplay.map((subj)=>{
        return <option key={subj._id} value={subj.subject}>{subj.subject}</option>
    })}
      </select>
    <i className="fa-solid fa-caret-down icon"></i> */}
    </div>

    <div className="yearWrapper yearWrapper-query">
      <div className="queryBox" onClick={yearDropdownHandle}>Choose School Year  <i className="fa-solid fa-caret-down iconQ"></i> </div>
        <div className={`dropdownQueries ${yearDropdownClass}`}>
            <ul>
        {yearsToDisplay.map((year)=>{
            return <li className="queryItem" key={year._id} value={year.year} onClick={e=>handleYearClick(e, year['year'])}>Year {year.year}</li>
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
  
  export default StudentQuiz;