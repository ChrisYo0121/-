import React from 'react';
import { Button } from './ui/button';
import { ArrowRight, Users, Recycle, Heart } from 'lucide-react';

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary/5 to-accent/20 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            與鄰居分享，讓資源重新流動
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            政府推動的鄰里交換平台，讓您輕鬆與附近鄰居交換物品，減少浪費，增進社區情感。
            從家電、書籍到玩具，每個閒置物品都有新的可能。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="flex items-center gap-2">
              開始探索物品
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg">
              了解使用方式
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">2,847</h3>
              <p className="text-muted-foreground">活躍鄰居</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Recycle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">15,234</h3>
              <p className="text-muted-foreground">成功交換</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-2">98%</h3>
              <p className="text-muted-foreground">滿意度</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}