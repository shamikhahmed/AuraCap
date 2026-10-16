import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './tokens.css';
import './index.css';
import App from './App.tsx';
import versionManifest from '../VERSION.json';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

/* Keep ac-booting through first paint, then allow enter animations on later navigations. */
requestAnimationFrame(() => {
  requestAnimationFrame(() => {
    document.documentElement.classList.remove('ac-booting');
  });
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const base = import.meta.env.BASE_URL;
    navigator.serviceWorker.register(`${base}sw.js?v=${versionManifest.swCache}`, { scope: base }).catch(() => {
      /* offline / unsupported */
    });
  });
}
