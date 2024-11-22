// import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import { useEffect, useState } from "react";
// import {
//   FeatureCollection,
//   Feature,
//   Geometry,
//   GeoJsonProperties,
// } from "geojson";
// import { fetchDataForCountries } from "../service/fetchData";
// import { PathOptions } from "leaflet";

// export const TestMap = () => {
//   const [geoJSON, setGeoJSON] = useState<FeatureCollection | null>(null);
//   const [data, setData] = useState<{ country: string; value: number }[]>([]);

//   const getMarkerColor = (value: number) => {
//     if (value === 0) return "#D3D3D3";
//     if (value < 5) return "#71A3FF";
//     if (value < 10) return "#8EFF44";
//     if (value < 15) return "#F8FF73";
//     if (value < 25) return "#FFB24D";
//     if (value < 35) return "#DE0C4A";
//     if (value < 50) return "#8F154A";
//     return "#8B4DB0";
//   };

//   const style = (feature: Feature<Geometry, GeoJsonProperties>) => {
//     const countryCode = feature.properties?.ISO_A2;
//     const countryData = data.find((item) => item.country === countryCode);
//     const value = countryData ? countryData.value : 0;

//     return {
//       fillColor: getMarkerColor(value),
//       color: "black", // Border color
//       weight: 0.5,
//       fillOpacity: 0.8,
//       cursor: "pointer",
//     } as PathOptions;
//   };

//   const fetchAllData = async () => {
//     const geoJSONUrl =
//       "https://r2.datahub.io/clvyjaryy0000la0cxieg4o8o/main/raw/data/countries.geojson";

//     try {
//       const [fetchedData, response] = await Promise.all([
//         fetchDataForCountries(),
//         fetch(geoJSONUrl),
//       ]);
//       const geoData = (await response.json()) as FeatureCollection;

//       setData(fetchedData);
//       setGeoJSON(geoData);
//     } catch (error) {
//       console.error("Fel vid hämtning av data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchAllData();
//   }, []);

//   return (
//     <MapContainer
//       center={[20, 0]}
//       zoom={2}
//       scrollWheelZoom={true}
//       style={{ width: "100%", height: "100vh" }}
//     >
//       <TileLayer
//         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//         url={`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`}
//       />

//       {geoJSON && <GeoJSON data={geoJSON} style={style} />}
//     </MapContainer>
//   );
// };
