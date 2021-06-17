<template>
  <div class="profile">
    <Nav_second />
    <div class="profile__top">
      <div>
        <img
          v-if="profile.avatar"
          :src="profile.avatar"
          alt="avatar"
          class="profile__top__img"
        />
        <img
          v-else
          src="@/assets/img/icon.png"
          alt="avatar"
          class="profile__top__img"
        />
      </div>

      <div class="profile__top__edit">
        <router-link v-if="checkedUser" :to="{ name: 'EditProfile' }">
          Editer le profil
        </router-link>
        <button
          v-if="admin"
          class="editProfile__delete__btn"
          @click="deleteValidation"
        >
          Supprimer le compte
        </button>
      </div>
    </div>

    <div class="profile__infos">
      <div>
        <p class="profile__infos__name">
          {{ profile.firstName }} {{ profile.lastName }}
        </p>
        <p class="profile__infos__role">
          <span v-if="profile.isAdmin == 1">Admin</span>
          <span v-else> Membre</span>
        </p>
      </div>
      <p class="profile__infos__bio">{{ profile.bio }}</p>
    </div>

    <div v-if="posts.length">
      <Post
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @refresh="refresh"
      />
    </div>
    <p class="noPub" v-else>Aucune publication pour le moment.</p>
  </div>
</template>

<script>
import Post from "@/components/Post.vue";
import Nav_second from "@/components/Nav_second.vue";
import { mapState } from "vuex";

export default {
  name: "Profile",
  data() {
    return {
      checkedUser: false,
      admin: false,
    };
  },
  props: {
    id: String,
    post: {
      type: Object,
      required: true,
    },
  },
  components: {
    Post,
    Nav_second,
  },
  computed: {
    ...mapState({
      user: "userInfos",
    }),
    ...mapState({
      profile: "profileInfos",
    }),
    ...mapState({
      posts: "profilePosts",
    }),
  },
  methods: {
    userCheck() {
      if (this.user.userId === this.profile.userId) {
        return (this.checkedUser = true);
      } else if (this.user.isAdmin == 1) {
        return (this.admin = true);
      } else {
        return !this.checkedUser;
      }
    },

    deleteValidation() {
      let result = confirm("Êtes-vous sûrs de vouloir supprimer ce compte ?");
      if (result) {
        this.$store
          .dispatch("deleteProfile", this.profile.userId)
          .then(() => {
            this.$router.push({ name: "Home" });
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    getProfile() {
      console.log(this.id);
      this.$store
        .dispatch("getProfile", this.id)
        .then(() => {
          this.getProfilePosts();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getProfilePosts() {
      this.$store
        .dispatch("getProfilePosts", this.profile.userId)
        .then(() => {
          this.userCheck();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    
    refresh() {
      this.getProfilePosts();
    },
  },
  created() {
    this.getProfile();
  },
};
</script>

<style lang="scss">
@import "@/assets/sass/main";

.profile {
  &__top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__img {
      margin-left: 1em;
      margin-top: -1em;
      width: 100px;
      height: 100px;
      background: $background;
      border: 3px solid $background;
      border-radius: 50%;
      object-position: top;
      object-fit: cover;
    }
    &__edit {
      margin-right: 1em;
      a {
        text-decoration: none;
        font-weight: 700;
        border: 1px solid $primary-color;
        color: $primary-color;
        border-radius: 25px;
        padding: 0.7em 2em;
        &:active {
          transform: scale(0.9);
          color: lightgray;
        }
      }
    }
  }
  &__infos {
    padding: 1em;
    div {
      display: flex;
      justify-content: space-between;
    }
    &__name {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 1em;
    }
    &__role {
      span {
        color: $primary-color;
      }
    }
  }
  .noPub {
    margin: 2em;
    text-align: center;
  }
}
</style>
