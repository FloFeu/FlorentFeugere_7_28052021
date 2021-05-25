<template>
  <h1>Bienvenue sur Groupomania</h1>
  <p>Connectez vous</p>
  <div class="sign">
    <Signin />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Signin from "@/components/Signin.vue";

export default defineComponent({
  name: "Connect",
  components: {
    Signin,
  }
});
</script>

<style lang="scss">
@import "@/assets/sass/main";
.sign {
  &__nav {
    display: flex;
    justify-content: space-between;
  }
  margin: auto;
}
</style>
