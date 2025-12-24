# 🚀 HubSpot Deployment Guide - Encuesta Apprecio

Guía completa para desplegar la encuesta React en HubSpot CMS con 2 opciones según tu plan.

---

## 🎯 Elige tu Opción

### **Opción 2: CDN + Embed Simple** (Recomendado para empezar)
Para cualquier plan de HubSpot (incluyendo Starter)

- ✅ Setup en 5 minutos
- ✅ Totalmente gratis (Cloudflare Pages)
- ✅ Auto-actualización con GitHub push
- ✅ No requiere Developer Pro

📖 [Ir a Opción 2](./OPCION2-CDN-EMBED/README.md)

---

### **Opción 3: HubSpot Custom Module** (Máxima integración)
Para clientes con HubSpot Developer Pro ($50/mes)

- ✅ Integración 100% nativa HubSpot
- ✅ UI visual para editar configuración
- ✅ Módulo reutilizable en múltiples landings
- ✅ No-técnicos pueden hacer cambios

📖 [Ir a Opción 3](./OPCION3-CUSTOM-MODULE/README.md)

---

## 📊 Comparativa Rápida

| | **Opción 2** | **Opción 3** |
|-------|---------|---------|
| **Plan requerido** | Starter+ | Developer Pro |
| **Costo** | $0 | $0* |
| **Tiempo setup** | 5 min | 20 min |
| **Edición UI** | No (código) | Sí (visual) |
| **Para principiantes** | ✅ Mejor | OK |
| **Múltiples landings** | Copy-paste | Un módulo |
| **Auto-deploy** | GitHub → CDN | GitHub → HubSpot |

*Developer Pro ya incluye módulos. Si no tienes Pro, no es recomendable pagar solo por módulos.

---

## 🔍 ¿No sabes cuál elegir?

### 📋 Preguntas de decisión:

1. **¿Tienes HubSpot Developer Pro?**
   - No → Opción 2 (obligatorio)
   - Sí → Considera Opción 3

2. **¿Editores no-técnicos harán cambios?**
   - Sí → Opción 3 (UI visual)
   - No → Opción 2 (más simple)

3. **¿Necesitas máxima velocidad de setup?**
   - Sí → Opción 2 (5 minutos)
   - No → Opción 3 (mejor integración)

👉 [Leer guía de decisión completa](./GUIA_DECISION.md)

---

## 🚀 Quick Start Opción 2

```bash
# 1. Ir a https://cloudflare.com/pages (gratis)
# 2. Conectar tu repo GitHub
# 3. Build settings:
#    - Build command: npm run build
#    - Output: dist/
# 4. Deploy automático ✅

# Tu encuesta está en: https://survey-apprecio.pages.dev
```

Código para pegar en landing:
```html
<div id="survey-container"></div>
<link rel="stylesheet" href="https://survey-apprecio.pages.dev/assets/survey-styles.css">
<script src="https://survey-apprecio.pages.dev/assets/survey-bundle.min.js"></script>
<script>
document.addEventListener('DOMContentLoaded', function() {
  if (window.initSurvey) {
    window.initSurvey('survey-container', {
      webhookUrl: 'https://n8n.openip.cl/webhook/survey-ebook'
    });
  }
});
</script>
```

---

## 🚀 Quick Start Opción 3

```bash
# 1. Verificar que tienes Developer Pro en HubSpot
# 2. Conectar este repo a HubSpot Dev
# 3. Crear módulo desde repo
# 4. Usar en landings ✅
```

---

## 📁 Estructura de Archivos

```
hubspot-deployment/
├── GUIA_DECISION.md                    # ← Lee primero
├── OPCION2-CDN-EMBED/
│   └── README.md                       # Instrucciones Opción 2
├── OPCION3-CUSTOM-MODULE/
│   ├── README.md                       # Instrucciones Opción 3
│   ├── meta.yaml                       # Metadatos del módulo
│   ├── fields.json                     # Campos editables
│   ├── module.html                     # Template
│   ├── module.scss                     # Estilos
│   ├── module.js                       # Lógica
│   └── package.json                    # Dependencias
├── CLOUDFLARE_SETUP.md                 # Setup detallado Cloudflare
└── README.md                           # Este archivo
```

---

## 🔗 Archivos Necesarios

La encuesta necesita estos assets compilados:

### `dist/index.html` (12KB)
- Template HTML para standalone
- Carga CSS y JS
- Inicializa la encuesta

### `dist/assets/survey-bundle.min.js` (1.8M → 400K gzip)
- React 18
- SurveyJS Core + React UI
- Código de la encuesta

### `dist/assets/survey-styles.css` (286K → 34K gzip)
- SurveyJS defaultV2 theme
- Overrides personalizados
- Responsive design

---

## 🛠️ Recompilar Assets

Si haces cambios a la encuesta:

```bash
# En terminal del proyecto principal
npm run build

# Genera los archivos en dist/
# Commit y push para auto-deploy
```

---

## 🌐 Webhook N8N

