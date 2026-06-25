<span class="mcl-back-button">[[Japan/Interviews/Note For Technical Interview/index|← Note For Technical Interview]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---


# **Next.js Page Router vs App Router の説明**

### **面接での説明方法：**

**Q: Next.js の Page Router と App Router の違いを説明してください。**

**A:** 「Next.js には現在2つのルーティングシステムがあります。Page Router は従来の方式で、App Router は Next.js 13 から導入された新しい方式です。主な違いを説明させていただきます。」

---

### **1. ファイル構造とルーティング**

**Page Router:**

```
pages/
  index.js          → / 
  about.js          → /about
  blog/
    index.js        → /blog
    [slug].js       → /blog/[slug]
```

**App Router:**

```
app/
  page.js           → /
  about/
    page.js         → /about
  blog/
    page.js         → /blog
    [slug]/
      page.js       → /blog/[slug]
```

**説明:** 「App Router では `page.js` ファイルがルートを定義し、フォルダ構造がURLパスになります。より直感的で、レイアウトの管理が容易になりました。」

---

### **2. データフェッチング**

**Page Router:**

javascript

```javascript
// getServerSideProps, getStaticProps, getStaticPaths
export async function getServerSideProps() {
  const data = await fetch('...')
  return { props: { data } }
}
```

**App Router:**

javascript

```javascript
// async/await を直接コンポーネントで使用
async function Page() {
  const data = await fetch('...')
  return <div>{data}</div>
}
```

**説明:** 「App Router では、サーバーコンポーネント内で直接 async/await を使用できるため、よりシンプルで理解しやすいコードになります。」

---

### **3. レイアウト管理**

**Page Router:**

javascript

```javascript
// _app.js で全体レイアウト
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
```

**App Router:**

javascript

```javascript
// 各フォルダに layout.js
export default function Layout({ children }) {
  return (
    <nav>...</nav>
    {children}
  )
}
```

**説明:** 「App Router では、各ルートレベルで `layout.js` を定義でき、ネストしたレイアウトの管理が非常に柔軟になりました。」

---

### **4. サーバー/クライアントコンポーネント**

**Page Router:**

- すべてのコンポーネントがデフォルトでクライアント側

**App Router:**

- デフォルトでサーバーコンポーネント
- `'use client'` でクライアントコンポーネントに明示的に指定

**説明:** 「App Router ではサーバーコンポーネントがデフォルトなので、パフォーマンスが向上し、JavaScriptバンドルサイズも削減できます。」

---

### **5. 実際のプロジェクト経験での回答**

**A:** 「実際に、Travelbus プロジェクトで Angular から Next.js への移行を担当しましたが、新規開発部分では App Router を採用しました。

**採用理由:**

- SEO 改善のためのサーバーサイドレンダリングが簡単
- レイアウトの管理が直感的
- パフォーマンス向上（サーバーコンポーネント）
- 将来性（Next.js の推奨方式）

**移行での課題:**

- 学習コストが少しある
- 一部のライブラリがまだ完全対応していない
- デバッグツールが Page Router ほど成熟していない

しかし、総合的には App Router の方が modern で maintainable なコードベースを構築できると感じています。」

---

### **6. どちらを選ぶべきか**

**A:** 「新規プロジェクトであれば App Router を推奨します。理由は：

**App Router を選ぶべき場合:**

- 新規プロジェクト
- パフォーマンス重視
- SEO が重要
- モダンな開発体験が欲しい

**Page Router を使う場合:**

- 既存プロジェクトの維持
- 特定のライブラリ依存
- チームの学習コストを抑えたい

Next.js 公式も App Router を推奨しており、今後の機能追加も App Router 中心になると思います。」
