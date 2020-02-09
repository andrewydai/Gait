import React from "react";
import { TextField, Grid, Button, Dialog } from "@material-ui/core";

const SignUp = ({
  changeEmailState,
  changeUserNameState,
  changePasswordState,
  validateEmail,
  emailValidationSent,
  emailNotEduError,
  emailError,
  userNameError,
  passwordError
}) => {
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
    >
      <b className="marginLabel">Sign Up</b>
      <TextField
        error={emailNotEduError || emailError}
        variant="outlined"
        label="student email"
        className="textFieldMargin"
        onChange={e => {
          changeEmailState(e.target.value);
        }}
      >
        {" "}
      </TextField>
      <TextField
        error={userNameError}
        variant="outlined"
        label="user name"
        className="textFieldMargin"
        onChange={e => {
          changeUserNameState(e.target.value);
        }}
      >
        {" "}
      </TextField>
      <TextField
        error={passwordError}
        variant="outlined"
        label="password"
        className="textFieldMargin"
        onChange={e => {
          changePasswordState(e.target.value);
        }}
      >
        {" "}
      </TextField>
      <Button
        variant="contained"
        className="welcomePageSignUp"
        onClick={validateEmail}
      >
        Sign Up
      </Button>
      {emailValidationSent && <Dialog> </Dialog>}
    </Grid>
  );
};

export default SignUp;
