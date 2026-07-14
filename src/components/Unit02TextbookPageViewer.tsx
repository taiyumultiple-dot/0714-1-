/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  CheckCircle, 
  ArrowLeft, 
  ArrowRight,
  Smile,
  BookOpen,
  Award,
  ThumbsUp,
  Menu,
  Check,
  Shield,
  HelpCircle,
  RefreshCw,
  Info,
  ChevronRight,
  Lightbulb,
  MessageSquare,
  Users,
  Eye,
  Target,
  X,
  ChevronDown,
  Activity,
  Compass,
  Heart,
  Wind,
  Layers,
  ArrowUpRight,
  UserCheck,
  AlertCircle,
  Flame,
  Volume2,
  ListTodo
} from 'lucide-react';

interface Unit02TextbookPageViewerProps {
  answers: Record<string, any>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  role: 'student' | 'teacher';
  isSubmitted: boolean;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

// Full chapters navigation matching Unit 02 textbook pages
export const CHAPTERS_NAV_UNIT_02 = [
  { page: 36, title: "行前閱讀：漫步奇幻的旅程", tag: "前導", emoji: "🚶", desc: "博鈞、曉萍、可華放學後的對話，探討人格尊嚴與自我的價值。" },
  { page: 37, title: "行前暖身：沙漠飲料心理測驗", tag: "前導", emoji: "🍹", desc: "小紅書熱門心理測驗，用一杯飲品秒測真實性格與自我探索反思。" },
  { page: 38, title: "第1章：一、人的特質 ─ 「人」是什麼？", tag: "第一章", emoji: "👤", desc: "探討「人」是什麼？從生理到社會變化，理解人的多樣性與選擇性。" },
  { page: 39, title: "第1章：對比擂台：活動 01 & 02", tag: "第一章", emoji: "⚔️", desc: "分組探討人的多元面向（心智圖），以及人類與改造人（Cyborg）的攻防對決。" },
  { page: 40, title: "第1章：多元學科對「人」的看法", tag: "第一章", emoji: "🔬", desc: "自然科學、腦神經科學、哲學、心理學、宗教五大領域對人的本質定義。" },
  { page: 41, title: "第1章：MIND 田捕手 ─ 被狼養大的孩子", tag: "第一章", emoji: "🐺", desc: "西班牙狼孩馬科斯·潘托哈的奇特故事，探討人性與野性的交織。" },
  { page: 42, title: "第2章：👤 關於人性 ─ 黑暗榮耀", tag: "第二章", emoji: "🎬", desc: "透過韓劇《黑暗榮耀》中極端的霸凌與溫暖同事的互助，探討人性善惡與人格。" },
  { page: 43, title: "第2章：理性 vs 感性 & 性善 vs 性惡", tag: "第二章", emoji: "⚖️", desc: "探討大腦理性與感性調和，孟子性善說與荀子性惡說的生活實踐。" },
  { page: 44, title: "第2章：寧靜修養：靈性的存在？", tag: "第二章", emoji: "🌸", desc: "從宗教、文化、心靈層面解讀靈性（馬斯洛自我超越），尋求內心平靜的方法。" },
  { page: 45, title: "第2章：LIFE 心動力 ─ 呼吸指引", tag: "第二章", emoji: "🌬️", desc: "呼吸調息實戰：製造彩虹、吹出氣球、煙火表演，體驗身心靈的平靜與覺察。" },
  { page: 46, title: "第2章：探索自我 ─ 三大哲學觀點", tag: "第二章", emoji: "🔮", desc: "存在主義、社會建構與心理動力，三部電影經典帶你叩問「我是誰」。" },
  { page: 47, title: "第2章：LIFE 心動力 ─ 探索深度自我", tag: "第二章", emoji: "📝", desc: "十道深度自我檢測題，誠實面對討厭、自豪、挫折與人生的終極追求。" },
  { page: 48, title: "第2章：MIND 田捕手 ─ 老鷹與小雞", tag: "第二章", emoji: "🦅", desc: "鷹在雞窩長大的寓言故事，反思自我價值認同與你生命中的「亨利爺爺」。" },
  { page: 49, title: "第2章：MIND 田捕手 ─ 我是誰", tag: "第二章", emoji: "⛪", desc: "Joe神父在天堂入口的故事，反思社會職稱、頭銜與真正靈魂價值的本質。" },
  { page: 50, title: "第2章：求學與認同 ─ 阿翰的生命故事", tag: "第二章", emoji: "📹", desc: "知名YouTuber阿翰（曾文翰）從陰柔內向到幽默爆紅的自我尋求與破繭之路。" },
  { page: 51, title: "第2章：LIFE 心動力 ─ 我的過去、現在、未來", tag: "第二章", emoji: "⏳", desc: "手繪自我形象，梳理人生重大經驗的情緒衝擊，給未來的自己一封信。" },
  { page: 52, title: "第3章：二、生命的網絡 ─ 人的主體尊嚴", tag: "第三章", emoji: "⛓️", desc: "何謂「主體」與「客體」？探討不當戀愛與互為工具化的哲學思辨。" },
  { page: 53, title: "第3章：MIND 田捕手 ─ 玩具總動員", tag: "第三章", emoji: "🤠", desc: "翠絲與巴斯光年的主體性探討，以及生活中人際關係界線的6大實例剖析。" },
  { page: 54, title: "第3章：MIND 田捕手 ─ 電話另一端的「人」", tag: "第三章", emoji: "📞", desc: "同理心案例：客服電話那端活生生的人，與科技時代下AI對人性的挑戰。" },
  { page: 55, title: "第3章：科技人我 ─ 電影思辨對決", tag: "第三章", emoji: "🍿", desc: "《原本以為只是手機掉了》 vs. 《攻殼機動隊》深度思辨科技與主體性。" }
];

export default function Unit02TextbookPageViewer({
  answers,
  setAnswers,
  role,
  isSubmitted,
  currentPage: controlledPage,
  onPageChange
}: Unit02TextbookPageViewerProps) {
  const [localPage, setLocalPage] = useState<number>(36);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const currentPage = controlledPage !== undefined ? controlledPage : localPage;

  const setCurrentPage = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    } else {
      setLocalPage(page);
    }
    
