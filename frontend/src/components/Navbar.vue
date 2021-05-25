<template>
  <div id="nav">
    <a href="index.html"><img src="@/assets/logo_white.svg" alt="logo" /></a>
    <router-link to="/"> Accueil </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Navbar",
});
</script>

<style scoped lang="scss">
@import "@/assets/sass/main";
#nav {
  background-color: black;
  margin: 0;
  padding: 2em;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 200px;
    border: 1px solid $black;
    border-radius: 25px;
    padding: 6px;
    transition: border, background-color 100ms;
    &:hover {
      cursor: pointer;
      border: 1px solid $secondary-color;
      border-radius: 25px;
      padding: 6px;
      background-color: $secondary-color;
    }
  }
  a {
    color: white;
    text-decoration: none;
    font-weight: 700;
    font-size: 20px;
    &:hover {
      color: $secondary-color;
    }
  }
  a.router-link-exact-active {
    border-bottom: 3px solid $secondary-color;
  }
}
</style>
