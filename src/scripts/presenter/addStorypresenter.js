import { addStory } from "../api.js";
import { map } from "../map.js";
import { camera } from "../camera.js";

class AddStoryPresenter {
  static async render() {
    const container = document.querySelector("#app");
    container.innerHTML = `
      <h2>Tambah Cerita Baru</h2>
      <form id="addStoryForm">
        <label for="name">Nama Cerita:</label>
        <input type="text" id="name" name="name" required>

        <label for="description">Deskripsi Cerita:</label>
        <textarea id="description" name="description" required></textarea>

        <label for="location">Lokasi (Klik peta):</label>
        <div id="map"></div>

        <label for="image">Ambil Gambar:</label>
        <button type="button" id="takeImageButton">Ambil Gambar</button>
        <input type="file" id="image" name="image" accept="image/*" hidden required>

        <button type="submit">Tambah Cerita</button>
      </form>
      <div id="message"></div>
    `;
    map.init();

    const form = document.querySelector("#addStoryForm");
    form.addEventListener("submit", (event) => this.handleSubmit(event));
    document
      .querySelector("#takeImageButton")
      .addEventListener("click", camera.start);

    const message = document.querySelector("#message");
    message.textContent = "";
  }

  static async handleSubmit(event) {
    event.preventDefault();

    const name = document.querySelector("#name").value;
    const description = document.querySelector("#description").value;
    const image = document.querySelector("#image").files[0];
    const location = map.getLocation();

    if (!location) {
      alert("Tolong pilih lokasi di peta.");
      return;
    }

    if (!image) {
      alert("Tolong ambil gambar untuk cerita.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("lat", location.lat);
    formData.append("lon", location.lon);

    try {
      const response = await addStory(formData);
      document.querySelector("#message").textContent =
        "Cerita berhasil ditambahkan!";
      form.reset();
    } catch (error) {
      document.querySelector("#message").textContent =
        "Terjadi kesalahan, coba lagi!";
    }
  }
}

export default AddStoryPresenter;
