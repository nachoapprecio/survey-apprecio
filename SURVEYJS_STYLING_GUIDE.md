# SurveyJS Styling - Guía Experto

## 1. ARQUITECTURA DE TEMAS

### Temas Disponibles en survey-core:
- **defaultV2.css**: Tema moderno por defecto (recomendado)
- **modern.css**: Tema moderno alternativo
- **survey.css**: Tema heredado
- **survey-core.css**: Tema base

Cada tema tiene versiones:
- `.css` - Sin minificar (para desarrollo)
- `.min.css` - Minificado (para producción)
- `.fontless.css` - Sin fuentes Google Fonts

### Sistema de Variables CSS

SurveyJS usa **CSS Custom Properties** (variables) que se pueden sobrescribir:

```css
--sjs-base-unit: 8px                           /* Unidad base para espaciado */
--sjs-font-size: 16px                          /* Tamaño de fuente general */
--sjs-primary-backcolor: #fa345e               /* Color de fondo primario */
--sjs-primary-forecolor: #ffffff               /* Color de texto primario */
--sjs-general-backcolor: #ffffff               /* Color de fondo general */
--sjs-general-forecolor: #000000               /* Color de texto general */
--sjs-general-backcolor-dim-light: #f9f9f9    /* Fondo gris claro */
--sjs-general-dim-forecolor: rgba(0,0,0,0.91) /* Texto gris oscuro */
--sjs-general-dim-forecolor-light: rgba(0,0,0,0.45) /* Texto gris claro */
--sjs-border-default: 1px solid #e0e0e0       /* Borde por defecto */
--sjs-shadow-small: 0px 1px 2px rgba(0,0,0,0.15)
--sjs-shadow-medium: 0px 2px 6px rgba(0,0,0,0.1)
--sjs-transition-duration: 150ms               /* Duración de animaciones */
```

## 2. ESTRUCTURA DE CLASES PRINCIPALES

### Contenedor Raíz
```
.sv-root                      Raíz del componente
  └─ .sv-root--sticky-top    Cuando la barra de progreso es sticky
```

### Encuesta
```
.sv-survey                    Contenedor principal de la encuesta
  └─ .sv-body                Cuerpo de la encuesta
      ├─ .sd-page            Página individual
      │   ├─ .sd-page__title Título de página
      │   └─ .sd-row          Fila de elementos
      │       └─ .sv-components-column Columna con pregunta
      │
      ├─ .sd-progress        Barra de progreso
      │   ├─ .sd-progress__bar Barra visual
      │   ├─ .sd-progress__text Texto de progreso
      │   └─ .sd-progress__page-description Descripción de página
      │
      └─ .sv-footer          Pie de la encuesta
          └─ .sv-button-set   Botones de navegación
```

### Elementos de Pregunta
```
.sd-element                   Contenedor de pregunta
  ├─ .sd-element__title       Título de pregunta
  ├─ .sd-element__description Descripción
  └─ .sd-element__content     Contenido del control

Por tipo de pregunta:
.sd-question                  Pregunta general
.sd-radiogroup               Radio buttons
.sd-checkbox                 Checkboxes
.sd-dropdown                 Dropdown
.sd-text                     Texto
.sd-textarea                 Área de texto
.sd-rating                   Escala de calificación
.sd-matrix                   Matriz
.sd-ranking                  Ranking
```

### Botones
```
.sv-button-set               Contenedor de botones
  └─ .sv-btn                 Botón individual
      ├─ .sv-btn__text       Texto del botón
      ├─ .sv-btn--prev       Botón anterior
      ├─ .sv-btn--next       Botón siguiente
      └─ .sv-btn--complete   Botón completar
```

## 3. RESPONSIVE DESIGN

### Media Queries en defaultV2.css
```css
@media only screen and (max-width: 1000px) {
  /* Cambios para tablets y móviles */
  .sd-progress__text {
    margin-left: 10px;  /* En lugar de 5% en desktop */
  }
}

@media only screen and (min-width: 1000px) {
  /* Desktop */
  .sd-progress__text {
    margin-left: 5%;
  }
}
```

### Breakpoints Recomendados para Móvil
```css
/* Móviles pequeños (< 480px) */
@media (max-width: 479px) { }

/* Móviles medianos (480px - 767px) */
@media (min-width: 480px) and (max-width: 767px) { }

/* Tablets (768px - 1023px) */
@media (min-width: 768px) and (max-width: 1023px) { }

/* Desktop (>= 1024px) */
@media (min-width: 1024px) { }
```

## 4. JERARQUÍA DE CASCADA CSS

El orden de importancia en SurveyJS:

1. **Estilos inline** (más específicos)
2. **Tu CSS personalizado** (debe venir DESPUÉS de la importación de survey)
3. **CSS de SurveyJS** (defaultV2.css)
4. **Estilos heredados** (menos específicos)

