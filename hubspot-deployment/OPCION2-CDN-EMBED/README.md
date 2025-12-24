# HubSpot Deployment - Opción 2: CDN + Embed Simple

## 🎯 Para clientes SIN HubSpot Developer Pro

Este método permite desplegar la encuesta en **cualquier landing de HubSpot** sin necesidad de módulos personalizados.

### ✨ Características
- ✅ Funciona en cualquier landing de HubSpot (Starter, Pro, Enterprise)
- ✅ Solo necesitas acceso editor de landings
- ✅ Configuración única, reutilizable en múltiples landings
- ✅ Actualización rápida (no requiere módulos)
- ✅ No requiere Developer Pro

---

## 📋 Estructura

```
dist/
├── assets/
│   ├── survey-bundle.min.js    (1.8M)
│   └── survey-styles.css       (286K)
└── index.html                  (12KB)
```

---

## 🚀 Paso 1: Subir Archivos a CDN

### Opción A: Cloudflare Pages (GRATIS, recomendado)

```bash
# 1. Crear cuenta en cloudflare.com/pages (gratis)

# 2. Conectar tu repo de GitHub
# - Autorizar Cloudflare a acceder a GitHub
# - Seleccionar repo
# - Build command: npm run build
# - Publish directory: dist

# 3. Cloudflare automáticamente:
# - Compila el proyecto
# - Sube los archivos
# - Te da URL: https://survey-apprecio.pages.dev

# Los assets se sirven desde:
# https://survey-apprecio.pages.dev/assets/survey-bundle.min.js
# https://survey-apprecio.pages.dev/assets/survey-styles.css
```

### Opción B: Vercel (GRATIS)

```bash
# 1. npm install -g vercel

# 2. vercel --prod

# Te da URL: https://survey-apprecio.vercel.app

# Archivos disponibles en:
# https://survey-apprecio.vercel.app/assets/survey-bundle.min.js
# https://survey-apprecio.vercel.app/assets/survey-styles.css
```

### Opción C: AWS S3 + CloudFront (Pago, más control)

```bash
# Subir files a S3 bucket
# Configurar CloudFront distribution
# URL: https://d12345.cloudfront.net/assets/...
```

---

## 🔗 Paso 2: Copiar Código de Embed

Una vez tengas los archivos en CDN, copia este código:

```html
<!-- Para Cloudflare Pages -->
<div id="survey-container"></div>

<link rel="stylesheet" href="{{ get_asset_url('/index-Dz6JIK8B.css') }}">

<script src="https://estudios.apprecio.com/hubfs/survey/index-C3eu4Liw.js"></script>

<script>
window.addEventListener('load', function() {
  if (window.SurveyApp && window.SurveyApp.initSurvey) {
    window.SurveyApp.initSurvey('survey-container', {
      webhookUrl: 'https://n8n.openip.cl/webhook/survey-ebook',
      surveyTitle: 'Encuesta de Motivación Apprecio 2026',
      logoUrl: 'https://tu-dominio.com/logo.png',
      primaryColor: '#FA345E'
    });
  }
});
</script>
```

---

## 📌 Paso 3: Pegar en Landing de HubSpot

1. **Abrir** landing en HubSpot → Edit
2. **Agregar módulo** → Buscar "Rich Text"
3. **Pegar el código** de embed arriba en la sección HTML
4. **Guardar** y publicar landing

---

## ⚙️ Configuración Disponible

El objeto de configuración soporta:

```javascript
{
  webhookUrl: 'https://n8n.openip.cl/webhook/survey-ebook',    // Dónde enviar datos
  surveyTitle: 'Encuesta de Motivación',                       // Título mostrado
  logoUrl: 'https://tu-dominio.com/logo.png',                  // Logo URL
  primaryColor: '#FA345E',                                      // Color primario
  showProgressBar: false,                                       // Mostrar barra progreso
  autoScroll: true,                                             // Auto-scroll al cambiar página
  previousButtonText: 'Anterior',                               // Texto botón atrás
  nextButtonText: 'Siguiente',                                  // Texto botón adelante
  submitButtonText: 'Enviar Respuestas'                         // Texto botón envío
}
```

