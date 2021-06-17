<template>
  <div class="comment">
    <div class="comment__avatar">
      <img v-if="comment.avatar" :src="comment.avatar" alt="avatar" />
      <img v-else src="@/assets/img/icon.png" alt="avatar">
    </div>
    <div class="comment__content">
      <div class="comment__content__header">
        <p class="comment__content__header__username">
          {{ comment.firstName + " " + comment.lastName }}
        </p>
        <span v-if="userCheck" @click="togglePopUp">...</span>
        <PopUp
          :revele="revele"
          :togglePopUp="togglePopUp"
          @deletePost="deleteComment(comment.commentId)"
        />
        <span v-if="admin" @click="deleteThisComment(comment.commentId)">
          <font-awesome-icon class="icon" :icon="['fas', 'trash']" />
        </span>
      </div>
      <div class="comment__content__body">
        <p>{{ comment.comment }}</p>
        <p class="comment__content__body__datetime">
          {{ dateTime(comment.commentDate) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import PopUp from "@/components/PopUp.vue";
import { mapState } from "vuex";

export default {
  name: "Comment",
  data() {
    return {
      revele: false,
      userCheck: false,
      admin: false,
    }
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  components: {
    PopUp,
  },
  methods: {
    dateTime(value) {
      return moment(value).locale("fr").calendar();
    },
    checkUser() {
      if (this.comment.userId == sessionStorage.getItem("userId")) {
        return (this.userCheck = true);
      }
    },
    checkAdmin() {
      if (this.user.isAdmin == 1) {
        return (this.admin = true);
      }
    },
    togglePopUp() {
      this.revele = !this.revele;
    },
    deleteComment(commentId) {
      let result = confirm(
        "Êtes-vous sûrs de vouloir supprimer ce commentaire ?"
      );
      if (result) {
        this.$store
          .dispatch("deleteComment", commentId)
          .then((response) => {
            console.log(response);
            this.$emit("commentDeleted");
            this.togglePopUp();
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.togglePopUp();
      }
    },
    deleteThisComment(commentId) {
      let result = confirm(
        "Êtes-vous sûrs de vouloir supprimer ce commentaire ?"
      );
      if (result) {
        this.$store
          .dispatch("deleteComment", commentId)
          .then((response) => {
            console.log(response);
            this.$emit("commentDeleted");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  },
  created() {
    this.checkUser();
    this.checkAdmin();
  },
  computed: {
    ...mapState({
      user: "userInfos"
    })
  }
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
    }
    &__body {
      padding-top: 1em;
      font-size: 16px;
      display: flex;
      flex-direction: column;
      &__datetime {
        padding-top: 0.3em;
        font-size: 12px;
        color: $primary-color;
        align-self: flex-end;
      }
    }
  }
}
</style>
