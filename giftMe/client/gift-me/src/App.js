import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import ApplicationViews from "./components/ApplicationView";
import { UserProvider } from "./providers/UserProviders";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
        <Header />
          <ApplicationViews />
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
