const requests = require("./requests.js");
const express = require("express");

const app = express();
app.use(express.json());

const port = 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// POST requests

// post for signing up a new user
app.post("/user/signup", requests.userSignup);
// -post for logging in a user
app.post("/user/login", requests.userLogin);
// -post for creating your gait and adding it (start a gait)
app.post("/user/createGait", requests.userCreateGait);


// -get for grabbing closest 5 gaits based on your location and destination as well as theirs (join a gait)

