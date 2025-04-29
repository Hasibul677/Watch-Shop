import React from "react";
import Link from "next/link";
import { Input } from "../ui/input";

const ProductDrawer = ({
  productOpen,
  setProductOpen,
  category,
  setCategory,
}) => {
  return (
    productOpen && (
      <div
        className="h-[42%] w-[40%] dots bg-white z-20 absolute mt-[59px] ml-[10%]"
        onMouseLeave={() => setProductOpen(false)}
        onMouseEnter={() => setProductOpen(true)}
      >
        <div className="flex justify-between w-full h-full">
          <div className="w-full h-full flex flex-col justify-around">
            <div>
              <div className="w-full flex justify-center">
                <p className="text-2xl pt-2 text-black font-bold">Category</p>
              </div>
              <div className="bg-gray-400 h-[2px] w-full"></div>
            </div>
            <div >
              <ul>
                {[
                  "Rolex",
                  "Patek Philipe",
                  "Audemars Piguet",
                  "Richar Mille",
                  "Omega"
                ].map((cat) => (
                  <Link
                    key={cat}
                    href={`/products/brand/${cat.toLowerCase().replace(" ", "")}`}
                  >
                    <li
                      onMouseEnter={() => setCategory(cat)}
                      className={`text-lg cursor-pointer py-[5px] ml-4 ${category === cat ? " bg-sky-400/30 rounded-md fadeRight" : null
                        }`}
                    >
                      <span className="pl-2 text-lg">{cat}</span>
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductDrawer;
