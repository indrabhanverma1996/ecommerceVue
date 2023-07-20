import Api from "./Api";
import Csrf from "./Csrf";

export default {
    async index(page, search) {
   
      let token = localStorage.access_token;
      return Api.get("/roles?page="+page+"&search="+search, { headers: { "Authorization" : `Bearer ${token}`} });
    },
  
    async Permissions() {
      let token = localStorage.access_token;
      return Api.get("allPermissions", { headers: { "Authorization" : `Bearer ${token}`} });
    }, 

  async show(id) {    
    let token = localStorage.access_token;
    return Api.get(`/roles/${id}`, { headers: { "Authorization" : `Bearer ${token}`} });
  },

  async delete(id) {
    await Csrf.getCookie();
    let token = localStorage.access_token;
    return Api.delete(`/roles/${id}`, { headers: { "Authorization" : `Bearer ${token}`} });
  },

  async add(roles) {
    let token = localStorage.access_token;
    return Api.post("/roles", roles, { headers: { "Authorization" : `Bearer ${token}`} });
  },

  async update(id, roles) {
    let token = localStorage.access_token;
    return Api.put(`/roles/${id}`, roles, { headers: { "Authorization" : `Bearer ${token}`} });
  },
};
