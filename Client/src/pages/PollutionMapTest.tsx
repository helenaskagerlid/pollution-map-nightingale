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

  useEffect(() => {
    const fetchData = async (): Promise<IPlaces[]> => {
      try {
        const response = await axios.get("http://localhost:3000/nightingale2");
        const filteredData = response.data.filter(
          (_: IPlaces, index: number) => index % 7 === 0
        );
        setPlaces(filteredData);
        return filteredData;
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
      <div className="box-container">
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
