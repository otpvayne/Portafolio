# ⚡ Guía Rápida: Cambios de Estilos

## 🎨 Cambios Más Comunes

### 1️⃣ Cambiar Color Principal (Botones, Links, Accents)

**Archivo**: `app/globals.css`  
**Líneas**: 48-50

```css
:root {
  --color-primary: #b45309;        ← EDITA ESTE (ámbar a otro color)
  --color-primary-dark: #8a3f08;   ← Y ESTE (versión oscura)
  --color-primary-light: #d97706;  ← Y ESTE (versión clara)
}
```

**Ejemplos**:
```css
/* Azul profesional */
--color-primary: #2563eb;
--color-primary-dark: #1d4ed8;
--color-primary-light: #3b82f6;

/* Verde minimalista */
--color-primary: #059669;
--color-primary-dark: #047857;
--color-primary-light: #10b981;

/* Morado sofisticado */
--color-primary: #7c3aed;
--color-primary-dark: #6d28d9;
--color-primary-light: #a78bfa;
```

**Resultado**: ✅ Todos los botones, labels, accents cambian automáticamente

---

### 2️⃣ Aumentar Espaciado Entre Secciones

**Archivo**: Componentes específicos (Hero.tsx, About.tsx, etc.)  
**Patrón**: `py-24 sm:py-32 lg:py-40`

```html
<!-- ANTES: Menos espaciado -->
<section className="py-24 sm:py-28 lg:py-36">

<!-- DESPUÉS: Más espaciado (50% más) -->
<section className="py-32 sm:py-40 lg:py-48">
```

**Valores Estándar**:
- `py-24` = 96px (mobile)
- `py-32` = 128px (tablet)
- `py-40` = 160px (desktop)
- `py-48` = 192px (mucho espacio)

---

### 3️⃣ Cambiar Sombras (Más o Menos Profundidad)

**Archivo**: `app/globals.css`  
**Líneas**: 30-33

```css
--shadow-subtle: 0 1px 3px rgba(0, 0, 0, 0.05);      ← Borde sutil
--shadow-medium: 0 4px 12px rgba(0, 0, 0, 0.06);    ← Tarjeta elevada
--shadow-strong: 0 12px 32px rgba(0, 0, 0, 0.08);   ← Elementos prominentes
--shadow-interactive: 0 2px 8px rgba(0, 0, 0, 0.05); ← Hover
```

**Para hacer más dramático** (50% más oscuro):
```css
--shadow-subtle: 0 2px 8px rgba(0, 0, 0, 0.1);      /* Aumenta el 0.05 → 0.1 */
--shadow-medium: 0 8px 24px rgba(0, 0, 0, 0.12);    /* Aumenta el 0.06 → 0.12 */
--shadow-strong: 0 20px 48px rgba(0, 0, 0, 0.16);   /* Aumenta el 0.08 → 0.16 */
```

**Para hacer más sutil** (50% menos visible):
```css
--shadow-subtle: 0 1px 2px rgba(0, 0, 0, 0.025);
--shadow-medium: 0 2px 6px rgba(0, 0, 0, 0.03);
--shadow-strong: 0 8px 20px rgba(0, 0, 0, 0.04);
```

---

### 4️⃣ Cambiar Paleta de Grises (Warm/Cool/Neutral)

**Archivo**: `app/globals.css`  
**Líneas**: 58-67

#### Opción A: Neutral (Actual - Recomendado)
```css
--color-surface-light: #f9fafb;
--color-surface-base: #f3f4f6;
--color-surface-muted: #e5e7eb;
--color-surface-dark: #d1d5db;

--color-text-primary: #111827;
--color-text-secondary: #374151;
--color-text-tertiary: #6b7280;
```

#### Opción B: Warm (Cálido - Crema)
```css
--color-surface-light: #faf9f7;     /* Crema muy clara */
--color-surface-base: #f5f3f0;      /* Crema clara */
--color-surface-muted: #ede9e3;     /* Crema media */
--color-surface-dark: #ddd6ce;      /* Crema oscura */

--color-text-primary: #1a1410;      /* Casi negro cálido */
--color-text-secondary: #3d3530;    /* Gris cálido */
--color-text-tertiary: #6b6359;     /* Gris cálido claro */
```

