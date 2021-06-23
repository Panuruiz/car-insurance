// Obtiene la diferencia de años
export function obtenerDiferenciaYear(year) {
  return new Date().getFullYear() - year;
}

// Calcula el total a pagar segun la marca
export function calcularBrand(brand) {
  let incremento;

  switch (brand) {
    case "european":
      incremento = 1.3;
      break;
    case "american":
      incremento = 1.15;
      break;
    case "asian":
      incremento = 1.05;
      break;

    default:
      break;
  }

  return incremento;
}

// Calcula el tipo de seguro
export function obtenerPlan(plan) {
  return (plan === "basic") ? 1.2 : 1.5;
}

// Muestra la primera letra mayúscula
export function primeraMayuscula(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1);
}
