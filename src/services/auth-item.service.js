import ApiService from "@/services/api.service";

const AuthItemService = {
    getList: async (filter) => {
        return ApiService.get(`/admin/auth-item/list?name=${filter.name}&description=${filter.description}&rule_name=${filter.rule_name}&created_at=${filter.created_at}&updated_at=${filter.updated_at}`);
    },
    create: async (data) => {
        return ApiService.post('/admin/auth-item/list', data);
    },
    update: async (data) => {
        return ApiService.put('/admin/auth-item/list', data);
    }
};


export default AuthItemService;
