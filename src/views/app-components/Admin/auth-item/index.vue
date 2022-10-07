<template>
  <div>
    <div class="row">
      <div class="col-md-2 offset-8">
        <button class="btn btn-elevated-primary m-1" @click="addNewItem">ADD</button>
      </div>
    </div>


    <table class="table stripped">
      <thead>
      <tr>
        <th>№</th>
        <th>NAME</th>
        <th>TYPE</th>
        <th>DESCRIPTION</th>
        <th>RULE-NAME</th>
        <th>DATA</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in itemsList" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.type }}</td>
        <td>{{ item.description }}</td>
        <td>{{ item.rule_name }}</td>
        <td>{{ item.data }}</td>
        <td>
          <a class="flex items-center mr-3" href="javascript:;"  @click="editItemInList(item)">
            <CheckSquareIcon class="w-4 h-4 mr-1" /> Edit
          </a>

        </td>
      </tr>
      </tbody>
    </table>
    <Modal
        :show="isOpen"
        @hidden="isOpen=false">
      <ModalHeader >{{isModeCreate ? 'Create' : titleEdit}}</ModalHeader>
      <ModalBody>
        <label for="name-input">Name:
          <input class="form-control" type="text" id="name-input" v-model="item.name"/>
        </label>
        <label for="type-input">Type:
          <input type="number" class="form-control" id="type-input" v-model="item.type"/>
        </label>
        <label for="description-input">Description:
          <input type="text" class="form-control" id="description-input" v-model="item.description"/>
        </label>
<!--        <label for="data-input">Data:-->
<!--          <input type="text" class="form-control" id="ruleName-input" v-model="item.data"/>-->
<!--        </label>-->
      </ModalBody>
      <ModalFooter>
        <button class="btn btn-info mx-3" @click="toggleModal">CANCEL</button>
        <button class="btn btn-success mx-3" @click="createOrUpdate">{{ isModeCreate ? 'SAVE' : 'UPDATE' }}</button>

      </ModalFooter>
    </Modal>
  </div>
</template>
<script setup>
import AuthItemService from "@/services/auth-item.service";
import {onMounted, ref, reactive, computed} from 'vue'
import {ModalHeader} from "@/global-components/modal";


const itemsList = ref([])
const  titleEdit = ref('')
const filter = reactive({
  name: "",
  description: "",
  rule_name: "",
  created_at: "",
  updated_at: "",
});
const isOpen = ref(false);
const mode = ref('create')
let item = reactive({
  name: "",
  type: "",
  description: "",
  rule_name: "",

});


async function getItemsList() {
  try {
    let response = await AuthItemService.getList(filter);
    itemsList.value = response.data.result.items
  } catch (e) {
    console.log(e)
  }

}

function toggleModal() {
  isOpen.value = !isOpen.value
  Object.assign(item,{
    name: "",
    type: "",
    description: "",
    rule_name: "",
  })
  titleEdit.value=''
}

function editItemInList(oneItem) {
  titleEdit.value=oneItem.name;
  mode.value = 'update';
  isOpen.value = true;
  const {name,type,description,rule_name} = oneItem;
  Object.assign(item, {name,type,description,rule_name});
  console.log(item)
}

async function editedItem(Item) {
  // try {
  //  let res = await AuthItemService.update(Item)
  // }catch(e){
  //   console.log(e)
  // }
  console.log(Item)
  toggleModal()
}

function addNewItem() {
  mode.value = 'create';
  isOpen.value = true;

}
async function createOrUpdate(){
  try {
    let response = await AuthItemService[`${mode.value}`](item);

    if(response.data.status < 300 && response.data.status > 200){
      // Success Toaster
    }else{
      // Error Toaster
    }
  } catch (e){

  }
}
async function addItem(Item) {
  console.log(Item)
  toggleModal()
}
const isModeCreate = computed(() => mode.value === 'create')
onMounted(() => {
  getItemsList()
})

</script>