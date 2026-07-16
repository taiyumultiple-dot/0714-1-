/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Character, StudentSubmission, UserProfile } from '../types';
import { ACHIEVEMENTS } from '../achievements';
import { Sparkles as SparklesIcon, LogOut, ChevronRight, Gamepad2, Link as LinkIcon } from 'lucide-react';
// @ts-ignore
import heroCharacters from '../assets/images/hero-characters.jpg';

interface HomeTabProps {
  onNavigate: (tab: string) => void;
  onSelectUnit?: (unitId: string) => void;
  onSelectGameId?: (gameId: number) => void;
  activeStudent: { name: string; avatarEmoji: string; avatarUrl?: string };
  submissions: StudentSubmission[];
  characters: Character[];
  onUpdateCharacterClick?: (charId: string) => void;
  currentUser?: UserProfile | null;
  onTriggerLogin?: (role: 'student' | 'teacher') => void;
  onLogout?: () => void;
}

export default function HomeTab({ 
  onNavigate, 
  onSelectUnit, 
  onSelectGameId,
  activeStudent, 
  submissions,
  characters,
  onUpdateCharacterClick,
  currentUser,
  onTriggerLogin,
  onLogout
}: HomeTabProps) {

  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

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
    const xiaopingImg = characters.find(c => c.id === 'char_xiaoping')?.avatarUrl || '/uploads/char_xiaoping_1783476410144.png';
    const bojunImg = characters.find(c => c.id === 'char_bojun')?.avatarUrl || '/uploads/char_bojun_1783476419595.png';
    const xiaowenImg = characters.find(c => c.id === 'char_xiaowen')?.avatarUrl || '/uploads/char_xiaowen_1783323000731.png';
    const kehuaImg = characters.find(c => c.id === 'char_kehua')?.avatarUrl || '/uploads/char_kehua_1783476432058.png';

    switch (gameId) {
      case 1: // MBTI
        return (
          <div className="w-full h-full bg-[#FFF9F2] rounded-xl flex flex-col items-center justify-center p-1.5 border border-[#F1E0CE] relative overflow-hidden select-none">
            <span className="text-[12px] font-black text-[#C48C46] tracking-wider mb-1">MBTI</span>
            <svg className="w-8 h-8" viewBox="0 0 40 40" fill="none">
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
                <img src={xiaopingImg} className="w-4 h-4 rounded-full border border-[#7B1FA2] object-cover bg-white" />
                <span className="text-[10.5px] font-bold text-[#7B1FA2] scale-75 leading-none mt-0.5">同學</span>
              </div>
              <div className="flex flex-col items-center scale-75 z-10">
                <img src={bojunImg} className="w-4 h-4 rounded-full border border-[#7B1FA2] object-cover bg-white" />
                <span className="text-[10.5px] font-bold text-[#7B1FA2] scale-75 leading-none mt-0.5">朋友</span>
              </div>
              <div className="flex flex-col items-center scale-75 z-10">
                <img src={xiaowenImg} className="w-4 h-4 rounded-full border border-[#7B1FA2] object-cover bg-white" />
                <span className="text-[10.5px] font-bold text-[#7B1FA2] scale-75 leading-none mt-0.5">家人</span>
              </div>
              <div className="flex flex-col items-center scale-75 z-10">
                <img src={kehuaImg} className="w-4 h-4 rounded-full border border-[#7B1FA2] object-cover bg-white" />
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
                <img src={kehuaImg} className="w-4 h-4 rounded-full border border-sky-500 object-cover bg-white" />
                <span className="text-[10.5px] font-black text-sky-800 scale-90 mt-0.5">可華</span>
              </div>
              <div className="text-[10.5px] font-black text-orange-600 bg-orange-50 border border-orange-200 px-1 py-0.5 rounded-md scale-90 z-10">VS</div>
              <div className="flex flex-col items-center scale-75">
                <img src={xiaopingImg} className="w-4 h-4 rounded-full border border-pink-500 object-cover bg-white" />
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

  // Map of 6 units in exact accordance with the textbook outline in "圖一"
  const unitCards = [
    {
      id: 'unit_00',
      num: '總說',
      title: '總說',
      subtitle: '| 凝視生命的地圖',
      colorClasses: {
        cardBg: 'bg-[#FFF9F2]',
        border: 'border-[#F1E0CE]',
        circleBg: 'bg-[#FFF0DF]',
        accentText: 'text-[#C48C46]',
        hoverBg: 'hover:bg-[#FBEFDF]',
        btnBorder: 'border-[#EAD2B8]'
      },
      iconSvg: (
        <svg className="w-10 h-10 text-[#C48C46]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" strokeWidth="2" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" strokeWidth="2" />
          <path d="M12 5v12" stroke="#4CAF50" strokeWidth="1.5" />
          <path d="M12 8c1-1 3-1.5 3-1.5S13 9 12 10" fill="#4CAF50" />
          <path d="M12 11c-1-1-3-1.5-3-1.5S11 12 12 13" fill="#4CAF50" />
        </svg>
      )
    },
    {
      id: 'unit_01',
      num: '01',
      title: '哲學思考',
      subtitle: '品嚐思考的樂趣',
      colorClasses: {
        cardBg: 'bg-[#F2F8FF]',
        border: 'border-[#CCE1FB]',
        circleBg: 'bg-[#E5F1FF]',
        accentText: 'text-[#1D4ED8]',
        hoverBg: 'hover:bg-[#EAF3FF]',
        btnBorder: 'border-[#CCE1FB]'
      },
      iconSvg: (
        <svg className="w-10 h-10 text-[#1D4ED8]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1.3.5 2.6 1.5 3.5.8.8 1.3 1.5 1.5 2.5" />
          <path d="M9 18h6" />
          <path d="M10 22h4" />
          <line x1="12" y1="2" x2="12" y2="4" stroke="currentColor" strokeWidth="2" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" strokeWidth="2" />
          <line x1="19.78" y1="4.22" x2="18.36" y2="5.64" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    },
    {
      id: 'unit_02',
      num: '02',
      title: '人學探索',
      subtitle: '漫步奇幻的旅程',
      colorClasses: {
        cardBg: 'bg-[#F5FBF5]',
        border: 'border-[#CDE7CD]',
        circleBg: 'bg-[#EAF7EA]',
        accentText: 'text-[#2E7D32]',
        hoverBg: 'hover:bg-[#EDF8ED]',
        btnBorder: 'border-[#CDE7CD]'
      },
      iconSvg: (
        <svg className="w-10 h-10 text-[#2E7D32]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" />
          <line x1="21" y1="21" x2="15.5" y2="15.5" stroke="currentColor" strokeWidth="3" />
          <path d="M11 7c-2 0-4 1.5-4 4" stroke="#4CAF50" strokeWidth="1.5" />
          <circle cx="11" cy="11" r="2.5" fill="#4CAF50" />
        </svg>
      )
    },
    {
      id: 'unit_03',
      num: '03',
      title: '終極關懷',
      subtitle: '旅程中的神奇羅盤',
      colorClasses: {
        cardBg: 'bg-[#FAF6FC]',
        border: 'border-[#ECCDF2]',
        circleBg: 'bg-[#F5EAF7]',
        accentText: 'text-[#7B1FA2]',
        hoverBg: 'hover:bg-[#F7EEFA]',
        btnBorder: 'border-[#ECCDF2]'
      },
      iconSvg: (
        <svg className="w-10 h-10 text-[#7B1FA2]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill="currentColor" />
        </svg>
      )
    },
    {
      id: 'unit_04',
      num: '04',
      title: '價值思辨',
      subtitle: '掌握智慧方向盤',
      colorClasses: {
        cardBg: 'bg-[#FFF9F5]',
        border: 'border-[#FCE1D1]',
        circleBg: 'bg-[#FFF1E8]',
        accentText: 'text-[#E65100]',
        hoverBg: 'hover:bg-[#FFF4ED]',
        btnBorder: 'border-[#FCE1D1]'
      },
      iconSvg: (
        <svg className="w-10 h-10 text-[#E65100]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" strokeWidth="2" />
          <path d="M12 5h6l2 3-2 3h-6z" fill="currentColor" opacity="0.15" />
          <path d="M12 5h6l2 3-2 3h-6" stroke="currentColor" strokeWidth="2" />
          <path d="M12 13H6l-2 3 2 3h6z" fill="currentColor" opacity="0.15" />
          <path d="M12 13H6l-2 3 2 3h6" stroke="currentColor" strokeWidth="2" />
        </svg>
      )
    },
    {
      id: 'unit_05',
      num: '05',
      title: '靈性修養與人格統整',
      subtitle: '開啟心靈超能量',
      colorClasses: {
        cardBg: 'bg-[#FFF5F6]',
        border: 'border-[#FCD2D6]',
        circleBg: 'bg-[#FFEBEF]',
        accentText: 'text-[#C2185B]',
        hoverBg: 'hover:bg-[#FFF0F2]',
        btnBorder: 'border-[#FCD2D6]'
      },
      iconSvg: (
        <svg className="w-10 h-10 text-[#C2185B]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" stroke="currentColor" strokeWidth="2" />
          <path d="M12 10c.5-.5 1-1.5 1-1.5s-1-.5-1.5-1c-.5.5-1 1.5-1 1.5s1 .5 1.5 1" fill="#FF8A80" />
          <circle cx="6" cy="7" r="1.5" fill="#FF8A80" />
          <circle cx="17" cy="11" r="1" fill="#FF8A80" />
        </svg>
      )
    }
  ];

  // Specific characters standing in order to match "圖一":
  // 王小文, 王博鈞, 可華爸爸, 可華爺爺, 張曉萍, 陳可華
  const orderedCompanionIds = [
    { id: 'char_xiaowen', name: '王小文', defaultAvatarUrl: '/uploads/char_xiaowen_1783323000731.png' },
    { id: 'char_bojun', name: '王博鈞', defaultAvatarUrl: '/uploads/char_bojun_1783476419595.png' },
    { id: 'char_dad', name: '可華爸爸', defaultAvatarUrl: '/uploads/char_dad_1783477008022.png' },
    { id: 'char_grandpa', name: '可華爺爺', defaultAvatarUrl: '/uploads/char_grandpa_1783476400556.jpeg' },
    { id: 'char_xiaoping', name: '張曉萍', defaultAvatarUrl: '/uploads/char_xiaoping_1783476410144.png' },
    { id: 'char_kehua', name: '陳可華', defaultAvatarUrl: '/uploads/char_kehua_1783476432058.png' }
  ].map(item => {
    const dynamicChar = characters.find(c => c.id === item.id);
    return {
      ...item,
      avatarUrl: dynamicChar?.avatarUrl || item.defaultAvatarUrl
    };
  });

  const handleUnitClick = (unitId: string) => {
    if (onSelectUnit) {
      onSelectUnit(unitId);
    }
    onNavigate('課程地圖');
  };


  return (
    <div className="min-h-screen bg-[#FDF9F3] text-[#3E2723] font-sans pb-12 relative overflow-hidden px-4 md:px-8">
      
      {/* Scrollbar hide helper styles */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* SVG hand-drawn floral ornaments: Left and Right background of page */}
      <svg className="absolute left-0 top-36 w-36 h-80 opacity-40 pointer-events-none select-none z-0 hidden lg:block" viewBox="0 0 100 200" fill="none">
        <path d="M10 200 Q20 120 40 50" stroke="#A7BFA1" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M10 200 Q35 150 25 100" stroke="#A7BFA1" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M40 50 Q50 40 45 35 Q35 45 40 50 Z" fill="#C5D3C2" />
        <path d="M36 75 Q46 70 42 62 Q32 70 36 75 Z" fill="#B3C4AF" />
        <path d="M30 110 Q42 105 38 95 Q26 102 30 110 Z" fill="#C5D3C2" />
        <path d="M22 135 Q10 125 14 118 Q24 125 22 135 Z" fill="#9FB49B" />
        <circle cx="45" cy="35" r="4.5" fill="#F4BCA3" />
        <circle cx="41" cy="62" r="5.5" fill="#F0C3B2" />
        <circle cx="28" cy="115" r="6" fill="#F4BCA3" />
      </svg>

      <svg className="absolute right-0 top-36 w-36 h-80 opacity-40 pointer-events-none select-none z-0 hidden lg:block" viewBox="0 0 100 200" fill="none">
        <path d="M90 200 Q80 120 60 40" stroke="#A7BFA1" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M90 200 Q65 140 75 80" stroke="#A7BFA1" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M60 40 Q50 30 55 25 Q65 35 60 40 Z" fill="#B3C4AF" />
        <path d="M64 70 Q54 65 58 57 Q68 62 64 70 Z" fill="#C5D3C2" />
        <path d="M70 105 Q58 100 62 90 Q74 97 70 105 Z" fill="#9FB49B" />
        <path d="M78 130 Q90 120 86 113 Q76 120 78 130 Z" fill="#C5D3C2" />
        <circle cx="55" cy="25" r="5" fill="#F4BCA3" />
        <circle cx="58" cy="57" r="4.5" fill="#F0C3B2" />
        <circle cx="72" cy="110" r="6.5" fill="#F4BCA3" />
      </svg>

      <div className="max-w-7xl mx-auto space-y-6 relative z-10 pt-4">

        {/* 1. TOP BRAND BAR - Matches reference image EXACTLY */}
        <div className="flex items-center justify-between bg-[#FCFAF6] border border-[#F1E0CE] rounded-2xl px-6 py-4 shadow-3xs mb-4">
          <div className="flex items-center gap-2.5">
            {/* Elegant orange four-point star sparkle */}
            <svg className="w-6 h-6 text-[#E65100]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z" />
            </svg>
            <span className="font-extrabold text-[#4A321F] text-base md:text-lg tracking-tight">
              泰宇生命教育互動學習平台
            </span>
          </div>
          
          <div className="flex items-center gap-3">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onNavigate('show_tour')}
                  title="查看平台功能導覽"
                  className="px-3.5 py-1.5 border border-[#E9D6BF] rounded-xl hover:bg-[#FAF5EC] text-[#B4570B] font-extrabold text-xs transition-all flex items-center gap-1.5 bg-white shadow-3xs cursor-pointer"
                >
                  <span>💡</span>
                  <span>使用導覽</span>
                </button>

                <span className="text-xs font-bold text-[#7D6B5D] bg-[#FAF5EC] border border-[#F1E0CE] px-3.5 py-1.5 rounded-full flex items-center gap-1.5">
                  👤 {currentUser.name} ({currentUser.role === 'student' ? '學生' : '教師'})已登入
                </span>
                
                {currentUser.role === 'student' ? (
                  <button 
                    onClick={() => onNavigate('課程地圖')}
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1"
                  >
                    進入學習空間 <ChevronRight className="w-4.5 h-4.5" />
                  </button>
                ) : (
                  <button 
                    onClick={() => onNavigate('學習統計')}
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1"
                  >
                    進入教師統計 <ChevronRight className="w-4.5 h-4.5" />
                  </button>
                )}
                
                <button 
                  onClick={onLogout}
                  title="登出系統"
                  className="p-2 border border-[#E9D6BF] rounded-xl hover:bg-red-50 text-slate-400 hover:text-red-500 transition-all bg-white"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={() => onNavigate('show_tour')}
                  title="查看平台功能導覽"
                  className="px-3.5 py-1.5 border border-[#E9D6BF] rounded-xl hover:bg-[#FAF5EC] text-[#B4570B] font-extrabold text-xs transition-all flex items-center gap-1.5 bg-white shadow-3xs cursor-pointer"
                >
                  <span>💡</span>
                  <span>使用導覽</span>
                </button>

                <button
                  onClick={() => onTriggerLogin && onTriggerLogin('student')}
                  className="px-4 py-2 border border-[#E65100]/60 hover:bg-[#FFFBF5] text-[#E65100] font-extrabold text-xs rounded-xl transition-all flex items-center gap-1.5 bg-white shadow-3xs"
                >
                  <span className="text-sm">👤</span>
                  <span>學生入口</span>
                </button>
                
                <button
                  onClick={() => onTriggerLogin && onTriggerLogin('teacher')}
                  className="px-4 py-2 bg-[#E65100] hover:bg-[#D84315] text-white font-extrabold text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-3xs"
                >
                  <span className="text-sm">🔒</span>
                  <span>教師登入</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* 3. Horizontal Full-Width Hero Character Banner Image - title text is baked into the image itself */}
        <div 
          onClick={() => onNavigate('課程地圖')}
          className="relative rounded-3xl overflow-hidden cursor-pointer group hover:opacity-98 transition-all duration-300 bg-white"
        >
          <img 
            src={heroCharacters} 
            alt="生命教育互動學習平台 － 選擇單元，進入學習單並開始作答" 
            className="w-full h-auto object-contain object-center block transition-transform duration-500 group-hover:scale-[1.01]"
            referrerPolicy="no-referrer"
          />
          {/* Subtle elegant glassmorphism overlay label */}
          <div className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-xs border border-white/50 text-[#3E2723] text-xs font-black px-4 py-2 rounded-xl shadow-3xs flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
            <span>🗺️ 進入課程地圖</span>
            <ChevronRight className="w-4 h-4 text-[#E65100]" />
          </div>
        </div>



        {/* 4. "選擇單元" Section - Matches reference image EXACTLY */}
        <div id="select-unit-section" className="bg-[#FCFAF6] rounded-3xl border border-[#F1E0CE] p-6 md:p-8 shadow-3xs space-y-6">
          
          <div className="flex items-center gap-2 border-b border-[#F1E0CE]/60 pb-4">
            {/* Elegant orange star logo */}
            <svg className="w-5 h-5 text-[#E65100]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L15 9L22 12L15 15L12 22L9 15L2 12L9 9Z" />
            </svg>
            <h3 className="text-lg font-black text-[#4A321F]">選擇單元</h3>
          </div>

          {/* Grid layout for 6 custom-styled unit cards exactly styled like the mockup */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {unitCards.map((unit) => (
              <div
                key={unit.id}
                onClick={() => handleUnitClick(unit.id)}
                className={`p-4 pt-5 pb-5 rounded-2xl border ${unit.colorClasses.border} ${unit.colorClasses.cardBg} ${unit.colorClasses.hoverBg} transition-all duration-300 cursor-pointer shadow-3xs hover:shadow-2xs flex flex-col justify-between items-center text-center min-h-[240px] group`}
              >
                {/* Rounded Icon badge container with soft colored background circle */}
                <div className={`w-14 h-14 rounded-full ${unit.colorClasses.circleBg} flex items-center justify-center shadow-3xs group-hover:scale-105 transition-transform`}>
                  {unit.iconSvg}
                </div>

                <div className="space-y-1.5 my-3 flex-1 flex flex-col justify-center">
                  {unit.id === 'unit_00' ? (
                    <>
                      {/* Big Title text: "總說" */}
                      <h4 className="font-black text-lg text-[#C48C46] tracking-wide">
                        {unit.num}
                      </h4>
                      {/* Subtitle: "| 凝視生命的地圖" */}
                      <p className="text-[11px] text-[#7D6B5D] leading-normal font-extrabold">
                        {unit.subtitle}
                      </p>
                    </>
                  ) : (
                    <>
                      {/* Big Number: e.g. "01" */}
                      <span className={`text-2xl font-black ${unit.colorClasses.accentText} tracking-wider font-mono`}>
                        {unit.num}
                      </span>
                      {/* Title text: "哲學思考" */}
                      <h4 className="font-extrabold text-sm text-[#3E2723]">
                        {unit.title}
                      </h4>
                      {/* Subtitle text: "品嚐思考的樂趣" */}
                      <p className="text-[11px] text-slate-500 leading-normal font-medium">
                        {unit.subtitle}
                      </p>
                    </>
                  )}
                </div>

                {/* View content interactive button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUnitClick(unit.id);
                  }}
                  className={`w-full py-1.5 border ${unit.colorClasses.btnBorder} rounded-xl text-xs font-black ${unit.colorClasses.accentText} bg-white hover:bg-slate-50 transition-colors shadow-3xs`}
                >
                  查看內容
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 4.5. "課堂專用互動遊戲" Section - Beautiful layout under Choose Unit, as requested */}
        <div id="interactive-games-section" className="bg-[#FCFAF6] rounded-3xl border border-[#F1E0CE] p-6 md:p-8 shadow-3xs space-y-6">
          <div className="flex items-center justify-between border-b border-[#F1E0CE]/60 pb-4">
            <div className="flex items-center gap-2">
              <Gamepad2 className="w-5 h-5 text-[#E65100]" />
              <h3 className="text-lg font-black text-[#4A321F]">課堂專用互動遊戲 (共 10 款)</h3>
            </div>
            <button
              onClick={() => onNavigate('互動遊戲')}
              className="px-3 py-1 bg-orange-50 hover:bg-orange-100 text-[#E65100] border border-[#E65100]/30 rounded-xl text-xs font-black transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>查看全部</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Grid of 10 interactive games */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {GAMES.map((game) => (
              <div
                key={game.id}
                className="bg-white border-2 border-[#EAD5C3]/80 hover:border-[#E65100] p-4 rounded-3xl transition-all duration-300 shadow-3xs flex flex-col justify-between min-h-[225px] group hover:-translate-y-1 relative"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className={`text-[11px] font-black font-mono px-2 py-0.5 rounded-md border ${game.color}`}>
                      {game.number}
                    </span>
                  </div>

                  {/* Dynamic visual illustration */}
                  <div className="h-14 w-full rounded-xl overflow-hidden shadow-3xs">
                    {renderGameIllustration(game.id)}
                  </div>

                  <div className="space-y-1 text-left">
                    <h4 className="font-black text-xs text-[#4A321F] group-hover:text-[#E65100] transition-colors leading-tight line-clamp-1">
                      {game.title}
                    </h4>
                    <p className="text-[11px] text-slate-400 font-bold leading-normal line-clamp-2">
                      {game.description}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1.5 mt-2.5">
                  <button
                    onClick={() => {
                      if (onSelectGameId) {
                        onSelectGameId(game.id);
                      } else {
                        onNavigate('互動遊戲');
                      }
                      showToast(`🎮 歡迎進入：${game.title}！`);
                    }}
                    className="py-1.5 bg-[#E65100] hover:bg-[#D84315] text-white border border-[#E65100] rounded-xl text-[11px] font-black transition-all shadow-3xs flex items-center justify-center gap-0.5 cursor-pointer"
                  >
                    <span>進入遊戲</span>
                    <ChevronRight className="w-2.5 h-2.5" />
                  </button>
                  <button
                    onClick={() => {
                      const gameLink = typeof window !== 'undefined'
                        ? `${window.location.origin}/?tab=互動遊戲&gameId=${game.id}`
                        : `https://ais-dev-gyn54gieiwj7kxse4qngdt-72799407197.asia-northeast1.run.app/?tab=互動遊戲&gameId=${game.id}`;
                      if (navigator.clipboard && navigator.clipboard.writeText) {
                        navigator.clipboard.writeText(gameLink)
                          .then(() => {
                            showToast(`🔗 已複製第 ${game.id} 關「${game.title}」專屬連結！`);
                          })
                          .catch(() => {
                            const el = document.createElement('textarea');
                            el.value = gameLink;
                            el.setAttribute('readonly', '');
                            el.style.position = 'absolute';
                            el.style.left = '-9999px';
                            document.body.appendChild(el);
                            el.select();
                            document.execCommand('copy');
                            document.body.removeChild(el);
                            showToast(`🔗 已複製第 ${game.id} 關「${game.title}」專屬連結！`);
                          });
                      } else {
                        const el = document.createElement('textarea');
                        el.value = gameLink;
                        el.setAttribute('readonly', '');
                        el.style.position = 'absolute';
                        el.style.left = '-9999px';
                        document.body.appendChild(el);
                        el.select();
                        document.execCommand('copy');
                        document.body.removeChild(el);
                        showToast(`🔗 已複製第 ${game.id} 關「${game.title}」專屬連結！`);
                      }
                    }}
                    className="py-1.5 bg-white hover:bg-orange-50 border border-[#EAD5C3] rounded-xl text-[11px] font-black text-[#E65100] hover:border-[#E65100] transition-all shadow-3xs flex items-center justify-center gap-0.5 cursor-pointer"
                  >
                    <LinkIcon className="w-2.5 h-2.5" />
                    <span>複製連結</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. "學習流程" Horizontal bar precisely styled to match bottom stepper in "圖一" */}
        <div className="bg-[#FAF5EC] rounded-3xl border border-[#F2E5D5] p-5 shadow-3xs flex flex-col lg:flex-row items-center justify-between gap-5">
          
          {/* Label Container */}
          <div className="flex items-center gap-2 shrink-0">
            <h4 className="text-sm font-black text-[#4A321F] bg-[#FCFAF6] border border-[#F1E0CE] px-5 py-2.5 rounded-xl shadow-3xs">
              學習流程
            </h4>
          </div>

          {/* Workflow Steps Line with Arrows */}
          <div className="flex-1 w-full overflow-x-auto no-scrollbar py-1">
            <div className="flex items-center justify-between min-w-[700px] gap-2 px-2">
              
              {/* Step 1 */}
              <div 
                onClick={() => {
                  const element = document.getElementById('select-unit-section');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="flex items-center gap-2 bg-white/60 px-3.5 py-2 rounded-2xl border border-[#F2E5D5]/50 shadow-3xs cursor-pointer hover:bg-[#FFFBF5] hover:scale-[1.03] transition-all group"
                title="點選滾動至單元選擇區域"
              >
                <div className="w-8 h-8 rounded-full bg-white border border-[#E0A96D] flex items-center justify-center text-base shadow-3xs group-hover:rotate-12 transition-transform">
                  🏠
                </div>
                <span className="text-xs font-black text-[#5C4D3C] group-hover:text-orange-600 transition-colors">選擇單元</span>
              </div>

              {/* Arrow */}
              <span className="text-[#D0BFA7] font-bold text-base">→</span>

              {/* Step 2 */}
              <div 
                onClick={() => onNavigate('成長表單')}
                className="flex items-center gap-2 bg-white/60 px-3.5 py-2 rounded-2xl border border-[#F2E5D5]/50 shadow-3xs cursor-pointer hover:bg-[#FFFBF5] hover:scale-[1.03] transition-all group"
                title="點選前往瀏覽成長學習單分類"
              >
                <div className="w-8 h-8 rounded-full bg-white border border-[#E0A96D] flex items-center justify-center text-base shadow-3xs group-hover:rotate-12 transition-transform">
                  👥
                </div>
                <span className="text-xs font-black text-[#5C4D3C] group-hover:text-orange-600 transition-colors">瀏覽學習單分類</span>
              </div>

              {/* Arrow */}
              <span className="text-[#D0BFA7] font-bold text-base">→</span>

              {/* Step 3 */}
              <div 
                onClick={() => onNavigate('成長表單')}
                className="flex items-center gap-2 bg-white/60 px-3.5 py-2 rounded-2xl border border-[#F2E5D5]/50 shadow-3xs cursor-pointer hover:bg-[#FFFBF5] hover:scale-[1.03] transition-all group"
                title="點選前往成長表單填寫作答"
              >
                <div className="w-8 h-8 rounded-full bg-white border border-[#E0A96D] flex items-center justify-center text-base shadow-3xs group-hover:rotate-12 transition-transform">
                  📝
                </div>
                <span className="text-xs font-black text-[#5C4D3C] group-hover:text-orange-600 transition-colors">開始作答</span>
              </div>

              {/* Arrow */}
              <span className="text-[#D0BFA7] font-bold text-base">→</span>

              {/* Step 4 */}
              <div 
                onClick={() => onNavigate('成長表單')}
                className="flex items-center gap-2 bg-white/60 px-3.5 py-2 rounded-2xl border border-[#F2E5D5]/50 shadow-3xs cursor-pointer hover:bg-[#FFFBF5] hover:scale-[1.03] transition-all group"
                title="點選前往成長表單送出提交"
              >
                <div className="w-8 h-8 rounded-full bg-white border border-[#E0A96D] flex items-center justify-center text-base shadow-3xs group-hover:rotate-12 transition-transform">
                  ☑️
                </div>
                <span className="text-xs font-black text-[#5C4D3C] group-hover:text-orange-600 transition-colors">送出學習單</span>
              </div>

              {/* Arrow */}
              <span className="text-[#D0BFA7] font-bold text-base">→</span>

              {/* Step 5 */}
              <div 
                onClick={() => onNavigate('成長表單')}
                className="flex items-center gap-2 bg-white/60 px-3.5 py-2 rounded-2xl border border-[#F2E5D5]/50 shadow-3xs cursor-pointer hover:bg-[#FFFBF5] hover:scale-[1.03] transition-all group"
                title="點選前往成長表單查看老師評分與引導回饋"
              >
                <div className="w-8 h-8 rounded-full bg-white border border-[#E0A96D] flex items-center justify-center text-base shadow-3xs group-hover:rotate-12 transition-transform">
                  🕒
                </div>
                <span className="text-xs font-black text-[#5C4D3C] group-hover:text-orange-600 transition-colors">等待老師回饋</span>
              </div>

            </div>
          </div>
        </div>

      </div>

      {toastMessage && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-[#4A321F] text-[#FDF9F3] border border-[#EAD5C3] px-5 py-3 rounded-2xl shadow-xl font-extrabold text-sm z-50 flex items-center gap-2 animate-bounce">
          <span>🔔</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
