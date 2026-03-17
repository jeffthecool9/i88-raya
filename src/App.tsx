import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import {
  ChevronDown,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Moon,
} from 'lucide-react';

// --- Constants ---
const EVENT_END_DATE = new Date('2026-03-25T23:59:59');
const DEPOSIT_URL = 'https://www.palacehub8.com/hGn04apx';
declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
  }
}

const getCookie = (name: string) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
};

const handleRegisterClick = async () => {
  const eventId = `lead_${Date.now()}`;
  const targetUrl = "https://www.palacehub8.com/jv4Ajnn8";

  try {
    // Browser event
    if (window.fbq) {
      window.fbq("track", "Lead", {}, { eventID: eventId });
    }

    // Server-side CAPI event
    await fetch("http://localhost:3001/api/meta/lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId,
        eventSourceUrl: window.location.href,
        fbp: getCookie("_fbp"),
        fbc: getCookie("_fbc"),
        // testEventCode: "TEST12345", // use only when testing in Meta Test Events
      }),
    });
  } catch (error) {
    console.error("Meta tracking error:", error);
  }

  // Redirect user after tracking
  window.location.href = targetUrl;
};

const DAILY_REWARDS = [
  { day: 1, date: '19 Mar', bonus: '10% Bonus', tokens: '50 Tokens', spins: '', highlight: true, rayaSpecial: false },
  { day: 2, date: '20 Mar', bonus: '10% Bonus', tokens: '50 Tokens', spins: '', highlight: true, rayaSpecial: false },
  { day: 3, date: '21 Mar', bonus: '20% Bonus', tokens: '50 Tokens', spins: '', highlight: true, rayaSpecial: true },
  { day: 4, date: '22 Mar', bonus: '20% Bonus', tokens: '50 Tokens', spins: '', highlight: true, rayaSpecial: true },
  { day: 5, date: '23 Mar', bonus: '10% Bonus', tokens: '50 Tokens', spins: '', highlight: true, rayaSpecial: false },
  { day: 6, date: '24 Mar', bonus: '10% Bonus', tokens: '50 Tokens', spins: '', highlight: true, rayaSpecial: false },
  { day: 7, date: '25 Mar', bonus: 'Get up to RM588', tokens: '', spins: '10% Bonus & 50 Tokens', highlight: true, rayaSpecial: false },
];

// --- Components ---
const Section = ({
  children,
  id,
  className = '',
}: {
  children: React.ReactNode;
  id: string;
  className?: string;
}) => (
  <section
    id={id}
    data-section={id}
    className={`relative py-10 md:py-16 px-5 md:px-8 overflow-hidden ${className}`}
  >
    <div className="max-w-5xl mx-auto">{children}</div>
  </section>
);

const Sparkle = ({
  delay = 0,
  x = '50%',
  y = '50%',
  size = 2,
}: {
  delay?: number;
  x?: string;
  y?: string;
  size?: number;
}) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{
      scale: [0, 1, 0],
      opacity: [0, 0.7, 0],
      rotate: [0, 180],
    }}
    transition={{
      duration: 3 + Math.random() * 2,
      repeat: Infinity,
      delay,
      ease: 'easeInOut',
    }}
    style={{ left: x, top: y, width: size, height: size, willChange: 'transform, opacity' }}
    className="absolute pointer-events-none z-0 bg-raya-gold rounded-full blur-[1px]"
  />
);

