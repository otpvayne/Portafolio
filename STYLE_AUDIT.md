# AUDITORÍA DE ESTILOS - PORTAFOLIO

## 1. LOCALIZACIÓN DE ESTILOS ACTUAL

### A) globals.css (Archivo Principal)
- 762 líneas de CSS
- Contiene:
  * Design tokens (variables CSS)
  * Reset y base styles
  * Layout components (.section-shell, .section-divider)
  * Typography system (.eyebrow, .text-label, .heading-h1, etc)
  * Button components (.btn-primary, .btn-secondary, .btn-tertiary, .btn-ghost)
  * Card components (.card-base, .card-interactive, .card-elevated, .card-minimal, .card-glass)
  * Chip/Badge components (.chip, .chip-primary, .chip-accent, .chip-success)
  * Input components (.input-field)
  * Legacy components (.panel, .glass, .glow-card)
  * Animations (@keyframes blink, slideDown)
  * Utility patterns (.gallery-strip)
  * Responsive utilities (@media)

### B) Tailwind CSS (v4)
- Via @import "tailwindcss" en globals.css
- Proporciona: utility classes (text-xl, bg-white, p-4, etc)
- Modo: jit (just-in-time) - compila solo clases usadas

### C) Estilos Inline en Componentes
- Cada componente usa clases Tailwind para estilos
- Ejemplos problemáticos:
  * Clases arbitrarias: `rounded-[var(--radius-xl)]`, `bg-[var(--color-primary)]`
  * Clases complejas: `lg:grid-cols-[1.2fr_0.8fr]` (fracciones arbitrarias)
  * Tracked letter-spacing: `tracking-[0.25em]`
  * Custom opacity: `bg-white/85`, `text-white/90`

### D) Variables CSS (:root)
- Border radius (6 escalas)
- Opacity (5 escalas)
- Shadows (4 tipos)
- Spacing (6 escalas)
- Colors (20+ variables)
- Legacy variables (para compatibilidad)

---

## 2. PROBLEMAS IDENTIFICADOS

### ❌ Problema 1: Mezcla de Abstracciones
- Tailwind utilities (bajo nivel) + CSS personalizado (alto nivel) sin clara separación
- Difícil saber cuál usar en cada caso
- **Ejemplo**: Padding con `p-6` OR `padding: 24px` via CSS class?

### ❌ Problema 2: Inconsistencia en Valores
- Tailwind values ≠ Custom CSS variables
- `p-6` = 24px, pero también existe `--space-lg: 24px`
- Colores en dos lugares: Tailwind AND CSS variables
- **Ejemplo**: ¿Usar `bg-white` o `bg-[var(--color-surface-white)]`?

### ❌ Problema 3: Especificidad de CSS (Cascada Rota)
- Body color heredado no se puede sobrescribir con Tailwind text-white
- Solución actual: `.text-white-force !important` (hack)
- Raíz del problema: Base styles demasiado agresivos

### ❌ Problema 4: Mantenibilidad Baja
- Cambiar un color requiere editar:
  * CSS variables en :root
  * Componentes React que lo usan
  * Potencialmente Tailwind classes
- No hay un "lugar central" para decidir estilos
- **Ejemplo**: Si quiero cambiar primary color, ¿dónde lo hago?

### ❌ Problema 5: Componentes Duplicados
- `.panel` vs `.card-base` - ¿cuál es la diferencia?
- `.glass` vs `.card-glass` - redundancia
- `.btn-primary` vs `.btn-secondary` vs `.btn-tertiary` vs `.btn-ghost` - 4 estilos de botón
- Difícil saber cuál usar para qué

### ❌ Problema 6: Clases Arbitrarias Tailwind Sobrecomplexas
- `rounded-[32px]` en lugar de usar `rounded-[var(--radius-xl)]`
- `lg:grid-cols-[1.2fr_0.8fr]` - fracciones arbitrarias no compilaban bien
- `text-[var(--color-primary)]` - mezcla de Tailwind + CSS variables
- Difícil de buscar, refactorizar, cambiar

---

## 3. IMPACTO EN DESARROLLO

### Cuando el usuario quiere:
"Cambiar el color primario de naranja a azul"

**Pasos actuales (COMPLEJO)**:
1. Editar `:root { --color-primary: #b45309; }` → nuevo color
2. Búsqueda en todos los componentes por "color-primary"
3. Búsqueda en todos los componentes por valores hexadecimales similares
4. Posiblemente editar Tailwind classes que referencian el color
5. Hard refresh en navegador para ver cambios
6. Verificar múltiples pantallas

**Resultado**: 15-20 minutos, riesgo de inconsistencias

---

## 4. COSTO DE MANTENIMIENTO

- 🔴 **Difícil agregar nuevos componentes**: ¿Qué convención usar?
- 🔴 **Difícil hacer cambios visuales rápidos**: Demasiados lugares donde buscar
- 🔴 **Fácil introducir inconsistencias**: Sin source of truth
- 🔴 **Onboarding lento**: Nuevo dev no sabe dónde/cómo cambiar estilos
- 🔴 **No escalable**: Conforme crece proyecto, más desorden

---

## 5. ANÁLISIS DE COMPONENTES CRÍTICOS

### About.tsx (EJEMPLO DE PROBLEMAS)
```tsx
// PROBLEMA 1: Mezcla de abstracciones
<div className="card-base bg-[var(--color-primary)] p-5 sm:p-6 rounded-2xl">
  // ☝️ card-base (CSS custom class)
  // ☝️ bg-[var(...)] (Tailwind + CSS var)
  // ☝️ p-5 sm:p-6 (Tailwind)
  // ☝️ rounded-2xl (Tailwind hardcoded, ≠ design tokens!)

  <p className="text-white-force">
    // ☝️ HACK class con !important
  </p>
</div>

// PROBLEMA 2: Inconsistencia
<div className="grid gap-6 lg:gap-8 lg:grid-cols-2">
  // ☝️ gap-6 vs gap-8? ¿Por qué dos?
  // ☝️ lg:grid-cols-2 OK, pero otros lugares usan [1.2fr_0.8fr]
</div>
```

---

## 6. SOLUCIÓN PROPUESTA: SISTEMA PROFESIONAL

Ver siguiente sección: PROPUESTA DE REFACTORIZACIÓN

