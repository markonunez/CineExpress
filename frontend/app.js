const API_URL = "http://localhost:5000/api/peliculas";

let peliculas = [];
let favoritos = []; // ids de las películas marcadas como "Quiero verla"
let generoActual = "Todos";
let textoBusqueda = "";

// ── Cargar y crear películas (Fetch API) ──
async function cargarPeliculas() {
  const estadoDiv = document.getElementById("estado-carga");
  estadoDiv.textContent = "Cargando películas...";

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

    peliculas = await response.json();
    estadoDiv.textContent = "";
    renderizarCatalogo(filtrarPeliculas());
  } catch (error) {
    estadoDiv.textContent = "No se pudieron cargar las películas. Verificá que la API esté corriendo.";
    console.error(error);
  }
}

async function crearPelicula(nueva) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nueva),
  });

  if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
  return response.json();
}

// ── Filtros (género + búsqueda por título) ──
function filtrarPeliculas() {
  return peliculas
    .filter(p => generoActual === "Todos" || p.genero === generoActual)
    .filter(p => p.titulo.toLowerCase().includes(textoBusqueda.toLowerCase()));
}

// ── Renderizar catálogo (grilla de tarjetas) ──
function renderizarCatalogo(lista) {
  const grid = document.getElementById("grid-peliculas");
  grid.innerHTML = lista.map(p => `
    <article class="tarjeta-pelicula" data-id="${p.id}">
      <h3>${p.titulo}</h3>
      <p class="genero">${p.genero}</p>
      <p>Duración: ${p.duracion} min</p>
      <p>${p.copiasDisponibles > 0
        ? `Copias disponibles: ${p.copiasDisponibles}`
        : `<span class="sin-copias">Sin copias</span>`}</p>
      <button class="btn-favorito ${favoritos.includes(p.id) ? "activo" : ""}" data-id="${p.id}">
        ${favoritos.includes(p.id) ? "⭐ Favorita" : "🎬 Quiero verla"}
      </button>
    </article>
  `).join("");
}

// ── Favoritos persistidos con localStorage ──
function cargarFavoritos() {
  const guardados = localStorage.getItem("favoritos");
  favoritos = guardados ? JSON.parse(guardados) : [];
}

function guardarFavoritos() {
  localStorage.setItem("favoritos", JSON.stringify(favoritos));
}

function alternarFavorito(id) {
  if (favoritos.includes(id)) {
    favoritos = favoritos.filter(favId => favId !== id);
  } else {
    favoritos.push(id);
  }
  guardarFavoritos();
  renderizarCatalogo(filtrarPeliculas());
}

// ── Eventos ──
document.addEventListener("DOMContentLoaded", () => {
  cargarFavoritos();
  cargarPeliculas();

  // Delegación de eventos: un solo listener para todos los botones de favorito
  document.getElementById("grid-peliculas").addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-favorito")) {
      const id = Number(event.target.dataset.id);
      alternarFavorito(id);
    }
  });

  // Extra: filtro por género (delegación en la lista del aside)
  document.getElementById("lista-generos").addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-genero")) {
      generoActual = event.target.dataset.genero;

      document.querySelectorAll(".btn-genero").forEach(boton => boton.classList.remove("activo"));
      event.target.classList.add("activo");

      renderizarCatalogo(filtrarPeliculas());
    }
  });

  // Extra: buscador por título
  document.getElementById("input-busqueda").addEventListener("input", (event) => {
    textoBusqueda = event.target.value;
    renderizarCatalogo(filtrarPeliculas());
  });

  // Formulario para agregar película
  document.getElementById("form-pelicula").addEventListener("submit", async (event) => {
    event.preventDefault();

    const nuevaPelicula = {
      titulo: document.getElementById("input-titulo").value.trim(),
      genero: document.getElementById("input-genero").value,
      duracion: parseInt(document.getElementById("input-duracion").value),
      copiasDisponibles: parseInt(document.getElementById("input-copias").value),
    };

    try {
      await crearPelicula(nuevaPelicula);
      event.target.reset();
      await cargarPeliculas(); // volvemos a pedir el catálogo completo a la API
    } catch (error) {
      document.getElementById("estado-carga").textContent = "No se pudo agregar la película.";
      console.error("Error al agregar la película:", error);
    }
  });
});
