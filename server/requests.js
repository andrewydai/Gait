const crypto = require('crypto');


// a fake database
const database = {
  // from username => { email: string, username: string, password: string }
  users: new Map(),

  // from username => { startLat, startLong, endLat, endLong }
  gaits: new Map(),

  // token => { isExpired: boolean, username: string }
  sessions: new Map()
};

database.sessions.set("1234", "brian");
database.users.set("brian", {email: "byang@com", username: "brian", password: "ilovecats"});

// the signup query
exports.userSignup = (req, res) => {

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

    res.status(200).send("request received");
  } else {
    res.status(400).send(`missing one of field(s): username, email, password, passwordConfirmation`);
  }
}

// the create gait query
exports.userCreateGait = (req, res) => {
  const { startLat, startLong, endLat, endLong, token } = req.body;

  if (startLat && startLong && endLat && endLong && token) {
    if (database.sessions.has(token)) {
      if (!token.isExpired) {
        // create the gait!
        database.gaits.set(database.sessions.get(token), {
          startLat,
          startLong,
          endLat,
          endLong
        });
        res.status(200).send(`gait successfully created with start (${startLat}, ${startLong}) and end (${endLat}, ${endLong})`);
      } else {
        res.status(400).send(`session expired. please sign in again.`);
      }
    } else {
      res.status(400).send(`token not found`);
    }
  } else {
    res.status(400).send(`missing one of field(s): currentLat, currentLong, finalLat, finalLong, token`);
  }
}

// logs a user in, responds with a token if successful
exports.userLogin = (req, res) => {
  const { username, password } = req.body;

  if (database.users.has(username)) {
    if (database.users.get(username).password === password) {
      const token = crypto.randomBytes(16).toString('hex');
      database.sessions.set(token, username);
      res.set('Content-Type', 'application/json');
      res.status(200).send(JSON.stringify({token: token}));
    } else {
      res.status(400).send(`incorrect password`);
    }
  } else {
    res.status(400).send(`username not valid`)
  }
}