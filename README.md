# Survey App - Apprecio

Webapp en React basada en **SurveyJS** para la encuesta de motivación LATAM 2026 de Apprecio.

## 🚀 Características

- ✅ Renderización de encuestas dinámicas desde JSON
- ✅ Soporte para múltiples tipos de preguntas (texto, email, números, opciones, etc.)
- ✅ Lógica condicional y filtros integrados
- ✅ Validación de datos en tiempo real
- ✅ Diseño responsive y moderno
- ✅ Temas personalizados con Apprecio branding
- ✅ Registro automático de respuestas

## 📦 Requisitos

- Node.js 16+ 
- npm o yarn

## 🛠️ Instalación

```bash
cd /Users/ignaciomolina/Desktop/Survey
npm install
```

## ▶️ Desarrollo

Para iniciar el servidor de desarrollo:

```bash
npm run dev
```

La aplicación se abrirá automáticamente en `http://localhost:5173`

## 🔨 Build para Producción

```bash
npm run build
```

Genera una versión optimizada en la carpeta `dist/`.

Para previsualizar la build:

```bash
npm run preview
```

## 📁 Estructura del Proyecto

```
├── src/
│   ├── components/
│   │   └── SurveyComponent.tsx    # Componente principal de la encuesta
│   ├── App.tsx                    # Aplicación principal
│   ├── App.css                    # Estilos de la app
│   ├── main.tsx                   # Punto de entrada
│   └── index.css                  # Estilos globales
├── survey.json                    # Definición de la encuesta
├── survey-rules.ts                # Tipos TypeScript
├── vite.config.ts                 # Configuración de Vite
├── tsconfig.json                  # Configuración de TypeScript
├── package.json                   # Dependencias
└── index.html                     # HTML principal
```

## 🔧 Configuración

### Personalizar la Encuesta

Edita `survey.json` para:
- Cambiar preguntas
- Agregar/eliminar secciones
- Modificar opciones de respuesta
- Ajustar validaciones

### Personalizar Estilos

- **Colores globales**: Edita `:root` en `src/index.css`
- **Componentes específicos**: Edita `src/App.css`
- **Temas de SurveyJS**: Importa diferentes temas CSS (defaultV2.css, modern.css, etc.)

### Manejo de Datos

En `src/components/SurveyComponent.tsx`, el callback `onComplete` se ejecuta cuando se completa la encuesta:

```typescript
surveyModel.onComplete.add((result) => {
  console.log('Datos de la encuesta:', result.data);
  // Aquí puedes enviar a tu servidor
});
```

## 📊 Tipos de Preguntas Soportadas

- `screen` - Pantalla de información
- `text_email` - Campo de email
- `number` - Campo numérico
- `single_choice` - Selección única
- `likert_1_5` - Escala Likert
- `ranking` - Ranking de opciones
- `ranked_multi_select` - Selección múltiple con ranking

## 🚀 Deploy

### Netlify
```bash
npm run build
# Sube la carpeta 'dist/' a Netlify
```

### Vercel
```bash
vercel
```

### GitHub Pages
```bash
npm run build
# Configura GH Pages apuntando a 'dist/'
```

## 📚 Recursos

- [SurveyJS Documentation](https://surveyjs.io/form-library/documentation/overview)
- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)

## 🤝 Contribuir

Para agregar funcionalidades:

1. Edita los archivos necesarios
2. Prueba localmente con `npm run dev`
3. Ejecuta `npm run build` para verificar la build

## 📝 Licencia

Este proyecto usa SurveyJS bajo licencia MIT.

---

Desarrollado para Apprecio © 2026
