import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { X, Mail, Lock } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface LoginPageProps {
  onClose: () => void;
  onSwitchToRegister: () => void;
}

export function LoginPage({ onClose, onSwitchToRegister }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('請填寫所有必填欄位');
      return;
    }

    setLoading(true);

    // 模擬 API 呼叫延遲
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 在此處替換為您自己的登入邏輯
    console.log('Login attempt with:', { email, password });
    toast.success('登入成功！', {
      description: '您現在將被導向主頁面。',
    });
    
    onClose();
    setLoading(false);
  };

  const handleSocialLogin = (provider: string) => {
    toast.info(`使用 ${provider} 登入功能開發中`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md mx-auto">
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
          <h2 className="text-center text-xl font-semibold">登入</h2>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Social Login Buttons */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full flex items-center gap-3"
              onClick={() => handleSocialLogin('Google')}
            >
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">G</span>
              </div>
              使用 Google 帳戶登入
            </Button>
            
            <Button
              variant="outline"
              className="w-full flex items-center gap-3"
              onClick={() => handleSocialLogin('Facebook')}
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

          {/* Email Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-email">電子郵件、用戶名稱或手機號碼</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="login-email"
                  type="email"
                  placeholder="輸入您的電子郵件"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-password">密碼</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="login-password"
                  type="password"
                  placeholder="輸入您的密碼"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? '登入中...' : '登入'}
            </Button>
          </form>

          <div className="text-center">
            <Button variant="link" className="text-sm text-muted-foreground">
              忘記密碼？
            </Button>
          </div>

          <Separator />

          <div className="text-center">
            <span className="text-sm text-muted-foreground">還沒有帳戶嗎？ </span>
            <Button 
              variant="link" 
              className="text-sm text-primary p-0"
              onClick={onSwitchToRegister}
            >
              建立帳戶
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}