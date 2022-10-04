import {Ability} from '@casl/ability';

export const ability = new Ability();

export const abilityPlugin =  ({store}) => {
    if (store.$id === 'auth') {
        ability.update(store.$state.rules);
        store.$subscribe((mutation, state) => {
            ability.update(state.rules);
            localStorage.setItem('rules', JSON.stringify(state.rules))
        })
    }
    // store.$onAction((actions) => {
    //     // react to store actions
    // })
    // ability.update(store.state.auth.rules);
    //
    // return store.subscribe((mutation) => {
    //     let formattedRules = [];
    //     switch (mutation.type) {
    //         case 'auth/loginSuccess':
    //             if (mutation.payload.userInfo.modules.length > 0) {
    //                 formattedRules = mutation.payload.userInfo.modules.map(perm => {
    //                     let formattedObj = {};
    //                     formattedObj.actions = perm;
    //                     formattedObj.subject = 'permissions';
    //                     return formattedObj;
    //                 })
    //             }
    //             ability.update(formattedRules);
    //             break;
    //         case 'auth/logoutSuccess':
    //             ability.update([{actions: 'read', subject: 'all'}])
    //             break
    //     }
    // })
};
