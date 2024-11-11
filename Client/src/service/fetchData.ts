import axios from "axios";
import { IPlaces } from "../models/IPlaces";

// fetches data from server and filter the measurment points
export const fetchData = async (): Promise<IPlaces[]> => {
  try {
    const response = await axios.get("http://localhost:3000/nightingale2");
    return response.data.filter((_: IPlaces, index: number) => index % 400 === 0);
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

// Fetches all data points without filtering for use in searches
export const fetchAllDataForSearch = async (): Promise<IPlaces[]> => {
  try {
    const response = await axios.get("http://localhost:3000/nightingale2");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
