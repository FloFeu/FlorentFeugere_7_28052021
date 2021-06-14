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
      <div class="post__content__head">
        <router-link
          :to="{ name: 'Profile', params: { id: post.userId } }"
          class="post__content__head__info"
        >
          <b>{{ post.firstName + " " + post.lastName }} </b>
        </router-link>
        <span v-if="userCheck" @click="togglePopUp">...</span>
        <PopUp
          @deletePost="deletePost"
          :revele="revele"
          :togglePopUp="togglePopUp"
        />
      </div>
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
        {{ dateTime(post.postDate) }}
        <font-awesome-icon class="icon" :icon="['fas', 'thumbs-up']" />
        <router-link :to="{ name: 'PostDetails', params: { id: post.postId } }">
          <font-awesome-icon class="icon" :icon="['fas', 'comment']" />
          <span> {{ post.CommentsNumber }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import PopUp from "@/components/PopUp.vue";
export default {
  components: {
    PopUp,
  },
  data() {
    return {
      revele: false,
      userCheck: false,
    };
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    dateTime(value) {
      return moment(value).locale("fr").fromNow();
    },
    togglePopUp() {
      this.revele = !this.revele;
    },
    deletePost() {
      let result = confirm("Êtes-vous sûrs de vouloir supprimer ce post ?");
      if (result) {
        if (this.$store.state.userInfos.userId == this.post.userId) {
          this.$store
            .dispatch("deletePost", this.post.postId)
            .then((response) => {
              console.log(response);
              this.$emit("postDeleted");
              this.togglePopUp();
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          this.togglePopUp();
        }
      } else {
        this.togglePopUp();
      }
    },
    checkUser() {
      if (this.post.userId == sessionStorage.getItem("userId")) {
        return (this.userCheck = true);
      }
    }
  },
  created() {
    this.checkUser();
  }
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
    &__head {
      display: flex;
      justify-content: space-between;
      &__info {
        text-decoration: none;
        b {
          font-size: 1.2em;
          font-weight: 700;
          margin-right: 0.5em;
        }
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
      color: $primary-color;
      display: flex;
      justify-content: space-between;
      a {
        text-decoration: none;
        span {
          color: $primary-color;
        }
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
}
</style>
