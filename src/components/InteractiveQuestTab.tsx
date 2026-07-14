/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip 
} from 'recharts';
import { 
  Gamepad2, 
  Users, 
  Check, 
  Plus, 
  Trash2, 
  ChevronRight, 
  Sparkles, 
  Award, 
  Heart, 
  Tv, 
  ClipboardList, 
  Send, 
  RefreshCw, 
  ArrowLeft, 
  Smile, 
  Play, 
  Timer,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Map,
  Scale,
  Compass,
  Link as LinkIcon,
  MessageSquare
} from 'lucide-react';

import charKehuaImg from '../assets/images/characters/char_kehua.jpg';
import charBojunImg from '../assets/images/characters/char_bojun.jpg';
import charXiaowenImg from '../assets/images/characters/char_xiaowen.jpg';
import charXiaopingImg from '../assets/images/characters/char_xiaoping.jpg';
import charDadImg from '../assets/images/characters/char_dad.jpg';
import charGrandpaImg from '../assets/images/characters/char_grandpa.jpg';
import storyHeroPair from '../assets/images/characters/story_hero_pair.png';

interface InteractiveQuestTabProps {
  currentStudent: any;
  onSaveQuest: (studentId: string, questType: any, data: any) => void;
  role: string;
  submissions: any[];
  onSaveQuestFeedback: (studentId: string, questType: string, feedback: any) => void;
  defaultQuest?: string;
}

const GAMES = [
  {
    id: 1,
    title: '心理測驗 MBTI',
    description: '探索你的性格類型，了解自己與他人。',
    emoji: '🧠',
    color: 'bg-[#FFF9F2] border-[#F1E0CE] text-[#C48C46]',
    iconColor: 'text-[#C48C46]',
    number: '01'
  },
  {
    id: 2,
    title: '生命拼圖地圖',
    description: '將生命的五大單元拼湊出完整的地圖。',
    emoji: '🧩',
    color: 'bg-[#F5FBF5] border-[#CDE7CD] text-[#2E7D32]',
    iconColor: 'text-[#2E7D32]',
    number: '02'
  },
  {
    id: 3,
    title: '情境選擇大冒險',
    description: '面對生活中的道德情境，做出你的抉擇。',
    emoji: '🧭',
    color: 'bg-[#F2F8FF] border-[#CCE1FB] text-[#1D4ED8]',
    iconColor: 'text-[#1D4ED8]',
    number: '03'
  },
  {
    id: 4,
    title: '人際關係連連看',
    description: '建立與身邊人的溫暖關係連結與支持網絡。',
    emoji: '🕸️',
    color: 'bg-[#FAF6FC] border-[#ECCDF2] text-[#7B1FA2]',
    iconColor: 'text-[#7B1FA2]',
    number: '04'
  },
  {
    id: 5,
    title: '價值天平排序戰',
    description: '衡量不同價值觀的重要性，找到內心平衡。',
    emoji: '⚖️',
    color: 'bg-[#FFF9F5] border-[#FCE1D1] text-[#E65100]',
    iconColor: 'text-[#E65100]',
    number: '05'
  },
  {
    id: 6,
    title: '生命故事翻翻卡',
    description: '翻轉故事卡，尋找對應的生命核心價值。',
    emoji: '🎴',
    color: 'bg-[#FFF5F6] border-[#FCD2D6] text-[#C2185B]',
    iconColor: 'text-[#C2185B]',
    number: '06'
  },
  {
    id: 7,
    title: '感恩泡泡站',
    description: '寫下感恩的話，讓班級充滿溫馨的感謝泡泡。',
    emoji: '🧼',
    color: 'bg-[#F0FDFA] border-[#99F6E4] text-[#0F766E]',
    iconColor: 'text-[#0F766E]',
    number: '07'
  },
  {
    id: 8,
    title: '哲學辯論快攻',
    description: '針對哲學思辨議題，展開一場全班思維激盪。',
    emoji: '🗣️',
    color: 'bg-[#F0F9FF] border-[#BAE6FD] text-[#075985]',
    iconColor: 'text-[#075985]',
    number: '08'
  },
  {
    id: 9,
    title: '心情溫度計',
    description: '記錄當下心情狀態，與班級分享情感溫度。',
    emoji: '🌡️',
    color: 'bg-[#FFF1F2] border-[#FECDD3] text-[#9F1239]',
    iconColor: 'text-[#9F1239]',
    number: '09'
  },
  {
    id: 10,
    title: '成長徽章挑戰賽',
    description: '完成生命挑戰，收集並解鎖榮譽班級徽章。',
    emoji: '🏆',
    color: 'bg-[#FFFBEB] border-[#FDE68A] text-[#B45309]',
    iconColor: 'text-[#B45309]',
    number: '10'
  }
];

