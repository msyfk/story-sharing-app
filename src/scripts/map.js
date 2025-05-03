import L from "leaflet";

const mapElement = document.getElementById("map");
let mapInstance = null;
let currentLocation = { lat: 0, lon: 0 };

const init = () => {
  mapInstance = L.map(mapElement).setView([0, 0], 2);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
    mapInstance
  );

  mapInstance.on("click", (e) => {
    currentLocation = e.latlng;
    L.marker(e.latlng)
      .addTo(mapInstance)
      .bindPopup("Lokasi cerita")
      .openPopup();
  });
};

const getLocation = () => currentLocation;

export const map = { init, getLocation };
