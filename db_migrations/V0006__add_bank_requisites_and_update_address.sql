-- Добавление банковских реквизитов и уточнение фактического адреса АО КСИ
INSERT INTO t_p64876520_ksi_corporate_websit.site_settings (key, value) VALUES
  ('bank_account', '40702810900000123456'),
  ('bank_name', 'ПАО Сбербанк'),
  ('bank_bik', '044525225'),
  ('bank_corr_account', '30101810400000000225')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = now();

UPDATE t_p64876520_ksi_corporate_websit.site_settings
SET value = '353860, Краснодарский край, г. Приморско-Ахтарск, ул. Космонавтов, д. 37', updated_at = now()
WHERE key = 'actual_address';
