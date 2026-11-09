

import React, { useEffect } from 'react';
import * as Sentry from '@sentry/react';
import log from 'loglevel';
import logo from './logo.svg';
import './App.css';

// 1. Configuração do nível de log do loglevel (info, warn, error)
log.setLevel('info');

// 2. Inicialização do Sentry para monitoramento de erros
Sentry.init({
  dsn: 'SEU_DSN_AQUI', // Substitua 'SEU_DSN_AQUI' pelo DSN real do seu painel Sentry
  tracesSampleRate: 1.0, // Coleta 100% dos dados de performance
});

function App() {
  
  // Gancho para registrar o início da aplicação no console
  useEffect(() => {
    log.info('Aplicação iniciada com monitoramento.');
  }, []);

  // Função para simular o erro ao clicar no botão
  const simulateError = () => {
    try {
      // Forçando uma falha proposital
      throw new Error('Erro simulado para teste de monitoramento');
    } catch (error) {
      log.error('Erro capturado no console:', error); // Grava o erro localmente
      Sentry.captureException(error); // Envia a falha para a sua conta Sentry
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <h1>Monitoramento & Logging</h1>
        <p>
          O Sentry e o loglevel foram acoplados com sucesso nesta tela.
        </p>

        {/* Botão de simulação inserido respeitando a estrutura do CSS original */}
        <button 
          onClick={simulateError} 
          style={{
            padding: '12px 24px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            backgroundColor: '#e74c3c',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            margin: '20px 0'
          }}
        >
          Simular Erro
        </button>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

// 3. Exportação do componente utilizando o Profiler do Sentry para métricas de performance
export default Sentry.withProfiler(App);
