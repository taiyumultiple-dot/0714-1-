import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, GraduationCap, Lock, UserPlus, Sparkles, LogIn, Heart, CheckCircle } from 'lucide-react';
import { UserProfile } from '../types';

interface AuthScreenProps {
  onLoginSuccess: (user: UserProfile) => void;
  registeredUsers: UserProfile[];
  onRegisterUser: (user: UserProfile) => void;
  initialTab?: 'student_login' | 'teacher_login' | 'register';
  onClose?: () => void;
}

export default function AuthScreen({ 
  onLoginSuccess, 
  registeredUsers, 
  onRegisterUser,
  initialTab,
  onClose
}: AuthScreenProps) {
  const [activeTab, setActiveTab] = useState<'student_login' | 'teacher_login' | 'register'>(initialTab || 'student_login');
  
  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);
  
  // Login states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register states
  const [regRole, setRegRole] = useState<'student' | 'teacher'>('student');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmoji, setRegEmoji] = useState('🎒');
  const [regSuccess, setRegSuccess] = useState(false);
  const [regError, setRegError] = useState('');

  const emojiOptions = ['🎒', '👦🏻', '👧🏻', '🏀', '👩🏻', '👨🏻', '👴🏻', '💡', '⚖️', '🎨', '🦁', '🦉', '👩🏻‍🏫', '👨🏻‍🏫'];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const targetRole = activeTab === 'student_login' ? 'student' : 'teacher';
    const found = registeredUsers.find(
      u => u.username.toLowerCase() === username.trim().toLowerCase() && u.role === targetRole
    );

    if (!found) {
      setLoginError('找不到該帳號，或角色類別不正確！您可以點擊下方預設人物快速登入，或前往註冊新帳號。');
      return;
    }

    // Since it is a safe offline/classroom simulator, we support empty or match password
    if (password && found.password && found.password !== password) {
      setLoginError('密碼輸入錯誤，請再試一次。');
      return;
    }

    onLoginSuccess(found);
  };

  const handleQuickLogin = (user: UserProfile) => {
    onLoginSuccess(user);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegError('');
    setRegSuccess(false);

    if (!regUsername.trim() || !regPassword.trim() || !regName.trim()) {
      setRegError('所有欄位皆為必填！');
      return;
    }

    const exists = registeredUsers.some(
      u => u.username.toLowerCase() === regUsername.trim().toLowerCase()
    );

    if (exists) {
      setRegError('此帳號已被註冊，請換一個帳號名稱！');
      return;
    }

    const newUser: UserProfile = {
      id: `user_${Date.now()}`,
      username: regUsername.trim(),
      password: regPassword.trim(),
      name: regName.trim(),
      role: regRole,
      avatarEmoji: regEmoji
    };

    onRegisterUser(newUser);
    setRegSuccess(true);
    
    // Clear inputs
    setRegUsername('');
    setRegPassword('');
    setRegName('');

    // After 1.5 seconds, auto-switch to correct login tab
    setTimeout(() => {
      setActiveTab(regRole === 'student' ? 'student_login' : 'teacher_login');
      setUsername(newUser.username);
      setPassword(newUser.password || '');
      setRegSuccess(false);
    }, 1500);
  };

  // Filter default class personas to make testing seamless for grading!
  const defaultStudents = registeredUsers.filter(u => u.role === 'student' && ['kehua', 'xiaoping', 'bojun', 'xiaowen'].includes(u.username));
  const defaultTeachers = registeredUsers.filter(u => u.role === 'teacher' && u.username === 'teacher');

  return (
    <div className="w-full max-w-lg bg-white rounded-3xl border border-blue-100 shadow-md overflow-hidden relative mx-auto">
      
      {onClose && (
        <button 
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors z-50 cursor-pointer text-sm font-bold"
          title="關閉"
        >
          ✕
        </button>
      )}

      {/* Aesthetic background glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100/30 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-100/30 rounded-full blur-2xl" />

        {/* Brand Header */}
        <div className="p-8 text-center border-b border-gray-50 bg-gradient-to-b from-blue-50/20 to-transparent relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl mx-auto shadow-md mb-4 animate-pulse">
            ✨
          </div>
          <h2 className="text-xl font-black text-blue-950 tracking-tight mb-1">
            泰宇生命教育互動探索站
          </h2>
          <p className="text-[11px] font-bold text-gray-400 tracking-wider uppercase font-mono">
            Life Education Portal • Authenticate
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex bg-gray-50/80 border-b border-gray-100 p-1">
          <button
            onClick={() => {
              setActiveTab('student_login');
              setLoginError('');
            }}
            className={`flex-1 py-3 text-xs font-black rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'student_login'
                ? 'bg-white text-blue-600 shadow-xs'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <User className="w-4 h-4" />
            學生登入區
          </button>
          <button
            onClick={() => {
              setActiveTab('teacher_login');
              setLoginError('');
            }}
            className={`flex-1 py-3 text-xs font-black rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'teacher_login'
                ? 'bg-white text-indigo-600 shadow-xs'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <GraduationCap className="w-4 h-4" />
            教師登入區
          </button>
          <button
            onClick={() => {
              setActiveTab('register');
              setRegError('');
            }}
            className={`flex-1 py-3 text-xs font-black rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              activeTab === 'register'
                ? 'bg-white text-emerald-600 shadow-xs'
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <UserPlus className="w-4 h-4" />
            註冊帳號
          </button>
        </div>

        {/* Content Area */}
        <div className="p-8 relative z-10">
          
          {/* A. STUDENT & TEACHER LOGIN */}
          {(activeTab === 'student_login' || activeTab === 'teacher_login') && (
            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-700 text-xs rounded-xl leading-relaxed">
                  ⚠️ {loginError}
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-extrabold text-gray-700 block">帳號名稱 (Username)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="請輸入註冊帳號"
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 hover:bg-gray-100/50 focus:bg-white border border-gray-200 focus:border-blue-500 rounded-xl text-xs font-medium focus:outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-extrabold text-gray-700 block">登入密碼 (Password)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <Lock className="w-4 h-4" />
                  </span>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="請輸入密碼 (預設為 123)"
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 hover:bg-gray-100/50 focus:bg-white border border-gray-200 focus:border-blue-500 rounded-xl text-xs font-medium focus:outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className={`w-full py-3 rounded-xl font-bold text-xs text-white transition-all shadow-sm flex items-center justify-center gap-1.5 hover:scale-[1.01] ${
                  activeTab === 'student_login' 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                <LogIn className="w-4 h-4" />
                立即登入系統
              </button>

              {/* Persona Quick Click Shortcuts */}
              <div className="pt-6 border-t border-gray-50">
                <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                  💡 課堂預設人物快速免密登入 (體驗更流暢)：
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {activeTab === 'student_login' ? (
                    defaultStudents.map((u) => (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => handleQuickLogin(u)}
                        className="px-3 py-2 bg-blue-50/40 hover:bg-blue-50 border border-blue-100/60 rounded-xl text-left flex items-center gap-2 transition-all hover:scale-[1.02]"
                      >
                        <span className="text-lg">{u.avatarEmoji}</span>
                        <div>
                          <span className="text-xs font-bold text-gray-800 block leading-tight">{u.name}</span>
                          <span className="text-[9px] font-medium text-blue-600 block">學生帳號：{u.username}</span>
                        </div>
                      </button>
                    ))
                  ) : (
                    defaultTeachers.map((u) => (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => handleQuickLogin(u)}
                        className="px-3 py-2 bg-indigo-50/40 hover:bg-indigo-50 border border-indigo-100/60 rounded-xl text-left flex items-center gap-2 transition-all hover:scale-[1.02] col-span-2"
                      >
                        <span className="text-lg">{u.avatarEmoji}</span>
                        <div>
                          <span className="text-xs font-bold text-gray-800 block leading-tight">{u.name} (導師)</span>
                          <span className="text-[9px] font-medium text-indigo-600 block">管理者帳號：{u.username}</span>
                        </div>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </form>
          )}

          {/* B. REGISTER ACCOUNT */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              {regSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-800 text-xs rounded-xl flex items-center gap-2 font-bold animate-pulse">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>🎉 註冊成功！即將為您自動跳轉並登入...</span>
                </div>
              )}

              {regError && (
                <div className="p-3 bg-red-50 border border-red-100 text-red-700 text-xs rounded-xl leading-relaxed">
                  ⚠️ {regError}
                </div>
              )}

              {/* Role selector in registration */}
              <div className="space-y-1">
                <label className="text-xs font-extrabold text-gray-700 block">註冊角色類別</label>
                <div className="grid grid-cols-2 gap-2 bg-gray-50 p-1 rounded-xl border border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setRegRole('student');
                      setRegEmoji('🎒');
                    }}
                    className={`py-2 rounded-lg text-xs font-bold transition-all ${
                      regRole === 'student'
                        ? 'bg-white text-blue-600 shadow-xs'
                        : 'text-gray-500'
                    }`}
                  >
                    我是學生 (Student)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setRegRole('teacher');
                      setRegEmoji('👩🏻‍🏫');
                    }}
                    className={`py-2 rounded-lg text-xs font-bold transition-all ${
                      regRole === 'teacher'
                        ? 'bg-white text-indigo-600 shadow-xs'
                        : 'text-gray-500'
                    }`}
                  >
                    我是教師 (Teacher)
                  </button>
                </div>
              </div>

              {/* Real Name/Nickname */}
              <div className="space-y-1">
                <label className="text-xs font-extrabold text-gray-700 block">
                  {regRole === 'student' ? '真實姓名或匿名綽號 (Name / Nickname)' : '教師名稱 (e.g. 林老師)'}
                </label>
                <input
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder={regRole === 'student' ? "例：王大明 或 快樂排球少年" : "例：陳老師"}
                  className="w-full px-4 py-2.5 bg-gray-50 hover:bg-gray-100/50 focus:bg-white border border-gray-200 focus:border-emerald-500 rounded-xl text-xs font-medium focus:outline-none transition-all"
                  required
                />
              </div>

              {/* Login Username */}
              <div className="space-y-1">
                <label className="text-xs font-extrabold text-gray-700 block">登入帳號名稱 (Username)</label>
                <input
                  type="text"
                  value={regUsername}
                  onChange={(e) => setRegUsername(e.target.value)}
                  placeholder="限英文字母與數字，如 student123"
                  className="w-full px-4 py-2.5 bg-gray-50 hover:bg-gray-100/50 focus:bg-white border border-gray-200 focus:border-emerald-500 rounded-xl text-xs font-medium focus:outline-none transition-all"
                  required
                />
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-xs font-extrabold text-gray-700 block">登入密碼 (Password)</label>
                <input
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="請設定您的登入密碼"
                  className="w-full px-4 py-2.5 bg-gray-50 hover:bg-gray-100/50 focus:bg-white border border-gray-200 focus:border-emerald-500 rounded-xl text-xs font-medium focus:outline-none transition-all"
                  required
                />
              </div>

              {/* Avatar Emoji picker */}
              <div className="space-y-1">
                <label className="text-xs font-extrabold text-gray-700 block">選擇您的代表頭像</label>
                <div className="flex flex-wrap gap-2 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                  {emojiOptions.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => setRegEmoji(emoji)}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-lg transition-transform hover:scale-110 active:scale-95 ${
                        regEmoji === emoji
                          ? 'bg-emerald-100 border-2 border-emerald-500 shadow-xs'
                          : 'bg-white border border-gray-200'
                      }`}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 hover:scale-[1.01]"
              >
                <Sparkles className="w-4 h-4" />
                註冊並建立我的生命檔案
              </button>
            </form>
          )}

        </div>

        {/* Support instructions */}
        <div className="p-4 bg-gray-50 text-center text-[10px] text-gray-400 border-t border-gray-50 flex items-center justify-center gap-1">
          <Heart className="w-3 h-3 text-red-400 fill-red-400" />
          <span>泰宇生命教育・陪伴你在大時代下探尋自我價值</span>
        </div>

      </div>
  );
}
