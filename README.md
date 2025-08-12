
##  Secciones

- **Hero:** fondo GIF, typing para el nombre, botón **Resume** (descarga PDF).
- **About + Showcase:** texto con gradiente, título `About Me` con typing **on-scroll**, carrusel CSS-only con crossfade.
- **Projects:** filtros por tipo, tarjetas con tilt/hover y **Case Study modal** (contenido cargado desde JS).
- **Experience:** timeline alterno con animación de aparición.
- **Tools & Technologies:** tabs (Main Stack, Frontend, Backend, DevOps) + barras de nivel.
- **Contact:** acciones rápidas (copiar email, mailto, WhatsApp) + links a GitHub/LinkedIn.

##  Mejores Prácticas Aplicadas

- **Mobile-first** y responsive.
- **Scroll lock** sin “saltos” al abrir el menú.
- **Lazy loading** y `decoding="async"` en imágenes.
- **WebP** y `sizes` para servir imágenes optimizadas.
- **IntersectionObserver** para: typing del About y reveals de tarjetas/experiencia.
- **Accesibilidad:** `aria-controls`, `aria-expanded`, `aria-label`.

##  Bug Fix — “About Me” parpadeando

El H2 `About Me` parpadeaba porque `.typing-active` usaba la animación `blink` que cambia la **opacity** del elemento entero.  
**Arreglo:** mover el parpadeo a un **cursor `::after`**, igual que en el hero, y dejar el H2 sin animación de opacidad.

**Patch CSS (añadir en `styles.css`):**
```css
.typing-active{ animation:typingAbout 2.2s steps(8) forwards; }
.typing-about { position: relative; }
.typing-about.typing-active::after{
  content:""; position:absolute; top:0; right:-3px; width:3px; height:1em;
  background:var(--accent); animation:blink .7s step-end infinite;
}
 Cómo correr
Servir estáticamente con tu extensión favorita o:

VSCode + Live Server

python -m http.server (Python 3)

Abrir http://localhost:8000 (o el puerto que indique tu server).

🔗 Enlaces
GitHub: https://github.com/otpvayne

LinkedIn: https://www.linkedin.com/in/diego-medina-software/

📄 Licencia
Uso personal/portafolio. Si deseas reutilizar partes, menciona autoría.