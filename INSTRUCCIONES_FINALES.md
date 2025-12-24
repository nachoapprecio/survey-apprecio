# 🎯 Instrucciones Finales - Survey Apprecio

Tu proyecto está configurado y **100% listo para desplegar** en Vercel Pro con dominio personalizado.

---

## 📝 Pasos Finales (Hacer AHORA)

### 1. Crear Repositorio en GitHub

```bash
# Ir a https://github.com/new
# Crear repo: survey-apprecio
# Copiar la URL HTTPS o SSH

# En terminal:
cd /Users/ignaciomolina/Desktop/Survey

# Actualizar remote con tu URL real:
git remote set-url origin https://github.com/TU-USUARIO/survey-apprecio.git

# Hacer push:
git push -u origin main
```

### 2. Conectar Vercel

1. Ir a https://vercel.com/new
2. Login con GitHub Pro
3. Seleccionar repo `survey-apprecio`
4. **Build settings:**
   - Framework: Vite ✅
   - Build Command: `npm run build` ✅
   - Output Directory: `dist/` ✅
5. Click "Deploy" 🚀

**Esperar 2-3 minutos** y obtendrás URL: `https://survey-apprecio.vercel.app`

### 3. Agregar Dominio Personalizado

1. **Vercel Dashboard → Project Settings → Domains**
2. Click "Add"
3. Ingresar: `survey.tudominio.com`
4. Copiar CNAME: `cname.vercel-dns.com.`

**En tu proveedor DNS (GoDaddy/Cloudflare/etc):**

```
Tipo: CNAME
Nombre: survey
Valor: cname.vercel-dns.com.
TTL: 3600
```

5. **Esperar 5-30 minutos** para propagación
6. Vercel mostrará "Valid Configuration" ✅

---

## ✅ Lo que ya está hecho

- ✅ **Logo actualizado:** https://estudios.apprecio.com/hubfs/logo-cobrand-ebook-provokers.png (50px height, auto width)
- ✅ **Git inicializado** en `/Users/ignaciomolina/Desktop/Survey/.git`
- ✅ **First commit** listo con todos los archivos
- ✅ **.gitignore** optimizado (node_modules, dist, .vercel, .env, etc)
- ✅ **vercel.json** configurado con build settings
- ✅ **VERCEL_SETUP.md** con guía completa

---

## 🎁 Archivos Clave

| Archivo | Propósito |
|---------|-----------|
| [VERCEL_SETUP.md](./VERCEL_SETUP.md) | Guía completa Vercel Pro |
| [vercel.json](./vercel.json) | Configuración build Vercel |
| [.gitignore](./.gitignore) | Archivos a ignorar en git |
| [dist/index.html](./dist/index.html) | HTML con logo actualizado |
| [CODIGO_EMBED_OPCION2.html](./hubspot-deployment/CODIGO_EMBED_OPCION2.html) | Código para pegar en HubSpot |

---

## 📋 Cambios Realizados

```
✅ Reemplazado logo antiguo:
   https://apprecio-assets.s3.us-west-2.amazonaws.com/logo.svg
   
   Por logo nuevo:
   https://estudios.apprecio.com/hubfs/logo-cobrand-ebook-provokers.png
   (height: 50px, width: auto)

✅ Actualizado .gitignore:
   - node_modules/
   - dist/
   - .vercel/
   - .env
   - .vscode/
   
✅ Creado vercel.json:
   - Build: npm run build
   - Output: dist/
   - Framework: Vite

✅ Inicializado git:
   - 2 commits con todo el código
   - Listo para push a GitHub
```

---

## 🚀 Workflow Final

Una vez desplegado en Vercel:

```bash
# 1. Hacer cambios locales (preguntas, colores, etc)
# Editar: src/components/SurveyComponent.tsx o dist/index.html

# 2. Compilar
npm run build

# 3. Commit y push (auto-deploy)
git add -A
git commit -m "Update survey"
git push

# 4. Vercel automáticamente:
#    - Detecta push
#    - Ejecuta npm run build
#    - Publica en https://survey.tudominio.com
#    - Todo en 30 segundos ✨
```

---

## 🔗 URLs Finales (Una vez configuradas)

```
Landing (Vercel):        https://survey.tudominio.com
Assets JS:               https://survey.tudominio.com/assets/survey-bundle.min.js
Assets CSS:              https://survey.tudominio.com/assets/survey-styles.css

Dashboard Vercel:        https://vercel.com/dashboard
Dashboard N8N:           https://n8n.openip.cl
GitHub Repo:             https://github.com/TU-USUARIO/survey-apprecio
```

---

## ✨ Para HubSpot Landing

Una vez tengas Vercel desplegado, pega este código en tu landing (Rich Text HTML):

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

**Reemplazar `survey.tudominio.com` con tu dominio real.**

---

## 📊 Tech Stack

```
Frontend:
  - React 18.2.0
  - TypeScript 5.x
  - Vite 5.4.21 (build tool)
  - SurveyJS 1.12.17
  - Montserrat font

Deployment:
  - Vercel Pro (CDN global)
  - GitHub (source control)
  - Dominio personalizado

Backend:
  - N8N webhook (respuestas)
  - HubSpot CMS (landing)
```

---

## 📞 Soporte

**Vercel Pro:**
- Dashboard: https://vercel.com/dashboard
- Docs: https://vercel.com/docs
- Community: https://github.com/vercel/vercel/discussions

**N8N:**
- Dashboard: https://n8n.openip.cl
- Community: https://community.n8n.io

**HubSpot:**
- CMS Editor: https://app.hubspot.com
- Docs: https://developers.hubspot.com

---

## ✅ Checklist Final

- [ ] Crear repo `survey-apprecio` en GitHub
- [ ] Hacer `git push -u origin main` 
- [ ] Conectar Vercel a GitHub repo
- [ ] Deployments en Vercel (mostrará URL .vercel.app)
- [ ] Agregar dominio personalizado en Vercel
- [ ] Crear CNAME record en proveedor DNS
- [ ] Esperar propagación DNS (5-30 min)
- [ ] Verificar que carga en `https://survey.tudominio.com`
- [ ] Test respuesta completa
- [ ] Integrar en landing HubSpot
- [ ] Monitor en N8N dashboard

---

## 🎉 ¡Listo para la Guerra!

Tu encuesta está completamente configurada y lista para:

✅ **Deployarse** en Vercel con dominio propio  
✅ **Auto-actualizarse** en cada GitHub push  
✅ **Embeberse** en landing HubSpot  
✅ **Recopilar respuestas** en N8N  

**Siguiente paso:** Crear repo en GitHub y seguir VERCEL_SETUP.md

¿Preguntas? Revisa VERCEL_SETUP.md o FAQ.md en hubspot-deployment/

