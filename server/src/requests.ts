import { randomBytes } from "crypto";
import { User, Gait, Session } from "./types";
import { Request, Response } from "express";

// a fake database
const database = {
  // from username => { email: string, username: string, password: string }
  users: new Map<string, User>(),

  // from username => { owner: username, startLat, startLong, endLat, endLong }
  gaits: new Map<string, Gait>(),

  // token => { isExpired: boolean, username: string }
  sessions: new Map<string, Session>()
};

database.sessions.set("1234", {
  user: "brian",
  expiration: new Date(2500),
  token: "1234"
});
database.users.set("brian", {
  email: "byang@com",
  username: "brian",
  password: "ilovecats"
});

// the signup query
export const userSignup = (req: Request, res: Response): Response => {
  // username, password, password confirmation, email
  // put the user/username in the database
  console.log(req.body);

  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const passwordConfirmation = req.body.passwordConfirmation;

  if (username && email && password && passwordConfirmation) {
    // for now, not sanitizing inputs
    database.users.set(username, {
      username,
      email,
      password
    });

    return res.status(200).send("request received");
  } else {
    return res
      .status(400)
      .send(
        `missing one of field(s): username, email, password, passwordConfirmation`
      );
  }
};

// the create gait query
export const userCreateGait = (req: Request, res: Response): Response => {
  const { startLat, startLong, endLat, endLong, token } = req.body;
  
  if (startLat && startLong && endLat && endLong && token) {
    if (database.sessions.has(token)) {
      if (!token.isExpired) {
        // create the gait!
        // ! denotes we know it's defined, as .has passed.
        const session = database.sessions.get(token)!;
        database.gaits.set(session.user, {
          owner: session.user,
          startLat,
          startLong,
          endLat,
          endLong,
          users: []
        });
        return res
          .status(200)
          .send(
            `gait successfully created with start (${startLat}, ${startLong}) and end (${endLat}, ${endLong})`
          );
      } else {
        return res.status(400).send(`session expired. please sign in again.`);
      }
    } else {
      return res.status(400).send(`token not found`);
    }
  } else {
    return res
      .status(400)
      .send(
        `missing one of field(s): currentLat, currentLong, finalLat, finalLong, token`
      );
  }
};

// logs a user in, responds with a token if successful
export const userLogin = (req: Request, res: Response): Response => {
  const { username, password } = req.body;

  if (database.users.has(username)) {
    const user = database.users.get(username)!;
    if (user.password === password) {
      const token = randomBytes(16).toString("hex");
      database.sessions.set(token, username);
      res.set("Content-Type", "application/json");
      return res.status(200).send(JSON.stringify({ token: token }));
    } else {
      return res.status(400).send(`incorrect password`);
    }
  } else {
    return res.status(400).send(`username not valid`);
  }
};

// adds a user to an existing gait
export const joinAGait = (req: Request, res: Response): Response => {
  const token = req.body.token;
  const ownerOfGaitToJoin = req.body.owner;

  if (database.gaits.has(ownerOfGaitToJoin)) {
    const gaitToJoin = database.gaits.get(ownerOfGaitToJoin)!;

    if (database.sessions.has(token)) {
      const joiner = database.sessions.get(token)!;
      // if is a valid session, join the gait.
      gaitToJoin.users.push(joiner.user);
      return res.status(200).send(`successfully joined ${gaitToJoin.owner}'s gait as user ${joiner.user}`);
    } else {
      // otherwise, tell them invalid token.
      return res.status(400).send(`invalid token`);
    }
  } else {
    // this gait doesn't exist
    return res.status(400).send(`gait to join doesn't exist`);
  }
};