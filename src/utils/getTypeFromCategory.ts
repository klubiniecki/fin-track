import { TransactionType, TransactionCategory } from "../types/types";
import { INCOME_CATEGORIES, SAVING_CATEGORIES } from "./constants";

const getTypeFromCategory = (category: TransactionCategory): TransactionType =>
  SAVING_CATEGORIES.includes(category)
    ? "saving"
    : INCOME_CATEGORIES.includes(category)
    ? "income"
    : "expense";

export default getTypeFromCategory;
