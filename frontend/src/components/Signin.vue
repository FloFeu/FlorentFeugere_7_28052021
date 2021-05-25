<template>
  <form id="signin" class="form">
    <h2>Connexion</h2>

    <div class="line-break"></div>

    <label for="email"><b>Email</b></label>
    <input
      type="email"
      placeholder="Entrez votre email"
      autocomplete="current-email"
      name="email"
      required
    />

    <label for="password"><b>Mot de passe</b></label>
    <input
      type="password"
      placeholder="Entrez votre mot de passe"
      autocomplete="current-password"
      name="password"
      required
    />

    <input type="submit" id="submit" value="CONNEXION" />

    <div class="line-break"></div>

    <router-link class="signin__button" to="/signup">INSCRIPTION</router-link>
  </form>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Signin",
});
</script>

<style lang="scss">
@import "@/assets/sass/main";
#signup {
  margin: 5em auto;
}
.form {
  width: 400px;
  margin: 0 auto;
  padding: 30px;
  border: 1px solid #f1f1f1;
  background: #fff;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
  h2 {
    width: 38%;
    margin: 0 auto;
    padding-bottom: 10px;
  }
  input[type="text"],
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
  input[type="submit"] {
    background-color: $secondary-color;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    cursor: pointer;
    width: 100%;
    &:hover {
      background-color: white;
      color: $black;
      font-weight: 700;
      border: 1px solid $secondary-color;
    }
  }
  .line-break {
    align-items: center;
    border-bottom: 1px solid #dadde1;
    display: flex;
    margin: 20px 16px;
    text-align: center;
  }
  .signin__button {
    font-size: 13px;
    width: 100%;
    padding: 14px 0;
    border: none;
    display: inline-block;
    background-color: green;
    text-decoration: none;
    color: $white;
    &:hover {
      background-color: $white;
      border: 1px solid $secondary-color;
      color: $black;
      font-weight: 700;
    }
  }
}
</style>
