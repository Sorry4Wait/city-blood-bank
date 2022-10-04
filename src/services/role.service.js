import ApiService from "@/services/api.service";

const RoleService = {
    getRoleList:  async () => {
        return ApiService.get("/role/list");
    }
}
const PostService = {
    getPosts: ()=>{
        return ApiService.get("/posts")
    }
}



export default RoleService;
export { PostService};