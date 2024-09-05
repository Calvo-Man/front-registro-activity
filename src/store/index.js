import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
export default createStore({
  state: {
    user: null,
  },
  getters: {
    getUser: (state) => state.user,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    destroyUser(state) {
      state.user = null;
    },
  },
  plugins: [createPersistedState()],
});