```css
/* En tu App.css */
@import 'survey-core/defaultV2.css';  /* Primero: tema base */

/* Luego: tus sobrescrituras globales */
:root {
  --sjs-primary-backcolor: #fa345e;
  --sjs-primary-forecolor: #ffffff;
  --sjs-font-family: 'Montserrat', sans-serif;
}

/* Especificidades más altas para elementos específicos */
.sv-root .sv-button-set .sv-btn {
  border: 3px solid #1b1b1b;
  border-radius: 5px;
}

/* Media queries al final */
@media (max-width: 767px) {
  .sv-root {
    padding: 1rem;
  }
}
```

## 5. CÓMO PERSONALIZAR ESTILOS

### Opción 1: Variables CSS (Recomendado)
```css
:root {
  --sjs-base-unit: 8px;
  --sjs-font-size: 16px;
  --sjs-primary-backcolor: #fa345e;
  --sjs-general-backcolor: #ffffff;
  --sjs-border-default: 1px solid #e0e0e0;
}
```

### Opción 2: Selectores Específicos
```css
/* Botones */
.sv-button-set .sv-btn {
  background-color: #fa345e;
  color: #ffffff;
  border: 3px solid #1b1b1b;
  border-radius: 5px;
}

.sv-button-set .sv-btn:hover {
  background-color: #e82451;
  transform: scale(1.05);
}

/* Rating buttons */
.sd-rating .sv-btn--selected {
  background-color: #fa345e;
  color: #ffffff;
}

/* Preguntas */
.sd-element__title {
  font-size: 18px;
  font-weight: 700;
  color: #1b1b1b;
}

/* Barra de progreso */
.sd-progress__bar {
  background-color: #fa345e;
  height: 6px;
}

/* Inputs */
.sd-input,
.sd-dropdown,
.sd-textarea {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 10px;
  font-family: 'Montserrat', sans-serif;
}

.sd-input:focus,
.sd-dropdown:focus,
.sd-textarea:focus {
  border-color: #fa345e;
  box-shadow: 0 0 0 3px rgba(250, 52, 94, 0.1);
}
```

## 6. PROBLEMAS COMUNES Y SOLUCIONES

### Problema: Estilos no se aplican
**Solución**: Aumentar especificidad o usar `!important`
```css
.sv-root .sd-element .sd-element__title {
  color: #1b1b1b !important;
}
```

### Problema: Diferentes en móvil vs desktop
**Solución**: Usar media queries
```css
@media (max-width: 767px) {
  .sv-root {
    padding: 0.5rem;
  }
  
  .sv-button-set {
    flex-direction: column;
  }
  
  .sv-btn {
    width: 100%;
  }
}
```

### Problema: Fuentes no heredan correctamente
**Solución**: Aplicar a .sv-root
```css
.sv-root {
  font-family: 'Montserrat', sans-serif;
}

.sv-root * {
  font-family: 'Montserrat', sans-serif;
}
```

### Problema: Espaciado inconsistente
**Solución**: Usar --sjs-base-unit
```css
.sv-root {
  --sjs-base-unit: 8px;
}

/* Ahora puedes usar multiplicadores */
.sd-element {
  padding: calc(2 * var(--sjs-base-unit));  /* 16px */
  margin-bottom: calc(1.5 * var(--sjs-base-unit));  /* 12px */
}
```

## 7. DEBUGGING CSS

### Ver qué clases se aplican
```javascript
// En consola del navegador
document.querySelectorAll('.sv-root *').forEach(el => {
  console.log(el.className);
});
```

### Inspeccionar variables CSS
```javascript
const root = document.documentElement;
const computed = getComputedStyle(root);
console.log('--sjs-primary-backcolor:', computed.getPropertyValue('--sjs-primary-backcolor'));
```

### Verificar especificidad
Usar DevTools de navegador (F12) > Elements > Styles para ver:
- Qué reglas se aplican
- Qué reglas están sobrescritas
- Especificidad de cada regla

## 8. MEJORES PRÁCTICAS

✅ **HACER:**
- Usar variables CSS para temas
- Aplicar media queries para responsividad
- Usar clases específicas de SurveyJS
- Documentar personalizaciones
- Probar en múltiples dispositivos

❌ **NO HACER:**
- Sobrescribir `!important` innecesariamente
- Depender de selectores genéricos (div, span, etc.)
- Importar CSS de SurveyJS después de tu CSS
- Cambiar estructura HTML (cambia clases)
- Usar unidades fijas en lugar de relativas

## 9. RECURSOS ÚTILES

- Documentación oficial: https://surveyjs.io/Documentation/Library
- GitHub: https://github.com/surveyjs/survey-library
- Ejemplos: https://surveyjs.io/form-library/examples/nps-question/reactjs
- Temas: https://surveyjs.io/form-library/examples/survey-library-themes/reactjs
