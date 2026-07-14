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

interface CourseMapTabProps {
  onNavigate: (tab: string) => void;
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

  const achievements = [
    { id: 'a1', title: '哲思新手', desc: '完成「哲學思考」第 1 章', unlocked: true, icon: '🏆' },
    { id: 'a2', title: '探索者', desc: '完成 10 個章節', unlocked: true, icon: '🛡️' },
    { id: 'a3', title: '思辨小達人', desc: '完成 5 次思辨實驗', unlocked: true, icon: '🎓' }
  ];

  const recommendations = [
    [
      { id: 'r1', type: '思辨實驗室', title: '真理辨辨機', sub: '互動實驗', time: '15 分鐘', img: '⚖️' },
      { id: 'r2', type: '生命故事館', title: '阿嬤的智慧羅盤', sub: '故事閱讀', time: '20 分鐘', img: '🧭' },
      { id: 'r3', type: '互動遊戲', title: '價值選擇大冒險', sub: '遊戲挑戰', time: '25 分鐘', img: '🎮' },
      { id: 'r4', type: '心靈補給站', title: '感恩日記：點亮心中的光', sub: '引導練習', time: '10 分鐘', img: '🕯️' }
    ],
    [
      { id: 'r5', type: '思辨實驗室', title: '蘇格拉底追問機', sub: '互動思辨', time: '12 分鐘', img: '📜' },
      { id: 'r6', type: '生命故事館', title: '落葉的最後一堂課', sub: '故事閱讀', time: '15 分鐘', img: '🍂' },
      { id: 'r7', type: '互動遊戲', title: '情緒怪獸大亂鬥', sub: '心理探索', time: '20 分鐘', img: '👹' },
      { id: 'r8', type: '心靈補給站', title: '呼吸冥想：韌性防護', sub: '舒壓放鬆', time: '8 分鐘', img: '🧘🏻‍♀️' }
    ]
  ];

  const weeklyTasks = [
    { text: '完成 1 個章節', completed: true },
    { text: '參與 1 次思辨實驗', completed: true },
    { text: '閱讀 1 篇生命故事', completed: false }
  ];

  const handleRefreshRecommendations = () => {
    setRefreshSeed(prev => (prev + 1) % recommendations.length);
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
            <div className="relative w-36 h-36 flex items-center justify-center">
              {/* SVG circular progress */}
              <svg className="w-full h-full transform -rotate-90">
                <circle 
                  cx="72" cy="72" r="58" 
                  className="text-gray-100" 
                  strokeWidth="10" stroke="currentColor" fill="transparent" 
                />
                <circle 
                  cx="72" cy="72" r="58" 
                  className="text-orange-500" 
                  strokeWidth="10" strokeDasharray={2 * Math.PI * 58} 
                  strokeDashoffset={2 * Math.PI * 58 * (1 - 0.62)}
                  strokeLinecap="round" stroke="currentColor" fill="transparent" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center space-y-0.5">
                <span className="text-3xl font-extrabold text-orange-600 font-sans">62%</span>
                <span className="text-[10px] text-gray-500 font-bold">課程總進度</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 w-full mt-4 text-left border-t border-gray-50 pt-4">
              <div className="bg-gray-50/50 p-2 rounded-xl">
                <span className="text-[9px] text-gray-400 font-bold block">已完成單元</span>
                <span className="text-xs font-bold text-gray-700">2 / 6</span>
              </div>
              <div className="bg-gray-50/50 p-2 rounded-xl">
                <span className="text-[9px] text-gray-400 font-bold block">已完成章節</span>
                <span className="text-xs font-bold text-gray-700">10 / 16</span>
              </div>
            </div>

            {/* Quick stats items */}
            <div className="w-full mt-3 space-y-2 text-left">
              <div className="flex items-center justify-between text-[11px] text-gray-500 bg-gray-50/50 p-2 rounded-xl px-3">
                <span className="flex items-center gap-1.5 font-medium"><Clock className="w-3.5 h-3.5 text-orange-500" />總學習時數</span>
                <span className="font-bold text-gray-700">18 小時 36 分</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-gray-500 bg-gray-50/50 p-2 rounded-xl px-3">
                <span className="flex items-center gap-1.5 font-medium"><Flame className="w-3.5 h-3.5 text-orange-500" />連續學習</span>
                <span className="font-bold text-gray-700">7 天</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-gray-500 bg-gray-50/50 p-2 rounded-xl px-3">
                <span className="flex items-center gap-1.5 font-medium"><Gift className="w-3.5 h-3.5 text-emerald-500" />探索點數</span>
                <span className="font-bold text-gray-700">2,450 點</span>
              </div>
            </div>
          </div>

          {/* Achievements badge panel */}
          <div className="bg-white rounded-3xl border border-amber-100 p-5 shadow-xs">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-gray-800 flex items-center gap-2">
                <Trophy className="w-4.5 h-4.5 text-amber-500" />
                最近解鎖成就
              </h3>
              <button className="text-[10px] text-orange-600 font-bold hover:underline">查看全部</button>
            </div>

            <div className="space-y-3">
              {achievements.map((ach) => (
                <div key={ach.id} className="flex gap-3 items-center bg-gray-50/50 p-2.5 rounded-xl border border-gray-100">
                  <span className="text-xl">{ach.icon}</span>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-gray-800 truncate">{ach.title}</h4>
                    <p className="text-[9px] text-gray-400">{ach.desc}</p>
                  </div>
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                </div>
              ))}
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
              const isLocked = (unit.status as string) === 'locked';
              const isActive = unit.status === 'active';
              
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
                            已完成 {unit.completedChapters}/{unit.totalChapters} 章節
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
                          {unit.id === 'unit_00' ? '進入總說' : unit.id === 'unit_01' ? '進入單元' : '繼續學習'}
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Chapter sub-list with indicators */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-t border-gray-50 pt-3">
                    {unit.chapters.map((ch) => (
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
                  className="p-3 bg-gray-50/50 border border-gray-100 rounded-2xl flex gap-3 items-center group"
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
                <div key={idx} className="flex items-center gap-2.5">
                  <div className={`p-0.5 rounded-md ${task.completed ? 'bg-emerald-50 text-emerald-500' : 'bg-gray-50 text-gray-400'}`}>
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <span className={`text-xs ${task.completed ? 'text-gray-500 line-through' : 'text-gray-700 font-medium'}`}>
                    {task.text}
                  </span>
                </div>
              ))}
            </div>
          </div>



        </div>

      </div>
    </div>
  );
}
