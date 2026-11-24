import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FIGMA_ASSETS } from '../assetsMap';
import type { ConceptMode, LegalDocId } from '../types';
import { TiltGlassSurface } from './TiltGlassSurface';

interface InfoPageProps {
  concept: ConceptMode;
  onOpenLegal: (doc: Exclude<LegalDocId, null>) => void;
}

const DOC_ITEMS: {
  id: Exclude<LegalDocId, null>;
  title: string;
  caption: string;
}[] = [
  {
    id: 'offer',
    title: 'Публичная оферта',
    caption: 'Правила использования сервиса',
  },
  {
    id: 'privacy',
    title: 'Политика конфиденциальности',
    caption: 'Как обрабатываются персональные данные',
  },
  {
    id: 'terms',
    title: 'Условия доступа и оплаты',
    caption: 'Пробный период, оплата и продление',
  },
];

export const InfoPage: React.FC<InfoPageProps> = ({ concept, onOpenLegal }) => {
  const [hoveredDoc, setHoveredDoc] = useState<string | null>(null);

  return (
    <section className={`info-page info-page--${concept}`}>
      {/* Page Heading */}
      <div className="info-heading-block">
        <motion.p
          className={`info-eyebrow info-eyebrow--${concept}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          ВСЁ О ВОЛЬТЕ
        </motion.p>

        <h1 className={`info-title info-title--${concept}`}>
          <span className="headline-mask">
            <motion.span
              className="headline-line"
              initial={{ y: '108%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.65, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              Информация
            </motion.span>
          </span>
        </h1>

        <motion.p
          className={`info-subtitle info-subtitle--${concept}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
        >
          На связи, когда нужна помощь. Открыто — о том, как работает сервис.
        </motion.p>
      </div>

      {/* Information Cards Row */}
      <div className="info-cards-grid">
        {/* Card 1: Поддержка */}
        <motion.div
          className="info-support-col"
          initial={{ opacity: 0, y: 26, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.62, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
        >
          <TiltGlassSurface
            className="info-card info-card--support"
            maxTilt={3.2}
            glareOpacity={0.28}
          >
            <div className="support-intro">
              <motion.div
                className="support-icon-box"
                whileHover={{ scale: 1.08, rotate: -6 }}
                transition={{ type: 'spring', stiffness: 420, damping: 18 }}
              >
                <img
                  src={FIGMA_ASSETS.chatSupport}
                  alt=""
                  width={28}
                  height={28}
                />
              </motion.div>

              <h2 className="support-title">Поддержка Вольта</h2>

              <div className="support-desc">
                <p>Поможем подключиться, найти доступ</p>
                <p>или разобраться с оплатой.</p>
              </div>
            </div>

            <div className="support-action">
              <p className="support-topics">{`ПОДКЛЮЧЕНИЕ  ·  ОПЛАТА  ·  ДОСТУП`}</p>

              <motion.a
                href="https://t.me"
                target="_blank"
                rel="noopener noreferrer"
                className="telegram-cta-btn"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 420, damping: 22 }}
              >
                <span aria-hidden="true" className="telegram-cta-sheen" />
                <span className="telegram-icon-wrap">
                  <img
                    src={FIGMA_ASSETS.telegram}
                    alt=""
                    width={20}
                    height={20}
                  />
                </span>
                <span className="telegram-cta-label">Написать в Telegram</span>
              </motion.a>
            </div>
          </TiltGlassSurface>
        </motion.div>

        {/* Card 2: О сервисе и документах */}
        <motion.div
          className="info-about-col"
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          <TiltGlassSurface
            className="info-card info-card--about"
            maxTilt={2.6}
            glareOpacity={0.25}
          >
            <div className="about-heading">
              <h2 className="about-title">О сервисе и документах</h2>
              <div className="about-desc">
                <p>Вольт — сервис защищённого подключения к интернету.</p>
                <p>Контакты оператора и условия использования — здесь.</p>
              </div>
            </div>

            <div className="operator-box">
              <p className="operator-label">ОПЕРАТОР СЕРВИСА</p>
              <p className="operator-name">[Наименование ИП или организации]</p>
              <div className="operator-details">
                <p className="operator-details-line">{`ИНН: [указать]     ОГРН / ОГРНИП: [указать]`}</p>
                <p>Email для обращений: [указать]</p>
              </div>
            </div>

            <div
              className="documents-list"
              onMouseLeave={() => setHoveredDoc(null)}
            >
              {DOC_ITEMS.map((doc, index) => {
                const isHovered = hoveredDoc === doc.id;
                return (
                  <React.Fragment key={doc.id}>
                    {index > 0 && <div className="document-divider" />}
                    <button
                      type="button"
                      className="document-row"
                      onMouseEnter={() => setHoveredDoc(doc.id)}
                      onClick={() => onOpenLegal(doc.id)}
                    >
                      {isHovered && (
                        <motion.span
                          layoutId="doc-row-hover"
                          className="document-row-highlight"
                          transition={{ type: 'spring', stiffness: 460, damping: 34 }}
                        />
                      )}
                      <span className="document-copy">
                        <span className="document-title">{doc.title}</span>
                        <span className="document-caption">{doc.caption}</span>
                      </span>
                      <motion.span
                        className="document-arrow"
                        animate={
                          isHovered ? { x: 3, y: -3, scale: 1.08 } : { x: 0, y: 0, scale: 1 }
                        }
                        transition={{ type: 'spring', stiffness: 420, damping: 22 }}
                      >
                        <img
                          src={FIGMA_ASSETS.arrowExternal}
                          alt=""
                          width={18}
                          height={18}
                        />
                      </motion.span>
                    </button>
                  </React.Fragment>
                );
              })}
            </div>

            <div className="payment-note">
              <img
                src={FIGMA_ASSETS.dotBlue}
                alt=""
                width={6}
                height={6}
                className="payment-note-dot"
              />
              <p className="payment-note-text">
                Продление вручную. Управление доступом — в личном кабинете.
              </p>
            </div>
          </TiltGlassSurface>
        </motion.div>
      </div>
    </section>
  );
};
