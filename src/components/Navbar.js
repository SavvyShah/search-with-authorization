import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import ListingForm from "./ListingForm";
import LoadingSpinner from "./LoadingSpinner";

import LoginButton from "./LoginButton";
import ProfileDropdown from "./ProfileDropdown";
import SwitchRoleModal from "./SwitchRoleModal";

export default function Navbar() {
  const { isAuthenticated, user, logout, isLoading } = useAuth0();
  const [modal, setModal] = useState("");
  return (
    <div className="stickyTop">
      {isLoading ? <LoadingSpinner /> : null}
      {modal === "listing-form" ? (
        <ListingForm onClose={() => setModal("")} />
      ) : null}
      {modal === "role-switch" ? (
        <SwitchRoleModal
          onClose={() => setModal("")}
          onSave={(role) => {
            setModal("");
          }}
        />
      ) : null}
      <div className="nav-container">
        <nav className="nav">
          <div className="title">Airbeds</div>
          {isAuthenticated && !isLoading ? (
            <ProfileDropdown
              picture={user.picture}
              username={user.given_name}
              actions={[
                {
                  text: "Logout",
                  icon: <i className="fa fa-sign-out"></i>,
                  onClick: () => logout({ returnTo: window.location.origin }),
                },
                {
                  text: "Change roles",
                  icon: <i className="fa fa-exchange"></i>,
                  onClick: () => setModal("role-switch"),
                },
                {
                  text: "Add listing",
                  icon: <i className="fa fa-plus"></i>,
                  onClick: () => setModal("listing-form"),
                },
              ]}
            />
          ) : (
            <LoginButton className="btn btn--primary bold uppercase" />
          )}
        </nav>
      </div>
    </div>
  );
}
