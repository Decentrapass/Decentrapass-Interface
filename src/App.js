import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AppRouter from "./routers/AppRouter";
import WebRouter from "./routers/WebRouter";

export default function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/app">
            <AppRouter />
          </Route>
          <Route>
            <WebRouter />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
