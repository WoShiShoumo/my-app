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
      name: "ChinaHit",
      description: "Delicious Chinese specialties",
      image: "https://images.unsplash.com/photo-1585032226651-759b368d7246",
      category: "Chinese",
    },
    {
      name: "Seoul Tower",
      description: "Authentic Korean dishes",
      image: "https://images.unsplash.com/photo-1634626032880-6eb3c9563829",
      category: "Korean",
    },
  ];

  const restaurantEntries = await db.insert(restaurants)
    .values(restaurantData)
    .returning();

  const menuItemsData = restaurantEntries.flatMap(restaurant => {
    switch (restaurant.name) {
      case "Southern Express":
        return [
          {
            restaurantId: restaurant.id,
            name: "Masala Dosa",
            description: "Crispy dosa with potato filling",
            price: "199",
            image: "https://images.unsplash.com/photo-1630383249896-424e482df921",
            category: "South Indian",
          },
          {
            restaurantId: restaurant.id,
            name: "Idli Sambar",
            description: "Steamed rice cakes with lentil soup",
            price: "159",
            image: "https://images.unsplash.com/photo-1630383249825-a6e8a3faea0b",
            category: "South Indian",
          },
          {
            restaurantId: restaurant.id,
            name: "Vada",
            description: "Crispy lentil donuts",
            price: "129",
            image: "https://images.unsplash.com/photo-1630383249825-a6e8a3faea0b",
            category: "South Indian",
          },
          {
            restaurantId: restaurant.id,
            name: "Uttapam",
            description: "Thick rice pancake with toppings",
            price: "179",
            image: "https://images.unsplash.com/photo-1630383249896-424e482df921",
            category: "South Indian",
          },
          {
            restaurantId: restaurant.id,
            name: "Pongal",
            description: "Rice and lentil porridge",
            price: "149",
            image: "https://images.unsplash.com/photo-1630383249896-424e482df921",
            category: "South Indian",
          }
        ];
      case "Dillipoint":
        return [
          {
            restaurantId: restaurant.id,
            name: "Chicken Biryani",
            description: "Fragrant rice with tender chicken",
            price: "259",
            image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
            category: "North Indian",
          },
          {
            restaurantId: restaurant.id,
            name: "Butter Chicken",
            description: "Creamy tomato chicken curry",
            price: "239",
            image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
            category: "North Indian",
          },
          {
            restaurantId: restaurant.id,
            name: "Dal Makhani",
            description: "Creamy black lentils",
            price: "179",
            image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
            category: "North Indian",
          },
          {
            restaurantId: restaurant.id,
            name: "Paneer Tikka",
            description: "Grilled cottage cheese",
            price: "199",
            image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
            category: "North Indian",
          },
          {
            restaurantId: restaurant.id,
            name: "Seekh Kebab",
            description: "Grilled minced meat kebabs",
            price: "219",
            image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0",
            category: "North Indian",
          }
        ];
      case "ChinaHit":
        return [
          {
            restaurantId: restaurant.id,
            name: "Kung Pao Chicken",
            description: "Spicy diced chicken with peanuts",
            price: "239",
            image: "https://images.unsplash.com/photo-1585032226651-759b368d7246",
            category: "Chinese",
          },
          {
            restaurantId: restaurant.id,
            name: "Dim Sum Platter",
            description: "Assorted steamed dumplings",
            price: "199",
            image: "https://images.unsplash.com/photo-1585032226651-759b368d7246",
            category: "Chinese",
          },
          {
            restaurantId: restaurant.id,
            name: "Schezwan Noodles",
            description: "Spicy stir-fried noodles",
            price: "179",
            image: "https://images.unsplash.com/photo-1585032226651-759b368d7246",
            category: "Chinese",
          },
          {
            restaurantId: restaurant.id,
            name: "Sweet & Sour Pork",
            description: "Crispy pork in tangy sauce",
            price: "259",
            image: "https://images.unsplash.com/photo-1585032226651-759b368d7246",
            category: "Chinese",
          }
        ];
      case "Seoul Tower":
        return [
          {
            restaurantId: restaurant.id,
            name: "Korean Corn Dog",
            description: "Crispy corn dog with cheese",
            price: "159",
            image: "https://images.unsplash.com/photo-1634626032880-6eb3c9563829",
            category: "Korean",
          },
          {
            restaurantId: restaurant.id,
            name: "Bibimbap",
            description: "Mixed rice with vegetables",
            price: "259",
            image: "https://images.unsplash.com/photo-1634626032880-6eb3c9563829",
            category: "Korean",
          },
          {
            restaurantId: restaurant.id,
            name: "Tteokbokki",
            description: "Spicy rice cakes",
            price: "179",
            image: "https://images.unsplash.com/photo-1634626032880-6eb3c9563829",
            category: "Korean",
          },
          {
            restaurantId: restaurant.id,
            name: "Kimchi Fried Rice",
            description: "Spicy fermented cabbage rice",
            price: "199",
            image: "https://images.unsplash.com/photo-1634626032880-6eb3c9563829",
            category: "Korean",
          }
        ];
      case "Foodie":
        return [
          {
            restaurantId: restaurant.id,
            name: "Classic Cheeseburger",
            description: "Juicy beef patty with melted cheese",
            price: "199",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
            category: "Burgers",
          },
          {
            restaurantId: restaurant.id,
            name: "BBQ Bacon Burger",
            description: "Smoky bacon with BBQ sauce",
            price: "219",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
            category: "Burgers",
          },
          {
            restaurantId: restaurant.id,
            name: "Mushroom Swiss Burger",
            description: "Sautéed mushrooms with Swiss cheese",
            price: "229",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
            category: "Burgers",
          },
          {
            restaurantId: restaurant.id,
            name: "Creamy Alfredo",
            description: "Fresh pasta in rich cream sauce",
            price: "239",
            image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a",
            category: "Pasta",
          },
          {
            restaurantId: restaurant.id,
            name: "Pesto Pasta",
            description: "Basil pesto with pine nuts",
            price: "219",
            image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a",
            category: "Pasta",
          }
        ];
      case "Hungrybaba":
        return [
          {
            restaurantId: restaurant.id,
            name: "Margherita Pizza",
            description: "Classic tomato and mozzarella",
            price: "259",
            image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca",
            category: "Pizza",
          },
          {
            restaurantId: restaurant.id,
            name: "Pepperoni Pizza",
            description: "Spicy pepperoni with cheese",
            price: "279",
            image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca",
            category: "Pizza",
          },
          {
            restaurantId: restaurant.id,
            name: "BBQ Chicken Pizza",
            description: "Grilled chicken with BBQ sauce",
            price: "299",
            image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca",
            category: "Pizza",
          },
          {
            restaurantId: restaurant.id,
            name: "Veggie Supreme",
            description: "Loaded with fresh vegetables",
            price: "259",
            image: "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca",
            category: "Pizza",
          }
        ];
      case "Tastieee":
        return [
          {
            restaurantId: restaurant.id,
            name: "Grilled Salmon",
            description: "Fresh salmon with herbs",
            price: "359",
            image: "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686",
            category: "Seafood",
          },
          {
            restaurantId: restaurant.id,
            name: "Fish & Chips",
            description: "Crispy battered fish with fries",
            price: "259",
            image: "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686",
            category: "Seafood",
          },
          {
            restaurantId: restaurant.id,
            name: "Shrimp Scampi",
            description: "Garlic butter shrimp pasta",
            price: "299",
            image: "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686",
            category: "Seafood",
          },
          {
            restaurantId: restaurant.id,
            name: "Seafood Platter",
            description: "Assorted seafood selection",
            price: "399",
            image: "https://images.unsplash.com/photo-1543339494-b4cd4f7ba686",
            category: "Seafood",
          }
        ];
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