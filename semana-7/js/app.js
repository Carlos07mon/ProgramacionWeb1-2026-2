import { personajes } from "./datos.js";

import { aplicarFiltros } from "./logica.js";



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



const grilla = document.getElementById("grilla");

const contador = document.getElementById("contador");

const busqueda = document.getElementById("busqueda");

const filtroEstado = document.getElementById("filtro-estado");

const formulario = document.getElementById("form-busqueda");

const modal = document.getElementById("modal-detalle");



const filtros = {
  busqueda: "",
  estado: ""
};



const tarjetaHTML = (personaje) => {

  const estado = ESTADOS[personaje.status];

  return `
    <article class="group flex flex-col overflow-hidden rounded-2xl bg-white shadow transition hover:-translate-y-1 hover:shadow-xl dark:bg-slate-800">

      <div class="overflow-hidden">

        <img
          src="${personaje.image}"
          alt="${personaje.name}"
          class="aspect-square w-full object-cover transition group-hover:scale-105"
        >

      </div>

      <div class="flex flex-1 flex-col gap-2 p-4">

        <h3 class="text-lg font-bold text-slate-900 dark:text-white">
          ${personaje.name}
        </h3>

        <span class="w-fit rounded-full px-2.5 py-0.5 text-xs font-semibold ${estado.clases}">
          ● ${estado.texto}
        </span>

        <p class="text-sm text-slate-500 dark:text-slate-400">
          ${personaje.species} · ${personaje.origin.name}
        </p>

        <button
          type="button"
          data-id="${personaje.id}"
          class="mt-auto rounded-lg bg-indigo-600 py-2 font-semibold text-white transition hover:bg-indigo-700"
        >
          Ver detalle
        </button>

      </div>

    </article>
  `;

};



const render = () => {

  const resultados = aplicarFiltros(personajes, filtros);

  contador.textContent =
    `${resultados.length} de ${personajes.length} personajes`;


  if (resultados.length === 0) {

    grilla.innerHTML = `
      <div class="col-span-full rounded-2xl bg-white p-8 text-center shadow dark:bg-slate-800">

        <h3 class="text-xl font-bold">
          No se encontraron personajes
        </h3>

        <p class="mt-2 text-slate-500 dark:text-slate-400">
          Intenta con otro nombre o cambia el filtro.
        </p>

      </div>
    `;

    return;
  }


  grilla.innerHTML = resultados
    .map(tarjetaHTML)
    .join("");

};


busqueda.addEventListener("input", (evento) => {

  filtros.busqueda = evento.target.value;

  render();

});


filtroEstado.addEventListener("change", (evento) => {

  filtros.estado = evento.target.value;

  render();

});


formulario.addEventListener("submit", (evento) => {

  evento.preventDefault();

  filtros.busqueda = busqueda.value;

  filtros.estado = filtroEstado.value;

  render();

});


const abrirDetalle = (personaje) => {

  const {
    name,
    image,
    status,
    species,
    type,
    origin,
    location
  } = personaje;

  document.getElementById("modal-nombre").textContent = name;

  document.getElementById("modal-img").src = image;

  document.getElementById("modal-img").alt = name;

  document.getElementById("modal-estado").textContent =
    ESTADOS[status].texto;

  document.getElementById("modal-especie").textContent =
    type ? `${species} (${type})` : species;

  document.getElementById("modal-origen").textContent =
    origin.name;

  document.getElementById("modal-ubicacion").textContent =
    location.name;

  modal.showModal();

};


grilla.addEventListener("click", (evento) => {

  const boton = evento.target.closest("[data-id]");

  if (!boton || !grilla.contains(boton)) {
    return;
  }

  const id = Number(boton.dataset.id);

  const personaje = personajes.find((p) => p.id === id);

  if (personaje) {
    abrirDetalle(personaje);
  }

});


modal.addEventListener("click", (evento) => {

  if (evento.target === modal) {
    modal.close();
  }

});


const btnMenu = document.getElementById("btn-menu");

const menu = document.getElementById("menu");

btnMenu.addEventListener("click", () => {

  menu.classList.toggle("hidden");

  const abierto = !menu.classList.contains("hidden");

  btnMenu.setAttribute("aria-expanded", String(abierto));

});


render();