import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Table from "./containers/table/table";
import Resume from "./containers/resume/resume";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/resume" component={Resume} />
        <Route path="/" component={Table} />
      </Switch>
    </Router>
  );
}

export default App;
