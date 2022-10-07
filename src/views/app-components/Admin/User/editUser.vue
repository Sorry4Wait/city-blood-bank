<template>
  <div class="mt-5">
    <form class="border border-indigo-100"  style="width: 700px !important; margin-left: 100px;">
      <div class="text text-center p-3"> <h1 class="uppercase">{{titleEdit}}</h1></div>
      <hr/>
      <div class="p-5 text-start form-group  ">
        <label>User Name:  <input class="form-control my-1" type="text" v-model="editingUser.username"  /></label>
        <label>Email: <input type="email" class="form-control my-1" v-model="editingUser.email"  /></label>
        <label>Status: <input type="number" class="form-control my-1"  v-model="editingUser.status"  /></label>
        <label>Password: <input type="password" class="form-control my-1"  v-model="editingUser.password" /></label>
      </div>
      <div class="px-5 pb-8 text-center">
        <button
            type="button"
            @click="navigate"
            class="btn btn-outline-secondary w-24 mr-1"
        >
          Cancel
        </button>
        <button type="button" class="btn btn-primary w-24 mx-2"  @click="updateUser(editingUser)">SAVE</button>
      </div>
    </form>
  </div>
</template>
<script setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted, reactive, ref} from "vue";
import {AdminUserService} from "@/services/user.service";

const route = useRoute()
const router = useRouter()
const id = ref('')
const titleEdit = ref('')
const editingUser=reactive({
  id:'',
  username:'',
  email:'',
  status:'',
  password:'',
  auth_items:[]
})
function navigate(){
  router.push('/admin-user')
}

async function getById(userId){
   try{
     let response = await AdminUserService.getById(userId)
     let a = response.data.result
     Object.assign(editingUser, {id:a.id, username:a.username, email:a.email, status:a.status, auth_items:[] } )
     titleEdit.value= editingUser.username
     console.log(editingUser)
     if(response.data.status < 300 && response.data.status > 200){
       // let editUser = response.data.result

       // Success Toaster
     }else{
       // Error Toaster
     }

  }catch(e){
     console.log(e)
   }

}
async function updateUser(user){
   try{
    let reponse = await AdminUserService.update(user)
     navigate()
  }catch(e){
    console.log(e)
  }

}


onMounted(()=>{
  id.value=route.params.id
  getById(id.value)

})



</script>