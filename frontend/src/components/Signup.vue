<template>
  <div id="signup" class="form">
    <form @submit.prevent="checkForm">
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
      
      <p v-if="errors.length" class="form__error">
        Veuillez corriger les erreurs suivantes :
        <ul>
          <li v-for="(error, key) in errors" :key="key">{{ error }}</li>
        </ul>
      </p>

    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Signup",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      errors: [],
    };
  },
  methods: {
    checkForm() {
      const repw = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/;
      this.errors= [];
      if (!this.firstName) {
        this.errors.push("Veuillez renseigner votre prénom.")
      }
      if (!this.lastName) {
        this.errors.push("Veuillez renseigner votre nom.")
      }
      if (!this.email) {
        this.errors.push("Veuillez renseigner votre email.")
      }
      if (!this.password) {
        this.errors.push("Veuillez rentrer un mot de passe.")
      } else if (repw.test(this.password) == false) {
        this.errors.push(
          "Votre mot de passe doit contenir 8 à 15 caractères, au moins une majuscule, un chiffre et un caractère spécial ($ @ % * + - _ !)"
        )
      }

      if (!this.errors.length) {
        axios.post("http://localhost:3000/api/auth/signup", {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          console.log(response.data);
          alert("Inscription effectuée !");
          this.$router.push("/")
        })
        .catch((error) => {
          console.log(error);
        });
      }
    },
    // submitForm() {
    //   axios.post("http://localhost:3000/api/auth/signup", {
    //       firstName: this.firstName,
    //       lastName: this.lastName,
    //       email: this.email,
    //       password: this.password,
    //     })
    //     .then((response) => {
    //       console.log(response.data);
    //       alert("Inscription effectuée !");
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // },
  },
};
</script>
