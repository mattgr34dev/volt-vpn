import React from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { FIGMA_ASSETS } from '../assetsMap';
import { SpeedtestCard } from './SpeedtestCard';

export const HeroElectric: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springCfg = { stiffness: 120, damping: 22, mass: 0.8 };
  const smoothX = useSpring(mouseX, springCfg);
  const smoothY = useSpring(mouseY, springCfg);

  // Parallax runs inside the masked container so outer edges never shift or show seams
  const shieldX = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);
  const shieldY = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);

  const badgeX = useTransform(smoothX, [-0.5, 0.5], [12, -12]);
  const badgeY = useTransform(smoothY, [-0.5, 0.5], [9, -9]);

  const speedX = useTransform(smoothX, [-0.5, 0.5], [18, -18]);
  const speedY = useTransform(smoothY, [-0.5, 0.5], [12, -12]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || e.pointerType === 'touch') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(nx);
    mouseY.set(ny);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <div
      className="hero-electric"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {/* Editorial Offer Copy */}
      <div className="editorial-offer">
        <motion.div
          className="hero-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="status-dot-wrap">
            <span className="status-dot-ping" aria-hidden="true" />
            <img
              src={FIGMA_ASSETS.statusDotLime}
              alt=""
              width={6}
              height={6}
              className="status-dot-img"
            />
          </span>
          <span className="hero-eyebrow-text hero-eyebrow-text--electric">
            VPN В ТВОЁМ РИТМЕ
          </span>
        </motion.div>

        <h1 className="display-headline display-headline--electric">
          <span className="headline-mask">
            <motion.span
              className="headline-line headline-line--white"
              initial={{ y: '108%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.68, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              Включи интернет.
            </motion.span>
          </span>
          <span className="headline-mask">
            <motion.span
              className="headline-line headline-line--lime"
              initial={{ y: '108%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{ duration: 0.68, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              На полную.
            </motion.span>
          </span>
        </h1>

        <motion.div
          className="hero-description hero-description--electric"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.58, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
        >
          <p>Любимые сервисы, работа и общение.</p>
          <p>Пять устройств. Один Вольт. Ноль лишних настроек.</p>
        </motion.div>
      </div>

      {/* Interactive 3D Shield + Floating Status + Promo Speedometer Stage */}
      <div className="electric-stage">
        {/* Motion 01 / Объёмная сцена (Adaptive across all aspect ratios & screen sizes) */}
        <div className="shield-scene-positioner">
          <motion.div
            className="shield-scene-frame"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.85, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="shield-artwork-parallax"
              style={{
                x: prefersReducedMotion ? 0 : shieldX,
                y: prefersReducedMotion ? 0 : shieldY,
              }}
            >
              <motion.div
                className="shield-artwork-float"
                animate={
                  prefersReducedMotion
                    ? undefined
                    : {
                        y: [0, -10, 0],
                        scale: [1.02, 1.038, 1.02],
                      }
                }
                transition={{
                  duration: 6.4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <img
                  src={FIGMA_ASSETS.shieldArtwork}
                  alt=""
                  width={1536}
                  height={1024}
                  className="shield-artwork-img"
                />
              </motion.div>
            </motion.div>

            {/* Fluid Edge Fades from Figma */}
            <div className="shield-fade shield-fade--top" aria-hidden="true">
              <img src={FIGMA_ASSETS.fadeTop} alt="" className="shield-fade-img" />
            </div>
            <div className="shield-fade shield-fade--right" aria-hidden="true">
              <img src={FIGMA_ASSETS.fadeRight} alt="" className="shield-fade-img" />
            </div>
            <div className="shield-fade shield-fade--bottom" aria-hidden="true">
              <img src={FIGMA_ASSETS.fadeBottom} alt="" className="shield-fade-img" />
            </div>
          </motion.div>
        </div>

        {/* Floating Status Pill (-4deg) */}
        <motion.div
          className="floating-status-anchor"
          style={{
            x: prefersReducedMotion ? 0 : badgeX,
            y: prefersReducedMotion ? 0 : badgeY,
          }}
          initial={{ opacity: 0, y: 24, rotate: -8 }}
          animate={{ opacity: 1, y: 0, rotate: -4 }}
          transition={{
            duration: 0.72,
            delay: 0.32,
            type: 'spring',
            stiffness: 240,
            damping: 22,
          }}
        >
          <motion.div
            className="floating-status-pill"
            animate={
              prefersReducedMotion
                ? undefined
                : {
                    y: [0, -7, 0],
                  }
            }
            transition={{
              duration: 4.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.4,
            }}
            whileHover={{ scale: 1.04, rotate: 2 }}
          >
            <span className="floating-status-icon">
              <span className="floating-status-ring" aria-hidden="true" />
              <img
                src={FIGMA_ASSETS.checkIcon}
                alt=""
                width={20}
                height={20}
              />
            </span>
            <div className="floating-status-copy">
              <p className="floating-status-title">5 устройств. Один Вольт.</p>
              <p className="floating-status-sub">Телефон, планшет, ноутбук</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Promo Speedtest Card (+3deg tilt on desktop, straightens subtly on hover) */}
        <motion.div
          className="promo-speedtest-anchor"
          style={{
            x: prefersReducedMotion ? 0 : speedX,
            y: prefersReducedMotion ? 0 : speedY,
          }}
          initial={{ opacity: 0, y: 32, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.72, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="promo-speedtest-rotator">
            <SpeedtestCard variant="promo" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};
