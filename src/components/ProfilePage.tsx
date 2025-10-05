import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { ProductCard, Product } from './ProductCard';
import { 
  User, 
  Star, 
  MapPin, 
  Calendar, 
  MessageCircle, 
  Heart, 
  Settings,
  Plus,
  Share2,
  MoreVertical,
  TrendingUp,
  Eye,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ProfilePageProps {
  onBack: () => void;
  onEditProfile: () => void;
  onManageListings: () => void;
  onProductsChange?: () => void;
}

// 靜態模擬使用者資料
const userProfile = {
  id: 'user-123',
  name: 'Chris',
  username: '@chris',
  email: 'chris@example.com',
  avatar: 'https://github.com/shadcn.png', // 使用一個佔位圖
  rating: 4.9,
  reviewCount: 128,
  location: '台中市西區',
  joinDate: '2023年10月',
  verified: true,
  responseRate: '99%',
  followers: 1024,
  following: 80,
  bio: '熱愛分享與交流，專注於 3C 與生活好物。歡迎來挖寶！',
  badges: ['熱心分享家', '快速回應者', '資深用戶']
};

// 靜態模擬使用者刊登的商品
const mockUserListings: Product[] = [
  {
    id: '1',
    title: '二手電競滑鼠',
    description: '九成新，使用約半年，功能完全正常。',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=300',
    category: 'electronics',
    location: '台中市西區',
    distance: '1km',
    timePosted: '5小時前',
    condition: 'like-new',
    exchangeType: 'exchange',
    tags: ['電競', '滑鼠', '3C'],
    owner: { name: userProfile.name, rating: userProfile.rating },
    status: 'active',
    views: 150,
    likes: 25
  },
  {
    id: '2',
    title: '村上春樹小說合集',
    description: '包含《1Q84》、《挪威的森林》等五本經典作品。',
    image: 'https://images.unsplash.com/photo-1509266272358-77a04460cb6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400&h=300',
    category: 'books',
    location: '台中市西區',
    distance: '1km',
    timePosted: '2天前',
    condition: 'good',
    exchangeType: 'free',
    tags: ['小說', '文學', '村上春樹'],
    owner: { name: userProfile.name, rating: userProfile.rating },
    status: 'active',
    views: 88,
    likes: 15
  },
];

export function ProfilePage({ onBack, onEditProfile, onManageListings }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState('listings');
  const [likedProducts, setLikedProducts] = useState<Set<string>>(new Set());
  const [userListings, setUserListings] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模擬載入資料
    setLoading(true);
    setTimeout(() => {
      setUserListings(mockUserListings);
      setLoading(false);
    }, 500);
  }, []);

  const handleContact = (productId: string) => {
    toast.success('已發送聯繫請求', { description: `正在聯繫商品 #${productId} 的物主...` });
  };

  const handleLike = (productId: string) => {
    setLikedProducts(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(productId)) {
        newLiked.delete(productId);
        toast.info('已從收藏移除');
      } else {
        newLiked.add(productId);
        toast.success('已加入收藏！');
      }
      return newLiked;
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('個人檔案連結已複製到剪貼板');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={onBack}>
                ← 返回
              </Button>
              <h1 className="text-xl font-semibold">個人檔案</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                分享
              </Button>
              <Button variant="outline" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Avatar and Basic Info */}
                <div className="flex flex-col items-center md:items-start">
                  <Avatar className="w-24 h-24 mb-4">
                    <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                    <AvatarFallback>{userProfile.name[0]?.toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="text-center md:text-left">
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-2xl font-bold">{userProfile.name}</h2>
                      {userProfile.verified && (
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                          已認證
                        </Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-2">{userProfile.username}</p>
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{userProfile.rating}</span>
                      <span className="text-muted-foreground">({userProfile.reviewCount} 評價)</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground mb-2">
                      <MapPin className="w-4 h-4" />
                      <span>{userProfile.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>加入於 {userProfile.joinDate}</span>
                    </div>
                  </div>
                </div>

                {/* Profile Details */}
                <div className="flex-1">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{userProfile.followers}</div>
                      <div className="text-sm text-muted-foreground">關注者</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{userProfile.following}</div>
                      <div className="text-sm text-muted-foreground">正在關注</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">{userProfile.responseRate}</div>
                      <div className="text-sm text-muted-foreground">回應率</div>
                    </div>
                  </div>

                  {/* Bio */}
                  {userProfile.bio && (
                    <div className="mb-6">
                      <h3 className="font-semibold mb-2">關於我</h3>
                      <p className="text-muted-foreground">{userProfile.bio}</p>
                    </div>
                  )}

                  {/* Badges */}
                  {userProfile.badges.length > 0 && (
                    <div className="mb-6">
                      <h3 className="font-semibold mb-2">成就徽章</h3>
                      <div className="flex flex-wrap gap-2">
                        {userProfile.badges.map((badge, index) => (
                          <Badge key={index} variant="outline">
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={onEditProfile}>
                      <Settings className="w-4 h-4 mr-2" />
                      編輯個人檔案
                    </Button>
                    <Button variant="outline" onClick={onManageListings}>
                      管理刊登
                    </Button>
                    <Button variant="outline">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      發送訊息
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="listings">刊登物品</TabsTrigger>
              <TabsTrigger value="reviews">評價</TabsTrigger>
              <TabsTrigger value="liked">收藏</TabsTrigger>
              <TabsTrigger value="insights">數據分析</TabsTrigger>
            </TabsList>

            {/* Listings Tab */}
            <TabsContent value="listings" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">我的刊登 ({userListings.length})</h3>
                <Button size="sm" onClick={onManageListings}>
                  <Plus className="w-4 h-4 mr-2" />
                  管理刊登
                </Button>
              </div>
              
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">載入中...</span>
                </div>
              ) : userListings.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-muted-foreground mb-4">您還沒有發布任何商品</div>
                  <Button onClick={onManageListings}>
                    <Plus className="w-4 h-4 mr-2" />
                    發布第一個商品
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userListings.map((product) => (
                    <div key={product.id} className="relative">
                      <ProductCard
                        product={product}
                        onContact={handleContact}
                        onLike={handleLike}
                        isLiked={likedProducts.has(product.id)}
                      />
                      {/* Stats overlay */}
                      <div className="absolute top-2 right-2 bg-black/70 text-white rounded-lg px-2 py-1 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <Eye className="w-3 h-3" />
                            {(product as any).views || 0}
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            {(product as any).likes || 0}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">評價 ({userProfile.reviewCount})</h3>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{userProfile.rating}</span>
                </div>
              </div>

              <div className="space-y-4">
                {[1, 2, 3].map((review) => (
                  <Card key={review}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="font-medium">使用者{review}</span>
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">1週前</span>
                          </div>
                          <p className="text-sm">交易過程很順利，物品狀況如描述，推薦！</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Liked Tab */}
            <TabsContent value="liked">
              <div className="text-center py-12">
                <Heart className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">尚無收藏物品</h3>
                <p className="text-muted-foreground">開始瀏覽並收藏感興趣的物品吧！</p>
              </div>
            </TabsContent>

            {/* Insights Tab */}
            <TabsContent value="insights" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">總瀏覽次數</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,234</div>
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      +12%
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">總收藏數</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">89</div>
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      +8%
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">成功交換</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">23</div>
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      +5%
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}