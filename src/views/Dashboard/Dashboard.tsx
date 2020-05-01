import React, { useState, useCallback, useEffect } from "react";
import CategoryChart from "../../components/Charts/CategoryChart";
import DateService from "../../services/dateService";
import RequestService from "../../services/requestService";
import config from "../../config/config";
import { EXPENSE_CATEGORIES } from "../../utils/constants";
import { ExpenseInterface } from "../../types/types";
import {
  TextField,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  LinearProgress,
} from "@material-ui/core";
import useStyles from "../../utils/useStyles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import RegularChart from "../../components/Charts/RegularChart";

const Dashboard = () => {
  const { today, getMonthRange } = DateService();
  const { startDate, endDate } = getMonthRange(today);

  const [start, setStart] = useState(startDate);
  const [end, setEnd] = useState(endDate);
  const [transactions, setTransactions] = useState<null | ExpenseInterface[]>(
    null
  );
  const [error, setError] = useState(null);

  const fetchTransactions = useCallback(async () => {
    const res = await RequestService().get(
      `${config.apiUrl}/expenses?startDate=${start}&endDate=${end}`
    );
    setTransactions(res.data);
    setError(res.error);
  }, [end, start]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const styles = useStyles({
    header: {
      margin: "8px 0",
    },
    date: {
      marginRight: 10,
      marginTop: 0,
      marginBottom: 20,
      width: 140,
    },
    loader: {
      margin: "16px 0",
    },
  });

  if (error) {
    return (
      <Typography color="textPrimary" variant="h6" className={styles.header}>
        Oops! Something went wrong.
      </Typography>
    );
  }

  if (!transactions) {
    return <LinearProgress className={styles.loader} />;
  }

  const datePickers = (
    <>
      <Typography color="textPrimary" variant="h6" className={styles.header}>
        Dates:
      </Typography>
      <TextField
        id="date"
        label="Start"
        type="date"
        className={styles.date}
        onChange={(ev) => setStart(ev.target.value)}
        value={start}
        InputLabelProps={{
          shrink: true,
        }}
        margin="dense"
      />
      <TextField
        id="date"
        label="End"
        type="date"
        className={styles.date}
        onChange={(ev) => setEnd(ev.target.value)}
        value={end}
        InputLabelProps={{
          shrink: true,
        }}
        margin="dense"
      />
    </>
  );

  const expansionPanel = (title: string, component: React.ReactNode) => (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography color="textPrimary">{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>{component}</ExpansionPanelDetails>
    </ExpansionPanel>
  );

  return (
    <>
      {datePickers}
      {transactions.length ? (
        <>
          {expansionPanel(
            "Expense categories (Total)",
            <CategoryChart
              transactions={transactions}
              categories={EXPENSE_CATEGORIES}
              type="bar"
            />
          )}
          {expansionPanel(
            "Expense categories (%)",
            <CategoryChart
              transactions={transactions}
              categories={EXPENSE_CATEGORIES}
              type="pie"
            />
          )}
          {expansionPanel(
            "Expense regular (%)",
            <RegularChart transactions={transactions} />
          )}
        </>
      ) : (
        <Typography color="textPrimary">
          No transactions for selected dates.
        </Typography>
      )}
    </>
  );
};

export default Dashboard;
