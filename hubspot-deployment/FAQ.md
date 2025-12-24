# ❓ Preguntas Frecuentes (FAQ)

Respuestas rápidas a dudas comunes sobre el deployment.

---

## 🎯 Decisión: ¿Opción 2 o 3?

### **P: No tengo Developer Pro, ¿puedo usar Opción 3?**
**A:** No. Solo funciona con Developer Pro. Usa Opción 2 (Cloudflare Pages).

### **P: ¿Cuál es más rápida?**
**A:** Opción 2 (5 minutos setup). Opción 3 es más potente pero toma 20 minutos.

### **P: ¿Puedo cambiar de opinión después?**
**A:** Sí. Ambas usan el mismo código de encuesta. Cambiar es fácil.

### **P: ¿Cuál carga más rápido?**
**A:** Similar (2-3 seg primer load, <1 seg con caché). Opción 3 tiene caché nativo HubSpot.

### **P: ¿Cuál es mejor para múltiples landings?**
**A:** Opción 3 (un módulo, múltiples landings). Opción 2 requiere copy-paste.

---

## 🚀 Deployment

### **P: ¿Dónde publico la encuesta?**
**A:**
- Opción 2: Cloudflare Pages (gratis)
- Opción 3: HubSpot mismo

### **P: ¿Necesito pagar por CDN?**
**A:** No. Cloudflare Pages es completamente gratis.

### **P: ¿Cloudflare Pages es confiable?**
**A:** Sí. Es de Cloudflare (grande, confiable). Millones lo usan.

### **P: ¿Puedo usar Vercel en lugar de Cloudflare?**
**A:** Sí. Vercel también es gratis y funciona igual.

### **P: ¿Cuánto tarda el deployment?**
**A:** 5-10 minutos (Cloudflare compila y publica).

### **P: ¿Qué pasa si hay error en build?**
**A:** Cloudflare te muestra logs. Causa usual: typo en código TypeScript.

### **P: ¿Puedo hacer rollback a versión anterior?**
**A:** Sí. Cloudflare guarda todo. Un click para volver atrás.

---

## 🔗 URLs y Webhook

### **P: ¿Cuál es mi URL final de encuesta?**
**A:**
- Opción 2: `https://survey-apprecio.pages.dev` (o tu dominio personalizado)
- Opción 3: Dentro de landing HubSpot

### **P: ¿Cómo configuro el webhook?**
**A:**
1. Opción 2: Edita [CODIGO_EMBED_OPCION2.html](./CODIGO_EMBED_OPCION2.html)
2. Opción 3: En módulo → configuración → campo "Webhook URL"

### **P: ¿Puedo tener múltiples webhooks?**
**A:** Sí, pero necesitarías múltiples instancias de la encuesta.

### **P: ¿El webhook debe ser N8N?**
**A:** No, cualquier webhook funciona (Zapier, Make, etc).

### **P: ¿Cómo valido que el webhook funciona?**
**A:** Completa test de encuesta y verifica en N8N dashboard.

---

## 🎨 Personalización

### **P: ¿Cómo cambio el color primario?**
**A:**
- Opción 2: Edita HTML → `primaryColor: '#TUCOLOR'`
- Opción 3: UI visual en HubSpot

### **P: ¿Cómo cambio el logo?**
**A:**
- Opción 2: Edita HTML → `logoUrl: 'https://tu-logo.png'`
- Opción 3: UI visual en HubSpot

### **P: ¿Cómo cambio los textos?**
**A:** Edita [SurveyComponent.tsx](../src/components/SurveyComponent.tsx) y recompila.

### **P: ¿Debo cambiar la encuesta?**
**A:** Sí, edita preguntas en SurveyComponent.tsx según necesidad.

### **P: ¿Cómo agrego más páginas?**
**A:** Edita pages array en SurveyComponent.tsx, agrega nueva página, recompila.

### **P: ¿Cómo cambio la fuente?**
**A:** Fuente actual es Montserrat. Edita App.css para cambiar.

