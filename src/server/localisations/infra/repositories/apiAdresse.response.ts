export interface ApiAdresseResponse {
  features: ApiAdresseFeaturesResponse[];
}

interface ApiAdresseFeaturesResponse {
  properties: ApiAdressePropertiesResponse;
  geometry: ApiAdresseGeometryResponse;

}

interface ApiAdressePropertiesResponse {
  label: string;
  city: string;
  citycode: string;
}

interface  ApiAdresseGeometryResponse {
  coordinates: [number, number]
}
