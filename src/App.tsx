import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { 
  Calendar, 
  ChevronDown, 
  ChevronRight, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  Moon,
  Zap,
  UserPlus,
  Wallet,
  Trophy,
  Star,
  Crown
} from 'lucide-react';

// --- Constants ---
const EVENT_END_DATE = new Date('2026-03-25T23:59:59'); 
const DEPOSIT_URL = 'https://example.com/deposit';

const DAILY_REWARDS = [
  { day: 1, date: '19 Mar', bonus: '10% Bonus', spins: '50 Tokens', highlight: false },
  { day: 2, date: '20 Mar', bonus: '10% Bonus', spins: '50 Tokens', highlight: false },
  { day: 3, date: '21 Mar', bonus: '20% Bonus', spins: '50  Tokens', highlight: false },
  { day: 4, date: '22 Mar', bonus: '20% Bonus', spins: '50  Tokens', highlight: false },
  { day: 5, date: '23 Mar', bonus: '10% Bonus', spins: '50  Tokens', highlight: true },
  { day: 6, date: '24 Mar', bonus: '10% Bonus', spins: '50  Tokens', highlight: true },
  { day: 7, date: '25 Mar', bonus: '10% Bonus', spins: '50  Tokens', highlight: true, isCTA: true },
];

const CREDIT_TIERS = [
  { deposit: '$700', credit: '$88' },
  { deposit: '$2,000', credit: '$238' },
  { deposit: '$5,000', credit: '$588' },
];

const BONUS_CAPS = [
  { type: '10% Deposit Bonus', cap: '$588' },
  { type: '20% Deposit Bonus', cap: '$888' },
];

const STREAK_BONUSES = [
  {
    deposit: 'RM700',
    reward: 'RM88 Extra',
    label: 'Total Deposit Reward',
    icon: Wallet,
    color: 'text-orange-400',
    progress: 33,
  },
  {
    deposit: 'RM2,000',
    reward: 'RM238 Extra',
    label: 'Total Deposit Reward',
    icon: Star,
    color: 'text-slate-300',
    progress: 66,
  },
  {
    deposit: 'RM5,000',
    reward: 'RM588 Extra',
    label: 'Total Deposit Reward',
    icon: Crown,
    color: 'text-raya-gold',
    progress: 100,
  },
];
// --- Components ---

const Section = ({ children, id, className = "" }: { children: React.ReactNode, id: string, className?: string }) => (
  <section 
    id={id} 
    data-section={id}
    className={`relative py-10 md:py-16 px-5 md:px-8 overflow-hidden ${className}`}
  >
    <div className="max-w-5xl mx-auto">
      {children}
    </div>
  </section>
);

const Sparkle = ({ delay = 0, x = "50%", y = "50%", size = 2 }: { delay?: number, x?: string, y?: string, size?: number }) => (
  <motion.div
    initial={{ scale: 0, opacity: 0 }}
    animate={{ 
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
      rotate: [0, 180]
    }}
    transition={{ 
      duration: 3 + Math.random() * 2, 
      repeat: Infinity, 
      delay,
      ease: "easeInOut"
    }}
    style={{ left: x, top: y, width: size, height: size, willChange: "transform, opacity" }}
    className="absolute pointer-events-none z-0 bg-raya-gold rounded-full blur-[1px]"
  />
);

const Lantern = ({ delay = 0, x = "50%", size = 40 }: { delay?: number, x?: string, size?: number }) => (
  <motion.div
    initial={{ y: "110vh", opacity: 0 }}
    animate={{ 
      y: "-20vh", 
      opacity: [0, 0.5, 0.5, 0],
      x: ["0%", "5%", "-5%", "0%"]
    }}
    transition={{ 
      duration: 40 + Math.random() * 20, 
      repeat: Infinity, 
      delay,
      ease: "linear"
    }}
    style={{ left: x, willChange: "transform, opacity" }}
    className="absolute pointer-events-none z-0"
  >
    <motion.div 
      animate={{ 
        opacity: [0.4, 0.7, 0.4],
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 6 + Math.random() * 4,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      style={{ width: size, height: size * 1.4, willChange: "transform, opacity" }}
      className="bg-gradient-to-b from-raya-gold/40 to-raya-gold/10 rounded-t-full rounded-b-xl relative"
    >
      {/* Static Glow instead of animated filter */}
      <div className="absolute inset-0 bg-raya-gold/20 blur-md rounded-full -z-10" />
      {/* Inner Glow */}
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
          <div className="glass-panel w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 flex items-center justify-center text-lg sm:text-xl md:text-2xl font-bold text-raya-gold border-raya-gold/20">
            {item.value.toString().padStart(2, '0')}
          </div>
          <span className="text-[8px] sm:text-[10px] uppercase tracking-widest mt-2 text-white/50">{item.label}</span>
        </div>
      ))}
    </div>
  );
};

