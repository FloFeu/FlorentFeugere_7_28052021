<template>
  <User class="profile" v-for="user in users" :key="user.userId" :user="user" />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "Profile",
  data() {
    return {
      users: [
        {
          userId: 1,
          firstName: "Florent",
          lastName: "Feugère",
          bio: "Pas grand chose à dire, j'aime pas discuter.",
          avatar: "@/assets/img/itsame.jpg",
        },
      ],
    };
  },
});
</script>

<style></style>
