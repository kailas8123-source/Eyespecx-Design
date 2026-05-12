import {
  useMutation,
  useQuery,
  type QueryKey,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";

export type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  images?: string[];
  inStock: boolean;
  isNew?: boolean;
  frameColor: string;
  lensColor?: string;
  description?: string;
  shape?: string;
  material?: string;
  type: "Optical" | "Sunglasses";
  gender: "men" | "women" | "unisex";
  category: string;
  featured?: boolean;
  trending?: boolean;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
};

export type Collection = Category & {
  description: string;
};

export type CartItem = {
  id: number;
  productId: number;
  quantity: number;
  product: Product;
};

export type WishlistItem = {
  id: number;
  productId: number;
  product: Product;
};

export type Review = {
  id: number;
  productId: number;
  rating: number;
  comment: string;
  authorName: string;
  createdAt: string;
};

export type OrderLineItem = {
  id: number;
  productId: number;
  quantity: number;
  priceAtPurchase: number;
  product: Product;
};

export type Order = {
  id: number;
  total: number;
  status: "processing" | "shipped" | "delivered";
  shippingAddress: string;
  createdAt: string;
  items: OrderLineItem[];
};

type MutationConfig<TData, TVariables> = {
  mutation?: UseMutationOptions<TData, Error, TVariables>;
};

type QueryConfig<TData> = {
  query?: Omit<UseQueryOptions<TData, Error, TData, QueryKey>, "queryKey" | "queryFn"> & {
    queryKey?: QueryKey;
  };
};

const products: Product[] = [
  {
    id: 1,
    name: "The Architect",
    brand: "Tom Ford",
    price: 189,
    originalPrice: 229,
    imageUrl: "/images/collection-1.png",
    images: ["/images/collection-2.png", "/images/hero.png"],
    inStock: true,
    isNew: true,
    frameColor: "Tortoise",
    lensColor: "Clear",
    description:
      "A confident acetate frame with a balanced bridge, polished finish, and everyday optical comfort.",
    shape: "Square",
    material: "Italian Acetate",
    type: "Optical",
    gender: "unisex",
    category: "optical",
    featured: true,
    trending: true,
  },
  {
    id: 2,
    name: "Sol Aviator",
    brand: "Ray-Ban",
    price: 159,
    imageUrl: "/images/hero.png",
    images: ["/images/collection-1.png", "/images/collection-2.png"],
    inStock: true,
    frameColor: "Gold",
    lensColor: "Green",
    description:
      "A lightweight metal aviator with glare-cutting lenses and a timeless sun-ready profile.",
    shape: "Aviator",
    material: "Titanium Alloy",
    type: "Sunglasses",
    gender: "men",
    category: "sunglasses",
    featured: true,
    trending: true,
  },
  {
    id: 3,
    name: "Nova Cat Eye",
    brand: "Prada",
    price: 212,
    imageUrl: "/images/collection-2.png",
    images: ["/images/hero.png", "/images/collection-1.png"],
    inStock: true,
    isNew: true,
    frameColor: "Black",
    lensColor: "Smoke",
    description:
      "An elevated cat-eye silhouette with sculpted corners and a quietly glamorous finish.",
    shape: "Cat Eye",
    material: "Premium Acetate",
    type: "Sunglasses",
    gender: "women",
    category: "designer",
    featured: true,
  },
  {
    id: 4,
    name: "Metro Round",
    brand: "Persol",
    price: 146,
    imageUrl: "/images/collection-1.png",
    images: ["/images/hero.png", "/images/collection-2.png"],
    inStock: true,
    frameColor: "Crystal Grey",
    lensColor: "Clear",
    description:
      "Soft round lenses and slim temples create a clean studio-to-street optical frame.",
    shape: "Round",
    material: "Acetate",
    type: "Optical",
    gender: "unisex",
    category: "optical",
    trending: true,
  },
  {
    id: 5,
    name: "Velocity Shield",
    brand: "Oakley",
    price: 176,
    imageUrl: "/images/hero.png",
    images: ["/images/collection-2.png", "/images/collection-1.png"],
    inStock: true,
    frameColor: "Matte Black",
    lensColor: "Prizm Bronze",
    description:
      "Sport-inspired coverage with a featherweight feel, tuned for bright outdoor movement.",
    shape: "Shield",
    material: "Performance Polymer",
    type: "Sunglasses",
    gender: "men",
    category: "sport",
    featured: true,
  },
  {
    id: 6,
    name: "Blush Studio",
    brand: "Warby Parker",
    price: 118,
    imageUrl: "/images/collection-2.png",
    images: ["/images/collection-1.png", "/images/hero.png"],
    inStock: true,
    isNew: true,
    frameColor: "Rose Quartz",
    lensColor: "Clear",
    description:
      "A soft rectangular frame with warm color, slim temples, and an easy everyday fit.",
    shape: "Rectangle",
    material: "Bio Acetate",
    type: "Optical",
    gender: "women",
    category: "new-arrivals",
    trending: true,
  },
  {
    id: 7,
    name: "Luna Rimless",
    brand: "Lindberg",
    price: 249,
    imageUrl: "/images/collection-1.png",
    images: ["/images/collection-2.png", "/images/hero.png"],
    inStock: false,
    frameColor: "Silver",
    lensColor: "Clear",
    description:
      "Minimal rimless construction for a barely-there feel and precise, refined optics.",
    shape: "Oval",
    material: "Titanium",
    type: "Optical",
    gender: "unisex",
    category: "designer",
  },
  {
    id: 8,
    name: "Heritage Club",
    brand: "Gucci",
    price: 238,
    originalPrice: 275,
    imageUrl: "/images/hero.png",
    images: ["/images/collection-1.png", "/images/collection-2.png"],
    inStock: true,
    frameColor: "Havana",
    lensColor: "Amber",
    description:
      "A clubmaster-inspired frame with rich Havana acetate and polished metal detailing.",
    shape: "Browline",
    material: "Acetate and Metal",
    type: "Sunglasses",
    gender: "unisex",
    category: "designer",
    featured: true,
    trending: true,
  },
];

