import React from "react";

interface MarkerProps {
  lat: number;
  lng: number;
  onClick?: () => void;
}

const Marker: React.FC<MarkerProps> = ({ lat, lng, onClick }) => {
  return (
    <div
      style={{
        width: "20px",
        height: "20px",
        borderRadius: "50%",
        backgroundColor: "red",
        border: "2px solid white",
        cursor: "pointer",
      }}
      onClick={onClick}
    ></div>
  );
};

export default Marker;
