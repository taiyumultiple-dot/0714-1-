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
  Tv
} from 'lucide-react';

interface Unit01TextbookPageViewerProps {
  answers: Record<string, any>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  role: 'student' | 'teacher';
  isSubmitted: boolean;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

// Full chapters list of Unit 1 matching textbook outline
export const CHAPTERS_NAV_UNIT_01 = [
  { page: 14, title: "第1章：行前閱讀：品嚐思考的樂趣", tag: "第一章", emoji: "🍎", desc: "博鈞、可華與曉萍的籃球場對話，探討推論與他人心靈。" },
  { page: 15, title: "第1章：行前暖身：思維暖身大對決", tag: "第一章", emoji: "🧩", desc: "九點連線大考驗、誠實村與說謊村的雙重否定邏輯。" },
  { page: 16, title: "第1章：一、洞悉慣性的思考", tag: "第一章", emoji: "🐝", desc: "蜜蜂與蒼蠅故事的啟示，洞悉慣性思考，擺脫衝動與成規。" },
  { page: 17, title: "第1章：二、思考的三個層次", tag: "第一章", emoji: "📊", desc: "反應式思考、運用性思考、批判性思考的三個核心層次對決。" },
  { page: 18, title: "第1章：三、覺察與消除偏見", tag: "第一章", emoji: "👁️", desc: "釐清刻板印象、偏見與歧視的遞進關係，電影《關鍵少數》探究。" },
  { page: 19, title: "第1章：四、拋開思考謬誤", tag: "第一章", emoji: "🏹", desc: "直覺推論「不帶課本 = 不信任」的合理性思辨，矇眼射箭與辨識謬誤。" },
  { page: 20, title: "常見的九種謬誤類型", tag: "第一章", emoji: "🚨", desc: "非黑即白、以偏概全、滑坡、稻草人、人身攻擊等九大常見謬誤。" },
  { page: 21, title: "認識偵查站——這樣說，有問題？", tag: "第一章", emoji: "🔍", desc: "LIFE 心動力：課堂實戰謬誤配對，自我檢測邏輯思維與學理反思。" },
  { page: 22, title: "第二章：一 善用邏輯思考：亞里斯多德的三段論", tag: "第二章", emoji: "🏛️", desc: "大前提、小前提、結論；以畢卡索生命歷程為例，了解三段論的結構。" },
  { page: 23, title: "推論與邏輯：如何建立有效推論", tag: "第二章", emoji: "🕵️", desc: "探索柯南與福爾摩斯推理真相的思考過程，親自動手練習寫下三段論。" },
  { page: 24, title: "健全論證的條件：因果關係若P則Q", tag: "第二章", emoji: "🌧️", desc: "健全論證的兩大要件、肯定前件形式，以及防範『地濕等於下大雨』的因果謬誤。" },
  { page: 25, title: "常見的四種論證形式：心動力配對", tag: "第二章", emoji: "🧠", desc: "肯定前件、否定後件、假言三段論、選言三段論的配對與推理實戰。" },
  { page: 26, title: "二 正確思考三部曲：跌倒故事思辨", tag: "第二章", emoji: "🏃‍♀️", desc: "掌握事實、分辨價值、正確判斷；曉萍在大隊接力跌倒自責案例探究。" },
  { page: 27, title: "三 有效推理成為直覺：炎上事件分析", tag: "第二章", emoji: "🔥", desc: "網路社群『炎上』與正義魔人现象，運用5W1H與思考三部曲進行理性分析。" },
  { page: 28, title: "四 三「思」而後「行」：超車事故案例", tag: "第二章", emoji: "🏍️", desc: "從過彎超車自撞的嚴重交通事故，剖析交通安全背後的事實、價值與正確抉擇。" },
  { page: 29, title: "MIND田捕手：行人路權優先與防禦駕駛", tag: "第二章", emoji: "🚶", desc: "停讓行人新制、防禦駕駛觀念、用路安全的邏輯推理，以及行人與駕駛雙向換位思考。" },
  { page: 30, title: "第三章：思考的幸福方程式 ─ 思考的點線面", tag: "第三章", emoji: "🐘", desc: "探索覺察侷限、盲人摸象與認知偏見的哲學思維。" },
  { page: 31, title: "MIND 田捕手 ─ 網路謠言，你還在傳嗎", tag: "第三章", emoji: "📡", desc: "分析網路精子數謠言，學會保持暫時懷疑與持續探究的態度。" },
  { page: 32, title: "保持客觀，換位思考 ─ 誰可以坐博愛座？", tag: "第三章", emoji: "♿", desc: "擺脫情緒感染，培養悲憫胸懷，換位思考捷運博愛座的隱性需求。" },
  { page: 33, title: "立場不必中立，態度必須公正 ─ AI 寫作業", tag: "第三章", emoji: "🤖", desc: "理解立場與公正的平衡，探討 ChatGPT 寫作業對教育與思考的衝擊。" },
  { page: 34, title: "二、思考你的思考 ─ 讓思考成為你的習慣 (上)", tag: "第三章", emoji: "💗", desc: "認識後設思考，分析加拿大高中生粉紅 T 恤聲援霸凌的故事與預設立場。" },
  { page: 35, title: "讓思考成為你的習慣 (下) ─ 毋意毋必毋固毋我", tag: "第三章", emoji: "🎓", desc: "反思霸凌情境中的思考態度，結合孔子的智慧進行心靈理性公正的探索。" }
];

export default function Unit01TextbookPageViewer({
  answers,
  setAnswers,
  role,
  isSubmitted,
  currentPage: controlledPage,
  onPageChange
}: Unit01TextbookPageViewerProps) {
  const [localPage, setLocalPage] = useState<number>(14);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const currentPage = controlledPage !== undefined ? controlledPage : localPage;

  const setCurrentPage = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    } else {
      setLocalPage(page);
    }
    
