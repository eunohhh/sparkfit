import QueryProvider from './providers/QueryProvider';
import Router from './router/Router';

function App() {
  return (
    <QueryProvider>
      <main className="flex justify-center items-center h-screen bg-customBackground">
        <Router />
      </main>
    </QueryProvider>
  );
}

export default App;
