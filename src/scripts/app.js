import { initRouter } from "./router.js";
import { applyViewTransition } from "./view-transition.js";

document.addEventListener("DOMContentLoaded", () => {
  applyViewTransition();
  initRouter();
});
