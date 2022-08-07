import { AppRoutes } from './Routes';
import { ThemeProvider } from './theme';

function App() {
  return (
    <ThemeProvider>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
