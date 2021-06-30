<template>
  <div v-if="revele" class="bloc-modale">
    <div @click="togglePopUp" class="overlay"></div>

    <div class="bloc-modale__card">
      <div @click="togglePopUp" class="bloc-modale__card__btn">X</div>
      <p @click="deletePost">
        <font-awesome-icon class="icon" :icon="['fas', 'trash']" />
        Supprimer
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "PopUp",
  props: ["revele", "togglePopUp"],
  methods: {
    deletePost() {
      this.$emit("deletePost");
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/main";
.bloc-modale {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .overlay {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
  }
  &__card {
    @include desktop {
      width: 600px;
    }
    background-color: $background;
    padding: 0.7em 1em;
    position: fixed;
    bottom: 1em;
    width: 90%;
    border-radius: 5px;
    box-shadow: 0 0 3px rgba(255, 255, 255, 0.12),
      0 0 3px rgba(255, 255, 255, 0.24);
    &__btn {
      position: absolute;
      top: 10px;
      right: 10px;
      color: $error;
    }
    p {
      padding: 1em 0;
      .icon {
        margin-right: 1em;
        path {
          fill: lighten($surface, 25%);
        }
      }
    }
  }
}
</style>
