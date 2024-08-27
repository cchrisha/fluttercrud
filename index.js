const express = require('express');
const mongoose = require('mongoose');
const app = express();

//Import for model schema
const Student = require('./models/student.model.js');

//Middleware to use json
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Create Api
app.post('/api/createStudents',  async (req, res) => {
    try {
      const student = await Student.create(req.body);
      res.status(200).json(student);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

//Read Api
//All data request
app.get('/api/getStudents', async (req, res) => {
    try {
      const students = await Student.find();
      res.status(200).json(students);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
//1 data request
app.get('/api/getStudents/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const student = await Student.findById(id);
      res.status(200).json(student);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

//Update Api
app.put('/api/updateStudent/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const student = await Student.findByIdAndUpdate(id, req.body);
  
      if (!student) {
        return res.status(404).json({ message: `No Student with id: ${id}` });
      }
  
      const updatedStudent = await Student.findById(id);
      res.status(200).json(updatedStudent);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

//Delete Api
app.delete('/api/deleteStudent/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      const student = await Student.findByIdAndDelete(id);
  
      if (!student) {
        return res.status(404).json({ message: `No Student with id:` });
      }
  
      res.status(200).json({ message: "Student deleted successfully!" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

//DB and port connection
mongoose.connect("mongodb+srv://repatochrishamae:gTFNyQRuZB6Guugm@flutterdb.05ib6.mongodb.net/?retryWrites=true&w=majority&appName=flutterDB")
.then(() => {
    console.log("Connected to Database")
    app.listen(3000, ()=>{
        console.log('Server is running on port 3000');
    });
})
.catch((err) => {
    console.log("Connection failed")
})