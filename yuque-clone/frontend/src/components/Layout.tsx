import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Layout as AntLayout, Menu, Avatar, Dropdown, Button } from 'antd';
import {
  BookOutlined,
  FolderOutlined,
  PlusOutlined,
  SearchOutlined,
  SettingOutlined,
  LogoutOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { User } from '../services/auth.service';

const { Header, Sider, Content } = AntLayout;

interface LayoutProps {
  user: User;
}

export default function Layout({ user }: LayoutProps) {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    {
      key: 'home',
      icon: <BookOutlined />,
      label: '首页',
      onClick: () => navigate('/'),
    },
    {
      key: 'space1',
      icon: <FolderOutlined />,
      label: '团队空间',
      children: [
        {
          key: 'kb1',
          label: '产品文档',
          onClick: () => navigate('/space/1/kb/1'),
        },
        {
          key: 'kb2',
          label: '技术文档',
          onClick: () => navigate('/space/1/kb/2'),
        },
      ],
    },
  ];

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人设置',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '空间设置',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: () => {
        localStorage.removeItem('token');
        navigate('/login');
      },
    },
  ];

  return (
    <AntLayout className="min-h-screen">
      <Header className="bg-white border-b border-yuque-border px-4 flex items-center justify-between h-14 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="text-xl font-semibold text-yuque-blue">知识库</div>
          <div className="hidden md:flex items-center bg-yuque-gray rounded-lg px-3 py-1.5 w-64">
            <SearchOutlined className="text-yuque-textSecondary mr-2" />
            <input
              type="text"
              placeholder="搜索文档..."
              className="bg-transparent border-none outline-none text-sm w-full text-yuque-text"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button type="primary" size="small" icon={<PlusOutlined />}>
            新建
          </Button>
          <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" trigger={['click']}>
            <div className="flex items-center gap-2 cursor-pointer hover:bg-yuque-gray px-2 py-1 rounded-lg transition-colors">
              <Avatar size="small" style={{ backgroundColor: '#006CFF' }}>
                {user.name.charAt(0).toUpperCase()}
              </Avatar>
              <span className="text-sm text-yuque-text hidden sm:inline">{user.name}</span>
            </div>
          </Dropdown>
        </div>
      </Header>

      <AntLayout>
        <Sider
          width={240}
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          className="bg-white border-r border-yuque-border min-h-[calc(100vh-56px)]"
          theme="light"
        >
          <div className="p-3">
            <Menu
              mode="inline"
              items={menuItems}
              className="border-none"
              selectedKeys={[]}
            />
          </div>
        </Sider>

        <Content className="bg-yuque-gray p-4">
          <Outlet />
        </Content>
      </AntLayout>
    </AntLayout>
  );
}
