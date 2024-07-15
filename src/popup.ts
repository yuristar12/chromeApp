import Popup from "./pages/Popup.vue";
import { createApp } from "vue";
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';


createApp(Popup).use(ArcoVue).use(ArcoVueIcon).mount("body");
