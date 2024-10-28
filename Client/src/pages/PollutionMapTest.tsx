import axios from "axios";
import { useState, useEffect } from "react";
import { IPlaces } from "../models/IPlaces";
import { CircleMarker, Popup, TileLayer } from "react-leaflet";
import { MapContainer } from "react-leaflet";

export const PollutionMapTest = () => {
  const [places, setPlaces] = useState<IPlaces[]>([]);

  const getMarkerColor = (value: number) => {
    if (value < 12.5) return "#8EFF44";
    if (value < 25) return "#F8FF73";
    if (value < 50) return "#FFB24D";
    if (value < 150) return "#DE0C4A";
    return "#580822";
  };

  useEffect(() => {
    const fetchData = async (): Promise<IPlaces[]> => {
      try {
        const response = await axios.get("http://localhost:3000/nightingale2");
        setPlaces(response.data);
        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        return [];
      }
    };
    fetchData();
  }, []);

  console.log("Hämtad data", places);
  return (
    <>
      <div className="map-container">
        <h2>POLLUTION MAP</h2>

        <MapContainer
          center={[54.526, 15.2551]}
          zoom={4}
          scrollWheelZoom={true}
          // ref={mapRef}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {places.map((place, index) => (
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

          {/* {selectedLocation && <MapUpdater center={selectedLocation.center} />}

          {selectedLocation && (
            <CircleMarker
              center={selectedLocation.center}
              radius={1}
              fillColor="transparent"
              color={getMarkerColor(selectedLocation.data.value)}
              weight={8}
              stroke={true}
            >
              <Popup autoPan={true}>
                <strong>{selectedLocation.country}</strong>
                <br />
                <strong>PM₂.₅:</strong> {selectedLocation.data.value.toFixed(2)}{" "}
                <strong>Date: </strong>
                {selectedLocation.data.date}
              </Popup>
            </CircleMarker>
          )} */}
        </MapContainer>

        <img
          className="grade-image"
          src="../../src/assets/grade.png"
          alt="Scale of PM2.5"
        />
        <h3>About PM₂.₅ and Heart disease</h3>
        <p>
          PM₂.₅, or fine particulate matter, is linked to heart diseases due to
          its ability to penetrate deep into the lungs and enter the
          bloodstream. Exposure to high levels of PM₂.₅ can cause inflammation
          in blood vessels, leading to conditions like atherosclerosis, which
          increases the risk of heart attacks and strokes. Studies show that
          both short-term and long-term exposure to PM₂.₅ can increase
          cardiovascular mortality and the likelihood of acute heart issues in
          at-risk individuals. This correlation highlights the importance of
          reducing air pollution to prevent heart-related health problems.
        </p>
        <div className="image-container">
          <img
            src="../../src/assets/pollutionguide.png"
            alt="Pollution guide"
          />
        </div>
      </div>
    </>
  );
};
