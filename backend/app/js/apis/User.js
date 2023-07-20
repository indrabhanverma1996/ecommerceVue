import Api from "./Api";
import Csrf from "./Csrf";

export default {
  async register(form) {
    await Csrf.getCookie();
    return Api.post("/register", form);
  },

  async login(form) {
    await Csrf.getCookie();
    return Api.post("/login", form);
  },

  async index(page, search) {
    let token = localStorage.access_token;
    return Api.get("/users?page="+page+"&search="+search, { headers: { "Authorization" : `Bearer ${token}`} });
  },

  async department() {
    let token = localStorage.access_token;
    return Api.get("/department", { headers: { "Authorization" : `Bearer ${token}`} });
  },

  async add(user) {
    let token = localStorage.access_token;
    return Api.post("/users", user, { headers: { "Authorization" : `Bearer ${token}`} });
  },
  async show(id) {
   
    let token = localStorage.access_token;
    return Api.get(`/users/${id}`,{ headers: { "Authorization" : `Bearer ${token}`} });
  },
  async update(id,user) {
   
    let token = localStorage.access_token;
    return Api.put(`/users/${id}`,user,{ headers: { "Authorization" : `Bearer ${token}`} });
  },

  async getRolesData(){
    let token = localStorage.access_token;
    return Api.get("/roles", { headers: { "Authorization" : `Bearer ${token}`} });
  },
  async delete(id) {
    await Csrf.getCookie();
    let token = localStorage.access_token;
    return Api.delete(`/users/${id}`, { headers: { "Authorization" : `Bearer ${token}`} });
  },


    async logout(access_token) {
    await Csrf.getCookie();
    localStorage.removeItem("auth");
    localStorage.removeItem("access_token");
    localStorage.removeItem("user_name");
    localStorage.removeItem("user_email");
    localStorage.removeItem("user_id");
    return Api.post("/logout");
  },

  auth() {
    let token = localStorage.access_token;users
    return Api.get("/user", { headers: { "Authorization" : `Bearer ${token}`} });
  },
  async profileSave(id, form) {
    let token = localStorage.access_token;
    return Api.post(`/profile/${id}`, form, { headers: { "Authorization" : `Bearer ${token}`} });
  },
  async forget(form) {
    return Api.post("/password/email", form);
  },

  async otpVerification(form) {
    return Api.post("/otp/verify", form);
  },

  async resetPassword(form) {
    return Api.post("/password/reset", form);
  },
  
};