---

## 🔄 Actualizar la Encuesta

Para actualizar preguntas o lógica:

### 1. En tu repo local

```bash
# Editar SurveyComponent.tsx
# O actualizar survey.json

# Compilar
npm run build

# Subir a GitHub
git add -A
git commit -m "Update survey questions"
git push
```

### 2. CDN se auto-actualiza

- **Cloudflare Pages**: Auto-redeploy en 5-10 mins
- **Vercel**: Auto-redeploy en 1-2 mins

### 3. Landing se auto-actualiza

- Gracias al archivo JS que siempre carga la última versión
- No necesita editar landing nuevamente

---

## 📊 Monitoreo y Analytics

### Ver respuestas en N8N

1. Ir a https://n8n.openip.cl
2. Ver workflow de "survey-ebook"
3. Buscar las ejecuciones recientes
4. Cada ejecución muestra los datos JSON de la encuesta

### Ver logs en CDN

**Cloudflare Pages:**
- Panel → Deployments → Ver logs de build

**Vercel:**
- Dashboard → Deployments → Ver logs

---

## 🔐 Seguridad

| Aspecto | Protección |
|--------|-----------|
| CORS | CDN envía headers correctos |
| Webhook | HTTPS, validación en N8N |
| Datos | Se envían directo a N8N, no se guardan en CDN |
| SSL | Certificado automático (Cloudflare/Vercel) |

---

## 📱 Responsive

El CSS compilado (`survey-styles.css`) incluye:
- Mobile first design
- 4 breakpoints (mobile, tablet, desktop, full)
- Auto-ajuste de fuentes
- Rating items en una línea

---

## ⚡ Performance

| Métrica | Valor |
|--------|-------|
| JS Size | 1.8M → 400K gzip |
| CSS Size | 286K → 34K gzip |
| Load Time | ~2-3 seg (deps de conexión) |
| Time to Interactive | ~3-4 seg |

*CDN cachea archivos en edge, más rápido después del primer load*

---

## 🐛 Troubleshooting

### Survey no aparece en landing
- ✓ Verificar que el `<div id="survey-container"></div>` está en HTML
- ✓ Verificar URLs de CDN (click y confirmar que cargan)
- ✓ Abrir DevTools → Console para ver errores

### Colores/textos no cambian
- ✓ Editar objeto de configuración (Paso 2)
- ✓ El campo `primaryColor` debe ser hex válido (#FA345E)
- ✓ Refresh hard del navegador (Cmd+Shift+R)

### Webhook no recibe datos
- ✓ Verificar URL en configuración
- ✓ N8N webhook debe estar activo
- ✓ Ver DevTools → Network → POST request

---

## 🚀 Despliegue Final

```bash
# 1. Compilar
npm run build

# 2. Commit y push
git add -A
git commit -m "Production release"
git push origin main

# 3. CDN auto-compila y publica

# 4. Landing se auto-actualiza (sin hacer nada)

# 5. Monitorear respuestas en N8N
```

---

## 📞 Ventajas vs Opción 3

| Aspecto | Opción 2 | Opción 3 |
|--------|---------|---------|
| Requisito | Cualquier plan HubSpot | Developer Pro |
| Complejidad | Muy simple | Media |
| UI Edición | Manual en código | Visual en HubSpot |
| Deploy | CDN auto-actualiza | HubSpot auto-sincroniza |
| Múltiples landings | Copy-paste código | Un módulo, todo reutiliza |
| Tiempo setup | 5 minutos | 20 minutos |

---

## ✨ Próximos Pasos

1. ✅ Elegir CDN (recomendado: Cloudflare Pages)
2. ✅ Conectar repo GitHub
3. ✅ Obtener URLs de los assets
4. ✅ Copiar código embed
5. ✅ Pegar en landing HubSpot
6. ✅ Publicar landing
7. ✅ Monitorear respuestas en N8N

