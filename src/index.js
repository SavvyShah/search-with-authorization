import React from "react";
import { createRoot } from "react-dom/client";
import moment from "moment";
import {
  ReactiveBase,
  SearchBox,
  NumberBox,
  DateRange,
  RangeInput,
  SelectedFilters,
} from "@appbaseio/reactivesearch";
import { ReactiveGoogleMap } from "@appbaseio/reactivemaps";
import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";

import "./App.css";
import "./Modal.css";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import ListingForm from "./ListingForm";

const App = () => {
  const { isAuthenticated, user, isLoading } = useAuth0();
  //Custom query for getting hotels within a particular range
  const dateQuery = (value) => {
    let query = null;
    if (value) {
      query = [
        {
          range: {
            date_from: {
              gte: moment(value.start).format("YYYYMMDD"),
            },
          },
        },
        {
          range: {
            date_to: {
              lte: moment(value.end).format("YYYYMMDD"),
            },
          },
        },
      ];
    }
    return query ? { query: { bool: { must: query } } } : null;
  };
  //Show a popover when we click on a map pin
  const onPopoverClick = (data) => {
    return (
      <div className="popover">
        <div className="image-container">
          <img src={data.image} alt={data.name} height="185" width="263" />
        </div>
        <div className="extra-info-container">
          <div className="type-container info">
            {data.room_type}-{data.beds} bed
          </div>
          <div className="name-container info">{data.name}</div>
          <div className="price-container info">
            ${data.price} per night-Free cancellation
          </div>
        </div>
      </div>
    );
  };
  return isLoading ? (
    "Loading"
  ) : (
    <div className="main-container">
      {/* Component that connects backend */}
      <ListingForm />
    </div>
  );
};

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
