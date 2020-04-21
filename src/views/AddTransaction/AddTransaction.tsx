import React, { FormEvent, useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Snackbar,
  SnackbarContent,
  Switch,
  TextField,
  colors,
} from "@material-ui/core";
import { TransactionCategory } from "../../types/types";
import TransactionCategories from "../../components/Transaction/TransactionCategories";
import Salary from "@material-ui/icons/MonetizationOnTwoTone";
import Sales from "@material-ui/icons/ShoppingBasketTwoTone";
import Saving from "@material-ui/icons/SaveTwoTone";
import RequestService from "../../services/requestService";
import config from "../../config/config";
import useStyles from "../../utils/useStyles";
import DateService from "../../services/dateService";

type Ev = React.ChangeEvent<HTMLInputElement>;
const { today, formatted } = DateService();

const AddTransaction = () => {
  const [transaction, setTransaction] = useState({
    type: "expense",
    name: "",
    amount: "",
    category: "",
    date: formatted(today),
    regular: false,
  });
  const [confirmationMessage, setConfirmationMessage] = useState("");

  const { type, name, amount, category, date, regular } = transaction;

  const color =
    type === "expense"
      ? colors.blue[600]
      : type === "income"
      ? colors.green[600]
      : colors.orange[600];

  const styles = useStyles({
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
    form: {
      display: "flex",
      flexDirection: "column",
      paddingTop: 30,
    },
    button: {
      backgroundColor: color,
    },
    type: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
    },
    date: {
      margin: "20px 0",
    },
    regular: {
      marginBottom: 30,
    },
    success: {
      backgroundColor: "#43a047",
    },
  });

  const handleTypeChange = (ev: React.ChangeEvent<unknown>) =>
    setTransaction({
      ...transaction,
      type: (ev.target as HTMLInputElement).value,
      regular: (ev.target as HTMLInputElement).value !== "expense",
    });

  const handleNameChange = (ev: Ev) =>
    setTransaction({
      ...transaction,
      name: ev.target.value,
    });

  const handleAmountChange = (ev: Ev) =>
    setTransaction({
      ...transaction,
      amount: ev.target.value,
    });

  const handleCategoryChange = (
    ev: React.ChangeEvent<{ name?: string; value: unknown }>
  ) =>
    setTransaction({
      ...transaction,
      category: ev.target.value as TransactionCategory,
    });

  const handleDateChange = (ev: Ev) =>
    setTransaction({
      ...transaction,
      date: ev.target.value,
    });

  const handleRegularChange = (ev: Ev) =>
    setTransaction({
      ...transaction,
      regular: ev.target.checked,
    });

  const handleOnSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    RequestService().post(`${config.apiUrl}/${transaction.type}s`, transaction);
    handlePostSubmit();
  };

  const handlePostSubmit = () => {
    setConfirmationMessage(`${transaction.name} added!`);
    setTimeout(() => {
      setTransaction({
        type: "expense",
        name: "",
        amount: "",
        category: "",
        date: formatted(today),
        regular: false,
      });
    }, 1000);
  };

  return (
    <form onSubmit={handleOnSubmit} className={styles.form}>
      <FormControl component="fieldset">
        <RadioGroup
          name="transaction"
          value={type}
          onChange={handleTypeChange}
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
      </FormControl>
      <TextField
        label="Name"
        placeholder="Name"
        margin="dense"
        onChange={handleNameChange}
        value={name}
        required
      />
      <TextField
        label="Amount"
        placeholder="Amount"
        margin="dense"
        type="number"
        onChange={handleAmountChange}
        value={amount}
        required
      />
      <FormControl required>
        <InputLabel htmlFor="category" placeholder="Category">
          Category
        </InputLabel>
        <Select
          value={category}
          onChange={handleCategoryChange}
          inputProps={{ id: "category" }}
          margin="dense"
        >
          {type === "expense" &&
            TransactionCategories.filter((t) => t.type === "expense").map(
              ({ name }, i) => (
                <MenuItem key={i} value={name}>
                  {name}
                </MenuItem>
              )
            )}
          {type === "income" &&
            TransactionCategories.filter((t) => t.type === "income").map(
              ({ name }, i) => {
                return (
                  <MenuItem key={i} value={name}>
                    {name}
                  </MenuItem>
                );
              }
            )}
          {type === "saving" &&
            TransactionCategories.filter((t) => t.type === "saving").map(
              ({ name }, i) => {
                return (
                  <MenuItem key={i} value={name}>
                    {name}
                  </MenuItem>
                );
              }
            )}
        </Select>
      </FormControl>
      <TextField
        id="date"
        label="Date"
        type="date"
        required
        className={styles.date}
        onChange={handleDateChange}
        value={date}
        InputLabelProps={{
          shrink: true,
        }}
        margin="dense"
      />
      <FormControlLabel
        control={
          <Switch
            checked={regular}
            onChange={handleRegularChange}
            value="checkedA"
            inputProps={{ "aria-label": "secondary checkbox" }}
            color="primary"
          />
        }
        className={styles.regular}
        label="Regular"
      />
      <Button
        variant="contained"
        color="primary"
        className={styles.button}
        type="submit"
        size="large"
      >
        Add
      </Button>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        open={!!confirmationMessage}
        autoHideDuration={2000}
        onClose={() => setConfirmationMessage("")}
      >
        <SnackbarContent
          message={confirmationMessage}
          className={styles.success}
        />
      </Snackbar>
    </form>
  );
};

export default AddTransaction;
