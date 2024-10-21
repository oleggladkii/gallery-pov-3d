import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import "@/scss/styles.scss";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { PiniaSharedState } from "pinia-shared-state";
import { Quasar, QCard, QBtn, QCircularProgress } from "quasar";

import "@quasar/extras/material-icons/material-icons.css";
import "quasar/src/css/index.sass";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
pinia.use(PiniaSharedState({ enable: true, initialize: true, type: "native" }));

const app = createApp(App);

app
  .use(pinia)
  .use(router)
  .use(Quasar, {
    plugins: {},
    components: {
      QCard,
      QBtn,
      QCircularProgress,
    },
  })
  .mount("#app");
