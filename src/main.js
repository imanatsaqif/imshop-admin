// src/main.js
import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import blue from "@/plugins/blue.js";
import "./styles/blue.scss";
import { vFocus, vClickOutside } from "@/directives";
import "@blibli/blue-dls-utils/dist/scss/_box-sizing-helper.scss";

const shouldLoadMock = import.meta.env.VITE_MOCK_ENV === "true";

const initializeApplication = async () => {
  if (shouldLoadMock) {
    try {
      const mockModule = await import("@mocks");
    } catch (error) {
      console.warn("Failed to load mock API:", error);
    }
  }

  // Create and mount app
  const app = createApp(App);
  app.use(createPinia());
  app.use(router);
  app.use(blue);
  app.directive("focus", vFocus);
  app.directive("click-outside", vClickOutside);
  app.mount("#app");
};
initializeApplication().catch((error) => {
  console.error("Application failed to initialize:", error);
});
