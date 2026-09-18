-- PoloPrompt backend schema.
-- Run this in phpMyAdmin (or `mysql -u root < schema.sql` via XAMPP's MySQL) once
-- before running the seed script.

CREATE DATABASE IF NOT EXISTS poloprompt CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE poloprompt;

-- The Prompt Library (currently assets/js/prompt-library-data.js)
CREATE TABLE IF NOT EXISTS prompts (
  id            VARCHAR(64) PRIMARY KEY,
  category      VARCHAR(64) NOT NULL,
  title         VARCHAR(255) NOT NULL,
  description   TEXT NOT NULL,
  tags          JSON NOT NULL,
  prompt        TEXT NOT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- The AI Automation Idea Finder (currently assets/js/automation-ideas-data.js)
-- goal = NULL marks a fallback idea used when no industry+goal combination matches.
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

-- Footer newsletter signups (site-wide form, all pages)
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  email           VARCHAR(255) NOT NULL UNIQUE,
  subscribed_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  source_page     VARCHAR(255) NULL
);

-- Contact page submissions
CREATE TABLE IF NOT EXISTS contact_messages (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(255) NULL,
  email       VARCHAR(255) NOT NULL,
  reason      ENUM('help','support') NOT NULL DEFAULT 'help',
  message     TEXT NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_read     BOOLEAN DEFAULT FALSE
);
