import React from "react";
import ReactDOM from "react-dom/client";
import "./App.css";

function App() {
  return <div className="App">Hello world!</div>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
