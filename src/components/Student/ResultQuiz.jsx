
function ResultQuiz({countCorrectAnswers, quizDataLength}) {
    return ( <>
    <div className="resultQuizWrapper">
            <h2 className="correctAnswersDisplay">You have {countCorrectAnswers}/{quizDataLength} correct answers!</h2>
        </div>
    </> );
}

export default ResultQuiz;