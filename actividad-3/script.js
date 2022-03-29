const params = new URLSearchParams(window.location.search);
console.log("as", params.get("nombre"));
document.getElementById("nombre").innerHTML = params.get("nombre");
document.getElementById("edad").innerHTML = params.get("edad");
document.getElementById("genero").innerHTML = params.get("genero");
document.getElementById("esterelizado").innerHTML =
  params.get("esterelizado");
document.getElementById("nchip").innerHTML = params.get("nchip");
document.getElementById("imagen").src =
  "images/" + params.get("imagen") + ".png";