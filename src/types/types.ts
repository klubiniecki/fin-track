export interface TransactionInterface {
  _id: string;
  name: string;
  amount: number;
  date: string;
  category: TransactionCategory;
  regular: boolean;
}

export interface ExpenseInterface extends TransactionInterface {
  category: ExpenseCategory;
}

export interface IncomeInterface extends TransactionInterface {
  category: IncomeCategory;
}

export interface SavingInterface extends TransactionInterface {
  category: SavingCategory;
}

export type TransactionType = "expense" | "income" | "saving";

export type TransactionCategory =
  | IncomeCategory
  | ExpenseCategory
  | SavingCategory;

export type SavingCategory = "Regular" | "Travel" | "Yearly" | "Gaia" | "Other";

export type IncomeCategory = "Salary" | "Sales" | "Other";

export type ExpenseCategory =
  | "Groceries"
  | "Rent"
  | "Utilities"
  | "Gaia"
  | "Car"
  | "Travel"
  | "Fun"
  | "Restaurant"
  | "Wellness"
  | "Medical"
  | "Household"
  | "Clothes"
  | "Subscriptions"
  | "Other";
