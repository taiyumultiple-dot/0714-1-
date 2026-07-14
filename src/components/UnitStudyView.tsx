/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, 
  BookOpen, 
  Sparkles, 
  HelpCircle, 
  Save, 
  CheckCircle, 
  Star, 
  Award, 
  MessageSquare,
  Bookmark,
  Share2,
  Lock,
  ArrowRight,
  UserCheck,
  Activity
} from 'lucide-react';
import { StudentSubmission, Feedback } from '../types';
import SafeImageAvatar from './SafeImageAvatar';
import { UNIT_DATA } from '../data';
// @ts-ignore
import heroCharacters from '../assets/images/hero-characters.jpg';
import Unit00TextbookPageViewer, { CHAPTERS_NAV } from './Unit00TextbookPageViewer';
import Unit01TextbookPageViewer, { CHAPTERS_NAV_UNIT_01 } from './Unit01TextbookPageViewer';
import Unit02TextbookPageViewer, { CHAPTERS_NAV_UNIT_02 } from './Unit02TextbookPageViewer';
import Unit03TextbookPageViewer, { CHAPTERS_NAV_UNIT_03 } from './Unit03TextbookPageViewer';
import Unit04TextbookPageViewer, { CHAPTERS_NAV_UNIT_04 } from './Unit04TextbookPageViewer';
import Unit05TextbookPageViewer, { CHAPTERS_NAV_UNIT_05 } from './Unit05TextbookPageViewer';

interface UnitStudyViewProps {
  unitId: string;
  onBack: () => void;
  onSelectUnit?: (unitId: string) => void;
  submissions: StudentSubmission[];
  onChangeSubmissions: (subs: StudentSubmission[]) => void;
  activeStudentId: string;
  role: 'student' | 'teacher';
}

