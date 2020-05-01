import React from "react";
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TransactionInterface } from "../../types/types";
import getArrayOfColors from "../../utils/getArrayOfColors";

interface Props {
  transactions: TransactionInterface[];
}

const RegularChart = ({ transactions }: Props) => {
  const reg = transactions
    .filter((i) => i.regular === true)
    .map((i) => i.amount);
  const nonReg = transactions
    .filter((i) => i.regular === false)
    .map((i) => i.amount);
  const regTotal = reg.length ? reg.reduce((a, b) => a + b) : 0;
  const nonRegTotal = nonReg.length ? nonReg.reduce((a, b) => a + b) : 0;
  const total = regTotal + nonRegTotal;

  const data = [
    { name: "Regular", amount: regTotal / total },
    { name: "Non-regular", amount: nonRegTotal / total },
  ];

  const COLORS = getArrayOfColors(data.length);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
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
          formatter={(value: number, name: string) => [
            value.toLocaleString("en", {
              style: "percent",
            }),
            name,
          ]}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default RegularChart;
