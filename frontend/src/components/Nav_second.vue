<template>
  <div
    class="profile__header editProfile__header"
    :class="{ sticky: isSticky }"
  >
    <router-link :to="{ name: 'Home' }"
      ><font-awesome-icon class="icon" :icon="['fas', 'arrow-left']" size="2x"
    /></router-link>
    <button
      v-if="this.$route.path == '/settings/profile'"
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
.sticky {
  position: sticky;
  top: 0;
}
</style>
