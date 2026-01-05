import React, { useState, useEffect } from 'react';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';

const SurveyComponent: React.FC = () => {
  const [survey, setSurvey] = useState<Model | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const surveyModel = new Model(surveyConfig);
      
      // Configurar dropdowns como popup en mobile para evitar pantalla completa
      surveyModel.onOpenDropdownMenu.add((_sender, options) => {
        // Forzar modo popup en dispositivos móviles (evita el picker nativo)
        if (options.deviceType === 'mobile' || options.hasTouchScreen) {
          options.menuType = 'popup';
        }
      });
      
      // Configurar todos los dropdowns para que usen scroll nativo cuando hay muchas opciones
      surveyModel.onGetQuestionTitleActions.add((_, options) => {
        const question = options.question;
        if (question.getType() === 'dropdown') {
          const dropdown = question as any;
          if (dropdown.popupModel) {
            // canShrink permite que el popup se ajuste al espacio y muestre scroll
            dropdown.popupModel.canShrink = true;
            
            // Habilitar recálculo de posición cuando hay zoom/gestos táctiles
            let lastScale = (window as any).visualViewport?.scale || 1;
            let recalculateTimer: any = null;
            
            const handleViewportChange = () => {
              const currentScale = (window as any).visualViewport?.scale || 1;
              // Solo recalcular si el zoom cambió significativamente
              if (Math.abs(currentScale - lastScale) > 0.01) {
                lastScale = currentScale;
                // Debounce para evitar demasiados recalculos
                clearTimeout(recalculateTimer);
                recalculateTimer = setTimeout(() => {
                  if (dropdown.popupModel && dropdown.popupModel.isVisible) {
                    dropdown.popupModel.recalculatePosition(false);
                  }
                }, 100);
              }
            };
            
            // Suscribirse a cambios en el viewport cuando el popup se abre
            const originalOnShow = dropdown.popupModel.onShow;
            dropdown.popupModel.onShow = () => {
              if ((window as any).visualViewport) {
                (window as any).visualViewport.addEventListener('resize', handleViewportChange);
                (window as any).visualViewport.addEventListener('scroll', handleViewportChange);
              }
              if (originalOnShow) originalOnShow();
            };
            
            // Limpiar listeners cuando el popup se cierra
            const originalOnHide = dropdown.popupModel.onHide;
            dropdown.popupModel.onHide = () => {
              if ((window as any).visualViewport) {
                (window as any).visualViewport.removeEventListener('resize', handleViewportChange);
                (window as any).visualViewport.removeEventListener('scroll', handleViewportChange);
              }
              clearTimeout(recalculateTimer);
              if (originalOnHide) originalOnHide();
            };
          }
        }
      });
      
      // Configurar ranking para arrastre inmediato (sin longTap) - Fix para iOS
      surveyModel.getAllQuestions().forEach((question: any) => {
        if (question.getType() === 'ranking') {
          // Deshabilitar longTap para que el drag sea inmediato al tocar el ícono
          // Esto resuelve el conflicto con el scroll en iOS
          question.longTap = false;
        }
      });
      
      // Lógica condicional: Validar solo en página de filtro demográfico
      surveyModel.onCurrentPageChanging.add((sender, options) => {
        const currentPage = sender.currentPage;
        
        // Solo validar si estamos en la página de filtro
        if (currentPage.name !== 'page_filtro') {
          return;
        }
        
        // Obtener valores de los datos globales de la encuesta
        const edad = sender.data.edad;
        const situacion_laboral = sender.data.situacion_laboral;
        
        console.log('Edad:', edad, 'Situación laboral:', situacion_laboral);
        
        // Validar edad < 18
        if (edad !== undefined && edad !== null && edad < 18) {
          options.allowChanging = false;
          alert('Gracias por tu interés. Esta encuesta está dirigida solo a personas mayores de 18 años.');
          // Cambiar a mensaje de fallo de filtro
          surveyModel.completedHtml = filteredOutHtml;
          sender.doComplete();
          return;
        }

        // Validar situación laboral (solo 1 y 2 son válidos)
        if (situacion_laboral !== undefined && situacion_laboral !== null) {
          const empleadoValues = [1, 2];
          if (!empleadoValues.includes(situacion_laboral)) {
            options.allowChanging = false;
            alert('Gracias por tu tiempo. Esta encuesta aplica solo para personas empleadas tiempo completo o parcial.');
            // Cambiar a mensaje de fallo de filtro
            surveyModel.completedHtml = filteredOutHtml;
            sender.doComplete();
            return;
          }
        }
      });

      surveyModel.onComplete.add((result) => {
        console.log('Encuesta completada:', result.data);
        
        // Enviar datos al webhook de N8N
        fetch('https://n8n.openip.cl/webhook/survey-ebook', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(result.data)
        })
        .then(response => {
          if (response.ok) {
            console.log('Datos enviados exitosamente al webhook');
          } else {
            throw new Error('Error al enviar los datos');
          }
        })
        .catch(error => {
          console.error('Error al enviar datos:', error);
        });
      });

      setSurvey(surveyModel);
    } catch (err) {
      console.error('Error al crear la encuesta:', err);
      setError('Error al cargar la encuesta: ' + String(err));
    }
  }, []);

  if (error) {
    return <div className="survey-error">{error}</div>;
  }

  if (!survey) {
    return <div className="survey-loading">Cargando encuesta...</div>;
  }

  return (
    <div className="survey-container">
      <Survey model={survey} />
    </div>
  );
};

