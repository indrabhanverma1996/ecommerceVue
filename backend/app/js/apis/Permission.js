import Api from "./Api";
import Csrf from "./Csrf";

export default {
  async index(page,search) {
    
    let token = localStorage.access_token;
    return Api.get("/permissions?page="+page+"&search="+search, { headers: { "Authorization" : `Bearer ${token}`} });
  },
  async getallpermission() {
    
    let token = localStorage.access_token;
    return Api.get("/get-roll-permission", { headers: { "Authorization" : `Bearer ${token}`} });
  },
  async show(id) {
    let token = localStorage.access_token;
    return Api.get(`/permissions/${id}`, { headers: { "Authorization" : `Bearer ${token}`} });
  },

  async delete(id) {
    await Csrf.getCookie();
    let token = localStorage.access_token;
    return Api.delete(`/permissions/${id}`, { headers: { "Authorization" : `Bearer ${token}`} });
  },

  async add(permission) {
    let token = localStorage.access_token;
    return Api.post("/permissions", permission, { headers: { "Authorization" : `Bearer ${token}`} });
  },

  async update(id, permission) {
    let token = localStorage.access_token;
    return Api.put(`/permissions/${id}`, permission, { headers: { "Authorization" : `Bearer ${token}`} });
  },
};
