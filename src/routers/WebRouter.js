import React from "react";

import WebNav from "../components/WebNav/WebNav";
import NotFound from "../pages/NotFound/NotFound";
import Home from "../pages/Website/Home/Home";

import { Switch, Route } from "react-router-dom";
import Footer from "../components/WebFooter/Footer";

export default function WebRouter() {
  return (
    <div className="flex flex-col">
      <WebNav />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}
