
INSERT INTO site_settings (key, value) VALUES
('telegram_bot_token', ''),
('telegram_chat_id', ''),
('telegram_notifications_enabled', 'false')
ON CONFLICT (key) DO NOTHING;
