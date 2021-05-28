<template>
  <div>
      <img src="{{ user.avatar }}
      " alt="">
  </div>
</template>

<script>
export default {
    props: {
        user: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style>
@import "@/assets/sass/main";
</style>