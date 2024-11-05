import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { IPlaces } from "../models/IPlaces";
import { CircleMarker, Popup, TileLayer, useMap } from "react-leaflet";
import { MapContainer } from "react-leaflet";
import L from "leaflet";

export const PollutionMapTest = () => {
  const mapRef = useRef<L.Map | null>(null);
  const [places, setPlaces] = useState<IPlaces[]>([]);
  const [userLocation, setUserLocation] = useState<L.LatLng | null>(null);
  const [nearestPlace, setNearestPoint] = useState<IPlaces | null>(null);
  const [searchValue, setSearchValue] = useState("");

  // Function to determine the marker's color baed on PM2.5 value
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

  // fetches data from server and filter the measurment points
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

  // Fetches all data points without filtering for use in searches
const fetchAllDataForSearch = async (): Promise<IPlaces[]> => {
  try {
    const response = await axios.get("http://localhost:3000/nightingale2");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

// Updated findNearestPointInCity function
const findNearestPointInCity = async (cityName: string, allPlaces: IPlaces[]): Promise<IPlaces | null> => {
  try {
    // Fetch the city coordinates from Nominatim API
    const geocodeResponse = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(cityName)}`
    );

    // Check if coordinates for the city were found
    if (geocodeResponse.data.length === 0) {
      alert(`Could not find coordinates for city: ${cityName}`);
      return null;
    }

    const cityCoordinates = geocodeResponse.data[0];
    const cityLatLng = L.latLng(parseFloat(cityCoordinates.lat), parseFloat(cityCoordinates.lon));

    // Variables to track the nearest place
    let nearest: IPlaces | null = null;
    let minDistance = Infinity;

    // Iterate over allPlaces to find the nearest measurement point to the city
    allPlaces.forEach((place) => {
      const placeLatLng = L.latLng(place.latitude, place.longitude);
      const distance = cityLatLng.distanceTo(placeLatLng);

      if (distance < minDistance) {
        minDistance = distance;
        nearest = place;
      }
    });

    return nearest;
  } catch (error) {
    console.error("Error fetching city coordinates:", error);
    return null;
  }
};


/// Searches for a city, finds the nearest measurement point among all data points, 
// and displays it on the map with a popup
const handleCitySearch = async () => {
  const city = searchValue.trim();
  if (!city) return;

  // Fetch all data points for the search to ensure nearest point isn't missed
  const allPlaces = await fetchAllDataForSearch();
  const nearest = await findNearestPointInCity(city, allPlaces);

  if (nearest) {
    setNearestPoint(nearest);
    if (mapRef.current) {
      const nearestLatLng = L.latLng(nearest.latitude, nearest.longitude);

      // Fly to the nearest location and display popup
      mapRef.current.flyTo(nearestLatLng, 10);
      const popup = L.popup()
        .setLatLng(nearestLatLng)
        .setContent(`
          <strong>Nearest Measurement Point:</strong><br/>
          Latitude: ${nearest.latitude.toFixed(2)}, Longitude: ${nearest.longitude.toFixed(2)}<br/>
          <strong>PM₂.₅:</strong> ${nearest.value.toFixed(2)}<br/>
          <strong>Date:</strong> ${nearest.date}
        `);

      popup.openOn(mapRef.current);

      // Optionally display this point as an additional marker on the map
      setPlaces((prevPlaces) => [...prevPlaces, nearest]);
    }
  } else {
    alert(`No measurement points found for city: ${city}`);
  }
};

  // Custom control button to locate the user on the map
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

  // function to locate the user and make a popup appear
  const handleLocate = (map: L.Map) => {
    map.locate({ setView: false, maxZoom: 10 });

    map.on("locationfound", (e: L.LocationEvent) => {
      setUserLocation(e.latlng);
      const nearest = findNearestPoint(e.latlng);
      setNearestPoint(nearest);

      if (nearest) {
        const nearestLatLng = L.latLng(nearest.latitude, nearest.longitude);
        map.flyTo(nearestLatLng, 10);

        const popup = L.popup();
        if (popup) {
          popup.setLatLng(nearestLatLng);
          popup
            .setContent(
              `
            <strong>Nearest Measurement Point:</strong><br/>
            Latitude: ${nearest.latitude.toFixed(
              2
            )}, Longitude: ${nearest.longitude.toFixed(2)}<br/>
            <strong>PM₂.₅:</strong> ${nearest.value.toFixed(2)}<br/>
            <strong>Date:</strong> ${nearest.date}
          `
            )
            .openOn(map);
        }
      }
    });

    map.on("locationerror", () => {
      alert("Could not access your location.");
    });
  };

  // Function that finds the nearest measurement point to the user
  const findNearestPoint = (userLatLng: L.LatLng): IPlaces | null => {
    let nearest: IPlaces | null = null;
    let minDistance = Infinity;

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

  // function to create a button for locating the user
  // const LocateControl = () => {
  //   const map = useMap();
  //   return (
  //     <button
  //       onClick={() => handleLocate(map)}
  //       style={{
  //         position: "absolute",
  //         top: "10px",
  //         right: "10px",
  //         zIndex: 1000,
  //       }}
  //     >
  //       Find Nearest Measurement Point
  //     </button>
  //   );
  // };

  return (
    <>
      <div className="box-container"> 
        <div className="map-container">
          <h2>POLLUTION MAP</h2>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search by city"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button onClick={handleCitySearch}>Search</button>
          </div>
          <MapContainer
            center={[54.526, 15.2551]}
            zoom={4}
            scrollWheelZoom={true}
            ref={mapRef}
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

            {nearestPlace && userLocation && (
              <CircleMarker
                center={[nearestPlace.latitude, nearestPlace.longitude]}
                radius={5}
                fillColor="transparent"
                color="#FF0000"
                weight={5}
                stroke={true}
              >
                <Popup>
                  <strong>Nearest Measurment Point:</strong>
                  <br />
                  Latitude: {nearestPlace.latitude.toFixed(4)}, Longitude:{" "}
                  {nearestPlace.longitude.toFixed(4)}
                  <br />
                  <strong>PM₂.₅:</strong> {nearestPlace.value.toFixed(2)}
                  <strong>Date: </strong>
                  {nearestPlace.date}
                </Popup>
              </CircleMarker>
            )}
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
