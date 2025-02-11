import { Restaurant, MenuItem, Order, InsertRestaurant, InsertMenuItem, InsertOrder } from "@shared/schema";

export interface IStorage {
  getRestaurants(): Promise<Restaurant[]>;
  getRestaurant(id: number): Promise<Restaurant | undefined>;
  getMenuItems(restaurantId: number): Promise<MenuItem[]>;
  createOrder(order: InsertOrder): Promise<Order>;
}

export class MemStorage implements IStorage {
  private restaurants: Map<number, Restaurant>;
  private menuItems: Map<number, MenuItem[]>;
  private orders: Map<number, Order>;
  private currentId: number;

  constructor() {
    this.restaurants = new Map();
    this.menuItems = new Map();
    this.orders = new Map();
    this.currentId = 1;
    this.initializeData();
  }

  private initializeData() {
    const restaurants: Restaurant[] = [
      {
        id: 1,
        name: "Le Petit Bistro",
        description: "Authentic French cuisine in a cozy setting",
        image: "https://images.unsplash.com/photo-1505151265254-87a15834d4ee",
        category: "French",
      },
      {
        id: 2,
        name: "Pasta Paradise",
        description: "Handmade pasta and Italian favorites",
        image: "https://images.unsplash.com/photo-1591401119145-8099f9ffa604",
        category: "Italian",
      },
    ];

    const menuItems: Record<number, MenuItem[]> = {
      1: [
        {
          id: 1,
          restaurantId: 1,
          name: "Coq au Vin",
          description: "Classic French chicken braised in wine",
          price: "24.99",
          image: "https://images.unsplash.com/photo-1563897539633-7374c276c212",
          category: "Main Course",
        },
        {
          id: 2,
          restaurantId: 1,
          name: "Beef Bourguignon",
          description: "Tender beef stewed in red wine",
          price: "28.99",
          image: "https://images.unsplash.com/photo-1564844536311-de546a28c87d",
          category: "Main Course",
        },
      ],
      2: [
        {
          id: 3,
          restaurantId: 2,
          name: "Spaghetti Carbonara",
          description: "Classic Roman pasta with eggs and guanciale",
          price: "18.99",
          image: "https://images.unsplash.com/photo-1492683962492-deef0ec456c0",
          category: "Pasta",
        },
      ],
    };

    restaurants.forEach(r => this.restaurants.set(r.id, r));
    Object.entries(menuItems).forEach(([restaurantId, items]) => {
      this.menuItems.set(Number(restaurantId), items);
    });
  }

  async getRestaurants(): Promise<Restaurant[]> {
    return Array.from(this.restaurants.values());
  }

  async getRestaurant(id: number): Promise<Restaurant | undefined> {
    return this.restaurants.get(id);
  }

  async getMenuItems(restaurantId: number): Promise<MenuItem[]> {
    return this.menuItems.get(restaurantId) || [];
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const id = this.currentId++;
    const newOrder = { ...order, id };
    this.orders.set(id, newOrder);
    return newOrder;
  }
}

export const storage = new MemStorage();
