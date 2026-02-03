
import { useState } from 'react';
import './Quiz.css';
import { Data } from '../assets/Data.js';
const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const question = Data[index];
  const correctAnswer = Number(question.ans);

  const checkAns = (optionIndex) => {
    if (selected !== null) return;

    setSelected(optionIndex);

    if (optionIndex === correctAnswer) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (index === Data.length - 1) {
      setShowResult(true);
    } else {
      setIndex(index + 1);
      setSelected(null);
    }
  };

  // 🎉 RESULT SCREEN
  if (showResult) {
    return (
      <div className="container">
        <h1>Quiz Completed 🎉</h1>
        <hr />
        <h2>
          You scored {score} out of {Data.length}
        </h2>
        <p style={{ textAlign: 'center', marginTop: '10px' }}>
          Percentage: {(score / Data.length) * 100}%
        </p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      <h2>{index + 1}. {question.question}</h2>

      <ul>
        {[question.option1, question.option2, question.option3, question.option4].map(
          (option, i) => {
            const optionNumber = i + 1;

            let className = '';
            if (selected !== null) {
              if (optionNumber === correctAnswer) {
                className = 'correct';
              } else if (optionNumber === selected) {
                className = 'wrong';
              }
            }

            return (
              <li
                key={i}
                className={className}
                onClick={() => checkAns(optionNumber)}
              >
                {option}
              </li>
            );
          }
        )}
      </ul>

      <button onClick={nextQuestion} disabled={selected === null}>
        {index === Data.length - 1 ? 'Finish' : 'Next'}
      </button>

      <div className="index">
        {index + 1} of {Data.length} questions
      </div>
    </div>
  );
};

export default Quiz;
