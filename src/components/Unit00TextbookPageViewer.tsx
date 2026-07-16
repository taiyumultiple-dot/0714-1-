/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import charKehuaImg from '../assets/images/characters/char_kehua.jpg';
import charXiaowenImg from '../assets/images/characters/char_xiaowen.jpg';
import charDadImg from '../assets/images/characters/char_dad.jpg';
import storyHeroPairImg from '../assets/images/characters/story_hero_pair.png';
import { 
  Sparkles, 
  Tv, 
  CheckCircle, 
  Compass, 
  Map, 
  Bookmark, 
  HelpCircle, 
  ArrowLeft, 
  ArrowRight,
  Smile,
  BookOpen,
  Award,
  Heart,
  User,
  Activity,
  ThumbsUp,
  Menu,
  Check,
  Info,
  ListTodo,
  Key,
  Music,
  Play,
  Coins,
  MapPin,
  Flame,
  CheckSquare
} from 'lucide-react';
import { UNIT00_TEXTBOOK_PAGES, TextbookPage } from '../textbookData';

interface Unit00TextbookPageViewerProps {
  answers: Record<string, any>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  role: 'student' | 'teacher';
  isSubmitted: boolean;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

export const CHAPTERS_NAV = UNIT00_TEXTBOOK_PAGES.map(p => ({
  page: p.page,
  title: p.title,
  tag: p.tag,
  emoji: p.emoji,
  desc: p.desc
}));

const P05_CONDITIONS = [
  { id: "1", text: "理性思考" },
  { id: "2", text: "認識自己" },
  { id: "3", text: "有道德感" },
  { id: "4", text: "幫助他人" },
  { id: "5", text: "能尊重他人" },
  { id: "6", text: "能保持客觀與彈性" },
  { id: "7", text: "知道自己存在的價值與意義" },
  { id: "8", text: "能與別人建立良好和諧的互動關係" },
  { id: "9", text: "有人生目標與方向" },
  { id: "10", text: "不損害他人" },
  { id: "11", text: "重視生命成長" },
  { id: "12", text: "有正確的信仰" },
  { id: "13", text: "追求生命的意義" },
  { id: "14", text: "擁有深度的智慧" },
  { id: "15", text: "不怕挫折、失敗" },
  { id: "16", text: "堅持朝目標前進" },
  { id: "17", text: "能做出正確的判斷" },
  { id: "18", text: "能感受與體驗生命" },
  { id: "19", text: "能修正自己的缺點" },
  { id: "20", text: "其他" }
];

interface ThreePanelBentoLayoutProps {
  leftTitle: React.ReactNode;
  leftIcon?: React.ReactNode;
  leftContent: React.ReactNode;
  middleTitle: React.ReactNode;
  middleIcon?: React.ReactNode;
  middleContent: React.ReactNode;
  rightTitle?: React.ReactNode;
  rightIcon?: React.ReactNode;
  rightContent?: React.ReactNode;
}

export function ThreePanelBentoLayout({
  leftTitle,
  leftIcon = "📖",
  leftContent,
  middleTitle,
  middleIcon = "✍️",
  middleContent,
  rightTitle,
  rightIcon,
  rightContent
}: ThreePanelBentoLayoutProps) {
  const hasRightContent = !!rightContent;
  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch w-full">
      {/* Left Panel: Scenario / Context */}
      <div className={`${hasRightContent ? 'xl:col-span-4' : 'xl:col-span-5'} flex flex-col border border-purple-200/60 bg-[#FBF9F6] rounded-3xl shadow-sm overflow-hidden h-full`}>
        <div className="flex items-center gap-2 border-b border-[#EAD2B3]/30 bg-[#F5EFE6]/50 px-4 py-3 shrink-0">
          <span className="text-base bg-purple-100 p-1 rounded-xl text-purple-700 font-extrabold flex items-center justify-center shrink-0 w-8 h-8">{leftIcon}</span>
          <span className="text-xs sm:text-sm font-black text-purple-950 tracking-wide">
            {leftTitle}
          </span>
        </div>
        <div className="p-5 flex-1 overflow-y-visible flex flex-col gap-4 text-xs sm:text-sm text-[#5C4033] leading-relaxed">
          {leftContent}
        </div>
      </div>

      {/* Middle Panel: Interactive Form */}
      <div className={`${hasRightContent ? 'xl:col-span-5' : 'xl:col-span-7'} flex flex-col border border-amber-200/60 bg-white rounded-3xl shadow-sm overflow-hidden h-full`}>
        <div className="flex items-center gap-2 border-b border-[#EAD2B3]/30 bg-amber-50/30 px-4 py-3 shrink-0">
          <span className="text-base bg-amber-100 p-1 rounded-xl text-amber-700 font-extrabold flex items-center justify-center shrink-0 w-8 h-8">{middleIcon}</span>
          <span className="text-xs sm:text-sm font-black text-[#4A321F] tracking-wide">
            {middleTitle}
          </span>
        </div>
        <div className="p-5 flex-1 overflow-y-visible flex flex-col gap-5">
          {middleContent}
        </div>
      </div>

      {/* Right Panel: Hints / Quotes (optional) */}
      {hasRightContent && (
        <div className="xl:col-span-3 flex flex-col border border-orange-200/50 bg-[#FFFBF7] rounded-3xl shadow-sm overflow-hidden h-full">
          <div className="flex items-center gap-2 border-b border-orange-100/50 bg-orange-50/40 px-4 py-3 shrink-0">
            <span className="text-base bg-orange-100 p-1 rounded-xl text-orange-600 font-extrabold flex items-center justify-center shrink-0 w-8 h-8">{rightIcon || "💡"}</span>
            <span className="text-xs sm:text-sm font-black text-orange-950 tracking-wide">
              {rightTitle}
            </span>
          </div>
          <div className="p-5 flex-1 overflow-y-visible flex flex-col gap-4 text-xs text-[#735A45] leading-relaxed relative">
            {rightContent}
            <div className="mt-auto pt-4 flex justify-end">
              <div className="flex items-center gap-1.5 opacity-80 scale-90">
                <span className="text-[10px] font-black text-orange-800 bg-orange-100/80 px-2.5 py-0.5 rounded-full">
                  思考中...
                </span>
                <span className="text-lg animate-bounce">🤔</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Unit00TextbookPageViewer({
  answers,
  setAnswers,
  role,
  isSubmitted,
  currentPage: controlledPage,
  onPageChange
}: Unit00TextbookPageViewerProps) {
  const [localPage, setLocalPage] = useState<number>(4);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [showCoinsAnim, setShowCoinsAnim] = useState<boolean>(false);
  const [activeKeyDetail, setActiveKeyDetail] = useState<string | null>("key1");
  const [activeStageLetter, setActiveStageLetter] = useState<string>("S");

  const currentPage = controlledPage !== undefined ? controlledPage : localPage;

  const setCurrentPage = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    } else {
      setLocalPage(page);
    }
    
    // Auto-update read pages tracker
    if (role === 'student' && !isSubmitted) {
      const readPages = answers.textbookReadPages || [4];
      if (!readPages.includes(page)) {
        updateAnswer('textbookReadPages', [...readPages, page]);
      }
    }
  };

  const pages = UNIT00_TEXTBOOK_PAGES.map(p => p.page);

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

  const readPagesList = answers.textbookReadPages || [4];
  const readPagesCount = readPagesList.filter(p => pages.includes(p)).length || 1;
  const readPagesTotal = pages.length;

  const activePageData = UNIT00_TEXTBOOK_PAGES.find(p => p.page === currentPage) || UNIT00_TEXTBOOK_PAGES[0];

  // Custom high-fidelity page contents renderer
  const renderCustomPageContent = (page: number) => {
    const isDisabled = role === 'teacher' || isSubmitted;

    switch (page) {
      case 4: // Page 004
        return (
          <ThreePanelBentoLayout
            leftTitle="📖 情晨的對話 · 凝視生命地圖"
            leftIcon={<Compass className="w-4 h-4 text-purple-600" />}
            leftContent={
              <div className="relative bg-[#FCFAF7] border border-[#F0E6D2] rounded-2xl overflow-hidden shadow-3xs flex flex-col h-full select-none">
                {/* Page Number & Top Bar */}
                <div className="absolute top-2.5 left-3.5 text-[10px] font-black text-[#8C7A6B]/60 font-mono tracking-widest z-10">
                  004
                </div>

                {/* Top Section with Coral Header and Illustration Collage / Textbook Image */}
                <div className="relative grid grid-cols-1 md:grid-cols-12 gap-3 min-h-[260px] pb-4 border-b border-dashed border-[#EAD2B3]/60">
                  
                  {/* Left Column: Coral Header */}
                  <div className="md:col-span-5 relative bg-[#E27468] rounded-br-[4rem] rounded-tl-xl p-4.5 pt-7 flex flex-col justify-between shadow-xs text-white overflow-hidden shrink-0">
                    {/* Background Subtle Wave Details */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-transparent pointer-events-none" />
                    
                    <div className="relative z-10 space-y-2">
                      {/* Dots and line */}
                      <div className="flex items-center gap-1 opacity-80 text-[7px] tracking-widest text-[#FFEBE8] font-bold">
                        <span>♦</span><span>♦</span><span>♦</span>
                        <div className="h-[1px] bg-white/30 flex-1 ml-1" />
                      </div>

                      {/* Pill Badge */}
                      <span className="inline-block px-2.5 py-0.5 bg-white/20 border border-white/30 rounded-full text-[9px] font-black tracking-widest uppercase text-[#FFEBE8]">
                        # 總說
                      </span>
                    </div>

                    <div className="relative z-10 pt-6">
                      <h3 className="font-serif text-lg sm:text-xl font-extrabold tracking-widest text-white leading-snug drop-shadow-xs">
                        凝視<br />
                        生命的地圖
                      </h3>
                    </div>
                  </div>

                  {/* Right Column: Beautiful Collage or Custom Uploaded Textbook Image */}
                  <div className="md:col-span-7 relative flex items-center justify-center min-h-[180px] md:min-h-auto px-2 overflow-hidden bg-amber-50/10">
                    {answers.p04_custom_textbook_image ? (
                      <div className="w-full h-full p-2 relative flex flex-col items-center justify-center">
                        <img 
                          src={answers.p04_custom_textbook_image} 
                          alt="課本圖片" 
                          className="max-h-[200px] w-auto object-contain rounded-xl shadow-xs border border-amber-100"
                          referrerPolicy="no-referrer"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            updateAnswer('p04_custom_textbook_image', null);
                          }}
                          className="absolute bottom-2 right-2 bg-red-500 hover:bg-red-600 text-white text-[9px] font-extrabold px-2.5 py-1 rounded-full shadow-xs transition-all cursor-pointer animate-fade-in"
                          title="還原預設插圖"
                        >
                          還原預設
                        </button>
                      </div>
                    ) : (
                      <>
                        {/* 1. Students walking under the sun (floating dream/memory cloud bubble) */}
                        <div className="absolute top-2 right-2 w-[140px] h-[95px] rounded-[50%] overflow-hidden border-2 border-white shadow-md rotate-[-4deg] bg-amber-50/50 z-20">
                          <img 
                            src={storyHeroPairImg} 
                            alt="學生回憶" 
                            className="w-full h-full object-cover scale-110"
                            referrerPolicy="no-referrer"
                          />
                          {/* Overlay light aura */}
                          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/10 mix-blend-overlay" />
                        </div>

                        {/* 2. Studying student scene (bottom-left overlay) */}
                        <div className="absolute bottom-2 left-2 w-[95px] h-[95px] rounded-2xl overflow-hidden border-2 border-white shadow-sm rotate-[3deg] z-10">
                          <img 
                            src={charKehuaImg} 
                            alt="可華讀書" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* 3. Father walking away in suit (bottom-right overlap) */}
                        <div className="absolute bottom-1.5 right-6 w-[80px] h-[110px] rounded-[1.5rem] overflow-hidden border-2 border-white shadow-sm rotate-[-2deg] z-10">
                          <img 
                            src={charDadImg} 
                            alt="疲憊的父親" 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Dream Connector Small Circles (representing thinking/dream bubble) */}
                        <div className="absolute bottom-14 left-24 w-3 h-3 bg-white border border-slate-100 rounded-full shadow-3xs opacity-80 animate-pulse z-20" />
                        <div className="absolute bottom-20 left-[6.5rem] w-2 h-2 bg-white border border-slate-100 rounded-full shadow-3xs opacity-60 z-20" />
                        <div className="absolute bottom-24 left-[7.5rem] w-1.5 h-1.5 bg-white border border-slate-100 rounded-full shadow-3xs opacity-40 z-20" />
                      </>
                    )}

                    {/* Interactive File Input Badge for custom textbook image uploading */}
                    <label className="absolute top-2 left-2 bg-black/60 hover:bg-black/80 text-white text-[9px] font-black px-2.5 py-1 rounded-full shadow-xs cursor-pointer transition-all z-30 flex items-center gap-1 select-none">
                      <span>📷</span>
                      <span>{answers.p04_custom_textbook_image ? '更換課本圖檔' : '上傳課本圖片'}</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (event) => {
                              if (reader.readyState === FileReader.DONE && event.target?.result) {
                                updateAnswer('p04_custom_textbook_image', event.target.result);
                              }
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                  </div>

                </div>

                {/* Bottom Section: Pre-reading / Row Text */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* 行前閱讀 Heading Tab */}
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-4 bg-[#E27468] rounded-full" />
                      <span className="text-[10px] font-black text-white bg-[#E27468] px-2.5 py-0.5 rounded tracking-widest uppercase">
                        行前閱讀
                      </span>
                    </div>

                    {/* Exact complete textbook paragraphs matching image 2 - WITH IMPROVED TYPOGRAPHY AND SPACING */}
                    <div className="text-[13px] sm:text-[14px] text-[#4A3C31] leading-relaxed sm:leading-loose font-medium space-y-4 pl-0.5 select-text">
                      <p>
                        <span className="underline decoration-[#E27468] decoration-2 underline-offset-3 font-extrabold text-[#2F2117]">可華</span>一早起床，爸爸就載他上學，途中爸爸關心問到：「昨晚有沒有為準備考試而熬夜嗎？」
                      </p>
                      <p>
                        <span className="underline decoration-[#E27468] decoration-2 underline-offset-3 font-extrabold text-[#2F2117]">可華</span>打著哈欠回應：「讀書真的很累人，班上同學都是學霸，時間總是不夠用，書感覺永遠讀不完，為什麼要過這樣的生活？」
                      </p>
                      <p>
                        爸爸試著用自己經歷的人生道理說服<span className="underline decoration-[#E27468] decoration-2 underline-offset-3 font-extrabold text-[#2F2117]">可華</span>：「學生只需要認真讀書，是很幸福的！等你長大出社會工作，就知道什麼叫壓力。」
                      </p>
                      <p className="pl-4 border-l-2 border-[#E27468]/40 italic text-[#5C4538] font-bold py-1 my-2 bg-amber-50/30 rounded-r-lg">
                        「好好用功讀書，考上大學，未來才會有好的工作，才會有幸福的人生啊！」
                      </p>
                      <p>
                        對於<span className="underline decoration-[#E27468] decoration-2 underline-offset-3 font-extrabold text-[#2F2117]">爸爸</span>說的幸福人生，<span className="underline decoration-[#E27468] decoration-2 underline-offset-3 font-extrabold text-[#2F2117]">可華</span>回想起爸爸經常拖著疲憊的身體，熬夜加班工作，壓力大到假日只能像爛泥般癱在沙發上。這樣的生活真的是幸福人生嗎？可華<span className="underline decoration-[#E27468] decoration-2 underline-offset-3 font-extrabold text-[#2F2117]">陷入沈思⋯⋯</span>
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-3.5 border-t border-[#EAD2B3]/30 flex justify-between items-center text-[10px] text-[#8C7A6B]/80 font-black">
                    <span className="flex items-center gap-1">
                      📖 泰宇生命教育 ── 導讀課文
                    </span>
                    <span>P.4</span>
                  </div>
                </div>

              </div>
            }
            middleTitle="01 你的看法是？"
            middleIcon={<Sparkles className="w-4 h-4 text-amber-600" />}
            middleContent={
              <div className="space-y-5">
                <div className="bg-teal-50/60 border border-teal-100/60 p-4 rounded-2xl shadow-3xs">
                  <span className="text-[10.5px] font-black text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-md uppercase tracking-wider">思考問題</span>
                  <p className="text-[13px] sm:text-[13.5px] font-bold text-teal-950 leading-relaxed mt-2">
                    你是否也曾像可華一樣，對「好好讀書 ➔ 考上大學 ➔ 找好工作 ➔ 幸福人生」這條世俗規劃的公式產生過懷疑？如果是你，你會怎麼回答可華的問題？
                  </p>
                </div>
                <div className="space-y-2">
                  <textarea
                    disabled={isDisabled}
                    rows={6}
                    value={answers.p04_story_reflection || ''}
                    onChange={(e) => updateAnswer('p04_story_reflection', e.target.value)}
                    placeholder="在此寫下你的真實看法..."
                    className="w-full text-xs sm:text-sm p-4 rounded-2xl border border-gray-200 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-200 bg-white font-semibold shadow-2xs text-gray-700 leading-relaxed resize-none"
                  />
                  <div className="flex justify-between items-center text-[10.5px] text-amber-700/60 font-bold px-1">
                    <span>✍️ 答案將即時記錄於學習報告</span>
                    <span>{answers.p04_story_reflection?.length || 0} 字</span>
                  </div>
                </div>

                {/* 💡 思考提示: Placed horizontal at the bottom of Thinking Question */}
                <div className="bg-orange-50/30 border border-orange-100/50 rounded-2xl p-4.5 mt-2 space-y-3 shadow-3xs animate-fade-in">
                  <div className="flex items-center gap-1.5 border-b border-orange-100/30 pb-2 mb-2.5">
                    <span className="text-base bg-orange-100 p-1 rounded-xl text-orange-600 font-extrabold flex items-center justify-center shrink-0 w-6 h-6">💡</span>
                    <span className="text-xs sm:text-sm font-black text-orange-950 tracking-wide">思考提示</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="bg-white/70 p-3 rounded-xl border border-orange-100/20 shadow-4xs">
                      <span className="text-[9px] font-black text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded uppercase block w-fit">Tip 01</span>
                      <p className="text-[11.5px] font-bold text-[#735A45] mt-1.5 leading-normal">「好工作」真的是幸福人生的「唯一」充要條件嗎？</p>
                    </div>
                    <div className="bg-white/70 p-3 rounded-xl border border-orange-100/20 shadow-4xs">
                      <span className="text-[9px] font-black text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded uppercase block w-fit">Tip 02</span>
                      <p className="text-[11.5px] font-bold text-[#735A45] mt-1.5 leading-normal">當社會的期待與內心渴望衝突時，該如何自處？</p>
                    </div>
                    <div className="bg-white/70 p-3 rounded-xl border border-orange-100/20 shadow-4xs">
                      <span className="text-[9px] font-black text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded uppercase block w-fit">Tip 03</span>
                      <p className="text-[11.5px] font-bold text-[#735A45] mt-1.5 leading-normal">如果沒有自我的核心價值，成功後是否依然空虛？</p>
                    </div>
                  </div>
                </div>
              </div>
            }
          />
        );


      case 5: // Page 005
        return (
          <ThreePanelBentoLayout
            leftTitle="📖 探索地圖 · 幸福地標"
            leftIcon={<Map className="w-4 h-4 text-purple-600" />}
            leftContent={
              <div className="space-y-4">
                <p className="text-xs font-semibold text-gray-600 leading-relaxed">
                  生命教育 MAP 提供我們深度探索、反省生命本質所需的邏輯與工具。
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {[
                    { step: "01", name: "品嚐思考樂趣" },
                    { step: "02", name: "漫步奇幻旅程" },
                    { step: "03", name: "體驗神奇羅盤" },
                    { step: "04", name: "掌握智慧方向" }
                  ].map((s, i) => (
                    <div key={i} className="bg-white border border-amber-100 p-2 rounded-xl shadow-3xs flex flex-col items-center text-center relative">
                      <span className="text-sm">📍</span>
                      <h5 className="text-[9.5px] font-black text-slate-800 leading-tight mt-1">{s.name}</h5>
                      <span className="text-[7.5px] px-1 py-0.2 bg-orange-50 text-orange-700 font-extrabold rounded mt-1">STEP {s.step}</span>
                    </div>
                  ))}
                </div>
              </div>
            }
            middleTitle="01 你的看法是？"
            middleIcon={<Sparkles className="w-4 h-4 text-amber-600" />}
            middleContent={
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-800 block">
                    1. 關於幸福人生，你覺得需要具備哪些重要條件？（可多選）：
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
                    {P05_CONDITIONS.map((cond) => {
                      const list = answers.p05_conditions || [];
                      const isChecked = list.includes(cond.id);
                      return (
                        <button
                          key={cond.id}
                          disabled={isDisabled}
                          onClick={() => {
                            const newList = isChecked 
                              ? list.filter((item: string) => item !== cond.id) 
                              : [...list, cond.id];
                            updateAnswer('p05_conditions', newList);
                          }}
                          className={`text-left p-2 rounded-xl border text-[10.5px] font-bold transition-all flex items-center gap-1.5 cursor-pointer truncate ${
                            isChecked 
                              ? 'bg-amber-500 text-white border-amber-600 shadow-3xs' 
                              : 'bg-slate-50 text-slate-700 border-slate-100 hover:border-amber-200 hover:bg-amber-50/10'
                          }`}
                        >
                          <div className={`w-3 h-3 rounded border flex items-center justify-center shrink-0 ${isChecked ? 'bg-white text-amber-600 border-white' : 'bg-white border-gray-300'}`}>
                            {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                          </div>
                          <span className="truncate">{cond.id}. {cond.text}</span>
                        </button>
                      );
                    })}
                  </div>
                  {(answers.p05_conditions || []).includes("20") && (
                    <div className="pt-1.5 animate-fade-in">
                      <input
                        type="text"
                        disabled={isDisabled}
                        value={answers.p05_other || ''}
                        onChange={(e) => updateAnswer('p05_other', e.target.value)}
                        placeholder="請輸入其他幸福條件..."
                        className="w-full text-xs p-2 rounded-lg border border-gray-200 outline-none focus:border-amber-500 font-semibold shadow-3xs bg-slate-50/30"
                      />
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-100 pt-3 space-y-3">
                  <label className="text-xs font-black text-slate-800 block">
                    2. 如果只能留下 3 個幸福地標，你的抉擇是：
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[1, 2, 3].map((slotNum) => {
                      const selVal = answers[`p05_slot${slotNum}_id`] || '';
                      const reasonVal = answers[`p05_slot${slotNum}_reason`] || '';
                      return (
                        <div key={slotNum} className="border border-orange-100 bg-orange-50/5 rounded-xl p-2.5 space-y-2">
                          <span className="text-[9.5px] font-black text-orange-800 block border-b border-orange-100/50 pb-0.5">
                            📌 地標 0{slotNum}
                          </span>
                          <select
                            disabled={isDisabled}
                            value={selVal}
                            onChange={(e) => updateAnswer(`p05_slot${slotNum}_id`, e.target.value)}
                            className="w-full text-[10.5px] p-1.5 rounded-lg border border-gray-200 font-bold bg-white"
                          >
                            <option value="">選擇條件...</option>
                            {P05_CONDITIONS.map(c => (
                              <option key={c.id} value={c.id}>{c.id}. {c.text}</option>
                            ))}
                          </select>
                          <textarea
                            disabled={isDisabled}
                            rows={2}
                            value={reasonVal}
                            onChange={(e) => updateAnswer(`p05_slot${slotNum}_reason`, e.target.value)}
                            placeholder="留下理由..."
                            className="w-full text-[10px] p-1.5 rounded-lg border border-gray-200 font-semibold bg-white resize-none"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            }
            rightTitle="💡 思考提示"
            rightIcon={<HelpCircle className="w-4 h-4 text-orange-600" />}
            rightContent={
              <div className="space-y-3">
                <div className="border-b border-orange-100/40 pb-2">
                  <p className="text-xs text-[#735A45] font-semibold leading-relaxed">
                    財富、健康、自由哪一個更能讓你長久感到幸福？
                  </p>
                </div>
                <div className="border-b border-orange-100/40 pb-2">
                  <p className="text-xs text-[#735A45] font-semibold leading-relaxed">
                    當條件發生衝突時，你更傾向於保全哪一個？
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#735A45] font-semibold leading-relaxed">
                    幸福的定義是否會隨著年齡而有所改變？
                  </p>
                </div>
              </div>
            }
          />
        );

      case 6: // Page 006
        return (
          <ThreePanelBentoLayout
            leftTitle="📖 行動質疑 · 幸福公式"
            leftIcon={<BookOpen className="w-4 h-4 text-purple-600" />}
            leftContent={
              <div className="space-y-4">
                <p className="text-xs font-semibold text-gray-600 leading-relaxed">
                  可華的爸爸認為：學生只需要認真讀書，是很幸福的！
                </p>
                <div className="bg-[#FAF3E8] border border-amber-200/50 p-3.5 rounded-2xl text-center space-y-2">
                  <span className="text-[9px] text-amber-800 font-black tracking-widest block uppercase">傳統方程式</span>
                  <div className="text-xs font-black text-slate-800 space-y-1">
                    <p>📚 用功讀書 ➔ 🎓 好大學</p>
                    <p>➔ 💼 好工作 ＝ ✨ 幸福？</p>
                  </div>
                </div>
              </div>
            }
            middleTitle="01 你的看法是？"
            middleIcon={<Sparkles className="w-4 h-4 text-amber-600" />}
            middleContent={
              <div className="space-y-4">
                <div className="bg-indigo-50/40 border border-indigo-100 p-3 text-xs font-semibold text-gray-700 leading-relaxed rounded-xl">
                  你對爸爸說的這套「讀書 ➔ 工作 ➔ 幸福人生」公式有何看法？說說你的懷疑與思考。
                </div>
                <textarea
                  disabled={isDisabled}
                  rows={6}
                  value={answers.p06_q1_thought || ''}
                  onChange={(e) => updateAnswer('p06_q1_thought', e.target.value)}
                  placeholder="在此輸入你的想法..."
                  className="w-full text-xs p-3.5 rounded-2xl border border-gray-200 outline-none focus:border-indigo-500 bg-white shadow-3xs text-gray-700 leading-relaxed resize-none"
                />
              </div>
            }
            rightTitle="💡 智慧名言"
            rightIcon={<Activity className="w-4 h-4 text-orange-600" />}
            rightContent={
              <div className="space-y-3 bg-orange-50/50 border border-orange-100/60 p-3 rounded-2xl">
                <span className="text-[10px] text-amber-800 font-black block">梭羅（Henry Thoreau）說：</span>
                <p className="text-xs text-amber-950 font-black leading-relaxed italic">
                  「人生最大的悲劇莫過於，你花了一輩子的時間釣魚，最後才發現自己不想要那條魚。」
                </p>
              </div>
            }
          />
        );

      case 7: // Page 007
        return (
          <div className="space-y-6">
            <div className="bg-emerald-500 text-white px-4 py-3 rounded-xl border border-emerald-600 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-amber-300 animate-pulse" />
                <span className="text-xs font-black uppercase tracking-wider">LIFE 心動力 ── 課堂微電影對照</span>
              </div>
              <span className="text-[10px] bg-emerald-700 px-2 py-0.5 rounded-full font-bold">一分鐘蒼蠅</span>
            </div>

            <div className="border border-slate-200/70 bg-slate-50/50 rounded-xl p-4 flex flex-col md:flex-row gap-4 items-center">
              <div className="w-full md:w-[120px] h-[80px] bg-slate-800 rounded-lg flex items-center justify-center relative shrink-0 overflow-hidden border border-slate-700 shadow-3xs">
                <span className="text-3xl">🪰</span>
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <span className="text-[9px] text-white font-bold bg-black/60 px-2 py-0.5 rounded-full">One Minute Fly</span>
                </div>
              </div>
              <div className="flex-1 text-xs text-gray-600 leading-relaxed font-semibold">
                網網路流傳一則震撼心靈的小動畫 —— 德國導演 Michael Reichert 製作的《One Minute Fly》(一分鐘蒼蠅)。描述一隻倒數計時僅有一分鐘壽命的蒼蠅，無意中拿到了前輩蒼蠅臨死前落下的「我死前要做的事情（Things to do before I die）」清單。他毫不猶豫、拼盡全力與死神賽跑，在短短一分鐘內完成清單上的所有夢想直到生命終點。
              </div>
            </div>

            {/* Worksheet想一想 */}
            <div className="bg-amber-50/15 border border-amber-200/50 rounded-2xl p-5 space-y-5">
              <span className="text-xs font-black text-amber-950 flex items-center gap-1 bg-amber-100/50 px-3 py-1.5 rounded-xl border border-amber-200/40">
                <Smile className="w-4 h-4 text-orange-600" />
                💡 課本對照想一想問題集
              </span>

              {/* Q1 */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-800 block">
                  Q1. 請先用三個形容詞描述這隻蒼蠅在這一分鐘，活出了什麼樣的「生命面貌」？（完成後可以和同學分享！）
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    disabled={isDisabled}
                    value={answers.p07_q1_adj1 || ''}
                    onChange={(e) => updateAnswer('p07_q1_adj1', e.target.value)}
                    placeholder="形容詞一"
                    className="w-full text-xs p-2.5 rounded-xl border border-gray-200 outline-none focus:border-amber-500 font-bold bg-white text-center"
                  />
                  <input
                    type="text"
                    disabled={isDisabled}
                    value={answers.p07_q1_adj2 || ''}
                    onChange={(e) => updateAnswer('p07_q1_adj2', e.target.value)}
                    placeholder="形容詞二"
                    className="w-full text-xs p-2.5 rounded-xl border border-gray-200 outline-none focus:border-amber-500 font-bold bg-white text-center"
                  />
                  <input
                    type="text"
                    disabled={isDisabled}
                    value={answers.p07_q1_adj3 || ''}
                    onChange={(e) => updateAnswer('p07_q1_adj3', e.target.value)}
                    placeholder="形容詞三"
                    className="w-full text-xs p-2.5 rounded-xl border border-gray-200 outline-none focus:border-amber-500 font-bold bg-white text-center"
                  />
                </div>
                <div className="pt-1.5 flex items-center gap-2">
                  <span className="text-[10px] text-gray-400 font-bold shrink-0">同學簽名認證：</span>
                  <input
                    type="text"
                    disabled={isDisabled}
                    value={answers.p07_q1_signature || ''}
                    onChange={(e) => updateAnswer('p07_q1_signature', e.target.value)}
                    placeholder="請同學簽名或輸入名字"
                    className="flex-1 text-xs px-2.5 py-1.5 rounded-lg border border-gray-200 outline-none bg-white font-semibold"
                  />
                </div>
              </div>

              {/* Q2 */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-800 block">
                  Q2. 蒼蠅在最後一分鐘做了許多事，你覺得哪些是「重要的」？哪些是「必要的」？
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <span className="text-[10px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded-md font-bold block w-max">💡 重要 (如：完成賞鯨夢想)</span>
                    <input
                      type="text"
                      disabled={isDisabled}
                      value={answers.p07_q2_important || ''}
                      onChange={(e) => updateAnswer('p07_q2_important', e.target.value)}
                      placeholder="你認為重要的事情是..."
                      className="w-full text-xs p-2.5 rounded-xl border border-gray-200 outline-none bg-white font-semibold"
                    />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] text-rose-800 bg-rose-50 px-2 py-0.5 rounded-md font-bold block w-max">🚨 必要 (如：躲過鳥類的獵殺)</span>
                    <input
                      type="text"
                      disabled={isDisabled}
                      value={answers.p07_q2_necessary || ''}
                      onChange={(e) => updateAnswer('p07_q2_necessary', e.target.value)}
                      placeholder="你認為必要的事情是..."
                      className="w-full text-xs p-2.5 rounded-xl border border-gray-200 outline-none bg-white font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* Q3 */}
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-800 block">
                  Q3. 驅動蒼蠅如此拼命、進行這一連串瘋狂事情的背後「動力」是什麼？
                </label>
                <input
                  type="text"
                  disabled={isDisabled}
                  value={answers.p07_q3_drive || ''}
                  onChange={(e) => updateAnswer('p07_q3_drive', e.target.value)}
                  placeholder="例如：對死亡的倒數、對願望清單的執著..."
                  className="w-full text-xs p-2.5 rounded-xl border border-gray-200 outline-none bg-white font-semibold"
                />
              </div>

              {/* Q4 */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-800 block">
                  Q4. 回顧自己過去的 24 小時，選出一件你做過「必要的」與「重要的」事，並說明理由：
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="border border-slate-200 p-3 rounded-xl space-y-2 bg-white/50">
                    <span className="text-[10px] font-black text-orange-950">🚨 必要的事情 (例：吃飯)</span>
                    <input
                      type="text"
                      disabled={isDisabled}
                      value={answers.p07_q4_nec_act || ''}
                      onChange={(e) => updateAnswer('p07_q4_nec_act', e.target.value)}
                      placeholder="輸入你做過必要的事"
                      className="w-full text-xs p-2 rounded-lg border border-gray-100 bg-white outline-none font-bold"
                    />
                    <textarea
                      disabled={isDisabled}
                      rows={2}
                      value={answers.p07_q4_nec_reason || ''}
                      onChange={(e) => updateAnswer('p07_q4_nec_reason', e.target.value)}
                      placeholder="理由 (例如：不進食會維持不了身體機能)"
                      className="w-full text-xs p-2 rounded-lg border border-gray-100 bg-white outline-none font-semibold resize-none"
                    />
                  </div>

                  <div className="border border-slate-200 p-3 rounded-xl space-y-2 bg-white/50">
                    <span className="text-[10px] font-black text-orange-950">💡 重要的事情 (例：和死黨聊天)</span>
                    <input
                      type="text"
                      disabled={isDisabled}
                      value={answers.p07_q4_imp_act || ''}
                      onChange={(e) => updateAnswer('p07_q4_imp_act', e.target.value)}
                      placeholder="輸入你做過重要的事"
                      className="w-full text-xs p-2 rounded-lg border border-gray-100 bg-white outline-none font-bold"
                    />
                    <textarea
                      disabled={isDisabled}
                      rows={2}
                      value={answers.p07_q4_imp_reason || ''}
                      onChange={(e) => updateAnswer('p07_q4_imp_reason', e.target.value)}
                      placeholder="理由 (例如：維繫友情、獲得心理抒發)"
                      className="w-full text-xs p-2 rounded-lg border border-gray-100 bg-white outline-none font-semibold resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Q5 */}
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-800 block">
                  Q5. 如果你的生命此時只剩下最後 24 小時，你會選擇去做哪些事？為什麼？
                </label>
                <textarea
                  disabled={isDisabled}
                  rows={3}
                  value={answers.p07_q5_thought || ''}
                  onChange={(e) => updateAnswer('p07_q5_thought', e.target.value)}
                  placeholder="這一次，你想為你的生命寫下怎樣的終章清單..."
                  className="w-full text-xs p-3 rounded-xl border border-gray-200 outline-none bg-white font-semibold"
                />
              </div>

              <div className="text-right">
                <span className="text-[9px] text-gray-400 font-extrabold italic bg-slate-100 px-2 py-1 rounded-md">
                  影片搜尋關鍵字 🔍 蒼蠅 一分鐘的生命
                </span>
              </div>
            </div>
          </div>
        );

      case 8: // Page 008
        return (
          <div className="space-y-6">
            <div className="border-l-4 border-amber-500 pl-3">
              <span className="text-xs font-bold text-gray-500 uppercase">第二章</span>
              <h3 className="text-sm font-black text-amber-950 mt-0.5">幸福心方向 ── 人生所為何來</h3>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed font-semibold">
              人的一生，從天真無邪的孩提時代，到拼搏升學的學生階段，隨後步入社會、成家立業、面臨退休，最終面臨死亡。
              <span className="font-black text-slate-800 block mt-1">「人生在世，所為何來？」人究竟在追求什麼？什麼樣的人生目標值得追尋？</span>
              每個人都必須在人生道路上，不斷澄清、檢視自己的價值觀，在生命的各個階段發掘自我存在的價值與意義，才得以擁有一份全面的幸福。
            </p>

            {/* MIND 田捕手 Section */}
            <div className="border border-orange-200 bg-orange-50/5 rounded-2xl p-4 space-y-3 relative overflow-hidden">
              <div className="absolute -top-6 -right-6 text-7xl text-orange-200/20 font-black pointer-events-none select-none uppercase font-mono">
                MIND
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[9px] bg-orange-600 text-white font-extrabold px-1.5 py-0.5 rounded-md">MIND 田捕手</span>
                <h4 className="text-xs font-black text-slate-800">電影導讀 ── 《幸福路上 On Happiness Road》</h4>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed font-medium">
                這部金馬最佳手繪動畫片，描述主角「小琪」從兒時幸福路上的平凡單純，到長大後符合父母期待赴美工作，卻在美國繁華異地迷失自己。直到因阿嬤過世再度回到台灣，重新在街坊鄰居與童年好友的故事中，尋找「我是誰、從何而來」的生命真諦。
              </p>

              {/* Tape Player UI representing the theme song */}
              <div className="bg-slate-900 text-slate-100 rounded-2xl p-4 border-2 border-slate-700 shadow-lg relative overflow-hidden my-3">
                <div className="flex items-center justify-between mb-2.5 border-b border-slate-800 pb-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-[8px] font-mono text-slate-400 font-bold uppercase tracking-wider">A-SIDE PLAYING</span>
                  </div>
                  <span className="text-[9px] font-mono text-amber-400 font-bold">蔡依林 ── 《幸福路上》主題曲</span>
                </div>
                <div className="flex items-center gap-10 bg-slate-950 py-2.5 rounded-xl border border-slate-800 mb-3 justify-center">
                  <div className="flex items-center gap-8">
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="w-8 h-8 rounded-full border-2 border-dashed border-slate-600 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-slate-800" />
                    </motion.div>
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }} className="w-8 h-8 rounded-full border-2 border-dashed border-slate-600 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-slate-800" />
                    </motion.div>
                  </div>
                </div>
                <div className="text-center font-semibold text-[11px] leading-relaxed text-slate-300 italic space-y-1">
                  <p>「以為幸福不在這在別處，總是滿足別人要的滿足，一路追逐，」</p>
                  <p>「原來是我怕和自己獨處，我又是我誰？我卻說不清楚；」</p>
                  <p>「也許幸福不過是種自如，是一段路不必通往任何處。」</p>
                </div>
              </div>
            </div>

            {/* Q1 to Q3 */}
            <div className="bg-amber-50/15 border border-amber-200/50 rounded-2xl p-4 space-y-4">
              <span className="text-xs font-black text-amber-950 flex items-center gap-1">
                <HelpCircle className="w-4 h-4 text-orange-600" />
                思考與實踐
              </span>

              {/* Q1 */}
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-800 block">
                  Q1. 看過《幸福路上》與歌詞後，對你而言，現階段的「幸福」是什麼？
                </label>
                <textarea
                  disabled={isDisabled}
                  rows={2}
                  value={answers.p08_q1_thought || ''}
                  onChange={(e) => updateAnswer('p08_q1_thought', e.target.value)}
                  placeholder="寫下你的幸福定義..."
                  className="w-full text-xs p-2.5 rounded-xl border border-gray-200 outline-none bg-white font-semibold"
                />
              </div>

              {/* Q2 Equation Maker */}
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-800 block">
                  Q2. 英國科學家宣稱幸福方程式是：「幸福 ＝ 個性 ＋ 基本生理滿足 ＋ 高層次追求」。請在此客製化「你的專屬幸福方程式」：
                </label>
                
                <div className="bg-orange-50/30 p-4 rounded-xl border border-orange-100 flex flex-col md:flex-row items-center gap-3 font-black text-slate-700 justify-center">
                  <span className="text-sm text-orange-950">幸福</span>
                  <span className="text-lg">＝</span>
                  <input
                    type="text"
                    disabled={isDisabled}
                    value={answers.p08_eq1 || ''}
                    onChange={(e) => updateAnswer('p08_eq1', e.target.value)}
                    placeholder="條件 A (如：健康)"
                    className="text-xs p-2 rounded-lg border border-gray-200 bg-white font-black text-center w-full md:w-[120px] outline-none focus:border-amber-500"
                  />
                  <span className="text-lg">＋</span>
                  <input
                    type="text"
                    disabled={isDisabled}
                    value={answers.p08_eq2 || ''}
                    onChange={(e) => updateAnswer('p08_eq2', e.target.value)}
                    placeholder="條件 B (如：愛人)"
                    className="text-xs p-2 rounded-lg border border-gray-200 bg-white font-black text-center w-full md:w-[120px] outline-none focus:border-amber-500"
                  />
                  <span className="text-lg">＋</span>
                  <input
                    type="text"
                    disabled={isDisabled}
                    value={answers.p08_eq3 || ''}
                    onChange={(e) => updateAnswer('p08_eq3', e.target.value)}
                    placeholder="條件 C (如：實踐夢想)"
                    className="text-xs p-2 rounded-lg border border-gray-200 bg-white font-black text-center w-full md:w-[120px] outline-none focus:border-amber-500"
                  />
                </div>
                
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] text-gray-400 font-bold block">為什麼這樣組合？說說你的方程式設計理念：</span>
                  <textarea
                    disabled={isDisabled}
                    rows={2}
                    value={answers.p08_eq_reason || ''}
                    onChange={(e) => updateAnswer('p08_eq_reason', e.target.value)}
                    placeholder="說明你的方程式理由..."
                    className="w-full text-xs p-2.5 rounded-xl border border-gray-200 outline-none bg-white font-semibold"
                  />
                </div>
              </div>

              {/* Q3 */}
              <div className="space-y-1">
                <label className="text-xs font-black text-slate-800 block">
                  Q3. 觀看或分享彼此的幸福方程式，看看自己和別人的方程式有沒有不一樣？過程中有什麼新發現？
                </label>
                <textarea
                  disabled={isDisabled}
                  rows={2}
                  value={answers.p08_q3_discovery || ''}
                  onChange={(e) => updateAnswer('p08_q3_discovery', e.target.value)}
                  placeholder="例如：我發現有人更在乎自由，而我更在乎安全感..."
                  className="w-full text-xs p-2.5 rounded-xl border border-gray-200 outline-none bg-white font-semibold"
                />
              </div>
            </div>
          </div>
        );

      case 9: // Page 009
        return (
          <div className="space-y-6">
            <div className="border-l-4 border-amber-600 pl-3">
              <span className="text-xs font-bold text-gray-500 uppercase">第二章</span>
              <h3 className="text-sm font-black text-amber-950 mt-0.5">五把開啟幸福之門的鑰匙 ── 生命教育的骨架</h3>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed font-semibold">
              達賴喇嘛說：「我相信人生的目的是在追尋快樂。無論個人信不信宗教，我們都在尋求生命中最美好的一面。」
              哲學家亞里斯多德（Aristotle）亦指出，追求幸福是人類一切行為的「終極目的」。
              台大哲學系孫效智教授將這條追尋幸福的漫長歷程，淬煉成<span className="text-amber-800 font-black">「打開幸福人生的五把鑰匙」</span>。分為「基礎方法」與「人生三問」：
            </p>

            {/* Interactive Mind Map Visual Diagram */}
            <div className="bg-gradient-to-br from-amber-50/10 via-white to-orange-50/10 border border-amber-100 rounded-2xl p-5 relative">
              <span className="text-[10px] text-gray-400 font-black tracking-widest block text-center mb-5 uppercase">
                ⚙️ 點擊各個鑰匙領域 ── 預覽鑰匙意涵
              </span>

              <div className="flex flex-col lg:flex-row gap-5 items-stretch justify-center relative">
                {/* 基礎方法 Box */}
                <div className="flex-1 bg-amber-50/30 border border-amber-200 p-4 rounded-xl space-y-3 flex flex-col justify-between">
                  <span className="text-[10px] font-black text-amber-950 bg-amber-200/50 px-2 py-0.5 rounded-md block w-max">
                    🔑 基礎方法 (方法論基礎)
                  </span>
                  
                  <div className="space-y-2.5 my-2">
                    {[
                      { 
                        id: "key1", 
                        title: "1. 哲學思考 (追求真理)", 
                        color: "bg-orange-500 border-orange-600",
                        desc: "思考的知識技能、情意態度、後設思考" 
                      },
                      { 
                        id: "key2", 
                        title: "2. 人學探索 (認識自己)", 
                        color: "bg-sky-500 border-sky-600",
                        desc: "人是什麼？我是誰？關係中的人" 
                      }
                    ].map(k => (
                      <button
                        key={k.id}
                        onClick={() => setActiveKeyDetail(k.id)}
                        className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                          activeKeyDetail === k.id 
                            ? 'bg-white border-amber-500 shadow-md scale-102 font-black' 
                            : 'bg-white/80 border-slate-100 hover:border-amber-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`w-2.5 h-2.5 rounded-full ${activeKeyDetail === k.id ? k.color + ' animate-pulse' : 'bg-slate-300'}`} />
                          <span className="text-xs font-black text-slate-800">{k.title}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 font-semibold">{k.desc}</p>
                      </button>
                    ))}
                  </div>
                  <span className="text-[8px] text-amber-800/60 font-bold block">
                    ▲ 提供深度探索、反省生命本質所需的邏輯與工具。
                  </span>
                </div>

                {/* Connecting Node Graphic in desktop */}
                <div className="hidden lg:flex flex-col items-center justify-center font-black text-amber-500 text-lg">
                  ⚡
                </div>

                {/* 人生三問 Box */}
                <div className="flex-1 bg-indigo-50/20 border border-indigo-200 p-4 rounded-xl space-y-3 flex flex-col justify-between">
                  <span className="text-[10px] font-black text-indigo-950 bg-indigo-100/50 px-2 py-0.5 rounded-md block w-max">
                    🔑 人生三問 (終極靈魂追問)
                  </span>

                  <div className="space-y-2.5 my-2">
                    {[
                      { 
                        id: "key3", 
                        title: "3. 終極關懷 (創造意義)", 
                        color: "bg-teal-500 border-teal-600",
                        desc: "我為何而活？尋求核心終極價值" 
                      },
                      { 
                        id: "key4", 
                        title: "4. 價值思辨 (正確抉擇)", 
                        color: "bg-indigo-500 border-indigo-600",
                        desc: "我應如何活？道德判斷與取捨" 
                      },
                      { 
                        id: "key5", 
                        title: "5. 靈性修養 (圓滿生命)", 
                        color: "bg-purple-500 border-purple-600",
                        desc: "知行合一，活出應活的圓滿生命" 
                      }
                    ].map(k => (
                      <button
                        key={k.id}
                        onClick={() => setActiveKeyDetail(k.id)}
                        className={`w-full text-left p-3 rounded-xl border transition-all cursor-pointer ${
                          activeKeyDetail === k.id 
                            ? 'bg-white border-indigo-500 shadow-md scale-102 font-black' 
                            : 'bg-white/80 border-slate-100 hover:border-indigo-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`w-2.5 h-2.5 rounded-full ${activeKeyDetail === k.id ? k.color + ' animate-pulse' : 'bg-slate-300'}`} />
                          <span className="text-xs font-black text-indigo-800">{k.title}</span>
                        </div>
                        <p className="text-[10px] text-gray-400 font-semibold">{k.desc}</p>
                      </button>
                    ))}
                  </div>
                  <span className="text-[8px] text-indigo-800/60 font-bold block">
                    ▲ 解決靈魂對於「生存目的、做人準則、實踐障礙」的疑問。
                  </span>
                </div>
              </div>

              {/* Dynamic Key Information Card Overlay */}
              <AnimatePresence mode="wait">
                {activeKeyDetail && (
                  <motion.div
                    key={activeKeyDetail}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-4 rounded-xl border border-amber-200/60 bg-amber-50/20 shadow-2xs text-xs"
                  >
                    {activeKeyDetail === "key1" && (
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-black text-orange-800 bg-orange-100 px-2 py-0.5 rounded-md">1. 哲學思考 Philosophy</span>
                        <h4 className="text-xs font-black text-slate-800">核心能力：判斷合理的準則</h4>
                        <p className="text-gray-600 leading-relaxed">
                          學習邏輯思維與反思，跳脫直覺與人云亦云。探求「我們如何確定一件事情的真假合理？」，用批判性思維做出沒有邏輯謬誤的明智抉擇。
                        </p>
                      </div>
                    )}
                    {activeKeyDetail === "key2" && (
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-black text-sky-800 bg-sky-100 px-2 py-0.5 rounded-md">2. 人學探索 Anthropology</span>
                        <h4 className="text-xs font-black text-slate-800">核心能力：認識生而為人的本質</h4>
                        <p className="text-gray-600 leading-relaxed">
                          從生物學、心理學和社會學的多維角度，深度探討「我是誰？」「人是什麼？」。理解自己在宇宙與社會網絡中的獨特定位與尊嚴。
                        </p>
                      </div>
                    )}
                    {activeKeyDetail === "key3" && (
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-black text-teal-800 bg-teal-100 px-2 py-0.5 rounded-md">3. 終極關懷 Ultimate Care</span>
                        <h4 className="text-xs font-black text-slate-800">核心能力：定位生命的核心方向（我為何而活）</h4>
                        <p className="text-gray-600 leading-relaxed">
                          直面死亡與痛苦的限制，追問一生的努力在身後將留下什麼。透過對死亡的凝視，反而回頭聚焦生命中最核心、不可動搖的目標與信仰。
                        </p>
                      </div>
                    )}
                    {activeKeyDetail === "key4" && (
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-black text-indigo-800 bg-indigo-100 px-2 py-0.5 rounded-md">4. 價值思辨 Value Discernment</span>
                        <h4 className="text-xs font-black text-slate-800">核心能力：釐清應遵循的行為規範（我應如何活）</h4>
                        <p className="text-gray-600 leading-relaxed">
                          學習道德倫理思辨，當面對「利益與誠實」、「個人與群體」的衝突時，能夠釐清良知的標準，做出既合乎公義、亦活出生命之美的德行選擇。
                        </p>
                      </div>
                    )}
                    {activeKeyDetail === "key5" && (
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-black text-purple-800 bg-purple-100 px-2 py-0.5 rounded-md">5. 靈性修養 Spiritual Cultivation</span>
                        <h4 className="text-xs font-black text-slate-800">核心能力：知行合一與心靈自省（如何活出該活的生命）</h4>
                        <p className="text-gray-600 leading-relaxed">
                          縮短「知道」到「做到」的太平洋鴻溝。在日常中培養自省、調控情緒、克制貪懶的習慣，使生命逐漸飽滿、圓融、朝向真善美邁進。
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <p className="text-[11px] text-gray-500 italic text-center">
              💡 孫效智教授：「這五把鑰匙環環相扣，交織出我們整個人生的智慧地圖。」
            </p>
          </div>
        );

      case 10: // Page 010
        return (
          <div className="space-y-6">
            <div className="bg-amber-50 text-amber-800 px-4 py-3.5 rounded-xl border border-amber-100 text-xs font-bold">
              ✨ 課本第 10 頁：這五把開啟幸福之門的鑰匙，可以分別解開……
            </div>

            {/* Door 1 Card */}
            <div className="border border-orange-200 rounded-2xl bg-white shadow-2xs overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-amber-300" />
                  <h4 className="text-xs font-black uppercase tracking-wider">第一道門：追求真理</h4>
                </div>
                <span className="text-[9px] bg-orange-700 px-2 py-0.5 rounded-md font-bold font-mono">哲學思考</span>
              </div>
              <div className="p-4 space-y-3 text-xs leading-relaxed">
                <div className="flex items-center gap-1.5 text-orange-950 font-black">
                  <span>生命之謎的提問：</span>
                  <span className="bg-orange-50 text-orange-800 px-2 py-0.5 rounded-md font-mono">「怎麼判斷真假？如何做出正確的判斷？」</span>
                </div>
                <p className="text-gray-600 font-semibold">
                  我們究竟用什麼準則來做判斷呢？日常生活中，有太多訊息、媒體、同儕和潮流在告訴你「這樣做好、那樣做才叫酷」，左右著我們寶貴的抉擇。學習正確的哲學思考方法與理性態度，重新檢視、推論、找出判斷依據的合理性，是避免被帶風向、做出合宜抉擇的唯一途徑。
                </p>
                <div className="pt-2 border-t border-slate-100 space-y-1 bg-slate-50/50 p-2.5 rounded-lg">
                  <label className="text-[10px] font-black text-orange-850 block">💡 課堂思考：你在日常生活中，曾用過哲學思考判斷過什麼事的真偽？</label>
                  <input
                    type="text"
                    disabled={isDisabled}
                    value={answers.p10_door1_reflect || ''}
                    onChange={(e) => updateAnswer('p10_door1_reflect', e.target.value)}
                    placeholder="例如：識破一則誇大其詞的網路詐騙、或推翻同儕盲目的起鬨..."
                    className="w-full text-xs p-2.5 rounded-xl border border-gray-200 outline-none bg-white font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* Door 2 Card */}
            <div className="border border-sky-200 rounded-2xl bg-white shadow-2xs overflow-hidden">
              <div className="bg-gradient-to-r from-sky-500 to-sky-600 px-4 py-3 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-amber-300" />
                  <h4 className="text-xs font-black uppercase tracking-wider">第二道門：認識自己</h4>
                </div>
                <span className="text-[9px] bg-sky-700 px-2 py-0.5 rounded-md font-bold font-mono">人學探索</span>
              </div>
              <div className="p-4 space-y-3 text-xs leading-relaxed">
                <div className="flex items-center gap-1.5 text-sky-950 font-black">
                  <span>生命之謎的提問：</span>
                  <span className="bg-sky-50 text-sky-800 px-2 py-0.5 rounded-md font-mono">「人是什麼？我是誰？」</span>
                </div>
                <p className="text-gray-600 font-semibold">
                  生而為人的意義到底是什麼？我們不只是生物學上精巧的血肉機器，更是具有心理尊嚴與豐富情感的生命體。從生物學、心理學、社會學等多重維度重新看待自己，思考自己存在的獨特價值，進而拓展到對他人、對世界的溫暖連結。
                </p>
                <div className="pt-2 border-t border-slate-100 space-y-1 bg-slate-50/50 p-2.5 rounded-lg">
                  <label className="text-[10px] font-black text-sky-850 block">💡 課堂思考：對你而言，『認識自己』最困難的挑戰是什麼？</label>
                  <input
                    type="text"
                    disabled={isDisabled}
                    value={answers.p10_door2_reflect || ''}
                    onChange={(e) => updateAnswer('p10_door2_reflect', e.target.value)}
                    placeholder="例如：在意外人的目光與評價、無法接納自己的缺點..."
                    className="w-full text-xs p-2.5 rounded-xl border border-gray-200 outline-none bg-white font-semibold"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 11: // Page 011
        return (
          <div className="space-y-6">
            <div className="bg-indigo-50 text-indigo-800 px-4 py-3.5 rounded-xl border border-indigo-100 text-xs font-bold">
              ✨ 課本第 11 頁：人生三問的核心解密 ── 第三至五道心靈鑰匙
            </div>

            {/* Door 3 Card */}
            <div className="border border-teal-200 rounded-2xl bg-white shadow-2xs overflow-hidden">
              <div className="bg-gradient-to-r from-teal-500 to-teal-600 px-4 py-3 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-amber-300" />
                  <h4 className="text-xs font-black uppercase tracking-wider">第三道門：創造意義</h4>
                </div>
                <span className="text-[9px] bg-teal-700 px-2 py-0.5 rounded-md font-bold font-mono">終極關懷</span>
              </div>
              <div className="p-4 space-y-3 text-xs leading-relaxed">
                <div className="flex items-center gap-1.5 text-teal-950 font-black">
                  <span>生命之謎的提問：</span>
                  <span className="bg-teal-50 text-teal-800 px-2 py-0.5 rounded-md font-mono">「我為什麼而活？」</span>
                </div>
                <p className="text-gray-600 font-semibold">
                  探索人生的終極價值、生命的意義與死亡。人是唯一會探尋生存意義的物種，透過對意義的省思與建構，我們得以在有限的生命歲月中，活出深度與不朽。
                </p>
                <div className="pt-2 border-t border-slate-100 space-y-1 bg-slate-50/50 p-2.5 rounded-lg">
                  <label className="text-[10px] font-black text-teal-850 block">💡 課堂思考：每當你感到空虛或累的時候，什麼人事物能瞬間帶給你『活著的意義』？</label>
                  <input
                    type="text"
                    disabled={isDisabled}
                    value={answers.p11_door3_reflect || ''}
                    onChange={(e) => updateAnswer('p11_door3_reflect', e.target.value)}
                    placeholder="例如：家人的支持與微笑、追求夢想的熱情、幫助弱小動物的充實感..."
                    className="w-full text-xs p-2.5 rounded-xl border border-gray-200 outline-none bg-white font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* Door 4 Card */}
            <div className="border border-purple-200 rounded-2xl bg-white shadow-2xs overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-4 py-3 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-amber-300" />
                  <h4 className="text-xs font-black uppercase tracking-wider">第四道門：正確抉擇</h4>
                </div>
                <span className="text-[9px] bg-purple-700 px-2 py-0.5 rounded-md font-bold font-mono">價值思辨</span>
              </div>
              <div className="p-4 space-y-3 text-xs leading-relaxed">
                <div className="flex items-center gap-1.5 text-purple-950 font-black">
                  <span>生命之謎的提問：</span>
                  <span className="bg-purple-50 text-purple-800 px-2 py-0.5 rounded-md font-mono">「我應該如何活著？」</span>
                </div>
                <p className="text-gray-600 font-semibold">
                  在多元繁雜的價值觀中，如何明辨是非黑白？透過批判思考、倫理思辨與自主判斷，不盲從大眾、不隨波逐流，為自己的行為负起責任。
                </p>
                <div className="pt-2 border-t border-slate-100 space-y-1 bg-slate-50/50 p-2.5 rounded-lg">
                  <label className="text-[10px] font-black text-purple-850 block">💡 課堂思考：你曾做過哪一個對自己而言最艱難但卻最『正確』的道德抉擇？</label>
                  <input
                    type="text"
                    disabled={isDisabled}
                    value={answers.p11_door4_reflect || ''}
                    onChange={(e) => updateAnswer('p11_door4_reflect', e.target.value)}
                    placeholder="例如：當大家都在起鬨欺負弱小同學時，勇敢站出來阻止..."
                    className="w-full text-xs p-2.5 rounded-xl border border-gray-200 outline-none bg-white font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* Door 5 Card */}
            <div className="border border-emerald-200 rounded-2xl bg-white shadow-2xs overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-3 text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Key className="w-4 h-4 text-amber-300" />
                  <h4 className="text-xs font-black uppercase tracking-wider">第五道門：圓滿生命</h4>
                </div>
                <span className="text-[9px] bg-emerald-700 px-2 py-0.5 rounded-md font-bold font-mono">靈性修養</span>
              </div>
              <div className="p-4 space-y-3 text-xs leading-relaxed">
                <div className="flex items-center gap-1.5 text-emerald-950 font-black">
                  <span>生命之謎的提問：</span>
                  <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md font-mono">「我如何活出生命的圓滿？」</span>
                </div>
                <p className="text-gray-600 font-semibold">
                  培育心靈的敏銳度，與宇宙、大自然、他人及深層自我建立超凡的和諧連結。在日常生活中實踐善良、大愛與感恩，達到知行合一、身心靈和諧的圓滿境界。
                </p>
                <div className="pt-2 border-t border-slate-100 space-y-1 bg-slate-50/50 p-2.5 rounded-lg">
                  <label className="text-[10px] font-black text-emerald-850 block">💡 課堂思考：你平常會透過什麼方式（如靜坐、音樂、大自然、運動）來沉澱、安撫心靈？</label>
                  <input
                    type="text"
                    disabled={isDisabled}
                    value={answers.p11_door5_reflect || ''}
                    onChange={(e) => updateAnswer('p11_door5_reflect', e.target.value)}
                    placeholder="例如：睡前聽10分鐘純鋼琴音樂、去公園散步接觸綠意、深呼吸冥想..."
                    className="w-full text-xs p-2.5 rounded-xl border border-gray-200 outline-none bg-white font-semibold"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 12: // Page 012
        return (
          <div className="space-y-6">
            <div className="border-l-4 border-amber-500 pl-3">
              <span className="text-xs font-bold text-gray-500 uppercase">探索</span>
              <h3 className="text-sm font-black text-amber-950 mt-0.5">幸福煉金術：STAGE 幸福存摺</h3>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed font-semibold">
              正向心理學提出，幸福感不是靠運氣，而是像煉金術一樣，可以透過日常的五個維度進行練習與積累。
              點擊下方的幸福字母（S-T-A-G-E），解鎖各項幸福指引，並寫下你的實踐點子：
            </p>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="space-y-2.5">
                {[
                  { 
                    letter: "S", 
                    title: "Savor · 品味 (品嚐生活芬芳)", 
                    color: "border-amber-200 bg-amber-50/20 text-amber-850",
                    bullet: "🟡 細品當下",
                    desc: "學會在忙碌的學業或生活中放慢腳步，全然專注地感受生活中的點滴美好。無論是一杯熱茶的香氣、清晨吹來的微風，抑或是朋友親切的微笑。不急躁、不擔憂明日，讓心靈在『此時此刻』安頓下來。" 
                  },
                  { 
                    letter: "T", 
                    title: "Thank · 感恩 (心懷感激之情)", 
                    color: "border-emerald-200 bg-emerald-50/20 text-emerald-850",
                    bullet: "🟢 數算恩典",
                    desc: "主動去發掘、看見生活中不顯眼但重要的人事物，並對其付出真誠的感謝。從父母親準備的便當、打掃阿姨整理的教室，到自己依然擁有健康的呼吸。感恩能把視線從『沒有』轉向『擁有』，帶來內在充實感。" 
                  },
                  { 
                    letter: "A", 
                    title: "Aspire · 期許 (朝向幸福前行)", 
                    color: "border-rose-200 bg-rose-50/20 text-rose-850",
                    bullet: "🔴 自我超越",
                    desc: "為自己點亮心靈的燈塔！為未來規劃清晰、有意義的目標，並懷抱信心與熱情朝之前進。這個目標不一定是宏大的事業，可以是學會一首鋼琴曲、改善與家人的互動，甚至是堅持一週不熬夜。期許給予我們前進的希望感與生命厚度。" 
                  },
                  { 
                    letter: "G", 
                    title: "Give · 給予 (施比受更有福)", 
                    color: "border-sky-200 bg-sky-50/20 text-sky-850",
                    bullet: "🔵 慷慨付出",
                    desc: "在自己可負擔的範疇內，主動伸出援手。無論是給予他人讚美、指引方向，還是實質上的協助。懂得分享、不計較回報的付出，能在內心產生巨大的幸福回音。" 
                  },
                  { 
                    letter: "E", 
                    title: "Empathy · 同理心 (溫慢共鳴)", 
                    color: "border-purple-200 bg-purple-50/20 text-purple-850",
                    bullet: "🟣 換位思考",
                    desc: "在與同儕、家人互動時，主動站在對方的視角來理解他的處境與情緒，尋求情感與理性的深度共感，打造和諧真摯的人際幸福網路。" 
                  }
                ].map((st) => {
                  const isOpen = activeStageLetter === st.letter;
                  return (
                    <div key={st.letter} className={`border rounded-xl transition-all overflow-hidden ${st.color}`}>
                      <button
                        type="button"
                        onClick={() => setActiveStageLetter(isOpen ? "" : st.letter)}
                        className="w-full text-left p-3 flex items-center justify-between font-black text-xs cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-white/80 border border-slate-200/50 flex items-center justify-center font-mono font-bold text-sm text-slate-800">
                            {st.letter}
                          </span>
                          <span>{st.title}</span>
                        </div>
                        <span className="text-[10px] text-gray-400 font-bold">
                          {isOpen ? "收合內容" : "點擊展開"}
                        </span>
                      </button>
                      
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="px-4 pb-4 text-xs space-y-2.5 leading-relaxed text-slate-700 font-semibold border-t border-slate-100/50 pt-2.5 bg-white/40"
                          >
                            <span className="text-[10px] font-extrabold uppercase tracking-widest block">{st.bullet}</span>
                            <p>{st.desc}</p>
                            
                            <div className="space-y-1 bg-white/90 p-2 rounded-lg border border-slate-200/50">
                              <label className="text-[9.5px] font-bold text-slate-600 block">✏️ 你的實踐想法或點子：</label>
                              <input
                                type="text"
                                disabled={isDisabled}
                                value={answers[`p12_stage_${st.letter}_reflect`] || ''}
                                onChange={(e) => updateAnswer(`p12_stage_${st.letter}_reflect`, e.target.value)}
                                placeholder={`例：${
                                  st.letter === 'S' ? '吃晚餐時，關掉手機，細細品嚐每一口食物的味道' :
                                  st.letter === 'T' ? '今天睡前傳簡訊感謝媽媽幫我準備愛心便當' :
                                  st.letter === 'A' ? '今年期末考前給自己設定每天背5個英文單字的小目標' :
                                  st.letter === 'G' ? '明天看見同學東西掉了，主動幫他撿起來並給予微笑' :
                                  '今天弟弟哭鬧時，不急著生氣，先聽聽他為什麼難過'
                                }`}
                                className="w-full text-xs p-1.5 rounded border border-gray-200 outline-none font-semibold bg-slate-50/30"
                              />
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case 13: // Page 013
        return (
          <div className="space-y-6">
            <div className="border-l-4 border-emerald-500 pl-3">
              <span className="text-xs font-bold text-gray-500 uppercase">實踐</span>
              <h3 className="text-sm font-black text-emerald-950 mt-0.5">Wish List 幸福存摺實踐清單</h3>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed font-semibold">
              恭喜你完成了前面章節的導讀！現在，讓我們把幸福力化為實際的行動吧。
              請為自己規劃一週的「STAGE 幸福實踐清單」，每天選擇一個幸福字母進行練習。
              每勾選一項完成的實踐，你就能為自己存入一枚「心靈幸福金幣」！
            </p>

            {/* 7-Day Interactive Checklist */}
            <div className="border border-emerald-200 bg-emerald-50/25 rounded-2xl p-4 sm:p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-emerald-200/50 pb-2 mb-1">
                <span className="text-xs font-black text-emerald-900 flex items-center gap-1.5">
                  📝 一週心靈存摺紀錄表
                </span>
                <span className="text-[10px] text-emerald-700 bg-white border border-emerald-200 px-2 py-0.5 rounded-full font-bold">
                  儲存幸福感
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { day: "週一", label: "品味美好的早晨 (Savor)", key: "mon_s", letter: "S" },
                  { day: "週二", label: "真誠感謝身邊的一個人 (Thank)", key: "tue_t", letter: "T" },
                  { day: "週三", label: "寫下一個自我期許或小目標 (Aspire)", key: "wed_a", letter: "A" },
                  { day: "週四", label: "給予他人小小的協助或讚美 (Give)", key: "thu_g", letter: "G" },
                  { day: "週五", label: "站在對方的立場想一想 (Empathy)", key: "fri_e", letter: "E" },
                  { day: "週六", label: "享受一個無壓力的放鬆午後 (Savor)", key: "sat_s", letter: "S" },
                  { day: "週日", label: "感謝這週努力生活的自己 (Thank)", key: "sun_t", letter: "T" },
                ].map((item) => {
                  const isChecked = answers[`p13_${item.key}_done`] || false;
                  return (
                    <div 
                      key={item.key} 
                      onClick={() => {
                        if (isDisabled) return;
                        updateAnswer(`p13_${item.key}_done`, !isChecked);
                        if (!isChecked) {
                          // Show coin animation when checking a new task
                          setShowCoinsAnim(true);
                          setTimeout(() => setShowCoinsAnim(false), 2500);
                        }
                      }}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isChecked 
                          ? 'border-emerald-300 bg-white/90 shadow-2xs' 
                          : 'border-slate-100 bg-white hover:border-emerald-200'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className={`w-5 h-5 rounded-md font-mono text-[10px] font-extrabold flex items-center justify-center shrink-0 ${
                          isChecked 
                            ? 'bg-emerald-600 text-white' 
                            : 'bg-slate-100 text-slate-500'
                        }`}>
                          {item.letter}
                        </span>
                        <div className="min-w-0">
                          <span className="text-[10px] text-gray-400 font-extrabold block leading-none mb-1">{item.day}</span>
                          <span className={`text-xs block font-bold truncate ${isChecked ? 'text-emerald-900 line-through' : 'text-slate-700'}`}>
                            {item.label}
                          </span>
                        </div>
                      </div>

                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
                        isChecked 
                          ? 'bg-emerald-500 border-emerald-500 text-white' 
                          : 'border-slate-300'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reward trigger visual */}
              <AnimatePresence>
                {showCoinsAnim && (
                  <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
                    {[...Array(12)].map((_, i) => {
                      const randomX = (Math.random() - 0.5) * 400;
                      const randomY = (Math.random() - 0.5) * 400;
                      return (
                        <motion.div
                          key={i}
                          initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
                          animate={{ 
                            scale: [1, 1.2, 0.8], 
                            opacity: [1, 1, 0], 
                            x: randomX, 
                            y: randomY,
                            rotate: 360 
                          }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="absolute text-2xl"
                        >
                          🪙
                        </motion.div>
                      );
                    })}
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: [1, 1.1, 1], opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-white/95 px-5 py-3 rounded-2xl border-2 border-emerald-500 text-emerald-800 text-xs font-black shadow-lg flex items-center gap-2"
                    >
                      <Sparkles className="w-4 h-4 text-amber-500 animate-spin" />
                      心靈財富增加！幸福存摺已存入！
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );

      default:
        return (
          <div className="py-12 flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-center space-y-2">
            <p className="text-xs font-bold">【此頁面目前正在編輯中】</p>
            <p className="text-[10px]">等待管理員匯入新資料...</p>
          </div>
        );
    }
  };

  const isDisabled = isSubmitted || role === 'teacher';

  return (
    <div id="unit00-textbook-root" className="bg-[#FAF8F5]/30 rounded-3xl border border-amber-100/60 p-1 sm:p-5 space-y-5">
      
      {/* 1. Breadcrumbs, Steps Indicator & Progress Badge Row */}
      <div id="unit00-header-row" className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 pb-2">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          <span>首頁</span>
          <span className="text-slate-300">/</span>
          <span className="text-slate-800 font-extrabold">泰宇數位課本對照：總說 (數位互動導讀模式)</span>
        </div>

        {/* Elegant Steps Ribbon */}
        <div className="flex flex-wrap items-center gap-2 md:gap-4 bg-white/70 backdrop-blur-xs border border-slate-100 px-4 py-2 rounded-2xl shadow-3xs">
          <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600">
            <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 font-extrabold flex items-center justify-center text-[10px]">1</span>
            <span>選擇單元</span>
            <svg className="w-4 h-4 text-blue-500 fill-blue-50" viewBox="0 0 24 24" fill="currentColor">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
            </svg>
          </div>

          <span className="text-slate-300 text-xs">➔</span>

          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-500 bg-rose-50/50 px-2.5 py-1 rounded-full border border-rose-100/30">
            <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 font-extrabold flex items-center justify-center text-[10px]">2</span>
            <span>選擇學習單分類</span>
          </div>

          <span className="text-slate-300 text-xs">➔</span>

          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
            <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 font-extrabold flex items-center justify-center text-[10px]">3</span>
            <span>開始作答</span>
          </div>
        </div>

        {/* Elegant Screen Number progress badge */}
        <div className="px-3 py-1.5 border border-orange-200 bg-[#FFF6EE] text-orange-700 rounded-xl text-xs font-black shadow-2xs shrink-0 self-end xl:self-auto flex items-center gap-1.5">
          <span>畫面</span>
          <span className="font-mono font-black text-[#D97706] text-sm">
            {String(pages.indexOf(currentPage) + 1).padStart(2, '0')} / {String(pages.length).padStart(2, '0')}
          </span>
        </div>
      </div>

      {/* 2. Ribbon Header / Controls bar */}
      <div id="unit00-header-ribbon" className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gradient-to-r from-amber-100/40 to-amber-50/20 border border-amber-200/40 px-4 py-3 rounded-2xl gap-3">
        <div className="flex items-center gap-2.5">
          <button
            id="unit00-toggle-sidebar-btn"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 bg-white rounded-xl border border-amber-200 text-amber-800 hover:bg-amber-50 transition-colors flex items-center gap-1.5 shadow-2xs hover:border-amber-300 cursor-pointer"
            title={isSidebarOpen ? "隱藏章節地圖" : "展開章節地圖"}
          >
            <Menu className="w-4 h-4" />
            <span className="text-[11px] font-black hidden sm:inline">
              {isSidebarOpen ? "收合目錄" : "快速目錄"}
            </span>
          </button>
          <div className="flex flex-col">
            <span className="text-xs font-black text-[#4A321F] flex items-center gap-1">
              <BookOpen className="w-4 h-4 text-[#D97706]" />
              泰宇數位課本對照：總說 (數位互動導讀模式)
            </span>
            <span className="text-[10px] text-[#735A45] font-bold hidden sm:inline">
              對照紙本教材 p.004 ~ p.013 頁。點擊側邊欄或頁碼可快速翻頁跳轉！
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 self-end sm:self-auto bg-white/70 px-3 py-1 rounded-xl border border-amber-100">
          <div className="flex flex-col items-end">
            <span className="text-[9px] text-gray-400 font-extrabold uppercase">閱讀進度</span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-[#4A321F] font-sans">
                已讀 {readPagesCount} / {readPagesTotal} 頁
              </span>
              <span className="text-[10px] text-white font-extrabold bg-[#A86E42] px-2 py-0.5 rounded-full">
                {Math.round((readPagesCount / readPagesTotal) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Large Custom Header Card */}
      <div className="relative rounded-3xl border border-[#EAD2B3]/60 bg-gradient-to-br from-[#FCF7F0] via-[#FAF3E8] to-[#F7ECD8] p-6 shadow-xs overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center min-h-[140px] gap-6">
        <div className="absolute top-0 left-0 w-24 h-24 text-[#EAD2B3]/20 pointer-events-none">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M50,0 C60,40 100,50 60,60 C50,100 40,60 0,50 C40,40 50,0 Z" />
          </svg>
        </div>
        
        <div className="space-y-3 z-10 max-w-full md:max-w-[60%]">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-[#D97706] shrink-0 animate-pulse" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z" />
            </svg>
            <h2 className="text-lg font-black tracking-tight text-[#4A321F]">
              總說 | 凝視生命的地圖
            </h2>
          </div>

          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FFF2E3] border border-[#DCA26E]/40 text-[#7A451A] rounded-xl text-xs font-black shadow-3xs leading-none">
              <span className="font-mono bg-[#EEDBC5]/80 px-2 py-0.5 rounded-md text-xs text-[#D97706] font-black">{String(currentPage).padStart(3, '0')}</span>
              <span>{activePageData.title}</span>
            </span>
          </div>

          <p className="text-xs text-[#735A45] font-semibold leading-relaxed">
            {activePageData.desc || "透過多元的學習任務，認識生命的價值與意義，探索幸福人生的可能。"}
          </p>
        </div>

        <div className="self-center md:self-end h-full flex items-end relative overflow-visible z-10 mt-2 md:mt-0">
          <div className="flex items-end gap-3.5 relative overflow-visible">
            {/* Character 1: 可華 (Left) */}
            <div className="relative group shrink-0 flex flex-col items-center">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-white hover:scale-105 transition-all">
                <img 
                  src={charKehuaImg} 
                  alt="陳可華" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="mt-1 px-2 py-0.5 bg-[#4A321F]/80 text-[#FFF2E3] text-[9px] font-black rounded-full leading-none">
                陳可華
              </span>
            </div>

            {/* Character 2: 小文 (Right) */}
            <div className="relative group shrink-0 flex flex-col items-center">
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-white hover:scale-105 transition-all">
                <img 
                  src={charXiaowenImg} 
                  alt="王小文" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="mt-1 px-2 py-0.5 bg-[#4A321F]/80 text-[#FFF2E3] text-[9px] font-black rounded-full leading-none">
                王小文
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Sidebar Panel (Info & Chapter Map) */}
        <AnimatePresence initial={false}>
          {isSidebarOpen && (
            <motion.div
              id="unit00-sidebar-panel"
              initial={{ width: 0, opacity: 0, x: -10 }}
              animate={{ width: "100%", opacity: 1, x: 0 }}
              exit={{ width: 0, opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="col-span-1 lg:col-span-4 space-y-5"
            >
              {/* Card 1: Single Info Card (頁碼、建議時間、小提醒) */}
              <div className="border border-[#F0DFC6] bg-[#FAF6EE]/85 backdrop-blur-xs rounded-2xl shadow-3xs p-4 space-y-4">
                <div className="flex items-center gap-1.5 border-b border-[#EAD2B3]/50 pb-2.5">
                  <span className="text-sm">📋</span>
                  <span className="text-xs font-black text-[#4A321F] tracking-wide">
                    單元資訊
                  </span>
                </div>

                <div className="space-y-3.5">
                  {/* Item 1: 頁碼 */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#F2E4CF] text-[#8C5227] flex items-center justify-center shrink-0">
                      <BookOpen className="w-4.5 h-4.5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] text-slate-400 font-extrabold uppercase block leading-none mb-1">
                        頁碼
                      </span>
                      <span className="text-base font-black text-[#A86E42] font-mono leading-none">
                        p.{String(currentPage).padStart(3, '0')}
                      </span>
                    </div>
                  </div>

                  {/* Item 2: 建議時間 */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#F2E4CF] text-[#8C5227] flex items-center justify-center shrink-0">
                      <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[9px] text-slate-400 font-extrabold block leading-none mb-1">
                        建議時間
                      </span>
                      <span className="text-xs font-bold text-[#4A321F] leading-none block truncate">
                        15-20 分鐘
                      </span>
                    </div>
                  </div>

                  {/* Item 3: 小提醒 */}
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#F2E4CF] text-[#8C5227] flex items-center justify-center shrink-0">
                      <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.008v.008H12V18zm0-4.5h.008v.008H12V13.5l-2.25-2.25m3 0l3-3m-3 3H12" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <span className="text-[9px] text-slate-400 font-extrabold block leading-none mb-1">
                        小提醒
                      </span>
                      <span className="text-[10px] leading-relaxed text-[#735A45] font-semibold block">
                        可依興趣與需求，點擊章節地圖或頁碼快速翻頁跳轉！填寫後記得暫存。
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2: Interactive Chapter Map Navigation (頁碼快速跳轉) */}
              <div className="border border-[#F0DFC6] bg-white rounded-2xl shadow-3xs p-3.5 space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-1">
                  <span className="text-xs font-black text-[#4A321F] flex items-center gap-1.5">
                    🗺️ 課本指定章節地圖
                  </span>
                  <span className="text-[9px] text-[#A86E42] bg-[#FAF6EE] px-1.5 py-0.5 rounded-md font-extrabold border border-[#F2E4CF]/50">
                    快速翻頁
                  </span>
                </div>
                
                <div className="space-y-1.5 pr-0.5">
                  {CHAPTERS_NAV.map((ch) => {
                    const isActive = currentPage === ch.page;
                    const hasRead = readPagesList.includes(ch.page);
                    return (
                      <button
                        key={ch.page}
                        onClick={() => setCurrentPage(ch.page)}
                        className={`w-full text-left p-2 rounded-xl border transition-all flex items-start gap-2.5 cursor-pointer ${
                          isActive
                            ? 'bg-[#A86E42] border-[#8C5227] text-white shadow-xs font-bold'
                            : 'bg-white border-slate-100 hover:border-[#EAD2B3] hover:bg-[#FAF6EE]/20'
                        }`}
                      >
                        <span className="text-sm pt-0.5 shrink-0">{ch.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1 mb-0.5">
                            <span className={`text-[8.5px] px-1.5 py-0.2 rounded-md font-black uppercase tracking-wider ${
                              isActive
                                ? 'bg-white/20 text-[#FFF2E3]'
                                : 'bg-[#FAF6EE] text-[#8C5227]'
                            }`}>
                              p.{String(ch.page).padStart(3, '0')}
                            </span>
                            
                            {hasRead && (
                              <span className={`text-[8.5px] font-extrabold flex items-center gap-0.5 ${isActive ? 'text-white' : 'text-emerald-600'}`}>
                                ✓ 已讀
                              </span>
                            )}
                          </div>
                          <h4 className={`text-[10.5px] font-black truncate leading-tight ${isActive ? 'text-white' : 'text-slate-700'}`}>
                            {ch.title}
                          </h4>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right Side: Active Textbook Page Content Area */}
        <div className={`col-span-1 ${isSidebarOpen ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
          <div className="relative min-h-[500px] bg-white rounded-3xl border border-[#FAF3E8] shadow-3xs overflow-hidden flex flex-col justify-between">
            {/* Page content header tab bar */}
            <div className="px-6 py-4 border-b border-[#FAF3E8] bg-[#FAF6EE]/20 flex justify-between items-center text-[10px] text-[#735A45]/80 font-black tracking-widest relative z-10">
              <span className="flex items-center gap-1.5 font-bold">
                📖 泰宇生命教育 ── 總說：凝視生命的地圖
              </span>
              <span className="bg-[#FAF6EE] border border-[#F2E4CF] px-2.5 py-1 rounded-full font-mono text-[#D97706] text-[10.5px] font-black shadow-3xs">
                PAGE {String(currentPage).padStart(3, '0')}
              </span>
            </div>

            {/* Content Area */}
            <div className="p-6 sm:p-8 space-y-6 flex-1 relative z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <span className="text-[9.5px] font-black text-[#A86E42] bg-[#FFF2E3] border border-[#DCA26E]/30 px-2 py-0.5 rounded-md uppercase tracking-wider">
                      {activePageData.tag}
                    </span>
                    <h1 className="text-base sm:text-lg font-black text-[#4A321F]">
                      {activePageData.title}
                    </h1>
                  </div>

                  {/* Core Interactive Textbook Content */}
                  <div className="space-y-5">
                    {renderCustomPageContent(currentPage)}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Elegant Navigation Footer */}
            <div className="p-4 bg-[#FAF6EE]/40 border-t border-[#FAF3E8] flex items-center justify-between z-10 relative">
              <button
                onClick={handlePrev}
                disabled={pages.indexOf(currentPage) === 0}
                className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center gap-1 cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:border-slate-300"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                上一頁
              </button>

              <span className="text-xs font-black text-slate-500 font-sans">
                p. {currentPage} / {pages[pages.length - 1]}
              </span>

              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-xl text-xs font-bold border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center gap-1 cursor-pointer transition-all hover:border-slate-300"
              >
                {pages.indexOf(currentPage) === pages.length - 1 ? '完成單元 ➔' : '下一頁'}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
