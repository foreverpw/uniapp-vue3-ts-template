import { createSSRApp } from "vue";
import App from "./App.vue";
import "./styles/main.scss";

export function createApp() {
  const app = createSSRApp(App);
  return {
    app,
  };
}
