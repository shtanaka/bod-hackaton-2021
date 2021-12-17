import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import Container from '@mui/material/Container';
import { connect } from "react-redux";

import { Home } from './screens/Home';
import { About } from './screens/About';
import { DataStructure } from './screens/DataStructure';
import { ChallengeUpload } from './screens/ChallengeUpload';
import { ShotUpload } from './screens/ShotUpload';
import { AppHeader } from './components/AppHeader';

const queryClient = new QueryClient();

function App({ header }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        {header.isShowing && (
          <AppHeader />
        )}
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="data-structure" element={<DataStructure />} />
          </Routes>
        </Container>
        <Routes>
          <Route path="challenge-upload" element={<ChallengeUpload />} />
          <Route path="shot-upload/:challengeId" element={<ShotUpload />} />
        </Routes>
      </div>
    </QueryClientProvider>
  );
}

const mapState = ({ header }) => ({ header });

const mapDispatch = () => ({});

export default connect(mapState, mapDispatch)(App);
