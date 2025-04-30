import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { useRouter } from "next/navigation";

export default function ProductGrid({
  products: initialProducts,
  itemsPerPage = 12,
}) {

  const [products, setProducts] = useState(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState(null);
  const [selectedBrand, setSelectBrand] = useState("");
  const router = useRouter();

  const brands = [
    "All",
    "Rolex",
    "Patek Philipe",
    "Audemars Piguet",
    "Richard Mille",
    "Omega"
  ];

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products?.slice(startIndex, endIndex);
  const handleSort = (order) => {
    setSortOrder(order);
    const sortedProducts = [...products].sort((a, b) => {
      if (order === "highToLow") {
        return b.price - a.price;
      } else if (order === "lowToHigh") {
        return a.price - b.price
      }
      return 0;
    });
    setProducts(sortedProducts);
    setCurrentPage(1);
  }

  const handleBrandChange = (brand) => {
    setSelectBrand(brand);
    if (brand === "All") {
      setProducts(initialProducts);

    } else {
      router.push(`/products/brand/${encodeURIComponent(brand.toLowerCase().replace(/\s+/g, ""))}`);
    }
    setCurrentPage(1)
  };


  return (
    <div className="container mx-auto px-[1px] py-8">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <label htmlFor="brand" className="mr-2 text-gray-700">
            Brand:
          </label>
          <select
            id="brand"
            value={selectedBrand}
            onChange={(e) => handleBrandChange(e.target.value)}
            className="border-none w-[70%] rounded-md bg-slate-50 p-1 text-gray-700 focus:outline-none"
          >
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="sort" className="mr-2 text-gray-700">
            Sort:
          </label>
          <select
            id="sort"
            value={sortOrder || ""}
            onChange={(e) => handleSort(e.target.value)}
            className="border-none w-[80%]  rounded-md bg-slate-50 p-1 text-gray-700 focus:outline-none "
          >
            <option value="">Select</option>
            <option value="highToLow">Price: High to Low</option>
            <option value="lowToHigh">Price: Low to High</option>
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-12 space-x-1.5">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`relative mx-0.5 w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-all duration-300 ${
              currentPage === index + 1
                ? "bg-gradient-to-br from-slate-700 to-slate-900 text-white shadow-lg shadow-slate-400/20 transform scale-105"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-800 hover:shadow-md"
            }`}
          >
            {index + 1}
            {currentPage === index + 1 && (
              <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-slate-100"></span>
            )}
          </button>
        ))}
      </div>
      )}
    </div>
  );
}