export default function UnitStudyView({
  unitId,
  onBack,
  onSelectUnit,
  submissions,
  onChangeSubmissions,
  activeStudentId,
  role
}: UnitStudyViewProps) {
  
  // Tabs within unit study: 'textbook' (數位課本) | 'worksheet' (互動學習單)
  const [activeSubTab, setActiveSubTab] = useState<'textbook' | 'worksheet'>('textbook');

  // Toast notifications state
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'warning' } | null>(null);

  // Auto-hide toast after 4 seconds
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);
  
  // Current active student submission (for students) or selected student submission (for teachers)
  const [selectedStudentId, setSelectedStudentId] = useState<string>(activeStudentId);
  const currentSubmission = submissions.find(s => s.studentId === selectedStudentId) || submissions[0];

  // Sync state if activeStudentId changes
  useEffect(() => {
    setSelectedStudentId(activeStudentId);
  }, [activeStudentId]);

  // Extract or initialize worksheet state for this unit
  const currentUnitWorksheet = currentSubmission?.unitWorksheets?.[unitId] || {
    answers: {},
    submitted: false
  };

  // Local answer states matching the unit
  const [answers, setAnswers] = useState<Record<string, any>>(currentUnitWorksheet.answers || {});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(currentUnitWorksheet.submitted);
  const [readingProgress, setReadingProgress] = useState<number>(
    unitId === 'unit_05' ? 108 : (unitId === 'unit_04' ? 82 : (unitId === 'unit_03' ? 56 : (unitId === 'unit_02' ? 36 : (unitId === 'unit_01' ? 14 : 4))))
  );

  // Sync local answers if current student submission or unit worksheet updates
  useEffect(() => {
    const ws = currentSubmission?.unitWorksheets?.[unitId] || { answers: {}, submitted: false };
    setAnswers(ws.answers || {});
    setIsSubmitted(ws.submitted);
    setReadingProgress(
      (ws as any).readingProgress || 
      (unitId === 'unit_05' ? 108 : (unitId === 'unit_04' ? 82 : (unitId === 'unit_03' ? 56 : (unitId === 'unit_02' ? 36 : (unitId === 'unit_01' ? 14 : 4)))))
    );
  }, [selectedStudentId, unitId, currentSubmission]);

  // Scroll to top of the page when reading progress changes (e.g. clicking next/prev or page numbers)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [readingProgress]);



  // Teacher feedback form states
  const [teacherComments, setTeacherComments] = useState<string>('');
  const [teacherScore, setTeacherScore] = useState<number>(95);
  const [teacherBadges, setTeacherBadges] = useState<string[]>([]);
  const [isAiGrading, setIsAiGrading] = useState<boolean>(false);

  useEffect(() => {
    if (currentUnitWorksheet.feedback) {
      setTeacherComments(currentUnitWorksheet.feedback.comments || '');
      setTeacherScore(currentUnitWorksheet.feedback.score || 95);
      setTeacherBadges(currentUnitWorksheet.feedback.badges || []);
    } else {
      setTeacherComments('');
      setTeacherScore(95);
      setTeacherBadges([]);
    }
  }, [selectedStudentId, unitId, currentSubmission]);



  // Save Student Answers Draft or Submit
  const handleSaveAnswers = (submit: boolean = false) => {
    const updatedSubmissions = submissions.map(sub => {
      if (sub.studentId === selectedStudentId) {
        const existingWorksheets = sub.unitWorksheets || {};
        return {
          ...sub,
          unitWorksheets: {
            ...existingWorksheets,
            [unitId]: {
              answers,
              submitted: submit,
              submittedAt: submit ? new Date().toISOString().replace('T', ' ').substring(0, 16) : existingWorksheets[unitId]?.submittedAt,
              feedback: existingWorksheets[unitId]?.feedback,
              readingProgress: readingProgress
            }
          }
        };
      }
      return sub;
    });

    onChangeSubmissions(updatedSubmissions);
    setIsSubmitted(submit);
    setToast({ 
      message: submit ? "🎉 學習單已成功提交給林老師！" : "💾 進度已成功暫存！", 
      type: "success" 
    });
  };

  // Handle textbook page change and auto-sync reading progress
  const handlePageChange = (newPage: number) => {
    setReadingProgress(newPage);
    if (role === 'student' && !isSubmitted) {
      const updatedSubmissions = submissions.map(sub => {
        if (sub.studentId === selectedStudentId) {
          const existingWorksheets = sub.unitWorksheets || {};
          const currentWS = existingWorksheets[unitId] || { answers: {}, submitted: false };
          const defaultReadPage = unitId === 'unit_05' ? 108 : (unitId === 'unit_04' ? 82 : (unitId === 'unit_03' ? 56 : (unitId === 'unit_02' ? 36 : (unitId === 'unit_01' ? 14 : 4))));
          const readPages = answers.textbookReadPages || [defaultReadPage];
          const newReadPages = readPages.includes(newPage) ? readPages : [...readPages, newPage];
          
          return {
            ...sub,
            unitWorksheets: {
              ...existingWorksheets,
              [unitId]: {
                ...currentWS,
                answers: {
                  ...answers,
                  textbookReadPages: newReadPages
                },
                readingProgress: newPage
              }
            }
          };
        }
        return sub;
      });
      onChangeSubmissions(updatedSubmissions);
    }
  };

  // AI & Local grading simulations for teacher
  const simulateLocalGrading = () => {
    const studentName = currentSubmission.studentName;
    let comments = "";
    let score = 95;
    let badges: string[] = [];

    if (unitId === 'unit_00') {
      comments = `同學好！我是林老師。看了你在「總說學習單」中對幸福生命的詮釋，老師感到十分欣慰。你把幸福比喻為「${answers.q2 || '暖心陪伴'}」，非常切合我們人學探索中「生命的網絡」之主旨。你在五維度幸福指數自評中，「${answers.q3 ? '想解鎖的特質' : '自我認同'}」表現出極佳的自省能力。希望你在高中的三年裡，能依照這份誓言，勇敢探索自己生命的色彩！`;
      score = 94;
      badges = ["思考小高手", "未來的自己"];
    } else if (unitId === 'unit_01') {
      comments = `哈囉 ${studentName}！林老師看完你的「生活謬誤探測器」答案。你對那三個常見邏輯謬誤（群眾、人身攻擊、滑坡）的配對完全正確！並且你能把謬誤連結到自己之前的衝動消費盲點，這代表你已經懂得運用「邏輯審查」去打破跟風思維。繼續保持這顆清晰冷靜的哲學大腦！`;
      score = 96;
      badges = ["思考小高手", "韌性練習中"];
    } else if (unitId === 'unit_02') {
      comments = `同學好！我是林老師。看完了你在「人學探索」學習單上的豐富回答，我感到非常驚艷！在「狼孩潘托哈」的思辨中，你能深度辨別外在特徵與內在人性的交織。在《黑暗榮耀》人性覺察中，你對同珢的處境展現了極高的同理心。特別是你最喜歡的「${answers.breathingFav || '彩虹呼吸'}」體驗中，體會到身心能量的專注與放鬆，這就是靈性修養與自我貼近的絕佳起步。非常好，繼續保持這份溫暖的同理大愛！`;
      score = 95;
      badges = ["同理心大師", "正念覺察生"];
    } else if (unitId === 'unit_03') {
      comments = `同學好！我是林老師。看了你在「終極關懷」學習單中的深刻反思，老師非常感動。在生命航點的選擇中，你展現了超越年齡的成熟；而你對三個工人的啟示中，把讀書上學昇華到「造福他人、發掘熱愛」的層面，這正是第三位蓋大教堂工人的「至善」格局！你分享「${answers.p63Rank1 || '愛與被愛'}」作為你目前最珍貴的價值寶盒，並搭配你辛苦排練（或運動練習）卻滿懷幸福的具體回憶，完美契合了亞里斯多德的理智至善真諦！太棒了，繼續勇敢航行你的生命大夢！`;
      score = 97;
      badges = ["哲思小學霸", "利他大愛生"];
    } else {
      comments = `同學好！看完你在這份學習單中的精彩作答。不論是思考的反省還是心靈的探索，都展現出極具溫度的體會。加油！繼續在生命教育的旅程中發光發熱。`;
      score = 95;
      badges = ["思考小高手"];
    }

    setTeacherComments(comments);
    setTeacherScore(score);
    setTeacherBadges(badges);
  };

  const handleAiGrading = async () => {
    setIsAiGrading(true);
    try {
      const res = await fetch('/api/grade-worksheet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unitId,
          answers,
          studentName: currentSubmission.studentName
        })
      });

      const data = await res.json();
      if (!res.ok) {
        if (data.error === "API_KEY_MISSING") {
          setToast({ 
            message: "💡 提示：系統尚未偵測到 GEMINI_API_KEY，已自動切換至「精美本機模擬點評」！您可至右上方 ⚙️ Settings 輸入金鑰啟用真實 AI。", 
            type: "info" 
          });
          simulateLocalGrading();
        } else {
          throw new Error(data.message || "點評失敗");
        }
      } else {
        setTeacherComments(data.comments);
        setTeacherScore(data.score || 90);
        setTeacherBadges(data.badges || []);
      }
    } catch (err: any) {
      console.error(err);
      setToast({ 
        message: "⚠️ 讀取 AI 評語時發生網路錯誤，已自動為您啟用本機模擬！", 
        type: "warning" 
      });
      simulateLocalGrading();
    } finally {
      setIsAiGrading(false);
    }
  };

  const handleTeacherSubmitFeedback = () => {
    if (!teacherComments.trim()) {
      setToast({ message: "⚠️ 請輸入批改評語與反饋！", type: "warning" });
      return;
    }

    const feedbackObj = {
      comments: teacherComments,
      gradedBy: '林老師',
      gradedAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      badges: teacherBadges,
      score: teacherScore
    };

    const updatedSubmissions = submissions.map(sub => {
      if (sub.studentId === selectedStudentId) {
        const existingWorksheets = sub.unitWorksheets || {};
        const currentWS = existingWorksheets[unitId] || { answers: {}, submitted: false };
        return {
          ...sub,
          unitWorksheets: {
            ...existingWorksheets,
            [unitId]: {
              ...currentWS,
              feedback: feedbackObj
            }
          }
        };
      }
      return sub;
    });

    onChangeSubmissions(updatedSubmissions);
    setToast({ 
      message: `🎉 已成功將單元學習單批改回饋送出給 ${currentSubmission.studentName}！`, 
      type: "success" 
    });
  };

  // Text contents for each unit's digital textbook
  const getUnitContent = () => {
    switch (unitId) {
      case 'unit_00':
        return {
          title: "總說：凝視生命的地圖",
          subtitle: "對照紙本課本：第 004 ~ 013 頁。認識生命的本質與幸福人生之門。",
          sections: [
            {
              type: "intro",
              title: "🌟 總導言：凝視生命的地圖",
              text: "歡迎來到泰宇高中生命教育！開學的第一天，窗外陽光灑落，班長陳可華、學霸王小文與可華爺爺在溫暖的客廳營火旁。桌上平鋪著一張泛黃卻發光的生命地圖。地圖上標示著高聳的「哲思之峰」、靜謐的「人學之湖」、豁達的「關懷之谷」與茂密的「靈性森林」，預示著高中三年精彩的生命教育探索之旅。"
            },
            {
              type: "story",
              title: "📖 故事與反思：開學典禮的迷惘",
              character: "陳可華",
              avatarEmoji: "👦🏻",
              quote: "「爺爺，生命這張地圖，真的有標準答案嗎？」",
              text: "高一新生開學典禮上，陳可華看著台下黑壓壓的人群，聽著台上校長長篇大論的期許。身邊的王小文正嚴謹地做著筆記，而康樂股長博鈞則在底下偷偷傳球。可華的心中卻湧現一股難以言喻的迷惘——高中三年，我到底是為了考上大學，還是為了找到我是誰？回到家，爺爺遞給可華一杯剛泡好的溫熱高山茶，溫和地笑著說：「可華啊，生命這張地圖最有趣的地方，就在於它沒有標準答案。重要的是，你的探險指南是寫滿了別人的期許，還是你自己踩出來的印記？」"
            }
          ],
          worksheet: {
            title: "【我的幸福生命指引】學習單",
            desc: "請配合課本總說內容，認真傾聽自己內心的聲音，寫下你專屬的生命地圖指引：",
            questions: [
              {
                id: "q1",
                type: "stars",
                label: "1. 幸福五維度自我評估：你覺得目前自己在這些特質上表現如何？",
                categories: [
                  { key: "phil", label: "💡 哲思力 (能獨立思考、不易盲從)" },
                  { key: "self", label: "👤 自我認同 (了解自己、喜歡自己)" },
                  { key: "res", label: "🧡 韌性抗挫 (面對挫折與死生的豁達度)" },
                  { key: "val", label: "⚖️ 價值思辨 (在對錯十字路口能明辨是非)" },
                  { key: "spirit", label: "🌱 內在平靜 (感到放鬆、心靈充實)" }
                ]
              },
              {
                id: "q2",
                type: "textarea",
                label: "2. 幸福比喻：請用一個通俗、溫暖的具體事物來形容「什麼是幸福？」",
                placeholder: "例如：幸福是一杯寒冬裡剛泡好的熱可可，雖然會慢慢變涼，但那口溫暖會留在心底很久。"
              },
              {
                id: "q3",
                type: "textarea",
                label: "3. 探索誓言：面對充滿未知與挑戰的高中三年，你最期待解鎖生命哪一項特質？你要如何跨出第一步？",
                placeholder: "例如：我最期待解鎖「勇敢」，我想要在遇到不會的數學題目時，不再滑手機逃避，而是深呼吸跨出第一步去問小文。"
              }
            ]
          }
        };

      case 'unit_01':
        return {
          title: "單元 01：哲學思考",
          subtitle: "對照紙本課本：第 014 ~ 033 頁。培養批判與反思能力，學習理性思考的方法，破除盲從謬誤。",
          sections: [
            {
              type: "intro",
              title: "🌟 思考的幸福方程式",
              text: "哲學並不是高深莫測的象牙塔學問，而是「生活的解毒劑」。當網路充斥著聳動的標題，當身邊的朋友都在跟風搶購某樣東西，哲學思考就是教我們如何不當一個盲目的跟隨者，而是擦亮雙眼、看清事物的本質。"
            },
            {
              type: "chart",
              title: "📜 思考的三個核心層次",
              items: [
                { title: "第 1 層：感官接收", desc: "直接相信眼睛看到的、耳朵聽到的訊息（例如：限時特價！搶到賺到！）" },
                { title: "第 2 層：邏輯審查", desc: "詢問來源、證據、論據是否合理（例如：這真的有便宜嗎？我真的需要嗎？）" },
                { title: "第 3 層：批判反思", desc: "理解背後動機、社會脈絡與多元價值（例如：商家為什麼要限時？我的匱乏感從何而來？）" }
              ]
            },
            {
              type: "story",
              title: "📖 故事與反思：王小文的謬誤顯微鏡",
              character: "王小文",
              avatarEmoji: "👧🏻",
              quote: "「大家都這麼做，不代表它就是對的！」",
              text: "午休時間，班上正為了「是否取消班會、改為籃球賽練習」吵得不可開交。康樂股長博鈞大喊：「全班男生都同意了，大家都在等著練球，少數服從多數，這就是民主！」學霸小文推了推眼鏡，站起來冷靜地說：「博鈞，這在邏輯上叫做『訴諸群眾的謬誤』。大家都在做的事，並不代表它就是合理的。我們需要討論的是取消班會對權益的影響，而不是用人數強行壓制不同的聲音。」可華在一旁聽了，心中暗自讚嘆：這就是哲學邏輯的威力啊！"
            }
          ],
          worksheet: {
            title: "【生活謬誤探測器】學習單",
            desc: "理性思考能幫我們躲過生活中的許多陷阱。請完成底下的邏輯配對與生活反思：",
            questions: [
              {
                id: "q1",
                type: "matching",
                label: "1. 邏輯謬誤連連看：請幫底下的日常對話配對正確的邏輯謬誤詞彙：",
                options: [
                  { scenario: "「大家考試都有作弊，我為什麼不能作弊？」", correct: "訴諸群眾謬誤" },
                  { scenario: "「因為他數學常常不及格，所以他提的班際排球戰術一定也是垃圾！」", correct: "人身攻擊謬誤" },
                  { scenario: "「如果你不天天背 100 個英文單字，你英文就會爛，最後學測落榜，一輩子找不到工作！」", correct: "滑坡謬誤" }
                ],
                choices: ["訴諸群眾謬誤", "人身攻擊謬誤", "滑坡謬誤"]
              },
              {
                id: "q2",
                type: "textarea",
                label: "2. 實踐反思：回想你最近一次「衝動跟風」或「盲從」的經驗，你當時落入了哪一種思考盲點？如果現在重新用「邏輯審查」去打破它，你會怎麼做？",
                placeholder: "例如：我曾經因為網紅推薦就買了很貴的筆記本，落入了「訴諸權威」的盲點。如果重來，我會思考它對我的實用價值..."
              }
            ]
          }
        };

      case 'unit_02':
        return {
          title: "單元 02：人學探索",
          subtitle: "對照紙本課本：第 036 ~ 045 頁。認識「人」是什麼，探索自我、人性善惡與生命的意義。",
          sections: [
            {
              type: "intro",
              title: "🌟 人學探索導航：漫步奇幻的生命旅程",
              text: "我是誰？人與其他動物最關鍵的差異是什麼？在這個單元中，我們將跨越生理科學、哲學思辨、心理學與靈性心靈，層層探索自我的價值，明辨何謂人性，並透過「呼吸調息療法」學會貼近自我，建立溫暖平靜的生命心靈網絡。"
            },
            {
              type: "chart",
              title: "📜 多元領域對「人」的本質解答",
              items: [
                { title: "自然與腦科學", desc: "人體由三十兆細胞組成，人的認知是腦神經元與神經傳導物質互動產生的生理過程。" },
                { title: "哲學與心理學", desc: "亞里斯多德指出人會理性思考；佛洛伊德闡明意識層次，馬斯洛提出自我超越的靈性需求。" },
                { title: "人性、德性與修行", desc: "孟子性善說與荀子性惡說皆強調透過後天教育與修行，去追求靈魂心靈的圓滿與大愛。" }
              ]
            },
            {
              type: "story",
              title: "📖 角色劇場：張曉萍的「人學」第一課",
              character: "張曉萍",
              avatarEmoji: "👩🏻",
              quote: "「當我們能設身處地為他人著想，那份同理就是最高貴的人性。」",
              text: "下午的可華家客廳，曉萍正在看《黑暗榮耀》影集。看到霸凌五人幫用電棒捲燙同珢的殘忍畫面，曉萍捏緊了拳頭：「這太沒人性了！竟然把別人的痛苦當作測試溫度的娛樂。」在一旁的博鈞有些疑惑：「可是曉萍，到底什麼是人性啊？怎麼樣才算是『有人性』？」學霸小文在筆記本上寫下：『人性，是當人站在痛苦的前面，選擇了悲憫，就像影集裡拎著鞋子走路、怕吵到同珢讀書的工廠同事一樣。』可華看著大家，深吸了一口氣，微笑道：「看來，我們得先學習如何透過正念呼吸，好好貼近自己，才能真正去同理與愛護他人呢！」"
            }
          ],
          worksheet: {
            title: "【人學探索與生命網絡】反思學習單",
            desc: "在漫步完 Unit 02 奇幻的生命旅程後，請根據課本故事與你的生活經驗，寫下對「人」的自我覺察：",
            questions: [
              {
                id: "p41Q1",
                type: "textarea",
                label: "1. 狼孩思辨與適應探討：被狼養大的潘托哈，到底是人還是動物？你覺得他在重回人類社會時可能經歷哪些困難？",
                placeholder: "例如：我認為他生理上是人，但生活習慣上已經動物化。重回社會最困難的是語言不通、不適應人類社交規範，內心容易感到孤立和極度焦慮..."
              },
              {
                id: "p42Q1",
                type: "textarea",
                label: "2. 《黑暗榮耀》與人性覺察：你認為一個人必須具備哪些心靈要素，才能被稱作「有人性」的人？我們可以用哪些行動展現人性光輝？",
                placeholder: "例如：必須具備同理心和慈悲心。我們可以從微小的行動開始，例如在別人準備考試時，走路時拎起鞋子輕聲慢行，不打擾他人..."
              },
              {
                id: "p43UmbrellaReflection",
                type: "textarea",
                label: "3. 雨傘交戰與起心動念：當你發現自己傘不見，內心出現「想拿走別人雨傘」的念頭時，你如何看待這個念頭的善惡與造成的影響？",
                placeholder: "例如：這個念頭是自私性惡的展現。如果每個人都這樣做，就會造成互害的惡性循環，所以我會克制自己，選擇維持良善..."
              },
              {
                id: "breathingFav",
                type: "textarea",
                label: "4. 呼吸療法體驗與覺察：你最喜歡哪一種呼吸方式（彩虹/氣球/煙火呼吸）？在練習時你發現自己的身體與情緒有什麼轉转？",
                placeholder: "例如：我最喜歡「彩虹呼吸」，配合雙手繪出彩虹，能感覺到腹部隨呼吸撐大。練習時原本緊繃的肩膀和焦慮的情緒都漸漸安定放鬆了..."
              }
            ]
          }
        };

      case 'unit_03':
        return {
          title: "單元 03：終極關懷",
          subtitle: "對照紙本課本：第 056 ~ 065 頁。認識生命的意義與本質，探尋終極信念與人生核心價值。",
          sections: [
            {
              type: "intro",
              title: "🌟 終極關懷導航：生命的終極羅盤",
              text: "生命的盡頭是什麼？有一天我們都會消失，活著的意義究竟是什麼？在這個單元中，我們將透過蘇格拉底的大哉問、蓋教堂工人的寓言、劉安婷為台灣而教的故事、種樹男孩菲利斯的氣候正義大志、魯夫與騙人布的執著信念，以及亞里斯多德關於「快樂 vs 幸福」的思辨，尋求靈魂心靈的終極安定，繪製出我們自己專屬的生命航線。"
            },
            {
              type: "chart",
              title: "📜 多元思維引領「終極關懷」的生命解答",
              items: [
                { title: "立志與天命", desc: "王陽明曰「志不立，天下無可成之事。」立志是清楚我要做什麼，自我實現與人生目標的規劃與完成。" },
                { title: "終極信念", desc: "回應困境的態度，取決於內心最深處的信念和觀點。越早堅定正確信念，越能活出意義。" },
                { title: "快樂、幸福與至善", desc: "快樂偏向感官短暫不穩，幸福則是心智思維對理性至善的持久追求。至善是共創人類宇宙整體的福祉。" }
              ]
            },
            {
              type: "story",
              title: "📖 角色劇場：博鈞、曉萍與可華的喪親對話",
              character: "陳可華",
              avatarEmoji: "👦🏻",
              quote: "「有一天我們都會消失，活著的意義與目的究竟是什麼呢？」",
              text: "可華因為爺爺過世請假，曉萍與博鈞前去探望陪伴。可華難以接受爺爺突然與世長辭，感到生命的無常。博鈞溫慢安慰，送上小文的課業筆記，鼓勵把握當下。在朋友與親情的溫馨陪伴中，可華心中空虛一掃而空，體悟到生命的連結即是幸福的本質。"
            }
          ],
          worksheet: {
            title: "【終極關懷與生命航線】反思學習單",
            desc: "在經歷完 Unit 03 的生命羅盤引導後，請依據課本故事與你的課堂收穫，誠實寫下對價值的省思：",
            questions: [
              {
                id: "p57Q3",
                type: "textarea",
                label: "1. 生命航線與終點回顧：如果生命是一場旅行，在出發時你會做好哪些準備？在人生快要結束前，你最希望回顧哪些認為重要、不留遺憾的事情？",
                placeholder: "例如：在出發時我會準備滿滿的勇氣與探索的好奇心。在結束前，我最想回顧我曾溫暖愛護過的人、和家人相處的幸福回憶，以及我有沒有無悔地追求我的夢想..."
              },
              {
                id: "p58Q1",
                type: "textarea",
                label: "2. 蘇格拉底哲學廣場：如果你是蘇格拉底，今天你到學校的穿堂或雅典廣場，你最想向同學、老師或路人提問哪一個關於「生命意義」的大問題？",
                placeholder: "例如：我想問「如果我們的人生只有最後十天，你會繼續做現在正在做的事，還是會立刻去擁抱你愛的人？」..."
              },
              {
                id: "p59Q4",
                type: "textarea",
                label: "3. 蓋教堂工人的啟示：三位工人從事相同的工作，卻因自我定位而有完全不同的價值感。這對你的學習有何啟示？上學讀書對你的意義和目的是什麼？",
                placeholder: "例如：讀書上學不只是為了考高分或應付父母（像第一或第二個工人），而是為了探索我熱愛的事情，磨練我的心智，並在未來用知識去幫助、造福更多的人（像第三個工人）..."
              },
              {
                id: "p60Q2",
                type: "textarea",
                label: "4. 劉安婷與立志天命：劉安婷和德蕾莎修女的人生大轉變，如何啟發你尋找自己的「天命」？現在的你可以為自己和身邊的人立下什麼人生目標？",
                placeholder: "例如：她們啟發我天命不在於累積多少「餅乾」，而在於我們願意為哪些事情心碎、為誰服務付出。我的目標是學會真誠傾聽，多陪伴身邊孤單的朋友..."
              },
              {
                id: "p63Explanation",
                type: "textarea",
                label: "5. 我最重視的核心價值：在你精挑細選的 3~5 個生命價值中，你排序第一、最無法割愛的是什麼？為什麼它對你目前的高中生活如此重要？",
                placeholder: "例如：我最重視的是「愛與被愛（或健康、誠信）」。因為如果沒有愛與溫暖的生命連結，再多的金錢和成功，內心也依然會像可華一樣感到空虛迷惘..."
              },
              {
                id: "p65Q1",
                type: "textarea",
                label: "6. 王博鈞的十萬顆三分球：博鈞為了精進三分球願意忍受極枯燥辛苦的練習過程。你是否有過這種身體或感官受苦，但內心卻感到極度幸福、充實的經驗？",
                placeholder: "例如：我曾為了彈好一首鋼琴曲反覆練到手指僵硬、也曾為了排球隊每日晨練。雖然當下很辛苦很累，但當彈出流暢音符、或與隊友打出精彩一球時，那種克服困難的滿足與幸福，是吃喝玩樂無法比擬的..."
              }
            ]
          }
        };

      default:
        // Generic template for remaining units (02, 03, 04, 05)
        const unitName = UNIT_DATA.find(u => u.id === unitId)?.title || "生命探索單元";
        return {
          title: unitName,
          subtitle: `泰宇生命教育互動探索：開啟 ${unitName} 的精美數位教材。`,
          sections: [
            {
              type: "intro",
              title: "🌟 單元導言",
              text: `歡迎進入${unitName}！在這個單元中，我們將跟著陳可華、王小文、博鈞與曉萍，一起探討生命的深刻課題。生命沒有標準公式，只有用真誠去體驗，才能活出精彩。`
            },
            {
              type: "story",
              title: "📖 角色生命劇場",
              character: "張曉萍",
              avatarEmoji: "👩🏻",
              quote: "「每一個在生命裡流過淚、流過汗的人，都在編織最美麗的網。」",
              text: "下課鐘聲響起，可華跟曉萍坐在排球場旁的草地上。曉萍看著天空中的白雲，若有所思地說：「可華，你相信每個人來到世界上都有他的使命嗎？即使是一隻流浪貓咪咪，也能教會我們責任。生命的網絡把我們連在一起，沒有人是孤島。」"
            }
          ],
          worksheet: {
            title: `【${unitName}】反思學習單`,
            desc: "請在閱讀完課本內容後，寫下你對本單元的核心思考：",
            questions: [
              {
                id: "q1",
                type: "textarea",
                label: "1. 核心感悟：在本單元的學習中，最觸動你內心深處的一句話或一個觀點是什麼？為什麼？",
                placeholder: "寫下你的真實感想..."
              },
              {
                id: "q2",
                type: "textarea",
                label: "2. 行動實踐：你要如何將這個單元學到的理念，落實到你本週的日常待人處事中？",
                placeholder: "寫下一個具體可執行的行動步驟..."
              }
            ]
          }
        };
    }
  };

  const content = getUnitContent();

  return (
    <div className="bg-white rounded-3xl border border-blue-100 p-6 shadow-sm min-h-[600px] flex flex-col justify-between relative">
      
      {/* Dynamic beautiful non-blocking toast overlay */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-2xl shadow-lg border text-xs sm:text-sm max-w-md font-sans ${
              toast.type === 'success' 
                ? 'bg-emerald-50 border-emerald-100 text-emerald-800'
                : toast.type === 'warning'
                ? 'bg-amber-50 border-amber-100 text-amber-800'
                : 'bg-blue-50 border-blue-100 text-blue-800'
            }`}
          >
            <span className="font-bold">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* 1. TOP HEADER NAVIGATION BAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-4 mb-6 gap-4">
        
        <div className="flex items-center gap-3">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-slate-50 rounded-full border border-gray-100 text-slate-500 hover:text-blue-600 transition-colors"
            title="返回課程地圖"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black bg-blue-50 text-blue-600 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                泰宇線上 App
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-[10px] text-gray-400 font-bold">目前章節</span>
            </div>
            <h2 className="text-base font-extrabold text-blue-950 flex items-center gap-1.5">
              <BookOpen className="w-4.5 h-4.5 text-blue-500" />
              {content.title}
            </h2>
          </div>
        </div>

        {/* Sub-tab selection: Textbook vs Worksheet */}
        <div className="flex bg-slate-100 p-0.5 rounded-2xl">
          <button 
            onClick={() => setActiveSubTab('textbook')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              activeSubTab === 'textbook' 
                ? 'bg-white text-blue-600 shadow-xs' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            📖 數位課本導讀
          </button>
          <button 
            onClick={() => setActiveSubTab('worksheet')}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all relative ${
              activeSubTab === 'worksheet' 
                ? 'bg-white text-blue-600 shadow-xs' 
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            ✏️ 課堂互動學習單
            {isSubmitted && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full" />
            )}
          </button>
        </div>

      </div>

      {/* 2. DYNAMIC MAIN BODY CONTENT AREA */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          
          {/* TEXTBOOK CONTENT TAB */}
          {activeSubTab === 'textbook' && (
            <motion.div
              key="textbook-tab"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-6"
            >
              
              {/* Textbook Materials */}
              <div className="space-y-6">
                
                {(unitId === 'unit_00' || unitId === 'unit_01' || unitId === 'unit_02' || unitId === 'unit_03' || unitId === 'unit_04' || unitId === 'unit_05') ? (
                  <div className="space-y-4">
                    {role === 'teacher' && (
                      (() => {
                        const totalPagesForUnit = unitId === 'unit_05' ? 21 : unitId === 'unit_04' ? 26 : unitId === 'unit_03' ? 26 : (unitId === 'unit_02' ? 20 : (unitId === 'unit_01' ? 20 : 10));
                        const defaultReadPage = unitId === 'unit_05' ? 108 : (unitId === 'unit_04' ? 82 : (unitId === 'unit_03' ? 56 : (unitId === 'unit_02' ? 36 : (unitId === 'unit_01' ? 14 : 4))));
                        const readPagesList = answers.textbookReadPages || [defaultReadPage];
                        const readPagesCount = readPagesList.filter(p => 
                          unitId === 'unit_05' ? (p >= 108 && p <= 128) : unitId === 'unit_04' ? (p >= 82 && p <= 107) : (unitId === 'unit_03' ? (p >= 56 && p <= 81) : (unitId === 'unit_02' ? (p >= 36 && p <= 55) : (unitId === 'unit_01' ? (p >= 14 && p <= 33) : (p >= 4 && p <= 13))))
                        ).length || 1;
                        const coveragePercent = Math.round((readPagesCount / totalPagesForUnit) * 100);
                        const chaptersList = unitId === 'unit_05' ? CHAPTERS_NAV_UNIT_05 : unitId === 'unit_04' ? CHAPTERS_NAV_UNIT_04 : unitId === 'unit_03' ? CHAPTERS_NAV_UNIT_03 : (unitId === 'unit_02' ? CHAPTERS_NAV_UNIT_02 : (unitId === 'unit_01' ? CHAPTERS_NAV_UNIT_01 : CHAPTERS_NAV));
                        const pagesArray = unitId === 'unit_05'
                          ? Array.from({ length: 21 }, (_, i) => i + 108)
                          : unitId === 'unit_04'
                          ? Array.from({ length: 26 }, (_, i) => i + 82)
                          : unitId === 'unit_03'
                          ? Array.from({ length: 26 }, (_, i) => i + 56)
                          : (unitId === 'unit_02' ? Array.from({ length: 20 }, (_, i) => i + 36) : (unitId === 'unit_01' ? Array.from({ length: 20 }, (_, i) => i + 14) : [4, 5, 6, 7, 8, 9, 10, 11, 12, 13]));

                        return (
                          <div className="bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-white border border-blue-200 p-4.5 rounded-2xl space-y-3.5 shadow-2xs">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-blue-100/30 pb-2.5">
                              <h4 className="text-xs font-black text-blue-950 flex items-center gap-1.5">
                                <Activity className="w-4.5 h-4.5 text-blue-600 animate-pulse" />
                                📊 【課本閱讀進度監控】{currentSubmission.studentName} 的數位探險足跡
                              </h4>
                              <span className="text-[10px] text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-full font-black uppercase">
                                教師監視模式
                              </span>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                              <div className="bg-white p-3 rounded-xl border border-blue-100/50 space-y-1">
                                <span className="text-[9px] text-gray-400 font-extrabold uppercase block">最後停駐頁面</span>
                                <span className="text-sm font-black text-blue-950 font-mono block">p.{String(readingProgress).padStart(3, '0')}</span>
                                <span className="text-[10px] text-gray-500 font-bold block truncate">
                                  {chaptersList.find(c => c.page === readingProgress)?.title || (unitId === 'unit_01' ? '思考的樂趣' : '總說導讀')}
                                </span>
                              </div>

                              <div className="bg-white p-3 rounded-xl border border-blue-100/50 space-y-1.5 col-span-2">
                                <span className="text-[9px] text-gray-400 font-extrabold uppercase block">閱讀覆蓋率</span>
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                                      style={{ width: `${coveragePercent}%` }}
                                    />
                                  </div>
                                  <span className="text-xs font-black text-slate-800 font-sans shrink-0">
                                    {readPagesCount} / {totalPagesForUnit} 頁 ({coveragePercent}%)
                                  </span>
                                </div>
                                <p className="text-[9px] text-slate-500 font-extrabold block truncate leading-relaxed">
                                  👣 已讀足跡：{readPagesList.sort((a, b) => a - b).map((p: any) => `p.${String(p).padStart(3, '0')}`).join(', ')}
                                </p>
                              </div>
                            </div>

                            {/* Interactive Page Jumper for Teacher */}
                            <div className="flex flex-col gap-1.5 pt-2 border-t border-slate-100/50">
                              <span className="text-[9px] text-slate-400 font-extrabold block">👀 老師翻頁跳轉：點擊下方頁碼可同步查閱該生眼前所見之課本內容</span>
                              <div className="flex flex-wrap gap-1 bg-slate-50 p-1.5 rounded-xl border border-slate-100/50">
                                {pagesArray.map((p) => {
                                  const isActive = readingProgress === p;
                                  const hasRead = readPagesList.includes(p);
                                  return (
                                    <button
                                      key={p}
                                      onClick={() => setReadingProgress(p)}
                                      className={`px-2 py-1 text-[10px] font-black rounded-lg transition-all ${
                                        isActive
                                          ? 'bg-blue-600 text-white shadow-xs'
                                          : 'bg-white text-slate-600 border border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                                      }`}
                                    >
                                      p.{String(p).padStart(3, '0')} {hasRead ? '✔️' : ''}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        );
                      })()
                    )}

                    {readingProgress === 999 ? (
                      <div className="bg-[#FCF8F2] rounded-3xl p-5 sm:p-8 border border-[#EEDCC8] space-y-6 text-[#5C4538] relative overflow-hidden shadow-2xs">
                        
                        {/* Decorative Botanical Corner Leaves (Matches watercolor theme of Image 2) */}
                        <div className="absolute top-0 right-0 pointer-events-none opacity-35 select-none w-36 h-36 z-0">
                          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                            <path d="M100 0 C80 15, 40 25, 30 55 C40 65, 60 75, 100 0 Z" fill="#D2E4CE" />
                            <path d="M100 0 C85 25, 65 45, 45 75 C60 80, 75 65, 100 0 Z" fill="#BACFB4" />
                            <path d="M100 0 Q 55 45, 10 90" stroke="#879B84" strokeWidth="1" />
                            <circle cx="55" cy="25" r="3" fill="#ECA267" />
                            <circle cx="75" cy="12" r="4" fill="#ECA267" opacity="0.9" />
                            <circle cx="35" cy="45" r="2.5" fill="#ECA267" />
                          </svg>
                        </div>
                        <div className="absolute bottom-0 left-0 pointer-events-none opacity-35 select-none w-36 h-36 z-0 transform rotate-180">
                          <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                            <path d="M100 0 C80 15, 40 25, 30 55 C40 65, 60 75, 100 0 Z" fill="#D2E4CE" />
                            <path d="M100 0 C85 25, 65 45, 45 75 C60 80, 75 65, 100 0 Z" fill="#BACFB4" />
                            <path d="M100 0 Q 55 45, 10 90" stroke="#879B84" strokeWidth="1" />
                            <circle cx="55" cy="25" r="3" fill="#ECA267" />
                            <circle cx="75" cy="12" r="4" fill="#ECA267" opacity="0.9" />
                            <circle cx="35" cy="45" r="2.5" fill="#ECA267" />
                          </svg>
                        </div>

                        {/* Top Header Banner Section (Fills left column and features student models on the right) */}
                        {(() => {
                          const unitMeta = UNIT_DATA.find(u => u.id === unitId) || { num: '總說', title: '凝視生命的地圖' };
                          const unitNumStr = unitMeta.num;
                          const unitTitleStr = unitMeta.title;

                          const getUnitBadgeInfo = (uid: string) => {
                            switch (uid) {
                              case 'unit_00':
                                return { numBadge: '006', chapterName: '打開幸福人生之門' };
                              case 'unit_01':
                                return { numBadge: '014', chapterName: '思考的樂趣' };
                              case 'unit_02':
                                return { numBadge: '036', chapterName: '「人」是什麼？' };
                              case 'unit_03':
                                return { numBadge: '056', chapterName: '終極關懷' };
                              case 'unit_04':
                                return { numBadge: '082', chapterName: '道德思辨與實踐' };
                              case 'unit_05':
                                return { numBadge: '108', chapterName: '靈性修養與自我超越' };
                              default:
                                return { numBadge: '006', chapterName: '打開幸福人生之門' };
                            }
                          };

                          const badgeInfo = getUnitBadgeInfo(unitId);

                          return (
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end relative pb-3 border-b border-[#EEDCC8]/60 z-10">
                              <div className="space-y-3.5 max-w-2xl">
                                <div className="flex items-center gap-1.5">
                                  <span className="text-[#5194E3] text-2xl sm:text-3xl font-black font-serif select-none">✦</span>
                                  <h3 className="text-xl sm:text-2xl font-serif font-black text-[#4E3629] tracking-tight">
                                    {unitNumStr} ｜ {unitTitleStr}
                                  </h3>
                                </div>

                                <div className="inline-flex items-center bg-[#EAF5FF] text-[#2E4862] border border-[#D5E9FC] rounded-full px-3 py-1 gap-2 shadow-3xs">
                                  <span className="bg-[#5194E3] text-white text-[9px] font-black px-1.5 py-0.5 rounded-md font-sans">
                                    {badgeInfo.numBadge}
                                  </span>
                                  <span className="text-[11px] font-black tracking-wide font-sans">
                                    {badgeInfo.chapterName}
                                  </span>
                                </div>
                              </div>

                              {/* Student Characters Portrait on top right (Perfect replica of Image 2) */}
                              <div className="absolute right-0 bottom-0 top-0 hidden md:flex items-end select-none pointer-events-none pr-4">
                                <div className="relative h-28 w-52 flex items-end">
                                  <img 
                                    src={heroCharacters} 
                                    alt="Students" 
                                    className="h-full w-full object-contain object-bottom mix-blend-multiply opacity-95 filter brightness-103"
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })()}

                        {/* Split Grid Section (Row 1: Completion Card + Mentor Feedback Card) */}
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
                          
                          {/* Learning Status Block - Left Side (4 cols) */}
                          <div className="lg:col-span-5 bg-[#F5FAF5] rounded-3xl border border-[#DCECDC] p-6 text-center flex flex-col justify-center items-center relative overflow-hidden shadow-3xs">
                            {/* Wreath Layout Checkmark (Image 2 style) */}
                            <div className="relative my-2">
                              <div className="w-16 h-16 bg-[#4CAF50] text-white rounded-full flex items-center justify-center shadow-md border-4 border-white relative z-10">
                                <svg className="w-8 h-8 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              </div>
                              {/* Left & Right wreath botanical leaves */}
                              <div className="absolute -inset-4 flex items-center justify-between pointer-events-none select-none text-xl">
                                <span className="transform -rotate-15 -translate-x-1.5">🌱</span>
                                <span className="transform rotate-15 translate-x-1.5">🌿</span>
                              </div>
                            </div>

                            <h4 className="text-[#2E7D32] text-xl font-black mt-3">學習單已完成！</h4>
                            
                            <div className="space-y-1 mt-2.5">
                              <p className="text-[#2E7D32] font-black text-xs">
                                恭喜你完成本單元的所有學習任務！
                              </p>
                              <p className="text-gray-500 font-bold text-[10px] sm:text-[11px] leading-relaxed max-w-xs mx-auto">
                                你已展現出對生命的關懷與探索精神，繼續保持！
                              </p>
                            </div>
                          </div>

                          {/* Teacher / Mentor Feedback Block - Right Side (7 cols) */}
                          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#F4E3D0] p-5.5 space-y-4 shadow-3xs flex flex-col justify-between">
                            <div className="text-[#C48C46] font-black text-xs flex items-center gap-1.5 border-b border-[#FAF2E8] pb-2">
                              <span className="text-[#C48C46] text-sm">🏵️</span> 老師回饋
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4.5 items-start">
                              {/* Mentor Profile Avatar */}
                              <div className="flex flex-col items-center shrink-0 mx-auto sm:mx-0">
                                <SafeImageAvatar
                                  src="grandpa"
                                  fallbackEmoji="👴🏻"
                                  sizeClassName="w-13 h-13"
                                  className="ring-4 ring-[#FFF8F1] shadow-3xs border border-[#FCE5D0]"
                                />
                                <span className="bg-[#E0812A] text-white text-[9px] font-black px-2.5 py-0.5 rounded-full mt-2.5 shadow-3xs">
                                  可華爺爺
                                </span>
                              </div>

                              {/* Speech Bubble pointing to the left */}
                              <div className="flex-1 relative bg-[#FFF5EB] border border-[#FCE5D0] rounded-2xl p-4 text-xs text-[#5C4538] font-bold leading-relaxed shadow-3xs">
                                {/* Triangle pointer (hidden on mobile, shown on tablet/desktop) */}
                                <div className="hidden sm:block absolute top-5 -left-1.5 w-3 h-3 bg-[#FFF5EB] border-b border-l border-[#FCE5D0] rotate-45" />

                                <p className="relative z-10">
                                  {currentUnitWorksheet.feedback?.comments ? (
                                    currentUnitWorksheet.feedback.comments
                                  ) : (
                                    `你對生命的價值有了用心的探索，能從不同角度思考並連結自己的經驗，這是非常珍貴的學習歷程。願你帶著這份覺察與溫暖，持續勇敢前行，創造屬於自己的幸福地圖！`
                                  )}
                                </p>

                                {/* Image 2 Style Capsule tags below the speech bubble text */}
                                <div className="mt-3.5 pt-2.5 border-t border-[#FCDCC0]/40 flex flex-wrap gap-1.5">
                                  <span className="bg-[#FFF0DF] text-[#A66C2D] border border-[#F3DEC5] font-black text-[9px] px-2.5 py-1 rounded-full shadow-3xs">
                                    💡 思考深入
                                  </span>
                                  <span className="bg-[#FFE9E9] text-[#C04E4E] border border-[#FCD2D2] font-black text-[9px] px-2.5 py-1 rounded-full shadow-3xs">
                                    ❤️ 觀點真誠
                                  </span>
                                  <span className="bg-[#F0EFFF] text-[#554EC0] border border-[#DFDCFC] font-black text-[9px] px-2.5 py-1 rounded-full shadow-3xs">
                                    💬 表達完整
                                  </span>
                                  <span className="bg-[#EAF7EA] text-[#2E7D32] border border-[#D0ECD0] font-black text-[9px] px-2.5 py-1 rounded-full shadow-3xs">
                                    🌱 持續成長中！
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                        </div>

                        {/* Interactive Statistics Grid (Row 2: 4 metrics columns matching Image 2) */}
                        <div className="bg-[#FFFDFB]/40 rounded-3xl p-4.5 border border-[#F2E4D5]/80 grid grid-cols-2 lg:grid-cols-4 gap-4 divide-y lg:divide-y-0 lg:divide-x divide-[#F1DEC9]/40 relative z-10 shadow-3xs">
                          {[
                            {
                              label: "完成度",
                              value: "100%",
                              desc: "已完整完成所有題目",
                              iconColor: "bg-[#EAF7EA] text-[#2E7D32]",
                              valColor: "text-[#2E7D32]",
                              icon: (
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                                  <path d="m9 12 2 2 4-4" />
                                </svg>
                              )
                            },
                            {
                              label: "學習時間",
                              value: "18 分鐘",
                              desc: "用心學習的每一分鐘都很珍貴",
                              iconColor: "bg-[#EAF5FF] text-[#2E4862]",
                              valColor: "text-[#2E4862]",
                              icon: (
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="12" cy="12" r="10" />
                                  <polyline points="12 6 12 12 16 14" />
                                </svg>
                              )
                            },
                            {
                              label: "總分評估",
                              value: currentUnitWorksheet.feedback?.score ? `${currentUnitWorksheet.feedback.score} 分` : "優良",
                              desc: "表現出色，繼續保持！",
                              iconColor: "bg-[#F0EFFF] text-[#554EC0]",
                              valColor: "text-[#554EC0]",
                              icon: (
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                </svg>
                              )
                            },
                            {
                              label: "學習成就",
                              value: "探索生命 · 理解自我",
                              desc: "你已完成本單元的學習旅程！",
                              iconColor: "bg-[#FFF0DF] text-[#C48C46]",
                              valColor: "text-[#C48C46]",
                              icon: (
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                                  <path d="M4 22h16" />
                                  <path d="M10 14.66V17c0 .55-.45 1-1 1H4v2h16v-2h-5c-.55 0-1-.45-1-1v-2.34" />
                                  <path d="M12 2a4 4 0 0 0-4 4v8a4 4 0 0 0 8 0V6a4 4 0 0 0-4-4z" />
                                </svg>
                              )
                            }
                          ].map((st, sidx) => (
                            <div key={sidx} className={`p-3.5 flex items-start gap-3.5 ${sidx > 0 ? 'lg:pl-5' : ''} ${sidx > 1 ? 'pt-4 lg:pt-3.5' : ''}`}>
                              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 shadow-3xs ${st.iconColor}`}>
                                {st.icon}
                              </div>
                              <div className="space-y-1">
                                <span className="text-[10px] text-gray-400 font-extrabold block">{st.label}</span>
                                <span className={`text-sm sm:text-base font-black block leading-none ${st.valColor}`}>{st.value}</span>
                                <span className="text-[9px] text-gray-500 font-bold block">{st.desc}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Harvest list (Row 3: "我的收穫" title & cards in Image 2) */}
                        <div className="space-y-3 relative z-10">
                          <h4 className="text-xs font-black text-[#8E6953] flex items-center gap-1.5 pl-1">
                            <span className="text-[#C48C46] text-sm">★</span> 我的收穫
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                              { 
                                title: "更深入的思考", 
                                text: "我學會從不同角度思考生命的意義與價值。",
                                emoji: "💡"
                              },
                              { 
                                title: "更清楚的自我", 
                                text: "我更了解自己的想法與感受，並肯定自己的獨特性。",
                                emoji: "❤️"
                              },
                              { 
                                title: "更積極的行動", 
                                text: "我願意將所學運用在生活中，創造更有意義的每一天。",
                                emoji: "🌱"
                              }
                            ].map((har, hidx) => (
                              <div key={hidx} className="bg-white p-4.5 rounded-2xl border border-[#F4E3D0] flex items-center justify-between gap-3 shadow-3xs relative overflow-hidden group hover:border-[#E8C8A5] transition-all">
                                <div className="flex items-center gap-3">
                                  <div className="w-9 h-9 rounded-full bg-[#EAF7EA] text-[#2E7D32] flex items-center justify-center text-base shrink-0 font-bold shadow-3xs">
                                    {har.emoji}
                                  </div>
                                  <div className="space-y-0.5">
                                    <h5 className="text-xs font-black text-slate-800">{har.title}</h5>
                                    <p className="text-[10px] text-gray-500 font-bold leading-normal">{har.text}</p>
                                  </div>
                                </div>
                                <div className="w-5 h-5 bg-[#4CAF50] text-white rounded-full flex items-center justify-center text-[9px] shrink-0 font-black shadow-3xs">
                                  ✓
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Bottom Actions Row (Pairs of Image 2 style buttons) */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4.5 border-t border-[#F1DEC9]/50 pt-6 relative z-10">
                          {(() => {
                            const currentIndex = UNIT_DATA.findIndex(u => u.id === unitId);
                            const hasNextUnit = currentIndex !== -1 && currentIndex < UNIT_DATA.length - 1;
                            const nextUnit = hasNextUnit ? UNIT_DATA[currentIndex + 1] : null;

                            if (hasNextUnit && nextUnit) {
                              const formatUnitLabel = (uid: string) => {
                                switch (uid) {
                                  case 'unit_01': return '01 哲學思考';
                                  case 'unit_02': return '02 人學探索';
                                  case 'unit_03': return '03 終極關懷';
                                  case 'unit_04': return '04 價值思辨';
                                  case 'unit_05': return '05 靈性修養';
                                  default: return '下一章節';
                                }
                              };
                              return (
                                <button
                                  onClick={() => {
                                    if (onSelectUnit) {
                                      onSelectUnit(nextUnit.id);
                                    }
                                  }}
                                  className="px-9 py-3 bg-[#E0812A] hover:bg-[#C46E20] text-white rounded-full text-xs font-black flex items-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-lg scale-100 hover:scale-102"
                                >
                                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm3.293 9.293L12 8.586l-1.293 1.293a1 1 0 0 0 1.414 1.414L12 11.414l1.293 1.293a1 1 0 0 0 1.414-1.414z"/>
                                  </svg>
                                  前往 {formatUnitLabel(nextUnit.id)} ➔
                                </button>
                              );
                            } else {
                              return (
                                <button
                                  onClick={onBack}
                                  className="px-9 py-3 bg-[#E0812A] hover:bg-[#C46E20] text-white rounded-full text-xs font-black flex items-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-lg scale-100 hover:scale-102"
                                >
                                  返回課程地圖 ➔
                                </button>
                              );
                            }
                          })()}

                          <button
                            onClick={() => {
                              const getStartPage = (uid: string) => {
                                switch (uid) {
                                  case 'unit_05': return 108;
                                  case 'unit_04': return 82;
                                  case 'unit_03': return 56;
                                  case 'unit_02': return 36;
                                  case 'unit_01': return 14;
                                  default: return 4;
                                }
                              };
                              const startPage = getStartPage(unitId);
                              setReadingProgress(startPage);
                              setToast({ message: "📖 已回到課本導讀第一頁，您可以再次自由翻閱！", type: "info" });
                            }}
                            className="px-9 py-3 bg-white hover:bg-[#FFFDFB] border border-[#E9DFD3] text-[#7A6052] rounded-full text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-3xs"
                          >
                            🔄 再看一次作答
                          </button>
                        </div>

                      </div>
                    ) : (
                      <>
                        {unitId === 'unit_05' ? (
                          <Unit05TextbookPageViewer
                            answers={answers}
                            setAnswers={setAnswers}
                            role={role}
                            isSubmitted={isSubmitted}
                            currentPage={readingProgress}
                            onPageChange={handlePageChange}
                          />
                        ) : unitId === 'unit_04' ? (
                          <Unit04TextbookPageViewer
                            answers={answers}
                            setAnswers={setAnswers}
                            role={role}
                            isSubmitted={isSubmitted}
                            currentPage={readingProgress}
                            onPageChange={handlePageChange}
                          />
                        ) : unitId === 'unit_03' ? (
                          <Unit03TextbookPageViewer
                            answers={answers}
                            setAnswers={setAnswers}
                            role={role}
                            isSubmitted={isSubmitted}
                            currentPage={readingProgress}
                            onPageChange={handlePageChange}
                          />
                        ) : unitId === 'unit_02' ? (
                          <Unit02TextbookPageViewer
                            answers={answers}
                            setAnswers={setAnswers}
                            role={role}
                            isSubmitted={isSubmitted}
                            currentPage={readingProgress}
                            onPageChange={handlePageChange}
                          />
                        ) : unitId === 'unit_01' ? (
                          <Unit01TextbookPageViewer
                            answers={answers}
                            setAnswers={setAnswers}
                            role={role}
                            isSubmitted={isSubmitted}
                            currentPage={readingProgress}
                            onPageChange={handlePageChange}
                          />
                        ) : (
                          <Unit00TextbookPageViewer
                            answers={answers}
                            setAnswers={setAnswers}
                            role={role}
                            isSubmitted={isSubmitted}
                            currentPage={readingProgress}
                            onPageChange={handlePageChange}
                          />
                        )}

                        {role === 'student' && (
                          <div className="flex justify-between items-center bg-amber-50/50 border border-amber-100 p-3.5 rounded-2xl mt-4">
                            <span className="text-[10px] text-amber-800 font-extrabold flex items-center gap-1">
                              💡 提示：您在此處填寫的課本互動答案（如 {unitId === 'unit_03' ? 'p.057, p.063, p.065, p.066~081' : (unitId === 'unit_02' ? 'p.041, p.045' : (unitId === 'unit_01' ? 'p.015, p.033' : 'p.005, p.013'))}）將同步於「互動學習單」中！
                            </span>
                            <button
                              disabled={isSubmitted}
                              onClick={() => handleSaveAnswers(false)}
                              className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-[11px] rounded-xl flex items-center gap-1.5 shadow-2xs transition-all disabled:opacity-50"
                            >
                              <Save className="w-3.5 h-3.5" />
                              暫存課本進度
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ) : (
                  <>
                    <div className="space-y-1">
                      <h1 className="text-xl font-black text-gray-950 tracking-tight">{content.title}</h1>
                      <p className="text-xs text-gray-500 font-medium">{content.subtitle}</p>
                    </div>

                    {content.sections.map((section, idx) => {
                      
                      if (section.type === "intro") {
                        return (
                          <div key={idx} className="bg-gradient-to-r from-blue-500/5 to-transparent border-l-4 border-blue-500 p-4.5 rounded-r-2xl">
                            <h3 className="text-xs font-bold text-blue-900 mb-1.5 uppercase tracking-wider">{section.title}</h3>
                            <p className="text-xs text-gray-600 leading-relaxed font-medium">
                              {section.text}
                            </p>
                          </div>
                        );
                      }

                      if (section.type === "chart") {
                        return (
                          <div key={idx} className="bg-white rounded-2xl border border-slate-100 p-5 space-y-3 shadow-2xs">
                            <h3 className="text-xs font-extrabold text-slate-800 flex items-center gap-1.5 border-b border-slate-50 pb-2">
                              {section.title}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                              {section.items?.map((item, sidx) => (
                                <div key={sidx} className="bg-slate-50/50 p-3 rounded-xl border border-slate-100 space-y-1">
                                  <h4 className="text-xs font-extrabold text-blue-950">{item.title}</h4>
                                  <p className="text-[11px] text-gray-500 leading-relaxed font-medium">{item.desc}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }

                      if (section.type === "illustration") {
                        return (
                          <div key={idx} className="bg-white rounded-2xl border border-amber-100 p-4 shadow-2xs space-y-3">
                            <h4 className="text-xs font-bold text-amber-800 flex items-center gap-1">
                              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-100" />
                              {section.title}
                            </h4>
                            
                            <div className="relative rounded-xl overflow-hidden aspect-[16/9] bg-slate-100 border border-slate-200">
                              {section.image ? (
                                <img 
                                  src={section.image} 
                                  alt="課本精美導讀插圖"
                                  referrerPolicy="no-referrer"
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold text-xs">
                                  [課本精美插圖導讀載入中]
                                </div>
                              )}
                              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3 text-white">
                                <p className="text-[10px] font-medium leading-relaxed opacity-95">
                                  {section.desc}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      }

                      if (section.type === "story") {
                        return (
                          <div key={idx} className="bg-indigo-50/20 border border-indigo-100 rounded-2xl p-5 space-y-3">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-indigo-100/50 flex items-center justify-center text-xl">
                                {section.avatarEmoji}
                              </div>
                              <div>
                                <span className="text-[10px] text-indigo-600 font-extrabold uppercase block">生命故事劇場</span>
                                <h4 className="text-xs font-extrabold text-gray-800">{section.title}</h4>
                              </div>
                            </div>

                            <blockquote className="border-l-2 border-indigo-300 pl-3.5 italic text-xs text-indigo-900 font-bold bg-indigo-50/50 p-2.5 rounded-r-xl">
                              {section.quote}
                            </blockquote>

                            <p className="text-xs text-gray-600 leading-relaxed font-medium">
                              {section.text}
                            </p>
                          </div>
                        );
                      }

                      return null;
                    })}
                  </>
                )}

              </div>

            </motion.div>
          )}

          {/* WORKSHEET FORM TAB */}
          {activeSubTab === 'worksheet' && (
            <motion.div
              key="worksheet-tab"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              
              {/* Left Column: Form Fields & Interactive Actions (8 columns) */}
              <div className="lg:col-span-8 space-y-6">
                
                <div className="space-y-1">
                  <h1 className="text-xl font-black text-gray-950 tracking-tight">{content.worksheet.title}</h1>
                  <p className="text-xs text-gray-500 font-medium">{content.worksheet.desc}</p>
                </div>

                {/* Role and Submission Switcher for Teachers */}
                {role === 'teacher' && (
                  <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-blue-900">🎓 教師檢視學生：</span>
                      <select 
                        value={selectedStudentId}
                        onChange={(e) => setSelectedStudentId(e.target.value)}
                        className="text-xs font-bold p-1.5 rounded-lg border border-gray-200 outline-none focus:border-blue-500"
                      >
                        {submissions.map(sub => (
                          <option key={sub.studentId} value={sub.studentId}>
                            {sub.studentName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="text-[11px] text-blue-700 font-extrabold bg-white px-3 py-1 rounded-full border border-blue-100">
                      {isSubmitted ? "🟢 學生已提交此單元" : "🟡 學生尚未提交此單元"}
                    </div>
                  </div>
                )}

                {/* Actual Worksheet Form */}
                <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-6 shadow-2xs">
                  
                  {content.worksheet.questions.map((q) => {
                    
                    // HEADER RENDER
                    if (q.type === "header") {
                      return (
                        <div key={q.id} className="pt-4 border-t border-slate-100 first:border-t-0 my-4">
                          <h3 className="text-xs font-black text-blue-900 flex items-center gap-1.5 bg-blue-50/50 p-2.5 rounded-xl border border-blue-100">
                            {q.label}
                          </h3>
                        </div>
                      );
                    }

                    // CHECKBOX GROUP RENDER
                    if (q.type === "checkbox_group") {
                      return (
                        <div key={q.id} className="space-y-3 my-4">
                          <h4 className="text-xs font-extrabold text-gray-800 leading-relaxed">
                            {q.label}
                          </h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                            {q.items?.map((cond, idx) => {
                              const key = `${q.id}_item_${idx}`;
                              const checked = !!answers[key];
                              return (
                                <label
                                  key={idx}
                                  className={`flex items-start gap-2 p-2 rounded-xl border text-xs font-semibold cursor-pointer transition-all select-none ${
                                    checked
                                      ? 'bg-amber-50 border-amber-300 text-amber-900 font-extrabold shadow-2xs'
                                      : 'bg-white border-gray-100 text-gray-600 hover:border-gray-200'
                                  }`}
                                >
                                  <input
                                    type="checkbox"
                                    disabled={role === 'teacher' || isSubmitted}
                                    checked={checked}
                                    onChange={(e) => {
                                      setAnswers(prev => ({ ...prev, [key]: e.target.checked }));
                                    }}
                                    className="mt-0.5 accent-amber-600"
                                  />
                                  <span>{cond}</span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }

                    // STAR RATING RENDER
                    if (q.type === "stars") {
                      return (
                        <div key={q.id} className="space-y-4">
                          <h4 className="text-xs font-extrabold text-gray-800 leading-relaxed">
                            {q.label}
                          </h4>
                          
                          <div className="bg-blue-50/70 p-3.5 rounded-2xl border border-blue-100 text-xs text-blue-800 space-y-1 my-3">
                            <p className="font-extrabold flex items-center gap-1.5 text-blue-900">
                              <span>🎯</span> 【幸福五維度自我評估】規則與引導：
                            </p>
                            <ul className="list-disc pl-4.5 space-y-1 text-[11px] text-blue-700 font-medium">
                              <li><strong>遊戲規則：</strong>請誠實針對「哲思力、自我認同、韌性抗挫、價值思辨、內在平靜」這五大核心生命維度點選 1 到 5 顆星（星星越多代表您的心靈狀態越飽滿）。</li>
                              <li><strong>引導方法：</strong>誠實是生命教育最棒的起點，這裡沒有標準答案或分數好壞，而是協助你找出這學期最想灌溉的生命領域。</li>
                            </ul>
                          </div>

                          <div className="space-y-3.5 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                            {q.categories?.map((cat) => {
                              const rating = answers[cat.key] || 0;
                              return (
                                <div key={cat.key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100/30 pb-2">
                                  <span className="text-xs font-bold text-gray-600">{cat.label}</span>
                                  <div className="flex items-center gap-1.5">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <button
                                        key={star}
                                        disabled={role === 'teacher' || isSubmitted}
                                        onClick={() => {
                                          setAnswers(prev => ({ ...prev, [cat.key]: star }));
                                        }}
                                        className={`p-0.5 rounded-md transition-all ${
                                          role === 'student' && !isSubmitted ? 'hover:scale-110' : ''
                                        }`}
                                      >
                                        <Star 
                                          className={`w-5 h-5 ${
                                            star <= rating 
                                              ? 'text-amber-400 fill-amber-400' 
                                              : 'text-gray-200'
                                          }`} 
                                        />
                                      </button>
                                    ))}
                                    <span className="text-xs font-extrabold text-blue-600 font-sans ml-1.5 w-4">
                                      {rating}
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }

                    // MATCHING Scenario RENDER
                    if (q.type === "matching") {
                      return (
                        <div key={q.id} className="space-y-4">
                          <h4 className="text-xs font-extrabold text-gray-800 leading-relaxed">
                            {q.label}
                          </h4>

                          <div className="bg-purple-50/70 p-3.5 rounded-2xl border border-purple-100 text-xs text-purple-800 space-y-1 my-3">
                            <p className="font-extrabold flex items-center gap-1.5 text-purple-900">
                              <span>🎯</span> 【日常邏輯謬誤連連看】規則與引導：
                            </p>
                            <ul className="list-disc pl-4.5 space-y-1 text-[11px] text-purple-700 font-medium">
                              <li><strong>遊戲規則：</strong>請仔細閱讀日常生活中陳可華與同學們對話的具體情境，在下拉選單中指認出對應的思考陷阱（如：訴諸群眾、人身攻擊、滑坡謬誤）。</li>
                              <li><strong>思辨方法：</strong>對照課本第 028 ~ 033 頁來釐清概念。看清這些邏輯漏洞，就能幫大腦裝上最好的「防毒軟體」，建立獨立判斷的能力！</li>
                            </ul>
                          </div>

                          <div className="space-y-3 bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                            {q.options?.map((opt, oidx) => {
                              const chosen = answers[`match_${oidx}`] || '';
                              return (
                                <div key={oidx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100/50 pb-2.5">
                                  <p className="text-xs font-medium text-slate-700 italic">
                                    {opt.scenario}
                                  </p>
                                  <select
                                    disabled={role === 'teacher' || isSubmitted}
                                    value={chosen}
                                    onChange={(e) => {
                                      setAnswers(prev => ({ ...prev, [`match_${oidx}`]: e.target.value }));
                                    }}
                                    className="text-xs font-bold p-1.5 rounded-lg border border-gray-200 outline-none focus:border-blue-500 bg-white"
                                  >
                                    <option value="">--請選擇邏輯謬誤--</option>
                                    {q.choices?.map((c, cidx) => (
                                      <option key={cidx} value={c}>{c}</option>
                                    ))}
                                  </select>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }

                    // STANDARD TEXTAREA RENDER
                    if (q.type === "textarea") {
                      return (
                        <div key={q.id} className="space-y-2">
                          <h4 className="text-xs font-extrabold text-gray-800 leading-relaxed">
                            {q.label}
                          </h4>
                          <textarea
                            disabled={role === 'teacher' || isSubmitted}
                            rows={3}
                            value={answers[q.id] || ''}
                            onChange={(e) => {
                              setAnswers(prev => ({ ...prev, [q.id]: e.target.value }));
                            }}
                            placeholder={q.placeholder}
                            className="w-full text-xs p-3 rounded-xl border border-gray-200 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/10 leading-relaxed font-medium bg-white disabled:bg-gray-50/80 disabled:text-gray-500"
                          />
                        </div>
                      );
                    }

                    return null;
                  })}

                  {/* Action Controls for Students */}
                  {role === 'student' && (
                    <div className="flex justify-between items-center border-t border-gray-50 pt-4 gap-4">
                      <span className="text-[10px] text-gray-400 font-bold">
                        {isSubmitted ? "🟢 已成功提交，等待老師批改！" : "💾 進度可隨時暫存或修改"}
                      </span>
                      
                      <div className="flex gap-2">
                        <button
                          disabled={isSubmitted}
                          onClick={() => handleSaveAnswers(false)}
                          className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-blue-600 font-bold text-xs rounded-xl border border-blue-100 flex items-center gap-1 transition-all disabled:opacity-50"
                        >
                          <Save className="w-3.5 h-3.5" />
                          暫存進度
                        </button>
                        <button
                          disabled={isSubmitted}
                          onClick={() => handleSaveAnswers(true)}
                          className="px-5 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs rounded-xl shadow-xs flex items-center gap-1 transition-all disabled:opacity-50"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          提交批改
                        </button>
                      </div>
                    </div>
                  )}

                </div>

                {/* Display Graded Feedback Block */}
                {currentUnitWorksheet.feedback && (
                  <div className="bg-gradient-to-r from-blue-500/10 via-indigo-500/5 to-white border border-blue-200 rounded-3xl p-5 shadow-2xs space-y-3">
                    <div className="flex justify-between items-center border-b border-blue-100/50 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">👩🏻‍🏫</span>
                        <div>
                          <h4 className="font-bold text-sm text-blue-950">老師批改反饋</h4>
                          <span className="text-[9px] text-gray-400">評閱時間：{currentUnitWorksheet.feedback.gradedAt}</span>
                        </div>
                      </div>
                      <div className="flex items-baseline gap-1 bg-blue-100/50 px-2.5 py-1 rounded-xl">
                        <span className="text-xs font-bold text-blue-700">評分:</span>
                        <span className="text-sm font-extrabold text-blue-800 font-sans">{currentUnitWorksheet.feedback.score}</span>
                      </div>
                    </div>

                    <p className="text-xs text-gray-600 leading-relaxed font-medium bg-white/70 p-3 rounded-xl border border-blue-50/50">
                      {currentUnitWorksheet.feedback.comments}
                    </p>

                    {currentUnitWorksheet.feedback.badges && currentUnitWorksheet.feedback.badges.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1">
                          <Award className="w-3.5 h-3.5 text-amber-500" />
                          獲得榮譽勳章：
                        </span>
                        {currentUnitWorksheet.feedback.badges.map((badge, bidx) => (
                          <span key={bidx} className="bg-amber-100 text-amber-800 font-extrabold text-[10px] px-2 py-0.5 rounded-full border border-amber-200 shadow-2xs">
                            🏅 {badge}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

              </div>

              {/* Right Column: Teacher Correction Center or Interactive Guide (4 columns) */}
              <div className="lg:col-span-4 space-y-6">
                
                {role === 'teacher' ? (
                  /* Teacher Feedback Correction Box */
                  <div className="bg-[#f8fafc] rounded-3xl border-2 border-dashed border-slate-200 p-5 space-y-4">
                    <h3 className="text-xs font-black text-slate-800 flex items-center gap-1.5 border-b border-slate-100 pb-2">
                      <UserCheck className="w-4.5 h-4.5 text-blue-600" />
                      教師點評評分中心
                    </h3>

                    <div className="space-y-3">
                      
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-gray-500 block">打分數 (0-100)：</label>
                        <input 
                          type="number"
                          value={teacherScore}
                          onChange={(e) => setTeacherScore(Number(e.target.value))}
                          className="w-full text-xs p-2 rounded-xl border border-gray-200 font-sans font-bold outline-none focus:border-blue-500 bg-white"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-gray-500 block">頒發生命勳章：</label>
                        <div className="flex flex-wrap gap-1.5">
                          {["勇敢追夢中", "思考小高手", "韌性練習中", "未來的自己"].map((badge) => {
                            const isSelected = teacherBadges.includes(badge);
                            return (
                              <button
                                key={badge}
                                onClick={() => {
                                  if (isSelected) {
                                    setTeacherBadges(teacherBadges.filter(b => b !== badge));
                                  } else {
                                    setTeacherBadges([...teacherBadges, badge]);
                                  }
                                }}
                                className={`text-[9px] font-extrabold px-2.5 py-1 rounded-full border transition-all ${
                                  isSelected 
                                    ? 'bg-amber-100 border-amber-300 text-amber-800 shadow-2xs' 
                                    : 'bg-white border-slate-200 text-slate-400 hover:border-slate-300'
                                }`}
                              >
                                🏅 {badge}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between items-center">
                          <label className="text-[11px] font-bold text-gray-500 block">評語與引導點評：</label>
                          <button
                            disabled={isAiGrading}
                            onClick={handleAiGrading}
                            className="text-[9px] text-blue-600 hover:text-blue-800 font-black flex items-center gap-0.5"
                          >
                            <Sparkles className="w-3 h-3 text-amber-500 fill-amber-100" />
                            {isAiGrading ? "AI生成中..." : "AI協同點評"}
                          </button>
                        </div>
                        <textarea 
                          rows={6}
                          value={teacherComments}
                          onChange={(e) => setTeacherComments(e.target.value)}
                          placeholder="請寫下您對學生這份生命自評與反思的鼓勵評語..."
                          className="w-full text-xs p-2.5 rounded-xl border border-gray-200 outline-none focus:border-blue-500 bg-white leading-relaxed font-medium"
                        />
                      </div>

                      <button
                        onClick={handleTeacherSubmitFeedback}
                        className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5"
                      >
                        <UserCheck className="w-4 h-4" />
                        送出批改與回饋
                      </button>

                    </div>
                  </div>
                ) : (
                  /* Student Companion Advice Box */
                  <div className="bg-blue-50/20 border border-blue-100 rounded-3xl p-5 space-y-4">
                    <h3 className="text-xs font-bold text-blue-950 flex items-center gap-1">
                      <HelpCircle className="w-4 h-4 text-blue-600" />
                      學習單填寫心法
                    </h3>
                    
                    <div className="space-y-3.5 text-[11px] text-gray-600 font-medium leading-relaxed">
                      <p>
                        <strong>❤️ 不要害怕完美：</strong> 生命教育沒有唯一的正確答案，林老師最想看見的是你與內心最誠實的對話。
                      </p>
                      <p>
                        <strong>💭 結合日常經驗：</strong> 試著回顧自己高中或過去的具體故事，具體的故事比抽象的空話更具有自我治癒的力量。
                      </p>
                      <p>
                        <strong>🔒 100% 同步保障：</strong> 你的回答會即時傳送到林老師的儀表板。你可以暫存，也可以多次修改！
                      </p>
                    </div>
                  </div>
                )}

              </div>

            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
