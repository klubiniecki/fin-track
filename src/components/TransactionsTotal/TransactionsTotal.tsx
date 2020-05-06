import React from "react";
import { TransactionInterface } from "../../types/types";
import getTypeFromCategory from "../../utils/getTypeFromCategory";
import getSum from "../../utils/getSum";
import getColorFromType from "../../utils/getColorFromType";
import useStyles from "../../utils/useStyles";

interface Props {
  transactions: TransactionInterface[];
}

const TransactionsTotal = (props: Props) => {
  const withType = props.transactions.map((t) => ({
    ...t,
    type: getTypeFromCategory(t.category),
  }));
  const exp = withType.filter((t) => t.type === "expense");
  const sumExp = exp.length ? getSum(exp.map((t) => t.amount)) : 0;
  const sav = withType.filter((t) => t.type === "saving");
  const sumSav = sav.length ? getSum(sav.map((t) => t.amount)) : 0;
  const inc = withType.filter((t) => t.type === "income");
  const sumInc = inc.length ? getSum(inc.map((t) => t.amount)) : 0;

  const styles = useStyles({
    totals: {
      display: "flex",
      justifyContent: "flex-end",
      paddingBottom: 8,
      marginBottom: 8,
      borderBottom: "1px solid #ededed",
      "& *": {
        marginLeft: 16,
        fontSize: 16,
      },
    },
  });

  return (
    <div className={styles.totals}>
      <div style={{ color: getColorFromType("expense") }}>${sumExp}</div>
      <div style={{ color: getColorFromType("saving") }}>${sumSav}</div>
      <div style={{ color: getColorFromType("income") }}>${sumInc}</div>
    </div>
  );
};

export default TransactionsTotal;
