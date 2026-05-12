import { useState, useMemo } from "react";
import { useLocation, useSearch } from "wouter";
import { 
  useListProducts, 
  useListCategories,
  getListProductsQueryKey
} from "@workspace/api-client-react";
import { ProductCard } from "@/components/product/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function Shop() {
  const [location, setLocation] = useLocation();
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);

  const categoryParam = searchParams.get("category") || undefined;
  const genderParam = searchParams.get("gender") || undefined;
  const qParam = searchParams.get("search") || undefined;
  const sortParam = searchParams.get("sort") || undefined;

  const [searchQuery, setSearchQuery] = useState(qParam || "");

  const { data: products, isLoading } = useListProducts({
    category: categoryParam,
    gender: genderParam,
    search: qParam,
    sort: sortParam,
  });

  const { data: categories } = useListCategories();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchString);
    if (searchQuery) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }
    setLocation(`${location}?${params.toString()}`);
  };

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchString);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setLocation(`${location}?${params.toString()}`);
  };

  const clearFilters = () => {
    setLocation(location);
    setSearchQuery("");
  };

  const hasFilters = categoryParam || genderParam || qParam || sortParam;

  return (
    <div className="min-h-screen bg-background pt-8 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold tracking-tight mb-3">
              {genderParam === "men" ? "Men's Eyewear" : genderParam === "women" ? "Women's Eyewear" : categoryParam ? "Collection" : "All Eyewear"}
            </h1>
            <p className="text-muted-foreground max-w-xl text-lg">
              Explore our complete collection of premium frames. Discover the perfect shape, material, and fit for your face.
            </p>
          </div>

          <div className="w-full md:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <form onSubmit={handleSearch} className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Search frames..." 
                className="pl-9 h-12 bg-secondary/50 border-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-shop"
              />
            </form>

            <div className="flex gap-2">
              <Select value={sortParam || ""} onValueChange={(val) => updateParam("sort", val)}>
                <SelectTrigger className="w-[160px] h-12 bg-secondary/50 border-none" data-testid="select-sort">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest Arrivals</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="h-12 border-none bg-secondary/50 px-4" data-testid="btn-filters">
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                    {hasFilters && <span className="ml-1 flex h-2 w-2 rounded-full bg-primary" />}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader className="mb-6">
                    <SheetTitle>Filter & Sort</SheetTitle>
                  </SheetHeader>
                  
                  <div className="flex flex-col gap-8">
                    <div className="space-y-4">
                      <h3 className="font-medium">Gender</h3>
                      <div className="flex flex-wrap gap-2">
                        {["men", "women", "unisex"].map((g) => (
                          <Button
                            key={g}
                            variant={genderParam === g ? "default" : "outline"}
                            className="capitalize"
                            onClick={() => updateParam("gender", genderParam === g ? null : g)}
                          >
                            {g}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-medium">Category</h3>
                      <div className="flex flex-wrap gap-2">
                        {categories?.map((c) => (
                          <Button
                            key={c.slug}
                            variant={categoryParam === c.slug ? "default" : "outline"}
                            onClick={() => updateParam("category", categoryParam === c.slug ? null : c.slug)}
                          >
                            {c.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {hasFilters && (
                    <div className="mt-8 pt-8 border-t">
                      <Button variant="ghost" className="w-full" onClick={clearFilters}>
                        Clear all filters
                      </Button>
                    </div>
                  )}
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="aspect-square bg-muted animate-pulse rounded-lg" />
                <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
                <div className="h-4 bg-muted animate-pulse rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="py-24 flex flex-col items-center justify-center text-center">
            <div className="h-24 w-24 rounded-full bg-secondary flex items-center justify-center mb-6">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-serif font-semibold mb-2">No frames found</h2>
            <p className="text-muted-foreground max-w-md mb-8">
              We couldn't find any eyewear matching your current filters. Try adjusting your search criteria.
            </p>
            <Button onClick={clearFilters} data-testid="btn-clear-filters">Clear Filters</Button>
          </div>
        )}
      </div>
    </div>
  );
}