#### Opción C: Cool (Frío - Azulado)
```css
--color-surface-light: #f8f9fb;     /* Azul muy claro */
--color-surface-base: #f0f3f8;      /* Azul claro */
--color-surface-muted: #e0e7f1;     /* Azul medio */
--color-surface-dark: #cbd5e1;      /* Azul oscuro */

--color-text-primary: #0f172a;      /* Azul casi negro */
--color-text-secondary: #334155;    /* Azul gris */
--color-text-tertiary: #64748b;     /* Azul gris claro */
```

---

### 5️⃣ Cambiar Radio de Bordes (Más Redondeado o Más Cuadrado)

**Archivo**: `app/globals.css`  
**Líneas**: 11-16

#### Actual (Balanceado)
```css
--radius-xs: 6px;
--radius-sm: 10px;
--radius-md: 14px;
--radius-lg: 20px;
--radius-xl: 28px;
```

#### Más Redondeado (Apple-like)
```css
--radius-xs: 8px;
--radius-sm: 12px;
--radius-md: 18px;
--radius-lg: 24px;
--radius-xl: 32px;
```

#### Más Cuadrado (Minimalista extremo)
```css
--radius-xs: 4px;
--radius-sm: 6px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
```

---

### 6️⃣ Cambiar Tamaño de Fuente Global

**Archivo**: `app/globals.css`  
**Líneas**: 242-300

```css
/* ACTUAL */
.heading-h1 { font-size: 48px; }
.heading-h2 { font-size: 32px; }
.body-large { font-size: 18px; }
.body-base { font-size: 16px; }

/* MÁS GRANDE (40% más) */
.heading-h1 { font-size: 64px; }  /* 48 → 64 */
.heading-h2 { font-size: 48px; }  /* 32 → 48 */
.body-large { font-size: 20px; }  /* 18 → 20 */
.body-base { font-size: 18px; }   /* 16 → 18 */

/* MÁS PEQUEÑA (20% menos) */
.heading-h1 { font-size: 40px; }  /* 48 → 40 */
.heading-h2 { font-size: 26px; }  /* 32 → 26 */
.body-large { font-size: 16px; }  /* 18 → 16 */
.body-base { font-size: 14px; }   /* 16 → 14 */
```

---

### 7️⃣ Cambiar Font-Family (Tipografía)

**Archivo**: `app/globals.css`  
**Línea**: 123

```css
/* ACTUAL: Sora (geométrica, moderna) */
font-family: "Sora", sans-serif;

/* Inter (neutralidad extrema, profesional) */
font-family: "Inter", sans-serif;

/* Poppins (playful, moderno) */
font-family: "Poppins", sans-serif;

/* Plus Jakarta Sans (sofisticada) */
font-family: "Plus Jakarta Sans", sans-serif;

/* Satoshi (futurista) */
font-family: "Satoshi", sans-serif;

/* Space Mono (monoespaciada, técnica) */
font-family: "Space Mono", monospace;
```

---

### 8️⃣ Cambiar Opacidad de Backgrounds

**Archivo**: `app/globals.css`  
**Líneas**: 21-25

```css
--opacity-xs: 0.45;   ← Very subtle
--opacity-sm: 0.65;   ← Subtle
--opacity-md: 0.80;   ← Medium
--opacity-lg: 0.92;   ← Strong
--opacity-xl: 0.98;   ← Very strong
```

**Usar en componentes**:
```html
<!-- Overlay semitransparente con opacity token -->
<div className="absolute inset-0 bg-black/[var(--opacity-md)]"></div>

<!-- O directamente en Tailwind -->
<div className="bg-white/80">Fondo casi opaco</div>
<div className="bg-white/60">Fondo semitransparente</div>
```

---

## 🎯 Tareas Específicas

### Hacer un Botón Personalizado

```html
<!-- Usar clases existentes -->
<button class="btn-primary">Estándar</button>
<button class="btn-primary md:px-8 md:py-4">Más grande</button>

<!-- Con icono -->
<button class="btn-primary gap-2">
  <svg><!-- icono --></svg>
  Descargar
</button>
```

---

### Hacer una Tarjeta Personalizada

