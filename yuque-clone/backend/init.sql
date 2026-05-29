-- 初始化数据库表结构

-- 用户表
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    nickname VARCHAR(100),
    avatar_url VARCHAR(500),
    role VARCHAR(20) DEFAULT 'member', -- admin, member, guest
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 团队空间表
CREATE TABLE IF NOT EXISTS spaces (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 空间成员表
CREATE TABLE IF NOT EXISTS space_members (
    id SERIAL PRIMARY KEY,
    space_id INTEGER REFERENCES spaces(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    role VARCHAR(20) DEFAULT 'member', -- admin, member, guest
    joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(space_id, user_id)
);

-- 文档目录表
CREATE TABLE IF NOT EXISTS doc_folders (
    id SERIAL PRIMARY KEY,
    space_id INTEGER REFERENCES spaces(id) ON DELETE CASCADE,
    parent_id INTEGER REFERENCES doc_folders(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_by INTEGER REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 文档表
CREATE TABLE IF NOT EXISTS docs (
    id SERIAL PRIMARY KEY,
    space_id INTEGER REFERENCES spaces(id) ON DELETE CASCADE,
    folder_id INTEGER REFERENCES doc_folders(id) ON DELETE SET NULL,
    title VARCHAR(500) NOT NULL,
    content TEXT,
    cover_image VARCHAR(500),
    author_id INTEGER REFERENCES users(id),
    status VARCHAR(20) DEFAULT 'draft', -- draft, published
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    published_at TIMESTAMP
);

-- 文档版本历史表
CREATE TABLE IF NOT EXISTS doc_versions (
    id SERIAL PRIMARY KEY,
    doc_id INTEGER REFERENCES docs(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    version_number INTEGER NOT NULL,
    saved_by INTEGER REFERENCES users(id),
    saved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    change_summary VARCHAR(500)
);

-- 评论表
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    doc_id INTEGER REFERENCES docs(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    parent_id INTEGER REFERENCES comments(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 点赞表
CREATE TABLE IF NOT EXISTS likes (
    id SERIAL PRIMARY KEY,
    doc_id INTEGER REFERENCES docs(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(doc_id, user_id)
);

-- 附件表
CREATE TABLE IF NOT EXISTS attachments (
    id SERIAL PRIMARY KEY,
    space_id INTEGER REFERENCES spaces(id) ON DELETE CASCADE,
    uploaded_by INTEGER REFERENCES users(id),
    filename VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    mime_type VARCHAR(100),
    file_size INTEGER,
    file_path VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 创建索引
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_spaces_owner ON spaces(owner_id);
CREATE INDEX idx_space_members_space ON space_members(space_id);
CREATE INDEX idx_space_members_user ON space_members(user_id);
CREATE INDEX idx_doc_folders_space ON doc_folders(space_id);
CREATE INDEX idx_doc_folders_parent ON doc_folders(parent_id);
CREATE INDEX idx_docs_space ON docs(space_id);
CREATE INDEX idx_docs_folder ON docs(folder_id);
CREATE INDEX idx_docs_status ON docs(status);
CREATE INDEX idx_doc_versions_doc ON doc_versions(doc_id);
CREATE INDEX idx_comments_doc ON comments(doc_id);
CREATE INDEX idx_likes_doc ON likes(doc_id);
CREATE INDEX idx_attachments_space ON attachments(space_id);

-- 插入默认管理员用户 (密码: admin123, 已哈希)
-- 使用 bcrypt 哈希: $2b$10$rHxY8vKJzKqKpKpKpKpKpOExampleHashForAdmin123
-- 实际运行时由后端代码创建，这里仅做示例
-- INSERT INTO users (email, password_hash, nickname, role) 
-- VALUES ('admin@yuque-clone.local', '$2b$10$...', '系统管理员', 'admin');
