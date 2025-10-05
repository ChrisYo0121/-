import React from 'react';
import { ProductCard, Product } from './ProductCard';
import { Button } from './ui/button';
import { RefreshCw } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
  onContact: (productId: string) => void;
  onLike: (productId: string) => void;
  likedProducts: Set<string>;
}

export function ProductGrid({ 
  products, 
  loading = false, 
  onLoadMore, 
  hasMore = false,
  onContact,
  onLike,
  likedProducts
}: ProductGridProps) {
  if (loading && products.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i} className="bg-card border border-border rounded-lg p-4 animate-pulse">
            <div className="bg-muted h-48 rounded mb-4"></div>
            <div className="space-y-2">
              <div className="bg-muted h-4 rounded w-3/4"></div>
              <div className="bg-muted h-3 rounded w-1/2"></div>
              <div className="bg-muted h-3 rounded w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-muted-foreground mb-4">
          <svg
            className="mx-auto h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-7 7-7-7"
            />
          </svg>
        </div>
        <p className="text-muted-foreground text-lg">找不到符合條件的物品</p>
        <p className="text-muted-foreground text-sm mt-2">
          試著調整搜尋條件或瀏覽其他分類
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onContact={onContact}
            onLike={onLike}
            isLiked={likedProducts.has(product.id)}
          />
        ))}
      </div>

      {hasMore && onLoadMore && (
        <div className="text-center py-8">
          <Button
            variant="outline"
            onClick={onLoadMore}
            disabled={loading}
            className="flex items-center gap-2"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : null}
            {loading ? '載入中...' : '載入更多物品'}
          </Button>
        </div>
      )}
    </div>
  );
}