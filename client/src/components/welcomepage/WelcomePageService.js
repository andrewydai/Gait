const WHITE_SPACE_REGEX = /\s/g;
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default {
  validateEmail,
  isValidSignUpInput,
  initializeState
};

function isValidSignUpInput() {
  const validEduEmail =
    this.state.email !== null &&
    this.state.email.length > 3 &&
    this.state.email.substring(this.state.email.length - 3) === "edu";

  const validEmail =
    this.state.email !== null &&
    EMAIL_REGEX.test(String(this.state.email).toLowerCase());

  const validUserName =
    this.state.userName !== null &&
    !WHITE_SPACE_REGEX.test(this.state.userName);

  const validPassword =
    this.state.password !== null &&
    !WHITE_SPACE_REGEX.test(this.state.password);

  this.setState({
    emailNotEduError: !validEduEmail,
    emailError: !validEmail,
    userNameError: !validUserName,
    passwordError: !validPassword
  });

  return validEduEmail && validEmail && validUserName && validPassword;
}

function initializeState() {
  return {
    email: null,
    userName: null,
    password: null,
    emailNotEduError: false,
    emailError: false,
    userNameError: false,
    passwordError: false,
    isSignUp: true,
    emailValidationSent: false
  };
}

async function validateEmail() {
  console.log(JSON.stringify(this.state));
  if (this.isValidSignUpInput()) {
    this.setState({ emailValidationSent: true });
    //await fetch(URL) for validation sending
  }
}
