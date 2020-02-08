// a generic user
export type User = {
  username: string;
  email: string;
  password: string;
};

// a gait
export type Gait = {
  owner: string;
  startLat: string;
  startLong: string;
  endLat: string;
  endLong: string;
  users: Array<String>;
};

// a session
export type Session = {
  token: string;
  expiration: Date;
  user: string;
};
