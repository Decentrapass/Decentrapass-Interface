import React from "react";

import { HashRouter as Router, Switch, Route } from "react-router-dom";

import AppRouter from "./routers/AppRouter";
import WebRouter from "./routers/WebRouter";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/app" component={AppRouter} />
        <Route path="/" component={WebRouter} />
      </Switch>
    </Router>
  );
}
