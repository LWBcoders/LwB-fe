
function ResultQuiz({countCorrectAnswers, quizDataLength}) {
    return ( <section className="resultQuizSection">
        <div className="resultQuizWrapper">
            <h2 className="correctAnswersDisplay">You have {countCorrectAnswers}/{quizDataLength} correct answers!</h2>
        </div>
    </section> );
}

export default ResultQuiz;