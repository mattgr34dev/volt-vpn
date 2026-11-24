import React from 'react';
import { motion } from 'framer-motion';
import { FIGMA_ASSETS } from '../assetsMap';
import type { ConceptMode, PageTab } from '../types';

interface HeaderProps {
  concept: ConceptMode;
  activeTab: PageTab;
  onSelectTab: (tab: PageTab) => void;
  onSelectConcept: (concept: ConceptMode) => void;
}

export const Header: React.FC<HeaderProps> = ({
  concept,
  activeTab,
  onSelectTab,
  onSelectConcept,
}) => {
  return (
    <header className={`site-header site-header--${concept}`}>
      <motion.nav
        aria-label="Основная навигация"
        className={`floating-nav floating-nav--${concept}`}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          type="button"
          className="brand-logo"
          onClick={() => onSelectTab('connect')}
          aria-label="Вольт VPN — на главную"
        >
          <motion.span
            className="brand-mark"
            whileHover={{ scale: 1.08, rotate: -6 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 450, damping: 18 }}
          >
            <img
              src={FIGMA_ASSETS.bolt}
              alt=""
              width={20}
              height={20}
              className="brand-bolt-img"
            />
          </motion.span>
          <span className="brand-wordmark">вольт</span>
        </button>

        <div className="nav-tabs" role="tablist" aria-label="Разделы сайта">
          {(['connect', 'info'] as const).map((tab) => {
            const isActive = activeTab === tab;
            const label = tab === 'connect' ? 'Подключить' : 'Информация';
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`nav-tab ${isActive ? 'is-active' : ''}`}
                onClick={() => onSelectTab(tab)}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-nav-pill"
                    className={`nav-tab-pill nav-tab-pill--${concept}`}
                    transition={{ type: 'spring', stiffness: 440, damping: 32 }}
                  />
                )}
                <span className="nav-tab-label">{label}</span>
              </button>
            );
          })}
        </div>
      </motion.nav>

      <motion.div
        className={`concept-switcher concept-switcher--${concept}`}
        role="group"
        aria-label="Переключатель дизайн-концепта"
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          type="button"
          className={`concept-btn ${concept === 'electric' ? 'is-active' : ''}`}
          onClick={() => onSelectConcept('electric')}
          aria-pressed={concept === 'electric'}
          title="Концепт 01 — Electric (синий со щитом)"
        >
          {concept === 'electric' && (
            <motion.span
              layoutId="active-concept-pill"
              className={`concept-btn-pill concept-btn-pill--${concept}`}
              transition={{ type: 'spring', stiffness: 460, damping: 32 }}
            />
          )}
          <span className="concept-dot concept-dot--electric" aria-hidden="true" />
          <span className="concept-btn-text">01 Electric</span>
        </button>

        <button
          type="button"
          className={`concept-btn ${concept === 'glass' ? 'is-active' : ''}`}
          onClick={() => onSelectConcept('glass')}
          aria-pressed={concept === 'glass'}
          title="Концепт 02 — Glass (светлый стеклянный бенто)"
        >
          {concept === 'glass' && (
            <motion.span
              layoutId="active-concept-pill"
              className={`concept-btn-pill concept-btn-pill--${concept}`}
              transition={{ type: 'spring', stiffness: 460, damping: 32 }}
            />
          )}
          <span className="concept-dot concept-dot--glass" aria-hidden="true" />
          <span className="concept-btn-text">02 Glass</span>
        </button>
      </motion.div>
    </header>
  );
};
