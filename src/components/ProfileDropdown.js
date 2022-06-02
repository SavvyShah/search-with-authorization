import { useState } from "react";

import "./styles/ProfileDropdown.css";

export default function ProfileDropdown({ picture, username, actions }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const handleActionClick = (action, e) => {
    action.onClick(e);
    setShowDropdown(false);
  };
  return (
    <div className="profile">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="btn profile__btn"
      >
        <img className="profile__img" src={picture} alt="user profile" />
        <span className="profile__text">{username}</span>
      </button>
      {showDropdown ? (
        <div className="profile__dropdown">
          {actions.map((action) => (
            <button
              className="dropdown__item"
              onClick={(e) => handleActionClick(action, e)}
              key={action.text}
            >
              <span>{action.icon}</span>
              <span className="m-l-1">{action.text}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
