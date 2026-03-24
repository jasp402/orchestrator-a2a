import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Orchestration from './components/Orchestration';
import Dockets from './components/Dockets';
import Fleet from './components/Fleet';
import Dashboard from './components/Dashboard';
import CTA from './components/CTA';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Hero />
      <Orchestration />
      <Dockets />
      <Fleet />
      <Dashboard />
      <CTA />
      <Footer />
    </>
  );
};

export default App;
