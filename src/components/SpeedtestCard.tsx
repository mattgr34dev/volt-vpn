import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { FIGMA_ASSETS } from '../assetsMap';
import { TiltGlassSurface } from './TiltGlassSurface';

interface SpeedtestCardProps {
  variant: 'promo' | 'dashboard';
  className?: string;
}

const TARGET_SPEED = 169.88;
const TARGET_PING = 24;

function formatRussianDecimal(value: number): string {
  return value.toFixed(2).replace('.', ',');
}

export const SpeedtestCard: React.FC<SpeedtestCardProps> = ({
  variant,
  className = '',
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [status, setStatus] = useState<'measuring' | 'result'>('result');
  const [displaySpeed, setDisplaySpeed] = useState<number>(0);
  const [displayPing, setDisplayPing] = useState<number | null>(null);
  const [arcProgress, setArcProgress] = useState<number>(0.84);
  const [pulseKey, setPulseKey] = useState<number>(0);

  const rafRef = useRef<number | null>(null);
  const dialWrapRef = useRef<HTMLDivElement>(null);
  const [dialScale, setDialScale] = useState<number>(1);

  const baseDialWidth = variant === 'promo' ? 300 : 340;
  const baseDialHeight = variant === 'promo' ? 151.875 : 172.125;

  // Responsive proportional scaling for narrow mobile viewports without overriding SVG intrinsic dimensions
  useEffect(() => {
    const el = dialWrapRef.current;
    if (!el) return;
    const updateScale = () => {
      const available = el.clientWidth;
      if (available > 0 && available < baseDialWidth) {
        setDialScale(available / baseDialWidth);
      } else {
        setDialScale(1);
      }
    };
    updateScale();
    const ro = new ResizeObserver(updateScale);
    ro.observe(el);
    return () => ro.disconnect();
  }, [baseDialWidth]);

  const startAnimationLoop = useCallback((durationMs: number) => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
    }

    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / durationMs);

      let currentSpeed: number;
      if (t < 0.42) {
        const p = t / 0.42;
        const eased = 1 - Math.pow(1 - p, 2.4);
        const flutter = Math.sin(p * Math.PI * 5) * 2.1;
        currentSpeed = Math.max(0, 74.02 * eased + flutter * (1 - p * 0.3));
      } else if (t < 0.88) {
        const p = (t - 0.42) / 0.46;
        const eased = 1 - Math.pow(1 - p, 3);
        const flutter = Math.sin(p * Math.PI * 6) * 3.4 * (1 - p);
        currentSpeed = 74.02 + (173.4 - 74.02) * eased + flutter;
      } else {
        const p = (t - 0.88) / 0.12;
        const eased = 1 - Math.pow(1 - p, 2);
        currentSpeed = 173.4 + (TARGET_SPEED - 173.4) * eased;
      }

      setDisplaySpeed(t >= 1 ? TARGET_SPEED : currentSpeed);
      setArcProgress(Math.min(1, currentSpeed / 200));

      if (t > 0.55) {
        const pingProgress = (t - 0.55) / 0.45;
        const currentPing = Math.round(36 - 12 * Math.min(1, pingProgress));
        setDisplayPing(t >= 1 ? TARGET_PING : currentPing);
      }

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setStatus('result');
        setDisplaySpeed(TARGET_SPEED);
        setDisplayPing(TARGET_PING);
        setArcProgress(0.84);
        setPulseKey((k) => k + 1);
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, []);

  // Orchestrated arrival sweep on mount (uses rAF only — zero synchronous setState in effect)
  useEffect(() => {
    if (prefersReducedMotion) return;
    startAnimationLoop(1350);
    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [prefersReducedMotion, startAnimationLoop]);

  const handleRerun = () => {
    if (status === 'measuring') return;
    if (prefersReducedMotion) {
      setStatus('result');
      setDisplaySpeed(TARGET_SPEED);
      setDisplayPing(TARGET_PING);
      return;
    }
    setStatus('measuring');
    setDisplayPing(null);
    startAnimationLoop(2050);
  };

  const effectiveSpeed = prefersReducedMotion ? TARGET_SPEED : displaySpeed;
  const effectivePing = prefersReducedMotion ? TARGET_PING : displayPing;

  // In Promo variant, Figma provides both Measuring (74,02) and Result (169,88) dial SVGs
  const showPromoMeasuringSvg =
    variant === 'promo' && status === 'measuring' && effectiveSpeed < 118;

  const dialSrc =
    variant === 'promo'
      ? showPromoMeasuringSvg
        ? FIGMA_ASSETS.dialPromoMeasuring
        : FIGMA_ASSETS.dialPromoResult
      : FIGMA_ASSETS.dialDashboardResult;

  return (
    <TiltGlassSurface
      className={`speedtest-tilt-wrap speedtest-tilt-wrap--${variant} ${className}`}
      maxTilt={variant === 'promo' ? 5.5 : 4}
      baseRotate={0}
      glareOpacity={0.34}
    >
      <div className={`speedtest-card speedtest-card--${variant}`}>
        {/* Ambient completion pulse ring */}
        <AnimatePresence>
          {pulseKey > 0 && (
            <motion.span
              key={pulseKey}
              aria-hidden="true"
              className="speedtest-burst-ring"
              initial={{ opacity: 0.55, scale: 0.86 }}
              animate={{ opacity: 0, scale: 1.08 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.75, ease: 'easeOut' }}
            />
          )}
        </AnimatePresence>

        {/* Title Row */}
        <div className="speedtest-title-row">
          <p className="speedtest-title">Скорость соединения</p>
          <span className="speedtest-demo-badge">
            {status === 'measuring' && (
              <span className="speedtest-live-dot" aria-hidden="true" />
            )}
            ДЕМО
          </span>
        </div>

        {/* Dial / Ticks and Needle */}
        <div
          ref={dialWrapRef}
          className="speedtest-dial-outer"
          style={{
            height: `${baseDialHeight * dialScale}px`,
          }}
        >
          <div
            className="speedtest-dial-scaler"
            style={{
              width: `${baseDialWidth}px`,
              height: `${baseDialHeight}px`,
              transform: `translateX(-50%) scale(${dialScale})`,
              transformOrigin: 'top center',
            }}
          >
            <img
              src={dialSrc}
              alt=""
              width={baseDialWidth}
              height={baseDialHeight}
              className="speedtest-dial-img"
            />

            {/* Luminous dynamic arc overlay during active speed measurement */}
            <AnimatePresence>
              {status === 'measuring' && (
                <motion.svg
                  aria-hidden="true"
                  className="speedtest-energy-overlay"
                  width={baseDialWidth}
                  height={baseDialHeight}
                  viewBox={`0 0 ${baseDialWidth} ${baseDialHeight}`}
                  fill="none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <defs>
                    <linearGradient
                      id={`volt-arc-${variant}`}
                      x1="0%"
                      y1="100%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#087DFA" stopOpacity="0.15" />
                      <stop offset="60%" stopColor="#087DFA" stopOpacity="0.85" />
                      <stop offset="100%" stopColor="#6754FF" stopOpacity="0.95" />
                    </linearGradient>
                  </defs>
                  <motion.path
                    d={
                      variant === 'promo'
                        ? 'M 38 144 A 112 112 0 0 1 262 144'
                        : 'M 43 163 A 127 127 0 0 1 297 163'
                    }
                    stroke={`url(#volt-arc-${variant})`}
                    strokeWidth="5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0.08 }}
                    animate={{
                      pathLength: Math.max(0.12, Math.min(0.92, arcProgress)),
                    }}
                    transition={{ duration: 0.12, ease: 'linear' }}
                    style={{
                      filter: 'drop-shadow(0 0 8px rgba(8, 125, 250, 0.45))',
                    }}
                  />
                </motion.svg>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Speed Value */}
        <div className="speedtest-value-row" aria-live="polite">
          <motion.p
            className="speedtest-number"
            animate={
              pulseKey > 0 && status === 'result'
                ? { scale: [1, 1.045, 1] }
                : { scale: 1 }
            }
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {formatRussianDecimal(effectiveSpeed)}
          </motion.p>
          <p className="speedtest-unit">Мбит/с</p>
        </div>

        {/* Test Metrics */}
        <div className="speedtest-metrics-row">
          <p className="speedtest-ping">
            {effectivePing !== null ? `Пинг  ${effectivePing} мс` : 'Пинг  —'}
          </p>
          <p className="speedtest-status-caption">
            {status === 'measuring'
              ? 'Проверяем соединение'
              : 'Демонстрационный замер'}
          </p>
        </div>

        {/* Action Button */}
        <motion.button
          type="button"
          className={`speedtest-btn speedtest-btn--${variant} ${
            status === 'measuring' ? 'is-measuring' : ''
          }`}
          onClick={handleRerun}
          whileHover={status === 'result' ? { scale: 1.025, y: -1 } : undefined}
          whileTap={status === 'result' ? { scale: 0.975 } : undefined}
          transition={{ type: 'spring', stiffness: 420, damping: 24 }}
        >
          {status === 'measuring' && (
            <motion.span
              aria-hidden="true"
              className="speedtest-btn-shimmer"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ repeat: Infinity, duration: 1.05, ease: 'linear' }}
            />
          )}
          <span className="speedtest-btn-label">
            {status === 'measuring' ? 'Измеряем…' : 'Измерить ещё раз'}
          </span>
        </motion.button>
      </div>
    </TiltGlassSurface>
  );
};
