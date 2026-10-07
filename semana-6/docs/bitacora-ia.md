# Bitácora de IA - MultiversoExplorer

## 2026-10-07 - Modal de detalle

**Herramienta:** ChatGPT

**Spec que usé:**
Crear un modal de detalle para los personajes de la API de Rick and Morty. El modal debe utilizar la etiqueta `<dialog>` y abrirse al presionar el botón "Ver detalle". Debe mostrar información del personaje seleccionado y permitir cerrarse mediante un botón, la tecla Esc o haciendo clic en el fondo del modal. El foco debe permanecer dentro del modal mientras esté abierto.

**Auditoría contra la spec:**
- [x] Utiliza `<dialog>` y `showModal()`.
- [x] Se abre al presionar "Ver detalle".
- [x] Se puede cerrar con la tecla Esc.
- [x] Se puede cerrar mediante el botón Cerrar.
- [x] Se cierra haciendo clic en el fondo.
- [x] Se comprobó su funcionamiento desde el navegador.

**Clases o sintaxis inventadas que encontré:**
- No encontré clases inventadas durante la revisión.
- Las clases utilizadas fueron reconocidas correctamente por Tailwind CSS.

**Qué no entendí y cómo lo resolví:**
- No entendía completamente cómo funcionaba `<dialog>`. Revisé el comportamiento en el navegador y comprobé que `showModal()` permite abrirlo como una ventana modal.
- También comprobé manualmente el cierre con Esc y haciendo clic fuera del contenido.

**¿Puedo explicar cada línea?:** Sí.


## 2026-10-07 - Dark Mode

**Herramienta:** ChatGPT

**Spec que usé:**
Agregar modo oscuro a los componentes de MultiversoExplorer utilizando las variantes `dark:` de Tailwind CSS. El fondo, textos, tarjetas, formulario, select, bordes y modal deben adaptarse correctamente al esquema de color oscuro sin dejar elementos ilegibles.

**Auditoría contra la spec:**
- [x] El body cambia correctamente entre modo claro y oscuro.
- [x] Las tarjetas tienen estilos para modo oscuro.
- [x] Los textos siguen siendo legibles.
- [x] El formulario y el select se adaptan al modo oscuro.
- [x] Los bordes se visualizan correctamente.
- [x] El modal se visualiza correctamente en modo oscuro.
- [x] Se probó `prefers-color-scheme: dark` desde DevTools.

**Clases o sintaxis inventadas que encontré:**
- No encontré clases inventadas.
- Se comprobaron variantes como `dark:bg-slate-900` y `dark:text-slate-100`.

**Qué no entendí y cómo lo resolví:**
- Al principio no entendía por qué `bg-red-500` no cambiaba el fondo durante la prueba de Tailwind. Revisé las clases y descubrí que `dark:bg-slate-900` estaba teniendo efecto porque el navegador estaba utilizando el esquema de color oscuro.
- Utilicé DevTools para emular `prefers-color-scheme: light` y `prefers-color-scheme: dark` y comprobar ambos modos.

**¿Puedo explicar cada línea?:** puede ser