import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FIGMA_ASSETS } from '../assetsMap';
import type { ConceptMode, LegalDocId } from '../types';
import { TiltGlassSurface } from './TiltGlassSurface';

interface CheckoutCardProps {
  concept: ConceptMode;
  onOpenLegal: (doc: Exclude<LegalDocId, null>) => void;
}

interface BenefitItem {
  id: string;
  color: string;
  glow: string;
  icon: string;
  iconW: number;
  iconH: number;
  title: string;
  subtitle: string;
}

const BENEFITS: BenefitItem[] = [
  {
    id: 'globe',
    color: '#ff655b',
    glow: 'rgba(255, 101, 91, 0.36)',
    icon: FIGMA_ASSETS.benefitGlobe,
    iconW: 18.15,
    iconH: 18.15,
    title: 'Любимые сайты и сервисы',
    subtitle: 'Для работы, видео и общения',
  },
  {
    id: 'devices',
    color: '#ffaa25',
    glow: 'rgba(255, 170, 37, 0.38)',
    icon: FIGMA_ASSETS.benefitDevices,
    iconW: 18.15,
    iconH: 17.2333,
    title: '5 устройств в одной подписке',
    subtitle: 'Телефон, ноутбук и не только',
  },
  {
    id: 'traffic',
    color: '#168bff',
    glow: 'rgba(22, 139, 255, 0.36)',
    icon: FIGMA_ASSETS.benefitTraffic,
    iconW: 18.15,
    iconH: 8.98333,
    title: 'Трафик без ограничений',
    subtitle: 'Пользуйся без счётчика гигабайт',
  },
  {
    id: 'shield',
    color: '#9a65ef',
    glow: 'rgba(154, 101, 239, 0.36)',
    icon: FIGMA_ASSETS.benefitShield,
    iconW: 16.3167,
    iconH: 18.15,
    title: 'Защита в публичном Wi-Fi',
    subtitle: 'Шифрование твоего соединения',
  },
];

