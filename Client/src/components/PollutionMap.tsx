import {
  MapContainer,
  TileLayer,
  Popup,
  CircleMarker,
  useMap,
} from "react-leaflet";
import { germanData } from "../data/europe/germanData";
import "leaflet/dist/leaflet.css";
import "@geoapify/leaflet-address-search-plugin/dist/L.Control.GeoapifyAddressSearch.min.css";
import { locations } from "../data/locations";
import "@geoapify/leaflet-address-search-plugin";
import { useEffect, useRef, useState } from "react";
import { ILocations } from "../models/ILocations";
import L from "leaflet";
// import axios from "axios";
// import { IPlaces } from "../models/IPlaces";

const MapUpdater = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 6, { animate: true });
  }, [center, map]);
  return null;
};

export const PollutionMap = () => {
  const mapRef = useRef<L.Map | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<ILocations>();
  const [showSearch, setShowSearch] = useState(false);
  const [filters, setFilters] = useState({
    under5: true,
    between5and10: true,
    between10and15: true,
    between15and25: true,
    between25and35: true,
    between35and50: true,
    over50: true,
  });

  const handleSearch = () => {
    if (!searchValue.trim()) {
      console.log("Enter a valid term");
      return;
    }

    const locationFound = locations.find(
      (location) => location.country.toLowerCase() === searchValue.toLowerCase()
    );

    if (locationFound) {
      setSelectedLocation(locationFound);
      setSearchValue("");

      if (mapRef.current) {
        mapRef.current.flyTo(locationFound.center, 8);
        const popup = L.popup();
        popup.setLatLng(locationFound.center);

        const popupContent = `
        <div>
          <strong>${locationFound.country}</strong><br />
          <strong>PM₂.₅:</strong> ${locationFound.data.value.toFixed(2)}<br />
          <strong>Date:</strong> ${locationFound.data.date}
        </div> 
      `;

        popup.setContent(popupContent);
        popup.openOn(mapRef.current);
      }
    } else {
      console.log("Location not found");
      setSelectedLocation(undefined);
    }
  };
  console.log(germanData);

  const getMarkerColor = (value: number) => {
    if (value <= 5) return "#71A3FF";
    if (value <= 10) return "#8EFF44";
    if (value <= 15) return "#F8FF73";
    if (value <= 25) return "#FFB24D";
    if (value <= 35) return "#DE0C4A";
    if (value <= 50) return "#8F154A";
    return "#8B4D80";
  };

  const filteredLocations = locations.filter((location: ILocations) => {
    if (!location.data) {
      console.warn(`Location data is undefined for:`, location);
      return false;
    }
    const value = location.data.value;
    const color = getMarkerColor(value);

    if (filters.under5 && color === "#71A3FF") return true;
    if (filters.between5and10 && color === "#8EFF44") return true;
    if (filters.between10and15 && color === "#F8FF73") return true;
    if (filters.between15and25 && color === "#FFB24D") return true;
    if (filters.between25and35 && color === "#DE0C4A") return true;
    if (filters.between35and50 && color === "#8F154A") return true;
    if (filters.over50 && color === "#8B4D80") return true;

    return false;
  });

  return (
    <>
      <div className="map-container">
        <h2>POLLUTION MAP</h2>

        <button
          className="filter-button"
          onClick={() => setShowSearch(!showSearch)}
        >
          Filter{" "}
          <span className={`arrow ${showSearch ? "arrow-up" : ""}`}></span>
        </button>

        {showSearch && (
          <div className="search-container">
            <input
              placeholder="Country"
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button className="search-button" onClick={handleSearch}>
              Search
            </button>
            <div className="filter-checkboxes">
              <label>
                <input
                  type="checkbox"
                  checked={filters.under5}
                  onChange={() =>
                    setFilters((prev) => ({ ...prev, under5: !prev.under5 }))
                  }
                />
                <div className="color-indicator color-under-5"></div>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={filters.between5and10}
                  onChange={() =>
                    setFilters((prev) => ({
                      ...prev,
                      between5and10: !prev.between5and10,
                    }))
                  }
                />
                <div className="color-indicator color-between-5-10"></div>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={filters.between10and15}
                  onChange={() =>
                    setFilters((prev) => ({
                      ...prev,
                      between10and15: !prev.between10and15,
                    }))
                  }
                />
                <div className="color-indicator color-between-10-15"></div>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={filters.between15and25}
                  onChange={() =>
                    setFilters((prev) => ({
                      ...prev,
                      between15and25: !prev.between15and25,
                    }))
                  }
                />
                <div className="color-indicator color-between-15-25"></div>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={filters.between25and35}
                  onChange={() =>
                    setFilters((prev) => ({
                      ...prev,
                      between25and35: !prev.between25and35,
                    }))
                  }
                />
                <div className="color-indicator color-between-25-35"></div>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={filters.between35and50}
                  onChange={() =>
                    setFilters((prev) => ({
                      ...prev,
                      between35and50: !prev.between35and50,
                    }))
                  }
                />
                <div className="color-indicator color-between-35-50"></div>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={filters.over50}
                  onChange={() =>
                    setFilters((prev) => ({ ...prev, over50: !prev.over50 }))
                  }
                />
                <div className="color-indicator color-over-50"></div>
              </label>
            </div>
          </div>
        )}
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

          {filteredLocations.map((location, index) => (
            <CircleMarker
              key={index}
              center={location.center}
              radius={1.5}
              fillColor="transparent"
              color={getMarkerColor(location.data.value)}
              weight={9}
              stroke={true}
            >
              <Popup>
                <strong>{location.country}</strong>
                <br />
                <strong>PM₂.₅:</strong> {location.data.value.toFixed(2)}{" "}
                <strong>Date: </strong>
                {location.data.date}
              </Popup>
            </CircleMarker>
          ))}

          {selectedLocation && <MapUpdater center={selectedLocation.center} />}

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
          )}
        </MapContainer>

        <img
          className="grade-image"
          src="../../src/assets/grade4.png"
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
            className="pollution-guide-img"
            src="../../src/assets/pollutionguide3.png"
            alt="Pollution guide"
          />
        </div>
      </div>
    </>
  );
};
