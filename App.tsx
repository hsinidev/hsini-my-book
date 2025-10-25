
import React, { useState, useCallback } from 'react';
import { View, NavigateTo } from './types';

import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { BackButton } from './components/BackButton';

import { HomeView } from './views/HomeView';
import { SearchResultsView } from './views/SearchResultsView';
import { DetailsView } from './views/DetailsView';
import { AuthorView } from './views/AuthorView';
import { SubjectView } from './views/SubjectView';
import { StaticView } from './views/StaticView';

export default function App() {
  const [history, setHistory] = useState<View[]>([{ type: 'home' }]);
  const currentView = history[history.length - 1];

  const navigateTo: NavigateTo = useCallback((view: View) => {
    setHistory(prev => [...prev, view]);
    window.scrollTo(0, 0);
  }, []);

  const navigateBack = useCallback(() => {
    if (history.length > 1) {
      setHistory(prev => prev.slice(0, -1));
    }
  }, [history.length]);
  
  const resetToHome = useCallback(() => {
      setHistory([{ type: 'home' }]);
  }, []);

  const renderView = () => {
    switch (currentView.type) {
      case 'home':
        return <HomeView navigateTo={navigateTo} />;
      case 'search':
        return <SearchResultsView query={currentView.query} navigateTo={navigateTo} />;
      case 'details':
        return <DetailsView bookKey={currentView.key} ia={currentView.ia} navigateTo={navigateTo} />;
      case 'author':
        return <AuthorView authorKey={currentView.key} navigateTo={navigateTo} />;
      case 'subject':
        return <SubjectView subjectName={currentView.name} navigateTo={navigateTo} />;
      case 'static':
        return <StaticView page={currentView.page} />;
      default:
        return <HomeView navigateTo={navigateTo} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header onSearch={(query) => navigateTo({ type: 'search', query })} onLogoClick={resetToHome} />
      <div className="flex-grow max-w-6xl w-full mx-auto px-4">
        <main>
          <div className="py-4 min-h-[50px]">
            {history.length > 1 && <BackButton onClick={navigateBack} />}
          </div>
          {renderView()}
        </main>
      </div>
      <Footer navigateTo={navigateTo} />
    </div>
  );
}
