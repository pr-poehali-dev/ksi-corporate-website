ALTER TABLE t_p64876520_ksi_corporate_websit.scripted_dialogs
  ADD COLUMN IF NOT EXISTS messages JSONB NOT NULL DEFAULT '[]';
