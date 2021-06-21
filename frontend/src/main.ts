import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faComment,
  faBars,
  faPlusSquare,
  faTrash,
  faArrowLeft,
  faPlus,
  faThumbsUp,
  faEdit,
  faUser,
  faPowerOff
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import store from "./store";

library.add(
  faThumbsUp,
  faComment,
  faBars,
  faPlusSquare,
  faTrash,
  faArrowLeft,
  faPlus,
  faEdit,
  faUser,
  faPowerOff
);

createApp(App)
  .use(store)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
