import React, { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  setUser: () => {},
  setToken: () => {}
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(Cookies.get("jwt_hp"));
  }, []);

  useEffect(() => {
    const getUser = async () => {
        await setIsLoading(true);
        if (token) {
            const user = parseJwt(token);
            setUser(user);
        } else {
            setUser(null);
        }
        await setIsLoading(false);
    };
    getUser();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        setUser,
        setToken
      }}
    >
        {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export function parseJwt(token) {
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
