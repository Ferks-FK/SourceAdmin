import { createRoot } from 'react-dom/client';
import { App } from '@/components/App';
import { BrowserRouter } from 'react-router-dom';
import '@/i18n/i18n';

createRoot(document.getElementById('app')).render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>
);
