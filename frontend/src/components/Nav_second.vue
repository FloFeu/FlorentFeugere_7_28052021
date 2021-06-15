<template>
  <div
    class="profile__header editProfile__header"
    :class="{ sticky: isSticky }"
  >
    <router-link :to="{ name: 'Home' }"
      ><font-awesome-icon class="icon" :icon="['fas', 'arrow-left']" size="2x"
    /></router-link>
    <button
      v-if="this.$route.name == 'EditProfile'"
      @click.prevent="$emit('update')"
    >
      Enregistrer
    </button>
  </div>
</template>

<script>
export default {
  name: "Nav_second",
  data() {
    return {
      isSticky: false,
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/main";
.profile {
  &__header {
    background-color: $surface;
    display: flex;
    align-items: center;
    a {
      .icon {
        width: 2em;
        path {
          fill: $primary-color;
        }
      }
    }
  }
}

.editProfile {
  &__header {
    height: 4em;
    display: flex;
    justify-content: space-between;
    padding-right: 1em;
    button {
      background-color: $primary-color;
      border: none;
      border-radius: 25px;
      color: $white;
      font-weight: 700;
      padding: 0.7em 2em;
      &:active {
        transform: scale(0.9);
        color: lightgray;
      }
    }
  }
}
.sticky {
  position: sticky;
  top: 0;
}
</style>
