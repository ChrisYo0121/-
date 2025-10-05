import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  User, 
  Camera, 
  Lock, 
  Bell, 
  Shield, 
  MapPin, 
  Palette, 
  Globe, 
  Smartphone,
  Mail,
  Eye,
  EyeOff,
  Upload
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface SettingsPageProps {
  onBack: () => void;
}

export function SettingsPage({ onBack }: SettingsPageProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Profile form state
  const [profileData, setProfileData] = useState({
    username: 'wangming123',
    fullName: '王小明',
    title: 'pro',
    bio: '熱愛環保，喜歡與鄰居分享閒置物品，讓資源得到最好的利用。歡迎交流！',
    marketplace: '台灣',
    region: '台北市 (Taipei-Keelung)',
    city: '台北市 (Taipei)',
    email: 'wa***********@gmail.com',
    mobile: '+886 9********5',
    gender: '',
    birthday: ''
  });

  // Privacy settings state
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showPhone: false,
    showLocation: true,
    allowMessages: true,
    showOnlineStatus: true,
    dataCollection: true
  });

  // Notification settings state
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    messageNotifications: true,
    listingNotifications: true,
    marketingEmails: false,
    weeklyDigest: true
  });

  // Theme settings state
  const [themeSettings, setThemeSettings] = useState({
    theme: 'system',
    language: 'zh-TW',
    fontSize: 'medium'
  });

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handlePrivacyChange = (field: string, value: boolean) => {
    setPrivacySettings(prev => ({ ...prev, [field]: value }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotificationSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleThemeChange = (field: string, value: string) => {
    setThemeSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    // Mock save
    setTimeout(() => {
      setLoading(false);
      toast.success('個人資料已更新');
    }, 1000);
  };

  const handleChangePassword = () => {
    toast.info('密碼變更功能開發中');
  };

  const handleUploadPhoto = () => {
    toast.info('照片上傳功能開發中');
  };

  const handleDeleteAccount = () => {
    toast.error('帳戶刪除功能需要額外確認步驟');
  };

  const handleSaveTheme = () => {
    toast.success('外觀設定已儲存');
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
              <h1 className="text-xl font-semibold">個人設定</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Side Navigation */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Navigation Sidebar */}
            <div className="lg:col-span-1">
              <div className="space-y-2">
                <Button
                  variant={activeTab === 'profile' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('profile')}
                >
                  <User className="w-4 h-4 mr-2" />
                  編輯個人檔案
                </Button>
                <Button
                  variant={activeTab === 'password' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('password')}
                >
                  <Lock className="w-4 h-4 mr-2" />
                  變更密碼
                </Button>
                <Button
                  variant={activeTab === 'notifications' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('notifications')}
                >
                  <Bell className="w-4 h-4 mr-2" />
                  通知設定
                </Button>
                <Button
                  variant={activeTab === 'privacy' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('privacy')}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  隱私和安全
                </Button>
                <Button
                  variant={activeTab === 'theme' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('theme')}
                >
                  <Palette className="w-4 h-4 mr-2" />
                  主題外觀
                </Button>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>個人檔案照片</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        清晰的正面照片能讓買家和賣家更容易了解彼此
                      </p>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-6">
                        <Avatar className="w-24 h-24">
                          <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face" />
                          <AvatarFallback>王</AvatarFallback>
                        </Avatar>
                        <div>
                          <Button onClick={handleUploadPhoto} className="mb-2">
                            <Upload className="w-4 h-4 mr-2" />
                            上傳照片
                          </Button>
                          <p className="text-sm text-muted-foreground">
                            建議使用正方形圖片，檔案大小不超過 10MB
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>公開個人檔案</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="username">使用者名稱</Label>
                          <Input
                            id="username"
                            value={profileData.username}
                            onChange={(e) => handleProfileChange('username', e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="fullName">全名</Label>
                          <Input
                            id="fullName"
                            value={profileData.fullName}
                            onChange={(e) => handleProfileChange('fullName', e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="title">稱號</Label>
                        <Input
                          id="title"
                          value={profileData.title}
                          onChange={(e) => handleProfileChange('title', e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="bio">個人簡介</Label>
                        <Textarea
                          id="bio"
                          rows={4}
                          value={profileData.bio}
                          onChange={(e) => handleProfileChange('bio', e.target.value)}
                          className="resize-none"
                        />
                        <p className="text-xs text-muted-foreground text-right">
                          {profileData.bio.length}/500
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>位置資訊</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>市場</Label>
                        <Select value={profileData.marketplace} onValueChange={(value) => handleProfileChange('marketplace', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="台灣">台灣</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>地區</Label>
                        <Select value={profileData.region} onValueChange={(value) => handleProfileChange('region', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="台北市 (Taipei-Keelung)">台北市 (Taipei-Keelung)</SelectItem>
                            <SelectItem value="新北市 (New Taipei)">新北市 (New Taipei)</SelectItem>
                            <SelectItem value="桃園市 (Taoyuan)">桃園市 (Taoyuan)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>城市</Label>
                        <Select value={profileData.city} onValueChange={(value) => handleProfileChange('city', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="台北市 (Taipei)">台北市 (Taipei)</SelectItem>
                            <SelectItem value="新北市 (New Taipei)">新北市 (New Taipei)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>私人資訊</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        我們會要求對方用戶的明確許可才能訪問您的資訊
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>電子郵件</Label>
                        <div className="flex items-center gap-2">
                          <Input value={profileData.email} disabled className="flex-1" />
                          <Button variant="outline" size="sm">更新</Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>手機號碼</Label>
                        <div className="flex items-center gap-2">
                          <Input value={profileData.mobile} disabled className="flex-1" />
                          <Button variant="outline" size="sm">更新</Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>性別</Label>
                          <Select value={profileData.gender} onValueChange={(value) => handleProfileChange('gender', value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="選擇" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="male">男性</SelectItem>
                              <SelectItem value="female">女性</SelectItem>
                              <SelectItem value="other">其他</SelectItem>
                              <SelectItem value="prefer-not-to-say">不願透露</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>生日</Label>
                          <Input
                            type="date"
                            value={profileData.birthday}
                            onChange={(e) => handleProfileChange('birthday', e.target.value)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex justify-end">
                    <Button onClick={handleSaveProfile} disabled={loading}>
                      {loading ? '儲存中...' : '儲存變更'}
                    </Button>
                  </div>
                </div>
              )}

              {/* Password Tab */}
              {activeTab === 'password' && (
                <Card>
                  <CardHeader>
                    <CardTitle>變更密碼</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      定期更新密碼有助於保護您的帳戶安全
                    </p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">目前密碼</Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="輸入目前密碼"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="new-password">新密碼</Label>
                      <Input
                        id="new-password"
                        type="password"
                        placeholder="輸入新密碼"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">確認新密碼</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        placeholder="再次輸入新密碼"
                      />
                    </div>

                    <div className="pt-4">
                      <Button onClick={handleChangePassword}>
                        更新密碼
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>通知偏好設定</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        選擇您希望接收的通知類型
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">電子郵件通知</div>
                            <div className="text-sm text-muted-foreground">接收重要更新和活動通知</div>
                          </div>
                          <Switch
                            checked={notificationSettings.emailNotifications}
                            onCheckedChange={(checked) => handleNotificationChange('emailNotifications', checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">推播通知</div>
                            <div className="text-sm text-muted-foreground">即時接收訊息和更新</div>
                          </div>
                          <Switch
                            checked={notificationSettings.pushNotifications}
                            onCheckedChange={(checked) => handleNotificationChange('pushNotifications', checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">簡訊通知</div>
                            <div className="text-sm text-muted-foreground">透過簡訊接收重要通知</div>
                          </div>
                          <Switch
                            checked={notificationSettings.smsNotifications}
                            onCheckedChange={(checked) => handleNotificationChange('smsNotifications', checked)}
                          />
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h4 className="font-medium">特定通知類型</h4>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">訊息通知</div>
                            <div className="text-sm text-muted-foreground">新訊息和聊天更新</div>
                          </div>
                          <Switch
                            checked={notificationSettings.messageNotifications}
                            onCheckedChange={(checked) => handleNotificationChange('messageNotifications', checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">刊登相關通知</div>
                            <div className="text-sm text-muted-foreground">您的刊登有新活動時通知</div>
                          </div>
                          <Switch
                            checked={notificationSettings.listingNotifications}
                            onCheckedChange={(checked) => handleNotificationChange('listingNotifications', checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">行銷郵件</div>
                            <div className="text-sm text-muted-foreground">促銷活動和特別優惠</div>
                          </div>
                          <Switch
                            checked={notificationSettings.marketingEmails}
                            onCheckedChange={(checked) => handleNotificationChange('marketingEmails', checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">每週摘要</div>
                            <div className="text-sm text-muted-foreground">您的活動和統計資料摘要</div>
                          </div>
                          <Switch
                            checked={notificationSettings.weeklyDigest}
                            onCheckedChange={(checked) => handleNotificationChange('weeklyDigest', checked)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === 'privacy' && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>隱私設定</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        控制其他用戶可以看到您的哪些資訊
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">顯示電子郵件</div>
                            <div className="text-sm text-muted-foreground">讓其他用戶看到您的電子郵件地址</div>
                          </div>
                          <Switch
                            checked={privacySettings.showEmail}
                            onCheckedChange={(checked) => handlePrivacyChange('showEmail', checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">顯示手機號碼</div>
                            <div className="text-sm text-muted-foreground">讓其他用戶看到您的手機號碼</div>
                          </div>
                          <Switch
                            checked={privacySettings.showPhone}
                            onCheckedChange={(checked) => handlePrivacyChange('showPhone', checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">顯示位置資訊</div>
                            <div className="text-sm text-muted-foreground">顯示您的大概位置</div>
                          </div>
                          <Switch
                            checked={privacySettings.showLocation}
                            onCheckedChange={(checked) => handlePrivacyChange('showLocation', checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">允許私訊</div>
                            <div className="text-sm text-muted-foreground">其他用戶可以直接發訊息給您</div>
                          </div>
                          <Switch
                            checked={privacySettings.allowMessages}
                            onCheckedChange={(checked) => handlePrivacyChange('allowMessages', checked)}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">顯示上線狀態</div>
                            <div className="text-sm text-muted-foreground">讓其他用戶知道您是否在線上</div>
                          </div>
                          <Switch
                            checked={privacySettings.showOnlineStatus}
                            onCheckedChange={(checked) => handlePrivacyChange('showOnlineStatus', checked)}
                          />
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h4 className="font-medium">資料使用</h4>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">改善服務的資料收集</div>
                            <div className="text-sm text-muted-foreground">協助我們改善平台體驗</div>
                          </div>
                          <Switch
                            checked={privacySettings.dataCollection}
                            onCheckedChange={(checked) => handlePrivacyChange('dataCollection', checked)}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-destructive">危險區域</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">刪除帳戶</h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            一旦刪除帳戶，您的所有資料將無法復原。請謹慎考慮。
                          </p>
                          <Button variant="destructive" onClick={handleDeleteAccount}>
                            刪除我的帳戶
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Theme Tab */}
              {activeTab === 'theme' && (
                <Card>
                  <CardHeader>
                    <CardTitle>外觀設定</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      自定義應用程式的外觀和感覺
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label>主題模式</Label>
                        <Select value={themeSettings.theme} onValueChange={(value) => handleThemeChange('theme', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">淺色模式</SelectItem>
                            <SelectItem value="dark">深色模式</SelectItem>
                            <SelectItem value="system">跟隨系統設定</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>語言</Label>
                        <Select value={themeSettings.language} onValueChange={(value) => handleThemeChange('language', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="zh-TW">繁體中文</SelectItem>
                            <SelectItem value="zh-CN">简体中文</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label>字體大小</Label>
                        <Select value={themeSettings.fontSize} onValueChange={(value) => handleThemeChange('fontSize', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">小</SelectItem>
                            <SelectItem value="medium">中</SelectItem>
                            <SelectItem value="large">大</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="pt-4">
                        <Button onClick={handleSaveTheme}>儲存外觀設定</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}