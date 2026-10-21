import { obtenerPersonajes } from "./api.js";

import {
  leerFavoritos,
  esFavorito,
  alternarFavorito
} from "./favoritos.js";


const grilla = document.getElementById("grilla");
const contador = document.getElementById("contador");
const busqueda = document.getElementById("busqueda");
const filtroEstado = document.getElementById("filtro-estado");
const formulario = document.getElementById("form-busqueda");
const modal = document.getElementById("modal-detalle");

const btnMas = document.getElementById("btn-mas");
const btnPersonajes = document.getElementById("nav-personajes");
const btnFavoritos = document.getElementById("nav-favoritos");

const titulo = document.getElementById("titulo-vista");
const aviso = document.getElementById("aviso");
const btnReintentar = document.getElementById("btn-reintentar");


const ESTADOS = {

  Alive: {
    texto: "Vivo",
    clases: "bg-emerald-100 text-emerald-700"
  },

  Dead: {
    texto: "Muerto",
    clases: "bg-rose-100 text-rose-700"
  },

  unknown: {
    texto: "Desconocido",
    clases: "bg-slate-200 text-slate-600"
  }

};


let personajes = [];
let siguientePagina = null;
let pagina = 1;
let total = 0;

let vista = "personajes";
let cargando = false;

let controlador = null;
let version = 0;

let filtros = {
  nombre: "",
  estado: ""
};


