/**
 * Simplified geography for the hero globe. These are deliberately coarse,
 * hand-built outlines (lon, lat) meant for a stylised dotted rendering, not
 * for navigation or any claim about borders.
 */
export type LonLat = readonly [lon: number, lat: number];

export const AFRICA: LonLat[] = [
  [-5.9, 35.8], [-9.5, 32.0], [-13.0, 28.0], [-16.0, 23.5], [-17.0, 21.0],
  [-16.5, 16.0], [-17.4, 14.7], [-16.7, 12.4], [-15.0, 10.5], [-13.3, 9.0],
  [-12.5, 7.3], [-10.8, 6.3], [-8.0, 4.5], [-4.0, 5.2], [-2.0, 4.7],
  [1.0, 6.0], [3.4, 6.4], [5.0, 5.8], [8.5, 4.4], [9.6, 2.5],
  [9.3, 0.3], [9.0, -1.0], [12.0, -5.0], [13.5, -9.0], [12.0, -14.0],
  [11.8, -17.2], [14.5, -22.5], [15.0, -27.0], [17.5, -31.5], [18.4, -34.2],
  [20.0, -34.8], [25.5, -34.0], [28.0, -32.5], [32.5, -28.5], [32.9, -26.0],
  [35.5, -24.0], [35.4, -21.0], [34.9, -19.8], [40.6, -15.0], [40.5, -10.5],
  [39.3, -6.5], [39.0, -4.5], [41.5, -1.8], [43.5, 1.5], [45.5, 2.0],
  [48.0, 5.0], [51.3, 11.8], [47.0, 11.2], [44.0, 10.4], [43.2, 11.5],
  [41.5, 14.5], [39.5, 15.5], [37.3, 18.5], [37.2, 21.2], [35.5, 24.0],
  [34.0, 26.5], [32.8, 29.5], [32.3, 31.3], [30.0, 31.1], [25.0, 31.7],
  [20.0, 32.2], [19.0, 30.3], [16.0, 31.2], [15.0, 32.4], [13.0, 32.9],
  [11.0, 33.2], [10.5, 34.5], [11.0, 37.0], [9.0, 37.2], [3.0, 36.8],
  [-1.0, 35.4], [-2.5, 35.2],
];

export const MADAGASCAR: LonLat[] = [
  [49.3, -12.0], [50.3, -15.5], [49.5, -17.5], [47.2, -24.8], [45.0, -25.5],
  [43.8, -23.0], [44.0, -20.0], [44.5, -16.5], [47.0, -15.0],
];

export const LAND: LonLat[][] = [AFRICA, MADAGASCAR];

export interface City {
  name: string;
  lat: number;
  lon: number;
  /** "hub" is Liberia, where the company is headquartered. */
  kind: "hub" | "africa" | "world";
}

export const HUB: City = { name: "Liberia", lat: 6.3, lon: -10.8, kind: "hub" };

export const CITIES: City[] = [
  HUB,
  { name: "Dakar", lat: 14.7, lon: -17.4, kind: "africa" },
  { name: "Abidjan", lat: 5.3, lon: -4.0, kind: "africa" },
  { name: "Accra", lat: 5.6, lon: -0.2, kind: "africa" },
  { name: "Lagos", lat: 6.5, lon: 3.4, kind: "africa" },
  { name: "Casablanca", lat: 33.6, lon: -7.6, kind: "africa" },
  { name: "Cairo", lat: 30.0, lon: 31.2, kind: "africa" },
  { name: "Addis Ababa", lat: 9.0, lon: 38.7, kind: "africa" },
  { name: "Nairobi", lat: -1.3, lon: 36.8, kind: "africa" },
  { name: "Kinshasa", lat: -4.3, lon: 15.3, kind: "africa" },
  { name: "Johannesburg", lat: -26.2, lon: 28.0, kind: "africa" },
  { name: "London", lat: 51.5, lon: -0.1, kind: "world" },
  { name: "New York", lat: 40.7, lon: -74.0, kind: "world" },
  { name: "Dubai", lat: 25.2, lon: 55.3, kind: "world" },
];

/** Ray-casting point-in-polygon on plain lon/lat (fine for these small shapes). */
export function inPolygon(lon: number, lat: number, poly: LonLat[]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > lat !== yj > lat && lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

export function isLand(lon: number, lat: number): boolean {
  return LAND.some((p) => inPolygon(lon, lat, p));
}
