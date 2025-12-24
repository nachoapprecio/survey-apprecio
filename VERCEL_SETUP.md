# 🚀 Vercel Pro Setup - Survey Apprecio

Guía completa para desplegar esta encuesta en **Vercel Pro con tu dominio personalizado**.

---

## ✨ Setup Rápido (5 minutos)

### Paso 1: Crear Repositorio en GitHub

```bash
# En GitHub.com:
1. Click "New repository"
2. Nombre: survey-apprecio
3. Description: "Encuesta de Motivación Apprecio 2026"
4. Public (si lo necesitas) o Private
5. Create repository
```

### Paso 2: Hacer Push Inicial

```bash
# En terminal local
cd /Users/ignaciomolina/Desktop/Survey

# Verificar que git está configurado
git remote -v

# Si necesitas cambiar la URL:
git remote set-url origin https://github.com/tu-usuario/survey-apprecio.git

# Hacer push
git branch -M main
git push -u origin main
```

### Paso 3: Conectar Vercel

1. **Ir a:** https://vercel.com/new
2. **Login** con tu cuenta GitHub Pro
3. **Importar proyecto:**
   - Seleccionar `survey-apprecio` repo
   - Framework: **Vite**
   - Build command: `npm run build`
   - Output: `dist/`
   - Env vars: (dejar vacío por ahora)
   - Click "Deploy"

**Resultado:** Tu app está en `https://survey-apprecio.vercel.app` (temporal)

### Paso 4: Configurar Dominio Personalizado

1. **En Vercel Dashboard:**
   - Project → Settings → Domains
   - Click "Add"
   - Ingresar: `survey.tudominio.com`

2. **En tu proveedor DNS (GoDaddy, Cloudflare, etc):**
   - Agregar CNAME record:
     ```
     Nombre: survey
     Tipo: CNAME
     Valor: cname.vercel-dns.com.
     ```
   - Esperar 5-15 minutos para propagación

3. **Verificar en Vercel:**
   - Dashboard mostrará "Valid Configuration" ✅

**Resultado:** Tu encuesta está en `https://survey.tudominio.com` 🎉

---

## 📋 Configuración Detallada

### vercel.json

Ya incluido en el repo. Configura:
- Build command: `npm run build`
- Output directory: `dist/`
- Framework: Vite
- Auto-redeploy en cada push

### Environment Variables (Opcional)

Si quieres personalizar desde Vercel UI:

1. **Vercel Dashboard → Settings → Environment Variables**
2. Agregar (ejemplos):
   ```
   VITE_WEBHOOK_URL = https://n8n.openip.cl/webhook/survey-ebook
   VITE_SURVEY_TITLE = Encuesta de Motivación 2026
   VITE_PRIMARY_COLOR = #FA345E
   ```

3. **En el código:**
   ```typescript
   const config = {
       webhookUrl: import.meta.env.VITE_WEBHOOK_URL,
       surveyTitle: import.meta.env.VITE_SURVEY_TITLE,
       primaryColor: import.meta.env.VITE_PRIMARY_COLOR
   };
   ```

---

## 🔄 Workflow: Actualizar Encuesta

**Opción A: Cambios rápidos (colores, textos)**

```bash
# 1. Editar en local
# - Cambiar colores en dist/index.html
# - Cambiar textos en src/components/SurveyComponent.tsx

# 2. Compilar
npm run build

# 3. Commit y push
git add -A
git commit -m "Update survey colors/texts"
git push
```

**Vercel automáticamente:**
1. Detecta push
2. Ejecuta `npm run build`
3. Publica en https://survey.tudominio.com
4. **Listo en 30 segundos ✨**

**Opción B: Cambios de preguntas/lógica**

```bash
# 1. Editar src/components/SurveyComponent.tsx
# - Agregar/quitar páginas
# - Cambiar preguntas
# - Actualizar validación

# 2. Test local
npm run dev
# Abrir http://localhost:5174
# Probar cambios

# 3. Si OK, compilar y push
npm run build
git add -A
git commit -m "Add new survey pages"
git push
```

---

## 📊 Monitoreo

### Vercel Dashboard

- **Deployments:** Ver histórico de builds
- **Analytics:** Tráfico, performance, regiones
- **Logs:** Build logs, runtime logs

### Respuestas de la Encuesta

- **N8N Dashboard:** https://n8n.openip.cl
- Ver workflow "survey-ebook"
- Click en ejecuciones para ver JSON de respuestas

---

## 🔗 URLs Finales

