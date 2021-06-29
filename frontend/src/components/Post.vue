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
        <span v-if="userCheck & !admin" @click="togglePopUp" class="popUp"
          >...</span
        >
        <PopUp
          @deletePost="deletePost"
          :revele="revele"
          :togglePopUp="togglePopUp"
        />
        <span v-if="admin" @click="deleteThisPost">
          <font-awesome-icon class="icon" :icon="['fas', 'trash']" />
        </span>
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

        <p>
          <font-awesome-icon
            v-if="hasLiked"
            @click="like(post.postId)"
            class="icon"
            :icon="['fas', 'thumbs-down']"
          />
          <font-awesome-icon
            v-else
            @click="like(post.postId)"
            class="icon"
            :icon="['fas', 'thumbs-up']"
          />
          <span> {{ post.postLikes }} </span>
        </p>

        <router-link :to="{ name: 'PostDetails', params: { id: post.postId } }">
          <font-awesome-icon class="icon" :icon="['fas', 'comment']" />
          <span> {{ post.postComments }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import PopUp from "@/components/PopUp.vue";
import { mapState } from "vuex";

export default {
  components: {
    PopUp,
  },

  data() {
    return {
      revele: false,
      userCheck: false,
      admin: false,
      hasLiked: false,
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
              this.$emit("refresh");
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
    },

    checkAdmin() {
      if (this.user.isAdmin == 1) {
        return (this.admin = true);
      }
    },

    deleteThisPost() {
      let result = confirm("Êtes-vous sûrs de vouloir supprimer ce post ?");
      if (result) {
        this.$store
          .dispatch("deletePost", this.post.postId)
          .then((response) => {
            this.$emit("refresh");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },

    whoLiked() {
      this.$store.dispatch("whoLiked", this.post.postId).then((response) => {
        if (response === true) {
          return (this.hasLiked = true);
        }
      });
    },

    like(postId) {
      this.$store
        .dispatch("like", postId)
        .then((response) => {
          this.$emit("refresh");
          this.hasLiked = !this.hasLiked;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  created() {
    this.whoLiked();
    this.checkUser();
    this.checkAdmin();
  },

  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/main";
.post {
  margin: 0 1em 0 1em;
  background-color: $surface;
  border-bottom: 1px solid $background;
  padding: 15px 0;
  display: flex;
  padding-left: 10px;
  &__img {
    width: 20%;
    @include tablet {
      width: 15%;
    }
    &--img {
      display: block;
      margin-left: auto;
      margin-right: auto;
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
    @include tablet {
      width: 85%;
    }
    &__head {
      display: flex;
      justify-content: space-between;
      .popUp {
        cursor: pointer;
      }
      .icon {
        cursor: pointer;
        path {
          fill: $error;
        }
      }
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
      font-size: 1.2em;
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
        img {
          display: block;
          margin-left: auto;
          margin-right: auto;
          border-radius: 15px;
          border: 1px solid lighten($surface, 25%);
          width: 100%;
          max-width: 350px;
        }
      }
    }
    &__icon {
      color: $primary-color;
      display: flex;
      justify-content: space-between;
      font-size: 0.9em;

      a {
        text-decoration: none;
      }
      span {
        color: $primary-color;
      }
      .icon {
        margin-right: 5px;
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
