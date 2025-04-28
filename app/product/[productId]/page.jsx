"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import useCartStore from "@/store/cartStore";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import ProductDetailsSinglePage from "@/components/ProductDetailsSinglePage.jsx";
import PageLoader from "@/commonComponents/Loader/page";
import LoadingErrorComponent from "@/components/Loader/LoadingErrorComponent";

export default function ProductPage() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allReviews, setAllReviews] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const addItem = useCartStore((state) => state.addItem);

  const { productId } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        const res = await axios.get(`/api/product/${productId}`);
        setProduct(res.data);

        if (session) {
          checkWishlistStatus(res.data._id)
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          router.push("/404")
        } else {
          setError("Failed to load product")
          console.log(error)
        }
      } finally {
        setLoading(false)
      }
    };

    fetchProduct();
    fetchAllReview();
  }, [productId, router, session]);

  const averageRating = allReviews.length ?
    allReviews.reduce((acc, review) => acc + review.rating, 0) / allReviews.length : 0;

  const fetchAllReview = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/review/allReviews?productId=${productId}`);
      setAllReviews(res.data.review);

    } catch (error) {
      setError("Failed to load reviews");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  const checkWishlistStatus = async (productId) => {
    try {
      const res = await axios.get("/api/wishlistAll");
      const {items} = res.data;
      setIsInWishlist(items.some((item) => item._id === productId));
    } catch (error) {
      setError("Failed to load status");
      console.log(error);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => {
      prevIndex === product?.images?.length - 1 ? 0 : prevIndex + 1;
    })
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => {
      prevIndex === product?.images?.length - 1 ? 0 : prevIndex - 1;
    })
  };

  const handleAddToCart = () => {
    addItem(product);
    toast.success("Added item to cart");
  };

  const toggleWishlist = async () => {
    if (!session) {
      router.push("/login");
      return;
    }
    try {
      if (isInWishlist) {
        await axios.delete("/api/wishlist", { data: { productId: product._id } });
        setIsInWishlist(false);
        toast.success("Removed from wishlist");
      } else {
        await axios.put("/api/wishlist", { productId: product._id });
        setIsInWishlist(true);
        toast.success("Added to wishlist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <PageLoader />
    )
  };

  if (error) {
    return (
      <LoadingErrorComponent error={error} />
    )
  };

  if(!product){
    return null;
  };



  return (
    <ProductDetailsSinglePage
      product={product}
      averageRating={averageRating}
      allReviews={allReviews}
      isInWishlist={isInWishlist}
      handleAddToCart={handleAddToCart}
      toggleWishlist={toggleWishlist}
    />
  );
}
