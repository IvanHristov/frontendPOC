import React from "react";
import { Router } from "@reach/router";
import Contacts from "./Contacts";

function App() {
  console.log("here");
  return (
    <Router>
      <Contacts path="/" />
    </Router>
  );
}

export default App;
