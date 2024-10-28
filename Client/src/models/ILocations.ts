export interface ILocations {
  country: string;
  // center: LatLngTuple;
  center: [number, number];
  data: { value: number; date: string };
}
