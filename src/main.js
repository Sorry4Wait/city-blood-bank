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
import i18n from "./i18n";
import { abilitiesPlugin } from '@casl/vue';
import {ability,abilityPlugin as abilityPluginLocal} from '@/stores/ability';



const piniaApp = createPinia();
piniaApp.use(abilityPluginLocal);
const app = createApp(App);

globalComponents(app);
utils(app);
// Pinia state
app.use(piniaApp);
// for
app.use(VueAxios, axios);
// internationalization
app.use(i18n);
// vue router
app.use(router);

/* FOR MANAGING USER PERMISSIONS */
app.use(abilitiesPlugin, ability, {
    useGlobalProperties: true
});
/* FOR MANAGING USER PERMISSIONS */


ApiService.init(import.meta.env.VITE_VUE_APP_ROOT_API);
if (TokenService.getToken()) {
    ApiService.setHeader();
    ApiService.mount401Interceptor();
}
app.mount("#app");
