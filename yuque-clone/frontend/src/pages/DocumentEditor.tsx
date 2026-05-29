import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, message } from 'antd';
import { ArrowLeftOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { EditorContent, useEditor, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';

interface DocumentEditorProps {
  mode?: 'view' | 'edit';
}

export default function DocumentEditor({ mode = 'view' }: DocumentEditorProps) {
  const { docId } = useParams<{ docId: string }>();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(mode === 'edit');
  const [content, setContent] = useState('<h1>欢迎使用知识库</h1><p>这是一个语雀风格的文档编辑器，支持 Markdown 语法和富文本编辑。</p><h2>功能特性</h2><ul><li>所见即所得的编辑体验</li><li>Markdown 快捷键支持</li><li>代码高亮</li><li>表格、图片、链接等丰富组件</li></ul><blockquote>提示：点击右下角编辑按钮开始编辑文档</blockquote>');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: {
          HTMLAttributes: {
            class: 'rounded-lg',
          },
        },
      }),
      Placeholder.configure({
        placeholder: '输入 / 选择组件，或使用 Markdown 语法...',
      }),
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: content,
    editable: isEditing,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor) {
      editor.setEditable(isEditing);
    }
  }, [isEditing, editor]);

  const handleSave = async () => {
    // TODO: 调用 API 保存文档
    message.success('文档已保存');
    setIsEditing(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* 顶部导航栏 */}
      <div className="bg-white rounded-lg shadow-yuque mb-4 p-4 flex items-center justify-between sticky top-20 z-10">
        <div className="flex items-center gap-3">
          <Button
            icon={<ArrowLeftOutlined />}
            onClick={() => navigate(-1)}
            size="small"
          />
          <h1 className="text-xl font-semibold text-yuque-text">
            {docId ? '产品需求文档 v2.0' : '新建文档'}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <Button onClick={() => setIsEditing(false)}>取消</Button>
              <Button type="primary" icon={<SaveOutlined />} onClick={handleSave}>
                保存
              </Button>
            </>
          ) : (
            <Button type="primary" icon={<EditOutlined />} onClick={() => setIsEditing(true)}>
              编辑
            </Button>
          )}
        </div>
      </div>

      {/* 文档内容区 */}
      <div className="bg-white rounded-lg shadow-yuque min-h-[60vh]">
        <div className="max-w-none px-8 py-10 prose prose-lg">
          <EditorContent editor={editor} className="min-h-[50vh]" />
        </div>
      </div>

      {/* 右侧大纲 - 简化版 */}
      <div className="fixed right-8 top-32 w-48 hidden xl:block">
        <div className="bg-white rounded-lg shadow-yuque p-4 sticky top-32">
          <h3 className="text-sm font-medium text-yuque-textSecondary mb-3">目录</h3>
          <nav className="space-y-2 text-sm">
            <a href="#" className="block text-yuque-blue hover:text-yuque-blue transition-colors">欢迎使用知识库</a>
            <a href="#" className="block text-yuque-textSecondary hover:text-yuque-blue transition-colors pl-3">功能特性</a>
          </nav>
        </div>
      </div>
    </div>
  );
}
