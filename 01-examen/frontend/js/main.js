const api = "http://localhost:8000/api/";
const verifyTokenDTO = {
  token: localStorage.getItem("access"),
};
const refreshTokenDTO = {
  refresh: localStorage.getItem("refresh"),
};
const _username = localStorage.getItem("username");
window.onload = () => {
  const mensaje = document.getElementById("mensaje");
  // verificar el token de seguridad
  if (verifyTokenDTO.token != null && refreshTokenDTO.refresh != null) {
    console.log("on load");
    $.ajax({
      url: api + "token/verify/",
      type: "POST",
      data: JSON.stringify(verifyTokenDTO),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: (resp) => {
        console.log("verificando", resp);
      },
      error: (erro) => {
        if (confirm("renovar la sesión")) {
          renovarSesion();
        } else {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          localStorage.removeItem("username");
          location.href = "index.html";
        }
      },
    });
  } else {
    console.log("no existen credenciales para validar");
  }
};

const renovarSesion = () => {
  $.ajax({
    url: api + "token/refresh/",
    type: "POST",
    data: JSON.stringify(refreshTokenDTO),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: (resp) => {
      localStorage.setItem("access", resp.access);
      location.reload();
    },
    error: (erro) => {
      console.log("error,", erro.responseJSON.detail);
    },
  });
};

const sesionOff = () => {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("username");
  location.href = "index.html";
};
