<template>
  <div id="map" style="height: 400px"></div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: "StreetMap",
  props: {
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    // Erstelle eine Karte
    const map = L.map("map").setView([this.latitude, this.longitude], 20);

    // Füge OpenStreetMap als TileLayer hinzu
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors",
    }).addTo(map);

    // Icons
    const customIcon = new L.Icon({
      iconUrl: "/assets/marker-icon.png", // CDN für Marker
      iconSize: [25, 41], // Standardgröße für Marker
      iconAnchor: [12, 41], // Den Anker des Markers setzen (wo der Marker auf die Karte gesetzt wird)
      popupAnchor: [1, -34], // Popup-Position relativ zum Marker
      shadowUrl: "/assets/marker-shadow.png", // Marker Schatten
      shadowSize: [41, 41], // Größe des Schattens
      shadowAnchor: [12, 41], // Position des Schattens
    });

    // Markiere den Standort mit einem benutzerdefinierten Marker
    const marker = L.marker([this.latitude, this.longitude], {
      icon: customIcon,
    }).addTo(map); // Position des Markers
    marker.bindPopup("HCI-TUB").openPopup(); // Popup beim Klick auf Marker
  },
};
</script>

<style scoped>
#map {
  width: 75%;
  height: 400px;
}
</style>
