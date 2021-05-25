<template>
  <div id="signup" class="form">
    <h2>Inscription</h2>

    <div class="line-break"></div>

    <label for="firstName"><b>Prénom</b></label>
    <input type="text" placeholder="Entrez votre prénom" name="firstName" />

    <label for="lastName"><b>Nom</b></label>
    <input type="text" placeholder="Entrez votre nom" name="lastName" />

    <label for="email"><b>Email</b></label>
    <input
      type="email"
      placeholder="Entrez votre email"
      name="email"
      required
    />

    <label for="password"><b>Mot de passe</b></label>
    <input
      type="password"
      autocomplete="current-password"
      placeholder="Entrez votre mot de passe"
      name="password"
      required
    />

    <input type="submit" id="submit" value="INSCRIPTION" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "Signup",
});
</script>
