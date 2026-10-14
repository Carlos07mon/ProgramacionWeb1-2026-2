export const buscarPorNombre = (personajes, texto) => {

  const busqueda = texto.toLowerCase().trim();

  return personajes.filter((personaje) =>
    personaje.name.toLowerCase().includes(busqueda)
  );

};



export const filtrarPorEstado = (personajes, estado) => {

  if (estado === "") {
    return personajes;
  }

  return personajes.filter((personaje) =>
    personaje.status.toLowerCase() === estado.toLowerCase()
  );

};



export const aplicarFiltros = (personajes, filtros) => {

  const filtradosPorNombre = buscarPorNombre(
    personajes,
    filtros.busqueda
  );

  const resultado = filtrarPorEstado(
    filtradosPorNombre,
    filtros.estado
  );

  return resultado;

};