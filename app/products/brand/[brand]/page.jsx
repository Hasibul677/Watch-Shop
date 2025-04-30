"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import ProductGrid from "@/components/products/ProductGrid";
import { useSession } from "next-auth/react";
import LoadingErrorComponent from "@/components/Loader/LoadingErrorComponent";
import { useParams } from "next/navigation";
import PageLoader from "@/commonComponents/Loader/page";

export default function CategoryPage() {
  const { brand } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/products/brand/${brand}`);
        setProducts(res.data)
      } catch (error) {
        console.log(error);
        setError("Error loading product", error)
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [brand]);

  useEffect(() => {
    const fetchWishList = async () => {
      if (session) {
        try {
          const res = await axios.get(`/api/wishlist`);
          const { items } = res.data;
          if (Array.isArray(items)) {
            setWishlist(items.map((item) => item._id));
          }
        } catch (error) {
          console.log(error);
          setError("Error loading product", error)
        }
      }
    }
    fetchWishList();
  }, [brand]);

  const handleWishlistUpdate = (productId, isAdding) => {
    if (isAdding) {
      setWishlist([...wishlist, productId]);
    } else {
      setWishlist(wishlist.filter((id) => id !== productId));
    };
  };

  if (loading) {
    return (
      <PageLoader />
    )
  };

  if (error) {
    <LoadingErrorComponent error={error} />
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-slate-700 mb-4 uppercase">
          {brand} Watches
        </h1>
        <p className="mb-6 text-slate-700">
          Total Watches Available: {products.length}
        </p>
        {products.length ? <ProductGrid
          products={products}
          wishlist={wishlist}
          onWishlistUpdate={handleWishlistUpdate}
        /> :
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <svg
              className="w-24 h-24 text-red-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 max-w-md">
              We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
            </p>
          </div>
        }
      </main>
    </div>
  );
}
