import React from "react";
import { ReactNavbar } from "overlay-navbar";
// import logo from "./images/.../.../logo.png"
import {
  MdSearch,
  MdShoppingCart,
  MdAccountCircle,
} from "react-icons/md";

const Header = () => {
  return (
    <ReactNavbar
      burgerColor="#eb4034"
      burgerColorHover="#a62d24"
      navColor1="rgb(102, 99, 99)"
      logo="https://graphicsfamily.com/wp-content/uploads/edd/2021/08/E-Commerce-Logo-Design-scaled.jpg"
      logoWidth="250px"
      logoHoverSize="15px"
      logoHoverColor="#eb4034"
      logoTransition="0.5"

      /* Navigation Links */
      link1Text="Home"
      link2Text="Products"
      link3Text= "Contact"
      link4Text="About"

      link1Url="/"
      link2Url="/products"
      link3Url="/contact"
      link4Url="/about"

      /* Link spacing */
      link1Margin="3vmax"
      link2Margin="3vmax"
      link3Margin="3vmax"
      link4Margin="3vmax"

      /* Link styling */
      link1Size="1.2vmax"
      link2Size="1.2vmax"
      link3Size="1.2vmax"
      link4Size="1.2vmax"

      link1Color="white"
      link2Color="white"
      link3Color="white"
      link4Color="white"

      link1ColorHover="#6366f1"
      link2ColorHover="#6366f1"
      link3ColorHover="#6366f1"
      link4ColorHover="#6366f1"

      nav1justifyContent="flex-end"
      nav2justifyContent="flex-end"
      nav3justifyContent="flex-start"
      nav4justifyContent="flex-start"

      /* Search */
      searchIcon={true}
      SearchIconElement={MdSearch}
      searchIconColor="white"
      searchIconSize="2vmax"
      searchIconMargin="0 15px"
      searchIconColorHover="#eb4034"

      /* Cart */
      cartIcon={true}
      CartIconElement={MdShoppingCart}
      cartIconColor="white"
      cartIconSize="2vmax"
      cartIconMargin="0 15px"
      cartIconColorHover="#eb4034"

      /* Profile */
      profileIcon={true}
       ProfileIconElement={MdAccountCircle}
      profileIconColor="white"
      profileIconSize="2.5vmax"
      profileIconMargin="0 15px"
      profileIconColorHove="#eb4034"
    />
  );
};

export default Header;