export const CheckoutCard: React.FC<CheckoutCardProps> = ({
  concept,
  onOpenLegal,
}) => {
  const [hoveredBenefit, setHoveredBenefit] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [consent, setConsent] = useState<boolean>(false);
  const [errorField, setErrorField] = useState<'email' | 'consent' | null>(null);
  const [shakeKey, setShakeKey] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      setErrorField('email');
      setShakeKey((k) => k + 1);
      return;
    }
    if (!consent) {
      setErrorField('consent');
      setShakeKey((k) => k + 1);
      return;
    }

    setErrorField(null);
    setIsSubmitting(true);
    window.setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedEmail(email.trim());
    }, 650);
  };

  const arrowSrc =
    concept === 'electric' ? FIGMA_ASSETS.arrowDark : FIGMA_ASSETS.arrowWhite;

  return (
    <motion.div
      className="checkout-card-shell"
      initial={{ opacity: 0, y: 24, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.65, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
    >
      <TiltGlassSurface
        className={`checkout-card checkout-card--${concept}`}
        maxTilt={2.6}
        glareOpacity={0.22}
      >
        <form onSubmit={handleSubmit} noValidate className="checkout-form">
          {/* Trial Offer Header */}
          <div className="trial-offer">
            <div className="trial-offer-headline">
              <h2 className="trial-heading">Начни за</h2>
              <motion.span
                className="trial-price"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 420, damping: 18 }}
              >
                1 ₽
              </motion.span>
              <motion.span
                className="trial-fire"
                aria-hidden="true"
                animate={{
                  rotate: [0, -5, 4, -3, 0],
                  scale: [1, 1.06, 0.98, 1.04, 1],
                }}
                transition={{
                  duration: 3.4,
                  repeat: Infinity,
                  repeatDelay: 1.8,
                  ease: 'easeInOut',
                }}
              >
                🔥
              </motion.span>
            </div>
            <p className="trial-promise">
              3 дня полного доступа ко всем возможностям.
            </p>
          </div>

          {/* Benefits List */}
          <div className="benefits-section">
            <p className="section-eyebrow">ЧТО ВХОДИТ В ТВОЙ VPN</p>
            <div
              className="benefits-list"
              onMouseLeave={() => setHoveredBenefit(null)}
            >
              {BENEFITS.map((item, idx) => {
                const isHovered = hoveredBenefit === item.id;
                return (
                  <motion.div
                    key={item.id}
                    className="benefit-row"
                    onMouseEnter={() => setHoveredBenefit(item.id)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.2 + idx * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {isHovered && (
                      <motion.span
                        layoutId={`benefit-hover-bg-${concept}`}
                        className="benefit-row-highlight"
                        transition={{ type: 'spring', stiffness: 450, damping: 34 }}
                      />
                    )}
                    <motion.div
                      className="benefit-icon-badge"
                      style={{
                        backgroundColor: item.color,
                        boxShadow: isHovered ? `0 8px 18px ${item.glow}` : 'none',
                      }}
                      animate={
                        isHovered
                          ? { scale: 1.1, rotate: -4 }
                          : { scale: 1, rotate: 0 }
                      }
                      transition={{ type: 'spring', stiffness: 420, damping: 20 }}
                    >
                      <img
                        src={item.icon}
                        alt=""
                        width={item.iconW}
                        height={item.iconH}
                        className="benefit-icon-img"
                      />
                    </motion.div>
                    <div className="benefit-copy">
                      <p className="benefit-title">{item.title}</p>
                      <p className="benefit-subtitle">{item.subtitle}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Email Field */}
          <motion.div
            key={errorField === 'email' ? `email-shake-${shakeKey}` : 'email-steady'}
            className="email-field-group"
            animate={
              errorField === 'email' ? { x: [0, -7, 7, -5, 5, 0] } : { x: 0 }
            }
            transition={{ duration: 0.38 }}
          >
            <label htmlFor="volt-email-input" className="field-label">
              EMAIL ДЛЯ ДОСТУПА И ЧЕКА
            </label>
            <div
              className={`email-input-wrap ${
                errorField === 'email' ? 'has-error' : ''
              }`}
            >
              <input
                id="volt-email-input"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorField === 'email') setErrorField(null);
                }}
                className="email-input"
              />
            </div>
            <AnimatePresence>
              {errorField === 'email' && (
                <motion.p
                  className="field-error-hint"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                >
                  Укажите корректный email, чтобы мы отправили ключ доступа и чек.
                </motion.p>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Primary CTA Button */}
          <motion.button
            type="submit"
            className={`cta-pay-btn cta-pay-btn--${concept}`}
            whileHover={{ scale: 1.018, y: -1.5 }}
            whileTap={{ scale: 0.982 }}
            transition={{ type: 'spring', stiffness: 420, damping: 24 }}
            disabled={isSubmitting}
          >
            <span aria-hidden="true" className="cta-pay-sheen" />
            <span className="cta-pay-label">
              {isSubmitting ? 'Переходим к оплате…' : 'Оплатить 1 ₽'}
            </span>
            <span className="cta-pay-arrow-wrap">
              <img
                src={arrowSrc}
                alt=""
                width={22}
                height={22}
                className="cta-pay-arrow-img"
              />
            </span>
          </motion.button>

          {/* Consent Checkbox */}
          <motion.div
            key={
              errorField === 'consent'
                ? `consent-shake-${shakeKey}`
                : 'consent-steady'
            }
            className={`consent-row ${errorField === 'consent' ? 'has-error' : ''}`}
            animate={
              errorField === 'consent' ? { x: [0, -6, 6, -4, 4, 0] } : { x: 0 }
            }
            transition={{ duration: 0.36 }}
          >
            <button
              type="button"
              role="checkbox"
              aria-checked={consent}
              aria-label="Принимаю оферту и политику конфиденциальности"
              className={`consent-checkbox ${consent ? 'is-checked' : ''}`}
              onClick={() => {
                setConsent((prev) => !prev);
                if (errorField === 'consent') setErrorField(null);
              }}
            >
              <AnimatePresence>
                {consent && (
                  <motion.svg
                    width="10"
                    height="8"
                    viewBox="0 0 10 8"
                    fill="none"
                    initial={{ scale: 0.4, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.4, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 520, damping: 24 }}
                  >
                    <motion.path
                      d="M1.2 4.1L3.7 6.6L8.8 1.4"
                      stroke="#FFFFFF"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.svg>
                )}
              </AnimatePresence>
            </button>

            <div className="consent-copy">
              <p>
                Принимаю{' '}
                <button
                  type="button"
                  className="inline-legal-btn"
                  onClick={() => onOpenLegal('offer')}
                >
                  оферту
                </button>{' '}
                и{' '}
                <button
                  type="button"
                  className="inline-legal-btn"
                  onClick={() => onOpenLegal('privacy')}
                >
                  политику
                </button>
              </p>
              <p>
                <button
                  type="button"
                  className="inline-legal-btn"
                  onClick={() => onOpenLegal('privacy')}
                >
                  конфиденциальности
                </button>
              </p>
            </div>
          </motion.div>

          <AnimatePresence>
            {errorField === 'consent' && (
              <motion.p
                className="field-error-hint"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
              >
                Отметьте согласие с офертой и политикой конфиденциальности.
              </motion.p>
            )}
          </AnimatePresence>

          {/* Trial Terms */}
          <div className="trial-terms">
            <p>Первый платёж — 1 ₽ за 3 дня.</p>
            <p>Дальше — продление вручную, без автосписаний.</p>
          </div>
        </form>

        {/* Interactive Demo Checkout Success Overlay */}
        <AnimatePresence>
          {submittedEmail && (
            <motion.div
              className="checkout-success-overlay"
              initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
              animate={{ opacity: 1, backdropFilter: 'blur(18px)' }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.32 }}
            >
              <motion.div
                className="checkout-success-inner"
                initial={{ scale: 0.9, y: 14, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.94, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 380, damping: 26 }}
              >
                <div className="checkout-success-badge">
                  <img
                    src={FIGMA_ASSETS.bolt}
                    alt=""
                    width={20}
                    height={20}
                  />
                </div>
                <h3 className="checkout-success-title">
                  Демо-заказ на 1 ₽ готов!
                </h3>
                <p className="checkout-success-desc">
                  После подтверждения платежа ключ для 5 устройств и чек придут на{' '}
                  <strong>{submittedEmail}</strong>.
                </p>
                <div className="checkout-success-meta">
                  <span>3 дня полного доступа</span>
                  <span>·</span>
                  <span>Без автосписаний</span>
                </div>
                <button
                  type="button"
                  className={`checkout-reset-btn checkout-reset-btn--${concept}`}
                  onClick={() => setSubmittedEmail(null)}
                >
                  Вернуться к форме
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </TiltGlassSurface>
    </motion.div>
  );
};
