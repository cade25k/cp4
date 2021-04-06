const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');


const doctorSchema = new mongoose.Schema({
  name: String,
  password: String,
}, {collection: 'doctors'});

const patientSchema = new mongoose.Schema({
  name: String,
  gender: String,
  age: String,
  condition: String,
}, {collection: 'patients'});

const completeSchema = new mongoose.Schema({
  name: String,
  condition: String,
  doctor: String,
  treatment: String,
}, {collection: 'completed'});

const Doctor = mongoose.model('Doctor', doctorSchema);
const Patient = mongoose.model('Patient', patientSchema);
const Complete = mongoose.model('Complete', completeSchema);

mongoose.connect('mongodb://localhost:27017/doctor', {
  useNewUrlParser: true
});

app.post('/api/doctor', async (req, res) => {
  const doctor = new Doctor({
    name: req.body.name,
    password: req.body.password
  });
  try {
    await doctor.save();
    res.send(doctor);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/doctors', async (req, res) => {
  try {
    let doctors = await Doctor.find();
    res.send(doctors);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/doctors/:id', async (req, res) => {
  try {
    await Doctor.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.post('/api/patient', async (req, res) => {
  const patient = new Patient({
    name: req.body.name,
    gender: req.body.gender,
    age: req.body.age,
    condition: req.body.condition
  });
  try {
    await patient.save();
    res.send(patient);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/patients', async (req, res) => {
  try {
    let patients = await Patient.find();
    res.send(patients);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/patients/:id', async (req, res) => {
  try {
    await Patient.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/patients/:id', async (req, res) => {
  try {
    let patient = await Patient.findOne({_id: req.params.id});
    patient.name = req.body.name;
    patient.gender = req.body.gender;
    patient.age = req.body.age;
    patient.condition = req.body.condition;
    patient.save();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/completed', async (req, res) => {
  const complete = new Complete({
    _id: req.body._id,
    name: req.body.name,
    condition: req.body.condition,
    doctor: req.body.doctor,
    treatment: req.body.treatment
  });
  try {
    await complete.save();
    res.send(complete);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/completed', async (req, res) => {
  try {
    let patients = await Complete.find();
    res.send(patients);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/completed/:id', async (req, res) => {
  try {
    await Complete.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
