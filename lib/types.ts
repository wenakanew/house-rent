export interface Property {
  id: string;
  title: string;
  address: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  available: boolean;
  image: string;
  description: string;
  landlord: {
    name: string;
    phone: string;
    email: string;
  };
  location: {
    lat: number;
    lng: number;
  };
}