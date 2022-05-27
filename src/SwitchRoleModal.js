import React from "react";
import { useState } from "react";

import "./SwitchRoleModal.css";

export default function SwitchRoleModal({ onSave, onClose }) {
  const [selected, setSelected] = useState();
  const handleSave = () => {
    onSave(selected);
  };

  return (
    <div className="modal__backdrop">
      <div className="modal">
        <section className="modal__section modal__header text-center">
          <div className="modal__title">Choose your role:</div>
          <div className="modal__close-btn" onClick={onClose}>
            <i className="fa fa-times"></i>
          </div>
        </section>
        <section className="modal__section modal__body">
          <div
            className={
              selected === "host" ? "option option--selected" : "option"
            }
            onClick={() => setSelected("host")}
          >
            <i class="fa fa-home option__icon"></i>
            <div className="option__title">Host</div>
            <div className="option__description">
              You can add a listing by selecting this role.
            </div>
          </div>
          <div
            className={
              selected === "guest" ? "option option--selected" : "option"
            }
            onClick={() => setSelected("guest")}
          >
            <i class="fa fa-user option__icon"></i>
            <div className="option__title">Guest</div>
            <div className="option__description">
              You will not be able to add a listing with this role.
            </div>
          </div>
        </section>
        <section className="modal__section modal__footer">
          <button className="btn btn-primary right">Save</button>
        </section>
      </div>
    </div>
  );
}
