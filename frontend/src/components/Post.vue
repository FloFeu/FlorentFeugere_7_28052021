<template>
  <div class="post">
    <div class="post__user">
      <img
        src="@/assets/img/itsame.jpg"
        alt="user avatar"
        class="post__user--img"
      />
      <div class="post__user--info">
        <a href="#"> {{ post.firstName + ' ' + post.lastName }} </a>
        <p>Aujourd'hui, à 9:35</p>
      </div>
    </div>
    <p class="post__msg">
      {{ post.msg }}
    </p>
    <p class="line-break"></p>
    <p class="post__icon--like">
      <font-awesome-icon class="icon" :icon="['fas', 'thumbs-up']" />
    </p>
    <p class="post__icon--comment">
      <font-awesome-icon class="icon" :icon="['fas', 'comment']" />
    </p>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/main";
.post {
  border-radius: 15px;
  background-color: $surface;
  margin: 1em;
  padding: 1em;
  display: grid;
  grid-template-areas:
    "img img ."
    "msg msg msg"
    "br br br"
    ". like comment";
  grid-template-columns: 15% 42.5% 42.5%;
  &__user {
    grid-area: img;
    display: flex;
    align-items: center;
    &--img {
      border-radius: 50%;
      width: 100px;
      height: 100px;
      object-fit: cover;
      object-position: top;
      padding: 1em;
    }
    &--info{
      a{
        font-size: 1.3em;
        font-weight: 700;
        text-decoration: none;
      }
      p{
        margin-top: 5px;
        font-size: 14px;
        text-align: left;
        color: $primary-color;
      }
    }
  }
  &__msg {
    grid-area: msg;
    font-size: 1.1em;
  }
  .line-break {
    grid-area: br;
  }
  &__icon--like {
    grid-area: like;
    .icon {
      &:hover {
        cursor: pointer;
        path {
          fill: $primary-color;
        }
      }
    }
  }
  &__icon--comment {
    grid-area: comment;

    .icon {
      &:hover {
        cursor: pointer;
        path {
          fill: $primary-color;
        }
      }
    }
  }
}
</style>