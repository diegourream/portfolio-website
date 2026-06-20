# LexTransport

Sitio web estático multipágina para consultoría jurídica y técnica en transporte.

## Estructura

- `index.html`: inicio del sitio.
- `servicios.html`: servicios especializados.
- `valor-agregado.html`: diferenciadores y caso de éxito.
- `actualidad.html`: noticias, guías y casos.
- `contacto.html`: formulario de diagnóstico y datos de contacto.
- `assets/css/styles.css`: sistema visual, responsive y componentes.
- `assets/js/main.js`: menú móvil, navegación activa, año automático y formulario.
- `assets/img/`: imágenes locales usadas por la página.
- `tools/serve-static.mjs`: servidor estático local para validación.
- `qa/screenshots/`: capturas de verificación en escritorio y móvil.
- `lextransport_*` y `lex_logistics_elite/`: archivos generados originales conservados como referencia.

## Uso local

Abra `index.html` directamente en el navegador o levante el servidor estático incluido desde esta carpeta.

```powershell
node tools/serve-static.mjs 8000
```

Después visite `http://localhost:8000`.
