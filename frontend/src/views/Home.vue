<template>
  <div class="home">
    <div class="home__nav">
      <p>Salut</p>
      <p>Salut </p>
    </div>
    <div class="home__main">
      <h4>Posts</h4>
    </div>
    <div class="home__sidebar"></div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Home",
});
</script>

<style lang="scss">
@import '@/assets/sass/main';
.home {
  margin: 4em auto;
  display: grid;
  grid-template:
    "nav . main main main main . sidebar"
    "nav . main main main main . sidebar"
    "nav . main main main main . sidebar";
  
  &__nav{
    grid-area: nav;
    background-color: $white;
    
  }
  &__main{
    grid-area: main;
    background-color: $black;
    color: $white;
  }
  &__sidebar{
    grid-area: sidebar
  }
}
</style>
