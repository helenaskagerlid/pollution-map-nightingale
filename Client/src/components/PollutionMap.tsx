import {
  MapContainer,
  TileLayer,
  Popup,
  CircleMarker,
  useMap,
  Tooltip,
} from "react-leaflet";
import { germanData } from "../data/europe/germanData";
import "leaflet/dist/leaflet.css";
import "@geoapify/leaflet-address-search-plugin/dist/L.Control.GeoapifyAddressSearch.min.css";
import { locations } from "../data/locations";
import "@geoapify/leaflet-address-search-plugin";
import { useEffect, useRef, useState } from "react";
import { ILocations } from "../models/ILocations";
import L from "leaflet";

const MapUpdater = ({ center }: { center: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 6, { animate: true });
  }, [center, map]);
  return null;
};

export const PollutionMap = () => {
  const tooltipRef = useRef<L.Tooltip | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const [isTooltipPermanent, setIsTooltipPermanent] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<ILocations>();
  const [showSearch, setShowSearch] = useState(false);
  const [filters, setFilters] = useState({
    under12: true,
    between12and25: true,
    between25and50: true,
    between50and150: true,
    over150: true,
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
        mapRef.current.setView(locationFound.center, 12);
        setIsTooltipPermanent(mapRef.current.getZoom() > 10);
      } else {
        setIsTooltipPermanent(false);
      }
    } else {
      console.log("Location not found");
      setSelectedLocation(undefined);
    }
  };
  console.log("ToolTip", isTooltipPermanent);
  console.log(germanData);

  const getMarkerColor = (value: number) => {
    if (value < 12.5) return "#8EFF44";
    if (value < 25) return "#F8FF73";
    if (value < 50) return "#FFB24D";
    if (value < 150) return "#DE0C4A";
    return "#580822";
  };

  const filteredLocations = locations.filter((location: ILocations) => {
    const value = location.data.value;
    const color = getMarkerColor(value);

    if (filters.under12 && color === "#8EFF44") return true;
    if (filters.between12and25 && color === "#F8FF73") return true;
    if (filters.between25and50 && color === "#FFB24D") return true;
    if (filters.between50and150 && color === "#DE0C4A") return true;
    if (filters.over150 && color === "#580822") return true;

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
                  checked={filters.under12}
                  onChange={() =>
                    setFilters((prev) => ({ ...prev, under12: !prev.under12 }))
                  }
                />
                <div className="color-indicator color-under-12"></div>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={filters.between12and25}
                  onChange={() =>
                    setFilters((prev) => ({
                      ...prev,
                      between12and25: !prev.between12and25,
                    }))
                  }
                />
                <div className="color-indicator color-between-12-25"></div>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={filters.between25and50}
                  onChange={() =>
                    setFilters((prev) => ({
                      ...prev,
                      between25and50: !prev.between25and50,
                    }))
                  }
                />
                <div className="color-indicator color-between-25-50"></div>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={filters.between50and150}
                  onChange={() =>
                    setFilters((prev) => ({
                      ...prev,
                      between50and150: !prev.between50and150,
                    }))
                  }
                />
                <div className="color-indicator color-between-50-150"></div>
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={filters.over150}
                  onChange={() =>
                    setFilters((prev) => ({ ...prev, over150: !prev.over150 }))
                  }
                />
                <div className="color-indicator color-over-150"></div>
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
              {selectedLocation?.country === location.country &&
                isTooltipPermanent && (
                  <button>
                    <Tooltip
                      className="toolTip"
                      ref={tooltipRef}
                      interactive={true}
                      permanent={true}
                    >
                      PM2.5: {location.data.value.toFixed(2)}
                    </Tooltip>
                  </button>
                )}
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
