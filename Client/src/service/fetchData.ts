import axios from "axios";
import { ILocations } from "../models/ILocations";
import { ICountries } from "../models/ICountries";

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
