export interface TransactionInterface {
  _id: string;
  name: string;
  amount: number;
  date: string;
  category: TransactionCategory;
  type: TransactionType;
  regular: boolean;
}

export interface ExpenseInterface extends TransactionInterface {
  category: ExpenseCategory;
  type: "expense";
}

export interface IncomeInterface extends TransactionInterface {
  category: IncomeCategory;
  type: "income";
}

export interface SavingInterface extends TransactionInterface {
  category: SavingCategory;
  type: "saving";
}

export type TransactionType = "expense" | "income" | "saving";

export type TransactionCategory =
  | IncomeCategory
  | ExpenseCategory
  | SavingCategory;

export type SavingCategory = "Savings" | "Gaia";

export type IncomeCategory = "Salary" | "Sales" | "Other";

export type ExpenseCategory =
  | "Groceries"
  | "Home"
  | "Fun"
  | "Baby"
  | "Car"
  | "Health"
  | "Cosmetics"
  | "Travel"
  | "Other";
