import { apiService, CreateProductRequest } from './api';

export const sampleProducts: CreateProductRequest[] = [
  {
    title: "全新Samsung手機",
    description: "剛購買不久的Samsung Galaxy手機，功能完全正常，包裝盒完整",
    image: "https://images.unsplash.com/photo-1740803292814-13d2e35924c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwYXBwbGlhbmNlcyUyMGVsZWN0cm9uaWNzfGVufDF8fHx8MTc1ODg2ODczMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "electronics",
    location: "台北市大安區",
    condition: "like-new",
    exchangeType: "exchange",
    tags: ["手機", "通訊", "3C"],
    owner: { name: "王小明", rating: 4.8 },
  },
  {
    title: "兒童繪本套書",
    description: "適合3-8歲的精裝繪本，包含20本經典故事書，保存良好",
    image: "https://images.unsplash.com/photo-1621683634326-d8650294c94b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rcyUyMGNsb3RoaW5nJTIwZnVybml0dXJlfGVufDF8fHx8MTc1ODg2ODczNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "books",
    location: "台北市信義區",
    condition: "good",
    exchangeType: "free",
    tags: ["書籍", "兒童", "教育"],
    owner: { name: "李媽媽", rating: 5.0 },
  },
  {
    title: "積木玩具組合",
    description: "樂高相容積木，包含車子、建築物等多種主題，適合4歲以上",
    image: "https://images.unsplash.com/photo-1650775766475-2cc37492e2a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3lzJTIwY2hpbGRyZW4lMjBnYW1lc3xlbnwxfHx8fDE3NTg4Njg3Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "toys",
    location: "台北市中山區",
    condition: "good",
    exchangeType: "barter",
    tags: ["玩具", "積木", "益智"],
    owner: { name: "陳爸爸", rating: 4.5 },
  },
  {
    title: "不鏽鋼餐具組",
    description: "全新不鏽鋼餐具組，包含湯匙、叉子、筷子，共12件套",
    image: "https://images.unsplash.com/photo-1572656934803-d2162b2e98bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraXRjaGVuJTIwdG9vbHMlMjB1dGVuc2lsc3xlbnwxfHx8fDE3NTg4Njg3NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "kitchen",
    location: "台北市文山區",
    condition: "new",
    exchangeType: "free",
    tags: ["餐具", "廚房", "不鏽鋼"],
    owner: { name: "張太太", rating: 4.9 },
  },
  {
    title: "小型咖啡機",
    description: "半自動義式咖啡機，功能正常，適合家用，有使用痕跡但不影響功能",
    image: "https://images.unsplash.com/photo-1740803292814-13d2e35924c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob21lJTIwYXBwbGlhbmNlcyUyMGVsZWN0cm9uaWNzfGVufDF8fHx8MTc1ODg2ODczMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "electronics",
    location: "台北市松山區",
    condition: "fair",
    exchangeType: "exchange",
    tags: ["咖啡機", "家電", "廚房"],
    owner: { name: "林先生", rating: 4.3 },
  },
  {
    title: "女裝外套",
    description: "M號女裝風衣外套，顏色米白，春秋適穿，僅穿過幾次",
    image: "https://images.unsplash.com/photo-1621683634326-d8650294c94b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rcyUyMGNsb3RoaW5nJTIwZnVybml0dXJlfGVufDF8fHx8MTc1ODg2ODczNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "clothing",
    location: "台北市大同區",
    condition: "like-new",
    exchangeType: "barter",
    tags: ["女裝", "外套", "春裝"],
    owner: { name: "趙小姐", rating: 4.7 },
  },
  {
    title: "木質書桌",
    description: "實木書桌，尺寸120x60cm，高度適中，有抽屜收納功能",
    image: "https://images.unsplash.com/photo-1621683634326-d8650294c94b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rcyUyMGNsb3RoaW5nJTIwZnVybml0dXJlfGVufDF8fHx8MTc1ODg2ODczNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "furniture",
    location: "台北市內湖區",
    condition: "good",
    exchangeType: "exchange",
    tags: ["書桌", "家具", "木質"],
    owner: { name: "吳同學", rating: 4.6 },
  },
  {
    title: "嬰兒推車",
    description: "輕便型嬰兒推車，可折疊，適合0-3歲，安全帶完整",
    image: "https://images.unsplash.com/photo-1650775766475-2cc37492e2a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3lzJTIwY2hpbGRyZW4lMjBnYW1lc3xlbnwxfHx8fDE3NTg4Njg3Mzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "baby",
    location: "台北市南港區",
    condition: "good",
    exchangeType: "free",
    tags: ["嬰兒", "推車", "育兒"],
    owner: { name: "黃媽媽", rating: 4.8 },
  },
];

export async function seedDatabase() {
  try {
    console.log('開始初始化產品資料...');
    
    for (const product of sampleProducts) {
      try {
        await apiService.createProduct(product);
        console.log(`已創建產品: ${product.title}`);
      } catch (error) {
        console.log(`創建產品失敗 ${product.title}:`, error);
      }
    }
    
    console.log('產品資料初始化完成！');
  } catch (error) {
    console.error('初始化產品資料時發生錯誤:', error);
  }
}

// Helper function to initialize data when app starts
export async function initializeDataIfNeeded() {
  try {
    const response = await apiService.getProducts();
    if (response.products.length === 0) {
      console.log('檢測到空資料庫，開始初始化示例產品...');
      await seedDatabase();
    }
  } catch (error) {
    console.error('檢查資料庫狀態時發生錯誤:', error);
  }
}