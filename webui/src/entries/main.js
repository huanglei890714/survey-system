// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import apis from './../apis'
import router from './../router'

Vue.config.productionTip = false

Vue.use(Element)

apis.initialize('/api/v1')

Vue.use({
    install (vue) {
        vue.prototype.$apis = {}
        for (const item of apis.modName) {
            vue.prototype.$apis[item] = apis.models[item]
        }
    }
})

new Vue({
    router,
    ...App
}).$mount('#app')

