<template>
  <div class="post">
    <router-link
      :to="{ name: 'Profile', params: { id: post.userId } }"
      class="post__user"
      :user="post.userId"
    >
      <img :src="post.avatar" alt="avatar" class="post__user--img" />
      <div class="post__user--info">
        <b>{{ post.firstName + " " + post.lastName }} </b>
        <p>Aujourd'hui, à 9:35</p>
      </div>
    </router-link>
    <router-link
      :to="{ name: 'Post', params: { postId: post.postId } }"
      class="post__msg"
    >
      <p>{{ post.msg }}</p>
      <img :src="post.PostAttachment" alt="" />
    </router-link>
    <p class="line-break"></p>
    <p class="post__icon--like">
      <font-awesome-icon class="icon" :icon="['fas', 'thumbs-up']" />
    </p>
    <p class="post__icon--comment">
      <font-awesome-icon class="icon" :icon="['fas', 'comment']" />
      Commenter ce post
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
    ". msg ."
    "br br br"
    ". like comment";
  grid-template-columns: 15% 42.5% 42.5%;
  &__user {
    grid-area: img;
    display: flex;
    align-items: center;
    text-decoration: none;
    &--img {
      border-radius: 50%;
      width: 100px;
      height: 100px;
      object-fit: cover;
      object-position: top;
      padding: 1em;
    }
    &--info {
      b {
        font-size: 1.3em;
        font-weight: 700;
      }
      p {
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
    text-decoration: none;
  }
  .line-break {
    grid-area: br;
  }
  &__icon--like {
    grid-area: like;
    .icon {
      path {
      }
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
    &:hover {
      cursor: pointer;
      color: $primary-color;
      .icon path {
        fill: $primary-color;
      }
    }
  }
}
</style>
