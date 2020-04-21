import React from "react";
import Home from "@material-ui/icons/HomeTwoTone";
import ShoppingBasket from "@material-ui/icons/ShoppingBasketTwoTone";
import InsertEmoticon from "@material-ui/icons/InsertEmoticonOutlined";
import FavoriteBorder from "@material-ui/icons/FavoriteTwoTone";
import DirectionsCar from "@material-ui/icons/DirectionsCarOutlined";
import LocalHospital from "@material-ui/icons/LocalHospitalOutlined";
import ColorLens from "@material-ui/icons/ColorLensOutlined";
import FlightTakeoff from "@material-ui/icons/FlightTakeoffOutlined";
import OtherExpense from "@material-ui/icons/EuroSymbolOutlined";
import OtherIncome from "@material-ui/icons/RedeemOutlined";
import Salary from "@material-ui/icons/CreditCardOutlined";
import Sales from "@material-ui/icons/MonetizationOnTwoTone";
import Saving from "@material-ui/icons/SaveTwoTone";
import { TransactionCategory, TransactionType } from "../../types/types";

export interface TransactionCategoryAndIcon {
  name: TransactionCategory;
  icon: React.ReactNode;
  type: TransactionType;
}

const TransactionCategories: TransactionCategoryAndIcon[] = [
  { name: "Groceries", icon: <ShoppingBasket />, type: "expense" },
  { name: "Home", icon: <Home />, type: "expense" },
  { name: "Fun", icon: <InsertEmoticon />, type: "expense" },
  { name: "Baby", icon: <FavoriteBorder />, type: "expense" },
  { name: "Car", icon: <DirectionsCar />, type: "expense" },
  { name: "Health", icon: <LocalHospital />, type: "expense" },
  { name: "Cosmetics", icon: <ColorLens />, type: "expense" },
  { name: "Travel", icon: <FlightTakeoff />, type: "expense" },
  { name: "Other", icon: <OtherExpense />, type: "expense" },
  { name: "Salary", icon: <Salary />, type: "income" },
  { name: "Sales", icon: <Sales />, type: "income" },
  { name: "Other", icon: <OtherIncome />, type: "income" },
  { name: "Savings", icon: <Saving />, type: "saving" },
  { name: "Gaia", icon: <Saving />, type: "saving" },
];

export default TransactionCategories;
