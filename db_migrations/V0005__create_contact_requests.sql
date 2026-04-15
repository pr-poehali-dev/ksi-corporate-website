
CREATE TABLE contact_requests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    org VARCHAR(255) DEFAULT '',
    email VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT '',
    message TEXT DEFAULT '',
    source_ip VARCHAR(45) DEFAULT '',
    status VARCHAR(20) DEFAULT 'new',
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_contact_requests_status ON contact_requests(status);
CREATE INDEX idx_contact_requests_created ON contact_requests(created_at DESC);
