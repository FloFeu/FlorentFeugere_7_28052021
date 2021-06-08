<template>
  <div>
    <router-link :to="{ name: 'Home' }"> Accueil </router-link>
    {{ post.msg }}
    {{ post.postId }}
    {{ dateTime(post.postDate) }}
    <img :src="post.PostAttachment" alt="" />
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "PostDetails",
  data() {
    return {
      post: {},
    };
  },
  props: {
    id: String,
  },
  methods: {
    dateTime(value) {
      return moment(value).locale("fr").calendar();
    },
  },
  created() {
    this.$store
      .dispatch("getOnePost", this.id)
      .then((response) => {
        console.log(response);
        this.post = response;
        console.log(this.post);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style>
</style>