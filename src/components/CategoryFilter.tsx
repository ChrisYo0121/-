import React from 'react';
import { Button } from './ui/button';
import { Smartphone, Book, Shirt, Home, Baby, Utensils, Car, Gamepad2, Trophy } from 'lucide-react';

const categories = [
  { id: 'all', name: '全部', icon: null },
  { id: 'electronics', name: '電子產品', icon: Smartphone },
  { id: 'books', name: '書籍', icon: Book },
  { id: 'clothing', name: '服飾', icon: Shirt },
  { id: 'furniture', name: '家具', icon: Home },
  { id: 'baby', name: '嬰幼用品', icon: Baby },
  { id: 'kitchen', name: '廚房用品', icon: Utensils },
  { id: 'automotive', name: '汽車用品', icon: Car },
  { id: 'toys', name: '玩具遊戲', icon: Gamepad2 },
  { id: 'sports', name: '運動用品', icon: Trophy },
];

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="bg-card border-b border-border py-4">
      <div className="container mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => onCategoryChange(category.id)}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                {Icon && <Icon className="w-4 h-4" />}
                {category.name}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}