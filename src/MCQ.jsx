import React, { useState } from 'react';

const DynamicForm = () => {
  const [subjectTitle, setSubjectTitle] = useState('');
  const [numOfQuestions, setNumOfQuestions] = useState(0);
  const [marksForRightAnswer, setMarksForRightAnswer] = useState(0);
  const [questions, setQuestions] = useState([]);

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate textboxes for questions based on the entered number
    const questionTextboxes = Array.from({ length: numOfQuestions }, (_, index) => ({
      id: index + 1,
      question: '',
      options: ['', '', '', ''],
      correctAnswer: '',
    }));

    setQuestions(questionTextboxes);
  };

  const handleQuestionChange = (index, type, value) => {
    const updatedQuestions = [...questions];
    if (type === 'question') {
      updatedQuestions[index].question = value;
    } else if (type === 'option') {
      updatedQuestions[index].options[value.index] = value.text;
    } else if (type === 'correctAnswer') {
      updatedQuestions[index].correctAnswer = value;
    }

    setQuestions(updatedQuestions);
  };

  const handleSubmitMCQs = () => {
    // Customize this function to handle the submission logic (e.g., save to a server or local storage)
    console.log('MCQs Submitted:', {
      subjectTitle,
      numOfQuestions,
      marksForRightAnswer,
      questions,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Subject Title:
          <input type="text" value={subjectTitle} onChange={(e) => handleInputChange(e, setSubjectTitle)} />
        </label>
        <br />
        <label>
          Number of Questions:
          <input
            type="number"
            value={numOfQuestions}
            onChange={(e) => handleInputChange(e, setNumOfQuestions)}
          />
        </label>
        <br />
        <label>
          Marks for Right Answer:
          <input
            type="number"
            value={marksForRightAnswer}
            onChange={(e) => handleInputChange(e, setMarksForRightAnswer)}
          />
        </label>
        <br />
        <button type="submit">Generate Questions</button>
      </form>

      {questions.length > 0 && (
        <div>
          <h2>Create Questions</h2>
          {questions.map((question, index) => (
            <div key={question.id}>
              <label>
                Question {index + 1}:
                <input
                  type="text"
                  value={question.question}
                  onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                />
              </label>
              <br />
              {question.options.map((option, optionIndex) => (
                <div key={optionIndex}>
                  <label>
                    Option {optionIndex + 1}:
                    <input
                      type="text"
                      value={option}
                      onChange={(e) =>
                        handleQuestionChange(index, 'option', { index: optionIndex, text: e.target.value })
                      }
                    />
                  </label>
                </div>
              ))}
              <label>
                Correct Answer:
                <select
                  value={question.correctAnswer}
                  onChange={(e) => handleQuestionChange(index, 'correctAnswer', e.target.value)}
                >
                  {question.options.map((option, optionIndex) => (
                    <option key={optionIndex} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
              <hr />
            </div>
          ))}
          <button onClick={handleSubmitMCQs}>Submit MCQs</button>
        </div>
      )}
    </div>
  );
};

export default DynamicForm;
