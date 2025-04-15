import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RecipeGenerator from './pages/RecipeGenerator';
import Team from './pages/Team';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipe" element={<RecipeGenerator />} />
        <Route path="/team" element={<Team />} />
      </Routes>
    </div>
  );
}

export default App;