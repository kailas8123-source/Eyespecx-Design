import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Home, ShoppingBag, BookOpen, Heart, ClipboardList } from "lucide-react";
import { useGetCart, useGetWishlist } from "@workspace/api-client-react";

const NAV_ITEMS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/shop", label: "Shop", icon: ShoppingBag },
  { href: "/collections", label: "Looks", icon: BookOpen },
  { href: "/wishlist", label: "Saved", icon: Heart },
  { href: "/orders", label: "Orders", icon: ClipboardList },
];

export function BottomNav() {
  const [location] = useLocation();
  const { data: cartItems } = useGetCart();
  const { data: wishlistItems } = useGetWishlist();

  const cartCount = cartItems?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const wishlistCount = wishlistItems?.length || 0;

  function isActive(href: string) {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center pb-4 px-4 pointer-events-none"
      data-testid="bottom-nav"
    >
      {/* Glassy pill container */}
      <nav
        className="pointer-events-auto flex items-center gap-1 px-3 py-2 rounded-[2rem]"
        style={{
          background: "rgba(255, 255, 255, 0.18)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(255, 255, 255, 0.35)",
          boxShadow:
            "0 8px 32px rgba(10, 17, 40, 0.12), 0 2px 8px rgba(10, 17, 40, 0.08), inset 0 1px 0 rgba(255,255,255,0.5)",
        }}
        data-testid="bottom-nav-bar"
      >
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          const isSavedItem = item.href === "/wishlist";
          const badge = isSavedItem ? wishlistCount : 0;

          return (
            <Link
              key={item.href}
              href={item.href}
              data-testid={`nav-${item.label.toLowerCase()}`}
            >
              <motion.div
                className="relative flex flex-col items-center justify-center cursor-pointer select-none"
                style={{ minWidth: 56 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {/* Active pill background */}
                <AnimatePresence>
                  {active && (
                    <motion.div
                      layoutId="active-pill"
                      className="absolute inset-0 rounded-[1.5rem]"
                      style={{
                        background: "rgba(10, 17, 40, 0.88)",
                        boxShadow: "0 2px 8px rgba(10,17,40,0.18)",
                      }}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.85 }}
                      transition={{ type: "spring", stiffness: 380, damping: 28 }}
                    />
                  )}
                </AnimatePresence>

                <div className="relative z-10 flex flex-col items-center gap-0.5 py-2.5 px-3">
                  <div className="relative">
                    <Icon
                      className="transition-all duration-200"
                      style={{
                        width: 20,
                        height: 20,
                        color: active ? "hsl(45, 33%, 97%)" : "hsl(226, 40%, 32%)",
                        strokeWidth: active ? 2.2 : 1.8,
                      }}
                    />
                    {/* Badge */}
                    {badge > 0 && (
                      <motion.span
                        key={badge}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold"
                        style={{
                          background: active ? "hsl(45, 33%, 90%)" : "hsl(226, 60%, 10%)",
                          color: active ? "hsl(226, 60%, 10%)" : "hsl(45, 33%, 97%)",
                        }}
                      >
                        {badge > 9 ? "9+" : badge}
                      </motion.span>
                    )}
                  </div>

                  <motion.span
                    className="text-[10px] font-semibold leading-none tracking-wide"
                    style={{
                      color: active ? "hsl(45, 33%, 97%)" : "hsl(226, 40%, 32%)",
                      opacity: active ? 1 : 0.7,
                    }}
                    animate={{ opacity: active ? 1 : 0.7 }}
                    transition={{ duration: 0.15 }}
                  >
                    {item.label}
                  </motion.span>
                </div>
              </motion.div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
