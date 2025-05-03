import StoryListPresenter from "./presenter/storyListPresenter.js";
import AddStoryPresenter from "./presenter/addStoryPresenter.js";

const routes = {
  "/": StoryListPresenter,
  "/add": AddStoryPresenter,
};

export function initRouter() {
  window.addEventListener("hashchange", renderPage);
  renderPage();
}

function renderPage() {
  const app = document.getElementById("app");
  const hash = window.location.hash.slice(1).toLowerCase() || "/";
  const Page = routes[hash] || StoryListPresenter;

  app.innerHTML = "";
  Page.render(app);
}
