import { createWebHashHistory, createRouter } from 'vue-router'
import { createI18n } from 'vue-i18n'
import { createStore } from 'vuex'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { defaultRoutes } from '../main.routes'
import { store } from '../store/index'

export const pluginsWrapper = {
  install(GivenVue: any) {
    const Vue = GivenVue

    //Vuex
    const createdStore = createStore(store)
    Vue.use(createdStore)

    //Pinia
    const pinia = createPinia()
    pinia.use(piniaPluginPersistedstate)
    Vue.use(pinia)

    //Vue Router
    const router = createRouter({
      history: createWebHashHistory(),
      routes: defaultRoutes,
    })
    Vue.use(router)

    //Vue I18n
    const i18n = createI18n({
      locale: 'en',
      fallbackLocale: 'en',
    })
    Vue.use(i18n)
  },
}
