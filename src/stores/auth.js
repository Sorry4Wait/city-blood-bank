import {AuthenticationError, UserService} from '@/services/user.service'
import {TokenService} from '@/services/storage.service'
import router from '@/router'

import {defineStore} from "pinia";

export const auth = defineStore("auth", {
    state: () => {
        return {
            authenticating: false,
            accessToken: '',
            /* casl rules from json
            [
              {
                action: actionName,
                subject: subjectName
              }
             ]
             */
            rules: [],
            authenticationErrorCode: 0,
            authenticationError: '',
            refreshTokenPromise: null, // Holds the promise of the refresh token
            UserInfo: TokenService.getUserInfo(),
            localSessionId: null,
        }
    },
    // state: () => ({
    //
    // }),
    getters: {
        _loggedIn: (state) => {
            return state.accessToken ? true : false
        },

        _authenticationErrorCode: (state) => {
            return state.authenticationErrorCode
        },

        _authenticationError: (state) => {
            return state.authenticationError
        },

        _authenticating: (state) => {
            return state.authenticating
        }
    },
    actions: {

        async login({username, password}) {
            loginRequest(this);
            router.push('/');

            // try {
            //     const data = await UserService.login(username, password);
            //     mutations.loginSuccess(data).bind(this);
            //
            //     // Redirect the user to the page he first tried to visit or to the home view
            //     router.push(router.history.current.query.redirect || '/');
            //
            //     return true
            // } catch (e) {
            //     if (e instanceof AuthenticationError) {
            //         mutations.loginError({
            //             errorCode: e.errorCode,
            //             errorMessage: e.message,
            //             arrayOfMessage: e.arrayOfMessage
            //         }).bind(this)
            //     }
            //
            //     return false
            // }
        },


        async logout() {
            await UserService.logout();
            mutations.logoutSuccess().bind(this);
            await router.push('/login')
        }
    },
});

const loginRequest = (vm) => {
    vm.authenticating = true;
    vm.authenticationError = '';
    vm.rules = [
        {
            action: "canUpdatePost",
            subject: "perm"
        },
        {
            action: "canUpdateComment",
            subject: "perm"
        }
    ];
    vm.authenticationErrorCode = 0
};
const mutations = {

    setUserInfo(data) {
        this.UserInfo = data;
    },
    loginSuccess(data) {
        this.accessToken = data.token;
        this.permissions = data.userInfo.modules;
        this.UserInfo = data.userInfo;
        let formattedRules = [];
        if (data.userInfo.modules.length > 0) {
            formattedRules = data.userInfo.modules.map(perm => {
                let formattedObj = {};
                formattedObj.action = perm;
                formattedObj.subject = 'permissions'
                return formattedObj;
            })
        }
        this.rules = formattedRules;
        this.authenticating = false;
    },

    loginError({errorCode, errorMessage, arrayOfMessage}) {
        this.authenticating = false
        this.authenticationErrorCode = errorCode;
        this.authenticationError = arrayOfMessage

    },

    logoutSuccess() {
        this.accessToken = '';
        this.UserInfo = {}
    },

    refreshTokenPromise(promise) {
        this.refreshTokenPromise = promise
    }
}