```html
<div class="card-base p-6 lg:p-8">
  <!-- Contenido -->
</div>

<!-- Con hover effect -->
<div class="card-interactive hover:shadow-lg transition-shadow">
  <!-- Contenido -->
</div>

<!-- Elevated (más profundidad) -->
<div class="card-elevated p-8 shadow-[var(--shadow-strong)]">
  <!-- Contenido importante -->
</div>
```

---

### Hacer Texto Responsivo

```html
<!-- Pequeño en mobile, grande en desktop -->
<h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold">
  Título Responsivo
</h1>

<!-- O usar las clases de tipografía -->
<h1 class="heading-h2 lg:heading-h1">
  Usa heading-h2 en mobile, h1 en desktop
</h1>
```

---

### Hacer Spacing Responsivo

```html
<!-- Menos espacio en mobile, más en desktop -->
<div class="space-y-6 lg:space-y-12">
  <p>Párrafo 1</p>
  <p>Párrafo 2</p>
  <p>Párrafo 3</p>
</div>

<!-- Padding responsivo en secciones -->
<section class="px-4 sm:px-8 lg:px-20 py-24 sm:py-32 lg:py-40">
  Contenido
</section>
```

---

## 🔍 Debugging Rápido

### "El botón no cambió de color"
1. Abre DevTools (F12)
2. Inspecciona el botón
3. Busca la clase `.btn-primary`
4. Verifica que `--color-primary` esté en `globals.css`
5. Hard refresh: Ctrl+Shift+R

### "El texto no se ve"
1. Abre DevTools
2. Inspecciona el texto
3. Ve la pestaña "Computed"
4. Busca la propiedad `color`
5. Si es blanco sobre blanco → añade clase explícita de color

### "El layout está roto"
1. Busca `overflow-hidden` en contenedores (¡mal!)
2. Busca grids complejos como `grid-cols-[1.2fr_0.8fr]` (reemplaza con `grid-cols-2`)
3. Verifica que los `flex-shrink-0` estén en íconos pequeños
4. Verifica `break-words` en elementos que contengan texto

---

## 📊 Comparación: Antes vs Después

### ANTES (Problema)
```
- Colores definidos en 3 lugares
- Radio de bordes: 6 valores diferentes sin escala
- Espaciado sin consistencia
- 50+ clases duplicadas
- Cambiar color = editar 10 archivos
```

### DESPUÉS (Solución)
```
✅ Todos los colores en 1 lugar (globals.css línea 48-75)
✅ Radio de bordes: 6 tokens consistentes
✅ Espaciado en escala de 8px
✅ Clases componentizadas (.btn-primary, .card-base, .input-field)
✅ Cambiar color = editar 1 línea
```

---

## ✨ Resultado Visual

El sistema está diseñado para parecer:
- **Profesional** como Stripe
- **Minimalista** como Vercel  
- **Accesible** como Notion
- **Moderno** y escalable

---

## 📝 Template para Nuevas Secciones

Usa este patrón para crear secciones nuevas:

```html
<section className="py-24 sm:py-32 lg:py-40 bg-white">
  <div className="section-shell">
    {/* Divider (opcional) */}
    <div className="section-divider mb-12" />

    {/* Header con Eyebrow + Heading */}
    <div className="space-y-4 mb-16">
      <span className="eyebrow">SECCIÓN</span>
      <h2 className="heading-h2">Título Principal</h2>
      <p className="body-large text-[var(--color-text-secondary)]">
        Descripción o subtítulo
      </p>
    </div>

    {/* Contenido Principal */}
    <div className="space-y-8">
      {/* Aquí va tu contenido */}
      {/* Usa .card-base, .btn-primary, .chip, etc. */}
    </div>
  </div>
</section>
```

---

## 🚀 Próximos Pasos

Si quieres hacer cambios más complejos:
1. Lee `ARQUITECTURA_ESTILOS.md` completo
2. Entiende los 4 niveles de abstracción
3. Crea nuevas clases en `globals.css` si necesitas patrones nuevos
4. Siempre usa tokens (`--color-primary`, etc.) en lugar de valores hardcoded

---

**Última actualización**: Mayo 2026  
**Versión**: 1.0  
**Estilo**: European Professional System