const categories: Category[] = [
  { id: 1, name: "Optical", slug: "optical", imageUrl: "/images/collection-1.png" },
  { id: 2, name: "Sunglasses", slug: "sunglasses", imageUrl: "/images/hero.png" },
  { id: 3, name: "Designer", slug: "designer", imageUrl: "/images/collection-2.png" },
  { id: 4, name: "New Arrivals", slug: "new-arrivals", imageUrl: "/images/collection-1.png" },
];

const collections: Collection[] = [
  {
    ...categories[0],
    name: "The Optical Edit",
    description:
      "Sharp everyday frames selected for balanced proportions, premium materials, and all-day comfort.",
  },
  {
    ...categories[1],
    name: "Sun Icons",
    description:
      "Statement sunglasses with confident shapes, protective lenses, and a polished seasonal attitude.",
  },
  {
    ...categories[2],
    name: "Designer House",
    description:
      "Elevated eyewear from celebrated labels, chosen for craft, silhouette, and lasting presence.",
  },
];

const starterReviews: Review[] = [
  {
    id: 1,
    productId: 1,
    rating: 5,
    comment: "Beautiful finish and surprisingly light for a bold frame.",
    authorName: "Aarav",
    createdAt: "2026-04-28T10:15:00.000Z",
  },
  {
    id: 2,
    productId: 3,
    rating: 4,
    comment: "The shape is distinctive without feeling too dramatic.",
    authorName: "Mira",
    createdAt: "2026-05-02T14:40:00.000Z",
  },
];

