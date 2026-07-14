/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
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
  ListTodo,
  Anchor,
  Trees,
  Zap,
  TrendingUp
} from 'lucide-react';

interface Unit03TextbookPageViewerProps {
  answers: Record<string, any>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  role: 'student' | 'teacher';
  isSubmitted: boolean;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

// Full chapters navigation matching Unit 03 textbook pages
export const CHAPTERS_NAV_UNIT_03 = [
  { page: 56, title: "行前閱讀：旅程中的神奇羅盤", tag: "前導", emoji: "🧭", desc: "可華與好友關於生命意義與陪伴的對話。" },
  { page: 57, title: "行前暖身：畫出你的生命航線", tag: "前導", emoji: "⚓", desc: "如果你擁有一座神奇羅盤，你最想前往的目標與人生航道探索。" },
  { page: 58, title: "第1章：哲學與生命意義 ─ 追尋為什麼", tag: "第一章", emoji: "👤", desc: "蘇格拉底的哲學廣場，探索我們內心對於生命本質的追問。" },
  { page: 59, title: "第1章：MIND 田捕手 ─ 相同工作，不同價值", tag: "第一章", emoji: "🧱", desc: "三個敲磚工人蓋大教堂的著名寓言，思考你讀書上學的終極價值。" },
  { page: 60, title: "第1章：追尋生命的意義 ─ 立志劉安婷的故事", tag: "第一章", emoji: "🌱", desc: "為台灣而教創辦人劉安婷的心路轉變，從追求成功到貼近苦難付出。" },
  { page: 61, title: "第1章：MIND 田捕手 ─ 德國種樹男孩菲利斯", tag: "第一章", emoji: "🌳", desc: "德國種樹男孩菲利斯為了保護地球，發起「為地球種樹」運動的故事。" },
  { page: 62, title: "第1章：人生的終極信念", tag: "第一章", emoji: "🌸", desc: "魯夫與騙人布的核心信念，與計程車司機的溫馨繽紛上帝恩典。" },
  { page: 63, title: "第1章：LIFE 心動力 ─ 我最重視的價值", tag: "第一章", emoji: "🎁", desc: "在難得假期與科展、打工、圖書館K書的兩難衝突中，尋求自己不可割捨的價值核心。" },
  { page: 64, title: "第1章：創造幸福快樂而圓滿的人生", tag: "第一章", emoji: "⚖️", desc: "亞里斯多德追求幸福而非快樂，課堂分組在快樂幸福四象限進行思辨實戰。" },
  { page: 65, title: "第1章：至善至福 ─ 幸福人生進行曲", tag: "第一章", emoji: "🎵", desc: "王博鈞辛苦練習十萬投球，追求至善至福的境界，並思考讀書上學與蓋教堂工人的信念。" },
  { page: 66, title: "第1章：死生有命 ─ 終極目標與死亡", tag: "第一章", emoji: "💀", desc: "認識生理、心理與靈性死亡的定義與極限思維。" },
  { page: 67, title: "第2章：死生大哉問 ─ 哲學家看死亡", tag: "第二章", emoji: "⚖️", desc: "莊子與海德格對死亡的哲學詮釋：死生有命，向死而生。" },
  { page: 68, title: "第2章：悲傷五階段 ─ 面對悲傷的心理歷程", tag: "第二章", emoji: "💔", desc: "認識庫伯勒-羅絲悲傷歷程模型，學會接納生命中的失落情緒。" },
  { page: 69, title: "第2章：MIND 田捕手 ─ 四道人生的功課", tag: "第二章", emoji: "🌸", desc: "認識臨終與悲傷輔導中最重要的四道功課：道謝、道愛、道歉、道別。" },
  { page: 70, title: "第2章：安寧療護 ─ 善終與尊嚴的維護", tag: "第二章", emoji: "🏥", desc: "認識安寧療護的真諦：不加速死亡，也不用無效醫療延長痛苦，追求尊嚴善終。" },
  { page: 71, title: "第2章：病人自主與預立醫療決定", tag: "第二章", emoji: "📜", desc: "認識台灣《病人自主權利法》與「預立醫療決定 (AD)」，為自己未來的臨終抉擇做出規劃。" },
  { page: 72, title: "第2章：LIFE 心動力 ─ 寫一封生前墓誌銘", tag: "第二章", emoji: "✍️", desc: "透過墓誌銘的書寫，反思生命最想留下的印記，探索自我的終極關懷。" },
  { page: 73, title: "第2章：安寧緩和醫療條例 vs 病人自主權利法", tag: "第二章", emoji: "⚖️", desc: "比較兩部法規在簽署文件、適用對象與拒絕醫療範圍上的差異。" },
  { page: 74, title: "第2章：LIFE 心動力 ─ 人生行囊", tag: "第二章", emoji: "🎒", desc: "面對生命的終點，反思這趟旅程中最想帶著走的人事物與價值。" },
  { page: 75, title: "第2章：名人墓誌銘", tag: "第二章", emoji: "🪦", desc: "金恩博士、富蘭克林、濟慈等中外名人的墓誌銘，啟發你寫下自己的生命宣言。" },
  { page: 76, title: "第3章：東西方宗教的生死觀", tag: "第三章", emoji: "⛪", desc: "比較佛教、道教與西方宗教對死亡與超越的不同詮釋。" },
  { page: 77, title: "第3章：LIFE 心動力 ─ 宗教信仰與生活", tag: "第三章", emoji: "🕊️", desc: "反思宗教／信仰在日常生活中扮演的角色與意義。" },
  { page: 78, title: "第3章：信仰的作用與價值", tag: "第三章", emoji: "✨", desc: "超越死亡限制、面對苦難、勸人行善、建立生命價值觀，信仰帶來的六大作用。" },
  { page: 79, title: "第3章：LIFE 心動力 ─ 活出不凡的生命價值", tag: "第三章", emoji: "💪", desc: "從力克・胡哲的生命故事，反思信仰如何幫助人活出超越限制的價值。" },
  { page: 80, title: "第3章：MIND 田捕手 ─ 芥子葉的故事", tag: "第三章", emoji: "🌾", desc: "不曾失去至親的家庭找芥子葉的故事，體會失落是生命共同的課題。" },
  { page: 81, title: "第3章：LIFE 心動力 ─ 智慧小語的啟發", tag: "第三章", emoji: "💬", desc: "德蕾莎修女、達賴喇嘛、孔子、蘇格拉底等古今中外智者的生命智慧語錄。" },
  { page: 82, title: "單元03 終結大回顧與自我檢測表", tag: "單元總結", emoji: "🏆", desc: "完成「終極關懷」全單元數位課本的自我學習檢測，為你的心靈羅盤蓋上認證章。" }
];

export default function Unit03TextbookPageViewer({
  answers,
  setAnswers,
  role,
  isSubmitted,
  currentPage: controlledPage,
  onPageChange
}: Unit03TextbookPageViewerProps) {
  const [localPage, setLocalPage] = useState<number>(56);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const currentPage = controlledPage !== undefined ? controlledPage : localPage;

  const setCurrentPage = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    } else {
      setLocalPage(page);
    }
    
