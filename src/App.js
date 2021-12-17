import { Routes, Route } from 'react-router-dom';
import Container from '@mui/material/Container';
import { Home } from './screens/Home';
import { About } from './screens/About';
import { DataStructure } from './screens/DataStructure';
import { AppHeader } from './components/AppHeader';
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
            <Route path="data-structure" element={<DataStructure />} />
          </Routes>
        </Container>
      </div>
    </QueryClientProvider>
  );
}

export default App;
