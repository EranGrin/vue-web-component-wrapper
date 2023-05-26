import { createWebHashHistory, createRouter } from 'vue-router'
import { createI18n } from 'vue-i18n'
import { createStore } from 'vuex'
import { defaultRoutes } from '../main.routes'
import { store } from '../store/index'

export const pluginsWrapper = {
  install(GivenVue: any) {
    const Vue = GivenVue

    const createdStore = createStore(store)
    Vue.use(createdStore)

    const router = createRouter({
      history: createWebHashHistory(),
      routes: defaultRoutes,
    })
    Vue.use(router)

    const i18n = createI18n({
      locale: 'en',
      fallbackLocale: 'en',
    })
    Vue.use(i18n)
  },
}