const renderGameIllustration = (gameId: number) => {
  switch (gameId) {
    case 1: // MBTI
      return (
        <div className="w-full h-full bg-[#FFF9F2] rounded-xl flex flex-col items-center justify-center p-1.5 border border-[#F1E0CE] relative overflow-hidden select-none">
          <span className="text-[12px] font-black text-[#C48C46] tracking-wider mb-1">MBTI</span>
          <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
            {/* Brain outline */}
            <path d="M12 25C10 25 8 23 8 20C8 17 10 15 12 15C12 13 14 11 17 11C20 11 21 13 22 14C23 13 24 11 27 11C30 11 32 13 32 15C34 15 36 17 36 20C36 23 34 25 32 25" stroke="#C48C46" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M14 25C14 28 16 30 19 30M30 25C30 28 28 30 25 30" stroke="#C48C46" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="20" y1="12" x2="20" y2="30" stroke="#C48C46" strokeWidth="1" strokeDasharray="2 2" />
          </svg>
          <div className="absolute bottom-1 right-2 text-xs">📝</div>
        </div>
      );
    case 2: // Life Puzzle Map
      return (
        <div className="w-full h-full bg-[#F5FBF5] rounded-xl flex flex-col items-center justify-center p-1.5 border border-[#CDE7CD] relative overflow-hidden select-none">
          <svg className="w-9 h-9" viewBox="0 0 48 48" fill="none">
            <path d="M6 18C6 11.3726 11.3726 6 18 6H30C36.6274 6 42 11.3726 42 18V30C42 36.6274 36.6274 42 30 42H18C11.3726 42 6 36.6274 6 30V18Z" fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1.5" />
            <path d="M12 18C16 16 18 22 22 20C26 18 28 24 32 22C36 20 36 24 36 26" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M24 6C24 16 20 22 26 30C32 38 28 42 28 42" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1 2" />
            <circle cx="16" cy="14" r="3" fill="#22C55E" />
            <circle cx="32" cy="32" r="4" fill="#10B981" />
          </svg>
        </div>
      );
    case 3: // Scenario Adventure
      return (
        <div className="w-full h-full bg-[#F2F8FF] rounded-xl flex flex-col items-center justify-center p-1.5 border border-[#CCE1FB] relative overflow-hidden select-none">
          <svg className="w-9 h-9" viewBox="0 0 48 48" fill="none">
            <path d="M24 42V26M24 26L12 14M24 26L36 14" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" />
            <circle cx="24" cy="16" r="5" fill="#E0F2FE" stroke="#1D4ED8" strokeWidth="1.5" />
            <text x="21" y="20" className="text-[12px] font-black fill-[#1D4ED8]" style={{ fontFamily: 'monospace' }}>?</text>
            <circle cx="21" cy="33" r="1.5" fill="#60A5FA" />
            <circle cx="21" cy="38" r="1.5" fill="#60A5FA" />
          </svg>
        </div>
      );
    case 4: // Relationships Connection
      return (
        <div className="w-full h-full bg-[#FAF6FC] rounded-xl flex flex-col items-center justify-center p-0.5 border border-[#ECCDF2] relative overflow-hidden select-none">
          <div className="grid grid-cols-2 gap-1 w-full h-full p-1 relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 60 40">
                <line x1="12" y1="10" x2="48" y2="10" stroke="#7B1FA2" strokeWidth="0.8" strokeDasharray="2 2" />
                <line x1="12" y1="10" x2="12" y2="30" stroke="#7B1FA2" strokeWidth="0.8" />
                <line x1="48" y1="10" x2="48" y2="30" stroke="#7B1FA2" strokeWidth="0.8" />
                <line x1="12" y1="30" x2="48" y2="30" stroke="#7B1FA2" strokeWidth="0.8" strokeDasharray="2 2" />
                <line x1="12" y1="10" x2="48" y2="30" stroke="#7B1FA2" strokeWidth="0.8" />
              </svg>
            </div>
            <div className="flex flex-col items-center scale-75 z-10">
              <img src={charXiaopingImg} className="w-4 h-4 rounded-full border border-[#7B1FA2] object-cover bg-white" />
              <span className="text-[10.5px] font-bold text-[#7B1FA2] scale-75 leading-none mt-0.5">同學</span>
            </div>
            <div className="flex flex-col items-center scale-75 z-10">
              <img src={charBojunImg} className="w-4 h-4 rounded-full border border-[#7B1FA2] object-cover bg-white" />
              <span className="text-[10.5px] font-bold text-[#7B1FA2] scale-75 leading-none mt-0.5">朋友</span>
            </div>
            <div className="flex flex-col items-center scale-75 z-10">
              <img src={charXiaowenImg} className="w-4 h-4 rounded-full border border-[#7B1FA2] object-cover bg-white" />
              <span className="text-[10.5px] font-bold text-[#7B1FA2] scale-75 leading-none mt-0.5">家人</span>
            </div>
            <div className="flex flex-col items-center scale-75 z-10">
              <img src={charKehuaImg} className="w-4 h-4 rounded-full border border-[#7B1FA2] object-cover bg-white" />
              <span className="text-[10.5px] font-bold text-[#7B1FA2] scale-75 leading-none mt-0.5">我</span>
            </div>
          </div>
        </div>
      );
    case 5: // Value Scales
      return (
        <div className="w-full h-full bg-[#FFF9F5] rounded-xl flex flex-col items-center justify-center p-1.5 border border-[#FCE1D1] relative overflow-hidden select-none">
          <svg className="w-9 h-9" viewBox="0 0 48 48" fill="none">
            <path d="M24 10V38M14 18H34" stroke="#E65100" strokeWidth="2" strokeLinecap="round" />
            <path d="M14 18L10 30H18L14 18Z" fill="#FFE0B2" stroke="#E65100" strokeWidth="1.2" />
            <path d="M34 18L30 30H38L34 18Z" fill="#FFE0B2" stroke="#E65100" strokeWidth="1.2" />
            <path d="M18 38H30" stroke="#E65100" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </div>
      );
    case 6: // Story Memory Flip Cards
      return (
        <div className="w-full h-full bg-[#FFF5F6] rounded-xl flex flex-col items-center justify-center p-1.5 border border-[#FCD2B6] relative overflow-hidden select-none">
          <svg className="w-9 h-9" viewBox="0 0 48 48" fill="none">
            <rect x="8" y="14" width="20" height="26" rx="2" transform="rotate(-15 8 14)" fill="white" stroke="#C2185B" strokeWidth="1.5" />
            <rect x="20" y="8" width="20" height="26" rx="2" transform="rotate(10 20 8)" fill="#FFF1F2" stroke="#C2185B" strokeWidth="1.5" />
            <path d="M28 20C28 19 29 18 30 18C31 18 32 19 32 20C32 21.5 30 23 30 23C30 23 28 21.5 28 20Z" fill="#C2185B" />
          </svg>
        </div>
      );
    case 7: // Gratitude Bubbles
      return (
        <div className="w-full h-full bg-[#F0FDFA] rounded-xl flex flex-col items-center justify-center p-1.5 border border-[#99F6E4] relative overflow-hidden select-none">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute w-6 h-6 rounded-full border border-sky-400/40 bg-sky-200/10 top-2 left-2 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white/60 -mt-2 -ml-2" />
            </div>
            <div className="absolute w-5 h-5 rounded-full border border-pink-400/30 bg-pink-200/10 bottom-2 right-2 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white/60 -mt-1.5 -ml-1.5" />
            </div>
            <div className="absolute w-8 h-8 rounded-full border border-emerald-400/40 bg-emerald-200/20 top-3 right-3 flex items-center justify-center">
              <span className="text-[12px]">💖</span>
            </div>
          </div>
        </div>
      );
    case 8: // Philosophical Debate
      return (
        <div className="w-full h-full bg-[#F0F9FF] rounded-xl flex flex-col items-center justify-center p-0.5 border border-[#BAE6FD] relative overflow-hidden select-none">
          <div className="flex items-center justify-around w-full h-full relative">
            <div className="flex flex-col items-center scale-75">
              <img src={charKehuaImg} className="w-4 h-4 rounded-full border border-sky-500 object-cover bg-white" />
              <span className="text-[10.5px] font-black text-sky-800 scale-90 mt-0.5">可華</span>
            </div>
            <div className="text-[10.5px] font-black text-orange-600 bg-orange-50 border border-orange-200 px-1 py-0.5 rounded-md scale-90 z-10">VS</div>
            <div className="flex flex-col items-center scale-75">
              <img src={charXiaopingImg} className="w-4 h-4 rounded-full border border-pink-500 object-cover bg-white" />
              <span className="text-[10.5px] font-black text-pink-800 scale-90 mt-0.5">曉萍</span>
            </div>
          </div>
        </div>
      );
    case 9: // Mood Thermometer
      return (
        <div className="w-full h-full bg-[#FFF1F2] rounded-xl flex flex-col items-center justify-center p-1.5 border border-[#FECDD3] relative overflow-hidden select-none">
          <div className="flex items-center gap-1.5 w-full justify-center">
            <div className="w-3 h-10 bg-slate-200 rounded-full p-0.5 relative flex flex-col justify-end border border-slate-300">
              <div className="w-full bg-gradient-to-t from-rose-500 to-amber-400 rounded-full" style={{ height: '70%' }} />
              <div className="absolute -bottom-1 -left-0.5 w-3 h-3 bg-rose-500 rounded-full border border-rose-600" />
            </div>
            <div className="flex flex-col text-[10.5px] leading-tight text-left text-slate-400">
              <span>🥵 100℃</span>
              <span>😊 70℃</span>
              <span>😐 37℃</span>
              <span>🥶 0℃</span>
            </div>
          </div>
        </div>
      );
    case 10: // Badge Challenge
      return (
        <div className="w-full h-full bg-[#FFFBEB] rounded-xl flex flex-col items-center justify-center p-1 border border-[#FDE68A] relative overflow-hidden select-none">
          <div className="grid grid-cols-3 gap-0.5">
            {['🏅', '🎖️', '⭐', '🏆', '💎', '👑'].map((emoji, index) => (
              <div key={index} className="w-3.5 h-3.5 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center text-[12px]">
                {emoji}
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
};

const PUZZLE_THEMES = [
  { key: '哲學思考', emoji: '🧠', desc: '思考生命的意義，探索世界與自我。', color: 'sky' },
  { key: '人學探索', emoji: '🧑', desc: '認識自己與他人，建立良好關係。', color: 'green' },
  { key: '終極關懷', emoji: '💜', desc: '關懷生命的價值，尊重與珍惜生命。', color: 'violet' },
  { key: '價值思辨', emoji: '⚖️', desc: '思辨價值觀，做出負責任的選擇。', color: 'amber' },
  { key: '靈性修養', emoji: '🌸', desc: '培養內在修養，追求心靈的成長。', color: 'rose' },
];
const PUZZLE_STYLES: Record<string, string> = {
  sky: 'bg-sky-50 border-sky-300 text-sky-700',
  green: 'bg-emerald-50 border-emerald-300 text-emerald-700',
  violet: 'bg-violet-50 border-violet-300 text-violet-700',
  amber: 'bg-amber-50 border-amber-300 text-amber-700',
  rose: 'bg-rose-50 border-rose-300 text-rose-700',
};

const PuzzleZone: React.FC<{
  themeKey: string;
  placed: boolean;
  onDropTheme: (theme: string) => void;
  tall?: boolean;
}> = ({ themeKey, placed, onDropTheme, tall }) => {
  const theme = PUZZLE_THEMES.find((t) => t.key === themeKey)!;
  const [isOver, setIsOver] = useState(false);
  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsOver(true); }}
      onDragLeave={() => setIsOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsOver(false);
        const dropped = e.dataTransfer.getData('text/plain');
        if (dropped === themeKey) onDropTheme(themeKey);
      }}
      className={`rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all ${tall ? 'h-20' : 'h-24'} ${
        placed
          ? `${PUZZLE_STYLES[theme.color]} shadow-sm`
          : isOver
            ? 'bg-orange-50 border-[#E65100] border-dashed'
            : 'bg-[#FAF6F0]/50 border-dashed border-[#F1E0CE] text-slate-300'
      }`}
    >
      <span className="text-xl">{placed ? theme.emoji : '➕'}</span>
      <span className={`text-xs font-black ${placed ? '' : 'text-slate-400'}`}>{themeKey}</span>
    </div>
  );
};

export default function InteractiveQuestTab({
  currentStudent,
  onSaveQuest,
  role,
  submissions,
  onSaveQuestFeedback,
  defaultQuest
}: InteractiveQuestTabProps) {
  
  const [activeGameId, setActiveGameId] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // QR Code auto-refresh: regenerates the class join code every 90s for security
  const QR_REFRESH_SECONDS = 90;
  const [qrSecondsLeft, setQrSecondsLeft] = useState(QR_REFRESH_SECONDS);
  const [qrVersion, setQrVersion] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setQrSecondsLeft((prev) => {
        if (prev <= 1) {
          setQrVersion((v) => v + 1);
          return QR_REFRESH_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const qrProgressPercent = ((QR_REFRESH_SECONDS - qrSecondsLeft) / QR_REFRESH_SECONDS) * 100;

  // Link copy simulation
  const [copiedLink, setCopiedLink] = useState(false);
  const handleCopyLink = () => {
    setCopiedLink(true);
    showToast('🔗 已複製班級互動連結，快分享給同學們吧！');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Persist a game's result onto the current student's submission record,
  // so teachers can see it in 學習統計 / 成長表單 review.
  const saveGameResult = (gameKey: string, data: any) => {
    if (currentStudent?.studentId) {
      onSaveQuest(currentStudent.studentId, `game_${gameKey}`, data);
    }
  };

  // ----------------------------------------------------
  // GAME STATE 1: MBTI QUIZ (12 questions, 4 options each, 4 axes)
  // ----------------------------------------------------
  const [mbtiStarted, setMbtiStarted] = useState(false);
  const [mbtiStep, setMbtiStep] = useState(0);
  const [mbtiAnswers, setMbtiAnswers] = useState<Record<number, string>>({});

  const MBTI_OPTION_COLORS = ['bg-sky-500', 'bg-emerald-500', 'bg-orange-500', 'bg-violet-500'];

  const mbtiQuestions = [
    { axis: 'EI', q: '參加聚會時，你會比較傾向於？', options: [
      { label: '主動與不同的人聊天，認識新朋友', val: 'E' },
      { label: '和熟悉的朋友待在一起，聊天比較自在', val: 'I' },
      { label: '觀察環境與氣氛，先想清楚再決定要說什麼', val: 'I' },
      { label: '專注於自己感興趣的事，與他人互動較少', val: 'I' },
    ]},
    { axis: 'EI', q: '課堂分組討論時，你通常會？', options: [
      { label: '率先開口，帶動大家一起發想', val: 'E' },
      { label: '先聽完大家的意見，再表達自己的想法', val: 'I' },
      { label: '負責整理紀錄，安靜地把內容寫下來', val: 'I' },
      { label: '喜歡跟少數幾個熟識的同學一起討論', val: 'E' },
    ]},
    { axis: 'EI', q: '放學後，最能讓你放鬆充電的方式是？', options: [
      { label: '跟一群朋友出去走走、聊天到很晚', val: 'E' },
      { label: '一個人在房間看書、聽音樂', val: 'I' },
      { label: '打電動或做自己喜歡的興趣', val: 'I' },
      { label: '約一兩個知心好友聊心事', val: 'E' },
    ]},
    { axis: 'SN', q: '在思考生命意義或未來理想時，你比較相信？', options: [
      { label: '現實世界與具體經驗，把握當下的實踐', val: 'S' },
      { label: '內心的直覺、哲學思索與未來的可能性', val: 'N' },
      { label: '從過去經驗歸納出的實用做法', val: 'S' },
      { label: '天馬行空的想像與新奇的點子', val: 'N' },
    ]},
    { axis: 'SN', q: '老師交代一份報告時，你會先？', options: [
      { label: '照範例格式，一步步照著做最安心', val: 'S' },
      { label: '想像各種不同的呈現方式再動手', val: 'N' },
      { label: '確認清楚每個細節與規定', val: 'S' },
      { label: '先抓大方向，細節之後再補齊', val: 'N' },
    ]},
    { axis: 'SN', q: '你比較容易被什麼樣的故事打動？', options: [
      { label: '真實發生、貼近生活的故事', val: 'S' },
      { label: '充滿想像、隱喻深刻的故事', val: 'N' },
      { label: '有具體數據與細節佐證的故事', val: 'S' },
      { label: '探索未知、打破框架的故事', val: 'N' },
    ]},
    { axis: 'TF', q: '當好朋友遇到重大挫折向你哭訴時，你的第一反應是？', options: [
      { label: '幫他理性客觀地分析問題，尋求具體方案', val: 'T' },
      { label: '感同身受他的痛苦，先擁抱並支持他的情緒', val: 'F' },
      { label: '陪他一起想解決辦法，同時也聽他抒發', val: 'F' },
      { label: '直接指出問題根源，希望他盡快好起來', val: 'T' },
    ]},
    { axis: 'TF', q: '做決定時，你比較重視？', options: [
      { label: '邏輯是否合理、是否公平一致', val: 'T' },
      { label: '會不會傷害到重視的人的感受', val: 'F' },
      { label: '客觀的利弊分析', val: 'T' },
      { label: '大家的和諧與感受', val: 'F' },
    ]},
    { axis: 'TF', q: '同學做錯事被老師誤會時，你會？', options: [
      { label: '就事論事，先釐清事實再說', val: 'T' },
      { label: '先安慰同學的情緒，再一起想辦法', val: 'F' },
      { label: '幫忙分析整件事的來龍去脈', val: 'T' },
      { label: '同理他當下的委屈與難過', val: 'F' },
    ]},
    { axis: 'JP', q: '在規劃暑假或週末的生活作息時，你習慣？', options: [
      { label: '制定詳細的時間表，按部就班安心執行', val: 'J' },
      { label: '不預作太多束縛，隨遇而安、享受彈性', val: 'P' },
      { label: '至少先訂出大原則再視情況調整', val: 'J' },
      { label: '走到哪算到哪，臨時決定最有趣', val: 'P' },
    ]},
    { axis: 'JP', q: '報告截止日前，你通常？', options: [
      { label: '提早規劃進度，避免臨時趕工', val: 'J' },
      { label: '靈感來了才動手，效率反而更好', val: 'P' },
      { label: '列好清單，一項一項打勾完成', val: 'J' },
      { label: '保留彈性，看心情調整順序', val: 'P' },
    ]},
    { axis: 'JP', q: '面對突發的行程改變，你的反應是？', options: [
      { label: '有點不安，希望盡快恢復原計畫', val: 'J' },
      { label: '覺得新鮮，順勢調整就好', val: 'P' },
      { label: '重新排一次時間表才安心', val: 'J' },
      { label: '正好換個方式，隨機應變', val: 'P' },
    ]},
  ];

  const MBTI_GROUP_STYLES: Record<string, string> = {
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    violet: 'bg-violet-50 border-violet-200 text-violet-700',
    sky: 'bg-sky-50 border-sky-200 text-sky-700',
    orange: 'bg-orange-50 border-orange-200 text-orange-700',
  };

  const MBTI_GROUPS = [
    { name: '外交家', color: 'emerald', desc: '溫暖友善，重視和諧與人際關係，擁有理想與同理心。', types: 'ENFJ · ENFP · INFJ · INFP' },
    { name: '分析家', color: 'violet', desc: '理性思考，喜歡探索真理，追求知識與創新。', types: 'INTJ · INTP · ENTJ · ENTP' },
    { name: '守護者', color: 'sky', desc: '可靠負責，注重秩序與規則，樂於保護他人。', types: 'ISTJ · ISFJ · ESTJ · ESFJ' },
    { name: '探險家', color: 'orange', desc: '熱愛自由，勇於嘗試新事物，活在當下、行動力強。', types: 'ISTP · ISFP · ESTP · ESFP' },
  ];

  const handleMbtiAnswer = (val: string) => {
    const nextAnswers = { ...mbtiAnswers, [mbtiStep]: val };
    setMbtiAnswers(nextAnswers);
    if (mbtiStep < mbtiQuestions.length - 1) {
      setMbtiStep(mbtiStep + 1);
    } else {
      showToast('🎉 MBTI 測驗完成！已算出您的性格傾向！');
      setMbtiStep(mbtiStep + 1); // completion view
      const pickFinal = (axis: string, a: string, b: string) => {
        let ca = 0, cb = 0;
        mbtiQuestions.forEach((q, i) => {
          if (q.axis !== axis) return;
          const ans = nextAnswers[i];
          if (ans === a) ca++; else if (ans) cb++;
        });
        return ca >= cb ? a : b;
      };
      const finalType = pickFinal('EI', 'E', 'I') + pickFinal('SN', 'S', 'N') + pickFinal('TF', 'T', 'F') + pickFinal('JP', 'J', 'P');
      saveGameResult('mbti', { type: finalType, answers: nextAnswers });
    }
  };

  const mbtiAxisPercent = (axis: string, letterA: string) => {
    let countA = 0, countB = 0;
    mbtiQuestions.forEach((q, i) => {
      if (q.axis !== axis) return;
      const ans = mbtiAnswers[i];
      if (ans === letterA) countA++;
      else if (ans) countB++;
    });
    const total = countA + countB;
    if (total === 0) return 50;
    return Math.round((countA / total) * 100);
  };

  const getMbtiResult = () => {
    const pick = (axis: string, a: string, b: string) => (mbtiAxisPercent(axis, a) >= 50 ? a : b);
    return pick('EI', 'E', 'I') + pick('SN', 'S', 'N') + pick('TF', 'T', 'F') + pick('JP', 'J', 'P');
  };

  const resetMbti = () => {
    setMbtiStarted(false);
    setMbtiStep(0);
    setMbtiAnswers({});
  };

  // ----------------------------------------------------
  // GAME STATE 2: LIFE PUZZLE MAP
  // ----------------------------------------------------
  const [puzzlePlaced, setPuzzlePlaced] = useState<Record<string, boolean>>({
    '哲學思考': false,
    '人學探索': false,
    '終極關懷': false,
    '價值思辨': false,
    '靈性修養': false
  });
  const handlePlacePuzzle = (theme: string) => {
    setPuzzlePlaced(prev => ({ ...prev, [theme]: true }));
    showToast(`🧩 成功嵌入拼圖：${theme}！`);
  };
  const resetPuzzle = () => {
    setPuzzlePlaced({
      '哲學思考': false,
      '人學探索': false,
      '終極關懷': false,
      '價值思辨': false,
      '靈性修養': false
    });
  };

  // ----------------------------------------------------
  // GAME STATE 3: SCENARIO ADVENTURE
  // ----------------------------------------------------
  const [adventureStage, setAdventureStage] = useState(0);
  const [adventurePoints, setAdventurePoints] = useState({ 同理: 10, 責任: 10, 勇氣: 10 });
  const adventureScenarios = [
    {
      title: '校園小衝突',
      story: '下課時，博鈞不小心撞倒了小文正在整理的書本，兩人因此起了口角，周圍同學都圍過來看熱鬧。此時你會？',
      options: [
        { text: '上前打圓場，請兩人先冷靜下來再說。', points: { 責任: 6, 同理: 6, 勇氣: 5 } },
        { text: '幫忙把散落的書撿起來，緩和現場氣氛。', points: { 責任: 4, 同理: 8, 勇氣: 2 } },
        { text: '站在旁邊看，等吵完再決定要不要幫忙。', points: { 責任: -2, 同理: -2, 勇氣: -3 } },
        { text: '去找老師來處理這件事。', points: { 責任: 8, 同理: 2, 勇氣: 4 } },
      ],
    },
    {
      title: '朋友被誤會時',
      story: '小文在美術課時不小心打翻了顏料，老師以為是曉萍弄髒了桌子，語氣有點嚴厲。曉萍急著解釋，但大家似乎都沒有聽到她說的話。此時你會？',
      options: [
        { text: '立刻替曉萍解釋，告訴大家真相。', points: { 責任: 8, 同理: 6, 勇氣: 7 } },
        { text: '默默觀察，等別人發現真相。', points: { 責任: -3, 同理: -1, 勇氣: -4 } },
        { text: '安慰曉萍，並和她一起想辦法。', points: { 責任: 4, 同理: 8, 勇氣: 3 } },
        { text: '不關我的事，先離開現場。', points: { 責任: -5, 同理: -5, 勇氣: -5 } },
      ],
    },
    {
      title: '考試作弊的誘惑',
      story: '快段考了，隔壁的好友博鈞因為練球沒時間複習，偷偷把英文單字卡夾在筆袋下。你看見了，而且他向你投來求助的眼神。此時你會？',
      options: [
        { text: '假裝沒看見，專心寫自己的考卷。', points: { 責任: 5, 同理: 0, 勇氣: 0 } },
        { text: '以嚴肅眼神制止他，並在考後主動約他一起溫習。', points: { 責任: 8, 同理: 6, 勇氣: 8 } },
        { text: '偷偷在草稿紙上寫下提示傳給他，幫他度過難關。', points: { 責任: -5, 同理: 8, 勇氣: 2 } },
        { text: '在考後私下告訴老師，請老師適當關照博鈞。', points: { 責任: 10, 同理: 3, 勇氣: 6 } },
      ],
    },
    {
      title: '被排擠時的心情',
      story: '班上的小文因為性格內向、不擅言詞，分組時大家都不想跟他一組。小文一個人默默站在教室角落，看起來非常失落。此時你會？',
      options: [
        { text: '主動走過去邀請小文加入我們小組。', points: { 同理: 10, 勇氣: 8, 責任: 5 } },
        { text: '跟組員討論看看，看大家願不願意接納他。', points: { 同理: 6, 勇氣: 3, 責任: 4 } },
        { text: '裝作很忙不關我的事，畢竟我也怕得罪其他人。', points: { 同理: -4, 勇氣: -2, 責任: 0 } },
        { text: '私下傳訊息鼓勵小文，讓他知道有人在乎他。', points: { 同理: 8, 勇氣: 4, 責任: 3 } },
      ],
    },
    {
      title: '拾到錢包時',
      story: '放學路上，你在樓梯間撿到一個錢包，裡面有現金跟一張學生證，是隔壁班同學的。四下無人，只有你知道這件事。此時你會？',
      options: [
        { text: '立刻拿去交給學務處，請他們幫忙聯絡失主。', points: { 責任: 10, 同理: 6, 勇氣: 5 } },
        { text: '直接聯絡學生證上的同學，親自歸還。', points: { 責任: 8, 同理: 8, 勇氣: 6 } },
        { text: '猶豫了一下，但最後還是決定上交。', points: { 責任: 6, 同理: 4, 勇氣: 3 } },
        { text: '想著反正沒人看到，把現金留下來。', points: { 責任: -10, 同理: -5, 勇氣: -5 } },
      ],
    },
    {
      title: '家庭意見不一致',
      story: '爸爸希望你選擇比較穩定的科系，將來有份不錯的工作；但你對繪畫和設計很有熱情，夢想是成為插畫家，這條路比較不確定。此時你會？',
      options: [
        { text: '好好跟爸爸溝通，說明自己的想法與規劃。', points: { 責任: 8, 同理: 6, 勇氣: 8 } },
        { text: '先聽爸爸的建議，之後再慢慢調整方向。', points: { 責任: 6, 同理: 5, 勇氣: 3 } },
        { text: '嘗試找到兩者兼顧的方式，例如雙主修。', points: { 責任: 7, 同理: 6, 勇氣: 6 } },
        { text: '不想溝通，直接照自己的想法做決定。', points: { 責任: -3, 同理: -4, 勇氣: 7 } },
      ],
    },
  ];

  const handleAdventureChoice = (points: Record<string, number>) => {
    const nextPoints = {
      同理: Math.max(0, adventurePoints.同理 + (points.同理 || 0)),
      責任: Math.max(0, adventurePoints.責任 + (points.責任 || 0)),
      勇氣: Math.max(0, adventurePoints.勇氣 + (points.勇氣 || 0))
    };
    setAdventurePoints(nextPoints);
    if (adventureStage < adventureScenarios.length - 1) {
      setAdventureStage(adventureStage + 1);
      showToast('⚔️ 抉擇完成，前往下一個情境冒險！');
    } else {
      setAdventureStage(adventureStage + 1); // Complete
      showToast('🌟 恭喜你，冒險關卡全數完成！');
      saveGameResult('adventure', { points: nextPoints });
    }
  };

  const resetAdventure = () => {
    setAdventureStage(0);
    setAdventurePoints({ 同理: 10, 責任: 10, 勇氣: 10 });
  };

  // ----------------------------------------------------
  // GAME STATE 4: RELATIONSHIPS
  // ----------------------------------------------------
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [selectedRel, setSelectedRel] = useState<string>('死黨');
  const [connections, setConnections] = useState<Array<{ from: string; to: string; rel: string }>>([
    { from: '陳可華', to: '王博鈞', rel: '死黨' },
    { from: '張曉萍', to: '王小文', rel: '陪伴者' },
    { from: '陳可華', to: '可華爸爸', rel: '家人' },
    { from: '陳可華', to: '可華爺爺', rel: '支持者' }
  ]);

  const handleNodeClick = (node: string) => {
    if (!selectedNode) {
      setSelectedNode(node);
    } else {
      if (selectedNode !== node) {
        // Create link
        const exists = connections.some(c => (c.from === selectedNode && c.to === node) || (c.from === node && c.to === selectedNode));
        if (exists) {
          showToast('⚠️ 這兩個角色之間已經建立了連結！');
        } else {
          const nextConnections = [...connections, { from: selectedNode, to: node, rel: selectedRel }];
          setConnections(nextConnections);
          showToast(`💖 建立了「${selectedNode}」與「${node}」的 ${selectedRel} 關係！`);
          saveGameResult('relationships', { connections: nextConnections });
        }
      }
      setSelectedNode(null);
    }
  };

  const handleRemoveConnection = (idx: number) => {
    setConnections(prev => prev.filter((_, i) => i !== idx));
    showToast('❌ 關係連結已移除。');
  };

  // ----------------------------------------------------
  // GAME STATE 5: VALUE SCALES
  // ----------------------------------------------------
  const [valuesList, setValuesList] = useState<string[]>(['愛', '自由', '責任', '誠實', '成長', '尊重']);
  const [tiltValue, setTiltValue] = useState(0); // scale tilt status
  const [reflectionText, setReflectionText] = useState('');
  
  const moveValue = (index: number, direction: 'up' | 'down') => {
    const list = [...valuesList];
    if (direction === 'up' && index > 0) {
      [list[index], list[index - 1]] = [list[index - 1], list[index]];
    } else if (direction === 'down' && index < list.length - 1) {
      [list[index], list[index + 1]] = [list[index + 1], list[index]];
    }
    setValuesList(list);

    // Dynamic tilt calculation based on first elements
    const topVal = list[0];
    if (topVal === '自由') setTiltValue(-15);
    else if (topVal === '責任') setTiltValue(15);
    else if (topVal === '愛') setTiltValue(-10);
    else if (topVal === '尊重') setTiltValue(5);
    else setTiltValue(0);
  };

  const saveReflection = () => {
    showToast('💾 您的價值排序反思已成功記錄！');
    saveGameResult('value_scale', { ranking: valuesList, reflection: reflectionText });
  };

  // ----------------------------------------------------
  // GAME STATE 6: FLIP CARDS MEMORY MATCH
  // ----------------------------------------------------
  interface MemoryCard {
    id: number;
    text: string;
    pairId: number;
    isFlipped: boolean;
    isMatched: boolean;
  }

  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCardIds, setFlippedCardIds] = useState<number[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [memoryScore, setMemoryScore] = useState(0);
  const [memoryTimer, setMemoryTimer] = useState(0);
  const [memoryFinished, setMemoryFinished] = useState(false);

  // Initialize cards
  const initMemoryGame = () => {
    const rawData = [
      { text: '勇氣', pairId: 1 },
      { text: '面對重重困難仍然前行', pairId: 1 },
      { text: '同理', pairId: 2 },
      { text: '站在同學的角度設身處地', pairId: 2 },
      { text: '責任', pairId: 3 },
      { text: '切實履行給家人的諾言', pairId: 3 },
      { text: '夢想', pairId: 4 },
      { text: '堅定追尋內心所愛的世界', pairId: 4 },
      { text: '感恩', pairId: 5 },
      { text: '時刻記得對他人的好說謝謝', pairId: 5 },
      { text: '尊重', pairId: 6 },
      { text: '理解班上每個人都是獨一無二', pairId: 6 }
    ];

    // Shuffle
    const shuffled: MemoryCard[] = rawData
      .map((item, idx) => ({
        id: idx,
        text: item.text,
        pairId: item.pairId,
        isFlipped: false,
        isMatched: false
      }))
      .sort(() => Math.random() - 0.5);

    setCards(shuffled);
    setFlippedCardIds([]);
    setMemoryMoves(0);
    setMemoryScore(0);
    setMemoryTimer(0);
    setMemoryFinished(false);
  };

  useEffect(() => {
    if (activeGameId === 6) {
      initMemoryGame();
    }
  }, [activeGameId]);

  // Handle Card Click
  const handleCardClick = (cardId: number) => {
    if (flippedCardIds.length >= 2) return;
    const clickedCard = cards.find(c => c.id === cardId);
    if (!clickedCard || clickedCard.isFlipped || clickedCard.isMatched) return;

    // Flip card
    const updatedCards = cards.map(c => c.id === cardId ? { ...c, isFlipped: true } : c);
    setCards(updatedCards);

    const nextFlipped = [...flippedCardIds, cardId];
    setFlippedCardIds(nextFlipped);

    if (nextFlipped.length === 2) {
      setMemoryMoves(prev => prev + 1);
      const [firstId, secondId] = nextFlipped;
      const firstCard = cards.find(c => c.id === firstId)!;
      const secondCard = cards.find(c => c.id === secondId)!;

      if (firstCard.pairId === secondCard.pairId) {
        // Match!
        setTimeout(() => {
          setCards(prev => prev.map(c => (c.id === firstId || c.id === secondId) ? { ...c, isMatched: true, isFlipped: true } : c));
          setMemoryScore(prev => prev + 100);
          setFlippedCardIds([]);
          showToast('🌟 完美匹配！');
        }, 500);
      } else {
        // Fail match
        setTimeout(() => {
          setCards(prev => prev.map(c => (c.id === firstId || c.id === secondId) ? { ...c, isFlipped: false } : c));
          setFlippedCardIds([]);
        }, 1200);
      }
    }
  };

  // Check victory
  useEffect(() => {
    if (cards.length > 0 && cards.every(c => c.isMatched)) {
      setMemoryFinished(true);
      saveGameResult('memory_cards', { moves: memoryMoves, score: memoryScore, timeSeconds: memoryTimer });
    }
  }, [cards]);

  // ----------------------------------------------------
  // GAME STATE 7: GRATITUDE BUBBLE WALL
  // ----------------------------------------------------
  const [gratitudeMsg, setGratitudeMsg] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [bubbleColor, setBubbleColor] = useState('#FED7AA'); // peach
  const [warmthIndex, setWarmthIndex] = useState(86);
  const [bubbles, setBubbles] = useState([
    { text: '謝謝小文今天借我橡皮擦，你總是默默照顧身邊的人！', sender: '陳可華', color: '#FED7AA' },
    { text: '謝謝博鈞放學後耐心教我數學題，你真的很厲害！', sender: '張曉萍', color: '#FBCFE8' },
    { text: '感謝林老師這週課堂上生動的引導，讓我學會珍惜生命。', sender: '王小文', color: '#D9F99D' },
    { text: '感謝曉萍跟我一起分工做藝術海報，非常有耐心！', sender: 'Anonymous', color: '#BAE6FD' }
  ]);

  const handleSendBubble = (e: React.FormEvent) => {
    e.preventDefault();
    if (!gratitudeMsg.trim()) return;

    const newBubble = {
      text: gratitudeMsg.trim(),
      sender: isAnonymous ? '匿名同學' : (currentStudent?.name || '我'),
      color: bubbleColor
    };

    setBubbles(prev => [newBubble, ...prev]);
    setWarmthIndex(prev => Math.min(100, prev + 2));
    setGratitudeMsg('');
    showToast('🎈 溫暖的感恩泡泡已成功升空！');
    saveGameResult('gratitude', { message: newBubble.text, anonymous: isAnonymous });
  };

  // ----------------------------------------------------
  // GAME STATE 8: PHILOSOPHICAL DEBATE
  // ----------------------------------------------------
  const [userVote, setUserVote] = useState<string | null>(null);
  const [debateVotes, setDebateVotes] = useState({ pro: 16, con: 14 });
  const [debateComment, setDebateComment] = useState('');
  const [comments, setComments] = useState([
    { user: '張曉萍', text: '正方博鈞說的「心靈安定才是幸福」真的很有深度，完全認同！', side: 'pro' },
    { user: '陳可華', text: '可是反方說得也對，沒有健康的成功保障，幸福有時很難持久呀？', side: 'con' },
    { user: '林老師', text: '這是一個經典的雙向思考：成功是外在的刻度，幸福是內在的羅盤。', side: 'teacher' }
  ]);

  const handleVote = (side: 'pro' | 'con') => {
    if (userVote) {
      showToast('⚠️ 您今天已經投過票囉！');
      return;
    }
    setUserVote(side);
    setDebateVotes(prev => ({
      ...prev,
      [side]: prev[side] + 1
    }));
    showToast(`🗳️ 成功投票給 ${side === 'pro' ? '正方' : '反方'}！`);
    saveGameResult('debate', { vote: side });
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!debateComment.trim()) return;

    setComments(prev => [
      ...prev,
      {
        user: currentStudent?.name || '我',
        text: debateComment.trim(),
        side: userVote || 'spectator'
      }
    ]);
    setDebateComment('');
    showToast('💬 發表評論成功！');
  };

  // ----------------------------------------------------
  // GAME STATE 9: MOOD THERMOMETER
  // ----------------------------------------------------
  const [moodLevel, setMoodLevel] = useState(4); // 1 to 6
  const [moodNote, setMoodNote] = useState('');
  const [savedMoods, setSavedMoods] = useState<Array<{ level: number; note: string; date: string }>>([]);

  const moodEmojis = [
    { label: '非常低落', emoji: '😢', color: 'text-blue-500' },
    { label: '有點低落', emoji: '🙁', color: 'text-cyan-500' },
    { label: '心情普通', emoji: '😐', color: 'text-slate-400' },
    { label: '有點開心', emoji: '🙂', color: 'text-amber-500' },
    { label: '開心愉悅', emoji: '😊', color: 'text-orange-500' },
    { label: '超級開心', emoji: '🥳', color: 'text-rose-500' }
  ];

  const handleSaveMood = () => {
    const newRecord = {
      level: moodLevel,
      note: moodNote || '無心情札記',
      date: new Date().toLocaleTimeString('zh-TW', { hour: '2-digit', minute: '2-digit' })
    };
    setSavedMoods(prev => [newRecord, ...prev]);
    setMoodNote('');
    showToast('🌡️ 今天的溫度心情已成功記錄至班級！');
    saveGameResult('mood', newRecord);
  };

  // ----------------------------------------------------
  // GAME STATE 10: BADGE CHALLENGE
  // ----------------------------------------------------
  const [badgeTasks, setBadgeTasks] = useState([
    { id: 1, text: '主動參與 1 場課堂思辨發言', done: true, badge: '思辨達人' },
    { id: 2, text: '在感恩泡泡站發送一句感謝', done: false, badge: '同理之心' },
    { id: 3, text: '在價值天平挑戰中完成反思寫作', done: false, badge: '生命探索家' },
    { id: 4, text: '完成生命故事翻翻卡全數匹配', done: false, badge: '思索先鋒' }
  ]);

  const toggleBadgeTask = (id: number) => {
    setBadgeTasks(prev => {
      const next = prev.map(t => t.id === id ? { ...t, done: !t.done } : t);
      saveGameResult('badges', { tasks: next, unlockedCount: next.filter(t => t.done).length });
      return next;
    });
    showToast('🏆 徽章任務狀態已更新！');
  };

  const unlockedBadgeCount = badgeTasks.filter(t => t.done).length;

  return (
    <div className="min-h-screen bg-[#FBF3E4] text-[#3E2723] font-sans pb-16 px-4 md:px-8 relative overflow-hidden">

      {/* Corner floral decorations (kept inside bounds so the wrapper's overflow-hidden doesn't clip them) */}
      <div className="hidden md:block absolute left-1 top-20 w-48 h-64 opacity-70 pointer-events-none select-none rotate-[8deg] z-0" aria-hidden="true">
        <svg viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 300C95 220 90 150 60 90C40 50 20 30 10 10" stroke="#B7C79A" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="55" cy="95" rx="16" ry="8" fill="#C6D6A8" transform="rotate(-30 55 95)" />
          <ellipse cx="35" cy="60" rx="16" ry="8" fill="#C6D6A8" transform="rotate(-50 35 60)" />
          <ellipse cx="20" cy="25" rx="14" ry="7" fill="#C6D6A8" transform="rotate(-70 20 25)" />
          <circle cx="70" cy="130" r="10" fill="#F3C1CE" />
          <circle cx="45" cy="170" r="8" fill="#F6D3A8" />
          <circle cx="80" cy="200" r="9" fill="#F3C1CE" />
        </svg>
      </div>
      <div className="hidden md:block absolute right-1 bottom-1 w-44 h-52 opacity-60 pointer-events-none select-none -rotate-[10deg] z-0" aria-hidden="true">
        <svg viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 240C95 180 110 130 140 90C155 70 170 55 185 40" stroke="#B7C79A" strokeWidth="3" strokeLinecap="round" />
          <ellipse cx="145" cy="95" rx="15" ry="7" fill="#C6D6A8" transform="rotate(35 145 95)" />
          <ellipse cx="165" cy="65" rx="14" ry="7" fill="#C6D6A8" transform="rotate(55 165 65)" />
          <circle cx="120" cy="140" r="9" fill="#F6D3A8" />
          <circle cx="150" cy="170" r="10" fill="#F3C1CE" />
        </svg>
      </div>

      {/* Toast Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#E65100] text-white font-extrabold text-sm px-6 py-3.5 rounded-2xl shadow-xl flex items-center gap-2 border border-[#FF8A65]"
          >
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto pt-4 space-y-6 relative z-10">
        
        {/* LOBBY VIEW */}
        {activeGameId === null ? (
          <>
            {/* HERO BANNER SECTION */}
            <div id="lobby-hero-banner" className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#FFF4EA] via-[#FFFBF6] to-[#FFF0E0] border-2 border-[#EAD5C3] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
              {/* Floral / Botanical Ornaments inside banner */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-[radial-gradient(circle_at_center,rgba(230,81,0,0.06)_0,transparent_75%)] pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-[radial-gradient(circle_at_center,rgba(76,175,80,0.06)_0,transparent_75%)] pointer-events-none" />
              
              {/* Floating Leaf SVGs */}
              <div className="absolute top-4 right-1/3 opacity-20 pointer-events-none text-emerald-600 animate-pulse">🌱</div>
              <div className="absolute bottom-4 left-1/4 opacity-25 pointer-events-none text-orange-500 animate-bounce">🍂</div>

              <div className="space-y-4 max-w-2xl text-center md:text-left z-10">
                <div className="inline-flex items-center gap-2 bg-[#FFEAD5] border border-[#F3C29F] text-[#D84315] px-4 py-1.5 rounded-full text-xs font-black tracking-wide shadow-xs uppercase">
                  <Gamepad2 className="w-4 h-4 text-orange-600" />
                  <span>互動遊戲 ‧ 班級同樂大廳</span>
                </div>
                
                <h1 className="text-2xl md:text-4xl font-black text-[#4A321F] leading-tight tracking-tight">
                  互動遊戲｜班級同樂大廳
                </h1>
                
                <p className="text-sm md:text-base font-extrabold text-[#7D5C43]/90 leading-relaxed max-w-xl">
                  老師掌控節奏，學生掃描 QR Code 即可加入，一起參與互動遊戲，讓學習更有趣！
                </p>
              </div>

              {/* Character illustrations decoration - Story Hero Pair from Character stories */}
              <div className="relative shrink-0 flex items-center justify-center z-10">
                {/* Decorative plant elements */}
                <div className="absolute -left-10 -bottom-6 text-4xl select-none opacity-85 animate-pulse">🌿</div>
                <div className="absolute -right-8 -top-8 text-4xl select-none opacity-85 animate-bounce">🌸</div>
                
                {/* Frame or container for the pair */}
                <div className="relative bg-white/70 backdrop-blur-xs p-3 rounded-3xl border-2 border-[#EAD5C3] shadow-md overflow-hidden max-w-[280px]">
                  <img 
                    src={storyHeroPair} 
                    alt="張曉萍 與 陳可華" 
                    className="w-full h-auto object-cover rounded-2xl hover:scale-102 transition-transform duration-500" 
                    referrerPolicy="no-referrer"
                  />
                  {/* Tiny captions */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-amber-50/90 border border-[#F3C29F] py-1 px-3 rounded-full shadow-xs flex items-center gap-1.5 whitespace-nowrap">
                    <span className="text-[12px] font-black text-[#8D6E63]">張曉萍 ＆ 陳可華</span>
                  </div>
                </div>
              </div>
            </div>

            {/* MAIN DASHBOARD PANEL - THREE COLUMN MASTER LAYOUT */}
            <div id="lobby-main-dashboard" className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* LEFT GROUP (col-span-9): Contains 本班遊戲入口, 老師控制台 at the top, and 10 Games below */}
              <div className="lg:col-span-9 space-y-6">
                
                {/* Top Row: 本班遊戲入口 (col-span-5) & 老師控制台 (col-span-7) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  
                  {/* 本班遊戲入口 Card */}
                  <div className="md:col-span-5 bg-[#FCFAF7] border-2 border-[#EAD5C3] rounded-3xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between">
                    <div className="absolute -top-12 -left-12 text-6xl opacity-5 pointer-events-none">🌿</div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 border-b-2 border-[#EAD5C3]/40 pb-3 mb-2">
                        <div className="p-1.5 bg-[#FFEAD5] rounded-xl text-[#E65100]">
                          <Users className="w-4 h-4" />
                        </div>
                        <h3 className="font-black text-[#4A321F] text-sm">本班遊戲入口</h3>
                      </div>

                      {/* Horizontal layout card */}
                      <div className="flex items-center gap-4 bg-white border border-[#EAD5C3]/60 p-4 pb-5 rounded-2xl shadow-3xs">
                        {/* QR Code Box with auto-refresh countdown ring */}
                        <div className="relative w-24 h-24 shrink-0">
                          {/* Countdown ring */}
                          <svg className="absolute inset-0 w-24 h-24 -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                            <circle cx="50" cy="50" r="46" fill="none" stroke="#FCE1D1" strokeWidth="4" />
                            <circle
                              cx="50" cy="50" r="46" fill="none" stroke="#E65100" strokeWidth="4"
                              strokeDasharray={2 * Math.PI * 46}
                              strokeDashoffset={2 * Math.PI * 46 * (1 - qrProgressPercent / 100)}
                              strokeLinecap="round"
                              style={{ transition: 'stroke-dashoffset 1s linear' }}
                            />
                          </svg>
                          <div key={qrVersion} className="absolute inset-1.5 bg-[#FFFDF9] border-2 border-[#FAD8C1] rounded-xl p-1.5 flex flex-col items-center justify-center overflow-hidden group">
                            {/* Fake QR code blocks - re-seeded on each refresh */}
                            <div
                              className="w-full h-full opacity-90"
                              style={{
                                backgroundImage: 'radial-gradient(#4A321F 2.5px, transparent 2.5px)',
                                backgroundSize: '6px 6px',
                                backgroundPosition: `${(qrVersion * 3) % 6}px ${(qrVersion * 2) % 6}px`
                              }}
                            />
                            <div className="absolute top-2 left-2 w-5 h-5 border-2 border-[#4A321F] bg-white rounded-xs" />
                            <div className="absolute top-2 right-2 w-5 h-5 border-2 border-[#4A321F] bg-white rounded-xs" />
                            <div className="absolute bottom-2 left-2 w-5 h-5 border-2 border-[#4A321F] bg-white rounded-xs" />
                            <div className="absolute w-4 h-4 bg-[#FFEAD5] border-2 border-[#E65100] rounded-full flex items-center justify-center shadow-xs">
                              <span className="text-[12px]">📙</span>
                            </div>
                          </div>
                          {/* Seconds-left badge */}
                          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#E65100] text-white text-[10.5px] font-black px-2 py-0.5 rounded-full shadow-xs whitespace-nowrap flex items-center gap-1">
                            <RefreshCw className="w-2.5 h-2.5" />
                            <span>{qrSecondsLeft}s 後更新</span>
                          </div>
                        </div>

                        {/* Class Info */}
                        <div className="space-y-1.5 flex-1 text-left">
                          <span className="text-[12px] font-black text-slate-400 block uppercase">班級代碼</span>
                          <span className="text-2xl font-black text-[#E65100] tracking-widest font-mono bg-[#FFF8F2] py-0.5 px-2.5 rounded-lg border border-[#FCD2B5] inline-block">4A28</span>
                          
                          <div className="text-[12px] font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 inline-flex items-center gap-1.5 mt-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span>已加入 32 / 40 人</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action buttons side-by-side */}
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <button 
                        onClick={handleCopyLink}
                        className="py-2.5 bg-white hover:bg-orange-50 border-2 border-[#E65100] text-[#E65100] font-black text-xs rounded-xl transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
                      >
                        <LinkIcon className="w-3.5 h-3.5" />
                        <span>複製連結</span>
                      </button>
                      <button 
                        onClick={() => {
                          setActiveGameId(1);
                          showToast('🎮 遊戲開始！歡迎加入第一關！');
                        }}
                        className="py-2.5 bg-[#E65100] hover:bg-[#D84315] text-white border-2 border-[#D84315] font-black text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer active:scale-98 hover:shadow-md"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>開始遊戲</span>
                      </button>
                    </div>
                  </div>

                  {/* 老師控制台 Card */}
                  <div className="md:col-span-7 bg-[#FCFAF7] border-2 border-[#EAD5C3] rounded-3xl p-5 shadow-sm relative overflow-hidden flex flex-col justify-between">
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 border-b-2 border-[#EAD5C3]/40 pb-3 mb-2">
                        <div className="p-1.5 bg-[#FFEAD5] rounded-xl text-[#E65100]">
                          <Tv className="w-4 h-4" />
                        </div>
                        <h3 className="font-black text-[#4A321F] text-sm">老師控制台</h3>
                      </div>

                      {/* Game mode selectors */}
                      <div className="space-y-1.5">
                        <label className="text-[12.5px] font-black text-slate-400 block text-left uppercase">🎮 遊戲模式</label>
                        <div className="grid grid-cols-3 gap-1.5 bg-white p-1 rounded-xl border border-[#EAD5C3]/40 shadow-3xs">
                          <button className="py-1 px-2.5 bg-[#FFF0E0] border border-[#F3C29F] rounded-lg text-xs font-black text-[#D84315] flex items-center justify-center gap-1 shadow-3xs">
                            <span>👤 個人作答</span>
                          </button>
                          <button className="py-1 px-2.5 hover:bg-slate-50 border border-transparent rounded-lg text-xs font-black text-slate-500 flex items-center justify-center gap-1 transition-all">
                            <span>👥 小組競賽</span>
                          </button>
                          <button className="py-1 px-2.5 hover:bg-slate-50 border border-transparent rounded-lg text-xs font-black text-slate-500 flex items-center justify-center gap-1 transition-all">
                            <span>🤝 全班合作</span>
                          </button>
                        </div>
                      </div>

                      {/* Class teams setup with portraits */}
                      <div className="space-y-1.5">
                        <label className="text-[12.5px] font-black text-slate-400 block text-left uppercase">👥 參賽小隊設定 (共 4 隊)</label>
                        <div className="grid grid-cols-2 gap-2">
                          {/* Team 1: 張曉萍 */}
                          <div className="bg-white border border-[#F0E2D5] p-1.5 rounded-xl flex items-center justify-between gap-2 shadow-3xs hover:border-[#F3C29F] transition-colors">
                            <div className="flex items-center gap-2">
                              <img src={charXiaopingImg} className="w-6 h-6 rounded-full border border-pink-200 object-cover" />
                              <span className="text-xs font-black text-slate-800">張曉萍隊</span>
                            </div>
                            <span className="text-[12px] text-emerald-600 font-extrabold bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-100">8人</span>
                          </div>
                          
                          {/* Team 2: 王博鈞 */}
                          <div className="bg-white border border-[#F0E2D5] p-1.5 rounded-xl flex items-center justify-between gap-2 shadow-3xs hover:border-[#F3C29F] transition-colors">
                            <div className="flex items-center gap-2">
                              <img src={charBojunImg} className="w-6 h-6 rounded-full border border-blue-200 object-cover" />
                              <span className="text-xs font-black text-slate-800">王博鈞隊</span>
                            </div>
                            <span className="text-[12px] text-emerald-600 font-extrabold bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-100">8人</span>
                          </div>

                          {/* Team 3: 陳可華 */}
                          <div className="bg-white border border-[#F0E2D5] p-1.5 rounded-xl flex items-center justify-between gap-2 shadow-3xs hover:border-[#F3C29F] transition-colors">
                            <div className="flex items-center gap-2">
                              <img src={charKehuaImg} className="w-6 h-6 rounded-full border border-sky-200 object-cover" />
                              <span className="text-xs font-black text-slate-800">陳可華隊</span>
                            </div>
                            <span className="text-[12px] text-emerald-600 font-extrabold bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-100">8人</span>
                          </div>

                          {/* Team 4: 王小文 */}
                          <div className="bg-white border border-[#F0E2D5] p-1.5 rounded-xl flex items-center justify-between gap-2 shadow-3xs hover:border-[#F3C29F] transition-colors">
                            <div className="flex items-center gap-2">
                              <img src={charXiaowenImg} className="w-6 h-6 rounded-full border border-purple-200 object-cover" />
                              <span className="text-xs font-black text-slate-800">王小文隊</span>
                            </div>
                            <span className="text-[12px] text-emerald-600 font-extrabold bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-100">8人</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Row: 10 款互動遊戲列表 (takes full width of Left Group - col-span-9) */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center gap-2 border-b-2 border-[#EAD5C3]/40 pb-2">
                    <Gamepad2 className="w-5 h-5 text-[#E65100]" />
                    <h2 className="text-base font-black text-[#4A321F]">課堂專用互動遊戲（共 10 款）</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                    {GAMES.map((game) => (
                      <div 
                        key={game.id}
                        className="bg-white border-2 border-[#EAD5C3] hover:border-[#E65100] p-4 rounded-3xl transition-all duration-300 shadow-3xs flex flex-col justify-between min-h-[225px] group hover:-translate-y-1 relative"
                      >
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className={`text-[12px] font-black font-mono px-2 py-0.5 rounded-md border ${game.color}`}>
                              {game.number}
                            </span>
                          </div>

                          {/* Custom vector illustration inside */}
                          <div className="h-14 w-full rounded-xl overflow-hidden shadow-3xs">
                            {renderGameIllustration(game.id)}
                          </div>

                          <div className="space-y-1 text-left">
                            <h4 className="font-black text-xs text-[#4A321F] group-hover:text-[#E65100] transition-colors leading-tight line-clamp-1">
                              {game.title}
                            </h4>
                            <p className="text-[12px] text-slate-400 font-bold leading-normal line-clamp-2">
                              {game.description}
                            </p>
                          </div>
                        </div>

                        <button 
                          onClick={() => {
                            setActiveGameId(game.id);
                            showToast(`🎮 歡迎進入：${game.title}！`);
                          }}
                          className="w-full mt-2.5 py-1.5 bg-white hover:bg-orange-50 border-2 border-[#EAD5C3] group-hover:border-[#E65100] rounded-xl text-[12px] font-black text-[#4A321F] group-hover:text-[#E65100] transition-all shadow-3xs flex items-center justify-center gap-0.5 cursor-pointer"
                        >
                          <span>進入遊戲</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT GROUP (col-span-3): Projection settings and Classroom Timelines */}
              <div className="lg:col-span-3 space-y-6">
                
                {/* 投影模式設定 */}
                <div className="bg-[#FCFAF7] border-2 border-[#EAD5C3] rounded-3xl p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b-2 border-[#EAD5C3]/60 pb-3">
                    <span className="font-black text-[#4A321F] text-sm">投影模式設定</span>
                    {/* Toggle switch simulation */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[12px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">已開啟</span>
                      <div className="w-9 h-5 bg-emerald-500 rounded-full p-0.5 cursor-pointer flex justify-end shadow-inner">
                        <div className="w-4 h-4 bg-white rounded-full shadow-xs" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3.5 text-xs font-extrabold text-[#7D5C43] leading-relaxed text-left">
                    <div className="flex justify-between items-center bg-white border border-[#F0E2D5] p-2.5 rounded-xl shadow-3xs">
                      <span className="text-slate-400 text-[12.5px]">隨機出題模式:</span>
                      <span className="font-black text-[#E65100]">開啟 (不重覆)</span>
                    </div>
                    <div className="flex justify-between items-center bg-white border border-[#F0E2D5] p-2.5 rounded-xl shadow-3xs">
                      <span className="text-slate-400 text-[12.5px]">單題答題計時:</span>
                      <span className="font-black text-[#E65100]">30 秒 / 題</span>
                    </div>
                  </div>
                </div>

                {/* 課堂互動流程 */}
                <div className="bg-[#FCFAF7] border-2 border-[#EAD5C3] rounded-3xl p-5 shadow-sm space-y-4 relative overflow-hidden">
                  <div className="absolute -bottom-10 -right-10 text-5xl opacity-5 pointer-events-none">🌿</div>
                  
                  <div className="flex items-center gap-2 border-b-2 border-[#EAD5C3]/60 pb-3">
                    <span className="text-lg">📋</span>
                    <h3 className="font-black text-[#4A321F] text-sm">課堂互動流程</h3>
                  </div>

                  {/* Vertical Timeline stepper */}
                  <div className="space-y-4 relative pl-5 text-left">
                    <div className="absolute left-1.5 top-2 bottom-2 w-0.5 border-l-2 border-dashed border-[#F3C29F]" />
                    
                    <div className="relative">
                      <div className="absolute -left-5 top-0.5 w-3.5 h-3.5 rounded-full bg-[#E65100] border-2 border-white shadow-xs flex items-center justify-center text-[12px] text-white font-black">1</div>
                      <div className="leading-tight">
                        <div className="text-xs font-black text-[#4A321F]">Step 1 老師選擇遊戲</div>
                        <p className="text-[12px] text-slate-400 font-bold leading-normal mt-0.5">點選下方 10 款互動遊戲之一，按「進入遊戲」</p>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-5 top-0.5 w-3.5 h-3.5 rounded-full bg-[#E65100] border-2 border-white shadow-xs flex items-center justify-center text-[12px] text-white font-black">2</div>
                      <div className="leading-tight">
                        <div className="text-xs font-black text-[#4A321F]">Step 2 學生掃描 QR Code</div>
                        <p className="text-[12px] text-slate-400 font-bold leading-normal mt-0.5">學生開啟手機鏡頭，掃描 left 側班級大 QR Code</p>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-5 top-0.5 w-3.5 h-3.5 rounded-full bg-[#E65100] border-2 border-white shadow-xs flex items-center justify-center text-[12px] text-white font-black">3</div>
                      <div className="leading-tight">
                        <div className="text-xs font-black text-[#4A321F]">Step 3 學生進入遊戲</div>
                        <p className="text-[12px] text-slate-400 font-bold leading-normal mt-0.5">學生輸入座號姓名，一秒登入班級同樂大廳</p>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-5 top-0.5 w-3.5 h-3.5 rounded-full bg-[#E65100] border-2 border-white shadow-xs flex items-center justify-center text-[12px] text-white font-black">4</div>
                      <div className="leading-tight">
                        <div className="text-xs font-black text-[#4A321F]">Step 4 全班即時作答／小組比賽</div>
                        <p className="text-[12px] text-slate-400 font-bold leading-normal mt-0.5">手機端與課堂大投影同步作答，累積生命點數</p>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-5 top-0.5 w-3.5 h-3.5 rounded-full bg-[#E65100] border-2 border-white shadow-xs flex items-center justify-center text-[12px] text-white font-black">5</div>
                      <div className="leading-tight">
                        <div className="text-xs font-black text-[#4A321F]">Step 5 顯示結果與總結</div>
                        <p className="text-[12px] text-slate-400 font-bold leading-normal mt-0.5">大螢幕秀出全班答題分佈，老師進行一鍵點評</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FOOTER TIPS CARDS - BOTTOM 3 COLUMN USAGE ADVICE (Matches Image 1 exactly) */}
            <div id="lobby-footer-tips" className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t-2 border-[#EAD5C3]/60">
              {/* Card 1: 使用建議 */}
              <div className="bg-white border-2 border-[#EAD5C3]/40 rounded-2xl p-5 flex gap-3.5 items-start relative overflow-hidden group hover:border-[#E65100] transition-colors">
                <div className="absolute -bottom-6 -right-6 text-3xl opacity-10 pointer-events-none group-hover:scale-110 transition-transform">💡</div>
                <div className="p-2.5 bg-orange-50 border border-[#FCD2B5] rounded-xl text-[#E65100] text-xl shadow-xs">💡</div>
                <div className="space-y-1 text-left">
                  <h5 className="font-black text-sm text-[#4A321F]">使用建議</h5>
                  <p className="text-[12.5px] text-slate-400 font-bold leading-relaxed">
                    活絡氣氛、提升專注力，讓每一堂課都充滿參與感。
                  </p>
                </div>
              </div>
              
              {/* Card 2: 課中互動 */}
              <div className="bg-white border-2 border-[#EAD5C3]/40 rounded-2xl p-5 flex gap-3.5 items-start relative overflow-hidden group hover:border-[#E65100] transition-colors">
                <div className="absolute -bottom-6 -right-6 text-3xl opacity-10 pointer-events-none group-hover:scale-110 transition-transform">🌸</div>
                <div className="p-2.5 bg-orange-50 border border-[#FCD2B5] rounded-xl text-[#E65100] text-xl shadow-xs">📖</div>
                <div className="space-y-1 text-left">
                  <h5 className="font-black text-sm text-[#4A321F]">課中互動</h5>
                  <p className="text-[12.5px] text-slate-400 font-bold leading-relaxed">
                    搭配課程內容，強化理解與思考，讓學生主動參與學習。
                  </p>
                </div>
              </div>

              {/* Card 3: 課後複習 */}
              <div className="bg-white border-2 border-[#EAD5C3]/40 rounded-2xl p-5 flex gap-3.5 items-start relative overflow-hidden group hover:border-[#E65100] transition-colors">
                <div className="absolute -bottom-6 -right-6 text-3xl opacity-10 pointer-events-none group-hover:scale-110 transition-transform">🌻</div>
                <div className="p-2.5 bg-orange-50 border border-[#FCD2B5] rounded-xl text-[#E65100] text-xl shadow-xs">📊</div>
                <div className="space-y-1 text-left">
                  <h5 className="font-black text-sm text-[#4A321F]">課後複習</h5>
                  <p className="text-[12.5px] text-slate-400 font-bold leading-relaxed">
                    筆記學習重點，檢視學習成果，培養自我反思能力。
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-6">
            
            {/* BACK TO LOBBY BUTTON */}
            <div className="flex items-center justify-between bg-[#FCFAF6] border border-[#F1E0CE] rounded-2xl px-4 py-2.5 shadow-3xs">
              <button 
                onClick={() => {
                  setActiveGameId(null);
                  showToast('🚪 已返回班級同樂大廳');
                }}
                className="px-4 py-1.5 border border-[#F1E0CE] hover:bg-[#FAF5EC] text-slate-600 font-black text-xs rounded-xl transition-all flex items-center gap-1.5 cursor-pointer bg-white shadow-3xs"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>返回大廳</span>
              </button>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#7D6B5D] bg-[#FAF5EC] px-3.5 py-1.5 rounded-full border border-[#F1E0CE]">
                  🎮 當前同樂：{GAMES.find(g => g.id === activeGameId)?.title}
                </span>
              </div>
            </div>

            {/* ------------------------------------------------------------------------------------------------- */}
            {/* GAME VIEW 1: MBTI QUIZ */}
            {/* ------------------------------------------------------------------------------------------------- */}
            {activeGameId === 1 && (
              <div id="game-view-mbti" className="space-y-6">
                {/* 1. Banner */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#FFF4EA] via-[#FFFBF6] to-[#FFF0E0] border-2 border-[#EAD5C3] p-6 md:p-8 flex items-center justify-between gap-6 shadow-sm">
                  <div className="absolute top-4 left-10 text-3xl opacity-20 pointer-events-none select-none">🌸</div>
                  <div className="absolute bottom-3 right-1/3 text-3xl opacity-20 pointer-events-none select-none">🌿</div>
                  <div className="flex items-center gap-5 z-10">
                    <div className="w-16 h-16 rounded-full bg-[#E65100] text-white flex items-center justify-center text-2xl font-black font-mono shrink-0 shadow-md">01</div>
                    <div className="space-y-1 text-left">
                      <h2 className="text-2xl md:text-3xl font-black text-[#4A321F]">心理測驗 MBTI</h2>
                      <p className="text-xs md:text-sm font-bold text-[#7D5C43]/90">探索你的性格類型，了解自己與他人。</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-end -space-x-3 z-10 shrink-0 pr-2">
                    {[charXiaopingImg, charKehuaImg, charXiaowenImg, charBojunImg].map((src, i) => (
                      <img key={i} src={src} alt="" className="w-16 h-16 rounded-full object-cover border-[3px] border-white shadow-md" style={{ zIndex: 4 - i }} referrerPolicy="no-referrer" />
                    ))}
                  </div>
                </div>

                {!mbtiStarted ? (
                  /* ---------- LANDING SUB-VIEW ---------- */
                  <div className="space-y-6">
                    <div className="bg-white border-2 border-[#EAD5C3] rounded-3xl p-6 shadow-sm space-y-4 text-left">
                      <h3 className="font-black text-[#4A321F] text-sm flex items-center gap-2">
                        <span>⭐</span><span>認識 16 種性格類型</span>
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {MBTI_GROUPS.map((g) => (
                          <div key={g.name} className={`p-4 rounded-2xl border-2 ${MBTI_GROUP_STYLES[g.color]}`}>
                            <h4 className="font-black text-sm mb-1.5">{g.name}</h4>
                            <p className="text-[12.5px] font-bold leading-relaxed opacity-90 mb-2.5">{g.desc}</p>
                            <p className="text-[12px] font-black font-mono opacity-80">{g.types}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
                      <div className="bg-[#FFFDF9] border-2 border-[#EAD5C3] rounded-3xl p-5 flex items-start gap-3 text-left shadow-xs">
                        <img src={charDadImg} alt="可華爸爸" className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm shrink-0" referrerPolicy="no-referrer" />
                        <div>
                          <h5 className="font-black text-xs text-slate-800 mb-1">可華爸爸的小叮嚀</h5>
                          <p className="text-[12.5px] text-slate-500 font-bold leading-relaxed">每一種性格都有獨特的價值，了解自己，才能更自在地發揮優勢，與他人相互欣賞。</p>
                        </div>
                      </div>

                      <button
                        onClick={() => setMbtiStarted(true)}
                        className="bg-[#E65100] hover:bg-[#D84315] text-white rounded-3xl p-6 flex flex-col items-center justify-center gap-2 shadow-md transition-all cursor-pointer active:scale-98"
                      >
                        <span className="flex items-center gap-2 text-base font-black"><Gamepad2 className="w-5 h-5" /> 開始作答</span>
                        <span className="text-[12.5px] font-bold text-orange-100">準備好了嗎？讓我們一起探索真實的你！</span>
                      </button>

                      <div className="bg-[#FFFDF9] border-2 border-[#EAD5C3] rounded-3xl p-5 flex items-start gap-3 text-left shadow-xs">
                        <img src={charGrandpaImg} alt="可華爺爺" className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm shrink-0" referrerPolicy="no-referrer" />
                        <div>
                          <h5 className="font-black text-xs text-slate-800 mb-1">可華爺爺的鼓勵</h5>
                          <p className="text-[12.5px] text-slate-500 font-bold leading-relaxed">人生是一場美麗的旅程，認識自己，你會發現更想成為那個自己。</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : mbtiStep < mbtiQuestions.length ? (
                  /* ---------- QUIZ SUB-VIEW ---------- */
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                    {/* Left: Progress donut + tips */}
                    <div className="lg:col-span-3 space-y-4">
                      <div className="bg-[#FCFAF7] border-2 border-[#EAD5C3] rounded-3xl p-5 shadow-xs text-left">
                        <h4 className="font-black text-[#4A321F] text-xs pb-2 mb-3.5 flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5 text-[#E65100]" /><span>測驗進度</span>
                        </h4>
                        <div className="flex items-center gap-3">
                          <div
                            className="w-16 h-16 rounded-full shrink-0 flex items-center justify-center"
                            style={{ background: `conic-gradient(#E65100 ${(Object.keys(mbtiAnswers).length / mbtiQuestions.length) * 100}%, #EAD5C3 0)` }}
                          >
                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[12.5px] font-black text-[#4A321F]">
                              {Object.keys(mbtiAnswers).length}/{mbtiQuestions.length}
                            </div>
                          </div>
                          <p className="text-[12.5px] font-bold text-slate-500 leading-relaxed">繼續作答，探索最真實的自己！</p>
                        </div>
                      </div>
                      <div className="bg-[#FFFDF9] border-2 border-[#EAD5C3] rounded-3xl p-5 shadow-xs text-left space-y-2">
                        <h4 className="font-black text-[#4A321F] text-xs flex items-center gap-1.5">💡 測驗小提醒</h4>
                        <ul className="text-[12.5px] font-bold text-slate-500 leading-relaxed space-y-1 list-disc list-inside">
                          <li>依直覺作答，不用想太久</li>
                          <li>沒有對錯，誠實最重要</li>
                          <li>約需 8-10 分鐘完成測驗</li>
                        </ul>
                      </div>
                    </div>

                    {/* Middle: Question */}
                    <div className="lg:col-span-6 bg-white border-2 border-[#EAD5C3] rounded-3xl p-6 shadow-sm text-left">
                      <div className="flex justify-between items-center border-b-2 border-[#F1E0CE]/60 pb-3 mb-4">
                        <span className="text-xs font-black text-slate-500 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg">第 {mbtiStep + 1} 題 / 共 {mbtiQuestions.length} 題</span>
                      </div>
                      <h3 className="text-base font-black text-[#4A321F] leading-relaxed mb-4">{mbtiQuestions[mbtiStep].q}</h3>
                      <div className="space-y-3">
                        {mbtiQuestions[mbtiStep].options.map((opt, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleMbtiAnswer(opt.val)}
                            className="w-full text-left p-3.5 rounded-2xl border-2 border-[#F1E0CE] hover:border-[#E65100] hover:bg-orange-50/50 transition-all shadow-xs cursor-pointer flex items-center gap-3 group active:scale-98"
                          >
                            <span className={`w-7 h-7 rounded-full ${MBTI_OPTION_COLORS[idx]} text-white text-xs font-black flex items-center justify-center shrink-0`}>
                              {String.fromCharCode(65 + idx)}
                            </span>
                            <span className="text-xs font-black text-[#4A321F] group-hover:text-[#E65100]">{opt.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Right: Tendency bars */}
                    <div className="lg:col-span-3 bg-[#FCFAF7] border-2 border-[#EAD5C3] rounded-3xl p-5 shadow-xs text-left space-y-4">
                      <h4 className="font-black text-[#4A321F] text-xs flex items-center gap-1.5">🎁 你的傾向</h4>
                      {[
                        { axis: 'EI', a: 'E', b: 'I', la: '外向', lb: '內向' },
                        { axis: 'SN', a: 'S', b: 'N', la: '感覺', lb: '直覺' },
                        { axis: 'TF', a: 'T', b: 'F', la: '思考', lb: '情感' },
                        { axis: 'JP', a: 'J', b: 'P', la: '判斷', lb: '知覺' },
                      ].map((row) => (
                        <div key={row.axis} className="space-y-1">
                          <div className="flex justify-between text-[12.5px] font-black text-[#7D6B5D]">
                            <span>{row.la} {row.a}</span>
                            <span>{row.lb} {row.b}</span>
                          </div>
                          <div className="w-full h-2.5 bg-white border border-[#EAD5C3] rounded-full overflow-hidden flex">
                            <div className="bg-[#E65100] transition-all duration-500" style={{ width: `${mbtiAxisPercent(row.axis, row.a)}%` }} />
                            <div className="bg-slate-300 transition-all duration-500" style={{ width: `${100 - mbtiAxisPercent(row.axis, row.a)}%` }} />
                          </div>
                        </div>
                      ))}
                      <p className="text-[12px] font-bold text-[#B4570B] pt-1">✨ 完成更多題目，結果會更準確喔！</p>
                    </div>
                  </div>
                ) : (
                  /* ---------- RESULT SUB-VIEW ---------- */
                  <div className="bg-white border-2 border-[#EAD5C3] rounded-3xl p-8 shadow-sm text-center space-y-5">
                    <div className="inline-flex p-4 bg-orange-100 rounded-full text-[#E65100]">
                      <Award className="w-12 h-12" />
                    </div>
                    <div className="space-y-2">
                      <div className="text-xs font-black text-slate-400 uppercase tracking-widest">您的生命性格指標</div>
                      <h3 className="text-3xl font-black text-[#E65100] tracking-wider font-mono">{getMbtiResult()}</h3>
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto font-bold bg-[#FAF5EC]/60 p-4 rounded-xl border border-[#F1E0CE]/60 text-left">
                      這代表你格外在乎生命的內在連結。你相信生命具有無限可能，不甘於平庸，且願意給予身邊每個人溫柔的包容！
                    </p>
                    <button
                      onClick={resetMbti}
                      className="px-6 py-2 border-2 border-[#E65100] text-[#E65100] font-black text-xs rounded-xl hover:bg-orange-50 transition-all cursor-pointer shadow-xs active:scale-98"
                    >
                      重做測驗
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* ------------------------------------------------------------------------------------------------- */}
            {/* GAME VIEW 2: LIFE PUZZLE MAP */}
            {/* ------------------------------------------------------------------------------------------------- */}
            {activeGameId === 2 && (
              <div id="game-view-puzzle" className="space-y-6">
                {/* 1. Banner */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#FFF4EA] via-[#FFFBF6] to-[#FFF0E0] border-2 border-[#EAD5C3] p-6 md:p-8 flex items-center justify-between gap-6 shadow-sm">
                  <div className="absolute top-4 left-10 text-3xl opacity-20 pointer-events-none select-none">🌸</div>
                  <div className="absolute bottom-3 right-1/3 text-3xl opacity-20 pointer-events-none select-none">🌿</div>
                  <div className="flex items-center gap-5 z-10">
                    <div className="w-16 h-16 rounded-full bg-[#E65100] text-white flex items-center justify-center text-2xl font-black font-mono shrink-0 shadow-md">02</div>
                    <div className="space-y-1 text-left">
                      <h2 className="text-2xl md:text-3xl font-black text-[#4A321F]">生命拼圖地圖</h2>
                      <p className="text-xs md:text-sm font-bold text-[#7D5C43]/90">拼出生命教育地圖，認識課本五大主題。</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-end -space-x-3 z-10 shrink-0 pr-2">
                    {[charKehuaImg, charXiaopingImg, charBojunImg, charXiaowenImg, charDadImg].map((src, i) => (
                      <img key={i} src={src} alt="" className="w-14 h-14 rounded-full object-cover border-[3px] border-white shadow-md" style={{ zIndex: 5 - i }} referrerPolicy="no-referrer" />
                    ))}
                  </div>
                </div>

                {/* 2. Three-Column Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                  {/* Left: Draggable pieces list */}
                  <div className="lg:col-span-3 space-y-4">
                    <div className="bg-white border-2 border-[#EAD5C3] rounded-3xl p-5 shadow-xs text-left">
                      <h4 className="font-black text-[#4A321F] text-xs pb-2 mb-3 flex items-center gap-1.5">📌 <span>可拖曳拼圖</span></h4>
                      <p className="text-[12px] font-bold text-slate-400 mb-3">將左側拼圖拖曳到地圖上對應的位置！</p>
                      <div className="space-y-2.5">
                        {PUZZLE_THEMES.map((t) => (
                          <div
                            key={t.key}
                            draggable={!puzzlePlaced[t.key]}
                            onDragStart={(e) => e.dataTransfer.setData('text/plain', t.key)}
                            className={`flex items-center gap-2.5 p-2.5 rounded-xl border-2 ${PUZZLE_STYLES[t.color]} ${puzzlePlaced[t.key] ? 'opacity-30 cursor-not-allowed' : 'cursor-grab active:cursor-grabbing'}`}
                          >
                            <span className="text-lg shrink-0">{t.emoji}</span>
                            <div className="text-left leading-tight">
                              <div className="text-xs font-black">{t.key}</div>
                              <div className="text-[12px] font-bold opacity-80">{t.desc}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Middle: Puzzle board */}
                  <div className="lg:col-span-6 bg-white border-2 border-[#EAD5C3] rounded-3xl p-6 shadow-sm">
                    <div className="grid grid-cols-2 gap-2 mb-2">
                      {['哲學思考', '人學探索'].map((key) => (
                        <PuzzleZone key={key} themeKey={key} placed={puzzlePlaced[key]} onDropTheme={handlePlacePuzzle} />
                      ))}
                    </div>
                    <div className="mb-2">
                      <PuzzleZone themeKey="終極關懷" placed={puzzlePlaced['終極關懷']} onDropTheme={handlePlacePuzzle} tall />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {['價值思辨', '靈性修養'].map((key) => (
                        <PuzzleZone key={key} themeKey={key} placed={puzzlePlaced[key]} onDropTheme={handlePlacePuzzle} />
                      ))}
                    </div>
                    <p className="text-center text-[12.5px] font-bold text-slate-400 mt-4">🖐️ 拖曳左側拼圖到對應位置，完成五大主題地圖！</p>
                  </div>

                  {/* Right: Progress + dad tip */}
                  <div className="lg:col-span-3 space-y-4">
                    <div className="bg-[#FCFAF7] border-2 border-[#EAD5C3] rounded-3xl p-5 shadow-xs text-left">
                      <h4 className="font-black text-[#4A321F] text-xs pb-2 mb-3 flex items-center gap-1.5">🧩 <span>拼圖完成度</span></h4>
                      <div className="flex items-center gap-3">
                        <div
                          className="w-16 h-16 rounded-full shrink-0 flex items-center justify-center"
                          style={{ background: `conic-gradient(#E65100 ${(Object.values(puzzlePlaced).filter(Boolean).length / 5) * 100}%, #EAD5C3 0)` }}
                        >
                          <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[12.5px] font-black text-[#4A321F]">
                            {Object.values(puzzlePlaced).filter(Boolean).length}/5
                          </div>
                        </div>
                        <p className="text-[12.5px] font-bold text-slate-500 leading-relaxed">
                          已完成 <b className="text-[#E65100]">{Object.values(puzzlePlaced).filter(Boolean).length}</b> 個主題，
                          再完成 {5 - Object.values(puzzlePlaced).filter(Boolean).length} 個即可解鎖獎勵！
                        </p>
                      </div>
                    </div>
                    <div className="bg-[#FFFDF9] border-2 border-[#EAD5C3] rounded-3xl p-5 shadow-xs text-left">
                      <div className="flex items-center gap-2 border-b border-[#EAD5C3] pb-2.5 mb-3">
                        <img src={charDadImg} alt="可華爸爸" className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm" referrerPolicy="no-referrer" />
                        <h5 className="font-black text-xs text-slate-800">可華爸爸的小提醒</h5>
                      </div>
                      <p className="text-[12.5px] text-[#7D5C43] leading-relaxed font-bold bg-[#FAF5EC]/40 p-3.5 rounded-xl border border-[#F1E0CE]/40">
                        生命是一幅拼圖，每個主題都是重要的一塊，用心學習，就能拼出屬於你的生命地圖！
                      </p>
                    </div>
                  </div>
                </div>

                {/* 3. Completed themes + actions */}
                <div className="bg-white border-2 border-[#EAD5C3] rounded-3xl p-5 shadow-sm">
                  <h4 className="font-black text-[#4A321F] text-xs mb-3 flex items-center gap-1.5">🏅 <span>已完成的主題</span></h4>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
                    {PUZZLE_THEMES.map((t) => (
                      <div key={t.key} className={`rounded-xl border-2 p-3 text-center ${puzzlePlaced[t.key] ? PUZZLE_STYLES[t.color] : 'bg-slate-50 border-slate-200 text-slate-300'}`}>
                        <div className="text-xs font-black">{t.key}</div>
                        <div className="text-[12px] font-bold mt-1">{puzzlePlaced[t.key] ? '已完成' : '尚未完成'}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3 justify-end">
                    <button onClick={resetPuzzle} className="px-5 py-2 border-2 border-[#F1E0CE] text-slate-500 font-black text-xs rounded-xl hover:bg-slate-50 transition-all cursor-pointer">重置拼圖</button>
                    <button
                      onClick={() => {
                        const done = Object.values(puzzlePlaced).every(Boolean);
                        showToast(done ? '🎉 恭喜完成生命拼圖地圖！' : '⚠️ 還有拼圖尚未完成喔！');
                        if (done) saveGameResult('puzzle', { placed: puzzlePlaced });
                      }}
                      className="px-6 py-2 bg-[#E65100] hover:bg-[#D84315] text-white font-black text-xs rounded-xl shadow-sm transition-all cursor-pointer active:scale-98"
                    >
                      完成送出
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------------------------------------- */}
            {/* GAME VIEW 3: SCENARIO ADVENTURE */}
            {/* ------------------------------------------------------------------------------------------------- */}
            {activeGameId === 3 && (
              <div id="game-view-adventure" className="space-y-6">
                {/* 1. Banner */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#FFF4EA] via-[#FFFBF6] to-[#FFF0E0] border-2 border-[#EAD5C3] p-6 md:p-8 flex items-center justify-between gap-6 shadow-sm">
                  <div className="absolute top-4 left-10 text-3xl opacity-20 pointer-events-none select-none">🌸</div>
                  <div className="absolute bottom-3 right-1/3 text-3xl opacity-20 pointer-events-none select-none">🌿</div>
                  <div className="flex items-center gap-5 z-10">
                    <div className="w-16 h-16 rounded-full bg-[#E65100] text-white flex items-center justify-center text-2xl font-black font-mono shrink-0 shadow-md">03</div>
                    <div className="space-y-1 text-left">
                      <h2 className="text-2xl md:text-3xl font-black text-[#4A321F]">情境選擇大冒險</h2>
                      <p className="text-xs md:text-sm font-bold text-[#7D5C43]/90">面對生活情境做出選擇，看你的價值觀會帶你走向哪裡？</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-end -space-x-3 z-10 shrink-0 pr-2">
                    {[charKehuaImg, charXiaowenImg].map((src, i) => (
                      <img key={i} src={src} alt="" className="w-16 h-16 rounded-full object-cover border-[3px] border-white shadow-md" style={{ zIndex: 2 - i }} referrerPolicy="no-referrer" />
                    ))}
                  </div>
                </div>

                {/* 2. Three-Column Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                  {/* Left: Progress checklist */}
                  <div className="lg:col-span-3 space-y-4">
                    <div className="bg-[#FCFAF7] border-2 border-[#EAD5C3] rounded-3xl p-5 shadow-xs text-left">
                      <h4 className="font-black text-[#4A321F] text-xs pb-2 mb-3 flex items-center gap-1.5">🗺️ <span>冒險進度</span></h4>
                      <div className="text-2xl font-black text-[#E65100] font-mono mb-1">
                        {Math.min(adventureStage, adventureScenarios.length)} / {adventureScenarios.length} <span className="text-xs text-slate-400 font-bold">已完成的關卡</span>
                      </div>
                      <div className="w-full h-2.5 bg-white border border-[#EAD5C3] rounded-full overflow-hidden mb-4">
                        <div className="h-full bg-[#E65100] transition-all" style={{ width: `${(Math.min(adventureStage, adventureScenarios.length) / adventureScenarios.length) * 100}%` }} />
                      </div>
                      <div className="space-y-2">
                        {adventureScenarios.map((s, i) => (
                          <div key={s.title} className="flex items-center gap-2 text-[12.5px] font-black">
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[12px] ${
                              i < adventureStage ? 'bg-emerald-500 text-white' : i === adventureStage ? 'bg-[#E65100] text-white' : 'bg-slate-200 text-slate-400'
                            }`}>
                              {i < adventureStage ? '✓' : i + 1}
                            </span>
                            <span className={i < adventureStage ? 'text-emerald-700' : i === adventureStage ? 'text-[#E65100]' : 'text-slate-300'}>{s.title}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Middle: Scenario story + choices */}
                  <div className="lg:col-span-6 bg-white border-2 border-[#EAD5C3] rounded-3xl p-6 shadow-sm text-left">
                    {adventureStage < adventureScenarios.length ? (
                      <div className="space-y-4">
                        <h3 className="text-sm font-black text-[#4A321F] flex items-center gap-1.5">📖 <span>情境故事</span></h3>
                        <div className="bg-[#FAF8F5] border border-[#EAD5C3] rounded-2xl p-4">
                          <p className="text-xs font-black text-[#4A321F] mb-2">{adventureScenarios[adventureStage].title}</p>
                          <p className="text-xs font-bold text-[#7D5C43] leading-relaxed">{adventureScenarios[adventureStage].story}</p>
                        </div>
                        <p className="text-[12.5px] font-black text-slate-400">請選擇你會怎麼做：</p>
                        <div className="space-y-2.5">
                          {adventureScenarios[adventureStage].options.map((opt, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleAdventureChoice(opt.points)}
                              className="w-full text-left p-3.5 rounded-2xl border-2 border-[#F1E0CE] hover:border-[#E65100] hover:bg-orange-50/50 transition-all shadow-xs cursor-pointer active:scale-98 flex items-center gap-3"
                            >
                              <span className="w-6 h-6 rounded-full bg-[#E65100] text-white text-xs font-black flex items-center justify-center shrink-0">{idx + 1}</span>
                              <span className="font-bold text-xs text-[#4A321F]">{opt.text}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6 text-center py-6">
                        <div className="inline-flex p-4 bg-emerald-100 rounded-full text-[#1B5E20] animate-bounce">
                          <Compass className="w-12 h-12" />
                        </div>
                        <h3 className="text-xl font-black text-[#1B5E20]">✨ 冒險成功！你的生命抉擇成果 ✨</h3>
                        <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
                          <div className="bg-[#F0FDF4] border border-emerald-200 rounded-2xl p-3 text-center">
                            <span className="text-xs font-black text-slate-400 block">同理</span>
                            <span className="text-xl font-black text-emerald-600 font-mono">{adventurePoints.同理}</span>
                          </div>
                          <div className="bg-[#EFF6FF] border border-blue-200 rounded-2xl p-3 text-center">
                            <span className="text-xs font-black text-slate-400 block">責任</span>
                            <span className="text-xl font-black text-blue-600 font-mono">{adventurePoints.責任}</span>
                          </div>
                          <div className="bg-[#FFFDF2] border border-amber-200 rounded-2xl p-3 text-center">
                            <span className="text-xs font-black text-slate-400 block">勇氣</span>
                            <span className="text-xl font-black text-amber-600 font-mono">{adventurePoints.勇氣}</span>
                          </div>
                        </div>
                        <button
                          onClick={resetAdventure}
                          className="px-6 py-2 border-2 border-[#E65100] text-[#E65100] font-black text-xs rounded-xl hover:bg-orange-50 transition-all cursor-pointer shadow-xs active:scale-98"
                        >
                          重來一次
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Right: Value points */}
                  <div className="lg:col-span-3 space-y-4">
                    <div className="bg-[#FFFDF9] border-2 border-[#EAD5C3] rounded-3xl p-5 shadow-xs text-left">
                      <h4 className="font-black text-[#4A321F] text-xs pb-2 mb-3 flex items-center gap-1.5">🏅 <span>價值點數</span></h4>
                      <p className="text-[12px] font-bold text-slate-400 mb-3">做出有價值的選擇，累積點數！</p>
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between bg-white border border-rose-200 rounded-xl px-3.5 py-2.5">
                          <span className="text-xs font-black text-rose-600 flex items-center gap-1.5">❤️ 同理</span>
                          <span className="text-sm font-black text-rose-600 font-mono">{adventurePoints.同理} 點</span>
                        </div>
                        <div className="flex items-center justify-between bg-white border border-emerald-200 rounded-xl px-3.5 py-2.5">
                          <span className="text-xs font-black text-emerald-700 flex items-center gap-1.5">🛡️ 責任</span>
                          <span className="text-sm font-black text-emerald-700 font-mono">{adventurePoints.責任} 點</span>
                        </div>
                        <div className="flex items-center justify-between bg-white border border-amber-200 rounded-xl px-3.5 py-2.5">
                          <span className="text-xs font-black text-amber-700 flex items-center gap-1.5">⭐ 勇氣</span>
                          <span className="text-sm font-black text-amber-700 font-mono">{adventurePoints.勇氣} 點</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. Adventure map stepper */}
                <div className="bg-white border-2 border-[#EAD5C3] rounded-3xl p-5 shadow-sm">
                  <h4 className="font-black text-[#4A321F] text-xs mb-4 flex items-center gap-1.5">🗺️ <span>冒險地圖</span></h4>
                  <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
                    {adventureScenarios.map((s, i) => (
                      <React.Fragment key={s.title}>
                        <div className="flex flex-col items-center gap-1.5 shrink-0">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs ${
                            i < adventureStage ? 'bg-emerald-500 text-white' : i === adventureStage ? 'bg-[#E65100] text-white' : 'bg-slate-200 text-slate-400'
                          }`}>
                            {i < adventureStage ? '✓' : i > adventureStage ? '🔒' : i + 1}
                          </div>
                          <span className="text-[12px] font-black text-slate-500 text-center max-w-[64px] leading-tight">{s.title}</span>
                        </div>
                        {i < adventureScenarios.length - 1 && <div className="flex-1 h-0.5 bg-[#EAD5C3] min-w-[16px]" />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------------------------------------- */}
            {/* GAME VIEW 4: RELATIONSHIP LINKS */}
            {/* ------------------------------------------------------------------------------------------------- */}
            {/* ------------------------------------------------------------------------------------------------- */}
            {/* GAME VIEW 4: RELATIONSHIP LINKS */}
            {/* ------------------------------------------------------------------------------------------------- */}
            {activeGameId === 4 && (
              <div id="game-view-relationships" className="space-y-6">
                {/* 1. Banner */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#FFF4EA] via-[#FFFBF6] to-[#FFF0E0] border-2 border-[#EAD5C3] p-6 md:p-8 flex items-center justify-between gap-6 shadow-sm">
                  <div className="absolute top-4 left-10 text-3xl opacity-20 pointer-events-none select-none">🌸</div>
                  <div className="absolute bottom-3 right-1/3 text-3xl opacity-20 pointer-events-none select-none">🌿</div>
                  <div className="flex items-center gap-5 z-10">
                    <div className="w-16 h-16 rounded-full bg-[#E65100] text-white flex items-center justify-center text-2xl font-black font-mono shrink-0 shadow-md">04</div>
                    <div className="space-y-1 text-left">
                      <h2 className="text-2xl md:text-3xl font-black text-[#4A321F]">人際關係連連看</h2>
                      <p className="text-xs md:text-sm font-bold text-[#7D5C43]/90">連線人物與關係，理解陪伴與支持。</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-end -space-x-3 z-10 shrink-0 pr-2">
                    {[charKehuaImg, charXiaowenImg].map((src, i) => (
                      <img key={i} src={src} alt="" className="w-16 h-16 rounded-full object-cover border-[3px] border-white shadow-md" style={{ zIndex: 2 - i }} referrerPolicy="no-referrer" />
                    ))}
                  </div>
                </div>

                {/* 2. Three-Column Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column (col-span-3): Connections List */}
                  <div className="lg:col-span-3 space-y-4">
                    <div className="bg-[#FCFAF7] border-2 border-[#EAD5C3] rounded-3xl p-5 shadow-xs text-left relative overflow-hidden">
                      <div className="absolute -top-10 -left-10 text-4xl opacity-5 pointer-events-none">💖</div>
                      <h4 className="font-black text-[#4A321F] text-xs border-b border-[#EAD5C3] pb-2 mb-3.5 flex items-center gap-1.5 uppercase">
                        <span>💖</span>
                        <span>已建立支持網絡 ({connections.length})</span>
                      </h4>

                      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                        {connections.length === 0 ? (
                          <p className="text-[12px] text-slate-400 font-bold py-4 text-center">暫無關係連結，快在右側點擊兩個角色建立紅線吧！</p>
                        ) : (
                          connections.map((c, idx) => (
                            <div key={idx} className="bg-white border border-[#EAD5C3] p-2 rounded-xl flex justify-between items-center shadow-xs text-xs font-bold text-[#4A321F]">
                              <div className="flex items-center gap-1">
                                <span className="truncate max-w-[50px]">{c.from}</span>
                                <span className="text-[#E65100]">↔️</span>
                                <span className="truncate max-w-[50px]">{c.to}</span>
                                <span className="bg-indigo-50 text-indigo-600 border border-indigo-100 px-1.5 py-0.5 rounded-md text-[10.5px] ml-1 shrink-0">
                                  {c.rel}
                                </span>
                              </div>

                              <button 
                                onClick={() => handleRemoveConnection(idx)}
                                className="text-slate-300 hover:text-red-500 transition-colors shrink-0 p-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Middle Column (col-span-6): Interactive Relations Canvas */}
                  <div className="lg:col-span-6 bg-white border-2 border-[#EAD5C3] rounded-3xl p-6 shadow-sm">
                    <div className="text-center mb-4 space-y-1">
                      <h3 className="text-xs font-black text-slate-500">💖 關係連線互動大畫布 💖</h3>
                      <p className="text-[12px] text-slate-400 font-bold">
                        目前已點選角色：{selectedNode ? <span className="text-purple-600 font-black bg-purple-50 px-2 py-0.5 rounded border border-purple-100">{selectedNode}</span> : <span className="text-slate-400">請先點選下方第一個角色</span>}
                      </p>
                    </div>

                    {/* Nodes grid */}
                    <div className="grid grid-cols-3 gap-3 max-w-md mx-auto py-2">
                      {[
                        { name: '陳可華', img: charKehuaImg },
                        { name: '王博鈞', img: charBojunImg },
                        { name: '張曉萍', img: charXiaopingImg },
                        { name: '王小文', img: charXiaowenImg },
                        { name: '可華爸爸', img: charDadImg },
                        { name: '可華爺爺', img: charGrandpaImg },
                      ].map(({ name: node, img }) => (
                        <div 
                          key={node}
                          onClick={() => handleNodeClick(node)}
                          className={`p-3 border-2 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all select-none ${
                            selectedNode === node 
                              ? 'border-purple-600 bg-purple-50 scale-102 shadow-md font-black text-purple-700' 
                              : 'border-dashed border-[#F1E0CE] bg-[#FCFAF6] hover:bg-purple-50/20 hover:border-purple-400 hover:scale-102'
                          }`}
                        >
                          <img src={img} alt={node} className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs" referrerPolicy="no-referrer" />
                          <span className="text-[12.5px] font-black text-[#4A321F] mt-1.5">{node}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-center gap-3 border-t border-[#F1E0CE] pt-4 mt-4">
                      <span className="text-xs font-black text-slate-400">關係標籤：</span>
                      <div className="flex gap-1.5 flex-wrap justify-center">
                        {['家人', '死黨', '陪伴者', '支持者'].map(r => (
                          <button
                            key={r}
                            onClick={() => setSelectedRel(r)}
                            className={`px-3 py-1 text-xs font-black rounded-lg transition-all border ${
                              selectedRel === r 
                                ? 'bg-purple-600 border-purple-600 text-white shadow-xs' 
                                : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 cursor-pointer'
                            }`}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column (col-span-3): Character card */}
                  <div className="lg:col-span-3 space-y-4">
                    <div className="bg-[#FFFDF9] border-2 border-[#EAD5C3] rounded-3xl p-5 shadow-xs text-left relative overflow-hidden">
                      <div className="absolute -bottom-8 -right-8 text-5xl opacity-10 pointer-events-none">✨</div>
                      <div className="flex items-center gap-2 border-b border-[#EAD5C3] pb-2.5 mb-3">
                        <img src={charXiaowenImg} alt="王小文" className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm" referrerPolicy="no-referrer" />
                        <div className="text-left leading-none">
                          <h5 className="font-black text-xs text-slate-800">王小文的悄悄話</h5>
                          <span className="text-[12px] text-slate-400">暖心好朋友</span>
                        </div>
                      </div>
                      <p className="text-[12.5px] text-[#7D5C43] leading-relaxed font-bold bg-[#FAF5EC]/40 p-3.5 rounded-xl border border-[#F1E0CE]/40">
                        「可華，我們在世界上都不是一座孤島。看著你拉出的這條關係連結網，我才明白原來我們身邊隨時都包圍著這麼多默默支持我們的人，心裡好溫暖喔！」
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------------------------------------- */}
            {/* GAME VIEW 5: VALUE SCALES */}
            {/* ------------------------------------------------------------------------------------------------- */}
            {/* ------------------------------------------------------------------------------------------------- */}
            {/* GAME VIEW 5: VALUE SCALES */}
            {/* ------------------------------------------------------------------------------------------------- */}
            {activeGameId === 5 && (
              <div id="game-view-value-scales" className="space-y-6">
                {/* 1. Banner */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#FFF4EA] via-[#FFFBF6] to-[#FFF0E0] border-2 border-[#EAD5C3] p-6 md:p-8 flex items-center justify-between gap-6 shadow-sm">
                  <div className="absolute top-4 left-10 text-3xl opacity-20 pointer-events-none select-none">🌸</div>
                  <div className="absolute bottom-3 right-1/3 text-3xl opacity-20 pointer-events-none select-none">🌿</div>
                  <div className="flex items-center gap-5 z-10">
                    <div className="w-16 h-16 rounded-full bg-[#E65100] text-white flex items-center justify-center text-2xl font-black font-mono shrink-0 shadow-md">05</div>
                    <div className="space-y-1 text-left">
                      <h2 className="text-2xl md:text-3xl font-black text-[#4A321F]">價值天平排序戰</h2>
                      <p className="text-xs md:text-sm font-bold text-[#7D5C43]/90">排序你的價值觀，認識重要的選擇。</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-end -space-x-3 z-10 shrink-0 pr-2">
                    {[charXiaopingImg, charBojunImg, charDadImg, charGrandpaImg, charXiaowenImg].map((src, i) => (
                      <img key={i} src={src} alt="" className="w-14 h-14 rounded-full object-cover border-[3px] border-white shadow-md" style={{ zIndex: 5 - i }} referrerPolicy="no-referrer" />
                    ))}
                  </div>
                </div>

                {/* 2. Three-Column Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column (col-span-3): Gravity Tilt Scales */}
                  <div className="lg:col-span-3 space-y-4">
                    <div className="bg-[#FCFAF7] border-2 border-[#EAD5C3] rounded-3xl p-5 shadow-xs text-left relative overflow-hidden flex flex-col items-center">
                      <div className="absolute -top-10 -left-10 text-4xl opacity-5 pointer-events-none">⚖️</div>
                      <h4 className="font-black text-[#4A321F] text-xs border-b border-[#EAD5C3] pb-2 mb-3.5 flex items-center gap-1.5 uppercase w-full">
                        <span>⚖️</span>
                        <span>心靈天平傾斜</span>
                      </h4>

                      <div className="w-full text-center space-y-3">
                        <div className="text-[12.5px] font-black text-slate-400">當前天平狀態</div>
                        <div className="text-xs font-black text-[#E65100] bg-orange-50 px-2.5 py-1.5 rounded-lg border border-orange-200 leading-tight">
                          首要核心：{valuesList[0]}
                        </div>
                      </div>

                      {/* Graphic balance scales */}
                      <div className="relative py-6 flex flex-col items-center select-none">
                        {/* Horizontal balance bar that tilts */}
                        <div 
                          className="w-44 h-3 bg-[#8D6E63] rounded-full flex justify-between px-2 transition-transform duration-500 relative"
                          style={{ transform: `rotate(${tiltValue}deg)` }}
                        >
                          <div className="w-7 h-7 rounded-full bg-amber-400 border-2 border-[#5D4037] shadow-sm flex items-center justify-center text-[10.5px] font-black -mt-2 truncate text-slate-800">
                            {valuesList[0]?.slice(0, 2)}
                          </div>
                          <div className="w-7 h-7 rounded-full bg-slate-300 border-2 border-[#5D4037] shadow-sm flex items-center justify-center text-[10.5px] font-black -mt-2 truncate text-slate-500">
                            {valuesList[valuesList.length - 1]?.slice(0, 2)}
                          </div>
                        </div>
                        {/* Stand */}
                        <div className="w-2.5 h-16 bg-[#5D4037]" />
                        <div className="w-16 h-2 bg-[#4E342E] rounded-t-md" />
                      </div>

                      <p className="text-[10.5px] text-[#7D6B5D] font-bold text-center leading-relaxed">
                        天平將隨著您最看重（卡片首位）與最輕忽的價值自動產生傾斜。
                      </p>
                    </div>
                  </div>

                  {/* Middle Column (col-span-6): Interactive Value Scales Ordering & Writing */}
                  <div className="lg:col-span-6 space-y-6">
                    {/* Ordering card */}
                    <div className="bg-white border-2 border-[#EAD5C3] rounded-3xl p-6 shadow-sm">
                      <h3 className="text-xs font-black text-slate-500 border-b-2 border-[#F1E0CE]/60 pb-3 mb-4">🔄 拖曳微調價值優先順序</h3>
                      
                      <div className="space-y-2 text-left">
                        {valuesList.map((val, idx) => (
                          <div 
                            key={val}
                            className="bg-[#FCFAF7] border-2 border-[#F1E0CE]/50 px-4 py-2.5 rounded-xl flex items-center justify-between shadow-xs text-xs font-black text-[#4A321F] hover:border-[#E65100]/60 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded bg-[#E65100]/10 text-[#E65100] flex items-center justify-center font-black text-[12px]">
                                {idx + 1}
                              </span>
                              <span>{val}</span>
                            </div>

                            <div className="flex gap-1.5">
                              <button 
                                onClick={() => moveValue(idx, 'up')}
                                disabled={idx === 0}
                                className="p-1 px-2 border-2 border-slate-200 hover:border-orange-300 rounded-lg bg-white disabled:opacity-30 cursor-pointer text-[12px] hover:bg-orange-50 active:scale-95 transition-all font-black"
                              >
                                ⬆️
                              </button>
                              <button 
                                onClick={() => moveValue(idx, 'down')}
                                disabled={idx === valuesList.length - 1}
                                className="p-1 px-2 border-2 border-slate-200 hover:border-orange-300 rounded-lg bg-white disabled:opacity-30 cursor-pointer text-[12px] hover:bg-orange-50 active:scale-95 transition-all font-black"
                              >
                                ⬇️
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Reflection input card */}
                    <div className="bg-white border-2 border-[#EAD5C3] rounded-3xl p-6 shadow-sm space-y-3">
                      <h3 className="text-xs font-black text-slate-500 flex items-center gap-1.5 border-b-2 border-[#F1E0CE]/60 pb-3">
                        <span>📝</span>
                        <span>我的價值反思（寫作大廳同步）</span>
                      </h3>
                      <textarea
                        value={reflectionText}
                        onChange={(e) => setReflectionText(e.target.value)}
                        placeholder="請用一兩句話寫下：為什麼您會做出這樣的價值優先順序選擇？這代表您最想守護的是什麼？"
                        className="w-full h-24 p-3 border-2 border-[#F1E0CE] rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:border-[#E65100] bg-[#FAF8F5]/30 focus:bg-white transition-all resize-none"
                      />
                      <div className="flex justify-end">
                        <button 
                          onClick={saveReflection}
                          className="px-5 py-2 bg-[#E65100] hover:bg-[#D84315] text-white font-black text-xs rounded-xl shadow-xs flex items-center gap-1 cursor-pointer active:scale-98 transition-transform"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>儲存我的反思</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Right Column (col-span-3): Father's guidance */}
                  <div className="lg:col-span-3 space-y-4">
                    <div className="bg-[#FFFDF9] border-2 border-[#EAD5C3] rounded-3xl p-5 shadow-xs text-left relative overflow-hidden">
                      <div className="absolute -bottom-8 -right-8 text-5xl opacity-10 pointer-events-none">🌿</div>
                      <div className="flex items-center gap-2 border-b border-[#EAD5C3] pb-2.5 mb-3">
                        <img src={charDadImg} alt="可華爸爸" className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm" referrerPolicy="no-referrer" />
                        <div className="text-left leading-none">
                          <h5 className="font-black text-xs text-slate-800">可華爸爸的引導</h5>
                          <span className="text-[12px] text-slate-400">生命諮商導師</span>
                        </div>
                      </div>
                      <p className="text-[12.5px] text-[#7D5C43] leading-relaxed font-bold bg-[#FAF5EC]/40 p-3.5 rounded-xl border border-[#F1E0CE]/40">
                        「小博，在『自由』與『責任』之間，我們每個人都在尋求一種平衡。自由給予我們飛翔的羽翼，而責任則是拉住風箏的那根線。想一想，若一味追求其中一個，生命會面臨什麼樣的失衡呢？」
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------------------------------------- */}
            {/* GAME VIEW 6: LIFE STORY FLIP CARDS */}
            {/* ------------------------------------------------------------------------------------------------- */}
            {/* ------------------------------------------------------------------------------------------------- */}
            {/* GAME VIEW 6: LIFE STORY FLIP CARDS */}
            {/* ------------------------------------------------------------------------------------------------- */}
            {activeGameId === 6 && (
              <div id="game-view-life-memory" className="space-y-6">
                {/* 1. Banner */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#FFF4EA] via-[#FFFBF6] to-[#FFF0E0] border-2 border-[#EAD5C3] p-6 md:p-8 flex items-center justify-between gap-6 shadow-sm">
                  <div className="absolute top-4 left-10 text-3xl opacity-20 pointer-events-none select-none">🌸</div>
                  <div className="absolute bottom-3 right-1/3 text-3xl opacity-20 pointer-events-none select-none">🌿</div>
                  <div className="flex items-center gap-5 z-10">
                    <div className="w-16 h-16 rounded-full bg-[#E65100] text-white flex items-center justify-center text-2xl font-black font-mono shrink-0 shadow-md">06</div>
                    <div className="space-y-1 text-left">
                      <h2 className="text-2xl md:text-3xl font-black text-[#4A321F]">生命故事翻翻卡</h2>
                      <p className="text-xs md:text-sm font-bold text-[#7D5C43]/90">翻開故事卡，配對對應的生命主題。</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-end -space-x-3 z-10 shrink-0 pr-2">
                    {[charGrandpaImg, charBojunImg, charXiaopingImg, charXiaowenImg, charDadImg, charKehuaImg].map((src, i) => (
                      <img key={i} src={src} alt="" className="w-12 h-12 rounded-full object-cover border-[3px] border-white shadow-md" style={{ zIndex: 6 - i }} referrerPolicy="no-referrer" />
                    ))}
                  </div>
                </div>

                {/* 2. Three-Column Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column (col-span-3): Matching Guide */}
                  <div className="lg:col-span-3 space-y-4">
                    <div className="bg-[#FCFAF7] border-2 border-[#EAD5C3] rounded-3xl p-5 shadow-xs text-left relative overflow-hidden">
                      <div className="absolute -top-10 -left-10 text-4xl opacity-5 pointer-events-none">⭐</div>
                      <h4 className="font-black text-[#4A321F] text-xs border-b border-[#EAD5C3] pb-2 mb-3 flex items-center gap-1.5 uppercase">
                        <span>⭐</span>
                        <span>生命價值配對指南</span>
                      </h4>

                      <ul className="text-[12.5px] text-[#7D6B5D] font-bold space-y-2.5 leading-relaxed">
                        <li className="flex items-start gap-1">
                          <span className="text-[#E65100]">🎯</span>
                          <span><b>勇氣</b> ↔ 面對困難仍然堅定前行</span>
                        </li>
                        <li className="flex items-start gap-1">
                          <span className="text-[#E65100]">🎯</span>
                          <span><b>同理</b> ↔ 站在同學角度設身處地</span>
                        </li>
                        <li className="flex items-start gap-1">
                          <span className="text-[#E65100]">🎯</span>
                          <span><b>責任</b> ↔ 切實履行給家人的諾言</span>
                        </li>
                        <li className="flex items-start gap-1">
                          <span className="text-[#E65100]">🎯</span>
                          <span><b>夢想</b> ↔ 堅定追尋心中喜愛的世界</span>
                        </li>
                        <li className="flex items-start gap-1">
                          <span className="text-[#E65100]">🎯</span>
                          <span><b>感恩</b> ↔ 對他人的熱心由衷說謝謝</span>
                        </li>
                        <li className="flex items-start gap-1">
                          <span className="text-[#E65100]">🎯</span>
                          <span><b>尊重</b> ↔ 欣賞班上每個人獨特之處</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Middle Column (col-span-6): Interactive Card Play Area */}
                  <div className="lg:col-span-6 bg-white border-2 border-[#EAD5C3] rounded-3xl p-6 shadow-sm">
                    <div className="flex justify-between items-center border-b-2 border-[#F1E0CE]/60 pb-3 mb-4 text-xs font-black text-[#4A321F]">
                      <div className="flex gap-4">
                        <span className="bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200">計步：{memoryMoves} 步</span>
                        <span className="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-lg border border-emerald-200">得分：{memoryScore} 分</span>
                      </div>
                      <button 
                        onClick={initMemoryGame}
                        className="text-pink-600 font-extrabold flex items-center gap-1 hover:underline cursor-pointer bg-pink-50 px-2.5 py-1 rounded-lg border border-pink-200"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>重新洗牌</span>
                      </button>
                    </div>

                    {memoryFinished ? (
                      <div className="text-center py-8 space-y-4">
                        <div className="text-4xl animate-bounce">🏆</div>
                        <h3 className="text-lg font-black text-rose-600">恭喜全班成功配對所有生命故事！</h3>
                        <p className="text-xs text-slate-400 font-bold">總計花費了 {memoryMoves} 步，獲得 {memoryScore} 分！</p>
                        <button 
                          onClick={initMemoryGame}
                          className="px-6 py-2 bg-[#E65100] hover:bg-[#D84315] text-white font-black text-xs rounded-xl shadow-xs cursor-pointer"
                        >
                          再玩一次
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {cards.map((card) => (
                          <div 
                            key={card.id}
                            onClick={() => handleCardClick(card.id)}
                            className={`aspect-square rounded-2xl flex items-center justify-center text-center p-2 border-2 text-[12.5px] font-black transition-all cursor-pointer select-none ${
                              card.isMatched 
                                ? 'bg-emerald-50/70 border-emerald-300 text-emerald-800 scale-95 shadow-inner' 
                                : card.isFlipped 
                                  ? 'bg-rose-50 border-rose-300 text-rose-800 rotate-1 shadow-xs' 
                                  : 'bg-[#FCFAF7] border-[#F1E0CE] text-slate-400 hover:border-pink-400 hover:bg-[#FFFBF5] relative overflow-hidden hover:scale-102'
                            }`}
                          >
                            {card.isFlipped || card.isMatched ? (
                              <span className="leading-tight font-black">{card.text}</span>
                            ) : (
                              <div className="flex flex-col items-center">
                                <span className="text-lg">⭐</span>
                                <span className="text-[10.5px] text-slate-400 font-bold mt-1">點擊翻轉</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Right Column (col-span-3): Encouragement character card */}
                  <div className="lg:col-span-3 space-y-4">
                    <div className="bg-[#FFFDF9] border-2 border-[#EAD5C3] rounded-3xl p-5 shadow-xs text-left relative overflow-hidden">
                      <div className="absolute -bottom-8 -right-8 text-5xl opacity-10 pointer-events-none">✨</div>
                      <div className="flex items-center gap-2 border-b border-[#EAD5C3] pb-2.5 mb-3">
                        <img src={charXiaopingImg} alt="張曉萍" className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm" referrerPolicy="no-referrer" />
                        <div className="text-left leading-none">
                          <h5 className="font-black text-xs text-slate-800">張曉萍的小提醒</h5>
                          <span className="text-[12px] text-slate-400">貼心好同學</span>
                        </div>
                      </div>
                      <p className="text-[12.5px] text-[#7D5C43] leading-relaxed font-bold bg-[#FAF5EC]/40 p-3.5 rounded-xl border border-[#F1E0CE]/40">
                        「可華，在記憶卡片的翻轉中，你是不是也發現生命情境故事與內在核心價值，其實是緊密呼應、互相陪伴的呢？靜下心來，你一定能完全配對成功的！」
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------------------------------------- */}
            {/* GAME VIEW 7: GRATITUDE BUBBLE WALL */}
            {/* ------------------------------------------------------------------------------------------------- */}
            {/* ------------------------------------------------------------------------------------------------- */}
            {/* GAME VIEW 7: GRATITUDE BUBBLE WALL */}
            {/* ------------------------------------------------------------------------------------------------- */}
            {activeGameId === 7 && (
              <div id="game-view-gratitude-bubbles" className="space-y-6">
                {/* 1. Banner */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#FFF4EA] via-[#FFFBF6] to-[#FFF0E0] border-2 border-[#EAD5C3] p-6 md:p-8 flex items-center justify-between gap-6 shadow-sm">
                  <div className="absolute top-4 left-10 text-3xl opacity-20 pointer-events-none select-none">🌸</div>
                  <div className="absolute bottom-3 right-1/3 text-3xl opacity-20 pointer-events-none select-none">🌿</div>
                  <div className="flex items-center gap-5 z-10">
                    <div className="w-16 h-16 rounded-full bg-[#E65100] text-white flex items-center justify-center text-2xl font-black font-mono shrink-0 shadow-md">07</div>
                    <div className="space-y-1 text-left">
                      <h2 className="text-2xl md:text-3xl font-black text-[#4A321F]">感恩泡泡站</h2>
                      <p className="text-xs md:text-sm font-bold text-[#7D5C43]/90">寫下感謝的話，讓溫暖在班上飄散。</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-end -space-x-3 z-10 shrink-0 pr-2">
                    {[charXiaopingImg, charXiaowenImg, charGrandpaImg].map((src, i) => (
                      <img key={i} src={src} alt="" className="w-14 h-14 rounded-full object-cover border-[3px] border-white shadow-md" style={{ zIndex: 3 - i }} referrerPolicy="no-referrer" />
                    ))}
                  </div>
                </div>

                {/* 2. Three-Column Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-[#4A321F]">
                  
                  {/* Left Column (col-span-3): Warmth Index Display */}
                  <div className="lg:col-span-3 space-y-4">
                    <div className="bg-[#FCFAF7] border-2 border-[#EAD5C3] rounded-3xl p-5 shadow-xs text-left relative overflow-hidden">
                      <div className="absolute -top-10 -left-10 text-4xl opacity-5 pointer-events-none">🎈</div>
                      <h4 className="font-black text-[#4A321F] text-xs border-b border-[#EAD5C3] pb-2 mb-4 flex items-center gap-1.5 uppercase">
                        <span>💖</span>
                        <span>班級感恩溫暖指數</span>
                      </h4>

                      <div className="text-center space-y-3 py-2">
                        <div className="text-4xl font-black text-rose-500 font-mono animate-pulse">
                          {warmthIndex} ℃
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200 p-0.5">
                          <div 
                            className="h-full bg-gradient-to-r from-pink-500 to-rose-500 rounded-full transition-all duration-500" 
                            style={{ width: `${warmthIndex}%` }} 
                          />
                        </div>
                        <p className="text-[12px] text-slate-400 font-bold leading-relaxed">
                          每發送一顆泡泡，班級感恩指數就會上升 2℃！大家攜手共創班級大愛，點亮我們的幸福世界！
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#EAD5C3]/60 flex items-center justify-between text-[12.5px] font-black text-slate-500">
                        <span>已發送泡泡總數</span>
                        <span className="text-xs text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100">{bubbles.length} 個</span>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column (col-span-6): Send Form & Floating Bubbles Wall */}
                  <div className="lg:col-span-6 space-y-6">
                    {/* Send Form */}
                    <div className="bg-white border-2 border-[#EAD5C3] rounded-3xl p-6 shadow-sm space-y-4 text-left">
                      <h3 className="text-xs font-black text-slate-500 border-b-2 border-[#F1E0CE]/60 pb-3 flex items-center gap-1">
                        <span>✍️</span>
                        <span>撰寫您的溫馨感恩卡</span>
                      </h3>

                      <form onSubmit={handleSendBubble} className="space-y-4">
                        <div>
                          <textarea
                            value={gratitudeMsg}
                            onChange={(e) => setGratitudeMsg(e.target.value)}
                            placeholder="在這裡寫下您想對同學、老師或家人表達的誠摯謝意與溫暖話語..."
                            rows={3}
                            maxLength={120}
                            className="w-full px-4 py-3 border-2 border-[#F1E0CE] rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:border-emerald-500 bg-[#FAF8F5]/30 focus:bg-white transition-all resize-none leading-relaxed"
                          />
                          <div className="text-right text-[12px] text-slate-400 font-bold mt-1">
                            最多 120 字（當前：{gratitudeMsg.length} 字）
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          {/* Color Picker & Anon Toggle */}
                          <div className="space-y-2 text-left">
                            <span className="text-[12px] text-slate-400 font-black block">選擇泡泡背景色：</span>
                            <div className="flex items-center gap-2">
                              {[
                                { color: '#FED7AA', label: '暖橘' },
                                { color: '#FBCFE8', label: '粉櫻' },
                                { color: '#D9F99D', label: '青葉' },
                                { color: '#BAE6FD', label: '晴藍' }
                              ].map(b => (
                                <button
                                  key={b.color}
                                  type="button"
                                  onClick={() => setBubbleColor(b.color)}
                                  className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer ${
                                    bubbleColor === b.color 
                                      ? 'border-[#E65100] scale-110 shadow-xs' 
                                      : 'border-transparent scale-100 hover:scale-105'
                                  }`}
                                  style={{ backgroundColor: b.color }}
                                  title={b.label}
                                />
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <label className="flex items-center gap-1.5 text-xs font-black text-slate-500 cursor-pointer select-none">
                              <input
                                type="checkbox"
                                checked={isAnonymous}
                                onChange={(e) => setIsAnonymous(e.target.checked)}
                                className="w-4 h-4 text-emerald-600 border-2 border-[#EAD5C3] rounded-sm focus:ring-0 cursor-pointer"
                              />
                              <span>匿名送出</span>
                            </label>

                            <button
                              type="submit"
                              disabled={!gratitudeMsg.trim()}
                              className={`px-5 py-2.5 rounded-2xl text-xs font-black text-white shadow-3xs flex items-center gap-1.5 active:scale-98 transition-all cursor-pointer ${
                                gratitudeMsg.trim() 
                                  ? 'bg-emerald-600 hover:bg-emerald-700 shadow-sm' 
                                  : 'bg-slate-300 pointer-events-none'
                              }`}
                            >
                              <span>🎈 送出泡泡</span>
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>

                    {/* Bubbles Wall Display */}
                    <div className="space-y-3">
                      <h3 className="text-xs font-black text-slate-500 text-left flex items-center gap-1 pl-2">
                        <span>🎈</span>
                        <span>感恩泡泡即時飄浮牆（最新升空）</span>
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {bubbles.map((b, idx) => (
                          <div
                            key={idx}
                            style={{ backgroundColor: b.color }}
                            className="p-4 rounded-3xl shadow-xs border-2 border-white text-left space-y-2 transform hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
                          >
                            <div className="absolute top-0 right-0 w-12 h-12 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.25)_0,transparent_60%)] pointer-events-none rounded-full" />
                            <p className="text-[12.5px] font-black text-slate-800 leading-relaxed">
                              「{b.text}」
                            </p>
                            <div className="flex justify-between items-center text-[10.5px] font-bold text-slate-500 pt-1 border-t border-black/5">
                              <span>來自：{b.sender}</span>
                              <span className="text-[12px] tracking-wide uppercase px-1.5 py-0.5 bg-white/40 rounded-md border border-white/20">🎈 溫暖升空</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column (col-span-3): Encouragement character card */}
                  <div className="lg:col-span-3 space-y-4">
                    <div className="bg-[#FFFDF9] border-2 border-[#EAD5C3] rounded-3xl p-5 shadow-xs text-left relative overflow-hidden">
                      <div className="absolute -bottom-8 -right-8 text-5xl opacity-10 pointer-events-none">✨</div>
                      <div className="flex items-center gap-2 border-b border-[#EAD5C3] pb-2.5 mb-3">
                        <img src={charXiaopingImg} alt="張曉萍" className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm" referrerPolicy="no-referrer" />
                        <div className="text-left leading-none">
                          <h5 className="font-black text-xs text-slate-800">張曉萍的小提醒</h5>
                          <span className="text-[12px] text-slate-400">貼心好同學</span>
                        </div>
                      </div>
                      <p className="text-[12.5px] text-[#7D5C43] leading-relaxed font-bold bg-[#FAF5EC]/40 p-3.5 rounded-xl border border-[#F1E0CE]/40">
                        「可華，在感恩泡泡升空的那一刻，我深深感覺到心靈被溫柔地包裹。學會看見別人的好、心存感激，就像是在黑夜裡點亮一盞盞明亮的小橘燈。這就是生命教育裡最美的『同理與感恩』喔！」
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------------------------------------- */}
            {/* GAME VIEW 8: PHILOSOPHICAL DEBATE */}
            {/* ------------------------------------------------------------------------------------------------- */}
            {activeGameId === 8 && (
              <div id="game-view-debate" className="space-y-6">
                {/* 1. Banner */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#FFF4EA] via-[#FFFBF6] to-[#FFF0E0] border-2 border-[#EAD5C3] p-6 md:p-8 flex items-center justify-between gap-6 shadow-sm">
                  <div className="absolute top-4 left-10 text-3xl opacity-20 pointer-events-none select-none">🌸</div>
                  <div className="absolute bottom-3 right-1/3 text-3xl opacity-20 pointer-events-none select-none">🌿</div>
                  <div className="flex items-center gap-5 z-10">
                    <div className="w-16 h-16 rounded-full bg-[#E65100] text-white flex items-center justify-center text-2xl font-black font-mono shrink-0 shadow-md">08</div>
                    <div className="space-y-1 text-left">
                      <h2 className="text-2xl md:text-3xl font-black text-[#4A321F]">哲學辯論快攻</h2>
                      <p className="text-xs md:text-sm font-bold text-[#7D5C43]/90">用觀點與理由展開思辨挑戰。</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-end -space-x-3 z-10 shrink-0 pr-2">
                    {[charKehuaImg, charXiaopingImg].map((src, i) => (
                      <img key={i} src={src} alt="" className="w-16 h-16 rounded-full object-cover border-[3px] border-white shadow-md" style={{ zIndex: 2 - i }} referrerPolicy="no-referrer" />
                    ))}
                  </div>
                </div>

                {/* 2. Three-Column Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column (col-span-3): Live Poll Stats */}
                  <div className="lg:col-span-3 space-y-4">
                    <div className="bg-[#FCFAF7] border-2 border-[#EAD5C3] rounded-3xl p-5 shadow-xs text-left relative overflow-hidden">
                      <div className="absolute -top-10 -left-10 text-4xl opacity-5 pointer-events-none">🗳️</div>
                      <h4 className="font-black text-[#4A321F] text-xs border-b border-[#EAD5C3] pb-2 mb-4 flex items-center gap-1.5 uppercase">
                        <span>🗳️</span>
                        <span>班級投票即時看板</span>
                      </h4>

                      <div className="space-y-4 text-xs font-black">
                        <div className="space-y-1">
                          <div className="flex justify-between text-[12.5px] text-blue-600">
                            <span>🔵 正方：王博鈞</span>
                            <span>{debateVotes.pro} 票 ({(debateVotes.pro / Math.max(1, debateVotes.pro + debateVotes.con) * 100).toFixed(0)}%)</span>
                          </div>
                          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                            <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${(debateVotes.pro / Math.max(1, debateVotes.pro + debateVotes.con) * 100)}%` }} />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[12.5px] text-red-600">
                            <span>🔴 反方：陳可華</span>
                            <span>{debateVotes.con} 票 ({(debateVotes.con / Math.max(1, debateVotes.pro + debateVotes.con) * 100).toFixed(0)}%)</span>
                          </div>
                          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                            <div className="h-full bg-red-500 transition-all duration-300" style={{ width: `${(debateVotes.con / Math.max(1, debateVotes.pro + debateVotes.con) * 100)}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column (col-span-6): Interactive Debate Cards & Comments */}
                  <div className="lg:col-span-6 space-y-6">
                    {/* Viewpoint Cards side-by-side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Pro Card */}
                      <div className="bg-white border-2 border-[#EAD5C3] rounded-3xl p-5 shadow-xs flex flex-col justify-between text-left relative overflow-hidden">
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xl">🔵</span>
                            <div>
                              <h4 className="font-black text-xs text-slate-800">正方觀點：王博鈞</h4>
                              <span className="text-[10.5px] text-slate-400 font-bold block">「幸福是生命唯一的終極指針」</span>
                            </div>
                          </div>
                          <p className="text-[12.5px] text-[#5D4037] leading-relaxed font-bold bg-[#FAF5EC]/30 p-3 rounded-xl border border-[#F1E0CE]/30">
                            「如果一個人取得了世俗成功，內心卻空虛無比、每天失眠，這有意義嗎？我們拼搏的所有事物，都是為了獲取內在的幸福。所以幸福才是目的，成功只是手段。」
                          </p>
                        </div>

                        <button 
                          onClick={() => handleVote('pro')}
                          className={`w-full py-2.5 border-2 rounded-xl text-xs font-black transition-all cursor-pointer shadow-3xs flex items-center justify-center gap-1 active:scale-98 ${
                            userVote === 'pro' 
                              ? 'bg-blue-600 border-blue-600 text-white shadow-xs' 
                              : 'border-blue-500 text-blue-500 hover:bg-blue-50'
                          }`}
                        >
                          <span>支持 正方王博鈞</span>
                        </button>
                      </div>

                      {/* Con Card */}
                      <div className="bg-white border-2 border-[#EAD5C3] rounded-3xl p-5 shadow-xs flex flex-col justify-between text-left relative overflow-hidden">
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xl">🔴</span>
                            <div>
                              <h4 className="font-black text-xs text-slate-800">反方觀點：陳可華</h4>
                              <span className="text-[10.5px] text-slate-400 font-bold block">「成功為幸福構築安全堡壘」</span>
                            </div>
                          </div>
                          <p className="text-[12.5px] text-[#5D4037] leading-relaxed font-bold bg-[#FAF5EC]/30 p-3 rounded-xl border border-[#F1E0CE]/30">
                            生命如果缺乏足夠的現實資源和耕耘成功，幸福往往只是脆弱的泡沫。在學業、事業上取得成功，能極大拓展我們的自由，讓我們能守護家人的幸福！
                          </p>
                        </div>

                        <button 
                          onClick={() => handleVote('con')}
                          className={`w-full py-2.5 border-2 rounded-xl text-xs font-black transition-all cursor-pointer shadow-3xs flex items-center justify-center gap-1 active:scale-98 ${
                            userVote === 'con' 
                              ? 'bg-red-600 border-red-600 text-white shadow-xs' 
                              : 'border-red-500 text-red-500 hover:bg-red-50'
                          }`}
                        >
                          <span>支持 反方陳可華</span>
                        </button>
                      </div>
                    </div>

                    {/* Chat Comments Box */}
                    <div className="bg-white border-2 border-[#EAD5C3] rounded-3xl p-6 shadow-sm space-y-4">
                      <h3 className="text-xs font-black text-slate-500 border-b-2 border-[#F1E0CE]/60 pb-3 flex items-center gap-1">
                        <span>🗣️</span>
                        <span>觀戰大廳彈幕評論席</span>
                      </h3>
                      
                      <form onSubmit={handleAddComment} className="flex gap-2 text-left">
                        <input
                          type="text"
                          value={debateComment}
                          onChange={(e) => setDebateComment(e.target.value)}
                          placeholder="發表您的關鍵論點或反駁想法..."
                          className="flex-1 px-3 py-2 border-2 border-[#F1E0CE] rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500 bg-[#FAF8F5]/30 focus:bg-white transition-all"
                        />
                        <button 
                          type="submit"
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-xs flex items-center gap-1 shrink-0 cursor-pointer active:scale-98 transition-transform"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>發言</span>
                        </button>
                      </form>

                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-left">
                        {comments.map((c, idx) => (
                          <div key={idx} className="bg-[#FCFAF7]/60 border border-[#EAD5C3]/40 p-2.5 rounded-xl text-xs font-black flex gap-2">
                            <span className="shrink-0 text-xs">
                              {c.side === 'pro' && '🔵'}
                              {c.side === 'con' && '🔴'}
                              {c.side === 'teacher' && '👩🏻‍🏫'}
                              {c.side === 'spectator' && '💬'}
                            </span>
                            <div className="space-y-0.5">
                              <span className="text-[10.5px] text-slate-400 font-bold block">{c.user}</span>
                              <p className="text-[#5D4037] leading-normal">{c.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column (col-span-3): Character suggestion */}
                  <div className="lg:col-span-3 space-y-4">
                    <div className="bg-[#FFFDF9] border-2 border-[#EAD5C3] rounded-3xl p-5 shadow-xs text-left relative overflow-hidden">
                      <div className="absolute -bottom-8 -right-8 text-5xl opacity-10 pointer-events-none">✨</div>
                      <div className="flex items-center gap-2 border-b border-[#EAD5C3] pb-2.5 mb-3">
                        <img src={charXiaopingImg} alt="張曉萍" className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm" referrerPolicy="no-referrer" />
                        <div className="text-left leading-none">
                          <h5 className="font-black text-xs text-slate-800">張曉萍的悄悄話</h5>
                          <span className="text-[12px] text-slate-400">貼心好同學</span>
                        </div>
                      </div>
                      <p className="text-[12.5px] text-[#7D5C43] leading-relaxed font-bold bg-[#FAF5EC]/40 p-3.5 rounded-xl border border-[#F1E0CE]/40">
                        「可華，思辨是通往真理的起點。當我們試著站在對方或完全不同的角度去思考『成功』與『幸福』時，就會發現生命比我們想像的還要多元、厚重，非常有意思喔！」
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------------------------------------- */}
            {/* GAME VIEW 9: MOOD THERMOMETER */}
            {/* ------------------------------------------------------------------------------------------------- */}
            {/* ------------------------------------------------------------------------------------------------- */}
            {/* GAME VIEW 9: MOOD THERMOMETER */}
            {/* ------------------------------------------------------------------------------------------------- */}
            {activeGameId === 9 && (
              <div id="game-view-mood" className="space-y-6">
                {/* 1. Banner */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#FFF4EA] via-[#FFFBF6] to-[#FFF0E0] border-2 border-[#EAD5C3] p-6 md:p-8 flex items-center justify-between gap-6 shadow-sm">
                  <div className="absolute top-4 left-10 text-3xl opacity-20 pointer-events-none select-none">🌸</div>
                  <div className="absolute bottom-3 right-1/3 text-3xl opacity-20 pointer-events-none select-none">🌿</div>
                  <div className="flex items-center gap-5 z-10">
                    <div className="w-16 h-16 rounded-full bg-[#E65100] text-white flex items-center justify-center text-2xl font-black font-mono shrink-0 shadow-md">09</div>
                    <div className="space-y-1 text-left">
                      <h2 className="text-2xl md:text-3xl font-black text-[#4A321F]">心情溫度計</h2>
                      <p className="text-xs md:text-sm font-bold text-[#7D5C43]/90">辨識今天的情緒，學習理解自己。</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-end -space-x-3 z-10 shrink-0 pr-2">
                    {[charXiaopingImg, charXiaowenImg].map((src, i) => (
                      <img key={i} src={src} alt="" className="w-16 h-16 rounded-full object-cover border-[3px] border-white shadow-md" style={{ zIndex: 2 - i }} referrerPolicy="no-referrer" />
                    ))}
                  </div>
                </div>

                {/* 2. Three-Column Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column (col-span-3): Recharts Pie Chart representing Class Mood stats */}
                  <div className="lg:col-span-3 space-y-4">
                    <div className="bg-[#FCFAF7] border-2 border-[#EAD5C3] rounded-3xl p-5 shadow-xs text-left relative overflow-hidden">
                      <div className="absolute -top-10 -left-10 text-4xl opacity-5 pointer-events-none">📊</div>
                      <h4 className="font-black text-[#4A321F] text-xs border-b border-[#EAD5C3] pb-2 mb-4 flex items-center gap-1.5 uppercase">
                        <span>📊</span>
                        <span>全班心情即時分佈</span>
                      </h4>

                      <div className="h-40 w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={[
                                { name: '非常開心', value: 25 },
                                { name: '開心愉悅', value: 30 },
                                { name: '心情普通', value: 25 },
                                { name: '低落', value: 20 }
                              ]}
                              cx="50%"
                              cy="50%"
                              innerRadius={35}
                              outerRadius={55}
                              paddingAngle={5}
                              dataKey="value"
                            >
                              <Cell fill="#f43f5e" /> {/* Rose */}
                              <Cell fill="#fb923c" /> {/* Orange */}
                              <Cell fill="#94a3b8" /> {/* Slate */}
                              <Cell fill="#3b82f6" /> {/* Blue */}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>

                      <div className="space-y-1.5 text-[10.5px] font-black">
                        <div className="flex items-center justify-between text-rose-500">
                          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-rose-500" />非常開心</span>
                          <span>25%</span>
                        </div>
                        <div className="flex items-center justify-between text-orange-500">
                          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500" />開心愉悅</span>
                          <span>30%</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-500">
                          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-slate-400" />心情普通</span>
                          <span>25%</span>
                        </div>
                        <div className="flex items-center justify-between text-blue-500">
                          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" />低落悶悶</span>
                          <span>20%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column (col-span-6): Personal slider & History log */}
                  <div className="lg:col-span-6 space-y-6">
                    {/* Slider Card */}
                    <div className="bg-white border-2 border-[#EAD5C3] rounded-3xl p-6 shadow-sm space-y-6 text-center">
                      <div className="py-2 space-y-2">
                        <div className="text-5xl animate-bounce">
                          {moodEmojis[moodLevel - 1].emoji}
                        </div>
                        <h3 className={`text-sm font-black ${moodEmojis[moodLevel - 1].color}`}>
                          當前選定心情：{moodEmojis[moodLevel - 1].label}
                        </h3>
                      </div>

                      {/* Slider Interaction */}
                      <div className="space-y-4 max-w-md mx-auto text-left">
                        <input
                          type="range"
                          min="1"
                          max="6"
                          step="1"
                          value={moodLevel}
                          onChange={(e) => setMoodLevel(parseInt(e.target.value))}
                          className="w-full accent-rose-500 h-2 bg-rose-100 rounded-lg appearance-none cursor-pointer"
                        />

                        <div className="flex justify-between text-[12px] font-black text-slate-400">
                          <span>😢 1.非常低落</span>
                          <span>😐 3.普通</span>
                          <span>🥳 6.超級開心</span>
                        </div>
                      </div>

                      <div className="border-t-2 border-[#F1E0CE]/60 pt-4 space-y-3 text-left">
                        <h4 className="text-xs font-black text-slate-500">✍️ 寫下我的今天心情札記（大廳匿名發布）</h4>
                        <textarea
                          value={moodNote}
                          onChange={(e) => setMoodNote(e.target.value)}
                          placeholder="今天放學後雖然練球有點累，但是和曉萍一起喝了冰涼的麥茶，覺得很充實..."
                          className="w-full h-20 p-3 border-2 border-[#F1E0CE] rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-rose-500 bg-[#FAF8F5]/30 focus:bg-white resize-none transition-all"
                        />
                        <div className="flex justify-end">
                          <button
                            onClick={handleSaveMood}
                            className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs rounded-xl shadow-xs flex items-center gap-1 cursor-pointer active:scale-98 transition-transform"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>儲存心情紀錄</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* History List */}
                    {savedMoods.length > 0 && (
                      <div className="bg-white border-2 border-[#EAD5C3] rounded-3xl p-6 shadow-sm space-y-3 text-left">
                        <h3 className="text-xs font-black text-slate-400 border-b border-slate-100 pb-2">🌡️ 我的歷史心情紀錄表</h3>
                        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                          {savedMoods.map((m, idx) => (
                            <div key={idx} className="bg-[#FCFAF7] border border-[#EAD5C3]/40 p-2.5 rounded-xl flex items-center gap-3 text-xs font-black shadow-3xs">
                              <span className="text-2xl shrink-0">{moodEmojis[m.level - 1].emoji}</span>
                              <div className="text-left">
                                <span className="text-[10.5px] text-slate-400 font-bold block">{m.date} ‧ {moodEmojis[m.level - 1].label}</span>
                                <p className="text-[#5D4037] leading-normal">{m.note}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column (col-span-3): Companion suggestion card */}
                  <div className="lg:col-span-3 space-y-4">
                    <div className="bg-[#FFFDF9] border-2 border-[#EAD5C3] rounded-3xl p-5 shadow-xs text-left relative overflow-hidden">
                      <div className="absolute -bottom-8 -right-8 text-5xl opacity-10 pointer-events-none">✨</div>
                      <div className="flex items-center gap-2 border-b border-[#EAD5C3] pb-2.5 mb-3">
                        <img src={charKehuaImg} alt="陳可華" className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm" referrerPolicy="no-referrer" />
                        <div className="text-left leading-none">
                          <h5 className="font-black text-xs text-slate-800">陳可華的小建議</h5>
                          <span className="text-[12px] text-slate-400">同桌好夥伴</span>
                        </div>
                      </div>
                      <p className="text-[12.5px] text-[#7D5C43] leading-relaxed font-bold bg-[#FAF5EC]/40 p-3.5 rounded-xl border border-[#F1E0CE]/40">
                        「曉萍，無論今天是雨天、陰天還是晴天，心情溫度計都只是記錄此時此刻的自己。溫柔地接納自己的每種情緒，不加評判地擁抱自己，就是送給心靈最棒的禮物喔！」
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------------------------------------- */}
            {/* GAME VIEW 10: BADGE CHALLENGE */}
            {/* ------------------------------------------------------------------------------------------------- */}
            {/* ------------------------------------------------------------------------------------------------- */}
            {/* GAME VIEW 10: BADGE CHALLENGE */}
            {/* ------------------------------------------------------------------------------------------------- */}
            {activeGameId === 10 && (
              <div id="game-view-badge" className="space-y-6">
                {/* 1. Banner */}
                <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#FFF4EA] via-[#FFFBF6] to-[#FFF0E0] border-2 border-[#EAD5C3] p-6 md:p-8 flex items-center justify-between gap-6 shadow-sm">
                  <div className="absolute top-4 left-10 text-3xl opacity-20 pointer-events-none select-none">🌸</div>
                  <div className="absolute bottom-3 right-1/3 text-3xl opacity-20 pointer-events-none select-none">🌿</div>
                  <div className="flex items-center gap-5 z-10">
                    <div className="w-16 h-16 rounded-full bg-[#E65100] text-white flex items-center justify-center text-2xl font-black font-mono shrink-0 shadow-md">10</div>
                    <div className="space-y-1 text-left">
                      <h2 className="text-2xl md:text-3xl font-black text-[#4A321F]">成長徽章挑戰賽</h2>
                      <p className="text-xs md:text-sm font-bold text-[#7D5C43]/90">完成任務、收集徽章、看見自己的成長。</p>
                    </div>
                  </div>
                  <div className="hidden md:flex items-end -space-x-3 z-10 shrink-0 pr-2">
                    {[charKehuaImg, charXiaopingImg].map((src, i) => (
                      <img key={i} src={src} alt="" className="w-16 h-16 rounded-full object-cover border-[3px] border-white shadow-md" style={{ zIndex: 2 - i }} referrerPolicy="no-referrer" />
                    ))}
                  </div>
                </div>

                {/* 2. Three-Column Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column (col-span-3): Achievement levels */}
                  <div className="lg:col-span-3 space-y-4">
                    <div className="bg-[#FCFAF7] border-2 border-[#EAD5C3] rounded-3xl p-5 shadow-xs text-left relative overflow-hidden">
                      <div className="absolute -top-10 -left-10 text-4xl opacity-5 pointer-events-none">🏆</div>
                      <h4 className="font-black text-[#4A321F] text-xs border-b border-[#EAD5C3] pb-2 mb-4 flex items-center gap-1.5 uppercase">
                        <span>🏆</span>
                        <span>我的今日解鎖進度</span>
                      </h4>

                      <div className="text-center space-y-3 py-4">
                        <div className="text-4xl font-black text-emerald-600 font-mono">
                          {unlockedBadgeCount} / 4
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                          <div 
                            className="h-full bg-emerald-500 transition-all duration-300" 
                            style={{ width: `${(unlockedBadgeCount / 4) * 100}%` }} 
                          />
                        </div>
                        <p className="text-[12px] text-slate-400 font-bold leading-relaxed">
                          持續點亮更多實踐任務！導師會在學習後台同步看見您優異的生命行動力，並給予綜合點評加分！
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column (col-span-6): Tasks Checklist and Badge display shelf */}
                  <div className="lg:col-span-6 space-y-6">
                    {/* Tasks Checklist */}
                    <div className="bg-white border-2 border-[#EAD5C3] rounded-3xl p-6 shadow-sm space-y-4 text-left">
                      <h3 className="text-xs font-black text-slate-500 border-b-2 border-[#F1E0CE]/60 pb-3 flex items-center gap-1">
                        <span>🎯</span>
                        <span>點亮我的成長軌跡（本週實踐任務）</span>
                      </h3>
                      
                      <div className="space-y-3">
                        {badgeTasks.map(t => (
                          <div 
                            key={t.id}
                            onClick={() => toggleBadgeTask(t.id)}
                            className="bg-[#FCFAF7]/50 border-2 border-[#EAD5C3]/40 p-3 rounded-2xl flex items-center justify-between shadow-3xs cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/10 transition-all group"
                          >
                            <div className="flex items-center gap-3 text-xs font-black text-slate-700">
                              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                                t.done 
                                  ? 'bg-emerald-600 border-emerald-600 text-white shadow-3xs' 
                                  : 'border-[#EAD5C3] bg-white group-hover:border-emerald-500'
                              }`}>
                                {t.done && <Check className="w-3.5 h-3.5" />}
                              </div>
                              <span className={t.done ? 'line-through text-slate-400 font-bold' : 'font-black'}>{t.text}</span>
                            </div>

                            <span className={`text-[10.5px] font-black px-2.5 py-1 rounded-lg border ${
                              t.done 
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                                : 'bg-white border-slate-200 text-slate-400'
                            }`}>
                              🏆 解鎖：{t.badge}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* My Badges Display */}
                    <div className="bg-white border-2 border-[#EAD5C3] rounded-3xl p-6 shadow-sm space-y-4 text-left">
                      <h3 className="text-xs font-black text-slate-500 border-b-2 border-[#F1E0CE]/60 pb-3 flex items-center gap-1">
                        <span>🏅</span>
                        <span>我的班級勳章展示架</span>
                      </h3>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2">
                        {badgeTasks.map(t => (
                          <div 
                            key={t.id}
                            className={`p-4 border-2 rounded-2xl flex flex-col items-center text-center justify-between shadow-3xs transition-all relative ${
                              t.done 
                                ? 'bg-[#F0FDF4]/60 border-emerald-300 text-emerald-800 scale-100 overflow-hidden shadow-xs' 
                                : 'bg-slate-50 border-slate-200 text-slate-300 opacity-60 scale-98 select-none'
                            }`}
                          >
                            {t.done && <div className="absolute -top-1 -right-1 text-[12px] bg-amber-400 text-white px-1.5 py-0.5 rounded-bl-xl shadow-3xs font-black">⭐</div>}
                            <span className="text-3xl mb-1.5">{t.done ? '🎖️' : '🔒'}</span>
                            <span className="text-xs font-black tracking-wide leading-tight">{t.badge}</span>
                            <span className="text-[10.5px] font-bold text-slate-400 mt-1.5 leading-normal">
                              {t.done ? '已點亮解鎖' : '尚未解鎖'}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column (col-span-3): Instructor encouragement card */}
                  <div className="lg:col-span-3 space-y-4">
                    <div className="bg-[#FFFDF9] border-2 border-[#EAD5C3] rounded-3xl p-5 shadow-xs text-left relative overflow-hidden">
                      <div className="absolute -bottom-8 -right-8 text-5xl opacity-10 pointer-events-none">✨</div>
                      <div className="flex items-center gap-2 border-b border-[#EAD5C3] pb-2.5 mb-3">
                        <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-lg shadow-sm">👩🏻‍🏫</div>
                        <div className="text-left leading-none">
                          <h5 className="font-black text-xs text-slate-800">林美蘭導師的期許</h5>
                          <span className="text-[12px] text-slate-400">生命教育指導老師</span>
                        </div>
                      </div>
                      <p className="text-[12.5px] text-[#7D5C43] leading-relaxed font-bold bg-[#FAF5EC]/40 p-3.5 rounded-xl border border-[#F1E0CE]/40">
                        「同學們，每一個在展示架上亮起的勳章，都記錄了你們在真實生命旅程中朝向真善美邁出的一小步。生命教育不是硬邦邦的課本教條，而是此時此刻你們在日常生活中的勇敢實踐喔！」
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
