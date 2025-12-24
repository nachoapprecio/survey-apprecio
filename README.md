# Encuesta Apprecio 2026 - Vercel Pro

Encuesta de motivación con branding Apprecio, desplegada en Vercel Pro con dominio personalizado.

## 🚀 Deployment

Desplegado automáticamente en: **https://survey-apprecio.vercel.app/**

Con dominio personalizado: **https://survey.tudominio.com** (configurar en Vercel)

## 🎨 Tech Stack

- **React 18.2.0** - UI Framework
- **TypeScript 5.x** - Type safety
- **Vite 5.4.21** - Build tool
- **SurveyJS 1.12.17** - Survey library

## 📦 Build

```bash
npm install
npm run build    # Compila a dist/
npm run dev      # Dev server en localhost:5173
```

## 🔗 Integración HubSpot

Para integrar en landing HubSpot, pega este código en un módulo Rich Text:

```html
<div id="survey-container"></div>

<link rel="stylesheet" href="https://survey-apprecio.vercel.app/assets/index-Dz6JIK8B.css">
<script src="https://survey-apprecio.vercel.app/assets/index-C3eu4Liw.js"></script>

<script>
window.addEventListener('load', function() {
  if (document.getElementById('root')) {
    // Encuesta cargada y lista
  }
});
</script>
```

**Nota:** Reemplaza `survey-apprecio.vercel.app` con tu dominio personalizado.

## 🎯 Características

- ✅ 9 páginas de preguntas
- ✅ Validación condicional (edad, situación laboral)
- ✅ Webhook N8N para respuestas
- ✅ Diseño responsive (mobile, tablet, desktop)
- ✅ Branding Apprecio (#FA345E, Montserrat font)
- ✅ Auto-deploy en cada push a GitHub

## 🔄 Workflow

```bash
# 1. Hacer cambios locales
# Editar src/components/SurveyComponent.tsx o src/App.css

# 2. Compilar
npm run build

# 3. Push a GitHub
git add -A
git commit -m "Update survey"
git push

# 4. Vercel auto-deploya en ~30 segundos
```

## 📊 Respuestas

Las respuestas se envían a: `https://n8n.openip.cl/webhook/survey-ebook`

Ver en: https://n8n.openip.cl (Dashboard N8N)

## 🌐 Dominio Personalizado

1. En Vercel: Settings → Domains → Add
2. Ingresar: `survey.tudominio.com`
3. Copiar CNAME de Vercel
4. En tu DNS: Crear record CNAME → `cname.vercel-dns.com.`
5. Esperar 5-30 minutos para propagación

## 📝 Archivos Principales

```
.
├── index.html          # Entry point (generado por Vite)
├── src/
│   ├── App.tsx        # Componente principal
│   ├── App.css        # Estilos Apprecio (sobrescribe SurveyJS)
│   ├── main.tsx       # React entry
│   └── components/
│       └── SurveyComponent.tsx  # Configuración de encuesta
├── dist/              # Compilado (generado por npm run build)
├── vite.config.ts     # Configuración Vite
├── package.json       # Dependencias
└── vercel.json        # Configuración Vercel
```

## 🎉 Listo para Producción

La encuesta está completamente funcional y lista para:
- ✅ Vercel Pro deployment
- ✅ Dominio personalizado
- ✅ Integración HubSpot
- ✅ Auto-respuestas a N8N
- ✅ Mobile responsive

---

**Últimas actualizaciones:**
- Colores #FA345E (Apprecio) aplicados correctamente
- Rutas relativas configuradas
- Build optimizado para Vercel
