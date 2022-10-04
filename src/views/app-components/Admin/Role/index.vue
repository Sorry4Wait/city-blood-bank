<template>

    <div  v-for="(post) in posts">
      <li>{{post.title}}</li>

    </div>
</template>
<script setup>

import {PostService} from "@/services/role.service";
import {onMounted, ref} from "vue";
import UserService from "@/services/user.service";

const posts = ref([]);

// async function getPostList(){
//   await PostService.getPosts().then(res => {
//       posts.value=res.data
//     })
// }
async function  getPostList(){
  try {
    let response = await PostService.getPosts();
    posts.value = response.data;
  } catch (e){

  }
}

onMounted(() => {
  getPostList()
    }
)


</script>




// import RoleService from "@/services/role.service";

// RoleService.getRoleList();