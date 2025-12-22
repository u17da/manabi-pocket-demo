# まなびポケット UIモック集

## デモURL
https://manabi-pocket-demo.vercel.app/

## モックの追加方法

### 1. 新しいモックファイルを作成
`src/pages/` フォルダに新しいJSXファイルを追加します。

例：`src/pages/TeacherDashboard.jsx`

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function TeacherDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* ここにUIを実装 */}
      <h1>教師ダッシュボード</h1>
      
      {/* トップへ戻るリンク（任意） */}
      <Link to="/" className="text-blue-500">← トップへ戻る</Link>
    </div>
  );
}
```

### 2. App.jsx を編集

#### インポートを追加
```jsx
import TeacherDashboard from './pages/TeacherDashboard';
```

#### demos配列に追加
```jsx
const demos = [
  // 既存のデモ...
  {
    id: 'teacher-dashboard',
    title: '教師ダッシュボード',
    description: 'クラス全体の学習進捗を表示',
    icon: LayoutDashboard,
    path: '/teacher-dashboard',
    status: 'ready',
  },
];
```

#### Routeを追加
```jsx
<Route path="/teacher-dashboard" element={<TeacherDashboard />} />
```

### 3. GitHubにプッシュ
```bash
git add .
git commit -m "Add TeacherDashboard mock"
git push
```

Vercelが自動で再デプロイします（1〜2分）。

## ファイル構成
```
src/
├── App.jsx              # ルーター＆トップページ
├── main.jsx             # エントリーポイント
├── index.css            # Tailwind CSS
└── pages/
    ├── WeeklyReflection.jsx   # 単元振り返り
    └── (新しいモック).jsx      # 追加していく
```
