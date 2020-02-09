import React from "react";
import "./WelcomePage.css";
import WelcomePageService from "./WelcomePageService";
import SignUp from "./SignUp";
import LogIn from "./LogIn";
import { Card, CardContent, Container, Grid, Button } from "@material-ui/core";
import { PersonAdd, ArrowForward } from "@material-ui/icons";
import RouteButton from "../util/RouteButton";

class WelcomePage extends React.Component {
  constructor() {
    super();
    for (let func in WelcomePageService)
      this[func] = WelcomePageService[func].bind(this);
    this.state = this.initializeState();
  }

  render() {
    return (
      <Container className="streetNightImage">
        <Card className="welcomePageCard" variant="outlined">
          <CardContent>
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
            >
              <b className="welcomeTitle">Welcome to Gait</b>
              {this.state.isSignUp ? (
                <SignUp
                  validateEmail={this.validateEmail}
                  changeEmailState={value => this.setState({ email: value })}
                  changeUserNameState={value =>
                    this.setState({ userName: value })
                  }
                  changePasswordState={value =>
                    this.setState({ password: value })
                  }
                  emailValidationSent
                  emailNotEduError={this.state.emailNotEduError}
                  emailError={this.state.emailError}
                  userNameError={this.state.userNameError}
                  passwordError={this.state.passwordError}
                />
              ) : (
                <LogIn />
              )}
              <b> Or </b>
              <Button
                size="small"
                startIcon={
                  this.state.isSignUp ? <ArrowForward /> : <PersonAdd />
                }
                variant="contained"
                className={
                  this.state.isSignUp ? "welcomePageLogIn" : "welcomePageSignUp"
                }
                onClick={() => {
                  this.setState(this.initializeState());
                  this.setState({ isSignUp: !this.state.isSignUp });
                }}
              >
                {this.state.isSignUp ? "Log In" : "Sign Up"}
              </Button>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    );
  }
}

export default WelcomePage;
