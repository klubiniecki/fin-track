import { makeStyles, createStyles } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";

const useStyles = (css: {}): ClassNameMap => makeStyles(createStyles(css))();

export default useStyles;