const Lantern = ({
  delay = 0,
  x = '50%',
  size = 40,
}: {
  delay?: number;
  x?: string;
  size?: number;
}) => (
  <motion.div
    initial={{ y: '110vh', opacity: 0 }}
    animate={{
      y: '-20vh',
      opacity: [0, 0.28, 0.28, 0],
      x: ['0%', '3%', '-3%', '0%'],
    }}
    transition={{
      duration: 44 + Math.random() * 18,
      repeat: Infinity,
      delay,
      ease: 'linear',
    }}
    style={{ left: x, willChange: 'transform, opacity' }}
    className="absolute pointer-events-none z-0"
  >
    <motion.div
      animate={{
        opacity: [0.25, 0.45, 0.25],
        scale: [1, 1.03, 1],
      }}
      transition={{
        duration: 6 + Math.random() * 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{ width: size, height: size * 1.4, willChange: 'transform, opacity' }}
      className="bg-gradient-to-b from-raya-gold/20 to-raya-gold/5 rounded-t-full rounded-b-xl relative"
    >
      <div className="absolute inset-0 bg-raya-gold/10 blur-md rounded-full -z-10" />
      <div className="absolute inset-0 bg-white/5 rounded-t-full rounded-b-xl blur-[2px]" />
    </motion.div>
  </motion.div>
);

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = EVENT_END_DATE.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-1.5 sm:gap-3 md:gap-4 justify-center">
      {[
        { label: 'Days', value: timeLeft.days },
        { label: 'Hours', value: timeLeft.hours },
        { label: 'Mins', value: timeLeft.minutes },
        { label: 'Secs', value: timeLeft.seconds },
      ].map((item) => (
        <div key={item.label} className="flex flex-col items-center">
          <div className="glass-panel w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center text-lg sm:text-xl md:text-2xl font-bold text-raya-gold border-white/10 bg-white/8 backdrop-blur-xl">
            {item.value.toString().padStart(2, '0')}
          </div>
          <span className="text-[8px] sm:text-[10px] uppercase tracking-widest mt-2 text-white/45">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const PaymentRiver = () => {
  const logos = ['/maybank.jpg', '/fpx.jpg', '/duitnow.png', '/cimb.png', '/publicbank.png', '/bitcoin.png', '/tether.png'];
  const loop = [...logos, ...logos];

  return (
    <div className="relative overflow-hidden py-6">
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#1F6A18] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#1F6A18] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex items-center gap-6 md:gap-10 w-max"
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          duration: 20,
          ease: 'linear',
          repeat: Infinity,
        }}
      >
        {loop.map((logo, i) => (
          <div
            key={i}
            className="flex items-center justify-center w-28 h-16 md:w-36 md:h-20 rounded-xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.18)] border border-white/60 hover:scale-105 transition"
          >
            <img src={logo} alt="payment" className="max-h-10 md:max-h-12 w-auto object-contain" />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();

  const yFloralTop = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yFloralBottom = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const yHanging = useTransform(scrollYProgress, [0, 1], [0, -18]);
  const yKetupat2 = useTransform(scrollYProgress, [0, 1], [0, -35]);
  const yLanterns = useTransform(scrollYProgress, [0, 1], [0, -45]);

  return (
    <div className="min-h-screen relative overflow-x-hidden bg-[#0a200a]">
      {/* Background & Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 50% 10%, rgba(140, 210, 70, 0.30) 0%, rgba(82,132,42,0.18) 22%, transparent 52%),
              radial-gradient(circle at 20% 25%, rgba(120, 200, 60, 0.16) 0%, transparent 32%),
              radial-gradient(circle at 80% 20%, rgba(90, 180, 70, 0.14) 0%, transparent 28%),
              linear-gradient(180deg, #6FAF34 0%, #52842A 26%, #1F6A18 62%, #003F09 100%)
            `,
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.08) 62%, rgba(0,0,0,0.18) 100%)',
          }}
        />

        <div className="absolute inset-0 bg-black/10" />

        <motion.img
          src="/KETUPAT.png"
          alt=""
          style={{ y: yHanging, willChange: 'transform' }}
          className="absolute top-0 right-0 w-56 md:w-[420px] z-20 origin-top opacity-[0.55]"
          initial={{ y: -220, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 0.5,
            rotate: [0, 0.5, -0.5, 0],
          }}
          transition={{
            y: { duration: 2.2, type: 'spring', bounce: 0.2 },
            rotate: { duration: 14, repeat: Infinity, ease: 'easeInOut' },
            opacity: { duration: 1.4 },
          }}
          referrerPolicy="no-referrer"
        />

        <img
          src="/KETUPAT.png"
          alt="Ketupat"
          className="absolute top-[15%] left-[5%] w-20 md:w-28 z-10 opacity-90 brightness-110 drop-shadow-[0_0_18px_rgba(255,255,255,0.2)]"
          referrerPolicy="no-referrer"
        />

        <motion.img
          src="/rayaweek.png"
          alt=""
          style={{ y: yKetupat2, willChange: 'transform' }}
          className="absolute bottom-[20%] right-[10%] w-16 md:w-24 z-10 opacity-[0.16] hidden md:block blur-[1px]"
          animate={{
            y: [0, 10, 0],
            rotate: [0, -2, 2, 0],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          referrerPolicy="no-referrer"
        />

        <motion.img
          src="/KETUPAT.png"
          alt=""
          className="absolute bottom-[6%] left-1/2 -translate-x-1/2 w-28 md:w-40 z-10 opacity-[0.14] blur-[1px] pointer-events-none"
          animate={{
            y: [0, -8, 0],
            rotate: [0, 1.5, -1.5, 0],
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          referrerPolicy="no-referrer"
        />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Sparkle x="10%" y="20%" delay={0.5} size={2} />
          <Sparkle x="85%" y="15%" delay={1.2} size={2} />
          <Sparkle x="40%" y="40%" delay={2.5} size={3} />
          <Sparkle x="70%" y="60%" delay={0.8} size={2} />
          <Sparkle x="25%" y="80%" delay={3.1} size={2} />
          <Sparkle x="90%" y="90%" delay={1.5} size={2} />
          <Sparkle x="5%" y="50%" delay={2.2} size={2} />

          <motion.div style={{ y: yLanterns, willChange: 'transform' }} className="absolute inset-0">
            <Lantern delay={0} x="15%" size={24} />
            <Lantern delay={5} x="80%" size={34} />
            <Lantern delay={2} x="35%" size={22} />
            <Lantern delay={8} x="65%" size={28} />
          </motion.div>
        </div>
      </div>

      {/* 1. HERO & OVERVIEW */}
      <section
        data-section="hero"
        className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 pt-16 pb-20 md:pb-28"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="relative mb-8 md:mb-12 flex flex-col items-center overflow-visible">
            <motion.img
              src="/i882.png"
              alt="i88 Logo"
              className="w-[180px] sm:w-[220px] md:w-[260px] lg:w-[300px] mb-6 md:mb-8 drop-shadow-[0_0_30px_rgba(255,255,255,0.25)]"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: 'easeOut',
              }}
              referrerPolicy="no-referrer"
            />

            <div className="relative w-full flex justify-center overflow-visible">
              <motion.img
                src="/rayaweek.png"
                alt=""
                aria-hidden="true"
                className="absolute z-0 w-full max-w-[280px] sm:max-w-[350px] md:max-w-[550px] h-auto pointer-events-none select-none opacity-0"
                style={{
                  filter:
                    'brightness(1.35) saturate(1.35) drop-shadow(0 0 10px rgba(110,255,140,0.55)) drop-shadow(0 0 22px rgba(90,255,120,0.45)) drop-shadow(0 0 42px rgba(80,255,120,0.35)) blur(1.5px)',
                }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.42, 0.72, 0.5, 0.42],
                  scale: [1.01, 1.025, 1.015, 1.01],
                  x: [0, 1.5, -1, 0],
                  y: [0, -1.5, 1, 0],
                }}
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                referrerPolicy="no-referrer"
              />

              <motion.img
                src="/rayaweek.png"
                alt=""
                aria-hidden="true"
                className="absolute z-0 w-full max-w-[280px] sm:max-w-[350px] md:max-w-[550px] h-auto pointer-events-none select-none opacity-0"
                style={{
                  filter:
                    'brightness(1.5) saturate(1.4) drop-shadow(0 0 14px rgba(170,255,190,0.45)) drop-shadow(0 0 30px rgba(80,255,120,0.32)) blur(3px)',
                }}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0.2, 0.4, 0.24, 0.2],
                  scale: [1.03, 1.05, 1.035, 1.03],
                  x: [0, -2, 1, 0],
                  y: [0, 1, -2, 0],
                }}
                transition={{
                  duration: 5.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.6,
                }}
                referrerPolicy="no-referrer"
              />

              <motion.img
                src="/rayaweek.png"
                alt=""
                aria-hidden="true"
                className="absolute z-0 w-full max-w-[280px] sm:max-w-[350px] md:max-w-[550px] h-auto pointer-events-none select-none"
                style={{
                  filter:
                    'brightness(1.6) saturate(1.2) drop-shadow(0 0 8px rgba(220,255,220,0.35)) blur(0.8px)',
                }}
                animate={{
                  opacity: [0.12, 0.24, 0.14, 0.12],
                }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                referrerPolicy="no-referrer"
              />

              <motion.img
                src="/rayaweek.png"
                alt="Raya Perfect Week"
                className="relative z-10 w-full max-w-[280px] sm:max-w-[350px] md:max-w-[550px] h-auto"
                style={{ willChange: 'transform, opacity, filter' }}
                initial={{ scale: 0.9, opacity: 0, filter: 'blur(8px)' }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  filter:
                    'drop-shadow(0 0 8px rgba(212,175,55,0.18)) drop-shadow(0 0 18px rgba(80,255,120,0.10))',
                }}
                transition={{
                  duration: 1,
                  delay: 0.4,
                  type: 'spring',
                  stiffness: 100,
                }}
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="glass-panel z-20 p-6 sm:p-8 md:p-12 border border-white/10 bg-[rgba(15,50,15,0.72)] backdrop-blur-[22px] max-w-3xl mx-auto rounded-[2rem] md:rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/12 to-black/22" />
            <div className="absolute inset-0 bg-gradient-to-br from-raya-gold/6 to-transparent opacity-70" />
            <div className="absolute inset-0 rounded-[2rem] md:rounded-[2.5rem] ring-1 ring-white/8" />

            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="mb-4 flex items-center gap-2 text-raya-gold font-bold text-xs uppercase tracking-[0.3em]"
              >
                <Moon className="w-3 h-3 fill-raya-gold" /> Limited Time Event <Moon className="w-3 h-3 fill-raya-gold" />
              </motion.div>

              <h1 className="text-2xl md:text-4xl font-black text-white mb-4 leading-tight tracking-tight">
                Deposit 7 Days. Unlock <br className="hidden sm:block" />
                <span className="gold-gradient-text italic relative inline-block">
                  Up to RM588
                  <motion.div
                    className="absolute -inset-2 bg-raya-gold/8 blur-xl -z-10 rounded-full"
                    animate={{ opacity: [0.15, 0.3, 0.15], scale: [1, 1.08, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </span>
              </h1>

              <p className="text-sm md:text-base text-white/80 mb-8 max-w-lg mx-auto leading-relaxed">
                Login & Deposit daily for{' '}
                <span className="text-white font-bold underline decoration-raya-gold underline-offset-4">
                  7 consecutive days
                </span>{' '}
                to unlock the ultimate <span className="text-raya-gold font-black">Raya Perfect Week</span>.
              </p>

              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

              <div className="flex flex-col items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-raya-gold/70 font-black">
                    Event Ends In
                  </span>
                  <CountdownTimer />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/18"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* Payment Method River */}
      <Section id="payment-river" className="pt-0 md:pt-2 pb-6 md:pb-10">
        <div className="text-center mb-6">
          <span
            className="
              inline-flex items-center
              rounded-full
              border border-white/25
              bg-white/10
              backdrop-blur-md
              px-6 py-2
              text-[11px] md:text-[13px]
              font-black
              uppercase
              tracking-[0.35em]
              text-white/85
            "
          >
            SUPPORTED PAYMENT METHODS
          </span>
        </div>

        <PaymentRiver />
      </Section>

      {/* 2. REWARDS CALENDAR */}
      <Section id="rewards" className="relative z-10 bg-gradient-to-b from-transparent to-raya-emerald/10">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-black mb-3 gold-gradient-text uppercase tracking-tight">
            Your Reward Journey
          </h2>
          <p className="text-white/70 text-base font-medium">
            Complete the streak to unlock maximum rewards
          </p>
        </div>

        <div className="relative py-8 md:py-12 px-2 md:px-4">
          <div className="relative">
            <div className="hidden md:block absolute top-[52px] left-[5%] right-[5%] h-0.5 bg-gradient-to-r from-white/5 via-raya-gold/20 to-white/5 z-0" />

            <div className="grid grid-cols-2 sm:grid-cols-4 md:flex md:justify-between items-start relative z-10 gap-x-4 gap-y-8 md:gap-y-0">
              {DAILY_REWARDS.map((reward, idx) => (
                <motion.div
                  key={reward.day}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center group md:flex-1"
                >
                  {/* Day badge */}
                  <div className="mb-4 md:mb-5">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1.5 md:px-4 md:py-2 text-[11px] md:text-[13px] font-black uppercase tracking-[0.22em] backdrop-blur-md transition-all duration-300 group-hover:scale-105 ${
                        reward.rayaSpecial
                          ? 'border border-yellow-200/60 bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 text-[#4a3400] shadow-[0_0_20px_rgba(250,204,21,0.35)]'
                          : 'border border-raya-gold/25 bg-[rgba(212,175,55,0.08)] text-raya-gold shadow-[0_0_18px_rgba(212,175,55,0.08)] group-hover:border-raya-gold/40 group-hover:bg-[rgba(212,175,55,0.12)]'
                      }`}
                    >
                      Day {reward.day}
                    </span>
                  </div>

                  {/* Icon area */}
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                    {reward.rayaSpecial && (
                      <div className="absolute inset-[-16px] rounded-full bg-[radial-gradient(circle,rgba(250,204,21,0.30),rgba(250,204,21,0.08),transparent_68%)] blur-[16px] -z-10" />
                    )}

                    <motion.img
                      src="/KETUPAT-2.png"
                      alt="Ketupat"
                      animate={reward.highlight ? { scale: [1, 1.05, 1] } : {}}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                      className={`w-full h-full object-contain brightness-110 ${
                        reward.rayaSpecial
                          ? 'drop-shadow-[0_0_26px_rgba(250,204,21,0.85)] saturate-[1.15]'
                          : 'drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]'
                      }`}
                      referrerPolicy="no-referrer"
                    />

                    {reward.highlight && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-lg z-10"
                      >
                        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-emerald-500 fill-emerald-500/20" />
                      </motion.div>
                    )}

                    {reward.highlight && !reward.rayaSpecial && (
                      <>
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.2, 0.45, 0.2],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                          className="absolute inset-0 rounded-full bg-raya-gold/35 -z-10 blur-[35px]"
                        />
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                          className="absolute inset-[-8px] rounded-full border border-dashed border-raya-gold/25 -z-10"
                        />
                      </>
                    )}

                    {reward.highlight && reward.rayaSpecial && (
                      <>
                        <motion.div
                          animate={{
                            scale: [1, 1.28, 1],
                            opacity: [0.28, 0.58, 0.28],
                          }}
                          transition={{
                            duration: 2.6,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                          className="absolute inset-0 rounded-full bg-yellow-300/40 -z-10 blur-[40px]"
                        />
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 6.5, repeat: Infinity, ease: 'linear' }}
                          className="absolute inset-[-10px] rounded-full border border-dashed border-yellow-200/45 -z-10"
                        />
                      </>
                    )}
                  </div>

                  {/* Text area */}
                  <div className="mt-5 md:mt-7 text-center space-y-1">
                    <span
                      className={`block text-xs md:text-sm font-bold tracking-wide ${
                        reward.rayaSpecial ? 'text-yellow-200' : 'text-raya-gold'
                      }`}
                    >
                      {reward.date}
                    </span>

                    {reward.rayaSpecial && (
                      <div className="flex justify-center">
                        <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] bg-gradient-to-r from-yellow-300 to-amber-400 text-[#4a3400] shadow-[0_0_12px_rgba(250,204,21,0.25)]">
                          Raya Day
                        </span>
                      </div>
                    )}

                    <div className="flex flex-col items-center leading-tight">
                      <span
                        className={`text-sm md:text-lg font-black uppercase ${
                          reward.rayaSpecial
                            ? 'bg-gradient-to-b from-[#fff7cc] via-[#ffe066] to-[#facc15] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(250,204,21,0.18)]'
                            : reward.highlight
                            ? 'text-white'
                            : 'text-white/80'
                        }`}
                      >
                        {reward.bonus}
                      </span>

                      {reward.tokens && (
                        <span
                          className={`text-sm md:text-lg font-black uppercase ${
                            reward.rayaSpecial
                              ? 'bg-gradient-to-b from-[#fff7cc] via-[#ffe066] to-[#facc15] bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(250,204,21,0.18)]'
                              : 'text-white'
                          }`}
                        >
                          {reward.tokens}
                        </span>
                      )}

                      {reward.spins && (
                        <span
                          className={`text-[10px] md:text-xs font-semibold uppercase tracking-wider ${
                            reward.rayaSpecial ? 'text-yellow-100/80' : 'text-white/60'
                          }`}
                        >
                          {reward.spins}
                        </span>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* 3. QUICK RULES ONLY */}
      <Section id="tiers-rules" className="block md:hidden bg-raya-emerald/5">
        <div className="max-w-3xl mx-auto">
          <div className="glass-panel p-6 md:p-8 bg-white/[0.05] border-raya-emerald/20 backdrop-blur-xl rounded-[2rem]">
            <h3 className="text-xl md:text-2xl font-bold mb-6 gold-gradient-text uppercase text-center">
              Quick Rules
            </h3>

            <ul className="space-y-4 text-sm md:text-[15px] text-white/85">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-raya-gold shrink-0 mt-1" />
                <span>Deposit daily for 7 days to unlock Grand Credit</span>
              </li>

              <li className="flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-raya-gold shrink-0 mt-1" />
                <span>8x turnover applies to all bonuses</span>
              </li>

              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-raya-gold shrink-0 mt-1" />
                <span>Free Credit credited on 26 March</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* 4. HOW TO PARTICIPATE */}
      <Section id="tutorial" className="bg-gradient-to-b from-raya-emerald/5 to-transparent">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-black gold-gradient-text uppercase tracking-tight mb-2">
            How to Participate
          </h2>
          <p className="text-white/60 text-sm">Follow these simple steps to claim your rewards</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto relative">
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-px bg-gradient-to-r from-raya-gold/0 via-raya-gold/30 to-raya-gold/0 z-0" />

          {[
            {
              step: '1',
              title: 'Register an Account',
              desc: 'Sign up today and join the Raya Perfect Week celebration. It only takes a minute to get started.',
              glow: 'bg-blue-500/10',
            },
            {
              step: '2',
              title: 'Deposit for 7 Days',
              desc: 'Maintain a daily deposit streak for 7 consecutive days to unlock the exclusive Grand Credit bonus.',
              glow: 'bg-raya-gold/10',
            },
          ].map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 0.8,
                delay: idx * 0.2,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              whileHover={{ y: -6 }}
              className="glass-panel p-8 border-white/10 bg-white/[0.05] relative group hover:border-raya-gold/25 transition-all duration-500 overflow-hidden backdrop-blur-xl"
            >
              <div
                className={`absolute -right-10 -bottom-10 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${item.glow}`}
              />

              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
                whileHover={{ x: '200%' }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />

              <div className="flex flex-col items-center text-center gap-6 relative z-10">
                <motion.div
                  whileHover={{ scale: 1.08, rotate: 4 }}
                  className="mx-auto w-14 h-14 rounded-2xl bg-raya-gold/10 border border-raya-gold/20 flex items-center justify-center group-hover:bg-raya-gold text-raya-gold group-hover:text-raya-blue transition-all duration-300"
                >
                  <span className="text-2xl font-black">{item.step}</span>
                </motion.div>

                <div>
                  <motion.h3
                    animate={{
                      y: [0, -3, 0],
                      scale: [1, 1.015, 1],
                    }}
                    transition={{
                      duration: 2.4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: idx * 0.25,
                    }}
                    className="text-xl md:text-2xl font-black text-white uppercase tracking-tight mb-3 group-hover:text-raya-gold transition-colors duration-300"
                  >
                    {item.title}
                  </motion.h3>
                  <p className="text-sm text-white/60 leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-raya-gold/0 to-transparent group-hover:via-raya-gold/35 transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Raya Bonus Info Box */}
<section className="relative py-16 md:py-20">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="relative overflow-hidden rounded-[32px] border border-raya-gold/20 bg-gradient-to-br from-[#1f5f1f]/90 via-[#145214]/90 to-[#0d3b0d]/95 shadow-[0_0_60px_rgba(0,0,0,0.35)] backdrop-blur-xl p-6 md:p-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.12),transparent_45%)]" />

      <div className="relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
          Raya <span className="text-raya-gold">Bonus</span>
        </h2>

        <p className="mt-4 text-base md:text-lg text-white/75 max-w-2xl mx-auto">
          Daily deposit rewards for the Raya Perfect Week event
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-left">
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/45 font-black">
              Minimum Daily Deposit
            </p>
            <p className="mt-2 text-xl md:text-2xl font-black text-white">
              RM100
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.05] px-5 py-4 text-left">
            <p className="text-[11px] uppercase tracking-[0.22em] text-white/45 font-black">
              Reward Range
            </p>
            <p className="mt-2 text-xl md:text-2xl font-black text-raya-gold">
              10–20% + 50 Tokens
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="inline-flex items-center gap-3 rounded-2xl border border-raya-gold/20 bg-white/[0.04] px-5 py-3 text-sm md:text-base text-white/75 backdrop-blur-md">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-raya-gold shadow-[0_0_10px_rgba(212,175,55,0.45)]" />
            Event registration opens soon
          </div>
        </div>

        <p className="mt-5 text-sm md:text-base text-white/55">
          Terms & conditions apply
        </p>
      </div>
    </div>
  </div>
</section>

      {/* Sticky CTA */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6, ease: 'easeOut' }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[60] px-4 w-full max-w-[420px] pointer-events-none"
      >
        <div className="pointer-events-auto mx-auto">
          <div className="rounded-2xl border border-raya-gold/25 bg-[rgba(8,30,10,0.72)] backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.35)] px-3 py-3 md:px-4 md:py-3">
            <div className="flex items-center gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-raya-gold/80 font-black">
                  Raya Perfect Week
                </p>
                <p className="text-sm md:text-base font-black text-white leading-tight truncate">
                  Start Soon
                </p>
              </div>

             <motion.button
  onClick={handleRegisterClick}
  data-event="cta_sticky"
  whileHover={{ scale: 1.04 }}
  whileTap={{ scale: 0.96 }}
  className="shrink-0 inline-flex items-center gap-2 rounded-xl bg-raya-gold text-raya-blue font-black text-sm md:text-base px-4 py-3 shadow-lg"
>
  Register
  <ChevronRight className="w-4 h-4" />
</motion.button>
              
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
