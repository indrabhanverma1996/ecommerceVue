<template>
    <div class="content d-flex flex-column flex-column-fluid" id="kt_content">
        <div class="toolbar" id="kt_toolbar">
            <div id="kt_toolbar_container" class="container-fluid d-flex flex-stack">
                <div data-kt-place="true" data-kt-place-mode="prepend" data-kt-place-parent="{default: '#kt_content_container', 'lg': '#kt_toolbar_container'}" class="page-title me-3 mb-5 mb-lg-0 lh-1">
                    <h1 class="d-flex align-items-center text-dark fw-bolder my-1 fs-3">Roles</h1>                               
                    <ul class="breadcrumb breadcrumb-transparent breadcrumb-dot font-weight-bold p-0 my-3">
                        <li class="breadcrumb-item  text-muted">
                            <router-link :to='{name:"Dashboard"}' class="fs-6 text-link ">Dashboard</router-link>
                        </li>
                        <li class="breadcrumb-item text-muted">
                            <p class="text-muted m-0 fs-6">Roles</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="post d-flex flex-column-fluid" id="kt_post">
            <div id="kt_content_container" class="container">
                <div class="row">
                    <div class="col-md-12 col-12 d-flex">
                        <div class="card card-xl-stretch w-100">
                            <div class="card-header border-0">
                                <div class="form-group my-3">
                                    <div class="input-group">
                                        <input type="text" class="form-control form-control-sm form-control-solid bg-white" v-model="search" placeholder="Search user..." v-on:keyup.enter="searchClick">
                                        <div class="input-group-append">
                                            <button class="btn btn-light-dark btn-sm px-3 rounded-0 rounded-end" type="button" v-on:click="searchClick">
                                                <span class="svg-icon svg-icon-2 m-0">
                                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                                            <rect x="0" y="0" width="24" height="24"></rect>
                                                            <path d="M14.2928932,16.7071068 C13.9023689,16.3165825 13.9023689,15.6834175 14.2928932,15.2928932 C14.6834175,14.9023689 15.3165825,14.9023689 15.7071068,15.2928932 L19.7071068,19.2928932 C20.0976311,19.6834175 20.0976311,20.3165825 19.7071068,20.7071068 C19.3165825,21.0976311 18.6834175,21.0976311 18.2928932,20.7071068 L14.2928932,16.7071068 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"></path>
                                                            <path d="M11,16 C13.7614237,16 16,13.7614237 16,11 C16,8.23857625 13.7614237,6 11,6 C8.23857625,6 6,8.23857625 6,11 C6,13.7614237 8.23857625,16 11,16 Z M11,18 C7.13400675,18 4,14.8659932 4,11 C4,7.13400675 7.13400675,4 11,4 C14.8659932,4 18,7.13400675 18,11 C18,14.8659932 14.8659932,18 11,18 Z" fill="#000000" fill-rule="nonzero"></path>
                                                        </g>
                                                    </svg>
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                              </div>
                            <div class="separator mb-2"></div>
                            <div class="card-body">
                                <table class="table table-rounded table-striped border gy-7 gs-7 m-0 m-0 td-margin-0">
                                    <thead>
                                        <tr class="fw-bold fs-6 text-gray-800 border-bottom border-gray-200">
                                            <th class="fw-bolder align-middle">Id</th>
                                            <th class="fw-bolder align-middle">Title</th>
                                            <th class="fw-bolder align-middle text-center">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody v-if="rolesData.length > 0">
                                        <tr v-for="(role,key) in rolesData" :key="key">
                                            <td class="align-middle" v-html="role.id"></td>
                                            <td class="align-middle" v-html="role.title"></td>
                                            <td class="align-middle action-td text-center">
                                                <ul class="list-unstyled list-inline m-0">
                                                    <li class="list-inline-item mb-2" title="View" v-tooltip="tooltip.show">
                                                        <button class="btn btn-sm btn-light-dark p-0 text-center h-30px w-30px" type="button"><i class="p-0 fa fa-eye"></i></button>
                                                        
                                                    </li>
                                                    <li class="list-inline-item mb-2" title="Edit" v-tooltip="tooltip.edit">
                                                        <button class="btn btn-sm btn-light-warning p-0 text-center h-30px w-30px" type="button"><i class="p-0 fa fa-edit"></i></button>
                                                    </li>
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                    <tbody v-if="rolesData.length == 0">
                                        <tr>
                                            <td colspan = '3'>No any Role.</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="col-md-12 col-12 mt-5">
                                    <div class="d-flex justify-content-end align-items-center flex-wrap">
                                        <pagination :rolesData="roles" :limit="2" @pagination-change-page="getRoles()"></pagination>
                                    </div>
                                </div>
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
import User from "../../apis/User";

export default {
    name:"roles",
    data() {
        return {
            roles:{},
            rolesData: [],
            loader_spin: false,
            disabled: false,
            model_show: false,
            excel_file: '',
            tooltip: {
                show: 'Show',
                edit: 'Edit',
                delete: 'Delete'
            },
            error: '',
            search: ''
        }
    },
    mounted(){
        this.getRoles()
    },
    methods:{
        async getRoles(page = 1) {
            this.loader_spin = true
            User.getRolesData(page, this.search).then(response => {
                this.roles = response.data.rolesData;
                this.rolesData = response.data.rolesData;
                this.loader_spin = false
            })
            .catch(error=> {
                this.roles = []
                this.loader_spin = false
                if (error.response.status === 401) {
                    this.$toast.error(error.response.data.message);
                    this.$router.push({ name: "Login" });
                }
            });
        },async searchClick(){
            this.getRoles();
        }
    }
}
</script>