function escapar(valor) {

  return String(valor ?? "").replace(
    /[&<>"']/g,
    caracter => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[caracter]
  );

}


function tarjetaHTML(personaje) {

  const estado = ESTADOS[personaje.status] || ESTADOS.unknown;

  const favorito = esFavorito(personaje.id);

  return `
    <article class="group flex flex-col overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-1 hover:shadow-xl dark:bg-slate-800">

      <img
        src="${escapar(personaje.image)}"
        alt="${escapar(personaje.name)}"
        loading="lazy"
        class="aspect-square w-full object-cover"
      >

      <div class="flex flex-1 flex-col gap-2 p-4">

        <h3 class="text-lg font-bold text-slate-900 dark:text-white">
          ${escapar(personaje.name)}
        </h3>

        <span class="w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold ${estado.clases}">
          ● ${estado.texto}
        </span>

        <p class="text-sm text-slate-500 dark:text-slate-400">
          ${escapar(personaje.species)} ·
          ${escapar(personaje.origin?.name || "Desconocido")}
        </p>

        <div class="mt-auto flex gap-2 pt-2">

          <button
            type="button"
            data-detalle="${personaje.id}"
            class="flex-1 rounded-lg bg-indigo-600 px-2 py-2 font-semibold text-white hover:bg-indigo-700"
          >
            Ver detalle
          </button>

          <button
            type="button"
            data-favorito="${personaje.id}"
            aria-label="${favorito ? "Quitar de" : "Agregar a"} favoritos"
            aria-pressed="${favorito}"
            class="rounded-lg border border-amber-400 px-3 py-2 text-xl text-amber-500"
          >
            ${favorito ? "★" : "☆"}
          </button>

        </div>

      </div>

    </article>
  `;

}


function mostrarAviso(mensaje = "", error = false) {

  aviso.textContent = mensaje;

  aviso.classList.toggle("hidden", !mensaje);

  aviso.classList.toggle("text-rose-600", error);

  btnReintentar.classList.toggle("hidden", !error);

}


function listaVisible() {

  if (vista === "personajes") {
    return personajes;
  }

  return leerFavoritos().filter(personaje =>

    personaje.name.toLowerCase().includes(
      filtros.nombre.toLowerCase()
    )

    &&

    (
      !filtros.estado ||
      personaje.status.toLowerCase() === filtros.estado
    )

  );

}


function render() {

  const lista = listaVisible();

  contador.textContent = vista === "personajes"

    ? `${lista.length} de ${total} personajes encontrados`

    : `${lista.length} favoritos`;


  grilla.innerHTML = lista.length

    ? lista.map(tarjetaHTML).join("")

    : (!cargando

      ? `
        <div class="col-span-full rounded-2xl bg-white p-8 text-center shadow dark:bg-slate-800">

          ${
            vista === "favoritos"
              ? "No tienes favoritos que coincidan."
              : "No se encontraron personajes."
          }

        </div>
      `

      : "");


  btnMas.classList.toggle(
    "hidden",
    vista !== "personajes" || !siguientePagina || cargando
  );

}


async function cargar({ reiniciar = false } = {}) {

  if (vista !== "personajes") return;

  if (reiniciar) {

    version++;

    controlador?.abort();

    personajes = [];

    pagina = 1;

    siguientePagina = null;

    total = 0;

  } else if (cargando || !siguientePagina) {

    return;

  }


  const miVersion = version;

  controlador = new AbortController();

  cargando = true;

  btnMas.disabled = true;


  mostrarAviso(
    reiniciar
      ? "Cargando personajes..."
      : "Cargando más personajes..."
  );


  if (reiniciar) {
    grilla.innerHTML = "";
  }


  try {

    const resultado = await obtenerPersonajes({

      pagina,

      ...filtros,

      signal: controlador.signal

    });


    if (
      miVersion !== version ||
      vista !== "personajes"
    ) {
      return;
    }


    personajes = [
      ...personajes,
      ...resultado.personajes
    ];

    total = resultado.total;

    siguientePagina = resultado.siguiente;

    if (siguientePagina) {
      pagina++;
    }

    mostrarAviso();


  } catch (error) {

    if (
      error.name !== "AbortError" &&
      miVersion === version
    ) {

      mostrarAviso(
        "No se pudieron cargar los personajes. Revisa tu conexión e intenta de nuevo.",
        true
      );

    }

  } finally {

    if (miVersion === version) {

      cargando = false;

      btnMas.disabled = false;

      render();

    }

  }

}


function cambiarVista(nuevaVista) {

  if (vista !== nuevaVista) {

    version++;

    controlador?.abort();

    cargando = false;

  }


  vista = nuevaVista;


  titulo.textContent = vista === "favoritos"

    ? "Mis personajes favoritos"

    : "Personajes de Rick and Morty";


  btnPersonajes.classList.toggle(
    "font-bold",
    vista === "personajes"
  );

  btnFavoritos.classList.toggle(
    "font-bold",
    vista === "favoritos"
  );


  mostrarAviso();


  if (
    vista === "personajes" &&
    personajes.length === 0
  ) {

    cargar({ reiniciar: true });

  } else {

    render();

  }

}


function abrirDetalle(personaje) {

  document.getElementById("modal-nombre").textContent =
    personaje.name;

  document.getElementById("modal-img").src =
    personaje.image;

  document.getElementById("modal-img").alt =
    personaje.name;

  document.getElementById("modal-estado").textContent =
    (ESTADOS[personaje.status] || ESTADOS.unknown).texto;

  document.getElementById("modal-especie").textContent =
    personaje.type
      ? `${personaje.species} (${personaje.type})`
      : personaje.species;

  document.getElementById("modal-origen").textContent =
    personaje.origin?.name || "Desconocido";

  document.getElementById("modal-ubicacion").textContent =
    personaje.location?.name || "Desconocido";

  modal.showModal();

}


formulario.addEventListener("submit", evento => {

  evento.preventDefault();

  filtros = {

    nombre: busqueda.value.trim(),

    estado: filtroEstado.value

  };


  if (vista === "favoritos") {

    render();

  } else {

    cargar({ reiniciar: true });

  }

});


let temporizador;


busqueda.addEventListener("input", () => {

  clearTimeout(temporizador);

  temporizador = setTimeout(
    () => formulario.requestSubmit(),
    400
  );

});


filtroEstado.addEventListener("change", () => {

  formulario.requestSubmit();

});


btnMas.addEventListener("click", () => {

  cargar();

});


btnReintentar.addEventListener("click", () => {

  cargar({
    reiniciar: personajes.length === 0
  });

});


btnPersonajes.addEventListener("click", evento => {

  evento.preventDefault();

  cambiarVista("personajes");

});


btnFavoritos.addEventListener("click", evento => {

  evento.preventDefault();

  cambiarVista("favoritos");

});


grilla.addEventListener("click", evento => {

  const detalle = evento.target.closest("[data-detalle]");

  const favorito = evento.target.closest("[data-favorito]");

  if (!detalle && !favorito) return;


  const id = Number(

    (detalle || favorito).dataset[
      detalle ? "detalle" : "favorito"
    ]

  );


  const personaje = (

    vista === "favoritos"
      ? leerFavoritos()
      : personajes

  ).find(personaje => personaje.id === id);


  if (!personaje) return;


  if (detalle) {

    abrirDetalle(personaje);

  } else {

    try {

      alternarFavorito(personaje);

      mostrarAviso();

      render();

    } catch (error) {

      mostrarAviso(error.message, true);

    }

  }

});


modal.addEventListener("click", evento => {

  if (evento.target === modal) {
    modal.close();
  }

});


const btnMenu = document.getElementById("btn-menu");

const menu = document.getElementById("menu");


btnMenu.addEventListener("click", () => {

  menu.classList.toggle("hidden");

  btnMenu.setAttribute(
    "aria-expanded",
    String(!menu.classList.contains("hidden"))
  );

});


cargar({ reiniciar: true });