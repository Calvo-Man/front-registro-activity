/* eslint-disable prettier/prettier */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";


import { createVuetify } from "vuetify";
import "vuetify/styles";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import "@mdi/font/css/materialdesignicons.css"


const vuetify = createVuetify({
  components,
  directives,
  ssr: true,
});

createApp(App).use(store).use(router).use(vuetify).mount("#app");
