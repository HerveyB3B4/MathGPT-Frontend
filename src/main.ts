import "./assets/main.css";
import "./style.css";

import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";
import pinia from "./stores";

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");
