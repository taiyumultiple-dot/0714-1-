import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Character } from '../types';

interface CharacterAvatarModalProps {
  character: Character;
  onClose: () => void;
  onSave: (newUrl: string) => void;
}

export default function CharacterAvatarModal({ character, onClose, onSave }: CharacterAvatarModalProps) {
  const [imageUrl, setImageUrl] = useState(character.avatarUrl || '');
  const [dragActive, setDragActive] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrorMsg('圖片大小不可超過 2MB');
        return;
      }
      setErrorMsg('');
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrorMsg('圖片大小不可超過 2MB');
        return;
      }
      setErrorMsg('');
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setImageUrl(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(imageUrl);
  };

  const handleReset = () => {
    setImageUrl('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-white rounded-3xl border border-slate-100 shadow-2xl max-w-md w-full p-6 relative overflow-hidden"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors text-lg font-bold"
        >
          ✕
        </button>

        <div className="space-y-5">
          <div className="text-center space-y-1">
            <span className="text-xs bg-blue-50 text-blue-600 font-bold px-2.5 py-0.5 rounded-full">
              實時雲端相片同步
            </span>
            <h3 className="text-base font-extrabold text-blue-950">
              更新 {character.name} 的頭像照片
            </h3>
            <p className="text-[10px] text-slate-400">
              上傳本地相片，系統將自動編碼並即時同步到所有首頁關係圖、家庭陪伴卡與特展海報中。
            </p>
          </div>

          {/* Circular Preview Area */}
          <div className="flex justify-center py-2">
            <div className="w-24 h-24 rounded-full border-4 border-blue-50 bg-slate-50 shadow-inner overflow-hidden flex items-center justify-center relative group">
              {imageUrl ? (
                <img src={imageUrl} className="w-full h-full object-cover" alt="大頭照預覽" />
              ) : (
                <span className="text-5xl">{character.avatarEmoji || '👤'}</span>
              )}
            </div>
          </div>

          {/* Drag and Drop Zone */}
          <div 
            onDragEnter={handleDrag}
            onDragOver={handleDrag}
            onDragLeave={handleDrag}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all relative ${
              dragActive 
                ? 'border-blue-500 bg-blue-50/50 scale-[1.01]' 
                : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50/50'
            }`}
          >
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
            />
            <div className="space-y-1">
              <div className="text-xl">📸</div>
              <p className="text-xs font-bold text-slate-700">拖曳照片到這裡，或 <span className="text-blue-600">點擊上傳</span></p>
              <p className="text-[9px] text-slate-400">支援 JPG, PNG, GIF 等格式 (最大 2MB)</p>
            </div>
          </div>

          {/* Error message */}
          {errorMsg && (
            <p className="text-[10px] text-red-500 font-bold text-center">{errorMsg}</p>
          )}

          {/* URL Input field */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 block">或貼上外部圖片網址 (Image URL)</label>
            <input 
              type="text" 
              value={imageUrl} 
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/photo.jpg" 
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700"
            />
          </div>

          {/* Modal Action Buttons */}
          <div className="flex gap-2.5 pt-2">
            <button 
              onClick={handleReset}
              className="flex-1 py-2 text-xs font-bold text-slate-500 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all border border-slate-200"
            >
              恢復預設值
            </button>
            <button 
              onClick={handleSave}
              className="flex-1 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition-all shadow-sm"
            >
              儲存並同步
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
