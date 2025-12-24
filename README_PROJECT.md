# Survey App - Apprecio LATAM 2026

Aplicación de encuesta desarrollada con React, TypeScript, Vite y SurveyJS.

## Características

✅ 10 páginas de encuesta completas  
✅ Validaciones condicionales (edad, situación laboral)  
✅ Branding completo Apprecio (logo, colores, fuentes)  
✅ Localización al español  
✅ Integración N8N webhook  
✅ Diseño responsive (desktop, tablet, móvil)  
✅ Encuesta de prueba para testing rápido  
✅ Cloudflare Tunnel para compartir en mobile  

## Requisitos

- Node.js 16+
- npm o yarn
- Cuenta de Cloudflare (opcional, para Tunnel)

## Inicio rápido

### 1. Instalación

```bash
npm install
```

### 2. Desarrollo

```bash
npm run dev
```

La app estará disponible en `http://localhost:5174`

### 3. Pruebas en dispositivos reales

Abre otra terminal:

```bash
npm run tunnel
```

Verás una URL como: `https://example-random.trycloudflare.com`

Copia esa URL en tu móvil para probar.

### 4. Builds

```bash
# Producción
npm run build

# Preview
npm run preview

# Linting
npm run lint
```

## Estructura del proyecto

```
Survey/
├── src/
│   ├── components/
│   │   ├── SurveyComponent.tsx    # Encuesta principal (10 páginas)
│   │   └── SurveyTest.tsx         # Encuesta de prueba (1 página, todos los types)
│   ├── App.tsx                    # Componente raíz
│   ├── App.css                    # Estilos principales (responsive)
│   ├── index.css                  # Estilos globales
│   └── main.tsx                   # Entry point
├── public/
├── package.json
├── vite.config.ts
├── tsconfig.json
└── README.md
```

## Documentación

- [SurveyJS Styling Guide](./SURVEYJS_STYLING_GUIDE.md) - Guía experto de estilos
- [Cloudflare Tunnel Setup](./CLOUDFLARE_TUNNEL_SETUP.md) - Cómo compartir en móvil
- [SurveyJS Docs](https://surveyjs.io/Documentation/Library)

## Encuestas disponibles

### Encuesta Normal (10 páginas)
- Introducción
- Filtro demográfico (edad, género, país, industria, etc.)
- Instrucción
- Motivación y compromiso (4 preguntas)
- Factores de motivación (ranking)
- Condiciones laborales
- Inteligencia Artificial
- Perspectiva 2026 (ranking)
- Expectativas 2026 + email
- Cierre y gracias

Accede a través del botón "Encuesta Normal" o visitando directamente.

### Encuesta de Prueba (1 página)
Para pruebas rápidas de todos los question types:
- Text, Email, Textarea
- Radiogroup, Checkbox
- Dropdown, Rating
- Ranking, Matrix
- Boolean, Comment
- Image Picker

Accede a través del botón "Modo Prueba →"

## Características clave

### Validaciones

- Edad < 18: Termina la encuesta sin enviar
- Situación laboral ≠ empleado: Termina la encuesta sin enviar

### Integración N8N

Los datos se envían automáticamente a:
```
https://n8n.openip.cl/webhook/survey-ebook
```

### Responsive Design

Breakpoints configurados:
- Desktop: > 1024px
- Tablet: 768px - 1023px
- Mobile grande: 480px - 767px
- Mobile pequeño: < 480px

### Estilos Apprecio

- Color primario: #fa345e (rosa)
- Color secundario: #1b1b1b (negro)
- Fuente: Montserrat
- Logo: 300px en desktop, 200px en tablet, 150px en mobile

## Alternancia de encuestas

Usa el botón flotante abajo a la derecha:
- **Encuesta Normal**: 10 páginas completas
- **Modo Prueba**: 1 página con todos los types

## Troubleshooting

### La encuesta no carga
```bash
npm install
npm run dev
```

### Estilos no se aplican
El CSS importa `survey-core/defaultV2.css` primero. Los estilos personalizados vienen después.

### Ranking no funciona en mobile
En mobile, el drag & drop podría tener limitaciones. Consulta [SURVEYJS_STYLING_GUIDE.md](./SURVEYJS_STYLING_GUIDE.md) para soluciones.

### URL de Tunnel caducada
Las URLs caducen después de 24 horas. Ejecuta `npm run tunnel` nuevamente.

## Configuración

### Cambiar puerto
En `vite.config.ts`:
```typescript
server: {
  port: 3000 // cambiar aquí
}
```

Luego usa: `npm run tunnel` (automáticamente apunta a 5174)

### Cambiar webhook
En `SurveyComponent.tsx`:
```typescript
fetch('TU_NUEVO_WEBHOOK', { ... })
```

## Contribuyendo

1. Crea una rama para tu feature
2. Haz cambios
3. Prueba con la encuesta de prueba
4. Commit y push

## Licencia

Apprecio © 2026

## Contacto

Para preguntas o reportar bugs, abre un issue en el repositorio.
