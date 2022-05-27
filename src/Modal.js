import React from "react";

import "./Modal.css";

export default function Modal({ header, body, footer }) {
  return (
    <div className="modal__backdrop">
      <div className="modal">
        <section className="modal__section modal__header">{header}</section>
        <section className="modal__section modal__body">{body}</section>
        <section className="modal__section modal__footer">{footer}</section>
      </div>
    </div>
  );
}
