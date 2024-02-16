import React, { useState } from 'react';

const AddMCQForm = () => {
  const [subject, setSubject] = useState(''); // State for the selected subject
  const [questions, setQuestions] = useState([{ question: '', options: ['', '', '', ''], correctAnswer: '' }]);

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

  const handleSubjectChange = (value) => {
    setSubject(value);
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

  const handleSubmit = () => {
    // Create an object containing both subject and MCQs
    const dataToSubmit = {
      subject: subject,
      mcqs: questions,
    };

    // Implement the logic to save the data, e.g., send it to a server or store it in local storage
    console.log('Data submitted:', dataToSubmit);
  };

  return (
    <div>
      <div className="mb-3">
        <label htmlFor="subject" className="form-label">
          Select Subject
        </label>
        <select
          className="form-select"
          id="subject"
          value={subject}
          onChange={(e) => handleSubjectChange(e.target.value)}
        >
          <option value="">Select a Subject</option>
          <option value="math">Math</option>
          <option value="science">Science</option>
          {/* Add more subjects as needed */}
        </select>
      </div>

      {questions.map((mcq, index) => (
        <div key={index}>
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
              <div key={optionIndex} className="mb-3">
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

