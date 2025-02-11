import { Restaurant, MenuItem, Order, InsertRestaurant, InsertMenuItem, InsertOrder } from "@shared/schema";
import { restaurants, menuItems, orders } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getRestaurants(): Promise<Restaurant[]>;
  getRestaurant(id: number): Promise<Restaurant | undefined>;
  getMenuItems(restaurantId: number): Promise<MenuItem[]>;
  createOrder(order: InsertOrder): Promise<Order>;
}

export class DatabaseStorage implements IStorage {
  async getRestaurants(): Promise<Restaurant[]> {
    return await db.select().from(restaurants);
  }

  async getRestaurant(id: number): Promise<Restaurant | undefined> {
    const [restaurant] = await db.select().from(restaurants).where(eq(restaurants.id, id));
    return restaurant;
  }

  async getMenuItems(restaurantId: number): Promise<MenuItem[]> {
    return await db.select().from(menuItems).where(eq(menuItems.restaurantId, restaurantId));
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const [newOrder] = await db.insert(orders).values(order).returning();
    return newOrder;
  }
}

// Initialize sample data
async function initializeData() {
  const restaurantData = [
    {
      name: "Foodie",
      description: "Best burgers and pasta in town",
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141",
      category: "Burgers & Pasta",
    },
    {
      name: "Hungrybaba",
      description: "Authentic Italian pizza and pasta",
      image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3",
      category: "Pizza",
    },
    {
      name: "Tastieee",
      description: "Fresh seafood delicacies",
      image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0",
      category: "Seafood",
    },
    {
      name: "Zingrr",
      description: "Quick and delicious fast food",
      image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330",
      category: "Fast Food",
    },
    {
      name: "BigZac",
      description: "Premium burgers and fries",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      category: "Fast Food",
    },
    {
      name: "Bangaliana",
      description: "Authentic Bengali cuisine",
      image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0",
      category: "Bengali",
    },
    {
      name: "Southern Express",
      description: "South Indian delicacies",
      image: "https://images.unsplash.com/photo-1630383249896-424e482df921",
      category: "South Indian",
    },
    {
      name: "Dillipoint",
      description: "Authentic North Indian cuisine",
      image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
      category: "North Indian",
    },
    {
      name: "Tyfood",
      description: "Authentic Japanese cuisine",
      image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
      category: "Japanese",
    },
    {
      name: "ChinaHit",
      description: "Delicious Chinese specialties",
      image: "https://images.unsplash.com/photo-1585032226651-759b368d7246",
      category: "Chinese",
    },
    {
      name: "Seoul Tower",
      description: "Authentic Korean dishes",
      image: "https://images.unsplash.com/photo-1635363638580-c2809d049ebc",
      category: "Korean",
    },
  ];

  const restaurantEntries = await db.insert(restaurants)
    .values(restaurantData)
    .returning();

  const menuItemsData = restaurantEntries.flatMap(restaurant => {
    switch (restaurant.name) {
      case "Bangaliana":
        return [
          {
            restaurantId: restaurant.id,
            name: "Ilish Paturi",
            description: "Hilsa fish in banana leaf",
            price: "24.99",
            image: "https://images.unsplash.com/photo-1589302168068-964664d93dc0",
            category: "Bengali",
          },
          {
            restaurantId: restaurant.id,
            name: "Bengali Chicken Curry",
            description: "Traditional Bengali style curry",
            price: "18.99",
            image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7",
            category: "Bengali",
          },
        ];
      case "Southern Express":
        return [
          {
            restaurantId: restaurant.id,
            name: "Masala Dosa",
            description: "Crispy dosa with potato filling",
            price: "12.99",
            image: "https://images.unsplash.com/photo-1630383249896-424e482df921",
            category: "South Indian",
          },
          {
            restaurantId: restaurant.id,
            name: "Idli Sambar",
            description: "Steamed rice cakes with lentil soup",
            price: "9.99",
            image: "https://images.unsplash.com/photo-1630383249825-a6e8a3faea0b",
            category: "South Indian",
          },
        ];
      case "Dillipoint":
        return [
          {
            restaurantId: restaurant.id,
            name: "Chicken Biryani",
            description: "Fragrant rice with tender chicken",
            price: "16.99",
            image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
            category: "North Indian",
          },
          {
            restaurantId: restaurant.id,
            name: "Seekh Kebab",
            description: "Grilled minced meat kebabs",
            price: "14.99",
            image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0",
            category: "North Indian",
          },
        ];
      case "Tyfood":
        return [
          {
            restaurantId: restaurant.id,
            name: "Sushi Platter",
            description: "Assorted fresh sushi rolls",
            price: "28.99",
            image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c",
            category: "Japanese",
          },
        ];
      case "ChinaHit":
        return [
          {
            restaurantId: restaurant.id,
            name: "Kung Pao Chicken",
            description: "Spicy diced chicken with peanuts",
            price: "15.99",
            image: "https://images.unsplash.com/photo-1585032226651-759b368d7246",
            category: "Chinese",
          },
        ];
      case "Seoul Tower":
        return [
          {
            restaurantId: restaurant.id,
            name: "Bibimbap",
            description: "Mixed rice with vegetables",
            price: "16.99",
            image: "https://images.unsplash.com/photo-1635363638580-c2809d049ebc",
            category: "Korean",
          },
        ];
      // Keep existing menu items for Foodie, Hungrybaba, and Tastieee
      default:
        return [];
    }
  });

  await db.insert(menuItems).values(menuItemsData);
}

export const storage = new DatabaseStorage();

// Initialize data only in development
if (process.env.NODE_ENV !== 'production') {
  initializeData().catch(console.error);
}