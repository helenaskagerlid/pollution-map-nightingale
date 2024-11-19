import axios from "axios";
import { ILocations } from "../models/ILocations";
import { ICountries } from "../models/ICountries";
import { IChartData } from "../models/IChart";



// fetches data from server and filter the measurment points
export const fetchData = async (): Promise<ILocations[]> => {
  try {
    const response = await axios.get("http://localhost:3000/nightingale2");
    return response.data.filter(
      (_: ILocations, index: number) => index % 1000 === 0
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

// Fetches all data points without filtering for use in searches
export const fetchAllDataForSearch = async (): Promise<ILocations[]> => {
  try {
    const response = await axios.get("http://localhost:3000/nightingale2");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const fetchLatestAverageValue = async (): Promise<ICountries[]> => {
  try {
    const response = await axios.get("http://localhost:3000/nightingale1");
    console.log("Hämtad data", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const fetchHistoricalValues = async (): Promise<IChartData[]> => {
  try {
    const response = await axios.get("http://localhost:3000/nightingaleChart");
    console.log("Hämtad historisk data", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

export const fetchDataForCountries = async (): Promise<{ country: string; value: number }[]> => {
  try {
    const response = await axios.get("http://localhost:3000/nightingaleMap");
    console.log("Hämtad historisk data", response.data);

    // Omvandla och mappa datan till rätt format med 'country' istället för 'countryCode'
    const formattedData = response.data.map((item: { country: string; value: number }) => ({
      country: item.country, // Använd 'country' istället för 'countryCode'
      value: item.value,     // Värde för varje land
    }));

    return formattedData;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};


