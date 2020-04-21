import React from "react";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Logo from "../../static/fav.png";
import useStyles from "../../utils/useStyles";

interface Props {
  value: string;
  handleChange: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}

const Login = ({ value, handleChange }: Props) => {
  const styles = useStyles({
    card: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    },
    media: {
      height: 160,
      width: 160,
    },
    content: {
      marginTop: 30,
    },
  });

  return (
    <Card className={styles.card}>
      <CardMedia className={styles.media} image={Logo} />
      <div className={styles.content}>
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={value}
          onChange={handleChange}
        />
      </div>
    </Card>
  );
};

export default Login;
