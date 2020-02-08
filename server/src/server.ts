import { userSignup, userLogin, userCreateGait } from "./requests.js";
import express from "express";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.json());

const port = 5000;

// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

// POST requests

// post for signing up a new user
app.post("/user/signup", userSignup);
// -post for logging in a user
app.post("/user/login", userLogin);
// -post for creating your gait and adding it (start a gait)
app.post("/user/createGait", userCreateGait);

// -get for grabbing closest 5 gaits based on your location and destination as well as theirs (join a gait)
