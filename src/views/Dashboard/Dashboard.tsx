import React, { useState, useCallback, useEffect } from "react";
import CategoryChart from "../../components/Charts/CategoryChart";
import DateService from "../../services/dateService";
import RequestService from "../../services/requestService";
import config from "../../config/config";
import { EXPENSE_CATEGORIES } from "../../utils/constants";
import { TransactionInterface } from "../../types/types";
import {
  TextField,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  LinearProgress,
  RadioGroup,
  FormControlLabel,
  Radio,
  colors,
} from "@material-ui/core";
import useStyles from "../../utils/useStyles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import RegularChart from "../../components/Charts/RegularChart";
import Salary from "@material-ui/icons/MonetizationOnTwoTone";
import Sales from "@material-ui/icons/ShoppingBasketTwoTone";
import Saving from "@material-ui/icons/SaveTwoTone";

const Dashboard = () => {
  const { today, getMonthRange } = DateService();
  const { startDate, endDate } = getMonthRange(today);

  const [start, setStart] = useState(startDate);
  const [type, setType] = useState("expense");
  const [end, setEnd] = useState(endDate);
  const [transactions, setTransactions] = useState<
    null | TransactionInterface[]
  >(null);
  const [error, setError] = useState(null);

  const fetchTransactions = useCallback(async () => {
    const res = await RequestService().get(
      `${config.apiUrl}/${type}s?startDate=${start}&endDate=${end}`
    );
    setTransactions(res.data);
    setError(res.error);
  }, [end, start, type]);

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
      marginBottom: 8,
      width: 140,
    },
    loader: {
      margin: "16px 0",
    },
    expense: {
      marginRight: 20,
      "& *": {
        color: colors.blue[600],
      },
      "& .MuiFormControlLabel-label": {
        marginTop: 5,
      },
    },
    income: {
      marginRight: 20,
      "& *": {
        color: colors.green[600],
      },
      "& .MuiFormControlLabel-label": {
        marginTop: 5,
      },
    },
    saving: {
      marginRight: 20,
      "& *": {
        color: colors.orange[600],
      },
      "& .MuiFormControlLabel-label": {
        marginTop: 5,
      },
    },
    type: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
      marginTop: 8,
      marginBottom: 16,
    },
    list: {
      display: "flex",
      flexDirection: "column",
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

  const typeControls = (
    <RadioGroup
      name="transaction"
      value={type}
      onChange={(ev) => setType((ev.target as HTMLInputElement).value)}
      className={styles.type}
    >
      <FormControlLabel
        className={styles.expense}
        value="expense"
        control={<Radio color="primary" />}
        label={<Sales color="primary" />}
      />
      <FormControlLabel
        className={styles.income}
        value="income"
        control={<Radio color="primary" />}
        label={<Salary color="primary" />}
      />
      <FormControlLabel
        className={styles.saving}
        value="saving"
        control={<Radio color="primary" />}
        label={<Saving color="primary" />}
      />
    </RadioGroup>
  );

  const expansionPanel = (title: string, component: React.ReactNode) => (
    <ExpansionPanel>
      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
        <Typography color="textPrimary">{title}</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>{component}</ExpansionPanelDetails>
    </ExpansionPanel>
  );

  const expenseList = (transactions: TransactionInterface[]) => {
    return (
      <div className={styles.list}>
        {transactions
          .sort((a, b) => b.amount - a.amount)
          .map((t) => (
            <Typography key={t._id}>
              {t.name} (${t.amount})
            </Typography>
          ))}
      </div>
    );
  };

  const expenseDashboard = (
    <>
      {expansionPanel("List (High - Low)", expenseList(transactions))}
      {expansionPanel(
        "Categories (Total)",
        <CategoryChart
          transactions={transactions}
          categories={EXPENSE_CATEGORIES}
          type="bar"
        />
      )}
      {expansionPanel(
        "Categories (%)",
        <CategoryChart
          transactions={transactions}
          categories={EXPENSE_CATEGORIES}
          type="pie"
        />
      )}
      {expansionPanel(
        "Regular (%)",
        <RegularChart transactions={transactions} />
      )}
    </>
  );

  const savingDashboard = <div>saving dash</div>;
  const incomeDashboard = <div>income dash</div>;

  return (
    <>
      {datePickers}
      {typeControls}
      {transactions.length ? (
        type === "expense" ? (
          expenseDashboard
        ) : type === "income" ? (
          incomeDashboard
        ) : (
          savingDashboard
        )
      ) : (
        <Typography color="textPrimary">
          No transactions for selected dates.
        </Typography>
      )}
    </>
  );
};

export default Dashboard;