// Mensaje cuando la encuesta se completa exitosamente
const completedHtmlSuccess = "<div style='text-align: center; padding: 40px 20px; font-family: Montserrat, sans-serif;'><h2 style='font-size: 36px; font-weight: 700; color: #fa345e; margin: 0 0 30px 0;'>¡Encuesta finalizada!</h2><h3 style='font-size: 24px; font-weight: 600; color: #1b1b1b; margin: 0 0 30px 0; line-height: 1.5;'>Muchas gracias por tus respuestas.<br/>Tu opinión es valiosa para nosotros y nos ayuda a crear mejores espacios de trabajo.</h3><p style='font-size: 16px; font-weight: 400; color: #1b1b1b; margin: 0 0 20px 0; line-height: 1.6;'>Pronto, enviaremos un premio en puntos <strong style='color: #fa345e;'>Apprecio</strong> a todos quienes llegaron hasta aquí. Estos puntos serán entregados al finalizar el período de respuestas el 31/01/2025.</p><p style='font-size: 16px; font-weight: 400; color: #1b1b1b; margin: 0 0 30px 0;'>Si aún no tienes la app, descargala aquí 👇</p><a href='https://embajadores.apprecio.com/es/descarga-la-app' style='display: inline-block; background-color: #fa345e; color: #ffffff; padding: 12px 32px; font-size: 16px; font-weight: 600; border-radius: 5px; text-decoration: none; border: 3px solid #1b1b1b; cursor: pointer;'>Descarga la app</a></div>";

// Mensaje cuando la encuesta no cumple los filtros
const filteredOutHtml = "<div style='text-align: center; padding: 40px 20px; font-family: Montserrat, sans-serif;'><h2 style='font-size: 36px; font-weight: 700; color: #fa345e; margin: 0 0 30px 0;'>¡Gracias por tu participación!</h2><h3 style='font-size: 24px; font-weight: 600; color: #1b1b1b; margin: 0 0 30px 0; line-height: 1.5;'>Pronto tendremos encuestas más adecuadas para ti.</h3></div>";

