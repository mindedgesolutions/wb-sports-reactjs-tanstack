import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { Toaster } from 'sonner';
import { Provider } from 'react-redux';
import store from '@/redux/store.ts';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './tanstack/query.client.ts';
import { ThemeProvider } from './components/dark-mode/theme-provider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Provider store={store}>
          <App />
          <Toaster closeButton={true} position="top-center" />
        </Provider>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);
