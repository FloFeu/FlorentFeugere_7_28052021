<template>
  <div class="comment">
    <div class="comment__avatar">
      <img :src="comment.avatar" alt="avatar" />
    </div>
    <div class="comment__content">
      <div class="comment__content__header">
        <p class="comment__content__header__username">
          {{ comment.firstName + " " + comment.lastName }}
        </p>
        <p class="comment__content__header__datetime">
          {{ dateTime(comment.commentDate) }}
        </p>
      </div>
      <div class="comment__content__body">
        <p>{{ comment.comment }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "Comment",
  props: {
    comment: {
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
.comment {
  background-color: $surface;
  border-top: 1px solid $background;
  padding: 1em;
  display: flex;
  width: 100%;
  &__avatar {
    img {
      @include profile-img;
    }
  }
  &__content {
    flex-grow: 1;
    &__header {
      display: flex;
      width: 100%;
      justify-content: space-between;
      &__username {
        font-weight: 700;
      }
      &__datetime {
        font-size: 12px;
        color: $primary-color;
        margin-right: 1em;
      }
    }
    &__body {
      padding: 1em 0;
      font-size: 16px;
    }
  }
}
</style>
