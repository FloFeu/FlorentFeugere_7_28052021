<template>
  <div>
    <Navbar />

    <div>
      Prout
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { mapState } from "vuex";

export default {
  name: "Profile",
  props: ['id'],
  components: {
    Navbar,
  },
  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },
  created() {
    console.log(this.id);
    this.$store.dispatch('getProfile', this.id)
    .then((response) => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    })
  }
};
</script>

<style></style>
