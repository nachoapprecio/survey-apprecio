# ✅ Checklist de Implementación HubSpot

Sigue estos pasos para desplegar tu encuesta en HubSpot sin errores.

---

## 🎯 Antes de Empezar

- [ ] **Tienes acceso a:**
  - [ ] GitHub (para conectar repo)
  - [ ] HubSpot (Admin dashboard)
  - [ ] N8N (webhook activo)

- [ ] **Información necesaria:**
  - [ ] URL webhook N8N
  - [ ] Logo URL (para encuesta)
  - [ ] Colores branding (#FA345E)

---

## 📋 Opción 2: CDN + Embed (5 minutos)

### Paso 1: Preparar Repo (2 min)

- [ ] **Git actualizado:**
  ```bash
  git add -A
  git commit -m "Prepare for HubSpot deployment"
  git push origin main
  ```

- [ ] **Build local verifica:**
  ```bash
  npm run build
  ls -la dist/assets/
  # Debe mostrar:
  # - survey-bundle.min.js (1.8M)
  # - survey-styles.css (286K)
  ```

### Paso 2: Cloudflare Pages (2 min)

- [ ] **Cuenta Cloudflare:**
  - [ ] Ir a https://dash.cloudflare.com
  - [ ] Login/signup (gratis)

- [ ] **Conectar repo:**
  - [ ] Pages → "Create a project"
  - [ ] "Connect to Git"
  - [ ] Autorizar Cloudflare
  - [ ] Seleccionar repo

- [ ] **Configurar build:**
  ```
  Build command:   npm run build
  Output:          dist/
  ```

- [ ] **Deploy:**
  - [ ] Click "Save and Deploy"
  - [ ] Esperar a que termine (3-5 minutos)
  - [ ] Copiar URL: https://survey-apprecio.pages.dev

### Paso 3: Obtener URLs Assets (1 min)

- [ ] **Assets estar disponibles en:**
  ```
  https://survey-apprecio.pages.dev/assets/survey-bundle.min.js
  https://survey-apprecio.pages.dev/assets/survey-styles.css
  ```

- [ ] **Verificar (click en URLs):**
  - [ ] JS carga sin errores (1.8M)
  - [ ] CSS carga sin errores (286K)

### Paso 4: Configurar HubSpot (2 min)

- [ ] **Ir a landing:**
  - [ ] HubSpot → Landing pages
  - [ ] Crear nueva o editar existente
  - [ ] Click "Edit"

- [ ] **Agregar módulo Rich Text:**
  - [ ] Drag & drop "Rich Text"
  - [ ] Click para editar
  - [ ] Switch a "HTML" mode

- [ ] **Pegar código:**
  - [ ] Copiar de [CODIGO_EMBED_OPCION2.html](./CODIGO_EMBED_OPCION2.html)
  - [ ] Reemplazar `survey-apprecio.pages.dev` con tu URL
  - [ ] Pegar en HubSpot

- [ ] **Guardar:**
  - [ ] Click "Save"
  - [ ] Click "Publish"

- [ ] **Verificar:**
  - [ ] Landing carga correctamente
  - [ ] Encuesta aparece
  - [ ] Textos en español

### Paso 5: Test (1-2 min)

- [ ] **Hacer test de respuesta:**
  - [ ] Ir a landing publicada
  - [ ] Completar encuesta
  - [ ] Enviar respuestas

- [ ] **Verificar en N8N:**
  - [ ] Abrir https://n8n.openip.cl
  - [ ] Ver que se recibió webhook
  - [ ] Datos JSON correctos

---

## 🚀 Opción 3: HubSpot Custom Module (20 minutos)

### Paso 1: Verificar Developer Pro (1 min)

- [ ] **Verificar plan:**
  - [ ] HubSpot → Settings
  - [ ] Billing
  - [ ] Confirmar "Developer Pro" ($50/mes)
  - [ ] Si no, no puedes usar Opción 3

### Paso 2: Preparar Repo (2 min)

- [ ] **Git listo:**
  ```bash
  git add -A
  git commit -m "HubSpot module ready"
  git push origin main
  ```

### Paso 3: Conectar HubSpot Dev (5 min)

- [ ] **HubSpot Developer:**
  - [ ] HubSpot → Settings → Developer
  - [ ] Apps & integrations
  - [ ] Crear nueva app (o usar existente)

- [ ] **Permisos:**
  - [ ] Grant "Manage contents"
  - [ ] Grant "Design manager"
  - [ ] Save

- [ ] **Conectar repo:**
  - [ ] Volver a developer settings
  - [ ] Git repositories
  - [ ] Conectar GitHub
  - [ ] Autorizar Cloudflare
  - [ ] Seleccionar branch (main)

### Paso 4: Crear Módulo (5 min)

- [ ] **Design Manager:**
  - [ ] HubSpot → Design Manager
  - [ ] Modules
  - [ ] "Create module" → From repo
  - [ ] Seleccionar repo conectado
  - [ ] Seleccionar carpeta: `hubspot-deployment/OPCION3-CUSTOM-MODULE`

- [ ] **Publicar:**
  - [ ] Click "Publish"
  - [ ] Esperar sincronización

- [ ] **Verificar:**
  - [ ] Módulo aparece en "Modules"
  - [ ] Nombre: "Encuesta Apprecio - Motivación 2026"

### Paso 5: Usar en Landing (5 min)

- [ ] **Crear landing:**
  - [ ] Landing pages
  - [ ] New landing

- [ ] **Agregar módulo:**
  - [ ] Modules → Buscar "Encuesta Apprecio"
  - [ ] Drag & drop a landing

- [ ] **Editar configuración:**
  - [ ] Click en módulo
  - [ ] Edit
  - [ ] Llenar campos:
    - [ ] Survey Title
    - [ ] Logo URL
    - [ ] Primary Color (#FA345E)
    - [ ] Webhook URL
    - [ ] Textos botones
  - [ ] Save

- [ ] **Publicar:**
  - [ ] Click "Publish"

### Paso 6: Test (2 min)

- [ ] **Test en preview:**
  - [ ] Click "Preview"
  - [ ] Completar encuesta
  - [ ] Enviar

- [ ] **Verificar N8N:**
  - [ ] Datos llegan correctamente

---

## 🔄 Actualizaciones Futuras

### Cambiar Preguntas/Lógica

Para ambas opciones:

- [ ] **Editar encuesta:**
  - [ ] Abrir [SurveyComponent.tsx](../src/components/SurveyComponent.tsx)
  - [ ] Hacer cambios
  - [ ] Save

- [ ] **Compilar:**
  ```bash
  npm run build
  ```

- [ ] **Subir a Git:**
  ```bash
  git add -A
  git commit -m "Update survey questions"
  git push origin main
  ```

- [ ] **Auto-deploy:**
  - [ ] Opción 2: Cloudflare auto-redeploy (5 min)
  - [ ] Opción 3: HubSpot auto-sincroniza (5 min)
  - [ ] Landing se auto-actualiza (sin cambios)

### Cambiar Colores/Textos

**Opción 2:**
- [ ] Editar [CODIGO_EMBED_OPCION2.html](./CODIGO_EMBED_OPCION2.html)
- [ ] En HubSpot → Landing → Edit
- [ ] Cambiar valores en HTML
- [ ] Save & Publish

**Opción 3:**
- [ ] En landing → Editar módulo
- [ ] Cambiar en campos UI (visual)
- [ ] Save & Publish

---

## 🧪 Testing Completo

### Desktop (1920x1080)
- [ ] Encuesta carga correctamente
- [ ] Colores se ven bien
- [ ] Botones funcionales
- [ ] Texto legible

### Tablet (768x1024)
- [ ] Layout responsive
- [ ] Inputs accesibles
- [ ] No horizontal scroll
- [ ] Textos redimensionados

### Mobile (375x667)
- [ ] Encuesta completa visible
- [ ] Rating items en una línea
- [ ] Botones tapeable (44px+)
- [ ] Sin scroll horizontal

### Navegadores
- [ ] Chrome (Windows)
- [ ] Safari (Mac)
- [ ] Firefox (Windows/Mac)
- [ ] Safari (iPhone)
- [ ] Chrome (Android)

---

## 📊 Validación de Datos

### Test de respuesta:

- [ ] **Completar encuesta:**
  - [ ] Todas las páginas
  - [ ] Todas las preguntas
  - [ ] Enviar

- [ ] **Verificar N8N:**
  - [ ] https://n8n.openip.cl
  - [ ] Ver últimas ejecuciones
  - [ ] Datos JSON correctos
  - [ ] Todas las preguntas presentes

### Test de validación:

- [ ] **Edad < 18:**
  - [ ] Encuesta termina
  - [ ] Mensaje de ineligibilidad

- [ ] **Situación laboral:**
  - [ ] Solo opciones 1 y 2 permitidas
  - [ ] Otras deshabilitadas

---

## ⚡ Performance Check

### Velocidad de carga:
- [ ] Primer load: 2-3 segundos
- [ ] Segundos loads: <1 segundo
- [ ] Assets cacheados en CDN

### Tamaño de bundle:
- [ ] JS: 400K gzip (1.8M raw)
- [ ] CSS: 34K gzip (286K raw)
- [ ] Total: ~434K gzip

### Browser DevTools:
- [ ] Abrir Network tab
- [ ] Cargar página
- [ ] Ver que se descarga desde CDN
- [ ] Sin errores 404 o CORS

---

## 🔐 Seguridad

- [ ] **HTTPS:**
  - [ ] Landing URL es https://
  - [ ] Webhook N8N es https://

- [ ] **Webhook:**
  - [ ] N8N webhook está activo
  - [ ] Recibe datos correctamente
  - [ ] No hay datos en caché público

- [ ] **CORS:**
  - [ ] Cloudflare envía headers correctos
  - [ ] Sin errores CORS en console

---

## 📱 Responsive Check

- [ ] **Breakpoints:**
  - [ ] <479px: Mobile pequeño
  - [ ] 480-767px: Mobile
  - [ ] 768-1023px: Tablet
  - [ ] 1024px+: Desktop

- [ ] **Elementos:**
  - [ ] Ratings: 1 línea en todos
  - [ ] Inputs: Accesibles en mobile
  - [ ] Botones: 44px+ en mobile
  - [ ] Font: Legible en móvil

---

## 🐛 Troubleshooting

Si algo falla:

- [ ] **Encuesta no carga:**
  - [ ] Abrir DevTools → Console
  - [ ] Buscar errores
  - [ ] Verificar URL de assets

- [ ] **Webhook no recibe:**
  - [ ] Verificar URL en código
  - [ ] N8N webhook está activo
  - [ ] Ver Network tab POST

- [ ] **Estilos rotos:**
  - [ ] Hard refresh (Cmd+Shift+R)
  - [ ] Limpiar cache navegador
  - [ ] Verificar survey-styles.css cargó

- [ ] **Errores en Console:**
  - [ ] Copiar error completo
  - [ ] Google the error
  - [ ] Revisar SurveyJS docs

---

## ✅ Pre-Launch

Antes de decir "listo":

- [ ] Toda la familia de tests pasó ✅
- [ ] Landing publicada
- [ ] Encuesta respondible
- [ ] N8N recibe datos
- [ ] Equipo confirmó correcto
- [ ] Performance OK
- [ ] Security OK

---

## 🎉 ¡Listo para Producción!

Si checklist completo:

✅ **Opción 2:** Landing publica encuesta automáticamente desde Cloudflare CDN
✅ **Opción 3:** Landing publica encuesta como módulo HubSpot nativo
✅ **Webhook:** N8N recibe datos automáticamente
✅ **Auto-updates:** Cambios en repo se actualizan automáticamente

---

## 📞 Soporte

**Errores técnicos:**
- Cloudflare: https://community.cloudflare.com
- HubSpot: https://community.hubspot.com

**Cambios encuesta:**
- Editar [SurveyComponent.tsx](../src/components/SurveyComponent.tsx)

**Preguntas:**
- Revisar [GUIA_DECISION.md](./GUIA_DECISION.md)

---

Documento versión: 1.0 (2026-01)
