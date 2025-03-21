"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import CartIcon from "../CartIcon";
import SearchDrawer from "./SearchDrawer";
import ProductDrawer from "./ProductDrawer";
import AdminDrawer from "./AdminDrawer";
import MobileMenu from "./MobileMenu";
import NavbarLinks from "./NavbarLinks";
import UserSection from "./UserSection";
import { Input } from "../ui/input";

const Navbar = () => {
  //logic goes here

  return (
    <div className="z-40">
      <div className="w-full bg-slate-50 h-14">
        <div className="pl-2 pt-2 md:hidden">
          {isOpen ? (
            <X onClick={handleMenuOpen} size={40} />
          ) : (
            <Menu onClick={handleMenuOpen} size={40} />
          )}
        </div>
        <div className="hidden md:flex justify-between">
          <SearchDrawer
            searchOpen={searchOpen}
            searchTerm={searchTerm}
            handleChange={handleChange}
            handleSearchClose={handleSearchClose}
            firstTwelveItems={firstTwelveItems}
            resultArr={resultArr}
          />
          <ProductDrawer
            productOpen={productOpen}
            setProductOpen={setProductOpen}
            category={category}
            setCategory={setCategory}
          />
          <div className="mt-[-17px] flex ml-4">
            <Image
              alt="s"
              onClick={() => router.push("/")}
              src="/logo1.png"
              width={65}
              height={35}
              className="cursor-pointer p-2 mt-[12px]"
            />
            <Input
              className="mt-7 h-8 w-44"
              onClick={handleSearchClick}
              placeholder="Search..."
            />
          </div>
          <NavbarLinks
            session={session}
            setProductOpen={setProductOpen}
            setAdmin={setAdmin}
          />
          <div className="z-40">
            <CartIcon />
          </div>
          <UserSection session={session} />
        </div>
      </div>
      <div
        onMouseEnter={() => setAdmin(true)}
        onMouseLeave={() => setAdmin(false)}
      >
        <AdminDrawer
          admin={admin}
          category={category}
          setCategory={setCategory}
        />
      </div>
      <MobileMenu
        isOpen={isOpen}
        setMenuClose={setMenuClose}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        searchTerm={searchTerm}
        handleChange={handleChange}
        handleSearchClose={handleSearchClose}
        firstTwelveItems={firstTwelveItems}
        resultArr={resultArr}
        productModile={productModile}
        setProductModile={setProductModile}
        setAdminPanelMob={setAdminPanelMob}
        session={session}
        user={user}
        adminPanelMob={adminPanelMob}
      />
    </div>
  );
};

export default Navbar;
