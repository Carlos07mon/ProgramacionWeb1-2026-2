const BASE = "https://rickandmortyapi.com/api/character";

export async function obtenerPersonajes({
  pagina = 1,
  nombre = "",
  estado = "",
  signal
} = {}) {

  const url = new URL(BASE);

  url.searchParams.set("page", pagina);

  if (nombre.trim()) {
    url.searchParams.set("name", nombre.trim());
  }

  if (estado) {
    url.searchParams.set("status", estado);
  }

  const respuesta = await fetch(url, { signal });

  if (respuesta.status === 404) {
    return {
      personajes: [],
      siguiente: null,
      total: 0
    };
  }

  if (!respuesta.ok) {
    throw new Error(`Error HTTP ${respuesta.status}`);
  }

  const datos = await respuesta.json();

  return {
    personajes: datos.results ?? [],
    siguiente: datos.info?.next ?? null,
    total: datos.info?.count ?? 0
  };
}