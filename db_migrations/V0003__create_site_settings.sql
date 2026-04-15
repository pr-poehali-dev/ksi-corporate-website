
CREATE TABLE site_settings (
    key VARCHAR(100) PRIMARY KEY,
    value TEXT NOT NULL DEFAULT '',
    updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO site_settings (key, value) VALUES
('company_full_name', 'АО «КриптоСтройИнвест»'),
('company_short_name', 'АО КСИ'),
('ogrn', ''),
('inn', ''),
('kpp', ''),
('legal_address', ''),
('actual_address', 'Москва, Россия'),
('ceo_name', ''),
('ceo_position', 'Генеральный директор'),
('email', ''),
('phone', ''),
('website', ''),
('privacy_company_name', 'АО «КриптоСтройИнвест»'),
('privacy_company_address', ''),
('privacy_dpo_email', ''),
('privacy_dpo_name', ''),
('privacy_effective_date', ''),
('privacy_data_types', 'ФИО, адрес электронной почты, номер телефона, IP-адрес'),
('privacy_processing_purposes', 'Обработка заявок и обращений, заключение и исполнение договоров, направление информационных сообщений'),
('privacy_third_parties', ''),
('privacy_storage_period', '3 года с момента последнего взаимодействия'),
('privacy_extra_clauses', '');
