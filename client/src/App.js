import React from "react";
import WelcomePage from "./components/welcomepage/WelcomePage";
import HomeGaitPage from "./components/homegaitpage/HomeGaitPage";
import NotificationPage from "./components/notificationpage/NotificationPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/homeGaitPage">
          <HomeGaitPage />
        </Route>
        <Route path="/notificationPage">
          <NotificationPage />
        </Route>
        <Route path="/">
          <WelcomePage />
        </Route>
      </Switch>
    </Router>
  );
};
export default App;
