# Opción 3: HubSpot Custom Module
Para clientes con **HubSpot Developer Pro**

## ✨ Ventajas
- Integración 100% nativa
- UI de edición en HubSpot
- Actualización sin tocar landing
- CORS automático
- Analytics integrado

## 📦 Estructura

```
my-survey-module/ (en tu repo git)
├── meta.yaml
├── fields.json
├── module.html
├── module.scss
├── assets/
│   ├── survey-bundle.min.js (1.8M)
│   └── survey-styles.css
├── package.json
└── README.md
```

## 🚀 Instalación en HubSpot

1. Conectar repo Git en HubSpot Developer
2. Subir archivos del módulo
3. HubSpot compila y crea módulo
4. Usar en landings mediante drag-drop

---

# Opción 4: Landing + CDN + Serverless
Para clientes **SIN Developer Pro** o que prefieren **máxima flexibilidad**

## ✨ Ventajas
- Sin dependencias de Developer Pro
- Control total sobre versiones
- Fácil de desplegar en cualquier CDN
- Backend integrado en HubSpot Functions

## 📦 Estructura

```
/landing-assets/
├── index.html (landing simple)
├── survey-bundle.min.js (en Cloudflare/Vercel)
├── survey-styles.min.css (en Cloudflare/Vercel)
└── README.md
```

Landing HTML:
```html
<div id="app"></div>
<link rel="stylesheet" href="https://tu-cdn.com/survey-styles.min.css">
<script src="https://tu-cdn.com/survey-bundle.min.js"></script>
```

HubSpot Code:
```html
<div id="survey-container"></div>
<script>
  fetch('https://tu-backend.com/api/survey-config')
    .then(r => r.json())
    .then(config => {
      // Renderizar encuesta
    });
</script>
```

---

**¿Cuál necesitas? Responde y genero los archivos listos para usar.**
