import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, ChevronRight, Star, TrendingUp, ExternalLink, Home } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function WeeklyReflection() {
  const [studentReflection, setStudentReflection] = useState('');
  const [additionalReflection, setAdditionalReflection] = useState('');
  const [showReferenceInfo, setShowReferenceInfo] = useState(false);
  const [showDevNote, setShowDevNote] = useState(false);
  const [step2AIComment, setStep2AIComment] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isEditingGoal, setIsEditingGoal] = useState(false);
  const [customGoal, setCustomGoal] = useState('');
  const [selectedLesson, setSelectedLesson] = useState(null);

  const unitInfo = {
    icon: '🧲',
    subject: '理科',
    title: '磁石の実験',
    period: '1月15日〜2月7日 (全8回)',
    goal: '磁石の性質について、実験を通して理解を深め、磁石が引きつけるものと引きつけないものを見分けることができる。また、磁石の極の性質を調べ、N極とS極の関係を説明することができる。'
  };

  const displayGoal = customGoal || unitInfo.goal;

  const allLessons = [
    {
      lessonNumber: 1,
      date: '1月15日(月)',
      title: '磁石ってなんだろう',
      enjoyment: 2,
      understanding: 3,
      comment: '磁石で遊んでみたけど、くっつくものとくっつかないものがあって不思議だった。鉄はくっつくのに、アルミはくっつかなくてびっくりした。',
      aiLessonSummary: 'この授業では、磁石の基本的な性質を知ることができました。児童は身近なもので磁石に引きつけられるものと引きつけられないものを調べ、鉄製品が磁石に引きつけられることを発見しました。',
      teacherComment: '磁石に興味を持って、積極的に調べていましたね。観察が丁寧でした。',
      photos: ['磁石を触ってみる', 'いろいろな磁石']
    },
    {
      lessonNumber: 2,
      date: '1月18日(木)',
      title: '磁石の極を調べよう',
      enjoyment: 5,
      understanding: 4,
      comment: 'N極とS極があることを知った。同じ極同士は反発して、違う極同士はくっつくのが面白かった。予想を立ててから確かめるのが楽しかった。',
      aiLessonSummary: 'この授業では、磁石にはN極とS極があることを学びました。児童は実験を通じて、同じ極同士は反発し、異なる極同士は引き合うという磁石の極性の法則を理解しました。',
      teacherComment: '予想を立ててから実験する姿勢が素晴らしかったです。',
      photos: ['N極とS極', '磁石同士を近づける', '極を調べる実験']
    },
    {
      lessonNumber: 3,
      date: '1月22日(月)',
      title: '磁石の力',
      enjoyment: 4,
      understanding: 3,
      comment: '磁石の力は、離れていても働くことがわかった。紙やプラスチックを通しても引きつけることができてすごいと思った。',
      aiLessonSummary: 'この授業では、磁石の力が離れていても働くことを学びました。児童は紙やプラスチックなど、様々な素材を通して磁石の力が伝わることを実験で確かめました。',
      teacherComment: '実験の結果を丁寧に記録していました。',
      photos: []
    },
    {
      lessonNumber: 4,
      date: '1月25日(木)',
      title: '磁石の極を調べよう',
      enjoyment: 3,
      understanding: 2,
      comment: 'N極とS極を調べるのは難しかった。くっつくほうがS極かと思ったけど、引き合う極があることを学んだ。',
      aiLessonSummary: 'この授業では、磁石の極性についてさらに深く学びました。児童は方位磁針を使って磁石のN極とS極を正確に調べる方法を習得しました。',
      teacherComment: 'N極とS極を正しく調べることができました。よく頑張りました。',
      photos: ['方位磁針で調べる']
    },
    {
      lessonNumber: 5,
      date: '1月29日(月)',
      title: '磁石を作ろう',
      enjoyment: 4,
      understanding: 5,
      comment: '鉄のくぎを磁石でこすると、磁石になることを知った。磁石を作れるなんてすごいと思った。磁石の力が伝わるんだと思った。',
      aiLessonSummary: 'この授業では、鉄製品を磁石に変える方法を学びました。児童は鉄釘を磁石でこすることで、鉄釘自体が磁石になることを実験で確認し、磁力が伝わる性質を理解しました。',
      teacherComment: '実験の手順をしっかり守って、上手に磁石を作れましたね。',
      photos: ['くぎを磁石にする', '作った磁石で実験']
    },
    {
      lessonNumber: 6,
      date: '2月1日(木)',
      title: '磁石の強さを比べよう',
      enjoyment: 5,
      understanding: 5,
      comment: '磁石の大きさや形で、磁石の力の強さが違うことがわかった。予想を立ててから調べるのが楽しかった。いろいろな磁石を比べられて面白かった。',
      aiLessonSummary: 'この授業では、異なる大きさや形状の磁石の強さを比較しました。児童はクリップの数を数えることで磁力の強さを定量的に測定し、磁石の大きさと磁力の関係について考察しました。',
      teacherComment: '予想を立ててから実験する科学的な姿勢が身についてきましたね。',
      photos: ['いろいろな磁石', '磁石の強さを調べる']
    },
    {
      lessonNumber: 7,
      date: '2月5日(月)',
      title: '磁石を使って遊ぼう',
      enjoyment: 5,
      understanding: 5,
      comment: '磁石を使って魚釣りゲームを作った。磁石の性質を使って遊べることがわかった。極の性質を考えながら作るのが楽しかった。',
      aiLessonSummary: 'この授業では、これまで学んだ磁石の性質を活かして魚釣りゲームを作りました。児童は磁石のN極とS極の性質を理解し、それを応用した遊び道具を創造的に作り上げました。',
      teacherComment: '磁石の性質を上手に活用してゲームを作れましたね。創造性も素晴らしいです。',
      photos: ['魚釣りゲームを作る', '友だちと遊ぶ']
    },
    {
      lessonNumber: 8,
      date: '2月7日(水)',
      title: 'まとめ',
      enjoyment: 2,
      understanding: 5,
      comment: '8回の授業を振り返って、磁石についてたくさん学べたと思う。最初はよくわからなかったけど、今は磁石の性質がよく理解できた。',
      aiLessonSummary: 'この授業では、単元全体を振り返りました。児童は磁石の基本的な性質から極性の法則、磁力の応用まで、学習内容を整理し、科学的な理解を深めました。',
      teacherComment: '磁石について深く理解できましたね。これからも好奇心を大切にしていってください。',
      photos: []
    }
  ];

  // 各授業のベストショット（最初の写真）を初期選択
  const getInitialSelectedPhotos = () => {
    const photos = [];
    allLessons.forEach(lesson => {
      if (lesson.photos.length > 0) {
        photos.push({ 
          lessonNumber: lesson.lessonNumber, 
          photoIndex: 0,
          isCoverShot: true // 授業のカバーショット
        });
      }
    });
    return photos;
  };
  
  const [selectedPhotos, setSelectedPhotos] = useState(getInitialSelectedPhotos());
  const [mainDisplayPhoto, setMainDisplayPhoto] = useState({ lessonNumber: 2, photoIndex: 0 }); // 大きく表示する写真
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [tempSelectedPhotos, setTempSelectedPhotos] = useState([]); // モーダル内の一時選択
  const [isFinalSubmitted, setIsFinalSubmitted] = useState(false); // 最終提出状態
  const [isLoadingAI, setIsLoadingAI] = useState(false); // AIコメント生成中
  const [isEditing, setIsEditing] = useState(false); // 編集モード

  const chartData = allLessons.map(lesson => ({
    name: `${lesson.date.split('(')[0]}`,
    lessonNumber: lesson.lessonNumber,
    date: lesson.date,
    'わかった/できた': lesson.understanding,
    'たのしかった': lesson.enjoyment
  }));

  const generateStep2AIComment = () => {
    return `これまでの実験を通して、磁石の基本的な性質をしっかり整理できていますね。
特に、形や大きさによって力の強さが変わることに気づいた点は大切です。
魚つりゲームでは、磁石のどんな性質を使ったからうまくいったのでしょうか。
また、磁石の力は「どんな条件で強くなったり弱くなったりするのか」を考えてみると、さらに理解が深まりそうです。`;
  };

  const handleStep1Submit = () => {
    setIsLoadingAI(true);
    
    // 2秒のローディング演出
    setTimeout(() => {
      const comment = generateStep2AIComment();
      setStep2AIComment(comment);
      setIsRegistered(true);
      setIsLoadingAI(false);
    }, 2000);
  };

  const handleFinalSubmit = () => {
    setIsSubmitted(true);
    setIsEditing(true);
    window.scrollTo(0, 0);
  };

  const handleFinalConfirm = () => {
    setIsFinalSubmitted(true);
    setIsEditing(false);
    window.scrollTo(0, 0);
  };

  const handleEdit = () => {
    setIsFinalSubmitted(false);
    setIsEditing(true);
    window.scrollTo(0, 0);
  };

  const setAsMainDisplay = (lessonNum, photoIdx) => {
    setMainDisplayPhoto({ lessonNumber: lessonNum, photoIndex: photoIdx });
  };

  const toggleTempPhoto = (lessonNum, photoIdx) => {
    const existingIndex = tempSelectedPhotos.findIndex(p => p.lessonNumber === lessonNum && p.photoIndex === photoIdx);
    if (existingIndex >= 0) {
      // 既に選択されている場合は削除
      setTempSelectedPhotos(tempSelectedPhotos.filter((_, idx) => idx !== existingIndex));
    } else {
      // 選択されていない場合は追加
      setTempSelectedPhotos([...tempSelectedPhotos, { lessonNumber: lessonNum, photoIndex: photoIdx }]);
    }
  };

  const confirmPhotoSelection = () => {
    // 一時選択を本選択に追加
    const newPhotos = tempSelectedPhotos.filter(temp => 
      !selectedPhotos.some(selected => 
        selected.lessonNumber === temp.lessonNumber && selected.photoIndex === temp.photoIndex
      )
    );
    setSelectedPhotos([...selectedPhotos, ...newPhotos.map(p => ({ ...p, isCoverShot: false }))]);
    setTempSelectedPhotos([]);
    setShowPhotoModal(false);
  };

  const cancelPhotoSelection = () => {
    setTempSelectedPhotos([]);
    setShowPhotoModal(false);
  };

  const toggleSelectedPhoto = (lessonNum, photoIdx) => {
    const existingIndex = selectedPhotos.findIndex(p => p.lessonNumber === lessonNum && p.photoIndex === photoIdx);
    if (existingIndex >= 0) {
      // 既に選択されている場合は削除
      setSelectedPhotos(selectedPhotos.filter((_, idx) => idx !== existingIndex));
    } else {
      // 選択されていない場合は追加
      setSelectedPhotos([...selectedPhotos, { lessonNumber: lessonNum, photoIndex: photoIdx, isCoverShot: false }]);
    }
  };


  const removeSelectedPhoto = (lessonNum, photoIdx) => {
    setSelectedPhotos(selectedPhotos.filter(p => !(p.lessonNumber === lessonNum && p.photoIndex === photoIdx)));
  };

  // プレビュー画面
  if (isSubmitted) {
    // 授業の流れを見るページを表示中
    if (showReferenceInfo) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl shadow-lg p-6 mb-6 text-white">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="text-5xl">{unitInfo.icon}</div>
                  <div>
                    <div className="text-sm opacity-90 mb-1">{unitInfo.subject}　単元の振り返り</div>
                    <h1 className="text-3xl font-bold">{unitInfo.title}</h1>
                  </div>
                </div>
                <button
                  onClick={() => setShowReferenceInfo(false)}
                  className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2 border-2 border-white border-opacity-30"
                >
                  <span className="text-sm">✕ 閉じる</span>
                </button>
              </div>
              <p className="text-lg opacity-90">{unitInfo.period}</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <span className="text-2xl">📚</span>
                    授業の流れ
                  </h2>
                  <button
                    onClick={() => setShowDevNote(!showDevNote)}
                    className="text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-semibold py-1 px-2 rounded border border-yellow-300 cursor-pointer transition-colors"
                    title="実装メモを表示"
                  >
                    📝 実装メモ
                  </button>
                </div>
                <button
                  onClick={() => setShowReferenceInfo(false)}
                  className="text-gray-500 hover:text-gray-700 font-bold text-lg px-3 py-1 rounded-lg hover:bg-gray-100"
                >
                  ✕ 閉じる
                </button>
              </div>

              {showDevNote && (
                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-yellow-900 flex items-center gap-2">
                      <span>📝</span>
                      実装メモ
                    </h3>
                    <button
                      onClick={() => setShowDevNote(false)}
                      className="text-yellow-700 hover:text-yellow-900 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="text-sm text-yellow-900 space-y-3 leading-relaxed">
                    <p>モックUIではうまく実現できなかったのですが、ふりかえりグラフを見て、例えば「充実度・理解度の両方が低い1月25日について詳細が見たい」となった場合、すぐに該当の授業へ遷移できるようにしたいです。</p>
                    
                    <p>可能であればグラフの値や日付などをクリックすることで該当の授業に遷移するなどが考えられますが、グラフ内のクリックイベントとかは色々大変そうな気もするため、実現方式はあまりこだわりなく、該当の日付の授業に簡便に遷移できるようにしたいと考えています。</p>
                  </div>
                </div>
              )}

                            <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <h3 className="text-sm font-bold text-gray-700 mb-2">ふりかえりグラフ</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart 
                    data={chartData} 
                    margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                      axisLine={{ stroke: '#d1d5db' }}
                    />
                    <YAxis 
                      domain={[0, 5]} 
                      ticks={[1, 2, 3, 4, 5]}
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                      axisLine={{ stroke: '#d1d5db' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ paddingTop: '8px' }}
                      iconType="circle"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="たのしかった" 
                      stroke="#ec4899" 
                      strokeWidth={2}
                      dot={{ r: 4, fill: '#ec4899' }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="わかった/できた" 
                      stroke="#f59e0b" 
                      strokeWidth={2}
                      dot={{ r: 4, fill: '#f59e0b' }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4">
                {allLessons.map((lesson) => (
                  <div key={lesson.lessonNumber} id={`lesson-${lesson.lessonNumber}`} className="border-2 border-gray-200 rounded-lg p-4 transition-all">
                    <div className="bg-green-50 rounded-lg p-3 mb-3">
                      <div className="text-sm font-bold text-gray-800">
                        第{lesson.lessonNumber}回 {lesson.date} - {lesson.title}
                      </div>
                    </div>
                    
                    {lesson.photos.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {lesson.photos.map((photo, idx) => (
                          <div key={idx} className="relative rounded-lg overflow-hidden border-2 border-gray-200" style={{ aspectRatio: '4/3' }}>
                            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-teal-50 p-2">
                              <Camera className="w-8 h-8 text-green-300 mb-1" />
                              <div className="text-xs text-gray-600 font-medium text-center leading-tight">{photo}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex gap-3 mb-3">
                      <div className="flex-1 bg-pink-50 rounded-lg p-2">
                        <div className="text-xs text-gray-600 mb-1">たのしかった</div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className={i < lesson.enjoyment ? 'text-pink-400 fill-pink-400' : 'text-gray-300'} />
                          ))}
                        </div>
                      </div>
                      <div className="flex-1 bg-orange-50 rounded-lg p-2">
                        <div className="text-xs text-gray-600 mb-1">わかった/できた</div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className={i < lesson.understanding ? 'text-orange-400 fill-orange-400' : 'text-gray-300'} />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-purple-50 rounded-lg p-3 mb-2 border border-purple-200">
                      <div className="text-xs text-purple-600 font-semibold mb-1">AI授業解説</div>
                      <p className="text-xs text-gray-700 leading-relaxed">{lesson.aiLessonSummary}</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3 mb-2">
                      <div className="text-xs text-gray-600 font-semibold mb-1">振り返り</div>
                      <p className="text-xs text-gray-700 leading-relaxed">{lesson.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 p-4 md:p-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl shadow-lg p-6 mb-6 text-white">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-5xl">{unitInfo.icon}</div>
                <div>
                  <div className="text-sm opacity-90 mb-1">{unitInfo.subject}　{isEditing && !isFinalSubmitted ? '振り返りシート作成' : '単元の振り返り'}</div>
                  <h1 className="text-3xl font-bold">{unitInfo.title}</h1>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {isEditing && !isFinalSubmitted && (
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setIsRegistered(false);
                      window.scrollTo(0, 0);
                    }}
                    className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-full transition-colors text-sm font-semibold"
                  >
                    ← 戻る
                  </button>
                )}
                <button
                  onClick={() => setShowReferenceInfo(true)}
                  className="flex items-center gap-2 bg-white bg-opacity-20 hover:bg-opacity-30 px-4 py-2 rounded-full transition-colors text-sm font-semibold"
                >
                  <ExternalLink size={16} />
                  授業の流れを見る
                </button>
              </div>
            </div>
            <p className="text-lg opacity-90">{unitInfo.period}</p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl shadow-lg p-6 mb-6 border-2 border-green-200">
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              単元の目標
            </h2>
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-gray-700 leading-relaxed font-medium">{displayGoal}</p>
            </div>
          </div>

          {/* 単元全体の振り返り */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <span className="text-2xl">✍️</span>
              単元全体の振り返り
            </h2>
            
            <div className="mb-6">
              <div className="flex gap-6">
                {/* メイン表示写真 */}
                {mainDisplayPhoto && (
                  <div className="flex-shrink-0" style={{ width: '400px' }}>
                    <div className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                      <Star size={16} className="text-yellow-400 fill-yellow-400" />
                      ベストショット
                    </div>
                    <div className="relative rounded-xl overflow-hidden border-4 border-yellow-400 shadow-lg" style={{ aspectRatio: '4/3' }}>
                      <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-yellow-50 to-orange-50 p-6">
                        <Camera className="w-16 h-16 text-yellow-400 mb-3" />
                        <div className="text-base text-gray-700 font-semibold text-center leading-tight mb-2">
                          {allLessons[mainDisplayPhoto.lessonNumber - 1].photos[mainDisplayPhoto.photoIndex]}
                        </div>
                        <div className="text-sm text-gray-500">第{mainDisplayPhoto.lessonNumber}回 {allLessons[mainDisplayPhoto.lessonNumber - 1].date}</div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* 選んだ写真グリッド */}
                <div className="flex-1">
                  {(isEditing && !isFinalSubmitted) && (
                    <div className="text-sm font-semibold text-gray-700 mb-2">選んだ写真</div>
                  )}
                  <div className="grid grid-cols-3 gap-3">
                    {selectedPhotos
                      .filter(photo => {
                        // 提出後はメイン表示写真を除外
                        if (!isEditing || isFinalSubmitted) {
                          return !(mainDisplayPhoto?.lessonNumber === photo.lessonNumber && 
                                 mainDisplayPhoto?.photoIndex === photo.photoIndex);
                        }
                        return true;
                      })
                      .map((photo, idx) => {
                      const isMainDisplay = mainDisplayPhoto?.lessonNumber === photo.lessonNumber && mainDisplayPhoto?.photoIndex === photo.photoIndex;
                      return (
                        <div 
                          key={idx} 
                          onClick={() => (isEditing && !isFinalSubmitted) ? setAsMainDisplay(photo.lessonNumber, photo.photoIndex) : null}
                          className={`relative rounded-lg overflow-hidden shadow-sm transition-all ${
                            (isEditing && !isFinalSubmitted) ? 'cursor-pointer' : ''
                          } ${
                            isMainDisplay 
                              ? 'border-4 border-yellow-400 scale-105' 
                              : 'border-2 border-green-400'
                          } ${(isEditing && !isFinalSubmitted) && !isMainDisplay ? 'hover:border-blue-400 hover:scale-102' : ''}`}
                          style={{ aspectRatio: '4/3' }}
                        >
                          <div className={`w-full h-full flex flex-col items-center justify-center p-3 ${
                            isMainDisplay 
                              ? 'bg-gradient-to-br from-yellow-50 to-orange-50' 
                              : 'bg-gradient-to-br from-green-50 to-teal-50'
                          }`}>
                            <Camera className={`w-8 h-8 mb-1 ${isMainDisplay ? 'text-yellow-400' : 'text-green-300'}`} />
                            <div className="text-xs text-gray-600 font-medium text-center leading-tight mb-1">
                              {allLessons[photo.lessonNumber - 1].photos[photo.photoIndex]}
                            </div>
                            <div className="text-xs text-gray-400">第{photo.lessonNumber}回</div>
                          </div>
                          {isMainDisplay && (
                            <div className="absolute top-1 left-1 bg-yellow-400 text-white rounded-full p-1">
                              <Star size={12} className="fill-white" />
                            </div>
                          )}
                          {(isEditing && !isFinalSubmitted) && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeSelectedPhoto(photo.lessonNumber, photo.photoIndex);
                                if (isMainDisplay && selectedPhotos.length > 1) {
                                  const remaining = selectedPhotos.filter(p => !(p.lessonNumber === photo.lessonNumber && p.photoIndex === photo.photoIndex));
                                  if (remaining.length > 0) {
                                    setMainDisplayPhoto({ lessonNumber: remaining[0].lessonNumber, photoIndex: remaining[0].photoIndex });
                                  }
                                }
                              }}
                              className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 shadow-md"
                            >
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          )}
                        </div>
                      );
                    })}
                    
                    {/* 写真追加ボタン - 編集モードのみ表示 */}
                    {(isEditing && !isFinalSubmitted) && (
                      <button
                        onClick={() => setShowPhotoModal(true)}
                        className="relative rounded-lg overflow-hidden border-2 border-dashed border-gray-400 hover:border-blue-400 cursor-pointer transition-all shadow-sm hover:shadow-md"
                        style={{ aspectRatio: '4/3' }}
                      >
                        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 hover:from-blue-50 hover:to-blue-100 p-3">
                          <div className="text-gray-400 hover:text-blue-400 mb-2">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="12" y1="5" x2="12" y2="19"></line>
                              <line x1="5" y1="12" x2="19" y2="12"></line>
                            </svg>
                          </div>
                          <div className="text-xs text-gray-500 font-medium">写真を追加</div>
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* 写真選択モーダル */}
            {showPhotoModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={cancelPhotoSelection}>
                <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl flex flex-col" style={{ maxHeight: '80vh' }} onClick={(e) => e.stopPropagation()}>
                  <div className="bg-white border-b-2 border-gray-200 p-4 flex items-center justify-between rounded-t-2xl flex-shrink-0">
                    <h3 className="text-lg font-bold text-gray-800">
                      写真を追加
                      {tempSelectedPhotos.length > 0 && (
                        <span className="ml-2 text-sm text-blue-600">({tempSelectedPhotos.length}枚選択中)</span>
                      )}
                    </h3>
                    <button
                      onClick={cancelPhotoSelection}
                      className="text-gray-500 hover:text-gray-700 font-bold text-xl w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                    >
                      ✕
                    </button>
                  </div>
                  
                  <div className="p-4 space-y-3 overflow-y-auto flex-1">
                    {allLessons.map((lesson) => (
                      lesson.photos.length > 0 && (
                        <div key={lesson.lessonNumber} className="border-2 border-gray-200 rounded-lg p-3 bg-gray-50">
                          <div className="text-xs font-bold text-gray-800 mb-2">
                            第{lesson.lessonNumber}回 {lesson.date} - {lesson.title}
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                            {lesson.photos.map((photo, photoIdx) => {
                              const isAlreadySelected = selectedPhotos.some(p => p.lessonNumber === lesson.lessonNumber && p.photoIndex === photoIdx);
                              const isTempSelected = tempSelectedPhotos.some(p => p.lessonNumber === lesson.lessonNumber && p.photoIndex === photoIdx);
                              
                              return (
                                <div 
                                  key={photoIdx}
                                  onClick={() => {
                                    if (!isAlreadySelected) {
                                      toggleTempPhoto(lesson.lessonNumber, photoIdx);
                                    }
                                  }}
                                  className={`relative rounded-lg overflow-hidden transition-all ${
                                    isAlreadySelected
                                      ? 'border-2 border-gray-400 opacity-40 cursor-not-allowed'
                                      : isTempSelected
                                        ? 'border-2 border-blue-500 cursor-pointer'
                                        : 'border-2 border-gray-300 hover:border-blue-400 cursor-pointer'
                                  }`}
                                  style={{ aspectRatio: '4/3' }}
                                >
                                  <div className={`w-full h-full flex flex-col items-center justify-center p-2 ${
                                    isAlreadySelected
                                      ? 'bg-gradient-to-br from-gray-100 to-gray-200'
                                      : isTempSelected
                                        ? 'bg-gradient-to-br from-blue-50 to-blue-100'
                                        : 'bg-gradient-to-br from-gray-50 to-gray-100'
                                  }`}>
                                    <Camera className={`w-5 h-5 mb-1 ${
                                      isAlreadySelected ? 'text-gray-400' : isTempSelected ? 'text-blue-400' : 'text-gray-300'
                                    }`} />
                                    <div className="text-xs text-gray-600 font-medium text-center leading-tight">{photo}</div>
                                  </div>
                                  
                                  {isAlreadySelected && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <div className="bg-gray-500 text-white rounded-full p-1.5">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                          <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                      </div>
                                    </div>
                                  )}
                                  
                                  {!isAlreadySelected && isTempSelected && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-blue-500 bg-opacity-10">
                                      <div className="bg-blue-500 text-white rounded-full p-1.5">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                          <polyline points="20 6 9 17 4 12"></polyline>
                                        </svg>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )
                    ))}
                  </div>

                  <div className="bg-gray-50 border-t-2 border-gray-200 p-4 flex gap-3 justify-end rounded-b-2xl flex-shrink-0">
                    <button
                      onClick={cancelPhotoSelection}
                      className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold rounded-lg transition-colors"
                    >
                      キャンセル
                    </button>
                    <button
                      onClick={confirmPhotoSelection}
                      disabled={tempSelectedPhotos.length === 0}
                      className={`px-6 py-2 font-bold rounded-lg transition-colors ${
                        tempSelectedPhotos.length > 0
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      OK ({tempSelectedPhotos.length}枚追加)
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4 mt-6 pt-6 border-t-2 border-gray-200">
              <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
                <div className="text-sm font-semibold text-gray-700 mb-2">「磁石の実験」の振り返り</div>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{studentReflection}</p>
              </div>

              <div className="bg-purple-50 rounded-xl p-4 border-2 border-purple-200">
                <div className="text-sm font-semibold text-gray-700 mb-2">まなびポケットAIからのコメント</div>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{step2AIComment}</p>
              </div>
              
              {additionalReflection && (
                <div className="bg-green-50 rounded-xl p-4 border-2 border-green-200">
                  <div className="text-sm font-semibold text-gray-700 mb-2">気づきを深めよう</div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{additionalReflection}</p>
                </div>
              )}

              {isFinalSubmitted && (
                <div className="bg-orange-50 rounded-xl p-4 border-2 border-orange-200">
                  <div className="text-sm font-semibold text-gray-700 mb-2">👨‍🏫 先生からのコメント</div>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">「磁石の実験」の学習、本当によく頑張りましたね!毎回の実験に目を輝かせて取り組む姿が印象的でした。特に第2回と第6回の実験では、予想を立ててから確かめる科学的な考え方ができていて素晴らしかったです。第7回で作った魚釣りゲームは、磁石の性質を上手に活用していて感心しました。8回の授業を通して、磁石について深く理解できましたね。これからも好奇心を大切に、いろいろなことに挑戦していってください!</p>
                </div>
              )}
            </div>
          </div>

          {!isFinalSubmitted ? (
            <button 
              onClick={() => handleFinalConfirm()}
              className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-4 px-6 rounded-xl transition-colors mb-4 shadow-lg"
            >
              提出
            </button>
          ) : (
            <button 
              onClick={() => handleEdit()}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold py-4 px-6 rounded-xl transition-colors mb-4 shadow-lg"
            >
              編集
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl shadow-lg p-6 mb-6 text-white">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="text-5xl">{unitInfo.icon}</div>
              <div>
                <div className="text-sm opacity-90 mb-1">{unitInfo.subject}　単元の振り返り</div>
                <h1 className="text-3xl font-bold">{unitInfo.title}</h1>
              </div>
            </div>
            <button
              onClick={() => setShowReferenceInfo(!showReferenceInfo)}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2 border-2 border-white border-opacity-30"
            >
              <ExternalLink size={18} />
              <span className="text-sm">授業の流れを見る</span>
            </button>
          </div>
          <p className="text-lg opacity-90">{unitInfo.period}</p>
        </div>

        {showReferenceInfo ? (
          // 授業の流れを見るページ
          <>
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <span className="text-2xl">📚</span>
                    授業の流れ
                  </h2>
                  <button
                    onClick={() => setShowDevNote(!showDevNote)}
                    className="text-xs bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-semibold py-1 px-2 rounded border border-yellow-300 cursor-pointer transition-colors"
                    title="実装メモを表示"
                  >
                    📝 実装メモ
                  </button>
                </div>
                <button
                  onClick={() => setShowReferenceInfo(false)}
                  className="text-gray-500 hover:text-gray-700 font-bold text-lg px-3 py-1 rounded-lg hover:bg-gray-100"
                >
                  ✕ 閉じる
                </button>
              </div>
              {showDevNote && (
                <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-4 mb-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-yellow-900 flex items-center gap-2">
                      <span>📝</span>
                      実装メモ
                    </h3>
                    <button
                      onClick={() => setShowDevNote(false)}
                      className="text-yellow-700 hover:text-yellow-900 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="text-sm text-yellow-900 space-y-3 leading-relaxed">
                    <p>モックUIではうまく実現できなかったのですが、ふりかえりグラフを見て、例えば「充実度・理解度の両方が低い1月25日について詳細が見たい」となった場合、すぐに該当の授業へ遷移できるようにしたいです。</p>
                    
                    <p>可能であればグラフの値や日付などをクリックすることで該当の授業に遷移するなどが考えられますが、グラフ内のクリックイベントとかは色々大変そうな気もするため、実現方式はあまりこだわりなく、該当の日付の授業に簡便に遷移できるようにしたいと考えています。</p>
                  </div>
                </div>
              )}

                            <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <h3 className="text-sm font-bold text-gray-700 mb-2">ふりかえりグラフ</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart 
                    data={chartData} 
                    margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                      axisLine={{ stroke: '#d1d5db' }}
                    />
                    <YAxis 
                      domain={[0, 5]} 
                      ticks={[1, 2, 3, 4, 5]}
                      tick={{ fill: '#6b7280', fontSize: 12 }}
                      axisLine={{ stroke: '#d1d5db' }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white', 
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        fontSize: '12px'
                      }}
                    />
                    <Legend 
                      wrapperStyle={{ paddingTop: '8px' }}
                      iconType="circle"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="たのしかった" 
                      stroke="#ec4899" 
                      strokeWidth={2}
                      dot={{ r: 4, fill: '#ec4899' }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="わかった/できた" 
                      stroke="#f59e0b" 
                      strokeWidth={2}
                      dot={{ r: 4, fill: '#f59e0b' }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-4">
                {allLessons.map((lesson) => (
                  <div key={lesson.lessonNumber} id={`lesson-${lesson.lessonNumber}`} className="border-2 border-gray-200 rounded-lg p-4 transition-all">
                    <div className="bg-green-50 rounded-lg p-3 mb-3">
                      <div className="text-sm font-bold text-gray-800">
                        第{lesson.lessonNumber}回 {lesson.date} - {lesson.title}
                      </div>
                    </div>
                    
                    {lesson.photos.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {lesson.photos.map((photo, idx) => (
                          <div key={idx} className="relative rounded-lg overflow-hidden border-2 border-gray-200" style={{ aspectRatio: '4/3' }}>
                            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-teal-50 p-2">
                              <Camera className="w-8 h-8 text-green-300 mb-1" />
                              <div className="text-xs text-gray-600 font-medium text-center leading-tight">{photo}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex gap-3 mb-3">
                      <div className="flex-1 bg-pink-50 rounded-lg p-2">
                        <div className="text-xs text-gray-600 mb-1">たのしかった</div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className={i < lesson.enjoyment ? 'text-pink-400 fill-pink-400' : 'text-gray-300'} />
                          ))}
                        </div>
                      </div>
                      <div className="flex-1 bg-orange-50 rounded-lg p-2">
                        <div className="text-xs text-gray-600 mb-1">わかった/できた</div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className={i < lesson.understanding ? 'text-orange-400 fill-orange-400' : 'text-gray-300'} />
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-purple-50 rounded-lg p-3 mb-2 border border-purple-200">
                      <div className="text-xs text-purple-600 font-semibold mb-1">AI授業解説</div>
                      <p className="text-xs text-gray-700 leading-relaxed">{lesson.aiLessonSummary}</p>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-3 mb-2">
                      <div className="text-xs text-gray-600 font-semibold mb-1">振り返り</div>
                      <p className="text-xs text-gray-700 leading-relaxed">{lesson.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="sticky bottom-0 z-40 bg-gradient-to-br from-green-50 via-white to-teal-50 pt-4 mt-6">
              <button 
                onClick={() => setShowReferenceInfo(false)}
                className="w-full bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-xl transition-colors"
              >
                ← 戻る
              </button>
            </div>
          </>
        ) : (
          // メインの振り返りページ
          <>
          </>
        )}

        {!showReferenceInfo && (
          <>
            <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-2xl shadow-lg p-6 mb-6 border-2 border-green-200">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  単元の目標
                </h2>
                {!isEditingGoal ? (
                  <button
                    onClick={() => {
                      setIsEditingGoal(true);
                      if (!customGoal) {
                        setCustomGoal(unitInfo.goal);
                      }
                    }}
                    className="text-sm bg-white hover:bg-gray-50 text-gray-700 font-semibold py-2 px-4 rounded-lg border-2 border-gray-300 transition-colors"
                  >
                    ✏️ 編集
                  </button>
                ) : (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setCustomGoal(unitInfo.goal);
                        setIsEditingGoal(false);
                      }}
                      className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                      リセット
                    </button>
                    <button
                      onClick={() => setIsEditingGoal(false)}
                      className="text-sm bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                    >
                      保存
                    </button>
                  </div>
                )}
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm">
                {!isEditingGoal ? (
                  <p className="text-gray-700 leading-relaxed font-medium">{displayGoal}</p>
                ) : (
                  <textarea
                    value={customGoal}
                    onChange={(e) => setCustomGoal(e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-lg p-3 focus:border-green-400 focus:outline-none resize-none font-medium text-gray-700 leading-relaxed"
                    rows={4}
                  />
                )}
              </div>
            </div>

            {/* 8コマ分の学習の振り返り */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">📚</span>
                これまでの学習
              </h2>
              
              <div className="grid grid-cols-4 gap-4">
                {allLessons.map((lesson) => {
                  return (
                    <div key={lesson.lessonNumber} className="flex flex-col">
                      {/* 日付 */}
                      <div className="text-xs font-bold text-gray-600 mb-2">
                        第{lesson.lessonNumber}回 {lesson.date}
                      </div>
                      
                      {/* 写真 */}
                      {lesson.photos.length > 0 ? (
                        <div className="relative rounded-lg overflow-hidden border-2 border-gray-300 shadow-sm mb-2" style={{ aspectRatio: '4/3' }}>
                          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-teal-50 p-3">
                            <Camera className="w-8 h-8 text-green-300 mb-1" />
                            <div className="text-xs text-gray-600 font-medium text-center leading-tight">
                              {lesson.photos[0]}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="mb-2" style={{ aspectRatio: '4/3' }}></div>
                      )}
                      
                      {/* コメント */}
                      <div className="text-xs text-gray-600 leading-relaxed line-clamp-4 bg-gray-50 rounded p-2 flex-1">
                        {lesson.comment}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="text-2xl">✍️</span>
                単元全体を振り返って
              </h2>
              
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  この単元で学んだこと、気づいたことを自由に書いてみましょう
                </label>
                <textarea
                  value={studentReflection}
                  onChange={(e) => setStudentReflection(e.target.value)}
                  onClick={(e) => {
                    if (!studentReflection && !isRegistered && !isLoadingAI) {
                      setStudentReflection('磁石にはN極とS極があり、同じ極ははね返し、ちがう極は引き合うことが実験で分かった。磁石の力は離れていてもはたらき、形や大きさで強さが変わることも知った。魚つりゲームでは、学んだ性質を使って作ることができた。');
                    }
                  }}
                  placeholder="例:磁石の実験を通して、N極とS極の性質について理解できました。最初は難しかったけど、実験を重ねるうちに..."
                  className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-green-400 focus:outline-none resize-none h-40"
                  disabled={isRegistered || isLoadingAI}
                />
                {!isRegistered && !isLoadingAI && (
                  <div className="flex justify-end mt-2">
                    <button 
                      onClick={handleStep1Submit}
                      disabled={!studentReflection.trim()}
                      className={`font-bold py-2 px-6 rounded-lg transition-colors shadow-md ${
                        studentReflection.trim()
                          ? 'bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      登録
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* AIコメント生成中のローディング */}
            {isLoadingAI && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl shadow-lg p-8 mb-6 border-2 border-purple-200">
                <div className="flex flex-col items-center justify-center">
                  <div className="relative w-16 h-16 mb-4">
                    <div className="absolute inset-0 border-4 border-purple-200 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">まなびポケットAIが分析中...</h3>
                  <p className="text-sm text-gray-600 text-center">
                    あなたの振り返りをもとに、コメントを生成しています
                  </p>
                </div>
              </div>
            )}

            {isRegistered && (
              <>
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl shadow-lg p-6 mb-6 border-2 border-purple-200">
                  <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                    <div className="bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg p-2">
                      <TrendingUp size={20} />
                    </div>
                    まなびポケットAIからのコメント
                  </h2>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{step2AIComment}</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="text-2xl">💡</span>
                    気づきを深めよう
                  </h2>
                  
                  <textarea
                    value={additionalReflection}
                    onChange={(e) => setAdditionalReflection(e.target.value)}
                    onClick={(e) => {
                      if (!additionalReflection) {
                        setAdditionalReflection('魚つりゲームでは、磁石が鉄に引きつく性質と、離れていても力がはたらく性質を使っていたことに気づいた。形や大きさがちがうと、つりやすさが変わったのは、磁石の力の強さが関係していると思った。次は、磁石と物の距離を少しずつ変えたときに、力がどのように弱くなるのかを確かめてみたい。また、どんな形の磁石が一番つりやすいのかも比べてみたい。');
                      }
                    }}
                    placeholder="AIのコメントを読んで、思ったことや新しく気づいたこと、この単元で学んだことを次の学習や生活でどう活かせそうか、などを書いてみましょう"
                    className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-purple-400 focus:outline-none resize-none h-32"
                  />
                </div>

                <div className="flex justify-center mb-6">
                  <button 
                    onClick={handleFinalSubmit}
                    className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-3 px-12 rounded-xl transition-colors shadow-lg text-lg"
                  >
                    登録
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
