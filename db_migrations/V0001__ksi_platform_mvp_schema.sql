
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    user_type VARCHAR(20) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    internal_role VARCHAR(30),
    avatar_url TEXT,
    settings JSONB DEFAULT '{}',
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE companies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(100),
    inn VARCHAR(12),
    ogrn VARCHAR(15),
    kpp VARCHAR(9),
    legal_address TEXT,
    actual_address TEXT,
    company_type VARCHAR(30) NOT NULL DEFAULT 'client',
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    balance_available NUMERIC(12,2) NOT NULL DEFAULT 0,
    balance_reserved NUMERIC(12,2) NOT NULL DEFAULT 0,
    bonus_balance NUMERIC(12,2) NOT NULL DEFAULT 0,
    bonus_expires_at TIMESTAMPTZ,
    contact_person VARCHAR(255),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    manager_id UUID REFERENCES users(id),
    settings JSONB DEFAULT '{}',
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE company_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id),
    user_id UUID NOT NULL REFERENCES users(id),
    role VARCHAR(20) NOT NULL DEFAULT 'employee',
    module_access UUID[] DEFAULT '{}',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(company_id, user_id)
);

CREATE TABLE modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    icon VARCHAR(50),
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    km_rules JSONB DEFAULT '{}',
    curator_id UUID REFERENCES users(id),
    sort_order INT NOT NULL DEFAULT 0,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE company_modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id),
    module_id UUID NOT NULL REFERENCES modules(id),
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    conditions JSONB DEFAULT '{}',
    connected_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    disconnected_at TIMESTAMPTZ,
    UNIQUE(company_id, module_id)
);

CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_number SERIAL,
    company_id UUID NOT NULL REFERENCES companies(id),
    module_id UUID REFERENCES modules(id),
    title VARCHAR(500) NOT NULL,
    description TEXT,
    status VARCHAR(30) NOT NULL DEFAULT 'new',
    priority VARCHAR(10) NOT NULL DEFAULT 'normal',
    creator_id UUID NOT NULL REFERENCES users(id),
    curator_id UUID REFERENCES users(id),
    executor_id UUID REFERENCES users(id),
    km_estimate NUMERIC(10,2),
    km_reserved NUMERIC(10,2) DEFAULT 0,
    km_charged NUMERIC(10,2) DEFAULT 0,
    charge_basis TEXT,
    deadline TIMESTAMPTZ,
    result_description TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE task_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID NOT NULL REFERENCES tasks(id),
    user_id UUID NOT NULL REFERENCES users(id),
    message TEXT NOT NULL,
    is_internal BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE task_attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID NOT NULL REFERENCES tasks(id),
    file_name VARCHAR(500) NOT NULL,
    file_url TEXT NOT NULL,
    file_size BIGINT,
    file_type VARCHAR(100),
    uploaded_by UUID NOT NULL REFERENCES users(id),
    category VARCHAR(30) DEFAULT 'attachment',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE task_status_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    task_id UUID NOT NULL REFERENCES tasks(id),
    old_status VARCHAR(30),
    new_status VARCHAR(30) NOT NULL,
    changed_by UUID NOT NULL REFERENCES users(id),
    comment TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE km_operations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id),
    task_id UUID REFERENCES tasks(id),
    module_id UUID REFERENCES modules(id),
    operation_type VARCHAR(20) NOT NULL,
    amount NUMERIC(10,2) NOT NULL,
    balance_before NUMERIC(12,2) NOT NULL,
    balance_after NUMERIC(12,2) NOT NULL,
    reserved_before NUMERIC(12,2),
    reserved_after NUMERIC(12,2),
    reason TEXT NOT NULL,
    confirmed_by UUID REFERENCES users(id),
    operator_id UUID REFERENCES users(id),
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id),
    task_id UUID REFERENCES tasks(id),
    module_id UUID REFERENCES modules(id),
    file_name VARCHAR(500) NOT NULL,
    file_url TEXT NOT NULL,
    file_size BIGINT,
    file_type VARCHAR(100),
    category VARCHAR(30) DEFAULT 'document',
    description TEXT,
    uploaded_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id UUID NOT NULL REFERENCES companies(id),
    user_id UUID REFERENCES users(id),
    message TEXT NOT NULL,
    is_system BOOLEAN NOT NULL DEFAULT FALSE,
    task_id UUID REFERENCES tasks(id),
    attachments JSONB DEFAULT '[]',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    type VARCHAR(30) NOT NULL,
    title VARCHAR(500) NOT NULL,
    body TEXT,
    link VARCHAR(500),
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(50) NOT NULL,
    entity_type VARCHAR(30) NOT NULL,
    entity_id UUID,
    details JSONB DEFAULT '{}',
    ip_address VARCHAR(45),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    token_hash VARCHAR(255) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_company_users_company ON company_users(company_id);
CREATE INDEX idx_company_users_user ON company_users(user_id);
CREATE INDEX idx_tasks_company ON tasks(company_id);
CREATE INDEX idx_tasks_module ON tasks(module_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_curator ON tasks(curator_id);
CREATE INDEX idx_tasks_creator ON tasks(creator_id);
CREATE INDEX idx_km_operations_company ON km_operations(company_id);
CREATE INDEX idx_km_operations_task ON km_operations(task_id);
CREATE INDEX idx_km_operations_type ON km_operations(operation_type);
CREATE INDEX idx_km_operations_created ON km_operations(created_at);
CREATE INDEX idx_documents_company ON documents(company_id);
CREATE INDEX idx_documents_task ON documents(task_id);
CREATE INDEX idx_chat_messages_company ON chat_messages(company_id);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_audit_log_user ON audit_log(user_id);
CREATE INDEX idx_audit_log_entity ON audit_log(entity_type, entity_id);
CREATE INDEX idx_audit_log_created ON audit_log(created_at);
CREATE INDEX idx_user_sessions_token ON user_sessions(token_hash);
CREATE INDEX idx_user_sessions_user ON user_sessions(user_id);
CREATE INDEX idx_task_comments_task ON task_comments(task_id);
CREATE INDEX idx_task_status_log_task ON task_status_log(task_id);
