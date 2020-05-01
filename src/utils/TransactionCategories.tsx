import React from "react";
import HouseTwoToneIcon from "@material-ui/icons/HouseTwoTone";
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
import DomainDisabledTwoToneIcon from "@material-ui/icons/DomainDisabledTwoTone";
import EmojiFoodBeverageTwoToneIcon from "@material-ui/icons/EmojiFoodBeverageTwoTone";
import LocalLaundryServiceTwoToneIcon from "@material-ui/icons/LocalLaundryServiceTwoTone";
import LocalSeeTwoToneIcon from "@material-ui/icons/LocalSeeTwoTone";
import SubscriptionsTwoToneIcon from "@material-ui/icons/SubscriptionsTwoTone";
import { TransactionCategory, TransactionType } from "../types/types";

export interface TransactionCategoryAndIcon {
  name: TransactionCategory;
  icon: React.ReactNode;
  type: TransactionType;
}

const TransactionCategories: TransactionCategoryAndIcon[] = [
  { name: "Groceries", icon: <ShoppingBasket />, type: "expense" },
  { name: "Rent", icon: <HouseTwoToneIcon />, type: "expense" },
  { name: "Fun", icon: <InsertEmoticon />, type: "expense" },
  { name: "Baby", icon: <FavoriteBorder />, type: "expense" },
  { name: "Car", icon: <DirectionsCar />, type: "expense" },
  { name: "Medical", icon: <LocalHospital />, type: "expense" },
  { name: "Wellness", icon: <ColorLens />, type: "expense" },
  { name: "Travel", icon: <FlightTakeoff />, type: "expense" },
  { name: "Utilities", icon: <DomainDisabledTwoToneIcon />, type: "expense" },
  {
    name: "Restaurant",
    icon: <EmojiFoodBeverageTwoToneIcon />,
    type: "expense",
  },
  {
    name: "Household",
    icon: <LocalLaundryServiceTwoToneIcon />,
    type: "expense",
  },
  { name: "Clothes", icon: <LocalSeeTwoToneIcon />, type: "expense" },
  {
    name: "Subscriptions",
    icon: <SubscriptionsTwoToneIcon />,
    type: "expense",
  },
  { name: "Other expense", icon: <OtherExpense />, type: "expense" },
  { name: "Salary", icon: <Salary />, type: "income" },
  { name: "Sales", icon: <Sales />, type: "income" },
  { name: "Other income", icon: <OtherIncome />, type: "income" },
  { name: "Yearly", icon: <Saving />, type: "saving" },
  { name: "Regular", icon: <Saving />, type: "saving" },
  { name: "Vacations", icon: <Saving />, type: "saving" },
  { name: "Gaia", icon: <Saving />, type: "saving" },
  { name: "Other saving", icon: <Saving />, type: "saving" },
];

export default TransactionCategories;
