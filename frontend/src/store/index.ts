import { createStore } from "vuex";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
});

let User = JSON.parse(sessionStorage.getItem("user") || "{}");
if (!User) {
  User = {
    firstName: "",
    userId: -1,
    token: "",
  };
}

export default createStore({
  state: {
    status: "",
    user: User,
    userInfos: {
      userId: "",
      firstName: "",
      lastName: "",
      email: "",
      bio: "",
      avatar: "",
    },
    postInfos: {
      selectedFile: "",
      msg: "",
      userId: "",
    },
    posts: [],
    profileInfos: {
      userId: "",
      firstName: "",
      lastName: "",
      email: "",
      bio: "",
      avatar: "",
    },
    profilePosts: [],
  },
  mutations: {
    setStatus(state, status) {
      state.status = status;
    },
    logUser(state, user) {
      state.user = user;
      instance.defaults.headers.common["Authorization"] = user.token;
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("userId", JSON.stringify(user.userId));
      sessionStorage.setItem("token", JSON.stringify(user.token));
      sessionStorage.setItem("firstName", JSON.stringify(user.firstName));
    },
    userInfos(state, userInfos) {
      state.userInfos = userInfos;
    },
    logOut(state) {
      state.user = {
        userId: -1,
        token: "",
        firstName: "",
      };
      sessionStorage.removeItem("firstName");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("userId");
    },
    creatingPost(state, postInfos) {
      state.postInfos = postInfos;
    },
    postCreated(state) {
      state.postInfos = {
        selectedFile: "",
        msg: "",
        userId: "",
      };
    },
    postsFetched(state, posts) {
      state.posts = posts;
    },
    userFound(state, profileFound) {
      state.profileInfos = profileFound;
    },
    postsProfileFetched(state, posts) {
      state.profilePosts = posts;
    },
  },
  actions: {
    createAccount({ commit }, userInfos) {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .post("/auth/signup", userInfos)
          .then((response) => {
            commit("setStatus", "created");
            resolve(response.data.message);
          })
          .catch((error) => {
            console.log(error.response.status);
            commit("setStatus", "error_create");
            reject(error);
          });
      });
    },
    login({ commit }, userInfos) {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        instance
          .post("/auth/login", userInfos)
          .then((response) => {
            commit("setStatus", "");
            commit("logUser", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            commit("setStatus", "error_login");
            reject(error);
          });
      });
    },
    getUserInfos({ commit }) {
      instance.defaults.headers.common["Authorization"] =
        "BEARER " + this.state.user.token;
      instance
        .get("/auth/users/" + this.state.user.userId)
        .then((response) => {
          commit("userInfos", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    createPost({ commit }, postInfos) {
      commit("setStatus", "loading");
      commit("creatingPost", postInfos);
      console.log(postInfos);
      const formData = new FormData();
      if (this.state.postInfos.selectedFile !== "") {
        formData.append("image", this.state.postInfos.selectedFile);
        formData.append("msg", this.state.postInfos.msg);
        formData.append("userId", this.state.postInfos.userId);
      } else {
        formData.append("msg", this.state.postInfos.msg);
        formData.append("userId", this.state.postInfos.userId);
      }

      return new Promise((resolve, reject) => {
        instance.defaults.headers.common["Authorization"] =
          "BEARER " + this.state.user.token;
        instance.defaults.headers.common["Content-Type"] =
          "multipart/form-data";
        instance
          .post("/posts", formData)
          .then((response) => {
            commit("setStatus", "created");
            commit("postCreated");
            resolve(response.data.message);
          })
          .catch((error) => {
            console.log(error.response.status);
            commit("setStatus", "error_create");
            reject(error);
          });
      });
    },
    getPosts({ commit }) {
      instance.defaults.headers.common["Authorization"] =
        "BEARER " + this.state.user.token;
      instance
        .get("/posts")
        .then((response) => {
          console.log(response.data);
          commit("postsFetched", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getProfile({ commit }, profileId) {
      return new Promise((resolve, reject) => {
        instance.defaults.headers.common["Authorization"] =
          "BEARER " + this.state.user.token;
        instance
          .get("/auth/users/" + profileId)
          .then((response) => {
            commit("userFound", response.data);
            console.log(response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    getProfilePosts({ commit }, profileId) {
      return new Promise((resolve, reject) => {
        instance
          .get("/posts/users/" + profileId)
          .then((response) => {
            console.log(response);
            commit("postsProfileFetched", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    modifyProfile({ commit }, newData) {
      commit("setStatus", "loading");
      console.log(newData);

      const formData = new FormData();
      if (!newData.selectedAvatar) {
        formData.append("firstName", newData.firstName);
        formData.append("bio", newData.bio);
        formData.append("currentAvatar", newData.currentAvatar);
      } else {
        formData.append("firstName", newData.firstName);
        formData.append("bio", newData.bio);
        formData.append("avatar", newData.selectedAvatar);
        formData.append("currentAvatar", newData.currentAvatar);
      }
      console.log(formData);

      return new Promise((resolve, reject) => {
        instance.defaults.headers.common["Authorization"] =
          "BEARER " + this.state.user.token;
        instance.defaults.headers.common["Content-Type"] =
          "multipart/form-data";
        instance
          .put("/auth/users/" + this.state.userInfos.userId, formData)
          .then((response) => {
            commit("setStatus", "created");
            console.log(response);
            resolve(response.data.message);
          })
          .catch((error) => {
            console.log(error.response.status);
            reject(error);
          });
      });
    },
    getOnePost({ commit }, postId) {
      return new Promise((resolve, reject) => {
        instance.defaults.headers.common["Authorization"] =
          "BEARER " + this.state.user.token;
        instance
          .get("/posts/" + postId)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    }
  },
  getters: {
    isAuthenticated() {
      if (sessionStorage.getItem("token")) {
        return true;
      }
    },
  },
});
