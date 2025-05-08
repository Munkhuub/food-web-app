"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { toast } from "sonner";

interface CartItem {
  id: string;
  foodName: string;
  price: number;
  quantity: number;
  image: string;
  ingredients: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (food: any, quantity: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, newQuantity: number) => void;
  calculateTotal: () => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("foodCart");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("foodCart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (food: any, quantity: number) => {
    try {
      const foodId =
        food._id || `food-${food.foodName.replace(/\s+/g, "-").toLowerCase()}`;

      setCartItems((prevItems) => {
        const existingItemIndex = prevItems.findIndex(
          (item) => item.id === foodId
        );

        if (existingItemIndex >= 0) {
          // Create a new array with the updated item
          const newItems = [...prevItems];
          newItems[existingItemIndex] = {
            ...newItems[existingItemIndex],
            quantity: newItems[existingItemIndex].quantity + quantity,
          };
          return newItems;
        } else {
          // Add new item to cart
          return [
            ...prevItems,
            {
              id: foodId,
              foodName: food.foodName,
              price: food.price,
              quantity: quantity,
              image: food.image,
              ingredients: food.ingredients,
            },
          ];
        }
      });

      toast.success(
        `${quantity} ${food.foodName}${
          quantity > 1 ? "s" : ""
        } added to your cart.`
      );
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast("Could not add item to cart. Please try again.");
    }
  };

  const removeItem = (id: string) => {
    const removedItem = cartItems.find((item) => item.id === id);

    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));

    if (removedItem) {
      toast(`${removedItem.foodName} removed from your cart.`);
    }
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeItem,
        updateQuantity,
        calculateTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
