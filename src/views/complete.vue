<template>
<div>
  <h1>Completed</h1>
  <div v-for="patient in completed" v-bind:key="patient.id">
    <hr>
    <div>
      <div>
        <h2>{{patient.name}}</h2>
        <p>Diagnosis: {{patient.condition}}</p>
        <p>Doctor: Dr. {{patient.doctor}}</p>
        <p>Treatment: {{patient.treatment}}</p>
      </div>
      <button @click="deleteCompleted(patient)">Delete</button>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Complete',
  data() {
    return {
      completed: [],
    }
  },
  created() {
    this.getCompleted();
  },
  methods: {
    async getCompleted() {
      try {
        let response = await axios.get("/api/completed");
        this.completed = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteCompleted(patient) {
      try {
        await axios.delete("/api/completed/" + patient._id);
        this.getCompleted();
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>
