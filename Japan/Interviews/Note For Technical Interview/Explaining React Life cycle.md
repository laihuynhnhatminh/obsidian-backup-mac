<span class="mcl-back-button">[[Japan/Interviews/Note For Technical Interview/index|← Note For Technical Interview]]</span> <span class="mcl-back-button">[[Home|🏠 Home]]</span>

---


## **React ライフサイクルの説明**

### **面接での基本回答：**

**Q: React のライフサイクルについて説明してください。**

**A:** 「React のライフサイクルとは、コンポーネントが作成されてから破棄されるまでの一連の段階を指します。主に**マウント、更新、アンマウント**の3つの段階があり、クラスコンポーネントと関数コンポーネント（Hooks）で実装方法が異なります。」

---

### **1. ライフサイクルの3つの段階**

#### **Mounting（マウント）**: コンポーネントが DOM に挿入される

#### **Updating（更新）**: props や state の変更でコンポーネントが再レンダリング

#### **Unmounting（アンマウント）**: コンポーネントが DOM から削除される

---

### **2. クラスコンポーネントのライフサイクル**

```javascript
class MyComponent extends React.Component {
  // 1. マウント段階
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    console.log('1. Constructor');
  }

  componentDidMount() {
    console.log('3. ComponentDidMount - API呼び出しなど');
    // API呼び出し、イベントリスナー設定
    this.fetchData();
  }

  // 2. 更新段階
  componentDidUpdate(prevProps, prevState) {
    console.log('4. ComponentDidUpdate');
    if (prevProps.userId !== this.props.userId) {
      this.fetchData();
    }
  }

  // 3. アンマウント段階
  componentWillUnmount() {
    console.log('5. ComponentWillUnmount - クリーンアップ');
    // イベントリスナー削除、タイマー停止
    clearInterval(this.timer);
  }

  render() {
    console.log('2. Render');
    return <div>{this.state.count}</div>;
  }
}
```

---

### **3. 関数コンポーネント（Hooks）のライフサイクル**

```javascript
import { useState, useEffect } from 'react';

function MyComponent({ userId }) {
  const [count, setCount] = useState(0);

  // componentDidMount + componentDidUpdate
  useEffect(() => {
    console.log('Component mounted or updated');
    fetchData(userId);
  }, [userId]); // 依存配列でいつ実行するかを制御

  // componentDidMount のみ（初回のみ）
  useEffect(() => {
    console.log('Component mounted only');
    const timer = setInterval(() => {
      setCount(prev => prev + 1);
    }, 1000);

    // componentWillUnmount（クリーンアップ）
    return () => {
      console.log('Component will unmount');
      clearInterval(timer);
    };
  }, []); // 空の依存配列

  return <div>{count}</div>;
}
```

---

### **4. useEffect の依存配列パターン**

```javascript
// 1. 毎回実行（componentDidUpdate）
useEffect(() => {
  console.log('Every render');
});

// 2. 初回のみ実行（componentDidMount）
useEffect(() => {
  console.log('Mount only');
}, []);

// 3. 特定の値が変更時のみ実行
useEffect(() => {
  console.log('When userId changes');
}, [userId]);

// 4. クリーンアップ付き
useEffect(() => {
  const subscription = subscribe();
  return () => subscription.unsubscribe();
}, []);
```

---

### **5. 実務でよく使うパターン**

**A:** 「実際のプロジェクトでは、次のような場面でライフサイクルを意識します：

**API データ取得:**

```javascript
useEffect(() => {
  const fetchUserData = async () => {
    try {
      const response = await api.getUser(userId);
      setUser(response.data);
    } catch (error) {
      setError(error.message);
    }
  };
  
  if (userId) {
    fetchUserData();
  }
}, [userId]);
```

**イベントリスナーの管理:**

```javascript
useEffect(() => {
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  
  window.addEventListener('resize', handleResize);
  
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []);
```

**タイマーの管理:**

```javascript
useEffect(() => {
  const timer = setTimeout(() => {
    setShowMessage(false);
  }, 3000);
  
  return () => clearTimeout(timer);
}, []);
```

---

### **6. パフォーマンス最適化**

**A:** 「ライフサイクルを理解することで、不要な再レンダリングを防げます：

```javascript
// React.memo でpropsの変更時のみ再レンダリング
const MyComponent = React.memo(({ name, age }) => {
  return <div>{name}: {age}</div>;
});

// useMemo で重い計算をキャッシュ
const MyComponent = ({ items }) => {
  const expensiveValue = useMemo(() => {
    return items.reduce((sum, item) => sum + item.value, 0);
  }, [items]);
  
  return <div>{expensiveValue}</div>;
};

// useCallback で関数をキャッシュ
const MyComponent = ({ onSubmit }) => {
  const handleClick = useCallback(() => {
    onSubmit('data');
  }, [onSubmit]);
  
  return <button onClick={handleClick}>Submit</button>;
};
```

---

### **7. よくある間違いと対策**

**Q: よくある間違いはありますか？**

**A:** 「はい、いくつかあります：

**1. useEffect の依存配列を忘れる:**

```javascript
❌ // 無限ループの危険
useEffect(() => {
  setCount(count + 1);
}); // 依存配列なし

✅ // 正しい
useEffect(() => {
  setCount(prev => prev + 1);
}, []); // 空の依存配列
```

**2. クリーンアップを忘れる:**

```javascript
❌ // メモリリーク
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
}); // クリーンアップなし

✅ // 正しい
useEffect(() => {
  const timer = setInterval(() => {}, 1000);
  return () => clearInterval(timer);
}, []);
```

**3. 不要な依存関係:**

```javascript
❌ // 毎回実行されてしまう
const [user, setUser] = useState({});
useEffect(() => {
  fetchData();
}, [user]); // userオブジェクトは毎回新しい参照

✅ // 正しい
useEffect(() => {
  fetchData();
}, [user.id]); // 必要な値のみ
```

---

### **面接でのポイント:**

- **クラスとHooks両方**理解していることを示す
- **実務での具体例**を交えて説明
- **パフォーマンス**への配慮を示す
- **よくある問題と解決策**を知っている

この説明で、React ライフサイクルの深い理解と実務経験があることをアピールできます！