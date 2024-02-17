import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Table = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newSubject, setNewSubject] = useState('');
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []); // Run this effect only once, similar to componentDidMount

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/getData');

      if (response.ok) {
        const fetchedData = await response.json();
        setData(fetchedData);
      } else {
        const errorData = await response.json();
        console.error('Failed to fetch data:', errorData.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleButtonClick = (selectedSubject) => {
    navigate(`/mcqtest?subject=${selectedSubject}`);
  };


  const handleAddSubject = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/saveData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sno: data.length + 1,
          subject: newSubject,
          id: Date.now(),
        }),
      });

      if (response.ok) {
        fetchData(); // Fetch data again after adding a new subject
        setModalVisible(false);
        setNewSubject('');
      } else {
        const errorData = await response.json();
        console.error('Failed to save data:', errorData.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={() => setModalVisible(true)}>Add Subject</button>
      <table>
        <thead>
          <tr>
            <th>Sno</th>
            <th>Subject</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.sno}</td>
              <td>{item.subject}</td>
              <td>
              <button onClick={() => handleButtonClick(item.subject)}>
        Add Question
      </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {modalVisible && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setModalVisible(false)}>
              &times;
            </span>
            <h2>Add Subject</h2>
            <input
              type="text"
              placeholder="Enter Subject"
              value={newSubject}
              onChange={(e) => setNewSubject(e.target.value)}
            />
            <button onClick={handleAddSubject}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
// this sis dfjadsljfjkshgsdajdgsahgsjakjkasdhsljfsailjfsadkljfsilf