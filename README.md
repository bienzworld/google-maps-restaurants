# Tokyo Restaurants Map

This is a simple web application that displays restaurants on a map in Tokyo and provides details about selected restaurants, including travel time from a default location (Tokyo) using Google Maps API.

## Features

- **Interactive Map**: Displays a map of Tokyo with markers for nearby restaurants.
- **Filtering**: Allows users to filter restaurants based on their types (e.g., restaurant, cafe, spa, bar).
- **Restaurant Details**: Clicking on a restaurant marker provides details such as name, type, address, ratings, user ratings total, and an image (if available).
- **Travel Time**: Calculates and displays travel time from Tokyo to the selected restaurant based on different travel modes (walking, bicycling, driving, transit).

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/bienzworld/google-maps-restaurants.git
   cd google-maps-restaurants
   ```

2. Open `http://127.0.0.1:3000/client/index.html` in a web browser.

3. Explore the Tokyo map, filter restaurants, and click on markers to view details.

## Dependencies

- [Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/overview)
- [Google Places API](https://developers.google.com/maps/documentation/javascript/places)

## Usage

- **Filtering**: Use the dropdown in the filter panel to select a specific restaurant type.
- **Travel Mode**: Choose a travel mode (walking, bicycling, driving, transit) from the dropdown to see different travel times.
- **Restaurant Details**: Click on a restaurant marker on the map to see detailed information.

## Acknowledgments

- Built with the Google Maps JavaScript API.
- Restaurant data provided by the Google Places API.

Feel free to contribute, report issues, or suggest improvements!