```
Landing: https://survey.tudominio.com
Assets JS: https://survey.tudominio.com/assets/survey-bundle.min.js
Assets CSS: https://survey.tudominio.com/assets/survey-styles.css

Para HubSpot embed:
https://survey.tudominio.com/assets/survey-styles.css
https://survey.tudominio.com/assets/survey-bundle.min.js
```

---

## 🐛 Troubleshooting

### Build falla en Vercel

**Ver logs:**
1. Vercel Dashboard → Deployments
2. Click en build fallido
3. "View logs" → buscar error

**Causas comunes:**
- TypeScript error: Revisar `npm run build` localmente
- Module not found: Verificar imports en código
- Missing env var: Revisar vercel.json

**Solución:**
```bash
# Local test
npm run build
npm run preview

# Si falla, verificar:
npm install
npm run build
```

### Dominio CNAME no funciona

1. Verificar CNAME record en DNS:
   ```bash
   nslookup survey.tudominio.com
   # Debe devolver: cname.vercel-dns.com
   ```

2. Esperar propagación (5-15 min):
   - Cloudflare: más rápido (~5 min)
   - GoDaddy: más lento (~30 min)

3. Hard refresh navegador: `Cmd+Shift+R`

### Encuesta no carga

1. Abrir: https://survey.tudominio.com
2. DevTools → Console
3. Buscar errores
4. Verificar que assets cargan:
   - survey-bundle.min.js
   - survey-styles.css

---

## 🔐 Seguridad

- ✅ HTTPS automático (Vercel Certificate)
- ✅ DDoS protection (Vercel)
- ✅ Webhook HTTPS (N8N)
- ✅ No se almacenan datos en Vercel
- ✅ Datos enviados directo a N8N

---

## 📈 Performance

| Métrica | Valor |
|---------|-------|
| TTFB | <200ms |
| First Load | 1-2s |
| Subsequent Loads | <500ms |
| JS Bundle | 400K gzip |
| CSS Bundle | 34K gzip |

Vercel cachea globalmente en edge servers.

---

## 💡 Tips

💡 **Tip 1:** Cada push automáticamente deploya nueva versión. No necesitas hacer nada más.

💡 **Tip 2:** Vercel guarda últimos 50 deployments. Puedes rollback en 1 click.

💡 **Tip 3:** Los logs de build están disponibles para debugging.

💡 **Tip 4:** Puedes tener múltiples dominios apuntando al mismo proyecto.

💡 **Tip 5:** Las env vars se pueden cambiar sin redeployar (si usas `import.meta.env`).

---

## 🎯 Código para HubSpot Landing

Una vez configurado Vercel con tu dominio, pega esto en tu landing:

```html
<div id="survey-container"></div>

<link rel="stylesheet" href="https://survey.tudominio.com/assets/survey-styles.css">

<script src="https://survey.tudominio.com/assets/survey-bundle.min.js"></script>

<script>
window.addEventListener('load', function() {
  if (window.initSurvey) {
    window.initSurvey(document.getElementById('survey-container'), {
      webhookUrl: 'https://n8n.openip.cl/webhook/survey-ebook',
      primaryColor: '#FA345E'
    });
  }
});
</script>
```

---

## ✅ Checklist Deployment

- [ ] Repositorio creado en GitHub: `survey-apprecio`
- [ ] Local repo push a GitHub: `git push`
- [ ] Vercel conectada a GitHub
- [ ] Build correcto en Vercel (ver logs)
- [ ] Dominio personalizado añadido: `survey.tudominio.com`
- [ ] CNAME record creado en DNS
- [ ] Dominio resuelve correctamente
- [ ] Encuesta carga en dominio personalizado
- [ ] Logo Apprecio visible
- [ ] N8N webhook recibe datos
- [ ] HubSpot landing integrada

---

## 🚀 Próximos Pasos

1. ✅ Create repo survey-apprecio
2. ✅ Push código a GitHub
3. ✅ Deploy en Vercel
4. ✅ Configurar dominio personalizado
5. ✅ Verificar en https://survey.tudominio.com
6. ✅ Integrar en landing HubSpot
7. ✅ Test respuesta completa
8. ✅ Monitor en N8N

---

## 📞 Soporte

- **Vercel Docs:** https://vercel.com/docs
- **Vite Docs:** https://vitejs.dev
- **GitHub Docs:** https://docs.github.com
- **N8N Support:** https://community.n8n.io

---

**Listo para desplegar en Vercel Pro con dominio propio.** ✨

Reemplaza `tu-usuario` con tu usuario de GitHub y `tudominio.com` con tu dominio real.

