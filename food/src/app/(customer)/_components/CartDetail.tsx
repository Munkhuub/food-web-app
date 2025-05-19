import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Cart } from "./_assets/Cart";
import { Minus, Plus, ShoppingCartIcon, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useCart } from "./CartContext";
import { useAuth } from "@/app/_providers/AuthProvider";
import OrderHistory from "./OrderHistory";
import { api } from "@/axios";

type OrderHistoryItem = {
  _id: string;
  orderNumber: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  foodOrderItems: Array<{ food: { foodName: string }; quantity: number }>;
  shippingAddress: string;
};

const CartDetail = () => {
  const { cartItems, removeItem, updateQuantity, calculateTotal, clearCart } =
    useCart();
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("cart");
  const [orderHistory, setOrderHistory] = useState<OrderHistoryItem[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);

  console.log(user);

  const handlePlaceOrder = async () => {
    if (!user) {
      toast.error("Please log in to place an order.");
      return;
    }
    if (!user?.address) {
      toast.error("Please update your address to place an order.");
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    try {
      await api.post(
        "/orders",
        {
          user: user._id,
          totalPrice: calculateTotal(),
          foodOrderItems: cartItems.map((item) => ({
            food: item.id,
            quantity: item.quantity,
          })),
          status: "Pending",
        },
        {
          headers: {
            Authorization: `${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success("Order placed successfully!");
      clearCart();
      setActiveTab("history");
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order.");
    }
  };

  const fetchOrderHistory = async () => {
    if (!user) {
      setOrderHistory([]);
      return;
    }

    setIsLoadingOrders(true);
    try {
      const response = await api.get(`/orders`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      });
      setOrderHistory(response.data.order);
      console.log("order history", response.data);
    } catch (error) {
      console.error("Error fetching order history:", error);
      toast.error("Failed to load order history.");
    } finally {
      setIsLoadingOrders(false);
    }
  };

  useEffect(() => {
    if (open && activeTab === "history" && user) {
      fetchOrderHistory();
    }
  }, [open, activeTab, user]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Cart />
        </Button>
      </SheetTrigger>
      <SheetContent className="bg-[#404040] !max-w-[535px] !w-[535px] p-[32px] border-none rounded-l-[20px]">
        <SheetHeader className="p-0">
          <div className="flex gap-3 items-center text-white">
            <ShoppingCartIcon className="size-6" />
            <SheetTitle className="text-white">Order detail</SheetTitle>
          </div>
        </SheetHeader>
        <Tabs
          defaultValue="cart"
          value={activeTab}
          onValueChange={setActiveTab}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="cart">Cart</TabsTrigger>
            <TabsTrigger value="history">Order history</TabsTrigger>
          </TabsList>
          <TabsContent value="cart">
            <Card className="p-4 w-[471px] bg-none">
              <CardContent className="p-0 flex flex-col gap-5">
                <CardHeader className="p-0">
                  <CardTitle>My cart</CardTitle>
                </CardHeader>

                {cartItems.length > 0 ? (
                  <div className=" flex flex-col max-h-80 overflow-auto scroll-auto gap-5">
                    {cartItems.map((food, index) => (
                      <div
                        className={`flex gap-[10px] pt-5 ${
                          index !== 0 ? "border-t border-gray-300" : ""
                        }`}
                        key={food.id}
                      >
                        <img
                          className="w-[124px] h-[120px] rounded-xl object-cover"
                          src={food.image}
                          alt={food.foodName}
                        />
                        <div className="flex flex-col justify-between w-[305px] gap-6">
                          <div className="flex justify-between">
                            <div>
                              <SheetTitle className="text-[16px]/[28px] text-[#EF4444]">
                                {food.foodName}
                              </SheetTitle>
                              <p className="text-xs/4">{food.ingredients}</p>
                            </div>
                            <button
                              className="mb-auto mt-[1px] ml-2 p-1 text-red-500 hover:text-red-700"
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
                  </div>
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    Your cart is empty
                  </div>
                )}
                <div>
                  <h3 className="text-xl/[28px] font-semibold">Payment info</h3>
                  <div className="flex justify-between text-[16px]/[28px]">
                    <span className="text-[#71717A]">Items</span>
                    <span className="font-bold">${calculateTotal()}</span>
                  </div>
                  <div className="flex justify-between text-[16px]/[28px]">
                    <span className="text-[#71717A]">Shipping</span>
                    <span className="font-bold">$0.00</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200 text-[16px]/[28px]">
                    <div className="flex justify-between">
                      <span className="text-[#71717A]">Total:</span>
                      <span className="font-bold">${calculateTotal()}</span>
                    </div>
                  </div>
                </div>

                {cartItems.length > 0 && (
                  <SheetFooter>
                    <Button
                      type="submit"
                      className="w-full rounded-full h-11 bg-black"
                      onClick={() => handlePlaceOrder()}
                    >
                      Proceed to checkout
                    </Button>
                  </SheetFooter>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          <OrderHistory
            orderHistory={orderHistory}
            isLoadingOrders={isLoadingOrders}
          />
        </Tabs>
      </SheetContent>
    </Sheet>
  );
};

export default CartDetail;
