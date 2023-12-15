import { createApp } from "vue";
import router from "@/router";
import { createPinia } from "pinia";
import App from "@/App.vue";
import "../style.css";

const store = createPinia();
const app = createApp(App);

app.use(store);
app.use(router);

app.mount("#app");
