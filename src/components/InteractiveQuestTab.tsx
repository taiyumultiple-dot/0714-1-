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
    color: 'bg-[#F2F8FF] border-[#CCE1FB] text-[#1D4ED8]',
    iconColor: 'text-[#1D4ED8]',
    number: '02'
  },
  {
    id: 3,
    title: '情境選擇大冒險',
    description: '面對生活中的道德情境，做出你的抉擇。',
    emoji: '🧭',
    color: 'bg-[#F5FBF5] border-[#CDE7CD] text-[#2E7D32]',
    iconColor: 'text-[#2E7D32]',
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
    color: 'bg-[#F0FDF4] border-[#BBF7D0] text-[#166534]',
    iconColor: 'text-[#166534]',
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
    color: 'bg-[#F9FDF9] border-[#D1EED1] text-[#1B5E20]',
    iconColor: 'text-[#1B5E20]',
    number: '10'
  }
];

const renderGameIllustration = (gameId: number) => {
  switch (gameId) {
    case 1: // MBTI
      return (
        <div className="w-full h-full bg-[#FFF9F2] rounded-xl flex flex-col items-center justify-center p-1.5 border border-[#F1E0CE] relative overflow-hidden select-none">
          <span className="text-[8px] font-black text-[#C48C46] tracking-wider mb-1">MBTI</span>
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
        <div className="w-full h-full bg-[#F2F8FF] rounded-xl flex flex-col items-center justify-center p-1.5 border border-[#CCE1FB] relative overflow-hidden select-none">
          <svg className="w-9 h-9" viewBox="0 0 48 48" fill="none">
            <path d="M6 18C6 11.3726 11.3726 6 18 6H30C36.6274 6 42 11.3726 42 18V30C42 36.6274 36.6274 42 30 42H18C11.3726 42 6 36.6274 6 30V18Z" fill="#E0F2FE" stroke="#3B82F6" strokeWidth="1.5" />
            <path d="M12 18C16 16 18 22 22 20C26 18 28 24 32 22C36 20 36 24 36 26" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M24 6C24 16 20 22 26 30C32 38 28 42 28 42" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1 2" />
            <circle cx="16" cy="14" r="3" fill="#22C55E" />
            <circle cx="32" cy="32" r="4" fill="#10B981" />
          </svg>
        </div>
      );
    case 3: // Scenario Adventure
      return (
        <div className="w-full h-full bg-[#F5FBF5] rounded-xl flex flex-col items-center justify-center p-1.5 border border-[#CDE7CD] relative overflow-hidden select-none">
          <svg className="w-9 h-9" viewBox="0 0 48 48" fill="none">
            <path d="M24 42V26M24 26L12 14M24 26L36 14" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round" />
            <circle cx="24" cy="16" r="5" fill="#E8F5E9" stroke="#2E7D32" strokeWidth="1.5" />
            <text x="21" y="20" className="text-[10px] font-black fill-[#2E7D32]" style={{ fontFamily: 'monospace' }}>?</text>
            <circle cx="21" cy="33" r="1.5" fill="#81C784" />
            <circle cx="21" cy="38" r="1.5" fill="#81C784" />
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
              <span className="text-[6px] font-bold text-[#7B1FA2] scale-75 leading-none mt-0.5">同學</span>
            </div>
            <div className="flex flex-col items-center scale-75 z-10">
              <img src={charBojunImg} className="w-4 h-4 rounded-full border border-[#7B1FA2] object-cover bg-white" />
              <span className="text-[6px] font-bold text-[#7B1FA2] scale-75 leading-none mt-0.5">朋友</span>
            </div>
            <div className="flex flex-col items-center scale-75 z-10">
              <img src={charXiaowenImg} className="w-4 h-4 rounded-full border border-[#7B1FA2] object-cover bg-white" />
              <span className="text-[6px] font-bold text-[#7B1FA2] scale-75 leading-none mt-0.5">家人</span>
            </div>
            <div className="flex flex-col items-center scale-75 z-10">
              <img src={charKehuaImg} className="w-4 h-4 rounded-full border border-[#7B1FA2] object-cover bg-white" />
              <span className="text-[6px] font-bold text-[#7B1FA2] scale-75 leading-none mt-0.5">我</span>
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
        <div className="w-full h-full bg-[#F0FDF4] rounded-xl flex flex-col items-center justify-center p-1.5 border border-[#BBF7D0] relative overflow-hidden select-none">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="absolute w-6 h-6 rounded-full border border-sky-400/40 bg-sky-200/10 top-2 left-2 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-white/60 -mt-2 -ml-2" />
            </div>
            <div className="absolute w-5 h-5 rounded-full border border-pink-400/30 bg-pink-200/10 bottom-2 right-2 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-white/60 -mt-1.5 -ml-1.5" />
            </div>
            <div className="absolute w-8 h-8 rounded-full border border-emerald-400/40 bg-emerald-200/20 top-3 right-3 flex items-center justify-center">
              <span className="text-[8px]">💖</span>
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
              <span className="text-[6px] font-black text-sky-800 scale-90 mt-0.5">可華</span>
            </div>
            <div className="text-[7px] font-black text-orange-600 bg-orange-50 border border-orange-200 px-1 py-0.5 rounded-md scale-90 z-10">VS</div>
            <div className="flex flex-col items-center scale-75">
              <img src={charXiaopingImg} className="w-4 h-4 rounded-full border border-pink-500 object-cover bg-white" />
              <span className="text-[6px] font-black text-pink-800 scale-90 mt-0.5">曉萍</span>
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
            <div className="flex flex-col text-[7px] leading-tight text-left text-slate-400">
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
        <div className="w-full h-full bg-[#F9FDF9] rounded-xl flex flex-col items-center justify-center p-1 border border-[#D1EED1] relative overflow-hidden select-none">
          <div className="grid grid-cols-3 gap-0.5">
            {['🏅', '🎖️', '⭐', '🏆', '💎', '👑'].map((emoji, index) => (
              <div key={index} className="w-3.5 h-3.5 rounded-md bg-amber-50 border border-amber-200 flex items-center justify-center text-[8px]">
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

  // ----------------------------------------------------
  // GAME STATE 1: MBTI QUIZ
  // ----------------------------------------------------
  const [mbtiStep, setMbtiStep] = useState(0);
  const [mbtiAnswers, setMbtiAnswers] = useState<Record<number, string>>({});
  const mbtiQuestions = [
    {
      q: '當你在學校感到壓力很大時，你通常會？',
      options: [
        { label: '找朋友出去聚餐、聊天，暢所欲言', val: 'E', desc: '外向 (E)' },
        { label: '自己待在房間看書、聽音樂，靜靜沉澱', val: 'I', desc: '內向 (I)' }
      ]
    },
    {
      q: '在思考生命意義或未來理想時，你比較相信？',
      options: [
        { label: '現實世界與具體經驗，把握當下的實踐', val: 'S', desc: '感覺 (S)' },
        { label: '內心的直覺、哲學思索與未來無限可能性', val: 'N', desc: '直覺 (N)' }
      ]
    },
    {
      q: '當好朋友遇到重大挫折向你哭訴時，你的第一反應通常是？',
      options: [
        { label: '幫他理性客觀地分析問題，尋求具體方案', val: 'T', desc: '思考 (T)' },
        { label: '感同身受他的痛苦，先擁抱並支持他的情緒', val: 'F', desc: '情感 (F)' }
      ]
    },
    {
      q: '在規劃暑假或週末的生活作息時，你習慣？',
      options: [
        { label: '制定詳細的時間表，按部就班安心執行', val: 'J', desc: '判斷 (J)' },
        { label: '不預作太多束縛，隨遇而安、享受彈性', val: 'P', desc: '知覺 (P)' }
      ]
    }
  ];

  const handleMbtiAnswer = (val: string) => {
    const nextAnswers = { ...mbtiAnswers, [mbtiStep]: val };
    setMbtiAnswers(nextAnswers);
    if (mbtiStep < mbtiQuestions.length - 1) {
      setMbtiStep(mbtiStep + 1);
    } else {
      showToast('🎉 MBTI 測驗完成！已算出您的性格傾向！');
      setMbtiStep(mbtiStep + 1); // completion view
    }
  };

  const getMbtiResult = () => {
    let result = '';
    result += mbtiAnswers[0] || 'I';
    result += mbtiAnswers[1] || 'N';
    result += mbtiAnswers[2] || 'F';
    result += mbtiAnswers[3] || 'P';
    return result;
  };

  const resetMbti = () => {
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
      title: '考試作弊的誘惑',
      story: '快段考了，隔壁的好友博鈞因為練球沒時間複習，偷偷把英文單字卡夾在筆袋下。你看見了，而且他向你投來求助的眼神。此時你會？',
      options: [
        { text: '假裝沒看見，專心寫自己的考卷。', points: { 責任: 5, 同理: 0, 勇氣: 0 } },
        { text: '以嚴厲眼神制止他，並在考後主動約他一起溫習。', points: { 責任: 8, 同理: 6, 勇氣: 8 } },
        { text: '偷偷在草稿紙上寫下提示傳給他，幫他度過難關。', points: { 責任: -5, 同理: 8, 勇氣: 2 } },
        { text: '在考後私下告訴老師，請老師適當關照博鈞。', points: { 責任: 10, 同理: 3, 勇氣: 6 } }
      ]
    },
    {
      title: '被同學排擠的情境',
      story: '班上的小文因為性格內向、不擅言詞，分組時大家都不想跟他一組。小文一個人默默站在教室角落，看起來非常失落。此時你會？',
      options: [
        { text: '主動走過去邀請小文加入我們小組。', points: { 同理: 10, 勇氣: 8, 責任: 5 } },
        { text: '跟組員討論看看，看大家願不願意接納他。', points: { 同理: 6, 勇氣: 3, 責任: 4 } },
        { text: '裝作很忙不關我的事，畢竟我也怕得罪其他人。', points: { 同理: -4, 勇氣: -2, 責任: 0 } }
      ]
    }
  ];

  const handleAdventureChoice = (points: Record<string, number>) => {
    setAdventurePoints(prev => ({
      同理: Math.max(0, prev.同理 + (points.同理 || 0)),
      責任: Math.max(0, prev.責任 + (points.責任 || 0)),
      勇氣: Math.max(0, prev.勇氣 + (points.勇氣 || 0))
    }));
    if (adventureStage < adventureScenarios.length - 1) {
      setAdventureStage(adventureStage + 1);
      showToast('⚔️ 抉擇完成，前往下一個情境冒險！');
    } else {
      setAdventureStage(adventureStage + 1); // Complete
      showToast('🌟 恭喜你，冒險關卡全數完成！');
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
          setConnections(prev => [...prev, { from: selectedNode, to: node, rel: selectedRel }]);
          showToast(`💖 建立了「${selectedNode}」與「${node}」的 ${selectedRel} 關係！`);
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
    setBadgeTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
    showToast('🏆 徽章任務狀態已更新！');
  };

  const unlockedBadgeCount = badgeTasks.filter(t => t.done).length;

  return (
    <div className="min-h-screen bg-[#FDF9F3] text-[#3E2723] font-sans pb-16 px-4 md:px-8 relative overflow-hidden">
      
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

      <div className="max-w-7xl mx-auto pt-4 space-y-6">
        
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
                    <span className="text-[10px] font-black text-[#8D6E63]">張曉萍 ＆ 陳可華</span>
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
                      <div className="flex items-center gap-4 bg-white border border-[#EAD5C3]/60 p-4 rounded-2xl shadow-3xs">
                        {/* QR Code Box */}
                        <div className="w-24 h-24 shrink-0 bg-[#FFFDF9] border-2 border-[#FAD8C1] rounded-xl p-1.5 flex flex-col items-center justify-center relative shadow-inner group">
                          {/* Fake QR code blocks */}
                          <div className="w-full h-full bg-[radial-gradient(#4A321F_2.5px,transparent_2.5px)] [background-size:6px_6px] opacity-90" />
                          <div className="absolute top-2 left-2 w-5 h-5 border-2 border-[#4A321F] bg-white rounded-xs" />
                          <div className="absolute top-2 right-2 w-5 h-5 border-2 border-[#4A321F] bg-white rounded-xs" />
                          <div className="absolute bottom-2 left-2 w-5 h-5 border-2 border-[#4A321F] bg-white rounded-xs" />
                          
                          <div className="absolute w-4 h-4 bg-[#FFEAD5] border-2 border-[#E65100] rounded-full flex items-center justify-center shadow-xs">
                            <span className="text-[8px]">📙</span>
                          </div>
                          
                          <div className="absolute left-0 right-0 h-0.5 bg-[#E65100] opacity-80 shadow-[0_0_8px_#E65100] top-1/2 animate-bounce" />
                        </div>

                        {/* Class Info */}
                        <div className="space-y-1.5 flex-1 text-left">
                          <span className="text-[10px] font-black text-slate-400 block uppercase">班級代碼</span>
                          <span className="text-2xl font-black text-[#E65100] tracking-widest font-mono bg-[#FFF8F2] py-0.5 px-2.5 rounded-lg border border-[#FCD2B5] inline-block">4A28</span>
                          
                          <div className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 inline-flex items-center gap-1.5 mt-1">
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
                        <label className="text-[11px] font-black text-slate-400 block text-left uppercase">🎮 遊戲模式</label>
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
                        <label className="text-[11px] font-black text-slate-400 block text-left uppercase">👥 參賽小隊設定 (共 4 隊)</label>
                        <div className="grid grid-cols-2 gap-2">
                          {/* Team 1: 張曉萍 */}
                          <div className="bg-white border border-[#F0E2D5] p-1.5 rounded-xl flex items-center justify-between gap-2 shadow-3xs hover:border-[#F3C29F] transition-colors">
                            <div className="flex items-center gap-2">
                              <img src={charXiaopingImg} className="w-6 h-6 rounded-full border border-pink-200 object-cover" />
                              <span className="text-xs font-black text-slate-800">張曉萍隊</span>
                            </div>
                            <span className="text-[10px] text-emerald-600 font-extrabold bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-100">8人</span>
                          </div>
                          
                          {/* Team 2: 王博鈞 */}
                          <div className="bg-white border border-[#F0E2D5] p-1.5 rounded-xl flex items-center justify-between gap-2 shadow-3xs hover:border-[#F3C29F] transition-colors">
                            <div className="flex items-center gap-2">
                              <img src={charBojunImg} className="w-6 h-6 rounded-full border border-blue-200 object-cover" />
                              <span className="text-xs font-black text-slate-800">王博鈞隊</span>
                            </div>
                            <span className="text-[10px] text-emerald-600 font-extrabold bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-100">8人</span>
                          </div>

                          {/* Team 3: 陳可華 */}
                          <div className="bg-white border border-[#F0E2D5] p-1.5 rounded-xl flex items-center justify-between gap-2 shadow-3xs hover:border-[#F3C29F] transition-colors">
                            <div className="flex items-center gap-2">
                              <img src={charKehuaImg} className="w-6 h-6 rounded-full border border-sky-200 object-cover" />
                              <span className="text-xs font-black text-slate-800">陳可華隊</span>
                            </div>
                            <span className="text-[10px] text-emerald-600 font-extrabold bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-100">8人</span>
                          </div>

                          {/* Team 4: 王小文 */}
                          <div className="bg-white border border-[#F0E2D5] p-1.5 rounded-xl flex items-center justify-between gap-2 shadow-3xs hover:border-[#F3C29F] transition-colors">
                            <div className="flex items-center gap-2">
                              <img src={charXiaowenImg} className="w-6 h-6 rounded-full border border-purple-200 object-cover" />
                              <span className="text-xs font-black text-slate-800">王小文隊</span>
                            </div>
                            <span className="text-[10px] text-emerald-600 font-extrabold bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-100">8人</span>
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
                            <span className={`text-[10px] font-black font-mono px-2 py-0.5 rounded-md border ${game.color}`}>
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
                            <p className="text-[10px] text-slate-400 font-bold leading-normal line-clamp-2">
                              {game.description}
                            </p>
                          </div>
                        </div>

                        <button 
                          onClick={() => {
                            setActiveGameId(game.id);
                            showToast(`🎮 歡迎進入：${game.title}！`);
                          }}
                          className="w-full mt-2.5 py-1.5 bg-white hover:bg-orange-50 border-2 border-[#EAD5C3] group-hover:border-[#E65100] rounded-xl text-[10px] font-black text-[#4A321F] group-hover:text-[#E65100] transition-all shadow-3xs flex items-center justify-center gap-0.5 cursor-pointer"
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
                      <span className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">已開啟</span>
                      <div className="w-9 h-5 bg-emerald-500 rounded-full p-0.5 cursor-pointer flex justify-end shadow-inner">
                        <div className="w-4 h-4 bg-white rounded-full shadow-xs" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3.5 text-xs font-extrabold text-[#7D5C43] leading-relaxed text-left">
                    <div className="flex justify-between items-center bg-white border border-[#F0E2D5] p-2.5 rounded-xl shadow-3xs">
                      <span className="text-slate-400 text-[11px]">隨機出題模式:</span>
                      <span className="font-black text-[#E65100]">開啟 (不重覆)</span>
                    </div>
                    <div className="flex justify-between items-center bg-white border border-[#F0E2D5] p-2.5 rounded-xl shadow-3xs">
                      <span className="text-slate-400 text-[11px]">單題答題計時:</span>
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
                      <div className="absolute -left-5 top-0.5 w-3.5 h-3.5 rounded-full bg-[#E65100] border-2 border-white shadow-xs flex items-center justify-center text-[8px] text-white font-black">1</div>
                      <div className="leading-tight">
                        <div className="text-xs font-black text-[#4A321F]">Step 1 老師選擇遊戲</div>
                        <p className="text-[10px] text-slate-400 font-bold leading-normal mt-0.5">點選下方 10 款互動遊戲之一，按「進入遊戲」</p>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-5 top-0.5 w-3.5 h-3.5 rounded-full bg-[#E65100] border-2 border-white shadow-xs flex items-center justify-center text-[8px] text-white font-black">2</div>
                      <div className="leading-tight">
                        <div className="text-xs font-black text-[#4A321F]">Step 2 學生掃描 QR Code</div>
                        <p className="text-[10px] text-slate-400 font-bold leading-normal mt-0.5">學生開啟手機鏡頭，掃描 left 側班級大 QR Code</p>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-5 top-0.5 w-3.5 h-3.5 rounded-full bg-[#E65100] border-2 border-white shadow-xs flex items-center justify-center text-[8px] text-white font-black">3</div>
                      <div className="leading-tight">
                        <div className="text-xs font-black text-[#4A321F]">Step 3 學生進入遊戲</div>
                        <p className="text-[10px] text-slate-400 font-bold leading-normal mt-0.5">學生輸入座號姓名，一秒登入班級同樂大廳</p>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-5 top-0.5 w-3.5 h-3.5 rounded-full bg-[#E65100] border-2 border-white shadow-xs flex items-center justify-center text-[8px] text-white font-black">4</div>
                      <div className="leading-tight">
                        <div className="text-xs font-black text-[#4A321F]">Step 4 全班即時作答／小組比賽</div>
                        <p className="text-[10px] text-slate-400 font-bold leading-normal mt-0.5">手機端與課堂大投影同步作答，累積生命點數</p>
                      </div>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-5 top-0.5 w-3.5 h-3.5 rounded-full bg-[#E65100] border-2 border-white shadow-xs flex items-center justify-center text-[8px] text-white font-black">5</div>
                      <div className="leading-tight">
                        <div className="text-xs font-black text-[#4A321F]">Step 5 顯示結果與總結</div>
                        <p className="text-[10px] text-slate-400 font-bold leading-normal mt-0.5">大螢幕秀出全班答題分佈，老師進行一鍵點評</p>
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
                  <p className="text-[11px] text-slate-400 font-bold leading-relaxed">
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
                  <p className="text-[11px] text-slate-400 font-bold leading-relaxed">
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
                  <p className="text-[11px] text-slate-400 font-bold leading-relaxed">
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
                {/* 1. Upper Banner */}
                <div className="w-full bg-gradient-to-r from-[#FF9800] via-[#E65100] to-[#FF5722] rounded-3xl p-6 text-white space-y-2 shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0,transparent_70%)] pointer-events-none" />
                  <div className="absolute -bottom-6 left-1/4 text-6xl opacity-10 pointer-events-none select-none">✨</div>
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-black bg-white/20 border border-white/30 px-3 py-1 rounded-full uppercase tracking-widest">
                    <span>關卡 01 ‧ 心理測驗</span>
                  </span>
                  <h2 className="text-2xl font-black">16 型人格生命探索測驗</h2>
                  <p className="text-xs text-[#FFF3E0] font-bold max-w-xl">
                    回答 4 道核心情境題，發掘您的性格傾向，看見自己對生命的認知視角與潛在價值觀！
                  </p>
                </div>

                {/* 2. Three-Column Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column (col-span-3): Progress and Task Cards */}
                  <div className="lg:col-span-3 space-y-4">
                    <div className="bg-[#FCFAF7] border-2 border-[#EAD5C3] rounded-3xl p-5 shadow-xs text-left relative overflow-hidden">
                      <div className="absolute -top-10 -left-10 text-4xl opacity-5 pointer-events-none">📊</div>
                      <h4 className="font-black text-[#4A321F] text-xs border-b border-[#EAD5C3] pb-2 mb-3.5 flex items-center gap-1.5 uppercase">
                        <span>📊</span>
                        <span>人格傾向分佈度</span>
                      </h4>

                      <div className="space-y-4 text-xs font-black">
                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px] text-[#7D6B5D]">
                            <span>外向 (E)</span>
                            <span>內向 (I)</span>
                          </div>
                          <div className="w-full h-3 bg-white/80 border border-[#EAD5C3] rounded-full overflow-hidden flex p-0.5">
                            <div className="bg-orange-500 rounded-full transition-all duration-500" style={{ width: mbtiAnswers[0] === 'E' ? '75%' : '25%' }} />
                            <div className="bg-indigo-400 rounded-full transition-all duration-500" style={{ width: mbtiAnswers[0] === 'E' ? '25%' : '75%' }} />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px] text-[#7D6B5D]">
                            <span>感覺 (S)</span>
                            <span>直覺 (N)</span>
                          </div>
                          <div className="w-full h-3 bg-white/80 border border-[#EAD5C3] rounded-full overflow-hidden flex p-0.5">
                            <div className="bg-orange-500 rounded-full transition-all duration-500" style={{ width: mbtiAnswers[1] === 'S' ? '70%' : '30%' }} />
                            <div className="bg-indigo-400 rounded-full transition-all duration-500" style={{ width: mbtiAnswers[1] === 'S' ? '30%' : '70%' }} />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px] text-[#7D6B5D]">
                            <span>思考 (T)</span>
                            <span>情感 (F)</span>
                          </div>
                          <div className="w-full h-3 bg-white/80 border border-[#EAD5C3] rounded-full overflow-hidden flex p-0.5">
                            <div className="bg-orange-500 rounded-full transition-all duration-500" style={{ width: mbtiAnswers[2] === 'T' ? '65%' : '35%' }} />
                            <div className="bg-indigo-400 rounded-full transition-all duration-500" style={{ width: mbtiAnswers[2] === 'T' ? '35%' : '65%' }} />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px] text-[#7D6B5D]">
                            <span>判斷 (J)</span>
                            <span>感知 (P)</span>
                          </div>
                          <div className="w-full h-3 bg-white/80 border border-[#EAD5C3] rounded-full overflow-hidden flex p-0.5">
                            <div className="bg-orange-500 rounded-full transition-all duration-500" style={{ width: mbtiAnswers[3] === 'J' ? '60%' : '40%' }} />
                            <div className="bg-indigo-400 rounded-full transition-all duration-500" style={{ width: mbtiAnswers[3] === 'J' ? '40%' : '60%' }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column (col-span-6): Interactive Question / Result Area */}
                  <div className="lg:col-span-6 bg-white border-2 border-[#EAD5C3] rounded-3xl p-6 shadow-sm">
                    {mbtiStep < mbtiQuestions.length ? (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center border-b-2 border-[#F1E0CE]/60 pb-3">
                          <span className="text-xs font-black text-slate-500">第 {mbtiStep + 1} 題 / 共 4 題</span>
                          <span className="text-xs font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">依直覺作答</span>
                        </div>

                        <div className="space-y-4 text-left">
                          <h3 className="text-base font-black text-[#4A321F] leading-relaxed">
                            {mbtiQuestions[mbtiStep].q}
                          </h3>

                          <div className="space-y-3 pt-2">
                            {mbtiQuestions[mbtiStep].options.map((opt, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleMbtiAnswer(opt.val)}
                                className="w-full text-left p-4 rounded-2xl border-2 border-[#F1E0CE] hover:border-[#E65100] hover:bg-orange-50/50 transition-all shadow-xs cursor-pointer flex justify-between items-center group active:scale-98"
                              >
                                <span className="text-xs font-black text-[#4A321F] group-hover:text-[#E65100]">
                                  {opt.label}
                                </span>
                                <span className="text-[10px] font-black text-slate-400 bg-slate-50 border border-slate-100 px-2.5 py-1 rounded-lg group-hover:bg-[#FFEEDD] group-hover:text-[#E65100] font-mono">
                                  {opt.desc}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6 text-center py-6">
                        <div className="inline-flex p-4 bg-orange-100 rounded-full text-[#E65100] animate-bounce">
                          <Award className="w-12 h-12" />
                        </div>
                        <div className="space-y-2">
                          <div className="text-xs font-black text-slate-400 uppercase tracking-widest">您的生命性格指標</div>
                          <h3 className="text-3xl font-black text-[#E65100] tracking-wider font-mono">
                            {getMbtiResult()}
                          </h3>
                          <div className="text-sm font-black text-slate-700">
                            {getMbtiResult() === 'INFP' && '✨ 溫柔守護者 ‧ 尋求生命和諧與理想主義 ✨'}
                            {getMbtiResult() === 'ENFP' && '✨ 追夢冒險家 ‧ 充滿創意的生命旅人 ✨'}
                            {getMbtiResult() === 'INFJ' && '✨ 心靈引路人 ‧ 探尋深層生命意義者 ✨'}
                            {getMbtiResult() === 'ENFJ' && '✨ 溫暖領導者 ‧ 關懷全班同樂核心 ✨'}
                            {getMbtiResult() !== 'INFP' && getMbtiResult() !== 'ENFP' && getMbtiResult() !== 'INFJ' && getMbtiResult() !== 'ENFJ' && '✨ 智慧思考家 ‧ 理性探求生命軌跡 ✨'}
                          </div>
                        </div>

                        <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto font-bold bg-[#FAF5EC]/60 p-4 rounded-xl border border-[#F1E0CE]/60 text-left">
                          這代表你格外在乎生命的內在連結。你相信生命具有無限可能，不甘於平庸，且願意給予身邊每個人溫柔的包容！
                        </p>

                        <div className="flex gap-3 justify-center pt-4">
                          <button
                            onClick={resetMbti}
                            className="px-6 py-2 border-2 border-[#E65100] text-[#E65100] font-black text-xs rounded-xl hover:bg-orange-50 transition-all cursor-pointer shadow-xs active:scale-98"
                          >
                            重做測驗
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column (col-span-3): Results / Tips / Encouragement Cards */}
                  <div className="lg:col-span-3 space-y-4">
                    <div className="bg-[#FFFDF9] border-2 border-[#EAD5C3] rounded-3xl p-5 shadow-xs text-left relative overflow-hidden">
                      <div className="absolute -bottom-8 -right-8 text-5xl opacity-10 pointer-events-none">🌿</div>
                      <div className="flex items-center gap-2 border-b border-[#EAD5C3] pb-2.5 mb-3">
                        <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-lg shadow-sm">👨🏻</div>
                        <div className="text-left leading-none">
                          <h5 className="font-black text-xs text-slate-800">可華爸爸的小叮嚀</h5>
                          <span className="text-[10px] text-slate-400">生命諮商導師</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#7D5C43] leading-relaxed font-bold bg-[#FAF5EC]/40 p-3.5 rounded-xl border border-[#F1E0CE]/40">
                        「小博，MBTI性格測驗沒有好與壞之分。它只是幫助你明白自己習慣用什麼眼光看生命、用什麼模式與世界交流。多去欣賞班上跟你性格截然不同的同學！」
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------------------------------------- */}
            {/* GAME VIEW 2: LIFE PUZZLE MAP */}
            {/* ------------------------------------------------------------------------------------------------- */}
            {activeGameId === 2 && (
              <div id="game-view-puzzle" className="space-y-6">
                {/* 1. Upper Banner */}
                <div className="w-full bg-gradient-to-r from-[#1E88E5] via-[#3F51B5] to-[#5C6BC0] rounded-3xl p-6 text-white space-y-2 shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0,transparent_70%)] pointer-events-none" />
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-black bg-white/20 border border-white/30 px-3 py-1 rounded-full uppercase tracking-widest">
                    <span>關卡 02 ‧ 生命拼圖地圖</span>
                  </span>
                  <h2 className="text-2xl font-black">五大單元生命拼圖</h2>
                  <p className="text-xs text-[#E8EAF6] font-bold max-w-xl">
                    點擊各單元版塊將其拼入拼圖地圖中，點亮完整人生，拼湊出我們班專屬的生命樣貌！
                  </p>
                </div>

                {/* 2. Three-Column Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column (col-span-3): Progress and Checklist */}
                  <div className="lg:col-span-3 space-y-4">
                    <div className="bg-[#FCFAF7] border-2 border-[#EAD5C3] rounded-3xl p-5 shadow-xs text-left relative overflow-hidden">
                      <div className="absolute -top-10 -left-10 text-4xl opacity-5 pointer-events-none">🧩</div>
                      <h4 className="font-black text-[#4A321F] text-xs border-b border-[#EAD5C3] pb-2 mb-3.5 flex items-center gap-1.5 uppercase">
                        <span>🧩</span>
                        <span>拼圖完成進度</span>
                      </h4>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-black text-[#E65100] font-mono">
                            {Object.values(puzzlePlaced).filter(Boolean).length} / 5
                          </span>
                          <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                            {Math.round((Object.values(puzzlePlaced).filter(Boolean).length / 5) * 100)}% 已點亮
                          </span>
                        </div>
                        
                        <div className="w-full h-3 bg-white/80 border border-[#EAD5C3] rounded-full overflow-hidden p-0.5">
                          <div 
                            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300"
                            style={{ width: `${(Object.values(puzzlePlaced).filter(Boolean).length / 5) * 100}%` }}
                          />
                        </div>

                        {/* List of puzzle elements */}
                        <div className="space-y-2 pt-2 border-t border-[#EAD5C3]/60">
                          {Object.entries(puzzlePlaced).map(([key, placed]) => (
                            <div key={key} className="flex items-center justify-between text-xs font-black text-[#7D6B5D]">
                              <span>{key}</span>
                              <span className={`px-2 py-0.5 rounded-md text-[10px] ${
                                placed ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400'
                              }`}>
                                {placed ? '已拼入' : '待拼入'}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column (col-span-6): Interactive Puzzle Board Canvas */}
                  <div className="lg:col-span-6 bg-white border-2 border-[#EAD5C3] rounded-3xl p-6 shadow-sm">
                    <div className="text-center mb-4">
                      <h3 className="text-xs font-black text-slate-500">✨ 班級生命地圖拼湊區 ✨</h3>
                    </div>

                    <div className="relative w-full max-w-lg mx-auto aspect-[4/3] border-4 border-[#FCD2B5] rounded-2xl bg-[#FFFDF9] overflow-hidden shadow-inner flex items-center justify-center p-4">
                      <div className="grid grid-cols-3 gap-3 w-full h-full">
                        {Object.entries(puzzlePlaced).map(([key, placed]) => (
                          <div 
                            key={key}
                            onClick={() => handlePlacePuzzle(key)}
                            className={`border-2 rounded-xl flex flex-col items-center justify-center p-3 text-center transition-all cursor-pointer select-none ${
                              placed 
                                ? 'bg-gradient-to-br from-orange-50 to-amber-100 border-[#FF9800] text-[#E65100] scale-98 shadow-sm font-black' 
                                : 'bg-[#FAF6F0]/40 border-dashed border-[#F1E0CE] text-slate-300 hover:bg-[#FAF6F0] hover:scale-102 hover:border-[#E65100]'
                            }`}
                          >
                            <span className="text-2xl mb-1">{placed ? '🏆' : '➕'}</span>
                            <span className="text-xs font-black tracking-wide leading-tight">{key}</span>
                            <span className="text-[10px] font-bold text-slate-400 mt-1">
                              {placed ? '已置入' : '點擊拼入'}
                            </span>
                          </div>
                        ))}
                        {/* Complete life indicator */}
                        <div className="border-2 border-dashed border-[#F1E0CE] bg-[#FAF6F0]/20 rounded-xl flex flex-col items-center justify-center text-slate-400 font-black text-[10px] p-2 leading-tight">
                          <span>🧭</span>
                          <span className="mt-1">完整生命</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 justify-center mt-6">
                      <button
                        onClick={resetPuzzle}
                        className="px-6 py-2 border-2 border-[#E65100] text-[#E65100] font-black text-xs rounded-xl hover:bg-orange-50 transition-all cursor-pointer shadow-xs active:scale-98"
                      >
                        重置地圖
                      </button>
                    </div>
                  </div>

                  {/* Right Column (col-span-3): Grandpa's Encouragement */}
                  <div className="lg:col-span-3 space-y-4">
                    <div className="bg-[#FFFDF9] border-2 border-[#EAD5C3] rounded-3xl p-5 shadow-xs text-left relative overflow-hidden">
                      <div className="absolute -bottom-8 -right-8 text-5xl opacity-10 pointer-events-none">🌿</div>
                      <div className="flex items-center gap-2 border-b border-[#EAD5C3] pb-2.5 mb-3">
                        <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-lg shadow-sm">👵🏻</div>
                        <div className="text-left leading-none">
                          <h5 className="font-black text-xs text-slate-800">可華爺爺的鼓勵</h5>
                          <span className="text-[10px] text-slate-400">生命智者</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#7D5C43] leading-relaxed font-bold bg-[#FAF5EC]/40 p-3.5 rounded-xl border border-[#F1E0CE]/40">
                        「小博，生命並不是一天拼出來的。哲學思考是火，引領我們看清路；人學探索是眼，幫我們看見人的多元。把這五個單元慢慢嵌入你心裡，你便有了完整生命的能量！」
                      </p>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------------------------------------- */}
            {/* GAME VIEW 3: SCENARIO ADVENTURE */}
            {/* ------------------------------------------------------------------------------------------------- */}
            {activeGameId === 3 && (
              <div id="game-view-adventure" className="space-y-6">
                {/* 1. Upper Banner */}
                <div className="w-full bg-gradient-to-r from-[#2E7D32] via-[#4CAF50] to-[#8BC34A] rounded-3xl p-6 text-white space-y-2 shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0,transparent_70%)] pointer-events-none" />
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-black bg-white/20 border border-white/30 px-3 py-1 rounded-full uppercase tracking-widest">
                    <span>關卡 03 ‧ 情境抉擇</span>
                  </span>
                  <h2 className="text-2xl font-black">情境抉擇 ‧ 生命智慧拉鋸戰</h2>
                  <p className="text-xs text-[#E8F5E9] font-bold max-w-xl">
                    遭遇道德或生活兩難情境時，您的選擇將會塑建您最核心的生命價值點數！
                  </p>
                </div>

                {/* 2. Three-Column Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column (col-span-3): Points Display */}
                  <div className="lg:col-span-3 space-y-4">
                    <div className="bg-[#FCFAF7] border-2 border-[#EAD5C3] rounded-3xl p-5 shadow-xs text-left relative overflow-hidden">
                      <div className="absolute -top-10 -left-10 text-4xl opacity-5 pointer-events-none">🛡️</div>
                      <h4 className="font-black text-[#4A321F] text-xs border-b border-[#EAD5C3] pb-2 mb-3.5 flex items-center gap-1.5 uppercase">
                        <span>🛡️</span>
                        <span>冒險價值指標</span>
                      </h4>

                      <div className="space-y-4 font-black text-xs text-[#7D6B5D]">
                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px]">
                            <span>❤️ 同理心</span>
                            <span className="text-[#2E7D32]">{adventurePoints.同理} pts</span>
                          </div>
                          <div className="w-full h-2.5 bg-white/80 border border-[#EAD5C3] rounded-full overflow-hidden p-0.5">
                            <div className="h-full bg-emerald-500 rounded-full transition-all" style={{ width: `${Math.min(100, adventurePoints.同理 * 15)}%` }} />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px]">
                            <span>🛡️ 誠信責任</span>
                            <span className="text-blue-600">{adventurePoints.責任} pts</span>
                          </div>
                          <div className="w-full h-2.5 bg-white/80 border border-[#EAD5C3] rounded-full overflow-hidden p-0.5">
                            <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${Math.min(100, adventurePoints.責任 * 15)}%` }} />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px]">
                            <span>🔥 道德勇氣</span>
                            <span className="text-amber-600">{adventurePoints.勇氣} pts</span>
                          </div>
                          <div className="w-full h-2.5 bg-white/80 border border-[#EAD5C3] rounded-full overflow-hidden p-0.5">
                            <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${Math.min(100, adventurePoints.勇氣 * 15)}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Middle Column (col-span-6): Interactive Scenario Board */}
                  <div className="lg:col-span-6 bg-white border-2 border-[#EAD5C3] rounded-3xl p-6 shadow-sm">
                    {adventureStage < adventureScenarios.length ? (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center border-b-2 border-[#F1E0CE]/60 pb-3">
                          <span className="text-xs font-black text-slate-500">冒險關卡：{adventureScenarios[adventureStage].title}</span>
                          <span className="text-xs font-black text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">抉擇關卡 {adventureStage + 1} / 3</span>
                        </div>

                        <div className="space-y-4 text-left">
                          <p className="text-xs font-bold text-[#4A321F] bg-[#FAF8F5] p-4 rounded-2xl leading-relaxed border border-[#EAD5C3] shadow-inner">
                            {adventureScenarios[adventureStage].story}
                          </p>

                          <div className="space-y-3 pt-2">
                            {adventureScenarios[adventureStage].options.map((opt, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleAdventureChoice(opt.points)}
                                className="w-full text-left p-4 rounded-2xl border-2 border-[#F1E0CE] hover:border-[#E65100] hover:bg-orange-50/50 transition-all shadow-xs cursor-pointer active:scale-98 font-bold text-xs text-[#4A321F]"
                              >
                                {opt.text}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6 text-center py-6">
                        <div className="inline-flex p-4 bg-emerald-100 rounded-full text-[#1B5E20] animate-bounce">
                          <Compass className="w-12 h-12" />
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-black text-[#1B5E20]">✨ 冒險成功！您的生命人格雷達 ✨</h3>
                          <p className="text-xs text-slate-400">在這次情境考驗中，您展現出極具特色的價值特質！</p>
                        </div>

                        <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
                          <div className="bg-[#F0FDF4] border border-emerald-200 rounded-2xl p-3 text-center">
                            <span className="text-xs font-black text-slate-400 block">同理心</span>
                            <span className="text-xl font-black text-emerald-600 font-mono">{adventurePoints.同理}</span>
                          </div>
                          <div className="bg-[#EFF6FF] border border-blue-200 rounded-2xl p-3 text-center">
                            <span className="text-xs font-black text-slate-400 block">誠信責任</span>
                            <span className="text-xl font-black text-blue-600 font-mono">{adventurePoints.責任}</span>
                          </div>
                          <div className="bg-[#FFFDF2] border border-amber-200 rounded-2xl p-3 text-center">
                            <span className="text-xs font-black text-slate-400 block">道德勇氣</span>
                            <span className="text-xl font-black text-amber-600 font-mono">{adventurePoints.勇氣}</span>
                          </div>
                        </div>

                        <div className="flex gap-3 justify-center pt-4">
                          <button
                            onClick={resetAdventure}
                            className="px-6 py-2 border-2 border-[#E65100] text-[#E65100] font-black text-xs rounded-xl hover:bg-orange-50 transition-all cursor-pointer shadow-xs active:scale-98"
                          >
                            重來一次
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column (col-span-3): Character Card */}
                  <div className="lg:col-span-3 space-y-4">
                    <div className="bg-[#FFFDF9] border-2 border-[#EAD5C3] rounded-3xl p-5 shadow-xs text-left relative overflow-hidden">
                      <div className="absolute -bottom-8 -right-8 text-5xl opacity-10 pointer-events-none">🌸</div>
                      <div className="flex items-center gap-2 border-b border-[#EAD5C3] pb-2.5 mb-3">
                        <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center text-lg shadow-sm">👩🏻</div>
                        <div className="text-left leading-none">
                          <h5 className="font-black text-xs text-slate-800">張曉萍的小提醒</h5>
                          <span className="text-[10px] text-slate-400">貼心好同學</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#7D5C43] leading-relaxed font-bold bg-[#FAF5EC]/40 p-3.5 rounded-xl border border-[#F1E0CE]/40">
                        「可華，在這個道德兩難的生命大冒險裡，無論做出什麼選擇都考驗著我們的心靈指南針。別害怕，跟著你心底最真誠的同理心和正義感去探索吧！」
                      </p>
                    </div>
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
                {/* 1. Upper Banner */}
                <div className="w-full bg-gradient-to-r from-[#6A1B9A] via-[#8E24AA] to-[#AB47BC] rounded-3xl p-6 text-white space-y-2 shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0,transparent_70%)] pointer-events-none" />
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-black bg-white/20 border border-white/30 px-3 py-1 rounded-full uppercase tracking-widest">
                    <span>關卡 04 ‧ 人際關係連連看</span>
                  </span>
                  <h2 className="text-2xl font-black">建立本班溫暖支持網絡</h2>
                  <p className="text-xs text-[#F3E5F5] font-bold max-w-xl">
                    點擊第一個角色大頭貼，再點擊另一個角色大頭貼，即可拉出關係線建立彼此的陪伴與支持連結！
                  </p>
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
                          <p className="text-[10px] text-slate-400 font-bold py-4 text-center">暫無關係連結，快在右側點擊兩個角色建立紅線吧！</p>
                        ) : (
                          connections.map((c, idx) => (
                            <div key={idx} className="bg-white border border-[#EAD5C3] p-2 rounded-xl flex justify-between items-center shadow-xs text-xs font-bold text-[#4A321F]">
                              <div className="flex items-center gap-1">
                                <span className="truncate max-w-[50px]">{c.from}</span>
                                <span className="text-[#E65100]">↔️</span>
                                <span className="truncate max-w-[50px]">{c.to}</span>
                                <span className="bg-indigo-50 text-indigo-600 border border-indigo-100 px-1.5 py-0.5 rounded-md text-[9px] ml-1 shrink-0">
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
                      <p className="text-[10px] text-slate-400 font-bold">
                        目前已點選角色：{selectedNode ? <span className="text-purple-600 font-black bg-purple-50 px-2 py-0.5 rounded border border-purple-100">{selectedNode}</span> : <span className="text-slate-400">請先點選下方第一個角色</span>}
                      </p>
                    </div>

                    {/* Nodes grid */}
                    <div className="grid grid-cols-3 gap-3 max-w-md mx-auto py-2">
                      {['陳可華', '王博鈞', '張曉萍', '王小文', '可華爸爸', '可華爺爺'].map(node => (
                        <div 
                          key={node}
                          onClick={() => handleNodeClick(node)}
                          className={`p-3 border-2 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all select-none ${
                            selectedNode === node 
                              ? 'border-purple-600 bg-purple-50 scale-102 shadow-md font-black text-purple-700' 
                              : 'border-dashed border-[#F1E0CE] bg-[#FCFAF6] hover:bg-purple-50/20 hover:border-purple-400 hover:scale-102'
                          }`}
                        >
                          <span className="text-2xl">
                            {node === '陳可華' && '👦🏻'}
                            {node === '王博鈞' && '🏀'}
                            {node === '張曉萍' && '👩🏻'}
                            {node === '王小文' && '👧🏻'}
                            {node === '可華爸爸' && '👨🏻'}
                            {node === '可華爺爺' && '👵🏻'}
                          </span>
                          <span className="text-[11px] font-black text-[#4A321F] mt-1">{node}</span>
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
                        <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center text-lg shadow-sm">👧🏻</div>
                        <div className="text-left leading-none">
                          <h5 className="font-black text-xs text-slate-800">王小文的悄悄話</h5>
                          <span className="text-[10px] text-slate-400">暖心好朋友</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#7D5C43] leading-relaxed font-bold bg-[#FAF5EC]/40 p-3.5 rounded-xl border border-[#F1E0CE]/40">
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
                {/* 1. Upper Banner */}
                <div className="w-full bg-gradient-to-r from-[#E65100] via-[#F57C00] to-[#FFB74D] rounded-3xl p-6 text-white space-y-2 shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0,transparent_70%)] pointer-events-none" />
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-black bg-white/20 border border-white/30 px-3 py-1 rounded-full uppercase tracking-widest">
                    <span>關卡 05 ‧ 價值天平</span>
                  </span>
                  <h2 className="text-2xl font-black">核心生命價值天平</h2>
                  <p className="text-xs text-orange-50 font-bold max-w-xl">
                    點擊各項卡片旁的「上移」或「下移」，將您最看重、最守護的核心生命價值排在最頂端，看見您靈魂的側重！
                  </p>
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
                        <div className="text-[11px] font-black text-slate-400">當前天平狀態</div>
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
                          <div className="w-7 h-7 rounded-full bg-amber-400 border-2 border-[#5D4037] shadow-sm flex items-center justify-center text-[9px] font-black -mt-2 truncate text-slate-800">
                            {valuesList[0]?.slice(0, 2)}
                          </div>
                          <div className="w-7 h-7 rounded-full bg-slate-300 border-2 border-[#5D4037] shadow-sm flex items-center justify-center text-[9px] font-black -mt-2 truncate text-slate-500">
                            {valuesList[valuesList.length - 1]?.slice(0, 2)}
                          </div>
                        </div>
                        {/* Stand */}
                        <div className="w-2.5 h-16 bg-[#5D4037]" />
                        <div className="w-16 h-2 bg-[#4E342E] rounded-t-md" />
                      </div>

                      <p className="text-[9px] text-[#7D6B5D] font-bold text-center leading-relaxed">
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
                              <span className="w-5 h-5 rounded bg-[#E65100]/10 text-[#E65100] flex items-center justify-center font-black text-[10px]">
                                {idx + 1}
                              </span>
                              <span>{val}</span>
                            </div>

                            <div className="flex gap-1.5">
                              <button 
                                onClick={() => moveValue(idx, 'up')}
                                disabled={idx === 0}
                                className="p-1 px-2 border-2 border-slate-200 hover:border-orange-300 rounded-lg bg-white disabled:opacity-30 cursor-pointer text-[10px] hover:bg-orange-50 active:scale-95 transition-all font-black"
                              >
                                ⬆️
                              </button>
                              <button 
                                onClick={() => moveValue(idx, 'down')}
                                disabled={idx === valuesList.length - 1}
                                className="p-1 px-2 border-2 border-slate-200 hover:border-orange-300 rounded-lg bg-white disabled:opacity-30 cursor-pointer text-[10px] hover:bg-orange-50 active:scale-95 transition-all font-black"
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
                        <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-lg shadow-sm">👨🏻</div>
                        <div className="text-left leading-none">
                          <h5 className="font-black text-xs text-slate-800">可華爸爸的引導</h5>
                          <span className="text-[10px] text-slate-400">生命諮商導師</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#7D5C43] leading-relaxed font-bold bg-[#FAF5EC]/40 p-3.5 rounded-xl border border-[#F1E0CE]/40">
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
                {/* 1. Upper Banner */}
                <div className="w-full bg-gradient-to-r from-[#EC4899] via-[#F43F5E] to-[#FB7185] rounded-3xl p-6 text-white space-y-2 shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0,transparent_70%)] pointer-events-none" />
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-black bg-white/20 border border-white/30 px-3 py-1 rounded-full uppercase tracking-widest">
                    <span>關卡 06 ‧ 生命故事翻翻卡</span>
                  </span>
                  <h2 className="text-2xl font-black">故事與價值的記憶對對碰</h2>
                  <p className="text-xs text-rose-50 font-bold max-w-xl">
                    翻轉兩張卡片，如果生命核心價值（例如「勇氣」）能與具體的生命情境故事完美呼應配對，即配對成功！
                  </p>
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

                      <ul className="text-[11px] text-[#7D6B5D] font-bold space-y-2.5 leading-relaxed">
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
                            className={`aspect-square rounded-2xl flex items-center justify-center text-center p-2 border-2 text-[11px] font-black transition-all cursor-pointer select-none ${
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
                                <span className="text-[9px] text-slate-400 font-bold mt-1">點擊翻轉</span>
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
                        <div className="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center text-lg shadow-sm">👩🏻</div>
                        <div className="text-left leading-none">
                          <h5 className="font-black text-xs text-slate-800">張曉萍的小提醒</h5>
                          <span className="text-[10px] text-slate-400">貼心好同學</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#7D5C43] leading-relaxed font-bold bg-[#FAF5EC]/40 p-3.5 rounded-xl border border-[#F1E0CE]/40">
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
                {/* 1. Upper Banner */}
                <div className="w-full bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-500 rounded-3xl p-6 text-white space-y-2 shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0,transparent_70%)] pointer-events-none" />
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-black bg-white/20 border border-white/30 px-3 py-1 rounded-full uppercase tracking-widest">
                    <span>關卡 07 ‧ 感恩泡泡站</span>
                  </span>
                  <h2 className="text-2xl font-black">班級溫馨感恩泡泡牆</h2>
                  <p className="text-xs text-emerald-50 font-bold max-w-xl">
                    寫下您對同學、家人或老師最誠摯的感謝，送出您的溫暖泡泡，讓全班大螢幕熱鬧起來！
                  </p>
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
                        <p className="text-[10px] text-slate-400 font-bold leading-relaxed">
                          每發送一顆泡泡，班級感恩指數就會上升 2℃！大家攜手共創班級大愛，點亮我們的幸福世界！
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#EAD5C3]/60 flex items-center justify-between text-[11px] font-black text-slate-500">
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
                          <div className="text-right text-[10px] text-slate-400 font-bold mt-1">
                            最多 120 字（當前：{gratitudeMsg.length} 字）
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          {/* Color Picker & Anon Toggle */}
                          <div className="space-y-2 text-left">
                            <span className="text-[10px] text-slate-400 font-black block">選擇泡泡背景色：</span>
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
                            <p className="text-[11px] font-black text-slate-800 leading-relaxed">
                              「{b.text}」
                            </p>
                            <div className="flex justify-between items-center text-[9px] font-bold text-slate-500 pt-1 border-t border-black/5">
                              <span>來自：{b.sender}</span>
                              <span className="text-[8px] tracking-wide uppercase px-1.5 py-0.5 bg-white/40 rounded-md border border-white/20">🎈 溫暖升空</span>
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
                        <div className="w-9 h-9 rounded-full bg-pink-100 flex items-center justify-center text-lg shadow-sm">👩🏻</div>
                        <div className="text-left leading-none">
                          <h5 className="font-black text-xs text-slate-800">張曉萍的小提醒</h5>
                          <span className="text-[10px] text-slate-400">貼心好同學</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#7D5C43] leading-relaxed font-bold bg-[#FAF5EC]/40 p-3.5 rounded-xl border border-[#F1E0CE]/40">
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
                {/* 1. Upper Banner */}
                <div className="w-full bg-gradient-to-r from-[#1976D2] via-[#2196F3] to-[#64B5F6] rounded-3xl p-6 text-white space-y-2 shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0,transparent_70%)] pointer-events-none" />
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-black bg-white/20 border border-white/30 px-3 py-1 rounded-full uppercase tracking-widest">
                    <span>關卡 08 ‧ 哲學辯論快攻</span>
                  </span>
                  <h2 className="text-2xl font-black">幸福比成功更重要嗎？</h2>
                  <p className="text-xs text-blue-50 font-bold max-w-xl">
                    全班生命哲思思想大碰撞！聽完正方與反方的核心理念後，投下您認同的一票，並在觀戰席中寫下想法吧！
                  </p>
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
                          <div className="flex justify-between text-[11px] text-blue-600">
                            <span>🔵 正方：王博鈞</span>
                            <span>{debateVotes.pro} 票 ({(debateVotes.pro / Math.max(1, debateVotes.pro + debateVotes.con) * 100).toFixed(0)}%)</span>
                          </div>
                          <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                            <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${(debateVotes.pro / Math.max(1, debateVotes.pro + debateVotes.con) * 100)}%` }} />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex justify-between text-[11px] text-red-600">
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
                              <span className="text-[9px] text-slate-400 font-bold block">「幸福是生命唯一的終極指針」</span>
                            </div>
                          </div>
                          <p className="text-[11px] text-[#5D4037] leading-relaxed font-bold bg-[#FAF5EC]/30 p-3 rounded-xl border border-[#F1E0CE]/30">
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
                              <span className="text-[9px] text-slate-400 font-bold block">「成功為幸福構築安全堡壘」</span>
                            </div>
                          </div>
                          <p className="text-[11px] text-[#5D4037] leading-relaxed font-bold bg-[#FAF5EC]/30 p-3 rounded-xl border border-[#F1E0CE]/30">
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
                              <span className="text-[9px] text-slate-400 font-bold block">{c.user}</span>
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
                        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-lg shadow-sm">👩🏻</div>
                        <div className="text-left leading-none">
                          <h5 className="font-black text-xs text-slate-800">張曉萍的悄悄話</h5>
                          <span className="text-[10px] text-slate-400">貼心好同學</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#7D5C43] leading-relaxed font-bold bg-[#FAF5EC]/40 p-3.5 rounded-xl border border-[#F1E0CE]/40">
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
                {/* 1. Upper Banner */}
                <div className="w-full bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 rounded-3xl p-6 text-white space-y-2 shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0,transparent_70%)] pointer-events-none" />
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-black bg-white/20 border border-white/30 px-3 py-1 rounded-full uppercase tracking-widest">
                    <span>關卡 09 ‧ 心情溫度計</span>
                  </span>
                  <h2 className="text-2xl font-black">全班今日情感心情大打卡</h2>
                  <p className="text-xs text-rose-50 font-bold max-w-xl">
                    拖動下方刻度，調節您今天的心情溫度（從冰冷低落到熱情超級開心），並寫下心情小札記吧！
                  </p>
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

                      <div className="space-y-1.5 text-[9px] font-black">
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

                        <div className="flex justify-between text-[10px] font-black text-slate-400">
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
                                <span className="text-[9px] text-slate-400 font-bold block">{m.date} ‧ {moodEmojis[m.level - 1].label}</span>
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
                        <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center text-lg shadow-sm">👦🏻</div>
                        <div className="text-left leading-none">
                          <h5 className="font-black text-xs text-slate-800">陳可華的小建議</h5>
                          <span className="text-[10px] text-slate-400">同桌好夥伴</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#7D5C43] leading-relaxed font-bold bg-[#FAF5EC]/40 p-3.5 rounded-xl border border-[#F1E0CE]/40">
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
                {/* 1. Upper Banner */}
                <div className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-[#1976D2] rounded-3xl p-6 text-white space-y-2 shadow-md relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0,transparent_70%)] pointer-events-none" />
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-black bg-white/20 border border-white/30 px-3 py-1 rounded-full uppercase tracking-widest">
                    <span>關卡 10 ‧ 成長徽章挑戰賽</span>
                  </span>
                  <h2 className="text-2xl font-black">全班生命力成長挑戰</h2>
                  <p className="text-xs text-emerald-50 font-bold max-w-xl">
                    勾選下方您在生活或本週課堂中真實實踐完成的挑戰任務，一鍵解鎖並點亮屬於您的光榮班級徽章！
                  </p>
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
                        <p className="text-[10px] text-slate-400 font-bold leading-relaxed">
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

                            <span className={`text-[9px] font-black px-2.5 py-1 rounded-lg border ${
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
                            {t.done && <div className="absolute -top-1 -right-1 text-[8px] bg-amber-400 text-white px-1.5 py-0.5 rounded-bl-xl shadow-3xs font-black">⭐</div>}
                            <span className="text-3xl mb-1.5">{t.done ? '🎖️' : '🔒'}</span>
                            <span className="text-xs font-black tracking-wide leading-tight">{t.badge}</span>
                            <span className="text-[9px] font-bold text-slate-400 mt-1.5 leading-normal">
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
                          <span className="text-[10px] text-slate-400">生命教育指導老師</span>
                        </div>
                      </div>
                      <p className="text-[11px] text-[#7D5C43] leading-relaxed font-bold bg-[#FAF5EC]/40 p-3.5 rounded-xl border border-[#F1E0CE]/40">
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
