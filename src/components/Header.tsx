import React from 'react';
import { Search, MapPin, User, Menu } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner@2.0.3';

interface HeaderProps {
  onSearchChange: (query: string) => void;
  onShowMap: () => void;
  showMap: boolean;
  onLogin: () => void;
  onRegister: () => void;
  onPost: () => void;
  onProfile: () => void;
}

export function Header({ onSearchChange, onShowMap, showMap, onLogin, onRegister, onPost }: HeaderProps) {
  const handlePostClick = () => {
    // Here you can add logic to check if the user is authenticated
    // For now, it will just call onPost, which might show the login page.
    toast.info('請先登入才能發布商品');
    onLogin();
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <div className="w-6 h-6 flex items-center justify-center font-bold">
                鄰
              </div>
            </div>
            <div>
              <h1 className="font-bold text-lg">台中易起來</h1>
              <p className="text-sm text-muted-foreground">活化舊物打造永續生活圈</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="search"
                placeholder="搜尋物品... Search items..."
                className="pl-10 pr-4"
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant={showMap ? 'default' : 'outline'}
              size="sm"
              onClick={onShowMap}
              className="flex items-center gap-2"
            >
              <MapPin className="w-4 h-4" />
              <span className="hidden sm:inline">
                {showMap ? '商品列表' : '地圖搜尋'}
              </span>
            </Button>
            
            <>
              {/* Non-authenticated user buttons */}
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden sm:flex items-center gap-2"
                onClick={onRegister}
              >
                註冊
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2"
                onClick={onLogin}
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">登入</span>
              </Button>

              <Button 
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                size="sm"
                onClick={handlePostClick}
              >
                刊登
              </Button>
            </>

            <Button variant="outline" size="sm" className="sm:hidden">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}