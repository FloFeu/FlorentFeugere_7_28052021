<template>
  <div class="home">
    <div class="home__nav">
      <p>Salut</p>
      <p>Salut</p>
    </div>
    <div class="home__main">
      <h1>Fil d'actualité</h1>
      <div class="line-break"></div>

      <Post v-for="post in posts" :key="post.id" :post="post" />
    </div>
    <div class="home__sidebar"></div>
  </div>
</template>

<script>
import Post from "@/components/Post.vue";

export default {
  name: "Home",
  components: {
    Post,
  },
  data() {
    return {
      posts: [
        {
          id: 1,
          firstName: "Florent",
          lastName: "Feugère",
          msg:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a sem scelerisque, tempor sapien lobortis, sagittis neque. In purus justo, pellentesque et tincidunt id, scelerisque a augue. Phasellus iaculis mi non lectus suscipit, nec venenatis proin.",
        },
        {
          id: 2,
          firstName: "Zaza",
          lastName: "Youpi",
          msg:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a sem scelerisque, tempor sapien lobortis, sagittis neque. In purus justo, pellentesque et tincidunt id, scelerisque a augue. Phasellus iaculis mi non lectus suscipit, nec venenatis proin.",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/main";
.home {
  margin: 4em auto;
  display: grid;
  grid-template:
    "nav main sidebar"
    "nav main sidebar"
    "nav main sidebar";
  grid-template-columns: 1fr 4fr 1fr;
  grid-column-gap: 1em;
  &__nav {
    grid-area: nav;
    background-color: $white;
  }
  &__main {
    grid-area: main;
    background-color: $black;
    color: $white;
    .line-break {
      @include line-break;
    }
  }
  &__sidebar {
    grid-area: sidebar;
    background-color: $error;
  }
}
</style>