const AccordionItem = ({ title, children }: { title: string, children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex justify-between items-center text-left hover:text-raya-gold transition-colors"
      >
        <span className="font-medium">{title}</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-sm text-white/60 leading-relaxed">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  
  // Parallax transforms for different layers
  const yFloralTop = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const yFloralBottom = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yHanging = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const yKetupat1 = useTransform(scrollYProgress, [0, 1], [0, -250]);
  const yKetupat2 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const yLanterns = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Background & Decorative Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(82,132,42,0.2)_0%,transparent_70%)]" />
        
        {/* Decorative Floral - Top Right */}
        <motion.img 
          src="/KETUPAT.png" 
          alt=""
          style={{ y: yFloralTop, willChange: "transform, opacity" }}
          className="absolute -top-20 -right-20 w-[300px] md:w-[600px] opacity-20 md:opacity-30 blur-[2px] md:blur-none"
          initial={{ opacity: 0, x: 100, rotate: 15 }}
          animate={{ 
            opacity: 0.3, 
            x: 0, 
            rotate: [0, 1, -1, 0],
            scale: [1, 1.02, 1],
          }}
          transition={{ 
            opacity: { duration: 3, ease: "easeOut" },
            x: { duration: 3, ease: "easeOut" },
            rotate: { duration: 30, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 25, repeat: Infinity, ease: "easeInOut" },
          }}
          referrerPolicy="no-referrer"
        />

        {/* Decorative Floral - Bottom Left */}
        <motion.img 
          src="/KETUPAT.png" 
          alt=""
          style={{ y: yFloralBottom, willChange: "transform, opacity" }}
          className="absolute -bottom-20 -left-20 w-[300px] md:w-[600px] opacity-20 md:opacity-30 blur-[2px] md:blur-none"
          initial={{ opacity: 0, x: -100, rotate: -15 }}
          animate={{ 
            opacity: 0.3, 
            x: 0, 
            rotate: [0, -1, 1, 0],
            scale: [1, 1.03, 1],
          }}
          transition={{ 
            opacity: { duration: 3, ease: "easeOut", delay: 0.4 },
            x: { duration: 3, ease: "easeOut", delay: 0.4 },
            rotate: { duration: 35, repeat: Infinity, ease: "easeInOut" },
            scale: { duration: 30, repeat: Infinity, ease: "easeInOut" },
          }}
          referrerPolicy="no-referrer"
        />

        {/* Hanging Decorations - Top Right */}
        <motion.img 
          src="/KETUPAT.png" 
          alt=""
          style={{ y: yHanging, willChange: "transform" }}
          className="absolute top-0 right-0 w-64 md:w-[500px] z-20 origin-top"
          initial={{ y: -300, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            rotate: [0, 1, -1, 0]
          }}
          transition={{ 
            y: { duration: 2.5, type: "spring", bounce: 0.4 },
            rotate: { duration: 12, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 1.5 }
          }}
          referrerPolicy="no-referrer"
        />

        {/* Floating Ketupats for Depth */}
        <motion.img 
          src="/KETUPAT.png" 
          alt=""
          style={{ y: yKetupat1, willChange: "transform" }}
          className="absolute top-[15%] left-[5%] w-20 md:w-32 z-10 opacity-60"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          referrerPolicy="no-referrer"
        />

        <motion.img 
          src="/rayaweek.png" 
          alt=""
          style={{ y: yKetupat2, willChange: "transform" }}
          className="absolute bottom-[20%] right-[10%] w-16 md:w-24 z-10 opacity-40 hidden md:block"
          animate={{ 
            y: [0, 30, 0],
            rotate: [0, -8, 8, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          referrerPolicy="no-referrer"
        />

        {/* Background Atmosphere */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Sparkles */}
          <Sparkle x="10%" y="20%" delay={0.5} size={3} />
          <Sparkle x="85%" y="15%" delay={1.2} size={2} />
          <Sparkle x="40%" y="40%" delay={2.5} size={4} />
          <Sparkle x="70%" y="60%" delay={0.8} size={2} />
          <Sparkle x="25%" y="80%" delay={3.1} size={3} />
          <Sparkle x="90%" y="90%" delay={1.5} size={2} />
          <Sparkle x="5%" y="50%" delay={2.2} size={3} />
          
          <motion.div 
            style={{ y: yLanterns, willChange: "transform" }} 
            className="absolute inset-0"
          >
            <Lantern delay={0} x="15%" size={30} />
            <Lantern delay={5} x="80%" size={45} />
            <Lantern delay={2} x="35%" size={25} />
            <Lantern delay={8} x="65%" size={35} />
            <Lantern delay={12} x="50%" size={40} />
          </motion.div>
        </div>
      </div>

      {/* 1. HERO & OVERVIEW */}
      <section 
        data-section="hero"
        className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 pt-16 pb-8"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative z-10 flex flex-col items-center"
        >
          <div className="relative mb-8 md:mb-12">
          <motion.img 
            src="/rayaweek.png" 
            alt="Raya Perfect Week"
            className="w-full max-w-[280px] sm:max-w-[350px] md:max-w-[550px] h-auto drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]"
            style={{ willChange: "transform, opacity, filter" }}
            initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ 
              duration: 1, 
              delay: 0.5,
              type: "spring",
              stiffness: 100
            }}
            referrerPolicy="no-referrer"
          />
            
            {/* Subtle glow behind logo */}
            <div className="absolute inset-0 bg-raya-gold/10 blur-[60px] -z-10 rounded-full scale-150" />
          </div>
          
          <div className="glass-panel p-6 sm:p-8 md:p-12 border-white/10 bg-white/5 backdrop-blur-2xl max-w-3xl mx-auto rounded-[2rem] md:rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
            {/* Inner glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-raya-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            
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
                Celebrate Raya with <br className="hidden sm:block" />
                <span className="gold-gradient-text italic relative inline-block">
                  Exclusive Rewards
                  <motion.div 
                    className="absolute -inset-2 bg-raya-gold/10 blur-xl -z-10 rounded-full"
                    animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.15, 1] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </span>
              </h1>

              <p className="text-sm md:text-base text-white/70 mb-8 max-w-lg mx-auto leading-relaxed">
                Login & Deposit daily for <span className="text-white font-bold underline decoration-raya-gold underline-offset-4">7 consecutive days</span> to unlock the ultimate <span className="text-raya-gold font-black">Perfect Week Grand Credit</span>.
              </p>
              
              <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8" />

              <div className="flex flex-col items-center gap-6">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-raya-gold/60 font-black">Event Ends In</span>
                  <CountdownTimer />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* 2. REWARDS CALENDAR */}
      <Section id="rewards" className="bg-gradient-to-b from-transparent to-raya-emerald/10">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 gold-gradient-text uppercase tracking-tight">Your Reward Journey</h2>
          <p className="text-white/60 text-sm">Complete the streak to unlock maximum rewards.</p>
        </div>

        {/* Journey Line - 7 Days */}
        <div className="relative py-8 md:py-12 px-2 md:px-4">
          <div className="relative">
            {/* The Connecting Line - Desktop Only */}
            <div className="hidden md:block absolute top-[52px] left-[5%] right-[5%] h-0.5 bg-gradient-to-r from-white/5 via-raya-gold/30 to-white/5 z-0" />
            
            <div className="grid grid-cols-2 sm:grid-cols-4 md:flex md:justify-between items-start relative z-10 gap-x-4 gap-y-8 md:gap-y-0">
              {DAILY_REWARDS.map((reward, idx) => (
                <motion.div
                  key={reward.day}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: idx * 0.1 }}
                  className={`flex flex-col items-center group md:flex-1`}
                >
                  {/* Day Label */}
                  <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-4 group-hover:text-raya-gold transition-colors duration-300">
                    Day {reward.day}
                  </span>
                  
                  {/* The Ketupat Image & Tick */}
                  <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 flex items-center justify-center transition-all duration-500 group-hover:scale-110">
                    {/* Layer 1: Ketupat Image */}
                    <motion.img 
                      src="/KETUPAT-2.png" 
                      alt="Ketupat" 
                      animate={reward.highlight ? { 
                        scale: [1, 1.05, 1],
                      } : {}}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className={`w-full h-full object-contain drop-shadow-lg ${reward.highlight ? 'brightness-110' : 'opacity-60 grayscale-[0.3]'}`}
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Layer 2: Small Green Tick */}
                    {reward.highlight && (
                      <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-lg z-10"
                      >
                        <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-emerald-500 fill-emerald-500/20" />
                      </motion.div>
                    )}

                    {/* Enhanced Glow & Animation for highlighted days */}
                    {reward.highlight && (
                      <>
                        <motion.div 
                          animate={{ 
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3],
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                          }}
                          className="absolute inset-0 rounded-full bg-raya-gold/30 -z-10 blur-2xl" 
                        />
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                          className="absolute inset-[-8px] rounded-full border border-dashed border-raya-gold/40 -z-10"
                        />
                        {/* Mini Sparkles */}
                        <div className="absolute inset-0 pointer-events-none">
                          <Sparkle x="20%" y="20%" delay={0.2} size={2} />
                          <Sparkle x="80%" y="30%" delay={0.5} size={3} />
                          <Sparkle x="50%" y="80%" delay={0.8} size={2} />
                        </div>
                        <motion.div 
                          animate={{ 
                            scale: [1, 1.1, 1],
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity, 
                            ease: "easeInOut" 
                          }}
                          className="absolute inset-0 bg-gradient-to-t from-raya-gold/20 to-transparent rounded-full -z-10"
                        />
                      </>
                    )}
                  </div>
                  
                  {/* Reward Details Below */}
                  <div className="mt-4 md:mt-6 text-center">
                    <span className="block text-[9px] md:text-[11px] font-bold text-raya-gold mb-1 md:mb-1.5 opacity-80">{reward.date}</span>
                    <div className="flex flex-col items-center gap-0.5 md:gap-1">
                      <span className={`text-[10px] md:text-[12px] font-black uppercase tracking-tight leading-tight ${reward.highlight ? 'text-white' : 'text-white/80'}`}>
                        {reward.bonus}
                      </span>
                      <span className="text-[8px] md:text-[10px] text-white/40 font-medium italic">
                        {reward.spins}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Streak Bonuses Section */}
        <div className="mt-12 md:mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-raya-gold/10 border border-raya-gold/20 text-raya-gold text-[10px] font-black uppercase tracking-widest mb-4"
            >
              <Zap className="w-3 h-3 fill-raya-gold" /> Streak Milestones <Zap className="w-3 h-3 fill-raya-gold" />
            </motion.div>
            <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">Unlock Extra <span className="gold-gradient-text italic">Streak Rewards</span></h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {STREAK_BONUSES.map((streak, idx) => (
              <motion.div
                key={streak.days}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1 }}
                className="glass-panel p-6 border-white/5 bg-white/5 backdrop-blur-xl relative overflow-hidden group hover:border-raya-gold/30 transition-all duration-500"
              >
                {/* Background Glow */}
                <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full blur-3xl opacity-10 group-hover:opacity-20 transition-opacity duration-500 ${streak.color.replace('text-', 'bg-')}`} />
                
                <div className="relative z-10 flex items-center gap-5">
                  <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${streak.color} group-hover:scale-110 transition-transform duration-500`}>
                    <streak.icon className="w-7 h-7" />
                  </div>
                  
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-1">
                      {streak.days} Day Streak
                    </span>
                    <h4 className="text-lg font-black text-white leading-tight mb-1 group-hover:text-raya-gold transition-colors duration-300">
                      {streak.reward}
                    </h4>
                    <span className="text-[10px] text-white/60 font-medium italic">
                      {streak.label}
                    </span>
                  </div>
                </div>

                {/* Progress Indicator (Visual Only) */}
                <div className="mt-6 h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(streak.days / 7) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className={`h-full bg-gradient-to-r from-transparent ${streak.color.replace('text-', 'to-')}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
          
          <p className="text-center mt-8 text-[10px] text-white/40 uppercase tracking-widest font-medium">
            * Streak rewards are automatically credited upon reaching the milestone
          </p>
        </div>
      </Section>

      {/* 3. TIERS & RULES */}
      <Section id="tiers-rules" className="bg-raya-emerald/5">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass-panel p-5 border-raya-gold/20">
            <h3 className="text-lg font-bold mb-4 gold-gradient-text uppercase">Free Credit Tiers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-2">
              {CREDIT_TIERS.map((tier) => (
                <div key={tier.deposit} className="p-3 sm:p-2 rounded-lg bg-white/5 border border-white/10 text-center flex sm:flex-col items-center sm:justify-center justify-between gap-2">
                  <div className="flex flex-col items-start sm:items-center">
                    <span className="text-[8px] text-white/40 uppercase font-bold block mb-0.5">Deposit</span>
                    <div className="text-xs font-black">{tier.deposit}</div>
                  </div>
                  <div className="hidden sm:block h-px w-full bg-white/10 my-1" />
                  <div className="flex flex-col items-end sm:items-center">
                    <span className="text-[8px] text-white/40 uppercase font-bold block mb-0.5 sm:hidden">Credit</span>
                    <div className="text-sm font-black text-raya-gold">{tier.credit}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel p-5 bg-raya-emerald/20 border-raya-emerald/30">
            <h3 className="text-lg font-bold mb-4 gold-gradient-text uppercase">Quick Rules</h3>
            <ul className="space-y-2 text-[11px] text-white/80">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-raya-gold shrink-0 mt-0.5" />
                <span>Deposit daily for 7 days to unlock Grand Credit.</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-raya-gold shrink-0 mt-0.5" />
                <span>8x turnover applies to all bonuses.</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-raya-gold shrink-0 mt-0.5" />
                <span>Free Credit credited on 26 March.</span>
              </li>
            </ul>
          </div>
        </div>
      </Section>

      {/* 4. HOW TO PARTICIPATE */}
      <Section id="tutorial" className="bg-gradient-to-b from-raya-emerald/5 to-transparent">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-black gold-gradient-text uppercase tracking-tight mb-2">How to Participate</h2>
          <p className="text-white/60 text-sm">Follow these simple steps to claim your rewards.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto relative">
          {/* Connecting Line - Desktop Only */}
          <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-px bg-gradient-to-r from-raya-gold/0 via-raya-gold/40 to-raya-gold/0 z-0" />
          
          {[
            {
              step: "1",
              title: "Register an Account",
              desc: "Sign up today and join the Raya Perfect Week celebration. It only takes a minute to get started.",
              glow: "bg-blue-500/10"
            },
            {
              step: "2",
              title: "Deposit for 7 Days",
              desc: "Maintain a daily deposit streak for 7 consecutive days to unlock the exclusive Grand Credit bonus.",
              glow: "bg-raya-gold/10"
            }
          ].map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.8, 
                delay: idx * 0.2,
                ease: [0.21, 0.47, 0.32, 0.98]
              }}
              whileHover={{ y: -8 }}
              className="glass-panel p-8 border-white/10 bg-white/5 relative group hover:border-raya-gold/40 transition-all duration-500 overflow-hidden"
            >
              {/* Animated Background Glow */}
              <div className={`absolute -right-10 -bottom-10 w-40 h-40 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${item.glow}`} />
              
              {/* Shine Effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
                whileHover={{ x: '200%' }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />

              <div className="flex flex-col gap-6 relative z-10">
                <motion.div 
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-14 h-14 rounded-2xl bg-raya-gold/10 border border-raya-gold/20 flex items-center justify-center group-hover:bg-raya-gold text-raya-gold group-hover:text-raya-blue transition-all duration-300"
                >
                  <span className="text-2xl font-black">{item.step}</span>
                </motion.div>
                
                <div>
                  <h3 className="text-xl font-black text-white uppercase tracking-tight mb-3 group-hover:text-raya-gold transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                    {item.desc}
                  </p>
                </div>
              </div>

              {/* Bottom Accent Line */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-raya-gold/0 to-transparent group-hover:via-raya-gold/40 transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </Section>

      {/* 5. FINAL CTA */}
      <Section id="final" className="text-center pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          className="glass-panel p-8 md:p-12 border-raya-gold/20 bg-gradient-to-b from-raya-gold/5 to-transparent relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-raya-gold to-transparent" />
          
          <h2 className="text-2xl md:text-4xl font-black mb-6 gold-gradient-text uppercase tracking-tight">
            Ready for Your <br /> Perfect Week?
          </h2>
          
          <div className="flex flex-col items-center gap-6">
            <motion.a
              href={DEPOSIT_URL}
              data-event="cta_final"
              animate={{ 
                boxShadow: [
                  "0 0 0 0px rgba(212, 175, 55, 0)",
                  "0 0 0 15px rgba(212, 175, 55, 0.3)",
                  "0 0 0 30px rgba(212, 175, 55, 0)"
                ]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="group relative bg-raya-gold text-raya-blue text-lg font-black px-8 py-4 rounded-xl overflow-hidden shadow-2xl hover:scale-105 active:scale-95 transition-transform glow-shadow"
            >
              <span className="relative z-10 flex items-center gap-2">
                JOIN NOW <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <motion.div 
                className="absolute inset-0 bg-white/20"
                animate={{ x: ['-100%', '100%'] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </motion.a>
            
            
          </div>
        </motion.div>
        
        <div className="mt-8 text-[9px] text-white/20 uppercase tracking-[0.4em]">
          &copy; 2026 Raya Perfect Week. All Rights Reserved.
        </div>
      </Section>
    </div>
  );
}
