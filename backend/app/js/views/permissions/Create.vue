<template>
    <div class="content d-flex flex-column flex-column-fluid" id="kt_content">
        <div class="toolbar" id="kt_toolbar">
            <div id="kt_toolbar_container" class="container-fluid d-flex flex-stack">
                <div data-kt-place="true" data-kt-place-mode="prepend" data-kt-place-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" class="page-title me-3 mb-5 mb-lg-0 lh-1">
                    <h1 class="d-flex align-items-center text-dark fw-bolder my-1 fs-3">Create Permissions</h1>    
                    <ul class="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 my-3">
                        <li class="breadcrumb-item text-muted">
                            <router-link :to='{name:"Dashboard"}' class="text-link fs-6">Dashboard</router-link>
                        </li>
                        <li class="breadcrumb-item text-muted">
                            <router-link :to='{name:"Roles"}' class="text-link fs-6">All Permissions</router-link>
                        </li>
                        <li class="breadcrumb-item text-muted">
                            <p class="text-muted m-0 fs-5">Create Permissions</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="post d-flex flex-column-fluid" id="kt_post" v-if="hasPermission('permissions-create')">
            <div id="kt_content_container" class="container">
                <div class="row">
                  <div class="col-md-12 col-12">
                      <div class="d-flex align-items-center justify-content-md-end mb-4">
                          <router-link :to='{name:"Roles"}' class="btn btn-sm btn-secondary">Back to List</router-link>
                      </div>
                  </div>
                    <div class="col-md-12 col-12 d-flex">
                        <div class="card card-xl-stretch mb-xl-8 w-100">
                            <div class="card-header border-0">
                                <h3 class="card-title fw-bolder text-dark m-0">Create New Permissions</h3>
                            </div>
                            <div class="separator"></div>
                            <div class="card-body">
                                <form @submit.prevent="create">
                                    <div class="row">
                                        <div class="col-md-4 col-12">
                                            <div class="form-group">
                                                <label for="ques-name" class="mb-3 fw-bolder fs-5">Role Permissions<span class="text-danger">*</span></label>
                                                <input type="test" class="form-control form-control-solid form-control-sm" v-model="permission.name" placeholder="Enter permission Name" required/>
                                            </div>
                                        </div>
                                      
                                        <div class="col-md-12 col-12">
                                            <ul class="list-unstyled list-inline m-0">
                                                <li class="list-inline-item">
                                                <button type="submit" class="btn btn-primary btn-sm" > Save</button>
                                                </li>
                                            </ul>
                                        </div>
                                      
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="loading" v-if="loader_spin">
            <div class="loader"></div>
        </div>
    </div>
</template>

<script>
import Permission from "../../apis/Permission";
import { mapGetters } from 'vuex';
export default {
    name:"add-permission",
    data(){
        return {
            loader_spin: false,
            permission:{
                name:""
            }
        }
    },
    computed: {    
    ...mapGetters(['hasPermission'])
  }, 
    methods:{
        async create(){
            Permission.add(this.permission).then(response => {             
                this.$toast.success(response.data.message)
                this.$router.push('/permissions');
                this.loader_spin = false
            }).catch(error=> {
                if (error.response.status === 401) {
                    this.$toast.error(error.response.data.message);
                    this.$router.push('/permissions');
                }
            })
        }
    }
}
</script>