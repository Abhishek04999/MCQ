const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Enable CORS
app.use(cors());
app.use(bodyParser.json());

// ... (rest of your server code)
 // You can change the port as needed

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/admin').then(()=>{
  console.log("connect to db");

});

// Define a schema for your data
const dataSchema = new mongoose.Schema({
  sno: Number,
  subject: String,
  id: Number,
});

const Data = mongoose.model('Data', dataSchema);


const mcqSchema = new mongoose.Schema({
  subject: String,
  mcqs: [{ question: String, options: [String], correctAnswer: String }]
});

const MCQ = mongoose.model('MCQ', mcqSchema);



// Route to save data
app.post('/api/saveData', async (req, res) => {
  try {
    const newData = new Data(req.body);
    await newData.save();
    res.status(201).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.get('/api/getData', async (req, res) => {
  try {
    const data = await Data.find(); // Retrieve all documents from the "Data" collection
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


app.post('/api/saveMCQs', async (req, res) => {
  try {
    const dataToSave = req.body;
    const savedMCQ = await MCQ.create(dataToSave);
    res.json(savedMCQ);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
