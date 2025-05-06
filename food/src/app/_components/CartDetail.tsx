import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cart } from "./_assets/Cart";
import { Minus, Plus, ShoppingCartIcon, X } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

interface CartItem {
  id: string;
  foodName: string;
  price: number;
  quantity: number;
  image: string;
  ingredients: string;
}

const CartDetail = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const loadCartItems = () => {
      const savedCart = localStorage.getItem("foodCart");
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    };

    loadCartItems();

    const handleStorageEvent = () => {
      loadCartItems();
    };

    window.addEventListener("storage", handleStorageEvent);

    window.addEventListener("storage", handleStorageEvent);

    return () => {
      window.removeEventListener("storage", handleStorageEvent);
    };
  }, []);

  const removeItem = (id: string) => {
    const removedItem = cartItems.find((item) => item.id === id);
    const updatedCart = cartItems.filter((item) => item.id !== id);

    setCartItems(updatedCart);
    localStorage.setItem("foodCart", JSON.stringify(updatedCart));

    if (removedItem) {
      toast(`${removedItem.foodName} removed from your cart.`);
    }
  };

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }

    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedCart);
    localStorage.setItem("foodCart", JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Cart />
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#404040] rounded-l-[20px] rounded-r-none h-screen left-[75.86%]">
        <DialogHeader>
          <div className="flex gap-3 items-center text-white">
            <ShoppingCartIcon className="size-6" />
            <DialogTitle>Order detail</DialogTitle>
          </div>
        </DialogHeader>
        <Tabs defaultValue="account">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Cart</TabsTrigger>
            <TabsTrigger value="password">Checkout</TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <Card className="p-4">
              <CardContent className="p-0 flex flex-col gap-5">
                <CardHeader className="p-0">
                  <CardTitle>My cart</CardTitle>
                </CardHeader>
                {cartItems.length > 0 ? (
                  <>
                    {cartItems.map((food) => (
                      <div
                        className="flex gap-[10px] max-h-96 overflow-auto"
                        key={food.id}
                      >
                        <img
                          className="w-[124px] h-[120px] rounded-xl"
                          src={food.image}
                          alt={food.foodName}
                        />

                        <div className="flex flex-col justify-between w-[305px] gap-6">
                          <div className="flex justify-between">
                            <div>
                              <DialogTitle className="text-[16px]/[28px] text-[#EF4444]">
                                {food.foodName}
                              </DialogTitle>
                              <p className="text-xs/4">{food.ingredients}</p>
                            </div>
                            <button
                              className="ml-2 p-1 text-red-500 hover:text-red-700"
                              onClick={() => removeItem(food.id)}
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="flex justify-between items-center w-full">
                            <div className="flex gap-3 items-center">
                              <Button
                                size="icon"
                                className="bg-white size-9 shadow-none"
                                onClick={() =>
                                  updateQuantity(food.id, food.quantity - 1)
                                }
                              >
                                <Minus className="text-black" />
                              </Button>
                              <p className="text-[18px]">{food.quantity}</p>
                              <Button
                                size="icon"
                                className="bg-white size-9 shadow-none"
                                onClick={() =>
                                  updateQuantity(food.id, food.quantity + 1)
                                }
                              >
                                <Plus className="text-black" />
                              </Button>
                            </div>
                            <div>
                              <p className="font-semibold">
                                ${(food.price * food.quantity).toFixed(2)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <div className="flex justify-between">
                        <span className="font-semibold">Total:</span>
                        <span className="font-bold">${calculateTotal()}</span>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    Your cart is empty
                  </div>
                )}
                {cartItems.length > 0 && (
                  <DialogFooter>
                    <Button
                      type="submit"
                      className="w-full rounded-full h-11 bg-black"
                    >
                      Proceed to checkout
                    </Button>
                  </DialogFooter>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="password">
            <Card>
              <CardHeader>
                <CardTitle>Checkout</CardTitle>
                <CardDescription>
                  Complete your order details here.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div>
                    <Label htmlFor="address">Delivery Address</Label>
                    <Input id="address" placeholder="Your address" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Complete Order</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default CartDetail;
