import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import WelcomePage from "./components/welcomepage/WelcomePage";
import HomeGaitPage from "./components/homegaitpage/HomeGaitPage";
import NotificationPage from "./components/notificationpage/NotificationPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="Size">
      <Header></Header>
      <Router className="Size">
        <Switch className="Size">
          <Route path="/homeGaitPage" className="Size">
            <HomeGaitPage />
          </Route>
          <Route path="/notificationPage" className="Size">
            <NotificationPage />
          </Route>
          <Route path="/" className="Size">
            <WelcomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};
export default App;
