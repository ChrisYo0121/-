import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Checkbox } from './ui/checkbox';
import { X, Mail, Lock, User, Phone } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface RegisterPageProps {
  onClose: () => void;
  onSwitchToLogin: () => void;
}

export function RegisterPage({ onClose, onSwitchToLogin }: RegisterPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!acceptTerms) {
      toast.error('請同意服務條款和隱私政策');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('密碼確認不一致');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('密碼長度至少需要6位');
      return;
    }

    setLoading(true);

    // 模擬 API 呼叫延遲
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 在此處替換為您自己的註冊邏輯
    console.log('Registering user with:', formData);
    toast.success('註冊成功！', {
      description: '歡迎加入！請登入以繼續。',
    });
    
    onClose(); // 關閉註冊視窗
    onSwitchToLogin(); // 切換到登入畫面

    setLoading(false);
  };

  const handleSocialRegister = (provider: string) => {
    toast.info(`使用 ${provider} 註冊功能開發中`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative pb-4">
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 top-0"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary text-primary-foreground p-2 rounded-lg">
              <div className="w-6 h-6 flex items-center justify-center font-bold">
                鄰
              </div>
            </div>
          </div>
          <h2 className="text-center text-xl font-semibold">建立帳戶</h2>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Social Register Buttons */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full flex items-center gap-3"
              onClick={() => handleSocialRegister('Google')}
            >
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">G</span>
              </div>
              使用 Google 帳戶註冊
            </Button>
            
            <Button
              variant="outline"
              className="w-full flex items-center gap-3"
              onClick={() => handleSocialRegister('Facebook')}
            >
              <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">f</span>
              </div>
              Facebook
            </Button>
          </div>

          <div className="relative">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-sm text-muted-foreground">
              或
            </span>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="register-name">姓名</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="register-name"
                  type="text"
                  placeholder="輸入您的姓名"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="register-email">電子郵件</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="register-email"
                  type="email"
                  placeholder="輸入您的電子郵件"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="register-phone">手機號碼</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="register-phone"
                  type="tel"
                  placeholder="輸入您的手機號碼"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="register-password">密碼</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="register-password"
                  type="password"
                  placeholder="輸入您的密碼"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="register-confirm-password">確認密碼</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="register-confirm-password"
                  type="password"
                  placeholder="再次輸入密碼"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-start space-x-2">
              <Checkbox
                id="accept-terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
              />
              <Label htmlFor="accept-terms" className="text-sm leading-5">
                註冊即表示您同意鄰里交換的{' '}
                <Button variant="link" className="text-sm text-primary p-0 underline">
                  服務條款
                </Button>{' '}
                和{' '}
                <Button variant="link" className="text-sm text-primary p-0 underline">
                  隱私政策
                </Button>
              </Label>
            </div>

            <Button type="submit" className="w-full" disabled={loading || !acceptTerms}>
              {loading ? '註冊中...' : '建立帳戶'}
            </Button>
          </form>

          <Separator />

          <div className="text-center">
            <span className="text-sm text-muted-foreground">已經有帳戶了嗎？ </span>
            <Button 
              variant="link" 
              className="text-sm text-primary p-0"
              onClick={onSwitchToLogin}
            >
              登入
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}