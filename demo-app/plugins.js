
import { createWebHashHistory, createRouter } from "vue-router";
import { createI18n } from 'vue-i18n';
import { createStore } from 'vuex'
import { defaultRoutes} from './src/main.routes.js'
import {store} from './src/store/index.js'


export default {
    install(GivenVue) {
        const Vue = GivenVue;

        const createdStore = createStore(store)
        Vue.use(createdStore)

        const router = createRouter({
            history: createWebHashHistory(),
            routes: defaultRoutes,
        })
        Vue.use(router);
           
        const i18n = createI18n()
        Vue.use(i18n);
    },
};
