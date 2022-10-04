import axios from 'axios'
import {TokenService} from '../services/storage.service'
// import store from '../store/index'
// // import i18n from "@/i18n";
// // /*
// // * MAIN_APP VUE INSTANCE */
// // import {vm} from '@/main'

// import UserService from "./user.service";

const ApiService = {

    // Stores the 401 interceptor position so that it can be later ejected when needed
    _401interceptor: null,

    init(baseURL) {
        axios.defaults.baseURL = baseURL;
    },

    setHeader() {
        axios.defaults.headers.common["Authorization"] = `Bearer ${TokenService.getToken()}`
    },

    removeHeader() {
        axios.defaults.headers.common = {}
    },

    get(resource) {
        return axios.get(resource)
    },

    post(resource, data) {
        // return axios.post(resource, data,
        //     {
        //         withCredentials: true
        //     })
         return axios.post(resource, data)
    },
    postFile(resource, data) {
        return axios.post(resource, data,
            {
                responseType: 'blob'
            })
    },
    postFileWithOutBlob(resource, data) {
        return axios.post(resource, data,
            {
                //responseType: 'blob'
            })
    },

    getFile(resource) {
        return axios.get(resource, {
            responseType: 'blob'
        })
    },
    formData(resource, data) {
        return axios.post(resource, data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
    },
    postWithCredentials(resource, data) {
        return axios.post(resource, data,
            {
                withCredentials: true
            })
    },
    getWithCredentials(resource) {
        return axios.get(resource,
            {
                withCredentials: true
            })
    },


    put(resource, data) {
        return axios.put(resource, data)
    },

    delete(resource) {
        return axios.delete(resource)
    },

    /**
     * Perform a custom Axios request.
     *
     * data is an object containing the following properties:
     *  - method
     *  - url
     *  - data ... request payload
     *  - auth (optional)
     *    - username
     *    - password
     **/
    customRequest(data) {
        return axios(data)
    },

    mount401Interceptor() {
        this._401interceptor = axios.interceptors.response.use(
            (response) => {
                return response
            },
            async (error) => {
                if (error.request) {
                    // if (error.request.status == 401) {
                    //     store.dispatch('auth/logout');
                    // }
                    // if (error.request.status === 403) {
                    //     /*
                    //     * IF USER DON'T HAVE PERMISSION FOR THIS API - SHOW NO_PERMISSION ERROR */
                    //     vm.$myMakeToast(i18n.t('actions.messages.no_permission'), i18n.t('actions.error'), 'danger')
                    // }
                    // if (error.request.status === 500) {
                    //     let response = JSON.parse(JSON.stringify(error.request.response))
                    //     store.commit('globalErrors/changeCurrentGlobalErrorMessage', JSON.parse(response))
                    //     // vm.$myMakeToast(response.title, i18n.t('actions.error'), 'danger');
                    // }
                    // /*if (error.request.status == 404) {
                    //     window.location.href = "/404"
                    // }*/
                }
                // If error was not 401 just reject as is
                throw error
            }
        )
    },

    unmount401Interceptor() {
        // Eject the interceptor
        axios.interceptors.response.eject(this._401interceptor)
    }
}

export default ApiService
