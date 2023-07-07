import axios from "axios";

export const checkUserAuthentication = async () => {
  const token = localStorage.getItem("token");

  // Verificar si el token existe y está válido
  if (token) {
    // Aquí puedes realizar la verificación del token en tu backend utilizando una ruta dedicada
    // o una función de verificación en el servidor, dependiendo de tu implementación específica

    // Ejemplo de verificación de token utilizando una llamada al backend con Axios
    axios
      .get("https://backend-rifa.onrender.com//users/check-auth", {
        headers: { token },
      })
      .then((response) => {
        console.log(response);
        return true;
      })
      .catch(() => {
        // El token es inválido o ha expirado, el usuario no está autenticado
        return false;
      });
  }

  // Si no se encuentra un token o la verificación del token falla, el usuario no está autenticado
  return false;
};
