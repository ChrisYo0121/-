import { useState, useMemo, useEffect } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { CategoryFilter } from "./components/CategoryFilter";
import { ProductGrid } from "./components/ProductGrid";
import { MapView } from "./components/MapView";
import { LoginPage } from "./components/LoginPage";
import { RegisterPage } from "./components/RegisterPage";
import { PostPage } from "./components/PostPage";
import { ProfilePage } from "./components/ProfilePage";
import { ManageListingsPage } from "./components/ManageListingsPage";
import { SettingsPage } from "./components/SettingsPage";
import { Product } from "./types";
import { toast } from "sonner@2.0.3";
import { Toaster } from "./components/ui/sonner";
import {
  mockProducts,
  sportsProducts,
} from "./utils/mockProducts";

export default function App() {
  const [currentPage, setCurrentPage] = useState<
    | "home"
    | "login"
    | "register"
    | "post"
    | "profile"
    | "manage-listings"
    | "settings"
  >("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("all");
  const [showMap, setShowMap] = useState(false);
  const [likedProducts, setLikedProducts] = useState<
    Set<string>
  >(new Set());
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load mock products
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate loading delay
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Combine all mock products
      const allProducts = [...mockProducts, ...sportsProducts];
      setProducts(allProducts);

      toast.success(`成功載入 ${allProducts.length} 個商品`);
    } catch (err) {
      console.error("Failed to load products:", err);
      setError("無法載入產品資料");
      toast.error("載入產品時發生錯誤");
    } finally {
      setLoading(false);
    }
  };

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        searchQuery === "" ||
        product.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        product.description
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        product.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase()),
        );

      const matchesCategory =
        selectedCategory === "all" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const handleContact = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    toast.success(`已發送聯繫請求給 ${product?.owner.name}`);
  };

  const handleLike = (productId: string) => {
    setLikedProducts((prev) => {
      const newLiked = new Set(prev);
      if (newLiked.has(productId)) {
        newLiked.delete(productId);
        toast.info("已取消收藏");
      } else {
        newLiked.add(productId);
        toast.success("已加入收藏");
      }
      return newLiked;
    });
  };

  const handleProductSelect = (product: Product) => {
    toast.info(`查看 ${product.title} 的詳細資訊`);
  };

  // Handle page navigation
  const handlePageChange = (
    page:
      | "home"
      | "login"
      | "register"
      | "post"
      | "profile"
      | "manage-listings"
      | "settings",
  ) => {
    setCurrentPage(page);
  };

  // Handle product creation/update
  const handleProductChange = () => {
    // For demo purposes, just show success message since we're using mock data
    toast.success("商品已更新！");
    loadProducts(); // Reload mock products
  };

  // Render different pages based on current page
  if (currentPage === "login") {
    return (
      <>
        <LoginPage
          onClose={() => setCurrentPage("home")}
          onSwitchToRegister={() => setCurrentPage("register")}
        />
        <Toaster />
      </>
    );
  }

  if (currentPage === "register") {
    return (
      <>
        <RegisterPage
          onClose={() => setCurrentPage("home")}
          onSwitchToLogin={() => setCurrentPage("login")}
        />
        <Toaster />
      </>
    );
  }

  if (currentPage === "post") {
    return (
      <>
        <PostPage
          onBack={() => setCurrentPage("home")}
          onProductCreated={handleProductChange}
        />
        <Toaster />
      </>
    );
  }

  if (currentPage === "profile") {
    return (
      <>
        <ProfilePage
          onBack={() => setCurrentPage("home")}
          onEditProfile={() => setCurrentPage("settings")}
          onManageListings={() =>
            setCurrentPage("manage-listings")
          }
          onProductsChange={handleProductChange}
        />
        <Toaster />
      </>
    );
  }

  if (currentPage === "manage-listings") {
    return (
      <>
        <ManageListingsPage
          onBack={() => setCurrentPage("profile")}
          onCreateListing={() => setCurrentPage("post")}
          onProductsChange={handleProductChange}
        />
        <Toaster />
      </>
    );
  }

  if (currentPage === "settings") {
    return (
      <>
        <SettingsPage
          onBack={() => setCurrentPage("profile")}
        />
        <Toaster />
      </>
    );
  }

  // Home page
  return (
    <div className="min-h-screen bg-background">
      <Header
        onSearchChange={setSearchQuery}
        onShowMap={() => setShowMap(!showMap)}
        showMap={showMap}
        onLogin={() => setCurrentPage("login")}
        onRegister={() => setCurrentPage("register")}
        onPost={() => setCurrentPage("post")}
        onProfile={() => setCurrentPage("profile")}
      />

      {!showMap && <Hero />}

      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">
              {showMap ? "地圖搜尋" : "可交換物品"}
            </h2>
            <p className="text-muted-foreground mt-1">
              {showMap
                ? "在地圖上查看附近的物品位置"
                : `找到 ${filteredProducts.length} 個物品`}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-muted-foreground">
              載入中...
            </div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center py-12">
            <div className="text-red-600 mb-4">{error}</div>
            <button
              onClick={loadProducts}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              重新載入
            </button>
          </div>
        ) : showMap ? (
          <MapView
            products={filteredProducts}
            onProductSelect={handleProductSelect}
          />
        ) : (
          <ProductGrid
            products={filteredProducts}
            onContact={handleContact}
            onLike={handleLike}
            likedProducts={likedProducts}
            hasMore={false}
          />
        )}
      </main>

      <footer className="bg-muted mt-16 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">鄰里交換</h3>
              <p className="text-sm text-muted-foreground">
                政府推動的社區資源共享平台，讓閒置物品找到新主人。
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">服務項目</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>物品交換</li>
                <li>免費贈送</li>
                <li>鄰里媒合</li>
                <li>環保回收</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">幫助中心</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>使用指南</li>
                <li>安全須知</li>
                <li>常見問題</li>
                <li>聯繫客服</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">聯絡資訊</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>客服電話: 02-1234-5678</li>
                <li>服務時間: 週一至週五 9:00-18:00</li>
                <li>Email: support@neighbor-exchange.gov.tw</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 台灣政府鄰里交換平台. 版權所有.</p>
          </div>
        </div>
      </footer>

      <Toaster />
    </div>
  );
}