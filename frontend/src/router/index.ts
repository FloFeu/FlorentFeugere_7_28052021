import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Connect from "@/views/Connect.vue";
import Signin from "@/components/Signin.vue";
import Signup from "@/components/Signup.vue";
import Home from "@/views/Home.vue";
import Profile from "@/views/Profile.vue";
import PostDetails from "@/views/PostDetails.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Connect",
    component: Connect,
  },
  {
    path: "/signin",
    name: "Signin",
    component: Signin,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/post/:postId",
    name: "Post",
    props: true,
    component: PostDetails,
  },
  {
    path: "/profile/:userId",
    name: "Profile",
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
