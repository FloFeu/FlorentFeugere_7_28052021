import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import Profile from "@/views/Profile.vue";
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
    path: "/post/:postId",
    name: "Post",
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
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
