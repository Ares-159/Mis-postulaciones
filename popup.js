// popup.js: es el "cerebro" del popup. Acá escribimos las instrucciones
// que se ejecutan cuando abrís la ventanita o apretás el botón.
// Las líneas que empiezan con // son comentarios: el navegador las ignora.

// 1) Buscamos en la página los elementos que vamos a usar.
//    getElementById busca la etiqueta que tiene ese id en el HTML.
const formulario = document.getElementById("formulario");
const lista = document.getElementById("lista");

// 2) Esta función lee las postulaciones guardadas y las muestra en la lista.
//    "async" y "await" significan: "esperá a que termine esta tarea antes de seguir".
async function mostrarPostulaciones() {
  // Pedimos al navegador lo que guardamos con el nombre "postulaciones".
  const datos = await browser.storage.local.get("postulaciones");

  // Si todavía no hay nada guardado, usamos una lista vacía [].
  const postulaciones = datos.postulaciones || [];

  // Vaciamos la lista en pantalla antes de volver a llenarla.
  lista.textContent = "";

  // Por cada postulación guardada, creamos un renglón <li> y lo agregamos.
  for (const p of postulaciones) {
    const renglon = document.createElement("li");
    renglon.textContent = p.empresa + " - " + p.puesto + " (" + p.fecha + ")";
    lista.appendChild(renglon);
  }
}

// 3) Esto se ejecuta cuando enviás el formulario (al apretar "Guardar").
formulario.addEventListener("submit", async function (evento) {
  // Evita que la página se recargue sola, que es lo que hacen los formularios por defecto.
  evento.preventDefault();

  // Armamos un objeto: un "paquete" con los datos de esta postulación.
  const nueva = {
    empresa: document.getElementById("empresa").value,
    puesto: document.getElementById("puesto").value,
    link: document.getElementById("link").value,
    fecha: document.getElementById("fecha").value,
  };

  // Leemos la lista que ya estaba guardada (o una vacía si no hay nada).
  const datos = await browser.storage.local.get("postulaciones");
  const postulaciones = datos.postulaciones || [];

  // push agrega la nueva postulación al final de la lista.
  postulaciones.push(nueva);

  // Guardamos la lista completa de nuevo en el navegador.
  await browser.storage.local.set({ postulaciones: postulaciones });

  // Limpiamos el formulario y actualizamos la lista en pantalla.
  formulario.reset();
  mostrarPostulaciones();
});

// 4) Al abrir el popup, mostramos lo que ya estaba guardado.
mostrarPostulaciones();