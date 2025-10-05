export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  location: string;
  distance: string;
  timePosted: string;
  condition: "new" | "like-new" | "good" | "fair";
  exchangeType: "exchange" | "free" | "barter";
  tags: string[];
  owner: { name: string; rating: number };
  userId?: string;
  createdAt: string;
  updatedAt: string;
}