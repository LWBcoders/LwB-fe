import ResultQuiz from "./ResultQuiz";
import { useState, useEffect } from 'react';

const reorderAnswers = question =>{
    const answers = [question.correct, ...question.incorrect];
    for(let i=0; i< answers.length; i++){
        const j = Math.floor(Math.random()*i)
        const tmp = answers[i];
        answers[i] = answers[j];
        answers[j] = tmp
    }
    return answers;
}

function StudentQuizGame({quizDataArr, quizObj}) {
    let quizData = [...quizDataArr]
console.log(quizDataArr)
    quizData.map((quiz)=>{
    let incorrect = [];
    incorrect.push(quiz["incorrect1"])
    incorrect.push(quiz.incorrect2)
    incorrect.push(quiz.incorrect3)

    quiz.incorrect = incorrect
   })

   const [err, setErr] = useState(null)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState(quizData[0]);
    const [answers, setAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [countCorrectAnswers, setCountCorrectAnswers] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDone, setIsDone] = useState(false)

    let quizDataLength = quizData.length
  
    
    useEffect(()=>{
        const question = quizData[currentQuestionIndex];
        setCurrentQuestion(question);
        setAnswers(reorderAnswers(question))
    },[currentQuestionIndex])

    const selectedAnswerFunc = answer =>{
        setIsSubmitting(true);
        setSelectedAnswer(answer);

        if(answer === currentQuestion.correct){
            setCountCorrectAnswers(countCorrectAnswers +1);
        }
        setTimeout(()=>{
            const newQuestionIndex = currentQuestionIndex +1;
            if(newQuestionIndex === quizData.length){
                setIsDone(true)
            }else{
                setCurrentQuestionIndex(newQuestionIndex);
                setIsSubmitting(false);
                setSelectedAnswer(null);
            }
        }, 950)
    }
    let diasbledStyles;
    if(isSubmitting){
        diasbledStyles="disabledDiv"
    }else{
        diasbledStyles="" 
    }

  
    if(isDone){
        return(
            <>
            <ResultQuiz quizDataLength={quizDataLength} countCorrectAnswers={countCorrectAnswers}/>
            </>
        )
    }
    if(err){
        return console.log({err}) 
    }

    console.log(quizObj)


    return (
    <section className="quizGameField">
        
        <h1 className="mainTitleQuiz">{quizObj.data.title}</h1>
        <div className="quizDesc"><p>{quizObj.data.subject.toUpperCase()}</p> <p>Year {quizObj.data.schoolyear}</p></div>
          <p className="displayNumberQuestion">Question {currentQuestionIndex + 1}/{quizDataLength}</p>
        <div className="questionBoxWrapper">
                <h3 className="questionQuiz">{currentQuestion.question}</h3>
            <div className={`answersBlock ${diasbledStyles}`}>
                {answers.map((a, i)=>{
                     const isSelectedAndSubmitting = isSubmitting && a === selectedAnswer;
                     let stylesCheck;
                     if(isSelectedAndSubmitting && a === currentQuestion.correct){
                        stylesCheck = "correct"
                     }else if(isSelectedAndSubmitting && a !== currentQuestion.correct){
                        stylesCheck= "incorrect"
                     }else{
                        stylesCheck=""
                     }
                   return <p key={i} className ={`answerQuiz ${stylesCheck}`}  onClick={()=>selectedAnswerFunc(a)}>
                        {a}
                    </p>
                })}

            </div>
        </div>



    </section>)
}

export default StudentQuizGame