const surveyConfig = {
  title: "Encuesta de Motivación laboral 2026",
  showProgressBar: false,
  firstPageIsStarted: false,
  pagePrevText: "Anterior",
  pageNextText: "Siguiente",
  completeText: "Enviar Respuestas",
  completedHtml: completedHtmlSuccess,
  pages: [
    // PÁGINA 1: Introducción
    {
      name: "page_intro",
      elements: [
        {
          type: "html",
          name: "intro_html",
          html: "<div style='font-size: 16px; line-height: 1.6; text-align: center;'><p><strong>¡Bienvenido(a)!</strong></p><p>Buenos días/tardes. En este momento Apprecio junto con Provokers estamos realizando un estudio/encuesta y quisiéramos conocer tu opinión.</p><p style='color: #FA345e; font-weight: 700;'>Recuerda que todas tus respuestas son anónimas y confidenciales.</p></div>"
        }
      ]
    },

    // PÁGINA 2: Filtro demográfico
    {
      name: "page_filtro",
      title: "Filtro demográfico",
      elements: [
        {
          type: "text",
          name: "edad",
          title: "¿Cuál es tu edad exacta?",
          isRequired: true,
          inputType: "text",
          placeHolder: "Ej: 28",
          validators: [
            {
              type: "numeric",
              text: "Por favor ingresa un número válido"
            },
            {
              type: "expression",
              expression: "{edad} >= 1 && {edad} <= 99",
              text: "La edad debe estar entre 1 y 99"
            }
          ]
        },
        {
          type: "radiogroup",
          name: "genero",
          title: "Por favor registra tu género a continuación:",
          isRequired: true,
          choices: [
            { value: 1, text: "Mujer" },
            { value: 2, text: "Hombre" },
            { value: 3, text: "Otro" },
            { value: 4, text: "Prefiero no responder" }
          ]
        },
        {
          type: "dropdown",
          name: "pais",
          title: "¿En qué país vives actualmente?",
          isRequired: true,
          choices: [
            { value: 1, text: "Chile" },
            { value: 2, text: "Colombia" },
            { value: 3, text: "México" },
            { value: 4, text: "Perú" }
          ]
        },
        {
          type: "dropdown",
          name: "situacion_laboral",
          title: "¿Cuál es tu situación laboral actual?",
          isRequired: true,
          choices: [
            { value: 1, text: "Empleado/a tiempo completo" },
            { value: 2, text: "Empleado/a tiempo parcial" },
            { value: 3, text: "Trabajador/a independiente (freelance, autónomo/a)" },
            { value: 4, text: "Dueño/a de un negocio o empresa" },
            { value: 5, text: "Desempleado/a buscando trabajo" },
            { value: 6, text: "Desempleado/a no buscando trabajo" },
            { value: 7, text: "Estudiante" },
            { value: 8, text: "Jubilado/a o pensionado/a" },
            { value: 9, text: "Ama de casa / labores del hogar" }
          ]
        },
        {
          type: "dropdown",
          name: "industria",
          title: "¿En cuál de las siguientes industrias trabajas actualmente?",
          isRequired: true,
          choices: [
            { value: 1, text: "Agricultura / Agroindustria" },
            { value: 2, text: "Alimentos y bebidas" },
            { value: 3, text: "Banca y servicios financieros" },
            { value: 4, text: "Comercio minorista / Retail" },
            { value: 5, text: "Construcción / Infraestructura" },
            { value: 6, text: "Educación" },
            { value: 7, text: "Energía / Petróleo / Gas / Minería" },
            { value: 8, text: "Entretenimiento / Medios" },
            { value: 9, text: "Gobierno / Sector público" },
            { value: 10, text: "Logística / Transporte" },
            { value: 11, text: "Manufactura / Industria" },
            { value: 12, text: "Salud / Servicios médicos" },
            { value: 13, text: "Servicios profesionales (consultoría, contabilidad, legal, etc.)" },
            { value: 14, text: "Tecnología / Software / Telecomunicaciones" },
            { value: 15, text: "Turismo / Hotelería" },
            { value: 98, text: "Otra" }
          ]
        },
        {
          type: "dropdown",
          name: "nivel_responsabilidad",
          title: "¿Cuál es tu nivel de responsabilidad dentro de la empresa?",
          isRequired: true,
          choices: [
            { value: 1, text: "Operativo / Asistente" },
            { value: 2, text: "Profesional / Especialista / Analista" },
            { value: 3, text: "Supervisor / Jefe de equipo" },
            { value: 4, text: "Gerente / Subgerente" },
            { value: 5, text: "Director / Gerencia Senior" },
            { value: 6, text: "Alta dirección" },
            { value: 7, text: "Otro" }
          ]
        },
        {
          type: "dropdown",
          name: "antiguedad",
          title: "¿Cuánto tiempo llevas en tu empleo actual?",
          isRequired: true,
          choices: [
            { value: 1, text: "Menos de 1 año" },
            { value: 2, text: "De 1 a 3 años" },
            { value: 3, text: "De 4 a 6 años" },
            { value: 4, text: "De 7 a 10 años" },
            { value: 5, text: "Más de 10 años" }
          ]
        }
      ]
    },

    // PÁGINA 3: Instrucción antes de preguntas de trabajo
    {
      name: "page_instruccion",
      title: "Instrucción",
      elements: [
        {
          type: "html",
          name: "instruccion_html",
          html: "<div style='font-size: 16px; line-height: 1.8; background: #ffffff; padding: 20px; border-radius: 8px;'><p><strong>A partir de este momento te haremos algunas preguntas sobre tu trabajo.</strong></p><p>Tómate el tiempo necesario para responderlas; no hay respuestas buenas o malas, solo tu experiencia.</p></div>"
        }
      ]
    },

    // PÁGINA 4: Motivación y Compromiso - Parte 1
    {
      name: "page_motivacion_1",
      title: "Motivación y Compromiso",
      elements: [
        {
          type: "rating",
          name: "entusiasmo",
          title: "¿Qué tan entusiasmado(a) te sientes al iniciar tu jornada laboral?",
          isRequired: true,
          displayMode: "buttons",
          rateMin: 1,
          rateMax: 5,
          minRateDescription: "Nada entusiasmado(a)",
          maxRateDescription: "Muy entusiasmado(a)"
        },
        {
          type: "radiogroup",
          name: "minimo_necesario",
          title: "¿Con qué frecuencia realizas únicamente lo necesario para cumplir con tus tareas en el trabajo?",
          isRequired: true,
          choices: [
            { value: 1, text: "Siempre" },
            { value: 2, text: "A menudo" },
            { value: 3, text: "A veces" },
            { value: 4, text: "Rara vez" },
            { value: 5, text: "Nunca" }
          ]
        },
        {
          type: "rating",
          name: "buscar_otro_trabajo",
          title: "Pensando en los próximos 12 meses, ¿qué tan probable es que busques activamente otro trabajo?",
          isRequired: true,
          displayMode: "buttons",
          rateMin: 1,
          rateMax: 5,
          minRateDescription: "Nada probable",
          maxRateDescription: "Muy probable"
        },
        {
          type: "rating",
          name: "conexion_proposito",
          title: "¿Qué tan emocionalmente conectado(a) te sientes con el propósito de la empresa donde trabajas?",
          isRequired: true,
          displayMode: "buttons",
          rateMin: 1,
          rateMax: 5,
          minRateDescription: "Nada conectado(a)",
          maxRateDescription: "Muy conectado(a)"
        }
      ]
    },

    // PÁGINA 5: Factores de Motivación
    {
      name: "page_factores",
      title: "Factores de Motivación",
      elements: [
        {
          type: "ranking",
          name: "top3_factores",
          title: "¿Qué factores son los que más influyen en tu motivación laboral? Selecciona máximo 3 y ordénalos, donde 1 es el que más influye.",
          isRequired: true,
          choices: [
            { value: 1, text: "Falta de reconocimiento" },
            { value: 2, text: "Pocas oportunidades de crecimiento o desarrollo" },
            { value: 3, text: "Baja flexibilidad (horarios, teletrabajo, permisos, etc.)" },
            { value: 4, text: "Carga de trabajo / presión" },
            { value: 5, text: "Relación con otras personas del equipo" },
            { value: 6, text: "Salario y beneficios" },
            { value: 7, text: "Ambiente laboral / clima organizacional" },
            { value: 8, text: "Claridad en las metas y expectativas" },
            { value: 9, text: "Balance entre vida personal y laboral" },
            { value: 10, text: "Recursos y herramientas para hacer el trabajo" },
            { value: 11, text: "Estilo de liderazgo de mi jefe" },
            { value: 12, text: "Falta de feedback o retroalimentación" },
            { value: 13, text: "Inseguridad laboral / miedo a perder el empleo" }
          ]
        }
      ]
    },

    // PÁGINA 6: Condiciones Laborales
    {
      name: "page_condiciones",
      title: "Condiciones Laborales",
      elements: [
        {
          type: "rating",
          name: "flexibilidad_beneficios",
          title: "De acuerdo con lo que vives en tu empresa, ¿sientes que cuentan con condiciones de flexibilidad y beneficios que apoyan tu experiencia laboral?",
          description: "(Por ejemplo: horarios flexibles, posibilidad de elegir beneficios y reconocimiento recurrente)",
          isRequired: true,
          displayMode: "buttons",
          rateMin: 1,
          rateMax: 5,
          minRateDescription: "Totalmente en desacuerdo",
          maxRateDescription: "Totalmente de acuerdo"
        }
      ]
    },

    // PÁGINA 7: Inteligencia Artificial
    {
      name: "page_ia",
      title: "Inteligencia Artificial",
      elements: [
        {
          type: "rating",
          name: "percepcion_ia",
          title: "En general ¿qué tan positiva es tu percepción sobre el uso de la inteligencia artificial?",
          isRequired: true,
          displayMode: "buttons",
          rateMin: 1,
          rateMax: 5,
          minRateDescription: "Muy negativa",
          maxRateDescription: "Muy positiva"
        },
        {
          type: "radiogroup",
          name: "sensacion_ia",
          title: "Cuando piensas en el uso de IA en tu empresa, ¿qué sensación predomina más?",
          isRequired: true,
          choices: [
            { value: 1, text: "Me ayuda a trabajar mejor" },
            { value: 2, text: "Me ahorra tiempo en tareas repetitivas" },
            { value: 3, text: "Me resulta indiferente" },
            { value: 4, text: "Me genera desconfianza" },
            { value: 5, text: "Me preocupa que reemplace personas" }
          ]
        },
        {
          type: "rating",
          name: "ia_deteccion_desmotivacion",
          title: "¿Qué tan dispuesto(a) estás a que tu empresa use herramientas de inteligencia artificial para identificar de manera temprana la desmotivación laboral?",
          isRequired: true,
          displayMode: "buttons",
          rateMin: 1,
          rateMax: 5,
          minRateDescription: "Nada dispuesto(a)",
          maxRateDescription: "Muy dispuesto(a)"
        }
      ]
    },

    // PÁGINA 8: Futuro 2026 - Ranking
    {
      name: "page_futuro",
      title: "Perspectiva para 2026",
      elements: [
        {
          type: "ranking",
          name: "ranking_2026",
          title: "Pensando en el futuro, ¿en qué deberían enfocarse más las empresas para mejorar la experiencia de los colaboradores en 2026?",
          description: "Ordena de 1 a 5, donde 1 es lo más importante.",
          isRequired: true,
          choices: [
            { value: 1, text: "Cultura organizacional (valores, ambiente, forma de trabajar)" },
            { value: 2, text: "Bienestar integral (salud física, mental, emocional)" },
            { value: 3, text: "Incentivos flexibles (beneficios personalizados, recompensas ajustadas)" },
            { value: 4, text: "IA aplicada a personas (herramientas para apoyar talento y clima laboral)" },
            { value: 5, text: "Liderazgo con propósito (jefes inspiradores, cercanía, claridad de visión)" }
          ]
        }
      ]
    },

    // PÁGINA 9: Expectativas 2026
    {
      name: "page_expectativas",
      title: "Expectativas para 2026",
      elements: [
        {
          type: "radiogroup",
          name: "expectativas_2026",
          title: "¿Qué esperarías de tu empresa para sentirte más comprometido en 2026?",
          isRequired: true,
          choices: [
            { value: 1, text: "Mejores oportunidades de crecimiento y desarrollo profesional" },
            { value: 2, text: "Mayor reconocimiento por mi trabajo" },
            { value: 3, text: "Un salario y beneficios más competitivos" },
            { value: 4, text: "Mayor equilibrio entre trabajo y vida personal" },
            { value: 5, text: "Más flexibilidad (horarios, teletrabajo, permisos, etc.)" },
            { value: 6, text: "Un liderazgo más cercano, claro y transparente" },
            { value: 7, text: "Un ambiente laboral más colaborativo y positivo" },
            { value: 8, text: "Más claridad en objetivos, roles y expectativas" },
            { value: 9, text: "Herramientas tecnológicas que faciliten mi trabajo" },
            { value: 10, text: "Incentivos flexibles y personalizados" }
          ]
        },
        {
          type: "text",
          name: "email",
          title: "Por favor compártenos tu correo con el que manejas tu cuenta Apprecio",
          isRequired: true,
          inputType: "email",
          placeHolder: "tu.email@example.com"
        }
      ]
    }
  ]
};

export default SurveyComponent;
