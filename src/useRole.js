import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";

export default function useRole() {
  const { user, isAuthenticated } = useAuth0();
  const [role, setRole] = useState(null);
  useEffect(() => {
    (async function () {
      if (isAuthenticated) {
        const res = await fetch("/.netlify/functions/getRole", {
          method: "POST",
          body: JSON.stringify({
            user_id: user.sub,
          }),
        });
        const data = await res.json();
        setRole(data);
      }
    })();
  }, [isAuthenticated, user]);

  return role;
}
