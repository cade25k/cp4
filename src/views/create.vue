<template>
<div>
  <h1>New Patient</h1>
  <form v-if="creating" @submit.prevent="addPatient">
    <input v-model="name" placeholder="Name">
    <p></p>
    <input v-model="gender" placeholder="Gender">
    <p></p>
    <input v-model="age" placeholder="Age">
    <p></p>
    <textarea v-model="condition" placeholder="Description of Condition"></textarea>
    <br/>
    <button type="submit">Submit</button>
  </form>
  <div v-else>
    <p>Thank you! A doctor will be with you soon!</p>
    <p><a @click="toggleForm" href="#">Click here for another patient.</a></p>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Create',
  data() {
    return {
      creating: true,
      name: '',
      condition: '',
      gender: '',
      age: '',
    }
  },
  methods: {
    toggleForm() {
      this.creating = !this.creating;
    },
    async addPatient() {
      try {
        await axios.post("/api/patient", {
          name: this.name,
          condition: this.condition,
          gender: this.gender,
          age: this.age
        });
        this.name = "";
        this.condition = "";
        this.gender = "";
        this.age = "";
        this.creating = false;
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
