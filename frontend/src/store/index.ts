import { createStore } from "vuex";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000/api",
});

function setDefaultHeader() {
  instance.defaults.headers.common["Authorization"] =
    "Bearer " + JSON.parse(sessionStorage.getItem("token") || "{}");
  instance.defaults.headers.common["Content-Type"] = "multipart/form-data";
}

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
      isAdmin: "",
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
      isAdmin: "",
    },

    profilePosts: [],
  },

  mutations: {
    setStatus(state, status) {
      state.status = status;
    },

    logUser(state, user) {
      state.user = user;
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
      sessionStorage.clear();
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
      setDefaultHeader();
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
        setDefaultHeader();
        instance
          .post("/posts", formData)
          .then((response) => {
            commit("setStatus", "created");
            commit("postCreated");
            resolve(response.data.message);
          })
          .then(() => {
            commit("setStatus", "");
          })
          .catch((error) => {
            commit("setStatus", "error_create");
            reject(error);
          });
      });
    },

    getPosts({ commit }) {
      setDefaultHeader();
      instance
        .get("/posts")
        .then((response) => {
          commit("postsFetched", response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    deletePost({ commit }, postId) {
      return new Promise((resolve, reject) => {
        setDefaultHeader();
        instance
          .delete("/posts/" + postId)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    getProfile({ commit }, profileId) {
      return new Promise((resolve, reject) => {
        setDefaultHeader();
        instance
          .get("/auth/users/" + profileId)
          .then((response) => {
            commit("userFound", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    getProfilePosts({ commit }, profileId) {
      return new Promise((resolve, reject) => {
        setDefaultHeader();
        instance
          .get("/posts/users/" + profileId)
          .then((response) => {
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
      const formData = new FormData();
      if (!newData.selectedAvatar) {
        formData.append("firstName", newData.firstName);
        formData.append("bio", newData.bio);
        formData.append("currentAvatar", newData.currentAvatar);
        formData.append("userId", this.state.user.userId);
      } else {
        formData.append("firstName", newData.firstName);
        formData.append("bio", newData.bio);
        formData.append("avatar", newData.selectedAvatar);
        formData.append("currentAvatar", newData.currentAvatar);
        formData.append("userId", this.state.user.userId);
      }
      return new Promise((resolve, reject) => {
        setDefaultHeader();
        instance
          .put("/auth/users/" + this.state.userInfos.userId, formData)
          .then((response) => {
            commit("setStatus", "created");
            resolve(response.data.message);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    deleteProfile({ commit }, profileId) {
      return new Promise((resolve, reject) => {
        setDefaultHeader();
        instance
          .delete("/auth/users/" + profileId)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    getOnePost({ commit }, postId) {
      return new Promise((resolve, reject) => {
        setDefaultHeader();
        instance
          .get("/posts/" + postId)
          .then((response) => {
            commit("creatingPost", response.data);
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    whoLiked({ commit }, postId) {
      return new Promise((resolve, reject) => {
        setDefaultHeader();
        instance
          .get(`/posts/${postId}/likes`)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    getComments({ commit }, postId) {
      return new Promise((resolve, reject) => {
        setDefaultHeader();
        instance
          .get("/comments/posts/" + postId)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    postComment({ commit }, commentInfos) {
      return new Promise((resolve, reject) => {
        setDefaultHeader();
        instance
          .post("/comments", commentInfos)
          .then((response) => {
            resolve(response.data.message);
          })
          .catch((error) => {
            console.log(error.response.status);
            reject(error);
          });
      });
    },

    deleteComment({ commit }, commentId) {
      return new Promise((resolve, reject) => {
        setDefaultHeader();
        instance
          .delete("/comments/" + commentId)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    like({ commit }, postId) {
      return new Promise((resolve, reject) => {
        setDefaultHeader();
        instance
          .post("/posts/like/" + postId, { userId: this.state.user.userId })
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },

  getters: {
    isAuthenticated() {
      if (sessionStorage.getItem("token")) {
        return true;
      }
    },
  },
});
