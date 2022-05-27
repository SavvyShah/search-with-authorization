import React from "react";

import "./Modal.css";
import "./SwitchRoleModal.css";

export default function SwitchRoleModal() {
  return (
    <div className="modal__backdrop">
      <div className="modal">
        <section className="modal__section modal__header">
          Choose your role:
        </section>
        <section className="modal__section modal__body">
          <div className="option">
            <div className="option__icon">
              <i class="fa fa-home"></i>
            </div>
          </div>
        </section>
        <section className="modal__section modal__footer">
          <button className="button-primary">Save</button>
        </section>
      </div>
    </div>
  );
}
