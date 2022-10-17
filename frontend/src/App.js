import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Expenses from "./components/Expenses";
import Income from "./components/Income";
import Categories from "./components/Categories";
import Navigationbar from "./components/Navigationbar";
import Home from "./components/Home";

import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navigationbar />

        <Switch>
          <Route path="/home">
            <Home />
          </Route>

          <Route path="/income">
            <Income />
          </Route>

          <Route path="/expenses">
            <Expenses />
          </Route>

          <Route path="/categories">
            <Categories />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </>
  );
}

export default App;
