import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckoutCard } from './components/CheckoutCard';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroElectric } from './components/HeroElectric';
import { HeroGlass } from './components/HeroGlass';
import { InfoPage } from './components/InfoPage';
import { LegalModal } from './components/LegalModal';
import type { ConceptMode, LegalDocId, PageTab } from './types';

function getInitialState(): { concept: ConceptMode; tab: PageTab } {
  if (typeof window === 'undefined') {
    return { concept: 'electric', tab: 'connect' };
  }
  const params = new URLSearchParams(window.location.search);
  const conceptParam = params.get('concept');
  const tabParam = params.get('tab');

  return {
    concept: conceptParam === 'glass' ? 'glass' : 'electric',
    tab: tabParam === 'info' ? 'info' : 'connect',
  };
}

export function App() {
  const initial = getInitialState();
  const [concept, setConcept] = useState<ConceptMode>(initial.concept);
  const [activeTab, setActiveTab] = useState<PageTab>(initial.tab);
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocId>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('concept', concept);
    params.set('tab', activeTab);
    const nextUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState(null, '', nextUrl);
  }, [concept, activeTab]);

  const handleSelectTab = (tab: PageTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={`volt-app volt-app--${concept} volt-app--tab-${activeTab}`}
    >
      {/* Ambient Dynamic Atmosphere */}
      <div className="ambient-atmosphere" aria-hidden="true">
        <div className={`ambient-orb ambient-orb--one ambient-orb--${concept}`} />
        <div className={`ambient-orb ambient-orb--two ambient-orb--${concept}`} />
      </div>

      <div
        className={`volt-container volt-container--${activeTab}`}
      >
        <Header
          concept={concept}
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          onSelectConcept={setConcept}
        />

        <main className="volt-main">
          <AnimatePresence mode="wait">
            {activeTab === 'connect' ? (
              <motion.section
                key={`connect-${concept}`}
                className="offer-checkout-grid"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="hero-column">
                  {concept === 'electric' ? <HeroElectric /> : <HeroGlass />}
                </div>

                <div className="checkout-column">
                  <CheckoutCard
                    concept={concept}
                    onOpenLegal={(doc) => setActiveLegalDoc(doc)}
                  />
                </div>
              </motion.section>
            ) : (
              <motion.div
                key={`info-${concept}`}
                className="info-tab-wrapper"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              >
                <InfoPage
                  concept={concept}
                  onOpenLegal={(doc) => setActiveLegalDoc(doc)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        <Footer
          concept={concept}
          activeTab={activeTab}
          onOpenLegal={(doc) => setActiveLegalDoc(doc)}
          onSelectTab={handleSelectTab}
        />
      </div>

      <LegalModal
        docId={activeLegalDoc}
        onClose={() => setActiveLegalDoc(null)}
      />
    </div>
  );
}

export default App;
