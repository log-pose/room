CREATE TABLE IF NOT EXISTS Server  (
    id CHAR(36) NOT NULL PRIMARY KEY,
    ip VARCHAR(15),
    port INT,
    uri VARCHAR(255),
    server_name VARCHAR(255) NOT NULL,
    connection_string VARCHAR(255),
    kind_id INT,
    heartbeat_interval INT DEFAULT 60,
    retries INT DEFAULT 3,
    user_id CHAR(36),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS ServerKind (
    kind_id INT AUTO_INCREMENT PRIMARY KEY,
    kind_name VARCHAR(255) NOT NULL,
    required_fields VARCHAR(255) NOT NULL
);
