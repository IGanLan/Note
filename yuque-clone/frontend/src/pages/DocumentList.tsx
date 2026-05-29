import { useState } from 'react';
import { Card, Button, List, Tag, Space } from 'antd';
import {
  FileTextOutlined,
  FolderOutlined,
  PlusOutlined,
  ClockCircleOutlined,
} from '@ant-design/icons';

const mockDocuments = [
  {
    id: 1,
    title: '产品需求文档 v2.0',
    description: '本产品文档描述了知识库系统的核心功能和用户需求...',
    updatedAt: '2024-01-15 14:30',
    author: '张三',
    type: 'doc',
  },
  {
    id: 2,
    title: 'API 接口设计规范',
    description: '本文档定义了后端 API 的设计规范和最佳实践...',
    updatedAt: '2024-01-14 09:15',
    author: '李四',
    type: 'doc',
  },
  {
    id: 3,
    title: '前端开发指南',
    description: 'React + TypeScript 开发规范，包含组件设计和状态管理...',
    updatedAt: '2024-01-13 16:45',
    author: '王五',
    type: 'doc',
  },
];

const mockFolders = [
  { id: 1, name: '产品文档', count: 12 },
  { id: 2, name: '技术文档', count: 8 },
  { id: 3, name: '设计资源', count: 5 },
];

export default function DocumentList() {
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-yuque-text mb-1">团队空间</h1>
          <p className="text-yuque-textSecondary text-sm">共 {mockDocuments.length} 篇文档，{mockFolders.length} 个文件夹</p>
        </div>
        <Button type="primary" icon={<PlusOutlined />}>
          新建文档
        </Button>
      </div>

      {/* 文件夹区域 */}
      <Card className="mb-6 shadow-yuque border-0">
        <h2 className="text-lg font-medium text-yuque-text mb-4 flex items-center gap-2">
          <FolderOutlined className="text-yuque-blue" />
          文件夹
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {mockFolders.map((folder) => (
            <div
              key={folder.id}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-yuque-gray cursor-pointer transition-colors group"
            >
              <FolderOutlined className="text-2xl text-[#FFA940]" />
              <div>
                <div className="font-medium text-yuque-text group-hover:text-yuque-blue transition-colors">
                  {folder.name}
                </div>
                <div className="text-xs text-yuque-textSecondary">{folder.count} 篇文档</div>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-yuque-gray cursor-pointer transition-colors border border-dashed border-yuque-border">
            <PlusOutlined className="text-2xl text-yuque-textSecondary" />
            <div className="text-yuque-textSecondary font-medium">新建文件夹</div>
          </div>
        </div>
      </Card>

      {/* 文档列表 */}
      <Card className="shadow-yuque border-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-yuque-text flex items-center gap-2">
            <FileTextOutlined className="text-yuque-blue" />
            最近文档
          </h2>
          <Space size="small">
            <Tag color="blue">全部</Tag>
            <Tag>我创建的</Tag>
            <Tag>我更新的</Tag>
          </Space>
        </div>

        <List
          itemLayout="vertical"
          dataSource={mockDocuments}
          renderItem={(doc) => (
            <List.Item
              className="py-4 border-b border-yuque-border last:border-0 hover:bg-yuque-gray/50 px-2 -mx-2 rounded-lg transition-colors cursor-pointer"
            >
              <List.Item.Meta
                title={
                  <div className="flex items-center gap-2">
                    <FileTextOutlined className="text-yuque-blue" />
                    <span className="font-medium text-yuque-text hover:text-yuque-blue transition-colors">
                      {doc.title}
                    </span>
                  </div>
                }
                description={
                  <div className="mt-2">
                    <p className="text-yuque-textSecondary text-sm line-clamp-2 mb-2">
                      {doc.description}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-yuque-textSecondary">
                      <span>{doc.author}</span>
                      <span className="flex items-center gap-1">
                        <ClockCircleOutlined />
                        {doc.updatedAt}
                      </span>
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}
