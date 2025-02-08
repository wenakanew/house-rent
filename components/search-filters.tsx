'use client';

import { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Search, SlidersHorizontal } from 'lucide-react';

interface SearchFiltersProps {
  onSearch: (filters: {
    location: string;
    minPrice: number;
    maxPrice: number;
    availability: string;
  }) => void;
}

export default function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState([2000, 100100]);
  const [availability, setAvailability] = useState('all');

  const handleSearch = () => {
    onSearch({
      location,
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      availability,
    });
  };

  return (
    <div className="p-4 border-b">
      <div className="flex gap-4 items-center">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search by location..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={availability} onValueChange={setAvailability}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Properties</SelectItem>
            <SelectItem value="available">Available Only</SelectItem>
            <SelectItem value="occupied">Occupied Only</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={handleSearch}>
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>
      <div className="mt-4">
        <p className="text-sm text-muted-foreground mb-2">
          Price Range: Ksh.{priceRange[0]} - Ksh.{priceRange[1]}
        </p>
        <Slider
          min={1000}
          max={100000}
          step={100}
          value={priceRange}
          onValueChange={setPriceRange}
          className="w-full"
        />
      </div>
    </div>
  );
}
