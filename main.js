let map;
let markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 35.6895, lng: 139.6917 }, // Default to Tokyo
        zoom: 13,
    });

    const tokyoLocation = new google.maps.LatLng(35.6895, 139.6917); // Tokyo coordinates
    getRestaurants(tokyoLocation);
       
    // Add event listener for the filter panel
    document.getElementById("restaurant-type-filter").addEventListener("change", filterRestaurants);

    // Add event listener for the "Get Directions" button
    document.getElementById("get-directions").addEventListener("click", getDirections);
}

function createMarker(restaurant) {
    // Remove "point_of_interest" and "establishment" from types (No need to display this)
    const filteredTypes = restaurant.types.filter(type => type !== "point_of_interest" && type !== "establishment"); 

    const marker = new google.maps.Marker({
        position: restaurant.geometry.location,
        map: map,
        title: restaurant.name,
        type: filteredTypes,
    });

    marker.addListener("click", () => {
        displayRestaurantDetails(restaurant);
    });

    markers.push(marker);
}

function displayRestaurantDetails(restaurant) {
    const filteredTypes = restaurant.types.filter(type => type !== "point_of_interest" && type !== "establishment");

    // Set restaurant name
    document.getElementById("restaurant-name").textContent = restaurant.name;

    // Set restaurant type
    document.getElementById("restaurant-type").textContent = "Type: " + filteredTypes;

    // Set restaurant address
    document.getElementById("restaurant-address").textContent = "Address: " + restaurant.vicinity;

    // Set Restaurant ratings
    document.getElementById("restaurant-ratings").textContent = "Ratings: " + restaurant.rating;

    // Set all user ratings in total
    document.getElementById("restaurant-user-rating-total").textContent = "User Ratings Total: " + restaurant.user_ratings_total;

    // Clear existing content of #restaurant-image
    document.getElementById("restaurant-image").innerHTML = "Images: ";

    // Add restaurant image
    if (restaurant.photos && restaurant.photos.length > 0) {
        const photoUrl = restaurant.photos[0].getUrl();
        const imgElement = document.createElement("img");
        imgElement.src = photoUrl;
        imgElement.alt = "Restaurant Image";

        // Set width and height
        imgElement.width = 150;
        imgElement.height = 100;

        document.getElementById("restaurant-image").appendChild(imgElement);
    } else {
        // If there is no photo, default image will be displayed
        const defaultImageUrl = "restaurant.jpg";
        const imgElement = document.createElement("img");
        imgElement.src = defaultImageUrl;
        imgElement.alt = "Default Image";

        // Set width and height for the default image
        imgElement.width = 150;
        imgElement.height = 100;

        document.getElementById("restaurant-image").appendChild(imgElement);
    }
}

function filterRestaurants() {
    const selectedType = document.getElementById("restaurant-type-filter").value;

    markers.forEach(marker => {
        const markerTypes = Array.isArray(marker.type) ? marker.type : [marker.type];

        if (selectedType === "all" || markerTypes.includes(selectedType)) {
            marker.setVisible(true);
        } else {
            marker.setVisible(false);
        }
    });
}

function getRestaurants(location) {
    const request = {
        location: location,
        radius: 500000, // Set a large radius (e.g., 50 kilometers) to cover all of Tokyo
        types: ['restaurant'],
        key: 'AIzaSyBB_ToB_1Bx5peJF9WU5L54yFveqmrqasg',
    };

    const service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            // Process each restaurant and create a marker (This will not get all restaurants in tokyo due to limited qoutas or request)
            results.forEach(restaurant => {
                createMarker(restaurant);
            });
        } else {
            console.error('Error fetching restaurants:', status);
        }
    });
}

// TODO: Get Direction from origin.
function getDirections() {
    alert("Getting directions...");
}
