import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { AuthProvider } from "./context/AuthContext";
import client from "./apollo/client";
import "./index.css";
import App from "./App";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ApolloProvider client={client}>
    <Router>
      <AuthProvider>
        <Toaster position="top-right" />
        <App />
      </AuthProvider>
    </Router>
  </ApolloProvider>
);
