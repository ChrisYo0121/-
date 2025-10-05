import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Clock, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onContact: (productId: string) => void;
  onLike: (productId: string) => void;
  isLiked?: boolean;
}

const conditionColors = {
  'new': 'bg-green-100 text-green-800',
  'like-new': 'bg-blue-100 text-blue-800',
  'good': 'bg-yellow-100 text-yellow-800',
  'fair': 'bg-orange-100 text-orange-800',
};

const exchangeTypeLabels = {
  'free': '免費贈送',
  'exchange': '物品交換',
  'barter': '以物易物',
};

export function ProductCard({ product, onContact, onLike, isLiked = false }: ProductCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <ImageWithFallback
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        <Button
          variant="ghost"
          size="sm"
          className={`absolute top-2 right-2 bg-white/80 hover:bg-white ${isLiked ? 'text-red-500' : 'text-gray-500'}`}
          onClick={() => onLike(product.id)}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
        </Button>
        <Badge className={`absolute top-2 left-2 ${conditionColors[product.condition]}`}>
          {product.condition === 'new' ? '全新' : 
           product.condition === 'like-new' ? '近全新' :
           product.condition === 'good' ? '良好' : '普通'}
        </Badge>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold line-clamp-2">{product.title}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
              {product.description}
            </p>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{product.location}</span>
            <span>•</span>
            <span>{product.distance}</span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{product.timePosted}</span>
          </div>

          <div className="flex flex-wrap gap-1">
            <Badge variant="secondary">
              {exchangeTypeLabels[product.exchangeType]}
            </Badge>
            {product.tags.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-sm">
              <span className="text-muted-foreground">提供者: </span>
              <span className="font-medium">{product.owner.name}</span>
              <span className="text-yellow-500 ml-1">
                {'★'.repeat(Math.floor(product.owner.rating))}
              </span>
            </div>
            <Button 
              size="sm" 
              onClick={() => onContact(product.id)}
              className="shrink-0"
            >
              聯繫
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}