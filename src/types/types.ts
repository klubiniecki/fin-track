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

export type SavingCategory =
  | "Regular"
  | "Vacations"
  | "Yearly"
  | "Gaia"
  | "Other saving";

export type IncomeCategory = "Salary" | "Sales" | "Other income";

export type ExpenseCategory =
  | "Groceries"
  | "Rent"
  | "Utilities"
  | "Baby"
  | "Car"
  | "Travel"
  | "Fun"
  | "Restaurant"
  | "Wellness"
  | "Medical"
  | "Household"
  | "Clothes"
  | "Subscriptions"
  | "Other expense";
