<template>
    <div class="content d-flex flex-column flex-column-fluid" id="kt_content">
        <div class="toolbar" id="kt_toolbar">
            <div id="kt_toolbar_container" class="container-fluid d-flex flex-stack">
                <div data-kt-place="true" data-kt-place-mode="prepend" data-kt-place-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" class="page-title me-3 mb-5 mb-lg-0 lh-1">
                    <h1 class="d-flex align-items-center text-dark fw-bolder my-1 fs-3">Users</h1>    
                    <ul class="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 my-3">
                        <li class="breadcrumb-item text-muted">
                            <router-link :to='{name:"Dashboard"}' class="text-link fs-6">Dashboard</router-link>
                        </li>
                        <li class="breadcrumb-item text-muted">
                            <router-link :to='{name:"Roles"}' class="text-link fs-6">Users</router-link>
                        </li>
                        <li class="breadcrumb-item text-muted">
                            <p class="text-muted m-0 fs-5">Users</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="post d-flex flex-column-fluid" id="kt_post">
            <div id="kt_content_container" class="container">
                <div class="row">
                  <div class="col-md-12 col-12">
                      <div class="d-flex align-items-center justify-content-md-end mb-4">
                          <router-link :to='{name:"Users"}' class="btn btn-sm btn-secondary">Back to List</router-link>
                      </div>
                  </div>
                    <div class="col-md-12 col-12 d-flex">
                        <div class="card card-xl-stretch mb-xl-8 w-100">
                            <div class="card-header border-0">
                                <h3 class="card-title fw-bolder text-dark m-0">view user</h3>
                            </div>
                            <div class="separator"></div>
                            <div class="card-body">
                                <form>
                                    <div class="row">
                                        <div class="col-md-4 col-12">
                                            <div class="form-group">
                                                <label for="Name" class="mb-3 fw-bolder fs-5">User Name<span class="text-danger">*</span></label>
                                                <input type="test" class="form-control form-control-solid form-control-sm" v-model="user.name" placeholder="Enter User Name" readonly/>
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-12">
                                            <div class="form-group">
                                                <label for="email" class="mb-3 fw-bolder fs-5">User Email<span class="text-danger">*</span></label>
                                                <input type="email" class="form-control form-control-solid form-control-sm" v-model="user.email" placeholder="Enter Email Address" readonly/>
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-12">
                                            <div class="form-group">
                                                <label for="phone-no" class="mb-3 fw-bolder fs-5">Phone  Number<span class="text-danger">*</span></label>
                                                <input type="test" class="form-control form-control-solid form-control-sm" v-model="user.phone_no" placeholder="Enter Phone Number" readonly/>
                                            </div>
                                        </div>
                                        
                                        <div class="col-md-4 col-12">
                                            <div class="form-group">
                                                <label for="department-name" class="mb-3 fw-bolder fs-5">Department<span class="text-danger">*</span></label>
                                                <select class="form-control form-control-solid form-control-sm status-filter"  v-model="user.department_id" placeholder=" Department Name" readonly>
                                                      
                                                     <option v-for="option in department" :value="option.id"  :selected="option.id == user.department_id">{{ option.department_name }}</option>
                                                 </select>
                                            </div>
                                        </div>
                                        <div class="col-md-4 col-12">
                                             <div class="form-group">
                                                 <label for="role" class="mb-3 fw-bolder fs-5">Role<span class="text-danger">*</span></label>
                                                 <select class="form-control form-control-solid form-control-sm status-filter"  v-model="user.role_id"  placeholder=" Role Name" >
                                                     <option  value="">Select Role</option>
                                                     <option v-for="option in rolesData" :value="option.id" :selected="option.id== user.role_id">{{ option.title }}</option>
                                                 </select>
                                             </div>
                                         </div>
                                        
                                      
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
    </div>
 </template>
 
 <script>
 import Role from "../../apis/Role";
 import User from "../../apis/User";
 export default {
    name:"add-role",
    data(){
        return { 
         rolesData: [], 
         department: [],          
             user:{
                name:"",
                email:"",
                phone_no:"",               
                department_id:"",
                role_id:"",
            }
        }
    },
    mounted(){
     this.showUser();
         this.getRoles()
         this.getDepartment()
        
        
     },
    methods:{
     async getRoles() {
                  Role.index().then(response => {
                 this.rolesData = response.data.rolesData.data;      
             })
             .catch(error=> {
                 this.roles = []             
                 if (error.response.status === 401) {
                     this.$toast.error(error.response.data.message);
                     this.$router.push({ name: "Login" });
                 }
             });
         },
         async getDepartment() {
             User.department().then(response => {
                 this.department = response.data.department;  
                 
             })
             .catch(error=> {
                 this.department= []             
                 if (error.response.status === 401) {
                     this.$toast.error(error.response.data.message);
                     this.$router.push({ name: "Login" });
                 }
             });
         },
         async showUser(){
            User.show(this.$route.params.id).then(response => {      
                this.user = response.data.user                        
              
            }).catch(error=> {
                if (error.response.status === 401) {
                    this.$toast.error(error.response.data.message);
                    this.$router.push({ name: "Login" });
                }
            })
        },
     
    }
 }
 </script>