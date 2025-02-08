'use client';

import { Property } from '@/lib/types';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { cn } from '@/lib/utils';

interface PropertyListProps {
  properties: Property[];
  selectedProperty?: Property | null;
  onPropertyClick: (property: Property) => void;
}

export default function PropertyList({
  properties,
  selectedProperty,
  onPropertyClick,
}: PropertyListProps) {
  return (
    <ScrollArea className="h-full">
      <div className="space-y-4 p-4">
        {properties.map((property) => (
          <Card
            key={property.id}
            className={cn(
              'p-4 cursor-pointer transition-all hover:shadow-lg',
              selectedProperty?.id === property.id && 'ring-2 ring-primary'
            )}
            onClick={() => onPropertyClick(property)}
          >
            <div className="flex gap-4">
              <img
                src={property.image}
                alt={property.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold">{property.title}</h3>
                  <Badge variant={property.available ? "default" : "destructive"}>
                    {property.available ? "Available" : "Occupied"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {property.address}
                </p>
                <p className="text-lg font-bold mt-2">
                  Ksh. {property.price}/month
                </p>
                <div className="flex gap-2 mt-1 text-sm text-muted-foreground">
                  <span>{property.bedrooms} beds</span>
                  <span>•</span>
                  <span>{property.bathrooms} baths</span>
                  <span>•</span>
                  <span>{property.sqft} sqft</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}
