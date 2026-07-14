/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, Compass } from 'lucide-react';

interface Unit05TextbookPageViewerProps {
  answers: Record<string, any>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  role: 'student' | 'teacher';
  isSubmitted: boolean;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

export const CHAPTERS_NAV_UNIT_05 = [
  { page: 108, title: "行前閱讀：開啟心靈超能量", tag: "前導", emoji: "✨", desc: "透過一段影片，開啟本單元對靈性修養與人格統整的探索。" },
  { page: 109, title: "行前暖身：5W1H 討論架構", tag: "前導", emoji: "🧩", desc: "認識 When、Where、Who、What、Why、How 六個提問角度。" },
  { page: 110, title: "第1章：點亮心中的光 ─ MIND 田捕手：我還沒有作好被打倒的準備", tag: "第一章", emoji: "🕯️", desc: "「Not Yet」的心態：面對挫折時，還沒有準備好被打倒代表什麼？" },
  { page: 111, title: "一、靈性修養是什麼？ ─ 自我覺察的小體驗", tag: "第一章", emoji: "🧘", desc: "從榮格與柏拉圖的觀點認識靈性修養，並透過靜心一分鐘練習自我覺察。" },
  { page: 112, title: "自我覺察的小體驗（續）", tag: "第一章", emoji: "✍️", desc: "自由書寫三分鐘，並與同學分享覺察後的新發現。" },
  { page: 113, title: "二、靈性修養的目標與方法 ─ 心靈閃亮之處", tag: "第一章", emoji: "💎", desc: "愛與慈悲、智慧、勇健：靈性修養的三大目標與方法。" },
  { page: 114, title: "心靈閃亮之處（續）：自己 vs 他人與社會", tag: "第一章", emoji: "🔄", desc: "從對自己到對他人與社會，練習覺察內心發光的經驗。" },
  { page: 115, title: "心靈閃亮之處：展現關懷、親近自然", tag: "第一章", emoji: "🌿", desc: "展現關懷、實踐服務、親近自然、關愛大地，實踐靈性修養的具體行動。" },
  { page: 116, title: "第2章：做自己的主人 ─ 我有「知行合一」嗎？（上）", tag: "第二章", emoji: "🎯", desc: "透過情境一、二，檢視自己是否真正做到「知道」與「做到」一致。" },
  { page: 117, title: "我有「知行合一」嗎？（下）", tag: "第二章", emoji: "🔍", desc: "延續情境三至六，繼續檢視知行合一的實踐程度。" },
  { page: 118, title: "一、人格統整的重要 ─ 走過愛的蠻荒", tag: "第二章", emoji: "🧬", desc: "從命運、性格、習慣、行為、見解五個層次，認識人格統整的重要性；TFT 創辦人文國士的生命故事。" },
  { page: 119, title: "思考與討論：見解、行為、習慣、性格、命運", tag: "第二章", emoji: "💭", desc: "練習從自己的見解出發，反思如何影響行為、習慣、性格與命運。" },
  { page: 120, title: "二、人格統整的方法 ─ 建立正確見解", tag: "第二章", emoji: "🌟", desc: "海倫凱勒與蘇利文老師的故事：正確的見解如何改變一個人的一生。" },
  { page: 121, title: "建立正確見解（續）：後設思考的歷程", tag: "第二章", emoji: "🔁", desc: "從聽見正確見解、覺察內心、思辨認同，到實踐並累積經驗的完整歷程。" },
  { page: 122, title: "LIFE 心動力 ─ 讓 WOOP 幫助你", tag: "第二章", emoji: "🎈", desc: "運用 Wish、Outcome、Obstacle、Plan 四步驟，把心願化為具體計畫。" },
  { page: 123, title: "第3章：靈性的修練 ─ 一、困難中看見曙光", tag: "第三章", emoji: "🌅", desc: "拳王泰森與愛迪生的故事：計畫好的一切被現實痛擊後，如何在困難中看見曙光？" },
  { page: 124, title: "從困境中學習 ─ 二、慈悲的力量", tag: "第三章", emoji: "💗", desc: "分組討論從困境中學習的經驗，並認識慈悲的力量。" },
  { page: 125, title: "慈悲的力量（續）：哲學與心理學的觀點", tag: "第三章", emoji: "📐", desc: "亞里斯多德倫理學、馬斯洛需求層次理論與儒家思想中的慈悲與自我實現。" },
  { page: 126, title: "三、活出最棒的自己 ─ 宗教的觀點", tag: "第三章", emoji: "🕊️", desc: "基督宗教、佛教、伊斯蘭教如何看待慈悲與活出最好的自己。" },
  { page: 127, title: "LIFE 心動力 ─ Present．當下的禮物（基礎題）", tag: "第三章", emoji: "🎁", desc: "從思辨、道德、目標三個角度，練習活在當下的智慧。" },
  { page: 128, title: "Present．當下的禮物（進階題）", tag: "單元總結", emoji: "🏆", desc: "延伸思考題，為「靈性修養與人格統整」單元畫下完整句點。" }
];

export default function Unit05TextbookPageViewer({
  answers,
  setAnswers,
  role,
  isSubmitted,
  currentPage: controlledPage,
  onPageChange
}: Unit05TextbookPageViewerProps) {
  const [localPage, setLocalPage] = useState<number>(108);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const currentPage = controlledPage !== undefined ? controlledPage : localPage;

  const setCurrentPage = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    } else {
      setLocalPage(page);
    }
    if (role === 'student' && !isSubmitted) {
      const readPages = answers.textbookReadPagesU05 || [108];
      if (!readPages.includes(page)) {
        updateAnswer('textbookReadPagesU05', [...readPages, page]);
      }
    }
  };

  const pages = CHAPTERS_NAV_UNIT_05.map(ch => ch.page);

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

  const updateAnswer = (key: string, val: any) => {
    if (role === 'teacher' || isSubmitted) return;
    setAnswers(prev => ({ ...prev, [key]: val }));
  };

  const readPagesList = answers.textbookReadPagesU05 || [108];
  const readPagesCount = readPagesList.filter((p: number) => pages.includes(p)).length || 1;
  const readPagesTotal = pages.length;

  return (
    <div id="unit05_page_viewer" className="flex flex-col lg:flex-row gap-6 bg-slate-50 p-1 sm:p-3 rounded-2xl min-h-[750px]">

      {isSidebarOpen && (
        <div className="w-full lg:w-80 bg-white border border-slate-100 rounded-2xl p-4.5 space-y-4 shrink-0 shadow-2xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-rose-500" />
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                  單元 05 數位課本導覽
                </h3>
              </div>
              <span className="text-[10px] font-black bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full font-sans">
                p.{String(currentPage).padStart(3, '0')}
              </span>
            </div>

            <div className="bg-slate-50/50 p-3 rounded-xl border border-slate-100 space-y-2">
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-500">
                <span>單元學習進度</span>
                <span>{readPagesCount} / {readPagesTotal} 頁 ({Math.round(readPagesCount / readPagesTotal * 100)}%)</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full transition-all duration-300"
                  style={{ width: `${(readPagesCount / readPagesTotal) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-1.5 pr-1">
              {CHAPTERS_NAV_UNIT_05.map((ch) => {
                const isCurrent = ch.page === currentPage;
                const hasRead = readPagesList.includes(ch.page);
                return (
                  <button
                    key={ch.page}
                    onClick={() => setCurrentPage(ch.page)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs font-bold transition-all flex items-start gap-2.5 ${
                      isCurrent
                        ? 'bg-rose-500 text-white shadow-xs'
                        : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-100/50'
                    }`}
                  >
                    <span className="shrink-0 text-sm mt-0.5">{ch.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className={`text-[9px] font-black uppercase px-1.5 py-0.2 rounded-full ${isCurrent ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                          {ch.tag}
                        </span>
                        <span className="text-[9px] font-mono shrink-0">p.{String(ch.page).padStart(3, '0')}</span>
                      </div>
                      <p className="truncate text-[11px] font-extrabold leading-tight">{ch.title}</p>
                      {isCurrent && (
                        <p className="text-[9px] text-rose-50/90 leading-snug mt-1 font-medium italic line-clamp-2">
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

      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="absolute lg:relative z-10 p-2.5 bg-rose-500 hover:bg-rose-600 text-white rounded-full shadow-md flex items-center justify-center border border-rose-400 self-start"
          title="開啟課本導覽"
        >
          <Menu className="w-4 h-4" />
        </button>
      )}

      <div className="flex-1 bg-white border border-slate-100 rounded-2xl shadow-2xs p-5 sm:p-7 flex flex-col justify-start relative min-w-0">

        <div className="flex items-center justify-between border-b border-slate-50 pb-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
              單元 05：靈性修養與人格統整
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-black text-slate-800">
              {CHAPTERS_NAV_UNIT_05.find(ch => ch.page === currentPage)?.title}
            </span>
          </div>
          <span className="text-xs font-mono font-black text-slate-400">
            P.{String(currentPage).padStart(3, '0')}
          </span>
        </div>

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
              {/* ==================== PAGE 108 ==================== */}
              {currentPage === 108 && (
                <div id="page_108" className="space-y-6">
                  <div className="border-l-4 border-rose-500 pl-4 py-1">
                    <span className="text-[11px] text-rose-600 font-extrabold uppercase tracking-widest block">行前閱讀</span>
                    <h2 className="text-lg font-black text-slate-800">開啟心靈超能量</h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    走過「哲學思考」的理性訓練、「人學探索」的自我認識、「終極關懷」的生命凝視，以及「價值思辨」的道德判斷，本單元要帶你進入內在世界的最深處——靈性修養與人格統整，學習如何真正成為一個完整、發光的自己。
                  </p>
                  <div className="p-4 bg-rose-50/20 border border-rose-100 rounded-xl">
                    <p className="text-xs text-rose-900 font-bold leading-relaxed">
                      💫 靈性，不等於宗教，而是每個人內在都擁有、追求意義與超越的力量。這股力量，能幫助我們在困境中站起來，成為自己人生真正的主人。
                    </p>
                  </div>
                  <div className="space-y-2 border-t border-slate-100 pt-5">
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                      <span className="bg-rose-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                      <span>對你來說，「心靈的力量」是什麼？你曾在什麼時候感受過它的存在？</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p108Q1 || ''}
                      onChange={(e) => updateAnswer('p108Q1', e.target.value)}
                      placeholder="我覺得心靈的力量是那種明明很累、很想放棄，卻還是選擇再撐一下的意志。曾經在考試考差、覺得自己很失敗的時候，靠著這股力量重新振作起來..."
                      rows={3}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-rose-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ==================== PAGE 109 ==================== */}
              {currentPage === 109 && (
                <div id="page_109" className="space-y-6">
                  <div className="border-l-4 border-rose-500 pl-4 py-1">
                    <span className="text-[11px] text-rose-600 font-extrabold uppercase tracking-widest block">行前暖身</span>
                    <h2 className="text-lg font-black text-slate-800">5W1H 討論架構</h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    5W1H 是另一套幫助我們完整思考一件事的提問架構，本單元會不時用到：
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {[
                      { l: 'When', d: '什麼時候' },
                      { l: 'Where', d: '在哪裡' },
                      { l: 'Who', d: '是誰' },
                      { l: 'What', d: '發生了什麼事' },
                      { l: 'Why', d: '為什麼' },
                      { l: 'How', d: '如何進行、如何解決' }
                    ].map((item) => (
                      <div key={item.l} className="bg-slate-50 border border-slate-100 p-3 rounded-xl text-center">
                        <span className="text-xs font-black text-rose-700 block">{item.l}</span>
                        <span className="text-[10px] text-slate-500">{item.d}</span>
                      </div>
                    ))}
                  </div>
                  <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-600 leading-relaxed font-medium">
                    練習用 5W1H 拆解一則你最近在社群媒體上看到、印象深刻的貼文或新聞。
                  </div>
                </div>
              )}

              {/* ==================== PAGE 110 ==================== */}
              {currentPage === 110 && (
                <div id="page_110" className="space-y-6">
                  <div className="border-l-4 border-rose-500 pl-4 py-1">
                    <span className="text-[11px] text-rose-600 font-extrabold uppercase tracking-widest block">第 1 章</span>
                    <h2 className="text-lg font-black text-slate-800">點亮心中的光 ─ MIND 田捕手：我還沒有作好被打倒的準備</h2>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-3">
                    <div className="flex gap-2.5 items-center text-slate-800">
                      <span className="text-2xl">🕯️</span>
                      <h4 className="text-xs font-extrabold">「Not Yet」的心態</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      人生難免遭遇重擊：落榜、失戀、生病、失去至親。但正如「還沒有作好被打倒的準備」這句話所傳達的：跌倒不等於認輸，只要心裡那盞光還沒熄滅，就永遠有重新站起來的可能。
                    </p>
                  </div>
                  <div className="space-y-2 border-t border-slate-100 pt-5">
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                      <span className="bg-rose-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                      <span>回想一次你「還沒有準備好被打倒」、最後重新站起來的經驗。</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p110Q1 || ''}
                      onChange={(e) => updateAnswer('p110Q1', e.target.value)}
                      placeholder="段考失利到覺得自己什麼都不行的時候，我告訴自己『這只是還沒準備好被打倒』，重新調整讀書方法，慢慢又找回了信心..."
                      rows={3}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-rose-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ==================== PAGE 111 ==================== */}
              {currentPage === 111 && (
                <div id="page_111" className="space-y-6">
                  <div className="border-l-4 border-rose-500 pl-4 py-1">
                    <span className="text-[11px] text-rose-600 font-extrabold uppercase tracking-widest block">第 1 章</span>
                    <h2 className="text-lg font-black text-slate-800">一、靈性修養是什麼？ ─ 自我覺察的小體驗</h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    心理學家榮格（Carl Jung）與哲學家柏拉圖（Plato）都曾探討過「內在自我」的深層力量：靈性修養，就是持續向內探索、覺察自己內心真實狀態的能力。
                  </p>
                  <div className="bg-slate-50 border border-slate-100 p-4.5 rounded-2xl space-y-2">
                    <h4 className="text-xs font-black text-slate-800">PART 01・靜心一分鐘</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">找一個安靜的地方，閉上眼睛，專注呼吸一分鐘。結束後，寫下這一分鐘裡浮現的念頭或感受：</p>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p111Q1 || ''}
                      onChange={(e) => updateAnswer('p111Q1', e.target.value)}
                      placeholder="一開始腦中很多雜念，想著等一下要交的作業，但慢慢地呼吸讓我平靜下來，心裡浮現一種難得的安穩感..."
                      rows={3}
                      className="w-full text-xs p-2.5 border border-slate-200 focus:border-rose-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ==================== PAGE 112 ==================== */}
              {currentPage === 112 && (
                <div id="page_112" className="space-y-6">
                  <div className="border-l-4 border-rose-500 pl-4 py-1">
                    <span className="text-[11px] text-rose-600 font-extrabold uppercase tracking-widest block">第 1 章</span>
                    <h2 className="text-lg font-black text-slate-800">自我覺察的小體驗（續）</h2>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-4.5 rounded-2xl space-y-2">
                    <h4 className="text-xs font-black text-slate-800">PART 02・自由書寫三分鐘</h4>
                    <p className="text-[11px] text-slate-500 leading-relaxed">不設限地寫下腦中浮現的任何想法，不用在意文法或邏輯，讓思緒自然流動：</p>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p112Write || ''}
                      onChange={(e) => updateAnswer('p112Write', e.target.value)}
                      placeholder="自由書寫你此刻腦中浮現的任何念頭..."
                      rows={4}
                      className="w-full text-xs p-2.5 border border-slate-200 focus:border-rose-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-800 block">PART 03・分享新發現：這次書寫中，你有沒有發現什麼平常沒注意到的自己？</label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p112Discover || ''}
                      onChange={(e) => updateAnswer('p112Discover', e.target.value)}
                      placeholder="發現自己其實一直很在意別人的看法，寫著寫著才意識到，我很多決定都是為了別人的期待，而不是自己真正想要的..."
                      rows={2.5}
                      className="w-full text-xs p-2.5 border border-slate-200 focus:border-rose-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ==================== PAGE 113 ==================== */}
              {currentPage === 113 && (
                <div id="page_113" className="space-y-6">
                  <div className="border-l-4 border-rose-500 pl-4 py-1">
                    <span className="text-[11px] text-rose-600 font-extrabold uppercase tracking-widest block">第 1 章</span>
                    <h2 className="text-lg font-black text-slate-800">二、靈性修養的目標與方法 ─ 心靈閃亮之處</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-pink-50/10 border border-pink-100 p-3.5 rounded-xl space-y-1">
                      <span className="text-lg">💗</span>
                      <h4 className="text-xs font-black text-pink-900">愛與慈悲</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">以同理心關懷他人。有愛與慈悲才能關懷、幫助他人，不只自己得到幸福，並幫助更多人得到幸福。</p>
                    </div>
                    <div className="bg-blue-50/10 border border-blue-100 p-3.5 rounded-xl space-y-1">
                      <span className="text-lg">🧠</span>
                      <h4 className="text-xs font-black text-blue-900">智慧</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">時時覺察，做正確的判斷與抉擇。有智慧才能在面對問題時做出正確的抉擇。</p>
                    </div>
                    <div className="bg-amber-50/10 border border-amber-100 p-3.5 rounded-xl space-y-1">
                      <span className="text-lg">💪</span>
                      <h4 className="text-xs font-black text-amber-900">勇健</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">堅持信念、不怕困難。在生命的挑戰與境界中精勤努力，堅持不放棄心中的理想。</p>
                    </div>
                  </div>
                  <div className="space-y-2 border-t border-slate-100 pt-5">
                    <label className="text-xs font-black text-slate-800 block">💎 心靈閃亮之處：寫下一次「內心發光」的經驗（愛與慈悲／智慧／勇健，任選一個向度）</label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p113Shine || ''}
                      onChange={(e) => updateAnswer('p113Shine', e.target.value)}
                      placeholder="向度：勇健。經驗：練習長跑時最累的最後一圈，明明想放棄卻還是咬牙撐完，那一刻覺得自己心裡有股從沒發現過的堅韌..."
                      rows={3}
                      className="w-full text-xs p-2.5 border border-slate-200 focus:border-rose-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ==================== PAGE 114 ==================== */}
              {currentPage === 114 && (
                <div id="page_114" className="space-y-6">
                  <div className="border-l-4 border-rose-500 pl-4 py-1">
                    <span className="text-[11px] text-rose-600 font-extrabold uppercase tracking-widest block">第 1 章</span>
                    <h2 className="text-lg font-black text-slate-800">心靈閃亮之處（續）：自己 vs 他人與社會</h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    靈性修養的實踐，可以分成對「自己」以及對「他人與社會」兩個方向：
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1.5">
                      <h4 className="text-xs font-black text-slate-800">對自己</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">時時傾聽，覺察心念；心懷感恩，代人著想。</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1.5">
                      <h4 className="text-xs font-black text-slate-800">對他人與社會</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">展現關懷，實踐服務；親近自然，關愛大地。</p>
                    </div>
                  </div>
                  <div className="space-y-2 border-t border-slate-100 pt-5">
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                      <span className="bg-rose-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                      <span>這四項實踐（傾聽覺察／心懷感恩／展現關懷／親近自然）中，你目前做得最好的是哪一項？最想加強的又是哪一項？</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p114Q1 || ''}
                      onChange={(e) => updateAnswer('p114Q1', e.target.value)}
                      placeholder="我覺得自己『心懷感恩』做得還不錯，常常會記得跟家人說謝謝；但『親近自然』做得比較少，之後想多花時間去戶外走走..."
                      rows={3}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-rose-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ==================== PAGE 115 ==================== */}
              {currentPage === 115 && (
                <div id="page_115" className="space-y-6">
                  <div className="border-l-4 border-rose-500 pl-4 py-1">
                    <span className="text-[11px] text-rose-600 font-extrabold uppercase tracking-widest block">第 1 章</span>
                    <h2 className="text-lg font-black text-slate-800">心靈閃亮之處：展現關懷、親近自然</h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    整合本章所學：愛與慈悲、智慧、勇健這三大目標，需要透過「時時傾聽、覺察心念」「心懷感恩、代人著想」「展現關懷、實踐服務」「親近自然、關愛大地」這四種具體方法，才能真正落實在生活中。
                  </p>
                  <div className="space-y-2 border-t border-slate-100 pt-5">
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                      <span className="bg-rose-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                      <span>寫下一個你這週可以具體實踐「展現關懷」或「親近自然」的小行動。</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p115Q1 || ''}
                      onChange={(e) => updateAnswer('p115Q1', e.target.value)}
                      placeholder="這週我想主動關心一位最近看起來心情不好的同學，也想找一天不滑手機，去附近的公園散步半小時..."
                      rows={2.5}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-rose-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ==================== PAGE 116 ==================== */}
              {currentPage === 116 && (
                <div id="page_116" className="space-y-6">
                  <div className="border-l-4 border-rose-500 pl-4 py-1">
                    <span className="text-[11px] text-rose-600 font-extrabold uppercase tracking-widest block">第 2 章</span>
                    <h2 className="text-lg font-black text-slate-800">做自己的主人 ─ LIFE 心動力｜我有「知行合一」嗎？｜（上）</h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    「知行合一」指的是：我們心裡「知道」該怎麼做，實際行動時卻不一定「做到」。以下情境，檢視自己是否知行合一：
                  </p>
                  <div className="space-y-3">
                    <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1.5">
                      <h4 className="text-xs font-black text-slate-800">情境一：熬夜滑手機</h4>
                      <p className="text-[11px] text-slate-500">明明知道熬夜對健康不好，卻還是忍不住滑手機到很晚。</p>
                      <textarea disabled={role === 'teacher' || isSubmitted} value={answers.p116S1 || ''} onChange={(e) => updateAnswer('p116S1', e.target.value)} placeholder="我常常這樣，知道歸知道，做起來卻很難克制..." rows={2} className="w-full text-xs p-2.5 border border-slate-200 focus:border-rose-500 rounded-xl outline-none leading-relaxed" />
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1.5">
                      <h4 className="text-xs font-black text-slate-800">情境二：答應卻拖延的承諾</h4>
                      <p className="text-[11px] text-slate-500">答應朋友或家人要做的事，卻一拖再拖。</p>
                      <textarea disabled={role === 'teacher' || isSubmitted} value={answers.p116S2 || ''} onChange={(e) => updateAnswer('p116S2', e.target.value)} placeholder="答應媽媽要整理房間，結果拖了快一個禮拜才動手..." rows={2} className="w-full text-xs p-2.5 border border-slate-200 focus:border-rose-500 rounded-xl outline-none leading-relaxed" />
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== PAGE 117 ==================== */}
              {currentPage === 117 && (
                <div id="page_117" className="space-y-6">
                  <div className="border-l-4 border-rose-500 pl-4 py-1">
                    <span className="text-[11px] text-rose-600 font-extrabold uppercase tracking-widest block">第 2 章</span>
                    <h2 className="text-lg font-black text-slate-800">我有「知行合一」嗎？（下）</h2>
                  </div>
                  <div className="space-y-3">
                    {[
                      { id: 'S3', title: '情境三：知道該運動卻總是懶得動', ph: '知道運動對身體好，也想維持體態，但一到假日就整天躺在床上...' },
                      { id: 'S4', title: '情境四：知道該說對不起卻拉不下臉', ph: '和朋友吵架後明明是自己不對，卻因為面子問題遲遲不肯道歉...' },
                      { id: 'S5', title: '情境五：知道該省錢卻忍不住花費', ph: '想存錢買想要的東西，卻常常忍不住手滑買了不必要的小東西...' },
                      { id: 'S6', title: '情境六：知道該早睡卻習慣晚睡', ph: '每天告訴自己今天要早點睡，結果還是滑手機滑到凌晨...' }
                    ].map((item) => (
                      <div key={item.id} className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1.5">
                        <h4 className="text-xs font-black text-slate-800">{item.title}</h4>
                        <textarea disabled={role === 'teacher' || isSubmitted} value={answers[`p117${item.id}`] || ''} onChange={(e) => updateAnswer(`p117${item.id}`, e.target.value)} placeholder={item.ph} rows={2} className="w-full text-xs p-2.5 border border-slate-200 focus:border-rose-500 rounded-xl outline-none leading-relaxed" />
                      </div>
                    ))}
                  </div>
                  <div className="p-3.5 bg-amber-50/20 border border-amber-100 rounded-xl text-xs text-amber-900 font-bold leading-relaxed">
                    💡 「做自己的主人」，正是從縮小這些「知道」與「做到」的落差開始練習的。
                  </div>
                </div>
              )}

              {/* ==================== PAGE 118 ==================== */}
              {currentPage === 118 && (
                <div id="page_118" className="space-y-6">
                  <div className="border-l-4 border-rose-500 pl-4 py-1">
                    <span className="text-[11px] text-rose-600 font-extrabold uppercase tracking-widest block">第 2 章</span>
                    <h2 className="text-lg font-black text-slate-800">一、人格統整的重要 ─ 走過愛的蠻荒</h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    一個人的「見解」，會影響他的「行為」；行為累積成「習慣」；習慣塑造出「性格」；性格最終決定了「命運」。以「為了當醫生而努力的小文」為例：
                  </p>
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4.5 overflow-x-auto">
                    <table className="w-full text-[11px] border-collapse min-w-[380px]">
                      <tbody>
                        <tr className="border-b border-slate-200"><td className="py-2 px-2 font-black text-slate-800 w-16">見解</td><td className="py-2 px-2 text-slate-600">有自己的信念與目標，心靈的力量能超越困境</td></tr>
                        <tr className="border-b border-slate-200"><td className="py-2 px-2 font-black text-slate-800">行為</td><td className="py-2 px-2 text-slate-600">為了想成為醫生找到治好癌症的解藥，努力學習</td></tr>
                        <tr className="border-b border-slate-200"><td className="py-2 px-2 font-black text-slate-800">習慣</td><td className="py-2 px-2 text-slate-600">認真學習與投入科學研究，有問題向老師發問</td></tr>
                        <tr className="border-b border-slate-200"><td className="py-2 px-2 font-black text-slate-800">性格</td><td className="py-2 px-2 text-slate-600">個性穩重，不輕易受別人影響，且能鼓勵他人</td></tr>
                        <tr><td className="py-2 px-2 font-black text-slate-800">命運</td><td className="py-2 px-2 text-slate-600">積極的人生觀，開創自己的未來</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-4.5 rounded-2xl space-y-2">
                    <h4 className="text-xs font-black text-slate-800">💫 走過愛的蠻荒 ─ 為台灣而教（TFT）創辦人文國士</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      文國士（國國老師）曾成長於困頓、缺乏支持的家庭環境，卻選擇用愛與教育翻轉自己與偏鄉孩子的生命，創辦了為台灣而教（Teach For Taiwan）計畫，正是「見解」如何一步步塑造「命運」的最佳例證。
                    </p>
                  </div>
                </div>
              )}

              {/* ==================== PAGE 119 ==================== */}
              {currentPage === 119 && (
                <div id="page_119" className="space-y-6">
                  <div className="border-l-4 border-rose-500 pl-4 py-1">
                    <span className="text-[11px] text-rose-600 font-extrabold uppercase tracking-widest block">第 2 章</span>
                    <h2 className="text-lg font-black text-slate-800">思考與討論：見解、行為、習慣、性格、命運</h2>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                      <span className="bg-rose-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                      <span>回顧文國士老師的故事，是什麼樣的「見解」，讓他選擇走上這條翻轉生命的路？</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p119Q1 || ''}
                      onChange={(e) => updateAnswer('p119Q1', e.target.value)}
                      placeholder="我覺得他相信『每個孩子的生命都值得被好好對待』，正是這個信念，讓他選擇用愛與教育去翻轉自己也翻轉別人的命運..."
                      rows={2.5}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-rose-500 rounded-xl outline-none leading-relaxed"
                    />
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed pt-2">
                      <span className="bg-rose-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">2</span>
                      <span>套用「見解→行為→習慣→性格→命運」這個架構，寫下你自己的一段故事。</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p119Q2 || ''}
                      onChange={(e) => updateAnswer('p119Q2', e.target.value)}
                      placeholder="見解：我相信努力可以改變結果。行為：每天多花半小時複習弱科。習慣：養成每天固定複習的習慣。性格：變得更有耐心、不輕易放棄。命運：漸漸成為一個願意為目標堅持的人..."
                      rows={3.5}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-rose-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ==================== PAGE 120 ==================== */}
              {currentPage === 120 && (
                <div id="page_120" className="space-y-6">
                  <div className="border-l-4 border-rose-500 pl-4 py-1">
                    <span className="text-[11px] text-rose-600 font-extrabold uppercase tracking-widest block">第 2 章</span>
                    <h2 className="text-lg font-black text-slate-800">二、人格統整的方法 ─ 建立正確見解</h2>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-3">
                    <div className="flex gap-2.5 items-center text-slate-800">
                      <span className="text-2xl">🌟</span>
                      <h4 className="text-xs font-extrabold">海倫凱勒與蘇利文老師</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      海倫・凱勒（Helen Adams Keller）自幼失明失聰，一度活在黑暗與沉默的絕望中。老師安・蘇利文（Anne Sullivan Macy）耐心地在她手心拼寫單字，幫助她建立起「萬物皆有名字、皆可理解」的正確見解。這個見解徹底改變了海倫的命運，讓她從封閉走向開放，最終成為激勵世人的作家與演說家。
                    </p>
                  </div>
                </div>
              )}

              {/* ==================== PAGE 121 ==================== */}
              {currentPage === 121 && (
                <div id="page_121" className="space-y-6">
                  <div className="border-l-4 border-rose-500 pl-4 py-1">
                    <span className="text-[11px] text-rose-600 font-extrabold uppercase tracking-widest block">第 2 章</span>
                    <h2 className="text-lg font-black text-slate-800">建立正確見解（續）：後設思考的歷程</h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    建立正確見解，需要經歷一段完整的「後設思考」歷程：從老師、智者聽到正確的見解 → 不斷覺察內心、觀察自己原本的想法 → 思辨何者正確（解決疑惑）→ 認同並改變自己 → 依照所學見解去實踐 → 友伴同行支持、累積經驗 → 確立此見解的正確性，進而更進一步學習。
                  </p>
                  <div className="space-y-2 border-t border-slate-100 pt-5">
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                      <span className="bg-rose-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                      <span>你是否曾經歷過類似的「後設思考」歷程——原本相信某件事，後來因為某個契機而改觀？寫下這段經過。</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p121Q1 || ''}
                      onChange={(e) => updateAnswer('p121Q1', e.target.value)}
                      placeholder="以前覺得跟不上進度就是能力不好，直到老師跟我說『每個人的節奏不同』，我開始覺察自己是不是太苛責自己，後來願意用自己的步調前進，發現心情反而更輕鬆..."
                      rows={3.5}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-rose-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ==================== PAGE 122 ==================== */}
              {currentPage === 122 && (
                <div id="page_122" className="space-y-6">
                  <div className="border-l-4 border-rose-500 pl-4 py-1">
                    <span className="text-[11px] text-rose-600 font-extrabold uppercase tracking-widest block">第 2 章</span>
                    <h2 className="text-lg font-black text-slate-800">LIFE 心動力 ─ 讓 WOOP 幫助你</h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    心理學家歐廷珍（Gabriele Oettingen）提出的 WOOP 心理對比法，是把心願化為行動的實用工具：Wish（願望）、Outcome（結果）、Obstacle（障礙）、Plan（計畫，以「如果⋯就⋯」的形式）。
                  </p>
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4.5 space-y-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-slate-700">W｜Wish 我的願望：</label>
                      <input disabled={role === 'teacher' || isSubmitted} value={answers.p122W || ''} onChange={(e) => updateAnswer('p122W', e.target.value)} placeholder="例如：我想維持穩定的讀書節奏，不再臨時抱佛腳" className="w-full text-xs p-2.5 border border-slate-200 focus:border-rose-500 rounded-xl outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-slate-700">O｜Outcome 達成後最棒的結果：</label>
                      <input disabled={role === 'teacher' || isSubmitted} value={answers.p122O || ''} onChange={(e) => updateAnswer('p122O', e.target.value)} placeholder="例如：考前不再焦慮，也對自己更有信心" className="w-full text-xs p-2.5 border border-slate-200 focus:border-rose-500 rounded-xl outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-slate-700">O｜Obstacle 內在的阻礙：</label>
                      <input disabled={role === 'teacher' || isSubmitted} value={answers.p122O2 || ''} onChange={(e) => updateAnswer('p122O2', e.target.value)} placeholder="例如：一放學就想先滑手機放鬆，結果一滑就停不下來" className="w-full text-xs p-2.5 border border-slate-200 focus:border-rose-500 rounded-xl outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-slate-700">P｜Plan 如果⋯，我就⋯：</label>
                      <input disabled={role === 'teacher' || isSubmitted} value={answers.p122P || ''} onChange={(e) => updateAnswer('p122P', e.target.value)} placeholder="例如：如果放學想先滑手機，我就先設定 15 分鐘鬧鐘，時間到就開始讀書" className="w-full text-xs p-2.5 border border-slate-200 focus:border-rose-500 rounded-xl outline-none" />
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== PAGE 123 ==================== */}
              {currentPage === 123 && (
                <div id="page_123" className="space-y-6">
                  <div className="border-l-4 border-rose-500 pl-4 py-1">
                    <span className="text-[11px] text-rose-600 font-extrabold uppercase tracking-widest block">第 3 章</span>
                    <h2 className="text-lg font-black text-slate-800">靈性的修練 ─ 一、困難中看見曙光</h2>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-4.5 rounded-2xl space-y-2">
                    <p className="text-xs text-slate-600 leading-relaxed font-medium italic">
                      拳王麥克・泰森（Mike Tyson）曾說：「在被迎面痛擊之前，每個人都有自己一套計畫（Everybody has a plan until they get punched in the mouth）。」
                    </p>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    人生的計畫，往往在現實的重擊下被打亂。發明家愛迪生（Thomas Alva Edison）研發電燈泡歷經上千次失敗，卻始終相信每一次失敗都是「找到一種行不通的方法」——真正的靈性修練，就是在計畫被打亂、遭受重擊之後，依然能在困難中看見曙光。
                  </p>
                  <div className="space-y-2 border-t border-slate-100 pt-5">
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                      <span className="bg-rose-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                      <span>你有沒有一個「計畫被現實痛擊」的經驗？後來你怎麼重新調整、看見曙光？</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p123Q1 || ''}
                      onChange={(e) => updateAnswer('p123Q1', e.target.value)}
                      placeholder="原本計畫好的社團成果發表，因為臨時場地取消而全部打亂，一開始很挫折，後來大家一起討論，反而想出更有創意的替代方案..."
                      rows={3}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-rose-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ==================== PAGE 124 ==================== */}
              {currentPage === 124 && (
                <div id="page_124" className="space-y-6">
                  <div className="border-l-4 border-rose-500 pl-4 py-1">
                    <span className="text-[11px] text-rose-600 font-extrabold uppercase tracking-widest block">第 3 章</span>
                    <h2 className="text-lg font-black text-slate-800">從困境中學習 ─ 二、慈悲的力量</h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    走過困境的人，往往比別人更能體會他人的痛苦——這正是「慈悲的力量」：因為自己受過傷，所以更懂得如何溫柔地陪伴另一個受傷的人。
                  </p>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-800 block">👥 分組討論：分享一次你「因為自己走過某個困境，而更能理解、幫助他人」的經驗。</label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p124Q1 || ''}
                      onChange={(e) => updateAnswer('p124Q1', e.target.value)}
                      placeholder="因為自己曾經在班上被排擠過，看到有同學也被孤立時，特別能感同身受，也更願意主動去關心、陪伴他..."
                      rows={3}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-rose-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ==================== PAGE 125 ==================== */}
              {currentPage === 125 && (
                <div id="page_125" className="space-y-6">
                  <div className="border-l-4 border-rose-500 pl-4 py-1">
                    <span className="text-[11px] text-rose-600 font-extrabold uppercase tracking-widest block">第 3 章</span>
                    <h2 className="text-lg font-black text-slate-800">慈悲的力量（續）：哲學與心理學的觀點</h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    不同的思想體系，都指向類似的「自我實現」與「至善」境界：
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-purple-50/10 border border-purple-100 p-3.5 rounded-xl space-y-1">
                      <h4 className="text-xs font-black text-purple-900">哲學 ─ 亞里斯多德倫理學</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">透過德行的實踐，逐步邁向人生至善的圓滿境界（Eudaimonia）。</p>
                    </div>
                    <div className="bg-teal-50/10 border border-teal-100 p-3.5 rounded-xl space-y-1">
                      <h4 className="text-xs font-black text-teal-900">心理學 ─ 馬斯洛需求層次理論</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">從生理、安全、情感歸屬、尊重、認知了解、美感需求，一路提升到自我實現與超自我實現（高峰體驗、靈性成長）。</p>
                    </div>
                  </div>
                  <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-600 leading-relaxed font-medium">
                    儒家思想同樣強調透過修身，逐步達到自我完善與利他兼善天下的至善境界，與這兩套理論可以互相呼應。
                  </div>
                </div>
              )}

              {/* ==================== PAGE 126 ==================== */}
              {currentPage === 126 && (
                <div id="page_126" className="space-y-6">
                  <div className="border-l-4 border-rose-500 pl-4 py-1">
                    <span className="text-[11px] text-rose-600 font-extrabold uppercase tracking-widest block">第 3 章</span>
                    <h2 className="text-lg font-black text-slate-800">三、活出最棒的自己 ─ 宗教的觀點</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-blue-50/10 border border-blue-100 p-3.5 rounded-xl space-y-1">
                      <span className="text-lg">✝️</span>
                      <h4 className="text-xs font-black text-blue-900">基督宗教</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">強調愛人如己，透過信仰與恩典活出豐盛的生命。</p>
                    </div>
                    <div className="bg-orange-50/10 border border-orange-100 p-3.5 rounded-xl space-y-1">
                      <span className="text-lg">☸️</span>
                      <h4 className="text-xs font-black text-orange-900">佛教</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">透過慈悲與智慧的修行，超脫煩惱，活出清淨自在的生命。</p>
                    </div>
                    <div className="bg-emerald-50/10 border border-emerald-100 p-3.5 rounded-xl space-y-1">
                      <span className="text-lg">☪️</span>
                      <h4 className="text-xs font-black text-emerald-900">伊斯蘭教</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">強調順服與行善，透過信仰的實踐活出正直、有紀律的一生。</p>
                    </div>
                  </div>
                  <div className="space-y-2 border-t border-slate-100 pt-5">
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                      <span className="bg-rose-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                      <span>不論有無特定信仰，綜合哲學、心理學與宗教的觀點，你認為「活出最棒的自己」需要具備什麼？</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p126Q1 || ''}
                      onChange={(e) => updateAnswer('p126Q1', e.target.value)}
                      placeholder="我覺得需要持續認識自己、對他人保有慈悲與善意，並且不放棄向更好的自己邁進，這些看似不同的思想，其實都在說同一件事..."
                      rows={3}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-rose-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ==================== PAGE 127 ==================== */}
              {currentPage === 127 && (
                <div id="page_127" className="space-y-6">
                  <div className="border-l-4 border-rose-500 pl-4 py-1">
                    <span className="text-[11px] text-rose-600 font-extrabold uppercase tracking-widest block">第 3 章</span>
                    <h2 className="text-lg font-black text-slate-800">LIFE 心動力 ─ Present．當下的禮物（基礎題）</h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    英文中「Present」同時有「當下」與「禮物」的意思——活在當下，本身就是一份禮物。從思辨、道德、目標三個角度，練習活出當下：
                  </p>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-slate-700">🧩 思辨：對你來說，「活在當下」跟「規劃未來」會互相矛盾嗎？為什麼？</label>
                      <textarea disabled={role === 'teacher' || isSubmitted} value={answers.p127Think || ''} onChange={(e) => updateAnswer('p127Think', e.target.value)} placeholder="我覺得不矛盾，規劃未來讓我有方向，但真正投入眼前的每一步，才是讓計畫真正實現的方式..." rows={2.5} className="w-full text-xs p-2.5 border border-slate-200 focus:border-rose-500 rounded-xl outline-none leading-relaxed" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-slate-700">⚖️ 道德：如果只活在當下、不顧未來後果，可能帶來什麼問題？</label>
                      <textarea disabled={role === 'teacher' || isSubmitted} value={answers.p127Moral || ''} onChange={(e) => updateAnswer('p127Moral', e.target.value)} placeholder="可能會為了眼前的享樂做出傷害自己或他人的選擇，忽略長遠的責任..." rows={2.5} className="w-full text-xs p-2.5 border border-slate-200 focus:border-rose-500 rounded-xl outline-none leading-relaxed" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-slate-700">🎯 目標：今天，你想送給自己什麼「當下的禮物」？</label>
                      <textarea disabled={role === 'teacher' || isSubmitted} value={answers.p127Goal || ''} onChange={(e) => updateAnswer('p127Goal', e.target.value)} placeholder="今天想給自己一段不滑手機、好好吃一頓飯的時間，專心感受食物的味道與陪伴的人..." rows={2.5} className="w-full text-xs p-2.5 border border-slate-200 focus:border-rose-500 rounded-xl outline-none leading-relaxed" />
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== PAGE 128 ==================== */}
              {currentPage === 128 && (
                <div id="page_128" className="space-y-6">
                  <div className="border-l-4 border-rose-500 pl-4 py-1">
                    <span className="text-[11px] text-rose-600 font-extrabold uppercase tracking-widest block">單元總結</span>
                    <h2 className="text-lg font-black text-slate-800">Present．當下的禮物（進階題）</h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    走完「靈性修養與人格統整」這個單元，從點亮心中的光、做自己的主人，到靈性的修練，做最後的整合反思：
                  </p>
                  <div className="space-y-2 border-t border-slate-100 pt-5">
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                      <span className="bg-rose-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                      <span>整個單元中，哪一個概念或故事（Not Yet、WOOP、文國士、泰森與愛迪生⋯）對你的啟發最大？為什麼？</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p128Q1 || ''}
                      onChange={(e) => updateAnswer('p128Q1', e.target.value)}
                      placeholder="我最有感觸的是 WOOP 心理對比法，因為它讓我發現，光是有願望不夠，還要誠實面對自己的內在阻礙，才能真正訂出可行的計畫..."
                      rows={3}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-rose-500 rounded-xl outline-none leading-relaxed"
                    />
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed pt-2">
                      <span className="bg-rose-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">2</span>
                      <span>走完「總說」到「靈性修養與人格統整」全部六個單元，用一句話，寫下你現在最想送給自己的一句生命宣言。</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p128Q2 || ''}
                      onChange={(e) => updateAnswer('p128Q2', e.target.value)}
                      placeholder="無論跌倒幾次，我都還沒有作好被打倒的準備，我會帶著這份心中的光，繼續勇敢航向屬於自己的人生。"
                      rows={2.5}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-rose-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
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
            ← 上一頁
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
                      ? 'bg-rose-500 text-white shadow-3xs scale-105'
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
            className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 whitespace-nowrap"
          >
            {pages.indexOf(currentPage) === pages.length - 1 ? '完成單元 ➔' : '下一頁 →'}
          </button>
        </div>

      </div>

    </div>
  );
}
