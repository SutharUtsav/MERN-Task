import './App.css';

import './global.css';

import { useScrollToTop } from './hooks/use-scroll-to-top';
import Router from './routes/sections';
import ThemeProvider from './theme';

function App() {
  useScrollToTop();

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}

export default App;
