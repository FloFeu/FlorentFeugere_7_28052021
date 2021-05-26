<template>
  <div id="nav">
    <router-link :to="{ name: 'Connect' }"
      ><img src="@/assets/logo_white.svg" alt="logo"
    /></router-link>
    <ul>
      <router-link :to="{ name: 'Home' }"> Accueil </router-link>
    </ul>
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
  background-color: $black;
  margin: 0;
  padding: 1em;
  color: $white;
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
      border: 1px solid $primary-color;
      border-radius: 25px;
      padding: 6px;
      background-color: $primary-color;
    }
  }
  a {
    color: white;
    text-decoration: none;
    font-weight: 700;
    font-size: 20px;
    &:hover {
      color: $primary-color;
    }
  }
  a.router-link-exact-active {
    border-bottom: 3px solid $primary-color;
  }
}
</style>
