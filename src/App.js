import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import { Home } from './screens/Home';
import { About } from './screens/About';
import { AppHeader } from './components/AppHeader';
import './App.css';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <AppHeader />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
          </Routes>
        </Container>
      </div>
    </QueryClientProvider>
  );
}

export default App;
