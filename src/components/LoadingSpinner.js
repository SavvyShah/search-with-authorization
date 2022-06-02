import React from "react";

import "./styles/LoadingSpinner.css";

export default function LoadingSpinner() {
  return (
    <div className="loading">
      <i className="fa fa-spinner loading__icon"></i>
    </div>
  );
}
