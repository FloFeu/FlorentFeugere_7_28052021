import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import Profile from "@/views/Profile.vue";
import EditProfile from "@/views/EditProfile.vue";
import PostDetails from "@/views/PostDetails.vue";
import store from "@/store";

const authGuard = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
  } else {
    alert("Vous n'êtes pas connecté.");
    next("/");
  }
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    beforeEnter: authGuard,
  },
  {
    path: "/post/:id",
    name: "PostDetails",
    props: true,
    component: PostDetails,
    beforeEnter: authGuard,
  },
  {
    path: "/profile/:id",
    name: "Profile",
    component: Profile,
    props: true,
    beforeEnter: authGuard,
  },
  {
    path: "/settings/profile",
    name: "EditProfile",
    component: EditProfile,
    beforeEnter: authGuard,
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
