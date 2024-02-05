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

## NOTES
### WHY I CHOSE THIS METHOD
The provided code is a JavaScript application that utilizes the Google Maps JavaScript API to display a map of Tokyo and retrieve information about nearby restaurants. The application allows users to filter restaurants by type and view details such as name, type, address, ratings, and travel time from a default location (Tokyo). It calculates and displays the route and travel time using the DirectionsService and DirectionsRenderer provided by the Google Maps API. The restaurant data is obtained through the Nearby Search service of the Places API, which fetches restaurants based on a specified location, radius, and type.
The choice of using the Google Maps API for both map rendering and place retrieval is appropriate as it provides a comprehensive set of functionalities for map-related tasks. The application is well-structured, with separate functions for initializing the map, creating markers, displaying restaurant details, filtering restaurants, and calculating routes.

### LIMITATIONS 
One limitation is the potential issue with limited API quotas, as mentioned in a comment. The Nearby Search service may not fetch all restaurants in Tokyo due to these limitations. To improve this, We need to have an API key that is not a free subscription. Additionally, the application could benefit from user authentication to increase the quota limits and provide a more personalized experience, allowing users to save favorite restaurants or contribute reviews.

### IMPROVEMENTS IN THE FUTURE
In the future, improvements could include implementing a more sophisticated filtering system, incorporating user reviews, and enhancing the user interface for a better user experience. Furthermore, considering the constant evolution of APIs and libraries, keeping the codebase updated with the latest best practices and features would contribute to the long-term sustainability and performance of the application. Implementing constants and removing static filter choices. I would also like to use a framework such as ReactJS to improve the software architecture and stay updated with other technologies and libraries. I would also like to use this package library(https://www.npmjs.com/package/@react-google-maps/API) if I'm going to use the ReactJS framework.
