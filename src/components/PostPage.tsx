import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { ImageIcon, X, Plus, MapPin } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PostPageProps {
  onBack: () => void;
  onProductCreated?: () => void;
}

export function PostPage({ onBack, onProductCreated }: PostPageProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    condition: '',
    exchangeType: '',
    location: '',
    tags: [] as string[],
    images: [] as string[]
  });
  const [newTag, setNewTag] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { value: 'electronics', label: '電子產品' },
    { value: 'books', label: '書籍' },
    { value: 'clothing', label: '服飾' },
    { value: 'furniture', label: '家具' },
    { value: 'baby', label: '嬰幼用品' },
    { value: 'kitchen', label: '廚房用品' },
    { value: 'automotive', label: '汽車用品' },
    { value: 'toys', label: '玩具遊戲' },
    { value: 'sports', label: '運動用品' },
    { value: 'other', label: '其他' }
  ];

  const conditions = [
    { value: 'new', label: '全新' },
    { value: 'like-new', label: '近全新' },
    { value: 'good', label: '良好' },
    { value: 'fair', label: '普通' }
  ];

  const exchangeTypes = [
    { value: 'free', label: '免費贈送' },
    { value: 'exchange', label: '物品交換' },
    { value: 'barter', label: '以物易物' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      // Mock image URLs for demo
      const newImages = Array.from(files).map((_, index) => 
        `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center&auto=format&q=80&${index}`
      );
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...newImages].slice(0, 10) // Max 10 images
      }));
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setDragOver(false);
    const files = event.dataTransfer.files;
    if (files) {
      // Mock handling drag and drop
      toast.info('圖片上傳功能開發中');
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category || !formData.condition || !formData.exchangeType) {
      toast.error('請填寫所有必填欄位');
      return;
    }

    setLoading(true);

    // 模擬 API 呼叫
    await new Promise(resolve => setTimeout(resolve, 1000));

    console.log("Submitting product:", formData);
    toast.success('物品已成功刊登！');
    onProductCreated?.();
    onBack();

    setLoading(false);
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
              <h1 className="text-xl font-semibold">刊登物品</h1>
            </div>
            <Button 
              type="submit" 
              form="post-form"
              disabled={loading}
              className="bg-primary hover:bg-primary/90"
            >
              {loading ? '發布中...' : '發布'}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Image Upload */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>上傳照片</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    最多可上傳 10 張照片 (最多 10 張照片)
                  </p>
                </CardHeader>
                <CardContent>
                  {/* Image Upload Area */}
                  <div
                    className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                      dragOver ? 'border-primary bg-primary/5' : 'border-border'
                    }`}
                    onDrop={handleDrop}
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                  >
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                        <ImageIcon className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <Button
                          type="button"
                          className="mb-2"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          選擇照片
                        </Button>
                        <p className="text-sm text-muted-foreground">
                          或拖拽照片到這裡
                        </p>
                      </div>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                  </div>

                  {/* Image Preview */}
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image}
                            alt={`預覽 ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <Button
                            variant="destructive"
                            size="sm"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleRemoveImage(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Sell to Platform */}
              <Card>
                <CardHeader>
                  <CardTitle>賣給鄰里交換平台</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    無需刊登，直接賣給我們
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      節省時間和精力，快速獲得報酬
                    </p>
                    <Button variant="outline">
                      登入或註冊
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Form */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>物品資訊</CardTitle>
                </CardHeader>
                <CardContent>
                  <form id="post-form" onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div className="space-y-2">
                      <Label htmlFor="title">標題 *</Label>
                      <Input
                        id="title"
                        placeholder="簡短描述您的物品"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        required
                      />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                      <Label htmlFor="description">詳細描述 *</Label>
                      <Textarea
                        id="description"
                        placeholder="詳細描述物品的狀況、特點等"
                        rows={4}
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        required
                      />
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                      <Label>分類 *</Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) => handleInputChange('category', value)}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="選擇分類" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.value} value={category.value}>
                              {category.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Condition */}
                    <div className="space-y-3">
                      <Label>物品狀況 *</Label>
                      <RadioGroup
                        value={formData.condition}
                        onValueChange={(value) => handleInputChange('condition', value)}
                        required
                      >
                        {conditions.map((condition) => (
                          <div key={condition.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={condition.value} id={condition.value} />
                            <Label htmlFor={condition.value}>{condition.label}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    {/* Exchange Type */}
                    <div className="space-y-3">
                      <Label>交換方式 *</Label>
                      <RadioGroup
                        value={formData.exchangeType}
                        onValueChange={(value) => handleInputChange('exchangeType', value)}
                        required
                      >
                        {exchangeTypes.map((type) => (
                          <div key={type.value} className="flex items-center space-x-2">
                            <RadioGroupItem value={type.value} id={type.value} />
                            <Label htmlFor={type.value}>{type.label}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    </div>

                    {/* Location */}
                    <div className="space-y-2">
                      <Label htmlFor="location">位置</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="location"
                          placeholder="例如：台北市大安區"
                          value={formData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="space-y-2">
                      <Label>標籤</Label>
                      <div className="flex gap-2">
                        <Input
                          placeholder="新增標籤"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                        />
                        <Button type="button" variant="outline" onClick={handleAddTag}>
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      {formData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="flex items-center gap-1">
                              {tag}
                              <Button
                                type="button"
                                variant="ghost"
                                size="sm"
                                className="h-auto p-0 hover:bg-transparent"
                                onClick={() => handleRemoveTag(tag)}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}