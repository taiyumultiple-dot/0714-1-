/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, HeartHandshake, Search, UsersRound } from 'lucide-react';
import { CHARACTERS } from '../data';
import { Character } from '../types';
import storyHeroPair from '../assets/images/characters/story_hero_pair.png';
import kehuaImg from '../assets/images/characters/char_kehua.jpg';
import xiaopingImg from '../assets/images/characters/char_xiaoping.jpg';
import xiaowenImg from '../assets/images/characters/char_xiaowen.jpg';
import bojunImg from '../assets/images/characters/char_bojun.jpg';
import dadImg from '../assets/images/characters/char_dad.jpg';
import grandpaImg from '../assets/images/characters/char_grandpa.jpg';

interface CharacterStoryTabProps {
  characters?: Character[];
  onNavigate?: (tab: string) => void;
}

type StoryCharacter = {
  id: string;
  name: string;
  role: string;
  subtitle: string;
  traits: string[];
  bio: string;
  image: string;
};

const portraitById: Record<string, string> = {
  char_kehua: kehuaImg,
  char_xiaoping: xiaopingImg,
  char_xiaowen: xiaowenImg,
  char_bojun: bojunImg,
  char_dad: dadImg,
  char_grandpa: grandpaImg
};

const storyCharacters: StoryCharacter[] = [
  {
    id: 'char_kehua',
    name: '陳可華',
    role: '班長',
    subtitle: '高中一年級學生',
    traits: ['溫和細心', '善於觀察', '有時猶豫'],
    bio: '可華是班上的班長，做事細心負責，總是默默關心身邊的人。他不太擅長表達自己的想法，但會用行動來關心同學。面對選擇時，他有時會猶豫，希望能做出最好的決定。',
    image: kehuaImg
  },
  {
    id: 'char_bojun',
    name: '王博鈞',
    role: '康樂股長',
    subtitle: '熱情幽默 樂觀積極',
    traits: ['樂觀開朗', '熱心助人', '愛開玩笑'],
    bio: '博鈞是班上的開心果，喜歡籃球，也很會帶動氣氛。遇到困難時，他常用幽默讓大家放鬆，但也在學習如何把熱情變成更穩定的行動。',
    image: bojunImg
  },
  {
    id: 'char_xiaowen',
    name: '王小文',
    role: '學霸「博士」',
    subtitle: '善解人意 心思細膩',
    traits: ['認真負責', '思考細膩', '主見穩重'],
    bio: '小文認真穩重，擅長分析問題，也常成為同學們請教的對象。她追求真理與知識，在關係中學習柔軟地理解別人的感受。',
    image: xiaowenImg
  },
  {
    id: 'char_xiaoping',
    name: '張曉萍',
    role: '副班長',
    subtitle: '活潑開朗 樂於助人',
    traits: ['同理心強', '善解人意', '意志堅定'],
    bio: '曉萍溫柔又有活力，擅長傾聽，也願意主動照顧身邊的人。她在關係中學習同理與界線，讓善意成為支持彼此成長的力量。',
    image: xiaopingImg
  },
  {
    id: 'char_dad',
    name: '可華爸爸',
    role: '家庭支持',
    subtitle: '穩重可靠 給予方向與支持',
    traits: ['成熟穩重', '關愛包容'],
    bio: '可華爸爸用開明與穩定的陪伴支持孩子，在可華迷惘時給予方向，也提醒他相信自己的判斷。',
    image: dadImg
  },
  {
    id: 'char_grandpa',
    name: '可華爺爺',
    role: '家庭支持',
    subtitle: '溫暖慈愛 陪伴與鼓勵成長',
    traits: ['慈祥智慧', '經驗豐富', '樂觀豁達'],
    bio: '可華爺爺常用人生故事啟發可華，讓他從不同角度理解生命，也學會珍惜當下與身邊的人。',
    image: grandpaImg
  }
];

const relationCopy: Record<string, { title: string; body: string }> = {
  kehua: {
    title: '每一段關係，都是青春對話的縮影。',
    body: '透過理解與陪伴，我們發現生命的意義與成長的力量。'
  },
  xiaoping: {
    title: '溫柔的陪伴，讓關係有了前進的力量。',
    body: '曉萍的同理心讓同學感到被理解，也提醒大家在關係中學習照顧彼此。'
  },
  xiaowen: {
    title: '理性與細膩，能讓對話更靠近真實。',
    body: '小文帶來穩定的思考，也讓青春關係多了一份清楚與理解。'
  },
  bojun: {
    title: '歡笑與行動，能把關心變成具體支持。',
    body: '博鈞的熱情讓團體更有活力，也讓同學們在互動中看見樂觀的價值。'
  }
};

