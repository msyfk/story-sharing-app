// src/scripts/router.js
import StoryListPresenter from "./presenter/storyListPresenter.js";
import AddStoryPresenter from "./presenter/addStoryPresenter.js";
import ViewTransition from "./view-transition.js";

const routes = {
  "": StoryListPresenter,
  "#/": StoryListPresenter,
  "#/add": AddStoryPresenter,
};

const router = () => {
  const container = document.querySelector("#app");
  const page = routes[location.hash] || StoryListPresenter;

  // Fokus ke konten utama untuk skip link
  const main = document.querySelector("main");
  if (main) main.setAttribute("tabindex", "-1");

  ViewTransition.showView((target) => {
    page.render(target);
    if (main) main.focus();
  }, container);
};

window.addEventListener("hashchange", router);
window.addEventListener("load", router);
