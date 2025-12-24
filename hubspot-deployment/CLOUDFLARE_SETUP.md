# Configuración Cloudflare Pages

## Para Opción 2: CDN + Embed Simple

### 🎯 Setup en Cloudflare Pages (GRATIS)

Cloudflare Pages te permite deployar automáticamente desde GitHub. Cada push recompila y publica.

---

## 📋 Requisitos

- ✅ Cuenta GitHub (gratis)
- ✅ Cuenta Cloudflare (gratis)
- ✅ Este repo en GitHub

---

## 🚀 Paso 1: Conectar Cloudflare a GitHub

1. Ir a https://dash.cloudflare.com/
2. Login (o crear cuenta gratis)
3. Sidebar → Pages
4. Botón azul "Create a project"
5. Seleccionar "Connect to Git"
6. Autorizar Cloudflare a acceder a GitHub
7. Seleccionar tu repo (el de la encuesta)
8. Seleccionar rama: `main` o `develop`

---

## ⚙️ Paso 2: Configurar Build

En la pantalla de configuración, llenar:

```
Framework preset:     None (personalizado)
Build command:        npm run build
Build output:         dist/
Environment variables: (Dejar en blanco por ahora)
```

### ¿Qué hace cada una?

| Campo | Valor | Razón |
|-------|-------|-------|
| **Build command** | `npm run build` | Compila React + SurveyJS |
| **Build output** | `dist/` | Carpeta con HTML+CSS+JS compilado |
| **Framework** | None | No usamos Next.js, solo Vite |

---

## 🔐 Paso 3: Configurar Secrets (Opcional)

Si quieres cambiar webhook desde UI:

1. En Cloudflare Pages → Settings → Environment variables
2. Agregar:

```
VITE_WEBHOOK_URL = https://n8n.openip.cl/webhook/survey-ebook
VITE_SURVEY_TITLE = Encuesta de Motivación Apprecio 2026
VITE_PRIMARY_COLOR = #FA345E
```

Luego en `dist/index.html`:

```javascript
const config = {
    webhookUrl: process.env.VITE_WEBHOOK_URL,
    surveyTitle: process.env.VITE_SURVEY_TITLE,
    primaryColor: process.env.VITE_PRIMARY_COLOR
};
```

---

## ✅ Paso 4: Deploying

```
Framework preset:     None
Build command:        npm run build
Build output:         dist/
```

Click en **Save and Deploy**

Cloudflare automáticamente:
1. ✅ Clona tu repo
2. ✅ Ejecuta `npm install`
3. ✅ Ejecuta `npm run build`
4. ✅ Publica la carpeta `dist/`
5. ✅ Te da URL: `https://survey-apprecio.pages.dev`

---

## 📱 Resultado

Después del deploy:

- **Landing:** https://survey-apprecio.pages.dev/
- **Assets JS:** https://survey-apprecio.pages.dev/assets/survey-bundle.min.js
- **Assets CSS:** https://survey-apprecio.pages.dev/assets/survey-styles.css

**Copiar la URL** para usar en HubSpot.

---

## 🔄 Auto-Deploy (Cada Push)

```bash
# En tu terminal local
git add -A
git commit -m "Update survey"
git push origin main
```

Cloudflare detecta el push y automáticamente:
1. Recompila
2. Publica
3. Tu landing se actualiza al instante

**No necesitas tocar nada en HubSpot.**

---

## 📊 Monitorar Deploy

En Cloudflare Pages → Tu proyecto:

- **Deployments:** Ver histórico de builds
- **Build logs:** Click en deployment → "View build log"
- **Analytics:** Traffic, performance, etc.

---

## 🌍 Dominio Personalizado (Opcional)

Si quieres dominio propio (no pages.dev):

1. Cloudflare → Pages → Settings → Custom domains
2. Agregar tu dominio
3. Apuntar DNS a Cloudflare (si es nuevo)
4. Listo ✨

---

## 🐛 Troubleshooting

### Build falla

**Ver logs:**
1. Deployments → Último deployment
2. Click en deployment fallido
3. "View build log" → buscar el error

**Causas comunes:**
- `npm install` falla: Revisar package.json
- `npm run build` falla: Revisar código TypeScript
- Archivos faltantes: Git push no incluyó archivos

### Assets 404

```
https://survey-apprecio.pages.dev/assets/survey-bundle.min.js → 404
```

Causas:
- ✓ Verificar que `dist/assets/` existe localmente
- ✓ Verificar que `npm run build` crea los archivos
- ✓ Forzar Cloudflare a revalidar: Settings → Clear cache

### Encuesta no carga en landing

- ✓ Abrir DevTools → Console
- ✓ Buscar errores de red
- ✓ Verificar que URLs en HTML apuntan a Cloudflare Pages (no localhost)

---

## ⚡ Performance

Cloudflare cachea automáticamente en edge:
- **Primera carga:** 2-3 segundos (compilación)
- **Visitas siguientes:** <500ms (caché edge)

---

## 💾 Backups Automáticos

Cloudflare guarda todos los deployments:
- Puedes rollback a versión anterior en 1 click
- Histórico completo en Deployments

---

## 📞 Soporte Cloudflare

Para errores o dudas:
- Docs: https://developers.cloudflare.com/pages/
- Community: https://community.cloudflare.com

---

## 🎉 Listo!

Tu encuesta está viva en:
**https://survey-apprecio.pages.dev**

Usa esto en el código embed para HubSpot:

```html
<link rel="stylesheet" href="https://survey-apprecio.pages.dev/assets/survey-styles.css">
<script src="https://survey-apprecio.pages.dev/assets/survey-bundle.min.js"></script>
```

