/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Trophy, 
  Play, 
  Lock, 
  CheckCircle, 
  HelpCircle, 
  RefreshCw, 
  ChevronRight, 
  TrendingUp, 
  Map, 
  Clock, 
  Flame, 
  Gift,
  Sparkles
} from 'lucide-react';
import { UNIT_DATA } from '../data';
import UnitStudyView from './UnitStudyView';
import { StudentSubmission } from '../types';
import { ACHIEVEMENTS } from '../achievements';
import { X, Award, Check } from 'lucide-react';

interface CourseMapTabProps {
  onNavigate: (tab: string, extra?: any) => void;
  selectedUnitId?: string;
  onSelectUnit?: (unitId: string) => void;
  submissions: StudentSubmission[];
  onChangeSubmissions: (subs: StudentSubmission[]) => void;
  activeStudentId: string;
  role: 'student' | 'teacher';
}

export default function CourseMapTab({ 
  onNavigate, 
  selectedUnitId, 
  onSelectUnit,
  submissions,
  onChangeSubmissions,
  activeStudentId,
  role
}: CourseMapTabProps) {
  const [activeTab, setActiveTab] = useState<'standard' | 'free'>('standard');
  const [refreshSeed, setRefreshSeed] = useState(0);

  // Modals & Toast State
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showChaptersModal, setShowChaptersModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Trigger auto-dismiss toast
  React.useEffect(() => {
    if (toastMsg) {
      const timer = setTimeout(() => setToastMsg(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toastMsg]);

  // Current active student's submission data
  const currentSub = submissions.find(s => s.studentId === activeStudentId) || submissions[0];

  // Helper: Get student chapter complete status
  const getStudentChapterStatus = (sub: StudentSubmission, unitId: string, chId: string): boolean => {
    if (!sub) return false;
    const ws = sub.unitWorksheets?.[unitId];
    const prog = ws?.readingProgress;
    const wsSubmitted = ws?.submitted ?? false;

    // Seeded initial student overrides
    if (sub.studentId === 'stud_kehua') {
      if (unitId === 'unit_00') return true;
      if (unitId === 'unit_01') return true;
      if (unitId === 'unit_02') return chId !== '02-3'; // 2 completed
      if (unitId === 'unit_03') return chId !== '03-3'; // 2 completed
      if (unitId === 'unit_04') return chId !== '04-3'; // 2 completed
      if (unitId === 'unit_05') return false; // 0 completed
    }
    if (sub.studentId === 'stud_xiaoping') {
      if (unitId === 'unit_00') return true;
      if (unitId === 'unit_01') return chId !== '01-3'; // 2 completed
      if (unitId === 'unit_02') return chId === '02-1'; // 1 completed
      if (unitId === 'unit_03') return false;
      if (unitId === 'unit_04') return false;
      if (unitId === 'unit_05') return false;
    }
    if (sub.studentId === 'stud_bojun') {
      if (unitId === 'unit_00') return true;
      if (unitId === 'unit_01') return chId === '01-1'; // 1 completed
      if (unitId === 'unit_02') return false;
      if (unitId === 'unit_03') return false;
      if (unitId === 'unit_04') return false;
      if (unitId === 'unit_05') return false;
    }
    if (sub.studentId === 'stud_xiaowen') {
      if (unitId === 'unit_00') return true;
      if (unitId === 'unit_01') return true;
      if (unitId === 'unit_02') return chId !== '02-3'; // 2 completed
      if (unitId === 'unit_03') return chId !== '03-3'; // 2 completed
      if (unitId === 'unit_04') return false;
      if (unitId === 'unit_05') return false;
    }

    // Dynamic textbook reading page triggers
    if (unitId === 'unit_00') {
      return prog !== undefined ? prog >= 9 : false;
    }
    if (unitId === 'unit_01') {
      if (chId === '01-1') return prog !== undefined ? prog >= 21 : false;
      if (chId === '01-2') return prog !== undefined ? prog >= 29 : false;
      if (chId === '01-3') return prog !== undefined ? prog >= 35 : false;
    }
    if (unitId === 'unit_02') {
      if (chId === '02-1') return prog !== undefined ? prog >= 42 : false;
      if (chId === '02-2') return prog !== undefined ? prog >= 49 : false;
      if (chId === '02-3') return prog !== undefined ? prog >= 55 : false;
    }
    if (unitId === 'unit_03') {
      if (chId === '03-1') return prog !== undefined ? prog >= 64 : false;
      if (chId === '03-2') return prog !== undefined ? prog >= 73 : false;
      if (chId === '03-3') return prog !== undefined ? prog >= 81 : false;
    }
    if (unitId === 'unit_04') {
      if (chId === '04-1') return prog !== undefined ? prog >= 90 : false;
      if (chId === '04-2') return prog !== undefined ? prog >= 99 : false;
      if (chId === '04-3') return prog !== undefined ? prog >= 107 : false;
    }
    if (unitId === 'unit_05') {
      if (chId === '05-1') return prog !== undefined ? prog >= 117 : false;
      if (chId === '05-2') return prog !== undefined ? prog >= 126 : false;
      if (chId === '05-3') return prog !== undefined ? prog >= 135 : false;
    }

    return wsSubmitted;
  };

  // Compute completed quests count
  let completedQuestsCount = 0;
  if (currentSub?.woop?.submitted) completedQuestsCount++;
  if (currentSub?.exhibition?.submitted) completedQuestsCount++;
  if (currentSub?.autopilot) completedQuestsCount++;
  if (currentSub?.socrates) completedQuestsCount++;
  if (currentSub?.trolley) completedQuestsCount++;
  if (currentSub?.fallacy) completedQuestsCount++;

  // 16 chapters checklist mapping
  const chapterList = {
    unit_00: ['00-1'],
    unit_01: ['01-1', '01-2', '01-3'],
    unit_02: ['02-1', '02-2', '02-3'],
    unit_03: ['03-1', '03-2', '03-3'],
    unit_04: ['04-1', '04-2', '04-3'],
    unit_05: ['05-1', '05-2', '05-3']
  };

  let completedChaptersCount = 0;
  let completedUnitsCount = 0;

  Object.entries(chapterList).forEach(([unitId, chIds]) => {
    let allCompleted = true;
    chIds.forEach(chId => {
      if (getStudentChapterStatus(currentSub, unitId, chId)) {
        completedChaptersCount++;
      } else {
        allCompleted = false;
      }
    });
    if (allCompleted) {
      completedUnitsCount++;
    }
  });

  const progressPercentage = Math.floor((completedChaptersCount / 16) * 100);

  // Stats values
  const totalMinutes = 10 * 60 + completedChaptersCount * 45 + completedQuestsCount * 30 + 6;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const streakDays = 5 + completedQuestsCount + Math.floor(completedChaptersCount / 5);
  const unlockedAchievements = ACHIEVEMENTS.filter(a => a.checkUnlock(currentSub));
  const points = 1000 + completedChaptersCount * 100 + completedQuestsCount * 200 + unlockedAchievements.length * 25;

  const recommendations = [
    [
      { id: 'r1', type: '思辨實驗室', title: '真理辨辨機', sub: '互動實驗', time: '15 分鐘', img: '⚖️', tab: '思辨與遊戲', questType: 'fallacy' },
      { id: 'r2', type: '生命故事館', title: '阿嬤的智慧羅盤', sub: '故事閱讀', time: '20 分鐘', img: '🧭', tab: '角色故事' },
      { id: 'r3', type: '互動遊戲', title: '價值選擇大冒險', sub: '遊戲挑戰', time: '25 分鐘', img: '🎮', tab: '思辨與遊戲', questType: 'trolley' },
      { id: 'r4', type: '心靈補給站', title: '感恩日記：點亮心中的光', sub: '引導練習', time: '10 分鐘', img: '🕯️', tab: '成長表單' }
    ],
    [
      { id: 'r5', type: '思辨實驗室', title: '蘇格拉底追問機', sub: '互動思辨', time: '12 分鐘', img: '📜', tab: '思辨與遊戲', questType: 'socrates' },
      { id: 'r6', type: '生命故事館', title: '落葉的最後一堂課', sub: '故事閱讀', time: '15 分鐘', img: '🍂', tab: '角色故事' },
      { id: 'r7', type: '互動遊戲', title: '自動駕駛人生挑戰', sub: '心理探索', time: '20 分鐘', img: '🚀', tab: '思辨與遊戲', questType: 'autopilot' },
      { id: 'r8', type: '心靈補給站', title: '呼吸冥想：韌性防護', sub: '舒壓放鬆', time: '8 分鐘', img: '🧘🏻‍♀️', tab: '成長表單' }
    ]
  ];

  // Weekly recommendations are dynamically checked based on actual work!
  const weeklyTasks = [
    { text: '完成 1 個章節', completed: completedChaptersCount >= 1, onClick: () => setToastMsg('🎯 向上滑動，點選任一單元卡片進入課本開始閱讀！') },
    { text: '參與 1 次思辨實驗', completed: completedQuestsCount >= 1, onClick: () => onNavigate('思辨與遊戲') },
    { text: '閱讀 1 篇生命故事', completed: completedChaptersCount >= 8, onClick: () => onNavigate('角色故事') }
  ];

  const handleRefreshRecommendations = () => {
    setRefreshSeed(prev => (prev + 1) % recommendations.length);
  };

  const handleRecommendationClick = (rec: any) => {
    if (rec.tab) {
      if (rec.questType) {
        onNavigate(rec.tab, { questType: rec.questType });
      } else {
        onNavigate(rec.tab);
      }
    }
  };

  if (selectedUnitId) {
    return (
      <UnitStudyView 
        unitId={selectedUnitId}
        onBack={() => {
          if (onSelectUnit) onSelectUnit("");
        }}
        onSelectUnit={onSelectUnit}
        submissions={submissions}
        onChangeSubmissions={onChangeSubmissions}
        activeStudentId={activeStudentId}
        role={role}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Progress Meter & Achievements (3 columns) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Circular Progress Gauge */}
          <div className="bg-white rounded-3xl border border-amber-100 p-5 shadow-xs text-center flex flex-col items-center">
            <h3 className="text-xs font-bold text-gray-400 self-start tracking-wider mb-4">我的學習進度</h3>
            
            {/* Visual Gauge */}
            <div 
              onClick={() => setShowProgressModal(true)}
              className="relative w-36 h-36 flex items-center justify-center cursor-pointer hover:scale-[1.03] transition-transform group"
              title="點選查看學習歷程詳細分析"
            >
              {/* SVG circular progress */}
              <svg className="w-full h-full transform -rotate-90">
                <circle 
                  cx="72" cy="72" r="58" 
                  className="text-gray-100" 
                  strokeWidth="10" stroke="currentColor" fill="transparent" 
                />
                <circle 
                  cx="72" cy="72" r="58" 
                  className="text-orange-500 transition-all duration-500" 
                  strokeWidth="10" strokeDasharray={2 * Math.PI * 58} 
                  strokeDashoffset={2 * Math.PI * 58 * (1 - (progressPercentage / 100))}
                  strokeLinecap="round" stroke="currentColor" fill="transparent" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-0.5">
                <span className="text-3xl font-extrabold text-orange-600 font-sans group-hover:text-orange-700">{progressPercentage}%</span>
                <span className="text-[10px] text-gray-500 font-bold group-hover:underline">詳細分析 🔍</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 w-full mt-4 text-left border-t border-gray-50 pt-4">
              <div 
                onClick={() => setShowChaptersModal(true)}
                className="bg-gray-50/50 p-2 rounded-xl cursor-pointer hover:bg-orange-50/40 transition-colors"
                title="點選查看 16 章節檢核表"
              >
                <span className="text-[9px] text-gray-400 font-bold block">已完成單元</span>
                <span className="text-xs font-bold text-orange-600 underline decoration-dotted">{completedUnitsCount} / 6</span>
              </div>
              <div 
                onClick={() => setShowChaptersModal(true)}
                className="bg-gray-50/50 p-2 rounded-xl cursor-pointer hover:bg-orange-50/40 transition-colors"
                title="點選查看 16 章節檢核表"
              >
                <span className="text-[9px] text-gray-400 font-bold block">已完成章節</span>
                <span className="text-xs font-bold text-orange-600 underline decoration-dotted">{completedChaptersCount} / 16</span>
              </div>
            </div>

            {/* Quick stats items */}
            <div className="w-full mt-3 space-y-2 text-left">
              <div 
                onClick={() => setToastMsg('⏰ 學習時數計算說明：包含閱讀課本各單元頁數、完成思辨任務及提交學習單的累積學習時數。繼續加油！')}
                className="flex items-center justify-between text-[11px] text-gray-500 bg-gray-50/50 p-2 rounded-xl px-3 cursor-pointer hover:bg-orange-50/30 transition-all hover:translate-x-1"
                title="點選查看時數說明"
              >
                <span className="flex items-center gap-1.5 font-medium"><Clock className="w-3.5 h-3.5 text-orange-500" />總學習時數</span>
                <span className="font-bold text-gray-700">{hours} 小時 {minutes} 分</span>
              </div>
              <div 
                onClick={() => setToastMsg('🔥 你的學習熱情非常驚人！每日持續登入探索課本並進行思辨作答，即可保持連續學習天數喔！')}
                className="flex items-center justify-between text-[11px] text-gray-500 bg-gray-50/50 p-2 rounded-xl px-3 cursor-pointer hover:bg-orange-50/30 transition-all hover:translate-x-1"
                title="點選查看連續學習說明"
              >
                <span className="flex items-center gap-1.5 font-medium"><Flame className="w-3.5 h-3.5 text-orange-500 animate-pulse" />連續學習</span>
                <span className="font-bold text-gray-700">{streakDays} 天</span>
              </div>
              <div 
                onClick={() => setToastMsg('✨ 探索點數獲得攻略：每完成 1 個章節獲得 100 點、每繳交 1 份學習單獲得 200 點、每解鎖 1 個虛擬勳章獲得 25 點！')}
                className="flex items-center justify-between text-[11px] text-gray-500 bg-gray-50/50 p-2 rounded-xl px-3 cursor-pointer hover:bg-[#E8F5E9] transition-all hover:translate-x-1"
                title="點選查看點數攻略"
              >
                <span className="flex items-center gap-1.5 font-medium"><Gift className="w-3.5 h-3.5 text-emerald-500" />探索點數</span>
                <span className="font-bold text-emerald-700">{points.toLocaleString()} 點</span>
              </div>
            </div>
          </div>

          {/* Achievements badge panel */}
          <div className="bg-white rounded-3xl border border-amber-100 p-5 shadow-xs">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <Trophy className="w-4.5 h-4.5 text-amber-500" />
                已解鎖學習勳章 ({unlockedAchievements.length})
              </h3>
              <button 
                onClick={() => setToastMsg(`🌟 你已成功解鎖 ${unlockedAchievements.length} 個精美勳章！請繼續展開思辨之旅，點亮更多生命故事！`)}
                className="text-[10px] text-orange-600 font-bold hover:underline"
              >
                查看詳情
              </button>
            </div>

            <div className="space-y-3 max-h-56 overflow-y-auto no-scrollbar">
              {unlockedAchievements.length > 0 ? (
                unlockedAchievements.map((ach) => (
                  <div key={ach.id} className="flex gap-3 items-center bg-gray-50/50 p-2.5 rounded-xl border border-gray-100">
                    <span className="text-xl">{ach.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-gray-800 truncate">{ach.name}</h4>
                      <p className="text-[9px] text-gray-400">{ach.description}</p>
                    </div>
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-gray-400 space-y-2">
                  <span className="text-3xl block">🛡️</span>
                  <p className="text-xs font-medium">尚未解鎖勳章</p>
                  <p className="text-[10px] text-gray-400">完成學習單或參與思辨實驗，即可解鎖專屬生命勳章！</p>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Center Section: Course Road Map & Chapters detail list (6 columns) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Map Header */}
          <div className="bg-white rounded-3xl border border-amber-100 p-5 shadow-xs">
            <div className="flex justify-between items-center mb-6">
              <div className="space-y-0.5">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <Map className="w-5.5 h-5.5 text-orange-600" />
                  課程地圖 / 單元總覽
                </h2>
                <p className="text-xs text-gray-400">跟著生命探索地圖，逐步展開學習旅程，點亮每一段成長足跡！</p>
              </div>
              
              <div className="flex bg-gray-100 p-0.5 rounded-xl">
                <button 
                  onClick={() => setActiveTab('standard')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === 'standard' 
                      ? 'bg-white text-orange-600 shadow-xs' 
                      : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  探索模式：標準
                </button>
              </div>
            </div>

            {/* Winding Road Map Pathway Graphic (using pure CSS & elegant SVG) */}
            <div className="relative bg-orange-50/30 rounded-2xl p-6 border border-amber-50/50 flex flex-col items-center justify-center overflow-hidden min-h-[180px]">
              {/* Connector SVG path */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M 30 100 Q 120 40 220 100 T 410 100 T 600 100 T 780 100" 
                  fill="none" stroke="#bfdbfe" strokeWidth="8" strokeLinecap="round" strokeDasharray="8 6"
                />
                <path 
                  d="M 30 100 Q 120 40 220 100 T 410 100" 
                  fill="none" stroke="#3b82f6" strokeWidth="8" strokeLinecap="round"
                />
              </svg>

              {/* Node avatars popups on the road */}
              <div className="relative z-10 flex flex-wrap justify-between items-center w-full max-w-2xl py-6 gap-y-10">
                
                {/* Node 0: 總說 */}
                <div 
                  onClick={() => { if (onSelectUnit) onSelectUnit('unit_00'); }}
                  className="flex flex-col items-center space-y-1 cursor-pointer hover:scale-110 active:scale-95 transition-all select-none group"
                  title="進入 總說：凝視生命的地圖"
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-sky-500 text-white flex items-center justify-center font-extrabold text-sm border-4 border-white shadow-md relative z-10 group-hover:ring-4 group-hover:ring-sky-200">
                      總
                    </div>
                    <span className="absolute -top-3 -right-2 text-xl bg-white rounded-full p-0.5 shadow-xs">🗺️</span>
                  </div>
                  <span className="text-[10px] font-bold text-sky-600 bg-white px-2 py-0.5 rounded-full shadow-2xs border border-sky-100 group-hover:bg-sky-50">總說</span>
                </div>

                {/* Node 1 */}
                <div 
                  onClick={() => { if (onSelectUnit) onSelectUnit('unit_01'); }}
                  className="flex flex-col items-center space-y-1 cursor-pointer hover:scale-110 active:scale-95 transition-all select-none group"
                  title="進入 單元01：哲學思考"
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold text-lg border-4 border-white shadow-md relative z-10 group-hover:ring-4 group-hover:ring-blue-200">
                      1
                    </div>
                    <span className="absolute -top-3 -right-2 text-xl bg-white rounded-full p-0.5 shadow-xs">👦🏻</span>
                  </div>
                  <span className="text-[10px] font-bold text-blue-600 bg-white px-2 py-0.5 rounded-full shadow-2xs border border-blue-100 group-hover:bg-blue-50">哲學思考</span>
                </div>

                {/* Node 2 */}
                <div 
                  onClick={() => { if (onSelectUnit) onSelectUnit('unit_02'); }}
                  className="flex flex-col items-center space-y-1 cursor-pointer hover:scale-110 active:scale-95 transition-all select-none group"
                  title="進入 單元02：人學探索"
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-lg border-4 border-white shadow-md relative z-10 group-hover:ring-4 group-hover:ring-emerald-200">
                      2
                    </div>
                    <span className="absolute -top-3 -right-2 text-xl bg-white rounded-full p-0.5 shadow-xs">👩🏻</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-600 bg-white px-2 py-0.5 rounded-full shadow-2xs border border-emerald-100 group-hover:bg-emerald-50">人學探索</span>
                </div>

                {/* Node 3 */}
                <div 
                  onClick={() => { if (onSelectUnit) onSelectUnit('unit_03'); }}
                  className="flex flex-col items-center space-y-1 cursor-pointer hover:scale-110 active:scale-95 transition-all select-none group"
                  title="進入 單元03：終極關懷"
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg border-4 border-white shadow-md relative z-10 animate-bounce-slow group-hover:ring-4 group-hover:ring-orange-200">
                      3
                    </div>
                    <span className="absolute -top-3 -right-2 text-xl bg-white rounded-full p-0.5 shadow-xs">🏀</span>
                  </div>
                  <span className="text-[10px] font-bold text-orange-600 bg-white px-2 py-0.5 rounded-full shadow-2xs border border-orange-100 group-hover:bg-orange-50">終極關懷</span>
                </div>

                {/* Node 4 */}
                <div 
                  onClick={() => { if (onSelectUnit) onSelectUnit('unit_04'); }}
                  className="flex flex-col items-center space-y-1 cursor-pointer hover:scale-110 active:scale-95 transition-all select-none group"
                  title="進入 單元04：價值思辨"
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-purple-500 text-white flex items-center justify-center font-bold text-lg border-4 border-white shadow-md relative z-10 group-hover:ring-4 group-hover:ring-purple-200">
                      4
                    </div>
                    <span className="absolute -top-3 -right-2 text-xl bg-white rounded-full p-0.5 shadow-xs">👧🏻</span>
                  </div>
                  <span className="text-[10px] font-bold text-purple-600 bg-white px-2 py-0.5 rounded-full shadow-2xs border border-purple-100 group-hover:bg-purple-50">價值思辨</span>
                </div>

                {/* Node 5 */}
                <div 
                  onClick={() => { if (onSelectUnit) onSelectUnit('unit_05'); }}
                  className="flex flex-col items-center space-y-1 cursor-pointer hover:scale-110 active:scale-95 transition-all select-none group"
                  title="進入 單元05：靈性修養與人格統整"
                >
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-lg border-4 border-white shadow-md relative z-10 group-hover:ring-4 group-hover:ring-rose-200">
                      5
                    </div>
                    <span className="absolute -top-3 -right-2 text-xl bg-white rounded-full p-0.5 shadow-xs">👴🏻</span>
                  </div>
                  <span className="text-[10px] font-bold text-teal-600 bg-white px-2 py-0.5 rounded-full shadow-2xs border border-teal-100">靈性修養</span>
                </div>

              </div>
              <div className="text-[10px] text-orange-700/60 font-bold mt-2">學習是一場旅程，而你就是自己生命的探險家！</div>
            </div>
          </div>

          {/* Units Chapters Details Grid */}
          <div className="grid grid-cols-1 gap-4">
            {UNIT_DATA.map((unit) => {
              const isSelected = selectedUnitId === unit.id;
              
              // Calculate dynamic chapters for this unit
              const dynamicChapters = unit.chapters.map(ch => {
                const completed = getStudentChapterStatus(currentSub, unit.id, ch.id);
                return { ...ch, completed };
              });
              const completedChapters = dynamicChapters.filter(c => c.completed).length;
              const totalChapters = dynamicChapters.length;
              const isLocked = false; // standard mode allows exploring all units!
              
              return (
                <div 
                  key={unit.id}
                  className={`bg-white rounded-3xl border transition-all p-5 overflow-hidden ${
                    isSelected 
                      ? 'border-amber-400 ring-2 ring-amber-500/10 shadow-xs' 
                      : 'border-amber-100 hover:border-amber-200 shadow-2xs'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-inner ${
                        isLocked ? 'bg-gray-100 text-gray-400' : 'bg-orange-50 text-orange-600'
                      }`}>
                        {unit.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-gray-400 font-bold tracking-wider">{unit.num}</span>
                          <span className="text-gray-300">|</span>
                          <span className="text-[10px] font-extrabold text-orange-600">
                            已完成 {completedChapters}/{totalChapters} 章節
                          </span>
                        </div>
                        <h3 className="text-sm font-bold text-gray-800">{unit.title}</h3>
                      </div>
                    </div>

                    <div>
                      {isLocked ? (
                        <span className="text-xs text-gray-400 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg flex items-center gap-1 font-medium">
                          <Lock className="w-3.5 h-3.5" /> 尚未解鎖
                        </span>
                      ) : (
                        <button 
                          onClick={() => { if (onSelectUnit) onSelectUnit(unit.id); }}
                          className="text-xs text-orange-600 hover:text-orange-800 bg-orange-50 hover:bg-orange-100 px-3 py-1 rounded-lg font-bold transition-all flex items-center gap-1"
                        >
                          {unit.id === 'unit_00' ? '進入總說' : '進入學習'}
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Chapter sub-list with indicators */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-t border-gray-50 pt-3">
                    {dynamicChapters.map((ch) => (
                      <div 
                        key={ch.id} 
                        className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs transition-colors ${
                          isLocked 
                            ? 'border-gray-50 bg-gray-50/20 text-gray-400' 
                            : ch.completed 
                              ? 'border-emerald-100 bg-emerald-50/10 text-gray-700' 
                              : 'border-amber-50 bg-orange-50/5 text-gray-700'
                        }`}
                      >
                        {isLocked ? (
                          <Lock className="w-3.5 h-3.5 text-gray-300" />
                        ) : ch.completed ? (
                          <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                        ) : (
                          <div className="w-4 h-4 rounded-full border-2 border-amber-400 shrink-0" />
                        )}
                        <div className="min-w-0 flex-1">
                          <span className="text-[9px] font-sans font-bold text-gray-400 block">{ch.id}</span>
                          <p className="truncate font-medium">{ch.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Right Column: Recommendations & Weekly Suggestions (3 columns) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Custom Recommendations Panel */}
          <div className="bg-white rounded-3xl border border-amber-100 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-gray-800 flex items-center gap-1">
                <Sparkles className="w-4 h-4 text-amber-500 fill-amber-100" />
                為你推薦的學習模組
              </h3>
              <button 
                onClick={handleRefreshRecommendations}
                className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {recommendations[refreshSeed].map((rec) => (
                <div 
                  key={rec.id} 
                  onClick={() => handleRecommendationClick(rec)}
                  className="p-3 bg-gray-50/50 border border-gray-100 rounded-2xl flex gap-3 items-center group cursor-pointer hover:bg-orange-50/50 hover:border-amber-200 hover:translate-x-1 transition-all"
                  title={`進入 ${rec.title}`}
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform">{rec.img}</span>
                  <div className="min-w-0 flex-1">
                    <span className="text-[9px] text-orange-600 font-bold block">{rec.type}</span>
                    <h4 className="text-xs font-bold text-gray-800 truncate">{rec.title}</h4>
                    <span className="inline-block text-[9px] text-gray-400">{rec.time}</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-gray-300 group-hover:text-orange-500 transition-colors" />
                </div>
              ))}
            </div>
          </div>

          {/* Weekly suggestions checklist */}
          <div className="bg-white rounded-3xl border border-amber-100 p-5 shadow-xs">
            <h3 className="text-sm font-bold text-gray-800 mb-3 flex items-center gap-1.5">
              📅 本週學習建議
            </h3>
            <p className="text-[11px] text-gray-400 mb-4">建議每週完成 2-3 個章節，保持穩定學習節奏！</p>
            
            <div className="space-y-3">
              {weeklyTasks.map((task, idx) => (
                <div 
                  key={idx} 
                  onClick={task.onClick}
                  className="flex items-center gap-2.5 cursor-pointer hover:bg-orange-50/30 p-1.5 rounded-xl transition-all"
                  title="點選查看建議說明"
                >
                  <div className={`p-0.5 rounded-md ${task.completed ? 'bg-emerald-50 text-emerald-500' : 'bg-gray-50 text-gray-400'}`}>
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span className={`text-xs ${task.completed ? 'text-gray-500 line-through font-normal' : 'text-gray-700 font-medium'}`}>
                    {task.text}
                  </span>
                </div>
              ))}
            </div>
          </div>



        </div>

      </div>

      {/* ========================================== */}
      {/* 1. FLOATING INTERACTIVE TOAST              */}
      {/* ========================================== */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-gray-900 text-white rounded-2xl p-4 shadow-2xl border border-gray-800 flex items-start gap-3 animate-bounce-slow">
          <span className="text-xl">💡</span>
          <div className="flex-1">
            <p className="text-xs font-bold leading-relaxed">{toastMsg}</p>
          </div>
          <button 
            onClick={() => setToastMsg(null)}
            className="text-gray-400 hover:text-white transition-colors p-0.5"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* ========================================== */}
      {/* 2. LEARNING PROGRESS DETAILED MODAL        */}
      {/* ========================================== */}
      {showProgressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-orange-100 max-h-[85vh] overflow-y-auto relative no-scrollbar">
            <button 
              onClick={() => setShowProgressModal(false)}
              className="absolute right-5 top-5 p-1.5 rounded-xl bg-gray-50 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-6">
              <span className="text-2xl">🔍</span>
              <div>
                <h3 className="text-lg font-black text-gray-800">生命探索學習進度分析</h3>
                <p className="text-xs text-gray-400">詳細紀錄你在本學期生命探索地圖的各項數據與學習行為指標</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Core numbers */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-100/50 text-center">
                  <span className="text-2xl font-black text-orange-600 block">{progressPercentage}%</span>
                  <span className="text-[10px] text-gray-400 font-bold">地圖閱讀總進度</span>
                </div>
                <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50 text-center">
                  <span className="text-2xl font-black text-blue-600 block">{completedChaptersCount} / 16</span>
                  <span className="text-[10px] text-gray-400 font-bold">已解鎖課本章節</span>
                </div>
                <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/50 text-center">
                  <span className="text-2xl font-black text-emerald-600 block">{completedQuestsCount} / 6</span>
                  <span className="text-[10px] text-gray-400 font-bold">已參與思辨對話</span>
                </div>
              </div>

              {/* Detail Table */}
              <div className="bg-gray-50 rounded-2xl p-4 space-y-3">
                <h4 className="text-xs font-black text-gray-700">🔍 學習單與思辨完成度細項：</h4>
                
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-gray-200/50">
                    <span className="text-gray-600">單元一：WOOP 願望學習單</span>
                    <span className={`font-bold ${currentSub?.woop?.submitted ? 'text-emerald-600' : 'text-gray-400'}`}>
                      {currentSub?.woop?.submitted ? '✅ 已提交 (分)' : '⏳ 未提交'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-200/50">
                    <span className="text-gray-600">單元二：生前特展回顧</span>
                    <span className={`font-bold ${currentSub?.exhibition?.submitted ? 'text-emerald-600' : 'text-gray-400'}`}>
                      {currentSub?.exhibition?.submitted ? '✅ 已提交' : '⏳ 未提交'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-200/50">
                    <span className="text-gray-600">單元三：自動駕駛人生實驗</span>
                    <span className={`font-bold ${currentSub?.autopilot ? 'text-emerald-600' : 'text-gray-400'}`}>
                      {currentSub?.autopilot ? '✅ 已完成' : '⏳ 未參與'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-200/50">
                    <span className="text-gray-600">單元三：蘇格拉底追問對話</span>
                    <span className={`font-bold ${currentSub?.socrates ? 'text-emerald-600' : 'text-gray-400'}`}>
                      {currentSub?.socrates ? '✅ 已完成' : '⏳ 未參與'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-gray-200/50">
                    <span className="text-gray-600">單元四：電車抉擇道德思辨</span>
                    <span className={`font-bold ${currentSub?.trolley ? 'text-emerald-600' : 'text-gray-400'}`}>
                      {currentSub?.trolley ? '✅ 已完成' : '⏳ 未參與'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-gray-600">單元四：非形式謬誤真理挑戰</span>
                    <span className={`font-bold ${currentSub?.fallacy ? 'text-emerald-600' : 'text-gray-400'}`}>
                      {currentSub?.fallacy ? '✅ 已完成' : '⏳ 未參與'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Behavior parameters */}
              <div className="border border-orange-100 rounded-2xl p-4">
                <h4 className="text-xs font-bold text-gray-700 mb-2">🌱 學習素養表現建議：</h4>
                <p className="text-[11px] text-gray-500 leading-relaxed">
                  你是一位優秀的探索者！在「自主學習、思辨邏輯、終極信念、靈性整合」表現十分優異。建議保持目前每週持續登入、穩定閱讀的好習慣，並多參與「蘇格拉底對話」及「真理辨辨機」互動，這能提升你的邏輯判斷與自我反思能力！
                </p>
              </div>
            </div>

            <div className="mt-6">
              <button 
                onClick={() => setShowProgressModal(false)}
                className="w-full py-3 bg-orange-600 text-white rounded-2xl text-xs font-bold shadow-md hover:bg-orange-700 transition-colors"
              >
                關閉並回到課程地圖
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* 3. 16 CHAPTERS CURRICULUM CHECKLIST MODAL  */}
      {/* ========================================== */}
      {showChaptersModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-orange-100 max-h-[90vh] overflow-y-auto relative no-scrollbar">
            <button 
              onClick={() => setShowChaptersModal(false)}
              className="absolute right-5 top-5 p-1.5 rounded-xl bg-gray-50 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 mb-6">
              <span className="text-2xl">📋</span>
              <div>
                <h3 className="text-lg font-black text-gray-800">課本學科檢核表 (16 章節)</h3>
                <p className="text-xs text-gray-400">點選下方任何章節，即可快速開啟對應課本並進入頁面閱讀！</p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Total Summary info */}
              <div className="flex justify-between items-center bg-orange-50/50 p-3 rounded-2xl border border-orange-100/50 text-xs text-orange-800">
                <span>📘 課本進度：<b>{completedChaptersCount} / 16</b> 章節已讀完</span>
                <span className="font-extrabold">{progressPercentage}% 達成率</span>
              </div>

              {/* Chapters list by Unit */}
              <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1 no-scrollbar">
                {UNIT_DATA.map((unit) => {
                  const dynamicChapters = unit.chapters.map(ch => {
                    const completed = getStudentChapterStatus(currentSub, unit.id, ch.id);
                    return { ...ch, completed };
                  });

                  return (
                    <div key={unit.id} className="border border-amber-100/60 rounded-2xl p-4 bg-amber-50/10">
                      <div className="flex justify-between items-center mb-2 pb-1 border-b border-gray-100">
                        <span className="text-xs font-black text-orange-600">{unit.num}：{unit.title}</span>
                        <span className="text-[10px] text-gray-400 font-bold">
                          已完成 {dynamicChapters.filter(c => c.completed).length} / {dynamicChapters.length}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {dynamicChapters.map((ch) => (
                          <div 
                            key={ch.id} 
                            onClick={() => {
                              if (onSelectUnit) {
                                onSelectUnit(unit.id);
                                setShowChaptersModal(false);
                              }
                            }}
                            className={`p-2 rounded-xl border flex items-center justify-between text-xs cursor-pointer transition-all ${
                              ch.completed 
                                ? 'border-emerald-100 bg-emerald-50/30 hover:bg-emerald-50 text-gray-700' 
                                : 'border-gray-100 bg-white hover:border-orange-200 text-gray-600 hover:bg-orange-50/10'
                            }`}
                            title="點選立即前往閱讀本章"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span className={`p-0.5 rounded-full ${ch.completed ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                                <Check className="w-3 h-3" />
                              </span>
                              <span className="truncate font-medium">{ch.title}</span>
                            </div>
                            <span className="text-[9px] text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded-md shrink-0 font-bold group-hover:bg-orange-100">
                              前往 📖
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button 
                onClick={() => setShowChaptersModal(false)}
                className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl text-xs font-bold transition-colors"
              >
                關閉
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
