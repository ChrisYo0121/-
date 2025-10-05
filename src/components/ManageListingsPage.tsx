import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { 
  Search, 
  Filter, 
  Plus, 
  MoreVertical, 
  Eye, 
  Heart, 
  Edit, 
  Trash2, 
  Share2,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Pause
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

// 移除 apiService import，Product interface 移至下方

interface ManageListingsPageProps {
  onBack: () => void;
  onCreateListing: () => void;
  onProductsChange?: () => void;
}

import { Product } from '../types';

interface Listing extends Product {
  status: 'active' | 'inactive' | 'sold' | 'paused';
  views: number;
  likes: number;
  messages: number;
  price?: string;
}

// 模擬資料
const mockListings: Listing[] = [
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
        owner: { name: 'Chris', rating: 4.9 },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'active',
        views: 150,
        likes: 25,
        messages: 5,
        price: 'NT$500'
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
        owner: { name: 'Chris', rating: 4.9 },
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'active',
        views: 88,
        likes: 15,
        messages: 2,
        price: '免費'
    },
];

export function ManageListingsPage({ onBack, onCreateListing, onProductsChange }: ManageListingsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCondition, setSelectedCondition] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadUserProducts();
  }, []);

  const loadUserProducts = async () => {
    setLoading(true);
    setError(null);
    // 模擬 API 延遲
    await new Promise(resolve => setTimeout(resolve, 500));
    setListings(mockListings);
    setLoading(false);
  };

  const categories = [
    { value: 'all', label: '所有分類' },
    { value: 'electronics', label: '電子產品' },
    { value: 'books', label: '書籍' },
    { value: 'furniture', label: '家具' },
    { value: 'kitchen', label: '廚房用品' },
    { value: 'clothing', label: '服飾' },
    { value: 'toys', label: '玩具' },
    { value: 'other', label: '其他' }
  ];

  const statusOptions = [
    { value: 'all', label: '所有狀態' },
    { value: 'active', label: '進行中' },
    { value: 'paused', label: '暫停' },
    { value: 'sold', label: '已完成' },
    { value: 'inactive', label: '已下架' }
  ];

  const conditionOptions = [
    { value: 'all', label: '所有狀況' },
    { value: 'new', label: '全新' },
    { value: 'like-new', label: '近全新' },
    { value: 'good', label: '良好' },
    { value: 'fair', label: '普通' }
  ];

  const sortOptions = [
    { value: 'recent', label: '最近發布' },
    { value: 'views', label: '瀏覽次數' },
    { value: 'likes', label: '收藏數' },
    { value: 'messages', label: '訊息數' }
  ];

  const filteredListings = listings
    .filter(listing => {
      const matchesSearch = searchQuery === '' || 
        listing.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || listing.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || listing.status === selectedStatus;
      const matchesCondition = selectedCondition === 'all' || listing.condition === selectedCondition;
      
      return matchesSearch && matchesCategory && matchesStatus && matchesCondition;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'views':
          return b.views - a.views;
        case 'likes':
          return b.likes - a.likes;
        case 'messages':
          return b.messages - a.messages;
        default:
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
    });

  const activeCount = listings.filter(l => l.status === 'active').length;
  const inactiveCount = listings.filter(l => l.status === 'inactive').length;
  const otherCount = listings.filter(l => !['active', 'inactive'].includes(l.status)).length;

  const handleSelectItem = (id: string) => {
    setSelectedItems(prev => {
      const newSelected = new Set(prev);
      if (newSelected.has(id)) {
        newSelected.delete(id);
      } else {
        newSelected.add(id);
      }
      return newSelected;
    });
  };

  const handleSelectAll = () => {
    if (selectedItems.size === filteredListings.length) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(filteredListings.map(l => l.id)));
    }
  };

  const handleAction = async (action: string, id?: string) => {
    const targetIds = id ? [id] : Array.from(selectedItems);
    const target = id ? `項目` : `${targetIds.length} 個項目`;
    
    if (action === 'delete') {
      setListings(prev => prev.filter(listing => !targetIds.includes(listing.id)));
      setSelectedItems(new Set());
      toast.success(`已刪除 ${target}`);
      onProductsChange?.();
      return;
    }
    
    switch (action) {
      case 'edit':
        toast.info(`編輯 ${target}`);
        break;
      case 'pause':
        toast.success(`已暫停 ${target}`);
        break;
      case 'activate':
        toast.success(`已重新上架 ${target}`);
        break;
      case 'promote':
        toast.info(`推廣 ${target} 功能開發中`);
        break;
      case 'insights':
        toast.info(`查看 ${target} 數據分析`);
        break;
      case 'share':
        toast.success(`已複製 ${target} 連結`);
        break;
      default:
        break;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">進行中</Badge>;
      case 'paused':
        return <Badge variant="secondary">暫停</Badge>;
      case 'sold':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">已完成</Badge>;
      case 'inactive':
        return <Badge variant="destructive">已下架</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'paused':
        return <Pause className="w-4 h-4 text-yellow-600" />;
      case 'sold':
        return <CheckCircle className="w-4 h-4 text-blue-600" />;
      case 'inactive':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
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
              <h1 className="text-xl font-semibold">管理刊登</h1>
            </div>
            <Button onClick={onCreateListing} className="bg-primary hover:bg-primary/90">
              <Plus className="w-4 h-4 mr-2" />
              新增刊登
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Filter and Sort Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>篩選和排序</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="分類" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger>
                    <SelectValue placeholder="狀態" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(status => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                  <SelectTrigger>
                    <SelectValue placeholder="物品狀況" />
                  </SelectTrigger>
                  <SelectContent>
                    {conditionOptions.map(condition => (
                      <SelectItem key={condition.value} value={condition.value}>
                        {condition.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="排序" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map(sort => (
                      <SelectItem key={sort.value} value={sort.value}>
                        {sort.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="搜尋刊登..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Button variant="outline" className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  更多篩選
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Status Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{activeCount}</div>
                <div className="text-sm text-muted-foreground">進行中</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600">{inactiveCount}</div>
                <div className="text-sm text-muted-foreground">已下架</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{otherCount}</div>
                <div className="text-sm text-muted-foreground">其他</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold">{listings.length}</div>
                <div className="text-sm text-muted-foreground">總計</div>
              </CardContent>
            </Card>
          </div>

          {/* Actions Bar */}
          {selectedItems.size > 0 && (
            <Card className="mb-6">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    已選擇 {selectedItems.size} 個項目
                  </span>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAction('activate')}
                    >
                      重新上架
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleAction('pause')}
                    >
                      暫停
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleAction('delete')}
                    >
                      刪除
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Listings Table */}
          <Card>
            <CardContent className="p-0">
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <div className="text-muted-foreground">載入中...</div>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center py-12">
                  <div className="text-red-600 mb-4">{error}</div>
                  <Button onClick={loadUserProducts}>重新載入</Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedItems.size > 0 && selectedItems.size === filteredListings.length}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>
                      <TableHead>物品</TableHead>
                      <TableHead>發布日期</TableHead>
                      <TableHead>價格</TableHead>
                      <TableHead>收藏數</TableHead>
                      <TableHead>操作</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredListings.map((listing) => (
                      <TableRow key={listing.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedItems.has(listing.id)}
                            onCheckedChange={() => handleSelectItem(listing.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img
                              src={listing.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop'}
                              alt={listing.title}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium truncate">{listing.title}</div>
                              <div className="flex items-center gap-2 mt-1">
                                {getStatusIcon(listing.status)}
                                {getStatusBadge(listing.status)}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">{listing.timePosted}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm font-medium">
                            {listing.price || '交換'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-4 text-sm">
                            <div className="flex items-center gap-1">
                              <Eye className="w-4 h-4 text-muted-foreground" />
                              {listing.views}
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="w-4 h-4 text-muted-foreground" />
                              {listing.likes}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleAction('insights', listing.id)}
                            >
                              <TrendingUp className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleAction('promote', listing.id)}
                            >
                              推廣
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => handleAction('edit', listing.id)}>
                                  <Edit className="w-4 h-4 mr-2" />
                                  編輯
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleAction('share', listing.id)}>
                                  <Share2 className="w-4 h-4 mr-2" />
                                  分享
                                </DropdownMenuItem>
                                {listing.status === 'active' ? (
                                  <DropdownMenuItem onClick={() => handleAction('pause', listing.id)}>
                                    <Pause className="w-4 h-4 mr-2" />
                                    暫停
                                  </DropdownMenuItem>
                                ) : (
                                  <DropdownMenuItem onClick={() => handleAction('activate', listing.id)}>
                                    <CheckCircle className="w-4 h-4 mr-2" />
                                    重新上架
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem 
                                  onClick={() => handleAction('delete', listing.id)}
                                  className="text-destructive"
                                >
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  刪除
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {!loading && !error && filteredListings.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">找不到符合條件的刊登</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}