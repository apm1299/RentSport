import { useContext } from "react";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "@sweetalert2/theme-material-ui/material-ui.scss";
import { AuthContext } from "../provider/AuthProvider";

export const userLogout = async () => {
  const headers = new Headers();
  headers.set('Content-type', 'application/ld+json');

  return await fetch(`http://localhost:8000/api/auth/logout`, {
      method: 'POST',
      headers,
      credentials: 'include'
  });
}

export const useAuth = () => {
  const { user, isLoading, isAuthenticated, setUser, setToken } = useContext(AuthContext);

  const logout = async () => {
    const response = await userLogout();
    
    if (response.status === 200) {
       setUser(undefined);
        return;
    }

    const error = await response.json();
}

  const validatePassword = (callBack) => {
    Swal.fire({
      title: "Introduce tu contraseña actual",
      input: "password",
      inputAttributes: {
        autocapitalize: "off",
        name: "currentPassword",
        autoComplete: "off",
      },
      showCancelButton: true,
      confirmButtonText: "Enviar",
      showLoaderOnConfirm: true,
      preConfirm: (currentPassword) => {
        return fetch("http://localhost:8000/api/auth/validate/password", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/merge-patch+json",
          },
          credentials: "include",
          body: JSON.stringify({
            password: currentPassword,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(response.statusText);
            }
            return response.json();
          })
          .catch((error) => {
            Swal.showValidationMessage(`Contraseña incorrecta.`);
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      console.log(result);
      if (result.isConfirmed) {
        callBack();
      } else {
        Swal.showValidationMessage(`Request failed`);
      }
    });
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    validatePassword,
    setUser,
    setToken,
    logout
  };
};