<template>
  <nav>
    <router-link :to="{ name: 'Home' }">
      <img class="logo" src="@/assets/img/logo_white.svg" alt="" />
    </router-link>
    <ul class="menu__nav">
      <li>
        <router-link :to="{ name: 'Home' }"> Accueil </router-link>
      </li>
      <li>
        <router-link :to="'/profile/' + user.userId"> Profil </router-link>
      </li>
      <li>
        <p class="logOut" @click="logOut">Déconnexion</p>
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Navbar",
  methods: {
    logOut() {
      this.$store.commit("logOut");
      this.$router.push({ name: "Login" });
    },
  },
  computed: {
    ...mapState({
      user: "userInfos",
    }),
  },
  mounted() {
    this.$store
      .dispatch("getUserInfos")
      .then(() => {
        this.user.userId = this.$store.state.userInfos.userId;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped lang="scss">
@import "@/assets/sass/main";

nav {
  padding: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: sticky;
  top: 0;
  background-color: $surface;
  border-radius: 0 0 10px 10px;
  .logo {
    width: 250px;
    border: 1px solid $surface;
    border-radius: 50px;
    padding: 7px 8px;
    transition: 150ms background;
    &:hover {
      border: 1px solid $primary-color;
      background: $primary-color;
      cursor: pointer;
    }
  }
  .menu__nav {
    list-style: none;
    li {
      text-align: right;
      a,
      p {
        font-size: 16px;
        text-decoration: none;
        &:hover {
          color: $primary-color;
          border-bottom: 1px solid $primary-color;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
