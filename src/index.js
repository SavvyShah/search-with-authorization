import React from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";

import App from "./components/App";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Auth0Provider
    domain="dev-3l5njdlu.us.auth0.com"
    clientId="nCKDwUh12blYXCmJwcwH8oy7ZTgHw7LN"
    redirectUri={window.location.origin}
  >
    <App />
  </Auth0Provider>
);
