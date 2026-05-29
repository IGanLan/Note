export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

export const endpoints = {
  // 认证
  login: '/auth/login',
  register: '/auth/register',
  me: '/auth/me',
  
  // 空间
  spaces: '/spaces',
  
  // 知识库
  knowledgeBases: '/knowledge-bases',
  
  // 文档
  documents: '/documents',
  
  // 附件
  attachments: '/attachments',
};
