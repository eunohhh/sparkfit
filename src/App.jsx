import { Analytics } from '@vercel/analytics/react';
import QueryProvider from './providers/QueryProvider';
import Router from './router/Router';

function App() {
  return (
    <QueryProvider>
      <Router />
      <Analytics />
    </QueryProvider>
  );
}

export default App;
