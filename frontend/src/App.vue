<template>
  <Navbar />

  <router-view />

</template>

<script>
import { defineComponent } from "vue";
import Navbar from "@/components/Navbar.vue";

export default defineComponent({
  name: "App",
  components: {
    Navbar,

  },
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,400;0,700;1,400&display=swap");
@import "@/assets/sass/main";

body {
  background-color: $white;
}
* {
  font-family: Roboto;
  text-align: center;
}
</style>
