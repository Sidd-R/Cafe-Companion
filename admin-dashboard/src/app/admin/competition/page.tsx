"use client";
import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import Marker from "@/components/Marker";

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

  const handleMarkerClick = (restaurant: Restaurant) => {
    console.log("Restaurant clicked:", restaurant);
    setSelectedRestaurant(restaurant);
  };

  return (
    <div className="md:pl-64">
      <div style={{ height: "700px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
          }}
          defaultCenter={defaultCenter}
          defaultZoom={defaultZoom}
        >
          {restaurants.map((restaurant) => (
            <Marker
              key={restaurant.id}
              lat={restaurant.latitude}
              lng={restaurant.longitude}
              onClick={() => handleMarkerClick(restaurant)}
            />
          ))}

          {selectedRestaurant && (
            <div
              style={{
                position: "absolute",
                top: selectedRestaurant.latitude,
                left: selectedRestaurant.longitude,
                backgroundColor: "white",
                padding: "10px",
                border: "1px solid black",
                zIndex: 1,
              }}
            >
              <h3>{selectedRestaurant.name}</h3>
              <p>{selectedRestaurant.additionalData}</p>
              <p>Rating: {selectedRestaurant.rating}</p>
              <p>Strengths: {selectedRestaurant.strengths.join(", ")}</p>
              <p>Weaknesses: {selectedRestaurant.weaknesses.join(", ")}</p>
            </div>
          )}
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default MapComponent;
