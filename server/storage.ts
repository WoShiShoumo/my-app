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
  ];

  const [restaurant1, restaurant2, restaurant3] = await db.insert(restaurants)
    .values(restaurantData)
    .returning();

  const menuItemsData = [
    {
      restaurantId: restaurant1.id,
      name: "Classic Cheeseburger",
      description: "Juicy beef patty with melted cheese",
      price: "12.99",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
      category: "Burgers",
    },
    {
      restaurantId: restaurant1.id,
      name: "Creamy Alfredo",
      description: "Fresh pasta in rich cream sauce",
      price: "14.99",
      image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a",
      category: "Pasta",
    },
    {
      restaurantId: restaurant2.id,
      name: "Margherita Pizza",
      description: "Classic tomato and mozzarella",
      price: "16.99",
      image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca",
      category: "Pizza",
    },
    {
      restaurantId: restaurant3.id,
      name: "Grilled Salmon",
      description: "Fresh salmon with herbs",
      price: "22.99",
      image: "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686",
      category: "Seafood",
    },
  ];

  await db.insert(menuItems).values(menuItemsData);
}

export const storage = new DatabaseStorage();

// Initialize data only in development
if (process.env.NODE_ENV !== 'production') {
  initializeData().catch(console.error);
}