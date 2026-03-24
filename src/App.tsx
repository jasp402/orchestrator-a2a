import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Orchestration from './components/Orchestration';
import ArchitectureDiagram from './components/ArchitectureDiagram';
import Dockets from './components/Dockets';
import Fleet from './components/Fleet';
import DashboardComponent from './components/Dashboard';
import CTA from './components/CTA';
import Footer from './components/Footer';

// Auth and Project Management Views
import Login from './components/Login';
import OnboardingWizard from './components/OnboardingWizard';
import ProjectDashboard from './components/ProjectDashboard';

const Home: React.FC = () => (
  <>
    <Header />
    <Hero />
    <Orchestration />
    <ArchitectureDiagram />
    <Dockets />
    <Fleet />
    <DashboardComponent />
    <CTA />
    <Footer />
  </>
);

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<OnboardingWizard />} />
        <Route path="/dashboard" element={<ProjectDashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
