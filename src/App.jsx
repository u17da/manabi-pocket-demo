import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { FileText, Users, BookOpen, LayoutDashboard } from 'lucide-react';

// ページコンポーネントをインポート
import WeeklyReflection from './pages/WeeklyReflection';
import TeacherDashboard from './pages/TeacherDashboard';

// トップページ（デモ一覧）
function Home() {
  const demos = [
    {
      id: 'weekly-reflection',
      title: '単元振り返り（児童生徒用）',
      description: '理科「磁石の実験」の単元振り返りシート。児童生徒が学習を振り返り、AIコメントを受け取る機能のデモ。',
      icon: BookOpen,
      path: '/weekly-reflection',
      status: 'ready',
    },
    {
      id: 'teacher-dashboard',
      title: '単元振り返り（先生用）',
      description: 'クラス全体の振り返り状況を確認し、生徒へコメントを送信できる教師向けダッシュボード。',
      icon: LayoutDashboard,
      path: '/teacher-dashboard',
      status: 'ready',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            📚 まなびポケット UIモック
          </h1>
          <p className="text-lg text-gray-600">
            各機能のプロトタイプをご確認いただけます
          </p>
        </div>

        <div className="grid gap-6">
          {demos.map((demo) => {
            const IconComponent = demo.icon;
            const isReady = demo.status === 'ready';
            
            return (
              <div
                key={demo.id}
                className={`bg-white rounded-2xl shadow-lg p-6 border-2 transition-all ${
                  isReady 
                    ? 'border-transparent hover:border-blue-400 hover:shadow-xl' 
                    : 'border-gray-200 opacity-60'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${
                    isReady 
                      ? 'bg-gradient-to-br from-blue-500 to-indigo-500 text-white' 
                      : 'bg-gray-200 text-gray-400'
                  }`}>
                    <IconComponent size={28} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-xl font-bold text-gray-800">
                        {demo.title}
                      </h2>
                      {demo.status === 'wip' && (
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full font-semibold">
                          作成中
                        </span>
                      )}
                      {demo.status === 'planned' && (
                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-full font-semibold">
                          準備中
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">
                      {demo.description}
                    </p>
                    
                    {isReady ? (
                      <Link
                        to={demo.path}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-2 px-6 rounded-lg transition-all"
                      >
                        デモを見る →
                      </Link>
                    ) : (
                      <span className="inline-flex items-center gap-2 bg-gray-200 text-gray-400 font-semibold py-2 px-6 rounded-lg cursor-not-allowed">
                        準備中
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center text-sm text-gray-400">
          © NTT Docomo Business - まなびポケット
        </div>
      </div>
    </div>
  );
}

// メインApp（ルーター設定）
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weekly-reflection" element={<WeeklyReflection />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
