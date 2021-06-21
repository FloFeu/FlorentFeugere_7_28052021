<template>
  <nav>
    <router-link :to="{ name: 'Home' }">
      <img class="logo" src="@/assets/img/logo_white.svg" alt="logo" />
    </router-link>
    <ul class="menu__nav">
      <li>
        <router-link :to="'/profile/' + user.userId">
          <span>Profil</span>
          <font-awesome-icon class="icon" :icon="['fas', 'user']" />
        </router-link>
      </li>
      <li>
        <p class="logOut" @click="logOut">
          <span>Déconnexion</span>
          <font-awesome-icon class="icon" :icon="['fas', 'power-off']" />
        </p>
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
  padding: 15px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  position: sticky;
  top: 0;
  background-color: darken($surface, 5%);

  .logo {
    width: 200px;
    border: 1px solid darken($surface, 5%);
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
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    li {
      padding-bottom: 0.3em;
      a,
      p {
        font-size: 16px;
        text-decoration: none;
        span{
          padding-right: 1em;
          display: none;
          @include tablet{
            display: inline-block;
          }
        }
        &:hover {
          span {
            color: $primary-color;
          }
          border-bottom: 1px solid $primary-color;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
