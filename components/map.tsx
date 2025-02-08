'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Property } from '@/lib/types';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Phone, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MapComponentProps {
  properties: Property[];
  selectedProperty?: Property | null;
  onMarkerClick: (property: Property) => void;
}

export default function MapComponent({ properties, selectedProperty, onMarkerClick }: MapComponentProps) {
  const { toast } = useToast();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const copyContact = (type: 'phone' | 'email', value: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Contact copied!",
      description: `${type === 'phone' ? 'Phone number' : 'Email address'} has been copied to clipboard.`,
    });
  };

  return (
    <MapContainer
      center={[-1.1500, 36.9600]}
      zoom={7}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {properties.map((property) => (
        <Marker
          key={property.id}
          position={[property.location.lat, property.location.lng]}
          eventHandlers={{
            click: () => onMarkerClick(property),
          }}
        >
          <Popup>
            <Card className="p-4 min-w-[300px]">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{property.address}</p>
              <p className="text-lg font-bold mb-2">Ksh {property.price}/month</p>
              <div className="flex gap-2 mb-2">
                <span className="text-sm">{property.bedrooms} beds</span>
                <span className="text-sm">•</span>
                <span className="text-sm">{property.bathrooms} baths</span>
                <span className="text-sm">•</span>
                <span className="text-sm">{property.sqft} sqft</span>
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyContact('phone', property.landlord.phone)}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyContact('email', property.landlord.email)}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
              </div>
            </Card>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
