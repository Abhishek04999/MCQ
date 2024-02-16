import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Loginsignup from './Loginsignup.jsx';
import MCQ from './MCQ.jsx';
import MCQTEST from './MCQTEST.jsx';
import Subject from './Subject.jsx';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* <Route path="/login" element={<Loginsignup />} /> */}
          {/* <Route path="/mcq" element={<MCQ />} /> */}
          <Route path="/subject" element={<Subject />} />
          <Route path="/mcqtest" element={<MCQTEST />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
