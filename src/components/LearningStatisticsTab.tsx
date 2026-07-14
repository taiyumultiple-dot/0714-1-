import React, { useMemo } from 'react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { 
  TrendingUp, 
  CheckCircle, 
  Award, 
  FileText, 
  Users, 
  Sparkles, 
  Activity, 
  Smile, 
  Percent,
  Check,
  X
} from 'lucide-react';
import { StudentSubmission } from '../types';
import { ACHIEVEMENTS } from '../achievements';

interface LearningStatisticsTabProps {
  submissions: StudentSubmission[];
}

const COLORS = [
  '#f59e0b', // Amber
  '#3b82f6', // Blue
  '#10b981', // Emerald
  '#8b5cf6', // Purple
  '#ec4899', // Pink
  '#f43f5e', // Rose
  '#06b6d4', // Cyan
  '#14b8a6', // Teal
];

export default function LearningStatisticsTab({ submissions }: LearningStatisticsTabProps) {
  const totalStudentsCount = submissions.length || 1;

  // 1. Calculate Worksheet Completions
  const statsData = useMemo(() => {
    let woopCount = 0;
    let exhibitionCount = 0;
    let autopilotCount = 0;
    let socratesCount = 0;
    let trolleyCount = 0;
    let fallacyCount = 0;

    submissions.forEach(sub => {
      if (sub.woop?.submitted) woopCount++;
      if (sub.exhibition?.submitted) exhibitionCount++;
      if (sub.autopilot) autopilotCount++;
      if (sub.socrates) socratesCount++;
      if (sub.trolley) trolleyCount++;
      if (sub.fallacy) fallacyCount++;
    });

    return [
      { name: 'WOOP 願望', 已完成: woopCount, 未完成: totalStudentsCount - woopCount },
      { name: '生前特展', 已完成: exhibitionCount, 未完成: totalStudentsCount - exhibitionCount },
      { name: '自主人生', 已完成: autopilotCount, 未完成: totalStudentsCount - autopilotCount },
      { name: '蘇格拉底', 已完成: socratesCount, 未完成: totalStudentsCount - socratesCount },
      { name: '電車抉擇', 已完成: trolleyCount, 未完成: totalStudentsCount - trolleyCount },
      { name: '思辨挑戰', 已完成: fallacyCount, 未完成: totalStudentsCount - fallacyCount },
    ];
  }, [submissions, totalStudentsCount]);

  // 2. Calculate Keyword Wall Frequency
  const keywordData = useMemo(() => {
    const counts: Record<string, number> = {};
    submissions.forEach(sub => {
      if (sub.exhibition?.keywords) {
        sub.exhibition.keywords.forEach(kw => {
          const trimmed = kw.trim();
          if (trimmed) {
            counts[trimmed] = (counts[trimmed] || 0) + 1;
          }
        });
      }
    });

    const sorted = Object.entries(counts)
      .map(([text, count]) => ({ name: text, value: count }))
      .sort((a, b) => b.value - a.value);

    return sorted.slice(0, 8); // Top 8 keywords
  }, [submissions]);

  // Total Keywords Count
  const totalKeywordsSubmitted = useMemo(() => {
    let sum = 0;
    submissions.forEach(sub => {
      if (sub.exhibition?.keywords) {
        sum += sub.exhibition.keywords.length;
      }
    });
    return sum;
  }, [submissions]);

  // 3. Class Average Badges
  const studentMetrics = useMemo(() => {
    return submissions.map(sub => {
      // Calculate unlocked badges
      const unlockedCount = ACHIEVEMENTS.filter(a => a.checkUnlock(sub)).length;
      
      // Calculate average score for WOOP & Exhibition
      const woopScore = sub.woop?.feedback?.score || 0;
      const exhibitionScore = sub.exhibition?.feedback?.score || 0;
      const scores = [woopScore, exhibitionScore].filter(s => s > 0);
      const avgScore = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null;

      // Count completed tasks
      let completedTasks = 0;
      if (sub.woop?.submitted) completedTasks++;
      if (sub.exhibition?.submitted) completedTasks++;
      if (sub.autopilot) completedTasks++;
      if (sub.socrates) completedTasks++;
      if (sub.trolley) completedTasks++;
      if (sub.fallacy) completedTasks++;

      return {
        id: sub.studentId,
        name: sub.studentName,
        completedTasks,
        completionRate: Math.round((completedTasks / 6) * 100),
        avgScore,
        unlockedCount
      };
    });
  }, [submissions]);

  const classAvgCompletionRate = useMemo(() => {
    if (studentMetrics.length === 0) return 0;
    const sum = studentMetrics.reduce((acc, m) => acc + m.completionRate, 0);
    return Math.round(sum / studentMetrics.length);
  }, [studentMetrics]);

  return (
    <div className="space-y-6">
      {/* 1. TOP STATS HEADER BANNER */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-950 rounded-3xl p-6 text-white border border-blue-950 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-6 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5">
            <span className="text-[10px] font-extrabold uppercase tracking-widest bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full border border-blue-400/20">
              📊 統計數據中心
            </span>
            <h2 className="text-xl md:text-2xl font-black tracking-tight">班級學習數據分析</h2>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              即時掌握全班學生的學習進度、作業完成率與生命關鍵字共鳴分佈。
            </p>
          </div>
          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4">
            <TrendingUp className="w-8 h-8 text-amber-400 shrink-0" />
            <div>
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest block">班級平均完成率</span>
              <span className="text-2xl font-black text-white">{classAvgCompletionRate}%</span>
            </div>
          </div>
        </div>

        {/* Highlight Widgets */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/10">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 block">學生總人數</span>
            <p className="text-lg font-black text-white flex items-center gap-1.5">
              <Users className="w-4 h-4 text-blue-400" />
              {totalStudentsCount} 位
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 block">關鍵字投遞總數</span>
            <p className="text-lg font-black text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              {totalKeywordsSubmitted} 次
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 block">解鎖虛擬勳章次數</span>
            <p className="text-lg font-black text-white flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-400" />
              {studentMetrics.reduce((sum, m) => sum + m.unlockedCount, 0)} 個
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-slate-400 block">已繳交作業總數</span>
            <p className="text-lg font-black text-white flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-rose-400" />
              {submissions.reduce((sum, sub) => {
                let count = 0;
                if (sub.woop?.submitted) count++;
                if (sub.exhibition?.submitted) count++;
                return sum + count;
              }, 0)} 份
            </p>
          </div>
        </div>
      </div>

      {/* 2. CHARTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart A: Worksheet Completions */}
        <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-3xs space-y-4">
          <div className="flex items-center gap-1.5 pb-2 border-b border-slate-50">
            <FileText className="w-4.5 h-4.5 text-blue-500" />
            <h3 className="text-sm font-black text-slate-800">各單元學習任務完成度</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #f1f5f9', fontSize: '11px' }}
                  itemStyle={{ fontWeight: 700 }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 600, paddingTop: '10px' }} />
                <Bar dataKey="已完成" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={16} stackId="a" />
                <Bar dataKey="未完成" fill="#e2e8f0" radius={[4, 4, 0, 0]} barSize={16} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart B: Keyword wall distribution */}
        <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-3xs space-y-4">
          <div className="flex items-center gap-1.5 pb-2 border-b border-slate-50">
            <Sparkles className="w-4.5 h-4.5 text-amber-500" />
            <h3 className="text-sm font-black text-slate-800">熱門生命關鍵字分佈 (TOP 8)</h3>
          </div>
          
          {keywordData.length > 0 ? (
            <div className="flex flex-col md:flex-row items-center gap-4 h-64">
              <div className="w-full md:w-1/2 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={keywordData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {keywordData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #f1f5f9', fontSize: '11px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full md:w-1/2 space-y-2 max-h-56 overflow-y-auto no-scrollbar pr-1">
                {keywordData.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between text-xs bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2">
                      <span 
                        className="w-2.5 h-2.5 rounded-full shrink-0" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="font-extrabold text-slate-700">{item.name}</span>
                    </div>
                    <span className="font-mono font-black text-slate-500 bg-white border border-slate-100 px-2 py-0.5 rounded-md">
                      {item.value} 人投遞
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-64 flex flex-col items-center justify-center text-center text-slate-400 space-y-2">
              <Activity className="w-8 h-8 text-slate-300" />
              <p className="text-xs font-semibold">目前尚無學生在關鍵字牆投遞關鍵字</p>
            </div>
          )}
        </div>

      </div>

      {/* 3. DETAILED PROGRESS MATRIX TABLE */}
      <div className="bg-white rounded-3xl border border-slate-100 p-5 shadow-3xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-slate-50">
          <div className="flex items-center gap-1.5">
            <Smile className="w-4.5 h-4.5 text-emerald-500" />
            <h3 className="text-sm font-black text-slate-800">全班學生學習歷程進度矩陣</h3>
          </div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            更新於目前作答狀態
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-extrabold">
                <th className="py-3 px-4">姓名</th>
                <th className="py-3 px-4 text-center">WOOP 願望</th>
                <th className="py-3 px-4 text-center">生前特展</th>
                <th className="py-3 px-4 text-center">自動人生</th>
                <th className="py-3 px-4 text-center">蘇格拉底</th>
                <th className="py-3 px-4 text-center">電車抉擇</th>
                <th className="py-3 px-4 text-center">思辨挑戰</th>
                <th className="py-3 px-4 text-center">解鎖勳章</th>
                <th className="py-3 px-4 text-right">整體進度</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {submissions.map((sub) => {
                const metric = studentMetrics.find(m => m.id === sub.studentId);
                
                return (
                  <tr key={sub.studentId} className="hover:bg-slate-50/50 transition-colors">
                    {/* Name */}
                    <td className="py-3.5 px-4 font-extrabold text-slate-700">
                      {sub.studentName}
                    </td>

                    {/* WOOP */}
                    <td className="py-3.5 px-4 text-center">
                      {sub.woop?.submitted ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-50 text-slate-300">
                          <X className="w-3 h-3 stroke-[2]" />
                        </span>
                      )}
                    </td>

                    {/* Exhibition */}
                    <td className="py-3.5 px-4 text-center">
                      {sub.exhibition?.submitted ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-50 text-slate-300">
                          <X className="w-3 h-3 stroke-[2]" />
                        </span>
                      )}
                    </td>

                    {/* Autopilot */}
                    <td className="py-3.5 px-4 text-center">
                      {sub.autopilot ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-50 text-slate-300">
                          <X className="w-3 h-3 stroke-[2]" />
                        </span>
                      )}
                    </td>

                    {/* Socrates */}
                    <td className="py-3.5 px-4 text-center">
                      {sub.socrates ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-50 text-slate-300">
                          <X className="w-3 h-3 stroke-[2]" />
                        </span>
                      )}
                    </td>

                    {/* Trolley */}
                    <td className="py-3.5 px-4 text-center">
                      {sub.trolley ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-50 text-slate-300">
                          <X className="w-3 h-3 stroke-[2]" />
                        </span>
                      )}
                    </td>

                    {/* Fallacy */}
                    <td className="py-3.5 px-4 text-center">
                      {sub.fallacy ? (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-50 text-slate-300">
                          <X className="w-3 h-3 stroke-[2]" />
                        </span>
                      )}
                    </td>

                    {/* Unlocked badges */}
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center gap-1 text-[11px] font-black bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 rounded-full">
                        🏅 {metric?.unlockedCount || 0} 個
                      </span>
                    </td>

                    {/* Completion Rate */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="font-mono font-black text-slate-700">{metric?.completionRate}%</span>
                        <div className="w-12 bg-slate-100 h-1.5 rounded-full overflow-hidden hidden sm:block">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-indigo-500 h-full rounded-full" 
                            style={{ width: `${metric?.completionRate}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
