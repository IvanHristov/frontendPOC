import React from "react";
import { Router } from "@reach/router";
import Contacts from "./contacts/ContactsOverview";

function App() {
  return (
    <Router>
      <Contacts path="/" />
    </Router>
  );
}

export default App;
