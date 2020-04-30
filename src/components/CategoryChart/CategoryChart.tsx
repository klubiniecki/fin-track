import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TransactionInterface, TransactionCategory } from "../../types/types";

interface Props {
  transactions: TransactionInterface[];
  categories: TransactionCategory[];
  type: "bar" | "pie";
}

const CategoryChart = ({ transactions, categories, type }: Props) => {
  const data = categories
    .map((category) => {
      const amounts = transactions
        .filter((i) => i.category === category)
        .map((i) => i.amount);
      const amount = amounts.length ? amounts.reduce((a, b) => a + b) : 0;
      return {
        category,
        amount,
      };
    })
    .filter((data) => data.amount > 0);

  const randomHSL = () => `hsla(${~~(360 * Math.random())},70%,70%,0.8)`;
  const COLORS = data.map((_) => randomHSL());

  const cell = data.map((_, index) => (
    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
  ));

  const barChart = (
    <BarChart data={data} margin={{ top: 0, bottom: 0, right: 0, left: -25 }}>
      <Bar dataKey="amount">{cell}</Bar>
      <XAxis dataKey="category" />
      <YAxis />
      <Tooltip />
    </BarChart>
  );

  const pieChart = () => {
    const amounts = data.map((d) => d.amount);
    let pieData;
    if (amounts.length) {
      pieData = data.map((d) => ({
        category: d.category,
        percentage: d.amount / amounts.reduce((a, b) => a + b),
      }));
    }

    return (
      <PieChart>
        <Pie
          data={pieData}
          dataKey="percentage"
          nameKey="category"
          cx="50%"
          cy="50%"
          outerRadius={120}
          paddingAngle={1}
          fill="#8884d8"
        >
          {cell}
        </Pie>
        <Tooltip
          formatter={(value: number, name: string) => [
            value.toLocaleString("en", {
              style: "percent",
            }),
            name,
          ]}
        />
      </PieChart>
    );
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      {type === "bar" ? barChart : pieChart()}
    </ResponsiveContainer>
  );
};

export default CategoryChart;
