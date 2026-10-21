const CLAVE = "multiverso-favoritos-v1";

export function leerFavoritos() {

  try {

    const datos = JSON.parse(
      localStorage.getItem(CLAVE) || "[]"
    );

    return Array.isArray(datos) ? datos : [];

  } catch {

    return [];

  }
}

export function esFavorito(id) {

  return leerFavoritos().some(
    personaje => personaje.id === Number(id)
  );

}

export function alternarFavorito(personaje) {

  const actuales = leerFavoritos();

  const existe = actuales.some(
    item => item.id === personaje.id
  );

  const nuevos = existe
    ? actuales.filter(item => item.id !== personaje.id)
    : [...actuales, personaje];

  try {

    localStorage.setItem(
      CLAVE,
      JSON.stringify(nuevos)
    );

  } catch {

    throw new Error(
      "No se pudieron guardar los favoritos en este navegador."
    );

  }

  return !existe;
}