const readStore = <T,>(key: string, fallback: T): T => {
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeStore = <T,>(key: string, value: T) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const delay = async () => new Promise((resolve) => window.setTimeout(resolve, 120));

const getProductById = (id: number) => products.find((product) => product.id === id);

const hydrateCart = () =>
  readStore<Array<Omit<CartItem, "product">>>("eyespecx-cart", []).flatMap((item) => {
    const product = getProductById(item.productId);
    return product ? [{ ...item, product }] : [];
  });

const saveCart = (items: CartItem[]) => {
  writeStore(
    "eyespecx-cart",
    items.map(({ id, productId, quantity }) => ({ id, productId, quantity })),
  );
};

const hydrateWishlist = () =>
  readStore<Array<Omit<WishlistItem, "product">>>("eyespecx-wishlist", []).flatMap((item) => {
    const product = getProductById(item.productId);
    return product ? [{ ...item, product }] : [];
  });

const saveWishlist = (items: WishlistItem[]) => {
  writeStore(
    "eyespecx-wishlist",
    items.map(({ id, productId }) => ({ id, productId })),
  );
};

const hydrateReviews = () => readStore<Review[]>("eyespecx-reviews", starterReviews);
const saveReviews = (items: Review[]) => writeStore("eyespecx-reviews", items);

const hydrateOrders = () => readStore<Order[]>("eyespecx-orders", []);
const saveOrders = (items: Order[]) => writeStore("eyespecx-orders", items);

const nextId = (items: Array<{ id: number }>) =>
  items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1;

export const getGetCartQueryKey = () => ["cart"];
export const getGetWishlistQueryKey = () => ["wishlist"];
export const getListProductsQueryKey = (params?: ListProductsParams) => ["products", params ?? {}];
export const getListReviewsQueryKey = (params?: ListReviewsParams) => ["reviews", params ?? {}];

export type ListProductsParams = {
  category?: string;
  gender?: string;
  search?: string;
  sort?: string;
};

export type ListReviewsParams = {
  productId?: number;
};

export function useListProducts(params: ListProductsParams = {}, config?: QueryConfig<Product[]>) {
  return useQuery({
    queryKey: config?.query?.queryKey ?? getListProductsQueryKey(params),
    queryFn: async () => {
      await delay();
      let result = [...products];

      if (params.category) {
        result = result.filter((product) => product.category === params.category);
      }
      if (params.gender) {
        result = result.filter(
          (product) => product.gender === params.gender || product.gender === "unisex",
        );
      }
      if (params.search) {
        const search = params.search.toLowerCase();
        result = result.filter((product) =>
          [product.name, product.brand, product.frameColor, product.shape, product.material]
            .filter(Boolean)
            .some((value) => value!.toLowerCase().includes(search)),
        );
      }

      if (params.sort === "newest") result.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew));
      if (params.sort === "price-asc") result.sort((a, b) => a.price - b.price);
      if (params.sort === "price-desc") result.sort((a, b) => b.price - a.price);

      return result;
    },
    ...config?.query,
  });
}

export function useGetProduct(id: number, config?: QueryConfig<Product | undefined>) {
  return useQuery({
    queryKey: config?.query?.queryKey ?? ["product", id],
    queryFn: async () => {
      await delay();
      return getProductById(id);
    },
    ...config?.query,
  });
}

export function useGetFeaturedProducts(config?: QueryConfig<Product[]>) {
  return useQuery({
    queryKey: config?.query?.queryKey ?? ["products", "featured"],
    queryFn: async () => {
      await delay();
      return products.filter((product) => product.featured);
    },
    ...config?.query,
  });
}

export function useGetNewArrivals(config?: QueryConfig<Product[]>) {
  return useQuery({
    queryKey: config?.query?.queryKey ?? ["products", "new"],
    queryFn: async () => {
      await delay();
      return products.filter((product) => product.isNew);
    },
    ...config?.query,
  });
}

export function useGetTrendingProducts(config?: QueryConfig<Product[]>) {
  return useQuery({
    queryKey: config?.query?.queryKey ?? ["products", "trending"],
    queryFn: async () => {
      await delay();
      return products.filter((product) => product.trending);
    },
    ...config?.query,
  });
}

export function useListCategories(config?: QueryConfig<Category[]>) {
  return useQuery({
    queryKey: config?.query?.queryKey ?? ["categories"],
    queryFn: async () => {
      await delay();
      return categories;
    },
    ...config?.query,
  });
}

export function useListCollections(config?: QueryConfig<Collection[]>) {
  return useQuery({
    queryKey: config?.query?.queryKey ?? ["collections"],
    queryFn: async () => {
      await delay();
      return collections;
    },
    ...config?.query,
  });
}

export function useGetCart(config?: QueryConfig<CartItem[]>) {
  return useQuery({
    queryKey: config?.query?.queryKey ?? getGetCartQueryKey(),
    queryFn: async () => {
      await delay();
      return hydrateCart();
    },
    ...config?.query,
  });
}

export function useAddToCart(config?: MutationConfig<CartItem, { data: { productId: number; quantity: number } }>) {
  return useMutation({
    mutationFn: async ({ data }) => {
      await delay();
      const product = getProductById(data.productId);
      if (!product) throw new Error("Product not found");

      const cart = hydrateCart();
      const existing = cart.find((item) => item.productId === data.productId);
      if (existing) {
        existing.quantity += data.quantity;
        saveCart(cart);
        return existing;
      }

      const item = { id: nextId(cart), productId: data.productId, quantity: data.quantity, product };
      saveCart([...cart, item]);
      return item;
    },
    ...config?.mutation,
  });
}

