import StoryApi from "../api.js";
import L from "leaflet";

const StoryListPresenter = {
  async render(container) {
    container.innerHTML = `
      <section>
        <h2>Daftar Cerita</h2>
        <div id="story-list" class="story-list"></div>
        <div id="map" style="height: 400px;"></div>
      </section>
    `;

    try {
      const { listStory } = await StoryApi.getStories();
      const storyList = document.querySelector("#story-list");

      listStory.forEach((story) => {
        const storyItem = document.createElement("article");
        storyItem.innerHTML = `
          <img src="${story.photoUrl}" alt="Foto cerita oleh ${story.name}" />
          <h3>${story.name}</h3>
          <p>${story.description}</p>
          <small>${new Date(story.createdAt).toLocaleString()}</small>
        `;
        storyList.appendChild(storyItem);
      });

      // Inisialisasi peta
      const map = L.map("map").setView([-7.250445, 112.768845], 5);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map);

      listStory.forEach((story) => {
        if (story.lat && story.lon) {
          const marker = L.marker([story.lat, story.lon]).addTo(map);
          marker
            .bindPopup(`<b>${story.name}</b><br>${story.description}`)
            .openPopup();
        }
      });
    } catch (error) {
      container.innerHTML += `<p>Error memuat cerita: ${error.message}</p>`;
    }
  },
};

export default StoryListPresenter;
