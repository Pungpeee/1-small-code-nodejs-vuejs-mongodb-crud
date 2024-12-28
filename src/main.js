import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/tailwind.css'
import content from '@/components/content.vue'
import navBar from '@/components/navBar.vue'



createApp(App).component('content-layout',content)
.component('navBar-layout',navBar)



.use(store).use(router).mount('#app')
