# 🎨 Referencia Completa de Componentes

## Índice Rápido

1. [Botones](#botones)
2. [Tarjetas](#tarjetas)
3. [Inputs y Formularios](#inputs-y-formularios)
4. [Tipografía](#tipografía)
5. [Chips y Badges](#chips-y-badges)
6. [Layout y Espaciado](#layout-y-espaciado)
7. [Patrones de Uso](#patrones-de-uso)

---

## Botones

### `.btn-primary` - Acción Principal

**Cuándo usarlo**: CTAs importantes, "Descargar CV", "Contactarme", "Ver Proyecto"

**HTML**:
```html
<button class="btn-primary">Descargar CV</button>
<a href="/proyectos" class="btn-primary">Ver Proyectos</a>
```

**Propiedades**:
- Padding: 12px 24px
- Radio: `--radius-full` (redondeado)
- Altura mínima: 44px (touch-friendly)
- Font size: 14px, bold
- Transición suave

**Estados**:
- **Normal**: Fondo ámbar
- **Hover**: Fondo ámbar oscuro + sombra sutil
- **Active**: Opacidad 0.95
- **Focus**: Ring azul/ámbar de 5px
- **Disabled**: Opacidad 0.5, cursor no-allowed

**Variantes**:
```html
<!-- Más grande en desktop -->
<button class="btn-primary md:px-8 md:py-4">Extra Grande</button>

<!-- Full width -->
<button class="btn-primary w-full">Ancho completo</button>

<!-- Con icono -->
<button class="btn-primary gap-3">
  <svg class="w-5 h-5"><!-- icono --></svg>
  Descargar
</button>

<!-- Con carga (agregar clase) -->
<button class="btn-primary opacity-75 cursor-wait">
  Enviando...
</button>
```

---

### `.btn-secondary` - Acción Secundaria

**Cuándo usarlo**: Acciones alternativas, "Leer Más", "Explorar"

**HTML**:
```html
<button class="btn-secondary">Leer Más</button>
<a href="/blog" class="btn-secondary">Ir al Blog</a>
```

**Propiedades**:
- Borde 2px gris
- Fondo blanco
- Texto gris oscuro
- Mismo padding y altura que primary

**Estados**:
- **Normal**: Borde gris, texto gris
- **Hover**: Borde ámbar, texto ámbar + sombra
- **Active**: Sombra interior
- **Focus**: Ring ámbar
- **Disabled**: Opacidad 0.5

**Cuando Combinar**:
```html
<!-- Primary + Secondary juntos -->
<div class="flex gap-4">
  <button class="btn-primary">Enviar</button>
  <button class="btn-secondary">Cancelar</button>
</div>

<!-- En sección hero -->
<div class="space-y-6">
  <h1 class="heading-h1">Hola</h1>
  <div class="flex flex-wrap gap-3">
    <button class="btn-primary">Empecemos</button>
    <button class="btn-secondary">Más Información</button>
  </div>
</div>
```

---

### `.btn-tertiary` - Acción Ligera

**Cuándo usarlo**: Acciones terciarias, "Ignorar", "Cerrar", elementos opcionales

**HTML**:
```html
<button class="btn-tertiary">Más tarde</button>
<button class="btn-tertiary">Cerrar</button>
```

**Propiedades**:
- Sin borde
- Fondo transparente
- Texto gris
- Padding: 8px 16px (más pequeño que primary)

**Estados**:
- **Normal**: Texto gris
- **Hover**: Fondo gris muy claro
- **Focus**: Ring ámbar

---

## Tarjetas

### `.card-base` - Tarjeta Estándar

**Cuándo usarlo**: La mayoría de tarjetas con contenido

**HTML**:
```html
<div class="card-base p-6">
  <h3 class="heading-h4">Título</h3>
  <p class="body-base">Descripción...</p>
</div>
```

**Propiedades**:
- Fondo: blanco con opacidad 0.95
- Borde: 1px gris claro
- Radio: `--radius-xl` (28px)
- Sombra: `--shadow-subtle`
- Backdrop blur: sutil (cristal suave)

**Con Padding Responsivo**:
```html
<div class="card-base p-4 sm:p-6 lg:p-8">
  <!-- El padding cambia según pantalla -->
</div>
```

**Dentro de Grid**:
```html
<div class="grid lg:grid-cols-3 gap-6">
  <div class="card-base p-6">Tarjeta 1</div>
  <div class="card-base p-6">Tarjeta 2</div>
  <div class="card-base p-6">Tarjeta 3</div>
</div>
```

---

### `.card-interactive` - Tarjeta Interactiva

**Cuándo usarlo**: Tarjetas clicables, enlaces visuales

**HTML**:
```html
<div class="card-interactive p-6 cursor-pointer">
  <h3 class="heading-h4">Proyecto</h3>
  <p class="body-small">Click para ver detalles</p>
</div>
```

**Comportamiento**:
- Hereda todo de `.card-base`
- Al hover: sombra se intensifica, borde más oscuro
- Transición suave 300ms
- Cursor pointer

**Ejemplo Completo**:
```html
<a href="/proyecto-1" class="card-interactive p-6 block">
  <div class="flex items-start gap-4">
    <img src="..." alt="..." class="w-20 h-20 rounded-lg">
    <div class="flex-1">
      <h3 class="heading-h4">Título del Proyecto</h3>
      <p class="body-small text-[var(--color-text-tertiary)] mt-2">
        Una descripción corta del proyecto
      </p>
      <div class="flex gap-2 mt-4">
        <span class="chip-primary">React</span>
        <span class="chip-primary">Next.js</span>
      </div>
    </div>
  </div>
</a>
```

---

### `.card-elevated` - Tarjeta Elevada

**Cuándo usarlo**: Contenido importante, modal backgrounds, destacados

**HTML**:
```html
<div class="card-elevated p-8">
  <h2 class="heading-h2">Sección Importante</h2>
</div>
```

**Propiedades**:
- Fondo: blanco puro (sin opacidad)
- Sombra: `--shadow-medium` (más fuerte)
- Radio: `--radius-xl`
- No tiene borde

**Cuando usar en lugar de base**:
```html
<!-- card-base: Contenido regular -->
<div class="card-base p-6">Información normal</div>

<!-- card-elevated: Llamadas de atención, modales, highlights -->
<div class="card-elevated p-8 bg-[var(--color-primary)] text-white">
  <h3 class="text-white">Oferta Especial</h3>
</div>
```

---

## Inputs y Formularios

### `.input-field` - Campo de Texto

**Cuándo usarlo**: Emails, nombres, números, cualquier entrada de texto

**HTML**:
```html
<input type="email" class="input-field" placeholder="tu@email.com">
<input type="text" class="input-field" placeholder="Tu nombre">
<input type="number" class="input-field" placeholder="0">
```

**Propiedades**:
- Borde: 2px gris
- Padding: 12px 16px
- Radio: `--radius-md` (14px)
- Min height: 44px
- Font: inherit

**Con Label**:
```html
<div class="space-y-2">
  <label class="text-label">Email</label>
  <input type="email" class="input-field" placeholder="tu@email.com">
</div>
```

**Estados**:
- **Normal**: Borde gris
- **Focus**: Borde ámbar, ring ámbar suave
- **Error**: Borde rojo (agregar clase custom)
- **Disabled**: Opacidad reducida

**Input con Error**:
```html
<div class="space-y-2">
  <label class="text-label">Email</label>
  <input type="email" class="input-field border-[var(--color-error)]" 
         placeholder="tu@email.com">
  <p class="text-xs text-[var(--color-error)]">Email no válido</p>
</div>
```

---

### `.textarea-field` - Área de Texto

**Cuándo usarlo**: Mensajes, comentarios, contenido largo

**HTML**:
```html
<textarea class="textarea-field" placeholder="Tu mensaje..."></textarea>
```

**Propiedades**:
- Mismo estilo que `.input-field`
- Min height: 120px
- Resize: vertical (solo)

**Con Label y Contador**:
```html
<div class="space-y-2">
  <div class="flex justify-between">
    <label class="text-label">Mensaje</label>
    <span class="text-xs text-[var(--color-text-tertiary)]">0/500</span>
  </div>
  <textarea class="textarea-field" 
            placeholder="Tu mensaje..."
            maxlength="500"></textarea>
</div>
```

---

### Formulario Completo

**Patrón Estándar**:
```html
<form class="space-y-6 max-w-md">
  <!-- Campo 1 -->
  <div class="space-y-2">
    <label class="text-label">Nombre</label>
    <input type="text" class="input-field" placeholder="Tu nombre" required>
  </div>

  <!-- Campo 2 -->
  <div class="space-y-2">
    <label class="text-label">Email</label>
    <input type="email" class="input-field" placeholder="tu@email.com" required>
  </div>

  <!-- Campo 3 -->
  <div class="space-y-2">
    <label class="text-label">Servicio</label>
    <select class="input-field">
      <option>Desarrollo Web</option>
      <option>Consultoría</option>
      <option>Diseño UX</option>
    </select>
  </div>

  <!-- Textarea -->
  <div class="space-y-2">
    <label class="text-label">Mensaje</label>
    <textarea class="textarea-field" placeholder="Tu mensaje..." required></textarea>
  </div>

  <!-- Botón -->
  <button type="submit" class="btn-primary w-full">Enviar</button>
</form>
```

---

## Tipografía

### Headings

```html
<!-- h1: Títulos principales, hero -->
<h1 class="heading-h1">Diseñador & Desarrollador</h1>
<!-- 48px, bold, -0.5px tracking -->

<!-- h2: Títulos de sección -->
<h2 class="heading-h2">Mis Proyectos</h2>
<!-- 32px, bold, -0.3px tracking -->

<!-- h3: Subtítulos -->
<h3 class="heading-h3">Proyecto Destacado</h3>
<!-- 24px, bold -->

<!-- h4: Títulos de tarjeta -->
<h4 class="heading-h4">Card Title</h4>
<!-- 20px, semibold -->
```

### Body Text

```html
<!-- Large: Párrafos importantes, intros -->
<p class="body-large">
  Párrafo importante con tamaño mayor
</p>
<!-- 18px, 1.8 line-height -->

<!-- Base: Párrafos estándar -->
<p class="body-base">
  Párrafo estándar, el más usado
</p>
<!-- 16px, 1.7 line-height -->

<!-- Small: Texto secundario -->
<p class="body-small">
  Texto secundario o descripción breve
</p>
<!-- 14px, 1.6 line-height -->

<!-- XS: Labels, captions -->
<p class="body-xs">
  Caption o etiqueta pequeña
</p>
<!-- 12px, 1.4 line-height -->
```

### Eyebrow (Label de Sección)

```html
<span class="eyebrow">MIS SERVICIOS</span>
<!-- Resultado visual: "— MIS SERVICIOS" -->

<!-- Usado típicamente antes del heading -->
<div class="space-y-4">
  <span class="eyebrow">ACERCA DE MÍ</span>
  <h2 class="heading-h2">Quién soy</h2>
  <p class="body-large">Descripción...</p>
</div>
```

---

## Chips y Badges

### `.chip` - Badge Estándar

**Cuándo usarlo**: Skills, tags, categorías

**HTML**:
```html
<span class="chip">React</span>
<span class="chip">Next.js</span>
<span class="chip">TypeScript</span>
```

**Propiedades**:
- Padding: 6px 12px
- Radio: `--radius-full`
- Borde: 1px gris claro
- Font size: 12px

**En fila**:
```html
<div class="flex flex-wrap gap-2">
  <span class="chip">React</span>
  <span class="chip">Node.js</span>
  <span class="chip">PostgreSQL</span>
</div>
```

---

### `.chip-primary` - Badge Primario

**Cuándo usarlo**: Skills destacados, especialidades

**HTML**:
```html
<span class="chip-primary">Expert</span>
<span class="chip-primary">React</span>
```

**Propiedades**:
- Borde: ámbar con 30% opacidad
- Fondo: ámbar con 5% opacidad
- Texto: ámbar
- Mismo padding y radio que chip base

---

### `.chip-accent` - Badge Accent

**Cuándo usarlo**: Tags especiales, categorías secundarias

**HTML**:
```html
<span class="chip-accent">Featured</span>
<span class="chip-accent">New</span>
```

---

## Layout y Espaciado

### `.section-shell` - Contenedor Principal

**Uso**: Envuelve todo contenido de sección, limita ancho y centra

```html
<section className="py-32 lg:py-40">
  <div className="section-shell">
    <!-- Todo tu contenido aquí -->
  </div>
</section>
```

**Propiedades**:
- Max width: 1180px
- Centrado automático
- Padding horizontal: 24px (móvil)

---

### `.section-divider` - Línea Decorativa

**Uso**: Separador visual entre secciones

```html
<div className="section-shell">
  <div className="section-divider mb-12" />
  
  <!-- Contenido de la sección -->
</div>
```

**Visual**: Línea de 1px con gradient transparente

---

### Espaciado Responsivo

**Pattern Estándar**:
```html
<section className="px-4 sm:px-8 lg:px-20 py-24 sm:py-32 lg:py-40">
  <!-- Contenido -->
</section>
```

**Explicación**:
- `px-4`: 16px padding horizontal en mobile
- `sm:px-8`: 32px en tablet
- `lg:px-20`: 80px en desktop
- `py-24`: 96px vertical en mobile
- `sm:py-32`: 128px en tablet
- `lg:py-40`: 160px en desktop

**Grid Responsivo**:
```html
<div class="grid gap-6 lg:gap-8 lg:grid-cols-2 items-start">
  <div class="card-base">Columna 1</div>
  <div class="card-base">Columna 2</div>
</div>
```

---

## Patrones de Uso

### Patrón 1: Hero Section

```html
<section class="py-32 lg:py-48 bg-white">
  <div class="section-shell">
    <div class="section-divider mb-12" />
    
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      <!-- Left: Text -->
      <div class="space-y-8">
        <div class="space-y-4">
          <span class="eyebrow">HOLA</span>
          <h1 class="heading-h1">Título Principal</h1>
          <p class="body-large">Descripción o tagline</p>
        </div>

        <!-- Buttons -->
        <div class="flex gap-4 flex-wrap">
          <button class="btn-primary">Acción 1</button>
          <button class="btn-secondary">Acción 2</button>
        </div>

        <!-- Skills -->
        <div class="flex flex-wrap gap-2">
          <span class="chip-primary">React</span>
          <span class="chip-primary">Next.js</span>
          <span class="chip">TypeScript</span>
        </div>
      </div>

      <!-- Right: Visual -->
      <div class="card-elevated overflow-hidden rounded-[var(--radius-xl)]">
        <img src="..." alt="..." class="w-full h-full object-cover">
      </div>
    </div>
  </div>
</section>
```

---

### Patrón 2: Feature Grid (3 Columnas)

```html
<section class="py-32 bg-[var(--color-surface-light)]">
  <div class="section-shell">
    <!-- Header -->
    <div class="space-y-4 text-center mb-16">
      <span class="eyebrow">SERVICIOS</span>
      <h2 class="heading-h2">Qué Ofrezco</h2>
    </div>

    <!-- Grid de 3 -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      <!-- Item 1 -->
      <div class="card-base p-6 space-y-4">
        <div class="w-12 h-12 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-white text-xl">
          💻
        </div>
        <h3 class="heading-h4">Desarrollo Web</h3>
        <p class="body-small">Sitios y aplicaciones modernas con React y Next.js</p>
      </div>

      <!-- Item 2 -->
      <div class="card-base p-6 space-y-4">
        <div class="w-12 h-12 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-white text-xl">
          🎨
        </div>
        <h3 class="heading-h4">Diseño UX</h3>
        <p class="body-small">Interfaces que funcionan y se ven bien</p>
      </div>

      <!-- Item 3 -->
      <div class="card-base p-6 space-y-4">
        <div class="w-12 h-12 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-white text-xl">
          📊
        </div>
        <h3 class="heading-h4">Consultoría</h3>
        <p class="body-small">Auditorías técnicas y decisiones arquitectónicas</p>
      </div>
    </div>
  </div>
</section>
```

---

### Patrón 3: Testimonial/Quote Card

```html
<div class="card-elevated p-8 bg-[var(--color-surface-base)] border-l-4 border-[var(--color-primary)]">
  <blockquote class="space-y-4">
    <p class="body-large italic">
      "Una cita inspiradora o testimonial que habla sobre el trabajo"
    </p>
    <div class="flex items-center gap-3 pt-4">
      <img src="..." alt="..." class="w-10 h-10 rounded-full">
      <div>
        <p class="body-base font-semibold">Nombre de Persona</p>
        <p class="body-xs text-[var(--color-text-tertiary)]">Empresa o Rol</p>
      </div>
    </div>
  </blockquote>
</div>
```

---

### Patrón 4: Stats/Metrics

```html
<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
  <!-- Metric 1 -->
  <div class="card-base p-5 sm:p-6">
    <p class="heading-h3 text-[var(--color-primary)]">50+</p>
    <p class="text-sm text-[var(--color-text-secondary)] mt-2">Proyectos completados</p>
  </div>

  <!-- Metric 2 -->
  <div class="card-base p-5 sm:p-6">
    <p class="heading-h3 text-[var(--color-primary)]">8+</p>
    <p class="text-sm text-[var(--color-text-secondary)] mt-2">Años de experiencia</p>
  </div>

  <!-- Metric 3 -->
  <div class="card-base p-5 sm:p-6">
    <p class="heading-h3 text-[var(--color-primary)]">100%</p>
    <p class="text-sm text-[var(--color-text-secondary)] mt-2">Clientes satisfechos</p>
  </div>
</div>
```

---

## 🎯 Resumen Rápido

| Elemento | Clase | Cuándo Usar |
|----------|-------|------------|
| Botón Principal | `.btn-primary` | CTAs, acciones importantes |
| Botón Secundario | `.btn-secondary` | Acciones alternativas |
| Botón Terciario | `.btn-tertiary` | Acciones opcionales |
| Tarjeta Base | `.card-base` | Contenido regular |
| Tarjeta Interactiva | `.card-interactive` | Elementos clicables |
| Tarjeta Elevada | `.card-elevated` | Contenido destacado |
| Input | `.input-field` | Campos de texto |
| Textarea | `.textarea-field` | Texto multi-línea |
| Heading H1 | `.heading-h1` | Títulos principales |
| Body Text | `.body-base` | Texto estándar |
| Chip | `.chip` | Tags y badges |
| Chip Primario | `.chip-primary` | Skills destacados |

---

**Versión**: 1.0  
**Última actualización**: Mayo 2026  
**Sistema**: European Professional Minimalism
