<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,400;0,700;1,400&display=swap");
@import "@/assets/sass/main";

* {
  color: $white;
  font-family: Roboto;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: $background;
}

// Style cartes Login
.card {
  margin: auto;
  margin-top: 10em;
  max-width: 100%;
  width: 540px;
  background: $surface;
  border-radius: 16px;
  padding: 32px;
  &__title {
    text-align: center;
    font-weight: 800;
  }
  &__subtitle {
    text-align: center;
    color: $white;
    font-weight: 500;
  }
  &__action {
    color: $primary-color;
    text-decoration: underline;
    &:hover {
      cursor: pointer;
    }
  }
  .button {
    background: $primary-color;
    color: white;
    border-radius: 8px;
    font-weight: 800;
    font-size: 15px;
    border: none;
    width: 100%;
    padding: 16px;
    transition: 0.4s background-color;
    &:hover {
      cursor: pointer;
      background: darken($primary-color, 10%);
    }
  }
  .button--disabled {
    background: lighten($error, 20%);
    color: $white;
    &:hover {
      cursor: not-allowed;
      background: lighten($error, 20%);
    }
  }
}
</style>