Ambas opciones envían datos a:
```
https://n8n.openip.cl/webhook/survey-ebook
```

Respuestas:
1. Usuario completa encuesta
2. JavaScript envía POST con datos JSON
3. N8N recibe y procesa
4. Datos disponibles en N8N dashboard

---

## 📊 Datos Recopilados

La encuesta captura:
- Edad
- Género
- Situación laboral
- Tiempo en Apprecio
- Preguntas de motivación/expectativas
- Timestamp de respuesta

```json
{
  "edad": 28,
  "genero": "Masculino",
  "situacion_laboral": 1,
  "tiempo_apprecio": 2,
  "motivacion_1": 8,
  "... más campos"
}
```

---

## 🔐 Seguridad

- ✅ HTTPS en todos lados (CDN + N8N)
- ✅ Webhook validado en N8N
- ✅ Datos no almacenados en CDN
- ✅ Solo enviados a N8N
- ✅ CORS protegido

---

## 📱 Responsive

Ambas opciones soportan:
- ✅ Desktop (1024px+)
- ✅ Tablet (768-1023px)
- ✅ Mobile (480-767px)
- ✅ Small mobile (<479px)

Con optimizaciones de UX para cada breakpoint.

---

## ⚡ Performance

| Métrica | Valor |
|---------|-------|
| First contentful paint | ~1.5s |
| Interactive | ~3s |
| Bundle size | 400K gzip (JS + CSS) |
| CDN cache | Edge global (50ms+) |

---

## 🐛 Troubleshooting

### La encuesta no carga
1. Abrir DevTools → Console
2. Buscar errores JavaScript
3. Verificar URLs de assets en Network tab
4. Revisar que bundle.min.js se descargó

### Colores no se aplican
1. Limpiar caché del navegador
2. Verificar `primaryColor` en config
3. Recargar página con Cmd+Shift+R (Mac) o Ctrl+Shift+R (Windows)

### Webhook no recibe datos
1. Verificar URL en código
2. Abrir N8N y revisar que webhook está activo
3. Ver DevTools → Network → POST requests
4. Revisar respuesta HTTP del webhook

### Estilos rotos en mobile
1. Verificar viewport meta tag en HTML
2. Revisar breakpoints en CSS
3. Probar con DevTools device emulation

---

## 📖 Documentación Adicional

- [HUBSPOT_DEPLOYMENT_ANALYSIS.md](../HUBSPOT_DEPLOYMENT_ANALYSIS.md) - Análisis técnico de opciones
- [Cloudflare Pages Docs](https://developers.cloudflare.com/pages/)
- [SurveyJS Docs](https://surveyjs.io/form-library/documentation)
- [HubSpot Modules](https://developers.hubspot.com/docs/cms/building-blocks/modules)

---

## ✅ Checklist Pre-Deploy

Antes de hacer deploy en producción:

- [ ] Cambiar webhook URL (de desarrollo a producción)
- [ ] Verificar colores branding (#FA345E)
- [ ] Revisar textos en español
- [ ] Probar en mobile/tablet/desktop
- [ ] Verificar que N8N webhook está activo
- [ ] Hacer test de respuesta completa
- [ ] Revisar respuesta en N8N
- [ ] Configurar analytics (si aplica)

---

## 🚀 Próximos Pasos

1. **Lee** [GUIA_DECISION.md](./GUIA_DECISION.md) para decidir tu opción
2. **Elige** Opción 2 o 3 según tu plan
3. **Sigue** instrucciones en el README correspondiente
4. **Deploy** usando GitHub + CDN/HubSpot
5. **Publica** encuesta en landing
6. **Monitorea** respuestas en N8N

---

## 📞 Soporte

### Errores Técnicos
- Cloudflare: https://community.cloudflare.com
- HubSpot: https://community.hubspot.com
- SurveyJS: https://github.com/surveyjs/survey-library/issues

### Cambios a la Encuesta
Edita [survey.json](../survey.json) o [SurveyComponent.tsx](../src/components/SurveyComponent.tsx)

---

## 📝 Historial de Cambios

- **v1.0** (2026-01): Lancé Opción 2 + Opción 3
- Incluye 9 páginas, validación, webhook N8N
- Diseño responsive Apprecio branding

---

## 💡 Tips

💡 **Tip 1:** Empieza con Opción 2 para test rápido, luego migra a Opción 3 si lo necesitas.

💡 **Tip 2:** Los cambios a `survey.json` se actualizan automáticamente con GitHub push.

💡 **Tip 3:** Usa Cloudflare Analytics para ver dónde viene el tráfico.

💡 **Tip 4:** N8N webhook es gratis si tienes instancia activa.

💡 **Tip 5:** Puedes copiar el código HTML en múltiples landings, solo actualiza la URL de CDN.

---

## 🎉 ¡Listo!

Tu encuesta está lista para deployar en HubSpot.

**¿Preguntas?** Revisa GUIA_DECISION.md o la opción que elegiste.

