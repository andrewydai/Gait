import React from "react";
import { TextField, Grid, Button } from "@material-ui/core";

const LogIn = () => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <b className="marginLabel">Log In</b>
      <TextField
        variant="outlined"
        label="username"
        className="textFieldMargin"
      >
        {" "}
      </TextField>
      <TextField
        variant="outlined"
        label="password"
        className="textFieldMargin"
      >
        {" "}
      </TextField>
      <Button variant="contained" className="welcomePageLogIn">
        Log In
      </Button>
    </Grid>
  );
};

export default LogIn;
