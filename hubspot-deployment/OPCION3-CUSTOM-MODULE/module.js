/**
 * Survey App - HubSpot Module
 * Inicializa la encuesta con la configuración de HubSpot
 */

(function() {
  // Namespace global
  window.SurveyApp = window.SurveyApp || {};

  // Función para inicializar el módulo
  window.SurveyApp.initModule = function(containerId, config) {
    const container = document.getElementById(containerId);
    
    if (!container) {
      console.error('Survey container not found:', containerId);
      return;
    }

    // Esperar a que React y SurveyJS estén listos
    if (typeof window.React === 'undefined' || typeof window.Survey === 'undefined') {
      setTimeout(() => window.SurveyApp.initModule(containerId, config), 100);
      return;
    }

    // Crear la encuesta con configuración de HubSpot
    const surveyConfig = {
      title: config.title || "Encuesta de Motivación",
      showProgressBar: config.showProgress ? 'bottom' : false,
      pagePrevText: config.buttonTexts?.prev || "Anterior",
      pageNextText: config.buttonTexts?.next || "Siguiente",
      completeText: config.buttonTexts?.submit || "Enviar Respuestas",
      // ... resto de configuración de la encuesta
    };

    // Crear y renderizar survey
    const survey = new window.Survey.Model(surveyConfig);
    
    // Escuchar completación
    survey.onComplete.add((result) => {
      console.log('Survey completed:', result.data);
      
      // Enviar al webhook
      if (config.webhookUrl) {
        fetch(config.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(result.data)
        })
        .then(r => {
          if (r.ok) console.log('Data sent successfully');
        })
        .catch(err => console.error('Send error:', err));
      }
    });

    // Renderizar
    const ReactDOM = window.ReactDOM || window.React.__DOM;
    ReactDOM.render(
      window.React.createElement(window.Survey.Survey, { model: survey }),
      container
    );
  };

  console.log('SurveyApp module loaded');
})();
