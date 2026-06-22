import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import AboutCeo from './pages/AboutCeo';
import InfoTech from './pages/InfoTech';
import AboutInfoTech from './pages/AboutInfoTech';
import Internship from './pages/Internship';
import LatestNews from './pages/LatestNews';
import ArshithInfoTech from './pages/ArshithInfoTech';
import AiChartBot from './pages/AiChartBot';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutCeo />} />
        <Route path="/infotech" element={<InfoTech />} />
        <Route path="/about-infotech" element={<AboutInfoTech />} />
        <Route path="/internship" element={<Internship />} />
        <Route path="/latest-news" element={<LatestNews />} />
        <Route path="/arshith-infotech" element={<ArshithInfoTech />} />
        <Route path="/ai-chart-bot" element={<AiChartBot />} />
      </Routes>
    </Router>
  );
}

export default App;
