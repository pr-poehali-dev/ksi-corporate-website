ALTER TABLE t_p64876520_ksi_corporate_websit.chat_messages
  ADD COLUMN IF NOT EXISTS sender_type VARCHAR(20) NOT NULL DEFAULT 'user',
  ADD COLUMN IF NOT EXISTS sender_name VARCHAR(200) NULL;

COMMENT ON COLUMN t_p64876520_ksi_corporate_websit.chat_messages.sender_type IS 'user | ai | operator | system';