export function useUpdateCartItem(config?: MutationConfig<CartItem, { id: number; data: { quantity: number } }>) {
  return useMutation({
    mutationFn: async ({ id, data }) => {
      await delay();
      const cart = hydrateCart();
      const item = cart.find((cartItem) => cartItem.id === id);
      if (!item) throw new Error("Cart item not found");
      item.quantity = Math.max(1, data.quantity);
      saveCart(cart);
      return item;
    },
    ...config?.mutation,
  });
}

export function useRemoveCartItem(config?: MutationConfig<{ id: number }, { id: number }>) {
  return useMutation({
    mutationFn: async ({ id }) => {
      await delay();
      saveCart(hydrateCart().filter((item) => item.id !== id));
      return { id };
    },
    ...config?.mutation,
  });
}

export function useGetWishlist(config?: QueryConfig<WishlistItem[]>) {
  return useQuery({
    queryKey: config?.query?.queryKey ?? getGetWishlistQueryKey(),
    queryFn: async () => {
      await delay();
      return hydrateWishlist();
    },
    ...config?.query,
  });
}

export function useAddToWishlist(
  config?: MutationConfig<WishlistItem, { data: { productId: number } }>,
) {
  return useMutation({
    mutationFn: async ({ data }) => {
      await delay();
      const product = getProductById(data.productId);
      if (!product) throw new Error("Product not found");

      const wishlist = hydrateWishlist();
      const existing = wishlist.find((item) => item.productId === data.productId);
      if (existing) return existing;

      const item = { id: nextId(wishlist), productId: data.productId, product };
      saveWishlist([...wishlist, item]);
      return item;
    },
    ...config?.mutation,
  });
}

export function useRemoveWishlistItem(config?: MutationConfig<{ id: number }, { id: number }>) {
  return useMutation({
    mutationFn: async ({ id }) => {
      await delay();
      saveWishlist(hydrateWishlist().filter((item) => item.id !== id));
      return { id };
    },
    ...config?.mutation,
  });
}

export function useListReviews(params: ListReviewsParams = {}, config?: QueryConfig<Review[]>) {
  return useQuery({
    queryKey: config?.query?.queryKey ?? getListReviewsQueryKey(params),
    queryFn: async () => {
      await delay();
      return hydrateReviews().filter((review) =>
        params.productId ? review.productId === params.productId : true,
      );
    },
    ...config?.query,
  });
}

export function useCreateReview(
  config?: MutationConfig<
    Review,
    { data: { productId: number; rating: number; comment: string; authorName: string } }
  >,
) {
  return useMutation({
    mutationFn: async ({ data }) => {
      await delay();
      const reviews = hydrateReviews();
      const review = {
        id: nextId(reviews),
        ...data,
        createdAt: new Date().toISOString(),
      };
      saveReviews([review, ...reviews]);
      return review;
    },
    ...config?.mutation,
  });
}

export function useCreateOrder(
  config?: MutationConfig<Order, { data: { shippingAddress: string } }>,
) {
  return useMutation({
    mutationFn: async ({ data }) => {
      await delay();
      const cart = hydrateCart();
      if (cart.length === 0) throw new Error("Cart is empty");

      const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      const shipping = subtotal > 150 ? 0 : 15;
      const orderItems = cart.map((item, index) => ({
        id: index + 1,
        productId: item.productId,
        quantity: item.quantity,
        priceAtPurchase: item.product.price,
        product: item.product,
      }));
      const orders = hydrateOrders();
      const order = {
        id: nextId(orders),
        total: subtotal + shipping,
        status: "processing" as const,
        shippingAddress: data.shippingAddress,
        createdAt: new Date().toISOString(),
        items: orderItems,
      };

      saveOrders([order, ...orders]);
      saveCart([]);
      return order;
    },
    ...config?.mutation,
  });
}

export function useListOrders(config?: QueryConfig<Order[]>) {
  return useQuery({
    queryKey: config?.query?.queryKey ?? ["orders"],
    queryFn: async () => {
      await delay();
      return hydrateOrders();
    },
    ...config?.query,
  });
}