    // Auto-update read pages tracker for Unit 02
    if (role === 'student' && !isSubmitted) {
      const readPages = answers.textbookReadPages || [36];
      if (!readPages.includes(page)) {
        updateAnswer('textbookReadPages', [...readPages, page]);
      }
    }
  };

  const pages = CHAPTERS_NAV_UNIT_02.map(ch => ch.page);

  const handleNext = () => {
    const currentIndex = pages.indexOf(currentPage);
    if (currentIndex === pages.length - 1) {
      if (onPageChange) {
        onPageChange(999);
      }
    } else {
      setCurrentPage(pages[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    const currentIndex = pages.indexOf(currentPage);
    if (currentIndex > 0) {
      setCurrentPage(pages[currentIndex - 1]);
    }
  };

  // Helper to safely write answers
  const updateAnswer = (key: string, val: any) => {
    if (role === 'teacher' || isSubmitted) return;
    setAnswers(prev => ({
      ...prev,
      [key]: val
    }));
  };

  const readPagesList = answers.textbookReadPages || [36];
  const readPagesCount = readPagesList.filter(p => pages.includes(p)).length || 1;
  const readPagesTotal = pages.length;

  // --- Page 37: Desert Drink States ---
  const [selectedDrink, setSelectedDrink] = useState<string | null>(answers.p37SelectedDrink || null);
  const drinksData = [
    { id: 'A', name: '牛奶', icon: '🥛', desc: '溫和守護者。你像牛奶一樣給人純粹與安心感，重視家庭與親近的朋友，內心渴望安全感與被愛護。' },
    { id: 'B', name: '果汁', icon: '🍹', desc: '活力創意家。果汁象徵繽紛與熱情，你喜歡新鮮事物與人際互動，但在面對重大決定時，偶爾會有些衝動。' },
    { id: 'C', name: '咖啡', icon: '☕', desc: '理性思辨者。咖啡象徵沉穩與清醒，你擁有強大的邏輯思考能力，在人群中常扮演冷靜的觀察者與分析家。' },
    { id: 'D', name: '水', icon: '💧', desc: '純真自在派。水是生命之源，象徵純淨、包容與適應力。你不喜歡虛偽與做作，渴望過著真實、順其自然的生活。' },
    { id: 'E', name: '可樂', icon: '🥤', desc: '冒險享樂者。可樂充滿氣泡與激情，你渴望挑戰與自由，不喜歡受到拘束，對未來充滿了好奇與探索精神。' }
  ];

  // --- Page 39: Activity 1 & 2 States ---
  const [activeMindmapBranch, setActiveMindmapBranch] = useState<'has' | 'is' | 'can' | null>(null);
  const [cyborgAnswers, setCyborgAnswers] = useState<Record<string, string>>(answers.p39CyborgAnswers || {
    same1: '',
    diff1: '',
  });

  // --- Page 40: Multi-Disciplinary Views ---
  const [activeViewCard, setActiveViewCard] = useState<number | null>(null);
  const viewCards = [
    { id: 1, title: "01 自然科學", icon: "🔬", color: "from-amber-500 to-orange-600", bgLight: "bg-orange-50", text: "人體由三十兆以上的細胞組成，最小的單位是原子。" },
    { id: 2, title: "02 腦神經科學", icon: "🧠", color: "from-orange-500 to-rose-600", bgLight: "bg-rose-50", text: "人的認知是腦神經元與神經傳傳導物質互動之後產生的。" },
    { id: 3, title: "03 哲學", icon: "🏛️", color: "from-emerald-500 to-teal-600", bgLight: "bg-emerald-50", text: "亞里斯多德認為：只有人類會進行理性的思考。" },
    { id: 4, title: "04 心理學", icon: "👤", color: "from-blue-500 to-indigo-600", bgLight: "bg-blue-50", text: "• 佛洛伊德認為：人的心智作用包括意識、前意識和潛意識。\n• 馬斯洛認為：人有生理需求、安全、愛與歸屬、尊重、知識、美感及自我實現等七大需求之外，還有最高層次的靈性需求。" },
    { id: 5, title: "05 宗教", icon: "⛪", color: "from-purple-500 to-fuchsia-600", bgLight: "bg-purple-50", text: "• 《創世紀》中記載：人由物質的身體與非物質的靈魂組成。\n• 佛教認為：人具有思考、勇敢與道德修為的特質與能力，人可以透過一生的修行而成就就像佛菩薩一樣圓滿的心靈。" }
  ];

  // --- Page 43: Rational vs. Sensible / Good vs. Evil ---
  const [rationalRatio, setRationalRatio] = useState<number>(answers.p43RationalRatio || 50);
  const [umbrellaChoice, setUmbrellaChoice] = useState<'take' | 'leave' | null>(answers.p43UmbrellaChoice || null);

  // --- Page 44: Spiritual Checklist ---
  const [spiritualChecklist, setSpiritualChecklist] = useState<string[]>(answers.p44SpiritualChecklist || []);
  const spiritualOptions = [
    { id: 'meditation', title: '正念靜坐', desc: '關注當下呼吸，排除腦中紛擾。' },
    { id: 'yoga', title: '沙灘瑜珈 / 伸展', desc: '感受身體與大自然的動靜相連。' },
    { id: 'art', title: '藝術自由創作', desc: '用色彩與線條傾聽潛意識聲音。' },
    { id: 'journal', title: '靈性日記', desc: '記錄每日對生命的感謝與深刻覺察。' },
    { id: 'reading', title: '靈性讀書會', desc: '與同好共讀哲人智慧，洗滌心靈。' },
    { id: 'nature', title: '森林浴 / 親近大自然', desc: '感受山靈、水靈與樹木沉靜的治癒力。' }
  ];

  // --- Page 45: Live Breathing Coach States ---
  const [breathingMethod, setBreathingMethod] = useState<'rainbow' | 'balloon' | 'firework'>('rainbow');
  const [isBreathing, setIsBreathing] = useState<boolean>(false);
  const [breathCycle, setBreathCycle] = useState<'idle' | 'inhale' | 'hold' | 'exhale'>('idle');
  const [breathCounter, setBreathCounter] = useState<number>(0);
  const [breathCount, setBreathCount] = useState<number>(0);
  const [fireworkBurst, setFireworkBurst] = useState<boolean>(false);
  const breathingTimer = useRef<NodeJS.Timeout | null>(null);

  // --- Page 46 & 55 States ---
  const [activeTheoryCard, setActiveTheoryCard] = useState<'existentialist' | 'social' | 'psychodynamic' | null>(null);
  const [activeMovieTab, setActiveMovieTab] = useState<'movieA' | 'movieB'>('movieA');

  // --- New Interactive Textbook States for Pages 46-55 ---
  const [activeWorkbookTab, setActiveWorkbookTab] = useState<number>(1);
  const [activeEagleStep, setActiveEagleStep] = useState<number>(0);
  const [dialogStep, setDialogStep] = useState<number>(0);
  const [isHanPlaying, setIsHanPlaying] = useState<boolean>(false);
  const [hanProgress, setHanProgress] = useState<number>(0);
  const [isCallActive, setIsCallActive] = useState<boolean>(false);
  const [callTimer, setCallTimer] = useState<number>(0);
  const [isHoldVoicePlayed, setIsHoldVoicePlayed] = useState<boolean>(false);

  useEffect(() => {
    let interval: any;
    if (isCallActive) {
      interval = setInterval(() => {
        setCallTimer(prev => prev + 1);
      }, 1000);
    } else {
      setCallTimer(0);
    }
    return () => clearInterval(interval);
  }, [isCallActive]);

  useEffect(() => {
    let interval: any;
    if (isHanPlaying) {
      interval = setInterval(() => {
        setHanProgress(prev => {
          if (prev >= 100) {
            setIsHanPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isHanPlaying]);

  useEffect(() => {
    if (isBreathing) {
      let timer = 0;
      setBreathCycle('inhale');
      setBreathCounter(4);
      
      const interval = setInterval(() => {
        setBreathCounter(prev => {
          if (prev <= 1) {
            // Switch cycle
            if (timer === 0) {
              // inhale -> hold (or exhale)
              setBreathCycle('hold');
              timer = 1;
              return 2; // Hold for 2s
            } else if (timer === 1) {
              setBreathCycle('exhale');
              timer = 2;
              return 4; // Exhale for 4s
            } else {
              setBreathCycle('inhale');
              timer = 0;
              setBreathCount(c => {
                const updated = c + 1;
                if (breathingMethod === 'firework' && updated > 0) {
                  setFireworkBurst(true);
                  setTimeout(() => setFireworkBurst(false), 2500);
                }
                return updated;
              });
              return 4; // Inhale for 4s
            }
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setBreathCycle('idle');
      setBreathCounter(0);
    }
  }, [isBreathing, breathingMethod]);

  const toggleBreathing = () => {
    setIsBreathing(!isBreathing);
  };

  const handleSpiritualCheck = (id: string) => {
    if (role === 'teacher' || isSubmitted) return;
    const nextList = spiritualChecklist.includes(id)
      ? spiritualChecklist.filter(item => item !== id)
      : [...spiritualChecklist, id];
    setSpiritualChecklist(nextList);
    updateAnswer('p44SpiritualChecklist', nextList);
  };

  return (
    <div id="unit_02_textbook_root" className="grid grid-cols-1 lg:grid-cols-4 gap-6 bg-slate-50 rounded-2xl p-2 sm:p-4 border border-slate-200">
      
      {/* LEFT SIDEBAR: CHAPTERS INDEX */}
      <div 
        id="unit_02_sidebar" 
        className={`${
          isSidebarOpen ? 'block' : 'hidden'
        } lg:block lg:col-span-1 bg-white rounded-xl p-4 border border-slate-100 shadow-xs space-y-4 transition-all duration-300`}
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <span className="text-xs font-black text-slate-800 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-emerald-600" />
            導航：單元 02 課本
          </span>
          <span className="text-[10px] font-extrabold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
            共 {pages.length} 頁
          </span>
        </div>

        <div className="space-y-1.5 pr-1">
          {CHAPTERS_NAV_UNIT_02.map((ch, idx) => {
            const isRead = readPagesList.includes(ch.page);
            const isActive = currentPage === ch.page;
            return (
              <button
                key={ch.page}
                onClick={() => setCurrentPage(ch.page)}
                className={`w-full text-left p-2.5 rounded-xl transition-all border flex items-start gap-2.5 ${
                  isActive 
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm font-bold' 
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-100 hover:border-slate-200'
                }`}
              >
                <span className="text-base shrink-0 mt-0.5">{ch.emoji}</span>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full uppercase font-black shrink-0 ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-slate-100 text-slate-500'
                    }`}>
                      p.{String(ch.page).padStart(3, '0')}
                    </span>
                    {isRead && (
                      <Check className={`w-3 h-3 shrink-0 ${
                        isActive ? 'text-white' : 'text-emerald-600 font-bold'
                      }`} />
                    )}
                  </div>
                  <h5 className="text-[11px] font-extrabold truncate mt-1">{ch.title}</h5>
                  <p className={`text-[9px] line-clamp-1 mt-0.5 ${
                    isActive ? 'text-white/80' : 'text-slate-400'
                  }`}>
                    {ch.desc}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Read progress summary */}
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 space-y-1.5">
          <div className="flex justify-between items-center text-[10px] text-slate-500 font-extrabold">
            <span>本書閱讀覆蓋率</span>
            <span>{readPagesCount} / {readPagesTotal} 頁 ({Math.round((readPagesCount / readPagesTotal) * 100)}%)</span>
          </div>
          <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-600 h-full transition-all duration-300" 
              style={{ width: `${(readPagesCount / readPagesTotal) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* RIGHT WORKSPACE: DIGITAL NOTEBOOK PAGES */}
      <div id="unit_02_workspace" className="col-span-1 lg:col-span-3 bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4 sm:p-6 flex flex-col justify-between min-h-[620px] relative overflow-hidden">
        
        {/* MOBILE SIDEBAR TRIGGER AND HEADER */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <Menu className="w-4 h-4" />
            </button>
            <div>
              <span className="text-[10px] text-emerald-700 bg-emerald-50 font-black px-2 py-0.5 rounded-full inline-block uppercase tracking-wider">
                泰宇生命教育 ── 數位教材課本
              </span>
              <h2 className="text-sm font-extrabold text-slate-800 flex items-center gap-1.5 mt-0.5">
                單元 02：人學探索
                <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-slate-400">
              p.{String(currentPage).padStart(3, '0')}
            </span>
          </div>
        </div>

        {/* CORE DIGITAL TEXT CONTENT WITH TRANSITIONS */}
        <div className="flex-1 my-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-5"
            >
              
              {/* PAGE 36: 行前閱讀 - 漫步奇幻的旅程 */}
              {currentPage === 36 && (
                <div id="page_36" className="space-y-4">
                  <div className="flex items-center justify-between border-b border-orange-100 pb-2">
                    <span className="text-xs text-orange-700 font-extrabold flex items-center gap-1">
                      <Compass className="w-4 h-4 text-orange-500" />
                      漫步奇幻的旅程 ─ 行前閱讀
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">036 | CH2 / 人學探索</span>
                  </div>

                  <div className="bg-amber-50/40 p-4.5 rounded-2xl border border-amber-100 space-y-3.5">
                    <div className="flex items-center gap-2 text-xs font-black text-amber-800">
                      <Sparkles className="w-4 h-4" />
                      角色劇場 🎬：放學後的對話
                    </div>
                    
                    <div className="space-y-3 text-[12px] leading-relaxed text-slate-700">
                      <p className="italic text-slate-500 bg-white/70 px-3 py-1.5 rounded-xl border border-amber-100/40">
                        放學後，準備回家的同學們在班上聊天，博鈞播了一首歌給大家聽。
                      </p>

                      <div className="flex gap-2 items-start">
                        <span className="bg-amber-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md shrink-0">王博鈞 🏀</span>
                        <div className="bg-amber-50/80 p-2.5 rounded-r-xl rounded-bl-xl border border-amber-100 min-w-[200px]">
                          「OH~ 我說分手，應該是這樣唱的，我現在為你寫歌，祝福你血流成河......」<span className="italic text-slate-500">(跟著哼唱)</span>
                        </div>
                      </div>

                      <div className="flex gap-2 items-start justify-end">
                        <div className="bg-emerald-50/80 p-2.5 rounded-l-xl rounded-br-xl border border-emerald-100 min-w-[200px] text-right">
                          「博鈞，你不覺得這首歌『怪怪的』嗎？」
                        </div>
                        <span className="bg-emerald-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md shrink-0">張曉萍 👩🏻</span>
                      </div>

                      <div className="flex gap-2 items-start">
                        <span className="bg-amber-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md shrink-0">王博鈞 🏀</span>
                        <div className="bg-amber-50/80 p-2.5 rounded-r-xl rounded-bl-xl border border-amber-100 min-w-[150px]">
                          「哪裡怪啊？我覺得挺好聽的呀！」一臉疑惑。
                        </div>
                      </div>

                      <div className="flex gap-2 items-start justify-end">
                        <div className="bg-emerald-50/80 p-2.5 rounded-l-xl rounded-br-xl border border-emerald-100 min-w-[200px] text-right">
                          「歌詞裡寫『控制另一半變成娛樂』，又說『我無法控制自己』，這......是恐怖情人吧？」
                        </div>
                        <span className="bg-emerald-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md shrink-0">張曉萍 👩🏻</span>
                      </div>

                      <div className="flex gap-2 items-start">
                        <span className="bg-amber-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md shrink-0">王博鈞 🏀</span>
                        <div className="bg-amber-50/80 p-2.5 rounded-r-xl rounded-bl-xl border border-amber-100 min-w-[150px]">
                          「對耶！妳沒說我都沒發現。」博鈞很驚訝。
                        </div>
                      </div>

                      <div className="flex gap-2 items-start justify-end">
                        <div className="bg-emerald-50/80 p-2.5 rounded-l-xl rounded-br-xl border border-emerald-100 min-w-[200px] text-right">
                          「談個戀愛，控制對方又委屈自己，這樣太踐踏彼此的人格尊嚴了吧！」激動。
                        </div>
                        <span className="bg-emerald-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md shrink-0">張曉萍 👩🏻</span>
                      </div>

                      <div className="flex gap-2 items-start">
                        <span className="bg-amber-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md shrink-0">王博鈞 🏀</span>
                        <div className="bg-amber-50/80 p-2.5 rounded-r-xl rounded-bl-xl border border-amber-100 min-w-[150px]">
                          「什麼是人格尊嚴啊？」博鈞詢問其他人。
                        </div>
                      </div>

                      <p className="italic text-slate-500 bg-white/70 px-3 py-1.5 rounded-xl border border-amber-100/40">
                        可華插不上話，在一旁靜靜聽歌，但心裡想著：
                      </p>

                      <div className="flex gap-2 items-start">
                        <span className="bg-indigo-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md shrink-0">陳可華 👦🏻</span>
                        <div className="bg-indigo-50/80 p-2.5 rounded-r-xl rounded-bl-xl border border-indigo-100 min-w-[200px] text-indigo-950 font-bold">
                          「我覺得談到人格尊嚴，應該要先學習如何珍惜自己、尊重自己作為一個人的價值吧......。」
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2">
                    <h4 className="text-xs font-extrabold text-slate-800 flex items-center gap-1">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      導師思考點撥：
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      流行歌歌詞常反映當代的人際價值觀。尊重自我的獨特人格、捍衛自我的邊界，是我們在「人學探索」單元的核心第一步。
                    </p>
                  </div>
                </div>
              )}

              {/* PAGE 37: 行前暖身 - 沙漠飲料心理測驗 */}
              {currentPage === 37 && (
                <div id="page_37" className="space-y-4">
                  <div className="flex items-center justify-between border-b border-orange-100 pb-2">
                    <span className="text-xs text-orange-700 font-extrabold flex items-center gap-1">
                      <Compass className="w-4 h-4 text-orange-500" />
                      行前暖身：小紅書爆紅心理測驗
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">037</span>
                  </div>

                  <div className="bg-indigo-50/40 p-4.5 rounded-2xl border border-indigo-100 space-y-3">
                    <div className="space-y-1">
                      <span className="text-[10px] bg-indigo-100 text-indigo-800 px-2.5 py-0.5 rounded-full font-black uppercase">
                        一杯飲料秒測你的真實性格
                      </span>
                      <h3 className="text-sm font-extrabold text-slate-800 mt-1">
                        假如你今天行走在沙漠中，沒有帶水，走了一天一夜又渴又累，突然面前出現了5杯飲品，你只能選擇其中一杯，你會選擇哪杯呢？
                      </h3>
                    </div>

                    {/* Drink buttons grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-2">
                      {drinksData.map(d => {
                        const isChosen = selectedDrink === d.id;
                        return (
                          <button
                            key={d.id}
                            disabled={isSubmitted}
                            onClick={() => {
                              setSelectedDrink(d.id);
                              updateAnswer('p37SelectedDrink', d.id);
                            }}
                            className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center justify-center gap-1 ${
                              isChosen 
                                ? 'bg-indigo-600 text-white border-indigo-600 scale-105 shadow-md' 
                                : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                            }`}
                          >
                            <span className="text-3xl">{d.icon}</span>
                            <span className="text-xs font-black">{d.id}. {d.name}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Results container */}
                    <AnimatePresence mode="wait">
                      {selectedDrink && (
                        <motion.div
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="bg-white p-3.5 rounded-xl border border-indigo-100 text-xs text-indigo-950 mt-3 space-y-1"
                        >
                          <span className="font-extrabold text-indigo-700 flex items-center gap-1 text-[11px]">
                            <Sparkles className="w-3.5 h-3.5" />
                            測驗解析 (您的選擇：{drinksData.find(d => d.id === selectedDrink)?.name})
                          </span>
                          <p className="leading-relaxed font-medium">
                            {drinksData.find(d => d.id === selectedDrink)?.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-100 space-y-3">
                    <div className="text-xs font-bold text-slate-700">
                      💡 課本思考延伸：你覺得這個測驗準嗎？
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      像這樣的網路心理測驗，結果往往是模糊且相近的描述，較能符合多數人的狀態。
                      <strong> 自我探索的過程中，我們無法單就網路心理測驗就認定自己是怎樣的人</strong>，應從實際的生活經驗去感受自己是誰、為何我是人、我如何與他人互動等，來認識自己。
                    </p>

                    <div className="space-y-1.5 pt-2">
                      <label className="text-[11px] font-black text-slate-700 block">
                        📝 學生互動思考：如果解析的描述與你很相近，那你是由哪些經驗來驗證這些描述呢？覺得不準的話，你認為自己真正的特質是什麼？
                      </label>
                      <textarea
                        disabled={isSubmitted}
                        value={answers.p37Reflection || ''}
                        onChange={(e) => updateAnswer('p37Reflection', e.target.value)}
                        placeholder="例如：我覺得蠻準的，我選了咖啡，我在班上確實常常扮演冷靜分析事情的角色，之前分組報告時大家吵成一團，是我冷靜理出大綱..."
                        className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:outline-hidden focus:border-indigo-500 bg-white"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 38: 「人」是什麼？ */}
              {currentPage === 38 && (
                <div id="page_38" className="space-y-4">
                  <div className="flex items-center justify-between border-b border-blue-100 pb-2">
                    <span className="text-xs text-blue-700 font-extrabold flex items-center gap-1">
                      <Compass className="w-4 h-4 text-blue-500" />
                      第 1 章：「人」是什麼？
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">038 | CH2 / 人學探索</span>
                  </div>

                  <div className="space-y-3">
                    <p className="text-xs text-slate-600 leading-relaxed bg-blue-50/30 p-3.5 rounded-xl border border-blue-100/40">
                      有人說：<strong>「人是會走路的動物」</strong>，你同意這個定義嗎？人類與其他動物間有著獨特差異，動物不會像人們一樣上學、讀書、做各式各樣的工作，除了生物基因設定之本能，人的發展有更多的可選擇性和多元性。如果想要找到生命的意義與幸福，我們可以從作為一個人的角度，探索自己內心真正的需求與渴望。
                    </p>

                    <div className="border border-slate-200/60 rounded-2xl p-4 space-y-4">
                      <h4 className="text-xs font-extrabold text-blue-950 flex items-center gap-1.5">
                        <Users className="w-4 h-4 text-blue-600" />
                        👤 人的生理及社會變化階段
                      </h4>

                      {/* Visual representations of human stages */}
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-amber-50/50 p-3.5 rounded-xl border border-amber-100 text-center space-y-2">
                          <span className="text-3xl block">👶🏻</span>
                          <span className="text-[11px] font-black text-amber-900 block">小嬰兒爬步</span>
                          <p className="text-[10px] text-amber-700">依賴與生理奠基階段</p>
                        </div>
                        <div className="bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100 text-center space-y-2">
                          <span className="text-3xl block">🏃</span>
                          <span className="text-[11px] font-black text-emerald-900 block">雙腿站立行走</span>
                          <p className="text-[10px] text-emerald-700">獨立探索與多元可能</p>
                        </div>
                        <div className="bg-rose-50/50 p-3.5 rounded-xl border border-rose-100 text-center space-y-2">
                          <span className="text-3xl block">👴🏻</span>
                          <span className="text-[11px] font-black text-rose-900 block">體力衰弱扶杖</span>
                          <p className="text-[10px] text-rose-700">智慧圓融與生命省思</p>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-[11px] text-slate-600 leading-relaxed">
                        那麼，我們還可以從哪些角度來描述人呢？「人」究竟是什麼呢？「人」之所以成為「人」，最重要的是什麼特質呢？
                      </div>
                    </div>

                    <div className="bg-amber-50/30 p-4 rounded-xl border border-amber-100 space-y-2">
                      <label className="text-[11px] font-black text-amber-900 block">
                        📝 自我描述卡：如果請你用三個詞彙或句子來描述「我是一個怎樣的人」，你會怎麼寫？
                      </label>
                      <input
                        type="text"
                        disabled={isSubmitted}
                        value={answers.p38SelfDescribe || ''}
                        onChange={(e) => updateAnswer('p38SelfDescribe', e.target.value)}
                        placeholder="例如：一個熱愛大自然的人、一個總是想太多但很真誠的朋友、一個熱衷追求真理的求知者"
                        className="w-full text-xs p-2.5 border border-amber-200 rounded-xl focus:outline-hidden focus:border-amber-500 bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 39: 對比擂台 活動 01 & 02 */}
              {currentPage === 39 && (
                <div id="page_39" className="space-y-4">
                  <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
                    <span className="text-xs text-emerald-700 font-extrabold flex items-center gap-1">
                      <Compass className="w-4 h-4 text-emerald-500" />
                      第 1 章：對比擂台 (活動 01 & 02)
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">漫步奇幻的旅程 | 039</span>
                  </div>

                  {/* Activity 01: Mind map */}
                  <div className="border border-emerald-100 bg-emerald-50/10 p-4 rounded-2xl space-y-3">
                    <span className="text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-black">
                      活動 01：人的多元面向
                    </span>
                    <p className="text-xs text-slate-600">
                      分組透過「人有什麼？」、「人是什麼？」、「人能做什麼？」等三大問題思考我們為何是人。請點擊以下分支查看心智圖範例：
                    </p>

                    <div className="grid grid-cols-3 gap-2.5">
                      <button
                        onClick={() => setActiveMindmapBranch('has')}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          activeMindmapBranch === 'has'
                            ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                            : 'bg-white text-slate-700 border-slate-200'
                        }`}
                      >
                        <span className="text-[11px] block">人有... 🎒</span>
                      </button>
                      <button
                        onClick={() => setActiveMindmapBranch('is')}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          activeMindmapBranch === 'is'
                            ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                            : 'bg-white text-slate-700 border-slate-200'
                        }`}
                      >
                        <span className="text-[11px] block">人是... 👤</span>
                      </button>
                      <button
                        onClick={() => setActiveMindmapBranch('can')}
                        className={`p-2.5 rounded-xl border text-center transition-all ${
                          activeMindmapBranch === 'can'
                            ? 'bg-emerald-600 text-white border-emerald-600 font-bold'
                            : 'bg-white text-slate-700 border-slate-200'
                        }`}
                      >
                        <span className="text-[11px] block">人能做... 🏗️</span>
                      </button>
                    </div>

                    <AnimatePresence mode="wait">
                      {activeMindmapBranch && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="bg-white p-3 rounded-xl border border-emerald-100 text-xs text-emerald-950"
                        >
                          {activeMindmapBranch === 'has' && "👉 人有：道德觀、理性與感性、審美情操、靈魂與心靈存在。"}
                          {activeMindmapBranch === 'is' && "👉 人是：高階的生物體、有自我意識的思考者、社會關係網絡的一份子。"}
                          {activeMindmapBranch === 'can' && "👉 人能做：建立複雜的社會制度、進行自我超越、創造藝術與科技。"}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="space-y-1 pt-1">
                      <label className="text-[11px] font-black text-slate-700 block">
                        💡 想一想：根據心智圖創作，你發現有哪些「人的共通特質」呢？（生理/心智/社會面向）
                      </label>
                      <textarea
                        disabled={isSubmitted}
                        value={answers.p39MindmapReflection || ''}
                        onChange={(e) => updateAnswer('p39MindmapReflection', e.target.value)}
                        placeholder="例如：生理上有複雜的大腦皮質；心智上具有批判與自我反思能力；社會上能以符號、語言建立龐大的群體制度與道德關懷。"
                        className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-500 bg-white"
                        rows={2}
                      />
                    </div>
                  </div>

                  {/* Activity 02: Cyborg vs. Human */}
                  <div className="border border-indigo-100 bg-indigo-50/10 p-4 rounded-2xl space-y-3">
                    <span className="text-[9px] bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full font-black">
                      活動 02：異同攻防戰 ─ 改造人 (Cyborg) vs. 人類
                    </span>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      20 世紀中葉開始，AI被大量研究，甚至出現高科技 AI 分身協助工作。
                      身為「人類」的我們，與「改造人（Cyborg：有機體與生物機電體融合的半機器人）」相同與相異之處有哪些？
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold text-indigo-900 flex items-center gap-1">
                          🟢 相同之處：
                        </label>
                        <input
                          type="text"
                          disabled={isSubmitted}
                          value={cyborgAnswers.same1}
                          onChange={(e) => {
                            const updated = { ...cyborgAnswers, same1: e.target.value };
                            setCyborgAnswers(updated);
                            updateAnswer('p39CyborgAnswers', updated);
                          }}
                          placeholder="例如：都能進行邏輯運算、處理外部資訊..."
                          className="w-full text-xs p-2 border border-indigo-100 rounded-lg focus:outline-hidden focus:border-indigo-500 bg-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-extrabold text-pink-900 flex items-center gap-1">
                          🔴 相異之處：
                        </label>
                        <input
                          type="text"
                          disabled={isSubmitted}
                          value={cyborgAnswers.diff1}
                          onChange={(e) => {
                            const updated = { ...cyborgAnswers, diff1: e.target.value };
                            setCyborgAnswers(updated);
                            updateAnswer('p39CyborgAnswers', updated);
                          }}
                          placeholder="例如：人類有真正的情感、同理心與靈性追求..."
                          className="w-full text-xs p-2 border border-pink-100 rounded-lg focus:outline-hidden focus:border-pink-500 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 40: 多元學科對「人」的看法 */}
              {currentPage === 40 && (
                <div id="page_40" className="space-y-4">
                  <div className="flex items-center justify-between border-b border-blue-100 pb-2">
                    <span className="text-xs text-blue-700 font-extrabold flex items-center gap-1">
                      <Compass className="w-4 h-4 text-blue-500" />
                      多元學科對「人」的看法
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">040 | CH2 / 人學探索</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    關於「人」的思考，有從「身體層面」定義、有從「心理層面」強調情感與理性、也有從「靈性層面」認為人可以超越自我限制。以下是五種不同學科對「人」的經典看法，<strong>點擊卡片解鎖詳細學術洞察</strong>：
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
                    {viewCards.map(c => {
                      const isActive = activeViewCard === c.id;
                      return (
                        <button
                          key={c.id}
                          onClick={() => setActiveViewCard(isActive ? null : c.id)}
                          className={`p-3 rounded-2xl border text-left transition-all ${
                            isActive 
                              ? 'col-span-1 sm:col-span-3 bg-gradient-to-br text-white border-transparent shadow-md ' + c.color
                              : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-xl">{c.icon}</span>
                            <span className="text-xs font-black">{c.title}</span>
                          </div>
                          {isActive && (
                            <motion.p 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="text-[11px] leading-relaxed mt-2.5 border-t border-white/20 pt-2 whitespace-pre-line"
                            >
                              {c.text}
                            </motion.p>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="bg-amber-50/30 p-4 rounded-xl border border-amber-100 space-y-2">
                    <label className="text-[11px] font-black text-amber-900 block">
                      📝 課本想一想：你同意人是有「身、心、靈」組成的嗎？雖然「心靈」看不到也摸不到，你認為它存在嗎？
                    </label>
                    <textarea
                      disabled={isSubmitted}
                      value={answers.p40BodyMindSpirit || ''}
                      onChange={(e) => updateAnswer('p40BodyMindSpirit', e.target.value)}
                      placeholder="例如：我同意。心靈雖然看不見，但就像大海裡有魚，不能因為沒撒網網到就否定魚的存在。我的情感與靈性體驗是真實構成我這個人的核心..."
                      className="w-full text-xs p-2.5 border border-amber-200 rounded-xl focus:outline-hidden focus:border-amber-500 bg-white"
                      rows={2.5}
                    />
                  </div>
                </div>
              )}

              {/* PAGE 41: MIND田捕手 - 被狼養大的孩子 */}
              {currentPage === 41 && (
                <div id="page_41" className="space-y-4">
                  <div className="flex items-center justify-between border-b border-blue-100 pb-2">
                    <span className="text-xs text-blue-700 font-extrabold flex items-center gap-1">
                      <Compass className="w-4 h-4 text-blue-500" />
                      MIND 田捕手 ─ 被狼養大的孩子
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">漫步奇幻的旅程 | 041</span>
                  </div>

                  <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-3">
                    <h3 className="text-xs font-black text-slate-800 flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-emerald-600" />
                      真實故事：西班牙狼孩 ── 馬科斯·潘托哈
                    </h3>

                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      馬科斯·羅德里格斯·潘托哈 (Marcos Rodríguez Pantoja) 1946 年出生於西班牙。母親三歲時去世，父親再娶後將他賣給一位隱居牧羊人。牧羊人死後，<strong>潘托哈在莫雷納山脈與狼群生活在一起，長達 12 年之久。</strong>
                      <br /><br />
                      當時，與人類生活完全隔絕的潘托哈，生活習性與狼相同：他<strong>用四肢行走</strong>、用牙齒撕咬獵物、<strong>藉由嚎叫與狼群交流</strong>。1965 年，19 歲的潘托哈被警衛隊送往醫院。修女與女教師教導他人類生活方式，他卻仍想返回狼群，因為他發現自己難以適應人類社會。
                    </p>
                  </div>

                  {/* 4 Custom questions matching the images */}
                  <div className="space-y-3 border-t border-slate-100 pt-3">
                    <h4 className="text-xs font-extrabold text-blue-950">🤔 反思討論問題：</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                        <span className="text-[10px] font-black text-emerald-700 block">Q1. 被狼養大的潘托哈，到底是人還是動物？</span>
                        <input
                          type="text"
                          disabled={isSubmitted}
                          value={answers.p41Q1 || ''}
                          onChange={(e) => updateAnswer('p41Q1', e.target.value)}
                          placeholder="例如：生理上是人，但生活習慣與社會心理認同上偏向狼..."
                          className="w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-emerald-500 bg-white"
                        />
                      </div>

                      <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                        <span className="text-[10px] font-black text-emerald-700 block">Q2. 你覺得潘托哈在重回社會的成長中，可能經歷哪些困難？</span>
                        <input
                          type="text"
                          disabled={isSubmitted}
                          value={answers.p41Q2 || ''}
                          onChange={(e) => updateAnswer('p41Q2', e.target.value)}
                          placeholder="例如：語言障礙、適應穿鞋穿衣、人際信任問題..."
                          className="w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-emerald-500 bg-white"
                        />
                      </div>

                      <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                        <span className="text-[10px] font-black text-emerald-700 block">Q3. 當潘托哈遇到這些困難時，可能產生哪些情緒？</span>
                        <input
                          type="text"
                          disabled={isSubmitted}
                          value={answers.p41Q3 || ''}
                          onChange={(e) => updateAnswer('p41Q3', e.target.value)}
                          placeholder="例如：恐懼、焦慮、憤怒、挫折與對大自然的強烈懷念..."
                          className="w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-emerald-500 bg-white"
                        />
                      </div>

                      <div className="space-y-1 bg-white p-3 rounded-xl border border-slate-100 shadow-2xs">
                        <span className="text-[10px] font-black text-emerald-700 block">Q4. 如果班級或社會中，出現像潘托哈一樣的人，你會如何相處？</span>
                        <input
                          type="text"
                          disabled={isSubmitted}
                          value={answers.p41Q4 || ''}
                          onChange={(e) => updateAnswer('p41Q4', e.target.value)}
                          placeholder="例如：保持同理心、耐心示範，不取笑他，陪伴他慢慢適應..."
                          className="w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-emerald-500 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 42: 👤 關於人性 ─ 黑暗榮耀 */}
              {currentPage === 42 && (
                <div id="page_42" className="space-y-4">
                  <div className="flex items-center justify-between border-b border-rose-100 pb-2">
                    <span className="text-xs text-rose-700 font-extrabold flex items-center gap-1">
                      <Compass className="w-4 h-4 text-rose-500" />
                      第 2 章：👤 關於人性 ─ 黑暗榮耀
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">042 | CH2 / 人學探索</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    如何才像是個人呢？人性是有別於其他動物，具有獨特的性格與本質。2022 年 Netflix 韓國影集《黑暗榮耀》紅遍全球，講述文同珢遭受霸凌與成年復仇。以下是劇中霸凌的殘酷與人性光輝的對比：
                  </p>

                  <div className="bg-slate-900 text-rose-100 p-4 rounded-2xl space-y-3 font-mono shadow-inner border border-rose-950/40">
                    <div className="flex items-center gap-1.5 text-xs font-black text-rose-400">
                      <Flame className="w-4 h-4" />
                      戲劇重現 🎬：黑暗榮耀霸凌劇場
                    </div>

                    <div className="space-y-2 text-[11px] leading-relaxed">
                      <p className="text-rose-300 italic">涎鎮：「同珢歡迎妳～抱歉！之前一直欺負妳，我想跟妳道歉，妳會原諒我吧？」</p>
                      <p className="text-rose-300 italic">涎鎮：「其實也沒必要鬧到警察局去吧？同珢啊，從現在開始，妳能幫我測試電棒捲的溫度嗎？」</p>
                      <p className="text-slate-400 italic">(霸凌五人幫將同珢壓制，蓑羅用電棒捲燙同珢的手臂，同珢大聲哭喊)</p>
                      <p className="text-rose-300 italic">涎鎮：「孫慏梧，堵住她的嘴！」</p>
                      <p className="text-rose-300 italic">慏梧：「在公共場所怎麼能這麼吵呢？」<span className="text-slate-400">(未經同意強吻同珢)</span></p>
                    </div>
                  </div>

                  <div className="bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100 text-[11px] text-slate-600 leading-relaxed">
                    🛡️ <strong>溫暖人性的對比：</strong>
                    同珢遇到許多好人，如校護溫暖的擁抱與幫助；在成衣廠工作時，同事出面替她說話，同事也會因擔心吵到準備考試的同珢，在宿舍走廊拎起鞋子輕聲走路。這都是「人性光輝」的展現。
                  </div>

                  <div className="space-y-3 border-t border-slate-100 pt-3">
                    <h4 className="text-xs font-extrabold text-rose-950">🤔 思考小論壇：</h4>

                    <div className="space-y-2">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-700 block">Q1. 藉由劇情的描述，你看見哪些段落是不具有人性的？為什麼？</span>
                        <input
                          type="text"
                          disabled={isSubmitted}
                          value={answers.p42Q1 || ''}
                          onChange={(e) => updateAnswer('p42Q1', e.target.value)}
                          placeholder="例如：涎鎮等人將他人痛苦當成娛樂，這完全缺乏同理心與對人基本的尊重，是不具人性的行為。"
                          className="w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-rose-500 bg-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-slate-700 block">Q2. 你認為一個人須具備哪些要素，才能稱作「有人性」的人？</span>
                        <input
                          type="text"
                          disabled={isSubmitted}
                          value={answers.p42Q2 || ''}
                          onChange={(e) => updateAnswer('p42Q2', e.target.value)}
                          placeholder="例如：同理心、道德感、自制力、關懷弱者的能力..."
                          className="w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-rose-500 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 43: 理性 vs. 感性 & 性善 vs. 性惡 */}
              {currentPage === 43 && (
                <div id="page_43" className="space-y-4">
                  <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
                    <span className="text-xs text-indigo-700 font-extrabold flex items-center gap-1">
                      <Compass className="w-4 h-4 text-indigo-500" />
                      理性 vs. 感性 & 性善 vs. 性惡
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">漫步奇幻的旅程 | 043</span>
                  </div>

                  {/* Section A: Rational vs. Emotional slider */}
                  <div className="border border-indigo-100 p-4 rounded-2xl bg-indigo-50/10 space-y-3">
                    <h3 className="text-xs font-black text-indigo-950 flex items-center gap-1.5">
                      <Layers className="w-4 h-4" />
                      🌸 理性 vs. 感性調和天平
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      人同時擁有理性與感性。請拖動滑桿，體驗你在大腦決策中偏向哪一端：
                    </p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-[11px] font-black">
                        <span className="text-blue-700">❄️ 理性層面 (思考、分析、節制)</span>
                        <span className="text-red-600">🔥 感性層面 (直覺、情感、愛恨)</span>
                      </div>
                      <input 
                        type="range"
                        min="0"
                        max="100"
                        disabled={isSubmitted}
                        value={rationalRatio}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          setRationalRatio(val);
                          updateAnswer('p43RationalRatio', val);
                        }}
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                      <div className="text-center text-[11px] text-indigo-950 font-extrabold bg-white p-2 rounded-xl border border-indigo-100">
                        {rationalRatio < 40 && "🎯 當前傾向：【感性主導】 容易被直覺與喜怒哀樂感染，要提防衝動濫情。"}
                        {rationalRatio >= 40 && rationalRatio <= 60 && "⚖️ 當前傾向：【理性與感性兼備】 適時調和思考與情感，達到和諧的智慧狀態！"}
                        {rationalRatio > 60 && "🎯 當前傾向：【理性主導】 強調嚴格分析與邏輯規範，要提防給人冷冰冰的感覺。"}
                      </div>
                    </div>
                  </div>

                  {/* Section B: Good vs. Evil Umbrella Dilemma */}
                  <div className="border border-emerald-100 p-4 rounded-2xl bg-emerald-50/10 space-y-3">
                    <h3 className="text-xs font-black text-emerald-950 flex items-center gap-1.5">
                      <Heart className="w-4 h-4 text-emerald-600" />
                      🌸 性善 (孟子) vs. 性惡 (荀子) 雨傘抉擇
                    </h3>
                    <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">
                      情境：下雨天你買完東西出來，發現自己的雨傘不見了。門口有別人的傘，你會拿嗎？
                    </p>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => {
                          setUmbrellaChoice('take');
                          updateAnswer('p43UmbrellaChoice', 'take');
                        }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          umbrellaChoice === 'take'
                            ? 'bg-rose-50 border-rose-300 text-rose-950 ring-2 ring-rose-500'
                            : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                        }`}
                      >
                        <span className="text-[11px] font-black block">😈 念頭 A：拿走別人的傘</span>
                        <p className="text-[10px] text-slate-500 mt-1">「反正沒人看見，而且我也是受害者...」</p>
                      </button>

                      <button
                        onClick={() => {
                          setUmbrellaChoice('leave');
                          updateAnswer('p43UmbrellaChoice', 'leave');
                        }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          umbrellaChoice === 'leave'
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-950 ring-2 ring-emerald-500'
                            : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                        }`}
                      >
                        <span className="text-[11px] font-black block">👼 念頭 B：不拿別人的傘</span>
                        <p className="text-[10px] text-slate-500 mt-1">「這是偷竊，會給下一位失主造成極大困擾...」</p>
                      </button>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <label className="text-[10px] font-black text-slate-700 block">
                        📝 學生反思：不論性善或性惡，皆能透過後天教育引導人。請分享你當下的起心動念為何？
                      </label>
                      <input
                        type="text"
                        disabled={isSubmitted}
                        value={answers.p43UmbrellaReflection || ''}
                        onChange={(e) => updateAnswer('p43UmbrellaReflection', e.target.value)}
                        placeholder="例如：我會選擇不拿。雖然身體會淋濕，但做出良善的抉擇能守護道德底線，內心更坦蕩。"
                        className="w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-emerald-500 bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 44: 🌸 寧靜修養：靈性的存在？ */}
              {currentPage === 44 && (
                <div id="page_44" className="space-y-4">
                  <div className="flex items-center justify-between border-b border-purple-100 pb-2">
                    <span className="text-xs text-purple-700 font-extrabold flex items-center gap-1">
                      <Compass className="w-4 h-4 text-purple-500" />
                      🌸 寧靜修養：靈性的存在？
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">044 | CH2 / 人學探索</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    <strong>「靈性」是一種超越物質，涉及個人內在、情感與心理層面的探索與連結。</strong>
                    心理學家馬斯洛認為靈性是人類最高的需求，屬於自我超越層次。
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-purple-50/50 p-3.5 rounded-xl border border-purple-100 space-y-1.5">
                      <span className="text-xs font-black text-purple-950 block">✦ 宗教層面</span>
                      <p className="text-[10px] text-slate-600 leading-relaxed">
                        人與超自然神祇或非物質靈魂之間的連結，在日常佛法或禱告中提升大愛與心靈圓滿。
                      </p>
                    </div>
                    <div className="bg-emerald-50/50 p-3.5 rounded-xl border border-emerald-100 space-y-1.5">
                      <span className="text-xs font-black text-emerald-950 block">✦ 文化層面</span>
                      <p className="text-[10px] text-slate-600 leading-relaxed">
                        人與傳統祖先、大自然萬物（如山靈、水靈、山神）的和諧依存與崇敬。
                      </p>
                    </div>
                    <div className="bg-blue-50/50 p-3.5 rounded-xl border border-blue-100 space-y-1.5">
                      <span className="text-xs font-black text-blue-950 block">✦ 心靈層面</span>
                      <p className="text-[10px] text-slate-600 leading-relaxed">
                        無神論者的心靈、意識與最高自我超越，追尋生命的意義，肯定人性的內在光明。
                      </p>
                    </div>
                  </div>

                  {/* Checklist of spiritual habits */}
                  <div className="border border-purple-200/60 rounded-2xl p-4 bg-purple-50/5 space-y-3">
                    <span className="text-xs font-black text-purple-950 flex items-center gap-1">
                      <ListTodo className="w-4 h-4 text-purple-600" />
                      培養內在寧靜：我想嘗試的靈性修養習慣 (多選)
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {spiritualOptions.map(opt => {
                        const isChecked = spiritualChecklist.includes(opt.id);
                        return (
                          <button
                            key={opt.id}
                            disabled={isSubmitted}
                            onClick={() => handleSpiritualCheck(opt.id)}
                            className={`p-2.5 rounded-xl border text-left transition-all flex items-start gap-2 ${
                              isChecked
                                ? 'bg-purple-600 text-white border-purple-600'
                                : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                            }`}
                          >
                            <input 
                              type="checkbox"
                              checked={isChecked}
                              readOnly
                              className="mt-1 shrink-0 accent-purple-600"
                            />
                            <div className="min-w-0">
                              <span className="text-[11px] font-black block">{opt.title}</span>
                              <p className={`text-[9px] mt-0.5 ${isChecked ? 'text-purple-100' : 'text-slate-400'}`}>
                                {opt.desc}
                              </p>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 45: LIFE 心動力 ─ 好好愛自己：從呼吸療法開始 */}
              {currentPage === 45 && (
                <div id="page_45" className="space-y-4">
                  <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
                    <span className="text-xs text-emerald-700 font-extrabold flex items-center gap-1">
                      <Compass className="w-4 h-4 text-emerald-500" />
                      LIFE 心動力 ─ 呼吸療癒
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">漫步奇幻的旅程 | 045</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    呼吸療法是一種非常棒的安定情緒、降低壓力的方法。讓我們配合下方的「呼吸冥想虛擬教練」，深呼吸 10 次，感受放鬆吧！
                  </p>

                  {/* ACTIVE BREATHING WORKSPACE COACH */}
                  <div className="bg-slate-900 text-white rounded-3xl p-5 border border-slate-800 relative overflow-hidden flex flex-col items-center justify-center min-h-[220px] space-y-4">
                    
                    {/* Outer ambient glow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/20 to-indigo-950/20 pointer-events-none" />

                    {/* Choose breathing style tabs */}
                    <div className="flex gap-2 z-10">
                      {['rainbow', 'balloon', 'firework'].map((style) => (
                        <button
                          key={style}
                          onClick={() => {
                            setBreathingMethod(style as any);
                            setIsBreathing(false);
                            setBreathCount(0);
                          }}
                          className={`px-3 py-1 text-[11px] font-black rounded-full border transition-all ${
                            breathingMethod === style
                              ? 'bg-emerald-600 text-white border-emerald-600'
                              : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                          }`}
                        >
                          {style === 'rainbow' && '🌈 彩虹呼吸'}
                          {style === 'balloon' && '🎈 氣球呼吸'}
                          {style === 'firework' && '🎆 煙火呼吸'}
                        </button>
                      ))}
                    </div>

                    {/* Animated Breathing Circle */}
                    <div className="relative flex items-center justify-center w-36 h-36 z-10">
                      
                      {/* Scale and color-shift animating circle */}
                      <motion.div
                        animate={{
                          scale: breathCycle === 'inhale' ? 1.6 : breathCycle === 'hold' ? 1.6 : breathCycle === 'exhale' ? 0.9 : 1.0,
                          backgroundColor: 
                            breathCycle === 'inhale' ? 'rgba(16, 185, 129, 0.2)' : 
                            breathCycle === 'hold' ? 'rgba(59, 130, 246, 0.3)' : 
                            breathCycle === 'exhale' ? 'rgba(239, 68, 68, 0.15)' : 
                            'rgba(148, 163, 184, 0.1)',
                          borderColor:
                            breathCycle === 'inhale' ? '#10b981' : 
                            breathCycle === 'hold' ? '#3b82f6' : 
                            breathCycle === 'exhale' ? '#ef4444' : 
                            '#475569'
                        }}
                        transition={{
                          duration: breathCycle === 'hold' ? 2 : 4,
                          ease: "easeInOut"
                        }}
                        className="w-24 h-24 rounded-full border-3 flex flex-col items-center justify-center text-center p-2.5"
                      >
                        <span className="text-[11px] font-black tracking-widest text-emerald-400">
                          {breathCycle === 'idle' && "點擊開始"}
                          {breathCycle === 'inhale' && "吸氣 👃"}
                          {breathCycle === 'hold' && "屏息 🤐"}
                          {breathCycle === 'exhale' && "吐氣 👄"}
                        </span>
                        
                        <span className="text-xl font-mono font-black mt-1">
                          {isBreathing ? `${breathCounter}s` : "🧘"}
                        </span>
                      </motion.div>

                      {/* Sparkle firework blast overlay */}
                      <AnimatePresence>
                        {fireworkBurst && (
                          <motion.div 
                            initial={{ scale: 0.1, opacity: 1 }}
                            animate={{ scale: 2.2, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5 }}
                            className="absolute w-36 h-36 rounded-full border border-dashed border-amber-400 flex items-center justify-center"
                          >
                            <span className="text-3xl animate-bounce">🎆✨</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Active helper text */}
                    <p className="text-[11px] text-slate-300 text-center max-w-xs z-10 leading-normal">
                      {breathingMethod === 'rainbow' && "🌈 雙手打開深呼吸，手舉至頭頂繪出彩虹；緩慢吐氣，雙手往下擦除彩虹。"}
                      {breathingMethod === 'balloon' && "🎈 邊深呼吸將手舉至胸前腹部撐大；慢慢口吐氣，想像將氣球吹大後拍掉。"}
                      {breathingMethod === 'firework' && "🎆 雙手合十，吸氣吸飽延伸至頭頂；發出「嘶～」聲慢吐氣，煙火撒下！"}
                    </p>

                    {/* Control buttons & tracker */}
                    <div className="flex items-center gap-4 z-10 pt-1">
                      <button
                        onClick={toggleBreathing}
                        className={`px-5 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md transition-all ${
                          isBreathing 
                            ? 'bg-rose-600 hover:bg-rose-700 text-white' 
                            : 'bg-emerald-500 hover:bg-emerald-600 text-slate-950'
                        }`}
                      >
                        <Wind className="w-4 h-4" />
                        {isBreathing ? "暫停導引" : "開始呼吸練習"}
                      </button>

                      <span className="text-xs font-mono font-bold text-slate-400">
                        今日已完成：<span className="text-emerald-400 font-extrabold">{breathCount}</span> / 10 次
                      </span>
                    </div>
                  </div>

                  {/* Observation form matching Page 45 questions */}
                  <div className="space-y-3.5 border-t border-slate-100 pt-3">
                    <h4 className="text-xs font-extrabold text-emerald-950">📝 課堂觀察看看 (自動同步至學習單)：</h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10.5px] font-bold text-slate-700 block">
                          Q1. 以上三種呼吸療法中，我最喜歡________，因為：
                        </label>
                        <input
                          type="text"
                          disabled={isSubmitted}
                          value={answers.breathingFav || ''}
                          onChange={(e) => updateAnswer('breathingFav', e.target.value)}
                          placeholder="例如：彩虹呼吸，因為雙手跟著畫出彩虹的動作能讓我更專注，感覺手部有溫熱感..."
                          className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-500 bg-white"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10.5px] font-bold text-slate-700 block">
                          Q2. 在這個呼吸療法中，我發現我的身體、情緒、想法有哪些變化？
                        </label>
                        <input
                          type="text"
                          disabled={isSubmitted}
                          value={answers.breathingChange || ''}
                          onChange={(e) => updateAnswer('breathingChange', e.target.value)}
                          placeholder="例如：原本肩膀很緊繃，做完5次後放鬆許多，腦中的煩躁想法也漸漸安靜下來..."
                          className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-500 bg-white"
                        />
                      </div>
                    </div>

                    <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-100 space-y-2">
                      <div className="flex justify-between items-center text-[10.5px] font-bold text-emerald-900">
                        <span>Q3. 藉由呼吸療法，我覺察與貼近自己內心的程度為 (0-10 分)：</span>
                        <span className="text-xs font-black font-mono bg-emerald-100 px-2.5 py-0.5 rounded-full">{answers.breathingScore || 8} 分</span>
                      </div>
                      <input 
                        type="range"
                        min="0"
                        max="10"
                        disabled={isSubmitted}
                        value={answers.breathingScore || 8}
                        onChange={(e) => updateAnswer('breathingScore', Number(e.target.value))}
                        className="w-full h-1.5 bg-slate-200 rounded-lg cursor-pointer accent-emerald-600"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 46: 探索自我 ─ 三大哲學觀點 */}
              {currentPage === 46 && (
                <div id="page_46" className="space-y-6">
                  <div className="flex items-center justify-between border-b border-purple-100 pb-3">
                    <span className="text-xs text-purple-700 font-extrabold flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-purple-500" />
                      第 2 章：我是誰 ── 三大自我探索觀點
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono font-bold">046 | CH2 / 人學探索</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    我們如何探尋「我是誰」？哲學與心理學家提出了不同的思想架構。以下精選三部經典影視作品，透過其經典對白，帶領我們用不同的維度切入自我的探索旅程。<strong className="text-purple-700">點擊下方影視卡片，解鎖深刻的生命哲思：</strong>
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* EXISTENTIALIST CARD */}
                    <button
                      onClick={() => setActiveTheoryCard(activeTheoryCard === 'existentialist' ? null : 'existentialist')}
                      className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden group shadow-xs ${
                        activeTheoryCard === 'existentialist'
                          ? 'bg-slate-900 text-white border-purple-500 ring-2 ring-purple-500/50'
                          : 'bg-white hover:bg-purple-50/20 border-slate-200/80 hover:border-purple-200 text-slate-800'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-2xl">🔮</span>
                        <span className={`text-[9px] px-2.5 py-0.5 rounded-full font-black ${
                          activeTheoryCard === 'existentialist' ? 'bg-purple-600 text-white' : 'bg-purple-50 text-purple-700'
                        }`}>電影《靈魂急轉彎》</span>
                      </div>
                      <h4 className="text-sm font-black mt-3 flex items-center gap-1.5">
                        存在主義觀點
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      </h4>
                      <p className={`text-[10.5px] italic font-medium mt-2 p-2 rounded-lg leading-relaxed ${
                        activeTheoryCard === 'existentialist' ? 'bg-slate-800 text-purple-200 border-l-2 border-purple-500' : 'bg-slate-50 text-slate-500 border-l-2 border-slate-300'
                      }`}>
                        「我不確定，但我會享受活著的每一分鐘。」
                      </p>
                      
                      <AnimatePresence>
                        {activeTheoryCard === 'existentialist' && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }} 
                            animate={{ opacity: 1, height: 'auto' }} 
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-300 leading-relaxed space-y-2 overflow-hidden"
                          >
                            <p className="text-purple-400 font-extrabold flex items-center gap-1">
                              <Lightbulb className="w-3.5 h-3.5" /> 概念解析：
                            </p>
                            <p>存在主義認為，人的本質並非天生註定（即「存在先於本質」），而是由我們每一次的<strong>自由選擇與具體行動</strong>所決定。</p>
                            <p className="text-slate-400 bg-slate-850 p-2 rounded-lg">
                              就像主角喬一樣，從盲目執念於爵士演奏，到最後發現生命的火花其實藏在微風、落葉、與活在當下的每一秒。我們隨時都有權利去定義自己是誰。
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {!activeTheoryCard && (
                        <div className="text-[9px] text-purple-500 font-bold mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          點擊讀取概念 ─── 👁️
                        </div>
                      )}
                    </button>

                    {/* SOCIAL CONSTRUCT CARD */}
                    <button
                      onClick={() => setActiveTheoryCard(activeTheoryCard === 'social' ? null : 'social')}
                      className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden group shadow-xs ${
                        activeTheoryCard === 'social'
                          ? 'bg-slate-900 text-white border-indigo-500 ring-2 ring-indigo-500/50'
                          : 'bg-white hover:bg-indigo-50/20 border-slate-200/80 hover:border-indigo-200 text-slate-800'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-2xl">🎀</span>
                        <span className={`text-[9px] px-2.5 py-0.5 rounded-full font-black ${
                          activeTheoryCard === 'social' ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-700'
                        }`}>電影《芭比》</span>
                      </div>
                      <h4 className="text-sm font-black mt-3 flex items-center gap-1.5">
                        社會建構觀點
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                      </h4>
                      <p className={`text-[10.5px] italic font-medium mt-2 p-2 rounded-lg leading-relaxed ${
                        activeTheoryCard === 'social' ? 'bg-slate-800 text-indigo-200 border-l-2 border-indigo-500' : 'bg-slate-50 text-slate-500 border-l-2 border-slate-300'
                      }`}>
                        「我想成為自己，而不是被製造出來的商品。」
                      </p>

                      <AnimatePresence>
                        {activeTheoryCard === 'social' && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }} 
                            animate={{ opacity: 1, height: 'auto' }} 
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-300 leading-relaxed space-y-2 overflow-hidden"
                          >
                            <p className="text-indigo-400 font-extrabold flex items-center gap-1">
                              <Lightbulb className="w-3.5 h-3.5" /> 概念解析：
                            </p>
                            <p>社會建構論指出，我們的認同與「我是誰」深受<strong>社會文化、家庭期盼與他人眼光</strong>所建構與框架。</p>
                            <p className="text-slate-400 bg-slate-850 p-2 rounded-lg">
                              在成長中，我們常被迫戴上面具，順應完美的世俗標籤。芭比選擇離開完美的芭比樂園，前往不完美卻真實的世界。探索自我，正是剝離外界強加框架的過程。
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {!activeTheoryCard && (
                        <div className="text-[9px] text-indigo-500 font-bold mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          點擊讀取概念 ─── 👁️
                        </div>
                      )}
                    </button>

                    {/* PSYCHODYNAMIC CARD */}
                    <button
                      onClick={() => setActiveTheoryCard(activeTheoryCard === 'psychodynamic' ? null : 'psychodynamic')}
                      className={`p-5 rounded-2xl border text-left transition-all relative overflow-hidden group shadow-xs ${
                        activeTheoryCard === 'psychodynamic'
                          ? 'bg-slate-900 text-white border-rose-500 ring-2 ring-rose-500/50'
                          : 'bg-white hover:bg-rose-50/20 border-slate-200/80 hover:border-rose-200 text-slate-800'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="text-2xl">💆🏻</span>
                        <span className={`text-[9px] px-2.5 py-0.5 rounded-full font-black ${
                          activeTheoryCard === 'psychodynamic' ? 'bg-rose-600 text-white' : 'bg-rose-50 text-rose-700'
                        }`}>影集《四樓的天堂》</span>
                      </div>
                      <h4 className="text-sm font-black mt-3 flex items-center gap-1.5">
                        心理動力觀點
                        <Sparkles className="w-3.5 h-3.5 text-rose-400" />
                      </h4>
                      <p className={`text-[10.5px] italic font-medium mt-2 p-2 rounded-lg leading-relaxed ${
                        activeTheoryCard === 'psychodynamic' ? 'bg-slate-800 text-rose-200 border-l-2 border-rose-500' : 'bg-slate-50 text-slate-500 border-l-2 border-slate-300'
                      }`}>
                        「心理的傷，身體會記得。」
                      </p>

                      <AnimatePresence>
                        {activeTheoryCard === 'psychodynamic' && (
                          <motion.div 
                            initial={{ opacity: 0, height: 0 }} 
                            animate={{ opacity: 1, height: 'auto' }} 
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-300 leading-relaxed space-y-2 overflow-hidden"
                          >
                            <p className="text-rose-400 font-extrabold flex items-center gap-1">
                              <Lightbulb className="w-3.5 h-3.5" /> 概念解析：
                            </p>
                            <p>心理動力論指出，自我的展現與內在衝突深受<strong>潛意識、童年經驗與心理防衛機轉</strong>的交織牽引。</p>
                            <p className="text-slate-400 bg-slate-850 p-2 rounded-lg">
                              為了逃避痛苦，大腦會不自主地開啟防衛。正如劇中人物透過身體的緊繃與傷痛來阻隔情感创傷。探索自我，是一段勇敢揭開防護、接納內在陰影並與創傷和解的療癒之路。
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      {!activeTheoryCard && (
                        <div className="text-[9px] text-rose-500 font-bold mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          點擊讀取概念 ─── 👁️
                        </div>
                      )}
                    </button>
                  </div>

                  <div className="bg-purple-50/40 p-4 rounded-2xl border border-purple-100/80 space-y-2">
                    <h4 className="text-xs font-black text-purple-950 flex items-center gap-1.5">
                      <MessageSquare className="w-4 h-4 text-purple-600" />
                      🌟 課堂思辨：我的共鳴片刻 (與課本完全一致)
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      讀完以上三大觀點，你最能產生共鳴的是哪一個？你最近是否有像芭比那樣「為了迎合別人期待而感到疲累」，或是像喬一樣「在某個不起眼的日常片段重新感到幸福」的經驗？請寫下你的自省筆記：
                    </p>
                    <textarea
                      disabled={isSubmitted}
                      value={answers.p46SelfReflection || ''}
                      onChange={(e) => updateAnswer('p46SelfReflection', e.target.value)}
                      placeholder="例如：我最有共鳴的是存在主義。有時候段考壓力真的很大，覺得生活像是在滿足大家對好成績的期待。但有天放學在操場跑步時，看到天空漂亮的橘色晚霞，吹著微風，那一刻突然感到生命極度美好。我是誰，不由別人的期許定義，而是由我當下怎麼深刻感知生活所決定的。"
                      className="w-full text-xs p-3.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-purple-500 focus:ring-1 focus:ring-purple-500 bg-white"
                      rows={3}
                    />
                  </div>
                </div>
              )}

              {/* PAGE 47: LIFE 心動力 ─ 探索深度自我 */}
              {currentPage === 47 && (
                <div id="page_47" className="space-y-5">
                  <div className="flex items-center justify-between border-b border-emerald-100 pb-3">
                    <span className="text-xs text-emerald-700 font-extrabold flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-emerald-500" />
                      第 2 章：LIFE 心動力 ── 探索深度的內在自我
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono font-bold">047 | CH2 / 人學探索</span>
                  </div>

                  {/* Intro card with Live Progress Tracker */}
                  <div className="bg-emerald-50/40 p-4 rounded-2xl border border-emerald-100/80 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                      <span className="text-[9px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-black uppercase tracking-wider">
                        探索說明書
                      </span>
                      <h3 className="text-xs font-black text-emerald-950 mt-1">
                        誠實地聆聽你內心深處的聲音，將這十個句子填補完整。
                      </h3>
                      <p className="text-[10px] text-slate-500">這是一份專屬於你個人的心靈素描，沒有標準答案，只有真實。</p>
                    </div>

                    {/* Progress Indicator */}
                    <div className="bg-white px-4 py-2.5 rounded-xl border border-emerald-100 flex items-center gap-3 shrink-0 shadow-2xs">
                      <div className="relative w-8 h-8 flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                          <circle cx="16" cy="16" r="13" stroke="#f1f5f9" strokeWidth="3" fill="none" />
                          <circle cx="16" cy="16" r="13" stroke="#10b981" strokeWidth="3" fill="none" 
                            strokeDasharray={`${2 * Math.PI * 13}`}
                            strokeDashoffset={`${2 * Math.PI * 13 * (1 - [
                              answers.p47Q1_1 || answers.p47Q1_2,
                              answers.p47Q2_1 || answers.p47Q2_2,
                              answers.p47Q3_1 || answers.p47Q3_2,
                              answers.p47Q4_1 || answers.p47Q4_2,
                              answers.p47Q5,
                              answers.p47Q6_1 || answers.p47Q6_2,
                              answers.p47Q7,
                              answers.p47Q8_1 || answers.p47Q8_2,
                              answers.p47Q9_1 || answers.p47Q9_2,
                              answers.p47Q10
                            ].filter(Boolean).length / 10)}`}
                          />
                        </svg>
                        <span className="absolute text-[10px] font-mono font-black text-slate-700">
                          {[
                            answers.p47Q1_1 || answers.p47Q1_2,
                            answers.p47Q2_1 || answers.p47Q2_2,
                            answers.p47Q3_1 || answers.p47Q3_2,
                            answers.p47Q4_1 || answers.p47Q4_2,
                            answers.p47Q5,
                            answers.p47Q6_1 || answers.p47Q6_2,
                            answers.p47Q7,
                            answers.p47Q8_1 || answers.p47Q8_2,
                            answers.p47Q9_1 || answers.p47Q9_2,
                            answers.p47Q10
                          ].filter(Boolean).length}
                        </span>
                      </div>
                      <div className="text-left">
                        <div className="text-[9px] text-slate-400 font-extrabold uppercase">填寫進度</div>
                        <div className="text-xs font-black text-slate-800">心靈護照解鎖</div>
                      </div>
                    </div>
                  </div>

                  {/* Workbook Stage Switcher */}
                  <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200">
                    <button
                      onClick={() => setActiveWorkbookTab(1)}
                      className={`flex-1 text-center py-2 text-[11px] font-black rounded-lg transition-all ${
                        activeWorkbookTab === 1 ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      🌱 第一階段：自我認同 (1-4)
                    </button>
                    <button
                      onClick={() => setActiveWorkbookTab(2)}
                      className={`flex-1 text-center py-2 text-[11px] font-black rounded-lg transition-all ${
                        activeWorkbookTab === 2 ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      🌊 第二階段：環境鏡像 (5-7)
                    </button>
                    <button
                      onClick={() => setActiveWorkbookTab(3)}
                      className={`flex-1 text-center py-2 text-[11px] font-black rounded-lg transition-all ${
                        activeWorkbookTab === 3 ? 'bg-white text-emerald-700 shadow-xs' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      🔮 第三階段：願景追尋 (8-10)
                    </button>
                  </div>

                  <div className="space-y-4">
                    {activeWorkbookTab === 1 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        {/* Q1 */}
                        <div className="p-4 bg-amber-50/10 border border-slate-100 rounded-2xl space-y-3 shadow-3xs">
                          <div className="flex items-center gap-1.5 text-xs font-black text-slate-800">
                            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-mono">01</span>
                            【自我認知】
                          </div>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 text-xs text-slate-700 leading-relaxed">
                            <span>我是個</span>
                            <input
                              type="text"
                              disabled={isSubmitted}
                              value={answers.p47Q1_1 || ''}
                              onChange={(e) => updateAnswer('p47Q1_1', e.target.value)}
                              placeholder="例如：安靜但熱心"
                              className="border-b border-dashed border-slate-300 focus:border-emerald-500 focus:outline-hidden px-2 py-1 text-xs text-emerald-700 font-extrabold bg-white rounded-lg w-full sm:w-48 transition-colors"
                            />
                            <span>的人，因為</span>
                            <input
                              type="text"
                              disabled={isSubmitted}
                              value={answers.p47Q1_2 || ''}
                              onChange={(e) => updateAnswer('p47Q1_2', e.target.value)}
                              placeholder="例如：我非常樂意在同學遇到困難時伸出援手"
                              className="border-b border-dashed border-slate-300 focus:border-emerald-500 focus:outline-hidden px-2 py-1 text-xs text-emerald-700 font-extrabold bg-white rounded-lg flex-1 transition-colors"
                            />
                            <span>。</span>
                          </div>
                        </div>

                        {/* Q2 */}
                        <div className="p-4 bg-amber-50/10 border border-slate-100 rounded-2xl space-y-3 shadow-3xs">
                          <div className="flex items-center gap-1.5 text-xs font-black text-slate-800">
                            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-mono">02</span>
                            【拒絕與排斥】
                          </div>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 text-xs text-slate-700 leading-relaxed">
                            <span>我討厭的事情有：</span>
                            <input
                              type="text"
                              disabled={isSubmitted}
                              value={answers.p47Q2_1 || ''}
                              onChange={(e) => updateAnswer('p47Q2_1', e.target.value)}
                              placeholder="例如：在他人背後搬弄是非"
                              className="border-b border-dashed border-slate-300 focus:border-emerald-500 focus:outline-hidden px-2 py-1 text-xs text-emerald-700 font-extrabold bg-white rounded-lg w-full sm:w-56"
                            />
                            <span>，原因</span>
                            <input
                              type="text"
                              disabled={isSubmitted}
                              value={answers.p47Q2_2 || ''}
                              onChange={(e) => updateAnswer('p47Q2_2', e.target.value)}
                              placeholder="例如：這嚴重踐踏了人與人之間最基本的尊重與信任"
                              className="border-b border-dashed border-slate-300 focus:border-emerald-500 focus:outline-hidden px-2 py-1 text-xs text-emerald-700 font-extrabold bg-white rounded-lg flex-1"
                            />
                            <span>。</span>
                          </div>
                        </div>

                        {/* Q3 */}
                        <div className="p-4 bg-amber-50/10 border border-slate-100 rounded-2xl space-y-3 shadow-3xs">
                          <div className="flex items-center gap-1.5 text-xs font-black text-slate-800">
                            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-mono">03</span>
                            【幸福之泉】
                          </div>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 text-xs text-slate-700 leading-relaxed">
                            <span>讓我感到幸福的時刻是：</span>
                            <input
                              type="text"
                              disabled={isSubmitted}
                              value={answers.p47Q3_1 || ''}
                              onChange={(e) => updateAnswer('p47Q3_1', e.target.value)}
                              placeholder="Example: 在夜深人靜時看自己喜歡的書"
                              className="border-b border-dashed border-slate-300 focus:border-emerald-500 focus:outline-hidden px-2 py-1 text-xs text-emerald-700 font-extrabold bg-white rounded-lg w-full sm:w-56"
                            />
                            <span>，因為</span>
                            <input
                              type="text"
                              disabled={isSubmitted}
                              value={answers.p47Q3_2 || ''}
                              onChange={(e) => updateAnswer('p47Q3_2', e.target.value)}
                              placeholder="例如：那時我可以卸下所有社會期望，做最真實的自己"
                              className="border-b border-dashed border-slate-300 focus:border-emerald-500 focus:outline-hidden px-2 py-1 text-xs text-emerald-700 font-extrabold bg-white rounded-lg flex-1"
                            />
                            <span>。</span>
                          </div>
                        </div>

                        {/* Q4 */}
                        <div className="p-4 bg-amber-50/10 border border-slate-100 rounded-2xl space-y-3 shadow-3xs">
                          <div className="flex items-center gap-1.5 text-xs font-black text-slate-800">
                            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-mono">04</span>
                            【自我自豪】
                          </div>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 text-xs text-slate-700 leading-relaxed">
                            <span>我覺得自己最自豪的地方有：</span>
                            <input
                              type="text"
                              disabled={isSubmitted}
                              value={answers.p47Q4_1 || ''}
                              onChange={(e) => updateAnswer('p47Q4_1', e.target.value)}
                              placeholder="例如：總是能遵守約定、說到做到"
                              className="border-b border-dashed border-slate-300 focus:border-emerald-500 focus:outline-hidden px-2 py-1 text-xs text-emerald-700 font-extrabold bg-white rounded-lg w-full sm:w-56"
                            />
                            <span>，因為</span>
                            <input
                              type="text"
                              disabled={isSubmitted}
                              value={answers.p47Q4_2 || ''}
                              onChange={(e) => updateAnswer('p47Q4_2', e.target.value)}
                              placeholder="例如：對我而言，誠信是建立尊嚴人格的核心"
                              className="border-b border-dashed border-slate-300 focus:border-emerald-500 focus:outline-hidden px-2 py-1 text-xs text-emerald-700 font-extrabold bg-white rounded-lg flex-1"
                            />
                            <span>。</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeWorkbookTab === 2 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        {/* Q5 */}
                        <div className="p-4 bg-amber-50/10 border border-slate-100 rounded-2xl space-y-3 shadow-3xs">
                          <div className="flex items-center gap-1.5 text-xs font-black text-slate-800">
                            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-mono">05</span>
                            【挫折應對】
                          </div>
                          <div className="text-xs space-y-2.5 text-slate-700">
                            <label className="font-semibold text-slate-600 block">如果我遇到重大挫折時，我會做以下這些事情來幫助自己度過困難：</label>
                            <input
                              type="text"
                              disabled={isSubmitted}
                              value={answers.p47Q5 || ''}
                              onChange={(e) => updateAnswer('p47Q5', e.target.value)}
                              placeholder="例如：我會先閉上眼深呼吸10次穩定心律，然後去跑步流汗宣洩，最後找信任的好死黨聊聊。"
                              className="w-full border-b border-dashed border-slate-300 focus:border-emerald-500 focus:outline-hidden px-2 py-2 text-xs text-emerald-700 font-extrabold bg-white rounded-lg"
                            />
                          </div>
                        </div>

                        {/* Q6 */}
                        <div className="p-4 bg-amber-50/10 border border-slate-100 rounded-2xl space-y-3 shadow-3xs">
                          <div className="flex items-center gap-1.5 text-xs font-black text-slate-800">
                            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-mono">06</span>
                            【社群眼光與反思】
                          </div>
                          <div className="text-xs space-y-3 text-slate-700">
                            <label className="font-semibold text-slate-600 block leading-relaxed">當看到他人頻繁在社群發佈精緻「網紅照」，展現完美穿搭、吃大餐、出國探險時：</label>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-xs">
                              <span>我的心裡會覺得</span>
                              <input
                                type="text"
                                disabled={isSubmitted}
                                value={answers.p47Q6_1 || ''}
                                onChange={(e) => updateAnswer('p47Q6_1', e.target.value)}
                                placeholder="例如：稍微有些羨慕與焦慮"
                                className="border-b border-dashed border-slate-300 focus:border-emerald-500 focus:outline-hidden px-2 py-1 text-xs text-emerald-700 font-extrabold bg-white rounded-lg w-full sm:w-52"
                              />
                              <span>，因為我產生了</span>
                              <input
                                type="text"
                                disabled={isSubmitted}
                                value={answers.p47Q6_2 || ''}
                                onChange={(e) => updateAnswer('p47Q6_2', e.target.value)}
                                placeholder="例如：『自己是否過於平凡無奇』的比較想法"
                                className="border-b border-dashed border-slate-300 focus:border-emerald-500 focus:outline-hidden px-2 py-1 text-xs text-emerald-700 font-extrabold bg-white rounded-lg flex-1"
                              />
                              <span>。</span>
                            </div>
                          </div>
                        </div>

                        {/* Q7 */}
                        <div className="p-4 bg-amber-50/10 border border-slate-100 rounded-2xl space-y-3 shadow-3xs">
                          <div className="flex items-center gap-1.5 text-xs font-black text-slate-800">
                            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-mono">07</span>
                            【家庭情緒共振】
                          </div>
                          <div className="text-xs space-y-2.5 text-slate-700">
                            <label className="font-semibold text-slate-600 block leading-relaxed">當家人今天一回家就大力甩門、坐在客廳生悶氣，看到他有這樣的展現：</label>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                              <span>我會產生</span>
                              <input
                                type="text"
                                disabled={isSubmitted}
                                value={answers.p47Q7 || ''}
                                onChange={(e) => updateAnswer('p47Q7', e.target.value)}
                                placeholder="例如：胸口壓抑和不安感，一邊擔心是不是自己惹他不高興，一邊又想多體諒他在外面遇到的委屈"
                                className="border-b border-dashed border-slate-300 focus:border-emerald-500 focus:outline-hidden px-2 py-1 text-xs text-emerald-700 font-extrabold bg-white rounded-lg flex-1"
                              />
                              <span>的想法與反應。</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeWorkbookTab === 3 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        {/* Q8 */}
                        <div className="p-4 bg-amber-50/10 border border-slate-100 rounded-2xl space-y-3 shadow-3xs">
                          <div className="flex items-center gap-1.5 text-xs font-black text-slate-800">
                            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-mono">08</span>
                            【終極追求】
                          </div>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 text-xs text-slate-700 leading-relaxed">
                            <span>我的一生最想要追求的是</span>
                            <input
                              type="text"
                              disabled={isSubmitted}
                              value={answers.p47Q8_1 || ''}
                              onChange={(e) => updateAnswer('p47Q8_1', e.target.value)}
                              placeholder="例如：心靈的平靜與對他人的愛"
                              className="border-b border-dashed border-slate-300 focus:border-emerald-500 focus:outline-hidden px-2 py-1 text-xs text-emerald-700 font-extrabold bg-white rounded-lg w-full sm:w-60"
                            />
                            <span>，因為</span>
                            <input
                              type="text"
                              disabled={isSubmitted}
                              value={answers.p47Q8_2 || ''}
                              onChange={(e) => updateAnswer('p47Q8_2', e.target.value)}
                              placeholder="例如：物質名利終究會淡去，而良善、溫暖與智慧能常伴我靈魂左右"
                              className="border-b border-dashed border-slate-300 focus:border-emerald-500 focus:outline-hidden px-2 py-1 text-xs text-emerald-700 font-extrabold bg-white rounded-lg flex-1"
                            />
                            <span>。</span>
                          </div>
                        </div>

                        {/* Q9 */}
                        <div className="p-4 bg-amber-50/10 border border-slate-100 rounded-2xl space-y-3 shadow-3xs">
                          <div className="flex items-center gap-1.5 text-xs font-black text-slate-800">
                            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-mono">09</span>
                            【生命重要課題】
                          </div>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 text-xs text-slate-700 leading-relaxed">
                            <span>我這一生要學習的課題是：</span>
                            <input
                              type="text"
                              disabled={isSubmitted}
                              value={answers.p47Q9_1 || ''}
                              onChange={(e) => updateAnswer('p47Q9_1', e.target.value)}
                              placeholder="例如：學會果斷地拒絕，並消除過度焦慮"
                              className="border-b border-dashed border-slate-300 focus:border-emerald-500 focus:outline-hidden px-2 py-1 text-xs text-emerald-700 font-extrabold bg-white rounded-lg w-full sm:w-60"
                            />
                            <span>，因為</span>
                            <input
                              type="text"
                              disabled={isSubmitted}
                              value={answers.p47Q9_2 || ''}
                              onChange={(e) => updateAnswer('p47Q9_2', e.target.value)}
                              placeholder="例如：我常因為害怕破壞與他人的和諧，而默默委屈、犧牲了自己的底線"
                              className="border-b border-dashed border-slate-300 focus:border-emerald-500 focus:outline-hidden px-2 py-1 text-xs text-emerald-700 font-extrabold bg-white rounded-lg flex-1"
                            />
                            <span>。</span>
                          </div>
                        </div>

                        {/* Q10 */}
                        <div className="p-4 bg-amber-50/10 border border-slate-100 rounded-2xl space-y-3 shadow-3xs">
                          <div className="flex items-center gap-1.5 text-xs font-black text-slate-800">
                            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[10px] font-mono">10</span>
                            【自我理想期許】
                          </div>
                          <div className="text-xs space-y-2.5 text-slate-700">
                            <label className="font-semibold text-slate-600 block leading-relaxed">假設在未來，我順利成為了自己最理想的模樣，我應該會是個具有什麼能力／特質的人：</label>
                            <input
                              type="text"
                              disabled={isSubmitted}
                              value={answers.p47Q10 || ''}
                              onChange={(e) => updateAnswer('p47Q10', e.target.value)}
                              placeholder="例如：具有獨立思辨而不盲從的大腦、對世間苦難者保有細膩的悲憫與關愛，並且能泰然自若的面對生命的一切跌宕起伏。"
                              className="w-full border-b border-dashed border-slate-300 focus:border-emerald-500 focus:outline-hidden px-2 py-2 text-xs text-emerald-700 font-extrabold bg-white rounded-lg"
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* PAGE 48: MIND 田捕手 ─ 老鷹與小雞的故事 */}
              {currentPage === 48 && (
                <div id="page_48" className="space-y-4">
                  <div className="flex items-center justify-between border-b border-amber-100 pb-2">
                    <span className="text-xs text-amber-700 font-extrabold flex items-center gap-1">
                      <Compass className="w-4 h-4 text-amber-500" />
                      第 2 章：MIND 田捕手 ─ 老鷹與小雞
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">048 | CH2 / 人學探索</span>
                  </div>

                  {/* Elegant Fable Box */}
                  <div className="bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-200/50 p-4.5 rounded-2xl relative overflow-hidden">
                    <span className="text-[9px] bg-amber-600 text-white px-2.5 py-0.5 rounded-full font-black uppercase">
                      寓言啟示錄
                    </span>
                    <h3 className="text-xs font-black text-amber-950 mt-2">飛不高的小雞？不，你是高空的老鷹！</h3>
                    <p className="text-[11px] text-slate-600 mt-2 leading-relaxed">
                      一隻老鷹幼雛不小心掉進了雞窩，從小與雞群一起啄米、咯咯啼鳴。在雞窩長大的老鷹，深信自己「只是一隻不會飛的平凡小雞」。每當牠看著九霄雲外盤旋的雄鷹，心中總流露出無比的嚮往，但同伴總是嘲笑牠：「別傻了！你只是隻雞，雞是飛不起來的。」
                    </p>
                    <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                      直到一位博學的學者「亨利爺爺」路過。他看穿了老鷹的本質。他把老鷹捧在手心、帶上屋頂、再帶上險峻的高山頂峰，對著深不見底的峽谷，亨利爺爺將牠拋向空中。在求生的本能下，老鷹驚恐地拍動翅膀，那一刻，狂風托起了牠巨大的羽翼，牠終於在尖叫與震撼中，直衝雲霄──原來，牠從來都不是一隻小雞，而是天空的霸主。
                    </p>
                  </div>

                  {/* Questions */}
                  <div className="space-y-3 pt-1">
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-slate-700 block">
                        Q1. 故事中的老鷹一開始為什麼飛不起來？你認為是受到了哪些內在或外在的限制？
                      </label>
                      <textarea
                        disabled={isSubmitted}
                        value={answers.p48Q1 || ''}
                        onChange={(e) => updateAnswer('p48Q1', e.target.value)}
                        placeholder="例如：外在限制是雞群的嘲笑與環境暗示；內在限制則是牠不自覺接受了「我是普通小雞」的自我定義，失去了嘗試展翅的勇氣..."
                        className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 bg-white"
                        rows={2}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-slate-700 block">
                        Q2. 認為自己能力不好、沒有自信的人，為什麼很難有卓越的表現？這對你追尋自我價值有什麼啟示？
                      </label>
                      <textarea
                        disabled={isSubmitted}
                        value={answers.p48Q2 || ''}
                        onChange={(e) => updateAnswer('p48Q2', e.target.value)}
                        placeholder="例如：自我懷疑會形成「負面預言自我實現」。因為害怕失敗，就不敢跨出舒適圈嘗試。這啟示我：『我是誰』不是由別人的貼標籤決定的，要敢於尋求自我超越..."
                        className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 bg-white"
                        rows={2}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-black text-slate-700 block">
                          Q3-1. 你的生命中，是否有一位看穿你隱藏價值與潛能的「亨利爺爺」（如導師、家人或死黨）？他是誰？
                        </label>
                        <input
                          type="text"
                          disabled={isSubmitted}
                          value={answers.p48Q3_1 || ''}
                          onChange={(e) => updateAnswer('p48Q3_1', e.target.value)}
                          placeholder="例如：國中的英文老師林老師，或是我的好麻吉博鈞..."
                          className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 bg-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-black text-slate-700 block">
                          Q3-2. 如果由這位最懂你潛力的人來描述，他會怎麼描述真正的你？
                        </label>
                        <input
                          type="text"
                          disabled={isSubmitted}
                          value={answers.p48Q3_2 || ''}
                          onChange={(e) => updateAnswer('p48Q3_2', e.target.value)}
                          placeholder="例如：他會說我很細心，雖然現在比較內向，但只要找到熱愛的事情就會爆發出驚人的執行力..."
                          className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

                            {/* PAGE 49: MIND 田捕手 ─ 我是誰 */}
              {currentPage === 49 && (
                <div id="page_49" className="space-y-6">
                  {/* Top Header */}
                  <div className="flex items-center justify-between border-b border-sky-100 pb-2">
                    <span className="text-xs text-sky-700 font-extrabold flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-sky-500 animate-spin-slow" />
                      049 ▶ CH2 / 人學探索
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">049 | Unit 02</span>
                  </div>

                  {/* Narrative Intro */}
                  <div className="bg-sky-50/40 border border-sky-100/50 p-4 rounded-2xl">
                    <h3 className="text-sm font-black text-sky-950 flex items-center gap-2">
                      <span className="text-lg">⛪</span> 脫去光環與標籤，靈魂最真實的價值
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mt-2">
                      我們常常習慣用職業、頭銜、家庭角色或個人的成就來定義「我是誰」。但是，如果有一天這一切都消失了，剩下的「我」究竟是什麼？請閱讀以下經典故事，一起探尋真實自我的深處。
                    </p>
                  </div>

                  {/* Dialogues Frame */}
                  <div className="border border-slate-200/80 rounded-3xl overflow-hidden bg-slate-50 shadow-xs divide-y divide-slate-100">
                    <div className="bg-slate-100/80 px-4 py-2.5 flex items-center justify-between">
                      <span className="text-[10.5px] font-bold text-slate-600 font-mono">STORY | 天堂門口的對話</span>
                      <span className="text-[9px] bg-sky-100 text-sky-800 px-2 py-0.5 rounded font-black">寓言故事</span>
                    </div>

                    <div className="p-4.5 space-y-4">
                      <p className="text-xs text-slate-600 leading-relaxed">
                        Joe 神父一生虔誠侍主，奉獻全部時間與心力在社區與窮人身上。他過世後，靈魂滿懷欣喜地來到了天堂入口。這時，看守大門的聖伯多祿（St. Peter）上前迎接，並柔聲詢問他：<strong>「請告訴我，你是誰？」</strong>
                      </p>

                      <div className="space-y-3">
                        <div className="flex items-start gap-2.5">
                          <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-base shrink-0 font-bold border border-sky-200">
                            🧔
                          </div>
                          <div className="bg-white border border-sky-100 p-3 rounded-2xl shadow-2xs max-w-[85%]">
                            <span className="text-[9px] text-sky-600 font-bold block mb-1">Joe 神父</span>
                            <p className="text-xs text-slate-700 leading-relaxed">
                              「我是這座城市大教堂的主管神父，我一生宣講真理、主持儀式。」
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 justify-end">
                          <div className="bg-sky-900 text-white p-3 rounded-2xl shadow-2xs max-w-[85%] text-right">
                            <span className="text-[9px] text-sky-300 font-bold block mb-1">聖伯多祿 (St. Peter)</span>
                            <p className="text-xs leading-relaxed">
                              「我不是問你做什麼職業，我是問：<strong>你是誰？</strong>」
                            </p>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-sky-950 flex items-center justify-center text-base shrink-0 font-bold border border-sky-800">
                            👑
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-base shrink-0 font-bold border border-sky-200">
                            🧔
                          </div>
                          <div className="bg-white border border-sky-100 p-3 rounded-2xl shadow-2xs max-w-[85%]">
                            <span className="text-[9px] text-sky-600 font-bold block mb-1">Joe 神父</span>
                            <p className="text-xs text-slate-700 leading-relaxed">
                              「噢，抱歉。我是寫了十本神學著作、並在大學裡講授靈修課的教授。」
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 justify-end">
                          <div className="bg-sky-900 text-white p-3 rounded-2xl shadow-2xs max-w-[85%] text-right">
                            <span className="text-[9px] text-sky-300 font-bold block mb-1">聖伯多祿 (St. Peter)</span>
                            <p className="text-xs leading-relaxed">
                              「我不是問你寫過哪些書、教過什麼課，我是問：<strong>你是誰？</strong>」
                            </p>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-sky-950 flex items-center justify-center text-base shrink-0 font-bold border border-sky-800">
                            👑
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5">
                          <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center text-base shrink-0 font-bold border border-sky-200">
                            🧔
                          </div>
                          <div className="bg-white border border-sky-100 p-3 rounded-2xl shadow-2xs max-w-[85%]">
                            <span className="text-[9px] text-sky-600 font-bold block mb-1">Joe 神父</span>
                            <p className="text-xs text-slate-700 leading-relaxed">
                              「那我是一生不遺餘力幫助孤兒，甚至將所有積蓄都捐給窮苦人家的慈善大好人！」
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 justify-end">
                          <div className="bg-sky-900 text-white p-3 rounded-2xl shadow-2xs max-w-[85%] text-right">
                            <span className="text-[9px] text-sky-300 font-bold block mb-1">聖伯多祿 (St. Peter)</span>
                            <p className="text-xs leading-relaxed">
                              「我不是問你一生做過多少偉大的善行，我是問：<strong>你是誰？</strong>」
                            </p>
                          </div>
                          <div className="w-10 h-10 rounded-full bg-sky-950 flex items-center justify-center text-base shrink-0 font-bold border border-sky-800">
                            👑
                          </div>
                        </div>
                      </div>

                      <p className="text-xs text-sky-950 font-bold bg-sky-100/40 p-3.5 rounded-2xl border border-sky-100 leading-relaxed">
                        Joe 神父站在那裡，陷入了長久的沈默。最後，他流下真誠的淚水，輕聲說道：<strong>「我是那個在愛中誕生，深深渴望被愛、也願意付出一生去愛人的靈魂。」</strong> 聖伯多祿溫柔地笑了，拉起他的手：「歡迎你，請進天堂。」
                      </p>
                    </div>
                  </div>

                  {/* Reflection input */}
                  <div className="bg-white border border-slate-100 p-4.5 rounded-2xl space-y-4 shadow-2xs">
                    <span className="text-[10px] bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded-full font-black">
                      ✍️ 課堂深思學習單
                    </span>
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <label className="text-[11px] font-black text-slate-700 block">
                          Q1. 故事中的聖伯多祿為什麼一次又一次拒絕了Joe神父的回答（如職業、學術成就、慈善行為）？這些「標籤」與我們真實的自我有何不同？
                        </label>
                        <textarea
                          disabled={isSubmitted}
                          value={answers.p49Q1 || ''}
                          onChange={(e) => updateAnswer('p49Q1', e.target.value)}
                          placeholder="例如：因為職業和頭銜只是我們在社會上演出的角色，而善行是我們做出的行為，並不是靈魂的本體。真正的我是那個做出抉擇、擁有溫度、感受愛的本源..."
                          className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-sky-500 bg-white"
                          rows={2.5}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-black text-slate-700 block">
                          Q2. 在生活中，我們習慣用「我是個高中生」、「我是打電動高手」來自我介紹。如果撥開這些外在角色，你會如何向一個陌生人描述最核心、最真實的你？
                        </label>
                        <textarea
                          disabled={isSubmitted}
                          value={answers.p49Q2 || ''}
                          onChange={(e) => updateAnswer('p49Q2', e.target.value)}
                          placeholder="例如：如果撥開學生和興趣的標籤，我是一個面對未知會有些害怕但仍然充滿好奇心的人，也是一個很在乎朋友心情、希望帶給別人安心感的人..."
                          className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-sky-500 bg-white"
                          rows={2.5}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-black text-slate-700 block">
                          Q3. 試著寫下一個代表你靈魂最深處特質、最令你自豪的一句話，作為「我是誰」的真誠解答：
                        </label>
                        <input
                          type="text"
                          disabled={isSubmitted}
                          value={answers.p49Q3 || ''}
                          onChange={(e) => updateAnswer('p49Q3', e.target.value)}
                          placeholder="例如：我是一個在宇宙中獨一無二、能感知美好並為身邊人帶來溫暖的靈魂。"
                          className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-sky-500 bg-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 50: 050 ▶ CH2 / 人學探索 */}
              {currentPage === 50 && (
                <div id="page_50" className="space-y-6">
                  {/* Top Header */}
                  <div className="flex items-center justify-between border-b border-rose-100 pb-2">
                    <span className="text-xs text-rose-700 font-extrabold flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-rose-500 animate-spin-slow" />
                      050 ▶ CH2 / 人學探索
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">050 | Unit 02</span>
                  </div>

                  {/* Intro Quote Panel */}
                  <div className="bg-gradient-to-br from-rose-500/5 via-pink-500/5 to-transparent p-5 rounded-2xl border border-rose-100/50 space-y-3.5">
                    <p className="text-xs font-bold text-rose-950 leading-relaxed text-center">
                      「我是誰？」「我想成為什麼樣的人？」是沒有標準答案的問題，需要持續地探索與思考，才不會在生命中留下遺憾。
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      著有《白色巨塔》的醫生作家侯文詠，曾於安寧病房照顧過四百多名癌症末期病患，他在關懷病人的過程中發現──每個人在生命的最終，在乎的是<strong>「關係」</strong>和<strong>「意義」</strong>，不論經歷過什麼樣的人生，對大部分的人來說，生命最重要的事情不是財富、名譽等外在價值，而是與別人的關係是否沒有遺憾、自己的生命帶給了別人什麼。
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      透過這個故事，你覺得在生命的臨終，人為什麼會在意別人與自己的關係？為什麼會關心自己的生命給別人帶來什麼？一個幸福圓滿的人生究竟如何去經營 and 追求呢？
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed font-bold border-t border-rose-100/40 pt-3">
                      追求滿足個人需要的「我」，和能夠在心裡放進許多人、關心他人、帶給別人溫暖的「我」，你喜歡哪一個呢？你想成為哪一種人呢？
                    </p>
                  </div>

                  {/* Interactive Reflection: Hou Wen-yong Quote */}
                  <div className="bg-white border border-slate-100 p-4.5 rounded-2xl space-y-4 shadow-2xs">
                    <span className="text-[10px] bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-full font-black">
                      ✍️ 課堂深思學習單 (一)
                    </span>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[11px] font-black text-slate-700 block">
                          Q1. 透過侯文詠在安寧病房的觀察，你覺得在生命臨終時，人為什麼會在意「關係」與「意義」，而非財富或名譽？
                        </label>
                        <textarea
                          disabled={isSubmitted}
                          value={answers.p50Q1 || ''}
                          onChange={(e) => updateAnswer('p50Q1', e.target.value)}
                          placeholder="請寫下你的想法..."
                          className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-rose-500 bg-white"
                          rows={2}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-black text-slate-700 block">
                          Q2. 追求滿足個人需要的「我」，與在心裡放進許多人、帶給別人溫暖的「我」，你更嚮往哪一個？你想成為哪一種人呢？
                        </label>
                        <textarea
                          disabled={isSubmitted}
                          value={answers.p50Q2 || ''}
                          onChange={(e) => updateAnswer('p50Q2', e.target.value)}
                          placeholder="請分享你的選擇與原因..."
                          className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-rose-500 bg-white"
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section Title */}
                  <div className="flex items-center gap-2 border-l-4 border-rose-500 pl-2.5 mt-2">
                    <h3 className="text-sm font-black text-rose-950">
                      — 我的成長之路——曾文翰的人生故事
                    </h3>
                  </div>

                  <p className="text-xs font-bold text-rose-700 font-mono tracking-widest pl-1">
                    「800英尺！500英尺！九天玄女降落！降落！」
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    知名 YouTuber 阿翰（本名曾文翰），因模仿算命阿姨於網路上一夕爆紅，在眾多草根角色中穿梭的阿翰，曾透露自己模仿的起點，僅是為了保護和掩飾自己。求學階段的他因聲線較高、個性內向、陰柔特質，經常受到同儕嘲笑，因此讓阿翰在模仿他人時較自在，做自己時卻深感困難。阿翰在自我懷疑與認同的過程中飽受折磨，直到遇見生命中的貴人及朋友後，才開始建立自信、找回自我。
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    「我」是固定不變的嗎？求學階段與現在的阿翰，除了生理、外貌的成熟，他的能力、個性、價值觀都可能因一路上的學習、經驗和接觸的人事物而有所不同。正因為「我」具有可塑性，可以改變，可以成長，因此無論何時、何地、何處，我們都有權利傾聽自己的內心，練習選擇想要成為什麼樣的人。
                  </p>

                  {/* Textbook interactive player mock */}
                  <div className="border border-slate-200 rounded-3xl overflow-hidden bg-slate-950 text-white shadow-lg">
                    <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-slate-300 font-mono uppercase tracking-wider">
                          Video Player | 曾文翰的生命故事
                        </span>
                      </div>
                      <span className="text-[9px] text-slate-500 font-mono">CH2 / 課堂精選影片</span>
                    </div>

                    <div className="p-4 bg-gradient-to-tr from-slate-950 to-rose-950/40 relative min-h-[140px] flex flex-col justify-between">
                      {/* Subtitle / Quote Overlay */}
                      <div className="text-center space-y-1.5 py-2">
                        <p className="text-xs sm:text-sm font-black text-amber-300 font-sans tracking-wide">
                          「模仿雖然是我的防衛機制，但也讓我看見：當我認真做自己的時候，全世界都會為我笑。」
                        </p>
                        <p className="text-[10px] text-slate-400">
                          ── 知名創作者 • 阿翰 (曾文翰)
                        </p>
                      </div>

                      {/* Interactive Player Controls */}
                      <div className="bg-slate-900/80 backdrop-blur-xs p-2.5 rounded-xl border border-slate-800/80 flex items-center justify-between gap-3 mt-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => setIsHanPlaying(!isHanPlaying)}
                            className="p-1.5 bg-rose-600 hover:bg-rose-700 rounded-full text-white transition-all"
                          >
                            {isHanPlaying ? (
                              <div className="w-3.5 h-3.5 flex justify-center items-center gap-0.5">
                                <span className="w-1 h-3 bg-white rounded-xs" />
                                <span className="w-1 h-3 bg-white rounded-xs" />
                              </div>
                            ) : (
                              <svg className="w-3.5 h-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            )}
                          </button>
                          <span className="text-[10px] text-slate-300 font-bold hidden sm:inline">阿翰的成長之路專訪</span>
                        </div>
                        <div className="flex-1 space-y-1 mx-2">
                          <div className="flex justify-between items-center text-[8px] text-slate-400 font-mono">
                            <span>阮月嬌與陰柔特質的破繭而出</span>
                            <span>{isHanPlaying ? "02:14 / 04:30" : "00:00 / 04:30"}</span>
                          </div>
                          <div className="h-1 bg-slate-800 rounded-full overflow-hidden relative">
                            <motion.div 
                              className="h-full bg-rose-500 rounded-full" 
                              style={{ width: isHanPlaying ? '50%' : '15%' }}
                              animate={{ width: isHanPlaying ? '100%' : '15%' }}
                              transition={isHanPlaying ? { duration: 256, ease: "linear" } : { duration: 0.3 }}
                            />
                          </div>
                        </div>
                        <span className="text-[9px] bg-slate-800 text-slate-400 px-2 py-1 rounded font-mono">1080p</span>
                      </div>
                    </div>
                  </div>

                  {/* Reflection input */}
                  <div className="bg-rose-50/20 border border-rose-100 p-4 rounded-2xl space-y-3">
                    <span className="text-[10px] bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-full font-black">
                      ✍️ 課堂深思學習單 (二)
                    </span>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-black text-slate-700 block">
                        💡 思考看看：阿翰的生命故事中，最讓你感到觸動的一句話、一個態度或一個片段是什麼？請結合自己的成長或對自我「可塑性」的覺察進行分享：
                      </label>
                      <textarea
                        disabled={isSubmitted}
                        value={answers.p50HanReflection || ''}
                        onChange={(e) => updateAnswer('p50HanReflection', e.target.value)}
                        placeholder="例如：我很被阿翰說的『當我認真做自己的時候，全世界都會為我笑』觸動。這讓我明白自我不是一成不變的，我們都有可塑性，不該被過去的嘲笑給框限..."
                        className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:outline-hidden focus:border-rose-500 bg-white"
                        rows={3}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 51: LIFE 心動力 ─ 我的過去、現在、未來 */}
              {currentPage === 51 && (
                <div id="page_51" className="space-y-5">
                  {/* Top Header */}
                  <div className="flex items-center justify-between border-b border-emerald-100 pb-2">
                    <span className="text-xs text-emerald-700 font-extrabold flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-emerald-500 animate-spin-slow" />
                      漫步奇幻的旅程 ▶ 051
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">051 | Unit 02</span>
                  </div>

                  {/* LIFE 心動力 header */}
                  <div className="flex items-center gap-3 bg-emerald-50/40 border border-emerald-100/50 p-4 rounded-2xl">
                    <div className="w-12 h-12 rounded-full bg-emerald-600 flex flex-col items-center justify-center text-white shrink-0 shadow-sm">
                      <span className="text-[9px] font-black tracking-widest leading-none">LIFE</span>
                      <span className="text-[10px] font-black leading-none mt-1">心動力</span>
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-emerald-950">｜我的過去、現在、未來｜</h3>
                      <p className="text-[11px] text-slate-600 leading-relaxed mt-1">
                        我們出生的那一刻，像揚帆啟程的船，開始了生命大海的航行。請依照下列表格的敘述，完成你的過去、現在、未來。
                      </p>
                    </div>
                  </div>

                  {/* Time Matrix side-by-side Table */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Column 1: 過去的自己 */}
                    <div className="border border-indigo-100 bg-indigo-50/5 p-4.5 rounded-2xl space-y-4 shadow-2xs relative">
                      <div className="absolute top-3 right-3 text-lg font-bold text-indigo-300">⏳</div>
                      <h4 className="text-xs font-black text-indigo-950 border-b border-indigo-100/60 pb-2 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-indigo-500" />
                        過去的自己 (例如：國中或更早)
                      </h4>

                      {/* Row 01 */}
                      <div className="space-y-1.5">
                        <label className="text-[10.5px] font-bold text-slate-700 block">
                          <span className="text-indigo-600 font-extrabold mr-1">01</span> 用一個圖案或形狀呈現當時的你可能的狀態。
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            { sym: '🔴', label: '緊繃防備' },
                            { sym: '🔺', label: '尖銳敏感' },
                            { sym: '🟩', label: '安穩沈默' },
                            { sym: '⭐', label: '期待發光' },
                            { sym: '☁️', label: '迷惘游離' }
                          ].map(opt => {
                            const isSel = answers.p51PastSymbol === opt.sym;
                            return (
                              <button
                                key={opt.sym}
                                disabled={isSubmitted}
                                onClick={() => updateAnswer('p51PastSymbol', opt.sym)}
                                className={`px-2 py-1 text-[10px] font-bold rounded-lg border transition-all ${
                                  isSel
                                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                }`}
                              >
                                {opt.sym} {opt.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Row 02 */}
                      <div className="space-y-1">
                        <label className="text-[10.5px] font-bold text-slate-700 block">
                          <span className="text-indigo-600 font-extrabold mr-1">02</span> 生命歷程中，可能有哪個重大的經驗讓你難以忘記呢？
                        </label>
                        <input
                          type="text"
                          disabled={isSubmitted}
                          value={answers.p51PastExperience || ''}
                          onChange={(e) => updateAnswer('p51PastExperience', e.target.value)}
                          placeholder="例如：英文演講比賽忘詞、轉學適應..."
                          className="w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500 bg-white"
                        />
                      </div>

                      {/* Row 03 */}
                      <div className="space-y-1">
                        <label className="text-[10.5px] font-bold text-slate-700 block">
                          <span className="text-indigo-600 font-extrabold mr-1">03</span> 這件重大經驗對當時的你，可能帶來什麼樣的情緒感受？
                        </label>
                        <input
                          type="text"
                          disabled={isSubmitted}
                          value={answers.p51PastEmotion || ''}
                          onChange={(e) => updateAnswer('p51PastEmotion', e.target.value)}
                          placeholder="例如：非常沮喪、尷尬、害怕面對眾人..."
                          className="w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500 bg-white"
                        />
                      </div>

                      {/* Row 04 */}
                      <div className="space-y-1">
                        <label className="text-[10.5px] font-bold text-slate-700 block">
                          <span className="text-indigo-600 font-extrabold mr-1">04</span> 這件重大經驗對當時的你，可能帶來哪些影響？
                        </label>
                        <input
                          type="text"
                          disabled={isSubmitted}
                          value={answers.p51PastImpact || ''}
                          onChange={(e) => updateAnswer('p51PastImpact', e.target.value)}
                          placeholder="例如：有一段時間非常排斥在大家面前大聲說話..."
                          className="w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500 bg-white"
                        />
                      </div>

                      {/* Row 05 */}
                      <div className="space-y-1">
                        <label className="text-[10.5px] font-bold text-slate-700 block">
                          <span className="text-indigo-600 font-extrabold mr-1">05</span> 用一句話給這時期的自己一個祝福或安慰。
                        </label>
                        <input
                          type="text"
                          disabled={isSubmitted}
                          value={answers.p51PastBlessing || ''}
                          onChange={(e) => updateAnswer('p51PastBlessing', e.target.value)}
                          placeholder="例如：沒關係的，這只是成長的一小步，你已經很棒了..."
                          className="w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-indigo-500 bg-white"
                        />
                      </div>
                    </div>

                    {/* Column 2: 現在的自己 */}
                    <div className="border border-teal-100 bg-teal-50/5 p-4.5 rounded-2xl space-y-4 shadow-2xs relative">
                      <div className="absolute top-3 right-3 text-lg font-bold text-teal-300">🌱</div>
                      <h4 className="text-xs font-black text-teal-950 border-b border-teal-100/60 pb-2 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-teal-500" />
                        現在的自己 (高中當下的我)
                      </h4>

                      {/* Row 01 */}
                      <div className="space-y-1.5">
                        <label className="text-[10.5px] font-bold text-slate-700 block">
                          <span className="text-teal-600 font-extrabold mr-1">01</span> 用一個圖案 or 形狀呈現現在的你可能的狀態。
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {[
                            { sym: '🔴', label: '緊繃防備' },
                            { sym: '🔺', label: '尖銳敏感' },
                            { sym: '🟩', label: '安穩沈默' },
                            { sym: '⭐', label: '期待發光' },
                            { sym: '☁️', label: '迷惘游離' }
                          ].map(opt => {
                            const isSel = answers.p51PresentSymbol === opt.sym;
                            return (
                              <button
                                key={opt.sym}
                                disabled={isSubmitted}
                                onClick={() => updateAnswer('p51PresentSymbol', opt.sym)}
                                className={`px-2 py-1 text-[10px] font-bold rounded-lg border transition-all ${
                                  isSel
                                    ? 'bg-teal-600 text-white border-teal-600 shadow-xs'
                                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                                }`}
                              >
                                {opt.sym} {opt.label}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Row 02 */}
                      <div className="space-y-1">
                        <label className="text-[10.5px] font-bold text-slate-700 block">
                          <span className="text-teal-600 font-extrabold mr-1">02</span> 生命歷程中，可能有哪個重大的經驗讓你難以忘記呢？
                        </label>
                        <input
                          type="text"
                          disabled={isSubmitted}
                          value={answers.p51PresentExperience || ''}
                          onChange={(e) => updateAnswer('p51PresentExperience', e.target.value)}
                          placeholder="例如：高中生命教育課的討論、參加社團..."
                          className="w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-500 bg-white"
                        />
                      </div>

                      {/* Row 03 */}
                      <div className="space-y-1">
                        <label className="text-[10.5px] font-bold text-slate-700 block">
                          <span className="text-teal-600 font-extrabold mr-1">03</span> 這件重大經驗對現在的你，可能帶來什麼樣的情緒感受？
                        </label>
                        <input
                          type="text"
                          disabled={isSubmitted}
                          value={answers.p51PresentEmotion || ''}
                          onChange={(e) => updateAnswer('p51PresentEmotion', e.target.value)}
                          placeholder="例如：感到探索的喜悅、踏實、有了歸屬感..."
                          className="w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-500 bg-white"
                        />
                      </div>

                      {/* Row 04 */}
                      <div className="space-y-1">
                        <label className="text-[10.5px] font-bold text-slate-700 block">
                          <span className="text-teal-600 font-extrabold mr-1">04</span> 這件重大經驗對現在的你，可能帶來哪些影響？
                        </label>
                        <input
                          type="text"
                          disabled={isSubmitted}
                          value={answers.p51PresentImpact || ''}
                          onChange={(e) => updateAnswer('p51PresentImpact', e.target.value)}
                          placeholder="例如：更願意與人交流，能客觀看待自我可塑性..."
                          className="w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-500 bg-white"
                        />
                      </div>

                      {/* Row 05 */}
                      <div className="space-y-1">
                        <label className="text-[10.5px] font-bold text-slate-700 block">
                          <span className="text-teal-600 font-extrabold mr-1">05</span> 用一句話給這時期的自己一個祝福或安慰。
                        </label>
                        <input
                          type="text"
                          disabled={isSubmitted}
                          value={answers.p51PresentBlessing || ''}
                          onChange={(e) => updateAnswer('p51PresentBlessing', e.target.value)}
                          placeholder="例如：繼續勇敢朝著理想中的自己前進吧！"
                          className="w-full text-xs p-2 border border-slate-200 rounded-lg focus:outline-hidden focus:border-teal-500 bg-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Future vision */}
                  <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-white border border-emerald-100 p-4 rounded-2xl space-y-2 relative overflow-hidden">
                    <div className="absolute -bottom-4 -right-2 opacity-15">
                      <svg className="w-16 h-16 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                      </svg>
                    </div>
                    <h4 className="text-xs font-black text-emerald-950 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
                      未來的自己
                    </h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      針對過去與現在經歷的事情，你覺得可能會為未來的你，帶來哪些方面的成長或影響呢？
                    </p>
                    <textarea
                      disabled={isSubmitted}
                      value={answers.p51FutureGrowth || ''}
                      onChange={(e) => updateAnswer('p51FutureGrowth', e.target.value)}
                      placeholder="例如：過去的忘詞挫折讓我現在更注重準備，而現在討論課的收穫讓我相信自己可以長成更有同理心、更具備主體思辨力的未來自己..."
                      className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:outline-hidden focus:border-emerald-500 bg-white relative z-10"
                      rows={3}
                    />
                  </div>
                </div>
              )}
{/* PAGE 52: 生命的網絡 ─ 主體與客體 */}
              {currentPage === 52 && (
                <div id="page_52" className="space-y-4">
                  <div className="flex items-center justify-between border-b border-sky-100 pb-2">
                    <span className="text-xs text-sky-700 font-extrabold flex items-center gap-1">
                      <Compass className="w-4 h-4 text-sky-500" />
                      第 3 章：生命的網絡 ─ 你我他（主體與客體）
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">052 | CH2 / 人學探索</span>
                  </div>

                  {/* Definition Table */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="bg-sky-50/50 border border-sky-100 p-4 rounded-2xl space-y-2">
                      <h4 className="text-xs font-black text-sky-950 flex items-center gap-1">
                        <span className="text-base">👤</span> 什麼是「主體」 (Subject)？
                      </h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        具有<strong>自我意識、自由意志、思考能力與道德自覺</strong>的人。主體能主動做出判斷，並且勇於對自己的選擇承擔道德責任。主體在哲學上是「目的」本身，具有不可侵犯的尊嚴，不能被任意折舊或取代。
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-200/60 p-4 rounded-2xl space-y-2">
                      <h4 className="text-xs font-black text-slate-800 flex items-center gap-1">
                        <span className="text-base">📦</span> 什麼是「客體」 (Object)？
                      </h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        沒有自由意志，被動地被觀看、被評價、被操縱或被支配的事物。在生活中，凡是將他人當作「純粹達成某種目的的工具或媒介」（即工具化/物化），便是將對方視為客體，貶抑了其人格尊嚴。
                      </p>
                    </div>
                  </div>

                  {/* Interactive Challenge Section */}
                  <div className="bg-amber-50/30 border border-amber-200/50 p-4 rounded-2xl space-y-3">
                    <span className="text-[9px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-black">
                      ⚖️ 哲學法庭：判讀人際關係中的「客體化（工具化）」
                    </span>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      請仔細閱讀以下三個生活案例，在每個案例下方，點選判定該行為是「尊重的對待（主體）」還是「客體化/工具化」的行徑，並看看哲學解析：
                    </p>

                    <div className="space-y-3.5">
                      {/* Case 1 */}
                      <div className="bg-white p-3 rounded-xl border border-slate-100 space-y-2">
                        <div className="text-[11px] font-black text-slate-800 leading-relaxed">
                          📌 案例 A：小敏平時很少和班長講話。但因為班長人緣極佳，聖誕節時，小敏為了能融入班上核心圈、並好搭便車，假裝熱心地送昂貴聖誕卡給班長。
                        </div>
                        <div className="flex gap-2">
                          {[
                            { key: 'object', label: '❌ 客體化/工具化' },
                            { key: 'subject', label: '✔️ 尊重主體價值' }
                          ].map(btn => {
                            const isSel = (answers.p52CaseA === btn.key);
                            return (
                              <button
                                key={btn.key}
                                disabled={isSubmitted}
                                onClick={() => updateAnswer('p52CaseA', btn.key)}
                                className={`px-3 py-1.5 text-[10.5px] font-bold rounded-lg border transition-all ${
                                  isSel
                                    ? btn.key === 'object' ? 'bg-rose-600 text-white border-rose-600' : 'bg-emerald-600 text-white border-emerald-600'
                                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                                }`}
                              >
                                {btn.label}
                              </button>
                            );
                          })}
                        </div>
                        {answers.p52CaseA === 'object' && (
                          <p className="text-[10px] text-rose-700 bg-rose-50 p-2 rounded-lg font-medium leading-relaxed">
                            💡 哲思解析：完全正確！小敏是把班長當作「高人緣社交圈」與「免費便車」的工具（客體）對待，而非真心尊重班長作為一個人的主體價值。這是一種人際工具化。
                          </p>
                        )}
                      </div>

                      {/* Case 2 */}
                      <div className="bg-white p-3 rounded-xl border border-slate-100 space-y-2">
                        <div className="text-[11px] font-black text-slate-800 leading-relaxed">
                          📌 案例 B：在分組報告中，小豪做事速度慢、口才不佳，組長阿強沒有排擠他，而是耐心引導、並分配小豪擅長的「繪圖與排版」任務，一同完成報告。
                        </div>
                        <div className="flex gap-2">
                          {[
                            { key: 'object', label: '❌ 客體化/工具化' },
                            { key: 'subject', label: '✔️ 尊重主體價值' }
                          ].map(btn => {
                            const isSel = (answers.p52CaseB === btn.key);
                            return (
                              <button
                                key={btn.key}
                                disabled={isSubmitted}
                                onClick={() => updateAnswer('p52CaseB', btn.key)}
                                className={`px-3 py-1.5 text-[10.5px] font-bold rounded-lg border transition-all ${
                                  isSel
                                    ? btn.key === 'object' ? 'bg-rose-600 text-white border-rose-600' : 'bg-emerald-600 text-white border-emerald-600'
                                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                                }`}
                              >
                                {btn.label}
                              </button>
                            );
                          })}
                        </div>
                        {answers.p52CaseB === 'subject' && (
                          <p className="text-[10px] text-emerald-700 bg-emerald-50 p-2 rounded-lg font-medium leading-relaxed">
                            💡 哲思解析：完全正確！阿強看見並尊重小豪作為共同學術主體的獨特性，沒有將他排除或降格為完成報告的累贅，而是引導他適得其所，這是極佳的互為主體尊重。
                          </p>
                        )}
                      </div>

                      {/* Case 3 */}
                      <div className="bg-white p-3 rounded-xl border border-slate-100 space-y-2">
                        <div className="text-[11px] font-black text-slate-800 leading-relaxed">
                          📌 案例 C：小美深愛男友。為了討男友歡心、不被拋棄，她委曲求全答應男友所有不合理要求（例如代寫論文、給予高額零用錢）。
                        </div>
                        <div className="flex gap-2">
                          {[
                            { key: 'object', label: '❌ 自我客體化' },
                            { key: 'subject', label: '✔️ 保有主體尊嚴' }
                          ].map(btn => {
                            const isSel = (answers.p52CaseC === btn.key);
                            return (
                              <button
                                key={btn.key}
                                disabled={isSubmitted}
                                onClick={() => updateAnswer('p52CaseC', btn.key)}
                                className={`px-3 py-1.5 text-[10.5px] font-bold rounded-lg border transition-all ${
                                  isSel
                                    ? btn.key === 'object' ? 'bg-rose-600 text-white border-rose-600' : 'bg-emerald-600 text-white border-emerald-600'
                                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                                }`}
                              >
                                {btn.label}
                              </button>
                            );
                          })}
                        </div>
                        {answers.p52CaseC === 'object' && (
                          <p className="text-[10px] text-rose-700 bg-rose-50 p-2 rounded-lg font-medium leading-relaxed">
                            💡 哲思解析：完全正確！這是一種<strong>「自我客體化（Self-objectification）」</strong>。小美為了迎合他人而放棄了自己的意志、判斷和底線，自願退化為取悅對方的「工具（客體）」，踐踏了自己的人格尊嚴。
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-black text-slate-700 block">
                      💡 哲思課堂省思：在你的日常人際交往中，你是否也曾經「將別人當作工具（客體）」對待？或者「自我客體化」去取悅他人？我們應該如何打破這種不對等的關係？
                    </label>
                    <textarea
                      disabled={isSubmitted}
                      value={answers.p52ScenarioReflection || ''}
                      onChange={(e) => updateAnswer('p52ScenarioReflection', e.target.value)}
                      placeholder="例如：我發現我也曾犯了人際工具化。國中時因為班上某位同學家裡很有錢、有很多最新款遊戲，我為了玩遊戲才假裝去陪他，而不是真正關心他。這種做法忽視了對方的主體感受。要打破這種關係，我們應該用平等的「我與你（I-Thou）」真誠態度去交流，看重人本身而非對方的附加價值..."
                      className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-sky-500 bg-white"
                      rows={2}
                    />
                  </div>
                </div>
              )}

              {/* PAGE 53: MIND 田捕手 ─ 玩具總動員 */}
              {currentPage === 53 && (
                <div id="page_53" className="space-y-4">
                  <div className="flex items-center justify-between border-b border-amber-100 pb-2">
                    <span className="text-xs text-amber-700 font-extrabold flex items-center gap-1">
                      <Compass className="w-4 h-4 text-amber-500" />
                      第 3 章：MIND 田捕手 ─ 玩具總動員（關係與界線）
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">053 | CH2 / 人學探索</span>
                  </div>

                  {/* Toy story summary */}
                  <div className="bg-amber-50/20 border border-amber-100 p-4 rounded-2xl space-y-2.5">
                    <span className="text-[9px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-black">
                      電影思辨
                    </span>
                    <h4 className="text-xs font-black text-slate-800">玩具總動員：我是具有主體尊嚴的生命，還是隨時可丟的玩具？</h4>
                    <p className="text-[11px] text-slate-600 leading-relaxed">
                      電影《玩具總動員》中，女牛仔翠絲（Jessie）曾被主人艾蜜莉深深愛護，但隨著艾蜜莉長大、開始化妝、關注同儕社交，翠絲被冰冷地塞進了紙箱捐贈出去。這使翠絲留下極深的遺棄創傷，自認只是可以隨時拋棄的客體。直到遇見安迪（Andy）與胡迪，她才明白：在一個「相互體貼尊重、在乎彼此靈魂」的良善關係中，她可以被當作「主體」來真誠愛護。
                    </p>
                  </div>

                  {/* Standard Questions */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-[10.5px] font-bold text-slate-700 block leading-tight">
                        Q1. 影片中，娃娃主人艾蜜莉長大後將翠絲遺棄，這是在把翠絲當作「主體」還是「客體」呢？為什麼？
                      </label>
                      <textarea
                        disabled={isSubmitted}
                        value={answers.p53Q1 || ''}
                        onChange={(e) => updateAnswer('p53Q1', e.target.value)}
                        placeholder="例如：視為客體（物品）。因為隨著喜好改變，她就把玩具塞入紙箱，這代表主人與玩具之間只有支配、把玩與棄置的支配客體關係..."
                        className="w-full text-[11px] p-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 bg-white"
                        rows={2.5}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10.5px] font-bold text-slate-700 block leading-tight">
                        Q2. 我們對待「玩具/物品」和對待「人」，最大的不同在哪裡？我們可以用拋棄玩具的心態對待人我的承諾嗎？
                      </label>
                      <textarea
                        disabled={isSubmitted}
                        value={answers.p53Q2 || ''}
                        onChange={(e) => updateAnswer('p53Q2', e.target.value)}
                        placeholder="例如：人有自由意志與情感痛覺，本身就是尊嚴主體，不可用完即棄。我們不能用拋棄玩物的心態對待人際關係中的承諾與信任..."
                        className="w-full text-[11px] p-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 bg-white"
                        rows={2.5}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10.5px] font-bold text-slate-700 block leading-tight">
                        Q3. 人際交往中，如果一味把對方當作滿足慾望的「客體（工具）」，會造成什麼傷害？
                      </label>
                      <textarea
                        disabled={isSubmitted}
                        value={answers.p53Q3 || ''}
                        onChange={(e) => updateAnswer('p53Q3', e.target.value)}
                        placeholder="例如：會剝奪對方的主體自主權，造成對方的自尊受挫、感覺被利用和極度不安全感。這不符合互為主體的關懷..."
                        className="w-full text-[11px] p-2 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 bg-white"
                        rows={2.5}
                      />
                    </div>
                  </div>

                  {/* 6 cases section */}
                  <div className="bg-amber-50/10 border border-amber-100 p-4 rounded-2xl space-y-3">
                    <h4 className="text-xs font-black text-amber-950 flex items-center gap-1">
                      <Shield className="w-4 h-4 text-amber-500" />
                      🌟 關係紅綠燈：判定生活中 6 個「人我界線案例」
                    </h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                      底下的 6 個日常情境，是否侵犯了對方的主體尊嚴與人我界線？請在腦中思索，並寫下你的整體省思：
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10.5px]">
                      <div className="p-2 bg-white rounded-lg border border-slate-100 flex items-start gap-1.5">
                        <span className="text-rose-500 font-extrabold">🚨 01</span>
                        <p className="text-slate-600">我不喜歡 A 同學，於是我脅迫我的好朋友也不准跟 A 同學講話。<strong>(霸凌操縱)</strong></p>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-slate-100 flex items-start gap-1.5">
                        <span className="text-rose-500 font-extrabold">🚨 02</span>
                        <p className="text-slate-600">我太喜歡 B 同學了，因此我每天暗中尾隨他上下學、跟蹤他的回家路線。<strong>(侵犯界線)</strong></p>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-slate-100 flex items-start gap-1.5">
                        <span className="text-rose-500 font-extrabold">🚨 03</span>
                        <p className="text-slate-600">我覺得好玩好笑，就在班上大聲模仿嘲笑 C 同學的性別氣質與身體發育特徵。<strong>(語言歧視)</strong></p>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-slate-100 flex items-start gap-1.5">
                        <span className="text-rose-500 font-extrabold">🚨 04</span>
                        <p className="text-slate-600">我不認同 D 同學在網上的發表，於是我糾集大批帳號在留言區洗版侮辱他。<strong>(網路霸凌)</strong></p>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-slate-100 flex items-start gap-1.5">
                        <span className="text-rose-500 font-extrabold">🚨 05</span>
                        <p className="text-slate-600">家長為了孩子有穩定未來，擅自替孩子填寫志願、不允許他選擇真正喜歡的科系。<strong>(意志支配)</strong></p>
                      </div>
                      <div className="p-2 bg-white rounded-lg border border-slate-100 flex items-start gap-1.5">
                        <span className="text-rose-500 font-extrabold">🚨 06</span>
                        <p className="text-slate-600">某些跨國大企業為了壓低巧克力生產成本，默許非洲當地的童工在極惡劣的環境下超時勞動。<strong>(勞動剝削)</strong></p>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1.5 border-t border-amber-100/30">
                      <label className="text-[11px] font-black text-slate-700 block">
                        💡 判定省思：看完這 6 個橫跨「霸凌、親情、消費、全球貿易」的界線侵犯案例，這對我們理解人與人之間「不容侵犯的主體性」有何啟示？
                      </label>
                      <input
                        type="text"
                        disabled={isSubmitted}
                        value={answers.p53BoundariesReflection || ''}
                        onChange={(e) => updateAnswer('p53BoundariesReflection', e.target.value)}
                        placeholder="例如：我發現不管是出於『好玩』、甚至父母出於『愛護（為孩子好）』，只要強加意志、奪去別人的自主選擇權，就是侵犯尊嚴。這提醒我們隨時要守好人際界線..."
                        className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 54: 電話另一端的「人」 */}
              {currentPage === 54 && (
                <div id="page_54" className="space-y-4">
                  <div className="flex items-center justify-between border-b border-rose-100 pb-2">
                    <span className="text-xs text-rose-700 font-extrabold flex items-center gap-1">
                      <Compass className="w-4 h-4 text-rose-500" />
                      第 3 章：MIND 田捕手 ─ 電話另一端的「人」（人我關懷）
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">054 | CH2 / 人學探索</span>
                  </div>

                  {/* Customer support case detail */}
                  <div className="border border-rose-100 bg-rose-50/10 p-4 rounded-2xl space-y-3">
                    <span className="text-[9px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-black">
                      客服尊嚴與共感
                    </span>
                    <h4 className="text-xs font-black text-rose-950">
                      「接下來為您服務的是，我最愛的媽媽...」一首等候音扭轉言語霸凌
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      許多消費者打電話給電話客服時，常會因為系統故障或不耐煩，在電話接通時對著客服人員破口大罵，甚至使用侮辱性字眼，宣洩個人情緒。客戶往往忘記了：電話另一端，其實也是一個活生生、有自尊主體的「人」。
                    </p>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      某家企業為了解決員工飽受語言暴力的困擾，將通話等候音換成了員工孩子的童稚錄音：<strong>「現在準備要為您接聽的是，我最愛的媽媽/爸爸。請給他多一點耐心喔，謝謝您！」</strong> 沒想到，這句簡單的話在客戶心中喚醒了極大的悲憫。接通後，原本大發雷霆的暴躁客戶瞬間軟化，變得體貼且客氣。
                    </p>
                  </div>

                  {/* Empathy Questions */}
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-slate-700 block">
                        Q1. 如果你今天也坐在客服中心，耳機裡不斷傳來消費者粗野、侮辱性或不尊重的語言，你內心會有什麼感受？這對你的人格尊嚴會有什麼影響？
                      </label>
                      <textarea
                        disabled={isSubmitted}
                        value={answers.p54Q1 || ''}
                        onChange={(e) => updateAnswer('p54Q1', e.target.value)}
                        placeholder="例如：我會覺得極度委屈、憤怒與自我懷疑，感覺自己被當作垃圾桶，人格尊嚴被徹底踐踏，甚至排斥上班..."
                        className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-rose-500 bg-white"
                        rows={2}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-slate-700 block">
                        Q2. 為什麼一段小女孩的話語，能瞬間在聽者（客戶）心中引發 180 度的態度轉變？它在人們心中喚醒了什麼？
                      </label>
                      <textarea
                        disabled={isSubmitted}
                        value={answers.p54Q2 || ''}
                        onChange={(e) => updateAnswer('p54Q2', e.target.value)}
                        placeholder="例如：它打破了「冷冰冰的客服機器」的客體印象，將客服還原為「某人的父母」這個溫暖的生命主體。它喚醒了客戶每個人都有的家庭同理心..."
                        className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-rose-500 bg-white"
                        rows={2}
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-slate-700 block">
                        Q3. 在現代科技與通訊發達的今天（例如點外送、發網路留言、叫計程車），我們如何在生活中增加對其他陌生人「主體性」的尊重與關懷體貼？
                      </label>
                      <textarea
                        disabled={isSubmitted}
                        value={answers.p54Q3 || ''}
                        onChange={(e) => updateAnswer('p54Q3', e.target.value)}
                        placeholder="例如：在點外送時收到餐點，習慣地傳一句『辛苦了，謝謝您！』；在寫網路評論前，多想三秒這會不會傷害到別人。把隔著螢幕、電話的每個人，都當作一個獨立尊貴的『你』來對待..."
                        className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-rose-500 bg-white"
                        rows={2}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* PAGE 55: 科技人我 ─ 電影思辨對決 */}
              {currentPage === 55 && (
                <div id="page_55" className="space-y-4">
                  <div className="flex items-center justify-between border-b border-indigo-100 pb-2">
                    <span className="text-xs text-indigo-700 font-extrabold flex items-center gap-1">
                      <Compass className="w-4 h-4 text-indigo-500" />
                      第 3 章：科技人我 ─ 電影思辨大對決
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">055 | CH2 / 人學探索</span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    科技和人工智慧（AI）正在顛覆我們的主體性。究竟是我們在支配科技「客體」，還是我們正被科技「支配」而淪為附庸？點選下方按鈕，選擇影音院線，寫下你的終極生命教育哲學思辨：
                  </p>

                  {/* Cinema Movie Selection Tabs */}
                  <div className="flex border border-slate-800 rounded-2xl overflow-hidden bg-slate-900 p-1 gap-1">
                    <button
                      onClick={() => setActiveMovieTab('movieA')}
                      className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                        activeMovieTab === 'movieA'
                          ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <span>📱</span> 《原本以為只是手機掉了》
                    </button>
                    <button
                      onClick={() => setActiveMovieTab('movieB')}
                      className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                        activeMovieTab === 'movieB'
                          ? 'bg-purple-600 text-white shadow-md font-bold'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800'
                      }`}
                    >
                      <span>🤖</span> 《攻殼機動隊》
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    {activeMovieTab === 'movieA' ? (
                      <motion.div
                        key="movieA"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-3.5"
                      >
                        {/* Unlocked details */}
                        <div className="bg-amber-950/20 border border-amber-900/30 p-4 rounded-2xl space-y-2">
                          <h4 className="text-xs font-black text-amber-950 flex items-center gap-1.5">
                            🎬 【院線 A】原本以為只是手機掉了 (Unlocked)
                          </h4>
                          <p className="text-[11px] text-slate-600 leading-relaxed">
                            <strong>劇情核心：</strong> 主角不小心遺失了智慧型手機。沒想到，駭客利用手機內儲存的相簿、定位足跡、社交軟體發文、乃至聊天紀錄，不僅完全掌握主角的作息與財產，甚至偽裝主角的口吻向好友們群發訊息，斷絕其人際關係。主角的整個人格與社會主體地位，在無聲中被一個智慧黑盒子徹底篡奪與駭入。
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[11px] font-black text-slate-700 block">
                              Q1. 手機、雲端等本屬「客體」的裝置，在生活中如何反過來支配了身為「主體」的人類？
                            </label>
                            <textarea
                              disabled={isSubmitted}
                              value={answers.p55MovieAQ1 || ''}
                              onChange={(e) => updateAnswer('p55MovieAQ1', e.target.value)}
                              placeholder="例如：手機不再只是通訊工具。我們被演算法餵食、被按讚數焦慮制約、迷失在虛擬標籤中。一旦失去手機，我們就失去了安排日常生活、建立人際和確定自我存在的能力，主體被客體綁架..."
                              className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 bg-white"
                              rows={2.5}
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-black text-slate-700 block">
                              Q2. 當我們在網上的所有足跡、私密照片與搜尋紀錄都被看光，你覺得我們該如何保有完整的尊嚴自主？
                            </label>
                            <textarea
                              disabled={isSubmitted}
                              value={answers.p55MovieAQ2 || ''}
                              onChange={(e) => updateAnswer('p55MovieAQ2', e.target.value)}
                              placeholder="例如：我們要懂得「離線生活」與「數位排毒」，在真實世界建立實體的人我連結。不能把自我價值的定義權拱手讓給社群媒體，建立強大的內在靈魂韌性..."
                              className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-amber-500 bg-white"
                              rows={2.5}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="movieB"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="space-y-3.5"
                      >
                        {/* Ghost in the Shell details */}
                        <div className="bg-purple-950/10 border border-purple-900/20 p-4 rounded-2xl space-y-2">
                          <h4 className="text-xs font-black text-purple-950 flex items-center gap-1.5">
                            🎬 【院線 B】攻殼機動隊 (Ghost in the Shell)
                          </h4>
                          <p className="text-[11px] text-slate-600 leading-relaxed">
                            <strong>劇情核心：</strong> 在未來世界，人類的身體所有器官乃至手腳肉體，都能被義體科技（Shell）完全取代，僅留下大腦核心的意識、記憶與靈魂（Ghost）。劇中思考：當肉身完全成為被編程、可量產的機械客體時，究竟是什麼東西在證明「我是個人、而不是一堆鋼鐵和 AI」？
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <label className="text-[11px] font-black text-slate-700 block">
                              Q1. 當肉體完全能被更強大的機械代換時，你認為人與人工智慧、純粹機器的分界點到底在哪裡？
                            </label>
                            <textarea
                              disabled={isSubmitted}
                              value={answers.p55MovieBQ1 || ''}
                              onChange={(e) => updateAnswer('p55MovieBQ1', e.target.value)}
                              placeholder="例如：人有真正的生存痛苦、對生命有限性的自覺、以及對他者真切無私的悲憫愛護。這些「靈性需求、靈魂尊嚴與自我超越」是 AI 無法通過程式代碼模擬的..."
                              className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-purple-500 bg-white"
                              rows={2.5}
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-black text-slate-700 block">
                              Q2. 劇中探討的「Ghost（靈魂/意識）」對於人作為獨立生命的「主體」，具有什麼不可妥協的價值？
                            </label>
                            <textarea
                              disabled={isSubmitted}
                              value={answers.p55MovieBQ2 || ''}
                              onChange={(e) => updateAnswer('p55MovieBQ2', e.target.value)}
                              placeholder="例如：代表了自由意志、道德思考和承擔生命抉擇的能力。它是每個人獨一無二的靈性基石，使我們不致淪為被指令支配的生產工具（客體）"
                              className="w-full text-xs p-2.5 border border-slate-200 rounded-xl focus:outline-hidden focus:border-purple-500 bg-white"
                              rows={2.5}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* BOTTOM PAGINATION CONTROLS */}
        <div id="unit_02_pagination" className="flex items-center justify-between border-t border-slate-100 pt-4 mt-4">
          <button
            onClick={handlePrev}
            disabled={pages.indexOf(currentPage) === 0}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-slate-100 text-slate-700 font-extrabold text-xs rounded-xl flex items-center gap-1.5 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            上一頁
          </button>

          <span className="text-xs text-slate-400 font-extrabold font-mono">
            {pages.indexOf(currentPage) + 1} / {pages.length} 頁
          </span>

          <button
            onClick={handleNext}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-2xs cursor-pointer"
          >
            {pages.indexOf(currentPage) === pages.length - 1 ? '完成單元 ➔' : '下一頁'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
