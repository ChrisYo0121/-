import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MapPin, Navigation, ZoomIn, ZoomOut, Layers } from 'lucide-react';
import { Product } from './ProductCard';

interface MapLocation {
  id: string;
  lat: number;
  lng: number;
  count: number;
  products: Product[];
  district: string;
}

interface MapViewProps {
  products: Product[];
  onProductSelect: (product: Product) => void;
}

// Mock map locations based on Taipei districts
const mapLocations: MapLocation[] = [
  { id: '1', lat: 25.0478, lng: 121.5319, count: 12, products: [], district: '中正區' },
  { id: '2', lat: 25.0608, lng: 121.5598, count: 8, products: [], district: '信義區' },
  { id: '3', lat: 25.0478, lng: 121.5633, count: 15, products: [], district: '大安區' },
  { id: '4', lat: 25.0713, lng: 121.5606, count: 6, products: [], district: '松山區' },
  { id: '5', lat: 25.0338, lng: 121.5645, count: 9, products: [], district: '文山區' },
  { id: '6', lat: 25.0908, lng: 121.5623, count: 11, products: [], district: '內湖區' },
  { id: '7', lat: 25.1058, lng: 121.5683, count: 7, products: [], district: '南港區' },
  { id: '8', lat: 25.0713, lng: 121.5168, count: 14, products: [], district: '中山區' },
];

export function MapView({ products, onProductSelect }: MapViewProps) {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [zoomLevel, setZoomLevel] = useState(12);

  const handleLocationClick = (location: MapLocation) => {
    setSelectedLocation(location);
    // In a real app, we would filter products by location
    const locationProducts = products.filter(p => p.location.includes(location.district)).slice(0, 3);
    setSelectedLocation({ ...location, products: locationProducts });
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="relative bg-gradient-to-br from-blue-50 to-green-50 h-96">
        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <Button variant="outline" size="sm" onClick={() => setZoomLevel(Math.min(16, zoomLevel + 1))}>
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setZoomLevel(Math.max(8, zoomLevel - 1))}>
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Layers className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Navigation className="w-4 h-4" />
          </Button>
        </div>

        {/* Mock Map with Location Markers */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-full h-full">
            {/* Background pattern to simulate map */}
            <div className="absolute inset-0 opacity-20">
              <svg width="100%" height="100%" viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#ccc" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
              </svg>
            </div>

            {/* Location Markers */}
            {mapLocations.map((location, index) => (
              <button
                key={location.id}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-110 ${
                  selectedLocation?.id === location.id ? 'z-20' : 'z-10'
                }`}
                style={{
                  left: `${20 + (index % 4) * 20}%`,
                  top: `${20 + Math.floor(index / 4) * 25}%`,
                }}
                onClick={() => handleLocationClick(location)}
              >
                <div className="relative">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-lg ${
                    selectedLocation?.id === location.id ? 'bg-primary scale-125' : 'bg-red-500'
                  }`}>
                    {location.count}
                  </div>
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-2 border-r-2 border-t-4 border-transparent border-t-red-500"></div>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs font-medium whitespace-nowrap bg-white px-2 py-1 rounded shadow">
                  {location.district}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Location Info */}
        {selectedLocation && (
          <Card className="absolute bottom-4 left-4 right-4 max-w-md mx-auto">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">{selectedLocation.district}</h3>
                <Badge variant="secondary">{selectedLocation.count} 項物品</Badge>
              </div>
              
              {selectedLocation.products.length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">附近的物品:</p>
                  {selectedLocation.products.map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-3 p-2 bg-muted rounded-lg cursor-pointer hover:bg-muted/80"
                      onClick={() => onProductSelect(product)}
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{product.title}</p>
                        <p className="text-xs text-muted-foreground">{product.distance}</p>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" className="w-full">
                    查看該區域所有物品
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}