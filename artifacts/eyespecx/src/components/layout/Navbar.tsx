import { Link, useLocation } from "wouter";
import { useGetCart, useGetWishlist } from "@workspace/api-client-react";
import { ShoppingBag, Heart, Menu, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const logoSrc = "/logo.png";

export function Navbar() {
  const [location] = useLocation();
  const { data: cartItems } = useGetCart();
  const { data: wishlistItems } = useGetWishlist();

  const cartCount = cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const wishlistCount = wishlistItems?.length || 0;

  const links = [
    { href: "/shop", label: "Shop All" },
    { href: "/collections", label: "Collections" },
    { href: "/shop?gender=men", label: "Men" },
    { href: "/shop?gender=women", label: "Women" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-mobile-menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 py-6">
                <Link href="/">
                  <img src={logoSrc} alt="Eyespecx" className="h-10 brightness-0" />
                </Link>
                <div className="flex flex-col gap-4">
                  {links.map((link) => (
                    <Link key={link.href} href={link.href} className="text-lg font-medium">
                      {link.label}
                    </Link>
                  ))}
                  <div className="border-t my-4"></div>
                  <Link href="/orders" className="text-lg font-medium">Orders</Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center" data-testid="link-home-logo">
            <img
              src={logoSrc}
              alt="Eyespecx"
              className="h-9 w-auto brightness-0"
            />
          </Link>

          <div className="hidden md:flex items-center gap-6 ml-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${location === link.href ? "text-primary" : "text-muted-foreground"}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden sm:flex" data-testid="button-search">
            <Search className="h-5 w-5" />
          </Button>
          <Link href="/wishlist" className="relative group p-2" data-testid="link-wishlist">
            <Heart className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                {wishlistCount}
              </span>
            )}
          </Link>
          <Link href="/cart" className="relative group p-2" data-testid="link-cart">
            <ShoppingBag className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                {cartCount}
              </span>
            )}
          </Link>
          <Link href="/orders" className="hidden sm:flex group p-2" data-testid="link-orders">
            <User className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </Link>
        </div>
      </div>
    </nav>
  );
}
