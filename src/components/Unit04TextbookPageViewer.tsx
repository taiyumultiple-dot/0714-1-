/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu,
  Compass,
  Scale,
  Sparkles,
  Heart,
  Eye
} from 'lucide-react';

interface Unit04TextbookPageViewerProps {
  answers: Record<string, any>;
  setAnswers: React.Dispatch<React.SetStateAction<Record<string, any>>>;
  role: 'student' | 'teacher';
  isSubmitted: boolean;
  currentPage?: number;
  onPageChange?: (page: number) => void;
}

export const CHAPTERS_NAV_UNIT_04 = [
  { page: 82, title: "行前閱讀：掌握智慧方向盤", tag: "前導", emoji: "🧭", desc: "撿到十四萬現金該怎麼辦？博鈞與可華在楓葉下的道德兩難對話。" },
  { page: 83, title: "行前暖身：ORID 討論法暖身", tag: "前導", emoji: "📝", desc: "認識 O 客觀事實、R 感受反應、I 詮釋、D 決定行動的討論架構。" },
  { page: 84, title: "第1章：思考與判斷 ─ ORID 討論法", tag: "第一章", emoji: "🧩", desc: "用 ORID 四步驟拆解一個道德情境，練習有條理地思考與判斷。" },
  { page: 85, title: "LIFE 心動力 ─ 道德行為想一想", tag: "第一章", emoji: "🤔", desc: "檢視日常八個行為，練習分辨哪些屬於道德範疇、哪些不是。" },
  { page: 86, title: "一、什麼是道德的行為？", tag: "第一章", emoji: "⚖️", desc: "區分「行為的對錯」與「人的善惡」：判斷是否涉及社會制度與法律規範。" },
  { page: 87, title: "二、心中的那把尺 ─ MIND 田捕手：不問問題的人", tag: "第一章", emoji: "🧠", desc: "漢娜・鄂蘭「平庸的邪惡」：艾希曼為何只是「服從命令」卻犯下大惡？" },
  { page: 88, title: "LIFE 心動力 ─ 如果是你，你會怎麼做？", tag: "第一章", emoji: "🎭", desc: "面對權威指令與良心衝突的情境，換做是你會如何抉擇？" },
  { page: 89, title: "三大倫理學理論：效益論、義務論、德行論", tag: "第一章", emoji: "📚", desc: "邊沁的效益論、康德的義務論、亞里斯多德的德行論，三種判斷道德的角度。" },
  { page: 90, title: "第2章：真理，越「辨」越明 ─ 公德？私德？", tag: "第二章", emoji: "🏙️", desc: "區分公領域與私領域的道德界線，認識「公德」與「私德」的差異。" },
  { page: 91, title: "公德私德情境大挑戰", tag: "第二章", emoji: "🗑️", desc: "亂丟垃圾、房間惡臭、當眾放閃，這些行為究竟屬於公德還是私德？" },
  { page: 92, title: "一、站在十字路口 ─ MIND 田捕手：錢買不到的東西", tag: "第二章", emoji: "🛤️", desc: "反思有些珍貴的事物，是金錢與利益永遠無法衡量、購買的。" },
  { page: 93, title: "LIFE 心動力 ─ 生活中的兩難", tag: "第二章", emoji: "🎲", desc: "從日常生活情境出發，練習分析道德兩難背後的價值衝突。" },
  { page: 94, title: "YouBike 情境思辨", tag: "第二章", emoji: "🚲", desc: "共享單車亂停放的兩難情境，思考個人便利與公共秩序的拉扯。" },
  { page: 95, title: "二、迷思？迷失？ ─ 迷思一：合法的就是對的", tag: "第二章", emoji: "❓", desc: "法律與道德不完全相等，合法的事不一定就是對的事。" },
  { page: 96, title: "迷思二、三：從眾與主觀感受的陷阱", tag: "第二章", emoji: "📱", desc: "「大家都做的事就是對的事」與「我覺得對就是對」，這兩種迷思的盲點在哪？" },
  { page: 97, title: "三、這是行為對錯還是道德善惡？ ─ 道德心智圖", tag: "第二章", emoji: "🗺️", desc: "練習畫出道德心智圖，釐清人物、行為與道德層面的關聯。" },
  { page: 98, title: "四、愛與智慧的選擇（上）", tag: "第二章", emoji: "💡", desc: "不要傷害任何人、讓事情更美好、尊重別人：道德抉擇的三個基本原則。" },
  { page: 99, title: "四、愛與智慧的選擇（下）", tag: "第二章", emoji: "🤝", desc: "要公平、要愛人做和平大使、要心存感恩：延續道德抉擇的實踐原則。" },
  { page: 100, title: "第3章：生活中的真善美 ─ 一、發現美的眼睛", tag: "第三章", emoji: "👀", desc: "美不只在遠方風景裡，練習用一雙發現美的眼睛看待日常生活。" },
  { page: 101, title: "LIFE 心動力 ─ 美麗心世界", tag: "第三章", emoji: "🌈", desc: "從 A 到 J，寫下十個你曾在生活中發現的「美」的瞬間。" },
  { page: 102, title: "美麗心世界（續）", tag: "第三章", emoji: "✨", desc: "繼續紀錄生活中美的瞬間，練習擴展對「美」的定義與敏感度。" },
  { page: 103, title: "美麗心世界：總結與分享", tag: "第三章", emoji: "💬", desc: "回顧自己寫下的美麗瞬間，並與同學分享彼此發現美的角度。" },
  { page: 104, title: "二、世界因我而美", tag: "第三章", emoji: "🌍", desc: "甘地：「成為你希望在世界上看到的改變」，從停止抱怨開始，主動改造周遭環境。" },
  { page: 105, title: "MIND 田捕手：塑膠海洋", tag: "第三章", emoji: "🌊", desc: "普立茲獎新聞攝影紀錄的海洋垃圾危機，反思人類行為對世界之美的破壞。" },
  { page: 106, title: "LIFE 心動力 ─ 海邊的孩童塑像與找回美麗的海洋", tag: "第三章", emoji: "🏖️", desc: "藝術家 Chris Jordan 以塑像創作喚醒海洋保育意識，思考自己能做的具體行動。" },
  { page: 107, title: "LIFE 心動力 ─ 生命協奏曲", tag: "單元總結", emoji: "🎵", desc: "透過一首歌，感受萬物共融、和諧共生的生命協奏曲意象，為單元畫下句點。" }
];

