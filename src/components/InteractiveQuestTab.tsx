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
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#FFF8F0] via-[#FCF5EB] to-[#FFF3E0] border border-[#F1E0CE] p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-3xs">
              
              {/* Floral Ornaments inside banner */}
              <div className="absolute top-0 left-0 w-24 h-24 bg-[radial-gradient(circle_at_center,rgba(230,81,0,0.04)_0,transparent_70%)] pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-36 h-36 bg-[radial-gradient(circle_at_center,rgba(76,175,80,0.04)_0,transparent_70%)] pointer-events-none" />

              <div className="space-y-4 max-w-2xl text-center md:text-left z-10">
                <div className="inline-flex items-center gap-2 bg-[#FFEEDD] border border-[#F5CBA7] text-[#D84315] px-4 py-1.5 rounded-full text-xs font-black tracking-wide shadow-3xs uppercase">
                  <Gamepad2 className="w-4.5 h-4.5" />
                  <span>互動遊戲 ‧ 班級同樂大廳</span>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-black text-[#4A321F] leading-tight tracking-tight">
                  班級同樂互動大廳
                </h1>
                
                <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-xl">
                  老師掌控節奏，學生掃描 QR Code 即可加入，一起參與互動遊戲，讓學習更有趣！
                </p>
              </div>

              {/* Character illustrations decoration */}
              <div className="relative shrink-0 flex items-center justify-center gap-2 z-10 bg-white/40 p-4 rounded-2xl border border-white/60 shadow-3xs">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-2xl border border-white shadow-3xs">👦🏻</div>
                  <span className="text-[10px] font-bold text-slate-500">陳可華</span>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center text-2xl border border-white shadow-3xs">👩🏻</div>
                  <span className="text-[10px] font-bold text-slate-500">張曉萍</span>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-2xl border border-white shadow-3xs">👵🏻</div>
                  <span className="text-[10px] font-bold text-slate-500">可華爺爺</span>
                </div>
              </div>
            </div>

            {/* MAIN DASHBOARD PANEL */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Column 1: 本班遊戲入口 */}
              <div className="bg-[#FCFAF6] border border-[#F1E0CE] rounded-3xl p-6 shadow-3xs space-y-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2.5 border-b border-[#F1E0CE]/60 pb-3">
                    <div className="p-2 bg-[#FFF0DF] rounded-xl text-[#E65100]">
                      <Users className="w-5 h-5" />
                    </div>
                    <h3 className="font-black text-[#4A321F] text-base">本班遊戲入口</h3>
                  </div>

                  <div className="flex items-center gap-4 bg-white border border-[#F1E0CE]/50 p-4 rounded-2xl shadow-3xs">
                    {/* QR Code graphic */}
                    <div className="w-24 h-24 shrink-0 bg-white border-2 border-orange-200 rounded-xl p-1.5 flex flex-col items-center justify-center relative">
                      {/* Fake QR code blocks */}
                      <div className="w-full h-full bg-[radial-gradient(#4A321F_2px,transparent_2px)] [background-size:6px_6px] opacity-80" />
                      <div className="absolute top-2 left-2 w-5 h-5 border-2 border-[#4A321F] bg-white" />
                      <div className="absolute top-2 right-2 w-5 h-5 border-2 border-[#4A321F] bg-white" />
                      <div className="absolute bottom-2 left-2 w-5 h-5 border-2 border-[#4A321F] bg-white" />
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-xs font-bold text-slate-400">班級代碼</div>
                      <div className="text-2xl font-black text-[#E65100] tracking-wide font-mono">4A28</div>
                      <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block border border-emerald-100">
                        ● 已加入 32 / 40 人
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2.5 pt-4">
                  <button 
                    onClick={handleCopyLink}
                    className="w-full py-2.5 border-2 border-[#E65100] hover:bg-orange-50 text-[#E65100] font-black text-xs rounded-xl transition-all shadow-3xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <LinkIcon className="w-4 h-4" />
                    <span>複製連結</span>
                  </button>
                  <button 
                    onClick={() => {
                      setActiveGameId(1);
                      showToast('🎮 遊戲開始！歡迎加入第一關！');
                    }}
                    className="w-full py-2.5 bg-[#E65100] hover:bg-[#D84315] text-white font-black text-xs rounded-xl transition-all shadow-3xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-4 h-4" />
                    <span>開始遊戲</span>
                  </button>
                </div>
              </div>

              {/* Column 2: 老師控制台 */}
              <div className="bg-[#FCFAF6] border border-[#F1E0CE] rounded-3xl p-6 shadow-3xs space-y-4">
                <div className="flex items-center gap-2.5 border-b border-[#F1E0CE]/60 pb-3">
                  <div className="p-2 bg-[#FFF0DF] rounded-xl text-[#E65100]">
                    <Tv className="w-5 h-5" />
                  </div>
                  <h3 className="font-black text-[#4A321F] text-base">老師控制台</h3>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black text-slate-400 block">遊戲模式</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button className="py-2 px-1 bg-[#FFF0DF] border border-[#E65100] text-[#E65100] font-black text-xs rounded-xl shadow-3xs">
                      個人作答
                    </button>
                    <button className="py-2 px-1 bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 font-bold text-xs rounded-xl shadow-3xs">
                      小組競賽
                    </button>
                    <button className="py-2 px-1 bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 font-bold text-xs rounded-xl shadow-3xs">
                      全班合作
                    </button>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <label className="text-xs font-black text-slate-400 block">小隊設定 (共 4 隊)</label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white border border-[#F1E0CE]/50 p-2 rounded-xl flex items-center gap-2">
                      <span className="text-base">👩🏻‍🎓</span>
                      <div className="text-left leading-none">
                        <div className="text-[11px] font-black text-slate-800">張曉萍隊</div>
                        <span className="text-[9px] text-slate-400">8人加入</span>
                      </div>
                    </div>
                    <div className="bg-white border border-[#F1E0CE]/50 p-2 rounded-xl flex items-center gap-2">
                      <span className="text-base">👦🏻</span>
                      <div className="text-left leading-none">
                        <div className="text-[11px] font-black text-slate-800">王博鈞隊</div>
                        <span className="text-[9px] text-slate-400">8人加入</span>
                      </div>
                    </div>
                    <div className="bg-white border border-[#F1E0CE]/50 p-2 rounded-xl flex items-center gap-2">
                      <span className="text-base">👧🏻</span>
                      <div className="text-left leading-none">
                        <div className="text-[11px] font-black text-slate-800">王小文隊</div>
                        <span className="text-[9px] text-slate-400">8人加入</span>
                      </div>
                    </div>
                    <div className="bg-white border border-[#F1E0CE]/50 p-2 rounded-xl flex items-center gap-2">
                      <span className="text-base">👦🏻</span>
                      <div className="text-left leading-none">
                        <div className="text-[11px] font-black text-slate-800">陳可華隊</div>
                        <span className="text-[9px] text-slate-400">8人加入</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Column 3: 投影與課堂互動流程 */}
              <div className="bg-[#FCFAF6] border border-[#F1E0CE] rounded-3xl p-6 shadow-3xs space-y-4 flex flex-col justify-between">
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between border-b border-[#F1E0CE]/60 pb-3">
                    <span className="font-black text-[#4A321F] text-sm">投影模式設定</span>
                    {/* Toggle switch simulation */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">已開啟</span>
                      <div className="w-10 h-5 bg-emerald-500 rounded-full p-0.5 cursor-pointer flex justify-end">
                        <div className="w-4 h-4 bg-white rounded-full shadow-xs" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs font-medium text-slate-500 leading-relaxed">
                    <div className="flex justify-between">
                      <span>隨機出題模式:</span>
                      <span className="font-bold text-[#E65100]">開啟 (不重覆)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>單題答題計時:</span>
                      <span className="font-bold text-[#E65100]">30 秒 / 題</span>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-3 space-y-2">
                  <div className="text-xs font-black text-[#B4570B] flex items-center gap-1.5">
                    <span>📋</span>
                    <span>課堂互動五步驟</span>
                  </div>
                  <ol className="text-[10px] text-slate-500 space-y-1 font-semibold list-decimal pl-4 leading-normal">
                    <li>老師開啟投影模式並投影大螢幕</li>
                    <li>學生掃描 QR Code 加入同樂大廳</li>
                    <li>老師點擊遊戲列表中的「進入遊戲」</li>
                    <li>學生在手機端與大螢幕同步作答</li>
                    <li>公布排行榜與老師點評總結</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* 10 INTERACTIVE GAMES LIST */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2">
                <Gamepad2 className="w-5 h-5 text-[#E65100]" />
                <h2 className="text-lg font-black text-[#4A321F]">本班生命教育互動遊戲列表 (共 10 款)</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {GAMES.map((game) => (
                  <div 
                    key={game.id}
                    className={`p-4 pt-5 pb-5 rounded-2xl border border-[#F1E0CE] bg-white hover:border-[#E65100] transition-all duration-300 shadow-3xs flex flex-col justify-between min-h-[220px] group`}
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <span className="text-sm font-black font-mono text-[#E65100]/60 bg-orange-50 border border-orange-100 px-2 py-0.5 rounded-md">
                          {game.number}
                        </span>
                        <div className="text-2xl">{game.emoji}</div>
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-black text-sm text-[#4A321F] group-hover:text-[#E65100] transition-colors line-clamp-1">
                          {game.title}
                        </h4>
                        <p className="text-[11px] text-slate-400 leading-normal font-medium line-clamp-3">
                          {game.description}
                        </p>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        setActiveGameId(game.id);
                        showToast(`🎮 歡迎進入：${game.title}！`);
                      }}
                      className="w-full mt-4 py-1.5 border border-[#E65100]/40 group-hover:border-[#E65100] rounded-xl text-xs font-black text-[#E65100] bg-white hover:bg-orange-50 transition-all shadow-3xs flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>進入遊戲</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* FOOTER TIPS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-[#F1E0CE]/60">
              <div className="bg-white/60 border border-[#F1E0CE]/40 rounded-2xl p-4 flex gap-3 items-start">
                <div className="p-2 bg-orange-50 border border-orange-100 rounded-xl text-[#E65100]">💡</div>
                <div className="space-y-1">
                  <h5 className="font-black text-xs text-slate-800">活絡班級氣氛</h5>
                  <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                    在課程剛開始或下半堂使用，透過 3-5 分鐘的即時對抗快速提升全班學生的專注力與學習熱忱。
                  </p>
                </div>
              </div>
              <div className="bg-white/60 border border-[#F1E0CE]/40 rounded-2xl p-4 flex gap-3 items-start">
                <div className="p-2 bg-orange-50 border border-orange-100 rounded-xl text-[#E65100]">📖</div>
                <div className="space-y-1">
                  <h5 className="font-black text-xs text-slate-800">搭配教科書單元</h5>
                  <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                    本大廳 10 款互動遊戲與泰宇生命教育課本 1-5 單元完全契合，老師可於講授到特定章節時開啟對應遊戲。
                  </p>
                </div>
              </div>
              <div className="bg-white/60 border border-[#F1E0CE]/40 rounded-2xl p-4 flex gap-3 items-start">
                <div className="p-2 bg-orange-50 border border-orange-100 rounded-xl text-[#E65100]">📈</div>
                <div className="space-y-1">
                  <h5 className="font-black text-xs text-slate-800">一鍵評分與引導</h5>
                  <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                    所有遊戲成果、心情打卡、價值選擇皆會即時汇总至學習統計中，方便導師在後台進行一鍵總結與反思給分。
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
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Banner */}
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-6 text-white space-y-2 shadow-xs">
                    <span className="text-xs font-black bg-white/20 px-3 py-1 rounded-full border border-white/20">01 心理測驗 MBTI</span>
                    <h2 className="text-xl font-black">16 型人格生命探索測驗</h2>
                    <p className="text-xs text-amber-50">回答 4 道核心情境題，發掘您的性格傾向，看見自己對生命的認知視角！</p>
                  </div>

                  {/* Question Cards / Result */}
                  <div className="bg-white border border-[#F1E0CE] rounded-3xl p-6 shadow-3xs">
                    {mbtiStep < mbtiQuestions.length ? (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                          <span className="text-sm font-black text-slate-500">第 {mbtiStep + 1} 題 / 共 4 題</span>
                          <span className="text-xs font-bold text-slate-400">依真實直覺作答即可</span>
                        </div>

                        <div className="space-y-4">
                          <h3 className="text-base font-black text-[#3E2723] leading-relaxed">
                            {mbtiQuestions[mbtiStep].q}
                          </h3>

                          <div className="space-y-3 pt-2">
                            {mbtiQuestions[mbtiStep].options.map((opt, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleMbtiAnswer(opt.val)}
                                className="w-full text-left p-4 rounded-2xl border-2 border-[#F1E0CE] hover:border-[#E65100] hover:bg-orange-50/50 transition-all shadow-3xs cursor-pointer flex justify-between items-center group"
                              >
                                <span className="text-sm font-extrabold text-[#4A321F] group-hover:text-[#E65100]">
                                  {opt.label}
                                </span>
                                <span className="text-xs font-bold text-slate-400 bg-slate-50 border border-slate-100 px-2 py-1 rounded-lg group-hover:bg-[#FFEEDD] group-hover:text-[#E65100] font-mono">
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
                          <div className="text-sm font-extrabold text-slate-700">
                            {getMbtiResult() === 'INFP' && '✨ 溫柔守護者 ‧ 尋求生命和諧與理想主義 ✨'}
                            {getMbtiResult() === 'ENFP' && '✨ 追夢冒險家 ‧ 充滿創意的生命旅人 ✨'}
                            {getMbtiResult() === 'INFJ' && '✨ 心靈引路人 ‧ 探尋深層生命意義者 ✨'}
                            {getMbtiResult() === 'ENFJ' && '✨ 溫暖領導者 ‧ 關懷全班同樂核心 ✨'}
                            {getMbtiResult() !== 'INFP' && getMbtiResult() !== 'ENFP' && getMbtiResult() !== 'INFJ' && getMbtiResult() !== 'ENFJ' && '✨ 智慧思考家 ‧ 理性探求生命軌跡 ✨'}
                          </div>
                        </div>

                        <p className="text-xs text-slate-500 leading-relaxed max-w-md mx-auto font-medium">
                          這代表你格外在乎生命的內在連結。你相信生命具有無限可能，不甘於平庸，且願意給予身邊每個人溫柔的包容！
                        </p>

                        <div className="flex gap-3 justify-center pt-4">
                          <button
                            onClick={resetMbti}
                            className="px-6 py-2 border-2 border-[#E65100] text-[#E65100] font-black text-xs rounded-xl hover:bg-orange-50 transition-all cursor-pointer shadow-3xs"
                          >
                            重做測驗
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Progress Meter */}
                  <div className="bg-[#FCFAF6] border border-[#F1E0CE] rounded-3xl p-5 shadow-3xs space-y-4">
                    <h4 className="font-black text-[#4A321F] text-sm flex items-center gap-1.5">
                      <span>📊</span>
                      <span>人格傾向分佈度</span>
                    </h4>

                    <div className="space-y-3.5 text-xs font-black">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] text-[#7D6B5D]">
                          <span>外向 (E)</span>
                          <span>內向 (I)</span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                          <div className="bg-orange-400 transition-all duration-500" style={{ width: mbtiAnswers[0] === 'E' ? '75%' : '25%' }} />
                          <div className="bg-indigo-300 transition-all duration-500" style={{ width: mbtiAnswers[0] === 'E' ? '25%' : '75%' }} />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] text-[#7D6B5D]">
                          <span>感覺 (S)</span>
                          <span>直覺 (N)</span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                          <div className="bg-orange-400 transition-all duration-500" style={{ width: mbtiAnswers[1] === 'S' ? '70%' : '30%' }} />
                          <div className="bg-indigo-300 transition-all duration-500" style={{ width: mbtiAnswers[1] === 'S' ? '30%' : '70%' }} />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] text-[#7D6B5D]">
                          <span>思考 (T)</span>
                          <span>情感 (F)</span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden flex">
                          <div className="bg-orange-400 transition-all duration-500" style={{ width: mbtiAnswers[2] === 'T' ? '65%' : '35%' }} />
                          <div className="bg-indigo-300 transition-all duration-500" style={{ width: mbtiAnswers[2] === 'T' ? '35%' : '65%' }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Dad's Tip */}
                  <div className="bg-[#FFFDF9] border border-[#F1E0CE] rounded-3xl p-5 shadow-3xs space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-lg shadow-3xs">👨🏻</div>
                      <div className="text-left leading-none">
                        <h5 className="font-black text-xs text-slate-800">可華爸爸的小叮嚀</h5>
                        <span className="text-[9px] text-slate-400">生命諮商導師</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-bold bg-[#FAF5EC]/40 p-3 rounded-xl border border-[#F1E0CE]/40">
                      「小博，MBTI性格測驗沒有好與壞之分。它只是幫助你明白自己習慣用什麼眼光看生命、用什麼模式與世界交流。多去欣賞班上跟你性格截然不同的同學！」
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------------------------------------- */}
            {/* GAME VIEW 2: LIFE PUZZLE MAP */}
            {/* ------------------------------------------------------------------------------------------------- */}
            {activeGameId === 2 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Banner */}
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-6 text-white space-y-2 shadow-xs">
                    <span className="text-xs font-black bg-white/20 px-3 py-1 rounded-full border border-white/20">02 生命拼圖地圖</span>
                    <h2 className="text-xl font-black">五大單元生命拼圖</h2>
                    <p className="text-xs text-blue-50">點擊左側的生命單元板塊，將它們拼入教室大螢幕的生命拼圖地圖中，點亮完整人生！</p>
                  </div>

                  {/* Puzzle Board Canvas */}
                  <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-3xs space-y-6">
                    <div className="text-center">
                      <h3 className="text-sm font-black text-slate-500">✨ 班級生命地圖拼湊區 ✨</h3>
                    </div>

                    <div className="relative w-full max-w-lg mx-auto aspect-[4/3] border-4 border-[#F1E0CE] rounded-2xl bg-[#FFFBF5] overflow-hidden shadow-2xs flex items-center justify-center p-4">
                      {/* Grid representation of puzzle layout */}
                      <div className="grid grid-cols-3 gap-3 w-full h-full">
                        {Object.entries(puzzlePlaced).map(([key, placed]) => (
                          <div 
                            key={key}
                            onClick={() => handlePlacePuzzle(key)}
                            className={`border-2 rounded-xl flex flex-col items-center justify-center p-3 text-center transition-all cursor-pointer ${
                              placed 
                                ? 'bg-gradient-to-br from-orange-100 to-amber-100 border-amber-400 text-amber-800 scale-98 shadow-inner' 
                                : 'bg-[#FAF6F0]/60 border-dashed border-[#F1E0CE] text-slate-300 hover:bg-[#FAF6F0] hover:scale-102 hover:border-[#E65100]'
                            }`}
                          >
                            <span className="text-2xl mb-1">{placed ? '🏆' : '➕'}</span>
                            <span className="text-xs font-black tracking-wide leading-tight">{key}</span>
                            <span className="text-[10px] font-bold text-slate-400 mt-1">
                              {placed ? '已置入' : '點擊拼入'}
                            </span>
                          </div>
                        ))}
                        {/* Final placeholder to look elegant */}
                        <div className="border-2 border-dashed border-[#F1E0CE] bg-[#FAF6F0]/20 rounded-xl flex items-center justify-center text-slate-300 font-bold text-xs">
                          完整人生
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={resetPuzzle}
                        className="px-6 py-2 border-2 border-[#E65100] text-[#E65100] font-black text-xs rounded-xl hover:bg-orange-50 transition-all cursor-pointer shadow-3xs"
                      >
                        重置地圖
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Progress gauge */}
                  <div className="bg-[#FCFAF6] border border-[#F1E0CE] rounded-3xl p-5 shadow-3xs space-y-4">
                    <span className="text-xs font-black text-slate-400 block">拼圖完成進度</span>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-3xl font-black text-[#E65100] font-mono">
                        {Object.values(puzzlePlaced).filter(Boolean).length} / 5
                      </div>
                      <div className="flex-1 h-3.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-400 to-orange-500 transition-all duration-300"
                          style={{ width: `${(Object.values(puzzlePlaced).filter(Boolean).length / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Grandpa's Tip */}
                  <div className="bg-[#FFFDF9] border border-[#F1E0CE] rounded-3xl p-5 shadow-3xs space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-lg shadow-3xs">👵🏻</div>
                      <div className="text-left leading-none">
                        <h5 className="font-black text-xs text-slate-800">可華爺爺的鼓勵</h5>
                        <span className="text-[9px] text-slate-400">生命智者</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-bold bg-[#FAF5EC]/40 p-3 rounded-xl border border-[#F1E0CE]/40">
                      「小博，生命並不是一天拼出來的。哲學思考是火，引領我們看清路；人學探索是眼，幫我們看見人的多元。把這五個單元慢慢嵌入你心裡，你便有了完整生命的能量！」
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------------------------------------- */}
            {/* GAME VIEW 3: SCENARIO ADVENTURE */}
            {/* ------------------------------------------------------------------------------------------------- */}
            {activeGameId === 3 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Banner */}
                  <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl p-6 text-white space-y-2 shadow-xs">
                    <span className="text-xs font-black bg-white/20 px-3 py-1 rounded-full border border-white/20">03 情境選擇大冒險</span>
                    <h2 className="text-xl font-black">情境抉擇 ‧ 生命智慧拉鋸戰</h2>
                    <p className="text-xs text-emerald-50">遭遇道德或生活兩難情境時，您的選擇將會塑建您最核心的生命價值點數！</p>
                  </div>

                  {/* Question Cards / Result */}
                  <div className="bg-white border border-[#F1E0CE] rounded-3xl p-6 shadow-3xs">
                    {adventureStage < adventureScenarios.length ? (
                      <div className="space-y-6">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                          <span className="text-sm font-black text-slate-500">冒險關卡：{adventureScenarios[adventureStage].title}</span>
                          <span className="text-xs font-bold text-slate-400">做出你的價值抉擇</span>
                        </div>

                        <div className="space-y-4">
                          <p className="text-sm font-extrabold text-[#4A321F] bg-slate-50 p-4 rounded-2xl leading-relaxed border border-slate-100">
                            {adventureScenarios[adventureStage].story}
                          </p>

                          <div className="space-y-3 pt-2">
                            {adventureScenarios[adventureStage].options.map((opt, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleAdventureChoice(opt.points)}
                                className="w-full text-left p-4 rounded-2xl border-2 border-[#F1E0CE] hover:border-[#E65100] hover:bg-orange-50/50 transition-all shadow-3xs cursor-pointer"
                              >
                                <span className="text-sm font-black text-[#4A321F]">
                                  {opt.text}
                                </span>
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
                            className="px-6 py-2 border-2 border-[#E65100] text-[#E65100] font-black text-xs rounded-xl hover:bg-orange-50 transition-all cursor-pointer shadow-3xs"
                          >
                            重來一次
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Current values values display */}
                  <div className="bg-[#FCFAF6] border border-[#F1E0CE] rounded-3xl p-5 shadow-3xs space-y-4">
                    <span className="text-xs font-black text-slate-400 block">當前價值點數</span>
                    
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-bold">
                          <span>❤️ 同理心</span>
                          <span>{adventurePoints.同理} pts</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500 transition-all" style={{ width: `${Math.min(100, adventurePoints.同理 * 4)}%` }} />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-bold">
                          <span>🛡️ 誠信責任</span>
                          <span>{adventurePoints.責任} pts</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 transition-all" style={{ width: `${Math.min(100, adventurePoints.責任 * 4)}%` }} />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-xs font-bold">
                          <span>🔥 道德勇氣</span>
                          <span>{adventurePoints.勇氣} pts</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500 transition-all" style={{ width: `${Math.min(100, adventurePoints.勇氣 * 4)}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------------------------------------- */}
            {/* GAME VIEW 4: RELATIONSHIP LINKS */}
            {/* ------------------------------------------------------------------------------------------------- */}
            {activeGameId === 4 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Banner */}
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-3xl p-6 text-white space-y-2 shadow-xs">
                    <span className="text-xs font-black bg-white/20 px-3 py-1 rounded-full border border-white/20">04 人際關係連連看</span>
                    <h2 className="text-xl font-black">建立本班溫暖支持網絡</h2>
                    <p className="text-xs text-purple-50">點擊第一個角色大頭貼，再點擊另一個角色大頭貼，即可拉出紅線建立彼此的陪伴與支持連結！</p>
                  </div>

                  {/* Graph Interaction Board */}
                  <div className="bg-white border border-[#F1E0CE] rounded-3xl p-6 shadow-3xs space-y-6">
                    <div className="text-center space-y-2">
                      <h3 className="text-sm font-black text-slate-500">💖 人際關係支持網畫布 💖</h3>
                      <p className="text-[11px] text-slate-400">目前選擇：{selectedNode ? <span className="text-indigo-600 font-bold">{selectedNode}</span> : '無'}</p>
                    </div>

                    {/* Nodes grid */}
                    <div className="grid grid-cols-3 gap-4 max-w-md mx-auto py-4">
                      {['陳可華', '王博鈞', '張曉萍', '王小文', '可華爸爸', '可華爺爺'].map(node => (
                        <div 
                          key={node}
                          onClick={() => handleNodeClick(node)}
                          className={`p-3 border-2 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
                            selectedNode === node 
                              ? 'border-indigo-600 bg-indigo-50/50 scale-105 shadow-md' 
                              : 'border-dashed border-[#F1E0CE] bg-[#FCFAF6] hover:bg-indigo-50/20 hover:border-indigo-400 hover:scale-102'
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
                          <span className="text-xs font-black text-[#4A321F] mt-1">{node}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-center gap-3 border-t border-slate-100 pt-4">
                      <span className="text-xs font-black text-slate-400">關係類型：</span>
                      <div className="flex gap-1.5 flex-wrap">
                        {['家人', '死黨', '陪伴者', '支持者'].map(r => (
                          <button
                            key={r}
                            onClick={() => setSelectedRel(r)}
                            className={`px-3 py-1 text-xs font-black rounded-lg transition-all border ${
                              selectedRel === r 
                                ? 'bg-indigo-600 border-indigo-600 text-white shadow-3xs' 
                                : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                            }`}
                          >
                            {r}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Connection list */}
                  <div className="bg-[#FCFAF6] border border-[#F1E0CE] rounded-3xl p-5 shadow-3xs space-y-4">
                    <span className="text-xs font-black text-slate-400 block">已建立連結清單</span>
                    
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {connections.map((c, idx) => (
                        <div key={idx} className="bg-white border border-slate-100 p-2.5 rounded-xl flex justify-between items-center shadow-3xs text-xs font-black">
                          <div className="flex items-center gap-1.5">
                            <span>{c.from}</span>
                            <span className="text-[#E65100]">↔️</span>
                            <span>{c.to}</span>
                            <span className="bg-indigo-50 text-indigo-600 border border-indigo-100 px-2 py-0.5 rounded-md text-[10px] ml-1">
                              {c.rel}
                            </span>
                          </div>

                          <button 
                            onClick={() => handleRemoveConnection(idx)}
                            className="text-slate-300 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------------------------------------- */}
            {/* GAME VIEW 5: VALUE SCALES */}
            {/* ------------------------------------------------------------------------------------------------- */}
            {activeGameId === 5 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Banner */}
                  <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-3xl p-6 text-white space-y-2 shadow-xs">
                    <span className="text-xs font-black bg-white/20 px-3 py-1 rounded-full border border-white/20">05 價值天平排序戰</span>
                    <h2 className="text-xl font-black">核心生命價值天平</h2>
                    <p className="text-xs text-amber-50">點擊卡片旁的「上移」或「下移」，將您最看重、最守護的核心價值排在最頂端。看見您靈魂的側重傾斜！</p>
                  </div>

                  {/* Interaction Card */}
                  <div className="bg-white border border-[#F1E0CE] rounded-3xl p-6 shadow-3xs grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-sm font-black text-slate-500 border-b border-slate-100 pb-2">🔄 調整價值優先順序</h3>
                      
                      <div className="space-y-2">
                        {valuesList.map((val, idx) => (
                          <div 
                            key={val}
                            className="bg-[#FCFAF6] border border-[#F1E0CE]/50 px-4 py-2.5 rounded-xl flex items-center justify-between shadow-3xs text-xs font-black"
                          >
                            <div className="flex items-center gap-2">
                              <span className="w-5 h-5 rounded bg-[#E65100]/10 text-[#E65100] flex items-center justify-center font-bold">
                                {idx + 1}
                              </span>
                              <span>{val}</span>
                            </div>

                            <div className="flex gap-1">
                              <button 
                                onClick={() => moveValue(idx, 'up')}
                                disabled={idx === 0}
                                className="p-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-30 cursor-pointer"
                              >
                                ⬆️
                              </button>
                              <button 
                                onClick={() => moveValue(idx, 'down')}
                                disabled={idx === valuesList.length - 1}
                                className="p-1 border border-slate-200 rounded hover:bg-slate-50 disabled:opacity-30 cursor-pointer"
                              >
                                ⬇️
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col justify-between items-center text-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="space-y-1">
                        <h4 className="text-xs font-black text-slate-400">當前天平狀態</h4>
                        <div className="text-sm font-black text-[#E65100]">
                          最重要核心：{valuesList[0]}
                        </div>
                      </div>

                      {/* Graphic balance scales */}
                      <div className="relative py-8 flex flex-col items-center">
                        {/* Horizontal balance bar that tilts */}
                        <div 
                          className="w-48 h-3.5 bg-amber-800 rounded-full flex justify-between px-2 transition-transform duration-500 relative"
                          style={{ transform: `rotate(${tiltValue}deg)` }}
                        >
                          <div className="w-6 h-6 rounded-full bg-amber-400 border border-white shadow-3xs flex items-center justify-center text-[10px] -mt-1">{valuesList[0]}</div>
                          <div className="w-6 h-6 rounded-full bg-slate-300 border border-white shadow-3xs flex items-center justify-center text-[10px] -mt-1">{valuesList[valuesList.length - 1]}</div>
                        </div>
                        {/* Stand */}
                        <div className="w-3 h-20 bg-amber-900" />
                        <div className="w-20 h-3 bg-amber-950 rounded-t-lg" />
                      </div>

                      <p className="text-[10px] text-slate-400 font-bold leading-normal">
                        天平將隨著您最在乎的價值卡片（如「自由」與「責任」）產生傾斜。
                      </p>
                    </div>
                  </div>

                  {/* Refelction form */}
                  <div className="bg-white border border-[#F1E0CE] rounded-3xl p-6 shadow-3xs space-y-3">
                    <h3 className="text-sm font-black text-[#4A321F]">我的價值反思（寫作大廳同步）</h3>
                    <textarea
                      value={reflectionText}
                      onChange={(e) => setReflectionText(e.target.value)}
                      placeholder="請用一兩句話寫下：為什麼您會做出這樣的價值優先順序選擇？這代表您最想守護的是什麼？"
                      className="w-full h-24 p-3 border-2 border-[#F1E0CE] rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:border-[#E65100]"
                    />
                    <div className="flex justify-end">
                      <button 
                        onClick={saveReflection}
                        className="px-5 py-2 bg-[#E65100] hover:bg-[#D84315] text-white font-black text-xs rounded-xl shadow-3xs flex items-center gap-1 cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>儲存我的反思</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Tips Card */}
                  <div className="bg-[#FCFAF6] border border-[#F1E0CE] rounded-3xl p-5 shadow-3xs space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-lg shadow-3xs">👨🏻</div>
                      <div className="text-left leading-none">
                        <h5 className="font-black text-xs text-slate-800">可華爸爸的價值引導</h5>
                        <span className="text-[9px] text-slate-400">生命導引大師</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-bold bg-[#FAF5EC]/40 p-3 rounded-xl border border-[#F1E0CE]/40">
                      「小博，在『自由』與『責任』之間，我們每個人都在尋求一種平衡。自由給予我們飛翔的羽翼，而責任則是拉住風箏的那根線。想一想，若一味追求其中一個，生命會面臨什麼樣的失衡呢？」
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------------------------------------- */}
            {/* GAME VIEW 6: LIFE STORY FLIP CARDS */}
            {/* ------------------------------------------------------------------------------------------------- */}
            {activeGameId === 6 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Banner */}
                  <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-3xl p-6 text-white space-y-2 shadow-xs">
                    <span className="text-xs font-black bg-white/20 px-3 py-1 rounded-full border border-white/20">06 生命故事翻翻卡</span>
                    <h2 className="text-xl font-black">故事與價值的記憶對對碰</h2>
                    <p className="text-xs text-rose-50">翻轉兩張卡片，如果生命核心價值（例如「勇氣」）能與具體生命情境故事完美配對，即完成匹配！</p>
                  </div>

                  {/* Playable Grid */}
                  <div className="bg-white border border-[#F1E0CE] rounded-3xl p-6 shadow-3xs space-y-6">
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2 text-xs font-black">
                      <div className="flex gap-4">
                        <span>計步：{memoryMoves} 步</span>
                        <span>得分：{memoryScore} 分</span>
                      </div>
                      <button 
                        onClick={initMemoryGame}
                        className="text-pink-600 font-extrabold flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        <span>重新洗牌</span>
                      </button>
                    </div>

                    {memoryFinished ? (
                      <div className="text-center py-8 space-y-4">
                        <div className="text-4xl">🏆</div>
                        <h3 className="text-xl font-black text-rose-600 animate-pulse">恭喜全班成功配對所有生命故事！</h3>
                        <p className="text-xs text-slate-400">總計花費了 {memoryMoves} 步，獲得 {memoryScore} 分！</p>
                        <button 
                          onClick={initMemoryGame}
                          className="px-6 py-2 bg-[#E65100] hover:bg-[#D84315] text-white font-black text-xs rounded-xl shadow-3xs cursor-pointer"
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
                            className={`aspect-square rounded-2xl flex items-center justify-center text-center p-2.5 border-2 text-xs font-black transition-all cursor-pointer ${
                              card.isMatched 
                                ? 'bg-[#F0FDF4] border-emerald-300 text-emerald-800 scale-95 shadow-inner' 
                                : card.isFlipped 
                                  ? 'bg-rose-50 border-rose-300 text-rose-800 rotate-1' 
                                  : 'bg-[#FCFAF6] border-[#F1E0CE] text-slate-300 hover:border-rose-400 hover:bg-[#FFFBF5] relative overflow-hidden'
                            }`}
                          >
                            {card.isFlipped || card.isMatched ? (
                              <span className="leading-tight break-all font-extrabold">{card.text}</span>
                            ) : (
                              <div className="flex flex-col items-center">
                                <span className="text-lg">⭐</span>
                                <span className="text-[10px] text-slate-400 font-bold mt-1">翻轉生命</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Matching Guide */}
                  <div className="bg-[#FCFAF6] border border-[#F1E0CE] rounded-3xl p-5 shadow-3xs space-y-4">
                    <span className="text-xs font-black text-slate-400 block">生命配對指南</span>
                    <ul className="text-xs text-slate-500 font-bold space-y-2 leading-relaxed">
                      <li>• <b>勇氣</b> ↔ 面對重重困難仍然前行</li>
                      <li>• <b>同理</b> ↔ 站在同學的角度設身處地</li>
                      <li>• <b>責任</b> ↔ 切實履行給家人的諾言</li>
                      <li>• <b>夢想</b> ↔ 堅定追尋內心所愛的世界</li>
                      <li>• <b>感恩</b> ↔ 時刻記得對他人的好說謝謝</li>
                      <li>• <b>尊重</b> ↔ 理解班上每個人都是獨一無二</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------------------------------------- */}
            {/* GAME VIEW 7: GRATITUDE BUBBLE WALL */}
            {/* ------------------------------------------------------------------------------------------------- */}
            {activeGameId === 7 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Banner */}
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-6 text-white space-y-2 shadow-xs">
                    <span className="text-xs font-black bg-white/20 px-3 py-1 rounded-full border border-white/20">07 感恩泡泡站</span>
                    <h2 className="text-xl font-black">班級溫馨感恩泡泡牆</h2>
                    <p className="text-xs text-emerald-50">寫下您對同學、家人或老師最誠摯的感謝，送出您的溫暖泡泡，讓全班大螢幕熱鬧起來！</p>
                  </div>

                  {/* Bubble form */}
                  <div className="bg-white border border-[#F1E0CE] rounded-3xl p-6 shadow-3xs space-y-4">
                    <h3 className="text-sm font-black text-[#4A321F] border-b border-slate-100 pb-2">🎈 吹起我的感恩泡泡</h3>
                    
                    <form onSubmit={handleSendBubble} className="space-y-4">
                      <div className="space-y-2">
                        <textarea
                          value={gratitudeMsg}
                          onChange={(e) => setGratitudeMsg(e.target.value)}
                          placeholder="小文，今天在走廊跌倒時謝謝你熱心扶起我，還幫我撿起課本..."
                          className="w-full h-24 p-3 border-2 border-[#F1E0CE] rounded-2xl text-xs font-bold text-slate-700 focus:outline-none focus:border-emerald-500"
                        />
                      </div>

                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                        {/* Bubble Color select */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-slate-400">泡泡色系：</span>
                          <div className="flex gap-1.5">
                            {['#FED7AA', '#FBCFE8', '#D9F99D', '#BAE6FD'].map(c => (
                              <button
                                type="button"
                                key={c}
                                onClick={() => setBubbleColor(c)}
                                className="w-5 h-5 rounded-full border-2 transition-all cursor-pointer"
                                style={{ backgroundColor: c, borderColor: bubbleColor === c ? '#E65100' : 'transparent' }}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Anonymous selection & Send */}
                        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                          <label className="flex items-center gap-1.5 text-xs font-black text-slate-500 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={isAnonymous}
                              onChange={(e) => setIsAnonymous(e.target.checked)}
                              className="w-4 h-4 rounded border-[#F1E0CE] text-emerald-600 focus:ring-emerald-500"
                            />
                            <span>匿名分享至大螢幕</span>
                          </label>

                          <button 
                            type="submit"
                            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs rounded-xl shadow-3xs flex items-center gap-1 cursor-pointer"
                          >
                            <Send className="w-4 h-4" />
                            <span>送出心意</span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>

                  {/* Active Bubbles list */}
                  <div className="bg-white border border-[#F1E0CE] rounded-3xl p-6 shadow-3xs space-y-4">
                    <h3 className="text-sm font-black text-slate-400">💭 目前牆上的溫馨泡泡</h3>

                    {/* Floating-like bubbles container */}
                    <div className="flex flex-wrap gap-4 justify-center py-4">
                      {bubbles.map((b, idx) => (
                        <div 
                          key={idx}
                          className="max-w-xs p-4 rounded-3xl border border-[#F1E0CE]/60 text-xs font-black shadow-3xs transition-transform hover:scale-102 flex flex-col justify-between"
                          style={{ backgroundColor: b.color, transform: `rotate(${(idx % 2 === 0) ? '1' : '-1.5'}deg)` }}
                        >
                          <p className="leading-relaxed text-[#3E2723] mb-2">{b.text}</p>
                          <span className="text-[10px] text-slate-400 self-end block mt-1">
                            👤 來自 {b.sender} 的感謝
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Warmth indicator */}
                  <div className="bg-[#FCFAF6] border border-[#F1E0CE] rounded-3xl p-5 shadow-3xs space-y-4 text-center">
                    <span className="text-xs font-black text-slate-400 block">全班溫暖熱度指數</span>
                    
                    <div className="inline-flex p-5 bg-orange-50 rounded-full text-orange-600 font-black text-3xl font-mono animate-pulse shadow-inner">
                      {warmthIndex}°C
                    </div>
                    <p className="text-[11px] text-slate-400 font-bold leading-normal">
                      每當有一位同學送出感恩泡泡，班級的溫度將隨之升高。讓我們一起打造 100°C 的超溫馨班級！
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------------------------------------- */}
            {/* GAME VIEW 8: PHILOSOPHICAL DEBATE */}
            {/* ------------------------------------------------------------------------------------------------- */}
            {activeGameId === 8 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Banner */}
                  <div className="bg-gradient-to-r from-sky-500 to-blue-600 rounded-3xl p-6 text-white space-y-2 shadow-xs">
                    <span className="text-xs font-black bg-white/20 px-3 py-1 rounded-full border border-white/20">08 哲學辯論快攻</span>
                    <h2 className="text-xl font-black">幸福比成功更重要嗎？</h2>
                    <p className="text-xs text-sky-50">全班思想大碰撞！聽完正方與反方的核心理念後，投下您認同的一票，並在觀戰席中寫下反駁吧！</p>
                  </div>

                  {/* Debate Arena */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Pro */}
                    <div className="bg-white border border-[#F1E0CE] rounded-3xl p-5 shadow-3xs space-y-4 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">🔵</span>
                          <div>
                            <h4 className="font-black text-sm text-slate-800">正方觀點：王博鈞</h4>
                            <span className="text-[10px] text-slate-400 font-bold">「幸福是生命唯一的終極指針」</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed font-bold bg-slate-50 p-3 rounded-xl border border-slate-100">
                          「如果一個人取得了巨大的世俗成功（如萬貫家財或至高名望），內心卻感到空虛、焦慮、日夜難眠，這種成功還有什麼意義呢？我們拼搏的所有外在事物，本質上都是為了獲取內心的幸福。因此，幸福本身才是目的，成功只是手段。」
                        </p>
                      </div>

                      <button 
                        onClick={() => handleVote('pro')}
                        className={`w-full py-2 border-2 rounded-xl text-xs font-black transition-all cursor-pointer shadow-3xs flex items-center justify-center gap-1 ${
                          userVote === 'pro' 
                            ? 'bg-blue-600 border-blue-600 text-white' 
                            : 'border-blue-500 text-blue-500 hover:bg-blue-50'
                        }`}
                      >
                        <span>支持 正方：王博鈞</span>
                      </button>
                    </div>

                    {/* Con */}
                    <div className="bg-white border border-[#F1E0CE] rounded-3xl p-5 shadow-3xs space-y-4 flex flex-col justify-between">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">🔴</span>
                          <div>
                            <h4 className="font-black text-sm text-slate-800">反方觀點：陳可華</h4>
                            <span className="text-[10px] text-slate-400 font-bold">「成功為幸福構築基石與保障」</span>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed font-bold bg-slate-50 p-3 rounded-xl border border-slate-100">
                          「幸福如果缺乏現實物質保障和自我實踐的成功支持，往往只是脆弱的泡沫。在學業、事業上取得成功，能極大拓展一個人的生命厚度與選擇自由，讓我們有能力去守護家人的幸福。成功是實實在在的耕耘！」
                        </p>
                      </div>

                      <button 
                        onClick={() => handleVote('con')}
                        className={`w-full py-2 border-2 rounded-xl text-xs font-black transition-all cursor-pointer shadow-3xs flex items-center justify-center gap-1 ${
                          userVote === 'con' 
                            ? 'bg-red-600 border-red-600 text-white' 
                            : 'border-red-500 text-red-500 hover:bg-red-50'
                        }`}
                      >
                        <span>支持 反方：陳可華</span>
                      </button>
                    </div>
                  </div>

                  {/* Comment Section */}
                  <div className="bg-white border border-[#F1E0CE] rounded-3xl p-6 shadow-3xs space-y-4">
                    <h3 className="text-sm font-black text-[#4A321F] border-b border-slate-100 pb-2">🗣️ 觀戰評論席（即時同步）</h3>
                    
                    <form onSubmit={handleAddComment} className="flex gap-2">
                      <input
                        type="text"
                        value={debateComment}
                        onChange={(e) => setDebateComment(e.target.value)}
                        placeholder="發表您的關鍵論點或反駁想法..."
                        className="flex-1 px-3 py-2 border-2 border-[#F1E0CE] rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-blue-500"
                      />
                      <button 
                        type="submit"
                        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl shadow-3xs flex items-center gap-1 shrink-0 cursor-pointer"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>發表評論</span>
                      </button>
                    </form>

                    <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                      {comments.map((c, idx) => (
                        <div key={idx} className="bg-slate-50/50 border border-slate-100 p-2.5 rounded-xl text-xs font-black flex gap-2">
                          <span className="shrink-0 text-[#E65100]">
                            {c.side === 'pro' && '🔵'}
                            {c.side === 'con' && '🔴'}
                            {c.side === 'teacher' && '👩🏻‍🏫'}
                            {c.side === 'spectator' && '💬'}
                          </span>
                          <div className="space-y-1">
                            <span className="text-[10px] text-slate-400 font-bold block">{c.user}</span>
                            <p className="text-slate-600 leading-normal">{c.text}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Poll stats */}
                  <div className="bg-[#FCFAF6] border border-[#F1E0CE] rounded-3xl p-5 shadow-3xs space-y-4">
                    <span className="text-xs font-black text-slate-400 block">班級投票即時看板</span>
                    
                    <div className="space-y-3.5 text-xs font-black">
                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] text-blue-600">
                          <span>正方：王博鈞</span>
                          <span>{debateVotes.pro} 票 ({(debateVotes.pro / (debateVotes.pro + debateVotes.con) * 100).toFixed(0)}%)</span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 transition-all duration-300" style={{ width: `${(debateVotes.pro / (debateVotes.pro + debateVotes.con) * 100)}%` }} />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between text-[11px] text-red-600">
                          <span>反方：陳可華</span>
                          <span>{debateVotes.con} 票 ({(debateVotes.con / (debateVotes.pro + debateVotes.con) * 100).toFixed(0)}%)</span>
                        </div>
                        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-red-500 transition-all duration-300" style={{ width: `${(debateVotes.con / (debateVotes.pro + debateVotes.con) * 100)}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------------------------------------- */}
            {/* GAME VIEW 9: MOOD THERMOMETER */}
            {/* ------------------------------------------------------------------------------------------------- */}
            {activeGameId === 9 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Banner */}
                  <div className="bg-gradient-to-r from-rose-500 to-pink-600 rounded-3xl p-6 text-white space-y-2 shadow-xs">
                    <span className="text-xs font-black bg-white/20 px-3 py-1 rounded-full border border-white/20">09 心情溫度計</span>
                    <h2 className="text-xl font-black">全班今日情感心情大打卡</h2>
                    <p className="text-xs text-rose-50">拖動下方刻度，調節您今天的心情溫度（從冰冷低落到熱情超級開心），並寫下心情小札記吧！</p>
                  </div>

                  {/* Slider Card */}
                  <div className="bg-white border border-[#F1E0CE] rounded-3xl p-6 shadow-3xs space-y-6">
                    <div className="text-center py-4 space-y-3">
                      <div className="text-5xl animate-bounce">
                        {moodEmojis[moodLevel - 1].emoji}
                      </div>
                      <h3 className={`text-base font-black ${moodEmojis[moodLevel - 1].color}`}>
                        當前選定心情：{moodEmojis[moodLevel - 1].label}
                      </h3>
                    </div>

                    {/* Thermometer Slider Interaction */}
                    <div className="space-y-4 max-w-md mx-auto">
                      <input
                        type="range"
                        min="1"
                        max="6"
                        step="1"
                        value={moodLevel}
                        onChange={(e) => setMoodLevel(parseInt(e.target.value))}
                        className="w-full accent-rose-500 h-2 bg-rose-100 rounded-lg appearance-none cursor-pointer"
                      />

                      <div className="flex justify-between text-xs font-black text-slate-400">
                        <span>😢 1.非常低落</span>
                        <span>😐 3.普通</span>
                        <span>🥳 6.超級開心</span>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-4 space-y-3">
                      <h4 className="text-xs font-black text-slate-500">✍️ 寫下我的今天心情札記（大廳匿名發布）</h4>
                      <textarea
                        value={moodNote}
                        onChange={(e) => setMoodNote(e.target.value)}
                        placeholder="今天雖然放學後練球有點累，但是和博鈞一起喝了冰可樂，覺得很充實..."
                        className="w-full h-20 p-3 border-2 border-[#F1E0CE] rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-rose-500"
                      />
                      <div className="flex justify-end">
                        <button
                          onClick={handleSaveMood}
                          className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-black text-xs rounded-xl shadow-3xs flex items-center gap-1 cursor-pointer"
                        >
                          <Send className="w-4 h-4" />
                          <span>儲存心情紀錄</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* History List */}
                  {savedMoods.length > 0 && (
                    <div className="bg-white border border-[#F1E0CE] rounded-3xl p-6 shadow-3xs space-y-3">
                      <h3 className="text-sm font-black text-slate-500">🌡️ 歷史心情紀錄表</h3>
                      <div className="space-y-2">
                        {savedMoods.map((m, idx) => (
                          <div key={idx} className="bg-slate-50/50 border border-slate-100 p-2.5 rounded-xl flex items-center gap-3 text-xs font-black shadow-3xs">
                            <span className="text-2xl">{moodEmojis[m.level - 1].emoji}</span>
                            <div className="text-left">
                              <span className="text-[9px] text-slate-400 font-bold block">{m.date} ‧ {moodEmojis[m.level - 1].label}</span>
                              <p className="text-slate-600 leading-normal">{m.note}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Recharts Pie Chart representing Class Mood stats */}
                  <div className="bg-[#FCFAF6] border border-[#F1E0CE] rounded-3xl p-5 shadow-3xs space-y-4">
                    <span className="text-xs font-black text-slate-400 block">全班心情即時分佈比例</span>
                    
                    <div className="h-44 w-full relative">
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
                            innerRadius={45}
                            outerRadius={65}
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

                    <div className="grid grid-cols-2 gap-2 text-[10px] font-black">
                      <div className="flex items-center gap-1.5 text-rose-500">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                        <span>非常開心 (25%)</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-orange-500">
                        <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                        <span>開心愉悅 (30%)</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-500">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                        <span>心情普通 (25%)</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-blue-500">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                        <span>低落 (20%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------------------------------------------- */}
            {/* GAME VIEW 10: BADGE CHALLENGE */}
            {/* ------------------------------------------------------------------------------------------------- */}
            {activeGameId === 10 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Banner */}
                  <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-6 text-white space-y-2 shadow-xs">
                    <span className="text-xs font-black bg-white/20 px-3 py-1 rounded-full border border-white/20">10 成長徽章挑戰賽</span>
                    <h2 className="text-xl font-black">全班生命力成長挑战</h2>
                    <p className="text-xs text-emerald-50">勾選下方您在生活或本週課堂中真實實踐完成的挑戰任務，一鍵解鎖並點亮屬於您的光榮班級徽章！</p>
                  </div>

                  {/* Tasks Checklist */}
                  <div className="bg-white border border-[#F1E0CE] rounded-3xl p-6 shadow-3xs space-y-4">
                    <h3 className="text-sm font-black text-[#4A321F] border-b border-slate-100 pb-2">🎯 點亮我的成長軌跡（本週實踐任務）</h3>
                    
                    <div className="space-y-3">
                      {badgeTasks.map(t => (
                        <div 
                          key={t.id}
                          onClick={() => toggleBadgeTask(t.id)}
                          className="bg-[#FCFAF6] border border-[#F1E0CE]/50 p-3 rounded-2xl flex items-center justify-between shadow-3xs cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/10 transition-all group"
                        >
                          <div className="flex items-center gap-3 text-xs font-black text-slate-700">
                            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                              t.done 
                                ? 'bg-emerald-600 border-emerald-600 text-white' 
                                : 'border-slate-300 bg-white group-hover:border-emerald-500'
                            }`}>
                              {t.done && <Check className="w-3.5 h-3.5" />}
                            </div>
                            <span className={t.done ? 'line-through text-slate-400' : ''}>{t.text}</span>
                          </div>

                          <span className={`text-[10px] font-black px-2.5 py-1 rounded-lg border ${
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
                  <div className="bg-white border border-[#F1E0CE] rounded-3xl p-6 shadow-3xs space-y-4">
                    <h3 className="text-sm font-black text-slate-400">🏅 我的班級勳章展示架</h3>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-2">
                      {badgeTasks.map(t => (
                        <div 
                          key={t.id}
                          className={`p-4 border rounded-2xl flex flex-col items-center text-center justify-between shadow-3xs transition-all ${
                            t.done 
                              ? 'bg-[#F0FDF4] border-emerald-300 text-emerald-800 scale-100 relative overflow-hidden' 
                              : 'bg-slate-50 border-slate-200 text-slate-300 opacity-60 scale-98 select-none'
                          }`}
                        >
                          {t.done && <div className="absolute -top-1 -right-1 text-sm bg-amber-400 text-white px-1.5 py-0.5 rounded-bl-xl shadow-3xs font-black">⭐</div>}
                          <span className="text-3xl mb-1">{t.done ? '🎖️' : '🔒'}</span>
                          <span className="text-xs font-black tracking-wide leading-tight">{t.badge}</span>
                          <span className="text-[9px] font-bold text-slate-400 mt-1 leading-normal">
                            {t.done ? '已點亮解鎖' : '未點亮'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Achievement levels */}
                  <div className="bg-[#FCFAF6] border border-[#F1E0CE] rounded-3xl p-5 shadow-3xs space-y-4">
                    <span className="text-xs font-black text-slate-400 block">今日解鎖成就數</span>
                    
                    <div className="text-center space-y-2 py-2">
                      <div className="text-3xl font-black text-emerald-600 font-mono">
                        {unlockedBadgeCount} / 4
                      </div>
                      <p className="text-[11px] text-slate-400 font-bold leading-normal">
                        持續點亮更多任務，全班導師會在學習後台看見您優異的行動力並進行綜合點評給分！
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