---

## 📱 Mobile y Responsive

### **P: ¿Funciona en mobile?**
**A:** Sí, está optimizado para 4 breakpoints (mobile, tablet, desktop, full).

### **P: ¿Funciona en iPhone/iPad?**
**A:** Sí, testeado en Safari y Chrome mobile.

### **P: ¿Las imágenes se adaptan?**
**A:** Sí, todo es responsive.

### **P: ¿Puedo ver cómo se ve en mobile sin phone?**
**A:** Sí. Chrome DevTools → Toggle device toolbar (Cmd+Shift+M).

### **P: ¿Por qué hay cuadros redondos en mobile?**
**A:** Son rating items redondos (diseño SurveyJS). Es normal.

---

## 🐛 Errores Comunes

### **P: Encuesta no aparece en landing**
**A:** 
1. Verificar que `<div id="survey-container"></div>` existe
2. Verificar URLs de assets cargan
3. Abrir DevTools → Console para ver errores

### **P: Colores no se aplican**
**A:**
1. Hard refresh navegador (Cmd+Shift+R)
2. Verificar código hex válido (#FA345E)
3. Verificar CSS se descargó

### **P: Webhook no recibe datos**
**A:**
1. Verificar URL webhook correcta
2. N8N debe estar activo
3. Ver DevTools → Network → POST request

### **P: Estilos se ven raros en mobile**
**A:**
1. Verificar viewport meta tag
2. Limpiar caché navegador
3. Hard refresh

### **P: JavaScript error en console**
**A:**
1. Copiar error completo
2. Google the error
3. Revisar SurveyJS docs

### **P: 404 en assets**
**A:**
1. Verificar URL Cloudflare correcta
2. Verificar que build se completó
3. Revisar `dist/assets/` existe localmente

---

## 💾 Actualizaciones

### **P: ¿Cómo actualizo la encuesta?**
**A:**
1. Editar SurveyComponent.tsx
2. npm run build
3. git push
4. CDN/HubSpot auto-redeploy

### **P: ¿Cuánto tarda una actualización?**
**A:** 5-10 minutos en propagarse globalmente.

### **P: ¿Puedo hacer cambios sin afectar landings activas?**
**A:** No, todas las landings usan versión más reciente.

### **P: ¿Hay versioning?**
**A:** Sí, Cloudflare/HubSpot guardan histórico de todos los builds.

### **P: ¿Puedo volver a versión anterior?**
**A:** Sí, un click en Deployments para rollback.

---

## 🔐 Seguridad y Privacidad

### **P: ¿Dónde se almacenan los datos?**
**A:** Solo en N8N. CDN no guarda datos (no son mi responsabilidad).

### **P: ¿Es HTTPS?**
**A:** Sí. Cloudflare y N8N usan HTTPS automático.

### **P: ¿Los datos son privados?**
**A:** Sí. Solo transmiten de navegador → N8N, no se cachean.

### **P: ¿Puedo cumplir GDPR?**
**A:** Sí, pero debes manejar datos en N8N según GDPR.

### **P: ¿Hay cookies?**
**A:** Solo de Cloudflare (analytics, no personales).

---

## 💰 Costos

### **P: ¿Cuánto cuesta?**
**A:**
- Opción 2: $0 (Cloudflare Pages gratis)
- Opción 3: $0 extra (si ya tienes Developer Pro)

### **P: ¿Hay costos ocultos?**
**A:** No. Todo incluido.

### **P: ¿Puedo cambiar a pago después?**
**A:** Sí, ambos sistemas permiten upgrade cuando quieras.

### **P: ¿Qué incluye Developer Pro?**
**A:** Módulos personalizados, más APIs, análisis avanzado.

---

## 📊 Analytics y Monitoreo

### **P: ¿Puedo ver cuántas personas completaron?**
**A:** Sí. N8N webhook muestra todas las respuestas.

### **P: ¿Hay analytics integrado?**
**A:** Sí, N8N dashboard muestra histórico.

### **P: ¿Puedo ver dónde viene el tráfico?**
**A:** Cloudflare Analytics (Opción 2) muestra origen.

### **P: ¿Puedo exportar respuestas?**
**A:** Sí, desde N8N dashboard → Export JSON/CSV.

### **P: ¿Puedo integrar con CRM?**
**A:** Sí, N8N puede enviar datos a Hubspot CRM automáticamente.

---

## 🤝 Colaboración

### **P: ¿Pueden múltiples personas editar?**
**A:** Sí. Git permite colaboración en repo.

### **P: ¿Pueden editores no-técnicos hacer cambios?**
**A:** 
- Opción 2: No (requiere código)
- Opción 3: Sí (UI visual en HubSpot)

### **P: ¿Cómo organizo cambios de múltiples personas?**
**A:** Usa branches en Git, hace pull requests, merge después.

---

## 🌍 Multiidioma

### **P: ¿Puedo tener encuesta en múltiples idiomas?**
**A:** Sí. SurveyJS soporta i18n. Edita survey.json.

### **P: ¿Puedo cambiar idioma según región?**
**A:** Sí, con lógica JavaScript basada en navigator.language.

### **P: Está en español, ¿cómo cambio a inglés?**
**A:** Edita todos los textos en SurveyComponent.tsx.

---

## 🎓 Educación

### **P: ¿Dónde aprendo más sobre SurveyJS?**
**A:** https://surveyjs.io/documentation

### **P: ¿Dónde aprendo React?**
**A:** https://react.dev

### **P: ¿Hay ejemplos de código?**
**A:** Sí, en este repo → SurveyComponent.tsx (452 líneas comentadas).

### **P: ¿Puedo modificar el CSS?**
**A:** Sí. App.css es fully customizable.

---

## 🚨 Emergencias

### **P: La encuesta no funciona en producción**
**A:**
1. Abrir DevTools → Console en landing en vivo
2. Copiar errores exactos
3. Revisar que webhook N8N está activo
4. Contactar soporte

### **P: Se perdieron datos de respuestas**
**A:**
1. Revisar N8N webhook logs
2. Recuperar desde backups
3. Contactar N8N support si fue error de ellos

### **P: Landing está down**
**A:**
1. Verificar status.cloudflare.com (Opción 2)
2. Verificar status.hubspot.com (Opción 3)
3. Esperar o contactar soporte

---

## 📞 Contacto y Soporte

### **P: ¿A quién llamo si hay problemas?**
**A:**
- Cloudflare: https://community.cloudflare.com
- HubSpot: https://community.hubspot.com
- N8N: https://community.n8n.io
- SurveyJS: GitHub issues

### **P: ¿Hay documentación adicional?**
**A:** Sí:
- [README.md](./README.md) - Overview
- [GUIA_DECISION.md](./GUIA_DECISION.md) - Opción 2 vs 3
- [CHECKLIST_IMPLEMENTACION.md](./CHECKLIST_IMPLEMENTACION.md) - Step-by-step

---

## ✅ Últimas Dudas

### **P: ¿Estoy listo para empezar?**
**A:** Sí, si:
- [ ] Tienes GitHub repo
- [ ] Tienes HubSpot account
- [ ] Tienes N8N webhook
- [ ] Entiendes Opción 2 o 3

### **P: ¿Por dónde empiezo?**
**A:**
1. Lee [GUIA_DECISION.md](./GUIA_DECISION.md)
2. Elige Opción 2 o 3
3. Sigue instrucciones del README correspondiente
4. Usa [CHECKLIST_IMPLEMENTACION.md](./CHECKLIST_IMPLEMENTACION.md)

### **P: ¿Necesito ayuda?**
**A:** 
- Opción 2: Cloudflare community
- Opción 3: HubSpot community
- General: Revisa FAQ completo

---

**Última actualización:** 2026-01
**Versión:** 1.0