export default function Unit04TextbookPageViewer({
  answers,
  setAnswers,
  role,
  isSubmitted,
  currentPage: controlledPage,
  onPageChange
}: Unit04TextbookPageViewerProps) {
  const [localPage, setLocalPage] = useState<number>(82);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const currentPage = controlledPage !== undefined ? controlledPage : localPage;

  const setCurrentPage = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    } else {
      setLocalPage(page);
    }
    if (role === 'student' && !isSubmitted) {
      const readPages = answers.textbookReadPagesU04 || [82];
      if (!readPages.includes(page)) {
        updateAnswer('textbookReadPagesU04', [...readPages, page]);
      }
    }
  };

  const pages = CHAPTERS_NAV_UNIT_04.map(ch => ch.page);

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

  const readPagesList = answers.textbookReadPagesU04 || [82];
  const readPagesCount = readPagesList.filter((p: number) => pages.includes(p)).length || 1;
  const readPagesTotal = pages.length;

  // --- Page 86: Moral behavior sorting ---
  const moralItems = [
    { id: 'steal', text: '未經同意拿走同學的物品' },
    { id: 'redlight', text: '闖紅燈過馬路' },
    { id: 'lie', text: '對朋友說善意的謊言' },
    { id: 'litter', text: '在公共場所亂丟垃圾' },
    { id: 'help', text: '扶老太太過馬路' },
    { id: 'copy', text: '考試作弊' }
  ];
  const moralSort = answers.p86Sort || {};
  const setMoralSort = (id: string, val: string) => {
    if (role === 'teacher' || isSubmitted) return;
    updateAnswer('p86Sort', { ...moralSort, [id]: val });
  };

  return (
    <div id="unit04_page_viewer" className="flex flex-col lg:flex-row gap-6 bg-slate-50 p-1 sm:p-3 rounded-2xl min-h-[750px]">

      {isSidebarOpen && (
        <div className="w-full lg:w-80 bg-white border border-slate-100 rounded-2xl p-4.5 space-y-4 shrink-0 shadow-2xs flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-orange-500" />
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">
                  單元 04 數位課本導覽
                </h3>
              </div>
              <span className="text-[10px] font-black bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full font-sans">
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
                  className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-300"
                  style={{ width: `${(readPagesCount / readPagesTotal) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-1.5 pr-1">
              {CHAPTERS_NAV_UNIT_04.map((ch) => {
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

      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="absolute lg:relative z-10 p-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-full shadow-md flex items-center justify-center border border-orange-400 self-start"
          title="開啟課本導覽"
        >
          <Menu className="w-4 h-4" />
        </button>
      )}

      <div className="flex-1 bg-white border border-slate-100 rounded-2xl shadow-2xs p-5 sm:p-7 flex flex-col justify-start relative min-w-0">

        <div className="flex items-center justify-between border-b border-slate-50 pb-3 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full font-black uppercase tracking-wider">
              單元 04：價值思辨
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs font-black text-slate-800">
              {CHAPTERS_NAV_UNIT_04.find(ch => ch.page === currentPage)?.title}
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
              {/* ==================== PAGE 82 ==================== */}
              {currentPage === 82 && (
                <div id="page_82" className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">行前閱讀</span>
                    <h2 className="text-lg font-black text-slate-800">掌握智慧方向盤</h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    博鈞在放學路上撿到一疊現金，金額不小。可華問他：「你會怎麼處理？」博鈞猶豫了：交給警察，感覺理所當然；但心裡也閃過「反正沒人知道」的念頭。這個看似單純的選擇，其實牽涉到許多層次的價值判斷——這正是本單元「價值思辨」要一起探索的課題。
                  </p>
                  <div className="p-4 bg-orange-50/20 border border-orange-100 rounded-xl">
                    <p className="text-xs text-orange-900 font-bold leading-relaxed">
                      💭 生活中每天都有大大小小的選擇，需要判斷對錯、辨別是非、做出決定。本單元將帶你認識道德判斷的架構、常見的思考迷思，並學習用更開闊的眼光發現生活中的真善美。
                    </p>
                  </div>
                  <div className="space-y-2 border-t border-slate-100 pt-5">
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                      <span className="bg-orange-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                      <span>如果是你撿到這筆現金，你會怎麼做？為什麼？</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p82Q1 || ''}
                      onChange={(e) => updateAnswer('p82Q1', e.target.value)}
                      placeholder="我會交給警察，因為那筆錢不屬於我，就算沒人知道，我心裡也會過意不去，而且失主可能正焦急地在找它..."
                      rows={3}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ==================== PAGE 83 ==================== */}
              {currentPage === 83 && (
                <div id="page_83" className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">行前暖身</span>
                    <h2 className="text-lg font-black text-slate-800">ORID 討論法暖身</h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    ORID 是一套幫助我們有條理討論任何議題的四層次提問法，之後在本單元會反覆用到，先來認識它的四個字母：
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-blue-50/10 border border-blue-100 p-3.5 rounded-xl">
                      <span className="text-xs font-black text-blue-800">O・Objective 客觀事實</span>
                      <p className="text-[11px] text-slate-500 mt-1">發生了什麼事？有哪些看得見的事實？</p>
                    </div>
                    <div className="bg-rose-50/10 border border-rose-100 p-3.5 rounded-xl">
                      <span className="text-xs font-black text-rose-800">R・Reflective 感受反應</span>
                      <p className="text-[11px] text-slate-500 mt-1">聽到這件事，你的第一反應與感受是什麼？</p>
                    </div>
                    <div className="bg-purple-50/10 border border-purple-100 p-3.5 rounded-xl">
                      <span className="text-xs font-black text-purple-800">I・Interpretive 詮釋</span>
                      <p className="text-[11px] text-slate-500 mt-1">這件事背後代表了什麼意義？為什麼會發生？</p>
                    </div>
                    <div className="bg-emerald-50/10 border border-emerald-100 p-3.5 rounded-xl">
                      <span className="text-xs font-black text-emerald-800">D・Decisional 決定行動</span>
                      <p className="text-[11px] text-slate-500 mt-1">接下來，你會做出什麼決定或行動？</p>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-600 leading-relaxed font-medium">
                    這套討論法能幫助我們，從單純的情緒反應，一步步走向理性、負責任的決定。接下來的課文中，會用博鈞撿到現金的情境，實際示範這四個步驟。
                  </div>
                </div>
              )}

              {/* ==================== PAGE 84 ==================== */}
              {currentPage === 84 && (
                <div id="page_84" className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">第 1 章</span>
                    <h2 className="text-lg font-black text-slate-800">思考與判斷 ─ LIFE 心動力｜ORID 討論法｜</h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    用 ORID 四步驟，實際拆解博鈞「撿到現金」的情境：
                  </p>
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-blue-800">O｜客觀事實：博鈞撿到了什麼？現場有哪些人事物？</label>
                      <textarea disabled={role === 'teacher' || isSubmitted} value={answers.p84O || ''} onChange={(e) => updateAnswer('p84O', e.target.value)} placeholder="博鈞在放學路上的人行道撿到一疊現金，附近沒有監視器，也沒有人看到..." rows={2} className="w-full text-xs p-2.5 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-rose-800">R｜感受反應：博鈞當下心裡浮現哪些感受？</label>
                      <textarea disabled={role === 'teacher' || isSubmitted} value={answers.p84R || ''} onChange={(e) => updateAnswer('p84R', e.target.value)} placeholder="又驚又喜，但同時也有點緊張、猶豫，甚至有一點點『這下賺到了』的僥倖心理..." rows={2} className="w-full text-xs p-2.5 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-purple-800">I｜詮釋：這筆錢對失主來說可能代表什麼？</label>
                      <textarea disabled={role === 'teacher' || isSubmitted} value={answers.p84I || ''} onChange={(e) => updateAnswer('p84I', e.target.value)} placeholder="這可能是失主辛苦存下來要繳學費、看病或急用的錢，遺失後一定非常焦急..." rows={2} className="w-full text-xs p-2.5 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-emerald-800">D｜決定行動：博鈞最後應該怎麼做？</label>
                      <textarea disabled={role === 'teacher' || isSubmitted} value={answers.p84D || ''} onChange={(e) => updateAnswer('p84D', e.target.value)} placeholder="交給警察局或失物招領，讓有需要的人可以順利找回..." rows={2} className="w-full text-xs p-2.5 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed" />
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== PAGE 85 ==================== */}
              {currentPage === 85 && (
                <div id="page_85" className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">第 1 章</span>
                    <h2 className="text-lg font-black text-slate-800">LIFE 心動力 ─ 道德行為想一想</h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    下面列出幾種日常行為，勾選你認為「屬於道德範疇」的項目（也就是牽涉到對錯、善惡判斷的行為）：
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {[
                      '未經同意拿走別人的東西',
                      '考試時偷看別人的答案',
                      '選擇喜歡的顏色當作制服顏色',
                      '在公車上讓座給長輩',
                      '決定假日要看電影還是打球',
                      '對受傷的同學視而不見',
                      '選擇先吃飯還是先寫作業',
                      '在網路上散布不實謠言'
                    ].map((item, idx) => {
                      const checked = (answers.p85Moral || []).includes(idx);
                      return (
                        <label key={idx} className="flex items-center gap-2 p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-700 font-medium cursor-pointer">
                          <input
                            type="checkbox"
                            disabled={role === 'teacher' || isSubmitted}
                            checked={checked}
                            onChange={() => {
                              const cur = answers.p85Moral || [];
                              updateAnswer('p85Moral', checked ? cur.filter((i: number) => i !== idx) : [...cur, idx]);
                            }}
                            className="accent-orange-500"
                          />
                          {item}
                        </label>
                      );
                    })}
                  </div>
                  <div className="p-3.5 bg-amber-50/20 border border-amber-100 rounded-xl text-xs text-amber-900 font-bold leading-relaxed">
                    💡 提示：真正屬於「道德」範疇的行為，通常牽涉到是否傷害他人、是否符合公平正義，而不只是單純的個人喜好選擇。
                  </div>
                </div>
              )}

              {/* ==================== PAGE 86 ==================== */}
              {currentPage === 86 && (
                <div id="page_86" className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">第 1 章</span>
                    <h2 className="text-lg font-black text-slate-800">一、什麼是道德的行為？</h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    判斷一件事「道德與否」，可以從兩個層面來看：<strong>「行為的對錯」</strong>——是否符合社會共同建構的制度、法律、政策；以及<strong>「人的善惡」</strong>——行為背後的動機與品格。
                  </p>
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4.5 space-y-3">
                    <h4 className="text-xs font-black text-slate-800">🔀 分類練習：這些行為屬於「對錯」還是「善惡」層面？</h4>
                    {moralItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between gap-2 p-2.5 bg-white rounded-xl border border-slate-100">
                        <span className="text-xs text-slate-700 font-medium flex-1">{item.text}</span>
                        <div className="flex gap-1.5 shrink-0">
                          {['對錯', '善惡'].map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              disabled={role === 'teacher' || isSubmitted}
                              onClick={() => setMoralSort(item.id, opt)}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold transition-all ${
                                moralSort[item.id] === opt ? 'bg-orange-500 text-white' : 'bg-slate-50 text-slate-500 border border-slate-200/50'
                              }`}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ==================== PAGE 87 ==================== */}
              {currentPage === 87 && (
                <div id="page_87" className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">第 1 章</span>
                    <h2 className="text-lg font-black text-slate-800">二、心中的那把尺 ─ MIND 田捕手：不問問題的人</h2>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-3">
                    <div className="flex gap-2.5 items-center text-slate-800">
                      <span className="text-2xl">🧠</span>
                      <h4 className="text-xs font-extrabold">漢娜・鄂蘭與「平庸的邪惡」</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      1961 年，納粹軍官艾希曼（Adolf Eichmann）受審，他負責將大量猶太人送往集中營，卻辯稱自己「只是服從命令、按規定辦事」。哲學家漢娜・鄂蘭旁聽審判後提出「平庸的邪惡（The banality of evil）」概念：艾希曼並非天生的惡魔，而是一個放棄思考、不問問題、盲目服從體制的普通人——這種「不思考」本身，就是最可怕的邪惡根源。
                    </p>
                  </div>
                  <div className="space-y-2 border-t border-slate-100 pt-5">
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                      <span className="bg-orange-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                      <span>「只是服從命令」可以成為逃避道德責任的理由嗎？為什麼？</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p87Q1 || ''}
                      onChange={(e) => updateAnswer('p87Q1', e.target.value)}
                      placeholder="我認為不行，因為每個人都有基本的道德判斷能力，就算是奉命行事，也應該對自己造成的傷害負起責任，而不是把責任都推給體制..."
                      rows={3}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed"
                    />
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed pt-2">
                      <span className="bg-orange-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">2</span>
                      <span>在日常生活中，你有沒有「明知不對，卻因為大家都這樣做／上面這麼說」而選擇不多想的經驗？</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p87Q2 || ''}
                      onChange={(e) => updateAnswer('p87Q2', e.target.value)}
                      placeholder="曾經在班上大家一起排擠某位同學時，我雖然覺得不太對，但因為大家都這樣，也就跟著沉默、沒有多想..."
                      rows={3}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ==================== PAGE 88 ==================== */}
              {currentPage === 88 && (
                <div id="page_88" className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">第 1 章</span>
                    <h2 className="text-lg font-black text-slate-800">LIFE 心動力 ─ 如果是你，你會怎麼做？</h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    延續「不問問題的人」的討論，想像自己身處類似的情境：上級或團體要求你做一件你覺得不太對的事。
                  </p>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                      <span className="bg-orange-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                      <span>如果班長要求你一起孤立某位同學，你會服從，還是提出質疑？說說你的理由。</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p88Q1 || ''}
                      onChange={(e) => updateAnswer('p88Q1', e.target.value)}
                      placeholder="我會提出質疑，就算可能因此被排擠，我也不想成為傷害別人的一份子，思考過後覺得這樣做才對得起自己的良心..."
                      rows={4}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ==================== PAGE 89 ==================== */}
              {currentPage === 89 && (
                <div id="page_89" className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">第 1 章</span>
                    <h2 className="text-lg font-black text-slate-800">三大倫理學理論</h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    哲學史上有三種主要角度，用來判斷一個行為是否道德：
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                    <div className="bg-blue-50/10 border border-blue-100 p-4 rounded-2xl space-y-1.5">
                      <span className="text-2xl">⚖️</span>
                      <h4 className="text-xs font-black text-blue-900">效益論 ─ 邊沁（Jeremy Bentham）</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">看行為的「結果」：能為最多數人帶來最大幸福的行為，就是道德的行為。</p>
                    </div>
                    <div className="bg-purple-50/10 border border-purple-100 p-4 rounded-2xl space-y-1.5">
                      <span className="text-2xl">📜</span>
                      <h4 className="text-xs font-black text-purple-900">義務論 ─ 康德（Immanuel Kant）</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">看行為的「動機」：道德來自對責任與原則的堅持，不論結果如何，該做的事就該做。</p>
                    </div>
                    <div className="bg-emerald-50/10 border border-emerald-100 p-4 rounded-2xl space-y-1.5">
                      <span className="text-2xl">🌱</span>
                      <h4 className="text-xs font-black text-emerald-900">德行論 ─ 亞里斯多德（Aristotle）</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">看行為者的「品格」：有德行的人，自然會做出正確的選擇，重點在培養好的性格。</p>
                    </div>
                  </div>
                  <div className="space-y-2 border-t border-slate-100 pt-5">
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                      <span className="bg-orange-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                      <span>回到「博鈞撿到現金」的情境，試著用這三種理論，分別說說「交出去」這個決定的理由。</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p89Q1 || ''}
                      onChange={(e) => updateAnswer('p89Q1', e.target.value)}
                      placeholder="效益論：交出去能讓失主與整個社會都感到安心，帶來更大的幸福。義務論：不論結果如何，不屬於自己的東西就不該佔為己有，這是基本原則。德行論：一個誠實正直的人，本來就會這樣做..."
                      rows={3.5}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ==================== PAGE 90 ==================== */}
              {currentPage === 90 && (
                <div id="page_90" className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">第 2 章</span>
                    <h2 className="text-lg font-black text-slate-800">真理，越「辨」越明 ─ LIFE 心動力｜公德？私德？｜</h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    <strong>公德</strong>指的是涉及公共領域、影響他人與社會的行為規範；<strong>私德</strong>則是個人生活領域內的品行修養，較少直接影響他人。兩者的界線，常常是道德思辨的核心問題。
                  </p>
                  <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl text-xs text-slate-600 leading-relaxed font-medium">
                    接下來這一頁會給你幾個生活情境，練習判斷：這個行為究竟涉及「公領域」，還是純屬「私領域」？
                  </div>
                </div>
              )}

              {/* ==================== PAGE 91 ==================== */}
              {currentPage === 91 && (
                <div id="page_91" className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">第 2 章</span>
                    <h2 className="text-lg font-black text-slate-800">公德私德情境大挑戰</h2>
                  </div>
                  <div className="space-y-3">
                    {[
                      { id: 'a', text: '大明把家裡的垃圾打包，趁散步時丟到公園裡的垃圾桶。' },
                      { id: 'b', text: '志明和春嬌是班對，平常總是同進同出，有同學覺得不舒服。' },
                      { id: 'c', text: '小華喜歡在房間裡吃東西，垃圾卻不清理，房間發出惡臭，影響家人。' }
                    ].map((item) => {
                      const val = answers.p91Sort?.[item.id];
                      return (
                        <div key={item.id} className="p-3.5 bg-slate-50 border border-slate-100 rounded-xl space-y-2">
                          <p className="text-xs text-slate-700 font-medium leading-relaxed">{item.text}</p>
                          <div className="flex gap-1.5">
                            {['公德', '私德'].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                disabled={role === 'teacher' || isSubmitted}
                                onClick={() => updateAnswer('p91Sort', { ...(answers.p91Sort || {}), [item.id]: opt })}
                                className={`px-3 py-1 rounded-full text-[10px] font-extrabold transition-all ${
                                  val === opt ? 'bg-orange-500 text-white' : 'bg-white text-slate-500 border border-slate-200/50'
                                }`}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="p-3.5 bg-amber-50/20 border border-amber-100 rounded-xl text-xs text-amber-900 font-bold leading-relaxed">
                    💡 判斷關鍵：這個行為是否涉及「公領域」——也就是是否影響到不特定的他人或公共空間？
                  </div>
                </div>
              )}

              {/* ==================== PAGE 92 ==================== */}
              {currentPage === 92 && (
                <div id="page_92" className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">第 2 章</span>
                    <h2 className="text-lg font-black text-slate-800">一、站在十字路口 ─ MIND 田捕手：錢買不到的東西</h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    生活中有許多珍貴的事物，是再多金錢也無法購買、無法替代的：真摯的友情、家人的陪伴、內心的平靜、他人的信任……當我們面對道德抉擇的十字路口時，這些「錢買不到的東西」，往往才是真正該被放在天秤上衡量的重量。
                  </p>
                  <div className="space-y-2 border-t border-slate-100 pt-5">
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                      <span className="bg-orange-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                      <span>對你來說，有哪些東西是「錢買不到」、卻比金錢更珍貴的？</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p92Q1 || ''}
                      onChange={(e) => updateAnswer('p92Q1', e.target.value)}
                      placeholder="家人願意花時間陪伴我、朋友在我低潮時的不離不棄，這些都不是花錢就能買到的，一旦失去了信任或感情，也很難用金錢彌補..."
                      rows={3}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed"
                    />
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed pt-2">
                      <span className="bg-orange-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">2</span>
                      <span>你是否曾經在一個決定中，優先選擇了金錢或利益，而忽略了這些無形的價值？</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p92Q2 || ''}
                      onChange={(e) => updateAnswer('p92Q2', e.target.value)}
                      placeholder="曾經為了多賺一點打工錢，推掉了跟家人約好的聚餐，後來覺得那份陪伴其實比錢更重要..."
                      rows={3}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ==================== PAGE 93 ==================== */}
              {currentPage === 93 && (
                <div id="page_93" className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">第 2 章</span>
                    <h2 className="text-lg font-black text-slate-800">LIFE 心動力 ─ 生活中的兩難</h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    道德兩難，指的是兩個看似都「有道理」的選項互相衝突，讓人難以抉擇的情境。想一想你生活中曾遇過的兩難時刻：
                  </p>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-800 block">✏️ 寫下一個你曾經歷過的道德兩難情境：</label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p93Dilemma || ''}
                      onChange={(e) => updateAnswer('p93Dilemma', e.target.value)}
                      placeholder="好朋友考試作弊被我看到了，我該不該去跟老師報告？如果不說，感覺對其他同學不公平；但如果說了，可能會失去這段友誼..."
                      rows={3}
                      className="w-full text-xs p-2.5 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed"
                    />
                    <label className="text-xs font-black text-slate-800 block pt-1">🧭 你最後會怎麼選？依據是什麼？</label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p93Choice || ''}
                      onChange={(e) => updateAnswer('p93Choice', e.target.value)}
                      placeholder="我會私下先勸他自首，給他一個改正的機會，同時也是對其他同學公平負責的一種方式..."
                      rows={2.5}
                      className="w-full text-xs p-2.5 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ==================== PAGE 94 ==================== */}
              {currentPage === 94 && (
                <div id="page_94" className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">第 2 章</span>
                    <h2 className="text-lg font-black text-slate-800">YouBike 情境思辨</h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    小凱趕時間上班，發現路邊有一輛 YouBike 沒有正確入柱定位，眼看就要遲到，他猶豫著要不要先騎走再說，晚點再處理歸還手續。
                  </p>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                      <span className="bg-orange-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                      <span>小凱這樣做，可能會對他人或社會造成什麼影響？</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p94Q1 || ''}
                      onChange={(e) => updateAnswer('p94Q1', e.target.value)}
                      placeholder="系統可能誤判車輛遺失或損壞，導致其他需要用車的人受影響，也可能造成後續糾紛或額外費用..."
                      rows={2.5}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed"
                    />
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed pt-2">
                      <span className="bg-orange-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">2</span>
                      <span>個人的便利與公共秩序衝突時，你認為該如何拿捏？</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p94Q2 || ''}
                      onChange={(e) => updateAnswer('p94Q2', e.target.value)}
                      placeholder="我覺得就算趕時間，也應該先確認車輛正確入柱，畢竟公共資源是大家共享的，一時方便不該犧牲整體的秩序..."
                      rows={2.5}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ==================== PAGE 95 ==================== */}
              {currentPage === 95 && (
                <div id="page_95" className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">第 2 章</span>
                    <h2 className="text-lg font-black text-slate-800">二、迷思？迷失？ ─ 迷思一：合法的就是對的</h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    法律是社會規範的最低標準，但「合法」不等於「道德上正確」，「不合法」也不必然等於「不道德」。歷史上曾有國家立法通過種族隔離、性別歧視等制度，這些即使「合法」，在道德上仍受到嚴厲批判；相對地，也有人在極權統治下，因協助被迫害者而觸犯當時的法律，卻被後世肯定為義行，甚至被以色列封為「國際義人（Righteous Among the Nations）」。
                  </p>
                  <div className="space-y-2 border-t border-slate-100 pt-5">
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                      <span className="bg-orange-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                      <span>你能不能想到一個「合法但不見得道德」，或「不合法卻符合道德」的例子？</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p95Q1 || ''}
                      onChange={(e) => updateAnswer('p95Q1', e.target.value)}
                      placeholder="有些公司合法地大量解僱員工來節省成本，雖然沒有違法，但對員工生活造成很大衝擊，感覺不太符合道德..."
                      rows={3}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ==================== PAGE 96 ==================== */}
              {currentPage === 96 && (
                <div id="page_96" className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">第 2 章</span>
                    <h2 className="text-lg font-black text-slate-800">迷思二、三：從眾與主觀感受的陷阱</h2>
                  </div>
                  <div className="grid grid-cols-1 gap-3.5">
                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-1.5">
                      <h4 className="text-xs font-black text-slate-800">迷思二：大家都做的事就是對的事</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">例如玩「Pokémon GO」遊戲時，許多人為了抓寶而不顧交通規則、隨意闖入私人土地——多數人這樣做，不代表這樣做就是對的。</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl space-y-1.5">
                      <h4 className="text-xs font-black text-slate-800">迷思三：你覺得是對的就是對的</h4>
                      <p className="text-[11px] text-slate-500 leading-relaxed">道德判斷不能只憑主觀感覺，而需要考慮他人的處境、社會共識與行為造成的實際後果，否則容易淪為自我合理化。</p>
                    </div>
                  </div>
                  <div className="space-y-2 border-t border-slate-100 pt-5">
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                      <span className="bg-orange-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                      <span>這兩種迷思中，你覺得自己比較容易陷入哪一種？分享一個相關經驗。</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p96Q1 || ''}
                      onChange={(e) => updateAnswer('p96Q1', e.target.value)}
                      placeholder="我覺得自己比較容易陷入『大家都做的事就是對的事』，例如班上流行某個惡作劇，我也會跟著做，事後想想其實不太恰當..."
                      rows={3}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ==================== PAGE 97 ==================== */}
              {currentPage === 97 && (
                <div id="page_97" className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">第 2 章</span>
                    <h2 className="text-lg font-black text-slate-800">三、這是行為對錯還是道德善惡？ ─ 道德心智圖</h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    練習畫出一張屬於你自己的「道德心智圖」：選一個生活情境，寫下裡面的人物、他們的行為，以及這個行為屬於哪個道德層面。
                  </p>
                  <div className="grid grid-cols-1 gap-2">
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-slate-700">情境中的人物：</label>
                      <input disabled={role === 'teacher' || isSubmitted} value={answers.p97Person || ''} onChange={(e) => updateAnswer('p97Person', e.target.value)} placeholder="例如：我和同班同學小陳" className="w-full text-xs p-2.5 border border-slate-200 focus:border-orange-500 rounded-xl outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-slate-700">發生的行為：</label>
                      <input disabled={role === 'teacher' || isSubmitted} value={answers.p97Action || ''} onChange={(e) => updateAnswer('p97Action', e.target.value)} placeholder="例如：小陳在群組裡散布關於我的不實謠言" className="w-full text-xs p-2.5 border border-slate-200 focus:border-orange-500 rounded-xl outline-none" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[11px] font-black text-slate-700">屬於哪個道德層面？為什麼？</label>
                      <textarea disabled={role === 'teacher' || isSubmitted} value={answers.p97Level || ''} onChange={(e) => updateAnswer('p97Level', e.target.value)} placeholder="這屬於『人的善惡』層面，因為散布不實謠言是刻意傷害他人名譽的行為，反映出動機上的惡意..." rows={2.5} className="w-full text-xs p-2.5 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed" />
                    </div>
                  </div>
                </div>
              )}

              {/* ==================== PAGE 98 ==================== */}
              {currentPage === 98 && (
                <div id="page_98" className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">第 2 章</span>
                    <h2 className="text-lg font-black text-slate-800">四、愛與智慧的選擇（上）</h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    面對複雜的道德抉擇時，有幾項基本原則可以作為判斷的依歸：
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1 text-center">
                      <span className="text-xl">🛡️</span>
                      <h4 className="text-xs font-black text-slate-800">不要傷害任何人</h4>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1 text-center">
                      <span className="text-xl">🌟</span>
                      <h4 className="text-xs font-black text-slate-800">讓事情更美好</h4>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1 text-center">
                      <span className="text-xl">🙏</span>
                      <h4 className="text-xs font-black text-slate-800">尊重別人</h4>
                    </div>
                  </div>
                  <div className="space-y-2 border-t border-slate-100 pt-5">
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                      <span className="bg-orange-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                      <span>這三個原則中，哪一個是你最容易忽略、卻最想開始練習的？</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p98Q1 || ''}
                      onChange={(e) => updateAnswer('p98Q1', e.target.value)}
                      placeholder="我覺得是『尊重別人』，有時候急著表達自己的意見，會不小心打斷別人說話，之後想多練習耐心傾聽..."
                      rows={3}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ==================== PAGE 99 ==================== */}
              {currentPage === 99 && (
                <div id="page_99" className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">第 2 章</span>
                    <h2 className="text-lg font-black text-slate-800">四、愛與智慧的選擇（下）</h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1 text-center">
                      <span className="text-xl">⚖️</span>
                      <h4 className="text-xs font-black text-slate-800">要公平</h4>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1 text-center">
                      <span className="text-xl">🕊️</span>
                      <h4 className="text-xs font-black text-slate-800">要愛人，做個和平大使</h4>
                    </div>
                    <div className="bg-slate-50 border border-slate-100 p-3.5 rounded-xl space-y-1 text-center">
                      <span className="text-xl">💐</span>
                      <h4 className="text-xs font-black text-slate-800">要心存感恩</h4>
                    </div>
                  </div>
                  <div className="space-y-2 border-t border-slate-100 pt-5">
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                      <span className="bg-orange-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                      <span>結合這六個原則（不傷害、更美好、尊重、公平、和平、感恩），重新想一想博鈞撿到現金的情境，寫下你最終的建議。</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p99Q1 || ''}
                      onChange={(e) => updateAnswer('p99Q1', e.target.value)}
                      placeholder="交還現金符合『不傷害』（避免失主受損）、『公平』（物歸原主）與『感恩』（想想失主找回錢時的感激），這六個原則其實環環相扣..."
                      rows={3.5}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ==================== PAGE 100 ==================== */}
              {currentPage === 100 && (
                <div id="page_100" className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">第 3 章</span>
                    <h2 className="text-lg font-black text-slate-800">生活中的真善美 ─ 一、發現美的眼睛</h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    「美」不一定是壯闊的風景或名貴的藝術品，它也可能藏在一頓熱騰騰的晚餐、一句真誠的道謝、雨後的一道彩虹裡。擁有一雙「發現美的眼睛」，能讓平凡的日常變得閃閃發光。
                  </p>
                  <div className="space-y-2 border-t border-slate-100 pt-5">
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                      <span className="bg-orange-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                      <span>今天到目前為止，有沒有什麼瞬間讓你覺得「這一刻真美」？</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p100Q1 || ''}
                      onChange={(e) => updateAnswer('p100Q1', e.target.value)}
                      placeholder="今天早上出門時看到陽光灑在校門口的樹葉上，微風吹過，覺得莫名地心情很好..."
                      rows={2.5}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ==================== PAGE 101 ==================== */}
              {currentPage === 101 && (
                <div id="page_101" className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">第 3 章</span>
                    <h2 className="text-lg font-black text-slate-800">LIFE 心動力 ─ 美麗心世界（1-5）</h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    寫下十個你在生活中發現的「美」——可以是景色、聲音、氣味、一個動作，或一句話。這一頁先寫下前五個：
                  </p>
                  <div className="space-y-2">
                    {['A', 'B', 'C', 'D', 'E'].map((label) => (
                      <div key={label} className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 text-[11px] font-black flex items-center justify-center shrink-0">{label}</span>
                        <input
                          disabled={role === 'teacher' || isSubmitted}
                          value={answers[`p101_${label}`] || ''}
                          onChange={(e) => updateAnswer(`p101_${label}`, e.target.value)}
                          placeholder="寫下一個你發現的美..."
                          className="flex-1 text-xs p-2.5 border border-slate-200 focus:border-orange-500 rounded-xl outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ==================== PAGE 102 ==================== */}
              {currentPage === 102 && (
                <div id="page_102" className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">第 3 章</span>
                    <h2 className="text-lg font-black text-slate-800">美麗心世界（6-10）</h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    繼續寫下剩下的五個「美」的瞬間：
                  </p>
                  <div className="space-y-2">
                    {['F', 'G', 'H', 'I', 'J'].map((label) => (
                      <div key={label} className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-orange-100 text-orange-700 text-[11px] font-black flex items-center justify-center shrink-0">{label}</span>
                        <input
                          disabled={role === 'teacher' || isSubmitted}
                          value={answers[`p102_${label}`] || ''}
                          onChange={(e) => updateAnswer(`p102_${label}`, e.target.value)}
                          placeholder="寫下一個你發現的美..."
                          className="flex-1 text-xs p-2.5 border border-slate-200 focus:border-orange-500 rounded-xl outline-none"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ==================== PAGE 103 ==================== */}
              {currentPage === 103 && (
                <div id="page_103" className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">第 3 章</span>
                    <h2 className="text-lg font-black text-slate-800">美麗心世界：總結與分享</h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    回顧你寫下的十個「美」的瞬間，想一想：
                  </p>
                  <div className="space-y-2">
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                      <span className="bg-orange-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                      <span>這十個「美」裡面，哪一個最讓你印象深刻？為什麼？</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p103Q1 || ''}
                      onChange={(e) => updateAnswer('p103Q1', e.target.value)}
                      placeholder="最深刻的是媽媽下班回家後還是願意陪我聊天那一段，那種疲憊裡的溫柔讓我特別感動..."
                      rows={2.5}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed"
                    />
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed pt-2">
                      <span className="bg-orange-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">2</span>
                      <span>做完這個練習後，你對「美」的定義有沒有什麼改變？</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p103Q2 || ''}
                      onChange={(e) => updateAnswer('p103Q2', e.target.value)}
                      placeholder="以前覺得美只跟外表或風景有關，現在發現原來人與人之間的善意和溫暖，也是一種很動人的美..."
                      rows={2.5}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ==================== PAGE 104 ==================== */}
              {currentPage === 104 && (
                <div id="page_104" className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">第 3 章</span>
                    <h2 className="text-lg font-black text-slate-800">二、世界因我而美</h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    「不是沒有美，而是缺少發現美的眼睛」——但發現美之後，我們還能更進一步：主動成為讓世界變得更美的那雙手。與其停在原地抱怨環境髒亂，不如從自己開始改造眼前的垃圾堆。
                  </p>
                  <div className="p-4 bg-amber-50/20 border border-amber-100 rounded-xl">
                    <p className="text-xs text-amber-900 font-bold leading-relaxed italic">
                      「成為你希望在世界上看到的改變。」── 甘地（Mohandas Karamchand Gandhi）
                    </p>
                  </div>
                  <div className="space-y-2 border-t border-slate-100 pt-5">
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                      <span className="bg-orange-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                      <span>你身邊有沒有一個「因為抱怨很久」的問題，其實你可以主動採取一點行動去改善？打算怎麼做？</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p104Q1 || ''}
                      onChange={(e) => updateAnswer('p104Q1', e.target.value)}
                      placeholder="教室後面的垃圾桶常常滿出來沒人處理，大家都在抱怨，我打算跟班長提議排一個輪值表，自己也主動先做起..."
                      rows={3}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ==================== PAGE 105 ==================== */}
              {currentPage === 105 && (
                <div id="page_105" className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">第 3 章</span>
                    <h2 className="text-lg font-black text-slate-800">MIND 田捕手：塑膠海洋</h2>
                  </div>
                  <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl space-y-3">
                    <div className="flex gap-2.5 items-center text-slate-800">
                      <span className="text-2xl">🌊</span>
                      <h4 className="text-xs font-extrabold">普立茲獎新聞攝影紀錄的海洋危機</h4>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      2018 年普立茲「突發新聞攝影獎」的得獎作品，記錄了海洋生物被大量塑膠垃圾包圍、纏繞的震撼畫面。這些照片讓全世界看見：人類製造的垃圾，正一點一滴侵蝕著海洋原本的美麗與生機。
                    </p>
                  </div>
                  <div className="space-y-2 border-t border-slate-100 pt-5">
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                      <span className="bg-orange-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                      <span>看完這樣的畫面，你的第一個感受是什麼？</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p105Q1 || ''}
                      onChange={(e) => updateAnswer('p105Q1', e.target.value)}
                      placeholder="覺得很心痛也有點愧疚，因為自己平常可能也用了不少一次性塑膠製品，卻很少想過它們最後去了哪裡..."
                      rows={3}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ==================== PAGE 106 ==================== */}
              {currentPage === 106 && (
                <div id="page_106" className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">第 3 章</span>
                    <h2 className="text-lg font-black text-slate-800">LIFE 心動力 ─ 海邊的孩童塑像與找回美麗的海洋</h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    藝術家 Chris Jordan 曾用回收的塑膠垃圾，塑造出一尊尊在海邊玩耍的孩童雕像，象徵著：如果我們不採取行動，海洋垃圾終將成為孩子們生活中揮之不去的一部分。
                  </p>
                  <div className="space-y-2 border-t border-slate-100 pt-5">
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                      <span className="bg-orange-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                      <span>為了「找回美麗的海洋」，你在日常生活中可以做出哪些具體的改變？</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p106Q1 || ''}
                      onChange={(e) => updateAnswer('p106Q1', e.target.value)}
                      placeholder="我可以隨身帶環保杯和購物袋，減少使用一次性餐具，也可以參加淨灘活動，用實際行動守護海洋..."
                      rows={3}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed"
                    />
                  </div>
                </div>
              )}

              {/* ==================== PAGE 107 ==================== */}
              {currentPage === 107 && (
                <div id="page_107" className="space-y-6">
                  <div className="border-l-4 border-orange-500 pl-4 py-1">
                    <span className="text-[11px] text-orange-600 font-extrabold uppercase tracking-widest block">單元總結</span>
                    <h2 className="text-lg font-black text-slate-800">LIFE 心動力 ─ 生命協奏曲</h2>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    課本以一首名為〈生命協奏曲〉的歌曲為單元作結：歌詞描繪靜謐的海豚灣、茂密的雨林在月光下和諧共舞，萬物齊聚一堂，象徵著人與自然、人與人之間手牽手、心連心，共同守護這個家園、匯聚成愛的海洋。這首歌呼應了本單元「價值思辨」的核心精神——道德的判斷、美的發現，最終都指向同一件事：讓世界因為我們的存在，變得更加美好、更加和諧。
                  </p>
                  <div className="p-4 bg-orange-50/20 border border-orange-100 rounded-xl">
                    <p className="text-xs text-orange-900 font-bold leading-relaxed">
                      🎵 有興趣的話，可以找找看這首歌，一邊聆聽，一邊感受歌詞中萬物共融的畫面。
                    </p>
                  </div>
                  <div className="space-y-2 border-t border-slate-100 pt-5">
                    <label className="text-xs font-black text-slate-800 flex items-start gap-1.5 leading-relaxed">
                      <span className="bg-orange-500 text-white w-4.5 h-4.5 rounded-full flex items-center justify-center font-mono shrink-0 text-[10px]">1</span>
                      <span>走完「價值思辨」這個單元，從道德判斷到發現生活中的真善美，你最大的收穫或改變是什麼？</span>
                    </label>
                    <textarea
                      disabled={role === 'teacher' || isSubmitted}
                      value={answers.p107Q1 || ''}
                      onChange={(e) => updateAnswer('p107Q1', e.target.value)}
                      placeholder="我學會在做決定之前，多用 ORID 的方式想清楚事實、感受與後果，也開始更留意生活中那些容易被忽略的美好與善意..."
                      rows={3.5}
                      className="w-full text-xs p-3 border border-slate-200 focus:border-orange-500 rounded-xl outline-none leading-relaxed"
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
            {pages.indexOf(currentPage) === pages.length - 1 ? '完成單元 ➔' : '下一頁 →'}
          </button>
        </div>

      </div>

    </div>
  );
}
