"use client";

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useCartStore from "@/store/cartStore";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import ProductDetailsSinglePage from "@/components/ProductDetailsSinglePage.jsx";

export default function ProductPage({ params }) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allReviews, setAllReviews] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const addItem = useCartStore((state) => state.addItem);

  const { productId } = params;

  //logic here

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
