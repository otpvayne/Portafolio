# 📐 Arquitectura de Estilos - Sistema Profesional Europeo

## 📋 Tabla de Contenidos
1. [Visión General](#visión-general)
2. [Estructura del Sistema](#estructura-del-sistema)
3. [Design Tokens Completos](#design-tokens-completos)
4. [Componentes y Su Uso](#componentes-y-su-uso)
5. [Cómo Editar Estilos](#cómo-editar-estilos)
6. [Guía de Implementación](#guía-de-implementación)
7. [Ejemplos Prácticos](#ejemplos-prácticos)

---

## Visión General

La arquitectura de estilos está diseñada bajo principios europeos de minimalismo profesional (similar a Stripe, Vercel, Notion) con **UN ÚNICO LUGAR DE VERDAD** para todos los cambios visuales.

### Problemas Resueltos
✅ Antes: Colores definidos en 3 lugares diferentes  
✅ Antes: Radio de bordes con 8+ valores inconsistentes  
✅ Antes: Espaciado sin escala definida  
✅ Antes: Clases duplicadas (.panel vs .card, .glass vs .card-glass)  
✅ Ahora: **Todo centralizado en `globals.css`**

### Cómo Funciona
```
globals.css (762 líneas)
    ├── DESIGN TOKENS (líneas 1-103)
    │   ├── Border radius (6px → 9999px)
    │   ├── Opacity (0.45 → 0.98)
    │   ├── Shadows (subtle → strong)
    │   ├── Spacing (6px → 48px)
    │   ├── Colors (primary, accent, grayscale)
    │   └── Typography (font sizes y line heights)
    │
    ├── RESET & BASE (líneas 105-185)
    │   ├── Box sizing, margins, padding reset
    │   ├── Body base styles
    │   └── Accessibility (reduced motion, scrollbar)
    │
    ├── COMPONENT CLASSES (líneas 186-600+)
    │   ├── Layout: .section-shell, .section-divider
    │   ├── Typography: .eyebrow, .heading-h1, .body-base
    │   ├── Buttons: .btn-primary, .btn-secondary, .btn-tertiary
    │   ├── Cards: .card-base, .card-interactive, .card-elevated
    │   ├── Inputs: .input-field, .textarea-field
    │   ├── Chips: .chip, .chip-primary
    │   └── Utilities: .text-white-force, .text-truncate
    │
    └── ANIMATIONS & UTILITIES (líneas 600+)
        ├── Smooth transitions
        └── Focus states para accesibilidad
```

---

## Estructura del Sistema

### 4 Niveles de Abstracción

#### **Nivel 1: Design Tokens (Variables CSS)**
Los "bloques de construcción" - valores que se usan en todas partes.

```css
:root {
  /* 6 pasos de radius para diferentes componentes */
  --radius-xs: 6px;    /* botones pequeños */
  --radius-sm: 10px;   /* iconos, elementos compactos */
  --radius-md: 14px;   /* badges, chips */
  --radius-lg: 20px;   /* tarjetas estándar */
  --radius-xl: 28px;   /* tarjetas grandes, hero */
  --radius-full: 9999px;  /* completamente redondeado */

  /* 5 pasos de opacidad para overlays y backgrounds */
  --opacity-xs: 0.45;   /* muy sutil */
  --opacity-sm: 0.65;   /* subtil */
  --opacity-md: 0.80;   /* medio */
  --opacity-lg: 0.92;   /* fuerte */
  --opacity-xl: 0.98;   /* casi opaco */

  /* 4 tipos de sombra para profundidad */
  --shadow-subtle: 0 1px 3px rgba(0, 0, 0, 0.05);
  --shadow-medium: 0 4px 12px rgba(0, 0, 0, 0.06);
  --shadow-strong: 0 12px 32px rgba(0, 0, 0, 0.08);
  --shadow-interactive: 0 2px 8px rgba(0, 0, 0, 0.05);

  /* Espaciado en escala de 6-pixel */
  --space-xs: 6px;     /* 6px */
  --space-sm: 10px;    /* 10px */
  --space-md: 16px;    /* 16px */
  --space-lg: 24px;    /* 24px */
  --space-xl: 32px;    /* 32px */
  --space-2xl: 48px;   /* 48px */

  /* Paleta de colores: solo 4 colores principales */
  --color-primary: #b45309;        /* Ámbar cálido */
  --color-primary-dark: #8a3f08;   /* Ámbar oscuro */
  --color-primary-light: #d97706;  /* Ámbar claro */
  --color-accent: #0f766e;         /* Teal */
  --color-accent-light: #14b8a6;   /* Teal claro */

  /* Escala de grises europea (6 niveles) */
  --color-surface-white: #ffffff;
  --color-surface-light: #f9fafb;     /* Fondo ligerísimo */
  --color-surface-base: #f3f4f6;      /* Fondo estándar */
  --color-surface-muted: #e5e7eb;     /* Gris medio */
  --color-surface-dark: #d1d5db;      /* Gris oscuro */

  /* Escala de texto (4 niveles) */
  --color-text-primary: #111827;      /* Casi negro */
  --color-text-secondary: #374151;    /* Gris oscuro */
  --color-text-tertiary: #6b7280;     /* Gris medio */
  --color-text-disabled: #9ca3af;     /* Gris claro */

  /* Semánticos */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
}
```

#### **Nivel 2: Reset & Base Styles**
Estilos base seguros que no rompen la cascada.

```css
body {
  min-height: 100vh;
  background: #ffffff;
  color: var(--color-text-primary);  /* IMPORTANTE: no hereda agresivamente */
  font-family: "Sora", sans-serif;
  line-height: 1.6;
}

/* Manejo seguro de texto: evita word-break excesivo */
p, span, div, li {
  word-break: break-word;
  overflow-wrap: break-word;
}
```

#### **Nivel 3: Component Classes**
Clases CSS reutilizables que combinan tokens para crear componentes visuales.

Ejemplo - Botón Primario:
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  padding: 12px 24px;
  border-radius: var(--radius-full);        /* Usa token */
  background-color: var(--color-primary);   /* Usa token */
  color: white;
  font-weight: 600;
  transition: all 0.2s ease;
  min-height: 44px;  /* Touch-friendly */
}

.btn-primary:hover {
  background-color: var(--color-primary-dark);  /* Token oscuro */
  box-shadow: var(--shadow-subtle);              /* Token shadow */
}

.btn-primary:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgba(180, 83, 9, 0.1), 
              0 0 0 5px var(--color-primary);     /* Focus ring */
}
```

#### **Nivel 4: Tailwind Utilities**
Combinación de clases Tailwind para casos especiales (margin, padding responsive, etc.).

```html
<!-- Combinando component class + Tailwind utilities -->
<button class="btn-primary md:px-6 lg:py-4">Enviar</button>
<!-- btn-primary = componente base
     md:px-6 = padding extra en desktop -->
```

---

## Design Tokens Completos

### Border Radius
| Token | Valor | Uso |
|-------|-------|-----|
| `--radius-xs` | 6px | Botones pequeños, elementos ajustados |
| `--radius-sm` | 10px | Iconos, cajas compactas |
| `--radius-md` | 14px | Badges, chips pequeños |
| `--radius-lg` | 20px | Tarjetas estándar, inputs |
| `--radius-xl` | 28px | Tarjetas grandes, secciones hero |
| `--radius-full` | 9999px | Botones completamente redondeados |

### Opacity
| Token | Valor | Uso |
|-------|-------|-----|
| `--opacity-xs` | 0.45 | Overlays muy sutiles, backgrounds |
| `--opacity-sm` | 0.65 | Overlays semitransparentes |
| `--opacity-md` | 0.80 | Backgrounds con opacidad estándar |
| `--opacity-lg` | 0.92 | Backgrounds casi opacos |
| `--opacity-xl` | 0.98 | Casi completamente opaco |

### Shadows
| Token | Uso |
|-------|-----|
| `--shadow-subtle` | Hover states sutiles, bordes de tarjetas |
| `--shadow-medium` | Tarjetas elevadas, dropdowns |
| `--shadow-strong` | Modales, elementos flotantes prominentes |
| `--shadow-interactive` | Botones al hacer hover |

### Spacing (Grid de 8px)
| Token | Valor | Casos de Uso |
|-------|-------|--------------|
| `--space-xs` | 6px | Gaps entre elementos muy cercanos |
| `--space-sm` | 10px | Gaps pequeños dentro de componentes |
| `--space-md` | 16px | Padding estándar, gaps normales |
| `--space-lg` | 24px | Padding en tarjetas, gaps de secciones |
| `--space-xl` | 32px | Gaps entre secciones grandes |
| `--space-2xl` | 48px | Padding de secciones principales |

### Colors

**Primaria (Ámbar Cálido)**
```
--color-primary: #b45309        (50-60% de uso)
--color-primary-dark: #8a3f08   (hover, estados activos)
--color-primary-light: #d97706  (backgrounds suaves)
```

**Accent (Teal)**
```
--color-accent: #0f766e         (CTAs secundarias, highlights)
--color-accent-light: #14b8a6   (backgrounds suaves)
```

**Grayscale (Minimalismo Europeo)**
```
--color-surface-white: #ffffff        (Fondos principales)
--color-surface-light: #f9fafb        (Fondos ligerísimos)
--color-surface-base: #f3f4f6         (Fondos secundarios)
--color-surface-muted: #e5e7eb        (Bordes, divisores)
--color-surface-dark: #d1d5db         (Bordes más oscuros)

--color-text-primary: #111827         (Texto principal)
--color-text-secondary: #374151       (Texto secundario, body)
--color-text-tertiary: #6b7280        (Texto muy secundario)
--color-text-disabled: #9ca3af        (Texto deshabilitado)
```

---

## Componentes y Su Uso

### BOTONES

#### `.btn-primary`
**Uso**: Acciones principales, CTAs importantes
```html
<button class="btn-primary">Descargar CV</button>
<a href="/proyectos" class="btn-primary">Ver Proyectos</a>

<!-- Con responsive padding -->
<button class="btn-primary md:px-8">Contactarme</button>
```

**Variantes**:
- `:hover` - Fondo más oscuro
- `:active` - Opacidad 0.95 (click feedback)
- `:focus-visible` - Ring azul/ámbar para keyboard navigation
- `:disabled` - Opacidad 0.5, cursor no-allowed

#### `.btn-secondary`
**Uso**: Acciones secundarias, alternativas
```html
<button class="btn-secondary">Leer Más</button>
```
- Border 2px gris, fondo blanco
- Al hover: borde ámbar, texto ámbar

#### `.btn-tertiary`
**Uso**: Acciones terciarias, links que parecen botones
```html
<button class="btn-tertiary">Opcional</button>
```
- Sin borde, fondo transparente
- Al hover: background gris muy claro

### TARJETAS

#### `.card-base`
**Uso**: Tarjetas estándar con borde y sombra sutil
```html
<div class="card-base p-6">
  <h3 class="heading-h4">React Expert</h3>
  <p class="body-base">Building modern interfaces...</p>
</div>
```
- Fondo: blanco/95
- Radio: `--radius-xl` (28px)
- Borde: 1px gris claro
- Sombra: `--shadow-subtle`

#### `.card-interactive`
**Uso**: Tarjetas que responden a hover
```html
<div class="card-interactive">
  <!-- Contenido -->
</div>
```
- Hereda de `.card-base`
- Al hover: sombra se intensifica, borde más oscuro

#### `.card-elevated`
**Uso**: Tarjetas que necesitan más presencia
```html
<div class="card-elevated p-8">
  <!-- Contenido destacado -->
</div>
```
- Fondo: blanco puro
- Sombra: `--shadow-medium`
- Radio: `--radius-xl`

### INPUTS

#### `.input-field`
**Uso**: Campos de texto, email, password
```html
<input type="email" class="input-field" placeholder="tu@email.com">
```
- Borde 2px gris
- Radio: `--radius-md` (14px)
- Al focus: borde ámbar, ring suave
- Min height: 44px (touch-friendly)

#### `.textarea-field`
**Uso**: Áreas de texto multi-línea
```html
<textarea class="textarea-field" placeholder="Tu mensaje..."></textarea>
```
- Propiedades iguales a `.input-field`
- Resize vertical
- Min height: 120px

### CHIPS / BADGES

#### `.chip`
**Uso**: Tags, categorías, skills
```html
<span class="chip">React</span>
<span class="chip">Next.js</span>
<span class="chip">TypeScript</span>
```
- Borde 1px gris
- Padding: 6px 12px
- Radio: `--radius-full`
- Font size: 12px
- Al hover: fondo gris muy claro

#### `.chip-primary`
**Uso**: Skills destacados, tags activos
```html
<span class="chip-primary">Expert</span>
```
- Borde ámbar suave (ámbar/30%)
- Fondo ámbar muy suave (ámbar/5%)
- Texto ámbar

#### `.chip-accent`
**Uso**: Tags secundarios
```html
<span class="chip-accent">Featured</span>
```
- Borde teal suave
- Fondo teal muy suave
- Texto teal

### TIPOGRAFÍA

#### Headings
```html
<h1 class="heading-h1">Diseñador & Desarrollador</h1>  <!-- 48px -->
<h2 class="heading-h2">Mis Proyectos</h2>              <!-- 32px -->
<h3 class="heading-h3">Featured Work</h3>              <!-- 24px -->
<h4 class="heading-h4">Project Title</h4>              <!-- 20px -->
```

#### Body Text
```html
<p class="body-large">Texto importante</p>      <!-- 18px, 1.8 line-height -->
<p class="body-base">Texto estándar</p>         <!-- 16px, 1.7 line-height -->
<p class="body-small">Texto secundario</p>      <!-- 14px, 1.6 line-height -->
<p class="body-xs">Label o caption</p>          <!-- 12px, 1.4 line-height -->
```

#### Eyebrow (Sección Label)
```html
<span class="eyebrow">MIS SERVICIOS</span>

<!-- Resultado: "— MIS SERVICIOS" (línea antes) -->
```
- 12px, bold, uppercase
- Con línea decorativa antes
- Color ámbar

#### Text Label
```html
<p class="text-label">FOCUS AREA</p>
```
- 12px, bold, uppercase
- Uppercase tracking
- Color ámbar

### LAYOUT

#### `.section-shell`
**Uso**: Contenedor para todas las secciones principales
```html
<section>
  <div class="section-shell">
    <!-- Contenido limitado a 1180px, centrado -->
  </div>
</section>
```
- Max width: 1180px
- Centrado automático
- Padding: `--space-lg` (24px) en mobile

#### `.section-divider`
**Uso**: Línea decorativa entre secciones
```html
<div class="section-divider mb-12" />
```
- Altura 1px
- Gradient: transparent → gris → transparent
- Color: variable `--line-strong`

---

## Cómo Editar Estilos

### ✨ Cambiar el Color Principal (Ámbar a Otro)

**Localización**: `globals.css` línea 48

```css
/* ANTES */
--color-primary: #b45309;        /* Ámbar cálido */
--color-primary-dark: #8a3f08;   /* Ámbar oscuro */
--color-primary-light: #d97706;  /* Ámbar claro */

/* DESPUÉS: Cambiar a AZUL */
--color-primary: #2563eb;        /* Azul */
--color-primary-dark: #1d4ed8;   /* Azul oscuro */
--color-primary-light: #3b82f6;  /* Azul claro */
```

**Impacto**: Botones, links, accents, labels - TODO se actualiza automáticamente ✅

---

### 🎨 Cambiar el Color de Accent (Teal a Otro)

**Localización**: `globals.css` línea 52

```css
--color-accent: #0f766e;         /* Teal */
--color-accent-light: #14b8a6;   /* Teal claro */

/* O cambiar a MORADO */
--color-accent: #7c3aed;         /* Morado */
--color-accent-light: #a78bfa;   /* Morado claro */
```

---

### 📏 Aumentar el Radio de Bordes (Más Redondeado)

**Localización**: `globals.css` línea 11-16

```css
/* ANTES: Minimalista */
--radius-xs: 6px;
--radius-sm: 10px;
--radius-md: 14px;
--radius-lg: 20px;
--radius-xl: 28px;

/* DESPUÉS: Más redondeado (Apple-like) */
--radius-xs: 8px;
--radius-sm: 12px;
--radius-md: 16px;
--radius-lg: 24px;
--radius-xl: 32px;
```

**Nota**: El sistema se actualiza en todas partes automáticamente.

---

### 📏 Cambiar Espaciado Global (Más o Menos Aire)

**Localización**: `globals.css` línea 37-43

```css
/* ANTES: Estándar */
--space-xs: 6px;
--space-sm: 10px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;

/* DESPUÉS: Más aireado (50% más) */
--space-xs: 9px;
--space-sm: 15px;
--space-md: 24px;
--space-lg: 36px;
--space-xl: 48px;
--space-2xl: 72px;
```

---

### 🌙 Cambiar Sombras (Más o Menos Profundidad)

**Localización**: `globals.css` línea 30-33

```css
/* ANTES: Minimalista europeo */
--shadow-subtle: 0 1px 3px rgba(0, 0, 0, 0.05);
--shadow-medium: 0 4px 12px rgba(0, 0, 0, 0.06);
--shadow-strong: 0 12px 32px rgba(0, 0, 0, 0.08);

/* DESPUÉS: Más dramático */
--shadow-subtle: 0 2px 8px rgba(0, 0, 0, 0.1);
--shadow-medium: 0 8px 24px rgba(0, 0, 0, 0.12);
--shadow-strong: 0 20px 48px rgba(0, 0, 0, 0.15);
```

---

### 🎯 Cambiar Font-Family Global

**Localización**: `globals.css` línea 123

```css
/* ANTES */
font-family: "Sora", sans-serif;

/* DESPUÉS: Cambiar a Inter */
font-family: "Inter", sans-serif;

/* O Poppins (más playful) */
font-family: "Poppins", sans-serif;
```

---

### 🖼️ Cambiar Fondos de Secciones

**Localización**: En componentes específicos (Hero.tsx, About.tsx, etc.)

```html
<!-- En Hero.tsx -->
<!-- ANTES: Fondo blanco -->
<section className="bg-white">

<!-- DESPUÉS: Fondo gris muy claro -->
<section className="bg-[var(--color-surface-light)]">

<!-- O cambiar directamente el CSS variable -->
```

---

### 🎨 Cambiar Paleta de Grises (Más Cálido, Más Frío)

**Localización**: `globals.css` línea 58-67

```css
/* ACTUAL: Neutral (balanceado) */
--color-surface-light: #f9fafb;     /* 50, 51, 51 - muy neutral */
--color-surface-base: #f3f4f6;      /* 243, 244, 246 */
--color-surface-muted: #e5e7eb;     /* 229, 231, 235 */

/* OPCIÓN 1: Más CÁLIDO (como crema) */
--color-surface-light: #faf9f7;     /* Crema muy clara */
--color-surface-base: #f5f3f0;      /* Crema moderada */
--color-surface-muted: #ede9e3;     /* Crema más fuerte */

/* OPCIÓN 2: Más FRÍO (como azul) */
--color-surface-light: #f8f9fb;     /* Azul muy claro */
--color-surface-base: #f0f3f8;      /* Azul claro */
--color-surface-muted: #e0e7f1;     /* Azul medio */
```

---

## Guía de Implementación

### Paso 1: Entender la Cascada

```
globals.css (FUENTE DE VERDAD)
    ↓ Los tokens se usan en las clases CSS
    ↓ Las clases CSS se aplican en componentes React
    ↓ Los componentes React se renderean en la página
```

**Regla de Oro**: Si quieres cambiar algo visual:
1. Busca dónde se define en `globals.css` (o en el componente si es específico)
2. Edita el valor ALLÍ
3. Los cambios se propagan automáticamente

### Paso 2: Estructura de Componentes

```html
<!-- Estructura típica de una sección -->
<section className="py-24 sm:py-32 lg:py-40 bg-white">
  <div className="section-shell">
    {/* Divider opcional */}
    <div className="section-divider mb-12" />
    
    {/* Contenido */}
    <motion.div className="space-y-8">
      <span className="eyebrow">KICKER TEXT</span>
      <h2 className="heading-h2">Título Principal</h2>
      <p className="body-large">Descripción...</p>
    </motion.div>
  </div>
</section>
```

### Paso 3: Combinar Componentes

```html
<!-- Card + Button -->
<div class="card-base p-6">
  <h3 class="heading-h4">Feature</h3>
  <p class="body-base">Description</p>
  <button class="btn-primary mt-4">Action</button>
</div>

<!-- Chips en fila -->
<div class="flex flex-wrap gap-2">
  <span class="chip-primary">React</span>
  <span class="chip-primary">Next.js</span>
  <span class="chip">TypeScript</span>
</div>

<!-- Input con label -->
<div class="space-y-2">
  <label class="text-label">Email</label>
  <input type="email" class="input-field" placeholder="...">
</div>
```

---

## Ejemplos Prácticos

### Ejemplo 1: Crear un Card Nuevo

```html
<!-- HTML en componente React -->
<div class="card-base p-6 hover:shadow-md transition-shadow">
  <div class="flex items-start gap-4">
    <div class="flex-shrink-0 w-12 h-12 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-white">
      💼
    </div>
    <div class="flex-1">
      <h4 class="heading-h4">Consultoría Técnica</h4>
      <p class="body-small text-[var(--color-text-tertiary)]">Auditorías, reviews de arquitectura, decisiones técnicas</p>
    </div>
  </div>
</div>
```

**Nota**: Usando `--color-primary` para que los cambios se sincronicen automáticamente.

---

### Ejemplo 2: Botones con Estados Diferentes

```html
<!-- Primario -->
<button class="btn-primary">Descargar CV</button>

<!-- Secundario -->
<button class="btn-secondary">Explorar Más</button>

<!-- Terciario / Text button -->
<button class="btn-tertiary">Opcional</button>

<!-- Deshabilitado -->
<button class="btn-primary" disabled>No disponible</button>
```

---

### Ejemplo 3: Formulario Completo

```html
<form class="space-y-6">
  <!-- Input de texto -->
  <div class="space-y-2">
    <label class="text-label">Nombre</label>
    <input type="text" class="input-field" placeholder="Tu nombre">
  </div>

  <!-- Input de email -->
  <div class="space-y-2">
    <label class="text-label">Email</label>
    <input type="email" class="input-field" placeholder="tu@email.com">
  </div>

  <!-- Textarea -->
  <div class="space-y-2">
    <label class="text-label">Mensaje</label>
    <textarea class="textarea-field" placeholder="Tu mensaje..."></textarea>
  </div>

  <!-- Button -->
  <button type="submit" class="btn-primary w-full">Enviar</button>
</form>
```

---

### Ejemplo 4: Sección Hero Completa

```html
<section class="py-32 lg:py-40 bg-white">
  <div class="section-shell">
    <div class="section-divider mb-12" />
    
    <div class="grid lg:grid-cols-2 gap-12 items-center">
      {/* Columna izquierda: texto */}
      <div class="space-y-6">
        <span class="eyebrow">HOLA</span>
        <h1 class="heading-h1">Diseñador & Desarrollador</h1>
        <p class="body-large">Construyo productos digitales que funcionan y se ven bien.</p>
        
        <div class="flex gap-4">
          <button class="btn-primary">Empecemos</button>
          <button class="btn-secondary">Conocer más</button>
        </div>

        {/* Skills */}
        <div class="flex flex-wrap gap-2 pt-4">
          <span class="chip-primary">React</span>
          <span class="chip-primary">Next.js</span>
          <span class="chip">UX Design</span>
        </div>
      </div>

      {/* Columna derecha: imagen/visual */}
      <div class="card-elevated overflow-hidden">
        <img src="..." alt="..." class="w-full h-full object-cover">
      </div>
    </div>
  </div>
</section>
```

---

## Resumen de Archivos Importantes

| Archivo | Líneas | Responsabilidad |
|---------|--------|-----------------|
| `app/globals.css` | 762 | **FUENTE DE VERDAD** - Todos los estilos base |
| `components/Nav.tsx` | ~150 | Navegación (usa btn-primary, btn-tertiary) |
| `components/Hero.tsx` | ~200 | Sección hero (usa card-base, btn-primary) |
| `components/About.tsx` | ~160 | About section (usa card-interactive) |
| `components/Contact.tsx` | ~100 | Contact section (usa btn-primary, card-base) |
| `app/[locale]/contacto/ContactForm.tsx` | ~100 | Form (usa input-field, btn-primary) |

---

## 🎯 Checklist: Cuando Edites Algo

- [ ] ¿Necesito cambiar un color? → Edita el token en `globals.css` (línea 48-75)
- [ ] ¿Necesito cambiar espaciado? → Edita `--space-*` en `globals.css` (línea 37-43)
- [ ] ¿Necesito cambiar radio de bordes? → Edita `--radius-*` en `globals.css` (línea 11-16)
- [ ] ¿Necesito cambiar un botón? → Usa clase `.btn-primary`, `.btn-secondary`, o `.btn-tertiary`
- [ ] ¿Necesito cambiar una tarjeta? → Usa clase `.card-base`, `.card-interactive`, o `.card-elevated`
- [ ] ¿Necesito cambiar tipografía? → Usa clases `.heading-*`, `.body-*`, o `.eyebrow`
- [ ] ¿Necesito agregar espaciado responsive? → Usa Tailwind: `space-y-8 lg:space-y-12`
- [ ] ¿He hecho cambios? → Recarga con Ctrl+Shift+R (hard refresh)

---

## 🔧 Debugging Tips

### Cambios no se ven
1. **Hard refresh**: Ctrl+Shift+R (Windows/Linux) o Cmd+Shift+R (Mac)
2. **Limpia cache del navegador**: DevTools → Application → Clear site data
3. **Verifica que edites `globals.css`**, no alguna versión cacheada

### Texto invisible o cortado
1. **Busca `.text-white-force`** en componentes → Reemplaza con clase de color adecuada
2. **Verifica que el fondo contraste** con el texto
3. **Usa herramientas de accesibilidad** (Firefox Accessibility Inspector)

### Layouts rotos
1. **Verifica grid columns**: `lg:grid-cols-2` (simple) vs `lg:grid-cols-[1.2fr_0.8fr]` (complejo)
2. **Usa `overflow-visible`** en contenedores de tarjetas
3. **Aplica `flex-shrink-0`** a íconos para que no se compriman

---

## ✨ Resultado Final

Con esta arquitectura:
- ✅ **1 archivo** (`globals.css`) contiene toda la verdad
- ✅ **Cambios propagados** automáticamente por el sitio
- ✅ **Mantenible** por cualquiera (sin necesidad de desarrollo frontend avanzado)
- ✅ **Escalable** a más componentes sin duplicación
- ✅ **Profesional** - Sistema europeo de clase mundial

---

**Versión**: 1.0  
**Última actualización**: Mayo 2026  
**Estilo**: European Professional Minimalism (Stripe/Vercel/Notion standard)
