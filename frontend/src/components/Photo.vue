<template>
  <div v-if="revele" class="bloc-photo">
    <div @click="togglePopUp" class="photo__overlay"></div>

    <div class="bloc-photo__card">
      <div @click="togglePopUp" class="bloc-photo__card__btn">X</div>
      <img :src="photo" alt="post attachment" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Photo",
  props: ["revele", "togglePopUp", "photo"],
};
</script>

<style lang="scss">
@import "@/assets/sass/main";
.bloc-photo {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 1);
  z-index: 1;

  .photo__overlay {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
  }
  &__card {
    margin: 1em;
    @include desktop {
      width: fit-content;
    }
    img {
      max-width: 95%;
    }
  }
}
</style>
