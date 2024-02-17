import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; 
const AddMCQForm = () => {

  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  const location = useLocation();
  const subject = new URLSearchParams(location.search).get('subject');


  const handleButtonAction = (action) => {
    if (action === 'add') {
      const updatedQuestions = [...questions, { question: '', options: ['', '', '', ''], correctAnswer: '' }];
      setQuestions(updatedQuestions);
    } else if (action === 'remove' && questions.length > 1) {
      const updatedQuestions = [...questions];
      updatedQuestions.pop();
      setQuestions(updatedQuestions);
    }
  };

 

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value.trim(); // Trim leading and trailing spaces
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleCorrectAnswerChange = (questionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].correctAnswer = value;
    setQuestions(updatedQuestions);
  };

  const removeQuestion = (index) => {
    if (questions.length > 1) {
      const updatedQuestions = [...questions];
      updatedQuestions.splice(index, 1);
      setQuestions(updatedQuestions);
    }
  };

  const handleSubmit = async () => {
    const dataToSubmit = {
      subject: subject,
      mcqs: questions,
    };

    try {
      // Make a POST request to the server to save MCQs
      const response = await axios.post('http://localhost:3001/api/saveMCQs', dataToSubmit);
      console.log('Data submitted:', response.data);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };
  return (
    <div>
      <div className="mb-3">
      <div className="form-control" id="subject">
  Subject: {subject}
</div>
      </div>

      {questions.map((mcq, index) => (
        <div className='card' key={index}>
          <div className="mb-3">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => removeQuestion(index)}
            >
              ✖
            </button>
            <label htmlFor={`question${index}`} className="form-label">
              Question {index + 1}
            </label>
            <textarea
              className="form-control"
              id={`question${index}`}
              value={mcq.question}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
            />
          </div>
          <div id={`optionsContainer${index}`} className="mb-3">
            <h4>Options :</h4>
            {mcq.options.map((option, optionIndex) => (
              <div key={optionIndex} className="mb-3" >
                <label htmlFor={`option${index}_${optionIndex}`} className="form-label">
                  Option {optionIndex + 1}
                </label>
                <input
                  type="text"
                  className="form-control"
                  id={`option${index}_${optionIndex}`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, optionIndex, e.target.value)}
                />
              </div>
            ))}
          </div>
          <div className="mb-3">
            <label htmlFor={`correctAnswer${index}`} className="form-label">
              Correct Answer
            </label>
            <select
              className="form-select"
              id={`correctAnswer${index}`}
              value={mcq.correctAnswer}
              onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
            >
              {mcq.options.map((option, optionIndex) => (
                <option key={optionIndex} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
      <div className="mb-3">
        <button type="button" className="btn btn-primary" onClick={() => handleButtonAction('add')}>
          +
        </button>
        <span className="mx-2">{questions.length} </span>
        <button type="button" className="btn btn-danger" onClick={() => handleButtonAction('remove')}>
          -
        </button>
      </div>
      <button type="button" className="btn btn-success" onClick={handleSubmit}>
        Submit Data
      </button>
    </div>
  );
};

export default AddMCQForm;
