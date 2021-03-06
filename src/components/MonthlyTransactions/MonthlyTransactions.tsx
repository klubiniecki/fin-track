import React, { useState, useEffect, useCallback } from "react";
import Transaction from "../Transaction/Transaction";
import {
  List,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
} from "@material-ui/core";
import { TransactionInterface, TransactionType } from "../../types/types";
import config from "../../config/config";
import RequestService from "../../services/requestService";
import useStyles from "../../utils/useStyles";
import EventIcon from "@material-ui/icons/EventTwoTone";
import getTypeFromCategory from "../../utils/getTypeFromCategory";
import TransactionsTotal from "../TransactionsTotal/TransactionsTotal";

interface Props {
  startDate: string;
  endDate: string;
  monthName: string;
  onDeleteTransaction: (id: string, transactionType: TransactionType) => void;
}

const MonthlyTransactions = ({
  startDate,
  endDate,
  monthName,
  onDeleteTransaction,
}: Props) => {
  const [transactions, setTransactions] = useState<
    null | TransactionInterface[]
  >(null);
  const [error, setError] = useState(null);

  const styles = useStyles({
    box: {
      marginBottom: 8,
    },
    month: {
      margin: "8px 0",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    loader: {
      margin: "16px 0",
    },
    icon: {
      marginLeft: 8,
      marginBottom: 2,
    },
  });

  const fetchTransactions = useCallback(async () => {
    const res = await RequestService().get(
      `${config.apiUrl}/transactions?startDate=${startDate}&endDate=${endDate}`
    );
    setTransactions(res.data);
    setError(res.error);
  }, [endDate, startDate]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  if (error) {
    return (
      <Box className={styles.box}>
        <Typography className={styles.month} color="textPrimary">
          {monthName}
          <EventIcon className={styles.icon} />
        </Typography>
        <Card>
          <CardContent>
            <span>Oops! Something went wrong.</span>
          </CardContent>
        </Card>
      </Box>
    );
  }

  if (!transactions) {
    return <LinearProgress className={styles.loader} />;
  }

  if (!transactions.length) {
    return (
      <Box className={styles.box}>
        <Typography className={styles.month} color="textPrimary">
          {monthName}
          <EventIcon className={styles.icon} />
        </Typography>
        <Card>
          <CardContent>
            <span>No transactions in {monthName}.</span>
          </CardContent>
        </Card>
      </Box>
    );
  }

  const handleDeleteTransaction = (
    id: string,
    transactionType: TransactionType
  ) => {
    setTransactions(
      transactions.filter((t: TransactionInterface) => t._id !== id)
    );
    onDeleteTransaction(id, transactionType);
  };

  return (
    <Box className={styles.box}>
      <Typography className={styles.month} color="textPrimary">
        {monthName}
        <EventIcon className={styles.icon} />
      </Typography>
      <Card>
        <CardContent>
          <TransactionsTotal transactions={transactions} />
          <List dense disablePadding>
            {transactions.map((t: TransactionInterface) => (
              <Transaction
                key={t._id}
                onDelete={() =>
                  handleDeleteTransaction(
                    t._id,
                    getTypeFromCategory(t.category)
                  )
                }
                transaction={t}
              />
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default MonthlyTransactions;
