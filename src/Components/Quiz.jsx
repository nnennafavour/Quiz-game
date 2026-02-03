// import React from 'react'
// import './Quiz.css'
// import { Data }  from '../assets/Data.js'
// import React, { useState } from 'react';


// const Quiz = () => {

// let [index, setIndex] = useState(0);
// let [question, setQuestion] = useState(Data[index]);

//   return (
//     <div className='container'>
//     <h1>Quiz App</h1>
//     <hr />
//     <h2>{index+1}. {question.question}</h2>
//     <ul>
//         <li>{question.option1}</li>
//         <li>{question.option2}</li>
//         <li>{question.option3}</li>
//         <li>{question.option4}</li>
//     </ul>
//     <button>Next</button>
//     <div className='index'>1 of 5 questions</div>
//     </div>
//   )
// }

// export default Quiz

// import React, { useState } from 'react';
// import './Quiz.css';
// import { Data } from '../assets/Data.js';

// const Quiz = () => {

//   let [index, setIndex] = useState(0);
//   let [question, setQuestion] = useState(Data[index]);

//   const checkAns = (e,ans) => {
//     if (question.ans===ans) {
//         e.target.classList.add('correct');
//     }
//     else {
//         e.target.classList.add('wrong');
//     }   
//   }

//   return (
//     <div className='container'>
//       <h1>Quiz App</h1>
//       <hr />
//       <h2>{index+1}. {question.question}</h2>
//       <ul>
//         <li onClick={(e)=>{checkAns(e,1)}}>{question.option1}</li>
//         <li onClick={(e)=>{checkAns(e,2)}}>{question.option2}</li>
//         <li onClick={(e)=>{checkAns(e,3)}}>{question.option3}</li>
//         <li onClick={(e)=>{checkAns(e,4)}}>{question.option4}</li>
//       </ul>
//       <button>Next</button>
//       <div className='index'>1 of 5 questions</div>
        
//     </div>
//   )
// }

// export default Quiz;


// import { useState } from 'react';
// import './Quiz.css';
// import { Data } from '../assets/Data.js';

// const Quiz = () => {

//   const [index, setIndex] = useState(0);
//   const [question, setQuestion] = useState(Data[index]);
//   const [answered, setAnswered] = useState(false);

//   const checkAns = (e, selectedOption) => {
//     if (answered) return; // prevent multiple clicks
//     setAnswered(true);

//     if (selectedOption === question.answer) {
//       e.target.classList.add('correct');
//     } else {
//       e.target.classList.add('wrong');
//     }
//   };

//   return (
//     <div className='container'>
//       <h1>Quiz App</h1>
//       <hr />
//       <h2>{index + 1}. {question.question}</h2>

//       <ul>
//         <li onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
// <li onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
// <li onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
// <li onClick={(e) => checkAns(e, 4)}>{question.option4}</li>

//       </ul>

//       <button>Next</button>
//       <div className='index'>
//         {index + 1} of {Data.length} questions
//       </div>
//     </div>
//   );
// };

// export default Quiz;



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
