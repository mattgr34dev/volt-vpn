import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FIGMA_ASSETS } from '../assetsMap';
import { SpeedtestCard } from './SpeedtestCard';
import { TiltGlassSurface } from './TiltGlassSurface';

export const HeroGlass: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const [deviceCount, setDeviceCount] = useState<number>(1);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timers = [1, 2, 3, 4].map((step) =>
      window.setTimeout(() => {
        setDeviceCount(step + 1);
      }, 140 + step * 115)
    );
    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [prefersReducedMotion]);

  const shownDevices = prefersReducedMotion ? 5 : deviceCount;

  return (
    <div className="hero-glass">
      {/* Product Headline */}
      <div className="product-headline">
        <motion.p
          className="hero-eyebrow-text hero-eyebrow-text--glass"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          ДЛЯ ВСЕГО, ЧТО ТЫ ЛЮБИШЬ
        </motion.p>

        <h1 className="display-headline display-headline--glass">
          <span className="headline-mask">
            <motion.span
              className="headline-line"
              initial={{ y: '108%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.65, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              Один Вольт.
            </motion.span>
          </span>
          <span className="headline-mask">
            <motion.span
              className="headline-line"
              initial={{ y: '108%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.65, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            >
              Все твои устройства.
            </motion.span>
          </span>
        </h1>

        <motion.div
          className="hero-description hero-description--glass"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>Одна подписка для телефона, ноутбука и планшета.</p>
          <p>Проверь соединение — и выбирай свой ритм.</p>
        </motion.div>
      </div>

      {/* Bento Grid: Glass Metric (5 devices) + Speedtest Dashboard */}
      <div className="glass-bento-row">
        <motion.div
          className="glass-metric-wrap"
          initial={{ opacity: 0, y: 26, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.65, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <TiltGlassSurface
            className="glass-metric-card"
            maxTilt={5}
            glareOpacity={0.38}
          >
            <div className="glass-metric-top">
              <p className="glass-metric-eyebrow">ОДНОЙ ПОДПИСКИ ХВАТИТ</p>
              <motion.p
                key={shownDevices}
                className="glass-metric-number"
                initial={{ scale: 0.88, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 460, damping: 22 }}
              >
                {shownDevices}
              </motion.p>
              <div className="glass-metric-caption">
                <p>устройств</p>
                <p>в твоём ритме</p>
              </div>
            </div>

            {/* Motion / Liquid Blue Glass Wave */}
            <div className="liquid-wave-stage">
              <motion.div
                aria-hidden="true"
                className="liquid-wave-aura"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        x: [-8, 8, -8],
                        y: [0, -5, 0],
                      }
                }
                transition={{
                  duration: 5.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="liquid-wave-asset-holder"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: [0, -4, 0],
                      }
                }
                transition={{
                  duration: 4.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <img
                  src={FIGMA_ASSETS.liquidBlueGlass}
                  alt=""
                  width={236}
                  height={145}
                  className="liquid-wave-img"
                />
              </motion.div>
            </div>
          </TiltGlassSurface>
        </motion.div>

        <motion.div
          className="glass-dashboard-wrap"
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.68, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <SpeedtestCard variant="dashboard" />
        </motion.div>
      </div>
    </div>
  );
};
