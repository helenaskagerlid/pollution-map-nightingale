import axios from "axios";
import { useState, useEffect } from "react";
import { IPlaces } from "../models/IPlaces";
import { CircleMarker, Popup, TileLayer, useMap } from "react-leaflet";
import { MapContainer } from "react-leaflet";

import L from "leaflet";

export const PollutionMapTest = () => {
  const [places, setPlaces] = useState<IPlaces[]>([]);
  const [userLocation, setUserLocation] = useState<L.LatLng | null>(null);
  const [nearestPlace, setNearestPoint] = useState<IPlaces | null>(null);
  const [popupPosition, setPopupPosition] = useState<L.LatLng | null>(null);
  const [popupVisible, setPopupVisible] = useState(false);

  const getMarkerColor = (value: number) => {
    if (value < 5) return "#71A3FF";
    if (value < 10) return "#8EFF44";
    if (value < 15) return "#F8FF73";
    if (value < 25) return "#FFB24D";
    if (value < 35) return "#DE0C4A";
    if (value < 50) return "#8F154A";
    return "#8B4DB0";
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
          (_: IPlaces, index: number) => index % 10 === 0
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

  const handleLocate = (map: L.Map) => {
    map.locate({ setView: false, maxZoom: 10 });

    map.on("locationfound", (e: L.LocationEvent) => {
      setUserLocation(e.latlng);
      const nearest = findNearestPoint(e.latlng);
      setNearestPoint(nearest);

      if (nearest) {
        const nearestLatLng = L.latLng(nearest.latitude, nearest.longitude);
        setPopupPosition(nearestLatLng);
        setPopupVisible(true);
        map.setView(nearestLatLng, 10);
      }
    });

    map.on("locationerror", () => {
      alert("Could not access your location.");
    });
  };

  const findNearestPoint = (userLatLng: L.LatLng): IPlaces | null => {
    let nearest: IPlaces | null = null;
    let minDistance = Infinity;
    // console.log(nearestPlace)

    places.forEach((place) => {
      const placeLatLng = L.latLng(place.latitude, place.longitude);
      const distance = userLatLng.distanceTo(placeLatLng);

      if (distance < minDistance) {
        minDistance = distance;
        nearest = place;
      }
    });
      return nearest;


  };

  console.log("Hämtad data", places);

  const LocateControl = () => {
    const map = useMap();
    return (
      <button
        onClick={() => handleLocate(map)}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1000,
        }}
      >
        Find Nearest Measurement Point
      </button>
    );
  };

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

            <LocateControl />

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

            {nearestPlace && userLocation && popupPosition && popupVisible && (
              <CircleMarker center={[nearestPlace.latitude, nearestPlace.longitude]}
              radius={5}
              fillColor="transparent"
              color="#FF0000"
              weight={5}
              stroke={true}>
                <Popup position={[popupPosition.lat, popupPosition.lng]}>
                  <strong>Nearest Measurment Point:</strong>
                  <br />
                  Latitude: {nearestPlace.latitude.toFixed(4)}, Longitude: {nearestPlace.longitude.toFixed(4)}
                  <br />
                  <strong>PM₂.₅:</strong> {nearestPlace.value.toFixed(2)}
                  <strong>Date: </strong>
                  {nearestPlace.date}
                </Popup>
              </CircleMarker>)}


          </MapContainer>
          <img
            className="grade-image"
            src="../../src/assets/grade4.png"
            alt="Scale of PM2.5"
          />
        </div>
      </div>
    </>
  );
};
