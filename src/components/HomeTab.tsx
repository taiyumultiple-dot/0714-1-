/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Character, StudentSubmission, UserProfile } from '../types';
import { ACHIEVEMENTS } from '../achievements';
import { Sparkles as SparklesIcon, LogOut, ChevronRight } from 'lucide-react';
// @ts-ignore
import heroCharacters from '../assets/images/hero-characters.jpg';

interface HomeTabProps {
  onNavigate: (tab: string) => void;
  onSelectUnit?: (unitId: string) => void;
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
  activeStudent, 
  submissions,
  characters,
  onUpdateCharacterClick,
  currentUser,
  onTriggerLogin,
  onLogout
}: HomeTabProps) {

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
    </div>
  );
}
