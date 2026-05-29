import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import Login from './pages/Login';
import Register from './pages/Register';
import Layout from './components/Layout';
import DocumentList from './pages/DocumentList';
import DocumentEditor from './pages/DocumentEditor';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-yuque-textSecondary">加载中...</div>
      </div>
    );
  }

  return (
    <ConfigProvider locale={zhCN} theme={{
      token: {
        colorPrimary: '#006CFF',
        borderRadius: 6,
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      },
    }}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
          <Route path="/" element={user ? <Layout user={user} /> : <Navigate to="/login" />}>
            <Route index element={<DocumentList />} />
            <Route path="space/:spaceId" element={<DocumentList />} />
            <Route path="space/:spaceId/kb/:kbId" element={<DocumentList />} />
            <Route path="doc/:docId" element={<DocumentEditor />} />
            <Route path="doc/:docId/edit" element={<DocumentEditor mode="edit" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
