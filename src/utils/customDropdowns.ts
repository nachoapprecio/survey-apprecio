// Custom dropdown handler para reemplazar el picker nativo de iOS
// Se ejecuta cuando el DOM está listo
export function initCustomDropdowns() {
  // Esperar a que SurveyJS cargue y genere los dropdowns
  const waitForDropdowns = () => {
    const selects = document.querySelectorAll('select, [class*="dropdown"]');
    
    if (selects.length === 0) {
      // Reintentar si aún no hay dropdowns
      setTimeout(waitForDropdowns, 100);
      return;
    }

    // Aplicar estilos y comportamiento a cada dropdown
    selects.forEach((select) => {
      const selectElement = select as HTMLSelectElement;
      
      // No reemplazar si ya fue procesado
      if (selectElement.dataset?.customized === 'true') return;
      
      selectElement.dataset.customized = 'true';
      
      // Aplicar clase personalizada
      selectElement.classList.add('custom-dropdown');
      
      // Forzar que el dropdown use el picker nativo pequeño en iOS
      // pero no fullscreen
      if (isMobileDevice()) {
        // Tamaño grande ayuda a iOS a no usar fullscreen picker
        selectElement.style.fontSize = '18px';
        selectElement.style.padding = '12px';
        selectElement.style.width = '100%';
        selectElement.style.height = 'auto';
        selectElement.style.minHeight = '44px'; // iOS minimum touch target
        
        // Prevenir que iOS use el fullscreen picker
        selectElement.addEventListener('click', () => {
          // Permitir que se abra pero mantener el picker pequeño
          selectElement.focus();
        });
      }
    });

    // Observar cambios en el DOM para nuevos dropdowns
    const observer = new MutationObserver(() => {
      const newSelects = document.querySelectorAll('select:not([data-customized="true"])');
      newSelects.forEach(() => {
        initCustomDropdowns();
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true
    });
  };

  waitForDropdowns();
}

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
