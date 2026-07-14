import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Compass, 
  BookOpen, 
  HelpCircle, 
  Sparkles, 
  Brain, 
  Gamepad2, 
  MessageCircle, 
  Tv, 
  Award, 
  Check, 
  AlertTriangle, 
  ArrowRight, 
  Play, 
  RefreshCw,
  Clock,
  Heart,
  User,
  CheckCircle,
  GraduationCap,
  TrendingUp,
  BarChart2
} from 'lucide-react';
import { StudentSubmission } from '../types';

interface InteractiveQuestTabProps {
  currentStudent: StudentSubmission;
  onSaveQuest: (studentId: string, questType: 'autopilot' | 'socrates' | 'trolley' | 'fallacy', data: any) => void;
  role: 'student' | 'teacher';
  submissions: StudentSubmission[];
  onSaveQuestFeedback: (studentId: string, questType: 'autopilot' | 'socrates' | 'trolley' | 'fallacy', comments: string) => void;
  defaultQuest?: 'autopilot' | 'socrates' | 'trolley' | 'fallacy' | 'teacher_panel';
}

export default function InteractiveQuestTab({ 
  currentStudent, 
  onSaveQuest, 
  role, 
  submissions, 
  onSaveQuestFeedback,
  defaultQuest
}: InteractiveQuestTabProps) {
  const [activeQuest, setActiveQuest] = useState<'autopilot' | 'socrates' | 'trolley' | 'fallacy' | 'teacher_panel'>(defaultQuest || 'autopilot');

  useEffect(() => {
    if (defaultQuest) {
      setActiveQuest(defaultQuest);
    }
  }, [defaultQuest]);

  // If role is switched to teacher, and we were on a student-only screen, let's keep it or auto-adjust
  useEffect(() => {
    if (role === 'teacher' && activeQuest !== 'teacher_panel') {
      setActiveQuest('teacher_panel');
    } else if (role === 'student' && activeQuest === 'teacher_panel') {
      setActiveQuest(defaultQuest || 'autopilot');
    }
  }, [role, defaultQuest]);

  // ========================================================
  // 1. STATE & LOGIC FOR AUTOPILOT DISRUPTER
  // ========================================================
  const [autopilotStep, setAutopilotStep] = useState<number>(0);
  const [metacognitiveOn, setMetacognitiveOn] = useState<boolean>(false);
  const [autopilotLog, setAutopilotLog] = useState<string[]>([]);
  const [autopilotNickname, setAutopilotNickname] = useState<string>('');

  const autopilotScenarios = [
    {
      title: "通勤捷運上的低頭族",
      description: "你一上捷運，自動導航模式立刻啟動：你的右手伸進口袋，抓出手機解鎖，開始無意識地滑動社群軟體。螢幕上的資訊、搞笑短影片一幕幕閃過，你的眼神渙散，肩膀僵硬，對周圍的一切毫無知覺。",
      autopilotAction: "繼續瘋狂下滑，感覺時間過得很快，但內心卻空落落的。下車時只覺得脖子很酸，不記得剛才看了什麼。",
      metaAction: "【啟動後設思考暫停鈕】！你收起手機，深呼吸一口氣。你開始看著捷運車窗的倒影，觀察隔壁乘客疲憊但溫慢的對話，注意到博愛座前一位阿嬤提著沉重的菜籃。此時你發覺自己其實能掌控時間，而不是被演算媒介支配。",
      reflection: "後設覺察：手機成癮往往是心靈規避無聊的『自動化導航』。當我們按下暫停，生命的其他維度（美感、周遭他人的存在）才會在視野中浮現。"
    },
    {
      title: "狼吞虎嚥的日常飲食",
      description: "午休時間，你端著便當坐在桌前。你的雙眼盯著平板播放的新劇，左手扶著碗，右手機械式地用湯匙把食物往嘴裡塞。你甚至不知道剛才嚼進去的是胡蘿蔔還是滷肉。",
      autopilotAction: "在影片播放完畢的同時吞完便當。只記得劇情很精彩，對食物的味道一無所知，胃部有些消化不良的脹氣感。",
      metaAction: "【啟動後設思考暫停鈕】！你將平板關掉、鎖定。你專注看著眼前的米飯與蔬菜，聞著便當的香氣。第一口，你細細咀嚼了20次，體會米粒的甘甜與油脂的芬芳，心中升起對辛苦栽種作物的農人、烹飪者的感恩。",
      reflection: "後設覺察：日常飲食不僅是補充燃料，更是與天地、萬物和他人建立物理連結的儀式。打破自動導航，從享受一口飯、一口菜的當下開始。"
    },
    {
      title: "網絡爭議的鍵盤發言",
      description: "你在論壇上看到一則極具爭議的社會新聞。底下的留言群情激憤，各種辱罵與諷刺滿天飛。你體內的一股怒氣被自動點燃，手指按在鍵盤上，準備打出一句尖酸刻薄的反駁來『加入戰局』。",
      autopilotAction: "順從衝動發送傷人的留言。事後幾小時你不斷刷新通知，只要有人反駁你就更憤怒，整個下午的情緒都被這條不相干的新聞給毀了。",
      metaAction: "【啟動後設思考暫停鈕】！你在按下送出前，把手從鍵盤移開。你問自己：『我為什麼如此渴望在這個匿名爭論中取得口角優勢？我的這句批判真的對解決問題有幫助，還是只是在宣洩內心的壓力？我是否正淪為集體情緒盲從的齒輪？』隨後你關掉視窗，決定出門散步。",
      reflection: "後設覺察：後真相時代的社群網絡是集體情緒的『自動化推進器』。唯有按下暫停、打破本能反射，我們才能保留人格的獨立思辨與對他人的善良體貼。"
    }
  ];

  const handleAutopilotChoice = (isAutopilot: boolean) => {
    const sc = autopilotScenarios[autopilotStep];
    const logText = isAutopilot 
      ? `🚨 自動導航結局：${sc.autopilotAction}`
      : `🌟 覺察暫停結局：${sc.metaAction}`;
    
    const newLog = [...autopilotLog, logText];
    const nextStep = autopilotStep < autopilotScenarios.length - 1 ? autopilotStep + 1 : -1;
    
    setAutopilotLog(newLog);
    setAutopilotStep(nextStep);

    // Save progress dynamically
    onSaveQuest(currentStudent.studentId, 'autopilot', {
      log: newLog,
      step: nextStep,
      nickname: autopilotNickname.trim() || currentStudent.studentName
    });
  };

  const resetAutopilot = () => {
    setAutopilotStep(0);
    setAutopilotLog([]);
    setMetacognitiveOn(false);
    onSaveQuest(currentStudent.studentId, 'autopilot', {
      log: [],
      step: 0,
      nickname: autopilotNickname.trim() || currentStudent.studentName
    });
  };

  // ========================================================
  // 2. STATE & LOGIC FOR SOCRATES CHAT
  // ========================================================
  const [socratesMessages, setSocratesMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [socratesInput, setSocratesInput] = useState<string>('');
  const [socratesLoading, setSocratesLoading] = useState<boolean>(false);
  const [socratesNickname, setSocratesNickname] = useState<string>('');

  const defaultSocratesGreeting = '你好！我是雅典的蘇格拉底。聽說你正在思考生命的意義與真理？在我們開始之前，請告訴我你對這件事的看法：你認為「過著一個追求財富與享受的生活，就是幸福的生命嗎？」說說你的真實想法，我們一起來理性探討。';

  const handleSocratesSend = async () => {
    if (!socratesInput.trim()) return;
    const userMsgText = socratesInput.trim();
    setSocratesInput('');

    const updatedMessages = [...socratesMessages, { role: 'user' as const, text: userMsgText }];
    setSocratesMessages(updatedMessages);
    setSocratesLoading(true);

    // Save user message immediately
    onSaveQuest(currentStudent.studentId, 'socrates', {
      messages: updatedMessages,
      nickname: socratesNickname.trim() || currentStudent.studentName
    });

    try {
      const res = await fetch('/api/ai/socratic-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages })
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.error === "API_KEY_MISSING") {
          simulateSocratesResponse(userMsgText, updatedMessages);
        } else {
          throw new Error(data.message || "對話失敗");
        }
      } else {
        const finalMessages = [...updatedMessages, { role: 'model' as const, text: data.text }];
        setSocratesMessages(finalMessages);
        onSaveQuest(currentStudent.studentId, 'socrates', {
          messages: finalMessages,
          nickname: socratesNickname.trim() || currentStudent.studentName
        });
      }
    } catch (err) {
      console.error(err);
      simulateSocratesResponse(userMsgText, updatedMessages);
    } finally {
      setSocratesLoading(false);
    }
  };

  const simulateSocratesResponse = (userInput: string, currentHistory: any[]) => {
    setTimeout(() => {
      let responseText = "";
      if (userInput.includes("錢") || userInput.includes("富") || userInput.includes("物質") || userInput.includes("是")) {
        responseText = `「原來如此。你認為充裕的物質能帶來保障。但我想請教你：一個擁有全天下財富，卻終日焦慮自己被偷、防範身邊所有朋友的人，他的靈魂是自由快樂的嗎？財富究竟是通往幸福的『工具』，還是幸福本身呢？」`;
      } else if (userInput.includes("不") || userInput.includes("不是") || userInput.includes("精神")) {
        responseText = `「你說得真好，你注意到精神層面的重要性。那我們來深挖一下：如果一個藝術家雖然精神富足，卻貧病交迫、無法維持生活甚至連畫筆都買不起，你認為他的生命也是圓滿幸福的嗎？我們該如何平衡『靈魂的健康』與『物質的基礎』呢？」`;
      } else {
        responseText = `「你的切入點非常有趣！那我們來探討這個理所當然：如果我們做事都只追求利己或感官上的快樂，那這與草木或者動物的本能又有什麼區別呢？人類身為理性動物，有沒有什麼更崇高、更值得我們奉獻一生的終極價值呢？你怎麼看？」`;
      }
      const finalMessages = [...currentHistory, { role: 'model' as const, text: responseText }];
      setSocratesMessages(finalMessages);
      onSaveQuest(currentStudent.studentId, 'socrates', {
        messages: finalMessages,
        nickname: socratesNickname.trim() || currentStudent.studentName
      });
    }, 1200);
  };

  const resetSocrates = () => {
    const defaultMessages = [{ role: 'model' as const, text: defaultSocratesGreeting }];
    setSocratesMessages(defaultMessages);
    onSaveQuest(currentStudent.studentId, 'socrates', {
      messages: defaultMessages,
      nickname: socratesNickname.trim() || currentStudent.studentName
    });
  };

  // ========================================================
  // 3. STATE & LOGIC FOR TROLLEY DILEMMA LAB
  // ========================================================
  const [trolleyScenario, setTrolleyScenario] = useState<{
    id: string;
    name: string;
    track1: string;
    track2: string;
    leverAction: string;
  }>({
    id: 'v1',
    name: '經典配置',
    track1: "5 位在軌道上工作的鐵路工（不知道火車失控）",
    track2: "1 位在廢棄副軌上玩耍的小男孩（擅入禁地，但無辜）",
    leverAction: "扳動拉桿將火車引向副軌：犧牲 1 位無辜男孩，挽救 5 位鐵路工人。"
  });

  const [trolleySelection, setTrolleySelection] = useState<'track1' | 'track2' | null>(null);
  const [ethicalReasoning, setEthicalReasoning] = useState<string>('');
  const [trolleyNickname, setTrolleyNickname] = useState<string>('');

  const trolleyVariables = [
    {
      id: 'v1',
      name: '經典配置',
      track1: "5 位在軌道上工作的普通鐵路工",
      track2: "1 位在副軌上玩耍的幼童",
      leverAction: "扳動拉桿：火車轉向副軌犧牲 1 位幼童，拯救 5 人。"
    },
    {
      id: 'v2',
      name: '親疏關係配置',
      track1: "5 位陌生的遊客",
      track2: "1 位你最摯愛、無條件支持你的好朋友",
      leverAction: "扳動拉桿：犧牲 1 位摯友，挽救 5 位陌生遊客的生命。"
    },
    {
      id: 'v3',
      name: '生命長度配置',
      track1: "5 位高齡 85 歲、躺在病床上的末期癌症長者",
      track2: "1 位年僅 8 歲、極具科學天賦的小學女生",
      leverAction: "扳動拉桿：犧牲 8 歲神童，拯救 5 位高齡末期癌症長者。"
    }
  ];

  const handleTrolleyChoice = (choice: 'track1' | 'track2') => {
    if (!ethicalReasoning.trim()) {
      alert("請先在下方寫下你做此決定的道德思辨理由，再送出抉擇！");
      return;
    }
    setTrolleySelection(choice);
    const chosenText = choice === 'track2' 
      ? "扳動拉桿 (犧牲少數救多數 - 效益主義)" 
      : "不採取行動 (遵守道德義務 - 義務論)";

    onSaveQuest(currentStudent.studentId, 'trolley', {
      selectedConfigId: trolleyScenario.id,
      reason: ethicalReasoning.trim(),
      decision: chosenText,
      nickname: trolleyNickname.trim() || currentStudent.studentName
    });
  };

  const resetTrolley = () => {
    setTrolleySelection(null);
    setEthicalReasoning('');
    onSaveQuest(currentStudent.studentId, 'trolley', undefined);
  };

  // ========================================================
  // 4. STATE & LOGIC FOR LOGICAL FALLACY QUIZ
  // ========================================================
  const [fallacyIndex, setFallacyIndex] = useState<number>(0);
  const [fallacySelected, setFallacySelected] = useState<number | null>(null);
  const [myFallacyScore, setMyFallacyScore] = useState<number>(0);
  const [showFallacyResult, setShowFallacyResult] = useState<boolean>(false);
  const [fallacyNickname, setFallacyNickname] = useState<string>('');
  const [fallacyAnswers, setFallacyAnswers] = useState<Record<number, number>>({});

  const fallacyQuestions = [
    {
      statement: "「林老師，你上課一直在宣導環保與節能省電，但下課我明明看到你開著大排氣量的燃油車回家。所以你說的環保理念根本是一派胡言，我們不應該聽信！」",
      options: [
        { text: "訴諸人身謬誤 (Ad Hominem) — 攻擊發言者的行為，而非論證本身。", correct: true },
        { text: "稻草人謬誤 (Straw Man) — 歪曲對方的觀點來進行攻擊。", correct: false },
        { text: "滑坡謬誤 (Slippery Slope) — 誇大連鎖反應，導向極端結論。", correct: false }
      ],
      explanation: "林老師開燃油車雖然與環保倡議相左（知行不合一），但「不環保的車主」所提出的「環保理念」在邏輯和科學上仍然可能是完全正確的。攻擊老師的個人習慣來否定觀點本身，屬於典型訴諸人身謬誤。"
    },
    {
      statement: "「如果我們允許高中生在學校自主管理手機，那他們就會在上課偷滑，接著成績就會一落千丈，最後考不上大學，整個人生直接完蛋、變成社會的負擔！」",
      options: [
        { text: "假兩難謬誤 (False Dilemma)", correct: false },
        { text: "滑坡謬誤 (Slippery Slope) — 將一個起點無根據地推論到極端糟糕的惡果。", correct: true },
        { text: "訴諸無知謬誤 (Appeal to Ignorance)", correct: false }
      ],
      explanation: "從「自主管理手機」到「上課偷滑」、「考不上大學」、「人生完蛋」，其中每一步都缺乏必然的邏輯因果關係。這種將因果鏈條極端誇大、以此恐嚇反對者的說法就是滑坡謬誤。"
    },
    {
      statement: "「你不支持政府這一次提出的教育撥款政策，那就代表你不關心我們下一代孩子的死活，你這個冷血殘酷的人！」",
      options: [
        { text: "假兩難 / 非黑即白謬誤 (False Dilemma) — 忽略了其他立場，強迫在兩個極端中選一。", correct: true },
        { text: "訴諸權威謬誤 (Appeal to Authority)", correct: false },
        { text: "訴諸人身謬誤 (Ad Hominem)", correct: false }
      ],
      explanation: "不支持某個「具體撥款政策」可能有很多正當理由（例如撥款流向不合理、有更好的配套方案等），不代表「不關心孩子死活」。強行把立場劃分為『支持政策』與『冷血無情』兩類，屬於假兩難謬誤。"
    }
  ];

  const handleFallacySubmit = (choiceIdx: number) => {
    if (fallacySelected !== null) return;
    setFallacySelected(choiceIdx);
    
    const isCorrect = fallacyQuestions[fallacyIndex].options[choiceIdx].correct;
    const nextScore = isCorrect ? myFallacyScore + 1 : myFallacyScore;
    const updatedAnswers = { ...fallacyAnswers, [fallacyIndex]: choiceIdx };
    
    setMyFallacyScore(nextScore);
    setFallacyAnswers(updatedAnswers);

    // Save temporary state
    onSaveQuest(currentStudent.studentId, 'fallacy', {
      score: nextScore,
      nickname: fallacyNickname.trim() || currentStudent.studentName,
      answers: updatedAnswers
    });
  };

  const handleNextFallacy = () => {
    setFallacySelected(null);
    if (fallacyIndex < fallacyQuestions.length - 1) {
      setFallacyIndex(fallacyIndex + 1);
    } else {
      setShowFallacyResult(true);
      onSaveQuest(currentStudent.studentId, 'fallacy', {
        score: myFallacyScore,
        nickname: fallacyNickname.trim() || currentStudent.studentName,
        answers: fallacyAnswers
      });
    }
  };

  const resetFallacy = () => {
    setFallacyIndex(0);
    setFallacySelected(null);
    setMyFallacyScore(0);
    setShowFallacyResult(false);
    setFallacyAnswers({});
    onSaveQuest(currentStudent.studentId, 'fallacy', undefined);
  };

  // ========================================================
  // 5. SYNCHRONIZE LOCAL STATES WHEN STUDENT CHANGES
  // ========================================================
  useEffect(() => {
    if (currentStudent) {
      // Autopilot
      setAutopilotStep(currentStudent.autopilot?.step ?? 0);
      setAutopilotLog(currentStudent.autopilot?.log ?? []);
      setAutopilotNickname(currentStudent.autopilot?.nickname ?? currentStudent.studentName);

      // Socrates
      setSocratesMessages(currentStudent.socrates?.messages ?? [
        { role: 'model', text: defaultSocratesGreeting }
      ]);
      setSocratesNickname(currentStudent.socrates?.nickname ?? currentStudent.studentName);

      // Trolley
      const savedConfig = trolleyVariables.find(v => v.id === currentStudent.trolley?.selectedConfigId) || trolleyVariables[0];
      setTrolleyScenario(savedConfig);
      setTrolleySelection(currentStudent.trolley?.decision ? (currentStudent.trolley.decision.includes('扳動') ? 'track2' : 'track1') : null);
      setEthicalReasoning(currentStudent.trolley?.reason ?? '');
      setTrolleyNickname(currentStudent.trolley?.nickname ?? currentStudent.studentName);

      // Fallacy
      setMyFallacyScore(currentStudent.fallacy?.score ?? 0);
      setFallacyAnswers(currentStudent.fallacy?.answers ?? {});
      setFallacyNickname(currentStudent.fallacy?.nickname ?? currentStudent.studentName);
      setFallacyIndex(0);
      setFallacySelected(null);
      setShowFallacyResult(!!currentStudent.fallacy?.submittedAt || (currentStudent.fallacy && Object.keys(currentStudent.fallacy?.answers ?? {}).length === fallacyQuestions.length) || false);
    }
  }, [currentStudent]);

  // ========================================================
  // 6. TEACHER PANELS & WORKSPACE REVIEW STATES
  // ========================================================
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [feedbackComments, setFeedbackComments] = useState<string>('');
  const [feedbackSuccess, setFeedbackSuccess] = useState<boolean>(false);

  const getSocratesCount = (sub: StudentSubmission) => sub.socrates?.messages?.filter(m => m.role === 'user').length ?? 0;
  const getAutopilotCount = (sub: StudentSubmission) => sub.autopilot?.log?.length ?? 0;

  const handleSaveFeedback = (questType: 'autopilot' | 'socrates' | 'trolley' | 'fallacy') => {
    if (!feedbackComments.trim() || !selectedStudentId) return;
    onSaveQuestFeedback(selectedStudentId, questType, feedbackComments.trim());
    setFeedbackSuccess(true);
    setTimeout(() => setFeedbackSuccess(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* 4-Quests & Teacher Header Tab selector */}
      <div className={`grid gap-3 ${role === 'teacher' ? 'grid-cols-2 md:grid-cols-5' : 'grid-cols-2 md:grid-cols-4'}`}>
        {[
          { id: 'autopilot', title: '🚦 自動導航中斷器', desc: '打破日常慣性，找回覺察力', show: true },
          { id: 'socrates', title: '📜 蘇格拉底對話機', desc: 'AI 引導的產婆術思辨', show: true },
          { id: 'trolley', title: '⚖️ 電車難題實驗室', desc: '道德極限的選擇與思辨', show: true },
          { id: 'fallacy', title: '🧠 思考謬誤抓漏賽', desc: '偵測日常日常生活邏輯盲點', show: true },
          { id: 'teacher_panel', title: '🏫 教師統計與回饋', desc: '全班作答歷程與互動點評', show: role === 'teacher' }
        ].filter(q => q.show).map((quest) => {
          const isActive = activeQuest === quest.id;
          return (
            <button
              key={quest.id}
              onClick={() => {
                setActiveQuest(quest.id as any);
                setFeedbackComments('');
              }}
              className={`p-4 rounded-2xl border text-left transition-all ${
                isActive 
                  ? 'bg-blue-600 border-blue-600 text-white shadow-md scale-102' 
                  : 'bg-white border-blue-50 hover:border-blue-100 text-gray-700 hover:shadow-2xs'
              }`}
            >
              <h3 className="text-xs font-extrabold truncate mb-0.5">{quest.title}</h3>
              <p className={`text-[10px] ${isActive ? 'text-blue-100' : 'text-gray-400'} truncate`}>
                {quest.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* QUEST 1: AUTOPILOT DISRUPTER                             */}
      {/* ======================================================== */}
      {activeQuest === 'autopilot' && (
        <div className="space-y-6">
          {/* Rules & Game Instructions */}
          <div className="bg-blue-50/40 border border-blue-100 rounded-3xl p-5 flex gap-4 text-xs leading-relaxed text-blue-900 shadow-2xs">
            <HelpCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold text-blue-950 mb-1.5 flex items-center gap-1">
                <span>🚦 「自動導航中斷器」遊戲規則與操作方法</span>
              </h4>
              <ul className="list-disc pl-4 space-y-1 text-blue-800 font-medium">
                <li><strong>閱讀情境</strong>：閱讀生活場景中，被演算法或慣性驅使的無意識自動反應行為。</li>
                <li><strong>煞車與暫停</strong>：點選紅色「🔴 預設自動導航中」大按鈕，將其切換為綠色「🟢 後設思考暫停鈕・已啟動」狀態，代表你在腦海中按下覺察煞車。</li>
                <li><strong>探索抉擇結局</strong>：
                  <ul className="list-circle pl-4 space-y-0.5 mt-0.5">
                    <li>選擇「<strong>A 順從慣性反射</strong>」：體驗無意識的反射結果，將直接生成無力感日記。</li>
                    <li>選擇「<strong>B 暫停、後設覺察</strong>」：體驗啟動覺察後的自由意志結局（此選項<strong>必須</strong>在啟動綠色暫停鈕後才可點選）。</li>
                  </ul>
                </li>
                <li><strong>反思沈澱</strong>：每一次的決定都將記錄於右側的「後設覺察日記」中，隨附林老師的專業引導反思，協助您奪回時間自主權！</li>
              </ul>
            </div>
          </div>

          {/* Student Nickname Box */}
          <div className="bg-white p-4 rounded-2xl border border-blue-100/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="text-lg">🏷️</span>
              <div>
                <h4 className="text-xs font-extrabold text-gray-800">登入人與暱稱設定</h4>
                <p className="text-[10px] text-gray-400">寫入您希望在歷史紀錄上留下的名字或暱稱</p>
              </div>
            </div>
            <input
              type="text"
              value={autopilotNickname}
              onChange={(e) => {
                setAutopilotNickname(e.target.value);
                onSaveQuest(currentStudent.studentId, 'autopilot', {
                  log: autopilotLog,
                  step: autopilotStep,
                  nickname: e.target.value
                });
              }}
              placeholder="例：陳可華 或 快樂高中生"
              className="text-xs px-3 py-1.5 bg-gray-50 hover:bg-gray-100/50 border border-gray-200 rounded-xl focus:border-blue-500 focus:bg-white outline-none font-bold"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
            {/* Main simulator screen */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-blue-100 p-6 shadow-2xs space-y-5">
              <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🚦</span>
                  <div>
                    <h3 className="text-sm font-extrabold text-gray-800">日常自動導航中斷器</h3>
                    <p className="text-[10px] text-gray-400">當前作答學生：{autopilotNickname || currentStudent.studentName}</p>
                  </div>
                </div>
                <span className="text-xs bg-red-50 text-red-600 font-extrabold px-2.5 py-1 rounded-xl">
                  專注度練習
                </span>
              </div>

              {autopilotStep >= 0 && autopilotStep < autopilotScenarios.length ? (
                <div className="space-y-5">
                  <div className="p-4 bg-gradient-to-r from-blue-50/20 via-indigo-50/5 to-white border border-blue-100/50 rounded-2xl space-y-2">
                    <span className="text-[10px] font-bold text-blue-600 bg-blue-100 px-2.5 py-0.5 rounded-full">
                      生活場景 {autopilotStep + 1}：{autopilotScenarios[autopilotStep].title}
                    </span>
                    <p className="text-xs text-gray-700 leading-relaxed font-semibold">
                      {autopilotScenarios[autopilotStep].description}
                    </p>
                  </div>

                  {/* Big interactive lever toggle */}
                  <div className="flex flex-col items-center justify-center py-4 bg-gray-50/50 rounded-2xl border border-gray-100/50 space-y-3">
                    <span className="text-xs font-bold text-gray-500">【當前心靈按鈕狀態】</span>
                    
                    <button 
                      onClick={() => setMetacognitiveOn(!metacognitiveOn)}
                      className={`w-48 py-3.5 rounded-full text-xs font-black tracking-widest shadow-md transition-all ${
                        metacognitiveOn 
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white animate-pulse' 
                          : 'bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white'
                      }`}
                    >
                      {metacognitiveOn ? "🟢 後設思考暫停鈕・已啟動" : "🔴 預設自動導航中"}
                    </button>
                    <span className="text-[10px] text-gray-400 font-bold">
                      * 點擊按鈕，打破自動導航！
                    </span>
                  </div>

                  {/* Action Choice buttons */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => handleAutopilotChoice(true)}
                      className="p-3 bg-red-50 hover:bg-red-100/80 border border-red-100 text-red-800 text-xs font-bold rounded-xl transition-all text-left space-y-1"
                    >
                      <span className="block text-[10px] uppercase font-black tracking-wider text-red-500">
                        選擇 A：順從慣性反射
                      </span>
                      <p className="line-clamp-2 leading-relaxed">
                        {autopilotScenarios[autopilotStep].autopilotAction}
                      </p>
                    </button>

                    <button
                      onClick={() => handleAutopilotChoice(false)}
                      className={`p-3 border text-xs font-bold rounded-xl transition-all text-left space-y-1 ${
                        metacognitiveOn 
                          ? 'bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100/50' 
                          : 'bg-white border-gray-200 text-gray-400 cursor-not-allowed opacity-60'
                      }`}
                      disabled={!metacognitiveOn}
                    >
                      <span className={`block text-[10px] uppercase font-black tracking-wider ${metacognitiveOn ? 'text-emerald-600' : 'text-gray-400'}`}>
                        選擇 B：暫停、後設覺察（需先啟動暫停鈕）
                      </span>
                      <p className="line-clamp-2 leading-relaxed">
                        {autopilotScenarios[autopilotStep].metaAction}
                      </p>
                    </button>
                  </div>
                </div>
              ) : (
                /* Scenario Completion card */
                <div className="text-center py-8 space-y-5">
                  <span className="text-5xl block animate-bounce-slow">🌱</span>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-gray-800">恭喜！你已完成了這趟「自動導航中斷」覺察旅程！</h4>
                    <p className="text-xs text-gray-400">生命中發生的每一秒，都是我們自己選擇的當下。你今天按下暫停鍵了嗎？</p>
                  </div>
                  <button 
                    onClick={resetAutopilot}
                    className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
                  >
                    重啟覺察旅程
                  </button>
                </div>
              )}

            </div>

            {/* Right Column: Metacognitive Log Wall (5 columns) */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-blue-100 p-5 shadow-2xs space-y-4">
              <h3 className="text-xs font-extrabold text-blue-950 uppercase tracking-wider border-b border-gray-50 pb-2 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-blue-600" />
                我的後設覺察日記紀錄：
              </h3>

              <div className="space-y-3.5 max-h-96 overflow-y-auto pr-1">
                {autopilotLog.map((log, idx) => {
                  const isMeta = log.includes("覺察暫停");
                  return (
                    <div 
                      key={idx} 
                      className={`p-3.5 rounded-2xl border text-xs leading-relaxed font-semibold shadow-2xs ${
                        isMeta 
                          ? 'bg-emerald-50/20 border-emerald-100 text-emerald-950' 
                          : 'bg-red-50/20 border-red-100 text-red-950'
                      }`}
                    >
                      {log}
                      {isMeta && (
                        <div className="mt-2.5 pt-2 border-t border-emerald-100/50 text-[10px] text-emerald-800/80 font-bold italic">
                          {autopilotScenarios[idx]?.reflection}
                        </div>
                      )}
                    </div>
                  );
                })}

                {autopilotLog.length === 0 && (
                  <div className="text-center py-12 text-gray-400 italic text-xs space-y-2">
                    <span className="text-3xl block">📋</span>
                    <p>尚未有任何抉擇記錄。請點選左側生活場景，按鈕打破常規吧！</p>
                  </div>
                )}
              </div>

              {/* Display Teacher Comment feedback if any */}
              {currentStudent.autopilot?.feedback && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 rounded-2xl p-4 space-y-1 mt-4">
                  <span className="text-[10px] bg-amber-500 text-white font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                    👩🏻‍🏫 導師點評回饋：
                  </span>
                  <p className="text-xs text-amber-950 font-semibold leading-relaxed">
                    {currentStudent.autopilot.feedback.comments}
                  </p>
                  <span className="text-[9px] text-amber-600 block text-right font-bold">
                    —— 由 {currentStudent.autopilot.feedback.gradedBy} 發表於 {currentStudent.autopilot.feedback.gradedAt}
                  </span>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* QUEST 2: SOCRATES DIALOGUE MACHINE                       */}
      {/* ======================================================== */}
      {activeQuest === 'socrates' && (
        <div className="space-y-6">
          {/* Rules & Game Instructions */}
          <div className="bg-amber-50/40 border border-amber-100 rounded-3xl p-5 flex gap-4 text-xs leading-relaxed text-amber-900 shadow-2xs">
            <HelpCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold text-amber-950 mb-1.5 flex items-center gap-1">
                <span>📜 「蘇格拉底產婆術對話機」遊戲規則與操作方法</span>
              </h4>
              <ul className="list-disc pl-4 space-y-1 text-amber-800 font-medium">
                <li><strong>對話啟動</strong>：AI 蘇格拉底將會拋出第一個關於幸福與物質追求的哲學問題。</li>
                <li><strong>發表真實看法</strong>：在對話框中誠實地寫下你個人的生命觀點（不用刻意追求標準答案）。</li>
                <li><strong>迎接產婆術詰問</strong>：AI 蘇格拉底將審視您的回答，不給您標準答案，而是透過追問找出您觀點中的深層矛盾或邏輯盲點。</li>
                <li><strong>深挖幸福本質</strong>：順著詰問與答辯不斷深挖思考，逐步撥開盲從，誕生自己靈魂中真正的價值與幸福判斷！</li>
              </ul>
            </div>
          </div>

          {/* Student Nickname Box */}
          <div className="bg-white p-4 rounded-2xl border border-amber-100/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="text-lg">🏷️</span>
              <div>
                <h4 className="text-xs font-extrabold text-gray-800">登入人與暱稱設定</h4>
                <p className="text-[10px] text-gray-400">寫入您希望在歷史紀錄上留下的名字或暱稱</p>
              </div>
            </div>
            <input
              type="text"
              value={socratesNickname}
              onChange={(e) => {
                setSocratesNickname(e.target.value);
                onSaveQuest(currentStudent.studentId, 'socrates', {
                  messages: socratesMessages,
                  nickname: e.target.value
                });
              }}
              placeholder="例：陳可華 或 哲學思想家"
              className="text-xs px-3 py-1.5 bg-gray-50 hover:bg-gray-100/50 border border-gray-200 rounded-xl focus:border-amber-500 focus:bg-white outline-none font-bold"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
            {/* Socratic Chat Box */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-blue-100 p-6 shadow-2xs flex flex-col justify-between h-[480px]">
              <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📜</span>
                  <div>
                    <h3 className="text-sm font-extrabold text-gray-800">蘇格拉底產婆術追問機</h3>
                    <p className="text-[10px] text-gray-400">當前作答學生：{socratesNickname || currentStudent.studentName}</p>
                  </div>
                </div>
                <span className="text-xs bg-amber-50 text-amber-600 font-extrabold px-2.5 py-1 rounded-xl">
                  AI 協同思辨
                </span>
              </div>

              {/* Chat History Panel */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 text-xs">
                {socratesMessages.map((msg, idx) => {
                  const isModel = msg.role === 'model';
                  return (
                    <div key={idx} className={`flex items-start gap-3 ${!isModel ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg shrink-0 ${
                        isModel ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}>
                        {isModel ? '📜' : '🎒'}
                      </div>
                      
                      <div className={`max-w-[75%] p-3.5 rounded-2xl border leading-relaxed font-semibold ${
                        isModel 
                          ? 'bg-amber-50/40 border-amber-100 text-amber-950 rounded-tl-none' 
                          : 'bg-blue-50/40 border-blue-100 text-blue-950 rounded-tr-none'
                      }`}>
                        {msg.text}
                      </div>
                    </div>
                  );
                })}

                {socratesLoading && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-lg shrink-0 animate-spin">
                      🌀
                    </div>
                    <div className="bg-amber-50/20 border border-amber-50 p-3 rounded-2xl text-[11px] text-gray-400 italic font-bold">
                      蘇格拉底正在審視你的想法，琢磨一個深刻的追問...
                    </div>
                  </div>
                )}
              </div>

              {/* Input area */}
              <div className="border-t border-gray-50 pt-3 flex items-center gap-3">
                <input 
                  type="text"
                  value={socratesInput}
                  onChange={(e) => setSocratesInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === 'Enter') handleSocratesSend(); }}
                  disabled={socratesLoading}
                  placeholder="寫下你的真實看法（如：我認為快樂就是能做自己想做的事、或者是過得平靜）..."
                  className="flex-1 text-xs p-3.5 border border-gray-100 focus:border-amber-400 outline-none rounded-2xl bg-gray-50/50 font-semibold text-gray-800"
                />
                <button 
                  onClick={handleSocratesSend}
                  disabled={socratesLoading || !socratesInput.trim()}
                  className="py-3 px-5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-2xl shadow-xs transition-all shrink-0"
                >
                  思辨對話
                </button>
              </div>
            </div>

            {/* Socratic Wisdom panel */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-blue-100 p-5 shadow-2xs space-y-4 flex flex-col justify-between">
              <div className="space-y-4">
                <h3 className="text-xs font-extrabold text-amber-900 uppercase tracking-wider border-b border-amber-50 pb-2 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  什麼是「產婆術」對話？
                </h3>
                
                <div className="space-y-3.5 text-xs text-gray-600 leading-relaxed font-semibold">
                  <p>
                    蘇格拉底認為，老師無法直接將真理「灌輸」給學生，就像產婆無法替孕婦生孩子一樣。
                  </p>
                  <p>
                    對話的目的，是透過一步步的**提問**與**詰問**，引導你發現自己既有認知中的漏洞與矛盾，進而自己生出靈魂深處的真理與價值。
                  </p>
                  <div className="p-3 bg-amber-50/50 border border-amber-100 rounded-xl text-amber-800 text-[11px] font-bold">
                    💡 **對話小秘訣**：
                    不用試圖講漂亮的大道理。越是誠實、從你當前生活實感出發的回答，越能引導出極具生命教育震撼力的哲學思辨喔！
                  </div>
                </div>

                {/* Display Teacher Comment feedback if any */}
                {currentStudent.socrates?.feedback && (
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 rounded-2xl p-4 space-y-1">
                    <span className="text-[10px] bg-amber-500 text-white font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                      👩🏻‍🏫 導師點評回饋：
                    </span>
                    <p className="text-xs text-amber-950 font-bold leading-relaxed">
                      {currentStudent.socrates.feedback.comments}
                    </p>
                    <span className="text-[9px] text-amber-600 block text-right font-bold">
                      —— 由 {currentStudent.socrates.feedback.gradedBy} 發表於 {currentStudent.socrates.feedback.gradedAt}
                    </span>
                  </div>
                )}
              </div>

              <button 
                onClick={resetSocrates}
                className="w-full py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-700 border border-gray-100 font-bold text-xs rounded-xl transition-all"
              >
                重置對話機制
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* QUEST 3: TROLLEY DILEMMA LAB                             */}
      {/* ======================================================== */}
      {activeQuest === 'trolley' && (
        <div className="space-y-6">
          {/* Rules & Game Instructions */}
          <div className="bg-purple-50/40 border border-purple-100 rounded-3xl p-5 flex gap-4 text-xs leading-relaxed text-purple-900 shadow-2xs">
            <HelpCircle className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold text-purple-950 mb-1.5 flex items-center gap-1">
                <span>⚖️ 「道德兩難變體實驗室」遊戲規則與操作方法</span>
              </h4>
              <ul className="list-disc pl-4 space-y-1 text-purple-800 font-medium">
                <li><strong>選擇實驗配置</strong>：點選實驗室頂部「經典配置」、「親疏關係配置」或「生命長度配置」，切換不同的道德衝突情境。</li>
                <li><strong>評估軌道危機</strong>：審視黑色的「失控列車軌道模擬面板」，理解預設軌道 A 與副軌軌道 B 上所面臨的生命與抉擇拉扯。</li>
                <li><strong>撰寫倫理理由</strong>：在下方的文字方塊中，詳細寫下您支持自己決定的哲學道理與內心掙扎理由（例如最大群體利益、個體生存尊嚴無價、不殺生義務等）。</li>
                <li><strong>送出兩難抉擇</strong>：點選「保持預設 (遵守義務)」或「扳動拉桿 (追求福祉)」送出抉擇。系統會存檔您的思辨，並解鎖展示您的論述存檔！</li>
              </ul>
            </div>
          </div>

          {/* Student Nickname Box */}
          <div className="bg-white p-4 rounded-2xl border border-purple-100/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="text-lg">🏷️</span>
              <div>
                <h4 className="text-xs font-extrabold text-gray-800">登入人與暱稱設定</h4>
                <p className="text-[10px] text-gray-400">寫入您希望在歷史紀錄上留下的名字或暱稱</p>
              </div>
            </div>
            <input
              type="text"
              value={trolleyNickname}
              onChange={(e) => {
                setTrolleyNickname(e.target.value);
                if (trolleySelection) {
                  onSaveQuest(currentStudent.studentId, 'trolley', {
                    selectedConfigId: trolleyScenario.id,
                    reason: ethicalReasoning,
                    decision: trolleySelection === 'track2' ? '扳動拉桿 (效益主義)' : '保持預設 (義務論)',
                    nickname: e.target.value
                  });
                }
              }}
              placeholder="例：陳可華 或 電車司機"
              className="text-xs px-3 py-1.5 bg-gray-50 hover:bg-gray-100/50 border border-gray-200 rounded-xl focus:border-purple-500 focus:bg-white outline-none font-bold"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
            {/* Main simulator screen */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-blue-100 p-6 shadow-2xs space-y-5">
              <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">⚖️</span>
                  <div>
                    <h3 className="text-sm font-extrabold text-gray-800">道德兩難變體實驗室</h3>
                    <p className="text-[10px] text-gray-400">當前作答學生：{trolleyNickname || currentStudent.studentName}</p>
                  </div>
                </div>
                <span className="text-xs bg-purple-50 text-purple-600 font-extrabold px-2.5 py-1 rounded-xl">
                  價值判斷
                </span>
              </div>

              {/* Config selector of lab */}
              <div className="flex gap-2">
                {trolleyVariables.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => {
                      setTrolleyScenario(v);
                      setTrolleySelection(null);
                    }}
                    className={`px-3 py-1.5 border rounded-xl text-xs font-bold transition-all ${
                      trolleyScenario.id === v.id
                        ? 'bg-purple-600 border-purple-600 text-white shadow-xs'
                        : 'bg-gray-50 hover:bg-gray-100 border-gray-100 text-gray-600'
                    }`}
                  >
                    ⚙️ {v.name}
                  </button>
                ))}
              </div>

              {/* Graphics illustration */}
              <div className="p-4 bg-gray-950 rounded-2xl relative overflow-hidden min-h-[160px] flex flex-col justify-between text-white font-mono text-[10px]">
                <span className="absolute top-2 right-2 text-xs bg-red-600 text-white font-bold px-2 py-0.5 rounded-md animate-pulse">
                  🚆 失控列車正在高速前進
                </span>
                
                <div className="space-y-4">
                  <div className="p-2.5 bg-red-900/30 border border-red-800 rounded-xl">
                    <span className="text-red-400 font-bold">🛤️ 軌道 A (預設軌道)：</span>
                    <p className="text-gray-300 font-medium">{trolleyScenario.track1}</p>
                  </div>

                  <div className="p-2.5 bg-blue-900/30 border border-blue-800 rounded-xl">
                    <span className="text-blue-400 font-bold">🛤️ 軌道 B (副軌位置)：</span>
                    <p className="text-gray-300 font-medium">{trolleyScenario.track2}</p>
                  </div>
                </div>

                <div className="text-center text-yellow-400 font-bold border-t border-gray-800 pt-2 mt-2">
                  📢 拉桿抉擇：{trolleyScenario.leverAction}
                </div>
              </div>

              {/* Socratic logic writeup */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-gray-500 block">
                  ✍️ 寫下你的思辨理由（請支持你的道德決定，如「生命無價不能拿數量權衡」，或「為了最大福祉」）：
                </label>
                <textarea 
                  rows={3}
                  value={ethicalReasoning}
                  onChange={(e) => setEthicalReasoning(e.target.value)}
                  placeholder="在此填寫你的思辨歷程，思考這是在乎『效益』還是『正義』..."
                  className="w-full text-xs p-3 border border-gray-100 focus:border-blue-400 outline-none bg-gray-50/50 rounded-xl font-bold text-gray-800"
                />
              </div>

              {/* Decision action buttons */}
              <div className="grid grid-cols-2 gap-3.5">
                <button
                  onClick={() => handleTrolleyChoice('track1')}
                  className={`py-3 rounded-xl font-bold text-xs text-white transition-all ${
                    trolleySelection === 'track1' 
                      ? 'bg-purple-700 ring-2 ring-purple-400' 
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  🚨 保持預設，不扳拉桿 (遵守道德義務)
                </button>

                <button
                  onClick={() => handleTrolleyChoice('track2')}
                  className={`py-3 rounded-xl font-bold text-xs text-white transition-all ${
                    trolleySelection === 'track2' 
                      ? 'bg-purple-700 ring-2 ring-purple-400' 
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  ⚡ 扳動拉桿，列車偏向 (追求最大福祉)
                </button>
              </div>

            </div>

            {/* Right Column: Historical stats & My decision log */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-blue-100 p-5 shadow-2xs space-y-4">
              <h3 className="text-xs font-extrabold text-blue-950 uppercase tracking-wider border-b border-gray-50 pb-2 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-purple-600" />
                我的電車難題思辨存檔：
              </h3>

              {trolleySelection ? (
                <div className="space-y-4">
                  <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 space-y-2">
                    <span className="text-[10px] bg-purple-600 text-white font-extrabold px-2 py-0.5 rounded-md">
                      本輪決擇：{trolleySelection === 'track2' ? '扳動拉桿' : '不採取行動'}
                    </span>
                    <p className="text-xs text-purple-900 font-bold leading-relaxed">
                      💬 我的道德理由：{ethicalReasoning || currentStudent.trolley?.reason}
                    </p>
                  </div>

                  <div className="bg-gray-50/80 rounded-2xl p-4 border border-gray-100 space-y-2 text-xs">
                    <h4 className="font-extrabold text-gray-700">📊 課堂公投大數據參考：</h4>
                    <div className="space-y-2 pt-1 font-bold">
                      <div>
                        <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                          <span>A. 遵守道德義務不殺生 (義務論)</span>
                          <span>24%</span>
                        </div>
                        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                          <div className="bg-red-500 h-full rounded-full" style={{ width: '24%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-[10px] text-gray-500 mb-1">
                          <span>B. 追求最多生命挽救 (效益論)</span>
                          <span>76%</span>
                        </div>
                        <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                          <div className="bg-blue-500 h-full rounded-full" style={{ width: '76%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-400 italic text-xs space-y-2">
                  <span className="text-3xl block">⚖️</span>
                  <p>尚未送出任何道德決策。請在左側填寫倫理原因，並點選紅色或藍色按鈕來送出，查看您的思辨統計！</p>
                </div>
              )}

              {/* Display Teacher Comment feedback if any */}
              {currentStudent.trolley?.feedback && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 rounded-2xl p-4 space-y-1 mt-4">
                  <span className="text-[10px] bg-amber-500 text-white font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                    👩🏻‍🏫 導師點評回饋：
                  </span>
                  <p className="text-xs text-amber-950 font-bold leading-relaxed">
                    {currentStudent.trolley.feedback.comments}
                  </p>
                  <span className="text-[9px] text-amber-600 block text-right font-bold">
                    —— 由 {currentStudent.trolley.feedback.gradedBy} 發表於 {currentStudent.trolley.feedback.gradedAt}
                  </span>
                </div>
              )}

              {trolleySelection && (
                <button 
                  onClick={resetTrolley}
                  className="w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-700 border border-gray-100 font-bold text-xs rounded-xl transition-all"
                >
                  重設道德抉擇
                </button>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* QUEST 4: LOGICAL FALLACY QUIZ                            */}
      {/* ======================================================== */}
      {activeQuest === 'fallacy' && (
        <div className="space-y-6">
          {/* Rules & Game Instructions */}
          <div className="bg-emerald-50/40 border border-emerald-100 rounded-3xl p-5 flex gap-4 text-xs leading-relaxed text-emerald-900 shadow-2xs">
            <HelpCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold text-emerald-950 mb-1.5 flex items-center gap-1">
                <span>🧠 「思考謬誤抓漏賽」遊戲規則與操作方法</span>
              </h4>
              <ul className="list-disc pl-4 space-y-1 text-emerald-800 font-medium">
                <li><strong>閱讀日常論述</strong>：仔細閱讀情境中看似合理、實則隱藏思維缺陷的對白發言。</li>
                <li><strong>辨識邏輯盲點</strong>：在 3 個常見謬誤選項（訴諸人身、滑坡謬誤、非黑即白）中，點選你認為最切合該行為缺陷的分析。</li>
                <li><strong>閱讀導師解析</strong>：不論答對或答錯，都將立即解鎖林老師撰寫的深度邏輯剖析，深化你的哲學思辨！</li>
                <li><strong>完成挑戰</strong>：完成所有題目，記錄你的高分並提交給老師批閱！</li>
              </ul>
            </div>
          </div>

          {/* Student Nickname Box */}
          <div className="bg-white p-4 rounded-2xl border border-emerald-100/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2">
              <span className="text-lg">🏷️</span>
              <div>
                <h4 className="text-xs font-extrabold text-gray-800">登入人與暱稱設定</h4>
                <p className="text-[10px] text-gray-400">寫入您希望在歷史紀錄上留下的名字或暱稱</p>
              </div>
            </div>
            <input
              type="text"
              value={fallacyNickname}
              onChange={(e) => {
                setFallacyNickname(e.target.value);
                onSaveQuest(currentStudent.studentId, 'fallacy', {
                  score: myFallacyScore,
                  nickname: e.target.value,
                  answers: fallacyAnswers
                });
              }}
              placeholder="例：陳可華 或 思維神探"
              className="text-xs px-3 py-1.5 bg-gray-50 hover:bg-gray-100/50 border border-gray-200 rounded-xl focus:border-emerald-500 focus:bg-white outline-none font-bold"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
            {/* Main simulator screen */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-blue-100 p-6 shadow-2xs space-y-5">
              <div className="flex justify-between items-center border-b border-gray-50 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🧠</span>
                  <div>
                    <h3 className="text-sm font-extrabold text-gray-800">思考謬誤抓漏大賽</h3>
                    <p className="text-[10px] text-gray-400">當前作答學生：{fallacyNickname || currentStudent.studentName}</p>
                  </div>
                </div>
                <span className="text-xs bg-emerald-50 text-emerald-600 font-extrabold px-2.5 py-1 rounded-xl">
                  邏輯思辨
                </span>
              </div>

              {!showFallacyResult && fallacyIndex < fallacyQuestions.length ? (
                <div className="space-y-5">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-xs leading-relaxed font-bold text-gray-800">
                    <span className="text-[10px] bg-emerald-600 text-white font-extrabold px-2 py-0.5 rounded-full block w-fit mb-2">
                      題目 {fallacyIndex + 1} / {fallacyQuestions.length}
                    </span>
                    {fallacyQuestions[fallacyIndex].statement}
                  </div>

                  {/* Options pool */}
                  <div className="space-y-2 pt-1">
                    {fallacyQuestions[fallacyIndex].options.map((opt, oIdx) => {
                      const isSelected = fallacySelected === oIdx;
                      const isCorrect = opt.correct;
                      let btnStyle = "bg-white hover:bg-gray-50 border-gray-100 text-gray-700";
                      
                      if (fallacySelected !== null) {
                        if (isCorrect) {
                          btnStyle = "bg-emerald-50 border-emerald-300 text-emerald-800 font-bold";
                        } else if (isSelected) {
                          btnStyle = "bg-red-50 border-red-300 text-red-800 font-bold";
                        } else {
                          btnStyle = "bg-white border-gray-100 text-gray-300 cursor-not-allowed";
                        }
                      }

                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleFallacySubmit(oIdx)}
                          disabled={fallacySelected !== null}
                          className={`w-full p-3.5 border rounded-xl text-xs text-left transition-all flex items-center justify-between ${btnStyle}`}
                        >
                          <span className="font-semibold">{opt.text}</span>
                          {fallacySelected !== null && isCorrect && <span className="text-emerald-600 font-black">✓ 答對了</span>}
                          {fallacySelected !== null && isSelected && !isCorrect && <span className="text-red-600 font-black">× 答錯了</span>}
                        </button>
                      );
                    })}
                  </div>

                  {/* Teacher's deep explanation display after choice */}
                  {fallacySelected !== null && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-emerald-50/40 border border-emerald-100 rounded-2xl text-xs space-y-1 leading-relaxed"
                    >
                      <h4 className="font-extrabold text-emerald-950 flex items-center gap-1">
                        <span>👩🏻‍🏫 哲學導師邏輯剖析：</span>
                      </h4>
                      <p className="text-emerald-900 font-semibold">
                        {fallacyQuestions[fallacyIndex].explanation}
                      </p>
                      <button
                        onClick={handleNextFallacy}
                        className="mt-3 py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs flex items-center gap-1 ml-auto"
                      >
                        下一題 <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>
                  )}
                </div>
              ) : (
                /* Completion card */
                <div className="text-center py-8 space-y-5">
                  <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto shadow-sm">
                    🏆
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-gray-800">完成了謬誤探查！</h4>
                    <p className="text-xs text-gray-400">你本輪答對的題數為：</p>
                    <span className="text-2xl font-black text-emerald-600 font-sans block py-2">
                      {myFallacyScore} / {fallacyQuestions.length} 題
                    </span>
                    <p className="text-[10px] text-gray-400">生命中充斥著各種以愛、大局、權威包裝的假因果，保持邏輯思考就是最棒的生命修養！</p>
                  </div>
                  <button 
                    onClick={resetFallacy}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all"
                  >
                    再應戰一次
                  </button>
                </div>
              )}
            </div>

            {/* Right Column: High scores & saved logs */}
            <div className="lg:col-span-4 bg-white rounded-3xl border border-blue-100 p-5 shadow-2xs space-y-4">
              <h3 className="text-xs font-extrabold text-blue-950 uppercase tracking-wider border-b border-gray-50 pb-2 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                思考謬誤挑戰結果：
              </h3>

              <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 text-center space-y-1">
                <span className="text-[10px] text-emerald-700 font-bold block uppercase tracking-wider">我的邏輯戰績</span>
                <span className="text-xl font-black text-emerald-800 font-mono block">
                  {currentStudent.fallacy?.score ?? myFallacyScore} / 3 題正解
                </span>
                <span className="text-[9px] text-emerald-600 font-bold block">
                  作答狀態：已同步儲存於雲端
                </span>
              </div>

              {/* Display Teacher Comment feedback if any */}
              {currentStudent.fallacy?.feedback && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/60 rounded-2xl p-4 space-y-1 mt-4">
                  <span className="text-[10px] bg-amber-500 text-white font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                    👩🏻‍🏫 導師點評回饋：
                  </span>
                  <p className="text-xs text-amber-950 font-bold leading-relaxed">
                    {currentStudent.fallacy.feedback.comments}
                  </p>
                  <span className="text-[9px] text-amber-600 block text-right font-bold">
                    —— 由 {currentStudent.fallacy.feedback.gradedBy} 發表於 {currentStudent.fallacy.feedback.gradedAt}
                  </span>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. TEACHER STATISTICS & FEEDBACK OVERVIEW                */}
      {/* ======================================================== */}
      {activeQuest === 'teacher_panel' && role === 'teacher' && (
        <div className="space-y-6">
          <div className="bg-indigo-50/60 border border-indigo-100 rounded-3xl p-5 flex gap-4 text-xs leading-relaxed text-indigo-900 shadow-2xs">
            <GraduationCap className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-extrabold text-indigo-950 mb-1 flex items-center gap-1">
                <span>🏫 教師專用：全班「思辨與遊戲」互動統計與點評回覆</span>
              </h4>
              <p className="font-bold text-indigo-800">
                此儀表板會即時同步所有同學在捷運自動導航、蘇格拉底對話、道德電車實驗以及邏輯謬誤比賽中的紀錄。您可以點選學生帳號查看他們的即時作答細節，並在此輸入溫暖回饋引指、評語。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Students submissions list table (5 columns) */}
            <div className="lg:col-span-5 bg-white rounded-3xl border border-blue-100 p-5 shadow-2xs space-y-4">
              <h3 className="text-xs font-extrabold text-gray-800 uppercase tracking-wider border-b border-gray-50 pb-2 flex items-center gap-1.5">
                <BarChart2 className="w-4 h-4 text-blue-600" />
                全班學生互動狀態表
              </h3>

              <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                {submissions.map((sub) => {
                  const socratesCount = getSocratesCount(sub);
                  const autopilotCount = getAutopilotCount(sub);
                  const isSelected = selectedStudentId === sub.studentId;

                  return (
                    <button
                      key={sub.studentId}
                      onClick={() => {
                        setSelectedStudentId(sub.studentId);
                        setFeedbackComments('');
                      }}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all ${
                        isSelected 
                          ? 'bg-blue-50 border-blue-300 ring-1 ring-blue-200' 
                          : 'bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50/40'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-black text-gray-800">{sub.studentName}</span>
                        <span className="text-[9px] font-bold text-gray-400">ID: {sub.studentId}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[10px] font-bold text-gray-500 pt-1.5 border-t border-gray-50">
                        <span className="truncate">🚦 導航日記：{autopilotCount > 0 ? `🟢 ${autopilotCount} 則` : '⚪ 無紀錄'}</span>
                        <span className="truncate">📜 蘇格拉底：{socratesCount > 0 ? `🟢 ${socratesCount} 次發言` : '⚪ 無對話'}</span>
                        <span className="truncate">⚖️ 電車決策：{sub.trolley?.decision ? '🟢 已作答' : '⚪ 未作答'}</span>
                        <span className="truncate">🧠 謬誤抓漏：{sub.fallacy?.score !== undefined ? `🟢 ${sub.fallacy.score} 分` : '⚪ 未完賽'}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Detailed interactive student reviews & grading comments (7 columns) */}
            <div className="lg:col-span-7 bg-white rounded-3xl border border-blue-100 p-6 shadow-2xs space-y-6 min-h-[500px]">
              {selectedStudentId ? (
                (() => {
                  const studentSub = submissions.find(s => s.studentId === selectedStudentId);
                  if (!studentSub) return null;

                  return (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-gray-50 pb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">📝</span>
                          <div>
                            <h3 className="text-sm font-extrabold text-gray-800">審閱與回饋：{studentSub.studentName} 的思辨空間</h3>
                            <p className="text-[10px] text-gray-400">您可以審查該學生在以下 4 個遊戲中的歷程紀錄與回答理由</p>
                          </div>
                        </div>
                      </div>

                      {/* Display 4 Interactive Games Detail for this student */}
                      <div className="space-y-5 max-h-[460px] overflow-y-auto pr-1">
                        
                        {/* A. Autopilot */}
                        <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100/70 space-y-3">
                          <h4 className="text-xs font-black text-blue-950 flex items-center justify-between">
                            <span>🚦 1. 自動導航中斷日記</span>
                            <span className="text-[9px] font-extrabold bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                              暱稱: {studentSub.autopilot?.nickname || '無'}
                            </span>
                          </h4>
                          {studentSub.autopilot?.log && studentSub.autopilot.log.length > 0 ? (
                            <div className="space-y-1.5">
                              {studentSub.autopilot.log.map((log, lIdx) => (
                                <div key={lIdx} className="text-[10px] font-semibold text-gray-600 bg-white p-2 rounded-xl border border-gray-100">
                                  {log}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-[10px] text-gray-400 italic">該學生尚未有導航日記紀錄</p>
                          )}

                          {/* Feedback container */}
                          <div className="space-y-2 pt-2 border-t border-gray-100">
                            <label className="text-[10px] font-black text-gray-400 block">針對該學生「自動導航日記」給予評語：</label>
                            <div className="flex gap-2">
                              <input 
                                type="text"
                                placeholder={studentSub.autopilot?.feedback?.comments || "輸入評語引指，例如：能突破手機的自動導航是很好的第一步，加油！"}
                                onChange={(e) => setFeedbackComments(e.target.value)}
                                className="text-xs p-2.5 bg-white border border-gray-200 rounded-xl flex-1 focus:border-blue-500 outline-none font-bold text-gray-700"
                              />
                              <button
                                onClick={() => handleSaveFeedback('autopilot')}
                                className="px-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl"
                              >
                                送出評語
                              </button>
                            </div>
                            {feedbackSuccess && <span className="text-[9px] text-emerald-600 font-bold block">✓ 評語已成功存檔並回傳給學生！</span>}
                          </div>
                        </div>

                        {/* B. Socrates dialogue */}
                        <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100/70 space-y-3">
                          <h4 className="text-xs font-black text-amber-950 flex items-center justify-between">
                            <span>📜 2. 蘇格拉底產婆術對話</span>
                            <span className="text-[9px] font-extrabold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                              暱稱: {studentSub.socrates?.nickname || '無'}
                            </span>
                          </h4>
                          {studentSub.socrates?.messages && studentSub.socrates.messages.length > 1 ? (
                            <div className="space-y-2 max-h-36 overflow-y-auto bg-white p-3 rounded-xl border border-gray-100 text-[10px]">
                              {studentSub.socrates.messages.map((m, mIdx) => (
                                <div key={mIdx} className={`p-2 rounded-lg leading-relaxed ${m.role === 'model' ? 'bg-amber-50 text-amber-950' : 'bg-blue-50 text-blue-950 text-right'}`}>
                                  <strong>{m.role === 'model' ? '蘇格拉底' : '學生'}:</strong> {m.text}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-[10px] text-gray-400 italic">該學生尚未與蘇格拉底進行深度對話</p>
                          )}

                          {/* Feedback container */}
                          <div className="space-y-2 pt-2 border-t border-gray-100">
                            <label className="text-[10px] font-black text-gray-400 block">針對該學生「蘇格拉底對話」給予評語：</label>
                            <div className="flex gap-2">
                              <input 
                                type="text"
                                placeholder={studentSub.socrates?.feedback?.comments || "輸入評語引指，例如：你的思維很深刻，勇於面對物質與心靈的辯證！"}
                                onChange={(e) => setFeedbackComments(e.target.value)}
                                className="text-xs p-2.5 bg-white border border-gray-200 rounded-xl flex-1 focus:border-amber-500 outline-none font-bold text-gray-700"
                              />
                              <button
                                onClick={() => handleSaveFeedback('socrates')}
                                className="px-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl"
                              >
                                送出評語
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* C. Trolley */}
                        <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100/70 space-y-3">
                          <h4 className="text-xs font-black text-purple-950 flex items-center justify-between">
                            <span>⚖️ 3. 電車道德兩難抉擇</span>
                            <span className="text-[9px] font-extrabold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                              暱稱: {studentSub.trolley?.nickname || '無'}
                            </span>
                          </h4>
                          {studentSub.trolley?.decision ? (
                            <div className="space-y-1.5">
                              <div className="text-[10px] font-extrabold text-purple-900 bg-purple-50 p-2.5 rounded-xl border border-purple-100">
                                抉擇：{studentSub.trolley.decision}
                              </div>
                              <div className="text-[10px] font-semibold text-gray-700 bg-white p-2.5 rounded-xl border border-gray-100 leading-relaxed">
                                💬 哲學倫理理由：{studentSub.trolley.reason}
                              </div>
                            </div>
                          ) : (
                            <p className="text-[10px] text-gray-400 italic">該學生尚未送出電車難題抉擇</p>
                          )}

                          {/* Feedback container */}
                          <div className="space-y-2 pt-2 border-t border-gray-100">
                            <label className="text-[10px] font-black text-gray-400 block">針對該學生「電車兩難抉擇」給予評語：</label>
                            <div className="flex gap-2">
                              <input 
                                type="text"
                                placeholder={studentSub.trolley?.feedback?.comments || "輸入評語引指，例如：非常有力量的倫理申論，考慮到了義務論的底線。"}
                                onChange={(e) => setFeedbackComments(e.target.value)}
                                className="text-xs p-2.5 bg-white border border-gray-200 rounded-xl flex-1 focus:border-purple-500 outline-none font-bold text-gray-700"
                              />
                              <button
                                onClick={() => handleSaveFeedback('trolley')}
                                className="px-3.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl"
                              >
                                送出評語
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* D. Fallacy */}
                        <div className="p-4 bg-gray-50/50 rounded-2xl border border-gray-100/70 space-y-3">
                          <h4 className="text-xs font-black text-emerald-950 flex items-center justify-between">
                            <span>🧠 4. 邏輯謬誤抓漏戰績</span>
                            <span className="text-[9px] font-extrabold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                              暱稱: {studentSub.fallacy?.nickname || '無'}
                            </span>
                          </h4>
                          {studentSub.fallacy ? (
                            <div className="text-[10px] font-bold text-emerald-800 bg-emerald-50 p-2.5 rounded-xl border border-emerald-100">
                              答對題數：{studentSub.fallacy.score} / 3 題 ({(studentSub.fallacy.score / 3 * 100).toFixed(0)}%)
                            </div>
                          ) : (
                            <p className="text-[10px] text-gray-400 italic">該學生尚未完成思考謬誤抓漏大賽</p>
                          )}

                          {/* Feedback container */}
                          <div className="space-y-2 pt-2 border-t border-gray-100">
                            <label className="text-[10px] font-black text-gray-400 block">針對該學生「謬誤挑戰戰績」給予評語：</label>
                            <div className="flex gap-2">
                              <input 
                                type="text"
                                placeholder={studentSub.fallacy?.feedback?.comments || "輸入評語引指，例如：邏輯清晰，能準確揪出生活中的滑坡謬誤，好棒！"}
                                onChange={(e) => setFeedbackComments(e.target.value)}
                                className="text-xs p-2.5 bg-white border border-gray-200 rounded-xl flex-1 focus:border-emerald-500 outline-none font-bold text-gray-700"
                              />
                              <button
                                onClick={() => handleSaveFeedback('fallacy')}
                                className="px-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl"
                              >
                                送出評語
                              </button>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="text-center py-20 text-gray-400 italic text-xs space-y-3">
                  <span className="text-4xl block">👩🏻‍🏫</span>
                  <div className="space-y-1">
                    <h4 className="font-bold text-gray-600">請從左側點選一位同學以進行審閱</h4>
                    <p>您可以即時看到該名學生送出的回答、歷史進程，並撰寫點評回饋</p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
