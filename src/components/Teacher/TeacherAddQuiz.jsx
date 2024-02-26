import { useState, useEffect } from 'react';
import { addQuiz, getAllSubjects, getAllYears } from '../../../api';
import { useContext } from "react";
import UserContext from "../../../contexts/UserContext";

function TeacherAddQuiz() {
  const [data, setData] = useState([{question:"", correct: "", incorrect1: "", incorrect2: "",incorrect3: "" }])

    const [subjectListObj, setSubjectListObj] = useState([])
    const [yearList, setYearList] = useState([])
    const [choosenSubject, setChoosenSubject] = useState("")
    const [choosenYear, setChoosenYear] = useState("")

    const [newTitle, setNewTitle] = useState("");

    const [isListed, setIslisted] = useState(false)
    const [errorPost, setErrorPost] = useState("")
    
    const { loggedInUser, setLoggedInUser } = useContext(UserContext);

    useEffect(()=>{
      getAllSubjects()
      .then((response)=>{
          setSubjectListObj(response.subjects)
      })
      getAllYears()
      .then((response)=>{
          setYearList(response.years)
      })
      const storedUser = localStorage.getItem("user");
      setLoggedInUser(JSON.parse(storedUser));
  }, [])

  const hanleSubjectChange = (e)=>{
    setChoosenSubject(e.target.value)
   }

   const hanleYearChange = (e)=>{
    setChoosenYear(e.target.value)
   }

   const handleAdd = (e)=>{
    e.preventDefault();

    setData([...data, {question:"", correct: "", incorrect1: "", incorrect2: "",incorrect3: ""}])

}
const handleChange = (e, i)=>{
    e.preventDefault();
    const {name, value} = e.target;
    const onchangeVal = [...data];
    onchangeVal[i][name] = value;
    setData(onchangeVal)

}
const handleDelete = (e,i)=>{
    e.preventDefault()
    const deleteBlock = [...data];
    deleteBlock.splice(i,1)
    setData(deleteBlock)
}
const hanleFormQuizSubmit = (e)=>{
  e.preventDefault();

  const newQuiz = {
      "title": newTitle,
      "subject": choosenSubject,
      "schoolyear": choosenYear,
      "teacher": loggedInUser.userName,
      "quizData": data
  }

 
  addQuiz(newQuiz)
  .then((response)=>{
      if(response.status===201){
          setIslisted(true);
          setNewTitle("");
          setChoosenSubject("");
          setChoosenYear("");
          setData([{question:"", correct: "", incorrect1: "", incorrect2: "",incorrect3: "" }])
      }
  }).catch((err)=>{
      setErrorPost(err)
  })
}


  return (
    <section>
 
       <div className="teacherQuizWrapper">
            
            {errorPost ? <h3 className="errorDisplay">{errorPost}</h3> : null}
            {isListed ? <div> <h3 className='item-listed'>Quiz successfully listed!</h3> </div> : <>
            <h1>Create your own Quiz</h1>

            <form className="teacherQuizForm" onSubmit={hanleFormQuizSubmit}>
                <label className="labelQuizTeahcer" htmlFor="quizTitle">Quiz Title</label>
                <input className="inputTeachersQuiz" type="text"  id="quizTitle" placeholder="Type your Quiz Title" value={newTitle} onChange={e=> setNewTitle(e.target.value)} required/>

                <div className="selectWrapperBox">
                    
                   <div className="subjectWrapper">
            
                <select value={choosenSubject} name="" id="quizSubject" onChange={hanleSubjectChange} required>
                    <option value="null">Choose Subject</option>
                    {subjectListObj.map((subj)=>{
                        return <option key={subj._id} value={subj.subject}>{subj.subject}</option>
                    })}
                </select>
                <i className="fa-solid fa-caret-down icon"></i>
                </div>
                
                 
                <div className="yearWrapper">
                {/* <label className="labelQuizTeahcer" htmlFor="quizYear" >What school year is this Quiz for?</label> */}
                <select value={choosenYear} name="" id="quizYear" onChange={hanleYearChange} required>
                    <option value="null">Choose School Year</option>
                    {yearList.map((year)=>{
                        return <option key={year._id} value={year.year}>Year {year.year}</option>
                    })}

                </select>
                <i className="fa-solid fa-caret-down icon"></i>
                </div>
                </div>
               
                {data.map((val, i)=>{
                    return(<div key={i} className="questionInputBlock">
                        <label className="labelQuizTeahcer" htmlFor="teacherQuestion">Type your question: </label>
                        <input className="inputTeachersQuiz inputQuestionTeacher"id="teacherQuestion" value={val.question} onChange={(e)=>handleChange(e,i)} name="question" required/>
                        <h4 className="answerTitle" >Answers:</h4>
                        <input className="inputAnswers" type="text" placeholder="Correct answer" value={val.correct} onChange={(e)=>handleChange(e,i)} name="correct" required/>
                        <input className="inputAnswers"  type="text" placeholder="Other incorrect answer" value={val.incorrect1} onChange={(e)=>handleChange(e,i)} name="incorrect1" required/>
                        <input className="inputAnswers"  type="text" placeholder="Other incorrect answer" value={val.incorrect2} onChange={(e)=>handleChange(e,i)} name="incorrect2" required/>
                        <input className="inputAnswers"  type="text" placeholder="Other incorrect answer" value={val.incorrect3} onChange={(e)=>handleChange(e,i)} name="incorrect3" required/>
                        <div className="funcBtnWrapper">
                        <button onClick={(e)=> handleDelete(e,i)} className="deleteQBlock">Delete Question Block</button>
                        <button className="addQBtn" onClick={handleAdd}>Add a new Question</button>
                        </div>
                        
                        </div>
                    )

                })}
                 
                 <button className="createBtn">Create the Quiz</button>
            </form></>}
            {/* <p>{JSON.stringify(data)}</p> */}
        </div>
        </section>
    );
  }
  
  export default TeacherAddQuiz