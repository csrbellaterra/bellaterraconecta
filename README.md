# Bellaterra Conecta — sitio (maqueta v4)

Web estática (HTML/CSS/JS plano, sin build) de las 5 puertas de Bellaterra Conecta.

## Ver en local
Abre `index.html` en el navegador (o `python3 -m http.server` desde esta carpeta).

## Publicado con GitHub Pages
Cada `git push` a `main` actualiza automáticamente la versión publicada.

## Estructura
- `index.html` — home, imagen aérea con las 5 puertas
- `player.html`, `impact.html`, `party.html`, `hospitality.html`, `business.html` — página de cada puerta
- `vision.html`, `sostenibilidad.html` — páginas de contenido
- `doors-data.js` — única fuente de datos de las 5 puertas
- `transition.js` — animación de zoom entre home y cada puerta
- `styles.css` — estilos
- `calibrate.html` — herramienta interna para ajustar a mano los puntos sobre la imagen aérea (no está enlazada desde el sitio)
- `assets/` — fotos reales de la finca

Fotos y textos son provisionales (ver aviso en la cabecera de cada página).
