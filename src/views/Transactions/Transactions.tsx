import React, { useState } from "react";
import { Snackbar, Box, Button } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { TransactionType } from "../../types/types";
import config from "../../config/config";
import RequestService from "../../services/requestService";
import MonthlyTransactions from "../../components/MonthlyTransactions/MonthlyTransactions";
import DateService from "../../services/dateService";

const Transactions = () => {
  const { today, getMonthRange, getMonth } = DateService();
  const { startDate, endDate } = getMonthRange(today);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [dates, setDates] = useState([{ startDate, endDate }]);

  const onDeleteTransaction = (
    id: string,
    transactionType: TransactionType
  ) => {
    setIsConfirmationOpen(true);
    RequestService().remove(`${config.apiUrl}/${transactionType}s/${id}`);
  };

  const loadMore = () =>
    setDates(dates.concat(getMonthRange(today, dates.length)));

  return (
    <Box>
      {dates.map(({ startDate, endDate }) => (
        <MonthlyTransactions
          key={startDate}
          startDate={startDate}
          endDate={endDate}
          monthName={getMonth(startDate)}
          onDeleteTransaction={onDeleteTransaction}
        />
      ))}
      <Button variant="outlined" fullWidth onClick={() => loadMore()}>
        Previous month
      </Button>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={isConfirmationOpen}
        autoHideDuration={1000}
        onClose={() => setIsConfirmationOpen(false)}
      >
        <Alert elevation={6} variant="filled" severity="success">
          BANG! Removed :-)
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Transactions;
