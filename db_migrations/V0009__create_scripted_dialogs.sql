CREATE TABLE IF NOT EXISTS t_p64876520_ksi_corporate_websit.scripted_dialogs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(300) NOT NULL DEFAULT '',
    question_text TEXT NOT NULL,
    question_attachments JSONB NOT NULL DEFAULT '[]',
    answer_text TEXT NOT NULL,
    answer_attachments JSONB NOT NULL DEFAULT '[]',
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_by UUID REFERENCES t_p64876520_ksi_corporate_websit.users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_scripted_dialogs_sort ON t_p64876520_ksi_corporate_websit.scripted_dialogs(sort_order ASC, created_at ASC);
