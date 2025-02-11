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
      name: "Le Petit Bistro",
      description: "Authentic French cuisine in a cozy setting",
      image: "https://images.unsplash.com/photo-1505151265254-87a15834d4ee",
      category: "French",
    },
    {
      name: "Pasta Paradise",
      description: "Handmade pasta and Italian favorites",
      image: "https://images.unsplash.com/photo-1591401119145-8099f9ffa604",
      category: "Italian",
    },
  ];

  const [restaurant1, restaurant2] = await db.insert(restaurants)
    .values(restaurantData)
    .returning();

  const menuItemsData = [
    {
      restaurantId: restaurant1.id,
      name: "Coq au Vin",
      description: "Classic French chicken braised in wine",
      price: "24.99",
      image: "https://images.unsplash.com/photo-1563897539633-7374c276c212",
      category: "Main Course",
    },
    {
      restaurantId: restaurant1.id,
      name: "Beef Bourguignon",
      description: "Tender beef stewed in red wine",
      price: "28.99",
      image: "https://images.unsplash.com/photo-1564844536311-de546a28c87d",
      category: "Main Course",
    },
    {
      restaurantId: restaurant2.id,
      name: "Spaghetti Carbonara",
      description: "Classic Roman pasta with eggs and guanciale",
      price: "18.99",
      image: "https://images.unsplash.com/photo-1492683962492-deef0ec456c0",
      category: "Pasta",
    },
  ];

  await db.insert(menuItems).values(menuItemsData);
}

export const storage = new DatabaseStorage();

// Initialize data only in development
if (process.env.NODE_ENV !== 'production') {
  initializeData().catch(console.error);
}