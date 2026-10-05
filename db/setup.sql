-- ============================================
-- MiniBlog - Database Setup
-- ============================================

-- Reset para ejecutar los valores con las precondiciones adecuadas
DROP TABLE IF EXISTS Posts;
DROP TABLE IF EXISTS authors; 

-- Tabla authors

CREATE TABLE authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla posts

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    author_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (author_id)
        REFERENCES authors(id)
        ON DELETE CASCADE
);