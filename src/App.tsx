import React from 'react';
import SurveyComponent from './components/SurveyComponent';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <img 
            src="https://estudios.apprecio.com/hubfs/logo-cobrand-ebook-provokers.png" 
            alt="Apprecio Provokers Logo" 
            className="app-logo"
          />
        </div>
      </header>
      
      <main className="app-main">
        <SurveyComponent />
      </main>

      <footer className="app-footer">
        <p>Apprecio © 2026 - Todos tus datos son confidenciales</p>
      </footer>
    </div>
  );
}

export default App;
