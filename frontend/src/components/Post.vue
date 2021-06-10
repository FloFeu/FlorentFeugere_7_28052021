<template>
  <div class="post">
    <div class="post__img">
      <router-link
        :to="{ name: 'Profile', params: { id: post.userId } }"
        :user="post.userId"
      >
        <img
          v-if="post.avatar"
          :src="post.avatar"
          alt="avatar"
          class="post__img--img"
        />
        <img
          v-else
          src="@/assets/img/icon.png"
          alt="avatar"
          class="post__img--img"
        />
      </router-link>
    </div>
    <div class="post__content">
      <router-link
        :to="{ name: 'Profile', params: { id: post.userId } }"
        class="post__content__info"
      >
        <b>{{ post.firstName + " " + post.lastName }} </b>
        {{ dateTime(post.postDate) }}
      </router-link>
      <router-link
        :to="{ name: 'PostDetails', params: { id: post.postId } }"
        class="post__content__msg"
        :post="post.postId"
      >
        <div>
          <p class="post__content__msg--msg">{{ post.msg }}</p>
        </div>
        <div v-if="post.PostAttachment" class="post__content__msg--attachment">
          <img :src="post.PostAttachment" alt="attachment" />
        </div>
      </router-link>
      <div class="post__content__icon">
        <font-awesome-icon class="icon" :icon="['fas', 'thumbs-up']" />
        <router-link :to="{ name: 'PostDetails', params: { id: post.postId } }">
          <font-awesome-icon class="icon" :icon="['fas', 'comment']" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    dateTime(value) {
      return moment(value).locale("fr").calendar();
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/main";
.post {
  background-color: $surface;
  border-bottom: 1px solid $background;
  padding: 15px 0;
  display: flex;
  padding-left: 10px;
  &__img {
    width: 20%;
    &--img {
      border-radius: 50%;
      width: 70px;
      height: 70px;
      object-fit: cover;
      object-position: top;
    }
  }
  &__content {
    padding: 0 1em;
    width: 80%;
    display: flex;
    flex-direction: column;
    &__info {
      text-decoration: none;
      font-size: 12px;
      text-align: left;
      color: $primary-color;
      b {
        font-size: 1.3em;
        font-weight: 700;
        margin-right: 0.5em;
      }
    }
    &__msg {
      margin: 1em 0;
      font-size: 1.1em;
      text-decoration: none;
      display: flex;
      flex-direction: column;
      text-align: justify;
      text-justify: inter-word;
      &--msg {
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      &--attachment {
        width: 100%;
        margin-top: 1em;
        align-self: center;
        img {
          border-radius: 15px;
          border: 1px solid lighten($surface, 25%);
          width: 100%;
        }
      }
    }
    &__icon {
      padding: 0 2em;
      display: flex;
      justify-content: space-between;
      .icon {
        path {
          fill: lighten($surface, 25%);
        }
        &:hover {
          cursor: pointer;
          path {
            fill: $primary-color;
          }
        }
      }
    }
  }
}
</style>
