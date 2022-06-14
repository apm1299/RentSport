import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export const useAuth = () => {
  const [user, setUser] = useState(null);

  const getUser = useCallback(() => {
    const token = Cookies.get("jwt_hp");
    if (token) {
      const user = parseJwt(token);
      setUser(user);
    } else {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    getUser();
    console.log(user);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getUser]);

  return {
    user,
  }
}
