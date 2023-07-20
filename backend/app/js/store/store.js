import Vue from 'vue';
import Vuex from 'vuex';
import Permission from "../apis/Permission";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    permissions: [] // Initialize the permissions array
  },
  mutations: {
    setPermissions(state, permissions) {
      state.permissions = permissions;
    }
  },
  actions: {
    fetchPermissions({ commit }) {
        Permission.getallpermission().then(response => {        
        commit('setPermissions', response.data.permission);
              
        })
        .catch(error=> {  
            if (error.response.status === 401||error.response.status === 403) {
                this.$toast.error(error.response.data.message);
                this.$router.push({ name: "Login" });
            }
        });
     
    }
  },
  getters: {
    hasPermission: (state) => (permission) => {
      return state.permissions.includes(permission);
    }
  }
});

export default store;
