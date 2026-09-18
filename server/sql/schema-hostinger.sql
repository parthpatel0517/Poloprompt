-- Same schema as schema.sql, but without CREATE DATABASE/USE — for pasting into
-- phpMyAdmin (or running via a remote mysql client) against a database Hostinger
-- already created for you (e.g. u295478293_poloprompt).

CREATE TABLE IF NOT EXISTS prompts (
  id            VARCHAR(64) PRIMARY KEY,
  category      VARCHAR(64) NOT NULL,
  title         VARCHAR(255) NOT NULL,
  description   TEXT NOT NULL,
  tags          JSON NOT NULL,
  prompt        TEXT NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS automation_ideas (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  industry      VARCHAR(64) NOT NULL,
  goal          VARCHAR(64) NULL,
  name          VARCHAR(255) NOT NULL,
  steps         TEXT NOT NULL,
  prompt        TEXT NOT NULL,
  sort_order    INT DEFAULT 0,
  INDEX idx_industry_goal (industry, goal)
);

CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  email           VARCHAR(255) NOT NULL UNIQUE,
  subscribed_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  source_page     VARCHAR(255) NULL
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(255) NULL,
  email       VARCHAR(255) NOT NULL,
  reason      ENUM('help','support') NOT NULL DEFAULT 'help',
  message     TEXT NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_read     BOOLEAN DEFAULT FALSE
);
