import { Link } from "react-router-dom";
function ResultQuiz({countCorrectAnswers, quizDataLength, pathToAllQuiz}) {
    return ( 
    <section className="resultQuizSection">
        <Link className="restartQuiz" to={pathToAllQuiz}>Choose and play a new Quiz</Link>
        <div className="resultQuizWrapper">
            <h2 className="correctAnswersDisplay">You have {countCorrectAnswers}/{quizDataLength} correct answers!</h2>
        </div>
    </section> );
}

export default ResultQuiz;