export default function CharacterStoryTab({ characters: propCharacters }: CharacterStoryTabProps) {
  const activeCharacters = (propCharacters && propCharacters.length > 0) ? propCharacters : CHARACTERS;
  const [selectedId, setSelectedId] = useState('char_kehua');
  const selected = storyCharacters.find((character) => character.id === selectedId) || storyCharacters[0];
  const selectedSource = activeCharacters.find((character) => character.id === selected.id);
  const relationship = selected.id.includes('xiaoping')
    ? relationCopy.xiaoping
    : selected.id.includes('xiaowen')
      ? relationCopy.xiaowen
      : selected.id.includes('bojun')
        ? relationCopy.bojun
        : relationCopy.kehua;

  return (
    <div className="role-story-page">
      <style>{styles}</style>

      <section className="role-hero">
        <div className="role-hero-copy">
          <h1>角色故事｜青春關係圖</h1>
          <p>透過角色互動，一起探索生命中的重要課題與人際關係。</p>
        </div>
        <img src={storyHeroPair} alt="張曉萍與陳可華" />
      </section>

      <section className="role-grid">
        <div className="relation-map card-panel">
          <h2>青春關係圖</h2>
          <div className="map-canvas">
            <svg className="relation-lines" viewBox="0 0 700 350" aria-hidden="true">
              <line x1="156" y1="88" x2="544" y2="88" className="line-orange" />
              <line x1="156" y1="88" x2="544" y2="268" className="line-purple dashed" />
              <line x1="544" y1="88" x2="156" y2="268" className="line-purple dashed" />
              <line x1="156" y1="268" x2="544" y2="268" className="line-green dashed" />
              <line x1="156" y1="88" x2="156" y2="268" className="line-blue" />
              <line x1="544" y1="88" x2="544" y2="268" className="line-blue" />
            </svg>

            <button onClick={() => setSelectedId('char_xiaoping')} className={`map-card top-left ${selected.id === 'char_xiaoping' ? 'active' : ''}`}>
              <div><strong>張曉萍</strong><span>活潑開朗<br />樂於助人</span></div>
              <img src={xiaopingImg} alt="張曉萍" />
            </button>
            <button onClick={() => setSelectedId('char_kehua')} className={`map-card top-right ${selected.id === 'char_kehua' ? 'active' : ''}`}>
              <img src={kehuaImg} alt="陳可華" />
              <div><strong>陳可華</strong><span>溫和細心<br />善於觀察</span></div>
            </button>
            <button onClick={() => setSelectedId('char_xiaowen')} className={`map-card bottom-left ${selected.id === 'char_xiaowen' ? 'active' : ''}`}>
              <div><strong>王小文</strong><span>善解人意<br />心思細膩</span></div>
              <img src={xiaowenImg} alt="王小文" />
            </button>
            <button onClick={() => setSelectedId('char_bojun')} className={`map-card bottom-right ${selected.id === 'char_bojun' ? 'active' : ''}`}>
              <img src={bojunImg} alt="王博鈞" />
              <div><strong>王博鈞</strong><span>熱情幽默<br />樂觀積極</span></div>
            </button>

            <span className="relation-label label-friend">親密／好友</span>
            <span className="relation-label label-neighbor">鄰居關係</span>
            <span className="relation-label label-classmate-left">同學</span>
            <span className="relation-label label-classmate-right">同學</span>
            <span className="relation-label label-buddy">死黨</span>
          </div>

          <div className="family-strip">
            <div className="family-title"><HeartHandshake size={18} />家庭支持</div>
            <button onClick={() => setSelectedId('char_dad')} className="family-card">
              <img src={dadImg} alt="可華爸爸" />
              <div><strong>可華爸爸</strong><span>穩重可靠<br />給予方向與支持</span></div>
            </button>
            <button onClick={() => setSelectedId('char_grandpa')} className="family-card">
              <img src={grandpaImg} alt="可華爺爺" />
              <div><strong>可華爺爺</strong><span>溫暖慈愛<br />陪伴與鼓勵成長</span></div>
            </button>
          </div>
        </div>

        <aside className="story-side">
          <div className="insight-card card-panel">
            <HeartHandshake size={26} />
            <div>
              <h3>當前選取關係故事 <span>(RELATIONSHIP INSIGHT)</span></h3>
              <strong>{relationship.title}</strong>
              <p>{relationship.body}</p>
            </div>
          </div>

          <div className="selector-card card-panel">
            <h3><UsersRound size={14} />人物角色卡總覽</h3>
            <div className="pill-row">
              {storyCharacters.map((character) => (
                <button key={character.id} onClick={() => setSelectedId(character.id)} className={selected.id === character.id ? 'selected' : ''}>
                  {character.name}
                </button>
              ))}
            </div>
          </div>

          <div className="profile-card card-panel">
            <img src={portraitById[selected.id] || selected.image} alt={selected.name} />
            <div>
              <h2>{selected.name} <span>({selected.role})</span></h2>
              <small>{selectedSource?.isFamily ? '家庭支持角色' : selected.subtitle}</small>
              <div className="tags">
                {selected.traits.map((trait) => <span key={trait}># {trait}</span>)}
              </div>
              <p>{selected.bio}</p>
            </div>
          </div>
        </aside>
      </section>

      <section className="lesson-card card-panel">
        <div className="lesson-icon"><BookOpen size={28} /></div>
        <div>
          <h2>角色關係與生命課題</h2>
          <p>六位角色展現了青春中常見的不同生命主題，包括友誼、理解、溝通、責任、支持與選擇。在家庭、朋友與同儕的陪伴下，我們學會面對挑戰、建立自我，並在關係中找到成長的力量。</p>
        </div>
        <Search className="lesson-search" size={100} />
      </section>
    </div>
  );
}

const styles = `
.role-story-page{min-height:100vh;padding:22px;background:linear-gradient(180deg,#fffaf2 0%,#fff7eb 58%,#fffdf8 100%);color:#40200f;font-family:"Noto Serif TC","Noto Sans TC","Microsoft JhengHei",serif}.card-panel{border:1.5px solid #efc895;border-radius:20px;background:rgba(255,253,247,.92);box-shadow:0 12px 30px rgba(127,78,23,.06)}.role-hero{position:relative;display:grid;grid-template-columns:1.05fr .95fr;align-items:center;min-height:150px;border:1.5px solid #efc895;border-radius:18px;overflow:hidden;background:linear-gradient(90deg,#fff8eb 0%,#fffdf7 54%,#fff2dc 100%)}.role-hero:before,.role-hero:after{content:"";position:absolute;width:190px;height:190px;border-radius:50%;background:radial-gradient(circle,rgba(239,178,95,.24),transparent 68%)}.role-hero:before{left:-70px;top:-70px}.role-hero:after{right:160px;bottom:-110px}.role-hero-copy{position:relative;z-index:2;padding:24px 32px}.role-hero h1{font-size:32px;line-height:1.2;margin:0 0 10px;font-weight:900;letter-spacing:.04em}.role-hero p{font-family:"Noto Sans TC","Microsoft JhengHei",sans-serif;font-size:14px;font-weight:700;letter-spacing:.02em;margin:0}.role-hero img{height:150px;width:100%;object-fit:cover;object-position:center bottom;align-self:end}.role-grid{display:grid;grid-template-columns:1.06fr .94fr;gap:14px;margin:14px auto 14px;max-width:1240px}.relation-map{padding:16px 18px 14px}.relation-map h2{text-align:center;font-size:18px;font-weight:900;letter-spacing:.06em;margin:0 0 8px}.map-canvas{position:relative;height:350px;width:700px;max-width:100%;margin:0 auto;border-top:1px solid #f2ddc0}.relation-lines{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}.relation-lines line{stroke-width:3}.dashed{stroke-dasharray:8 8}.line-orange{stroke:#f08a2d}.line-purple{stroke:#9a6ad5}.line-green{stroke:#61a94f}.line-blue{stroke:#4a91dc}.map-card{position:absolute;width:200px;height:84px;border:1.5px solid #efc895;border-radius:16px;background:#fffdf8;display:grid;grid-template-columns:1fr 112px;align-items:center;gap:10px;padding:8px 10px;text-align:left;transition:.2s;box-shadow:0 6px 18px rgba(112,69,24,.07)}.map-card img{width:80px;height:68px;object-fit:cover;border-radius:10px;border:1px solid #efc895;background:#fff}.map-card strong{display:block;font-size:14px;font-weight:900;margin-bottom:4px}.map-card span{display:block;font-family:"Noto Sans TC","Microsoft JhengHei",sans-serif;font-size:10px;line-height:1.4;color:#6b4b35;font-weight:700}.map-card.active{border-color:#f97316;box-shadow:0 0 0 2px rgba(249,115,22,.14),0 12px 26px rgba(112,69,24,.1)}.top-left{left:26px;top:34px}.top-right{right:26px;top:34px;grid-template-columns:80px 1fr}.bottom-left{left:26px;bottom:28px}.bottom-right{right:26px;bottom:28px;grid-template-columns:80px 1fr}.relation-label{position:absolute;z-index:3;border-radius:999px;border:1px solid currentColor;background:#fff8ed;padding:3px 10px;font-family:"Noto Sans TC","Microsoft JhengHei",sans-serif;font-size:11px;font-weight:900}.label-friend{left:50%;top:75px;transform:translateX(-50%);color:#ef6d1f}.label-neighbor{left:50%;top:178px;transform:translateX(-50%);color:#8b66c9}.label-classmate-left{left:36px;top:169px;color:#3479c8}.label-classmate-right{right:42px;top:169px;color:#3479c8}.label-buddy{left:50%;bottom:54px;transform:translateX(-50%);color:#3a9b54}.family-strip{display:grid;grid-template-columns:90px 1fr 1fr;gap:8px;align-items:center;border:1.5px solid #efc895;border-radius:14px;padding:8px;background:#fff8ed;margin-top:12px}.family-title{display:flex;flex-direction:column;align-items:center;gap:3px;color:#d56719;font-weight:900;font-size:12px}.family-card{border:1px solid #efc895;border-radius:14px;background:#fffdf8;display:flex;align-items:center;gap:13px;padding:8px;text-align:left}.family-card img{width:80px;height:50px;object-fit:cover;border-radius:10px}.family-card strong{font-size:13px}.family-card span{font-size:11px;line-height:1.4;color:#6b4b35}.story-side{display:flex;flex-direction:column;gap:14px}.insight-card{display:flex;gap:12px;padding:14px 18px;align-items:center}.insight-card svg{color:#f07b1b;flex:0 0 auto}.insight-card h3{font-size:14px;font-weight:900;margin:0 0 5px}.insight-card h3 span{font-size:10px;letter-spacing:.04em}.insight-card strong{font-family:"Noto Sans TC","Microsoft JhengHei",sans-serif;font-size:13px}.insight-card p{font-family:"Noto Sans TC","Microsoft JhengHei",sans-serif;font-size:12px;line-height:1.6;margin:5px 0 0}.selector-card{padding:14px 18px}.selector-card h3{display:flex;align-items:center;gap:6px;margin:0 0 10px;font-size:14px;font-weight:900}.pill-row{display:flex;flex-wrap:wrap;gap:10px}.pill-row button{min-width:0;border:1px solid #efc895;border-radius:999px;background:#fffaf2;color:#5b3218;padding:6px 12px;font-weight:900;font-size:12px}.pill-row button.selected{background:#f58a22;color:white;border-color:#f58a22}.profile-card{display:grid;grid-template-columns:110px 1fr;gap:12px;padding:14px}.profile-card>img{width:110px;height:135px;object-fit:cover;border:1.5px solid #9fc7ee;border-radius:12px;background:#fff}.profile-card h2{font-size:18px;margin:0 0 4px;font-weight:900}.profile-card h2 span{font-size:13px}.profile-card small{display:block;font-size:11px;color:#6b7280;font-weight:700;margin-bottom:8px}.tags{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:8px}.tags span{border:1px solid #9fc7ee;background:#eef6ff;color:#2f6fb3;border-radius:999px;padding:3px 9px;font-family:"Noto Sans TC","Microsoft JhengHei",sans-serif;font-weight:900;font-size:10px}.profile-card p{font-family:"Noto Sans TC","Microsoft JhengHei",sans-serif;font-size:12px;line-height:1.6;margin:0;color:#43352b}.lesson-card{position:relative;display:flex;align-items:center;gap:16px;max-width:1240px;margin:0 auto;padding:16px 90px 16px 22px;overflow:hidden}.lesson-icon{width:60px;height:60px;border-radius:50%;border:6px solid #f7d7a2;display:flex;align-items:center;justify-content:center;color:#d87b1f;flex:0 0 auto}.lesson-card h2{font-size:18px;font-weight:900;margin:0 0 6px}.lesson-card p{font-family:"Noto Sans TC","Microsoft JhengHei",sans-serif;font-size:13px;line-height:1.6;margin:0}.lesson-search{position:absolute;right:28px;bottom:-28px;color:#e8c696;opacity:.55}@media(max-width:1180px){.role-hero,.role-grid{grid-template-columns:1fr}.role-hero img{height:240px}.map-canvas{height:390px}.map-card{width:235px}.profile-card{grid-template-columns:140px 1fr}.profile-card>img{width:140px;height:175px}}@media(max-width:760px){.role-story-page{padding:12px}.role-hero-copy{padding:24px}.role-hero h1{font-size:32px}.role-hero p{font-size:16px}.map-canvas{height:auto;display:grid;gap:12px;padding-top:12px}.relation-lines,.relation-label{display:none}.map-card{position:static;width:100%;grid-template-columns:1fr 120px}.family-strip{grid-template-columns:1fr}.profile-card{grid-template-columns:1fr}.profile-card>img{width:100%;height:240px}.lesson-card{padding:20px;align-items:flex-start}.lesson-search{display:none}}
`;