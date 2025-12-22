import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Send, CheckCircle2, Clock, Camera, Star, X, Users, Edit, AlertCircle, ChevronLeft, ChevronRight, Heart, Lightbulb, TrendingUp, Home } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function TeacherDashboard() {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentDetail, setShowStudentDetail] = useState(false);
  const [teacherComments, setTeacherComments] = useState({});
  const [tempComment, setTempComment] = useState('');
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [bulkComment, setBulkComment] = useState('');
  const [sendToInProgress, setSendToInProgress] = useState(false);
  const [statusFilter, setStatusFilter] = useState(null);
  const [showOnlyNoComment, setShowOnlyNoComment] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [unitGoal, setUnitGoal] = useState('磁石の性質について、実験を通して理解を深め、磁石の力や極の働きについて説明できるようになる');

  const unitInfo = { title: "磁石の実験", period: "2024年1月15日 - 2月7日", subject: "理科", icon: "🔬", grade: "3年2組" };

  // 生徒データを圧縮形式で定義
  const studentsData = [
    { id: 1, name: "田中 太郎", status: "submitted", chart: [[3,2],[4,5],[3,4],[2,3],[4,4],[5,5],[5,4],[5,2]], best: [2,0,"つくもの調べ①"], photos: [[2,"つくもの調べ②"],[3,"クリップ実験"],[6,"紙を通す実験"]], reflection: "磁石で色々なものがくっつくか実験するのがとても楽しかったです。最初は鉄だけかと思っていたけど、ステンレスはくっつかないものがあるのが不思議でした。N極とS極があって、同じ極だと退け合うのも面白かったです。", nextAction: "次は電気の実験でも、予想を立ててから確かめるようにしたいです。", aiComment: "実験を通して、予想と違う結果に気づけたことが素晴らしいですね。ステンレスの性質に疑問を持ったり、磁石の極について理解を深めたりと、科学的な思考が育っています。次の学習でも予想を立てる習慣を大切にしてください。", hasComment: true },
    { id: 2, name: "佐藤 花子", status: "submitted", chart: [[4,3],[5,4],[4,5],[3,4],[5,4],[5,5],[4,5],[4,3]], best: null, photos: [], reflection: "磁石の力が紙や木を通るのがすごくびっくりしました。鉄は通らないと分かって、もっと実験したくなりました。おもちゃ作りでは魚釣りゲームを作って、磁石の性質を使えて嬉しかったです。", nextAction: "もっといろいろな材料で磁石が通るか試してみたいです。", aiComment: "予想と違う結果に驚き、さらに探究したいという気持ちが素晴らしいです。おもちゃ作りで学んだことを活用できましたね。", hasComment: false },
    { id: 3, name: "鈴木 健太", status: "submitted", chart: [[2,3],[3,4],[4,3],[2,2],[3,3],[4,4],[4,3],[3,2]], best: [3,0,"クリップ実験"], photos: [[3,"力の強さ比較"],[5,"退け合う実験"],[7,"完成作品"]], reflection: "クリップで磁石の強さを比べるのが面白かった。数を数えて比べるのが分かりやすかったです。N極とS極は少し難しかったけど、実験したら分かりました。", nextAction: "難しいことも実験で確かめたいです。", aiComment: "数を数えて比較する科学的な方法ができましたね。難しい内容も実験で理解しようとする姿勢が良いです。", hasComment: false },
    { id: 4, name: "高橋 美咲", status: "notSubmitted", chart: [[4,4],[5,5],[4,4],[3,3],[4,4],[5,5],[5,4],[0,0]], best: [2,1,"つくもの調べ①"], photos: [[2,"発見したこと"],[6,"木を通す実験"]], reflection: "磁石で色々なものを調べるのが楽しかったです。", nextAction: "", aiComment: "", hasComment: false },
    { id: 5, name: "伊藤 大輔", status: "submitted", chart: [[3,2],[4,4],[3,3],[2,2],[4,3],[5,4],[4,4],[4,3]], best: [5,0,"引き合う実験"], photos: [[5,"極の観察"],[6,"鉄板での実験"],[7,"みんなで遊ぶ"]], reflection: "同じ極だと退け合うのが面白かった。違う極だとくっつくことが分かって、磁石の秘密が分かった気がします。", nextAction: "他にも磁石みたいなものがあるか調べたいです。", aiComment: "磁石の極のきまりを自分で発見できましたね。探究心が素晴らしいです。", hasComment: true },
    { id: 6, name: "渡辺 さくら", status: "submitted", chart: [[4,3],[5,5],[5,4],[3,4],[4,4],[5,5],[5,5],[5,4]], best: [7,0,"おもちゃ設計図"], photos: [[2,"つくもの調べ②"],[7,"制作途中"],[7,"完成作品"]], reflection: "おもちゃ作りが一番楽しかった。磁石でいろいろなものが作れることが分かりました。実験で学んだことを使えて嬉しかったです。", nextAction: "家でも磁石のおもちゃを作ってみたいです。", aiComment: "学んだことを創造的に活用できましたね。", hasComment: false },
    { id: 7, name: "山本 翔太", status: "notSubmitted", chart: [[2,2],[3,3],[3,2],[2,2],[3,2],[0,0],[0,0],[0,0]], best: null, photos: [], reflection: "", nextAction: "", aiComment: "", hasComment: false },
    { id: 8, name: "中村 結衣", status: "submitted", chart: [[3,3],[4,4],[4,4],[2,3],[4,4],[5,5],[4,4],[4,3]], best: null, photos: [], reflection: "磁石の力が物を通して伝わるのが不思議でした。鉄だけ通らないのはどうしてか気になります。", nextAction: "他の金属でも試してみたいです。", aiComment: "疑問を持つことが科学の第一歩です。", hasComment: false },
    { id: 9, name: "小林 陽斗", status: "submitted", chart: [[2,2],[3,3],[3,3],[2,2],[3,3],[4,4],[3,3],[3,2]], best: [4,0,"極の観察"], photos: [[4,"N極とS極"],[5,"きまりの発見"]], reflection: "N極とS極があることが分かりました。磁石は不思議だなと思いました。", nextAction: "もっと磁石のことを知りたいです。", aiComment: "磁石の性質に興味を持てましたね。", hasComment: false },
    { id: 10, name: "加藤 葵", status: "notSubmitted", chart: [[3,3],[4,4],[4,3],[2,3],[3,3],[0,0],[0,0],[0,0]], best: [2,0,"実験結果の記録"], photos: [[2,"つくもの調べ①"]], reflection: "", nextAction: "", aiComment: "", hasComment: false },
    { id: 11, name: "吉田 蓮", status: "submitted", chart: [[3,2],[4,5],[4,4],[3,3],[4,4],[5,5],[5,4],[4,3]], best: [2,2,"実験結果の記録"], photos: [[2,"発見したこと"],[5,"退け合う実験"],[6,"紙を通す実験"]], reflection: "実験がとても楽しかったです。予想と違うことが多くて、びっくりしました。", nextAction: "次も予想を立てて実験したいです。", aiComment: "予想と結果を比べる姿勢が良いですね。", hasComment: true },
    { id: 12, name: "岡田 心春", status: "submitted", chart: [[4,4],[5,5],[4,4],[3,4],[4,4],[5,5],[5,5],[4,4]], best: [6,2,"鉄板での実験"], photos: [[6,"紙を通す実験"],[7,"おもちゃ設計図"],[7,"完成作品"]], reflection: "磁石の実験で色々なことが分かりました。おもちゃ作りも楽しかったです。", nextAction: "電気の実験も楽しみです。", aiComment: "積極的に学習に取り組めましたね。", hasComment: false },
    { id: 13, name: "石川 悠真", status: "notSubmitted", chart: [[3,2],[3,3],[2,2],[0,0],[0,0],[0,0],[0,0],[0,0]], best: null, photos: [], reflection: "", nextAction: "", aiComment: "", hasComment: false },
    { id: 14, name: "松本 莉子", status: "notSubmitted", chart: [[3,3],[4,4],[3,3],[2,3],[3,3],[4,3],[0,0],[0,0]], best: [2,1,"つくもの調べ②"], photos: [[2,"つくもの調べ①"],[3,"クリップ実験"]], reflection: "磁石の実験は楽しかったです。", nextAction: "", aiComment: "", hasComment: false },
    { id: 15, name: "井上 颯太", status: "submitted", chart: [[3,3],[4,4],[4,4],[2,3],[4,4],[5,4],[4,4],[4,3]], best: [5,1,"退け合う実験"], photos: [[5,"引き合う実験"],[5,"極の観察"],[6,"木を通す実験"]], reflection: "磁石の極のきまりが分かって嬉しかったです。実験で確かめられました。", nextAction: "他の理科の実験も楽しみです。", aiComment: "きまりを発見できましたね。", hasComment: false },
    { id: 16, name: "木村 葵", status: "submitted", chart: [[4,3],[5,4],[4,4],[3,3],[4,4],[5,5],[5,4],[4,3]], best: null, photos: [], reflection: "磁石の力が伝わる実験が面白かったです。いろいろな材料で試せました。", nextAction: "もっと実験したいです。", aiComment: "実験を楽しめましたね。", hasComment: false },
    { id: 17, name: "林 悠斗", status: "notSubmitted", chart: [[2,2],[2,2],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]], best: null, photos: [], reflection: "", nextAction: "", aiComment: "", hasComment: false },
    { id: 18, name: "清水 花音", status: "submitted", chart: [[3,3],[4,4],[4,4],[3,3],[4,4],[5,5],[4,4],[4,3]], best: [7,1,"制作途中"], photos: [[7,"おもちゃ設計図"],[7,"完成作品"],[7,"みんなで遊ぶ"]], reflection: "おもちゃ作りが楽しかったです。学んだことを使えました。", nextAction: "家でも作りたいです。", aiComment: "創造的に活用できましたね。", hasComment: false },
    { id: 19, name: "山口 大樹", status: "submitted", chart: [[2,2],[3,3],[3,3],[2,2],[3,3],[4,4],[3,3],[3,2]], best: [3,1,"力の強さ比較"], photos: [[3,"クリップ実験"],[5,"きまりの発見"]], reflection: "磁石の強さを比べるのが面白かったです。数で比べられました。", nextAction: "他のことも数で比べたいです。", aiComment: "科学的な方法ができましたね。", hasComment: false },
    { id: 20, name: "斎藤 美月", status: "notSubmitted", chart: [[3,3],[4,4],[3,3],[2,2],[3,4],[0,0],[0,0],[0,0]], best: [2,0,"つくもの調べ①"], photos: [[2,"実験結果の記録"],[3,"力の強さ比較"]], reflection: "実験は楽しかったです。", nextAction: "", aiComment: "", hasComment: false }
  ];

  // データ展開関数
  const dates = ['1/15','1/18','1/22','1/25','1/29','2/1','2/5','2/7'];
  const expandStudent = (s) => ({
    ...s,
    chartData: s.chart.map((d,i) => ({ name: dates[i], lessonNumber: i+1, understanding: d[0], enjoyment: d[1] })),
    bestShot: s.best ? { lessonNumber: s.best[0], photoIndex: s.best[1], photoName: s.best[2] } : null,
    selectedPhotos: s.photos.map(p => ({ lessonNumber: p[0], photoName: p[1] })),
    hasTeacherComment: s.hasComment
  });

  const students = studentsData.map(expandStudent);

  const counts = { submitted: students.filter(s => s.status === 'submitted').length, notSubmitted: students.filter(s => s.status === 'notSubmitted').length };

  const handleSendComment = (studentId) => {
    setTeacherComments({ ...teacherComments, [studentId]: tempComment });
    setTempComment('');
    const student = students.find(s => s.id === studentId);
    if (student) student.hasTeacherComment = true;
    setSelectedStudent(null);
    alert('コメントを送信しました！');
  };

  const handleBulkComment = () => {
    const newComments = { ...teacherComments };
    const targetStudents = students.filter(s => sendToInProgress ? true : s.status === 'submitted');
    targetStudents.forEach(student => { if (!newComments[student.id]) { newComments[student.id] = bulkComment; student.hasTeacherComment = true; }});
    setTeacherComments(newComments);
    setBulkComment('');
    setSendToInProgress(false);
    setShowBulkModal(false);
    alert(`${Object.keys(newComments).length - Object.keys(teacherComments).length}名にコメントを送信しました！`);
  };

  const filteredStudents = students.filter(student => {
    if (statusFilter && student.status !== statusFilter) return false;
    if (showOnlyNoComment && student.hasTeacherComment) return false;
    return true;
  });

  const StatusCard = ({ status, count, color, icon: Icon, label, onClick, active }) => (
    <div onClick={onClick} className={`bg-gradient-to-br ${color} rounded-xl p-4 border-2 transition-all cursor-pointer hover:shadow-md ${active ? 'border-current shadow-md' : 'border-transparent'}`}>
      <div className="flex items-center gap-2 mb-2">
        <Icon size={20} className="text-current" />
        <span className="text-sm font-bold">{label}</span>
      </div>
      <div className="text-3xl font-bold">{count}人</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {currentPage === 'dashboard' ? (
          <>
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-4xl">{unitInfo.icon}</span>
                <h1 className="text-3xl font-bold text-gray-800">{unitInfo.title}</h1>
                <button 
                  onClick={() => setCurrentPage('analysis')}
                  className="ml-4 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2"
                >
                  <span>📊</span>
                  <span>単元の分析</span>
                </button>
              </div>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span className="font-semibold">{unitInfo.grade}</span>
                <span>|</span>
                <span>{unitInfo.subject}</span>
                <span>|</span>
                <span>{unitInfo.period}</span>
              </div>
            </div>
            <Link to="/" className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-semibold transition-all">
              <Home size={18} />
              トップへ
            </Link>
          </div>
          
          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl shadow-lg p-6 mb-6 border-2 border-green-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  単元の目標
                </h2>
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Users size={14} />
                  生徒に配信されます
                </span>
              </div>
              {!isEditingGoal ? (
                <button
                  onClick={() => setIsEditingGoal(true)}
                  className="bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shadow-sm hover:shadow-md"
                >
                  <Edit size={16} />
                  <span>編集</span>
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setIsEditingGoal(false);
                      alert('単元の目標を保存し、生徒に配信しました！');
                    }}
                    className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
                  >
                    <CheckCircle2 size={16} />
                    <span>保存して配信</span>
                  </button>
                  <button
                    onClick={() => {
                      setUnitGoal('磁石の性質について、実験を通して理解を深め、磁石の力や極の働きについて説明できるようになる');
                      setIsEditingGoal(false);
                    }}
                    className="bg-white hover:bg-gray-50 text-gray-700 border-2 border-gray-300 px-4 py-2 rounded-xl font-bold transition-all"
                  >
                    キャンセル
                  </button>
                </div>
              )}
            </div>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              {isEditingGoal ? (
                <textarea
                  value={unitGoal}
                  onChange={(e) => setUnitGoal(e.target.value)}
                  className="w-full border-2 border-gray-300 rounded-xl p-3 min-h-[100px] focus:border-green-400 focus:outline-none font-medium text-gray-700"
                  placeholder="単元の目標を入力してください"
                />
              ) : (
                <p className="text-gray-700 leading-relaxed font-medium">{unitGoal}</p>
              )}
            </div>
          </div>
          
          <div className="flex gap-4 items-start mb-4">
            <div className="flex-1 grid grid-cols-2 gap-4">
              <StatusCard status="submitted" count={counts.submitted} color="from-green-50 to-emerald-50 text-green-600" icon={CheckCircle2} label="提出済み" onClick={() => setStatusFilter(statusFilter === 'submitted' ? null : 'submitted')} active={statusFilter === 'submitted'} />
              <StatusCard status="notSubmitted" count={counts.notSubmitted} color="from-yellow-50 to-amber-50 text-yellow-600" icon={Clock} label="未提出" onClick={() => setStatusFilter(statusFilter === 'notSubmitted' ? null : 'notSubmitted')} active={statusFilter === 'notSubmitted'} />
            </div>
            <div className="flex flex-col gap-2">
              <button onClick={() => setShowBulkModal(true)} className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 whitespace-nowrap">
                <Users size={18} />
                <span className="text-sm">一括でコメント</span>
              </button>
              <div className="flex items-center gap-2 text-xs bg-gray-50 rounded-lg px-3 py-2">
                <input type="checkbox" checked={showOnlyNoComment} onChange={(e) => setShowOnlyNoComment(e.target.checked)} className="w-3.5 h-3.5 text-blue-600 rounded" />
                <span className="text-gray-700 font-medium whitespace-nowrap">コメント未記入のみ</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-6">
          {filteredStudents.map(student => {
            const bgColor = student.status === 'submitted' ? 'from-green-50 to-emerald-50' : 'from-yellow-50 to-amber-50';
            const borderColor = student.status === 'submitted' ? 'border-green-300 hover:border-green-400' : 'border-yellow-300 hover:border-yellow-400';
            
            return (
              <div key={student.id} onClick={() => { setSelectedStudent(student); setShowStudentDetail(true); }} className={`bg-gradient-to-br ${bgColor} rounded-xl shadow-md hover:shadow-xl transition-all cursor-pointer p-4 border-2 ${borderColor}`}>
                <h3 className="text-lg font-bold text-gray-800 mb-3">{student.name}</h3>
                {student.bestShot ? (
                  <div className="relative rounded-lg overflow-hidden mb-3 border-2 border-gray-200" style={{ aspectRatio: '16/9' }}>
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
                      <Camera className="w-12 h-12 text-blue-300 mb-2" />
                      <div className="text-xs text-gray-600 font-medium text-center px-2">{student.bestShot.photoName}</div>
                    </div>
                  </div>
                ) : (
                  <div className="relative rounded-lg overflow-hidden mb-3 border-2 border-gray-300" style={{ aspectRatio: '16/9' }}>
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
                      <Camera className="w-12 h-12 text-gray-300 mb-2" />
                      <div className="text-xs text-gray-400 font-medium">写真なし</div>
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  {student.hasTeacherComment ? (
                    <div className="flex items-center gap-1 bg-green-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-md">
                      <CheckCircle2 size={16} />
                      <span>コメント済み</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-gray-400 text-sm">
                      <MessageSquare size={16} />
                      <span>コメントなし</span>
                    </div>
                  )}
                  <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">詳細 →</button>
                </div>
              </div>
            );
          })}
        </div>

        {selectedStudent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
            <div className="min-h-screen flex items-start justify-center p-4 py-8">
              <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full p-6 my-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {(() => {
                    const currentIndex = filteredStudents.findIndex(s => s.id === selectedStudent.id);
                    const hasPrev = currentIndex > 0;
                    const hasNext = currentIndex < filteredStudents.length - 1;
                    return (
                      <>
                        <button 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            if (hasPrev) setSelectedStudent(filteredStudents[currentIndex - 1]); 
                          }} 
                          disabled={!hasPrev}
                          className={`p-1.5 rounded-lg transition-all ${hasPrev ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <h2 className="text-2xl font-bold text-gray-800">{selectedStudent.name}</h2>
                        <button 
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            if (hasNext) setSelectedStudent(filteredStudents[currentIndex + 1]); 
                          }} 
                          disabled={!hasNext}
                          className={`p-1.5 rounded-lg transition-all ${hasNext ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                        >
                          <ChevronRight size={20} />
                        </button>
                      </>
                    );
                  })()}
                </div>
                <button onClick={() => { setSelectedStudent(null); setTempComment(''); }} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>

              {(() => {
                if (selectedStudent.status === 'notSubmitted') {
                  return (
                    <div>
                      <div className="bg-yellow-50 rounded-lg p-3 text-center border border-yellow-200 mb-3">
                        <p className="text-yellow-700 text-sm font-medium">未提出（振り返りを作成中、または未着手の状態です）</p>
                      </div>
                      
                      <div className="mb-4">
                        <h3 className="text-base font-bold text-gray-800 mb-2">ふりかえり</h3>
                        <ResponsiveContainer width="100%" height={150}>
                          <LineChart data={selectedStudent.chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11 }} />
                            <YAxis domain={[0, 5]} ticks={[1,2,3,4,5]} tick={{ fill: '#6b7280', fontSize: 11 }} />
                            <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }} />
                            <Legend wrapperStyle={{ fontSize: '12px' }} />
                            <Line type="monotone" dataKey="enjoyment" name="たのしかった" stroke="#ec4899" strokeWidth={2} dot={{ fill: '#ec4899', r: 3 }} />
                            <Line type="monotone" dataKey="understanding" name="わかった/できた" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', r: 3 }} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>

                      {selectedStudent.bestShot && (
                        <div className="mb-4">
                          <h3 className="text-base font-bold text-gray-800 mb-2 flex items-center gap-2">
                            <Star className="text-yellow-500" fill="#eab308" size={18} />
                            <span>ベストショット</span>
                          </h3>
                          <div className="relative rounded-xl overflow-hidden border-2 border-yellow-200" style={{ aspectRatio: '16/9' }}>
                            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-50">
                              <Camera className="w-12 h-12 text-yellow-400 mb-2" />
                              <div className="text-sm text-gray-700 font-semibold">{selectedStudent.bestShot.photoName}</div>
                              <div className="text-xs text-gray-500 mt-1">第{selectedStudent.bestShot.lessonNumber}回の授業</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {selectedStudent.selectedPhotos.length > 0 && (
                        <div className="mb-4">
                          <h3 className="text-base font-bold text-gray-800 mb-2">選んだ写真</h3>
                          <div className="grid grid-cols-3 gap-3">
                            {selectedStudent.selectedPhotos.map((photo, idx) => (
                              <div key={idx} className="relative rounded-lg overflow-hidden border-2 border-gray-200" style={{ aspectRatio: '4/3' }}>
                                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-2">
                                  <Camera className="w-8 h-8 text-blue-300 mb-1" />
                                  <div className="text-xs text-gray-600 font-medium text-center">{photo.photoName}</div>
                                  <div className="text-xs text-gray-400 mt-1">第{photo.lessonNumber}回</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {selectedStudent.reflection && (
                        <div className="mb-4">
                          <h3 className="text-base font-bold text-gray-800 mb-2">学んだこと・気づいたこと</h3>
                          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-3 border-2 border-green-200">
                            <p className="text-gray-700 leading-relaxed text-sm">{selectedStudent.reflection}</p>
                          </div>
                        </div>
                      )}

                      {selectedStudent.nextAction && (
                        <div className="mb-4">
                          <h3 className="text-base font-bold text-gray-800 mb-2">次の学びに活かしたいこと</h3>
                          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-3 border-2 border-blue-200">
                            <p className="text-gray-700 leading-relaxed text-sm">{selectedStudent.nextAction}</p>
                          </div>
                        </div>
                      )}

                      <div className="border-t-2 border-gray-200 pt-4">
                        <h3 className="text-base font-bold text-gray-800 mb-2 flex items-center gap-2">
                          <MessageSquare className="text-green-600" />
                          <span>先生からのコメント</span>
                        </h3>
                        {teacherComments[selectedStudent.id] ? (
                          <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200 mb-3">
                            <p className="text-gray-700 leading-relaxed mb-3">{teacherComments[selectedStudent.id]}</p>
                            <button onClick={() => { setTempComment(teacherComments[selectedStudent.id]); }} className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1">
                              <Edit size={16} />
                              <span>編集する</span>
                            </button>
                          </div>
                        ) : null}
                        <textarea value={tempComment} onChange={(e) => setTempComment(e.target.value)} placeholder="生徒へのコメントを入力してください" className="w-full border-2 border-gray-300 rounded-xl p-3 min-h-[80px] focus:border-green-400 focus:outline-none" />
                        <button onClick={() => handleSendComment(selectedStudent.id)} disabled={!tempComment.trim()} className="mt-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 disabled:from-gray-300 disabled:to-gray-300 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 disabled:cursor-not-allowed">
                          <Send size={20} />
                          <span>コメントを送信</span>
                        </button>
                      </div>
                    </div>
                  );
                }
                return (
                  <div>
                    {selectedStudent.bestShot && (
                      <div className="mb-4">
                        <h3 className="text-base font-bold text-gray-800 mb-2 flex items-center gap-2">
                          <Star className="text-yellow-500" fill="#eab308" size={18} />
                          <span>ベストショット</span>
                        </h3>
                        <div className="relative rounded-xl overflow-hidden border-2 border-yellow-200" style={{ aspectRatio: '16/9' }}>
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-50">
                            <Camera className="w-12 h-12 text-yellow-400 mb-2" />
                            <div className="text-sm text-gray-700 font-semibold">{selectedStudent.bestShot.photoName}</div>
                            <div className="text-xs text-gray-500 mt-1">第{selectedStudent.bestShot.lessonNumber}回の授業</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selectedStudent.selectedPhotos.length > 0 && (
                      <div className="mb-4">
                        <h3 className="text-base font-bold text-gray-800 mb-2">選んだ写真</h3>
                        <div className="grid grid-cols-3 gap-3">
                          {selectedStudent.selectedPhotos.map((photo, idx) => (
                            <div key={idx} className="relative rounded-lg overflow-hidden border-2 border-gray-200" style={{ aspectRatio: '4/3' }}>
                              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-2">
                                <Camera className="w-8 h-8 text-blue-300 mb-1" />
                                <div className="text-xs text-gray-600 font-medium text-center">{photo.photoName}</div>
                                <div className="text-xs text-gray-400 mt-1">第{photo.lessonNumber}回</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="mb-4">
                      <h3 className="text-base font-bold text-gray-800 mb-2">ふりかえり</h3>
                      <ResponsiveContainer width="100%" height={180}>
                        <LineChart data={selectedStudent.chartData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 11 }} />
                          <YAxis domain={[0, 5]} ticks={[1,2,3,4,5]} tick={{ fill: '#6b7280', fontSize: 11 }} />
                          <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '12px' }} />
                          <Legend wrapperStyle={{ fontSize: '12px' }} />
                          <Line type="monotone" dataKey="enjoyment" name="たのしかった" stroke="#ec4899" strokeWidth={2} dot={{ fill: '#ec4899', r: 3 }} />
                          <Line type="monotone" dataKey="understanding" name="わかった/できた" stroke="#f59e0b" strokeWidth={2} dot={{ fill: '#f59e0b', r: 3 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div>
                        <h3 className="text-base font-bold text-gray-800 mb-2">学んだこと・気づいたこと</h3>
                        <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-3 border-2 border-green-200">
                          <p className="text-gray-700 leading-relaxed text-sm">{selectedStudent.reflection}</p>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-gray-800 mb-2">次の学びに活かしたいこと</h3>
                        <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-3 border-2 border-blue-200">
                          <p className="text-gray-700 leading-relaxed text-sm">{selectedStudent.nextAction}</p>
                        </div>
                      </div>
                    </div>

                    {selectedStudent.aiComment && (
                      <div className="mb-4">
                        <h3 className="text-base font-bold text-gray-800 mb-2 flex items-center gap-2">
                          <span className="text-purple-600">🤖</span>
                          <span>AIコメント</span>
                        </h3>
                        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-3 border-2 border-purple-200">
                          <p className="text-gray-700 leading-relaxed text-sm">{selectedStudent.aiComment}</p>
                        </div>
                      </div>
                    )}

                    <div className="border-t-2 border-gray-200 pt-4">
                      <h3 className="text-base font-bold text-gray-800 mb-2 flex items-center gap-2">
                        <MessageSquare className="text-green-600" />
                        <span>先生からのコメント</span>
                      </h3>
                      {teacherComments[selectedStudent.id] ? (
                        <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200 mb-3">
                          <p className="text-gray-700 leading-relaxed mb-3">{teacherComments[selectedStudent.id]}</p>
                          <button onClick={() => { setTempComment(teacherComments[selectedStudent.id]); }} className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1">
                            <Edit size={16} />
                            <span>編集する</span>
                          </button>
                        </div>
                      ) : null}
                      <textarea value={tempComment} onChange={(e) => setTempComment(e.target.value)} placeholder="生徒へのコメントを入力してください" className="w-full border-2 border-gray-300 rounded-xl p-3 min-h-[120px] focus:border-green-400 focus:outline-none" />
                      <button onClick={() => handleSendComment(selectedStudent.id)} disabled={!tempComment.trim()} className="mt-3 bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 disabled:from-gray-300 disabled:to-gray-300 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 disabled:cursor-not-allowed">
                        <Send size={20} />
                        <span>コメントを送信</span>
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
          </div>
        )}

        {showBulkModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xl font-bold text-gray-800">一括コメント</h3>
                <button onClick={() => { setShowBulkModal(false); setSendToInProgress(false); setBulkComment(''); }} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>
              <textarea value={bulkComment} onChange={(e) => setBulkComment(e.target.value)} placeholder="全員に送るコメントを入力" className="w-full border-2 border-gray-300 rounded-xl p-3 min-h-[120px] mb-3 focus:border-blue-400 focus:outline-none" />
              <div className="mb-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={sendToInProgress} onChange={(e) => setSendToInProgress(e.target.checked)} className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500" />
                  <span className="text-sm font-medium text-gray-700">作成中・未着手にも送る</span>
                </label>
              </div>
              <button onClick={handleBulkComment} disabled={!bulkComment.trim()} className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-gray-300 disabled:to-gray-300 text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:cursor-not-allowed">
                <Send size={20} />
                <span>送信</span>
              </button>
            </div>
          </div>
        )}
          </>
        ) : (
          <div>
            <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl shadow-lg p-6 mb-6 text-white">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setCurrentPage('dashboard')}
                    className="bg-white bg-opacity-90 hover:bg-opacity-100 text-green-600 px-4 py-2 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md hover:shadow-lg"
                  >
                    <span>←</span>
                    <span>戻る</span>
                  </button>
                  <div className="text-5xl">{unitInfo.icon}</div>
                  <div>
                    <div className="text-sm opacity-90 mb-1">{unitInfo.subject}　単元の振り返り</div>
                    <h1 className="text-3xl font-bold">{unitInfo.title}</h1>
                  </div>
                </div>
                <span className="text-sm bg-white bg-opacity-20 px-4 py-2 rounded-full font-semibold">
                  全8回完了
                </span>
              </div>
              <p className="text-lg opacity-90">{unitInfo.period}</p>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl shadow-lg p-6 mb-6 border-2 border-green-200">
              <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">🎯</span>
                単元の目標
              </h2>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-gray-700 leading-relaxed font-medium">{unitGoal}</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl shadow-lg p-6 mb-6 border-2 border-purple-200">
              <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg p-2">
                  <TrendingUp size={20} />
                </div>
                AIコメント
              </h2>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">この「磁石の実験」の単元では、20人の児童が8回の授業を通して、磁石の基本的な性質から応用まで幅広く学習しました。

全体的な傾向として、「わかった/できた」の平均は3.8、「たのしかった」の平均は3.9と、理解度・楽しさともに高い水準を維持できました。

特に第2回「磁石につくもの・つかないもの」と第6回「磁石の力がつたわるか調べよう」では、予想を立ててから実験で確かめるという科学的な学習方法が効果的に機能し、児童の「驚き」と「発見」が顕著に見られました。児童たちの振り返りには「予想と違ってびっくりした」「不思議だった」という言葉が多く、科学的な探究心が育っていることが確認できます。

第4回「磁石の極を調べよう」では理解度が2.6とやや低めでしたが、第5回で実験を重ねることで4.1まで向上しており、繰り返しの学習の重要性が示されました。

第7回のおもちゃ作りでは、学んだ知識を実際に活用する力が発揮され、多くの児童が創造的な作品を作り上げました。「磁石の性質を使って」という表現が振り返りに多く見られ、知識の定着と応用力の育成が確認できます。

今後の課題としては、難しい概念（N極・S極など）の理解をさらに深めるための工夫と、まとめの授業での楽しさをどう維持するかが挙げられます。</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">ふりかえり（クラス平均）</h2>
              <div className="bg-gray-50 rounded-xl p-4">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart 
                    data={[
                      { name: '1/15', lessonNumber: 1, 'わかった/できた': 3.2, 'たのしかった': 3.1 },
                      { name: '1/18', lessonNumber: 2, 'わかった/できた': 3.8, 'たのしかった': 4.2 },
                      { name: '1/22', lessonNumber: 3, 'わかった/できた': 3.9, 'たのしかった': 4.3 },
                      { name: '1/25', lessonNumber: 4, 'わかった/できた': 2.6, 'たのしかった': 3.2 },
                      { name: '1/29', lessonNumber: 5, 'わかった/できた': 4.1, 'たのしかった': 4.0 },
                      { name: '2/1', lessonNumber: 6, 'わかった/できた': 4.6, 'たのしかった': 4.7 },
                      { name: '2/5', lessonNumber: 7, 'わかった/できた': 4.3, 'たのしかった': 4.5 },
                      { name: '2/7', lessonNumber: 8, 'わかった/できた': 4.2, 'たのしかった': 3.3 }
                    ]}
                    margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 13 }} axisLine={{ stroke: '#d1d5db' }} />
                    <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} tick={{ fill: '#6b7280', fontSize: 13 }} axisLine={{ stroke: '#d1d5db' }} />
                    <Tooltip contentStyle={{ backgroundColor: 'white', border: '2px solid #e5e7eb', borderRadius: '8px', fontSize: '13px' }} />
                    <Legend wrapperStyle={{ paddingTop: '10px' }} iconType="circle" />
                    <Line type="monotone" dataKey="たのしかった" stroke="#ec4899" strokeWidth={3} dot={{ fill: '#ec4899', r: 5 }} activeDot={{ r: 7 }} cursor="pointer" />
                    <Line type="monotone" dataKey="わかった/できた" stroke="#f59e0b" strokeWidth={3} dot={{ fill: '#f59e0b', r: 5 }} activeDot={{ r: 7 }} cursor="pointer" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-2xl">📝</span>
                各授業の記録
              </h2>
              
              {[
                { lessonNumber: 1, date: '1月15日（月）', time: '3時間目', title: '磁石ってなんだろう', goal: '磁石の性質について知り、疑問を持とう', avgUnderstanding: 3.2, avgEnjoyment: 3.1, photos: ['磁石を触ってみる', 'いろいろな磁石', '身の回りの磁石', '磁石の観察'], commentSummary: '児童たちは磁石に初めて触れ、興味津々の様子でした。「もっと調べたい」「不思議だな」という声が多く聞かれ、学習への意欲が高まっていました。' },
                { lessonNumber: 2, date: '1月18日（木）', time: '2時間目', title: '磁石につくもの・つかないもの', goal: '磁石にくっつくものとくっつかないものを調べて、きまりを見つけよう', avgUnderstanding: 3.8, avgEnjoyment: 4.2, photos: ['つくもの調べ①', 'つくもの調べ②', '実験結果の記録', '発見したこと'], commentSummary: '予想を立ててから実験する姿勢が見られました。「鉄だけがくっつく」「ステンレスは意外」など、驚きと発見の声が多く、科学的な思考が育っています。' },
                { lessonNumber: 3, date: '1月22日（月）', time: '3時間目', title: '磁石の力の強さを調べよう', goal: '磁石の力の強さについて実験で確かめよう', avgUnderstanding: 3.9, avgEnjoyment: 4.3, photos: ['クリップ実験', '力の強さ比較', '実験のまとめ', '数を数える'], commentSummary: 'クリップの数を数えて比較する方法で、磁石によって力が違うことを発見しました。数値で比較する科学的な手法を体験できた授業でした。' },
                { lessonNumber: 4, date: '1月25日（木）', time: '2時間目', title: '磁石の極を調べよう', goal: '磁石のN極とS極について理解しよう', avgUnderstanding: 2.6, avgEnjoyment: 3.2, photos: ['極の観察', '極の確認', 'N極とS極', '磁石の極実験'], commentSummary: 'N極とS極という概念は少し難しかったようですが、引き合ったり退け合ったりする現象に「不思議」という反応が多く見られました。理解には個人差がありました。' },
                { lessonNumber: 5, date: '1月29日（月）', time: '3時間目', title: '磁石どうしの力を調べよう', goal: '磁石どうしが引き合ったり退け合ったりするきまりを見つけよう', avgUnderstanding: 4.1, avgEnjoyment: 4.0, photos: ['引き合う実験', '退け合う実験', '極の観察', 'きまりの発見'], commentSummary: '実験を通して「同じ極は退け合う、違う極は引き合う」というきまりを自分たちで発見できました。「わかった！」という達成感のある声が多く聞かれました。' },
                { lessonNumber: 6, date: '2月1日（木）', time: '2時間目', title: '磁石の力がつたわるか調べよう', goal: '磁石の力が物を通して伝わるか実験しよう', avgUnderstanding: 4.6, avgEnjoyment: 4.7, photos: ['紙を通す実験', '木を通す実験', '鉄板での実験', '透過実験'], commentSummary: '予想と違う結果に多くの児童が驚いていました。「紙や木は通るのに鉄は通らない」という発見に、科学の面白さを感じている様子でした。この単元で最も盛り上がった授業でした。' },
                { lessonNumber: 7, date: '2月5日（月）', time: '3時間目', title: '磁石で作ってみよう', goal: '学んだことを使って、磁石のおもちゃを作ろう', avgUnderstanding: 4.3, avgEnjoyment: 4.5, photos: ['おもちゃ設計図', '制作途中', '完成作品', 'みんなで遊ぶ'], commentSummary: '学んだ知識を活かして創造的なおもちゃを作りました。魚釣りゲームや迷路など、工夫を凝らした作品が多く、「磁石の性質を使えた」という達成感が見られました。' },
                { lessonNumber: 8, date: '2月7日（水）', time: '2時間目', title: '磁石のまとめをしよう', goal: 'これまでの学習を振り返り、磁石について分かったことをまとめよう', avgUnderstanding: 4.2, avgEnjoyment: 3.3, photos: ['まとめノート', '学習の記録', '発見のまとめ', '振り返りシート'], commentSummary: '単元全体を振り返り、学んだことを整理しました。「たくさんのことがわかった」「生活の中でも使われている」など、学びを実感する声が多く聞かれました。' }
              ].map((lesson) => (
                <div key={lesson.lessonNumber} id={`lesson-${lesson.lessonNumber}`} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="bg-green-50 rounded-lg p-3 mb-3 border-2 border-green-200">
                    <div className="text-lg font-bold text-gray-800">
                      第{lesson.lessonNumber}回 {lesson.date} {lesson.time} - {lesson.title}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">目標：{lesson.goal}</div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="text-sm text-gray-700 font-semibold mb-2">代表的な写真</div>
                    <div className="grid grid-cols-4 gap-2">
                      {lesson.photos.slice(0, 4).map((photo, idx) => (
                        <div key={idx} className="relative rounded-lg overflow-hidden border-2 border-blue-200" style={{ aspectRatio: '4/3' }}>
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-2">
                            <Camera className="w-8 h-8 text-blue-400 mb-1" />
                            <div className="text-xs text-gray-700 font-medium text-center leading-tight">{photo}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex gap-4 mb-3">
                    <div className="flex-1 bg-pink-50 rounded-lg p-3 border-2 border-pink-200">
                      <div className="text-sm text-gray-700 mb-1 font-semibold flex items-center gap-1">
                        <Heart size={16} className="text-pink-500" fill="#ec4899" />
                        たのしかった（平均）
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={20} className={i < Math.round(lesson.avgEnjoyment) ? 'text-pink-400 fill-pink-400' : 'text-gray-300'} />
                          ))}
                        </div>
                        <span className="text-xl font-bold text-pink-600">{lesson.avgEnjoyment.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="flex-1 bg-orange-50 rounded-lg p-3 border-2 border-orange-200">
                      <div className="text-sm text-gray-700 mb-1 font-semibold flex items-center gap-1">
                        <Lightbulb size={16} className="text-amber-500" fill="#f59e0b" />
                        わかった/できた（平均）
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={20} className={i < Math.round(lesson.avgUnderstanding) ? 'text-orange-400 fill-orange-400' : 'text-gray-300'} />
                          ))}
                        </div>
                        <span className="text-xl font-bold text-orange-600">{lesson.avgUnderstanding.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4 border-2 border-purple-200">
                    <div className="text-sm text-purple-700 font-semibold mb-2">生徒コメントAI要約</div>
                    <p className="text-sm text-gray-700 leading-relaxed">{lesson.commentSummary}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
