import { createStore } from "vuex";
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/api'
});


export default createStore({
  state: {
    status: '',
    user: {
      firstName: '',
      userId: -1,
      token: ''
    },
  },
  mutations: {
    setStatus(state, status) {
      state.status = status;
    },
    logUser(state, user) {
      state.user = user;
    }
  },
  actions: { 
    createAccount({ commit }, userInfos) {
      commit('setStatus', 'loading')
      return new Promise((resolve, reject) => {
        instance.post('/auth/signup', userInfos)
          .then((response) => {
            commit('setStatus', 'created')
            resolve(response.data.message);
          })
          .catch((error) => {
            console.log(error.response.status)
            commit('setStatus', 'error_create')
            reject(error);
          });
      })
    },
    login({ commit }, userInfos) {
      commit('setStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/auth/login', userInfos)
          .then((response) => {
            commit('setStatus', '');
            commit('logUser', response.data)
            resolve(response.data);
          })
          .catch((error) => {
            commit('setStatus', 'error_login')
            reject(error);
          });
      })
    },
  },
});
