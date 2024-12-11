import { useEffect, useState } from "react";
import WorldMap from "react-svg-worldmap";
import { fetchDataForCountries } from "../service/fetchData";

export const PollutionMapTEST = () => {
  const [data, setData] = useState<{ country: string; value: number }[]>([]);
  const [mapSize, setMapSize] = useState<"sm" | "md" | "lg" | "xl">("lg");

  const getMarkerColor = (value: number) => {
    if (value === 0) return "#D3D3D3";
    if (value < 5) return "#71A3FF";
    if (value < 10) return "#8EFF44";
    if (value < 15) return "#F8FF73";
    if (value < 25) return "#FFB24D";
    if (value < 35) return "#DE0C4A";
    if (value < 50) return "#8F154A";
    return "#8B4DB0";
  };

  const styleFunction = (countryInfo: { countryCode: string }) => {
    const countryData = data.find(
      (item) => item.country === countryInfo.countryCode
    );
    const value = countryData ? countryData.value : 0;
    return {
      fill: getMarkerColor(value),
      stroke: "black",
      strokeWidth: 0.5,
      cursor: "pointer",
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedData = await fetchDataForCountries();
      setData(fetchedData);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 576) {
        setMapSize("sm");
      } else if (width < 768) {
        setMapSize("md");
      } else if (width < 1024) {
        setMapSize("lg");
      } else {
        setMapSize("xl");
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="box-container">
        <h2>PollutionMapTEST</h2>
        <div className="worldmap-container">
          <WorldMap
            color="red"
            value-suffix="pm2.5"
            size={mapSize}
            data={data}
            styleFunction={styleFunction}
          />
        </div>

        <img
          className="grade-image"
          src="/public/grade4.png"
          alt="Scale of PM2.5"
        />
      </div>
    </>
  );
};
