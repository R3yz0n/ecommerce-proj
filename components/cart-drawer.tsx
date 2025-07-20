"use client";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MinusIcon, PlusIcon, ShoppingCartIcon, TrashIcon } from "lucide-react";
import { useCart } from "@/context/cart-context";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";

export default function CartDrawer() {
  const { cartItems, getTotalItems, getTotalPrice, updateQuantity, removeFromCart, clearCart } =
    useCart();
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const handleProceedToCheckout = () => {
    if (!isLoggedIn) {
      toast({
        title: "Authentication Required",
        description: "Please login or sign up to proceed to checkout.",
        variant: "destructive",
      });
      router.push("/login");
    } else {
      // In a real app, navigate to checkout page
      toast({
        title: "Proceeding to Checkout",
        description: "You are logged in and ready to checkout!",
        variant: "default",
      });
      console.log("User logged in, proceeding to checkout...");
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCartIcon className="h-6 w-6" />
          {getTotalItems() > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {getTotalItems()}
            </span>
          )}
          <span className="sr-only">View cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col ">
        <SheetHeader>
          <SheetTitle>Your Cart ({getTotalItems()})</SheetTitle>
        </SheetHeader>
        <Separator />
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center flex-grow text-center text-muted-foreground">
            <ShoppingCartIcon className="w-12 h-12 mb-4" />
            <p>Your cart is empty.</p>
            <Link href="/" passHref>
              <Button variant="link" className="mt-2">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <ScrollArea className="flex-grow pr-4">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-md object-cover"
                  />
                  <div className="grid flex-grow gap-1">
                    <h3 className="font-medium text-sm">{item.name}</h3>
                    <p className="text-muted-foreground text-sm">${item.price.toFixed(2)}</p>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 bg-transparent"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <MinusIcon className="h-4 w-4" />
                        <span className="sr-only">Decrease quantity</span>
                      </Button>
                      <span className="text-sm font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 bg-transparent"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <PlusIcon className="h-4 w-4" />
                        <span className="sr-only">Increase quantity</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="ml-auto h-7 w-7 text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <TrashIcon className="h-4 w-4" />
                        <span className="sr-only">Remove item</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
        <Separator className="mt-auto " />
        <SheetFooter className="mt-4">
          <div className="flex  items-center w-full mb-4 gap-1">
            <span className="text-lg font-semibold">Total: {`  `} </span>
            <span className="text-lg font-bold">${getTotalPrice().toFixed(2)}</span>
          </div>
          <Button onClick={handleProceedToCheckout} className="w-full">
            Proceed to Checkout
          </Button>
          {/* {cartItems.length > 0 && (
            <Button variant="ghost" onClick={clearCart} className="w-full mt-2">
              Clear Cart
            </Button>
          )} */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
