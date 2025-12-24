# HubSpot Custom Module - Encuesta Apprecio

## 🚀 Opción 3: Para clientes CON HubSpot Developer Pro

### ✨ Características
- ✅ Integración 100% nativa con HubSpot
- ✅ Edición de textos y colores desde UI de HubSpot
- ✅ Sin necesidad de código en la landing
- ✅ Actualización automática sin tocar landing
- ✅ CORS y caching automático
- ✅ Analytics integrado en HubSpot

---

## 📋 Estructura de Archivos

```
apprecio-survey-module/
├── meta.yaml              # Metadatos del módulo
├── fields.json            # Campos editables en HubSpot UI
├── module.html            # Template HTML del módulo
├── module.scss            # Estilos SCSS
├── module.js              # Lógica JavaScript
├── package.json           # Dependencias npm
├── assets/                # Archivos compilados
│   ├── survey-bundle.min.js    (1.8M - React + SurveyJS compilado)
│   └── survey-styles.css       (286K - CSS compilado)
└── README.md              # Este archivo
```

---

## 🔧 Instalación en HubSpot

### Paso 1: Preparar el repositorio Git

```bash
# En tu repo (puede ser GitHub, GitLab, Bitbucket)
git clone <tu-repo>
cd apprecio-survey-module

# Instalar dependencias
npm install

# Compilar los assets
npm run build
```

### Paso 2: Conectar en HubSpot

1. **Ir a:** HubSpot → Marketplace → Developer → Manage app
2. **Crear nueva app** o usar existente
3. **Conectar repositorio Git:**
   - Ir a Development → Private Apps → OAuth & Permissions
   - Autorizar acceso a tu repo
4. **Syncar módulo:**
   - Volver a Design Manager
   - Crear nuevo módulo desde repo
   - Seleccionar rama (main, develop, etc)
5. **Publicar** el módulo

### Paso 3: Usar en Landing

1. Ir a Landing Page Editor
2. Buscar módulo "Encuesta Apprecio - Motivación 2026"
3. Draggear a la landing
4. Hacer click para editar configuración:
   - Título de encuesta
   - URL del logo
   - Color primario
   - Webhook URL
   - Textos de botones

---

## ⚙️ Configuración de fields.json

Los campos en `fields.json` determinan qué puede editarse desde HubSpot UI:

```json
{
  "groups": [
    {
      "label": "Configuración de la Encuesta",
      "fields": [
        {
          "name": "survey_title",
          "label": "Título de la Encuesta",
          "type": "text",
          "default": "Encuesta de Motivación"
        }
        // ... más campos
      ]
    }
  ]
}
```

**Tipos de campos disponibles:**
- `text` - Campo de texto
- `url` - URL
- `color` - Selector de color
- `boolean` - Sí/No
- `richtext` - HTML editor
- `choice` - Dropdown

---

## 🛠️ Compilación de Assets

El módulo incluye 2 archivos compilados en `assets/`:

### `survey-bundle.min.js` (1.8M)
Contiene:
- React 18
- React DOM 18
- SurveyJS Core
- SurveyJS React UI
- Código de la encuesta

Compilar con:
```bash
npm run build:js
```

### `survey-styles.css` (286K)
- defaultV2.css de SurveyJS
- Rating overrides
- Body overrides
- Estilos personalizados

Compilar con:
```bash
npm run build:css
```

---

## 📦 Tamaños y Optimizaciones

| Archivo | Tamaño | Comprimido |
|---------|--------|-----------|
| survey-bundle.min.js | 1.8M | ~400K gzip |
| survey-styles.css | 286K | ~34K gzip |
| **Total** | **2.1M** | **~434K gzip** |

HubSpot comprime automáticamente con gzip, así que la carga real es ~434K.

---

## 🔄 Actualizaciones

Para actualizar el módulo:

1. Hacer cambios en el repo
2. Compilar assets: `npm run build`
3. Git push a la rama conectada
4. HubSpot auto-sincroniza el módulo
5. El módulo se actualiza en todas las landings que lo usan

No requiere editar las landings nuevamente.

---

## 🌐 Variables Disponibles en module.html

Puedes usar estas variables de HubSpot en el template:

```html
<!-- Campos editables -->
{{ module.survey_title }}
{{ module.logo_url }}
{{ module.primary_color }}
{{ module.webhook_url }}
{{ module.show_progress }}
{{ module.button_prev_text }}
{{ module.button_next_text }}
{{ module.button_submit_text }}

<!-- Variables de módulo -->
{{ module.id }}              <!-- ID único -->
{{ module.name }}            <!-- Nombre del módulo -->
{{ editing_mode }}           <!-- True/False en editor -->
```

---

## 🐛 Troubleshooting

### El módulo no carga en landing
- ✓ Verificar que los assets están en `assets/`
- ✓ Verificar rutas en `module.html`
- ✓ Revisar console del navegador para errores

### Cambios no se reflejan
- ✓ Forzar re-sincronización en HubSpot Dev
- ✓ Clear cache del navegador
- ✓ Verificar que la rama está activa en HubSpot

### Webhook no recibe datos
- ✓ Verificar URL en fields
- ✓ Verificar que N8N webhook está activo
- ✓ Revisar console para errores de fetch

---

## 📞 Soporte

Para actualizar la encuesta:
- Editar `SurveyComponent.tsx` en el repo principal
- Recompilar: `npm run build`
- Los cambios se sinconizan automáticamente

---

## 📄 Notas

- El módulo usa React 18 y SurveyJS 1.12.17
- Compatible con HubSpot Developer Pro y Enterprise
- Soporta customización de colores y textos vía UI
- Responde automáticamente en mobile/tablet
