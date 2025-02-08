'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import { properties } from '@/lib/data';
import { Property } from '@/lib/types';
import PropertyList from '@/components/property-list';
import SearchFilters from '@/components/search-filters';

const MapComponent = dynamic(() => import('@/components/map'), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-muted">
      Loading map...
    </div>
  ),
});

export default function Home() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [filteredProperties, setFilteredProperties] = useState(properties);

  const handleSearch = ({
    location,
    minPrice,
    maxPrice,
    availability,
  }: {
    location: string;
    minPrice: number;
    maxPrice: number;
    availability: string;
  }) => {
    const filtered = properties.filter((property) => {
      const matchesLocation = location
        ? property.address.toLowerCase().includes(location.toLowerCase())
        : true;
      const matchesPrice =
        property.price >= minPrice && property.price <= maxPrice;
      const matchesAvailability =
        availability === 'all'
          ? true
          : availability === 'available'
          ? property.available
          : !property.available;

      return matchesLocation && matchesPrice && matchesAvailability;
    });

    setFilteredProperties(filtered);
  };

  return (
    <main className="flex h-screen">
      <div className="w-[400px] flex flex-col border-r">
        <SearchFilters onSearch={handleSearch} />
        <PropertyList
          properties={filteredProperties}
          selectedProperty={selectedProperty}
          onPropertyClick={setSelectedProperty}
        />
      </div>
      <div className="flex-1 relative">
        <MapComponent
          properties={filteredProperties}
          selectedProperty={selectedProperty}
          onMarkerClick={setSelectedProperty}
        />
      </div>
    </main>
  );
}