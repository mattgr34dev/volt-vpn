import React from 'react';
import type { ConceptMode, LegalDocId, PageTab } from '../types';

interface FooterProps {
  concept: ConceptMode;
  activeTab: PageTab;
  onOpenLegal: (doc: Exclude<LegalDocId, null>) => void;
  onSelectTab: (tab: PageTab) => void;
}

export const Footer: React.FC<FooterProps> = ({
  concept,
  activeTab,
  onOpenLegal,
  onSelectTab,
}) => {
  return (
    <footer
      className={`site-footer site-footer--${concept} site-footer--${activeTab}`}
    >
      <p className="footer-copyright">© 2026 Вольт VPN</p>

      <div className="footer-links">
        <button
          type="button"
          className="footer-link-btn"
          onClick={() => onOpenLegal('offer')}
        >
          Оферта
        </button>
        <button
          type="button"
          className="footer-link-btn"
          onClick={() => onOpenLegal('privacy')}
        >
          Конфиденциальность
        </button>
        {activeTab === 'connect' ? (
          <button
            type="button"
            className="footer-link-btn"
            onClick={() => onSelectTab('info')}
          >
            Поддержка
          </button>
        ) : (
          <span className={`footer-current-page footer-current-page--${concept}`}>
            Информация
          </span>
        )}
      </div>

      {activeTab === 'connect' && (
        <p className="footer-microcopy">Меньше настроек. Больше интернета.</p>
      )}
    </footer>
  );
};
