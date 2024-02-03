let map;
let markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 35.6895, lng: 139.6917 }, // Default to Tokyo
        zoom: 13,
    });

    // TODO: Need to change this informations base on the google maps api
    const restaurants = [
        { name: "Restaurant A", type: "japanese", address: "Address A", location: { lat: 35.6895, lng: 139.6917 } },
        { name: "Restaurant B", type: "italian", address: "Address B", location: { lat: 35.6890, lng: 139.6900 } },
    ];

    // Add markers for each restaurant
    restaurants.forEach(restaurant => {
        const marker = new google.maps.Marker({
            position: restaurant.location,
            map: map,
            title: restaurant.name,
            type: restaurant.type,
        });

        marker.addListener("click", () => {
            displayRestaurantDetails(restaurant);
        });

        markers.push(marker);
    });

    // Add event listener for the filter panel
    document.getElementById("restaurant-type-filter").addEventListener("change", filterRestaurants);

    // Add event listener for the "Get Directions" button
    document.getElementById("get-directions").addEventListener("click", getDirections);
}

function displayRestaurantDetails(restaurant) {
    document.getElementById("restaurant-name").textContent = restaurant.name;
    document.getElementById("restaurant-type").textContent = "Type: " + restaurant.type;
    document.getElementById("restaurant-address").textContent = "Address: " + restaurant.address;
}

function filterRestaurants() {
    const selectedType = document.getElementById("restaurant-type-filter").value;

    markers.forEach(marker => {
        if (selectedType === "all" || marker.type === selectedType) {
            marker.setVisible(true);
        } else {
            marker.setVisible(false);
        }
    });
}

function getDirections() {
    alert("Getting directions...");
}
