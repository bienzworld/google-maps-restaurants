let map;
let markers = [];
let directionsService;
let directionsRenderer;
let tokyoLocation;
let travelDuration;

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 35.6895, lng: 139.6917 }, // Default to Tokyo
        zoom: 13,
    });

    // Initialize google maps directions service and renderer
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
    });

    tokyoLocation = new google.maps.LatLng(35.6895, 139.6917); // Tokyo coordinates
    getRestaurants(tokyoLocation);

    // Add event listener for the filter panel
    document.getElementById("restaurant-type-filter").addEventListener("change", filterRestaurants);
}

function createMarker(restaurant) {
    // Remove "point_of_interest" and "establishment" from types (No need to display this)
    const filteredTypes = restaurant.types.filter(type => type !== "point_of_interest" && type !== "establishment"); 

    // Marks restaurants nearby Tokyo
    const marker = new google.maps.Marker({
        position: restaurant.geometry.location,
        map: map,
        title: restaurant.name,
        type: filteredTypes,
    });

    // Calculates travel time from origin to destination
    marker.addListener("click", () => {
        calculateAndDisplayRoute(restaurant.geometry.location, (duration) => {
            displayRestaurantDetails(restaurant, duration);
        });
    });

    markers.push(marker);
}

function displayRestaurantDetails(restaurant, duration) {
    const filteredTypes = restaurant.types.filter(type => type !== "point_of_interest" && type !== "establishment");

    // Set restaurant name
    document.getElementById("restaurant-name").textContent = restaurant.name;

    // Set restaurant type
    document.getElementById("restaurant-type").textContent = "Type: " + filteredTypes;

    // Set restaurant address
    document.getElementById("restaurant-address").textContent = "Address: " + restaurant.vicinity;

    // Set Restaurant ratings with stars
    document.getElementById("restaurant-ratings").textContent = "Ratings: " + restaurant.rating;
    const ratingsElement = document.getElementById("restaurant-ratings-stars");
    ratingsElement.innerHTML = getStarRatingHTML(restaurant.rating);

    // Set all user ratings in total
    document.getElementById("restaurant-user-rating-total").textContent = "User ratings total: " + restaurant.user_ratings_total;

    // Set travel time
    document.getElementById("restaurant-travel-time").textContent = "Travel time: " + duration;

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
        const defaultImageUrl = "assets/restaurant.jpg";
        const imgElement = document.createElement("img");
        imgElement.src = defaultImageUrl;
        imgElement.alt = "Default Image";

        // Set width and height for the default image
        imgElement.width = 150;
        imgElement.height = 100;

        document.getElementById("restaurant-image").appendChild(imgElement);
    }
}

function getStarRatingHTML(rating) {
    // Convert ratings into star 
    const roundedRating = Math.round(rating * 2) / 2; // Round to the nearest 0.5
    const starsHTML = '<span class="star">&#9733;</span>'.repeat(roundedRating);
    return "Stars: " +  starsHTML;
}

function filterRestaurants() {
    // Filter restaurant types base on the selected restaurant types
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
    // Search restaurant nearby tokyo
    const request = {
        location: location,
        radius: 500000,
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

function calculateAndDisplayRoute(destination, callback) {
    // Calculate distance via travel mode
    const travelMode = document.getElementById("travel-mode").value;

    const request = {
        origin: tokyoLocation,
        destination: destination,
        travelMode: google.maps.TravelMode[travelMode],
    };

    directionsService.route(request, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            const { routes } = result;
            const route = routes[0];

            const totalDuration = route.legs.reduce((acc, leg) => acc + leg.duration.value, 0);
            const travelDuration = formatDuration(totalDuration);

            directionsRenderer.setDirections(result);

            if (typeof callback === 'function') {
                callback(travelDuration);
            } else {
                console.error('Callback is not a function');
            }
        } else {
            console.error(`Error calculating directions to ${destination}: ${status}`);
        }
    });
}

function formatDuration(durationInSeconds) {
    // Format travel duration
    const hours = Math.floor(durationInSeconds / 3600);
    const minutes = Math.floor((durationInSeconds % 3600) / 60);
    return `${hours}h ${minutes}m`;
}