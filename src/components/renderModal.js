import ListingForm from "./ListingForm";
import SwitchRoleModal from "./SwitchRoleModal";

export default function renderModal(modal, onClose) {
  if (modal === "listing-form") {
    return <ListingForm onClose={onClose} />;
  } else if (modal === "role-switch") {
    return <SwitchRoleModal onClose={onClose} onSave={onClose} />;
  } else {
    return null;
  }
}
