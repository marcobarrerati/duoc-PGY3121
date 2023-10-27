/**
 * Validar el formato de un RUT
 * @param {*} rut
 * @returns
 */
function validaFormatoRut(rut) {
  const expreg = /^([0-9]{7,8}[0-9kK])$/;
  return expreg.test(rut);
}
/**
 * Limpiar un RUT, eliminar puntos y guión
 * @param {*} rut
 * @returns
 */
function limpiaRut(rut) {
  return rut.length > 0 ? rut.replace(/[^0-9kK]/gi, "") : 0;
}
/**
 * Validar un RUT
 * @param {*} rut
 * @returns
 */
function validarRut(rut) {
  console.log("rut", rut);
  var estado = false;
  rut = limpiaRut(rut);
  if (validaFormatoRut(rut)) {
    var rut_in = rut.substring(0, rut.length - 1);
    var dv_in = rut.substring(rut.length - 1);
    var rut_full = rut_in;
    var sumatoria = 0;
    var multiplicador = 2;
    var indice = 0;
    for (var i = rut_full.length - 1; i >= 0; i--) {
      if (multiplicador == 8) multiplicador = 2;
      indice = parseInt(rut_full.charAt(i));
      sumatoria = sumatoria + indice * multiplicador;
      multiplicador++;
    }
    var dv = 11 - (sumatoria % 11);
    switch (dv) {
      case 10:
        dv = "k";
        break;
      case 11:
        dv = "0";
        break;
    }
    dv = "" + dv + "";
    if (dv_in == "K") {
      dv_in = "k";
    }
    estado = dv == dv_in;
  }
  return estado;
}
