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
        <span className="font-bold text-lg">{count}</span>
      </div>
      <div className="text-sm font-medium">{label}</div>
    </div>
  );

  const StudentCard = ({ student, onClick }) => (
    <div onClick={onClick} className={`bg-white rounded-xl p-4 border-2 transition-all cursor-pointer hover:shadow-md ${student.status === 'submitted' ? 'border-green-200 hover:border-green-400' : 'border-orange-200 hover:border-orange-400'}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="font-bold text-gray-800">{student.name}</span>
        {student.status === 'submitted' ? (
          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1"><CheckCircle2 size={12} />提出済</span>
        ) : (
          <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full flex items-center gap-1"><Clock size={12} />未提出</span>
        )}
      </div>
      {student.status === 'submitted' && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            {student.hasTeacherComment || teacherComments[student.id] ? (
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1"><MessageSquare size={12} />コメント済</span>
            ) : (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full flex items-center gap-1"><AlertCircle size={12} />未コメント</span>
            )}
          </div>
          {student.bestShot && <Camera size={16} className="text-blue-400" />}
        </div>
      )}
    </div>
  );

  // 生徒詳細モーダル
  if (selectedStudent) {
    const student = students.find(s => s.id === selectedStudent);
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{student.name} さんの振り返り</h2>
              <button onClick={() => setSelectedStudent(null)} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
            </div>

            {student.status === 'notSubmitted' ? (
              <div className="text-center py-12">
                <Clock size={48} className="mx-auto text-orange-400 mb-4" />
                <p className="text-lg text-gray-600">まだ振り返りが提出されていません</p>
              </div>
            ) : (
              <>
                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <h3 className="text-sm font-bold text-gray-700 mb-3">学習の推移</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={student.chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} />
                      <YAxis domain={[0, 5]} ticks={[1,2,3,4,5]} tick={{ fill: '#6b7280', fontSize: 12 }} />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="enjoyment" name="たのしかった" stroke="#ec4899" strokeWidth={2} dot={{ r: 4 }} />
                      <Line type="monotone" dataKey="understanding" name="わかった" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {student.bestShot && (
                  <div className="mb-6">
                    <h3 className="text-sm font-bold text-gray-700 mb-2">ベストショット</h3>
                    <div className="inline-block rounded-xl overflow-hidden border-4 border-yellow-400" style={{ width: '200px', aspectRatio: '4/3' }}>
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-50 p-4">
                        <Camera className="w-12 h-12 text-yellow-400 mb-2" />
                        <div className="text-sm text-gray-700 font-semibold text-center">{student.bestShot.photoName}</div>
                        <div className="text-xs text-gray-500">第{student.bestShot.lessonNumber}回</div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-4 mb-6">
                  <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
                    <div className="text-sm font-semibold text-gray-700 mb-2">振り返り</div>
                    <p className="text-gray-700">{student.reflection}</p>
                  </div>

                  <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
                    <div className="text-sm font-semibold text-gray-700 mb-2">AIコメント</div>
                    <p className="text-gray-700">{student.aiComment}</p>
                  </div>

                  {student.nextAction && (
                    <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
                      <div className="text-sm font-semibold text-gray-700 mb-2">次に活かしたいこと</div>
                      <p className="text-gray-700">{student.nextAction}</p>
                    </div>
                  )}
                </div>

                <div className="bg-orange-50 rounded-xl p-4 border-2 border-orange-200">
                  <div className="text-sm font-semibold text-gray-700 mb-2">先生からのコメント</div>
                  {teacherComments[student.id] || student.hasTeacherComment ? (
                    <p className="text-gray-700">{teacherComments[student.id] || "コメント済み"}</p>
                  ) : (
                    <div>
                      <textarea value={tempComment} onChange={(e) => setTempComment(e.target.value)} placeholder="コメントを入力..." className="w-full border-2 border-gray-200 rounded-lg p-3 mb-2 focus:border-orange-400 focus:outline-none" rows={3} />
                      <button onClick={() => handleSendComment(student.id)} disabled={!tempComment.trim()} className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold ${tempComment.trim() ? 'bg-orange-500 hover:bg-orange-600 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                        <Send size={16} />送信
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* ヘッダー */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-6 mb-6 text-white">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="text-4xl">{unitInfo.icon}</div>
              <div>
                <div className="text-sm opacity-90">{unitInfo.subject} - {unitInfo.grade}</div>
                <h1 className="text-2xl font-bold">{unitInfo.title}</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-lg text-sm font-semibold">
                <Home size={16} />
                トップへ
              </Link>
            </div>
          </div>
          <p className="text-sm opacity-90">{unitInfo.period}</p>
        </div>

        {/* ナビゲーションタブ */}
        <div className="flex gap-2 mb-6">
          <button onClick={() => setCurrentPage('dashboard')} className={`px-6 py-3 rounded-xl font-bold transition-all ${currentPage === 'dashboard' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
            <Users size={18} className="inline mr-2" />生徒一覧
          </button>
          <button onClick={() => setCurrentPage('lessons')} className={`px-6 py-3 rounded-xl font-bold transition-all ${currentPage === 'lessons' ? 'bg-blue-600 text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-50'}`}>
            📚 授業記録
          </button>
        </div>

        {currentPage === 'dashboard' ? (
          <>
            {/* 単元目標 */}
            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl shadow-lg p-6 mb-6 border-2 border-green-200">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-2xl">🎯</span>単元の目標
                </h2>
                {!isEditingGoal ? (
                  <button onClick={() => setIsEditingGoal(true)} className="text-sm bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2 px-4 rounded-lg border-2 border-gray-300">
                    <Edit size={14} className="inline mr-1" />編集
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button onClick={() => setIsEditingGoal(false)} className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg">キャンセル</button>
                    <button onClick={() => setIsEditingGoal(false)} className="text-sm bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg">保存</button>
                  </div>
                )}
              </div>
              {!isEditingGoal ? (
                <p className="text-gray-700 leading-relaxed">{unitGoal}</p>
              ) : (
                <textarea value={unitGoal} onChange={(e) => setUnitGoal(e.target.value)} className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-green-400 focus:outline-none" rows={3} />
              )}
            </div>

            {/* ステータスカード */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatusCard status="all" count={students.length} color="from-gray-100 to-gray-200 text-gray-700" icon={Users} label="全員" onClick={() => setStatusFilter(null)} active={statusFilter === null} />
              <StatusCard status="submitted" count={counts.submitted} color="from-green-100 to-green-200 text-green-700" icon={CheckCircle2} label="提出済" onClick={() => setStatusFilter('submitted')} active={statusFilter === 'submitted'} />
              <StatusCard status="notSubmitted" count={counts.notSubmitted} color="from-orange-100 to-orange-200 text-orange-700" icon={Clock} label="未提出" onClick={() => setStatusFilter('notSubmitted')} active={statusFilter === 'notSubmitted'} />
              <div onClick={() => setShowOnlyNoComment(!showOnlyNoComment)} className={`bg-gradient-to-br from-purple-100 to-purple-200 text-purple-700 rounded-xl p-4 border-2 transition-all cursor-pointer hover:shadow-md ${showOnlyNoComment ? 'border-purple-500 shadow-md' : 'border-transparent'}`}>
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare size={20} />
                  <span className="font-bold text-lg">{students.filter(s => s.status === 'submitted' && !s.hasTeacherComment && !teacherComments[s.id]).length}</span>
                </div>
                <div className="text-sm font-medium">未コメント</div>
              </div>
            </div>

            {/* 一括コメントボタン */}
            <div className="flex justify-end mb-4">
              <button onClick={() => setShowBulkModal(true)} className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-2 px-6 rounded-xl shadow-lg flex items-center gap-2">
                <MessageSquare size={18} />一括コメント
              </button>
            </div>

            {/* 生徒一覧 */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filteredStudents.map(student => (
                <StudentCard key={student.id} student={student} onClick={() => setSelectedStudent(student.id)} />
              ))}
            </div>

            {/* 一括コメントモーダル */}
            {showBulkModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-800">一括コメント送信</h3>
                    <button onClick={() => setShowBulkModal(false)} className="text-gray-500 hover:text-gray-700"><X size={24} /></button>
                  </div>
                  <div className="mb-4">
                    <label className="flex items-center gap-2 mb-3">
                      <input type="checkbox" checked={sendToInProgress} onChange={(e) => setSendToInProgress(e.target.checked)} className="w-4 h-4" />
                      <span className="text-sm text-gray-700">未提出の生徒にも送信する</span>
                    </label>
                    <textarea value={bulkComment} onChange={(e) => setBulkComment(e.target.value)} placeholder="全員に送信するコメントを入力..." className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-purple-400 focus:outline-none" rows={4} />
                  </div>
                  <div className="flex gap-3 justify-end">
                    <button onClick={() => setShowBulkModal(false)} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg">キャンセル</button>
                    <button onClick={handleBulkComment} disabled={!bulkComment.trim()} className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 ${bulkComment.trim() ? 'bg-purple-500 hover:bg-purple-600 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}>
                      <Send size={16} />送信
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          /* 授業記録ページ */
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <TrendingUp size={24} className="text-blue-500" />
                クラス全体の推移
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={dates.map((date, i) => ({
                  name: date,
                  avgEnjoyment: students.reduce((sum, s) => sum + (s.chart[i]?.[1] || 0), 0) / students.filter(s => s.chart[i]?.[1] > 0).length || 0,
                  avgUnderstanding: students.reduce((sum, s) => sum + (s.chart[i]?.[0] || 0), 0) / students.filter(s => s.chart[i]?.[0] > 0).length || 0
                }))}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <YAxis domain={[0, 5]} ticks={[1,2,3,4,5]} tick={{ fill: '#6b7280', fontSize: 12 }} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="avgEnjoyment" name="たのしかった（平均）" stroke="#ec4899" strokeWidth={3} dot={{ r: 5 }} />
                  <Line type="monotone" dataKey="avgUnderstanding" name="わかった（平均）" stroke="#f59e0b" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
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
