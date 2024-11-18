import { useState, useEffect, useRef } from "react";
import { ILocations } from "../models/ILocations";
import { CircleMarker, Popup, TileLayer, useMap } from "react-leaflet";
import { MapContainer } from "react-leaflet";
import L from "leaflet";
import { Loader } from "./Loader";
import { getMarkerColor } from "../helpers/getMarkerColor";
import axios from "axios";
import { ICountries } from "../models/ICountries";
import {
  fetchAllDataForSearch,
  fetchData,
  fetchLatestAverageValue,
} from "../service/fetchData";

export const PollutionMap = () => {
  const mapRef = useRef<L.Map | null>(null);
  const [places, setPlaces] = useState<ILocations[]>([]);
  const [userLocation, setUserLocation] = useState<L.LatLng | null>(null);
  const [nearestPlace, setNearestPoint] = useState<ILocations | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [averageValue, setAverageValue] = useState<ICountries[]>([]);
  const [showAllValues, setShowAllValues] = useState(true);

  // fetches data from server and filter the measurment points

  useEffect(() => {
    const loadPlaces = async () => {
      setLoading(true);
      const filteredData = await fetchData();
      setPlaces(filteredData);
      setLoading(false);
    };

    loadPlaces();
  }, []);

  const handleSwitch = async () => {
    const nextShowAllValues = !showAllValues;
    setShowAllValues(nextShowAllValues);

    if (!nextShowAllValues) {
      setLoading(true);
      const fetchedValues = await fetchLatestAverageValue();
      console.log("Hämtad data average value", fetchedValues)
      setAverageValue(fetchedValues);
      setLoading(false);
    }
  };



  /// Searches for a city, finds the nearest measurement point among all data points,
  // and displays it on the map with a popup
  const handleCitySearch = async () => {
    setLoading(true);
    const city = searchValue.trim();
    if (!city) {
      setLoading(false);
      return;
    }

    // Fetch all data points for the search to ensure nearest point isn't missed
    const allPlaces = await fetchAllDataForSearch();
    const nearest = await findNearestPointInCity(city, allPlaces);

    if (nearest) {
      setNearestPoint(nearest);
      if (mapRef.current) {
        const nearestLatLng = L.latLng(nearest.latitude, nearest.longitude);

        // Fly to the nearest location and display popup
        mapRef.current.flyTo(nearestLatLng, 10);
        const popup = L.popup();
        const markerColor = getMarkerColor(nearest.value);
        const content = `
            <strong>Nearest Measurement Point:</strong><br/>
            Latitude: ${nearest.latitude.toFixed(
              2
            )}, Longitude: ${nearest.longitude.toFixed(2)}<br/>
            
           <div><strong>PM2.5:</strong> ${nearest.value.toFixed(2)}
            <div class="circle-point" style="background-color: ${markerColor};"></div></div>
            <strong>Date:</strong> ${nearest.date}
          `;

        popup.setLatLng(nearestLatLng);
        popup.setContent(content);
        popup.openOn(mapRef.current);

        // Optionally display this point as an additional marker on the map
        setPlaces((prevPlaces) => [...prevPlaces, nearest]);
      }
    } else {
      alert(`No measurement points found for city: ${city}`);
    }
    setLoading(false);
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
    setLoading(true);
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
          const markerColor = getMarkerColor(nearest.value);
          const content = `
          <strong>Nearest Measurement Point:</strong><br/>
          Latitude: ${nearest.latitude.toFixed(
            2
          )}, Longitude: ${nearest.longitude.toFixed(2)}<br/>
          
         <div><strong>PM2.5:</strong> ${nearest.value.toFixed(2)}
          <div class="circle-point" style="background-color: ${markerColor};"></div></div>
          <strong>Date:</strong> ${nearest.date}
        `;

          popup.setLatLng(nearestLatLng);
          popup.setContent(content).openOn(map);
        }
        setLoading(false);
      }
    });

    map.on("locationerror", () => {
      alert("Could not access your location.");
      setLoading(false);
    });
  };

  // Updated findNearestPointInCity function
  const findNearestPointInCity = async (
    cityName: string,
    allPlaces: ILocations[]
  ): Promise<ILocations | null> => {
    try {
      // Fetch the city coordinates from Nominatim API
      const geocodeResponse = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          cityName
        )}`
      );

      // Check if coordinates for the city were found
      if (geocodeResponse.data.length === 0) {
        alert(`Could not find coordinates for city: ${cityName}`);
        return null;
      }

      const cityCoordinates = geocodeResponse.data[0];
      const cityLatLng = L.latLng(
        parseFloat(cityCoordinates.lat),
        parseFloat(cityCoordinates.lon)
      );

      // Variables to track the nearest place
      let nearest: ILocations | null = null;
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

  // Function that finds the nearest measurement point to the user
  const findNearestPoint = (userLatLng: L.LatLng): ILocations | null => {
    let nearest: ILocations | null = null;
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
            <button className="search-button" onClick={handleCitySearch}>
              Search
            </button>
          </div>

          <button onClick={handleSwitch}>
            {showAllValues ? "Show Countries latest value" : "Show all values"}
          </button>

          <div className="map-wrapper">
            {loading && (
              <div className="loader-overlay">
                <Loader />
              </div>
            )}
            <MapContainer
              center={[33, 10]}
              zoom={2}
              scrollWheelZoom={true}
              ref={mapRef}
              className={loading ? "blur-effect" : ""}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              <LocateControl />

              {showAllValues
                ? places.map((place, index) => (
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
                        <div>
                          <strong>Latitude:</strong> {place.latitude}
                          <strong>Longitude:</strong> {place.longitude}
                        </div>
                        <div>
                          <strong>PM2.5:</strong> {place.value.toFixed(2)}{" "}
                          <div
                            style={{
                              backgroundColor: getMarkerColor(place.value),
                            }}
                            className="circle-point"
                          ></div>
                        </div>{" "}
                        <strong>Date: </strong>
                        {place.date}
                      </Popup>
                    </CircleMarker>
                  ))
                : averageValue
                    ?.filter((place) => place.latitude && place.longitude)
                    .map((place, index) => (
                      <CircleMarker
                        key={index}
                        center={[place.latitude, place.longitude]}
                        radius={3}
                        fillColor={getMarkerColor(place.value)}
                        color={getMarkerColor(place.value)}
                        weight={5}
                        stroke={true}
                      >
                        <Popup>
                          <strong>{place.country}</strong>
                          <div>
                            <strong>Latitude:</strong> {place.latitude}
                            <strong>Longitude:</strong> {place.longitude}
                          </div>
                          <div>
                            <strong>PM2.5:</strong> {place.value.toFixed(2)}
                            <div
                              style={{
                                backgroundColor: getMarkerColor(place.value),
                              }}
                              className="circle-point"
                            ></div>
                          </div>
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
                    <strong>Nearest Measurement Point:</strong>
                    <br />
                    Latitude: {nearestPlace.latitude.toFixed(4)}, Longitude:
                    {nearestPlace.longitude.toFixed(4)}
                    <br />
                    <div>
                      <strong>PM2.5:</strong> {nearestPlace.value.toFixed(2)}
                      <div
                        style={{
                          backgroundColor: getMarkerColor(nearestPlace.value),
                        }}
                        className="circle-point"
                      ></div>
                    </div>
                    <br />
                    <strong>Date:</strong> {nearestPlace.date}
                  </Popup>
                </CircleMarker>
              )}
            </MapContainer>
          </div>

          <img
            className="grade-image"
            src="../../src/assets/grade4.png"
            alt="Scale of PM2.5"
          />

          <h3>About PM₂.₅ and Heart disease</h3>
          <p>
            PM₂.₅, or fine particulate matter, poses significant health risks,
            especially concerning cardiovascular diseases. WHO notes that PM₂.₅
            can deeply penetrate the lungs and bloodstream, leading to
            inflammation and potentially causing or worsening cardiovascular
            conditions like atherosclerosis, increasing the risk of heart
            attacks and strokes.
            <br />
            <br />
            Studies show that both short-term and long-term exposure to PM₂.₅
            can increase cardiovascular mortality and the likelihood of acute
            heart issues in at-risk individuals. Common symptoms of exposure to
            high air pollution levels include coughing, difficulty breathing,
            and chest discomfort, which can exacerbate conditions in individuals
            with existing respiratory or cardiovascular issues. This correlation
            highlights the importance of reducing air pollution to prevent
            heart-related health problems and protect public health.
          </p>

          <div className="image-container">
            <img
              className="pollution-guide-img"
              src="../../src/assets/pollutionguide3.png"
              alt="Pollution guide"
            />
          </div>
        </div>
      </div>
    </>
  );
};
