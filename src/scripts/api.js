const BASE_URL = "https://story-api.dicoding.dev/v1";

async function getStories() {
  const response = await fetch(`${BASE_URL}/stories`);
  if (!response.ok) throw new Error("Gagal mengambil data cerita");
  const data = await response.json();
  return data.listStory;
}

async function addStory({ description, lat, lon }) {
  const token = localStorage.getItem("token"); // atau cara lain sesuai implementasi
  const response = await fetch(`${BASE_URL}/stories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ description, lat, lon }),
  });
  if (!response.ok) throw new Error("Gagal menambahkan cerita");
  return await response.json();
}

// 👇 export default agar bisa diimport sebagai "StoryApi"
const StoryApi = { getStories, addStory };
export default StoryApi;

// 👇 export named agar bisa diimport seperti: import { addStory }
export { getStories, addStory };
