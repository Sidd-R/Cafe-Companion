"use client";
import React, { useState } from "react";
import {
  APIProvider,
  Map,
  Marker,
  InfoWindow,
} from "@vis.gl/react-google-maps";

interface Restaurant {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  additionalData: string;
  rating: number;
  strengths: string[];
  weaknesses: string[];
}

const MapComponent: React.FC = () => {
  const defaultCenter = { lat: 37.7749, lng: -122.4194 }; // Example coordinates for San Francisco
  const defaultZoom = 15;

  const restaurants: Restaurant[] = [
    {
      id: 1,
      name: "Restaurant 1",
      latitude: 37.7749,
      longitude: -122.4194,
      additionalData: "Some data for Restaurant 1",
      rating: 4.5,
      strengths: ["Strength 1", "Strength 2"],
      weaknesses: ["Weakness 1", "Weakness 2"],
    },
    {
      id: 2,
      name: "Restaurant 2",
      latitude: 37.7786,
      longitude: -122.4193,
      additionalData: "Some data for Restaurant 2",
      rating: 4.0,
      strengths: ["Strength 1", "Strength 2"],
      weaknesses: ["Weakness 1", "Weakness 2"],
    },
    // Add other restaurants here
  ];

  const [selectedRestaurant, setSelectedRestaurant] =
    useState<Restaurant | null>(null);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
      <div className="md:pl-64">
        <div style={{ height: "700px", width: "100%" }}>
          <Map>
            {restaurants.map((restaurant) => (
              <Marker
                key={restaurant.id}
                position={{
                  lat: restaurant.latitude,
                  lng: restaurant.longitude,
                }}
                onClick={() => setSelectedRestaurant(restaurant)}
                clickable={true}
              />
            ))}

            {selectedRestaurant && (
              <InfoWindow
                position={{
                  lat: selectedRestaurant.latitude,
                  lng: selectedRestaurant.longitude,
                }}
                onClose={() => setSelectedRestaurant(null)}
              >
                <div className="p-4">
                  <div className="flex justify-between">
                    Selected Restaurant
                    <div className="w-48">
                      <h3>{selectedRestaurant.name}</h3>
                      <p>{selectedRestaurant.additionalData}</p>
                      <p>Rating: {selectedRestaurant.rating}</p>
                      <p>
                        Strengths: {selectedRestaurant.strengths.join(", ")}
                      </p>
                      <p>
                        Weaknesses: {selectedRestaurant.weaknesses.join(", ")}
                      </p>
                    </div>

                    {/* Other Restaurant */}
                    <div className="w-48">
                      <h3>{restaurants[1].name}</h3>
                      <p>{restaurants[1].additionalData}</p>
                      <p>Rating: {restaurants[1].rating}</p>
                      <p>Strengths: {restaurants[1].strengths.join(", ")}</p>
                      <p>Weaknesses: {restaurants[1].weaknesses.join(", ")}</p>
                    </div>
                  </div>
                </div>
              </InfoWindow>
            )}
          </Map>
        </div>
      </div>
    </APIProvider>
  );
};

export default MapComponent;
