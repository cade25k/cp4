<template>
<div>
  <h1>Doctor Clock-In</h1>
  <form v-if="creating" @submit.prevent="addDoctor">
    <input v-model="name" placeholder="Name">
    <p></p>
    <input v-model="password" placeholder="Password">
    <br />
    <button type="submit">Clock In</button>
  </form>
  <div v-else>
    <p>Thank you! You are clocked in!</p>
    <p><a @click="toggleForm" href="#">Click here for another clock in.</a></p>
  </div>
  <hr>
  <div>
    <h1>Doctors Currently In</h1>
    <div v-for="doctor in doctors" :key="doctor.id">
      <h2>Dr. {{doctor.name}}</h2>
      <button @click="deleteDoctor(doctor)">Clock Out</button>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Doctor',
  data() {
    return {
      creating: true,
      name: '',
      password: '',
      doctors: [],
    }
  },
  created() {
    this.getDoctors();
  },
  methods: {
    toggleForm() {
      this.creating = !this.creating;
    },
    async addDoctor() {
      try {
        await axios.post("/api/doctor", {
          name: this.name,
          password: this.password
        });
        this.name = "";
        this.password = "";
        this.creating = false;
        this.getDoctors();
        return true;
      } catch (error) {
        console.log(error);
      }

    },
    async getDoctors() {
      try {
        let response = await axios.get("/api/doctors");
        this.doctors = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteDoctor(doctor) {
      try {
        await axios.delete("/api/doctors/" + doctor._id);
        this.getDoctors();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
input {
  font-size: 1.2em;
  height: 30px;
  width: 200px;
}

textarea {
  font-size: 1.6em;
  width: 100%;
  max-width: 500px;
  height: 100px;
}

button {
  margin-top: 20px;
  font-size: 1.2em;
}
</style>
