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

const CategoryBarChart = ({ transactions, categories, type }: Props) => {
  const data = categories
    .map((category) => {
      const expenseAmounts = transactions
        .filter((item) => item.category === category)
        .map((item) => item.amount);

      const amount = expenseAmounts.length
        ? expenseAmounts.reduce((a, b) => a + b)
        : 0;

      return {
        category,
        amount,
      };
    })
    .filter((data) => data.amount > 0);

  const COLORS = data.map((_) => randomHSL());

  function randomHSL() {
    return `hsla(${~~(360 * Math.random())},70%,70%,0.8)`;
  }

  const barChart = (
    <BarChart data={data} margin={{ top: 0, bottom: 0, right: 0, left: -25 }}>
      <Bar dataKey="amount">
        {data.map((_, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Bar>
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
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value: any, name: any) => [
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

export default CategoryBarChart;
