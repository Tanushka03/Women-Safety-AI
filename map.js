// Create map
const map = L.map("map").setView([17.385, 78.486], 13);

// OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

// Demo risk zones
const places = [
    { lat: 17.390, lng: 78.485, risk: "high", incidents: 23 },
    { lat: 17.382, lng: 78.490, risk: "medium", incidents: 12 },
    { lat: 17.376, lng: 78.478, risk: "low", incidents: 3 }
];

places.forEach(place => {

    let color =
        place.risk === "high" ? "#dc2626" :
        place.risk === "medium" ? "#f59e0b" :
        "#16a34a";

    const score = Math.max(40, 100 - place.incidents * 2);

    L.circle([place.lat, place.lng], {
        color,
        fillColor: color,
        fillOpacity: 0.35,
        radius: 350
    })
    .addTo(map)
    .bindPopup(`
        <b>${place.risk.toUpperCase()} RISK</b><br>
        Safety Score: ${score}/100<br>
        Incidents: ${place.incidents}<br>
        AI Advice: Avoid this area after 8 PM.
    `);
});

// Current location
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {

        const user = [
            position.coords.latitude,
            position.coords.longitude
        ];

        L.marker(user)
            .addTo(map)
            .bindPopup("Your Current Location");

    });
}

// Demo safer route
let route;

document.getElementById("routeBtn").addEventListener("click", () => {

    if (route) map.removeLayer(route);

    route = L.polyline([
        [17.376, 78.478],
        [17.381, 78.482],
        [17.386, 78.486],
        [17.390, 78.492]
    ], {
        color: "#2563eb",
        weight: 6
    }).addTo(map);

    map.fitBounds(route.getBounds());
});