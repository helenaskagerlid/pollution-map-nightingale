import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import { useEffect, useState } from "react";
import { IChartData } from "../models/IChart";
import { fetchHistoricalValues } from "../service/fetchData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const [chartData, setChartData] = useState<IChartData[]>([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countries, setCountries] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<IChartData[]>([]);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchHistoricalValues();
      setChartData(data);

      const countryNames = Array.from(
        new Set(data.map((item) => item.country))
      );

      setCountries(countryNames);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      let filtered = chartData.filter(
        (data) => data.country === selectedCountry
      );

      const thisYear = 2022;
      const baseDate = new Date(thisYear, 0, 1);

      if (selectedTimePeriod === "latestYear") {
        const latestYear = new Date(baseDate);
        filtered = filtered.filter(
          (data) =>
            new Date(data.date).getFullYear() === latestYear.getFullYear()
        );
      }
      setFilteredData(filtered);
    } else {
      setFilteredData([]);
    }
  }, [selectedCountry, selectedTimePeriod, chartData]);

  const labels = filteredData.map((data) => data.date);
  const dataValue = filteredData.map((data) => data.value);

  const data = {
    labels: labels,
    datasets: [
      {
        label: `Air Quality in ${selectedCountry}`,
        data: dataValue,
        fill: false,
        borderColor: "#B52828",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          font: {
            size: 16,
          },
        },
      },
      title: {
        display: true,
        text: "PM2.5 values Over Time",
        font: {
          size: 30,
        },
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: "PM2.5",
          font: {
            size: 18,
          },
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <div className="box-container">
        <div className="select-wrapper">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
          >
            <option>Country...</option>
            {countries.map((country) => (
              <option key={country}>{country}</option>
            ))}
          </select>
          <section>
            <select
              value={selectedTimePeriod}
              onChange={(e) => setSelectedTimePeriod(e.target.value)}
              disabled={!selectedCountry}
            >
              <option value="all">All time periods</option>
              <option value="latestYear">Latest year (2022)</option>
            </select>
          </section>
        </div>
        <section className="chart-container">
          <div className="line-chart">
            <h2>Chart</h2>
            <Line data={data} options={options} />
          </div>
        </section>
      </div>
    </>
  );
};

export default LineChart;
