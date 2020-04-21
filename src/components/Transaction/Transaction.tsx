import React, { useState } from "react";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  colors,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/DeleteTwoTone";
import TransactionCategories from "./TransactionCategories";
import { TransactionInterface } from "../../types/types";
import getDisplayDate from "../../utils/getDisplayDate";
import useStyles from "../../utils/useStyles";

interface Props {
  transaction: TransactionInterface;
  onDelete: (transactionId: string) => void;
}

const Transaction = ({ transaction, onDelete }: Props) => {
  const { _id, name, amount, category, date, type } = transaction;
  const [selected, setSelected] = useState(false);

  const getIcon = () =>
    selected ? (
      <IconButton aria-label="Delete" onClick={() => onDelete(_id)}>
        <DeleteIcon />
      </IconButton>
    ) : (
      TransactionCategories.find((c) => c.name === category)!.icon
    );

  const color =
    type === "expense"
      ? colors.blue[600]
      : type === "income"
      ? colors.green[600]
      : colors.orange[600];

  const styles = useStyles({
    item: {
      display: "flex",
      alignItems: "center",
      padding: 0,
    },
    textWrapper: {
      flexGrow: 1,
    },
    amount: {
      color,
      fontSize: 24,
      marginLeft: 15,
    },
    icon: {
      color,
      backgroundColor: "inherit",
    },
  });

  return (
    <ListItem onClick={() => setSelected(!selected)} className={styles.item}>
      <ListItemAvatar>
        <Avatar className={styles.icon}>{getIcon()}</Avatar>
      </ListItemAvatar>
      <div className={styles.textWrapper}>
        <ListItemText primary={name} secondary={getDisplayDate(date)} />
      </div>
      <div className={styles.amount}>
        <ListItemText
          primary={`$${amount}`}
          primaryTypographyProps={{ variant: "h6" }}
        />
      </div>
    </ListItem>
  );
};

export default Transaction;