    // Auto-update read pages tracker for Unit 03
    if (role === 'student' && !isSubmitted) {
      const readPages = answers.textbookReadPages || [56];
      if (!readPages.includes(page)) {
        updateAnswer('textbookReadPages', [...readPages, page]);
      }
    }
  };

  const pages = CHAPTERS_NAV_UNIT_03.map(ch => ch.page);

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

  const readPagesList = answers.textbookReadPages || [56];
  const readPagesCount = readPagesList.filter(p => pages.includes(p)).length || 1;
  const readPagesTotal = pages.length;

  // --- Page 57: Life Route States ---
  const routeOptions = [
    { id: 'partner', label: '心靈伴侶', color: 'from-pink-400 to-rose-500' },
    { id: 'expert', label: '職場達人', color: 'from-blue-400 to-indigo-500' },
    { id: 'wealth', label: '財富自由', color: 'from-amber-400 to-yellow-500' },
    { id: 'family', label: '家庭幸福', color: 'from-emerald-400 to-teal-500' },
    { id: 'health', label: '身體健康', color: 'from-red-400 to-orange-500' },
    { id: 'world', label: '環遊世界', color: 'from-purple-400 to-fuchsia-500' },
    { id: 'skills', label: '多才多藝', color: 'from-cyan-400 to-blue-500' },
    { id: 'crisis', label: '失業挑戰 (金融風暴)', color: 'from-slate-500 to-gray-700' },
    { id: 'bereavement', label: '至親驟逝 (生命無常)', color: 'from-stone-500 to-stone-800' }
  ];

  const toggleRouteOption = (id: string) => {
    if (role === 'teacher' || isSubmitted) return;
    const currentRoute = answers.p57SelectedRoute || [];
    if (currentRoute.includes(id)) {
      updateAnswer('p57SelectedRoute', currentRoute.filter((x: string) => x !== id));
    } else {
      if (currentRoute.length >= 3) {
        // limit to 3 elements for the route
        updateAnswer('p57SelectedRoute', [...currentRoute.slice(1), id]);
      } else {
        updateAnswer('p57SelectedRoute', [...currentRoute, id]);
      }
    }
  };

  // --- Page 63: Value Treasure Boxes States ---
  const availableValues = [
    '聰明才智', '愛與被愛', '健康', '金錢財富', '自我實現', 
    '家人', '朋友', '愛情', '善良', '誠信', 
    '創意', '成功', '權力', '尊嚴', '獨立', 
    '自由', '顏值', '體驗每個當下'
  ];

  const handleSelectValue = (val: string) => {
    if (role === 'teacher' || isSubmitted) return;
    const current5 = answers.p63Top5 || [];
    if (current5.includes(val)) {
      const next5 = current5.filter((v: string) => v !== val);
      updateAnswer('p63Top5', next5);
      // clean top 3 and top 1 if not in top 5 anymore
      const current3 = answers.p63Top3 || [];
      if (current3.includes(val)) {
        updateAnswer('p63Top3', current3.filter((v: string) => v !== val));
      }
      if (answers.p63Rank1 === val) {
        updateAnswer('p63Rank1', '');
      }
    } else {
      if (current5.length < 5) {
        updateAnswer('p63Top5', [...current5, val]);
      }
    }
  };

  const handleSelectValue3 = (val: string) => {
    if (role === 'teacher' || isSubmitted) return;
    const current3 = answers.p63Top3 || [];
    if (current3.includes(val)) {
      updateAnswer('p63Top3', current3.filter((v: string) => v !== val));
      if (answers.p63Rank1 === val) {
        updateAnswer('p63Rank1', '');
      }
    } else {
      if (current3.length < 3) {
        updateAnswer('p63Top3', [...current3, val]);
      }
    }
  };

  const handleSelectRank1 = (val: string) => {
    if (role === 'teacher' || isSubmitted) return;
    updateAnswer('p63Rank1', val);
  };

  // --- Page 64: Quadrant Events ---
  const defaultQuadrantSetup = {
    '無節制熬夜打電動': 'Q2',
    '吸毒、常喝含糖飲料': 'Q2',
    '辛苦練習投籃十萬顆，終於成為三分射手': 'Q4',
    '準備期中考而努力讀書': 'Q4',
    '與好朋友深入暢談心事': 'Q1',
    '因過度放縱導致生病': 'Q3'
  };

  const quadrantMap = answers.p64QuadrantMap || defaultQuadrantSetup;

  const updateQuadrant = (item: string, targetQ: string) => {
    if (role === 'teacher' || isSubmitted) return;
    updateAnswer('p64QuadrantMap', {
      ...quadrantMap,
      [item]: targetQ
    });
  };

  return (
    <div id="unit03_page_viewer" className="flex flex-col lg:flex-row gap-6 bg-slate-50 p-1 sm:p-3 rounded-2xl min-h-[750px]">
      
      {/* 1. LEFT SIDEBAR NAVIGATION OR DRAWER */}
      {isSidebarOpen && (
        <div className="w-full lg:w-80 bg-white border border-slate-100 rounded-2xl p-4.5 space-y-4 shrink-0 shadow-2xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-orange-500 animate-spin-slow" />
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                  單元 03 數位課本導覽
                </h3>
              </div>
              <span className="text-[10px] font-black bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full font-sans">
                p.{String(currentPage).padStart(3, '0')}
              </span>
            </div>

            {/* Read progress tracker */}
            <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100 space-y-2">
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                <span>單元學習進度</span>
                <span>{readPagesCount} / {readPagesTotal} 頁 ({Math.round(readPagesCount / readPagesTotal * 100)}%)</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-300"
                  style={{ width: `${(readPagesCount / readPagesTotal) * 100}%` }}
                />
              </div>
            </div>

            {/* Chapter Links */}
            <div className="space-y-1.5 pr-1">
              {CHAPTERS_NAV_UNIT_03.map((ch) => {
                const isCurrent = ch.page === currentPage;
                const hasRead = readPagesList.includes(ch.page);
                return (
                  <button
                    key={ch.page}
                    onClick={() => setCurrentPage(ch.page)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-bold transition-all flex items-start gap-2.5 ${
                      isCurrent
                        ? 'bg-orange-500 text-white shadow-xs'
                        : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-100/50'
                    }`}
                  >
                    <span className="shrink-0 text-sm mt-0.5">{ch.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full ${isCurrent ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                          {ch.tag}
                        </span>
                        <span className="text-[9px] font-mono shrink-0">p.{String(ch.page).padStart(3, '0')}</span>
                      </div>
                      <p className="truncate text-[11px] font-extrabold leading-tight">{ch.title}</p>
                      {isCurrent && (
                        <p className="text-[9px] text-orange-50/90 leading-snug mt-1 font-medium italic line-clamp-2">
                          {ch.desc}
                        </p>
                      )}
                    </div>
                    {hasRead && !isCurrent && (
                      <span className="text-emerald-500 text-[10px] shrink-0 font-sans">✔️</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-50">
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="w-full text-center py-2 bg-slate-100 hover:bg-slate-200 text-slate-500 rounded-xl text-[10px] font-bold transition-colors"
            >
              ⬅️ 收合側邊導覽
            </button>
          </div>
        </div>
      )}

      {/* Sidebar closed quick toggle button */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="absolute lg:relative z-10 p-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-md flex items-center justify-center border border-orange-400 self-start"
          title="開啟課本導覽"
        >
          <Menu className="w-4 h-4" />
        </button>
      )}

      {/* 2. MAIN TEXTBOOK CONTAINER WITH ANIMATED TRANSITION */}
      <div className="flex-1 bg-white border border-slate-100 rounded-2xl shadow-2xs p-5 sm:p-7 flex flex-col justify-start relative min-w-0">
        
        {/* Top Mini Header */}
        <div className="flex items-center justify-between border-b border-slate-50 pb-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
              單元 03：終極關懷
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-black text-slate-800">
              {CHAPTERS_NAV_UNIT_03.find(ch => ch.page === currentPage)?.title}
            </span>
          </div>
          <span className="text-xs font-mono font-black text-slate-400">
            P.{String(currentPage).padStart(3, '0')}
          </span>
        </div>

        {/* Content Renderers for each page */}
        <div className="mb-6 pr-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              
              {/* ==================== PAGE 56 ==================== */}
              {currentPage === 56 && (
                <div id="page_56" className="space-y-5">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">行前閱讀</span>
                    <h2 className="text-lg font-black text-slate-800">旅程中的神奇羅盤</h2>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    可華因為爺爺過世請了兩天喪假，博鈞和曉萍相約去探望可華。
                  </p>

                  {/* Character Conversation Theatre */}
                  <div className="bg-orange-50/35 border border-orange-100/50 rounded-2xl p-4.5 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-lg shadow-2xs shrink-0">
                        👩🏻
                      </div>
                      <div className="bg-white p-3 rounded-2xl rounded-tl-xs border border-orange-100/40 text-xs shadow-3xs max-w-lg">
                        <p className="font-extrabold text-orange-950 mb-0.5">張曉萍</p>
                        <p className="text-slate-700 leading-relaxed font-medium">「你還好嗎？」</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 justify-end">
                      <div className="bg-amber-500 text-white p-3 rounded-2xl rounded-tr-xs text-xs shadow-3xs max-w-lg">
                        <p className="font-extrabold text-amber-50 mb-0.5">陳可華</p>
                        <p className="leading-relaxed font-medium">「嗯，還好。」可華勉強擠出笑容。</p>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-amber-600 text-white flex items-center justify-center text-lg shadow-2xs shrink-0">
                        👦🏻
                      </div>
                    </div>

                    <div className="p-3 text-center">
                      <p className="text-[11px] text-slate-400 italic font-bold">沉默了一會，可華才開口：</p>
                    </div>

                    <div className="flex items-start gap-3 justify-end">
                      <div className="bg-amber-500 text-white p-3 rounded-2xl rounded-tr-xs text-xs shadow-3xs max-w-lg">
                        <p className="font-extrabold text-amber-50 mb-0.5">陳可華</p>
                        <p className="leading-relaxed font-medium">「爺爺突然離開，我覺得好難接受，明明前幾天才跟他講過電話，現在卻永遠講不上話了……」</p>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-amber-600 text-white flex items-center justify-center text-lg shadow-2xs shrink-0">
                        👦🏻
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-lg shadow-2xs shrink-0">
                        🏀
                      </div>
                      <div className="bg-white p-3 rounded-2xl rounded-tl-xs border border-blue-100/40 text-xs shadow-3xs max-w-lg">
                        <p className="font-extrabold text-blue-950 mb-0.5">王博鈞</p>
                        <p className="text-slate-700 leading-relaxed font-medium">「唉！人生無常，不要想太多啦！」博鈞試著安慰可華。</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 justify-end">
                      <div className="bg-amber-500 text-white p-3 rounded-2xl rounded-tr-xs text-xs shadow-3xs max-w-lg">
                        <p className="font-extrabold text-amber-50 mb-0.5">陳可華</p>
                        <p className="leading-relaxed font-medium">「以前就知道人都會死，但實際發生時，竟然會這麼難過。」</p>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-amber-600 text-white flex items-center justify-center text-lg shadow-2xs shrink-0">
                        👦🏻
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-lg shadow-2xs shrink-0">
                        🏀
                      </div>
                      <div className="bg-white p-3 rounded-2xl rounded-tl-xs border border-blue-100/40 text-xs shadow-3xs max-w-lg">
                        <p className="font-extrabold text-blue-950 mb-0.5">王博鈞</p>
                        <p className="text-slate-700 leading-relaxed font-medium">「至少我們現在都還活著，要好好珍惜。這是小文幫你準備的筆記，下週期中考也要加油喔，逝去的人已經離我們而去，能努力把握的只有未來啊！」</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 justify-end">
                      <div className="bg-amber-500 text-white p-3 rounded-2xl rounded-tr-xs text-xs shadow-3xs max-w-lg">
                        <p className="font-extrabold text-amber-50 mb-0.5">陳可華</p>
                        <p className="leading-relaxed font-medium">「謝謝。有你們的陪伴很幸福。」可華空虛的感覺好了一點。</p>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-amber-600 text-white flex items-center justify-center text-lg shadow-2xs shrink-0">
                        👦🏻
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    同學離開後，可華在筆記本寫下了：
                  </p>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-xl">
                    <p className="text-xs font-mono font-bold text-yellow-800 italic leading-relaxed">
                      「有一天我們都會消失，活著的意義與目的究竟是什麼呢？」
                    </p>
                  </div>
                </div>
              )}

              {/* ==================== PAGE 57 ==================== */}
              {currentPage === 57 && (
                <div id="page_57" className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">行前暖身</span>
                    <h2 className="text-lg font-black text-slate-800">神奇羅盤與你的生命航線</h2>
                  </div>

                  <div className="bg-amber-50/40 border border-amber-100 rounded-xl p-4 space-y-3">
                    <h4 className="text-xs font-extrabold text-amber-900 flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      思考故事：
                    </h4>
                    <p className="text-xs text-amber-950/80 leading-relaxed font-medium">
                      還記得《神鬼奇航》中史船長的神奇羅盤嗎？只要心中想著期待的事物，羅盤就能指出，通往該事物的方向。
                    </p>
                  </div>

                  {/* Interactive Option Selector */}
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs font-black text-orange-600 uppercase tracking-widest block mb-1">互動環節</span>
                      <h4 className="text-xs font-extrabold text-slate-800">⚓ 畫出你的生命航線：</h4>
                      <p className="text-[10px] text-slate-500 font-medium">
                        從出生到死亡的生命旅程中，你認為遇見哪些事，更能豐富人生經歷？
                        <span className="text-orange-500 font-black">（請依序點選 3 個景點，串起你的黃金航線！）</span>
                      </p>
                    </div>

                    {/* Interactive path route display */}
                    <div className="bg-slate-50/80 p-4.5 rounded-2xl border border-slate-100 flex flex-col items-center justify-center gap-4">
                      <div className="flex items-center gap-2 sm:gap-4 font-mono text-xs font-black">
                        <div className="bg-indigo-600 text-white px-3 py-1 rounded-full shadow-3xs flex items-center gap-1 text-[10px]">
                          <span>👶 出生</span>
                        </div>
                        <span className="text-slate-300">▶</span>
                        {(answers.p57SelectedRoute || []).map((id: string, idx: number) => {
                          const option = routeOptions.find(o => o.id === id);
                          return (
                            <React.Fragment key={id}>
                              <div className="bg-orange-500 text-white px-3 py-1 rounded-full shadow-3xs text-[10px] flex items-center gap-1 animate-fade-in">
                                <span>{idx + 1}. {option?.label}</span>
                              </div>
                              <span className="text-slate-300">▶</span>
                            </React.Fragment>
                          );
                        })}
                        <div className="bg-stone-800 text-white px-3 py-1 rounded-full shadow-3xs flex items-center gap-1 text-[10px]">
                          <span>⛵ 死亡</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 w-full max-w-xl">
                        {routeOptions.map((opt) => {
                          const isSelected = (answers.p57SelectedRoute || []).includes(opt.id);
                          const selectIndex = (answers.p57SelectedRoute || []).indexOf(opt.id);
                          return (
                            <button
                              key={opt.id}
                              disabled={role === 'teacher' || isSubmitted}
                              onClick={() => toggleRouteOption(opt.id)}
                              className={`p-2.5 rounded-xl border text-[11px] font-extrabold text-left transition-all flex items-center justify-between ${
                                isSelected
                                  ? 'bg-gradient-to-r ' + opt.color + ' text-white border-transparent shadow-xs translate-y-[-1px]'
                                  : 'bg-white border-slate-100 hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                              }`}
                            >
                              <span>{opt.label}</span>
                              {isSelected && (
                                <span className="bg-white/20 text-white w-4 h-4 rounded-full flex items-center justify-center font-mono text-[9px]">
                                  {selectIndex + 1}
                                </span>
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {(answers.p57SelectedRoute || []).length > 0 && (
                        <button
                          disabled={role === 'teacher' || isSubmitted}
                          onClick={() => updateAnswer('p57SelectedRoute', [])}
                          className="text-[10px] font-black text-slate-400 hover:text-red-500 flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-slate-100 shadow-3xs transition-all"
                        >
                          <RefreshCw className="w-3 h-3" /> 重設航道
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Textbook Q1-Q3 Form Inputs */}
                  <div className="space-y-4 border-t border-slate-100 pt-5">
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                        <span className="bg-orange-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                        <span>如果你有這樣的羅盤，你會期待前往什麼樣的目標？</span>
                      </label>
                      <textarea
                        disabled={role === 'teacher' || isSubmitted}
                        value={answers.p57Q1 || ''}
                        onChange={(e) => updateAnswer('p57Q1', e.target.value)}
                        placeholder="請在此處寫下你渴望前往的終極目標..."
                        rows={3}
                        className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl focus:ring-1 focus:ring-orange-500 outline-none leading-relaxed"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                        <span className="bg-orange-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">2</span>
                        <span>依據你的經驗，在前往這個目標的過程中，可能需要哪些資源？可能會遇上哪些挫折？</span>
                      </label>
                      <textarea
                        disabled={role === 'teacher' || isSubmitted}
                        value={answers.p57Q2 || ''}
                        onChange={(e) => updateAnswer('p57Q2', e.target.value)}
                        placeholder="例如：可能需要家人的支持、朋友的鼓勵、持續不斷的專注力；可能會遇到考試失利、不被理解、或意志力動搖等挫折..."
                        rows={3}
                        className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl focus:ring-1 focus:ring-orange-500 outline-none leading-relaxed"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                        <span className="bg-orange-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">3</span>
                        <span>人生與旅程同樣都會有個終點站，在旅程開始時，你會做哪些準備？在旅程結束前，你會如何回顧這段旅程？當人生快結束前，你希望回顧哪些你認為重要的事情？</span>
                      </label>
                      <textarea
                        disabled={role === 'teacher' || isSubmitted}
                        value={answers.p57Q3 || ''}
                        onChange={(e) => updateAnswer('p57Q3', e.target.value)}
                        placeholder="請認真思考人生的起點與終點，並誠實寫下你對這段旅程的回顧渴望..."
                        rows={4}
                        className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl focus:ring-1 focus:ring-orange-500 outline-none leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== PAGE 58 ==================== */}
              {currentPage === 58 && (
                <div id="page_58" className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">第 1 章</span>
                    <h2 className="text-lg font-black text-slate-800">哲學與生命意義</h2>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    關於可華的困惑：「有一天我們都會消失，活著的意義與目的究竟是什麼呢？」這個疑問，你也有過嗎？
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-xl space-y-1">
                      <p className="text-[10px] text-blue-600 font-extrabold uppercase">生活觀察 A</p>
                      <p className="text-xs text-slate-700 leading-relaxed font-bold">有人即時行樂，活在當下；有人卻犧牲享樂，努力工作！</p>
                    </div>
                    <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-xl space-y-1">
                      <p className="text-[10px] text-amber-600 font-extrabold uppercase">生活觀察 B</p>
                      <p className="text-xs text-slate-700 leading-relaxed font-bold">有人拚命賺錢，累積財富；有人卻將賺的錢，捐出助人！</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    孩提時代的我們對這個世界充滿好奇、懷疑，用「為什麼」問遍大大小小的事：為什麼是這樣而不是那樣……長大後，獲得越多的知識與理論，卻逐漸放棄了繼續追問「為什麼」的熱情。我們要如何運用這些知識與理論來深入探索生命的「為什麼」呢？
                  </p>

                  <div className="bg-amber-50/30 border border-amber-100 rounded-xl p-5 space-y-4">
                    <h4 className="text-xs font-extrabold text-amber-900 flex items-center gap-1.5 border-b border-amber-100 pb-2">
                      <Users className="w-4 h-4 text-amber-600" />
                      🏛️ 蘇格拉底的哲學廣場：
                    </h4>
                    
                    <div className="flex gap-4 items-start">
                      <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-3xl shadow-xs border border-amber-200 shrink-0">
                        👴🏼
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-amber-950 font-bold leading-relaxed">
                          偉大的哲學家蘇格拉底是希臘最有智慧的人，但他仍謙虛地表示自己是無知的，因此每天到雅典的廣場，找人問哲學的問題。
                        </p>
                        <p className="text-[10px] text-amber-700 font-extrabold">
                          👉 如果你是蘇格拉底，你想問什麼樣有關生命的問題？想一想，寫下來，然後請教同學。
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <span className="text-[10px] text-amber-600 font-black block">廣場留言板：</span>
                      <textarea
                        disabled={role === 'teacher' || isSubmitted}
                        value={answers.p58Q1 || ''}
                        onChange={(e) => updateAnswer('p58Q1', e.target.value)}
                        placeholder="例如：我最想問「如果明天世界就終結，你今天最想完成的承諾是什麼？」或者「什麼是絕對的正義？」..."
                        rows={3}
                        className="w-full text-xs p-3 bg-white border border-amber-200 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 rounded-xl outline-none leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-slate-50 pt-4">
                    <h4 className="text-xs font-extrabold text-slate-800 flex items-center gap-1">
                      <Award className="w-4 h-4 text-orange-500" />
                      探索生命的意義
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      人不只是追求實用功利的動物，而是會對自己及周遭一切的存在不斷發出疑問與尋找答案的生命體。讓我們一起來思考，人存在的意義與價值還有哪些可能？
                    </p>
                  </div>
                </div>
              )}

              {/* ==================== PAGE 59 ==================== */}
              {currentPage === 59 && (
                <div id="page_59" className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">MIND田捕手</span>
                    <h2 className="text-lg font-black text-slate-800">相同的工作，不同的價值</h2>
                  </div>

                  <blockquote className="border-l-4 border-blue-200 bg-blue-50/20 p-4 rounded-r-xl space-y-3.5">
                    <div className="flex items-center gap-2">
                      <span className="text-base">⛪</span>
                      <h4 className="text-xs font-black text-blue-900">故事：蓋大教堂的工人</h4>
                    </div>
                    <p className="text-xs text-slate-700 leading-relaxed font-bold">
                      有位神父來到正在蓋教堂的建築工地問候工人們。
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                      <div className="bg-white border border-blue-50 p-3 rounded-xl space-y-1">
                        <span className="text-[10px] text-red-500 font-extrabold block">🧱 工人一</span>
                        <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                          神父看到其中一位蹲在地上敲打磚頭，便走近問他：「你在做什麼？」工人看了神父一眼，不耐煩地說：「我在敲磚頭啊！」
                        </p>
                      </div>
                      <div className="bg-white border border-blue-50 p-3 rounded-xl space-y-1">
                        <span className="text-[10px] text-amber-500 font-extrabold block">🏠 工人二</span>
                        <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                          神父愣了一下，轉身走向另一位也在敲磚頭的工人，再次問道：「你在做什麼？」工人抬起頭來，回答：「我是在為了讓家人衣食無缺努力著。」
                        </p>
                      </div>
                      <div className="bg-white border border-blue-50 p-3 rounded-xl space-y-1">
                        <span className="text-[10px] text-emerald-500 font-extrabold block">✨ 工人三</span>
                        <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                          神父笑了一下，往第三個也在敲磚頭的工人走去，一樣問他：「你在做什麼？」工人停下手中的動作，站起身來回答：「我在蓋一個可以容納上千人的大教堂，能幫助很多人在這裡得到神的祝福和心靈的平安。」邊說還邊揮舞著雙手，臉上更充滿著嚮往。
                        </p>
                      </div>
                    </div>
                  </blockquote>

                  {/* Textbook Q1-Q4 Thought Form */}
                  <div className="space-y-4 border-t border-slate-100 pt-5">
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">💡 想一想：</h3>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                        <span className="bg-orange-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                        <span>這三位工人對工作分別抱持什麼樣的想法和動機？</span>
                      </label>
                      <textarea
                        disabled={role === 'teacher' || isSubmitted}
                        value={answers.p59Q1 || ''}
                        onChange={(e) => updateAnswer('p59Q1', e.target.value)}
                        placeholder="第一位認為只是應付差事，第二位是為了溫飽家庭，第三位則是看見了更高的神聖使命與社會價值..."
                        rows={2.5}
                        className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                        <span className="bg-orange-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">2</span>
                        <span>他們對工作抱持的想法可能會帶來什麼樣不同的內心感受呢？</span>
                      </label>
                      <textarea
                        disabled={role === 'teacher' || isSubmitted}
                        value={answers.p59Q2 || ''}
                        onChange={(e) => updateAnswer('p59Q2', e.target.value)}
                        placeholder="第一位容易感到枯燥痛苦與不耐煩，第二位可能感到責任與辛勞，第三位則會感到充滿熱情、神聖意義與內心富足..."
                        rows={2.5}
                        className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                        <span className="bg-orange-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">3</span>
                        <span>這三個人從事相同的工作，為什麼意義感卻如此不同呢？關鍵原因是什麼？</span>
                      </label>
                      <textarea
                        disabled={role === 'teacher' || isSubmitted}
                        value={answers.p59Q3 || ''}
                        onChange={(e) => updateAnswer('p59Q3', e.target.value)}
                        placeholder="關鍵在於他們自我定位的「視野」與「終極信念」不同，是否能連結到超越自身的更高價值與利他情懷..."
                        rows={2.5}
                        className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                        <span className="bg-orange-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">4</span>
                        <span>對於身為學生的你，上學讀書的意義是什麼？目的是什麼？帶給你什麼感受？</span>
                      </label>
                      <textarea
                        disabled={role === 'teacher' || isSubmitted}
                        value={answers.p59Q4 || ''}
                        onChange={(e) => updateAnswer('p59Q4', e.target.value)}
                        placeholder="上學讀書對我是為了應付考試，還是為了理解世界、探索天命，並在未來能為社會做出貢獻呢？"
                        rows={3.5}
                        className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== PAGE 60 ==================== */}
              {currentPage === 60 && (
                <div id="page_60" className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">追尋生命的意義</span>
                    <h2 className="text-lg font-black text-slate-800">立志 ─ 清楚我要做什麼</h2>
                  </div>

                  <div className="bg-indigo-50/30 border border-indigo-100/50 rounded-xl p-4.5">
                    <p className="text-xs text-indigo-950 font-bold leading-relaxed italic">
                      哲學家尼采（Friedrich Wilhelm Nietzsche）曾說過：「一個人知道自己為什麼而活，就可以忍受任何一種生活。」
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    追尋生命的意義最重要的兩件事：立志和找到自己的終極信念（人生觀與座右銘）。「樹的方向，由風決定；人的方向，自己決定。」
                  </p>

                  <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">👩‍🏫</span>
                      <div>
                        <span className="text-[10px] text-indigo-600 font-black block uppercase">榜樣的故事</span>
                        <h4 className="text-xs font-extrabold text-slate-800">劉安婷 ─ Teach for Taiwan (為台灣而教)</h4>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      畢業於普林斯頓大學，創辦「為台灣而教」的劉安婷，分享過去追求成績卓越的自己，像是一隻餅乾怪獸不斷地追求世界上最大、最好的餅乾，然而內心得到滿足的時刻，卻是來自於真心陪伴需要關注的弱勢孩子。
                    </p>

                    <blockquote className="border-l-2 border-indigo-300 pl-3 italic text-xs text-indigo-900 bg-white p-3 rounded-r-xl font-bold leading-relaxed">
                      「May God break my heart so completely that the whole world falls in.（願神將我的心完全地破碎，好讓我的心擁有整個世界）。」
                    </blockquote>

                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      追求更多的餅乾讓她看不見眼前的世界；雖然靠近眾人的苦難讓人心碎，但在這破碎中，心恢復了知覺，感受到人類共享生命的堅韌、希望與愛的無比喜樂。
                    </p>
                  </div>

                  {/* Textbook Q1-Q2 Thought Form */}
                  <div className="space-y-4 border-t border-slate-100 pt-5">
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">💡 想一想：</h3>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                        <span className="bg-orange-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                        <span>劉安婷的人生目標從不斷地追求成功變成為弱勢孩子付出，她的人生目標為何有此改變？這個改變讓她獲得了什麼價值或幸福？</span>
                      </label>
                      <textarea
                        disabled={role === 'teacher' || isSubmitted}
                        value={answers.p60Q1 || ''}
                        onChange={(e) => updateAnswer('p60Q1', e.target.value)}
                        placeholder="請輸入你的回答..."
                        rows={2.5}
                        className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed bg-white"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                        <span className="bg-orange-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">2</span>
                        <span>對你而言，什麼事情就像是劉安婷眼中的「大餅乾」？什麼是真正能讓你內心富足、感到有意義的事情？</span>
                      </label>
                      <textarea
                        disabled={role === 'teacher' || isSubmitted}
                        value={answers.p60Q2 || ''}
                        onChange={(e) => updateAnswer('p60Q2', e.target.value)}
                        placeholder="請輸入你的回答..."
                        rows={2.5}
                        className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== PAGE 61 ==================== */}
              {currentPage === 61 && (
                <div id="page_61" className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">MIND 田捕手</span>
                    <h2 className="text-lg font-black text-slate-800">德國種樹男孩菲利斯</h2>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    菲利斯在小學九歲時，因為看了關於肯亞環境運動家旺加里·馬塔伊（綠帶運動發起人，諾貝爾和平獎得主）的故事深受啟發，立志要在全球各國種下一百萬棵樹，降低大氣溫室氣體，拯救地球生態。
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    而信念容易改變嗎？什麼情況下會被影響呢？藉由以下活動，讓我們來探索和確認自己目前最在乎的價值是什麼？是否會受人影響或始終如一呢？
                  </p>

                  <div className="space-y-4 border-t border-slate-100 pt-5">
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">💡 想一想：</h3>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                        <span className="bg-orange-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                        <span>德國種樹男孩菲利斯，他為地球發起了什麼運動？</span>
                      </label>
                      <textarea
                        disabled={role === 'teacher' || isSubmitted}
                        value={answers.p61Q1 || ''}
                        onChange={(e) => updateAnswer('p61Q1', e.target.value)}
                        placeholder="要在全球各國種下一百萬棵樹（後調增為一兆棵），降低大氣溫室氣體，拯救地球生態..."
                        rows={2.5}
                        className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                        <span className="bg-orange-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">2</span>
                        <span>他的終極信念又是什麼？</span>
                      </label>
                      <textarea
                        disabled={role === 'teacher' || isSubmitted}
                        value={answers.p61Q2 || ''}
                        onChange={(e) => updateAnswer('p61Q2', e.target.value)}
                        placeholder="「拯救地球，守護我們這代孩子的未來，刻不容緩。我們不能只等待成年人行動，必須主動出擊，推動地球往正確的方向前進。」"
                        rows={2.5}
                        className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                        <span className="bg-orange-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">3</span>
                        <span>現在的你可以為這個世界做些什麼呢？</span>
                      </label>
                      <textarea
                        disabled={role === 'teacher' || isSubmitted}
                        value={answers.p61Q3 || ''}
                        onChange={(e) => updateAnswer('p61Q3', e.target.value)}
                        placeholder="例如：我可以隨身自備環保杯餐具、減少一次性塑膠垃圾、在校園發起零剩食宣導，或者關心社區弱勢..."
                        rows={3}
                        className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== PAGE 62 ==================== */}
              {currentPage === 62 && (
                <div id="page_62" className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">第 1 章</span>
                    <h2 className="text-lg font-black text-slate-800">人生的終極信念</h2>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    你了解自己的信念嗎？在追求人生目標的過程中，會遇到種種困境，回應困境的態度，取決於我們內在的信念和觀點。
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-red-50/50 border border-red-100 p-4.5 rounded-xl space-y-1.5">
                      <span className="text-sm">👒</span>
                      <h4 className="text-xs font-black text-red-950">動漫思辨 ─ 《航海王》魯夫 vs. 騙人布</h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                        魯夫遇到困難時，總是笑笑地迎向挑戰；騙人布卻總是嚇得屁滾尿流。因為魯夫底下的信念是「我一定可以成為航海王，夥伴最珍貴」；騙人布早期則是「保護自己，逃避危險」。
                      </p>
                    </div>

                    <div className="bg-indigo-50/50 border border-indigo-100 p-4.5 rounded-xl space-y-1.5">
                      <span className="text-sm">🚕</span>
                      <h4 className="text-xs font-black text-indigo-950">溫馨案例 ─ 黑人計程車司機的故事</h4>
                      <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                        白人媽媽面對孩子提問「為什麼皮膚不一樣？」時，微笑回答：「上帝為了讓世界繽紛，創造了不同顏色的人。」黑人司機聽了，感動拒收車資。他說，他的母親從小教育他「我們註定低人一等」，如果他小時候聽到如此溫暖繽紛的回答，今天必然是另外一個更好的他。
                      </p>
                    </div>
                  </div>

                  {/* Textbook Q1-Q3 Form */}
                  <div className="space-y-4 border-t border-slate-100 pt-5">
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">💡 想一想：</h3>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                        <span className="bg-orange-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                        <span>小孩聽到白人媽媽跟黑人媽媽的回應會有什麼感受？</span>
                      </label>
                      <textarea
                        disabled={role === 'teacher' || isSubmitted}
                        value={answers.p62Q1 || ''}
                        onChange={(e) => updateAnswer('p62Q1', e.target.value)}
                        placeholder="聽到白人媽媽回應，孩子會感受到平等、美好與被造物的神奇豐富；而黑人司機小時候聽到黑人媽媽回應，會感到自卑、不公平與被世界拒絕的沉重感..."
                        rows={2.5}
                        className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                        <span className="bg-orange-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">2</span>
                        <span>這兩位媽媽的信念是什麼？</span>
                      </label>
                      <textarea
                        disabled={role === 'teacher' || isSubmitted}
                        value={answers.p62Q2 || ''}
                        onChange={(e) => updateAnswer('p62Q2', e.target.value)}
                        placeholder="白人媽媽的信念是「眾生平等、多元繽紛、和諧與愛」；黑人媽媽的信念則是「命運註定、階級難逾、悲觀自卑」..."
                        rows={2.5}
                        className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                        <span className="bg-orange-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">3</span>
                        <span>這樣的信念會影響小孩成為什麼樣的人？</span>
                      </label>
                      <textarea
                        disabled={role === 'teacher' || isSubmitted}
                        value={answers.p62Q3 || ''}
                        onChange={(e) => updateAnswer('p62Q3', e.target.value)}
                        placeholder="正向多元的信念會培養出寬容、自信與有大愛的孩子，創造和諧的生命網絡；自卑宿命的信念則可能限制孩子的發展與自我實現，讓他活在陰霾中..."
                        rows={3}
                        className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== PAGE 63 ==================== */}
              {currentPage === 63 && (
                <div id="page_63" className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">LIFE心動力</span>
                    <h2 className="text-lg font-black text-slate-800">我最重視的價值</h2>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    難得的連續假期之後就是科展比賽截止日，本來說好要利用假日討論，可華家人安排了家庭旅行、博鈞臨時被打工綁住、小文想去圖書館K書，每個人都面臨抉擇兩難。你最近有過親情、友情、友情、課業等價值的兩難抉擇嗎？
                  </p>

                  {/* Interactive Box Selector Part 1: Top 5 */}
                  <div className="bg-orange-50/20 border border-orange-100 p-5 rounded-2xl space-y-4">
                    <span className="text-[10px] bg-orange-500 text-white font-black px-2 py-0.5 rounded-full tracking-wider uppercase">
                      步驟 01 ── 挑選必不可少的 5 個價值
                    </span>
                    <h4 className="text-xs font-extrabold text-slate-800">
                      🎁 請在下方挑選目前最在乎、最重要的 5 個生命價值：
                    </h4>

                    <div className="flex flex-wrap gap-2">
                      {availableValues.map(val => {
                        const isSelected = (answers.p63Top5 || []).includes(val);
                        return (
                          <button
                            key={val}
                            disabled={role === 'teacher' || isSubmitted}
                            onClick={() => handleSelectValue(val)}
                            className={`px-3 py-2 rounded-xl text-xs font-bold transition-all border ${
                              isSelected
                                ? 'bg-orange-500 text-white border-transparent shadow-xs font-black'
                                : 'bg-white hover:bg-slate-50 border-slate-100 text-slate-600'
                            }`}
                          >
                            {val}
                          </button>
                        );
                      })}
                    </div>
                    <div className="text-[11px] text-slate-500 font-extrabold">
                      目前選中：<span className="text-orange-600">{(answers.p63Top5 || []).length}</span> / 5
                    </div>
                  </div>

                  {/* Interactive Part 2: Reduce to 3 */}
                  {(answers.p63Top5 || []).length >= 3 && (
                    <div className="bg-indigo-50/25 border border-indigo-100 p-5 rounded-2xl space-y-4 animate-fade-in">
                      <span className="text-[10px] bg-indigo-600 text-white font-black px-2 py-0.5 rounded-full tracking-wider uppercase">
                        步驟 02 ── 割愛、縮減至 3 個
                      </span>
                      <h4 className="text-xs font-extrabold text-slate-800">
                        🥺 如果必須割愛，請在剛剛挑出的中挑出僅能保留的 3 個最核心價值：
                      </h4>

                      <div className="flex flex-wrap gap-2">
                        {(answers.p63Top5 || []).map((val: string) => {
                          const isSelected3 = (answers.p63Top3 || []).includes(val);
                          return (
                            <button
                              key={val}
                              disabled={role === 'teacher' || isSubmitted}
                              onClick={() => handleSelectValue3(val)}
                              className={`px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all border ${
                                isSelected3
                                  ? 'bg-indigo-600 text-white border-transparent shadow-xs'
                                  : 'bg-white hover:bg-slate-50 border-indigo-100/30 text-slate-600'
                              }`}
                            >
                              {val}
                            </button>
                          );
                        })}
                      </div>
                      <div className="text-[11px] text-slate-500 font-extrabold">
                        目前選中：<span className="text-indigo-600">{(answers.p63Top3 || []).length}</span> / 3
                      </div>
                    </div>
                  )}

                  {/* Interactive Part 3: Priority Rank 1 */}
                  {(answers.p63Top3 || []).length >= 1 && (
                    <div className="bg-amber-50/20 border border-amber-100 p-5 rounded-2xl space-y-4 animate-fade-in">
                      <span className="text-[10px] bg-amber-600 text-white font-black px-2 py-0.5 rounded-full tracking-wider uppercase">
                        步驟 03 ── 點睛第一順位與原因
                      </span>
                      <h4 className="text-xs font-extrabold text-slate-800">
                        🏆 請挑選「排序第1」，也就是你目前最重視的核心價值，並說明為什麼：
                      </h4>

                      <div className="flex flex-wrap gap-2">
                        {(answers.p63Top3 || []).map((val: string) => {
                          const isRank1 = answers.p63Rank1 === val;
                          return (
                            <button
                              key={val}
                              disabled={role === 'teacher' || isSubmitted}
                              onClick={() => handleSelectRank1(val)}
                              className={`px-4 py-2 rounded-xl text-xs font-black transition-all border ${
                                isRank1
                                  ? 'bg-amber-500 text-white border-transparent shadow-xs scale-105'
                                  : 'bg-white hover:bg-slate-50 border-amber-100 text-slate-600'
                              }`}
                            >
                              🌟 {val}
                            </button>
                          );
                        })}
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] text-slate-600 font-extrabold block">
                          📝 為什麼「{answers.p63Rank1 || '___'}」對你目前如此重要？請在下方詳述理由：
                        </label>
                        <textarea
                          disabled={role === 'teacher' || isSubmitted}
                          value={answers.p63Explanation || ''}
                          onChange={(e) => updateAnswer('p63Explanation', e.target.value)}
                          placeholder="例如：家人對我最重要，因為在可華爺爺離世的故事中，我體悟到陪伴是有期限的，我希望能好好珍惜和家人在一起的每一個當下..."
                          rows={3.5}
                          className="w-full text-xs p-3 border border-slate-200 focus:border-amber-500 rounded-xl outline-none leading-relaxed"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ==================== PAGE 64 ==================== */}
              {currentPage === 64 && (
                <div id="page_64" className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">創造幸福快樂而圓滿的人生</span>
                    <h2 className="text-lg font-black text-slate-800">快樂、幸福與至善</h2>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    哲學家亞里斯多德認為人終極一生的目標是在「追求幸福的人生」。「快樂」和「幸福」有何異同呢？
                  </p>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100/60 text-xs text-slate-500 space-y-2 leading-relaxed font-medium">
                    <p className="text-slate-700 font-extrabold">✦ 快樂 (Pleasure) vs. 幸福 (Happiness)</p>
                    <p>
                      <strong>快樂</strong>往往短暫且不穩定，容易隨著物質、財富或生理感官的變化患得患失。
                    </p>
                    <p>
                      <strong>幸福</strong>則是追求理性的至善，是內在心智的穩定思考與對意義的認同。即便遭受苦難，也能秉持積極正向、追求靈性昇華的穩健心態。
                    </p>
                  </div>

                  {/* Interactive Quadrant Form */}
                  <div className="space-y-4 border-t border-slate-100 pt-5">
                    <div>
                      <span className="text-[10px] bg-orange-500 text-white font-black px-2.5 py-0.5 rounded-full tracking-wider uppercase block w-max mb-1">
                        LIFE心動力 ── 課堂實戰
                      </span>
                      <h4 className="text-xs font-black text-slate-800">📊 快樂與幸福事件的四象限歸類：</h4>
                      <p className="text-[10px] text-slate-400 font-medium">
                        請為下方的各個事件，點選選擇其在您心目中所處的象限：
                      </p>
                    </div>

                    <div className="space-y-3.5 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                      {Object.keys(quadrantMap).map((item) => {
                        const qValue = quadrantMap[item];
                        return (
                          <div key={item} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-3xs">
                            <span className="text-xs font-bold text-slate-800">{item}</span>
                            <div className="flex gap-1 shrink-0 font-sans">
                              {[
                                { key: 'Q1', label: 'Q1: 快樂且幸福', color: 'bg-emerald-500' },
                                { key: 'Q2', label: 'Q2: 快樂但不幸福', color: 'bg-amber-500' },
                                { key: 'Q3', label: 'Q3: 不快樂且不幸', color: 'bg-red-500' },
                                { key: 'Q4', label: 'Q4: 不快樂但幸福', color: 'bg-blue-500' }
                              ].map((btn) => {
                                const isSelected = qValue === btn.key;
                                return (
                                  <button
                                    key={btn.key}
                                    disabled={role === 'teacher' || isSubmitted}
                                    onClick={() => updateQuadrant(item, btn.key)}
                                    className={`px-2 py-1 text-[9px] font-black rounded-lg border transition-all ${
                                      isSelected
                                        ? btn.color + ' text-white border-transparent shadow-3xs'
                                        : 'bg-slate-50 border-slate-100 hover:border-slate-200 text-slate-500'
                                    }`}
                                  >
                                    {btn.key}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Reflexive Text Area */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-800 block leading-relaxed">
                        👉 課堂反思：分享在這些事件中，如果附加其他條件，會如何影響事件在象限中的移動？（例如：打球受傷但在比賽奪冠，由痛苦移向幸福）：
                      </label>
                      <textarea
                        disabled={role === 'teacher' || isSubmitted}
                        value={answers.p64Reflection || ''}
                        onChange={(e) => updateAnswer('p64Reflection', e.target.value)}
                        placeholder="例如：我發現，如果只是為了打球而打球，可能只是暫時的快樂；但如果能和隊友一起克服困難、拿到冠軍，那種成就感 and 凝聚力就會變成持久的幸福。所以附加『共同奮鬥』和『克服挑戰』的條件，會讓事件從單純的快樂象限，移動到深層的幸福至善象限..."
                        rows={3.5}
                        className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed font-semibold text-slate-700 bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== PAGE 65 ==================== */}
              {currentPage === 65 && (
                <div id="page_65" className="space-y-6 animate-fadeIn">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">第 1 章</span>
                    <h2 className="text-lg font-black text-slate-800 font-sans tracking-tight">至善至福 ─ 幸福人生進行曲</h2>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    要達到真正、持久的<strong>「至善至福（Eudaimonia）」</strong>，往往需要長期的耕耘、自律與忍耐。這正如運動員追求卓越、音樂家打磨技藝，背後都是無數汗水與枯燥重覆的累積。
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
                    <div className="lg:col-span-7 bg-orange-50/10 border border-orange-100 rounded-2xl p-5 space-y-4">
                      <div className="flex items-center gap-2 text-orange-800">
                        <span className="text-2xl">⚾</span>
                        <h4 className="text-xs font-black">王博鈞的「十萬投球」修練</h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        台灣少棒投捕好手王博鈞，曾分享自己如何為了在大賽中投出完美好球，每天在烈日下重複投球、接球。他說：「在達到『得心應手』的幸福境界之前，我必須先忍受投球十萬次的枯燥、肩膀肌肉的酸痛與無數次失敗。但當站在投手丘上，那一刻的專注與突破，讓我體會到無與倫比的至善與生命至福。」
                      </p>
                      <div className="text-[11px] bg-white p-3 rounded-xl border border-orange-100 font-bold text-slate-600 leading-relaxed">
                        ✨ <strong>哲思連結</strong>：這正是亞里斯多德所說的，幸福不是被動享樂，而是主動發揮理性與德行、不斷精進，終至圓滿的動態歷程。
                      </div>
                    </div>

                    <div className="lg:col-span-5 bg-slate-50 border border-slate-100 rounded-2xl p-5 flex flex-col justify-between">
                      <div className="space-y-2">
                        <span className="text-[10px] bg-orange-500 text-white font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                          我的十萬球計畫
                        </span>
                        <h4 className="text-xs font-extrabold text-slate-800">
                          你心目中的「十萬投球」是什麼？
                        </h4>
                        <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">
                          你願意為了追求什麼「終極目標或至善夢想」，忍受長期的枯燥、自律與挑戰？
                        </p>
                      </div>

                      <div className="space-y-3 mt-4 text-xs font-bold text-slate-700">
                        <div className="space-y-1">
                          <label className="text-[11px] block">🎯 我的至善目標/夢想：</label>
                          <input
                            type="text"
                            disabled={role === 'teacher' || isSubmitted}
                            value={answers.p65Goal || ''}
                            onChange={(e) => updateAnswer('p65Goal', e.target.value)}
                            placeholder="例如：考取心儀的大學科系、學會彈奏一首鋼琴協奏曲、成為程式設計師..."
                            className="w-full text-xs p-2.5 border border-slate-200 focus:border-orange-500 rounded-xl outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] block">⏳ 我必須付出的自律與耐力（我的十萬次投球）：</label>
                          <textarea
                            disabled={role === 'teacher' || isSubmitted}
                            value={answers.p65Effort || ''}
                            onChange={(e) => updateAnswer('p65Effort', e.target.value)}
                            placeholder="例如：每天堅持背誦50個單字並練習題目，拒絕手機社交媒體的誘惑..."
                            rows={2.5}
                            className="w-full text-xs p-2.5 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== PAGE 66 ==================== */}
              {currentPage === 66 && (
                <div id="page_66" className="space-y-6 animate-fadeIn">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">第 1 章</span>
                    <h2 className="text-lg font-black text-slate-800 font-sans tracking-tight">死生有命 ─ 終極目標與死亡</h2>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    在我們思考人生的「終極關懷」與生命意義時，一堵巨大、冷酷且無法迴避的牆壁始終豎立在終點 ── 那就是<strong>死亡（Death）</strong>。如何面對死亡，決定了我們如何看待活著的每一刻。
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4.5 space-y-2">
                      <span className="text-3xl">🫁</span>
                      <h4 className="text-xs font-black text-slate-800">1. 生理上的死亡</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                        個體的心跳、呼吸停止，腦幹功能完全喪失。這是人體作為生物有機體的生命終點，也是最直觀的物質死亡。
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4.5 space-y-2">
                      <span className="text-3xl">🧠</span>
                      <h4 className="text-xs font-black text-slate-800">2. 心理/社會上的死亡</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                        當人因失智、昏迷或極度孤立，喪失了與周遭社會、他人的互動與自我認知意識，精神層面的「我」在社會關係中漸漸淡去。
                      </p>
                    </div>

                    <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4.5 space-y-2">
                      <span className="text-3xl">🕊️</span>
                      <h4 className="text-xs font-black text-slate-800">3. 靈性上的死亡與超越</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                        面對生命盡頭時，心靈感到徹底絕望、喪失目標與依託；或相反地，透過對終極信仰的依靠，在死亡面前尋求靈性大安寧。
                      </p>
                    </div>
                  </div>

                  {/* Reflection Block on Death Limitation */}
                  <div className="bg-amber-50/15 border border-amber-100 rounded-2xl p-5 space-y-4">
                    <div className="flex items-center gap-2 text-amber-900">
                      <span className="text-2xl">⏳</span>
                      <h4 className="text-xs font-black">生命的邊界效應 ── 如果生命沒有盡頭？</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      哲學家提出：正是因為有了<strong>死亡這個有限的終點</strong>，我們在漫長歲月中的每一次牽手、每一次奮鬥、每一次和家人的團聚，才擁有了沉甸甸、不可替代的珍貴價值。如果生命是無限的，任何事都可以無限期推遲，我們反而將不再珍惜當下。
                    </p>

                    <div className="space-y-2.5 text-xs font-bold text-slate-700">
                      <label className="text-[11px] text-slate-800 font-extrabold flex items-start gap-1 leading-relaxed">
                        <span className="bg-orange-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                        <span>凝視生命的有限性：如果得知自己生命只剩下最後一年，你目前最想完成的三件事是什麼？為什麼？</span>
                      </label>
                      <textarea
                        disabled={role === 'teacher' || isSubmitted}
                        value={answers.p66LastYearList || ''}
                        onChange={(e) => updateAnswer('p66LastYearList', e.target.value)}
                        placeholder="第一，多花時間陪伴家人，向他們道愛；第二，去看看世界上的大山大海，不留遺憾；第三，寫下一本自己的生命日記，留給愛我的人..."
                        rows={3.5}
                        className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed bg-white text-slate-700 font-semibold"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== PAGE 67 ==================== */}
              {currentPage === 67 && (
                <div id="page_67" className="space-y-6 animate-fadeIn">
                  <div className="border-l-4 border-emerald-500 pl-4 py-1">
                    <span className="text-[11px] text-emerald-600 font-extrabold uppercase tracking-widest block">第 2 章</span>
                    <h2 className="text-lg font-black text-slate-800">死生大哉問 ─ 哲學家看死亡</h2>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    面對「死亡」這道無可避免的命題，古今中外的思想家、哲學家提出了極具深度的生存智慧，幫助我們在有限的時光中尋求力量。
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div id="philosophy_zhuangzi" className="bg-amber-50/10 border border-amber-100 rounded-2xl p-5 space-y-3">
                      <div className="flex items-center gap-2 text-amber-800">
                        <span className="text-2xl">🦋</span>
                        <h4 className="text-xs font-black">莊子「鼓盆而歌」的豁達</h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        莊子的妻子去世，好朋友惠施前來弔唁，卻看見莊子正敲著瓦盆唱歌。莊子解釋：人起初本沒有生命，後來無中生有、變化出形體，如今妻子離世，不過是從活著重回天地自然的懷抱，就像四季交替一樣自然。
                      </p>
                      <div className="text-[11px] bg-amber-50 text-amber-900 p-2.5 rounded-xl border border-amber-100/30 font-extrabold">
                        💡 啟示：「死生有命，富貴在天」。生命是造化的一場旅行，死非終點，而是回歸大自然。
                      </div>
                    </div>

                    <div id="philosophy_heidegger" className="bg-indigo-50/10 border border-indigo-100 rounded-2xl p-5 space-y-3">
                      <div className="flex items-center gap-2 text-indigo-800">
                        <span className="text-2xl">⏳</span>
                        <h4 className="text-xs font-black">海德格「向死而生」的真誠</h4>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        德國哲學家海德格提出「向死而生」（Being-towards-death）。他指出，大部分人都用「常人」的盲目態度活著，假裝死不會發生。唯有真誠地凝視死亡的必然性，我們才能擺脫世俗的盲從，活出屬於自己最本真、最具價值的「此時此刻」。
                      </p>
                      <div className="text-[11px] bg-indigo-50 text-indigo-900 p-2.5 rounded-xl border border-indigo-100/30 font-extrabold">
                        💡 啟示：正因為時間有限、死期無常，生命的每一秒抉擇才具有沉甸甸的意義。
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 border-t border-slate-100 pt-5">
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">💡 想一想 ＆ 說一說：</h3>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                        <span className="bg-emerald-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                        <span>莊子在妻子去世時先是哭泣，隨後卻「鼓盆而歌」，你覺得這是一種冷酷不近人情，還是一種看透生死、與自然和解的真豁達？為什麼？</span>
                      </label>
                      <textarea
                        disabled={role === 'teacher' || isSubmitted}
                        value={answers.p67Q1 || ''}
                        onChange={(e) => updateAnswer('p67Q1', e.target.value)}
                        placeholder="我覺得這是一種類豁達。因為他理解到傷心無濟於事，妻子只是回到了生命誕生前的狀態，這是每個人都無法逃脫的宇宙規律..."
                        rows={3.5}
                        className="w-full text-xs p-3 border border-slate-200 focus:border-emerald-500 rounded-xl outline-none leading-relaxed"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                        <span className="bg-emerald-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">2</span>
                        <span>結合海德格「向死而生」的觀點：如果人類的生命是無限的（永遠不會老死病死），我們還會珍惜眼前的每個當下嗎？「死亡」對我們活著的價值，有什麼不可替代的積極作用？</span>
                      </label>
                      <textarea
                        disabled={role === 'teacher' || isSubmitted}
                        value={answers.p67Q2 || ''}
                        onChange={(e) => updateAnswer('p67Q2', e.target.value)}
                        placeholder="如果生命是無限的，我們可能會把所有事情都無限期延後，不再珍惜與家人的團聚或自我進步。正因為生命會結束，我們才會在有限的時間裡，拼盡全力去熱愛和追求夢想..."
                        rows={3.5}
                        className="w-full text-xs p-3 border border-slate-200 focus:border-emerald-500 rounded-xl outline-none leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== PAGE 68 ==================== */}
              {currentPage === 68 && (
                <div id="page_68" className="space-y-6">
                  <div className="border-l-4 border-emerald-500 pl-4 py-1">
                    <span className="text-[11px] text-emerald-600 font-extrabold uppercase tracking-widest block">第 2 章</span>
                    <h2 className="text-lg font-black text-slate-800">悲傷五階段 ─ 面對悲傷的心理歷程</h2>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    當我們面臨至親逝世、嚴重疾病、重大挫敗或失落時，內心會經歷一系列複雜的悲傷與掙扎。精神病學家<strong>伊麗莎白·庫伯勒-羅絲（Elisabeth Kübler-Ross）</strong>提出了著名的「悲傷五階段模型（Five Stages of Grief）」，幫助我們理解並接納這些自然的情緒起伏。
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                    {[
                      { stage: "否認", eng: "Denial", color: "border-slate-200 bg-slate-50 text-slate-700", desc: "震驚、不相信、拒絕接受殘酷的現實" },
                      { stage: "憤怒", eng: "Anger", color: "border-red-200 bg-red-50 text-red-700", desc: "怨天尤人、怨恨、將痛苦宣洩於他人" },
                      { stage: "討價還價", eng: "Bargaining", color: "border-amber-200 bg-amber-50 text-amber-700", desc: "祈求神明、許下承諾試圖延緩或改變事實" },
                      { stage: "沮喪", eng: "Depression", color: "border-blue-200 bg-blue-50 text-blue-700", desc: "極度失落、無能為力感、意志消沉" },
                      { stage: "接受", eng: "Acceptance", color: "border-emerald-200 bg-emerald-50 text-emerald-700", desc: "平靜、承認事實並學會帶著傷痕生活" }
                    ].map((s, idx) => (
                      <div key={idx} className={`p-3 rounded-xl border text-center space-y-1 ${s.color}`}>
                        <span className="text-xs font-black block">{s.stage}</span>
                        <span className="text-[9px] font-mono block opacity-80">{s.eng}</span>
                        <p className="text-[10px] leading-snug text-slate-600">{s.desc}</p>
                      </div>
                    ))}
                  </div>

                  {/* Interactive Match-up Section */}
                  <div className="bg-slate-50 border border-slate-100 p-4.5 rounded-2xl space-y-4">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
                      <h4 className="text-xs font-black text-slate-800">🧩 悲傷情境大連線 ─ 辨識內在的悲傷細語</h4>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                      請閱讀下方5個面臨重症或失落時的「內心對白」，並為其選擇對應的「悲傷階段」：
                    </p>

                    <div className="space-y-3.5 text-xs font-bold text-slate-700">
                      {[
                        { 
                          id: 0, 
                          text: "「這不可能！醫生一定搞錯了，我身體一直很好，怎麼會得絕症？我要去別家大醫院重新檢查！」", 
                          correct: "否認" 
                        },
                        { 
                          id: 1, 
                          text: "「為什麼是我？我一生認真負責、樂於助人，天底下壞人這麼多，為什麼老天偏偏要懲罰我！這太不公平了！」", 
                          correct: "憤怒" 
                        },
                        { 
                          id: 2, 
                          text: "「只要能讓我多活幾年，看到孩子大學畢業，我願意吃素、捐出所有財產、做任何善事！求神明成全我！」", 
                          correct: "討價還價" 
                        },
                        { 
                          id: 3, 
                          text: "「反正都要死了，我做什麼抗癌努力都沒用了... 就讓我一個人安靜地躺著，不要來打擾我...」", 
                          correct: "沮喪" 
                        },
                        { 
                          id: 4, 
                          text: "「生命終究會走到盡頭。雖然很難過、很不捨，但我會配合醫療減少痛苦，珍惜最後的日子，和大家溫暖道別。」", 
                          correct: "接受" 
                        }
                      ].map((item) => {
                        const stageAnswers = answers.p68StageMatches || {};
                        const chosen = stageAnswers[item.id];
                        return (
                          <div key={item.id} className="p-3.5 bg-white rounded-xl border border-slate-100 space-y-2.5 shadow-3xs">
                            <p className="text-[11px] text-slate-600 font-semibold leading-relaxed italic">{item.text}</p>
                            
                            <div className="flex flex-wrap gap-1.5">
                              {["否認", "憤怒", "討價還價", "沮喪", "接受"].map((opt) => {
                                const isSelected = chosen === opt;
                                return (
                                  <button
                                    key={opt}
                                    type="button"
                                    disabled={role === 'teacher' || isSubmitted}
                                    onClick={() => {
                                      const newMatches = { ...stageAnswers, [item.id]: opt };
                                      updateAnswer('p68StageMatches', newMatches);
                                    }}
                                    className={`px-3 py-1 rounded-full text-[10px] font-extrabold transition-all ${
                                      isSelected
                                        ? opt === "否認" ? "bg-slate-500 text-white"
                                          : opt === "憤怒" ? "bg-rose-500 text-white"
                                          : opt === "討價還價" ? "bg-amber-500 text-white"
                                          : opt === "沮喪" ? "bg-blue-500 text-white"
                                          : "bg-emerald-500 text-white"
                                        : "bg-slate-50 hover:bg-slate-100 text-slate-500 border border-slate-200/50"
                                    }`}
                                  >
                                    {opt}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {(() => {
                      const matches = answers.p68StageMatches || {};
                      const isAllCorrect = matches[0] === "否認" && matches[1] === "憤怒" && matches[2] === "討價還價" && matches[3] === "沮喪" && matches[4] === "接受";
                      if (isAllCorrect) {
                        return (
                          <div className="p-3.5 bg-emerald-500/10 border border-emerald-200 rounded-xl text-[11px] font-black text-emerald-900 flex items-center gap-2 animate-fadeIn">
                            <span>🎉</span> 太棒了！你完美辨識了悲傷的五個歷程階段！認識這些階段能幫助我們用更多包容和理解，看守自己與摯愛家人的心。
                          </div>
                        );
                      }
                      return null;
                    })()}
                  </div>

                  <div className="space-y-2 border-t border-slate-100 pt-5">
                    <label className="text-xs font-black text-slate-800 block leading-relaxed">
                      👉 <strong>悲傷經歷與反思：</strong>
                      我們每個人都曾面臨「失落」（如寵物過世、競賽慘敗、好朋友轉學、或是親人離去等）。回想一次你的失落經驗，你當時經歷了上述哪些階段的情緒？你最後是如何與悲傷共處、走向接受的？
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p68Reflection || ''}
                      onChange={(e) => updateAnswer('p68Reflection', e.target.value)}
                      placeholder="例如：我國中時非常疼愛的貓咪過世了，一開始我整整兩天不吃不喝拒絕接受事實（否認），還憤怒怨恨為什麼醫生沒救活牠（憤怒）。後來我天天哭泣（沮喪），直到有一天我看到相簿裡牠幸福的模樣，我才慢慢體會到，好好生活、把牠記在心底才是對牠最好的方式（接受）..."
                      rows={4}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-emerald-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ==================== PAGE 69 ==================== */}
              {currentPage === 69 && (
                <div id="page_69" className="space-y-6">
                  <div className="border-l-4 border-emerald-500 pl-4 py-1">
                    <span className="text-[11px] text-emerald-600 font-extrabold uppercase tracking-widest block">第 2 章</span>
                    <h2 className="text-lg font-black text-slate-800">MIND 田捕手 ─ 四道人生的功課</h2>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    在悲傷輔導與臨終關懷中，為了讓病患、家屬雙方都能不留遺憾，溫暖道別，台灣安寧療護大師趙可式教授極力提倡人人都應實踐的<strong>「四道功課」</strong>。這也是我們圓滿人際關係、展現終極關懷的具體行動。
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                    <div id="p69_card_thank" className="bg-gradient-to-br from-pink-50/30 to-pink-100/10 border border-pink-100 p-4.5 rounded-2xl text-center space-y-1.5">
                      <span className="text-3xl block">🙏</span>
                      <h4 className="text-xs font-black text-pink-900">1. 道謝</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                        向對方表達感激，誠心說一聲：「謝謝你陪伴我，謝謝你曾為我付出的一切。」
                      </p>
                    </div>

                    <div id="p69_card_love" className="bg-gradient-to-br from-red-50/30 to-red-100/10 border border-red-100 p-4.5 rounded-2xl text-center space-y-1.5">
                      <span className="text-3xl block">❤️</span>
                      <h4 className="text-xs font-black text-red-900">2. 道愛</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                        勇敢表達愛意與在乎，不要害羞：「我很愛你，你是我生命中最重要的寶藏。」
                      </p>
                    </div>

                    <div id="p69_card_sorry" className="bg-gradient-to-br from-amber-50/30 to-amber-100/10 border border-amber-100 p-4.5 rounded-2xl text-center space-y-1.5">
                      <span className="text-3xl block">🩹</span>
                      <h4 className="text-xs font-black text-amber-900">3. 道歉</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                        為過去的摩擦、任性或誤會誠心道歉：「對不起，以前是我不懂事，請原諒我。」
                      </p>
                    </div>

                    <div id="p69_card_goodbye" className="bg-gradient-to-br from-blue-50/30 to-blue-100/10 border border-blue-100 p-4.5 rounded-2xl text-center space-y-1.5">
                      <span className="text-3xl block">🌸</span>
                      <h4 className="text-xs font-black text-blue-900">4. 道別</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                        好好的互相告別，給予彼此最深重的祝福：「再見了，請放心，我會好好生活下去。」
                      </p>
                    </div>
                  </div>

                  {/* Dynamic interactive task */}
                  <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-4">
                    <h4 className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-emerald-500 animate-pulse" />
                      🌟 四道體驗練習單（寫給一位你最珍愛的人，如：父母、摯友或未來的自己）
                    </h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black text-pink-700 block">🌸 【道謝】我要感謝對方的事：</label>
                        <textarea
                          disabled={role === 'teacher' || isSubmitted}
                          value={answers.p68Thank || ''}
                          onChange={(e) => updateAnswer('p68Thank', e.target.value)}
                          placeholder="謝謝你總是耐心地聽我抱怨，在我最失落時買甜點哄我..."
                          rows={2}
                          className="w-full text-xs p-2.5 border border-pink-100 rounded-xl outline-none leading-relaxed focus:border-pink-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black text-red-700 block">❤️ 【道愛】我想真誠說出的愛：</label>
                        <textarea
                          disabled={role === 'teacher' || isSubmitted}
                          value={answers.p68Love || ''}
                          onChange={(e) => updateAnswer('p68Love', e.target.value)}
                          placeholder="雖然平時很難說出口，但能在你身邊做你的朋友/孩子，是我一生的幸運..."
                          rows={2}
                          className="w-full text-xs p-2.5 border border-red-100 rounded-xl outline-none leading-relaxed focus:border-red-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black text-amber-700 block">🩹 【道歉】我想解開的疙瘩與對不起：</label>
                        <textarea
                          disabled={role === 'teacher' || isSubmitted}
                          value={answers.p68Sorry || ''}
                          onChange={(e) => updateAnswer('p68Sorry', e.target.value)}
                          placeholder="對不起，上次考差心情不好，對你發了無名火。請原諒我的幼稚..."
                          rows={2}
                          className="w-full text-xs p-2.5 border border-amber-100 rounded-xl outline-none leading-relaxed focus:border-amber-500"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] font-black text-blue-700 block">🌟 【道別】如果告別，我想給的祝福：</label>
                        <textarea
                          disabled={role === 'teacher' || isSubmitted}
                          value={answers.p68Goodbye || ''}
                          onChange={(e) => updateAnswer('p68Goodbye', e.target.value)}
                          placeholder="就算以後我們到不同的城市、上了不同的大學，你也要保持開朗，祝你活得無怨無悔..."
                          rows={2}
                          className="w-full text-xs p-2.5 border border-blue-100 rounded-xl outline-none leading-relaxed focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== PAGE 69 ==================== */}
              {currentPage === 70 && (
                <div id="page_69" className="space-y-6">
                  <div className="border-l-4 border-emerald-500 pl-4 py-1">
                    <span className="text-[11px] text-emerald-600 font-extrabold uppercase tracking-widest block">第 2 章</span>
                    <h2 className="text-lg font-black text-slate-800">安寧療護 ─ 善終與尊嚴的維護</h2>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    當生命面臨不可逆的絕症、重大創傷、或已進入末期瀕死階段時，我們該如何給予病患最高度的「終極關懷」？現代生命倫理學極力推崇<strong>安寧療護（Hospice Care）</strong>與<strong>緩和醫療</strong>，目的在保障生命的尊嚴與善終。
                  </p>

                  <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-4">
                    <h3 className="text-xs font-black text-slate-800 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      安寧療護的四大誤區與真實內涵
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-medium">
                      <div className="bg-white p-3.5 rounded-xl border border-red-50 flex items-start gap-2.5">
                        <span className="text-red-500 font-sans font-black text-lg">❌</span>
                        <div>
                          <h4 className="font-extrabold text-slate-800">誤區一：住進安寧病房等於「等死」、「被放棄」？</h4>
                          <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5 font-medium">
                            <strong>事實：</strong> 安寧療護非但不是放棄，而是從治癒性的醫療，轉向積極的「不適症狀緩解」（如全力控制癌末劇烈疼痛、呼吸困難等），提升臨終前的生活品質。
                          </p>
                        </div>
                      </div>

                      <div className="bg-white p-3.5 rounded-xl border border-red-50 flex items-start gap-2.5">
                        <span className="text-red-500 font-sans font-black text-lg">❌</span>
                        <div>
                          <h4 className="font-extrabold text-slate-800">誤區二：安寧療護會不會加速病人死亡？</h4>
                          <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5 font-medium">
                            <strong>事實：</strong> 安寧療護主張「不刻意加速死亡，也不以無效且痛苦的插管、電擊等人工手段勉強拖延瀕死過程」，讓生命自然、平靜、有尊嚴地圓滿謝幕。
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-50/20 border border-emerald-100 p-5 rounded-2xl space-y-3">
                    <h4 className="text-xs font-extrabold text-emerald-950 flex items-center gap-1">
                      <Award className="w-4 h-4 text-emerald-600" />
                      什麼是「善終（Good Death）」？
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      安寧緩和學界共認，一個圓滿、高質量的善終，包含三大要點：
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] font-bold text-slate-600 leading-relaxed">
                      <div className="bg-white p-3 rounded-xl border border-emerald-50">
                        <span className="text-emerald-500 font-mono">1</span> <strong>身體無痛苦</strong>：疼痛、喘憋等生理不適症狀得到完全控制。
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-emerald-50">
                        <span className="text-emerald-500 font-mono">2</span> <strong>心理無牽掛</strong>：完成心願，家庭和解，不留未竟之憾。
                      </div>
                      <div className="bg-white p-3 rounded-xl border border-emerald-50">
                        <span className="text-emerald-500 font-mono">3</span> <strong>心靈得平安</strong>：找到終極依託、信仰或靈性的圓滿超越。
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-slate-100 pt-5">
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                      👉 <strong>思維衝突與大抉擇：</strong>
                      <span>有人認為「不惜一切代價，用插鼻胃管、葉克膜、甚至是重複心臟電擊來維持心跳，才叫孝順、不放棄」；有人則認為「放手讓病患少受痛苦、安詳尊嚴地離去，才是不留遺憾的大愛」。針對這兩種思維，你目前的看法是什麼？</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p69Q1 || ''}
                      onChange={(e) => updateAnswer('p69Q1', e.target.value)}
                      placeholder="我認為放手讓病患平靜尊嚴地離去才是真正的大愛。當醫療已經無法挽回生命時，不惜代價的維持心跳，往往只是讓病人的身體承受更多折磨，滿足家屬自己的心理慰藉而已..."
                      rows={4}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-emerald-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ==================== PAGE 70 ==================== */}
              {currentPage === 71 && (
                <div id="page_70" className="space-y-6">
                  <div className="border-l-4 border-emerald-500 pl-4 py-1">
                    <span className="text-[11px] text-emerald-600 font-extrabold uppercase tracking-widest block">第 2 章</span>
                    <h2 className="text-lg font-black text-slate-800">病人自主與預立醫療決定</h2>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    為了落實病人自主權利，台灣於 2019 年正式實施<strong>《病人自主權利法》</strong>。這是亞洲第一部完整保障病人自主決定醫療意願的專法，提倡滿 18 歲的成年人可提早為自己做出<strong>「預立醫療決定（AD）」</strong>。
                  </p>

                  <div className="bg-emerald-50/20 border border-emerald-100 p-5 rounded-2xl space-y-4">
                    <div className="flex gap-2.5 items-center text-emerald-950">
                      <span className="text-2xl">📜</span>
                      <h4 className="text-xs font-extrabold">五大特定臨床情境 ＆ 我的抉擇</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      當人面臨：<strong>(1) 末期病人、(2) 處於不可逆轉之昏迷狀況、(3) 永久植物人、(4) 極重度失智、(5) 其他臨床痛苦難以忍受之疾病</strong>等情境時，可以預先表明對维持生命醫療與人工營養的接受或拒絕意願。
                    </p>

                    {/* Interactive Choice Table for AD */}
                    <div id="p70_decision_matrix" className="border border-slate-200 rounded-xl overflow-hidden bg-white text-xs">
                      <div className="grid grid-cols-12 bg-slate-100 p-3 font-extrabold text-slate-700 text-center gap-1 border-b border-slate-200">
                        <div className="col-span-6 text-left">臨床特定情境與決策</div>
                        <div className="col-span-2">接受</div>
                        <div className="col-span-2">拒絕</div>
                        <div className="col-span-2">委由代理人</div>
                      </div>

                      {/* Row 1 */}
                      <div className="grid grid-cols-12 p-3 font-bold text-slate-600 items-center gap-1 border-b border-slate-100">
                        <div className="col-span-6 text-[11px] leading-relaxed">
                          <span className="text-emerald-600">情境一：</span>面臨癌症末期或不可治癒之末期，是否接受插管、心臟電擊、葉克膜等「維持生命治療」？
                        </div>
                        <div className="col-span-2 flex justify-center">
                          <button
                            type="button"
                            disabled={role === 'teacher' || isSubmitted}
                            onClick={() => updateAnswer('p70AD1', 'accept')}
                            className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                              answers.p70AD1 === 'accept'
                                ? 'bg-emerald-500 border-emerald-500 text-white shadow-2xs'
                                : 'border-slate-300 hover:border-emerald-500 bg-slate-50'
                            }`}
                          >
                            {answers.p70AD1 === 'accept' && <Check className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                        <div className="col-span-2 flex justify-center">
                          <button
                            type="button"
                            disabled={role === 'teacher' || isSubmitted}
                            onClick={() => updateAnswer('p70AD1', 'reject')}
                            className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                              answers.p70AD1 === 'reject'
                                ? 'bg-rose-500 border-rose-500 text-white shadow-2xs'
                                : 'border-slate-300 hover:border-rose-500 bg-slate-50'
                            }`}
                          >
                            {answers.p70AD1 === 'reject' && <Check className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                        <div className="col-span-2 flex justify-center">
                          <button
                            type="button"
                            disabled={role === 'teacher' || isSubmitted}
                            onClick={() => updateAnswer('p70AD1', 'proxy')}
                            className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                              answers.p70AD1 === 'proxy'
                                ? 'bg-blue-500 border-blue-500 text-white shadow-2xs'
                                : 'border-slate-300 hover:border-blue-500 bg-slate-50'
                            }`}
                          >
                            {answers.p70AD1 === 'proxy' && <Check className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>

                      {/* Row 2 */}
                      <div className="grid grid-cols-12 p-3 font-bold text-slate-600 items-center gap-1">
                        <div className="col-span-6 text-[11px] leading-relaxed">
                          <span className="text-emerald-600">情境二：</span>不幸因重大創傷成為「永久植物人」或「極重度失智」，是否接受強灌「鼻胃管或人工流體營養餵食」？
                        </div>
                        <div className="col-span-2 flex justify-center">
                          <button
                            type="button"
                            disabled={role === 'teacher' || isSubmitted}
                            onClick={() => updateAnswer('p70AD2', 'accept')}
                            className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                              answers.p70AD2 === 'accept'
                                ? 'bg-emerald-500 border-emerald-500 text-white shadow-2xs'
                                : 'border-slate-300 hover:border-emerald-500 bg-slate-50'
                            }`}
                          >
                            {answers.p70AD2 === 'accept' && <Check className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                        <div className="col-span-2 flex justify-center">
                          <button
                            type="button"
                            disabled={role === 'teacher' || isSubmitted}
                            onClick={() => updateAnswer('p70AD2', 'reject')}
                            className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                              answers.p70AD2 === 'reject'
                                ? 'bg-rose-500 border-rose-500 text-white shadow-2xs'
                                : 'border-slate-300 hover:border-rose-500 bg-slate-50'
                            }`}
                          >
                            {answers.p70AD2 === 'reject' && <Check className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                        <div className="col-span-2 flex justify-center">
                          <button
                            type="button"
                            disabled={role === 'teacher' || isSubmitted}
                            onClick={() => updateAnswer('p70AD2', 'proxy')}
                            className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all ${
                              answers.p70AD2 === 'proxy'
                                ? 'bg-blue-500 border-blue-500 text-white shadow-2xs'
                                : 'border-slate-300 hover:border-blue-500 bg-slate-50'
                            }`}
                          >
                            {answers.p70AD2 === 'proxy' && <Check className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-slate-100 pt-5">
                    <label className="text-xs font-black text-slate-800 block leading-relaxed">
                      👉 <strong>分享你的醫療決定選擇及理由：</strong>
                      你在上表中對於「情境一維持生命治療」與「情境二人工流體營養」做出了何種決定？為什麼你會做出這樣的決定？請說明你的理念：
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p70Explanation || ''}
                      onChange={(e) => updateAnswer('p70Explanation', e.target.value)}
                      placeholder="針對癌末情境一，我勾選了『拒絕』維持生命治療。因為我不希望在最後關頭，身上插滿管子，在痛苦中勉強延長呼吸。我希望能平靜地和愛我的人道謝道愛後安詳離世..."
                      rows={4}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-emerald-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ==================== PAGE 71 ==================== */}
              {currentPage === 72 && (
                <div id="page_71" className="space-y-6">
                  <div className="border-l-4 border-emerald-500 pl-4 py-1">
                    <span className="text-[11px] text-emerald-600 font-extrabold uppercase tracking-widest block">第 2 章</span>
                    <h2 className="text-lg font-black text-slate-800">LIFE 心動力 ─ 寫一封「生前墓誌銘」</h2>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    墓誌銘（Epitaph）是刻在墓碑上簡短、凝聚一生核心精神的文字。哲學家康德的墓誌銘寫著：「星空與道德法則」；大文豪蕭伯納則留下幽默的名言：「我早就知道，如果我活得夠長，這種事總會發生的。」
                  </p>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                    {/* Left: Input fields */}
                    <div className="lg:col-span-7 space-y-4">
                      <div className="bg-slate-50 border border-slate-100 p-4.5 rounded-2xl space-y-3">
                        <h4 className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5">
                          <Compass className="w-4 h-4 text-emerald-500" />
                          重塑你的生死宣言
                        </h4>
                        <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                          請發揮創意、幽默或真誠，寫下你想為自己刻上的「生前墓誌銘」。這不僅是與死亡的對話，更是你渴望如何活過這一生的「最高核心價值」！
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-slate-800 block">🖋️ 我的專屬生前墓誌銘：</label>
                        <textarea
                          disabled={role === 'teacher' || isSubmitted}
                          value={answers.p71Epitaph || ''}
                          onChange={(e) => updateAnswer('p71Epitaph', e.target.value)}
                          placeholder="例如：這裡躺著一個無可救藥的樂天派，他雖然個子不高，但他笑得很大聲。他用微小的溫暖，點亮過周遭人的生命。現在，他累了，回歸繁星..."
                          rows={3.5}
                          className="w-full text-xs p-3 border border-slate-200 focus:border-emerald-500 rounded-xl outline-none leading-relaxed"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-xs font-black text-slate-800 block">🧭 這段文字反映了我什麼核心信念？</label>
                        <textarea
                          disabled={role === 'teacher' || isSubmitted}
                          value={answers.p71Reflection || ''}
                          onChange={(e) => updateAnswer('p71Reflection', e.target.value)}
                          placeholder="這反映了我最看重的生命關鍵字是『善良與樂觀』。我希望不管這輩子我能做多大的事，別人想起我時，都是帶著微笑和溫暖，這就是我的終極幸福..."
                          rows={2.5}
                          className="w-full text-xs p-3 border border-slate-200 focus:border-emerald-500 rounded-xl outline-none leading-relaxed"
                        />
                      </div>
                    </div>

                    {/* Right: Tombstone Preview Card */}
                    <div className="lg:col-span-5 flex items-center justify-center">
                      <div id="tombstone_visual" className="w-full max-w-xs bg-gradient-to-b from-slate-300 to-slate-500 rounded-t-[100px] border-4 border-slate-400 p-6 shadow-md relative min-h-[280px] flex flex-col justify-between text-center text-slate-900 border-b-8">
                        <div className="space-y-2 mt-4">
                          <span className="text-slate-200 font-sans text-[10px] tracking-widest font-black uppercase">MEMORIAL</span>
                          <div className="w-8 h-1 bg-slate-400 mx-auto rounded-full" />
                        </div>

                        <div className="space-y-3 py-4 flex-1 flex flex-col justify-center">
                          <p className="text-[11px] font-bold text-slate-800 leading-relaxed italic whitespace-pre-wrap px-2">
                            {answers.p71Epitaph ? `「 ${answers.p71Epitaph} 」` : '「 寫下你的墓誌銘，\n這裡將會即時顯現... 」'}
                          </p>
                          {answers.p71Reflection && (
                            <span className="text-[9px] bg-slate-800/20 text-slate-900 px-2 py-0.5 rounded-full font-black mx-auto">
                              核心價值：{answers.p71Reflection.slice(0, 10)}...
                            </span>
                          )}
                        </div>

                        <div className="text-[9px] font-black text-slate-800 border-t border-slate-400/40 pt-2 font-mono">
                          Rest In Peace & Glory
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== PAGE 72 ==================== */}
              {/* ==================== PAGE 73 ==================== */}
              {currentPage === 73 && (
                <div id="page_73" className="space-y-6">
                  <div className="border-l-4 border-emerald-500 pl-4 py-1">
                    <span className="text-[11px] text-emerald-600 font-extrabold uppercase tracking-widest block">第 2 章</span>
                    <h2 className="text-lg font-black text-slate-800">安寧緩和醫療條例 vs 病人自主權利法</h2>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    台灣分別於 2000 年與 2019 年實施《安寧緩和醫療條例》與《病人自主權利法》，兩者常被混淆，但適用對象、簽署文件與拒絕醫療的範圍都不相同。認識兩者差異，才能真正為自己與家人做好準備。
                  </p>

                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4.5 overflow-x-auto">
                    <table className="w-full text-[11px] border-collapse min-w-[420px]">
                      <thead>
                        <tr className="text-slate-500 font-extrabold">
                          <td className="py-2 px-2"></td>
                          <td className="py-2 px-2">安寧緩和醫療條例（2000）</td>
                          <td className="py-2 px-2">病人自主權利法（2019）</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-t border-slate-200">
                          <td className="py-2.5 px-2 font-black text-slate-800">簽署文件</td>
                          <td className="py-2.5 px-2 text-slate-600">DNR 意願書</td>
                          <td className="py-2.5 px-2 text-slate-600">AD 預立醫療決定</td>
                        </tr>
                        <tr className="border-t border-slate-200">
                          <td className="py-2.5 px-2 font-black text-slate-800">適用對象</td>
                          <td className="py-2.5 px-2 text-slate-600">僅限末期病人</td>
                          <td className="py-2.5 px-2 text-slate-600">末期病人、極重度失智等五款特定臨床條件</td>
                        </tr>
                        <tr className="border-t border-slate-200">
                          <td className="py-2.5 px-2 font-black text-slate-800">拒絕醫療範圍</td>
                          <td className="py-2.5 px-2 text-slate-600">心肺復甦術（CPR）、維生醫療</td>
                          <td className="py-2.5 px-2 text-slate-600">可進一步擴及人工營養與流體餵養</td>
                        </tr>
                        <tr className="border-t border-slate-200">
                          <td className="py-2.5 px-2 font-black text-slate-800">保障程序</td>
                          <td className="py-2.5 px-2 text-slate-600">兩位醫師診斷、家屬或本人簽署</td>
                          <td className="py-2.5 px-2 text-slate-600">須完成「預立醫療照護諮商（ACP）」，經醫療機構核章</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="space-y-2 border-t border-slate-100 pt-5">
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                      <span className="bg-emerald-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                      <span>如果是你，會想預立哪一種醫療決定？為什麼？</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p73Q1 || ''}
                      onChange={(e) => updateAnswer('p73Q1', e.target.value)}
                      placeholder="我會想簽署 AD，因為它涵蓋的臨床條件更廣，也讓我在意識清楚時能提前替未來的自己做好把關，減少家人在緊急時刻的兩難..."
                      rows={3.5}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-emerald-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ==================== PAGE 74 ==================== */}
              {currentPage === 74 && (
                <div id="page_74" className="space-y-6">
                  <div className="border-l-4 border-emerald-500 pl-4 py-1">
                    <span className="text-[11px] text-emerald-600 font-extrabold uppercase tracking-widest block">第 2 章</span>
                    <h2 className="text-lg font-black text-slate-800">LIFE 心動力 ─ 人生行囊</h2>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    如果生命是一趟終將抵達終點的旅程，你的行囊裡，最想帶著走的會是什麼？透過「打包人生行囊」的練習，重新盤點自己生命中最珍貴、最不可割捨的人事物。
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-50 border border-slate-100 p-4.5 rounded-2xl space-y-2">
                      <h4 className="text-xs font-black text-slate-800">PART 01・我想帶走的三件事物</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                        可以是一個人、一段回憶、一項成就，或是一種感受。寫下來，並想想為什麼非它不可。
                      </p>
                      <textarea
                        disabled={role === 'teacher' || isSubmitted}
                        value={answers.p74Part1 || ''}
                        onChange={(e) => updateAnswer('p74Part1', e.target.value)}
                        placeholder="1. 家人一起吃飯的日常時光　2. 第一次完成馬拉松的成就感　3. 和朋友一起大笑的回憶..."
                        rows={3}
                        className="w-full text-xs p-2.5 border border-slate-200 focus:border-emerald-500 rounded-xl outline-none leading-relaxed"
                      />
                    </div>

                    <div className="bg-slate-50 border border-slate-100 p-4.5 rounded-2xl space-y-2">
                      <h4 className="text-xs font-black text-slate-800">PART 02・我願意放下的一件事</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                        行囊有限，什麼樣的執念、遺憾或包袱，是你願意練習放下的？
                      </p>
                      <textarea
                        disabled={role === 'teacher' || isSubmitted}
                        value={answers.p74Part2 || ''}
                        onChange={(e) => updateAnswer('p74Part2', e.target.value)}
                        placeholder="我想放下對過去失敗的耿耿於懷，那些自責其實無法改變什麼，只會拖慢我繼續往前走的腳步..."
                        rows={3}
                        className="w-full text-xs p-2.5 border border-slate-200 focus:border-emerald-500 rounded-xl outline-none leading-relaxed"
                      />
                    </div>
                  </div>

                  <div className="space-y-3 border-t border-slate-100 pt-5">
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">💡 討論</h3>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                        <span className="bg-emerald-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                        <span>行囊只能裝下有限的東西，這個限制帶給你什麼樣的體悟？</span>
                      </label>
                      <textarea
                        disabled={role === 'teacher' || isSubmitted}
                        value={answers.p74Q1 || ''}
                        onChange={(e) => updateAnswer('p74Q1', e.target.value)}
                        placeholder="這讓我發現，原來我平常在意的很多東西其實沒那麼重要，真正值得帶走的都跟『關係』與『感受』有關，而不是物質..."
                        rows={2.5}
                        className="w-full text-xs p-3 border border-slate-200 focus:border-emerald-500 rounded-xl outline-none leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== PAGE 75 ==================== */}
              {currentPage === 75 && (
                <div id="page_75" className="space-y-6">
                  <div className="border-l-4 border-emerald-500 pl-4 py-1">
                    <span className="text-[11px] text-emerald-600 font-extrabold uppercase tracking-widest block">第 2 章</span>
                    <h2 className="text-lg font-black text-slate-800">名人墓誌銘</h2>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    墓誌銘是一個人留給世界最後、也最精煉的一句話。看看古今中外這些人物，如何用短短一句話，濃縮自己一生的信念與幽默：
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1">
                      <span className="text-[10px] font-black text-emerald-700">人權運動領導者・馬丁路德・金恩</span>
                      <p className="text-xs text-slate-600 italic leading-relaxed">「全能的上帝，我們終於自由了！」</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1">
                      <span className="text-[10px] font-black text-emerald-700">印刷工人・班傑明・富蘭克林</span>
                      <p className="text-xs text-slate-600 italic leading-relaxed">「印刷工人班傑明・富蘭克林，在此長眠。」</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1">
                      <span className="text-[10px] font-black text-emerald-700">德國數學家・魯道夫</span>
                      <p className="text-xs text-slate-600 italic leading-relaxed">「π = 3.14159265358979323846」</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1">
                      <span className="text-[10px] font-black text-emerald-700">英國詩人・濟慈</span>
                      <p className="text-xs text-slate-600 italic leading-relaxed">「這裡躺著一個人，他的名字是寫在水上的。」</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1">
                      <span className="text-[10px] font-black text-emerald-700">美國鋼鐵大王・安德魯・卡內基</span>
                      <p className="text-xs text-slate-600 italic leading-relaxed">「躺在這裡的這個人，一生用了能力更勝他的人，來一起成就大業。」</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1">
                      <span className="text-[10px] font-black text-emerald-700">屏風表演班創辦人・李國修</span>
                      <p className="text-xs text-slate-600 italic leading-relaxed">「在墓碑前，無需放上一束鮮花，你只需要放上一張你曾經觀賞過的屏風戲票。」</p>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50/20 border border-amber-100 rounded-xl">
                    <p className="text-xs text-amber-900 font-bold leading-relaxed">
                      💡 回到上一頁你寫下的「生前墓誌銘」，看完這些例子後，要不要再回去調整一下，讓它更貼近你真正想留下的樣子？
                    </p>
                  </div>
                </div>
              )}

              {/* ==================== PAGE 76 ==================== */}
              {currentPage === 76 && (
                <div id="page_76" className="space-y-6">
                  <div className="border-l-4 border-emerald-500 pl-4 py-1">
                    <span className="text-[11px] text-emerald-600 font-extrabold uppercase tracking-widest block">第 3 章 ── 智慧與愛讓生命更高</span>
                    <h2 className="text-lg font-black text-slate-800">一、東西方宗教的生死觀</h2>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    當生命陷入極度的病痛、痛苦，或不得不面對親人死亡的巨大悲傷時，純粹的理性思辨往往是不夠的。這時，人類藉由<strong>宗教（Religion）</strong>與<strong>靈性（Spirituality）</strong>的超越眼光，尋求安頓身心的「終極皈依」與「終極安慰」。
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div id="religion_buddhism" className="bg-orange-50/10 border border-orange-100 p-4.5 rounded-2xl space-y-2">
                      <span className="text-3xl">☸️</span>
                      <h4 className="text-xs font-black text-orange-900">佛教 ─ 因緣果報與輪迴涅槃</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                        視死亡為生命旅程中一個「分段生死」的轉換。人依循自身「因果業力」投胎轉世，而修行的終極目標在於突破生死輪迴，証得無生無滅的「涅槃」極樂。
                      </p>
                    </div>

                    <div id="religion_daoism" className="bg-emerald-50/10 border border-emerald-100 p-4.5 rounded-2xl space-y-2">
                      <span className="text-3xl">☯️</span>
                      <h4 className="text-xs font-black text-emerald-900">道教 ─ 順應自然與生死齊一</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                        承襲道家「生死齊一」的思想，主張死亡不過是回歸自然大道的一部分，如四季更替般自然，人應當順應天道、不刻意悲喜。
                      </p>
                    </div>

                    <div id="religion_western" className="bg-blue-50/10 border border-blue-100 p-4.5 rounded-2xl space-y-2">
                      <span className="text-3xl">✝️</span>
                      <h4 className="text-xs font-black text-blue-900">西方宗教 ─ 永生盼望與天家重聚</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                        認為生命是上帝的神聖創造，肉體的死亡並非消逝，而是「歇了世上的勞苦」，回到主的身邊，在天堂得享永生，並盼望與摯愛家人的榮耀重聚。
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-slate-100 pt-5">
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                      <span className="bg-emerald-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                      <span>這三種對死亡的詮釋，哪一種最貼近你目前對生命終點的想像？為什麼？</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p76Q1 || ''}
                      onChange={(e) => updateAnswer('p76Q1', e.target.value)}
                      placeholder="我覺得道教『生死齊一』的觀點最貼近我的想法，因為它讓我不用害怕死亡，而是把它當成生命自然的一部分去看待..."
                      rows={3}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-emerald-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ==================== PAGE 77 ==================== */}
              {currentPage === 77 && (
                <div id="page_77" className="space-y-6">
                  <div className="border-l-4 border-emerald-500 pl-4 py-1">
                    <span className="text-[11px] text-emerald-600 font-extrabold uppercase tracking-widest block">第 3 章</span>
                    <h2 className="text-lg font-black text-slate-800">LIFE 心動力 ─ 宗教／信仰與生活</h2>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    不論是否具有特定的宗教信仰，每個人多少都有安頓身心的方式。想一想，「信仰」或「相信的力量」在你的日常生活中扮演什麼角色？
                  </p>

                  <div className="space-y-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                        <span className="bg-emerald-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                        <span>你身邊有沒有人透過宗教或信仰，走過了人生的低潮？</span>
                      </label>
                      <textarea
                        disabled={role === 'teacher' || isSubmitted}
                        value={answers.p77Q1 || ''}
                        onChange={(e) => updateAnswer('p77Q1', e.target.value)}
                        placeholder="我奶奶在爺爺過世後，每天早上都會去廟裡拜拜、跟朋友一起誦經，她說這讓她心裡感覺爺爺並沒有真正離開..."
                        rows={2.5}
                        className="w-full text-xs p-3 border border-slate-200 focus:border-emerald-500 rounded-xl outline-none leading-relaxed"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                        <span className="bg-emerald-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">2</span>
                        <span>如果沒有特定宗教信仰，你會用什麼方式安頓自己的心靈？</span>
                      </label>
                      <textarea
                        disabled={role === 'teacher' || isSubmitted}
                        value={answers.p77Q2 || ''}
                        onChange={(e) => updateAnswer('p77Q2', e.target.value)}
                        placeholder="我沒有特定信仰，但每次心情不好時會去河堤跑步，或是跟好朋友聊聊，這對我來說就像是一種心靈的儀式..."
                        rows={2.5}
                        className="w-full text-xs p-3 border border-slate-200 focus:border-emerald-500 rounded-xl outline-none leading-relaxed"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                        <span className="bg-emerald-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">3</span>
                        <span>「相信」這件事本身，對一個人面對困境有什麼幫助？</span>
                      </label>
                      <textarea
                        disabled={role === 'teacher' || isSubmitted}
                        value={answers.p77Q3 || ''}
                        onChange={(e) => updateAnswer('p77Q3', e.target.value)}
                        placeholder="相信讓人有方向感，就算眼前看不到答案，也能因為心裡有個依靠，而願意再撐一下、再往前走一步..."
                        rows={2.5}
                        className="w-full text-xs p-3 border border-slate-200 focus:border-emerald-500 rounded-xl outline-none leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== PAGE 78 ==================== */}
              {currentPage === 78 && (
                <div id="page_78" className="space-y-6">
                  <div className="border-l-4 border-emerald-500 pl-4 py-1">
                    <span className="text-[11px] text-emerald-600 font-extrabold uppercase tracking-widest block">第 3 章</span>
                    <h2 className="text-lg font-black text-slate-800">二、信仰，活出不凡的生命價值 ─ 信仰的作用與價值</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
                    <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1">
                      <span className="text-lg">♾️</span>
                      <h4 className="font-black text-slate-800">超越死亡的限制</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">人生的短暫和無常，常給人荒謬與無意義的感覺。宗教則賦予存在與生命歷程某種超越意義，正是回應了這個生命的難題。</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1">
                      <span className="text-lg">🌧️</span>
                      <h4 className="font-black text-slate-800">面對苦難</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">宗教信仰常教人們要正面看待苦難，獲得心靈的力量，穿越苦難得到真正的快樂。</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1">
                      <span className="text-lg">🌱</span>
                      <h4 className="font-black text-slate-800">宗教強調因果法則，助人行善</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">因果，是揭示一個事物從萌芽，然後一點點壯大，到最後結果的一個過程。所謂「種瓜得瓜，種豆得豆」，要得到快樂的果，先要種善因。</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1">
                      <span className="text-lg">🕊️</span>
                      <h4 className="font-black text-slate-800">建立正確的生命價值觀</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">所有正信的宗教都是建構在道德倫理的基礎上，勸人為善，存好心、說好話、做好事，展現仁愛、慈悲與寬恕等美德。</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1">
                      <span className="text-lg">🧘</span>
                      <h4 className="font-black text-slate-800">尋求內心的平安與寧靜</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">透過宗教的儀式、活動或環境氛圍，讓人感受到被接納、被理解和被愛，從而獲得心靈的滋養。</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1">
                      <span className="text-lg">🙏</span>
                      <h4 className="font-black text-slate-800">宗教帶給人希望</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">相信可以帶來力量，藉由宗教的儀式，如祈求、禱告，得到祝福、保佑、加持，實現內心的願望。</p>
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-slate-100 pt-5">
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                      <span className="bg-emerald-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                      <span>這六種作用中，哪一個最能打動你？分享一個相關的生活經驗。</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p78Q1 || ''}
                      onChange={(e) => updateAnswer('p78Q1', e.target.value)}
                      placeholder="『尋求內心的平安與寧靜』最打動我。考試壓力大的時候，我會去教會安靜坐一下，那種被理解、被接住的感覺讓我可以重新振作..."
                      rows={3}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-emerald-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ==================== PAGE 79 ==================== */}
              {currentPage === 79 && (
                <div id="page_79" className="space-y-6">
                  <div className="border-l-4 border-emerald-500 pl-4 py-1">
                    <span className="text-[11px] text-emerald-600 font-extrabold uppercase tracking-widest block">第 3 章</span>
                    <h2 className="text-lg font-black text-slate-800">LIFE 心動力 ─ 信仰，活出不凡的生命價值</h2>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 p-4.5 rounded-2xl space-y-2">
                    <div className="flex items-center gap-2 text-slate-800">
                      <span className="text-2xl">💪</span>
                      <h4 className="text-xs font-black">力克・胡哲（Nick Vujicic）</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      天生沒有四肢的力克・胡哲，曾因為外貌與生活的巨大不便而想過結束生命。但透過信仰的力量，他學會接納自己「不完整」的身體，將人生的限制轉化為激勵全世界的力量，成為知名的演說家，並在世界各地分享他「活出不凡生命價值」的故事。
                    </p>
                  </div>

                  <div className="p-4 bg-amber-50/20 border border-amber-100 rounded-xl">
                    <p className="text-xs text-amber-900 font-bold leading-relaxed">
                      「人生不是要活得完美，而是要活得有意義。即使沒有雙手雙腳，我依然可以擁抱這個世界。」── 力克・胡哲
                    </p>
                  </div>

                  <div className="space-y-2 border-t border-slate-100 pt-5">
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                      <span className="bg-emerald-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                      <span>力克・胡哲的故事中，是什麼樣的信念支撐他活出不凡的生命價值？你自己生命中，有沒有類似「把限制活成力量」的經驗？</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p79Q1 || ''}
                      onChange={(e) => updateAnswer('p79Q1', e.target.value)}
                      placeholder="我覺得是他選擇相信自己『生命本身就有價值』，而不是用身體條件來定義自己。我曾經因為口吃很自卑，後來練習把它當成我說話特別的節奏，反而更能表達真實的自己..."
                      rows={3.5}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-emerald-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ==================== PAGE 80 ==================== */}
              {currentPage === 80 && (
                <div id="page_80" className="space-y-6">
                  <div className="border-l-4 border-emerald-500 pl-4 py-1">
                    <span className="text-[11px] text-emerald-600 font-extrabold uppercase tracking-widest block">第 3 章</span>
                    <h2 className="text-lg font-black text-slate-800">MIND 田捕手 ─ 芥子葉的故事</h2>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-3">
                    <div className="flex gap-2.5 items-center text-slate-800">
                      <span className="text-2xl">🌾</span>
                      <h4 className="text-xs font-extrabold">不曾失去至親的家中芥子葉</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      一位痛失愛子的母親，抱著孩子的遺體四處尋求協助，直到遇見一位智者。智者告訴她：「去找一顆芥子種子來，但這顆種子必須來自一戶『不曾失去過至親』的人家。」母親於是挨家挨戶去尋找，卻發現每一戶人家，都曾經歷過死別的傷痛。走遍了整個村莊，她漸漸明白：失去，是每個生命都無法迴避的功課。
                    </p>
                  </div>

                  <div className="p-4 bg-emerald-50/20 border border-emerald-100 rounded-xl">
                    <p className="text-xs text-emerald-900 font-bold leading-relaxed">
                      當她意識到自己的悲傷並不孤單，那份沉重才慢慢有了被理解、被承接的空間，也讓她重新有了走下去的力量。
                    </p>
                  </div>

                  <div className="space-y-4 border-t border-slate-100 pt-5">
                    <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">三、培養正確的信仰態度</h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      信仰能帶來力量，但也需要建立在理性思辨之上：不盲從、不迷信、尊重不同信仰的差異，並將信仰化為具體行善的力量，而不只是儀式與祈求。
                    </p>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                        <span className="bg-emerald-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                        <span>「找到不曾失去過至親的人家」這個看似不可能的任務，其實想教會這位母親什麼道理？</span>
                      </label>
                      <textarea
                        disabled={role === 'teacher' || isSubmitted}
                        value={answers.p80Q1 || ''}
                        onChange={(e) => updateAnswer('p80Q1', e.target.value)}
                        placeholder="這個任務想讓她親身體會到，失去至親並不是只有她一個人在承受，每個家庭都曾走過相似的傷痛，她的悲傷因此有了被理解的空間..."
                        rows={2.5}
                        className="w-full text-xs p-3 border border-slate-200 focus:border-emerald-500 rounded-xl outline-none leading-relaxed"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== PAGE 81 ==================== */}
              {currentPage === 81 && (
                <div id="page_81" className="space-y-6">
                  <div className="border-l-4 border-emerald-500 pl-4 py-1">
                    <span className="text-[11px] text-emerald-600 font-extrabold uppercase tracking-widest block">第 3 章</span>
                    <h2 className="text-lg font-black text-slate-800">LIFE 心動力 ─ 智慧小語的啟發</h2>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    古今中外的信仰與哲學家，都曾留下觸動人心的智慧話語。挑一位你最有共鳴的智者，寫下他的話帶給你的啟發：
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {["德蕾莎修女", "達賴喇嘛", "證嚴法師", "孔子", "蘇格拉底", "星雲大師", "耶穌", "日常老和尚"].map((name) => {
                      const isSelected = answers.p81Person === name;
                      return (
                        <button
                          key={name}
                          type="button"
                          disabled={role === 'teacher' || isSubmitted}
                          onClick={() => updateAnswer('p81Person', name)}
                          className={`px-3 py-1.5 rounded-full text-[11px] font-extrabold transition-all ${
                            isSelected
                              ? 'bg-emerald-500 text-white'
                              : 'bg-slate-50 hover:bg-slate-100 text-slate-500 border border-slate-200/50'
                          }`}
                        >
                          {name}
                        </button>
                      );
                    })}
                  </div>

                  <div className="space-y-2 border-t border-slate-100 pt-5">
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                      <span className="bg-emerald-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                      <span>寫下這位智者曾說過、或你聽過與他有關的一句話，以及它帶給你的啟發：</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p81Quote || ''}
                      onChange={(e) => updateAnswer('p81Quote', e.target.value)}
                      placeholder="證嚴法師說：『多說一句好話，多做一件好事。』這句話讓我體會到，行善不需要驚天動地，從日常生活的小地方開始，就能累積出改變的力量..."
                      rows={3.5}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-emerald-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ==================== PAGE 82 ==================== */}
              {/* ==================== PAGE 82 (單元終結大回顧) ==================== */}
              {currentPage === 82 && (
                <div id="page_82" className="space-y-6">
                  <div className="border-l-4 border-emerald-500 pl-4 py-1">
                    <span className="text-[11px] text-emerald-600 font-extrabold uppercase tracking-widest block">單元總結</span>
                    <h2 className="text-lg font-black text-slate-800">單元03 終結大回顧與自我檢測表</h2>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    恭喜你即將讀完「單元三 終極關懷」的最後一頁！請誠實完成下方的自我學習評估核取表。點亮所有檢測燈號後，系統將為您頒發「終極羅盤學成認證」！
                  </p>

                  <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-3.5">
                    <h3 className="text-xs font-black text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
                      <ListTodo className="w-4.5 h-4.5 text-emerald-600" />
                      五大核心自我檢測指標（請逐一檢視並勾選完成）：
                    </h3>

                    <div id="self_evaluation_checklist" className="space-y-3 text-xs font-bold text-slate-700">
                      {[
                        { key: 'p75Check1', text: '1. 我已經了解「快樂與幸福」的區別，並願意有意識地追求深層的心靈至善幸福。' },
                        { key: 'p75Check2', text: '2. 我已經在生命兩難情境中進行了「價值釐清與排序」，清楚自己不可割捨的核心價值。' },
                        { key: 'p75Check3', text: '3. 我對「死亡」與「生命的極限」有了健康的思辨，並建立了向死而生、珍惜當下的正向態度。' },
                        { key: 'p75Check4', text: '4. 我理解「安寧療護」不等於放棄，以及台灣《病人自主權利法》對於守護尊嚴善終的重大意義。' },
                        { key: 'p75Check5', text: '5. 我能夠主動對家人、摯友進行「四道人生」（道謝、道愛、道歉、道別）的溝通實踐，減少心靈遺憾。' }
                      ].map((item) => {
                        const isChecked = !!answers[item.key];
                        return (
                          <div
                            key={item.key}
                            onClick={() => {
                              if (role === 'teacher' || isSubmitted) return;
                              updateAnswer(item.key, !isChecked);
                            }}
                            className={`p-3 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                              isChecked
                                ? 'bg-emerald-500/10 border-emerald-200 text-emerald-950'
                                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                            }`}
                          >
                            <span className="leading-relaxed text-[11px] font-semibold">{item.text}</span>
                            <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center transition-all ${
                              isChecked
                                ? 'bg-emerald-500 border-emerald-500 text-white'
                                : 'border-slate-300'
                            }`}>
                              {isChecked && <Check className="w-3.5 h-3.5" />}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Celebration State for completing the unit */}
                  {(() => {
                    const allChecked = answers.p75Check1 && answers.p75Check2 && answers.p75Check3 && answers.p75Check4 && answers.p75Check5;
                    if (allChecked) {
                      return (
                        <div id="p75_celebration" className="bg-gradient-to-r from-emerald-500/15 via-teal-500/10 to-transparent border border-emerald-300/60 p-5 rounded-2xl flex flex-col sm:flex-row items-center gap-4 animate-fadeIn">
                          <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center text-3xl shadow-sm border border-emerald-200 animate-bounce shrink-0">
                            🎓
                          </div>
                          <div className="space-y-1 text-center sm:text-left">
                            <h4 className="text-sm font-black text-emerald-950 flex items-center gap-1.5 justify-center sm:justify-start">
                              🏆 【終極羅盤 · 心靈大師勳章已解鎖】
                              <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
                            </h4>
                            <p className="text-xs text-emerald-800 leading-relaxed font-semibold">
                              恭喜您！您已完全解鎖並點亮了單元三的所有核心生命指標！
                            </p>
                            <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                              不論是哲學探索或死生大愛，您都踏出了極具勇氣與智慧的一步。請記得點選「暫存課本進度」或送出您的「互動學習單」，將這份無價的生命智慧妥善留存！
                            </p>
                          </div>
                        </div>
                      );
                    }
                    return (
                      <div className="bg-slate-100 border border-slate-200/60 p-4.5 rounded-xl text-center text-[11px] text-slate-500 font-bold leading-relaxed">
                        💡 提示：點選上方全部五個自我檢測指標，即可完全解鎖本單元的專屬成學認證！
                      </div>
                    );
                  })()}
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Pagination Controls */}
        <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-6 gap-4">
          <button
            onClick={handlePrev}
            disabled={pages.indexOf(currentPage) === 0}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-600 disabled:hover:bg-slate-100 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shrink-0 whitespace-nowrap"
          >
            <ArrowLeft className="w-4 h-4" /> 上一頁
          </button>
          
          <div className="hidden sm:flex items-center gap-1.5 flex-wrap max-w-md justify-center">
            {pages.map((p) => {
              const isCurrent = p === currentPage;
              const hasRead = readPagesList.includes(p);
              return (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-7 h-7 rounded-lg text-xs font-mono font-black transition-all flex items-center justify-center ${
                    isCurrent
                      ? 'bg-orange-500 text-white shadow-3xs scale-105'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-500 border border-slate-100'
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>

          <div className="sm:hidden text-xs font-black text-slate-500 font-sans whitespace-nowrap shrink-0">
            頁碼：{currentPage} / {pages[pages.length - 1]}
          </div>

          <button
            onClick={handleNext}
            className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 whitespace-nowrap"
          >
            {pages.indexOf(currentPage) === pages.length - 1 ? '完成單元 ➔' : '下一頁'} <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
}
