import axios from "axios";
import { useState, useEffect } from "react";
import { IPlaces } from "../models/IPlaces";
import { CircleMarker, Popup, TileLayer, useMapEvent } from "react-leaflet";
import { MapContainer } from "react-leaflet";

export const PollutionMapTest = () => {
  const [places, setPlaces] = useState<IPlaces[]>([]);
  const [zoomLevel, setZoomLevel] = useState(4);

  const getMarkerColor = (value: number) => {
    if (value < 12.5) return "#8EFF44";
    if (value < 25) return "#F8FF73";
    if (value < 50) return "#FFB24D";
    if (value < 150) return "#DE0C4A";
    return "#580822";
  };

  // useEffect(() => {
  //   const fetchData = async (): Promise<IPlaces[]> => {
  //     try {
  //       const response = await axios.get("http://localhost:3000/nightingale2");
  //       setPlaces(response.data);
  //       return response.data;
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //       return [];
  //     }
  //   };
  //   fetchData();
  // }, []);

  const ZoomHandler = () => {
    useMapEvent("zoomend", (event) => {
      setZoomLevel(event.target.getZoom());
    });
    return null;
  };

  console.log("Hämtad data", places);
  return (
    <>
      <div className="box-container">
        <div className="map-container">
          <h2>POLLUTION MAP</h2>

          <MapContainer
            center={[54.526, 15.2551]}
            zoom={4}
            scrollWheelZoom={true}
            // ref={mapRef}
          >
            <ZoomHandler />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {places
              .filter((place) => {
                // Begränsa antalet renderade markörer beroende på zoomnivå
                if (zoomLevel >= 8) return true; // Visa alla markörer från zoom 8 och uppåt
                if (zoomLevel >= 5 && place.value >= 50) return true; // Vid zoom 5-7, visa markörer med högre PM2.5-värden
                if (zoomLevel >= 3 && place.value >= 100) return true; // Vid zoom 3-4, visa endast de högsta värdena
                return false; // Dölj markörer vid lägre zoomnivåer
              })
              .map((place, index) => (
                <CircleMarker
                  key={index}
                  center={[place.latitude, place.longitude]}
                  radius={1}
                  fillColor="transparent"
                  color={getMarkerColor(place.value)}
                  weight={5}
                  stroke={true}
                >
                  <Popup>
                    <strong>{place.country}</strong>
                    <br />
                    <strong>PM₂.₅:</strong> {place.value.toFixed(2)}{" "}
                    <strong>Date: </strong>
                    {place.date}
                  </Popup>
                </CircleMarker>
              ))}
          </MapContainer>

          <img
            className="grade-image"
            src="../../src/assets/grade.png"
            alt="Scale of PM2.5"
          />
        </div>
      </div>
    </>
  );
};
