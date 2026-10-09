import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; // or './styles/global.css' if your global CSS lives there
import App from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);