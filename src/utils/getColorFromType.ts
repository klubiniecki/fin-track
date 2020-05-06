import { TransactionType } from "../types/types";
import { colors } from "@material-ui/core";

const getColorFromType = (type: TransactionType) =>
  type === "expense"
    ? colors.blue[600]
    : type === "income"
    ? colors.green[600]
    : colors.orange[600];

export default getColorFromType;
