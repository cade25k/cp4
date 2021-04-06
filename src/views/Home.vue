<template>
<div>
  <h1>Patient Waitlist</h1>
  <div v-if="toEdit">
    <h2>Edit Patient</h2>
    <input v-model="editPatient.name" placeholder="Name">
    <p></p>
    <input v-model="editPatient.gender" placeholder="Gender">
    <p></p>
    <input v-model="editPatient.age" placeholder="Age">
    <p></p>
    <textarea v-model="editPatient.condition" placeholder="Description of Condition"></textarea>
    <br/>
    <button @click="submitEdit(editPatient); toEdit = false">Submit</button>
  </div>
  <div v-else-if="toComplete">
    <h2>Complete</h2>
    <input v-model="completedPatient.name" placeholder="Name">
    <p></p>
    <textarea v-model="completedPatient.condition" placeholder="Diagnosis"></textarea>
    <p></p>
    <input v-model="completedPatient.doctor" placeholder="Doctor">
    <p></p>
    <textarea v-model="completedPatient.treatment" placeholder="Description of Treatment"></textarea>
    <br/>
    <button @click="submitComplete(completedPatient); toComplete = false">Submit</button>
  </div>
  <div v-for="patient in patients" v-bind:key="patient.id">
    <hr>
    <div>
      <div>
        <h2>{{patient.name}}</h2>
        <p>Condition: {{patient.condition}}</p>
      </div>
      <button @click="deletePatient(patient)">Delete</button> |
      <button @click="startEdit(patient)">Edit</button> |
      <button @click="startComplete(patient)">Complete</button>
    </div>
    <br>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'home',
  data() {
    return {
      patients: [],
      toEdit: false,
      toComplete: false,
      editPatient: null,
      completedPatient: {
        _id: '',
        name: '',
        condition: '',
        doctor: '',
        treatment: '',
      },
    }
  },
  created() {
    this.getPatients();
  },
  methods: {
    async getPatients() {
      try {
        let response = await axios.get("/api/patients");
        this.patients = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deletePatient(patient) {
      try {
        await axios.delete("/api/patients/" + patient._id);
        this.getPatients();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async submitEdit(patient) {
      try {
        await axios.put("/api/patients/" + patient._id, {
          name: this.editPatient.name,
          gender: this.editPatient.gender,
          age: this.editPatient.age,
          condition: this.editPatient.condition,
        });
        this.getPatients();
        this.editPatient = false;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    startEdit: function (patient) {
      this.toComplete = false;
      this.toEdit = true;
      this.editPatient = patient;
    },
    startComplete: function (patient) {
      this.toEdit = false;
      this.toComplete = true;
      this.completedPatient._id = patient._id;
      this.completedPatient.name = patient.name;
      this.completedPatient.condition = null;
      this.completedPatient.doctor = null;
      this.completedPatient.treatment = null;
    },
    async submitComplete(patient) {
      try {
        await axios.post("/api/completed", {
          name: patient.name,
          condition: patient.condition,
          doctor: patient.doctor,
          treatment: patient.treatment,
        });
        this.deletePatient(patient);
        this.getPatients();
        this.completedPatient = null;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>
