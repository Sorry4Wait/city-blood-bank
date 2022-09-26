import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import globalComponents from "./global-components";
import utils from "./utils";
import "./assets/css/app.css";
import axios from 'axios'
import VueAxios from 'vue-axios';
import ApiService from '@/services/api.service';

import {TokenService} from '@/services/storage.service'

const app = createApp(App).use(router).use(createPinia());

globalComponents(app);
utils(app);
app.use(VueAxios, axios);
ApiService.init(import.meta.env.VITE_VUE_APP_ROOT_API);
if (TokenService.getToken()) {
    ApiService.setHeader();
    ApiService.mount401Interceptor();
}
app.mount("#app");
