<template>
  <div>
    Salut
    <p>{{ post.firstName + " " + post.lastName }}</p>
    <p>{{ post.postDate }}</p>
  </div>
</template>

<script>
import Service from "@/services/Service.js";

export default {
  props: ["postId"],
  data() {
    return {
      post: null,
    };
  },
  created() {
    Service.getPostDetails(this.postId)
      .then((response) => {
        this.post = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style></style>
