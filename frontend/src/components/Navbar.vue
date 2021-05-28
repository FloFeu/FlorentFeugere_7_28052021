<template>
  <nav>
    <img src="@/assets/img/logo_white.svg" alt="" />
  </nav>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped lang="scss">
@import "@/assets/sass/main";

nav {
  padding: 24px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  img {
    width: 25%;
    border: 1px solid $background;
    border-radius: 50px;
    padding: 7px 15px;
    transition: 150ms background;
    &:hover {
      border: 1px solid $primary-color;
      background: $primary-color;
      cursor: pointer;
    }
  }
}
</style>
