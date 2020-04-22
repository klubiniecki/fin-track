import React from "react";
import {
  BottomNavigation,
  Container,
  BottomNavigationAction,
} from "@material-ui/core";
import AccountBalanceIcon from "@material-ui/icons/PlaylistAddTwoTone";
import DateRangeIcon from "@material-ui/icons/DateRangeTwoTone";
import DashboardIcon from "@material-ui/icons/DashboardTwoTone";
import AddTransaction from "../../views/AddTransaction/AddTransaction";
import Dashboard from "../../views/Dashboard/Dashboard";
import Transactions from "../../views/Transactions/Transactions";
import useStyles from "../../utils/useStyles";

const App = () => {
  const [value, setValue] = React.useState(0);

  const renderPage = () => {
    if (value === 1) {
      return <AddTransaction />;
    } else if (value === 2) {
      return <Dashboard />;
    } else {
      return <Transactions />;
    }
  };

  const styles = useStyles({
    nav: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      boxShadow: `0 1px 10px rgba(0,0,0,.1)`,
    },
    wrapper: {
      marginTop: 70,
      marginBottom: 20,
    },
  });

  return (
    <Container maxWidth="lg">
      <div className={styles.wrapper}>{renderPage()}</div>
      <BottomNavigation
        value={value}
        onChange={(_, newValue) => setValue(newValue)}
        className={styles.nav}
        showLabels
      >
        <BottomNavigationAction icon={<DateRangeIcon />} />
        <BottomNavigationAction icon={<AccountBalanceIcon />} />
        <BottomNavigationAction icon={<DashboardIcon />} />
      </BottomNavigation>
    </Container>
  );
};

export default App;
