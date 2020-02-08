import React from "react";
import RouteButton from "./components/RouteButton.js";
import WelcomeScreen from "./components/WelcomeScreen.js";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <RouteButton path="home" label="Home" />
            </li>
            <li>
              <RouteButton path="about" label="About" />
            </li>
            <li>
              <RouteButton path="users" label="Users" />
            </li>
            <li>
              <RouteButton path="welcomeScreen" label="Welcome Screen" />
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/welcomeScreen">
            <WelcomeScreen />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

function Home() {
  return <h2> Home </h2>;
}

function About() {
  return <h2> About </h2>;
}
function Users() {
  return <h2> Users </h2>;
}

export default App;
