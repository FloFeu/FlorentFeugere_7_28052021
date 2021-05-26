<template>
  <div id="signup" class="form">
    <form @submit.prevent="submitForm">
      <h2>Inscription</h2>

      <div class="line-break"></div>

      <label for="firstName"><b>Prénom</b></label>
      <input
        v-model="firstName"
        type="text"
        placeholder="Entrez votre prénom"
        name="firstName"
      />

      <label for="lastName"><b>Nom</b></label>
      <input
        v-model="lastName"
        type="text"
        placeholder="Entrez votre nom"
        name="lastName"
      />

      <label for="email"><b>Email</b></label>
      <input
        v-model="email"
        type="email"
        placeholder="Entrez votre email"
        name="email"
        required
      />

      <label for="password"><b>Mot de passe</b></label>
      <input
        v-model="password"
        type="password"
        placeholder="Entrez votre mot de passe"
        name="password"
        required
      />

      <input type="submit" id="submit" value="INSCRIPTION" />
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default ({
  name: "Signup",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
  },
  methods: {
    submitForm() {
      axios.post('http://localhost:3000/api/auth/signup', {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password
      })
      .then(response => {
        console.log(response.data)
      })
      .catch(error => {
        console.log(error)
      })
    },
  },
});
</script>
