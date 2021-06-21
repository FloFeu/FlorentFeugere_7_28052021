<template>
  <div>
    <img
      class="login__logo"
      src="@/assets/img/logo_purple.svg"
      alt="logo du site"
    />

    <div class="card">
      <h1 class="card__title" v-if="mode == 'login'">Connexion</h1>
      <h1 class="card__title" v-else>Inscription</h1>
      <p class="card__subtitle" v-if="mode == 'login'">
        Tu n'as pas encore de compte ?
        <span class="card__action" @click="switchToCreateAcccount"
          >Créer un compte</span
        >
      </p>
      <p class="card__subtitle" v-else>
        Tu as déjà un compte ?
        <span class="card__action" @click="switchToLogin()">Se connecter</span>
      </p>
      <div class="form-row">
        <input
          v-model="email"
          class="form-row__input"
          type="text"
          placeholder="Adresse mail"
        />
      </div>
      <div class="form-row" v-if="mode == 'create'">
        <input
          v-model="firstName"
          class="form-row__input"
          type="text"
          placeholder="Prénom"
        />
        <input
          v-model="lastName"
          class="form-row__input"
          type="text"
          placeholder="Nom"
        />
      </div>
      <div class="form-row">
        <input
          @focus="onFocus()"
          @blur="onFocus()"
          v-model="password"
          class="form-row__input"
          type="password"
          placeholder="Mot de passe"
        />
      </div>
      <div class="form-row" v-if="mode == 'login' && status == 'error_login'">
        Adresse mail et/ou mot de passe invalide.
      </div>
      <div class="form-row" v-if="mode == 'create' && status == 'error_create'">
        Adresse mail déjà utilisée.
      </div>
      <div class="form-row__instructions" v-if="mode == 'create' && focus">
        Votre mot de passe doit contenir 8 à 15 caractères, au moins une
        majuscule, un chiffre et un caractère spécial ($ @ % * + - _ !)
      </div>
      <div class="form-row">
        <button
          @click="login()"
          class="button"
          :class="{ 'button--disabled': !validatedFields }"
          v-if="mode == 'login'"
        >
          <span v-if="status == 'loading'">Connexion en cours...</span>
          <span v-else>Connexion</span>
        </button>
        <button
          @click="createAccount()"
          class="button"
          :class="{ 'button--disabled': !validatedFields }"
          v-else
        >
          <span v-if="status == 'loading'">Création en cours...</span>
          <span v-else>Créer mon compte</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      mode: "login",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      focus: false,
    };
  },
  computed: {
    validatedFields() {
      const repw =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[-+!*$@%_])([-+!*$@%_\w]{8,15})$/;
      if (this.mode == "create") {
        if (
          this.email != "" &&
          this.firstName != "" &&
          this.nom != "" &&
          this.password != ""
        ) {
          if (repw.test(this.password) == true) {
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        if (this.email != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      }
    },
    ...mapState(["status"]),
  },
  methods: {
    onFocus() {
      this.focus = !this.focus;
    },
    switchToCreateAcccount() {
      this.mode = "create";
    },
    switchToLogin() {
      this.mode = "login";
    },
    createAccount() {
      this.$store
        .dispatch("createAccount", {
          email: this.email,
          firstName: this.firstName,
          lastName: this.lastName,
          password: this.password,
        })
        .then((response) => {
          this.login();
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    login() {
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          this.$router.push({ name: "Home" });
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/main";
.login__logo {
  margin-top: 1em;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  max-width: 600px;
  @include desktop{
    margin-top: 5em;
  }
}
.form-row {
  display: flex;
  margin: 16px 0px;
  gap: 16px;
  flex-wrap: wrap;
  &__instructions {
    font-size: 12px;
  }
  &__input {
    padding: 8px;
    border: none;
    border-radius: 8px;
    background: #f2f2f2;
    font-weight: 500;
    font-size: 16px;
    flex: 1;
    min-width: 100px;
    color: black;
    &::placeholder {
      color: $black;
    }
  }
}
</style>