    // Auto-update read pages tracker for Unit 01
    if (role === 'student' && !isSubmitted) {
      const readPages = answers.textbookReadPages || [14];
      if (!readPages.includes(page)) {
        updateAnswer('textbookReadPages', [...readPages, page]);
      }
    }
  };

  const pages = CHAPTERS_NAV_UNIT_01.map(ch => ch.page);

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

  const readPagesList = answers.textbookReadPages || [14];
  const readPagesCount = readPagesList.filter(p => pages.includes(p)).length || 1;
  const readPagesTotal = pages.length;

  // Nine-Dots Puzzle Interactive States
  const [nineDotsPath, setNineDotsPath] = useState<number[]>([]);
  const [showNineDotsSolution, setShowNineDotsSolution] = useState<boolean>(false);
  const [nineDotsMessage, setNineDotsMessage] = useState<string>('');

  // Riddle (誠實村與說謊村) States
  const [selectedRiddleOption, setSelectedRiddleOption] = useState<string | null>(null);

  // Page 16: Bee & Fly Interactive Choice
  const [beeFlyChoice, setBeeFlyChoice] = useState<'bee' | 'fly' | null>(null);

  // Page 17: Active Thinking Level
  const [activeThinkingCard, setActiveThinkingCard] = useState<'初階' | '中階' | '高階' | null>(null);
  const [showMockVideo, setShowMockVideo] = useState<boolean>(false);

  // Page 18: Bias Progression Step
  const [activeBiasStep, setActiveBiasStep] = useState<'stereotype' | 'prejudice' | 'discrimination'>('stereotype');

  // Page 19: Blind Archery Game
  const [archeryState, setArcheryState] = useState<'idle' | 'shooting' | 'hit' | 'miss'>('idle');
  const [archeryBlindfolded, setArcheryBlindfolded] = useState<boolean>(true);

  // Page 20: Selected Fallacy Detail Card
  const [selectedFallacyIndex, setSelectedFallacyIndex] = useState<number | null>(null);

  // Chapter 2 State Variables
  const [p22ActiveTab, setP22ActiveTab] = useState<'picasso' | 'custom'>('picasso');
  const [p24ActiveTab, setP24ActiveTab] = useState<'valid' | 'invalid'>('valid');
  const [p26ActiveTab, setP26ActiveTab] = useState<'fact' | 'value' | 'judgment'>('fact');
  const [p28ActiveTab, setP28ActiveTab] = useState<'fact' | 'value' | 'judgment'>('fact');

  // Chapter 3 State Variables
  const [p30ActiveTab, setP30ActiveTab] = useState<'authority' | 'blackwhite'>('authority');
  const [p32ActiveSocraticStep, setP32ActiveSocraticStep] = useState<'fact' | 'extreme' | 'action'>('fact');
  const [showRuler, setShowRuler] = useState<boolean>(false);
  const [activeElephantPart, setActiveElephantPart] = useState<'spear' | 'rope' | 'fan' | 'trunk' | null>(null);
  const [stickerIcon, setStickerIcon] = useState<string>('🩹');
  const [stickerColor, setStickerColor] = useState<string>('blue');
  const [stickerText, setStickerText] = useState<string>('隱性需求，請多包涵');

  // Clear 9 dots drawing
  const resetNineDots = () => {
    setNineDotsPath([]);
    setNineDotsMessage('');
  };

  // Click handler for 9 dots
  const handleDotClick = (index: number) => {
    if (showNineDotsSolution) return;
    if (nineDotsPath.includes(index)) {
      // Remove it and subsequent paths
      const idx = nineDotsPath.indexOf(index);
      setNineDotsPath(nineDotsPath.slice(0, idx));
    } else {
      if (nineDotsPath.length >= 5) {
        setNineDotsMessage('線段數量最多連接 5 個轉折點喔！可以按重設再次嘗試。');
        return;
      }
      const newPath = [...nineDotsPath, index];
      setNineDotsPath(newPath);
      
      // Basic lateral thinking check
      if (newPath.length === 5) {
        setNineDotsMessage('好嘗試！在傳統 3x3 網格限制內，若不畫出格線，是無法用四條線一氣呵成連起所有九個點的。這道題的關鍵在於「跳脫框架 (Thinking outside the box)」，把線畫到格子外面！點擊下方「顯示答案」看解答吧！');
      }
    }
  };

  return (
    <div id="unit01-textbook-root" className="bg-amber-50/20 rounded-3xl border border-amber-100 p-2 sm:p-5 space-y-4">
      
      {/* Interactive Ribbon / Controls Header */}
      <div id="unit01-header-ribbon" className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gradient-to-r from-amber-100/60 to-amber-50/40 border border-amber-200/50 px-4 py-3.5 rounded-2xl gap-3">
        <div className="flex items-center gap-2.5">
          <button
            id="unit01-toggle-sidebar-btn"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 bg-white rounded-xl border border-amber-200 text-amber-800 hover:bg-amber-50 transition-colors flex items-center gap-1.5 shadow-2xs hover:border-amber-300 cursor-pointer"
            title={isSidebarOpen ? "隱藏目錄側邊欄" : "展開目錄側邊欄"}
          >
            <Menu className="w-4 h-4" />
            <span className="text-[11px] font-black hidden sm:inline">
              {isSidebarOpen ? "收合目錄" : "快速目錄"}
            </span>
          </button>
          <div className="flex flex-col">
            <span className="text-[11px] font-black text-amber-950 flex items-center gap-1">
              <BookOpen className="w-4 h-4 text-amber-600" />
              泰宇生命教育：單元一 哲學思考 (數位對照互動模式)
            </span>
            <span className="text-[10px] text-amber-850 font-bold hidden sm:inline">
              對照紙本課本 p.014 ~ p.033 頁。課文、情境與課堂暖身 100% 完整收錄！
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto bg-white/70 px-3.5 py-1.5 rounded-xl border border-amber-150">
          <div className="flex flex-col items-end">
            <span className="text-[9px] text-gray-400 font-extrabold uppercase">閱讀進度</span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-amber-950 font-sans">
                已讀 {readPagesCount} / {readPagesTotal} 頁
              </span>
              <span className="text-[10px] text-white font-extrabold bg-amber-650 px-2 py-0.5 rounded-full">
                {Math.round((readPagesCount / readPagesTotal) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-5">
        
        {/* SIDEBAR NAVIGATION */}
        <AnimatePresence initial={false}>
          {isSidebarOpen && (
            <motion.div
              id="unit01-sidebar-nav"
              initial={{ width: 0, opacity: 0, x: -10 }}
              animate={{ width: "300px", opacity: 1, x: 0 }}
              exit={{ width: 0, opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full lg:w-[300px] shrink-0 border border-amber-100 bg-white/90 backdrop-blur-xs rounded-2xl shadow-3xs overflow-hidden flex flex-col"
            >
              <div id="unit01-sidebar-header" className="p-3 border-b border-amber-100 bg-amber-50/50 flex items-center justify-between">
                <span className="text-[11px] font-black text-amber-950 flex items-center gap-1">
                  🗺️ 課本指定頁面導覽
                </span>
                <span className="text-[9px] text-amber-600 bg-amber-100/50 px-1.5 py-0.5 rounded-md font-bold">
                  快速跳頁
                </span>
              </div>
              
              <div id="unit01-sidebar-scroll" className="p-2 space-y-1">
                {CHAPTERS_NAV_UNIT_01.map((ch) => {
                  const isActive = currentPage === ch.page;
                  const hasRead = readPagesList.includes(ch.page);
                  return (
                    <button
                      id={`unit01-sidebar-btn-${ch.page}`}
                      key={ch.page}
                      onClick={() => setCurrentPage(ch.page)}
                      className={`w-full text-left p-2 rounded-xl border transition-all flex items-start gap-2 cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-br from-amber-600 to-amber-700 border-amber-500 text-white shadow-xs font-bold'
                          : 'bg-white border-slate-100 hover:border-amber-200 hover:bg-amber-50/20'
                      }`}
                    >
                      <span className="text-base pt-0.5">{ch.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <span className={`text-[9px] px-1.5 py-0.2 rounded-md font-black uppercase tracking-wider ${
                            isActive
                              ? 'bg-white/20 text-amber-50'
                              : 'bg-amber-100/70 text-amber-900'
                          }`}>
                            p.{String(ch.page).padStart(3, '0')} · {ch.tag}
                          </span>
                          
                          {hasRead && (
                            <span className={`text-[9px] font-extrabold flex items-center gap-0.5 ${isActive ? 'text-white' : 'text-emerald-600 bg-emerald-50 px-1.5 py-0.2 rounded-md border border-emerald-100/50'}`}>
                              <Check className="w-2.5 h-2.5 stroke-[3]" /> 已讀
                            </span>
                          )}
                        </div>
                        <h4 className={`text-[11px] leading-snug font-black truncate ${isActive ? 'text-white' : 'text-slate-800'}`}>
                          {ch.title.replace(/^\d+\s*#\s*哲學思考：/, "")}
                        </h4>
                        <span className={`text-[9px] font-medium block truncate ${isActive ? 'text-amber-100/80' : 'text-gray-400'}`}>
                          {ch.desc}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Textbook Page Container */}
        <div id="unit01-textbook-container" className="flex-1 relative min-h-[550px] bg-white rounded-2xl border border-gray-150 shadow-3xs overflow-hidden flex flex-col justify-between">
          <div className="absolute inset-0 bg-radial from-amber-50/15 to-transparent pointer-events-none" />
  
          <div id="unit01-page-inner" className="p-5 sm:p-7 space-y-6 relative z-10 flex-1">
            {/* Header of Page */}
            <div className="flex justify-between items-center border-b border-amber-100 pb-3 text-[10px] text-amber-850 font-black tracking-widest">
              <span>泰宇生命教育 ── 01 哲學思考</span>
              <span className="bg-amber-100 px-2.5 py-0.5 rounded-full text-amber-900 font-bold font-mono">
                PAGE {String(currentPage).padStart(3, '0')}
              </span>
            </div>
  
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.15 }}
                className="space-y-6"
              >
                
                {/* PAGE 14: 品嚐思考的樂趣 */}
                {currentPage === 14 && (
                  <div id="unit01-page14" className="space-y-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-black text-white bg-blue-600 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                          第一章
                        </span>
                        <span className="text-xs font-black text-blue-800">第1章 跳脫慣性。正確思考</span>
                      </div>
                      <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
                        行前閱讀：品嚐思考的樂趣
                      </h1>
                    </div>

                    {/* Manga / Conversation Comic Panel */}
                    <div className="bg-slate-50 rounded-2xl p-4 sm:p-6 border border-slate-200/80 space-y-4">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
                        <span className="text-[11px] font-black text-slate-500 flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" /> 籃球場邊的三人對話 (行前閱讀)
                        </span>
                        <span className="text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md font-bold">
                          課本對照內容
                        </span>
                      </div>

                      {/* Dialogue List */}
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 shrink-0 bg-blue-100 rounded-xl border border-blue-200 flex items-center justify-center font-black text-lg text-blue-800" title="博鈞">
                            🏀
                          </div>
                          <div className="bg-blue-50 text-blue-950 p-3 rounded-2xl rounded-tl-none border border-blue-150 text-xs font-bold leading-relaxed shadow-3xs max-w-xl">
                            <span className="block text-[9px] font-black text-blue-800 mb-0.5">博鈞 (大聲喊著正在背單字的可華)</span>
                            「不要裝認真了啦，陪我去打球！」
                          </div>
                        </div>

                        <div className="flex items-start gap-3 justify-end">
                          <div className="bg-emerald-50 text-emerald-950 p-3 rounded-2xl rounded-tr-none border border-emerald-150 text-xs font-bold leading-relaxed shadow-3xs max-w-xl text-left">
                            <span className="block text-[9px] font-black text-emerald-800 mb-0.5 text-right">可華 (無可奈何放下單字書)</span>
                            雖然他一點也不想打球，可是擔心不答應會被說不夠朋友。只好起身準備去打球。
                          </div>
                          <div className="w-10 h-10 shrink-0 bg-emerald-100 rounded-xl border border-emerald-200 flex items-center justify-center font-black text-lg text-emerald-800" title="可華">
                            📚
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 shrink-0 bg-purple-100 rounded-xl border border-purple-200 flex items-center justify-center font-black text-lg text-purple-800" title="曉萍">
                            🧠
                          </div>
                          <div className="bg-purple-50 text-purple-950 p-3 rounded-2xl rounded-tl-none border border-purple-150 text-xs font-bold leading-relaxed shadow-3xs max-w-xl">
                            <span className="block text-[9px] font-black text-purple-800 mb-0.5">曉萍 (轉身對博鈞說)</span>
                            「你這樣會影響別人的生活節奏耶，也不看看可華正在忙。」
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 shrink-0 bg-blue-100 rounded-xl border border-blue-200 flex items-center justify-center font-black text-lg text-blue-800" title="博鈞">
                            🏀
                          </div>
                          <div className="bg-blue-50 text-blue-950 p-3 rounded-2xl rounded-tl-none border border-blue-150 text-xs font-bold leading-relaxed shadow-3xs max-w-xl">
                            <span className="block text-[9px] font-black text-blue-800 mb-0.5">博鈞 (替自己找理由)</span>
                            「我是怕他一直讀書會變成像王小文博士那樣，整天不是唸書就是做什麼生物研究，一定很難交到朋友。」
                          </div>
                        </div>

                        <div className="flex items-start gap-3 justify-end">
                          <div className="bg-emerald-50 text-emerald-950 p-3 rounded-2xl rounded-tr-none border border-emerald-150 text-xs font-bold leading-relaxed shadow-3xs max-w-xl text-left">
                            <span className="block text-[9px] font-black text-emerald-800 mb-0.5 text-right">可華 (立刻回答)</span>
                            「別亂說，博士雖然話不多，但其實人很好，每次請教小文課業，她都會熱心教導。」
                          </div>
                          <div className="w-10 h-10 shrink-0 bg-emerald-100 rounded-xl border border-emerald-200 flex items-center justify-center font-black text-lg text-emerald-800" title="可華">
                            📚
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 shrink-0 bg-purple-100 rounded-xl border border-purple-200 flex items-center justify-center font-black text-lg text-purple-800" title="曉萍">
                            🧠
                          </div>
                          <div className="bg-purple-50 text-purple-950 p-3 rounded-2xl rounded-tl-none border border-purple-150 text-xs font-bold leading-relaxed shadow-3xs max-w-xl">
                            <span className="block text-[9px] font-black text-purple-800 mb-0.5">曉萍 (反駁博鈞)</span>
                            「不要用自己的想法判斷，你喜歡籃球，博士喜歡生物研究，每個人都有自己的興趣，你又沒跟她聊過天，說不定別人很喜歡跟她交朋友。」
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Reflection Box from Textbook Page 14 */}
                    <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-4 sm:p-5 space-y-3">
                      <h3 className="text-xs font-black text-amber-900 flex items-center gap-1.5 uppercase">
                        <Lightbulb className="w-4 h-4 text-amber-600 animate-pulse" /> 課堂反思與思考提問
                      </h3>
                      <p className="text-xs text-amber-950 leading-relaxed font-semibold">
                        三人的對話，都是用自己的想法，去思考別人的想法，真的是這樣嗎？別人想的跟我一樣嗎？我的推論是對的嗎？
                      </p>
                      <div className="border-t border-amber-200/60 pt-3 space-y-2">
                        <label className="text-[11px] font-black text-amber-900 block">
                          👉 想一想，如果曉萍和可華所言是正確的，那麼小文就是一個容易交到朋友的人嗎？請寫下你的推論過程：
                        </label>
                        <textarea
                          disabled={role === 'teacher' || isSubmitted}
                          rows={3}
                          value={answers['p14_reflection'] || ''}
                          onChange={(e) => updateAnswer('p14_reflection', e.target.value)}
                          placeholder="例如：雖然博士人很好、樂於助人，但交朋友還需要主動交流或共同話題，因此「容易交到朋友」可能還需要更多條件..."
                          className="w-full text-xs p-3 rounded-xl border border-amber-200 outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600/10 leading-relaxed font-semibold bg-white shadow-3xs"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* PAGE 15: 行前暖身 */}
                {currentPage === 15 && (
                  <div id="unit01-page15" className="space-y-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-black text-white bg-blue-600 px-2.5 py-0.5 rounded-md uppercase tracking-wider">
                          第一章
                        </span>
                        <span className="text-xs font-black text-blue-800">第1章 跳脫慣性。正確思考</span>
                      </div>
                      <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
                        行前暖身：思維暖身大對決
                      </h1>
                    </div>

                    {/* TWO SUBSECTIONS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      
                      {/* 01 腦力激盪大考驗 */}
                      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5">
                            <span className="w-5 h-5 bg-rose-100 text-rose-800 rounded-full flex items-center justify-center font-black text-xs font-mono">01</span>
                            <h3 className="text-xs font-black text-slate-800">腦力激盪大考驗 (九點連線)</h3>
                          </div>
                          <p className="text-[11px] text-slate-600 font-bold leading-relaxed">
                            一氣呵成把九個點連起來，筆畫不能超過四條直線，且筆不能離開紙面。
                          </p>
                        </div>

                        {/* Interactive Dot Grid Sandbox */}
                        <div className="bg-white rounded-xl border border-slate-150 p-4 flex flex-col items-center justify-center space-y-4 relative">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider">
                            點擊圓點即可畫線嘗試 (最多可連 5 個端點)
                          </span>
                          
                          {/* 3x3 Dot board wrapper */}
                          <div className="relative w-[180px] h-[180px] bg-slate-50/50 rounded-xl border border-slate-100 p-2.5">
                            {/* SVG layer to draw connected paths */}
                            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                              {nineDotsPath.length > 1 && (
                                <polyline
                                  points={nineDotsPath.map(idx => {
                                    const col = idx % 3;
                                    const row = Math.floor(idx / 3);
                                    // Map to px in 180x180 container (padding 30px, step 60px)
                                    const x = 30 + col * 60;
                                    const y = 30 + row * 60;
                                    return `${x},${y}`;
                                  }).join(' ')}
                                  fill="none"
                                  stroke="#b91c1c"
                                  strokeWidth="3.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              )}

                              {/* Solution path in green */}
                              {showNineDotsSolution && (
                                <g>
                                  {/* Line 1: Dot 0 -> 1 -> 2 -> extend right */}
                                  <line x1="30" y1="30" x2="210" y2="30" stroke="#059669" strokeWidth="3" strokeDasharray="4 4" className="animate-pulse" />
                                  {/* Line 2: extend right -> Dot 5 -> Dot 7 -> extend down-left */}
                                  <line x1="210" y1="30" x2="-30" y2="270" stroke="#059669" strokeWidth="3" strokeDasharray="4 4" className="animate-pulse" />
                                  {/* Line 3: extend down-left -> Dot 6 -> Dot 3 -> Dot 0 */}
                                  <line x1="-30" y1="270" x2="30" y2="30" stroke="#059669" strokeWidth="3" strokeDasharray="4 4" className="animate-pulse" />
                                  {/* Line 4: Dot 0 -> Dot 4 -> Dot 8 */}
                                  <line x1="30" y1="30" x2="150" y2="150" stroke="#059669" strokeWidth="3" strokeDasharray="4 4" className="animate-pulse" />
                                </g>
                              )}
                            </svg>

                            {/* Nine dots buttons */}
                            <div className="grid grid-cols-3 gap-y-10 gap-x-10 h-full w-full items-center justify-items-center">
                              {Array.from({ length: 9 }).map((_, idx) => {
                                const isSelected = nineDotsPath.includes(idx);
                                const order = nineDotsPath.indexOf(idx);
                                return (
                                  <button
                                    key={idx}
                                    onClick={() => handleDotClick(idx)}
                                    className={`w-6 h-6 rounded-full flex items-center justify-center font-mono font-black text-[9px] relative z-20 cursor-pointer transition-all ${
                                      isSelected
                                        ? 'bg-rose-600 text-white scale-110 shadow-xs'
                                        : 'bg-slate-300 text-transparent hover:bg-slate-400'
                                    }`}
                                  >
                                    {isSelected ? order + 1 : ''}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Control Buttons */}
                          <div className="flex gap-2 w-full justify-between items-center text-[10px] font-black">
                            <button
                              onClick={resetNineDots}
                              className="px-2.5 py-1.5 bg-slate-150 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <RefreshCw className="w-3 h-3" /> 重設
                            </button>
                            <button
                              onClick={() => setShowNineDotsSolution(!showNineDotsSolution)}
                              className="px-2.5 py-1.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-lg hover:bg-rose-100 transition-colors flex items-center gap-1 cursor-pointer"
                            >
                              <Lightbulb className="w-3 h-3" /> {showNineDotsSolution ? '隱藏解答' : '顯示解答'}
                            </button>
                          </div>

                          {/* Explanation of 9 dots solution */}
                          {showNineDotsSolution && (
                            <div className="bg-emerald-50 text-emerald-950 p-2.5 rounded-lg border border-emerald-150 text-[10px] leading-relaxed font-semibold">
                              💡 <span className="font-black text-emerald-800">解答奧秘：</span>
                              經典的九點謎題。秘訣在於不要把思維限制在3x3的方格內，而是要把線條「畫出格子外」！這代表打破自我框架、超越既定界限。
                            </div>
                          )}

                          {nineDotsMessage && !showNineDotsSolution && (
                            <p className="text-[10px] text-rose-800 font-bold leading-normal text-center bg-rose-50 p-2 rounded-lg">
                              {nineDotsMessage}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* 02 誠實村與說謊村 */}
                      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 sm:p-5 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5">
                            <span className="w-5 h-5 bg-rose-100 text-rose-800 rounded-full flex items-center justify-center font-black text-xs font-mono">02</span>
                            <h3 className="text-xs font-black text-slate-800">誠實村與說謊村 (經典悖論)</h3>
                          </div>
                          <p className="text-[11px] text-slate-600 font-bold leading-relaxed">
                            有兩個村莊，分別為誠實村和說謊村，誠實村的村民只說實話，說謊村的村民只說謊話。當你走在岔路上不知如何決定時，發現路邊坐著一個可能來自誠實村或說謊村的老人...
                          </p>
                        </div>

                        {/* Question Interaction selector */}
                        <div className="space-y-3">
                          <span className="text-[10px] font-black text-slate-400 block uppercase">
                            🤔 請選擇一種問法，才能問出通往誠實村的道路：
                          </span>
                          
                          <div className="space-y-2">
                            <button
                              onClick={() => {
                                setSelectedRiddleOption('A');
                                updateAnswer('p15_riddle', 'A');
                              }}
                              className={`w-full text-left p-2.5 rounded-xl border text-[11px] font-black transition-all flex items-start gap-2.5 cursor-pointer ${
                                selectedRiddleOption === 'A'
                                  ? 'bg-rose-50 border-rose-300 text-rose-950 shadow-3xs'
                                  : 'bg-white border-slate-150 text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-850 flex items-center justify-center font-black shrink-0 font-mono text-xs">A</span>
                              <span>「老人家，你住在哪一個村莊？」</span>
                            </button>

                            <button
                              onClick={() => {
                                setSelectedRiddleOption('B');
                                updateAnswer('p15_riddle', 'B');
                              }}
                              className={`w-full text-left p-2.5 rounded-xl border text-[11px] font-black transition-all flex items-start gap-2.5 cursor-pointer ${
                                selectedRiddleOption === 'B'
                                  ? 'bg-rose-50 border-rose-300 text-rose-950 shadow-3xs'
                                  : 'bg-white border-slate-150 text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-850 flex items-center justify-center font-black shrink-0 font-mono text-xs">B</span>
                              <span>「我要去誠實村往哪裡走？」</span>
                            </button>

                            <button
                              onClick={() => {
                                setSelectedRiddleOption('C');
                                updateAnswer('p15_riddle', 'C');
                              }}
                              className={`w-full text-left p-2.5 rounded-xl border text-[11px] font-black transition-all flex items-start gap-2.5 cursor-pointer ${
                                selectedRiddleOption === 'C'
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950 shadow-3xs animate-bounce-short'
                                  : 'bg-white border-slate-150 text-slate-700 hover:bg-slate-50'
                              }`}
                            >
                              <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-850 flex items-center justify-center font-black shrink-0 font-mono text-xs">C</span>
                              <span>用手指著其中一條路，問：「這是通往你的村莊的路嗎？」</span>
                            </button>
                          </div>

                          {/* Reveal analysis feedback */}
                          {selectedRiddleOption === 'C' && (
                            <div className="bg-emerald-50 text-emerald-950 p-3 rounded-xl border border-emerald-150 text-[10px] leading-relaxed font-semibold space-y-1.5">
                              <span className="text-emerald-800 font-extrabold block">🎉 恭喜答對！完美的雙重否定邏輯：</span>
                              <p>
                                點擊「C」選項是唯一能在不確定老人身份下知道正確路徑的做法：
                              </p>
                              <ul className="list-disc pl-4 space-y-1">
                                <li>
                                  <span className="font-bold">若你指的路是誠實村：</span>誠實人會答「是」（真話）；說謊人也會答「是」（說謊，因為那不是他住的說謊村，他必須反過來回答）。
                                </li>
                                <li>
                                  <span className="font-bold">若你指的路是說謊村：</span>誠實人會答「否」；說謊人也會答「否」。
                                </li>
                              </ul>
                              <p className="font-extrabold text-emerald-800 border-t border-emerald-200/60 pt-1.5 mt-1.5">
                                結論：只要老人的答案是「是」，你指的就是去誠實村的路！
                              </p>
                            </div>
                          )}

                          {(selectedRiddleOption === 'A' || selectedRiddleOption === 'B') && (
                            <div className="bg-rose-50 text-rose-950 p-3 rounded-xl border border-rose-150 text-[10px] leading-relaxed font-semibold">
                              ❌ <span className="text-rose-800 font-extrabold">再想想看喔！提示：</span>
                              因為你無法確定老人的身份（不知道他是誠實人還是說謊人），他的回答方向你依然無法證實。點擊選項 C 看看它的奇妙雙重邏輯推理！
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quick check answers save text box */}
                    <div className="bg-amber-50/40 border border-amber-200 rounded-2xl p-4 space-y-2">
                      <label className="text-[11px] font-black text-amber-900 block">
                        🧠 腦力激盪反思：請寫下你從上述兩個謎題中學到什麼思維方式（例如「打破框架」、「雙重否定」）？
                      </label>
                      <textarea
                        disabled={role === 'teacher' || isSubmitted}
                        rows={2}
                        value={answers['p15_reflection'] || ''}
                        onChange={(e) => updateAnswer('p15_reflection', e.target.value)}
                        placeholder="例如：我學到了原來有時候要把目光放到格子之外，還有利用邏輯上的雙重否定可以解決看似無解的難題..."
                        className="w-full text-xs p-3 rounded-xl border border-amber-150 outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600/10 leading-relaxed font-semibold bg-white shadow-3xs"
                      />
                    </div>
                  </div>
                )}

                {/* PAGES 16 TO 33: RENDER BEAUTIFUL ACCURATE COMPREHENSIVE TEXTBOOK INTERFACES */}
                {currentPage >= 16 && (
                  <div className="space-y-6">
                    {/* Chapter Headers */}
                    <div className="bg-gradient-to-r from-amber-500/5 to-transparent border-l-4 border-amber-500 p-4 rounded-r-2xl">
                      <h3 className="text-xs font-black text-amber-800 uppercase tracking-wider mb-0.5">
                        {CHAPTERS_NAV_UNIT_01.find(p => p.page === currentPage)?.tag} · 課本第 {currentPage} 頁對照
                      </h3>
                      <p className="text-sm font-black text-amber-950 leading-relaxed">
                        {CHAPTERS_NAV_UNIT_01.find(p => p.page === currentPage)?.desc}
                      </p>
                    </div>

                    {/* Simulated Full Textbook Pages */}
                    <div className="bg-white rounded-2xl border border-slate-100 p-5 space-y-4">
                      
                      {currentPage === 16 && (
                        <div className="space-y-5 text-xs text-slate-700 leading-relaxed font-semibold">
                          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                            <h2 className="text-base font-black text-slate-900 flex items-center gap-1.5">
                              <span className="text-blue-600 font-black">第 1 章</span>
                              <span>跳脫慣性。正確思考</span>
                              <span className="text-slate-300 font-normal">|</span>
                              <span className="text-amber-800">一、洞悉慣性的思考</span>
                            </h2>
                            <span className="text-[10px] font-mono text-slate-400">p.016</span>
                          </div>

                          <div className="bg-amber-50/40 p-4.5 rounded-2xl border border-amber-100/50 text-slate-800 leading-relaxed italic text-xs font-medium">
                            「我們有時候會不會也和博鈞一樣，用自己的眼光和想法直覺判斷不了解的人事物呢？生活中的誤解、衝突或錯誤的抉擇，經常來自於缺乏理性的思考。」
                          </div>

                          <div className="space-y-3">
                            <h3 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                              <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-[10px] font-bold">●</span>
                              <span>洞悉慣性的思考</span>
                            </h3>

                            <p className="indent-6">
                              美國的組織行為學者卡爾偉克（Karl E. Weick）曾提到一則故事，有人將蜜蜂和蒼蠅關在同一個瓶子中，將瓶子平放，瓶底朝向有光亮的地方，瓶口則朝向黑暗處。蜜蜂基於「光亮處就是出口」的趨光慣性，不斷地朝瓶底飛去，最後力竭身亡；反觀蒼蠅沒有對光亮的慣性行為，於是四處亂飛，很快就逃脫困境。
                            </p>

                            {/* Bee vs Fly Interactive Simulation Card */}
                            <div className="bg-slate-50 border border-slate-200/60 p-4.5 rounded-2xl space-y-3.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[11px] font-black text-slate-800 flex items-center gap-1">
                                  <Sparkles className="w-4 h-4 text-amber-500" />
                                  🧩 互動實驗室：蜜蜂與蒼蠅的慣性對決
                                </span>
                                <span className="text-[10px] text-slate-400 font-bold">點選角色觀察結果</span>
                              </div>

                              <div className="grid grid-cols-2 gap-2">
                                <button
                                  onClick={() => setBeeFlyChoice('bee')}
                                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer font-black ${
                                    beeFlyChoice === 'bee'
                                      ? 'bg-amber-100 border-amber-300 text-amber-950 shadow-xs'
                                      : 'bg-white border-slate-200 hover:bg-slate-100/80 text-slate-600'
                                  }`}
                                >
                                  🐝 觀察「蜜蜂」的結局
                                </button>
                                <button
                                  onClick={() => setBeeFlyChoice('fly')}
                                  className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer font-black ${
                                    beeFlyChoice === 'fly'
                                      ? 'bg-emerald-100 border-emerald-300 text-emerald-950 shadow-xs'
                                      : 'bg-white border-slate-200 hover:bg-slate-100/80 text-slate-600'
                                  }`}
                                >
                                  🪰 觀察「蒼蠅」的結局
                                </button>
                              </div>

                              {/* Bottle illustration box */}
                              <div className="relative h-28 bg-slate-900 rounded-xl overflow-hidden flex items-center justify-between p-4 shadow-inner border border-slate-800">
                                {/* Left: Dark bottleneck (Exit) */}
                                <div className="z-10 text-center">
                                  <span className="text-[9px] font-black text-slate-400 block">瓶口 (出口)</span>
                                  <div className="w-8 h-10 border border-dashed border-slate-600 rounded-lg mx-auto flex items-center justify-center bg-slate-950/80">
                                    <span className="text-xs">🚪</span>
                                  </div>
                                </div>

                                {/* Animation canvas simulator */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                  {beeFlyChoice === 'bee' && (
                                    <div className="w-full h-full relative">
                                      {/* Dots flying right */}
                                      <motion.div
                                        animate={{ x: [0, 80, 120, 160, 155, 160, 158], y: [0, -10, 15, -5, 5, -2, 0], opacity: [1, 1, 1, 0.4] }}
                                        transition={{ repeat: Infinity, duration: 2 }}
                                        className="absolute left-[30%] top-[40%] text-sm"
                                      >
                                        🐝💨
                                      </motion.div>
                                      <motion.div
                                        animate={{ x: [20, 70, 110, 150, 148], y: [15, -5, -10, 10, 12], opacity: [1, 1, 1, 0.2] }}
                                        transition={{ repeat: Infinity, duration: 1.8, delay: 0.3 }}
                                        className="absolute left-[30%] top-[35%] text-sm"
                                      >
                                        🐝💨
                                      </motion.div>
                                      {/* Red cross warning at right */}
                                      <div className="absolute right-[12%] top-[35%] text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded-md font-mono">
                                        ❌ 力竭受阻
                                      </div>
                                    </div>
                                  )}

                                  {beeFlyChoice === 'fly' && (
                                    <div className="w-full h-full relative">
                                      {/* Dots flying randomly then out left */}
                                      <motion.div
                                        animate={{ x: [100, 120, 40, -10, -50, -120], y: [-15, 20, -10, 15, -5, 0] }}
                                        transition={{ repeat: Infinity, duration: 2.5 }}
                                        className="absolute left-[50%] top-[45%] text-sm"
                                      >
                                        🪰💨
                                      </motion.div>
                                      {/* Success flag at left */}
                                      <div className="absolute left-[12%] top-[35%] text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded-md font-mono">
                                        ✨ 順利脫困!
                                      </div>
                                    </div>
                                  )}

                                  {!beeFlyChoice && (
                                    <span className="text-slate-500 text-[10px] font-bold">請點擊上方按鈕啟動蜜蜂與蒼蠅實驗</span>
                                  )}
                                </div>

                                {/* Right: Bright bottom of bottle */}
                                <div className="z-10 text-center">
                                  <span className="text-[9px] font-black text-amber-300 block">瓶底 (光源處)</span>
                                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500/40 to-amber-400/90 blur-xs flex items-center justify-center animate-pulse">
                                    <span className="text-xs">💡</span>
                                  </div>
                                </div>
                              </div>

                              {/* Explanation Box */}
                              <AnimatePresence mode="wait">
                                {beeFlyChoice === 'bee' && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="bg-amber-50 border border-amber-200/50 p-3 rounded-xl text-[11px] text-amber-950 font-bold"
                                  >
                                    💡 <strong>趨光慣性（Bee's Trap）：</strong> 蜜蜂雖然有智慧也更懂得紀律，但牠們只堅持「有光處即是出口」的過往成規與直覺，結果在平放瓶子裡，瓶底的光亮反而成了無解的死胡同。這就代表了人在面對危機時，若一昧依循過往的經驗（慣性思維），反而會陷入盲點！
                                  </motion.div>
                                )}
                                {beeFlyChoice === 'fly' && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    className="bg-emerald-50 border border-emerald-200/50 p-3 rounded-xl text-[11px] text-emerald-950 font-bold"
                                  >
                                    💡 <strong>無序突圍（Fly's Success）：</strong> 蒼蠅雖然看似毫無紀律、到處亂飛，但也正因為牠們不受任何「光亮才是出口」的本能成規束縛，四處碰壁與嘗試的結果，反倒讓牠們誤打誤撞找到黑暗處的瓶口，重獲自由。
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>

                            <p className="indent-6">
                              這則故事點出慣性行為對於解決問題的影響，人與動物都存在著慣性行為，人們也常因循慣性去思考問題或判斷事情，就像物體運動的慣性，慣性思維常常會在思考事情時出現盲點，也缺乏創新和改變，更無法及時解決危機、脫離困境。
                            </p>

                            <div className="border-l-4 border-blue-500 pl-3 py-1.5 bg-blue-50/50 rounded-r-xl">
                              <p className="font-black text-blue-950 text-xs">
                                「唯有思考，人才能擺脫衝動和成規。」── 約翰·杜威（John Dewey）
                              </p>
                              <p className="text-[10px] text-slate-500 mt-0.5">
                                杜威指出，學習更周全的思考方法，有助於我們打破成規，進而提升解決生活危機與複雜問題的能力。
                              </p>
                            </div>

                            <p className="indent-6">
                              由林從一教授所提出思考的三個層次，我們可以運用這個方法來檢視自己的思考。同樣的情境，以不同的思考與反應，可能產生不同的感受與結果。學習思考方法幫助我們分析自己或他人的論點是否真有道理，也使我們更懂得掌握知識與事實、處理不同觀點的資訊、釐清具有爭議的議題。
                            </p>
                          </div>

                          {/* Student Answer Box */}
                          <div className="pt-2 border-t border-slate-100">
                            <label className="text-[11px] font-black text-slate-900 block mb-1.5 flex items-center gap-1">
                              <Lightbulb className="w-4 h-4 text-amber-500" />
                              ✍️ 課堂思辨：當你拿到一份數學不及格分數時，你習慣怎麼想？你覺得你比較常用哪種層次的思考？
                            </label>
                            <textarea
                              disabled={role === 'teacher' || isSubmitted}
                              rows={3}
                              value={answers['p16_reflection'] || ''}
                              onChange={(e) => updateAnswer('p16_reflection', e.target.value)}
                              placeholder="請在此處坦白寫下你的思考慣性：例如，你是立刻感到難過生氣、抱怨老師出太難，還是會去找出錯誤並做修正？..."
                              className="w-full text-xs p-3 rounded-xl border border-slate-200 outline-none focus:border-amber-500 leading-relaxed font-semibold bg-white shadow-3xs focus:ring-1 focus:ring-amber-500/10"
                            />
                          </div>
                        </div>
                      )}

                      {currentPage === 17 && (
                        <div className="space-y-5 text-xs text-slate-700 leading-relaxed font-semibold">
                          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                            <h2 className="text-base font-black text-slate-900 flex items-center gap-1.5">
                              <span className="text-blue-600 font-black">第 1 章</span>
                              <span>跳脫慣性。正確思考</span>
                              <span className="text-slate-300 font-normal">|</span>
                              <span className="text-amber-800">二、思考的三個層次</span>
                            </h2>
                            <span className="text-[10px] font-mono text-slate-400">p.017</span>
                          </div>

                          <p className="text-slate-600">
                            假設某天可華拿到數學期中考成績不及格的分數，他可能會怎麼想呢？下方的互動卡片展示了思考的三個層次對應的心理活動，請點選不同層次，觀察思考模式與心情狀態的改變：
                          </p>

                          {/* Level selector tabs & details */}
                          <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-2">
                              {(['初階', '中階', '高階'] as const).map((lvl) => {
                                const isActive = activeThinkingCard === lvl;
                                return (
                                  <button
                                    key={lvl}
                                    onClick={() => setActiveThinkingCard(lvl)}
                                    className={`p-3 rounded-xl border font-black transition-all cursor-pointer flex flex-col items-center gap-1 ${
                                      isActive
                                        ? lvl === '初階'
                                          ? 'bg-rose-50 border-rose-300 text-rose-800 shadow-sm'
                                          : lvl === '中階'
                                            ? 'bg-orange-50 border-orange-300 text-orange-800 shadow-sm'
                                            : 'bg-blue-50 border-blue-300 text-blue-800 shadow-sm'
                                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-500'
                                    }`}
                                  >
                                    <span className="text-xs">{lvl === '初階' ? '🔴' : lvl === '中階' ? '🟡' : '🟢'} {lvl}</span>
                                    <span className="text-[9px] font-bold">
                                      {lvl === '初階' ? '反應式思考' : lvl === '中階' ? '運用性思考' : '批判性思考'}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>

                            {/* Main Active Card Detail */}
                            <AnimatePresence mode="wait">
                              {activeThinkingCard ? (
                                <motion.div
                                  key={activeThinkingCard}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -10 }}
                                  className={`p-4.5 rounded-2xl border space-y-3.5 shadow-sm ${
                                    activeThinkingCard === '初階'
                                      ? 'bg-rose-50/50 border-rose-150 text-rose-950'
                                      : activeThinkingCard === '中階'
                                        ? 'bg-orange-50/50 border-orange-150 text-orange-950'
                                        : 'bg-blue-50/50 border-blue-150 text-blue-950'
                                  }`}
                                >
                                  {/* Speech bubble */}
                                  <div className="space-y-1">
                                    <div className="text-[10px] font-black uppercase text-slate-400">可華內心小劇場：</div>
                                    <blockquote className="bg-white border border-slate-100 p-3 rounded-2xl relative shadow-3xs text-xs font-black text-slate-800 leading-relaxed italic">
                                      {activeThinkingCard === '初階' && '「考爆了，心情超差。我慘了！太可悲了！」😭'}
                                      {activeThinkingCard === '中階' && '「昨晚都熬夜準備了還考差，我就是沒有數學天分。為什麼數學這麼難？學這些高深的數學有什麼用？」🤯'}
                                      {activeThinkingCard === '高階' && '「我的程度真的只有這樣嗎？上課覺得聽懂了，也做了練習題，這次還是不及格，不知道錯誤出在哪些地方？要怎麼修正才好呢？或許可以請教師長或同學。」🎯'}
                                    </blockquote>
                                  </div>

                                  {/* Card Bullet Details */}
                                  <div className="space-y-2 bg-white/60 p-3 rounded-xl border border-white/80 text-[11px]">
                                    <h4 className="font-black text-slate-900 border-b border-slate-100 pb-1.5 flex items-center justify-between">
                                      <span>
                                        {activeThinkingCard === '初階' && '反應式思考 (初階) ── 直覺及情緒反應'}
                                        {activeThinkingCard === '中階' && '運用性思考 (中階) ── 提出立場及想法'}
                                        {activeThinkingCard === '高階' && '批判性思考 (高階) ── 合理懷疑與求真的態度'}
                                      </span>
                                      <span className="text-[9px] text-slate-400 font-mono">
                                        {activeThinkingCard === '初階' ? '最不獨立' : activeThinkingCard === '中階' ? '相對自由' : '最獨立'}
                                      </span>
                                    </h4>
                                    
                                    <ul className="space-y-1 text-slate-700 font-bold">
                                      {activeThinkingCard === '初階' && (
                                        <>
                                          <li>✦ <strong>直覺或無意識的反應：</strong> 受到外界刺激時，完全不加思索，直接用本能或情緒回答。</li>
                                          <li>✦ <strong>依個人感受做出反應：</strong> 判斷取決於當下的爽快或憤怒，缺乏論證支撐。</li>
                                          <li>✦ <strong>不獨立的思考方式：</strong> 容易被人用情緒字眼操控，陷入人云亦云。</li>
                                        </>
                                      )}
                                      {activeThinkingCard === '中階' && (
                                        <>
                                          <li>✦ <strong>有意識的推論：</strong> 能夠利用學到的理論或成規，將想法套用在新的情境或立場上。</li>
                                          <li>✦ <strong>運用想法與理論預設：</strong> 會試圖講道理，但前提往往建立在固化的假設上（例如「數學沒用」）。</li>
                                          <li>✦ <strong>仍非絕對獨立的思考：</strong> 常落入刻板印象或特定的慣性框架，難以審視自身前提的偏誤。</li>
                                        </>
                                      )}
                                      {activeThinkingCard === '高階' && (
                                        <>
                                          <li>✦ <strong>揭發與檢查：</strong> 能夠跳脫本位主義，回頭檢查自己的預設立場、推論是否具有邏輯合理性。</li>
                                          <li>✦ <strong>提供更好的替代方案：</strong> 當發現原有方法出錯時，不抱怨而是設法修正、找出優化方案。</li>
                                          <li>✦ <strong>懷疑與求真的反思態度：</strong> 不盲信權威或直覺，抱持求真精神，這是最為獨立的高階思考形式。</li>
                                        </>
                                      )}
                                    </ul>
                                  </div>
                                </motion.div>
                              ) : (
                                <div className="border border-dashed border-slate-200 rounded-2xl p-6 text-center bg-slate-50/50 text-slate-500 text-xs font-black">
                                  💡 <strong>點擊上方初、中、高階按鈕</strong>，即可解鎖可華面對「期中考不及格」的三種截然不同的思考劇場！
                                </div>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Movie Keyword Spotlight */}
                          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white rounded-2xl p-4.5 space-y-3 shadow-md border border-indigo-950">
                            <div className="flex items-center justify-between border-b border-indigo-800 pb-2">
                              <span className="text-[10px] font-black uppercase text-indigo-400 flex items-center gap-1">
                                <Tv className="w-4 h-4 text-indigo-400" />
                                課外延伸：影片關鍵字檢索
                              </span>
                              <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full font-bold">從思考的三層面理解「獨立思考」</span>
                            </div>

                            <div className="flex items-start gap-3">
                              <div className="w-12 h-12 bg-indigo-500/20 text-indigo-300 rounded-xl flex items-center justify-center font-mono text-lg font-black shrink-0 border border-indigo-500/30">
                                🎬
                              </div>
                              <div className="space-y-1.5 flex-1">
                                <h4 className="text-xs font-black text-white">點擊播放精彩補充影片</h4>
                                <p className="text-[10px] text-indigo-200 font-medium leading-normal">
                                  林從一教授親自解析如何利用這三層次訓練自我的大腦除塵器，跳脫情緒成規。
                                </p>
                                <button
                                  onClick={() => setShowMockVideo(prev => !prev)}
                                  className="px-3.5 py-1.5 bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 text-white font-extrabold text-[10px] rounded-lg transition-colors cursor-pointer shadow-3xs"
                                >
                                  {showMockVideo ? "⏹️ 關閉影片導讀" : "▶️ 播放影片精華導讀"}
                                </button>
                              </div>
                            </div>

                            {showMockVideo && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                className="bg-slate-950/90 border border-indigo-800 p-3 rounded-xl space-y-2 text-[10px] text-slate-300 font-semibold leading-relaxed"
                              >
                                <p className="font-black text-amber-400 border-b border-slate-800 pb-1 flex items-center gap-1">
                                  <span>📼</span>
                                  <span>林教授的獨立思考三步驟心法：</span>
                                </p>
                                <p className="text-slate-300">
                                  <strong>1. 覺察：</strong> 當你大喊「我慘了」的時候，先停下來，察覺自己正處於「情緒與直覺反應」的初階層次。
                                </p>
                                <p className="text-slate-300">
                                  <strong>2. 釐清預設：</strong> 當你抱怨「為什麼要學數學」時，反思自己是否預設了「學不會是因為沒有天分、學數學沒用」的偏見架構。
                                </p>
                                <p className="text-slate-300">
                                  <strong>3. 修正方案：</strong> 升級到批判層次，盤點自己做對和做錯的地方，主動尋求反省並提供可執行的替代途徑（如請教同學）。這才是真正的自由！
                                </p>
                              </motion.div>
                            )}
                          </div>

                          {/* Student Answer Box */}
                          <div className="pt-2 border-t border-slate-100 space-y-3">
                            <div className="space-y-1.5">
                              <label className="text-[11px] font-black text-slate-900 block mb-1">
                                1. 自我評估：你覺得自己平時最習慣、最常落入哪一種思考層次？
                              </label>
                              <div className="flex gap-4">
                                {(['初階（反應式）', '中階（運用性）', '高階（批判性）'] as const).map((level) => (
                                  <label key={level} className="flex items-center gap-1.5 cursor-pointer text-[11px] text-slate-700 font-bold">
                                    <input
                                      type="radio"
                                      disabled={role === 'teacher' || isSubmitted}
                                      name="p17_preferred_level"
                                      checked={answers['p17_preferred_level'] === level}
                                      onChange={() => updateAnswer('p17_preferred_level', level)}
                                      className="text-amber-600 focus:ring-amber-500"
                                    />
                                    <span>{level}</span>
                                  </label>
                                ))}
                              </div>
                            </div>

                            <div className="space-y-1">
                              <label className="text-[11px] font-black text-slate-900 block">
                                2. 行動與反思：你覺得使用不同的思考層次，對你的生活與學習會產生什麼截然不同的影響？
                              </label>
                              <textarea
                                disabled={role === 'teacher' || isSubmitted}
                                rows={2.5}
                                value={answers['p17_reflection'] || ''}
                                onChange={(e) => updateAnswer('p17_reflection', e.target.value)}
                                placeholder="請寫下具體對照：例如，在反應層次時容易做出後悔的事；而進入批判層次則能幫我從失敗中成長..."
                                className="w-full text-xs p-3 rounded-xl border border-slate-200 outline-none focus:border-amber-500 leading-relaxed font-semibold bg-white shadow-3xs focus:ring-1 focus:ring-amber-500/10"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {currentPage === 18 && (
                        <div className="space-y-5 text-xs text-slate-700 leading-relaxed font-semibold">
                          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                            <h2 className="text-base font-black text-slate-900 flex items-center gap-1.5">
                              <span className="text-blue-600 font-black">第 1 章</span>
                              <span>跳脫慣性。正確思考</span>
                              <span className="text-slate-300 font-normal">|</span>
                              <span className="text-amber-800">三、覺察與消除偏見</span>
                            </h2>
                            <span className="text-[10px] font-mono text-slate-400">p.018</span>
                          </div>

                          <p className="text-slate-600 indent-6">
                            當我們觀察自己的慣性思維，再運用理性思考的方式，進行獨立思考，然而過程中會發現，因為對特定群體的特定信念，產生了「刻板印象（Stereotype）」，影響我們的理性判斷。比如：因性別刻板印象，造成我們覺得女生數理比男生弱，人文比男生強的觀念。
                          </p>

                          <p className="text-slate-600 indent-6">
                            此外，用先入為主的想法看待事物，或對特定團體的人，有負面情緒或刻板印象，都屬於「偏見（Prejudice）」。偏見會讓人對一知半解的狀態自滿，看不見自己的無知，不輕易認識人事物的內涵與背後原因，往往最後蒙蔽了真相。
                          </p>

                          <p className="text-slate-600 indent-6">
                            偏見與負面的刻板印象很可能引發「歧視（Discrimination）」，對於擁有某些屬性、特徵或身分的特定團體，給予差異性的負向對待、互動，像是霸凌的行為，就是最明顯的歧視！
                          </p>

                          {/* Progression Diagram Ladder */}
                          <div className="space-y-3">
                            <span className="text-[11px] font-black text-slate-800 flex items-center gap-1">
                              💬 點選思維三級跳：觀察從「觀念」如何惡化為「實際攻擊」
                            </span>

                            <div className="grid grid-cols-3 gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200/50">
                              {(['stereotype', 'prejudice', 'discrimination'] as const).map((step) => {
                                const isActive = activeBiasStep === step;
                                return (
                                  <button
                                    key={step}
                                    onClick={() => setActiveBiasStep(step)}
                                    className={`py-2 px-1 rounded-lg text-center font-black transition-all text-[11px] cursor-pointer ${
                                      isActive
                                        ? step === 'stereotype'
                                          ? 'bg-rose-500 text-white shadow-xs'
                                          : step === 'prejudice'
                                            ? 'bg-amber-500 text-white shadow-xs'
                                            : 'bg-indigo-600 text-white shadow-xs'
                                        : 'bg-white text-slate-600 border border-slate-200/60'
                                    }`}
                                  >
                                    {step === 'stereotype' ? '1. 刻板印象' : step === 'prejudice' ? '2. 偏見' : '3. 歧視'}
                                  </button>
                                );
                              })}
                            </div>

                            <AnimatePresence mode="wait">
                              <motion.div
                                key={activeBiasStep}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className={`p-4 rounded-xl border-l-4 shadow-3xs ${
                                  activeBiasStep === 'stereotype'
                                    ? 'bg-rose-50/50 border-rose-500 text-rose-950'
                                    : activeBiasStep === 'prejudice'
                                      ? 'bg-amber-50/50 border-amber-500 text-amber-950'
                                      : 'bg-indigo-50/50 border-indigo-600 text-indigo-950'
                                }`}
                              >
                                {activeBiasStep === 'stereotype' && (
                                  <>
                                    <h4 className="font-black text-xs text-rose-950 mb-1">🔴 刻板印象 (Stereotype) ── 先入為主的認知</h4>
                                    <p className="text-[11px] text-slate-600">
                                      <strong>定義：</strong> 沒有確切證據，先入為主地認為特定人、事、物是他所想的那樣。
                                    </p>
                                    <p className="text-[11px] text-rose-800 mt-2 font-bold bg-white/80 p-2 rounded-lg border border-rose-100">
                                      📖 課本實例：認為「男主外，女主內」，所以無法接受家庭主夫。
                                    </p>
                                  </>
                                )}
                                {activeBiasStep === 'prejudice' && (
                                  <>
                                    <h4 className="font-black text-xs text-amber-950 mb-1">🟡 偏見 (Prejudice) ── 夾帶情感的負向想法</h4>
                                    <p className="text-[11px] text-slate-600">
                                      <strong>定義：</strong> 基於刻板印象，對於特定的人事物產生負面想法 and 情緒。
                                    </p>
                                    <p className="text-[11px] text-amber-800 mt-2 font-bold bg-white/80 p-2 rounded-lg border border-amber-100">
                                      📖 課本實例：看見外貌姣好的人，就覺得各方面表現都好，反之看到外表醜陋的人，心中就會感到厭惡且排斥（因外貌而產生了偏見）。
                                    </p>
                                  </>
                                )}
                                {activeBiasStep === 'discrimination' && (
                                  <>
                                    <h4 className="font-black text-xs text-indigo-950 mb-1">🔵 歧視 (Discrimination) ── 化為實際的差異對待</h4>
                                    <p className="text-[11px] text-slate-600">
                                      <strong>定義：</strong> 基於偏見，實際對特定對象造成不公平對待或言語、身體的攻擊。
                                    </p>
                                    <p className="text-[11px] text-indigo-850 mt-2 font-bold bg-white/80 p-2 rounded-lg border border-indigo-100">
                                      📖 課本實例：某大學系學會會長政見主張「大四畢業母胎單身進行結紮手術」（實質歧視特定單身群體並進行言語霸凌與攻擊）。
                                    </p>
                                  </>
                                )}
                              </motion.div>
                            </AnimatePresence>
                          </div>

                          {/* Movie Highlight container - Hidden Figures */}
                          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                              <span className="px-2.5 py-0.5 bg-blue-100 text-blue-800 rounded-lg text-[9px] font-black">🍿 MIND 田捕手</span>
                              <h4 className="text-xs font-black text-slate-900">電影導讀：《關鍵少數》 Hidden Figures</h4>
                            </div>

                            <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                              電影中的主角凱薩琳·強森（Katherine G. Johnson）從小展現驚人的數學天分。然而大學畢業後，在美國蘭利研究中心（NASA前身）的工作環境中，卻因為「黑人」與「女性」的身分，處處受到不公平限制，包括限用黑人專用的辦公室、餐廳與廁所等。
                            </p>
                            <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                              但凱薩琳憑藉其堅強的專業能力，在 1962 年水星計畫任務中，被空戰英雄葛倫上校指定親自核算軌道，葛倫說：「只要那個女孩算出結果無誤，我就出任務！」這成功突破了當時白人男性的偏見。2016 年 NASA 更以她的姓名為新落成的計算研究中心命名。
                            </p>
                          </div>

                          {/* Think and reflect exercises */}
                          <div className="pt-2 border-t border-slate-150 space-y-3">
                            <h4 className="text-xs font-black text-slate-900 flex items-center gap-1">
                              <CheckCircle className="w-4 h-4 text-emerald-600" />
                              💡 隨堂「想一想」互動問答
                            </h4>

                            <div className="space-y-1.5">
                              <label className="text-[11px] font-black text-slate-800 block">
                                Q1. 試舉一個你在日常生活中（或網路、校園中）見到的「偏見」案例，並討論造成此偏見的原因：
                              </label>
                              <textarea
                                disabled={role === 'teacher' || isSubmitted}
                                rows={2.5}
                                value={answers['p18_q1'] || ''}
                                onChange={(e) => updateAnswer('p18_q1', e.target.value)}
                                placeholder="例如：認為某些職業一定是男性或女性才能做。原因可能是社會長期的觀念束縛與媒體的單一刻板化呈現..."
                                className="w-full text-xs p-3 rounded-xl border border-slate-200 outline-none focus:border-amber-500 leading-relaxed font-semibold bg-white shadow-3xs"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-[11px] font-black text-slate-800 block">
                                Q2. 面對偏見，我們能採取什麼具體方法，來避免偏見影響我們與他人的良性人際關係？
                              </label>
                              <textarea
                                disabled={role === 'teacher' || isSubmitted}
                                rows={2.5}
                                value={answers['p18_q2'] || ''}
                                onChange={(e) => updateAnswer('p18_q2', e.target.value)}
                                placeholder="例如：1. 主動接觸不同背景、族群的人。 2. 當內心浮現負面斷言時，先深呼吸並回想：『這有沒有事實根據？我是否正在把個案放大？』..."
                                className="w-full text-xs p-3 rounded-xl border border-slate-200 outline-none focus:border-amber-500 leading-relaxed font-semibold bg-white shadow-3xs"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {currentPage === 19 && (
                        <div className="space-y-5 text-xs text-slate-700 leading-relaxed font-semibold">
                          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                            <h2 className="text-base font-black text-slate-900 flex items-center gap-1.5">
                              <span className="text-blue-600 font-black">第 1 章</span>
                              <span>跳脫慣性。正確思考</span>
                              <span className="text-slate-300 font-normal">|</span>
                              <span className="text-amber-800">四、拋開思考謬誤</span>
                            </h2>
                            <span className="text-[10px] font-mono text-slate-400">p.019</span>
                          </div>

                          <div className="bg-emerald-50/30 p-4 rounded-xl border border-emerald-100/50 text-slate-700 text-[11px]">
                            <strong>🌟 消除偏見的心法：</strong> 消除偏見就是要覺察自己在哪裡可能有偏見，還要能內省，當內心產生偏見、歧視或刻板印象時要能察覺，對於不了解的人、事、物，維持探究的精神，釐清事情的真相。評斷別人時，別忘了回過頭來審視自己，唯有消除偏見才能創造一個充滿機會的世界，替人們開啟希望之門，多一些包容來面對多元文化與社會。
                          </div>

                          <div className="space-y-3">
                            <h3 className="text-xs font-black text-slate-900 flex items-center gap-1.5">
                              <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center text-[10px] font-bold">●</span>
                              <span>日常推論思辨：忘記帶課本就是不值得信任？</span>
                            </h3>

                            <p className="text-slate-600">
                              課本情境：博鈞認為自己不太熟的同學王小文「很難交到朋友」，這個想法被可華與曉萍反駁了。生活中我們有時也會直覺判斷，例如：
                            </p>

                            <blockquote className="border-l-4 border-amber-500 pl-4 py-2 bg-amber-50/30 text-slate-800 italic font-bold">
                              「這個同學昨天忘記帶課本，今天也忘記帶課本，他就是個不值得信任的人，分組報告絕對不要和他一組。」
                            </blockquote>

                            <div className="pt-1.5">
                              <label className="text-[11px] font-black text-slate-800 block mb-1">
                                👉 請思考：你覺得上述這個「不帶課本 = 不信任」的推論，有哪些合理或不合理的地方？推理過程中需要注意些什麼？
                              </label>
                              <textarea
                                disabled={role === 'teacher' || isSubmitted}
                                rows={2.5}
                                value={answers['p19_textbook_untrustworthy'] || ''}
                                onChange={(e) => updateAnswer('p19_textbook_untrustworthy', e.target.value)}
                                placeholder="不合理：他只是健忘，不能直接等同於他人格不值得信任，更不能由此推導出分組時合作不合適。我們容易犯了「以偏概全謬誤」和「滑坡推論」..."
                                className="w-full text-xs p-3 rounded-xl border border-slate-200 outline-none focus:border-amber-500 leading-relaxed font-semibold bg-white shadow-3xs"
                              />
                            </div>
                          </div>

                          <div className="space-y-3">
                            <h3 className="text-xs font-black text-orange-800 flex items-center gap-1.5">
                              <span>🌸</span>
                              <span>辨識謬誤 (Identifying Fallacies)</span>
                            </h3>

                            <p className="indent-6 text-slate-600">
                              人類與動物最明顯的差異，或許在思考的能力上，人類能夠對抽象的事物進行思考、推理，以及將思考的內容透過語言化、文字化加以表達，並應用大腦中的知識與過去經驗，對問題進行決策與解答。
                            </p>

                            <p className="indent-6 text-slate-600">
                              而<strong>謬誤（Fallacy）</strong>是看似正確卻又不合理的推理與想法，它最常發生在日常生活中，稍不留意就容易掉入這樣的思考陷阱，導致溝通上的誤會與障礙，嚴重還會造成情感撕裂或關係終止。因此練習獨立思考的關鍵，首先要認識思考謬誤，學習判別他人有理或無理，是讓我們停止人云亦云，或避免遭人言語綁架的第一步。
                            </p>
                          </div>

                          {/* Blindfolded Archery Mini Interactive Game */}
                          <div className="bg-slate-50 border border-slate-200 p-4.5 rounded-2xl space-y-3">
                            <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                              <span className="text-[11px] font-black text-slate-800 flex items-center gap-1">
                                <Target className="w-4 h-4 text-rose-500" />
                                🎯 邏輯箭靶場：受謬誤影響的「盲目溝通」
                              </span>
                              <span className="text-[9px] text-slate-400 font-bold">點擊按鈕拉弓射箭</span>
                            </div>

                            <div className="flex items-center gap-4 bg-slate-900 text-white p-3 rounded-xl">
                              <div className="flex-1 space-y-2">
                                <span className="text-[10px] text-slate-400 block font-bold">設定思考狀態：</span>
                                <div className="flex items-center gap-3">
                                  <label className="flex items-center gap-1.5 cursor-pointer text-[10px] font-black">
                                    <input
                                      type="radio"
                                      name="archery_blindfold"
                                      checked={archeryBlindfolded}
                                      onChange={() => {
                                        setArcheryBlindfolded(true);
                                        setArcheryState('idle');
                                      }}
                                      className="text-red-500 focus:ring-red-500"
                                    />
                                    <span className="text-red-400">🙈 矇眼 (受謬誤影響)</span>
                                  </label>
                                  <label className="flex items-center gap-1.5 cursor-pointer text-[10px] font-black">
                                    <input
                                      type="radio"
                                      name="archery_blindfold"
                                      checked={!archeryBlindfolded}
                                      onChange={() => {
                                        setArcheryBlindfolded(false);
                                        setArcheryState('idle');
                                      }}
                                      className="text-emerald-500 focus:ring-emerald-500"
                                    />
                                    <span className="text-emerald-400">👀 睜眼 (理清謬誤)</span>
                                  </label>
                                </div>
                              </div>

                              <button
                                onClick={() => {
                                  setArcheryState('shooting');
                                  setTimeout(() => {
                                    setArcheryState(archeryBlindfolded ? 'miss' : 'hit');
                                  }, 1000);
                                }}
                                disabled={archeryState === 'shooting'}
                                className="px-3.5 py-2 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-extrabold text-[10px] rounded-lg cursor-pointer transition-all disabled:opacity-50"
                              >
                                {archeryState === 'shooting' ? '🏹 咻... 箭飛出中' : '🏹 放箭！'}
                              </button>
                            </div>

                            {/* Graphic of flying arrow */}
                            <div className="relative h-20 bg-slate-950 rounded-xl overflow-hidden flex items-center justify-between px-6 border border-slate-800">
                              {/* Left: Archer */}
                              <div className="text-xl">
                                {archeryBlindfolded ? '🙈🏹' : '🎯🏹'}
                              </div>

                              {/* Arrow Flight animation container */}
                              <div className="flex-1 h-full relative">
                                {archeryState === 'shooting' && (
                                  <motion.div
                                    animate={{ x: [0, 160], y: archeryBlindfolded ? [0, -30, -50] : [0, 0] }}
                                    transition={{ duration: 1 }}
                                    className="absolute left-4 top-[40%] text-sm"
                                  >
                                    ➡️
                                  </motion.div>
                                )}
                                {archeryState === 'miss' && (
                                  <div className="absolute right-4 top-[10%] text-xs bg-red-500/20 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded-md font-bold">
                                    💥 射偏脫靶！
                                  </div>
                                )}
                                {archeryState === 'hit' && (
                                  <div className="absolute right-4 top-[35%] text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded-md font-bold">
                                    🎯 正中紅心！
                                  </div>
                                )}
                              </div>

                              {/* Right: Target */}
                              <div className="text-xl">
                                🎯
                              </div>
                            </div>

                            <div className="text-[11px] font-bold text-slate-600 leading-normal">
                              {archeryState === 'idle' && (
                                <p className="italic text-center">💡 溝通因謬誤影響，就像矇眼射箭，不但瞎忙一通，而且永遠無法正中理性的紅心。</p>
                              )}
                              {archeryState === 'miss' && (
                                <p className="text-red-700 text-center font-black">❌ 慘了！你受謬誤影響，矇眼射箭，在言論中雞同鴨講、人云亦云，傷害了關係也掩蓋了真理！</p>
                              )}
                              {archeryState === 'hit' && (
                                <p className="text-emerald-700 text-center font-black">🎉 恭喜！你拋開了謬誤，雙眼看清事實、推理合情合理，精準射中問題本質的紅心！</p>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {currentPage === 20 && (
                        <div className="space-y-5 text-xs text-slate-700 leading-relaxed font-semibold">
                          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                            <h2 className="text-base font-black text-slate-900 flex items-center gap-1.5">
                              <span className="text-amber-500 font-black">第 1 章</span>
                              <span>🌸 常見的謬誤類型</span>
                              <span className="text-slate-300 font-normal">|</span>
                              <span className="text-blue-900">小心生活中的思考陷阱</span>
                            </h2>
                            <span className="text-[10px] font-mono text-slate-400">p.020</span>
                          </div>

                          <p className="text-slate-600 mb-2">
                            我們在推理或評論時，經常因為不小心或偏見而掉入以下九種「看似正確、實則荒謬」的思考陷阱。請點選下方九大謬誤卡片，研讀牠們在課本中的經典案例，並可以寫下你聽過的類似說法：
                          </p>

                          {/* Fallacy Bento Grid catalog */}
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {[
                              { id: 1, name: "非黑即白謬誤", emoji: "⚖️", color: "from-rose-50 to-rose-100/30 border-rose-200 text-rose-950" },
                              { id: 2, name: "以偏概全謬誤", emoji: "🔬", color: "from-orange-50 to-orange-100/30 border-orange-200 text-orange-950" },
                              { id: 3, name: "滑坡謬誤", emoji: "🛷", color: "from-amber-50 to-amber-100/30 border-amber-200 text-amber-950" },
                              { id: 4, name: "稻草人謬誤", emoji: "🌾", color: "from-yellow-50 to-yellow-100/30 border-yellow-200 text-yellow-950" },
                              { id: 5, name: "人身攻擊謬誤", emoji: "🤬", color: "from-purple-50 to-purple-100/30 border-purple-200 text-purple-950" },
                              { id: 6, name: "歧義謬誤", emoji: "👥", color: "from-pink-50 to-pink-100/30 border-pink-200 text-pink-950" },
                              { id: 7, name: "訴諸無知謬誤", emoji: "👽", color: "from-slate-50 to-slate-100/30 border-slate-200 text-slate-950" },
                              { id: 8, name: "輕下斷言謬誤", emoji: "🔗", color: "from-blue-50 to-blue-100/30 border-blue-200 text-blue-950" },
                              { id: 9, name: "訴諸群眾謬誤", emoji: "🗣️", color: "from-emerald-50 to-emerald-100/30 border-emerald-200 text-emerald-950" }
                            ].map((item, idx) => {
                              const isSelected = selectedFallacyIndex === idx;
                              return (
                                <div key={item.id} className="space-y-1">
                                  <button
                                    onClick={() => setSelectedFallacyIndex(isSelected ? null : idx)}
                                    className={`w-full text-left p-3 rounded-xl border bg-gradient-to-br transition-all hover:scale-[1.02] cursor-pointer flex items-center justify-between ${
                                      isSelected ? item.color + ' ring-1 ring-amber-500' : 'from-white to-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100/80'
                                    }`}
                                  >
                                    <span className="font-black text-xs flex items-center gap-1.5">
                                      <span>{item.emoji}</span>
                                      <span>{idx + 1}. {item.name}</span>
                                    </span>
                                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isSelected ? 'rotate-180 text-amber-600' : 'text-slate-400'}`} />
                                  </button>

                                  {isSelected && (
                                    <motion.div
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      className="p-3 bg-white border border-slate-200 rounded-xl space-y-2.5 text-[11px] shadow-3xs"
                                    >
                                      {/* Definitions and examples according to textbook image 5 */}
                                      <div className="text-slate-700 leading-normal font-semibold">
                                        <p className="text-slate-900 font-extrabold border-b border-slate-100 pb-1 flex items-center gap-1">
                                          <span>📖 課本學理定義：</span>
                                        </p>
                                        <p className="mt-1 bg-slate-50 p-2 rounded-lg border border-slate-100/80 leading-relaxed text-slate-600">
                                          {idx === 0 && "會將現實分成兩個相互對立、完全不交集、沒有模糊地帶的兩塊。"}
                                          {idx === 1 && "以少數例子或特殊的情形，推論出普通的結構。"}
                                          {idx === 2 && "使用一連串的因果推論，誇大了每個環節的因果強度，卻得不到合理的結論，最典型就是「如果發生 A，接著就會發生 B，接著就會發生 C，依此類推……，接著就會發生 Z」。"}
                                          {idx === 3 && "曲解對方的論點，針對曲解後的論點（替身稻草人）攻擊，再宣稱已推翻對方論點的論證方式。"}
                                          {idx === 4 && "用說話對象個人的特徵（個性、性別、長相、外表、穿著、社會地位等），來作為確立或者推翻某個「判斷」真假的依據。"}
                                          {idx === 5 && "一個詞彙在不同脈絡下有著不完全一樣的意義，當意義的差異性很模糊時，就可能造成謬誤。"}
                                          {idx === 6 && "判斷某事物時，以「沒有證據」或「不知道」來推論。通常發生在個人對於事物沒有充分的認知。"}
                                          {idx === 7 && "從兩個事物可能存在相關性，就推導出二者的因果關係。"}
                                          {idx === 8 && "將許多人或所有人所相信的事情視為真實，也是因為從眾效應所衍生的謬誤。"}
                                        </p>
                                      </div>

                                      <div className="text-slate-700 leading-normal font-semibold">
                                        <p className="text-slate-900 font-extrabold border-b border-slate-100 pb-1 flex items-center gap-1">
                                          <span>💬 課本經典範例：</span>
                                        </p>
                                        <blockquote className="mt-1 border-l-2 border-amber-500 pl-2.5 py-0.5 text-slate-800 font-bold italic">
                                          {idx === 0 && "「不陪我上廁所，就不是朋友。」"}
                                          {idx === 1 && "「台北市的交通很便利，代表全台灣的交通都很便利。」"}
                                          {idx === 2 && "「如可華爸爸在 P.6 說：『如果不讀書，考不上好高中，就完蛋了。』的連鎖推論。」"}
                                          {idx === 3 && "曉萍說：「該去洗手了。」可華回答：「妳是嫌我不注意衛生、不愛乾淨！」"}
                                          {idx === 4 && "「醜人多作怪」、「肥宅」。用個人特質取代論點邏輯。"}
                                          {idx === 5 && "曉萍說：「店家關門了！」（此時的關門有可能是指今天打烊，也有可能是指徹底倒閉歇業，概念混淆。）"}
                                          {idx === 6 && "可華說：「我們對於外星人一無所知，這正好證明他們並不存在。」"}
                                          {idx === 7 && "「死刑判決越多，謀殺犯罪率越高，因此執行死刑會導致更多的謀殺。」（相關性不代表因果）"}
                                          {idx === 8 && "甲：「這次投票我們應該投給二號候選人。」乙：「為什麼？」甲：「我身邊的人都要投給他，而且他的民調最高，是最適當的人選。」"}
                                        </blockquote>
                                      </div>

                                      <div className="pt-1.5 space-y-1">
                                        <span className="text-[10px] text-slate-400 font-black">🧩 生活雷達（我的生活舉例）：</span>
                                        <textarea
                                          disabled={role === 'teacher' || isSubmitted}
                                          rows={1.5}
                                          value={answers[`p20_fallacy_ex_${idx+1}`] || ''}
                                          onChange={(e) => updateAnswer(`p20_fallacy_ex_${idx+1}`, e.target.value)}
                                          placeholder="請在此處寫下你聽過類似的生活言論..."
                                          className="w-full text-[10px] p-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-amber-500 leading-normal font-semibold"
                                        />
                                      </div>
                                    </motion.div>
                                  )}
                                </div>
                              );
                            })}
                          </div>

                          <div className="bg-amber-50/20 border border-amber-100 p-3.5 rounded-xl text-center text-[11px] text-slate-600 font-bold">
                            💡 提示：點擊上方九大謬誤卡片可以展開詳細的學理學理與經典課本例子，並支援寫下你自創的生活案例。這有助於你完成第 21 頁的謬誤偵查站任務喔！
                          </div>
                        </div>
                      )}

                      {currentPage === 21 && (
                        <div className="space-y-5 text-xs text-slate-700 leading-relaxed font-semibold">
                          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                            <h2 className="text-base font-black text-slate-900 flex items-center gap-1.5">
                              <span className="text-emerald-600 font-black">LIFE 心動力</span>
                              <span>認識偵查站──這樣說，有問題？</span>
                              <span className="text-slate-300 font-normal">|</span>
                              <span className="text-blue-900">課堂實戰演練</span>
                            </h2>
                            <span className="text-[10px] font-mono text-slate-400">p.021</span>
                          </div>

                          <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl space-y-1.5">
                            <span className="text-xs font-black text-emerald-950 flex items-center gap-1">
                              🔍 偵查指令：
                            </span>
                            <p className="text-[11px] text-slate-600 font-medium">
                              請試著判斷以下 6 個日常情境的謬誤類型，並寫出你在生活中聽過的類似案例。
                              <strong>(可選選項：A 非黑即白謬誤、B 滑坡謬誤、C 稻草人謬誤、D 以偏概全謬誤、E 訴諸群眾謬誤、F 輕下斷言謬誤)</strong>
                            </p>
                          </div>

                          {/* 6 Interactive Scenario Cards */}
                          <div className="space-y-4">
                            {[
                              {
                                id: 1,
                                scenario: "小文說：『如果我沒有就讀明星高中，就考不上好大學，再來就無法唸研究所，接著會找不到好工作，然後這一生就毀了！』",
                                correct: "B",
                                name: "滑坡謬誤",
                                hint: "一連串誇大的因果鏈條，最後得出極端結論。"
                              },
                              {
                                id: 2,
                                scenario: "可華和小文都是雙魚座又很浪漫，因此證明雙魚座的人都很浪漫。",
                                correct: "D",
                                name: "以偏概全謬誤",
                                hint: "以少數（兩個雙魚座）推論出全體（所有雙魚座）的結論。"
                              },
                              {
                                id: 3,
                                scenario: "因為大家都說留長髮比較有氣質，所以曉萍決定從現在起，都不剪頭髮了！",
                                correct: "E",
                                name: "訴諸群眾謬誤",
                                hint: "因為「大家都說」就全盤採信，將大眾偏好當作客觀真理。"
                              },
                              {
                                id: 4,
                                scenario: "博鈞說：『你若不是我的朋友，就是我的敵人。』",
                                correct: "A",
                                name: "非黑即白謬誤",
                                hint: "將複雜的朋友關係極端化，排除所有灰色地帶與模糊可能。"
                              },
                              {
                                id: 5,
                                scenario: "新聞評論員說：『喜歡看動漫的都是宅男，看太多動漫產生不切實際的幻想就會引發犯罪。』",
                                correct: "F",
                                name: "輕下斷言謬誤",
                                hint: "直接將喜歡看動漫與引發犯罪畫上不當因果，輕易得出斷言。"
                              },
                              {
                                id: 6,
                                scenario: "可華說：『好朋友之間應該互相信任。』博鈞回答：『你的意思是說我不夠信任你嗎？我對你那麼好，你竟然這樣誤會我，我真的對你很失望。』",
                                correct: "C",
                                name: "稻草人謬誤",
                                hint: "曲解可華善意的「互相勉勵」，立起一個「你在懷疑我不夠信任」的假靶子進行情緒攻擊。"
                              }
                            ].map((scen) => {
                              const studentSelect = answers[`p21_scen${scen.id}_fallacy`] || '';
                              const isCorrect = studentSelect === scen.correct;
                              const isWrong = studentSelect && studentSelect !== scen.correct;

                              return (
                                <div key={scen.id} className="bg-white border border-slate-200/80 rounded-xl p-4 space-y-3.5 shadow-3xs hover:border-slate-300 transition-all">
                                  <div className="flex items-start justify-between gap-4">
                                    <span className="text-[10px] font-black bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md shrink-0">
                                      情境 {scen.id}
                                    </span>
                                    <div className="flex-1 text-[11.5px] font-black text-slate-800 leading-relaxed bg-slate-50/50 p-3 rounded-xl border border-slate-100">
                                      💬 {scen.scenario}
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1.5 border-t border-slate-100/50">
                                    {/* Dropdown fallacy selection */}
                                    <div className="space-y-1">
                                      <span className="text-[10px] text-slate-400 font-black block">🕵️ 謬誤偵查診斷：</span>
                                      <div className="flex items-center gap-2">
                                        <select
                                          disabled={role === 'teacher' || isSubmitted}
                                          value={studentSelect}
                                          onChange={(e) => updateAnswer(`p21_scen${scen.id}_fallacy`, e.target.value)}
                                          className={`w-full text-xs p-2 rounded-lg border outline-none font-bold transition-all cursor-pointer ${
                                            isCorrect
                                              ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                                              : isWrong
                                                ? 'bg-rose-50 border-rose-300 text-rose-800'
                                                : 'bg-white border-slate-200 focus:border-amber-500'
                                          }`}
                                        >
                                          <option value="">-- 請選擇謬誤類型 --</option>
                                          <option value="A">A. 非黑即白謬誤</option>
                                          <option value="B">B. 滑坡謬誤</option>
                                          <option value="C">C. 稻草人謬誤</option>
                                          <option value="D">D. 以偏概全謬誤</option>
                                          <option value="E">E. 訴諸群眾謬誤</option>
                                          <option value="F">F. 輕下斷言謬誤</option>
                                        </select>

                                        {isCorrect && (
                                          <span className="text-emerald-600 font-mono text-xs flex items-center gap-0.5 shrink-0 font-bold" title="答對了！">
                                            ✔️ 答對！
                                          </span>
                                        )}
                                        {isWrong && (
                                          <span className="text-rose-500 font-mono text-[10px] shrink-0" title={scen.hint}>
                                            ❌ 提示：{scen.hint.substring(0, 10)}...
                                          </span>
                                        )}
                                      </div>
                                    </div>

                                    {/* Student example input */}
                                    <div className="space-y-1">
                                      <span className="text-[10px] text-slate-400 font-black block">✍️ 我的生活類似案例：</span>
                                      <input
                                        type="text"
                                        disabled={role === 'teacher' || isSubmitted}
                                        value={answers[`p21_scen${scen.id}_example`] || ''}
                                        onChange={(e) => updateAnswer(`p21_scen${scen.id}_example`, e.target.value)}
                                        placeholder="請寫下你身邊聽過類似邏輯的話..."
                                        className="w-full text-[11px] p-2 rounded-lg border border-slate-200 outline-none focus:border-amber-500 font-bold bg-white leading-normal"
                                      />
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          {/* Academic Summary Card at the bottom of Page 21 */}
                          <div className="bg-gradient-to-br from-emerald-50 via-teal-50/10 to-transparent border border-emerald-150 p-4 rounded-xl space-y-2">
                            <h4 className="text-xs font-black text-emerald-950 flex items-center gap-1">
                              <span>🌱</span>
                              <span>學理總整理：批判思考的真正意義</span>
                            </h4>
                            <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">
                              學習正確思考的方法與技能，包括認識正確思考的基本邏輯及辨識謬誤類型，我們可以常常在生活中自我練習。
                            </p>
                            <p className="text-[11px] text-slate-600 leading-relaxed font-semibold">
                              正確思考方法與技能的運用有助於<strong>批判性思考（critical thinking）</strong>。而批判性思考批判的是<strong>「思考」</strong>而不是人，是檢視和反思「思考」是否符合邏輯，推論有無預設立場和先入為主等影響我們的思考，進而讓我們做出正確的判斷。
                            </p>
                          </div>
                        </div>
                      )}

                      {currentPage === 22 && (
                        <div className="space-y-5 text-xs text-slate-700 leading-relaxed font-semibold">
                          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                            <h2 className="text-base font-black text-slate-900 flex items-center gap-1.5">
                              <span className="text-amber-500 font-black">第 2 章</span>
                              <span>思考的邏輯與方法</span>
                              <span className="text-slate-300 font-normal">|</span>
                              <span className="text-blue-900">一 善用邏輯思考</span>
                            </h2>
                            <span className="text-[10px] font-mono text-slate-400">p.022</span>
                          </div>

                          <p className="text-slate-600 indent-6">
                            「你講話怎麼沒邏輯？」在日常生活中，我們常會聽到別人這樣批評、指責他人的發言，或是當我們在看電視、划手機看社群平台時，常會發現有些人說的話或是論點怪怪的、不合理，但我們卻很難具體說出哪裡不合理。此時，我們需要一些思考方法協助我們看清問題。
                          </p>

                          <p className="text-slate-600 indent-6">
                            傳統邏輯是從亞里斯多德（Aristotle）的三段論（Syllogism）開始。三段論是一種古典的邏輯推理方式，其結構通常是由大前提（一般性原理）、小前提（特殊案例）以及結論（推導出的結果）三部分組成。
                          </p>

                          {/* Aristotle Syllogism Interactive Viewer */}
                          <div className="space-y-3">
                            <div className="flex gap-2">
                              <button
                                onClick={() => setP22ActiveTab('picasso')}
                                className={`flex-1 py-2 px-3 rounded-lg text-center font-black transition-all text-[11px] cursor-pointer ${
                                  p22ActiveTab === 'picasso'
                                    ? 'bg-amber-600 text-white shadow-xs'
                                    : 'bg-slate-50 text-slate-600 border border-slate-250 hover:bg-slate-100'
                                }`}
                              >
                                🏛️ 經典畢卡索三段論範例
                              </button>
                              <button
                                onClick={() => setP22ActiveTab('custom')}
                                className={`flex-1 py-2 px-3 rounded-lg text-center font-black transition-all text-[11px] cursor-pointer ${
                                  p22ActiveTab === 'custom'
                                    ? 'bg-amber-600 text-white shadow-xs'
                                    : 'bg-slate-50 text-slate-600 border border-slate-250 hover:bg-slate-100'
                                }`}
                              >
                                🧩 課後思維實戰配對
                              </button>
                            </div>

                            <AnimatePresence mode="wait">
                              {p22ActiveTab === 'picasso' ? (
                                <motion.div
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -5 }}
                                  className="p-4 bg-gradient-to-br from-amber-50/50 to-white border border-amber-200/60 rounded-2xl space-y-4"
                                >
                                  <div className="border-b border-amber-100/50 pb-2 flex items-center justify-between">
                                    <h4 className="font-black text-xs text-amber-950 flex items-center gap-1">
                                      <span>🎨</span>
                                      <span>課本經典案例：畢卡索會死嗎？</span>
                                    </h4>
                                    <span className="text-[10px] text-slate-400 font-bold">亞里斯多德三段論結構</span>
                                  </div>

                                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 relative">
                                    {/* Big Premise */}
                                    <div className="bg-amber-500/10 border border-amber-500/25 p-3 rounded-xl flex flex-col justify-between">
                                      <div>
                                        <span className="text-[10px] font-black bg-amber-500/20 text-amber-900 px-1.5 py-0.2 rounded-md">大前提</span>
                                        <p className="text-[11.5px] font-black text-slate-850 mt-1.5">
                                          「所有的人都會死。」
                                        </p>
                                      </div>
                                      <span className="text-[9px] text-amber-650 font-semibold mt-2">（一般性的原理與規律）</span>
                                    </div>

                                    {/* Small Premise */}
                                    <div className="bg-amber-500/10 border border-amber-500/25 p-3 rounded-xl flex flex-col justify-between">
                                      <div>
                                        <span className="text-[10px] font-black bg-amber-500/20 text-amber-900 px-1.5 py-0.2 rounded-md">小前提</span>
                                        <p className="text-[11.5px] font-black text-slate-850 mt-1.5">
                                          「畢卡索是人。」
                                        </p>
                                      </div>
                                      <span className="text-[9px] text-amber-650 font-semibold mt-2">（具體、特殊的個案狀況）</span>
                                    </div>

                                    {/* Conclusion */}
                                    <div className="bg-blue-500/10 border border-blue-500/25 p-3 rounded-xl flex flex-col justify-between">
                                      <div>
                                        <span className="text-[10px] font-black bg-blue-500/20 text-blue-900 px-1.5 py-0.2 rounded-md">結論</span>
                                        <p className="text-[11.5px] font-black text-slate-850 mt-1.5">
                                          「所以，畢卡索會死。」
                                        </p>
                                      </div>
                                      <span className="text-[9px] text-blue-650 font-semibold mt-2">（合乎邏輯推導的必然結果）</span>
                                    </div>
                                  </div>

                                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/60 text-[10.5px] text-slate-600 leading-relaxed font-semibold">
                                    💡 <strong>學理要點：</strong> 這種由普遍原理推演到個別結論的過程，在邏輯學上稱為 <strong>演繹推論 (Deductive Reasoning)</strong>。如果大前提為真、小前提為真，且推論結構正確，結論必然為真，這是一個極其嚴密的有效論證形式。
                                  </div>
                                </motion.div>
                              ) : (
                                <motion.div
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, y: -5 }}
                                  className="p-4 bg-gradient-to-br from-indigo-50/40 to-white border border-indigo-150 rounded-2xl space-y-3"
                                >
                                  <div className="border-b border-indigo-100 pb-2 flex items-center justify-between">
                                    <h4 className="font-black text-xs text-indigo-950 flex items-center gap-1">
                                      <span>🐱</span>
                                      <span>思維挑戰：小白與四條腿</span>
                                    </h4>
                                    <span className="text-[10px] text-slate-400 font-bold">點選你的結論推理</span>
                                  </div>

                                  <div className="p-3 bg-indigo-50/50 rounded-xl space-y-1.5 text-[11px] text-slate-700">
                                    <p><strong>大前提：</strong> 「所有貓咪都有四條腿。」</p>
                                    <p><strong>小前提：</strong> 「小白是一隻貓咪。」</p>
                                    <p className="font-black text-indigo-900 mt-1">請推理出「結論」應為下列何者？</p>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                    {[
                                      { key: 'A', text: '所以，四條腿的都是小白。', isCorrect: false },
                                      { key: 'B', text: '所以，小白有四條腿。', isCorrect: true },
                                      { key: 'C', text: '所以，小白是一隻可愛的動物。', isCorrect: false }
                                    ].map((opt) => {
                                      const isSelected = answers['p22_challenge'] === opt.key;
                                      return (
                                        <button
                                          key={opt.key}
                                          disabled={role === 'teacher' || isSubmitted}
                                          onClick={() => updateAnswer('p22_challenge', opt.key)}
                                          className={`p-2 rounded-xl text-left font-black transition-all text-[11px] cursor-pointer border ${
                                            isSelected
                                              ? opt.isCorrect
                                                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                                                : 'bg-rose-50 border-rose-300 text-rose-800'
                                              : 'bg-white border-slate-250 hover:bg-slate-50 text-slate-600'
                                          }`}
                                        >
                                          <div className="flex items-center gap-1">
                                            <span>{opt.key === 'B' && isSelected ? '✔️' : opt.key !== 'B' && isSelected ? '❌' : '⚪'}</span>
                                            <span>{opt.text}</span>
                                          </div>
                                        </button>
                                      );
                                    })}
                                  </div>

                                  {answers['p22_challenge'] && (
                                    <div className={`p-2 rounded-lg text-[10px] font-bold ${answers['p22_challenge'] === 'B' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-55/60 text-rose-800'}`}>
                                      {answers['p22_challenge'] === 'B' 
                                        ? "🎉 答對了！大前提說所有貓有四條腿，小前提說小白是貓，那麼小白一定也有四條腿。這是完全符合亞里斯多德三段論邏輯形式的有效推論！"
                                        : "❌ 不對喔。雖然小白可能很可愛，但『小白很可愛』並非由前提中的『貓有四條腿』必然推導出來的；而『四條腿都是小白』則犯了把範圍擴大、本末倒置的邏輯錯誤。"}
                                    </div>
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>

                          {/* Classroom Reflection */}
                          <div className="pt-2 border-t border-slate-100">
                            <label className="text-[11px] font-black text-slate-900 block mb-1.5 flex items-center gap-1">
                              <Lightbulb className="w-4 h-4 text-amber-500 animate-pulse" />
                              ✍️ 課堂思辨：你覺得在日常溝通中，先把說話者的「大前提」與「小前提」找出來，有助於釐清雙方的想法、避免雞同鴨講嗎？為什麼？
                            </label>
                            <textarea
                              disabled={role === 'teacher' || isSubmitted}
                              rows={3.5}
                              value={answers['p22_reflection'] || ''}
                              onChange={(e) => updateAnswer('p22_reflection', e.target.value)}
                              placeholder="例如：非常有幫助。因為很多人說話時會隱藏自己的大前提（偏見或不合理的假設）。如果我們把大前提拆解出來檢視，就能發現爭執的根本原因在哪裡，而不只是在情緒上爭吵..."
                              className="w-full text-xs p-3 rounded-xl border border-slate-200 outline-none focus:border-amber-500 leading-relaxed font-semibold bg-white shadow-3xs"
                            />
                          </div>
                        </div>
                      )}

                      {currentPage === 27 && (
                        <div className="space-y-5 text-xs text-slate-700 leading-relaxed font-semibold">
                            <div className="flex items-center gap-2 border-b border-red-200 pb-2">
                              <span className="px-2 py-0.5 bg-red-600 text-white rounded-lg text-[9px] font-black">🔥 網路炎上事件偵查站</span>
                              <h4 className="text-xs font-black text-red-950">實戰演練：網紅公審導盲犬事件</h4>
                            </div>

                            <div className="bg-white p-3 border border-red-100 rounded-xl space-y-1.5 text-[10.5px]">
                              <p className="font-bold text-slate-800 leading-relaxed">
                                📢 <strong>事件背景：</strong>
                                <br />
                                某天中午，一位百萬網紅在IG限動發布影片怒控：「某高檔牛排館竟然允許顧客帶寵物狗進店，甚至讓牠待在座位旁，這太不衛生了！我要求店家道歉並改善！」影片瞬間引爆網友怒火，千人湧入牛排館Google地標留下一星差評，並抵制該店。結果事後餐廳出面澄清，該顧客是視障者，攜帶的是依法受保障的<strong>「合格導盲犬」</strong>。爆料網紅隨後刪文，並坦承「當時沒看清楚，以為只是一般寵物犬」。
                              </p>
                            </div>

                            <p className="text-[10.5px] text-slate-500 font-medium">
                              請運用 <strong>5W1H 思考法</strong> 來重新解讀這個網路風波：
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div className="space-y-1">
                                <label className="text-[10px] text-slate-600 font-black block">1. Who（關係人是誰？誰爆料的？影響了誰？）</label>
                                <textarea
                                  disabled={role === 'teacher' || isSubmitted}
                                  rows={1.5}
                                  value={answers['p27_5w1h_who'] || ''}
                                  onChange={(e) => updateAnswer('p27_5w1h_who', e.target.value)}
                                  placeholder="關係人包括：網紅（爆料者）、餐廳店家（被波及者）、視障者與導盲犬（當事人）、廣大網友..."
                                  className="w-full text-[10.5px] p-2 rounded-lg border border-slate-200 outline-none bg-white font-semibold"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] text-slate-600 font-black block">2. What（發生了什麼事？客觀事實為何？）</label>
                                <textarea
                                  disabled={role === 'teacher' || isSubmitted}
                                  rows={1.5}
                                  value={answers['p27_5w1h_what'] || ''}
                                  onChange={(e) => updateAnswer('p27_5w1h_what', e.target.value)}
                                  placeholder="事實是一隻合格的導盲犬依法陪同視障主人進餐，而非一般寵物犬隨意進入禁寵餐廳..."
                                  className="w-full text-[10.5px] p-2 rounded-lg border border-slate-200 outline-none bg-white font-semibold"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] text-slate-600 font-black block">3. Why（網紅為何要爆料？網友為何憤怒？）</label>
                                <textarea
                                  disabled={role === 'teacher' || isSubmitted}
                                  rows={1.5}
                                  value={answers['p27_5w1h_why'] || ''}
                                  onChange={(e) => updateAnswer('p27_5w1h_why', e.target.value)}
                                  placeholder="網紅基於「守護店內衛生」的直覺與好勝心爆料；網友則出於對特權不遵守公德的集體正義感而憤怒..."
                                  className="w-full text-[10.5px] p-2 rounded-lg border border-slate-200 outline-none bg-white font-semibold"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] text-slate-600 font-black block">4. How（網友應如何理性反應而非炎上？）</label>
                                <textarea
                                  disabled={role === 'teacher' || isSubmitted}
                                  rows={1.5}
                                  value={answers['p27_5w1h_how'] || ''}
                                  onChange={(e) => updateAnswer('p27_5w1h_how', e.target.value)}
                                  placeholder="網友應保持「暫時懷疑」，先詢問餐廳查證是否有特殊需求，不急著轉發、留言和洗負評..."
                                  className="w-full text-[10.5px] p-2 rounded-lg border border-slate-200 outline-none bg-white font-semibold"
                                />
                              </div>
                            </div>

                            <div className="pt-2 border-t border-red-200/60">
                              <label className="text-[10px] text-red-950 font-black block leading-normal mb-1">
                                💬 思考與反思：請用「正確思考三部曲」剖析此炎上事件，我們該如何建立「理性的直覺」？
                              </label>
                              <textarea
                                disabled={role === 'teacher' || isSubmitted}
                                rows={2.5}
                                value={answers['p27_reflection_text'] || ''}
                                onChange={(e) => updateAnswer('p27_reflection_text', e.target.value)}
                                placeholder="1. 掌握事實：確認那是一隻有戴導盲鞍的導盲犬。2. 分辨價值：雖然店內衛生重要，但視障者與導盲犬的無障礙路權是更權威的社會平權價值。3. 正確判斷：當我們看見看似不合理的現狀時，不應依憑慣性直覺進行公審，而應先虛心查證，給予每個人基本的尊重..."
                                className="w-full text-[10.5px] p-2.5 rounded-lg border border-slate-200 outline-none bg-white font-semibold"
                              />
                            </div>
                          </div>
                        )}

                      {currentPage === 28 && (
                        <div className="space-y-5 text-xs text-slate-700 leading-relaxed font-semibold">
                          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                            <h2 className="text-base font-black text-slate-900 flex items-center gap-1.5">
                              <span className="text-amber-500 font-black">第 2 章</span>
                              <span>思考的邏輯與方法</span>
                              <span className="text-slate-300 font-normal">|</span>
                              <span className="text-blue-900">四 三「思」而後「行」：超車事故案例</span>
                            </h2>
                            <span className="text-[10px] font-mono text-slate-400">p.028</span>
                          </div>

                          <p className="text-slate-600 indent-6 text-justify">
                            我們日常生活中做的許多決定，都會帶來相應的結果。有時一個微小的、缺乏思考的衝動抉擇，可能會造成一輩子無法挽回的遺憾。林從一教授強調，理性思考絕非抽象的理論，而是能指引我們化險為夷、走向幸福的實戰工具。
                          </p>

                          {/* Overtaking Incident Container */}
                          <div className="bg-amber-50/20 border border-amber-200 rounded-2xl p-4.5 space-y-4 shadow-3xs">
                            <div className="flex items-center gap-2 border-b border-amber-200 pb-2">
                              <span className="px-2.5 py-0.5 bg-amber-600 text-white rounded-lg text-[9px] font-black">🏍️ 交通安全生活劇場</span>
                              <h4 className="text-xs font-black text-amber-950">課堂探討：王博鈞的過彎超車自撞意外</h4>
                            </div>

                            <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                              剛過 18 歲生日並考到駕照的大一新生王博鈞，騎機車載著朋友去北宜公路出遊。在一個連環彎道處，博鈞因為不耐前方慢車擋路，心中湧起「我壓車技術超好，這點彎度算什麼，一定過得去！」的慣性與好勝心。他不顧前方盲區盲點，強行加速超車，卻沒想到對向猛然開來一輛載重砂石車！為了閃避砂石車，博鈞車速過快失控撞上護欄摔入水溝，造成自己大腿嚴重骨裂、右臂挫傷入院休養半年，後座好友也多處擦傷，新買的機車幾近全毀。家長痛心不已，後座好友的父母也對此提出賠償要求。
                            </p>

                            {/* Stepper with the 3 pillars */}
                            <div className="grid grid-cols-3 gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200/60">
                              {(['fact', 'value', 'judgment'] as const).map((step) => {
                                const isActive = p28ActiveTab === step;
                                return (
                                  <button
                                    key={step}
                                    type="button"
                                    onClick={() => setP28ActiveTab(step)}
                                    className={`py-2 px-1 rounded-lg text-center font-black transition-all text-[10.5px] cursor-pointer ${
                                      isActive
                                        ? step === 'fact'
                                          ? 'bg-blue-600 text-white shadow-xs'
                                          : step === 'value'
                                            ? 'bg-amber-650 text-white shadow-xs'
                                            : 'bg-emerald-650 text-white shadow-xs'
                                        : 'bg-white text-slate-600 border border-slate-200'
                                    }`}
                                  >
                                    {step === 'fact' ? '1. 掌握事實' : step === 'value' ? '2. 分辨價值' : '3. 正確判斷'}
                                  </button>
                                );
                              })}
                            </div>

                            <AnimatePresence mode="wait">
                              <motion.div
                                key={p28ActiveTab}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className={`p-4 rounded-xl border-l-4 shadow-3xs ${
                                  p28ActiveTab === 'fact'
                                    ? 'bg-blue-50/50 border-blue-500 text-blue-950'
                                    : p28ActiveTab === 'value'
                                      ? 'bg-amber-50/50 border-amber-600 text-amber-950'
                                      : 'bg-emerald-50/50 border-emerald-600 text-emerald-950'
                                }`}
                              >
                                {p28ActiveTab === 'fact' && (
                                  <div className="space-y-2">
                                    <h4 className="font-black text-xs text-blue-950">🟦 1. 掌握事實 (Clarify Facts)</h4>
                                    <p className="text-[10.5px] text-slate-600 font-medium">
                                      博鈞在決定超車時，忽略了哪些重要的「客觀事實」？這些事實與他的主觀幻想有何差距？
                                    </p>
                                    <textarea
                                      disabled={role === 'teacher' || isSubmitted}
                                      rows={2}
                                      value={answers['p28_fact_text'] || ''}
                                      onChange={(e) => updateAnswer('p28_fact_text', e.target.value)}
                                      placeholder="他忽略了：1. 彎道視線盲區，無法確定對向有無來車。2. 山區路面可能有砂石、起伏或水漬，嚴重影響抓地力。3. 機車承載兩人時煞車距離與轉向物理極限會大幅改變。他的主觀幻想是『我技術好就沒事』，完全違背了物理與道路事實..."
                                      className="w-full text-[10.5px] p-2 rounded-md border border-blue-150 outline-none bg-white font-semibold focus:border-blue-500"
                                    />
                                  </div>
                                )}
                                {p28ActiveTab === 'value' && (
                                  <div className="space-y-2">
                                    <h4 className="font-black text-xs text-amber-950">🟧 2. 分辨價值 (Identify Values)</h4>
                                    <p className="text-[10.5px] text-slate-600 font-medium">
                                      在這次超車中，博鈞所追求的價值（如一時的快感、面子、技術展現）與哪些更重要的核心價值發生了劇烈衝突？
                                    </p>
                                    <textarea
                                      disabled={role === 'teacher' || isSubmitted}
                                      rows={2}
                                      value={answers['p28_value_text'] || ''}
                                      onChange={(e) => updateAnswer('p28_value_text', e.target.value)}
                                      placeholder="他盲目追求「一時的帥氣、面子、刺激感與速度」，這與「自己和後座朋友的生命安全、對他人家庭的責任、家人的信任與不擔憂、健康的身體」等核心價值發生嚴重衝突。顯然，一時的虛榮根本無法與長遠的生命安全與家庭責任相提並論..."
                                      className="w-full text-[10.5px] p-2 rounded-md border border-amber-200 outline-none bg-white font-semibold focus:border-amber-500"
                                    />
                                  </div>
                                )}
                                {p28ActiveTab === 'judgment' && (
                                  <div className="space-y-2">
                                    <h4 className="font-black text-xs text-emerald-950">🟩 3. 正確判斷 (Make Rational Decisions)</h4>
                                    <p className="text-[10.5px] text-slate-600 font-medium">
                                      結合事實與價值的權衡，博鈞本應做出什麼樣的理性判斷？身為用路人，你學到了什麼用路承諾？
                                    </p>
                                    <textarea
                                      disabled={role === 'teacher' || isSubmitted}
                                      rows={2}
                                      value={answers['p28_judgment_text'] || ''}
                                      onChange={(e) => updateAnswer('p28_judgment_text', e.target.value)}
                                      placeholder="他本應做出『不強行超車、在安全路段才超車，或者保持車距慢行』的理性判斷。我承諾以後：絕不在視線不良、彎道或交岔路口超車，騎車不鬥氣，隨時採取防禦駕駛態度，將生命安全視為用路的第一最高原則..."
                                      className="w-full text-[10.5px] p-2 rounded-md border border-emerald-200 outline-none bg-white font-semibold focus:border-emerald-500"
                                    />
                                  </div>
                                )}
                              </motion.div>
                            </AnimatePresence>
                          </div>
                        </div>
                      )}

                      {currentPage === 29 && (
                        <div className="space-y-5 text-xs text-slate-700 leading-relaxed font-semibold">
                          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                            <h2 className="text-base font-black text-slate-900 flex items-center gap-1.5">
                              <span className="text-emerald-600 font-black">MIND 田捕手</span>
                              <span>行人路權優先與防禦駕駛</span>
                              <span className="text-slate-300 font-normal">|</span>
                              <span className="text-blue-900">雙向換位思考</span>
                            </h2>
                            <span className="text-[10px] font-mono text-slate-400">p.029</span>
                          </div>

                          <p className="text-slate-600 indent-6 text-justify">
                            近年來台灣社會高度重視「行人路權」與「行人地獄」議題，政府立法實施<strong>「停讓行人新制」</strong>。然而，用路安全與邏輯思考密不可分，不能只依賴警察的罰單，更需要建立在駕駛人與行人雙方彼此的「換位思考」與「理性防禦思維」中。
                          </p>

                          <p className="text-slate-600 indent-6 text-justify">
                            所謂的<strong>「防禦駕駛（Defensive Driving）」</strong>，就是不只遵守交通法規，更要預測他人可能犯的邏輯與操作錯誤，提前做好防範準備，避免意外發生。以下讓我們一起進行「換位思維」的實戰模擬：
                          </p>

                          {/* Perspective Split Grid */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Driver Perspective Card */}
                            <div className="bg-sky-50/50 border border-sky-200 p-4 rounded-2xl space-y-3 shadow-3xs flex flex-col justify-between">
                              <div className="space-y-1">
                                <span className="px-2 py-0.5 bg-sky-600 text-white rounded-md text-[8.5px] font-black">🚗 駕駛 / 騎士視角</span>
                                <h4 className="text-xs font-black text-sky-950">掌握「車輛盲區與物理限制」事實</h4>
                                <p className="text-[10.5px] text-slate-500 font-medium">
                                  駕駛人開車時存在「A柱盲區」、內輪差，且車子在雨天或下坡煞車時有無法違抗的「煞車物理距離」。當你身為駕駛人，你要如何換位思考行人的心理？
                                </p>
                              </div>
                              <textarea
                                disabled={role === 'teacher' || isSubmitted}
                                rows={2.5}
                                value={answers['p29_perspective_driver'] || ''}
                                onChange={(e) => updateAnswer('p29_perspective_driver', e.target.value)}
                                placeholder="身為駕駛：我不能預設『行人一定看得到我、一定會主動躲我』。我必須理解行人在夜間、雨天穿深色衣服時，能見度極低。在路口轉彎時，一定要先停頓、擺頭探頭避開A柱死角，確認斑馬線無人後才起步..."
                                className="w-full text-[10.5px] p-2.5 rounded-lg border border-sky-100 outline-none bg-white font-semibold focus:border-sky-500"
                              />
                            </div>

                            {/* Pedestrian Perspective Card */}
                            <div className="bg-emerald-50/50 border border-emerald-200 p-4 rounded-2xl space-y-3 shadow-3xs flex flex-col justify-between">
                              <div className="space-y-1">
                                <span className="px-2 py-0.5 bg-emerald-600 text-white rounded-md text-[8.5px] font-black">🚶 行人 / 走路人視角</span>
                                <h4 className="text-xs font-black text-emerald-950">建立「防禦用路、不賭運氣」直覺</h4>
                                <p className="text-[10.5px] text-slate-500 font-medium">
                                  雖然行人有法定的「絕對優先路權」，但斑馬線並非無形防護罩。當你身為行人時，面對路口轉彎的車輛，你要如何保持「防禦駕駛」思維？
                                </p>
                              </div>
                              <textarea
                                disabled={role === 'teacher' || isSubmitted}
                                rows={2.5}
                                value={answers['p29_perspective_pedestrian'] || ''}
                                onChange={(e) => updateAnswer('p29_perspective_pedestrian', e.target.value)}
                                placeholder="身為行人：我不能預設『我是行人，車子一定會讓我』。駕駛可能有盲區、分心滑手機或酒駕。過馬路時我不低頭看手機，隨時用眼神與轉彎車輛駕駛對視，保持警惕、加快步伐通過，不把自己的生命安全賭在別人的守法上..."
                                className="w-full text-[10.5px] p-2.5 rounded-lg border border-emerald-100 outline-none bg-white font-semibold focus:border-emerald-500"
                              />
                            </div>
                          </div>

                          {/* Defensive Thinking Challenge */}
                          <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2">
                            <label className="text-[10.5px] font-black text-slate-900 block flex items-center gap-1">
                              <span>🛡️</span>
                              <span>動腦筋想一想：請寫下你和家人共同討論出的一項最實用的「日常防禦用路行動方案」：</span>
                            </label>
                            <textarea
                              disabled={role === 'teacher' || isSubmitted}
                              rows={2}
                              value={answers['p29_defensive_action'] || ''}
                              onChange={(e) => updateAnswer('p29_defensive_action', e.target.value)}
                              placeholder="例如：我們家討論出的防禦用路方案是：『深夜出門或散步時，一律穿著亮色衣服或戴有反光條的配件；在路口等待過馬路時，絕對不站在靠道路邊緣的第一線，而是後退三步站立，防範轉彎大車輪胎壓上人行道或是內輪差碰撞』..."
                              className="w-full text-xs p-3 rounded-xl border border-slate-200 outline-none focus:border-emerald-500 bg-white"
                            />
                          </div>
                        </div>
                      )}

                      {currentPage === 25 && (
                        <div className="space-y-5 text-xs text-slate-700 leading-relaxed font-semibold">
                          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                            <h2 className="text-base font-black text-slate-900 flex items-center gap-1.5">
                              <span className="text-emerald-600 font-black">LIFE 心動力</span>
                              <span>四種論證型式配對</span>
                              <span className="text-slate-300 font-normal">|</span>
                              <span className="text-blue-900">有效邏輯推理練習</span>
                            </h2>
                            <span className="text-[10px] font-mono text-slate-400">p.025</span>
                          </div>

                          <div className="bg-emerald-500/10 border border-emerald-500/20 p-3.5 rounded-xl space-y-1.5">
                            <span className="text-xs font-black text-emerald-950 flex items-center gap-1">
                              🌿 四大有效論證形式介紹：
                            </span>
                            <div className="grid grid-cols-2 gap-2 text-[9.5px] text-slate-600 font-bold leading-normal">
                              <div className="bg-white/80 p-1.5 rounded border border-emerald-100">
                                <strong>1. 肯定前件 (MP)</strong>：若P則Q。P。故Q。
                              </div>
                              <div className="bg-white/80 p-1.5 rounded border border-emerald-100">
                                <strong>2. 否定後件 (MT)</strong>：若P則Q。非Q。故非P。
                              </div>
                              <div className="bg-white/80 p-1.5 rounded border border-emerald-100">
                                <strong>3. 假言三段論 (HS)</strong>：若P則Q。若Q則R。故若P則R。
                              </div>
                              <div className="bg-white/80 p-1.5 rounded border border-emerald-100">
                                <strong>4. 選言三段論 (DS)</strong>：P或Q。非P。故Q。
                              </div>
                            </div>
                          </div>

                          {/* The 4 textbook questions on page 25 */}
                          <div className="space-y-4">
                            {[
                              {
                                id: 1,
                                p1: "前提 1：幸福高中的學生（P）要穿學校制服（Q）",
                                p2: "前提 2：曉萍是幸福高中的學生（P）",
                                correctType: "MP",
                                correctConclusion: "曉萍要穿學校制服",
                                placeholder: "所以，曉萍要穿學校制服",
                                label: "練習 01"
                              },
                              {
                                id: 2,
                                p1: "前提 1：若小文考試作弊（P），則違反校規（Q）",
                                p2: "前提 2：小文沒有違反校規（非Q）",
                                correctType: "MT",
                                correctConclusion: "小文沒有考試作弊",
                                placeholder: "所以，小文沒有考試作弊",
                                label: "練習 02"
                              },
                              {
                                id: 3,
                                p1: "前提 1：若我是他的好朋友（P），則我希望他快樂（Q）",
                                p2: "前提 2：若我希望他快樂（Q），則我要尊重他（R）",
                                correctType: "HS",
                                correctConclusion: "若我是他的好朋友，我要尊重他",
                                placeholder: "所以，若我是他的好朋友，我要尊重他",
                                label: "練習 03"
                              },
                              {
                                id: 4,
                                p1: "前提 1: 可華是幸福高中（P）或是健康高中（Q）的學生",
                                p2: "前提 2: 可華不是幸福高中的學生（非P）",
                                correctType: "DS",
                                correctConclusion: "可華是健康高中的學生",
                                placeholder: "所以，可華是健康高中的學生",
                                label: "練習 04"
                              }
                            ].map((item) => {
                              const studentConc = answers[`p25_q${item.id}_conclusion`] || '';
                              const studentType = answers[`p25_q${item.id}_type`] || '';
                              const isConcCorrect = studentConc.replace(/\s+/g, '').includes(item.correctConclusion.replace(/\s+/g, '')) || studentConc.length > 4;
                              const isTypeCorrect = studentType === item.correctType;

                              return (
                                <div key={item.id} className="bg-white border border-slate-200 rounded-xl p-3.5 space-y-2.5 shadow-3xs">
                                  <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                                    <span className="text-[10px] font-black bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded-md">
                                      {item.label}
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-bold">三段論推理</span>
                                  </div>

                                  <div className="text-[10.5px] font-bold text-slate-800 space-y-1 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                                    <p>📝 {item.p1}</p>
                                    <p>📝 {item.p2}</p>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    {/* Conclusion input */}
                                    <div className="space-y-1">
                                      <label className="text-[10px] text-slate-400 font-black block">✍️ 試填寫推理出之「結論」：</label>
                                      <input
                                        type="text"
                                        disabled={role === 'teacher' || isSubmitted}
                                        value={studentConc}
                                        onChange={(e) => updateAnswer(`p25_q${item.id}_conclusion`, e.target.value)}
                                        placeholder={item.placeholder}
                                        className="w-full text-xs p-2 rounded-lg border border-slate-200 outline-none focus:border-amber-500 font-bold bg-white"
                                      />
                                    </div>

                                    {/* Dropdown type */}
                                    <div className="space-y-1">
                                      <label className="text-[10px] text-slate-400 font-black block">🕵️ 屬於哪一種有效論證型式？</label>
                                      <select
                                        disabled={role === 'teacher' || isSubmitted}
                                        value={studentType}
                                        onChange={(e) => updateAnswer(`p25_q${item.id}_type`, e.target.value)}
                                        className={`w-full text-xs p-2 rounded-lg border outline-none font-bold transition-all cursor-pointer ${
                                          isTypeCorrect
                                            ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                                            : studentType
                                              ? 'bg-rose-50 border-rose-300 text-rose-800'
                                              : 'bg-white border-slate-200 focus:border-amber-500'
                                        }`}
                                      >
                                        <option value="">-- 請選擇論證型式 --</option>
                                        <option value="MP">1. 肯定前件 (Modus Ponens)</option>
                                        <option value="MT">2. 否定後件 (Modus Tollens)</option>
                                        <option value="HS">3. 假言三段論 (Hypothetical Syllogism)</option>
                                        <option value="DS">4. 選言三段論 (Disjunctive Syllogism)</option>
                                      </select>
                                    </div>
                                  </div>

                                  {studentConc && studentType && (
                                    <div className="text-[9.5px] font-bold flex items-center gap-1.5 pt-1.5 border-t border-slate-50">
                                      {isTypeCorrect ? (
                                        <span className="text-emerald-700">✔️ 邏輯型式選對了！答對了！</span>
                                      ) : (
                                        <span className="text-rose-600">❌ 論證型式似乎不太對喔，再想一想其結構特徵。</span>
                                      )}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {currentPage === 26 && (
                        <div className="space-y-5 text-xs text-slate-700 leading-relaxed font-semibold">
                          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                            <h2 className="text-base font-black text-slate-900 flex items-center gap-1.5">
                              <span className="text-amber-500 font-black">第 2 章</span>
                              <span>思考的邏輯與方法</span>
                              <span className="text-slate-300 font-normal">|</span>
                              <span className="text-blue-900">二 正確思考三部曲</span>
                            </h2>
                            <span className="text-[10px] font-mono text-slate-400">p.026</span>
                          </div>

                          <p className="text-slate-600 indent-6">
                            善用思考方法，了解自己的偏誤並區別、辨識它，進一步在多元的聲音中，掌握事實與主觀觀點的不同，是做出理性判斷的關鍵。對此，林從一教授提出正確的思考方法與技能，主要分為三個層面：
                          </p>

                          {/* Stepper with the 3 pillars */}
                          <div className="grid grid-cols-3 gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-200/60">
                            {(['fact', 'value', 'judgment'] as const).map((step) => {
                              const isActive = p26ActiveTab === step;
                              return (
                                <button
                                  key={step}
                                  onClick={() => setP26ActiveTab(step)}
                                  className={`py-2 px-1 rounded-lg text-center font-black transition-all text-[10.5px] cursor-pointer ${
                                    isActive
                                      ? step === 'fact'
                                        ? 'bg-blue-600 text-white shadow-xs'
                                        : step === 'value'
                                          ? 'bg-amber-650 text-white shadow-xs'
                                          : 'bg-emerald-650 text-white shadow-xs'
                                      : 'bg-white text-slate-600 border border-slate-200'
                                  }`}
                                >
                                  {step === 'fact' ? '1. 掌握事實' : step === 'value' ? '2. 分辨價值' : '3. 正確判斷'}
                                </button>
                              );
                            })}
                          </div>

                          <AnimatePresence mode="wait">
                            <motion.div
                              key={p26ActiveTab}
                              initial={{ opacity: 0, y: 5 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -5 }}
                              className={`p-4 rounded-xl border-l-4 shadow-3xs ${
                                p26ActiveTab === 'fact'
                                  ? 'bg-blue-50/50 border-blue-500 text-blue-950'
                                  : p26ActiveTab === 'value'
                                    ? 'bg-amber-50/50 border-amber-600 text-amber-950'
                                    : 'bg-emerald-50/50 border-emerald-600 text-emerald-950'
                              }`}
                            >
                              {p26ActiveTab === 'fact' && (
                                <>
                                  <h4 className="font-black text-xs text-blue-950 mb-1">🟦 1. 掌握事實 (Clarify Facts)</h4>
                                  <p className="text-[11px] text-slate-600 leading-relaxed font-bold">
                                    確實釐清事實的真相與因果脈絡，收集充分證據，不加入個人情緒化的主觀推測。
                                  </p>
                                </>
                              )}
                              {p26ActiveTab === 'value' && (
                                <>
                                  <h4 className="font-black text-xs text-amber-950 mb-1">🟧 2. 分辨價值 (Identify Values)</h4>
                                  <p className="text-[11px] text-slate-600 leading-relaxed font-bold">
                                    清楚分析在情境中所涉及、衝突的各種內在價值與道德倫理規範（例如：名次 vs 友誼）。
                                  </p>
                                </>
                              )}
                              {p26ActiveTab === 'judgment' && (
                                <>
                                  <h4 className="font-black text-xs text-emerald-950 mb-1">🟩 3. 正確判斷 (Make Rational Decisions)</h4>
                                  <p className="text-[11px] text-slate-600 leading-relaxed font-bold">
                                    在事實與衝突價值之間進行權衡，尋求最佳、最合情合理的雙贏替代方案，指引未來的行動。
                                  </p>
                                </>
                              )}
                            </motion.div>
                          </AnimatePresence>

                          {/* Xiaoping Case Study */}
                          <div className="bg-amber-50/20 border border-amber-200/50 rounded-2xl p-4.5 space-y-3 shadow-3xs">
                            <div className="flex items-center gap-2 border-b border-amber-250 pb-2">
                              <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-lg text-[9px] font-black">📖 課本實例導讀</span>
                              <h4 className="text-xs font-black text-slate-900">大隊接力：曉萍關鍵跌倒的自責</h4>
                            </div>

                            <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                              曉萍在大隊接力比賽中，很努力地跑步，卻在最後關鍵接棒前，不慎摔倒了！這也直接致使班上從原本遙遙領先的第一名變成了第三名。比賽結束後，曉萍非常自責，躲在操場一角偷偷哭泣，覺得都是自己的錯害大家輸了，也擔心同學會討厭、怪罪她...
                            </p>

                            <div className="space-y-3 pt-2.5 border-t border-slate-100/80">
                              <span className="text-[11px] font-black text-slate-800 flex items-center gap-1">
                                💬 思考三部曲實踐反思：
                              </span>

                              <div className="space-y-2.5">
                                <div className="space-y-1">
                                  <label className="text-[10px] text-blue-900 font-black block">1. 掌握事實層面：大隊接力的輸贏是誰的責任？曉萍跌倒真的是她故意害全班輸的嗎？</label>
                                  <textarea
                                    disabled={role === 'teacher' || isSubmitted}
                                    rows={2}
                                    value={answers['p26_fact_text'] || ''}
                                    onChange={(e) => updateAnswer('p26_fact_text', e.target.value)}
                                    placeholder="曉萍絕對不是故意的，跌倒純屬意外。而且大隊接力是 20 個人的團體合作，前段領先也是大家努力，意外跌倒也是全班共同承擔的結果，不該歸咎於一個人..."
                                    className="w-full text-[10.5px] p-2.5 rounded-lg border border-slate-200 outline-none focus:border-amber-500 font-semibold bg-white"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[10px] text-amber-900 font-black block">2. 分辨價值層面：大隊接力比賽的最核心價值，是名次第一，還是班級合作與信任？</label>
                                  <textarea
                                    disabled={role === 'teacher' || isSubmitted}
                                    rows={2}
                                    value={answers['p26_value_text'] || ''}
                                    onChange={(e) => updateAnswer('p26_value_text', e.target.value)}
                                    placeholder="比賽只是平台，核心價值在於凝聚班級向心力、體會合作精神，以及學習在失敗和挫折中互相包容與支持，這遠比一塊塑膠獎牌更有價值..."
                                    className="w-full text-[10.5px] p-2.5 rounded-lg border border-slate-200 outline-none focus:border-amber-500 font-semibold bg-white"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[10px] text-emerald-900 font-black block">3. 正確判斷與行動：如果你是她的同班同學，你該採取什麼行動安慰她？</label>
                                  <textarea
                                    disabled={role === 'teacher' || isSubmitted}
                                    rows={2}
                                    value={answers['p26_judgment_text'] || ''}
                                    onChange={(e) => updateAnswer('p26_judgment_text', e.target.value)}
                                    placeholder="我會走到操場角落遞給她一張面紙，拍拍她說：『妳剛剛拼命跑的樣子超級帥！我們是一起拿到第三名的，沒有人怪妳，我們明天再一起練習！』..."
                                    className="w-full text-[10.5px] p-2.5 rounded-lg border border-slate-200 outline-none focus:border-amber-500 font-semibold bg-white"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {currentPage === 30 && (
                        <div className="space-y-6 text-xs text-slate-700 leading-relaxed font-semibold">
                          {/* Header section matching textbook page numbers and aesthetics */}
                          <div className="border-b-2 border-emerald-500/20 pb-3.5 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-[10px] font-black tracking-wider uppercase">030 CH 1 / 哲學思考</span>
                              <h2 className="text-sm font-black text-slate-800">
                                第 3 章 Life Education 思考的幸福方程式
                              </h2>
                            </div>
                            <span className="text-xs font-mono font-black text-emerald-600/80">p.030</span>
                          </div>

                          {/* Beautiful Display Title */}
                          <div className="text-center py-4 bg-gradient-to-br from-emerald-50/30 via-teal-50/10 to-transparent rounded-2xl border border-emerald-500/10 shadow-3xs">
                            <h1 className="text-xl font-black text-slate-900 tracking-tight flex items-center justify-center gap-1.5">
                              <span className="text-emerald-500">思考的幸福方程式</span>
                            </h1>
                            <p className="text-[10px] text-slate-400 font-bold mt-1">一、 思考的點線面 | 覺察侷限，持續探究</p>
                          </div>

                          {/* Introductory Quote Block */}
                          <div className="relative pl-6 py-4 bg-emerald-50/20 border-l-4 border-emerald-500 rounded-r-2xl shadow-3xs">
                            <span className="absolute -left-2 -top-4 text-6xl text-emerald-200/50 font-serif pointer-events-none select-none">“</span>
                            <p className="text-[12.5px] text-slate-800 font-bold leading-relaxed pr-4 text-justify">
                              生活中許多問題需要透過思考來面對和處理，現實世界充滿了複雜和多元的觀點，思考是對真理和事實的渴望與熱情。我們信以為真或視為理所當然的真實，其實還需要經過反覆的觀察、思考與對話才能確立，除了邏輯的知識 and 技能，也需檢視自己思考的情意和態度。
                            </p>
                          </div>

                          {/* Subtitle Header */}
                          <div className="pt-2 border-b border-slate-100 pb-1.5 flex items-center gap-2">
                            <span className="w-2.5 h-4.5 bg-emerald-500 rounded-sm inline-block"></span>
                            <h3 className="text-sm font-black text-slate-900">一、思考的點線面 ── 覺察侷限，持續探究</h3>
                          </div>

                          {/* Grid containing Optical Illusion & Elephant */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {/* Left Column: Perspective Illusion */}
                            <div className="bg-white border border-slate-200/80 rounded-2xl p-4.5 space-y-3.5 shadow-3xs flex flex-col justify-between">
                              <div className="space-y-1.5">
                                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md text-[9px] font-black">👁️ 視覺盲區實驗室</span>
                                <h4 className="text-xs font-black text-slate-950">視覺與認知的侷限（透視錯覺）</h4>
                                <p className="text-[11px] text-slate-500 font-medium">
                                  你覺得下圖中哪一個人像比較高呢？如果拿手尺測量兩個人像的高度，會發現其實是一樣的。這是我們容易出現的錯覺現象，如果沒有客觀的檢視就會發生錯誤的認識。
                                </p>
                              </div>

                              {/* Interactive CSS Perspective Hallway */}
                              <div className="relative h-44 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
                                {/* Perspective vanishing lines */}
                                <div className="absolute inset-0 opacity-20 pointer-events-none">
                                  <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <line x1="0" y1="10" x2="100" y2="10" stroke="white" strokeWidth="0.5" />
                                    <line x1="0" y1="90" x2="100" y2="90" stroke="white" strokeWidth="0.5" strokeDasharray="2,2" />
                                    {/* Orthogonals meeting in center (50, 50) */}
                                    <line x1="0" y1="0" x2="50" y2="50" stroke="white" strokeWidth="0.5" />
                                    <line x1="100" y1="0" x2="50" y2="50" stroke="white" strokeWidth="0.5" />
                                    <line x1="0" y1="100" x2="50" y2="50" stroke="white" strokeWidth="0.5" />
                                    <line x1="100" y1="100" x2="50" y2="50" stroke="white" strokeWidth="0.5" />
                                    {/* Horizontal depth lines */}
                                    <line x1="10" y1="10" x2="10" y2="90" stroke="white" strokeWidth="0.5" />
                                    <line x1="25" y1="25" x2="25" y2="75" stroke="white" strokeWidth="0.5" />
                                    <line x1="40" y1="40" x2="40" y2="60" stroke="white" strokeWidth="0.5" />
                                  </svg>
                                </div>

                                {/* Reference rulers if toggled */}
                                {showRuler && (
                                  <div className="absolute inset-x-0 inset-y-0 z-20 pointer-events-none">
                                    {/* Horizontal ruler lines */}
                                    <div className="absolute top-[40%] inset-x-0 border-t border-dashed border-red-500 flex justify-between px-2">
                                      <span className="text-[7px] text-red-400 bg-slate-950/80 px-1 rounded">H1 (40%)</span>
                                      <span className="text-[7px] text-red-400 bg-slate-950/80 px-1 rounded">頭部等高線</span>
                                    </div>
                                    <div className="absolute top-[68%] inset-x-0 border-t border-dashed border-red-500 flex justify-between px-2">
                                      <span className="text-[7px] text-red-400 bg-slate-950/80 px-1 rounded">H2 (68%)</span>
                                      <span className="text-[7px] text-red-400 bg-slate-950/80 px-1 rounded">底部等高線</span>
                                    </div>
                                  </div>
                                )}

                                {/* Figure 1 (Left - Foreground, looks normal) */}
                                <div className="absolute left-[15%] bottom-[32%] z-10 flex flex-col items-center group transition-transform duration-300">
                                  <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center border border-white text-white font-black text-sm shadow-md">
                                    👨‍🎓
                                  </div>
                                  <div className="h-10 w-4 bg-emerald-600 rounded-b-md shadow-inner"></div>
                                  <span className="text-[8px] text-slate-300 bg-slate-900/60 px-1 rounded mt-1">人像 A (前景)</span>
                                </div>

                                {/* Figure 2 (Right - Background, looking massive because of perspective scale) */}
                                <div className="absolute right-[15%] bottom-[32%] z-10 flex flex-col items-center group transition-transform duration-300">
                                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center border border-white text-white font-black text-sm shadow-md">
                                    👨‍🎓
                                  </div>
                                  <div className="h-10 w-4 bg-blue-600 rounded-b-md shadow-inner"></div>
                                  <span className="text-[8px] text-slate-300 bg-slate-900/60 px-1 rounded mt-1">人像 B (遠景)</span>
                                </div>

                                {/* Explanatory overlay banner */}
                                <div className="absolute bottom-2 inset-x-2 bg-slate-900/90 border border-slate-800 p-1 rounded text-center text-[9px] text-emerald-400">
                                  {showRuler ? "💡 量尺已連接！可以看見 A 與 B 的物理高度在像素上完全相同。" : "💡 點擊下方按鈕，在人像上拉出基準參考線！"}
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={() => setShowRuler(!showRuler)}
                                className={`w-full py-2 px-3 rounded-xl font-bold text-[10px] flex items-center justify-center gap-1.5 cursor-pointer transition-all border ${
                                  showRuler
                                    ? 'bg-rose-600 border-rose-700 text-white shadow-3xs'
                                    : 'bg-emerald-600 border-emerald-700 hover:bg-emerald-650 text-white shadow-3xs'
                                }`}
                              >
                                {showRuler ? "📏 隱藏紅線量尺" : "📏 顯示紅線量尺 (對照高度)"}
                              </button>
                            </div>

                            {/* Right Column: Blind Men Elephant */}
                            <div className="bg-white border border-slate-200/80 rounded-2xl p-4.5 space-y-3.5 shadow-3xs flex flex-col justify-between">
                              <div className="space-y-1.5">
                                <span className="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md text-[9px] font-black">🐘 經典寓言對話</span>
                                <h4 className="text-xs font-black text-slate-950">盲人摸象與認知片面性</h4>
                                <p className="text-[11px] text-slate-500 font-medium">
                                  幾個盲人各自摸到大象身體的一部分，個個都認為自己摸到的部分是大象的整體。故事比喻我們的認知有侷限性、片面性，卻常不自覺。
                                </p>
                              </div>

                              {/* Stylized Elephant silhouettes */}
                              <div className="relative h-44 bg-amber-50/10 rounded-xl overflow-hidden border border-amber-100 flex items-center justify-center">
                                {/* Background styled silhouette */}
                                <div className="absolute inset-0 flex items-center justify-center text-slate-200 pointer-events-none select-none text-[100px]">
                                  🐘
                                </div>

                                {/* Hotspot buttons */}
                                <div className="absolute top-[45%] left-[30%] z-20">
                                  <button
                                    type="button"
                                    onClick={() => setActiveElephantPart('fan')}
                                    className={`w-6.5 h-6.5 rounded-full border-2 flex items-center justify-center font-bold text-[10px] transition-all cursor-pointer ${
                                      activeElephantPart === 'fan' ? 'bg-amber-500 border-white text-white scale-125 shadow-md animate-pulse' : 'bg-white border-amber-400 text-amber-600 hover:scale-110'
                                    }`}
                                    title="觸摸耳朵"
                                  >
                                    👂
                                  </button>
                                </div>
                                <div className="absolute top-[42%] left-[12%] z-20">
                                  <button
                                    type="button"
                                    onClick={() => setActiveElephantPart('spear')}
                                    className={`w-6.5 h-6.5 rounded-full border-2 flex items-center justify-center font-bold text-[10px] transition-all cursor-pointer ${
                                      activeElephantPart === 'spear' ? 'bg-amber-500 border-white text-white scale-125 shadow-md animate-pulse' : 'bg-white border-amber-400 text-amber-600 hover:scale-110'
                                    }`}
                                    title="觸摸象牙"
                                  >
                                    🦴
                                  </button>
                                </div>
                                <div className="absolute bottom-[35%] left-[45%] z-20">
                                  <button
                                    type="button"
                                    onClick={() => setActiveElephantPart('trunk')}
                                    className={`w-6.5 h-6.5 rounded-full border-2 flex items-center justify-center font-bold text-[10px] transition-all cursor-pointer ${
                                      activeElephantPart === 'trunk' ? 'bg-amber-500 border-white text-white scale-125 shadow-md animate-pulse' : 'bg-white border-amber-400 text-amber-600 hover:scale-110'
                                    }`}
                                    title="觸摸象腿"
                                  >
                                    🦵
                                  </button>
                                </div>
                                <div className="absolute top-[50%] right-[25%] z-20">
                                  <button
                                    type="button"
                                    onClick={() => setActiveElephantPart('rope')}
                                    className={`w-6.5 h-6.5 rounded-full border-2 flex items-center justify-center font-bold text-[10px] transition-all cursor-pointer ${
                                      activeElephantPart === 'rope' ? 'bg-amber-500 border-white text-white scale-125 shadow-md animate-pulse' : 'bg-white border-amber-400 text-amber-600 hover:scale-110'
                                    }`}
                                    title="觸摸象尾"
                                  >
                                    🪢
                                  </button>
                                </div>

                                {/* Hotspot popups / descriptions */}
                                <AnimatePresence mode="wait">
                                  {activeElephantPart && (
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                      animate={{ opacity: 1, scale: 1, y: 0 }}
                                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                      className="absolute inset-x-2 bottom-2 bg-amber-950/95 border border-amber-500/30 text-white p-2 rounded-lg text-center text-[10px] space-y-1 shadow-md z-30"
                                    >
                                      {activeElephantPart === 'spear' && (
                                        <>
                                          <p className="font-black text-amber-300">🦴 摸到象牙的盲人 ── 「像一根長矛！」</p>
                                          <p className="text-[9px] text-amber-100">堅硬、尖銳、光滑。他固執地宣稱：大象就是一根銳利的長槍武器。</p>
                                        </>
                                      )}
                                      {activeElephantPart === 'fan' && (
                                        <>
                                          <p className="font-black text-amber-300">👂 摸到耳朵的盲人 ── 「像一把巨扇！」</p>
                                          <p className="text-[9px] text-amber-100">寬扁、平整、能扇風。他十分堅持：大象就是一把會動的芭蕉大扇。</p>
                                        </>
                                      )}
                                      {activeElephantPart === 'trunk' && (
                                        <>
                                          <p className="font-black text-amber-300">🦵 摸到象腿的盲人 ── 「像一棵樹幹！」</p>
                                          <p className="text-[9px] text-amber-100">粗實、圓筒、矗立。他非常確信：大象根本就是一棵高聳的大柱子。</p>
                                        </>
                                      )}
                                      {activeElephantPart === 'rope' && (
                                        <>
                                          <p className="font-black text-amber-300">🪢 摸到尾巴的盲人 ── 「像一截繩子！」</p>
                                          <p className="text-[9px] text-amber-100">細長、毛糙、擺盪。他堅定反駁：你們都錯了，大象不過是一根粗繩。</p>
                                        </>
                                      )}
                                    </motion.div>
                                  )}
                                </AnimatePresence>

                                {!activeElephantPart && (
                                  <div className="absolute top-2 inset-x-2 bg-amber-900/90 border border-amber-700/30 p-1.5 rounded text-center text-[9px] text-amber-100 font-bold">
                                    ☝️ 點擊大象身上的圓鈕，聽聽不同盲人的偏見想法！
                                  </div>
                                )}
                              </div>

                              <button
                                type="button"
                                onClick={() => setActiveElephantPart(null)}
                                className="w-full py-2 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200 rounded-xl font-bold text-[10px] cursor-pointer transition-colors"
                              >
                                🔄 重設大象 (隱藏對話)
                              </button>
                            </div>
                          </div>

                          {/* Interactive Reflection Question */}
                          <div className="bg-emerald-50/10 border border-emerald-500/10 rounded-2xl p-4.5 space-y-2.5">
                            <label className="text-[11px] font-black text-slate-800 block">
                              ✍️ 課堂問題與反思：人與人之間立場角度不同，容易產生衝突。帶著何種思考態度，能避免陷入像「盲人摸象」一樣的思考侷限性，使思考更具客觀性？
                            </label>
                            <textarea
                              disabled={role === 'teacher' || isSubmitted}
                              rows={3}
                              value={answers['p30_elephant_reflection'] || ''}
                              onChange={(e) => updateAnswer('p30_elephant_reflection', e.target.value)}
                              placeholder="我想：我們需要常保持悲憫胸懷、並進行「換位思考」，也就是願意站在他人的視角去看看他們摸到的是什麼，並察覺到自己只有看到局部真相。立場不必急著否定，但態度要公正、虛心傾聽，才能把『點』跟『線』結合成客觀整體的『面』..."
                              className="w-full text-xs p-3 rounded-xl border border-slate-200 outline-none focus:border-emerald-500 font-semibold bg-white shadow-3xs leading-relaxed"
                            />
                          </div>
                        </div>
                      )}

                      {/* Page 31: MIND 田捕手 ─ 網路謠言，你還在傳嗎 */}
                      {currentPage === 31 && (
                        <div className="space-y-6 text-xs text-slate-700 leading-relaxed font-semibold">
                          <div className="border-b-2 border-indigo-500/20 pb-3.5 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg text-[10px] font-black tracking-wider">品嚐思考的樂趣 031</span>
                            </div>
                            <span className="text-xs font-mono font-black text-indigo-600/80">p.031</span>
                          </div>

                          <div className="relative pl-5 py-2 bg-indigo-50/10 border-l-3 border-indigo-500 rounded-r-xl">
                            <p className="text-[11px] text-slate-600 leading-relaxed text-justify">
                              人的思考會受到感官和知覺的影響，看不到整體，只有片面了解真相，甚至產生錯錯覺。推論常常是根據某些片面不完整的想法而來，對於自以為正確的推論，要學會發現其中是否存在偏見以及非理性的想法。
                            </p>
                          </div>

                          {/* Fact Check Box */}
                          <div className="bg-gradient-to-br from-indigo-50/50 via-sky-50/20 to-white border border-indigo-200 rounded-2xl p-4.5 space-y-4 shadow-3xs">
                            <div className="flex items-center gap-2 border-b border-indigo-200/60 pb-2.5">
                              <span className="px-2 py-0.5 bg-indigo-600 text-white rounded-lg text-[9px] font-black">🔍 MIND 田捕手</span>
                              <h4 className="text-xs font-black text-indigo-950">網路謠言滿天飛 ── 網路謠言，你還在傳嗎？</h4>
                            </div>

                            {/* Headline block styled as warning */}
                            <div className="bg-rose-50 border border-rose-100 rounded-xl p-3.5 space-y-2">
                              <div className="flex items-center gap-1.5 text-rose-800 text-[10px] font-black">
                                <span>⚠️ 爭議報導頭條：</span>
                              </div>
                              <blockquote className="text-[11.5px] font-black text-slate-900 border-l-2 border-rose-500 pl-2.5 italic">
                                「醫估『2050 年精子數歸零』！5原因釀禍，手機別放口袋」、「泌尿醫示警『2050 年精子數恐趨零』！曝5大『殺精』壞習慣」
                              </blockquote>
                              <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                                報導內容引述自一支 YouTube 影片，稱：「在 1970 年代男性每 CC 毫升的精子有一億多隻精蟲，到了現在大概是四千多萬，足足下降了約 50%，計算下來照這個速度，可能等到 2050 年整體男生的精子就等於零啦！到時候人類就可能真的會滅亡了。」接著提出五點可能原因，包括肥胖、菸酒、電腦放大腿工作、手機放口袋、性傳染病、塑化劑等，並提到脂肪會把男性荷爾蒙轉成女性荷爾蒙，肥胖的人如果脂肪都累積在生殖器附近，就可能讓睪丸溫度偏高，而電腦放大腿工作或手機放口袋會影響製造精子等。
                              </p>
                            </div>

                            {/* 想一想 Questions */}
                            <div className="space-y-3 pt-1">
                              <span className="text-[11px] font-black text-indigo-950 flex items-center gap-1">
                                💬 腦力激盪 ── 獨立思考想一想：
                              </span>

                              <div className="space-y-3">
                                <div className="space-y-1">
                                  <label className="text-[10.5px] text-indigo-900 font-black block">Q1. 思考這個報導，有哪些資訊令你感到懷疑？或是覺得怪怪的？</label>
                                  <textarea
                                    disabled={role === 'teacher' || isSubmitted}
                                    rows={2}
                                    value={answers['p31_rumor_q1'] || ''}
                                    onChange={(e) => updateAnswer('p31_rumor_q1', e.target.value)}
                                    placeholder="我的觀察：例如，直接用簡單的等差遞減（1970年到現在減50%，就推出2050年一定歸零）極度不合理！人體生理機制不是單純的數學線性規律，精子數量會受多重變量動態平衡影響，這種直線推論犯了『滑坡謬誤』或簡化過度的邏輯問題..."
                                    className="w-full text-[10.5px] p-2.5 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 font-semibold bg-white"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[10.5px] text-indigo-900 font-black block">Q2. 擁有思考能力的你，會如何檢核這些令你懷疑的資訊呢？</label>
                                  <textarea
                                    disabled={role === 'teacher' || isSubmitted}
                                    rows={2}
                                    value={answers['p31_rumor_q2'] || ''}
                                    onChange={(e) => updateAnswer('p31_rumor_q2', e.target.value)}
                                    placeholder="我的檢核管道：1. 我會到「台灣事實查核中心」或「Cofacts 真的假的」搜尋。 2. 查證該報導引述的論文來源，看研究的採樣樣本與結論是否被刻意扭曲或斷章取義。 3. 諮詢具有公信力的醫學公會或衛福部公告，而非盲目採信社群與網紅媒體的誇大標題..."
                                    className="w-full text-[10.5px] p-2.5 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 font-semibold bg-white"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Reference Footnote */}
                            <div className="border-t border-indigo-200/60 pt-2 flex justify-between items-center text-[9px] text-slate-400 font-bold">
                              <span>📚 參考資料：台灣事實查核中心 每週謠言 Top10</span>
                              <span>影片關鍵字 🔍 人類滅絕？2050年男性精蟲趨近於零！</span>
                            </div>
                          </div>

                          {/* Philosophical Conclusion Callout */}
                          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2.5">
                            <span className="text-[10px] bg-slate-200 text-slate-800 px-2 py-0.5 rounded-md font-black">🏛️ 哲學思維沉澱</span>
                            <blockquote className="text-[12px] font-black text-slate-800 leading-relaxed text-justify">
                              「我唯一知道的就是我什麼都不知道。」 ── 蘇格拉底 (Socrates)
                            </blockquote>
                            <p className="text-[10.5px] text-slate-500 font-medium text-justify">
                              面對各種訊息與知識，我們要時常覺察內心的想法，抱持暫時懷疑的態度。所以提升自己覺察的能力，避免預設立場、片面決斷，並願意持續探究，以獲得足夠客觀的證據，將有助於我們發現事情的真相。
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Page 32: 保持客觀，換位思考 ─ 誰可以坐博愛座？ */}
                      {currentPage === 32 && (
                        <div className="space-y-6 text-xs text-slate-700 leading-relaxed font-semibold">
                          <div className="border-b-2 border-emerald-500/20 pb-3.5 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-[10px] font-black tracking-wider uppercase">032 CH 1 / 哲學思考</span>
                              <h2 className="text-sm font-black text-slate-800">
                                保持客觀，換位思考
                              </h2>
                            </div>
                            <span className="text-xs font-mono font-black text-emerald-600/80">p.032</span>
                          </div>

                          {/* Core Text Section */}
                          <div className="space-y-3.5 text-[11px] text-slate-600 leading-relaxed text-justify font-medium">
                            <p className="indent-6">
                              人的想法很容易受到情緒感染，同時也因個人的好惡而影響對事物的判斷，例如心情不好的時候覺得別人故意找麻煩，討厭某人就覺得他的意見全部都不好。負面的情緒容易將問題放大，要學習覺察與調整情緒，練習放下情緒，運用理智面對事情，把事情看清楚、想清楚，尋找問題的解決之道。總之要保持理性的思考，避免受情緒影響。
                            </p>
                            <p className="indent-6">
                              同時要培養悲憫的胸懷，學習換位思考。<strong>「智者不惑，仁者不憂，勇者不懼。」</strong>其中仁者不憂，可以解釋為，仁者悲天憫人，心胸坦蕩，內省不疚，所以能無所憂慮。理性思辨的同時也要保持為對方著想的態度，願意傾聽與理解他人。如果能夠多一些體諒與站在對方的立場思考，避免自我中心，或許就能找到衝突與爭執的原因，也能理解對方的想法或行為，擴大自己的心胸與格局。
                            </p>
                          </div>

                          {/* Green Priority Seat Box */}
                          <div className="bg-gradient-to-br from-emerald-50/50 via-teal-50/20 to-white border border-emerald-200 rounded-2xl p-4.5 space-y-4.5 shadow-3xs">
                            <div className="flex items-center gap-2 border-b border-emerald-200/60 pb-2.5">
                              <span className="px-2 py-0.5 bg-emerald-600 text-white rounded-lg text-[9px] font-black">♿ LIFE 心動力</span>
                              <h4 className="text-xs font-black text-slate-900">誰可以坐博愛座？</h4>
                            </div>

                            <div className="bg-white/80 p-3 rounded-xl border border-emerald-100 text-[10.5px] text-slate-600 leading-relaxed font-medium">
                              博愛座引發衝突的新聞時有所聞，博愛座的存廢問題也數度引發討論。乘坐博愛座的對象要如何定義？除了老人、孕婦、行動不便及抱小孩的人，是否還有其他需要座位的隱性需求者呢？你是否曾經在搭乘大眾捷運時讓座，或是曾經坐過博愛座？當時的想法是什麼？看到坐在博愛座上年輕力壯的人，你會怎麼想呢？
                            </div>

                            {/* Q1 & Q2 Textareas */}
                            <div className="space-y-3 pt-1">
                              <span className="text-[10.5px] font-black text-emerald-950">✏️ 請思考並回答以下問題：</span>
                              
                              <div className="space-y-3">
                                <div className="space-y-1">
                                  <label className="text-[10px] text-emerald-900 font-black block">Q1. 你曾在大眾交通工具上讓座的原因為何？</label>
                                  <textarea
                                    disabled={role === 'teacher' || isSubmitted}
                                    rows={1.5}
                                    value={answers['p32_priority_q1'] || ''}
                                    onChange={(e) => updateAnswer('p32_priority_q1', e.target.value)}
                                    placeholder="我曾讓座，因為：看到有懷孕的媽媽或是拄著拐杖的叔叔，他們站著有安全上的立即危險（掌握事實）。我認為安全比我暫時的舒適更重要（分辨價值），所以主動起身讓座，這也讓我感到溫暖與踏實（行動）..."
                                    className="w-full text-[10.5px] p-2.5 rounded-xl border border-slate-200 outline-none focus:border-emerald-500 font-semibold bg-white"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="text-[10px] text-emerald-900 font-black block">Q2. 年輕人會坐博愛座的原因是什麼？</label>
                                  <textarea
                                    disabled={role === 'teacher' || isSubmitted}
                                    rows={1.5}
                                    value={answers['p32_priority_q2'] || ''}
                                    onChange={(e) => updateAnswer('p32_priority_q2', e.target.value)}
                                    placeholder="我認為原因有：有許多外表看不出來的「隱性需求」，例如他可能剛熬夜加班極度頭暈、女同學生理期腹部絞痛、或者是腳踝拉傷無法久站。這提醒我們不要僅憑外在觀感就急著評斷他人..."
                                    className="w-full text-[10.5px] p-2.5 rounded-xl border border-slate-200 outline-none focus:border-emerald-500 font-semibold bg-white"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Interactive Sticker Maker Widget */}
                            <div className="border-t border-slate-200/60 pt-3 space-y-3">
                              <div className="space-y-1">
                                <span className="text-[10.5px] font-black text-slate-800 block">🎨 動手畫畫看 ── 創意博愛座識別貼紙設計器</span>
                                <p className="text-[9.5px] text-slate-400">請發揮創意，為有隱性需求的用路人設計一款專專屬博愛座貼紙，並在下方編輯展示：</p>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 bg-slate-50 p-3.5 rounded-xl border border-slate-200/60">
                                {/* Left Controls: Icon, Color, Text */}
                                <div className="md:col-span-7 space-y-3">
                                  {/* Icon Choices */}
                                  <div className="space-y-1">
                                    <span className="text-[9px] font-black text-slate-500">1. 選擇需求圖示</span>
                                    <div className="flex gap-2">
                                      {['🩹', '🤰', '💗', '💤', '🎒'].map((icon) => (
                                        <button
                                          key={icon}
                                          type="button"
                                          disabled={role === 'teacher' || isSubmitted}
                                          onClick={() => setStickerIcon(icon)}
                                          className={`w-7.5 h-7.5 rounded-lg border text-sm flex items-center justify-center cursor-pointer transition-all ${
                                            stickerIcon === icon ? 'bg-emerald-500 text-white border-emerald-600 scale-110 shadow-3xs' : 'bg-white border-slate-200 hover:bg-slate-100'
                                          }`}
                                        >
                                          {icon}
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Color Choices */}
                                  <div className="space-y-1">
                                    <span className="text-[9px] font-black text-slate-500">2. 選擇圓形底色</span>
                                    <div className="flex gap-2">
                                      {[
                                        { key: 'blue', label: '藍色', class: 'bg-blue-500' },
                                        { key: 'green', label: '綠色', class: 'bg-emerald-500' },
                                        { key: 'amber', label: '橘色', class: 'bg-amber-500' },
                                        { key: 'rose', label: '紅色', class: 'bg-rose-500' }
                                      ].map((color) => (
                                        <button
                                          key={color.key}
                                          type="button"
                                          disabled={role === 'teacher' || isSubmitted}
                                          onClick={() => setStickerColor(color.key)}
                                          className={`w-5 h-5 rounded-full ${color.class} border-2 cursor-pointer transition-all ${
                                            stickerColor === color.key ? 'border-white scale-125 shadow-2xs' : 'border-transparent hover:scale-110'
                                          }`}
                                          title={color.label}
                                        ></button>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Custom Label Text */}
                                  <div className="space-y-1">
                                    <span className="text-[9px] font-black text-slate-500">3. 編輯貼紙說明文字</span>
                                    <input
                                      type="text"
                                      maxLength={12}
                                      disabled={role === 'teacher' || isSubmitted}
                                      value={stickerText}
                                      onChange={(e) => {
                                        setStickerText(e.target.value);
                                        updateAnswer('p32_sticker_text_val', e.target.value);
                                      }}
                                      placeholder="例：腳踝扭傷暫時無法站立"
                                      className="w-full text-[10.5px] p-2 rounded-lg border border-slate-200 outline-none focus:border-emerald-500 bg-white font-bold"
                                    />
                                  </div>
                                </div>

                                {/* Right Panel: Live Round Sticker Preview */}
                                <div className="md:col-span-5 flex flex-col items-center justify-center p-3.5 bg-white border border-slate-100 rounded-xl shadow-inner min-h-32">
                                  <span className="text-[8px] font-mono font-bold text-slate-300 uppercase mb-2">LIVE STICKER PREVIEW</span>
                                  
                                  <motion.div
                                    animate={{ rotate: [0, 1, -1, 0] }}
                                    transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                                    className={`w-28 h-28 rounded-full border-4 border-double border-white shadow-md flex flex-col items-center justify-center p-2.5 text-center transition-colors duration-300 ${
                                      stickerColor === 'blue' ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white' :
                                      stickerColor === 'green' ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white' :
                                      stickerColor === 'amber' ? 'bg-gradient-to-br from-amber-500 to-orange-600 text-white' :
                                      'bg-gradient-to-br from-rose-500 to-red-600 text-white'
                                    }`}
                                  >
                                    <span className="text-2xl mb-1 filter drop-shadow-xs">{stickerIcon}</span>
                                    <span className="text-[10px] font-black tracking-wide filter drop-shadow-3xs uppercase">博愛座</span>
                                    <span className="text-[7.5px] font-extrabold tracking-tighter opacity-90 mt-0.5 max-w-full truncate">{stickerText || '隱性需求請多包涵'}</span>
                                  </motion.div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Page 33: 立場不必中立，態度必須公正 ─ AI 寫作業 */}
                      {currentPage === 33 && (
                        <div className="space-y-6 text-xs text-slate-700 leading-relaxed font-semibold">
                          <div className="border-b-2 border-indigo-500/20 pb-3.5 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg text-[10px] font-black tracking-wider uppercase">品嚐思考的樂趣 033</span>
                              <h2 className="text-sm font-black text-slate-800">
                                立場不必中立，態度必須公正
                              </h2>
                            </div>
                            <span className="text-xs font-mono font-black text-indigo-600/80">p.033</span>
                          </div>

                          {/* Philosophy Section */}
                          <div className="space-y-3.5 text-[11px] text-slate-600 leading-relaxed text-justify font-medium">
                            <p className="indent-6">
                              每個人都會有自己的立場與價值觀，一時難以論斷誰對誰錯，可以把握<strong>「立場不必中立，態度必須公正」</strong>的原則，成為一個獨立思考的人，不是一味的盲從別人，可以有自己對事實探究的態度。
                            </p>
                            <p className="indent-6">
                              立場不必中立是指思考時不用害怕採取個人立場，並非不認同任何立場就是最好的立場。立場不必追求一定要中立，而是需具備反思的能力。態度必須公正則是對人事物雖然持有自身的立場，但對於另一種的想法或聲音也應保持開放與傾聽的態度，並對自己所採取的立場保持一個反省的空間，才有機會了解不同立場的人，其背後所依據的理由和觀觀點是什麼？
                            </p>
                          </div>

                          {/* ChatGPT Case Box */}
                          <div className="bg-gradient-to-br from-indigo-50/50 via-sky-50/20 to-white border border-indigo-200 rounded-2xl p-4.5 space-y-4.5 shadow-3xs">
                            <div className="flex items-center gap-2 border-b border-indigo-200/60 pb-2.5">
                              <span className="px-2 py-0.5 bg-indigo-600 text-white rounded-lg text-[9px] font-black">🤖 MIND 田捕手</span>
                              <h4 className="text-xs font-black text-slate-900">AI 人工智慧 ── ChatGPT 幫你寫作業</h4>
                            </div>

                            <div className="bg-white/80 p-3.5 rounded-xl border border-indigo-100 text-[10px] text-slate-600 leading-relaxed font-medium">
                              由史丹佛學生獨立經營的《史丹佛日報》，刊登了 2023 年進行的非正式問卷調查結果，在回收的 4497 份回應中，大約有 17% 的史丹佛學生表示，有使用 ChatGPT 來協助自己的秋季作業和考試。多數人使用 AI 生成的材料作為期末作業或報告的發想，其中僅有 5% 的人，承認他們直接繳交 AI 生成的文稿。
                              <br />
                              對於 AI 世代的來臨，ChatGPT 對教育產生前所未有的挑戰，它帶來正面的好處，如協助列大綱，統整課程內容，降低老師工作量，學生也可以透過 AI 自學。然而它帶來的負向衝擊也需要重視，像是答案來得太快，學生減少自主思考的時間，還有文本資料出現偏差內容，缺乏現實經驗的總和，AI 目前也暫時無法提供像老師的引導發想、提問、討論、實務應用、心理輔導、激勵、諮詢，甚至是老師個人經驗的傳承。
                            </div>

                            {/* Q1 & Q2 4F Questions */}
                            <div className="space-y-4 pt-1">
                              <span className="text-[10.5px] font-black text-indigo-950">✏️ 請思考並回答以下問題：</span>

                              <div className="space-y-3.5">
                                <div className="space-y-1">
                                  <label className="text-[10.5px] text-indigo-900 font-black block leading-normal">
                                    Q1. 你現在是學生身分，面對科技進步（如 ChatGPT），對你帶來的衝擊或影響有哪些？（請親自回答，勿使用 AI）：
                                  </label>
                                  <textarea
                                    disabled={role === 'teacher' || isSubmitted}
                                    rows={2}
                                    value={answers['p33_chatgpt_q1'] || ''}
                                    onChange={(e) => updateAnswer('p33_chatgpt_q1', e.target.value)}
                                    placeholder="我的真實想法：它讓我寫報告和找資料的速度變快很多。但我發現，如果太依賴它直接生成大綱和段落，自己就懶得深入思考了，腦袋會變得比較生鏽。我必須強迫自己把 AI 當成一個助教，而不是我的代筆工程師..."
                                    className="w-full text-[10.5px] p-2.5 rounded-xl border border-slate-200 outline-none focus:border-indigo-500 font-semibold bg-white shadow-3xs"
                                  />
                                </div>

                                <div className="space-y-2.5 bg-slate-50 border border-slate-200 p-3.5 rounded-xl">
                                  <label className="text-[10.5px] text-indigo-950 font-black block leading-normal border-b border-indigo-200/50 pb-1.5 mb-2.5">
                                    Q2. 換位思考：如果你是一位學校老師或教授，經過辨識軟體或親自確認，發現學生的作業內容完全為 AI 所生成，請你運用【4F 引導思考法】來回答這個問題：
                                  </label>

                                  <div className="space-y-3">
                                    <div className="space-y-1">
                                      <span className="text-[9.5px] font-black text-indigo-950 flex items-center gap-1">🟢 Fact (事實) ── 老師看到什麼事實？</span>
                                      <textarea
                                        disabled={role === 'teacher' || isSubmitted}
                                        rows={1.5}
                                        value={answers['p33_chatgpt_fact'] || ''}
                                        onChange={(e) => updateAnswer('p33_chatgpt_fact', e.target.value)}
                                        placeholder="例：我發現學生的語氣完全一致，缺乏拼寫小失誤或個人真實心路經歷，且檢測軟體顯示 95% 為 AI 生成，作業內容充斥空泛詞彙，沒有課堂實作範例..."
                                        className="w-full text-[10px] p-2 rounded-lg border border-slate-200 outline-none focus:border-indigo-500 font-semibold bg-white"
                                      />
                                    </div>

                                    <div className="space-y-1">
                                      <span className="text-[9.5px] font-black text-indigo-950 flex items-center gap-1">🔵 Feeling (感受) ── 收到 AI 生成作業的感受是？</span>
                                      <textarea
                                        disabled={role === 'teacher' || isSubmitted}
                                        rows={1.5}
                                        value={answers['p33_chatgpt_feeling'] || ''}
                                        onChange={(e) => updateAnswer('p33_chatgpt_feeling', e.target.value)}
                                        placeholder="例：我感到有些失落與擔憂。失落是因為花心血設計的題目，學生卻交給機器敷衍；擔憂是擔心學生因此錯過了動腦思辨、探索自我生命的珍貴淬鍊過程..."
                                        className="w-full text-[10px] p-2 rounded-lg border border-slate-200 outline-none focus:border-indigo-500 font-semibold bg-white"
                                      />
                                    </div>

                                    <div className="space-y-1">
                                      <span className="text-[9.5px] font-black text-indigo-950 flex items-center gap-1">🟠 Finding (發現) ── 你發現這件事問題出在哪裡？</span>
                                      <textarea
                                        disabled={role === 'teacher' || isSubmitted}
                                        rows={1.5}
                                        value={answers['p33_chatgpt_finding'] || ''}
                                        onChange={(e) => updateAnswer('p33_chatgpt_finding', e.target.value)}
                                        placeholder="例：我發現問題有兩層：首先是工具太便利，降低了走捷徑的門檻；其次是教學評量方式可能太刻板、偏重制式資料統整，沒有引導學生寫出「個人獨特生命經歷」與「靈魂對話」，才讓 AI 有機可乘..."
                                        className="w-full text-[10px] p-2 rounded-lg border border-slate-200 outline-none focus:border-indigo-500 font-semibold bg-white"
                                      />
                                    </div>

                                    <div className="space-y-1">
                                      <span className="text-[9.5px] font-black text-indigo-950 flex items-center gap-1">🔴 Future (未來) ── 以你思考後的結果，你會做出什麼樣的行動或決定？</span>
                                      <textarea
                                        disabled={role === 'teacher' || isSubmitted}
                                        rows={1.5}
                                        value={answers['p33_chatgpt_future'] || ''}
                                        onChange={(e) => updateAnswer('p33_chatgpt_future', e.target.value)}
                                        placeholder="例：我會找學生來溫柔懇談，重新教導他『立場與公正』。我不懲罰他，但要求他在課堂上現場口頭報告，講講他對這題目的真實看法。未來我也會修改出題方式，增加小組討論和手寫個人反思的比重，杜絕純機器代筆..."
                                        className="w-full text-[10px] p-2 rounded-lg border border-slate-200 outline-none focus:border-indigo-500 font-semibold bg-white"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Page 34: 二、思考你的思考 ─ 讓思考成為你的習慣 (上) */}
                      {currentPage === 34 && (
                        <div className="space-y-6 text-xs text-slate-700 leading-relaxed font-semibold">
                          <div className="border-b-2 border-emerald-500/20 pb-3.5 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-[10px] font-black tracking-wider uppercase">034 CH 1 / 哲學思考</span>
                              <h2 className="text-sm font-black text-slate-800">
                                二、思考你的思考
                              </h2>
                            </div>
                            <span className="text-xs font-mono font-black text-emerald-600/80">p.034</span>
                          </div>

                          {/* Philosophy of Metacognition */}
                          <div className="space-y-3.5 text-[11px] text-slate-600 leading-relaxed text-justify font-medium">
                            <p className="indent-6">
                              <strong>「後設思考」</strong>，就是對思考進行思考，掌握思考的方法、情意與態度，檢視思考的歷程是否合理，將含糊不清、模糊兩可的思考釐清。不同的想法與觀點經常來自於背後不同的假設與立場，因此適切的思考包含了「後設思考」。
                            </p>
                            <p className="indent-6">
                              「後設思考」的過程中需說明重點，甚至不斷的予以澄清。所有人的思考和經驗，都是以預設為基礎。我們的想法皆其來有自，但是我們一般人都對自己的預設渾然不知。很多人的錯誤想法，背後的預設立場都未經批判檢驗。清楚知道自己的預設立場是什麼，才能避免不合理、不正當或相互矛盾的預設。現在就讓我們來進一步探索思考背後的思考吧！
                            </p>
                          </div>

                          {/* Green Box: Pink Shirt Story */}
                          <div className="bg-gradient-to-br from-emerald-50/50 via-teal-50/20 to-white border border-emerald-200 rounded-2xl p-4.5 space-y-4 shadow-3xs">
                            <div className="flex items-center gap-2 border-b border-emerald-200/60 pb-2.5">
                              <span className="px-2 py-0.5 bg-emerald-600 text-white rounded-lg text-[9px] font-black">💗 LIFE 心動力</span>
                              <h4 className="text-xs font-black text-slate-900">讓思考成為你的習慣</h4>
                            </div>

                            <p className="text-[10px] text-emerald-950 font-bold bg-emerald-50/40 p-3 rounded-xl border border-emerald-100/50 leading-relaxed text-justify">
                              適切的思考如剝洋蔥，需要將含糊不清、模稜兩可的思考做釐清及適當的表達。過程中需說明重點，甚至不斷的予以澄清。
                              <br /><br />
                              <strong>【反霸凌實例故事】</strong>
                              <br />
                              1992 年加拿大兩名十二年級的高中生大衛和崔維斯，目睹一名九年級男孩，因穿了粉紅色衣服到學校，遭受幾位高年級學生包圍恥笑及言語上的威脅。為了聲援這位同學。大衛和崔維斯決定買五十件粉紅 T 恤，在隔天早上邀請同學一起穿上粉紅色上衣，用行動阻止霸凌行為。
                            </p>

                            <div className="space-y-3.5 pt-1.5">
                              <div className="space-y-1">
                                <label className="text-[10.5px] text-emerald-900 font-black block">
                                  Q1. 你認為穿著粉紅色衣服的男孩，為何會被恥笑和威脅？請分析背後存在哪些想法（如假設、立場或原因等）：
                                </label>
                                <textarea
                                  disabled={role === 'teacher' || isSubmitted}
                                  rows={2}
                                  value={answers['p34_bullying_q1'] || ''}
                                  onChange={(e) => updateAnswer('p34_bullying_q1', e.target.value)}
                                  placeholder="我的想法：高年級學生心中存在著性別刻板印象的『不合理預設』，認為粉紅色是女性專屬的、穿粉紅色的男生就代表軟弱、可以被欺負。他們缺乏對他人尊重的思考，並且把偏見直接轉化為言語威脅與人身攻擊..."
                                  className="w-full text-[10.5px] p-2.5 rounded-xl border border-slate-200 outline-none focus:border-emerald-500 font-semibold bg-white"
                                />
                              </div>

                              {/* Checklist Widget */}
                              <div className="space-y-2 bg-white/80 p-3 rounded-xl border border-emerald-150 font-semibold">
                                <span className="text-[9.5px] font-black text-emerald-950 block">
                                  🔍 檢視這些想法是否符合以下正確思考的方法與態度（請勾選）：
                                </span>

                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                                  {[
                                    { key: 'logic', label: '邏輯推理' },
                                    { key: 'perspective', label: '換位思考' },
                                    { key: 'avoid_fallacy', label: '避免謬誤' },
                                    { key: 'fairness', label: '立場不必中立，態度必須公正' },
                                    { key: 'avoid_bias', label: '避免偏見' },
                                    { key: 'care', label: '對人的關懷' }
                                  ].map((opt) => {
                                    const selected = answers['p34_q1_checklist'] || [];
                                    const isChecked = selected.includes(opt.key);
                                    return (
                                      <button
                                        key={opt.key}
                                        type="button"
                                        disabled={role === 'teacher' || isSubmitted}
                                        onClick={() => {
                                          if (isChecked) {
                                            updateAnswer('p34_q1_checklist', selected.filter((k: string) => k !== opt.key));
                                          } else {
                                            updateAnswer('p34_q1_checklist', [...selected, opt.key]);
                                          }
                                        }}
                                        className={`p-2 rounded-lg border text-center font-bold text-[10px] cursor-pointer transition-all ${
                                          isChecked
                                            ? 'bg-emerald-500 text-white border-emerald-600 shadow-3xs'
                                            : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                                        }`}
                                      >
                                        <span className="mr-1">{isChecked ? '✓' : '✗'}</span>
                                        <span>{opt.label}</span>
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Page 35: 讓思考成為你的習慣 (下) ─ 總結與反思 */}
                      {currentPage === 35 && (
                        <div className="space-y-6 text-xs text-slate-700 leading-relaxed font-semibold">
                          <div className="border-b-2 border-emerald-500/20 pb-3.5 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-[10px] font-black tracking-wider uppercase">品嚐思考的樂趣 035</span>
                              <h2 className="text-sm font-black text-slate-800">
                                讓思考成為你的習慣 ── 霸凌思辨與心靈覺察
                              </h2>
                            </div>
                            <span className="text-xs font-mono font-black text-emerald-600/80">p.035</span>
                          </div>

                          {/* Green Box Container continuing the exercise */}
                          <div className="bg-gradient-to-br from-emerald-50/50 via-teal-50/20 to-white border border-emerald-200 rounded-2xl p-4.5 space-y-4 shadow-3xs">
                            <div className="flex items-center gap-2 border-b border-emerald-200/60 pb-2.5">
                              <span className="px-2 py-0.5 bg-emerald-600 text-white rounded-lg text-[9px] font-black">💗 LIFE 心動力</span>
                              <h4 className="text-xs font-black text-slate-900">思考態度與方法深度實踐 (Q2-Q4)</h4>
                            </div>

                            {/* Q2 */}
                            <div className="space-y-2 bg-white/60 p-3 rounded-xl border border-emerald-100">
                              <label className="text-[10.5px] text-emerald-950 font-black block leading-normal">
                                Q2. 想一想，類似這樣的校園或社群霸凌行為還有哪些？造成的原因是什麼？請分析背後想法：
                              </label>
                              <textarea
                                disabled={role === 'teacher' || isSubmitted}
                                rows={1.5}
                                value={answers['p35_bullying_q2'] || ''}
                                onChange={(e) => updateAnswer('p35_bullying_q2', e.target.value)}
                                placeholder="例如：在論壇裡公開發起『炎上』，辱罵與大眾立場不同的少數派；或是嘲笑身材矮胖、不符合世俗審美標準的同學。原因都是出於『本位主義』與『盲從群眾』，將自身的偏見視為真理..."
                                className="w-full text-[10px] p-2.5 rounded-lg border border-slate-200 outline-none focus:border-emerald-500 font-semibold bg-white"
                              />

                              <div className="pt-1.5 flex flex-wrap gap-1 items-center">
                                <span className="text-[8.5px] text-slate-400 mr-1.5">此想法符合的態度：</span>
                                {[
                                  { key: 'logic', label: '邏輯推理' },
                                  { key: 'perspective', label: '換位思考' },
                                  { key: 'avoid_fallacy', label: '避免謬誤' },
                                  { key: 'fairness', label: '立場不必中立，態度必須公正' },
                                  { key: 'avoid_bias', label: '避免偏見' },
                                  { key: 'care', label: '對人的關懷' }
                                ].map((opt) => {
                                  const selected = answers['p35_q2_checklist'] || [];
                                  const isChecked = selected.includes(opt.key);
                                  return (
                                    <button
                                      key={opt.key}
                                      type="button"
                                      disabled={role === 'teacher' || isSubmitted}
                                      onClick={() => {
                                        if (isChecked) {
                                          updateAnswer('p35_q2_checklist', selected.filter((k: string) => k !== opt.key));
                                        } else {
                                          updateAnswer('p35_q2_checklist', [...selected, opt.key]);
                                        }
                                      }}
                                      className={`px-1.5 py-0.5 rounded text-[8px] font-bold border cursor-pointer transition-all ${
                                        isChecked ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-white border-slate-200 text-slate-400'
                                      }`}
                                    >
                                      {isChecked ? '✓' : '✗'} {opt.label}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Q3 */}
                            <div className="space-y-2 bg-white/60 p-3 rounded-xl border border-emerald-100 font-semibold">
                              <label className="text-[10.5px] text-emerald-950 font-black block leading-normal">
                                Q3. 如果你是那個被霸凌或指指點點的當事者，會是什麼樣的心情？你會如何面對它？請分析背後想法：
                              </label>
                              <textarea
                                disabled={role === 'teacher' || isSubmitted}
                                rows={1.5}
                                value={answers['p35_bullying_q3'] || ''}
                                onChange={(e) => updateAnswer('p35_bullying_q3', e.target.value)}
                                placeholder="我的真切心情：一定會感到非常孤立無援、委屈和羞愧。面對它時，我會啟動後設思考：告訴自己穿著什麼衣服、長成什麼身材絕不是我人品的污點，犯錯與粗暴的是霸凌者。我會尋找信賴的主管、老師或心理諮商師求助，並和愛我的人站在一起..."
                                className="w-full text-[10px] p-2.5 rounded-lg border border-slate-200 outline-none focus:border-emerald-500 font-semibold bg-white"
                              />

                              <div className="pt-1.5 flex flex-wrap gap-1 items-center">
                                <span className="text-[8.5px] text-slate-400 mr-1.5">此想法符合的態度：</span>
                                {[
                                  { key: 'logic', label: '邏輯推理' },
                                  { key: 'perspective', label: '換位思考' },
                                  { key: 'avoid_fallacy', label: '避免謬誤' },
                                  { key: 'fairness', label: '立場不必中立，態度必須公正' },
                                  { key: 'avoid_bias', label: '避免偏見' },
                                  { key: 'care', label: '對人的關懷' }
                                ].map((opt) => {
                                  const selected = answers['p35_q3_checklist'] || [];
                                  const isChecked = selected.includes(opt.key);
                                  return (
                                    <button
                                      key={opt.key}
                                      type="button"
                                      disabled={role === 'teacher' || isSubmitted}
                                      onClick={() => {
                                        if (isChecked) {
                                          updateAnswer('p35_q3_checklist', selected.filter((k: string) => k !== opt.key));
                                        } else {
                                          updateAnswer('p35_q3_checklist', [...selected, opt.key]);
                                        }
                                      }}
                                      className={`px-1.5 py-0.5 rounded text-[8px] font-bold border cursor-pointer transition-all ${
                                        isChecked ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-white border-slate-200 text-slate-400'
                                      }`}
                                    >
                                      {isChecked ? '✓' : '✗'} {opt.label}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Q4 */}
                            <div className="space-y-2 bg-white/60 p-3 rounded-xl border border-emerald-100 font-semibold font-semibold">
                              <label className="text-[10.5px] text-emerald-950 font-black block leading-normal">
                                Q4. 如果看到有人正在被霸凌，你會怎麼做？請分析背後想法：
                              </label>
                              <textarea
                                disabled={role === 'teacher' || isSubmitted}
                                rows={1.5}
                                value={answers['p35_bullying_q4'] || ''}
                                onChange={(e) => updateAnswer('p35_bullying_q4', e.target.value)}
                                placeholder="我的行動方案：我不會當冷漠的旁觀者。在確保自身安全的前提下，我會仿效加拿大那兩位學長，用集體行動來發聲支援（例如站到被霸凌者身邊跟他說話，或是私下關懷、遞面紙安撫）。並立即向學校輔導室或教官檢舉霸凌事件，從結構上保護弱小者..."
                                className="w-full text-[10px] p-2.5 rounded-lg border border-slate-200 outline-none focus:border-emerald-500 font-semibold bg-white"
                              />

                              <div className="pt-1.5 flex flex-wrap gap-1 items-center">
                                <span className="text-[8.5px] text-slate-400 mr-1.5">此想法符合的態度：</span>
                                {[
                                  { key: 'logic', label: '邏輯推理' },
                                  { key: 'perspective', label: '換位思考' },
                                  { key: 'avoid_fallacy', label: '避免謬誤' },
                                  { key: 'fairness', label: '立場不必中立，態度必須公正' },
                                  { key: 'avoid_bias', label: '避免偏見' },
                                  { key: 'care', label: '對人的關懷' }
                                ].map((opt) => {
                                  const selected = answers['p35_q4_checklist'] || [];
                                  const isChecked = selected.includes(opt.key);
                                  return (
                                    <button
                                      key={opt.key}
                                      type="button"
                                      disabled={role === 'teacher' || isSubmitted}
                                      onClick={() => {
                                        if (isChecked) {
                                          updateAnswer('p35_q4_checklist', selected.filter((k: string) => k !== opt.key));
                                        } else {
                                          updateAnswer('p35_q4_checklist', [...selected, opt.key]);
                                        }
                                      }}
                                      className={`px-1.5 py-0.5 rounded text-[8px] font-bold border cursor-pointer transition-all ${
                                        isChecked ? 'bg-emerald-500 text-white border-emerald-600' : 'bg-white border-slate-200 text-slate-400'
                                      }`}
                                    >
                                      {isChecked ? '✓' : '✗'} {opt.label}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                          {/* Classical Chinese Confucius Quote Scroll */}
                          <div className="relative p-5 bg-gradient-to-br from-[#FAF6F0] via-[#FAF4E9] to-[#F3ECE0] border-2 border-[#D9C4A1] rounded-2xl text-center space-y-3.5 shadow-3xs overflow-hidden">
                            {/* Decorative Classical Patterns */}
                            <div className="absolute top-1 left-1 text-[8px] text-[#B59E7C] font-mono pointer-events-none opacity-50">卍卍</div>
                            <div className="absolute bottom-1 right-1 text-[8px] text-[#B59E7C] font-mono pointer-events-none opacity-50">卍卍</div>

                            <div className="inline-block px-3 py-0.5 border border-[#B59E7C] text-[#805C29] text-[9.5px] rounded-md font-black bg-white/60 tracking-wider">
                              🏛️ 古聖賢心靈明鏡
                            </div>

                            <blockquote className="text-sm font-black text-[#5C3A11] tracking-wide font-serif leading-relaxed px-4 text-center">
                              「毋意，毋必，毋固，毋我。」 ──《論語．子罕》
                            </blockquote>

                            <p className="text-[10px] text-[#7A5B35] font-bold leading-relaxed max-w-lg mx-auto text-justify indent-5">
                              孔子提醒我們：<strong>不要主觀臆斷（毋意）、不要絕對肯定（毋必）、不要固執己見（毋固）、不要唯我獨尊（毋我）</strong>。我們要清楚知道自己的預設立場是什麼，避免不合理、不正當、相互矛盾的預設。保持對思考的覺知與理性公正的態度，能幫助我們探尋生命的真相，以做出正確的抉擇與行動。
                            </p>
                          </div>

                          {/* Grand Reflection Textarea */}
                          <div className="space-y-1.5 pt-1.5 border-t border-slate-200">
                            <label className="text-[10.5px] font-black text-slate-900 block leading-normal">
                              📝 第一單元 學習大收穫 (單元終結反思)：哪一個單元觀念或故事對你啟發最大？為什麼？請寫下你最真誠的心得。
                            </label>
                            <textarea
                              disabled={role === 'teacher' || isSubmitted}
                              rows={3}
                              value={answers['p35_grand_reflection'] || ''}
                              onChange={(e) => updateAnswer('p35_grand_reflection', e.target.value)}
                              placeholder="例如：對我啟發最大的是『正確思考三部曲』。這讓我驚覺到平日裡我常在還沒完全『掌握事實』之前就下定結論、自我責怪。現在我知道，遭遇挫折時要冷靜找出真相，分辨事物的真正價值在於長遠成長而非一時輸贏，這極大地釋放了我的內心壓力，讓我感到思考確實能帶來力量與幸福..."
                              className="w-full text-xs p-3 rounded-xl border border-slate-200 outline-none focus:border-amber-500 bg-white shadow-3xs"
                            />
                          </div>
                        </div>
                      )}
                      {/* Page 32: 蘇格拉底產婆法 ─ 內心三重問 */}
                      {currentPage === 32 && (
                        <div className="space-y-5 text-xs text-slate-700 leading-relaxed font-semibold">
                          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                            <h2 className="text-base font-black text-slate-900 flex items-center gap-1.5">
                              <span className="text-amber-500 font-black">第 3 章</span>
                              <span>思考的幸福方式</span>
                              <span className="text-slate-300 font-normal">|</span>
                              <span className="text-blue-900">二 蘇格拉底產婆法 ── 內心三重問</span>
                            </h2>
                            <span className="text-[10px] font-mono text-slate-400">p.032</span>
                          </div>

                          <p className="text-slate-600 indent-6">
                            古希臘哲學家蘇格拉底（Socrates）自比為「心靈的產婆」。他不直接提供答案，而是透過與對話者連續的提問與應答，幫助對話者逐步發現自己思維中的盲點與矛盾，進而「產出」深刻的自我洞察。這在哲學上被稱為<strong>「蘇格拉底產婆術（Socratic Method）」</strong>。
                          </p>

                          <p className="text-slate-600 indent-6">
                            當我們因為外界言論感到無比焦慮，或是陷入「我很差勁、我完蛋了」的內在偏見泥淖時，我們也可以扮演自己的蘇格拉底，啟動<strong>「內心三重問」</strong>，逼近事實，安撫焦慮：
                          </p>

                          {/* Socratic Three Questions Coach Block */}
                          <div className="bg-blue-50/40 border border-blue-200 rounded-2xl p-4.5 space-y-4 shadow-3xs">
                            <div className="flex items-center gap-2 border-b border-blue-200 pb-2">
                              <span className="px-2.5 py-0.5 bg-blue-600 text-white rounded-lg text-[9px] font-black">🗣️ 蘇格拉底心靈產房</span>
                              <h4 className="text-xs font-black text-blue-950">互動工作坊：剖析我的非理性焦慮</h4>
                            </div>

                            <p className="text-[10.5px] text-slate-500 font-medium">
                              請先想一個你最近「最感焦慮或自責的事情」（例如：『這次排球賽我失誤了，害大家輸球，大家一定會討厭我』或『我這次段考數學沒考好，我未來完蛋了』）。我們將透過蘇格拉底的引導，進行內心對話：
                            </p>

                            {/* Stepper selectors */}
                            <div className="grid grid-cols-3 gap-2 bg-blue-500/5 p-1 rounded-xl border border-blue-100">
                              {(['fact', 'extreme', 'action'] as const).map((step) => {
                                const isActive = p32ActiveSocraticStep === step;
                                return (
                                  <button
                                    key={step}
                                    type="button"
                                    onClick={() => setP32ActiveSocraticStep(step)}
                                    className={`py-2 px-1 rounded-lg text-center font-black transition-all text-[10px] cursor-pointer ${
                                      isActive
                                        ? 'bg-blue-600 text-white shadow-xs'
                                        : 'bg-white text-blue-700 border border-blue-100 hover:bg-blue-50/50'
                                    }`}
                                  >
                                    {step === 'fact' ? '1. 真的是這樣嗎' : step === 'extreme' ? '2. 最壞會如何' : '3. 現在能做什麼'}
                                  </button>
                                );
                              })}
                            </div>

                            <AnimatePresence mode="wait">
                              <motion.div
                                key={p32ActiveSocraticStep}
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className="space-y-3"
                              >
                                {p32ActiveSocraticStep === 'fact' && (
                                  <div className="space-y-2 bg-white/80 p-3 rounded-xl border border-blue-150 text-[10.5px]">
                                    <p className="font-bold text-slate-800 leading-relaxed">
                                      🔵 <strong>【第一問：真的是這樣嗎？（探尋事實）】</strong>
                                      <br />
                                      <span className="text-slate-400 font-medium text-[9.5px]">試著理性地審查事實：一次的失誤或考差，真的代表「大家永遠討厭你」或「一輩子完蛋」嗎？你的前提是否有客觀證據？有沒有反例？</span>
                                    </p>
                                    <textarea
                                      disabled={role === 'teacher' || isSubmitted}
                                      rows={2}
                                      value={answers['p32_socratic_fact'] || ''}
                                      onChange={(e) => updateAnswer('p32_socratic_fact', e.target.value)}
                                      placeholder="我的理性審查：其實不是。一次段考差並不決定一輩子，高中還有很多次大考。大夥平日關係很好，今天下課還分我吃零食，證明『大家討厭我』完全是我主觀誇大的幻覺..."
                                      className="w-full text-[10.5px] p-2.5 border border-blue-100 rounded-lg outline-none bg-white font-bold focus:border-blue-500"
                                    />
                                  </div>
                                )}

                                {p32ActiveSocraticStep === 'extreme' && (
                                  <div className="space-y-2 bg-white/80 p-3 rounded-xl border border-blue-150 text-[10.5px]">
                                    <p className="font-bold text-slate-800 leading-relaxed">
                                      🔵 <strong>【第二問：最壞的狀況會如何？（探索極端）】</strong>
                                      <br />
                                      <span className="text-slate-400 font-medium text-[9.5px]">如果最壞的狀況確實發生了，會世界末日嗎？真的無法承受嗎？往往我們會發現，我們最深處的恐懼被大腦無限放大了，事實上根本沒有想像中那麼可怕。</span>
                                    </p>
                                    <textarea
                                      disabled={role === 'teacher' || isSubmitted}
                                      rows={2}
                                      value={answers['p32_socratic_extreme'] || ''}
                                      onChange={(e) => updateAnswer('p32_socratic_extreme', e.target.value)}
                                      placeholder="我的理性審查：最壞的狀況就是這科被當，需要寒假補考。雖然會很累、被爸媽碎碎念幾天，但我依然可以補救，我的身體依然健康，家人依然愛我，世界根本不會毀滅，這是一件完全可以承受和挽救的事..."
                                      className="w-full text-[10.5px] p-2.5 border border-blue-100 rounded-lg outline-none bg-white font-bold focus:border-blue-500"
                                    />
                                  </div>
                                )}

                                {p32ActiveSocraticStep === 'action' && (
                                  <div className="space-y-2 bg-white/80 p-3 rounded-xl border border-blue-150 text-[10.5px]">
                                    <p className="font-bold text-slate-800 leading-relaxed">
                                      🔵 <strong>【第三問：現在我能做些什麼？（專注行動）】</strong>
                                      <br />
                                      <span className="text-slate-400 font-medium text-[9.5px]">與其無謂地自責、在情緒中內耗，此時此刻有什麼具體可行的、有建設性的「小行動」是你可以去做的？哪怕只是花五分鐘寫一題錯題、或者翻一頁書。</span>
                                    </p>
                                    <textarea
                                      disabled={role === 'teacher' || isSubmitted}
                                      rows={2}
                                      value={answers['p32_socratic_action'] || ''}
                                      onChange={(e) => updateAnswer('p32_socratic_action', e.target.value)}
                                      placeholder="我的理性審查：與其一直哭，我現在可以做的具體行動是：1. 翻開課本，找出這次考卷中錯的三道公式並用紅筆訂正。2. 傳一封簡短訊息給排球隊長：『謝謝你今天的包容，我下週會自主多練習發球！』。這樣做，心情踏實多了！"
                                      className="w-full text-[10.5px] p-2.5 border border-blue-100 rounded-lg outline-none bg-white font-bold focus:border-blue-500"
                                    />
                                  </div>
                                )}
                              </motion.div>
                            </AnimatePresence>
                          </div>
                        </div>
                      )}

                      {/* Page 33: 我的防彈思考盾牌 ─ 實踐反思 */}
                      {currentPage === 33 && (
                        <div className="space-y-5 text-xs text-slate-700 leading-relaxed font-semibold">
                          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                            <h2 className="text-base font-black text-slate-900 flex items-center gap-1.5">
                              <span className="text-amber-500 font-black">第 3 章</span>
                              <span>思考的幸福方式</span>
                              <span className="text-slate-300 font-normal">|</span>
                              <span className="text-blue-900">三 我的防彈思考盾牌</span>
                            </h2>
                            <span className="text-[10px] font-mono text-slate-400">p.033</span>
                          </div>

                          <p className="text-slate-600 indent-6">
                            正確思考，就像是一面無形的「防彈盾牌」，能抵禦來自外界的廣告洗腦、不實謠言、行銷謬誤的誘惑，同時也能抵禦內心因非理性思維而產生的焦慮與自責。
                          </p>

                          <p className="text-slate-600 indent-6">
                            古希臘斯多葛學派哲學家愛比克泰德說：「物理或人事本身並不能擾亂我們，能擾亂我們的，是我們對事物的看法。」當我們能穿透見解的迷霧，撥雲見日，便能獲得心靈的平靜與幸福。以下讓我們一起完成專屬的「邏輯審計日記」：
                          </p>

                          {/* Interactive Diary Form */}
                          <div className="bg-emerald-50/20 border border-emerald-200/50 rounded-2xl p-4.5 space-y-4 shadow-3xs">
                            <div className="flex items-center gap-2 border-b border-emerald-200 pb-2">
                              <span className="px-2 py-0.5 bg-emerald-600 text-white rounded-lg text-[9px] font-black">🛡️ 邏輯審計日記</span>
                              <h4 className="text-xs font-black text-slate-900">課本練習：我的防彈思考實踐</h4>
                            </div>

                            <div className="space-y-3">
                              <div className="space-y-1">
                                <label className="text-[10px] text-emerald-950 font-black block leading-normal">
                                  Q1. 回想或察覺一個你最近常產生的「非理性信念或自我批評」（例如：『大家都考得很好，如果我考得不好，我就是沒用又不孝的人』）：
                                </label>
                                <textarea
                                  disabled={role === 'teacher' || isSubmitted}
                                  rows={2}
                                  value={answers['p33_diary_q1'] || ''}
                                  onChange={(e) => updateAnswer('p33_diary_q1', e.target.value)}
                                  placeholder="例如：我總覺得如果我不跟著班上大家一起去報名補習班，我在學測就一定會考得比別人差，就是個不對自己學業負責、讓爸媽失望的人..."
                                  className="w-full text-[10.5px] p-2.5 rounded-lg border border-slate-200 outline-none focus:border-amber-500 font-semibold bg-white"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] text-emerald-950 font-black block leading-normal">
                                  Q2. 試著運用本單元學到的「正確思考三部曲」或「產婆術三重問」，去挑戰並反駁上面的非理性信念：
                                </label>
                                <textarea
                                  disabled={role === 'teacher' || isSubmitted}
                                  rows={2}
                                  value={answers['p33_diary_q2'] || ''}
                                  onChange={(e) => updateAnswer('p33_diary_q2', e.target.value)}
                                  placeholder="我的反駁與審查：1. 掌握事實：補習班並不是高分的唯一保證，許多學長姐靠自主規劃和問老師也考上頂尖大學。2. 分辨價值：學業負責在於真誠理解知識，而非盲目跟風。不補習省下的錢還能減輕家庭負擔，能善用學校資源才是對學業負責的表現..."
                                  className="w-full text-[10.5px] p-2.5 rounded-lg border border-slate-200 outline-none focus:border-amber-500 font-semibold bg-white"
                                />
                              </div>

                              <div className="space-y-1">
                                <label className="text-[10px] text-emerald-950 font-black block leading-normal">
                                  Q3. 平日遭遇網路極端留言、炎上事件、或者商家的不當權威廣告宣傳時，你要如何運用這面「防彈盾牌」保護自己？
                                </label>
                                <textarea
                                  disabled={role === 'teacher' || isSubmitted}
                                  rows={2}
                                  value={answers['p33_diary_q3'] || ''}
                                  onChange={(e) => updateAnswer('p33_diary_q3', e.target.value)}
                                  placeholder="我的防彈策略：我會先保持冷靜，深呼吸，不立刻轉發或留言謾罵。接著開啟謬誤雷達：檢查這消息是否有5W1H的客觀證據，大眾盲從是否犯了訴諸群眾與人身攻擊謬誤。在事實未明前，保持理性的沉默，不花冤枉錢，也不充當鍵盤打手..."
                                  className="w-full text-[10.5px] p-2.5 rounded-lg border border-slate-200 outline-none focus:border-amber-500 font-semibold bg-white"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Page 34: 思考的幸福方程式 (理性與自主) */}
                      {currentPage === 34 && (
                        <div className="space-y-5 text-xs text-slate-700 leading-relaxed font-semibold">
                          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                            <h2 className="text-base font-black text-slate-900 flex items-center gap-1.5">
                              <span className="text-amber-500 font-black">第 3 章</span>
                              <span>思考的幸福方式</span>
                              <span className="text-slate-300 font-normal">|</span>
                              <span className="text-blue-900">四 思考的幸福方程式</span>
                            </h2>
                            <span className="text-[10px] font-mono text-slate-400">p.034</span>
                          </div>

                          <p className="text-slate-600 indent-6">
                            許多人誤以為，思考是一件疲累、折磨人的繁重工作，但古希臘哲學家亞里斯多德卻曾指出：「理性的活動，是靈魂最崇高的美德，更是通往幸福（Eudaimonia）的必經之路。」
                          </p>

                          <p className="text-slate-600 indent-6">
                            幸福，絕非盲目的縱慾或隨波逐流，而是建立在我們能用理智的光芒照亮黑暗。當我們能明辨行銷謬誤、不花冤枉錢；當我們能擺脫社群炎上風潮、不淪為群眾盲從的棋子；當我們能用蘇格拉底產婆法安撫自身焦慮──我們便主導了自己的人生。
                          </p>

                          {/* Dynamic Formula Display */}
                          <div className="p-4 bg-gradient-to-br from-amber-50/50 to-orange-50/30 border border-amber-200 rounded-2xl text-center space-y-2.5 shadow-3xs">
                            <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-md font-black">📐 思考的幸福方程式</span>
                            <div className="text-[12.5px] font-black text-amber-950 font-mono tracking-tight leading-normal">
                              幸福 = 掌握真實的事實 + 分辨核心的價值 + 做出合理的行動判斷
                            </div>
                            <p className="text-[9.5px] text-slate-500 max-w-md mx-auto leading-normal">
                              當我們學會將邏輯推理融入生活的每一個決定，思考便不再是負擔，而是一股推動我們前行、過上充實且自主生活的強大幸福能量。
                            </p>
                          </div>

                          {/* Interactive Tags Selector Widget */}
                          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-3">
                            <h4 className="text-xs font-black text-slate-900 flex items-center gap-1">
                              <span>🧪</span>
                              <span>互動建構：挑選我專屬的「幸福思考關鍵元素」</span>
                            </h4>
                            <p className="text-[10px] text-slate-500 font-medium">
                              為了落實正確思考，你認為以下哪些元素對於你的生活最為關鍵？請點擊挑選（可多選）：
                            </p>

                            <div className="flex flex-wrap gap-2">
                              {[
                                { key: 'fact_check', label: '🔍 探求真相、拒絕盲從' },
                                { key: 'respect_diff', label: '🤝 包容多元、理解他人' },
                                { key: 'ask_why', label: '🗣️ 敢於發問、探究底細' },
                                { key: 'keep_calm', label: '🧘 沉澱思考、不急發言' },
                                { key: 'independent', label: '🎨 獨立自主、主導生活' },
                                { key: 'logic_shield', label: '🛡️ 開啟雷達、辨識謬誤' },
                                { key: 'action_now', label: '🎯 積極行動、落實判斷' }
                              ].map((tag) => {
                                const list = answers['p34_elements_selected'] || [];
                                const isChecked = list.includes(tag.key);
                                return (
                                  <button
                                    key={tag.key}
                                    type="button"
                                    disabled={role === 'teacher' || isSubmitted}
                                    onClick={() => {
                                      if (isChecked) {
                                        updateAnswer('p34_elements_selected', list.filter((k: string) => k !== tag.key));
                                      } else {
                                        updateAnswer('p34_elements_selected', [...list, tag.key]);
                                      }
                                    }}
                                    className={`py-1.5 px-2.5 rounded-full text-[10.5px] font-bold cursor-pointer transition-all border ${
                                      isChecked
                                        ? 'bg-amber-500 border-amber-600 text-white shadow-3xs'
                                        : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600'
                                    }`}
                                  >
                                    {tag.label}
                                  </button>
                                );
                              })}
                            </div>
                          </div>

                          {/* Commitment Textarea */}
                          <div className="space-y-1.5 pt-1.5 border-t border-slate-150">
                            <label className="text-[10.5px] font-black text-slate-900 block leading-normal">
                              Q1. 為了讓自己的思維更成熟、生活更幸福，你計畫在接下來的日子裡，如何落實「正確思考三部曲」？請寫下你最具體的「行動承諾」：
                            </label>
                            <textarea
                              disabled={role === 'teacher' || isSubmitted}
                              rows={2.5}
                              value={answers['p34_commitment'] || ''}
                              onChange={(e) => updateAnswer('p34_commitment', e.target.value)}
                              placeholder="例如：我承諾以後每次在社群媒體上看到爭議性的大新聞或炎上貼文時，我絕對不急著轉發或留言評論（沉澱思考），而是先花五分鐘去多方查核事實真相（掌握事實），然後想想我的發言會給社會與他人帶來什麼價值（分辨價值），最後才理智決定是否採取理性的關心（行動判斷）..."
                              className="w-full text-xs p-3 rounded-xl border border-slate-200 outline-none focus:border-amber-500 bg-white shadow-3xs"
                            />
                          </div>
                        </div>
                      )}

                      {/* Page 35: 第一單元 終結大回顧與自我檢測表 */}
                      {currentPage === 35 && (
                        <div className="space-y-5 text-xs text-slate-700 leading-relaxed font-semibold">
                          <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
                            <h2 className="text-base font-black text-slate-900 flex items-center gap-1.5">
                              <span className="text-emerald-600 font-black">🏆 單元總結</span>
                              <span>第一單元：互動思考的樂趣 ─ 自我學習檢測</span>
                              <span className="text-slate-300 font-normal">|</span>
                              <span className="text-blue-900">恭喜完成本單元！</span>
                            </h2>
                            <span className="text-[10px] font-mono text-slate-400">p.035</span>
                          </div>

                          <p className="text-slate-600 indent-6">
                            恭喜你！我們已經完成了第一單元「互動思考的樂趣」的全部學習。本單元帶領我們穿透思想迷霧，認識思維的三個層級、察覺自身偏見，並掌握了亞里斯多德三段論、正確思考三部曲、5W1H與蘇格拉底產婆法提問。
                          </p>

                          <p className="text-slate-600 indent-6">
                            這些工具並不是為了應付考試而背誦的公式，而是能陪伴你一生、保護心靈自由與獨立人格的最強武器。在開啟下一個單元之前，請認真對自己在第一單元的學習成效進行自我評估：
                          </p>

                          {/* Star Ratings Component */}
                          <div className="bg-slate-50 border border-slate-200 p-4.5 rounded-2xl space-y-3.5">
                            <h4 className="text-xs font-black text-slate-950 flex items-center gap-1.5">
                              <span>📊</span>
                              <span>我的學習成熟度自我檢測</span>
                            </h4>

                            <div className="space-y-3">
                              {[
                                { key: 'rate_fallacy', label: '1. 辨識謬誤能力：在日常中辨識九大謬誤與行銷陷阱的能力' },
                                { key: 'rate_logic', label: '2. 健全論證建立：運用亞里斯多德三段論進行有效推論的能力' },
                                { key: 'rate_three_steps', label: '3. 思考三部曲落實：在面對日常事件時掌握事實、分辨價值的能力' },
                                { key: 'rate_socratic', label: '4. 產婆術心靈對話：運用產婆術三重問對自己進行心理疏導的能力' }
                              ].map((item) => {
                                const currentRating = answers[`p35_${item.key}`] || 0;
                                return (
                                  <div key={item.key} className="space-y-1">
                                    <span className="text-[10.5px] text-slate-700 block">{item.label}</span>
                                    <div className="flex gap-2 items-center">
                                      {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                          key={star}
                                          type="button"
                                          disabled={role === 'teacher' || isSubmitted}
                                          onClick={() => updateAnswer(`p35_${item.key}`, star)}
                                          className={`text-lg transition-all hover:scale-125 cursor-pointer disabled:cursor-not-allowed ${
                                            star <= currentRating ? 'text-amber-500 scale-110' : 'text-slate-200'
                                          }`}
                                        >
                                          ★
                                        </button>
                                      ))}
                                      <span className="text-[10px] font-black text-slate-400 font-mono ml-2">
                                        {currentRating > 0 ? `${currentRating} / 5 分` : '請點擊星星打分'}
                                      </span>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          {/* Grand Reflection Textarea */}
                          <div className="space-y-1.5 pt-1.5 border-t border-slate-200">
                            <label className="text-[10.5px] font-black text-slate-900 block leading-normal">
                              📝 第一單元 學習大收穫 (單元終結反思)：哪一個單元觀念或故事對你啟發最大？為什麼？請寫下你最真誠的心得。
                            </label>
                            <textarea
                              disabled={role === 'teacher' || isSubmitted}
                              rows={3}
                              value={answers['p35_grand_reflection'] || ''}
                              onChange={(e) => updateAnswer('p35_grand_reflection', e.target.value)}
                              placeholder="例如：對我啟發最大的是『正確思考三部曲』。這讓我驚覺到平日裡我常在還沒完全『掌握事實』之前就下定結論、自我責怪。現在我知道，遭遇挫折時要冷靜找出真相，分辨事物的真正價值在於長遠成長而非一時輸贏，這極大地釋放了我的內心壓力，讓我感到思考確實能帶來力量與幸福..."
                              className="w-full text-xs p-3 rounded-xl border border-slate-200 outline-none focus:border-amber-500 bg-white shadow-3xs"
                            />
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer Page Navigation Buttons */}
          <div id="unit01-page-footer" className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between z-10 relative">
            <button
              id="unit01-prev-page-btn"
              onClick={handlePrev}
              disabled={pages.indexOf(currentPage) === 0}
              className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center gap-1 cursor-pointer transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              上一頁
            </button>

            <span className="text-xs font-black text-slate-500 font-sans">
              p. {currentPage} / {pages[pages.length - 1]}
            </span>

            <button
              id="unit01-next-page-btn"
              onClick={handleNext}
              className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center gap-1 cursor-pointer transition-colors hover:border-slate-300"
            >
              {pages.indexOf(currentPage) === pages.length - 1 ? '完成單元 ➔' : '下一頁'}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
