import React from "react";

import WebNav from "../components/WebNav/WebNav";
import NotFound from "../pages/NotFound/NotFound";
import Home from "../pages/Website/Home/Home";

import { Switch, Route } from "react-router-dom";

export default function WebRouter() {
  return (
    <>
      <WebNav />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </>
  );
}
